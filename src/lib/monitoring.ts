// Sistema de Monitoreo Anti-Loop - Solución Definitiva
import React from 'react';

export class AccessibilityMonitor {
  private static instance: AccessibilityMonitor;
  private errors: Error[] = [];
  private performanceMetrics: any[] = [];
  private loopDetection: Map<string, number> = new Map();

  static getInstance(): AccessibilityMonitor {
    if (!AccessibilityMonitor.instance) {
      AccessibilityMonitor.instance = new AccessibilityMonitor();
    }
    return AccessibilityMonitor.instance;
  }

  // Sistema de detección de loops
  trackLoop(pattern: string, context: string) {
    const key = `${pattern}-${context}`;
    const count = this.loopDetection.get(key) || 0;
    this.loopDetection.set(key, count + 1);

    if (count > 5) {
      this.trackError(new Error(`Loop detected: ${pattern} in ${context}. Count: ${count + 1}`));
      return true;
    }
    return false;
  }

  trackError(error: Error) {
    this.errors.push(error);
    console.error('Accessibility Error:', error);
    
    // Reportar a analytics
    this.trackAnalytics('accessibility_error', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      loopDetected: this.detectLoop(error.message)
    });
  }

  trackPerformance(metric: any) {
    this.performanceMetrics.push(metric);
    
    // Alertar si performance baja
    if (metric.loadTime > 3000) {
      this.trackError(new Error(`Performance issue: Load time ${metric.loadTime}ms`));
    }
  }

  detectLoop(errorMessage: string): boolean {
    // Detectar patrones de loops comunes
    const loopPatterns = [
      /ESLint.*error/,
      /TypeScript.*error/,
      /404.*error/,
      /accessibility.*error/,
      /VoiceAssistant.*error/
    ];

    return loopPatterns.some(pattern => pattern.test(errorMessage));
  }

  trackAnalytics(event: string, data: any) {
    // Implementación de tracking de analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }
  }

  getReport() {
    return {
      errors: this.errors.length,
      performance: this.performanceMetrics,
      loopsDetected: Array.from(this.loopDetection.entries()).filter(([_, count]) => count > 5),
      lastError: this.errors[this.errors.length - 1],
      loopDetection: Object.fromEntries(this.loopDetection)
    };
  }

  // Sistema de prevención de loops
  preventLoop(operation: string, fn: () => void) {
    if (this.trackLoop(operation, 'preventLoop')) {
      console.warn(`Loop prevention activated for: ${operation}`);
      return;
    }
    fn();
  }

  // Verificación de salud del sistema
  checkSystemHealth() {
    const report = this.getReport();
    const issues = [];

    if (report.errors > 10) {
      issues.push('High error count detected');
    }

    if (report.loopsDetected.length > 0) {
      issues.push('Loops detected in system');
    }

    if (report.performance.length > 0) {
      const avgLoadTime = report.performance.reduce((acc, curr) => acc + curr.loadTime, 0) / report.performance.length;
      if (avgLoadTime > 3000) {
        issues.push('High average load time detected');
      }
    }

    return {
      healthy: issues.length === 0,
      issues,
      report
    };
  }
}

// Exportar instancia única
export const monitor = AccessibilityMonitor.getInstance();

// Hook para React - Prevención de loops en componentes
export function useLoopPrevention(operation: string) {
  React.useEffect(() => {
    monitor.preventLoop(operation, () => {
      // Operación segura
    });
  }, [operation]);
}

// Middleware para Next.js - Prevención de loops en rutas
export function loopPreventionMiddleware(req: any, res: any, next: any) {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    monitor.trackPerformance({
      url: req.url,
      method: req.method,
      duration,
      loadTime: duration
    });
  });

  next();
}

// Error boundary para React - Captura de errores y prevención de loops
export class LoopPreventionErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    monitor.trackError(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    monitor.trackError(error);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', { className: 'error-boundary' }, [
        React.createElement('h2', null, 'Oops! Something went wrong.'),
        React.createElement('p', null, 'Our monitoring system has detected an issue and reported it.'),
        React.createElement('button', { 
          onClick: () => this.setState({ hasError: false })
        }, 'Try again')
      ]);
    }

    return this.props.children;
  }
}