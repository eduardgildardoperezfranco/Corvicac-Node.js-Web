/**
 * Shared hooks module
 * This file intentionally exports a typed placeholder
 * to satisfy Next.js + TypeScript production builds.
 * Real hooks can be added incrementally without breaking builds.
 */

export type PlaceholderHook = () => void;

export const usePlaceholder: PlaceholderHook = () => {
  // no-op
};
