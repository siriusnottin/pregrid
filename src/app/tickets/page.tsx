import styles from './page.module.css';
import gridStyles from '@/styles/grid.module.css';
import Heading from '@/components/ui/Heading';
import Ticket from '@/components/ui/Ticket';

export default function TicketsPage() {

  const tickets = [
    {
      id: 1,
      title: 'Visite Libre – Exposition Cubisme Fragmenté',
      color: '#C73D29',
      btnColor: '#EC9237',
      datetime: 'Mardi 22 juillet 2025 – 14h00',
      salle: 'Salle 1 – “Prismes”',
      price: 12,
    },
    {
      id: 2,
      title: 'Atelier : Peindre avec des Formes Libres',
      color: '#EC9237',
      btnColor: '#49A5AA',
      datetime: 'Jeudi 24 juillet 2025 – 16h00',
      salle: 'Atelier 3 – Cour intérieure',
      price: 18,
    },
    {
      id: 3,
      title: 'Visite Guidée Nocturne – Lumières et Ombres du Cubisme',
      color: '#49A5AA',
      btnColor: '#EFC66B',
      datetime: 'Samedi 26 juillet 2025 – 20h00',
      salle: 'Parcours principal – Départ Hall central',
      price: 15,
    },
    {
      id: 4,
      title: 'Conférence : La Grille comme Révolte Visuelle',
      color: '#EFC66B',
      btnColor: '#C73D29',
      datetime: 'Dimanche 27 juillet 2025 – 11h30',
      salle: 'Salle Conférence – Niv. -1',
      price: 9,
    },
  ];

  return (
    <>
      <Heading as="h1" className={styles.ticketsHeading}>
        TICKETS
      </Heading>
      <section className={`${gridStyles.grid} ${styles.ticketsSection}`}>
        <div className={styles.ticketsContainer}>
          {tickets.map(ticket => (
            <Ticket key={ticket.id} {...{ ...ticket, id: String(ticket.id) }} />
          ))}
        </div>
      </section>
    </>
  );
}
