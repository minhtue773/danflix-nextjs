import Link from 'next/link';
import Nav from './Nav';
import ButtonSearch from './ButtonSearch';
import { buttonVariants } from '@/components/ui/button';

export default function HeaderDesktop() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-card/70 px-6 py-4 shadow backdrop-blur-md">
        <Link href="/" aria-label="DANFLIX - Trang chủ">
          <div className="font-heading text-xl font-bold text-card-foreground uppercase md:text-3xl">
            <span className="text-red-600">DAN</span>
            Flix
          </div>
        </Link>
        <Nav />
        <div className="flex items-center gap-2">
          <ButtonSearch />
          <Link href="/login" className={buttonVariants()}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
}
