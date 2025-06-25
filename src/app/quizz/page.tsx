import gridStyles from '@/styles/grid.module.css';
import styles from './page.module.css';
import Heading from '@/components/ui/Heading';
import QuizSVGWrapper from './components/QuizSVGWrapper';

export default function QuizPage() {
  return (
    <>
      <Heading as="h1" className={styles.heading}>
        Quizz
      </Heading>
      <section className={`${styles.quizSection} ${gridStyles.grid}`}>
          <QuizSVGWrapper />
      </section>
    </>
  );
}
