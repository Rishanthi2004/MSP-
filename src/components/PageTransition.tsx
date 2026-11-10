import React from 'react';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  variant?: 'cinematic' | 'slide3D' | 'fadeScale' | 'curtain';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  pageKey,
  variant = 'cinematic',
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'slide3D':
        return {
          initial: { opacity: 0, rotateY: 8, scale: 0.98, x: 20 },
          animate: { opacity: 1, rotateY: 0, scale: 1, x: 0 },
          exit: { opacity: 0, rotateY: -8, scale: 0.98, x: -20 },
        };
      case 'fadeScale':
        return {
          initial: { opacity: 0, scale: 0.97, y: 15 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 1.02, y: -15 },
        };
      case 'curtain':
        return {
          initial: { opacity: 0, y: 25 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -25 },
        };
      case 'cinematic':
      default:
        return {
          initial: { opacity: 0, filter: 'blur(6px)', y: 12 },
          animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
          exit: { opacity: 0, filter: 'blur(4px)', y: -12 },
        };
    }
  };

  return (
    <motion.div
      key={pageKey}
      variants={getVariants()}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1], // Smooth settling curve
      }}
      className="w-full relative"
    >
      {/* Subtle top gold foil page sweep line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0.8 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DFBE76] to-transparent z-50 origin-left pointer-events-none"
      />
      {children}
    </motion.div>
  );
};
