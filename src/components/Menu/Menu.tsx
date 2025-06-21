'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuToggle from './MenuToggle';
import SvgMenu from './SvgMenu';
import styles from './Menu.module.css';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSelect = (id: string) => {
    setIsMenuOpen(false);
    
    if (id === 'home') {
      router.push('/');
    } else {
      router.push(`/${id}`);
    }
  };

  return (
    <>
      <MenuToggle
        isOpen={isMenuOpen}
        onClick={handleMenuToggle}
      />
      {isMenuOpen && (
        <div className={styles.menuOverlay}>
          <SvgMenu onSelect={handleMenuSelect} />
        </div>
      )}
    </>
  );
}
