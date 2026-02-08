import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kratestack',
  description: 'Full-stack Rust and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
