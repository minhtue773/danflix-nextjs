'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="w-full">
      <div className="relative flex h-[75vh] w-full items-center justify-center before:absolute before:top-24 before:-z-10 before:h-full before:w-full before:rounded-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:blur-3xl dark:before:-z-10 dark:before:rounded-full dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:blur-3xl">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="relative flex flex-col items-center gap-4 px-4 text-center sm:gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="text-4xl leading-10 font-medium md:text-7xl md:leading-18"
            >
              Thế giới điện ảnh đỉnh cao{' '}
              <span className={`tracking-tight`}>trên từng góc nhìn</span>{' '}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
              className="max-w-2xl text-sm font-normal text-muted-foreground md:text-base"
            >
              Khám phá hàng ngàn bộ phim bom tấn, phim bộ đặc sắc và phim hoạt hình vietsub chất
              lượng cao. Trải nghiệm không gian giải trí mượt mà, cập nhật liên tục mỗi ngày.{' '}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center gap-8 md:flex-row"
          >
            <Button className="group relative h-12 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium transition-all duration-500 hover:ps-14 hover:pe-6">
              <Link href={'/movies'} className="relative z-10 transition-all duration-500">
                Trải nghiệm
              </Link>
              <span className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
