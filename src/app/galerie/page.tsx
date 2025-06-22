import Image from "next/image";
import styles from "./page.module.css";

interface GalleryItem {
  id: number;
  path: string;
  alt: string;
}

export default function GaleriePage() {
  const galleryItems: GalleryItem[] = [
    { id: 1, path: "/images/galerie/image-1.png", alt: "Portrait artwork 1" },
    { id: 2, path: "/images/galerie/image-2.png", alt: "Portrait artwork 2" },
    { id: 3, path: "/images/galerie/image-3.png", alt: "Portrait artwork 3" },
    { id: 4, path: "/images/galerie/image-4.png", alt: "Portrait artwork 4" },
    { id: 5, path: "/images/galerie/image-5.png", alt: "Portrait artwork 5" },
    { id: 6, path: "/images/galerie/image-6.png", alt: "Portrait artwork 6" },
    { id: 7, path: "/images/galerie/image-7.png", alt: "Portrait artwork 7" },
    { id: 8, path: "/images/galerie/image-8.png", alt: "Portrait artwork 8" },
    { id: 9, path: "/images/galerie/image.png", alt: "Portrait artwork 9" },
    { id: 10, path: "/images/galerie/image 11.png", alt: "Portrait artwork 10" }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GALERIE</h1>
      
      <div className={styles.gallery}>
        {galleryItems.map((item) => (
          <div 
            key={item.id} 
            className={`${styles.imageContainer} ${styles[`item${item.id}`]}`}
          >
            <Image
              src={item.path}
              alt={item.alt}
              width={200}
              height={200}
              className={styles.image}
              priority={item.id <= 4} // Prioritize loading first images
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
            <div className={`${styles.number} ${styles[`number${item.id}`]}`}>
              {item.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
