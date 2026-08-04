import Link from 'next/link';
import Nav from './Nav';
import ButtonSearch from './ButtonSearch';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export default function HeaderDesktop() {
  return (
    <>
      {' '}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-card/70 px-6 py-4 shadow backdrop-blur-md">
        <Link href={'/'}>
          <div className="font-heading text-xl font-bold text-card-foreground uppercase md:text-3xl">
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
          <Button className="hidden rounded-md md:block">Đăng nhập</Button>
        </div>
      </div>
    </>
  );
}
