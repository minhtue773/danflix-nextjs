'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateInViewProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  index?: number; // Dùng để tính stagger delay khi nằm trong danh sách
  variant?: 'fadeUp' | 'scaleUp' | 'blurIn' | 'slideRight';
}

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.92, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
  },
  blurIn: {
    initial: { opacity: 0, filter: 'blur(8px)', y: 12 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
  },
};

export function AnimateInView({
  children,
  index = 0,
  variant = 'blurIn',
  className = '',
  ...props
}: AnimateInViewProps) {
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.5,
        delay: (index % 10) * 0.06, // Hiệu ứng so le (Stagger) cực mượt
        ease: [0.21, 0.47, 0.32, 0.98], // Cubic-bezier mượt mà cao cấp
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
