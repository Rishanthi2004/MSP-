import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom';
  amount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  amount = 0.15,
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'left':
        return {
          hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -45, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
          visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        };
      case 'up':
      default:
        return {
          hidden: { opacity: 0, y: 50, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      viewport={{ once: false, amount }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
