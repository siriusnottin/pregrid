'use client';

import Grid from '@/components/ui/Grid';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { MenuProvider } from '@/context/MenuContext';
import PageTransition from '@/components/PageTransition';
import { useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageTransitionRef = useRef<{ animateExit: () => Promise<void> }>(null);
  const router = useRouter();

  const triggerPageExitAndNavigate = useCallback(
    async (path: string) => {
      if (pageTransitionRef.current && pageTransitionRef.current.animateExit) {
        await pageTransitionRef.current.animateExit();
      }
      router.push(path);
    },
    [router]
  );

  return (
    <MenuProvider triggerPageExitAndNavigate={triggerPageExitAndNavigate}>
      {process.env.NODE_ENV === 'development' && <Grid />}
      <Header />
      <PageTransition ref={pageTransitionRef}>{children}</PageTransition>
      <Footer />
    </MenuProvider>
  );
}
