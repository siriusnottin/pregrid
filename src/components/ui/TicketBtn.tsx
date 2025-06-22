import styles from './Ticket.module.css';

export default function TicketBtn({
  title = 'Buy',
  color = '#C73D29'
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button 
      className={styles.ticketBtn} 
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
