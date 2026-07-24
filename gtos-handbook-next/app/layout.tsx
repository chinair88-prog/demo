import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'GTOS Enterprise Engineering Handbook',
  description: 'The normative target architecture, implementation system, operating model, and delivery playbook for building GTOS as a secure, AI-native, globally scalable trade operating system.',
  icons: { icon: '/logo.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
