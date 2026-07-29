'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Khung chứa danh sách
export function StaggerContainer({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06, // Khoảng thời gian cách nhau giữa các item
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Bọc từng phần tử bên trong danh sách
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)', scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          transition: {
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
