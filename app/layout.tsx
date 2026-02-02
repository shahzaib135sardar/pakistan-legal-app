// app/layout.tsx

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'پاک قانون | Pakistan Legal Information',
  description:
    'AI-powered legal information platform for Pakistan. Get information about tenant disputes, salary issues, FIR process, loans, and inheritance law.',
  keywords: [
    'Pakistan law',
    'Legal information',
    'Tenant rights',
    'Labor law',
    'FIR',
    'Loans',
    'Inheritance',
    'Urdu',
  ],
  authors: [{ name: 'Pakistan Legal Info' }],
  openGraph: {
    title: 'پاک قانون | Pakistan Legal Information',
    description: 'AI-powered legal information platform for Pakistan',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-neutral-light">
        <div className="flex flex-col min-h-screen">
          {/* Header will be added by client-side wrapper */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
