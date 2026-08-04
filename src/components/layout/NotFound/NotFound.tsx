import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlitchText from './GlitchText';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="relative select-none">
        <GlitchText className="tracking-[0.15em]" enableOnHover={false} enableShadows speed={1}>
          404
        </GlitchText>
      </div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">NOT FOUND</h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        This page doesn&apos;t exist, but you found it anyway. Unfortunately, there&apos;s nothing
        here — just empty space and broken dreams.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button size="lg" className="cursor-pointer px-4">
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}
