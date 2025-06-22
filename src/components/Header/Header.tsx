'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { Menu } from '@/components/Menu';

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink} aria-label="Free Grid Home" title="Free Grid Home">
          <Image
            src="/logo.svg"
            alt="Free Grid logo: stylized cubic letter F"
            width={51}
            height={51}
            priority
          />
        </Link>
      </div>
      <Menu />
    </header>
  );
}
