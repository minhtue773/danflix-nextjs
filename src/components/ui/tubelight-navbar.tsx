'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

export type NavBarItem = {
  name: string;
  icon: LucideIcon;
  ariaLabel: string;
  active?: boolean;
} & ({ url: string; onClick?: never } | { url?: never; onClick: () => void });

interface NavBarProps {
  items: NavBarItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  return (
    <nav
      aria-label="Điều hướng chính"
      className={cn(
        'pointer-events-auto mx-auto flex w-fit max-w-full items-center gap-1 rounded-full border border-border/70 bg-background/80 p-1.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-2xl supports-[backdrop-filter]:bg-background/65',
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const classNames = cn(
          'relative flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none',
          item.active && 'text-primary'
        );
        const content = (
          <>
            {item.active && (
              <motion.span
                layoutId="tubelight-active"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-primary/10"
                initial={false}
                transition={{ type: 'spring', stiffness: 360, damping: 32 }}
              >
                <span className="absolute -top-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_2px_color-mix(in_srgb,var(--primary)_70%,transparent)]" />
              </motion.span>
            )}
            <Icon className="relative z-10 size-5" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{item.ariaLabel}</span>
          </>
        );

        if (item.url) {
          return (
            <Link
              key={item.name}
              href={item.url}
              aria-label={item.ariaLabel}
              aria-current={item.active ? 'page' : undefined}
              className={classNames}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={item.name}
            type="button"
            aria-label={item.ariaLabel}
            aria-pressed={item.active}
            onClick={item.onClick}
            className={classNames}
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}
