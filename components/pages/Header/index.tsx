import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import Link from 'next/link';
import Nav from './Nav';
import ButtonSearch from './ButtonSearch';

export default function Header() {
  return (
    <>
      <header className="fixed top-4 right-0 left-0 z-40">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-card/70 px-6 py-4 shadow backdrop-blur-md">
          <Link href={'/'}>
            <div className="font-heading text-3xl font-bold text-card-foreground uppercase">
              <span className="text-red-600">DAN</span>
              Flix
            </div>
          </Link>
          <Nav />
          <div className="flex items-center gap-2">
            <ButtonSearch />
            <Button size="icon-sm" variant={'ghost'}>
              <Bell className="text-card-foreground" />
            </Button>
            <Button className="rounded-md">Đăng nhập</Button>
          </div>
        </div>
      </header>
    </>
  );
}
