#!/usr/bin/env node

/**
 * CORVICAC Custom Server Entry Point
 * 
 * This script ensures explicit IPv4 binding (0.0.0.0) for the Next.js server.
 * It provides fail-fast diagnostics and explicit logging for connection issues.
 */

import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const hostname = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

// Validate port
if (isNaN(port) || port < 1 || port > 65535) {
  console.error(`❌ FATAL: Invalid PORT environment variable: "${process.env.PORT}"`);
  console.error('   PORT must be a number between 1 and 65535');
  process.exit(1);
}

// Validate hostname
const validHosts = ['0.0.0.0', '127.0.0.1', 'localhost', '::'];
if (!validHosts.includes(hostname)) {
  console.warn(`⚠️  WARNING: Unusual HOST value: "${hostname}"`);
  console.warn('   Recommended values: 0.0.0.0 (all interfaces) or 127.0.0.1 (localhost only)');
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║           CORVICAC Web Server - Hardened Startup           ║');
console.log('╠════════════════════════════════════════════════════════════╣');
console.log(`║  Environment: ${dev ? 'DEVELOPMENT' : 'PRODUCTION'.padEnd(39)}║`);
console.log(`║  Host:       ${hostname.padEnd(47)}║`);
console.log(`║  Port:       ${port.toString().padEnd(47)}║`);
console.log(`║  Binding:    IPv4 (${hostname === '0.0.0.0' ? 'all interfaces' : hostname})`.padEnd(48) + '║');
console.log('╠════════════════════════════════════════════════════════════╣');
console.log('║  Preparing server...                                        ║');

app.prepare()
  .then(() => {
    console.log('║  Server prepared successfully                               ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  Server will listen on:                                     ║');
    
    const interfaces = [
      `http://localhost:${port}`,
      `http://127.0.0.1:${port}`,
    ];
    
    if (hostname === '0.0.0.0') {
      interfaces.push(`http://[TU-IP-LOCAL]:${port}`);
    }
    
    interfaces.forEach(url => {
      console.log(`║    • ${url.padEnd(46)}║`);
    });
    
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║  Health check: http://localhost:3000/api/health            ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('❌ Error handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    })
      .once('error', (err) => {
        console.error('❌ FATAL: Server failed to bind');
        console.error(`   Error: ${err.message}`);
        console.error(`   Code: ${err.code}`);
        
        if (err.code === 'EADDRINUSE') {
          console.error('');
          console.error('   The port is already in use.');
          console.error('   To fix:');
          console.error('     1. Kill existing Node processes: taskkill /F /IM node.exe');
          console.error('     2. Or change port: set PORT=3001 && node server.js');
        } else if (err.code === 'EACCES') {
          console.error('');
          console.error('   Permission denied to bind to this port.');
          console.error('   On Windows, this usually means another process is using it.');
        }
        
        process.exit(1);
      })
      .listen(port, hostname, () => {
        console.log(`✅ Server is READY and LISTENING on ${hostname}:${port}`);
        console.log('');
      });
  })
  .catch((err) => {
    console.error('❌ FATAL: Failed to prepare Next.js app');
    console.error(err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('⚠️  Received SIGINT, shutting down gracefully...');
  process.exit(0);
});
