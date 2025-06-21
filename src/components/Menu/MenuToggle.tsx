import styles from './MenuToggle.module.css';

export default function MenuToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label="Toggle navigation menu"
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </button>
  );
}
