'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function PageTransition({ children, routeKey }: { children: ReactNode; routeKey?: string }) {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
