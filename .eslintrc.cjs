module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Reglas estrictas para todo el proyecto - Solución definitiva
    '@typescript-eslint/no-explicit-any': 'error',
    'react/jsx-key': 'error',
    'react/no-unused-prop-types': 'warn',
    
    // Reglas de accesibilidad
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    
    // Reglas de rendimiento para Hostinger
    'react/jsx-key': 'error',
    'react/no-unused-prop-types': 'warn',
    
    // Reglas de seguridad
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSTypeAnnotation[TypeAnnotation.type="TSAnyKeyword"]',
        message: 'No se permite "any" excepto en casos específicos documentados. Ver documentación en ADVANCED_INVESTIGATION.md'
      }
    ]
  },
  overrides: [
    {
      files: ['src/components/VoiceAssistant.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-restricted-syntax': 'off'
      }
    },
    {
      files: ['src/lib/**/*.ts', 'src/lib/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error', // Más estricto en librerías
      }
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Permitir any en tests
      }
    }
  ],
};