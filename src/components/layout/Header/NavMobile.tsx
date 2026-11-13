'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { NavBar, type NavBarItem } from '@/components/ui/tubelight-navbar';
import {
  CircleEllipsis,
  Clapperboard,
  Headset,
  House,
  Info,
  Search,
  Shield,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SearchDialog from './SearchDialog';

const MORE_ITEMS = [
  { label: 'Giới thiệu', href: '/about', icon: <Info aria-hidden="true" /> },
  { label: 'Liên hệ', href: '/contact', icon: <Headset aria-hidden="true" /> },
  { label: 'FAQ', href: '/faq', icon: <Shield aria-hidden="true" /> },
];

export default function NavMobile() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMoreActive = MORE_ITEMS.some((item) => pathname.startsWith(item.href));

  const items: NavBarItem[] = [
    {
      name: 'search',
      ariaLabel: 'Tìm kiếm phim',
      icon: Search,
      onClick: () => setSearchOpen(true),
    },
    {
      name: 'home',
      ariaLabel: 'Trang chủ',
      url: '/',
      icon: House,
      active: pathname === '/',
    },
    {
      name: 'movies',
      ariaLabel: 'Phim',
      url: '/movies',
      icon: Clapperboard,
      active: pathname.startsWith('/movies'),
    },
    {
      name: 'login',
      ariaLabel: 'Đăng nhập',
      url: '/login',
      icon: User,
      active: pathname.startsWith('/login'),
    },
    {
      name: 'more',
      ariaLabel: moreOpen ? 'Đóng menu thêm' : 'Mở menu thêm',
      icon: CircleEllipsis,
      active: moreOpen || isMoreActive,
      onClick: () => setMoreOpen((isOpen) => !isOpen),
    },
  ];

  return (
    <>
      <NavBar items={items} className="w-full justify-between sm:w-fit sm:gap-2" />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} hideTrigger />

      <Drawer open={moreOpen} onOpenChange={setMoreOpen} showSwipeHandle>
        <DrawerContent className="max-h-[min(70dvh,32rem)] border-border bg-background/95 shadow-2xl backdrop-blur-xl">
          <DrawerHeader className="px-5 pt-5 pb-3 text-left">
            <DrawerTitle className="font-heading text-lg font-bold">Khám phá thêm</DrawerTitle>
            <DrawerDescription>Thông tin và hỗ trợ về DANFLIX</DrawerDescription>
          </DrawerHeader>
          <nav aria-label="Điều hướng bổ sung" className="grid gap-2 px-4 pb-5">
            {MORE_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMoreOpen(false)}
                  className={`flex min-h-14 items-center gap-3 rounded-xl border px-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none ${
                    isActive
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-border/70 bg-card/60 text-foreground hover:border-primary/30 hover:bg-accent'
                  }`}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5 ${
                      isActive ? 'bg-primary/15' : 'bg-muted'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </DrawerContent>
      </Drawer>
    </>
  );
}
