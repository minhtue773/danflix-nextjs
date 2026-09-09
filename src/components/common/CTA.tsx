'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CTAProps = {
  className?: string;
};

const CTA = ({ className }: CTAProps) => {
  const ref = useRef(null);

  const bottomAnimation = {
    initial: { y: '5%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div
          ref={ref}
          className="relative isolate flex min-h-96 items-center justify-center overflow-hidden rounded-3xl border border-border px-6 before:absolute before:top-24 before:-z-10 before:h-4/5 before:w-full before:rounded-full before:bg-linear-to-r before:from-sky-100 before:from-15% before:via-white before:via-55% before:to-amber-100 before:to-90% before:blur-3xl dark:before:-z-10 dark:before:rounded-full dark:before:from-sky-400/10 dark:before:from-40% dark:before:via-black dark:before:via-55% dark:before:to-amber-300/10 dark:before:to-60%"
        >
          <div className="absolute inset-0 z-10">
            <Image
              src={'/assets/images/2.jpg'}
              alt="Ảnh CTA"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-xs" />
          </div>
          <motion.div
            {...bottomAnimation}
            className="z-20 mx-auto flex flex-col items-center gap-6"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-2xl font-medium md:text-5xl">
                Thế giới điện ảnh đỉnh cao trong tầm tay
              </h2>
              <p className="mx-auto max-w-2xl text-sm md:text-base">
                Thỏa sức bùng nổ cảm xúc với hàng ngàn bộ phim bom tấn chất lượng 4K. Trải nghiệm
                mượt mà, không quảng cáo — xem mọi lúc, mọi nơi!
              </p>
            </div>
            <Link href={'/movies'}>
              <Button className="group relative h-12 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium transition-all duration-500 hover:bg-primary/80 hover:ps-14 hover:pe-6">
                <span className="relative z-10 transition-all duration-500">Khám phá ngay</span>
                <div className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
