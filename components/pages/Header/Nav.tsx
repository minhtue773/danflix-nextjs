'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Phim', href: '/movies' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="hidden items-center gap-4 md:flex md:gap-6">
      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`font-sans text-sm text-foreground capitalize transition-all duration-150 ${
              isActive
                ? 'text-red-500 underline underline-offset-6'
                : 'hover:text-muted-foreground hover:underline hover:underline-offset-6'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
