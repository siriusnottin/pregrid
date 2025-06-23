'use client';

import Image from 'next/image';
import styles from './Ticket.module.css';
import TicketBtn from './TicketBtn';

interface TicketProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  color?: string;
  btnColor?: string;
  datetime?: string;
  salle?: string;
  price?: number;
}

export default function Ticket(props: TicketProps) {
  return (
    <article className={styles.ticket}>
      <div className={styles.dotTopLeft} />
      <div className={styles.dotTopRight} />
      <div className={styles.infos} style={{ backgroundColor: props.color || '#f0f0f0' }}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.datetime}>{props.datetime}</p>
        <p className={styles.salle}>{props.salle}</p>
        <p className={styles.price}>{props.price} €</p>
        <div className={styles.dotBottomLeft} />
        <div className={styles.dotBottomRight} />
      </div>
      <div className={styles.barcode} style={{ backgroundColor: props.color || '#f0f0f0' }}>
        <Image src="/images/barcode.png" alt="Code-barres du billet" width={327} height={101} />
      </div>
      <TicketBtn title="Buy" color={props.btnColor || props.color || '#C73D29'} />
    </article>
  );
}
