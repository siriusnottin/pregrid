'use client';

import { ReactNode, ElementType, Children, isValidElement, ReactElement } from 'react';
import styles from './Heading.module.css';

interface HeadingProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export default function Heading({ 
  as: Component = 'h1',
  children, 
  className = '',
}: HeadingProps) {
  const splitText = (text: string): ReactNode[] => {
    const letters = text.split('');
    return letters.map((char, index) => {
      const LetterComponent = 'span';

      return (
        <LetterComponent 
          key={index} 
          className={styles.letter}
        >
          {char === ' ' ? '\u00A0' : char}
        </LetterComponent>
      );
    });
  };

  const processChildren = (): ReactNode => {
    if (typeof children === 'string') {
      return splitText(children);
    }

    // Check for the two spans use case
    const childrenArray = Children.toArray(children);
    const spans = childrenArray.filter(child => 
      isValidElement(child) && child.type === 'span'
    );

    if (spans.length === 2) {
      return (
        <>
          {spans.map((span, index) => {
            const spanElement = span as ReactElement<{children?: ReactNode}>;
            const textContent = typeof spanElement.props.children === 'string' ? spanElement.props.children : '';

            return (
              <span 
                key={index} 
                {...spanElement.props} 
              >
                {splitText(textContent)}
              </span>
            );
          })}
        </>
      );
    }

    // For any other case, just return the children
    console.warn('Heading component expects either a string or exactly 2 span children');
    return children;
  };

  const getComponentClassName = (): string => {
    // Always include the heading class
    const baseClass = `${styles.heading} ${className}`.trim();
    
    if (typeof children === 'string') {
      return `${baseClass} ${styles.textContent}`;
    }
    
    const childrenArray = Children.toArray(children);
    const spans = childrenArray.filter(child => 
      isValidElement(child) && child.type === 'span'
    );
    
    if (spans.length === 2) {
      return `${baseClass} ${styles.dualContent}`;
    }
    
    return baseClass;
  };

  return (
    <Component className={getComponentClassName()}>
      {processChildren()}
    </Component>
  );
}
