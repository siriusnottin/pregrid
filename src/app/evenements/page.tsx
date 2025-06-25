import Heading from '@/components/ui/Heading';
import gridStyles from '@/styles/grid.module.css';
import styles from './page.module.css';
import EventCard, {EventCard as Event} from './EventCard';


export default function EventsPage() {
  const events: Event[] = [
    {
      id: 1,
      title: 'Rencontre avec le cubisme',
      date: 'Samedi 22 juin',
      time: '18h',
      type: 'Live Q&A',
      description:
        "Une session live avec la commissaire de l'exposition qui vous dévoile les coulisses de la scénographie, les choix des œuvres et les secrets cachés des tableaux. Interagissez en direct, posez vos questions !",
    },
    {
      id: 2,
      title: 'Crée ton autoportrait cubiste',
      date: 'Mercredi 26 juin',
      time: '17h',
      type: 'Atelier digital',
      description:
        'Un atelier interactif animé par une illustratrice : découpe, superpose, déforme, et donne vie à ton propre visage façon Picasso ! Un lien vers un outil de dessin en ligne sera fourni.',
      btnText: "Participer à l'atelier",
    },
    {
      id: 3,
      title: 'Le Cubisme dans la culture pop',
      date: 'Jeudi 4 juillet',
      time: '19h',
      type: 'Live audio',
      description:
        'Une émission audio en direct pour explorer comment le cubisme influence les pochettes d’albums, les clips et les jeux vidéo.Invité spécial : un designer de jeux vidéo indépendant.',
      btnText: 'écouter en direct',
    },
  ];

  return (
    <>
      <Heading as="h1" className={styles.eventsHeading}>
        EVENT
      </Heading>
      <div className={`${styles.eventsList} ${gridStyles.grid}`}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} className={styles.eventCard} />
        ))}
      </div>
    </>
  );
}
