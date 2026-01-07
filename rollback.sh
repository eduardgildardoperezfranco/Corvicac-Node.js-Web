#!/bin/bash
#
# CORVICAC Web Rollback Script
# Emergency rollback procedure for production deployments
#
# Usage: ./rollback.sh [backup_version]
#   - Without arguments: rolls back to previous backup
#   - With version: rolls back to specific version (e.g., "20240106_120000")
#

set -euo pipefail

# Configuration
APP_NAME="corvicac-web"
DEPLOY_DIR="/var/www/corvicac/web"
BACKUP_DIR="/var/www/corvicac/backups"
PM2_ENV="production"
HEALTH_URL="http://localhost:3000/_health"
MAX_RETRIES=5
RETRY_DELAY=5

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root or with sudo
check_permissions() {
    if [[ $EUID -ne 0 ]]; then
        if command -v sudo &> /dev/null; then
            log_warn "This script requires root privileges. Attempting with sudo..."
            exec sudo "$0" "$@"
        else
            log_error "This script must be run as root or with sudo"
            exit 1
        fi
    fi
}

# Validate environment
validate_environment() {
    log_info "Validating rollback environment..."
    
    if [[ ! -d "$DEPLOY_DIR" ]]; then
        log_error "Deployment directory not found: $DEPLOY_DIR"
        exit 1
    fi
    
    if [[ ! -d "$BACKUP_DIR" ]]; then
        log_warn "Backup directory not found. Creating..."
        mkdir -p "$BACKUP_DIR"
    fi
    
    if ! command -v pm2 &> /dev/null; then
        log_error "PM2 is not installed"
        exit 1
    fi
    
    log_info "Environment validation passed"
}

# Check health of current deployment
check_health() {
    local retries=0
    while [[ $retries -lt $MAX_RETRIES ]]; do
        if curl -sf --max-time 5 "$HEALTH_URL" > /dev/null 2>&1; then
            return 0
        fi
        retries=$((retries + 1))
        if [[ $retries -lt $MAX_RETRIES ]]; then
            log_warn "Health check failed. Retrying in ${RETRY_DELAY}s... ($retries/$MAX_RETRIES)"
            sleep $RETRY_DELAY
        fi
    done
    return 1
}

# Create emergency backup of current deployment
create_emergency_backup() {
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_path="$BACKUP_DIR/emergency_$timestamp"
    
    log_info "Creating emergency backup: $backup_path"
    
    mkdir -p "$backup_path"
    
    # Backup current deployment
    cp -r "$DEPLOY_DIR/.next" "$backup_path/" 2>/dev/null || true
    cp -r "$DEPLOY_DIR/public" "$backup_path/" 2>/dev/null || true
    cp "$DEPLOY_DIR/package.json" "$backup_path/" 2>/dev/null || true
    cp "$DEPLOY_DIR/ecosystem.config.js" "$backup_path/" 2>/dev/null || true
    cp "$DEPLOY_DIR/next.config.js" "$backup_path/" 2>/dev/null || true
    
    # Create manifest
    cat > "$backup_path/manifest.json" << EOF
{
  "timestamp": "$timestamp",
  "type": "emergency_backup",
  "app": "$APP_NAME"
}
EOF
    
    log_info "Emergency backup created: $backup_path"
    echo "$backup_path"
}

# List available backups
list_backups() {
    log_info "Available backups:"
    echo ""
    
    if [[ -d "$BACKUP_DIR" ]]; then
        ls -lah "$BACKUP_DIR" | tail -n +4
    else
        log_warn "No backup directory found"
    fi
}

# Get latest backup version
get_latest_backup() {
    local latest=$(ls -t "$BACKUP_DIR" 2>/dev/null | head -n 1)
    if [[ -z "$latest" ]]; then
        log_error "No backups found"
        exit 1
    fi
    echo "$latest"
}

# Perform rollback
perform_rollback() {
    local backup_version="${1:-}"
    
    if [[ -z "$backup_version" ]]; then
        backup_version=$(get_latest_backup)
    fi
    
    local backup_path="$BACKUP_DIR/$backup_version"
    
    if [[ ! -d "$backup_path" ]]; then
        log_error "Backup not found: $backup_path"
        log_info "Available backups:"
        ls -1 "$BACKUP_DIR" 2>/dev/null || true
        exit 1
    fi
    
    log_warn "Rolling back to: $backup_version"
    log_warn "Current deployment will be backed up as emergency backup"
    
    # Check if deployment is healthy before rollback
    if check_health; then
        log_info "Current deployment is healthy. Creating backup before rollback..."
        create_emergency_backup
    else
        log_warn "Current deployment is unhealthy. Proceeding with immediate rollback..."
    fi
    
    # Stop current deployment
    log_info "Stopping current deployment..."
    pm2 stop "$APP_NAME" 2>/dev/null || true
    pm2 delete "$APP_NAME" 2>/dev/null || true
    
    # Restore from backup
    log_info "Restoring from backup..."
    
    if [[ -d "$backup_path/.next" ]]; then
        rm -rf "$DEPLOY_DIR/.next"
        cp -r "$backup_path/.next" "$DEPLOY_DIR/"
    fi
    
    if [[ -d "$backup_path/public" ]]; then
        rm -rf "$DEPLOY_DIR/public"
        cp -r "$backup_path/public" "$DEPLOY_DIR/"
    fi
    
    if [[ -f "$backup_path/package.json" ]]; then
        cp "$backup_path/package.json" "$DEPLOY_DIR/"
    fi
    
    if [[ -f "$backup_path/ecosystem.config.js" ]]; then
        cp "$backup_path/ecosystem.config.js" "$DEPLOY_DIR/"
    fi
    
    # Start deployment
    log_info "Starting deployment..."
    cd "$DEPLOY_DIR"
    pm2 start ecosystem.config.js --env "$PM2_ENV"
    pm2 save
    
    # Wait for startup
    sleep 5
    
    # Verify health
    if check_health; then
        log_info "Rollback successful! Application is healthy."
        pm2 monit
    else
        log_error "Rollback completed but application failed health check"
        log_info "Check logs with: pm2 logs $APP_NAME"
        exit 1
    fi
}

# Show help
show_help() {
    cat << EOF
CORVICAC Web Rollback Script

Usage: $0 [backup_version]

Commands:
    -h, --help          Show this help message
    -l, --list          List available backups
    -e, --emergency     Create emergency backup of current deployment

Arguments:
    backup_version      Specific backup to restore (optional)

Examples:
    $0                              # Rollback to latest backup
    $0 20240106_120000              # Rollback to specific version
    $0 --list                       # List all available backups
    $0 --emergency                  # Create emergency backup

Rollback Process:
    1. Validates environment and permissions
    2. Checks current deployment health
    3. Creates emergency backup (if healthy)
    4. Stops current deployment
    5. Restores files from backup
    6. Restarts deployment
    7. Verifies health

EOF
}

# Main execution
main() {
    local command=""
    local backup_version=""
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                show_help
                exit 0
                ;;
            -l|--list)
                command="list"
                ;;
            -e|--emergency)
                command="emergency"
                ;;
            -*)
                log_error "Unknown option: $1"
                show_help
                exit 1
                ;;
            *)
                backup_version="$1"
                ;;
        esac
        shift
    done
    
    # Check permissions first
    check_permissions "$@"
    
    # Validate environment
    validate_environment
    
    # Execute command
    case "$command" in
        list)
            list_backups
            ;;
        emergency)
            create_emergency_backup
            ;;
        "")
            perform_rollback "$backup_version"
            ;;
    esac
}

main "$@"
