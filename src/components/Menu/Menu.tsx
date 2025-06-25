'use client';

import { useRouter } from 'next/navigation';
import { useMenu } from '@/context/MenuContext';
import { useRef } from 'react';
import MenuToggle from './MenuToggle';
import SvgMenu from './SvgMenu';
import styles from './Menu.module.css';

export default function Menu() {
  const { isMenuOpen, setIsMenuOpen, triggerPageExitAndNavigate } = useMenu();
  const router = useRouter();
  const svgMenuRef = useRef<any>(null);

  const handleMenuToggle = async () => {
    if (isMenuOpen && svgMenuRef.current && svgMenuRef.current.animateExit) {
      await svgMenuRef.current.animateExit();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSelect = async (id: string) => {
    if (svgMenuRef.current && svgMenuRef.current.animateExit) {
      await svgMenuRef.current.animateExit();
    }
    setIsMenuOpen(false);
    if (triggerPageExitAndNavigate) {
      if (id === 'home') {
        await triggerPageExitAndNavigate('/');
      } else {
        await triggerPageExitAndNavigate(`/${id}`);
      }
    } else {
      // fallback
      if (id === 'home') {
        router.push('/');
      } else {
        router.push(`/${id}`);
      }
    }
  };

  return (
    <>
      <MenuToggle isOpen={isMenuOpen} onClick={handleMenuToggle} />
      {isMenuOpen && (
        <div className={styles.menuOverlay}>
          <SvgMenu ref={svgMenuRef} onSelect={handleMenuSelect} />
        </div>
      )}
    </>
  );
}
