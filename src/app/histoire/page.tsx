import Heading from '@/components/ui/Heading';
import styles from './page.module.css';
import Image from 'next/image';
import gridStyles from '@/styles/grid.module.css';

export default function HistoirePage() {
  return (
    <>
      <Heading as="h1" className={styles.histoireHeading}>
        HISTOIRE
      </Heading>
      <div className={styles.histoireContent}>
        <section className={gridStyles.grid}>
          <div className={styles.textContainer}>
            <p>
              Free Grid n’est pas un musée comme les autres. C’est un espace éclaté, un terrain de
              jeu pour les formes libres et les esprits curieux. Ici, chaque fragment, chaque
              triangle, chaque ombre raconte une histoire.
            </p>
            <p>
              Plongez dans un univers où la grille se brise, où les repères se déplacent, et où
              l’art devient une énigme à reconstituer.
            </p>
            <p>
              Entre illusions géométriques et compositions déconstruites, Free Grid vous invite à
              explorer l’esthétique du chaos maîtrisé. Un lieu où la rigueur de la ligne rencontre
              la liberté du trait.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image src="/images/image 6.jpg" alt="Histoire artwork 6" width={562} height={694} />
          </div>
        </section>
        <section className={gridStyles.grid}>
          <div className={styles.imageContainer}>
            <Image src="/images/image 6.jpg" alt="Histoire artwork 6" width={562} height={694} />
          </div>
          <div className={styles.textContainer}>
            <p>
              Fondé en 1981 par l’architecte visionnaire Lucien Delmas, Free Grid est né d’une
              obsession : casser la symétrie pour mieux libérer la perception.
              <br />
              D’abord simple galerie expérimentale, il devient rapidement un repère d’artistes
              marginaux, de plasticiens numériques, de designers anti-conformistes.
            </p>
            <p>
              En 2003, une rénovation totale transforme le musée : couloirs triangulés, salles sans
              angles droits, murs qui pivotent.  Chaque salle est un puzzle, chaque œuvre un éclat.
            </p>
            <p>
              Aujourd’hui, Free Grid est un manifeste vivant. Il ne s’observe pas, il se vit, se
              traverse, se découvre à travers des quizz interactifs, des galeries mouvantes et des
              parcours à multiples lectures.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
