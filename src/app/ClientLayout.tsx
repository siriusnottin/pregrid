'use client';

import Grid from '@/components/ui/Grid';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <Grid />}
      <Header />
      {children}
      <Footer />
    </>
  );
}
