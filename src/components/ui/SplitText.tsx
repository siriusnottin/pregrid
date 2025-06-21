import { ReactNode, ElementType } from 'react';
import styles from '..Header/Heading.module.css';

interface HeadingProps {
  as?: ElementType;
  text: string;
  className?: string;
  letterClassName?: string;
}

export default function Heading({ 
  as: Component = 'h1',
  text, 
  className = '', 
  letterClassName = ''
}: HeadingProps) {
  const splitText = (text: string): ReactNode[] => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`${styles.letter} ${letterClassName}`}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <Component className={className}>
      {splitText(text)}
    </Component>
  );
}
