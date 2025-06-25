'use client';

import Grid from '@/components/ui/Grid';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { MenuProvider } from '@/context/MenuContext';
import PageTransition from '@/components/PageTransition';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MenuProvider>
      {process.env.NODE_ENV === 'development' && <Grid />}
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </MenuProvider>
  );
}
