#!/usr/bin/env node

/**
 * CORVICAC Custom Server Entry Point
 * 
 * This script ensures explicit IPv4 binding (0.0.0.0) for the Next.js server.
 * It provides fail-fast diagnostics and explicit logging for connection issues.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import next from 'next';
import { parse } from 'url';

const hostname = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

// Validate port
if (isNaN(port) || port < 1 || port > 65535) {
  console.error(`❌ FATAL: Invalid PORT environment variable: "${process.env.PORT}"`);
  console.error('   PORT must be a number between 1 and 65535');
  process.exit(1);
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // --- Security and Performance Middleware ---
    // 1. Helmet: Secure apps by setting various HTTP headers
    server.use(helmet());

    // 2. CORS: Enable Cross-Origin Resource Sharing
    const corsOptions = {
      origin: process.env.CORS_ORIGIN || (dev ? '*' : 'https://corvicac.org'),
      credentials: true,
    };
    server.use(cors(corsOptions));

    // 3. Compression: Compress response bodies
    server.use(compression());
    
    // --- Request Logging Middleware (optional but recommended) ---
    server.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${res.statusCode}] ${req.method} ${req.originalUrl} - ${duration}ms`);
      });
      next();
    });

    // --- Next.js Request Handler ---
    server.all('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    });

    // --- Start Server ---
    const httpServer = server.listen(port, hostname, () => {
      console.log('╔════════════════════════════════════════════════════════════╗');
      console.log('║           CORVICAC Web Server - Hardened Startup           ║');
      console.log('╠════════════════════════════════════════════════════════════╣');
      console.log(`║  Environment: ${dev ? 'DEVELOPMENT' : 'PRODUCTION'.padEnd(39)}║`);
      console.log(`║  Host:       ${hostname.padEnd(47)}║`);
      console.log(`║  Port:       ${port.toString().padEnd(47)}║`);
      console.log(`║  CORS Origin: ${corsOptions.origin.padEnd(44)}║`);
      console.log('╠════════════════════════════════════════════════════════════╣');
      console.log('║  Server is READY and LISTENING.                             ║');
      console.log('╚════════════════════════════════════════════════════════════╝');
      console.log('');
    });

    httpServer.on('error', (err) => {
      console.error('❌ FATAL: Server failed to start');
      if (err.code === 'EADDRINUSE') {
        console.error(`   Error: Port ${port} is already in use.`);
        console.error('   Is another instance of the server already running?');
      } else {
        console.error(`   Error: ${err.message}`);
      }
      process.exit(1);
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
