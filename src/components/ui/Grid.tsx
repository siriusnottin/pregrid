import styles from './Grid.module.css';

export default function Grid() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className={styles.gridItem}></div>
      ))}
    </div>
  );
}
