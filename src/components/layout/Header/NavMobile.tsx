'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleEllipsis, Clapperboard, Headset, House, Info, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ButtonSearchMobile from './ButtonSearchMobile';

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Trang chủ', href: '/', icon: <House /> },
    { label: 'Phim', href: '/movies', icon: <Clapperboard /> },
    { label: 'Profile', href: '/profile', icon: <User /> },
  ];

  const dropdownItems = [
    { label: 'Giới thiệu', href: '/about', icon: <Info /> },
    { label: 'Liên hệ', href: '/contact', icon: <Headset /> },
    { label: 'FAQ', href: '/faq', icon: <Shield /> },
  ];

  const isDropdownActive = dropdownItems.some((item) => pathname.startsWith(item.href));

  return (
    <nav className="flex items-center justify-between gap-8 px-4">
      <div className="relative flex flex-col items-center justify-center gap-1">
        <ButtonSearchMobile />
      </div>

      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              isActive ? 'scale-125 text-red-500' : ''
            }`}
          >
            {item.icon}
          </Link>
        );
      })}

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-200 outline-none ${
                isDropdownActive ? 'scale-110 text-red-500' : ''
              }`}
            >
              <CircleEllipsis />
            </button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {dropdownItems.map((subItem) => {
              const isSubActive = pathname.startsWith(subItem.href);

              return (
                <DropdownMenuItem key={subItem.href}>
                  <Link
                    href={subItem.href}
                    className={`flex w-full items-center gap-2 ${
                      isSubActive ? 'font-medium text-red-500' : ''
                    }`}
                  >
                    {subItem.icon}
                    <span>{subItem.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
