'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import Heading from '@/components/ui/Heading';

export default function Footer() {
  const socialLinks = [
    {
      href: "#",
      src: "/icons/socials/streamline-logos_x-twitter-logo-block.svg",
      alt: "Twitter/X"
    },
    {
      href: "#",
      src: "/icons/socials/streamline_instagram-solid.svg",
      alt: "Instagram"
    },
    {
      href: "#",
      src: "/icons/socials/tabler_brand-youtube-filled.svg",
      alt: "YouTube"
    },
    {
      href: "#",
      src: "/icons/socials/mdi_linkedin.svg",
      alt: "LinkedIn"
    }
  ];

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.geometricShapes}>
        {/* Left side shapes */}
        <div className={styles.leftShapes}>
          {/* Small red circle (Ellipse 2) */}
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 155 155" 
            fill="none" 
            className={styles.circleSmallLeft}
          >
            <circle cx="77.5" cy="77.5" r="77.5" transform="matrix(-1 0 0 1 155 0)" fill="#C73D29"/>
          </svg>
          
          {/* Teal rounded rectangle (Rectangle 26) */}
          <svg 
            width="180" 
            height="100" 
            viewBox="0 0 238 130"
            fill="none" 
            className={styles.roundedRectLeft}
          >
            <rect width="238" height="130" rx="65" transform="matrix(-1 0 0 1 238 0)" fill="#49A5AA"/>
          </svg>
        </div>

        {/* Center shapes */}
        <div className={styles.centerShapes}>
          {/* Tilted yellow rectangle (Rectangle 25) */}
          <svg 
            width="300" 
            height="200" 
            viewBox="0 0 409 283" 
            fill="none" 
            className={styles.tiltedRect}
          >
            <rect width="373.447" height="168.357" transform="matrix(-0.943327 -0.331865 -0.331865 0.943327 409 123.934)" fill="#EFC66B"/>
          </svg>
          
          {/* Orange triangle (Polygon 2) */}
          <svg 
            width="180" 
            height="180" 
            viewBox="0 0 247 250" 
            fill="none" 
            className={styles.triangle}
          >
            <path d="M246.905 0.230425L0.812358 72.3386L186.306 249.407L246.905 0.230425Z" fill="#EC9237"/>
          </svg>
        </div>

        {/* Right side shapes */}
        <div className={styles.rightShapes}>
          {/* Medium red circle (Ellipse 3) */}
          <svg 
            width="140" 
            height="140" 
            viewBox="0 0 211 211" 
            fill="none" 
            className={styles.circleMedium}
          >
            <circle cx="105.5" cy="105.5" r="105.5" transform="matrix(-1 0 0 1 211 0)" fill="#C73D29"/>
          </svg>
          
          {/* Yellow square (Rectangle 24) */}
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 157 153" 
            fill="none" 
            className={styles.squareYellow}
          >
            <rect width="157" height="153" transform="matrix(-1 0 0 1 157 0)" fill="#EFC66B"/>
          </svg>
          
          {/* Teal blob (Rectangle 27) */}
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 307 289" 
            fill="none" 
            className={styles.blobTeal}
          >
            <path d="M278.352 234.436C324.876 171.99 311.969 83.6517 249.522 37.1273L237.595 28.2408C175.148 -18.2836 86.8099 -5.37632 40.2855 57.0701L-3.66108e-05 111.142L238.066 288.509L278.352 234.436Z" fill="#49A5AA"/>
          </svg>
        </div>
      </div>
      
      <Heading
        as="h1"
        className={`${styles.footerTitle} ${styles.customDualContent}`}
      >
        <span>Free</span> <span>Grid</span>
      </Heading>
      <ul className={styles.socialLinks}>
        {socialLinks.map((social, index) => (
          <li key={index} className={styles.socialLink}>
            <Link href={social.href} target="_blank" rel="noopener noreferrer">
              <Image
                src={social.src}
                alt={social.alt}
                width={24}
                height={24}
                className={styles.socialIcon}
              />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
