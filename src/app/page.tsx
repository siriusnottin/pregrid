import HeroSection from "@/components/sections/HeroSection";
import styles from "./page.module.css";
import AboutSection from "@/components/sections/AboutSection";
import KubistPolygons from "@/components/ui/KubistPolygons";
import LieuSection from "@/components/sections/Lieu/LieuSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <KubistPolygons />
        <AboutSection />
        <KubistPolygons />
        <LieuSection />
        <KubistPolygons />
      </main>
    </div>
  );
}
