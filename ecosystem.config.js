/**
 * PM2 Ecosystem Configuration for CORVICAC Web
 * 
 * This file ensures safe production deployment with:
 * - Restart limits to prevent infinite loops
 * - Proper memory management
 * - Environment isolation
 * - Health monitoring
 */

module.exports = {
  apps: [
    {
      name: 'corvicac-web',
      script: './.next/standalone/server.js',
      
      // Execution settings
      cwd: '.',
      interpreter: 'node',
      
      // Memory and restart limits
      max_memory_restart: '500M',
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 1000,
      
      // Exponential backoff restart delay
      exp_backoff_restart_delay: 100,
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0',
      },
      
      // Production-specific settings
      instance_var: 'INSTANCE_ID',
      
      // Logging
      log_file: '/var/log/corvicac/web.stdout.log',
      out_file: '/var/log/corvicac/web.stdout.log',
      error_file: '/var/log/corvicac/web.stderr.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Process management
      kill_timeout: 5000,
      listen_timeout: 3000,
      shutdown_with_message: true,
      
      // Clustering (for multi-core servers)
      instances: 1,  // Set to 'max' for multi-core, or specific number
      exec_mode: 'fork',
      
      // Watch (disabled for production)
      watch: false,
      
      // Autorestart (can be disabled for manual control)
      autorestart: true,
      
      // Health check
      healthcheck: {
        http_get: 'http://localhost:3000/_health',
        interval: 30000,
        timeout: 5000,
        retries: 3,
        start_period: 10000,
      },
      
      // Graceful shutdown
      kill_retry_count: 3,
      listen_timeout: 8000,
    },
  ],
  
  // Deployment configuration (for pm2-deploy)
  deploy: {
    production: {
      user: 'corvicac',
      host: 'corvicac.org',
      ref: 'origin/main',
      repo: 'git@github.com:corvicac/web.git',
      path: '/var/www/corvicac/web',
      'post-deploy': 'npm ci --only=production && npm run hardened:build && pm2 reload ecosystem.config.js --env production',
      key: '~/.ssh/corvicac-deploy-key',
      ssh_options: 'StrictHostKeyChecking=no',
    },
  },
};
