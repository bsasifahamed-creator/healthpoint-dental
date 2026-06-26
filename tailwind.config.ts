import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        'surface-1': '#FAFBFC',
        'surface-2': '#F0F4F7',
        'surface-3': '#E5EBF0',
        teal: '#00A6A6',
        'teal-soft': '#E6F7F7',
        'teal-dim': '#0A8C8C',
        green: '#7ED321',
        'green-soft': '#F0F9E2',
        'green-dim': '#6AB31C',
        ink: '#0A0E13',
        'ink-mid': '#0F1419',
        'ink-dim': '#1F2937',
        'trust-blue': '#1E40AF',
        'warning-amber': '#F59E0B',
        stroke: 'rgba(15, 20, 25, 0.08)',
        'stroke-strong': 'rgba(15, 20, 25, 0.14)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15, 20, 25, 0.04), 0 4px 12px rgba(15, 20, 25, 0.04)',
        medium: '0 4px 12px rgba(15, 20, 25, 0.06), 0 12px 32px rgba(15, 20, 25, 0.06)',
        'card-hover':
          '0 8px 24px rgba(0, 166, 166, 0.12), 0 16px 48px rgba(15, 20, 25, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
