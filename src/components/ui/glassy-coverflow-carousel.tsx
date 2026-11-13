'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';

type CarouselCardStyle = CSSProperties & {
  '--gc-shade': number;
};

type PointerGesture = {
  pointerId: number;
  x: number;
  y: number;
  horizontal: boolean;
};

export interface GlassyCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

interface GlassyCarouselProps {
  items: GlassyCarouselItem[];
  autoPlay?: boolean;
}

const wrap = (value: number, length: number) => ((value % length) + length) % length;

export default function GlassyCarousel({ items, autoPlay = true }: GlassyCarouselProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [stageSize, setStageSize] = useState({ width: 1100, height: 460 });
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef<PointerGesture | null>(null);
  const dragFrame = useRef<number | null>(null);
  const suppressClickUntil = useRef(0);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;

    const measure = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      setStageSize((current) =>
        current.width === width && current.height === height ? current : { width, height }
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(
    () => () => {
      if (dragFrame.current !== null) cancelAnimationFrame(dragFrame.current);
    },
    []
  );

  useEffect(() => {
    if (
      !playing ||
      reducedMotion ||
      hovered ||
      focused ||
      dragging ||
      !pageVisible ||
      items.length < 2
    ) {
      return;
    }

    const timer = window.setTimeout(
      () => setIndex((current) => wrap(current + 1, items.length)),
      6000
    );
    return () => window.clearTimeout(timer);
  }, [dragging, focused, hovered, index, items.length, pageVisible, playing, reducedMotion]);

  if (items.length === 0) return null;

  const moveBy = (amount: number) => setIndex((current) => wrap(current + amount, items.length));
  const activeIndex = wrap(index, items.length);
  const active = items[activeIndex];
  const visibleCardCount = Math.min(5, items.length);
  const offsets = Array.from(
    { length: visibleCardCount },
    (_, position) => position - Math.floor(visibleCardCount / 2)
  );
  const cardWidth = Math.min(
    270,
    stageSize.width * 0.58,
    Math.max(100, (stageSize.height - 28) / 1.5)
  );
  const step = 0.78;

  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    gesture.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      horizontal: false,
    };
  };

  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start || event.pointerId !== start.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (!start.horizontal && Math.abs(deltaY) > 12 && Math.abs(deltaY) > Math.abs(deltaX)) {
      gesture.current = null;
      return;
    }

    if (!start.horizontal && Math.abs(deltaX) > 8) {
      start.horizontal = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }

    if (start.horizontal) {
      const nextDrag = Math.max(-1.2, Math.min(1.2, deltaX / (cardWidth * step)));
      if (dragFrame.current !== null) cancelAnimationFrame(dragFrame.current);
      dragFrame.current = requestAnimationFrame(() => {
        dragFrame.current = null;
        setDrag(nextDrag);
      });
    }
  };

  const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start || event.pointerId !== start.pointerId) return;

    gesture.current = null;
    if (dragFrame.current !== null) {
      cancelAnimationFrame(dragFrame.current);
      dragFrame.current = null;
    }

    if (start?.horizontal) {
      const deltaX = event.clientX - start.x;
      if (Math.abs(deltaX) > 40) moveBy(deltaX < 0 ? 1 : -1);
      suppressClickUntil.current = performance.now() + 300;
    }
    setDrag(0);
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const pointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (gesture.current?.pointerId !== event.pointerId) return;

    gesture.current = null;
    if (dragFrame.current !== null) {
      cancelAnimationFrame(dragFrame.current);
      dragFrame.current = null;
    }
    setDrag(0);
    setDragging(false);
  };

  return (
    <section
      className="relative isolate grid h-[min(82svh,900px)] min-h-[560px] w-full grid-rows-[88px_minmax(0,1fr)_auto] overflow-hidden bg-background pb-7 text-foreground sm:min-h-[620px]"
      aria-label="Phim nổi bật"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setFocused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          moveBy(1);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          moveBy(-1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          setIndex(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          setIndex(items.length - 1);
        }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_44%,color-mix(in_srgb,var(--primary)_14%,var(--background)),transparent_68%)]"
        aria-hidden="true"
      />
      <div
        ref={stage}
        className="relative row-start-2 flex min-h-0 touch-pan-y items-center justify-center [perspective:1100px] [transform-style:preserve-3d]"
        data-dragging={dragging || undefined}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerCancel}
      >
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-9 w-[min(600px,80vw)] -translate-x-1/2 rounded-[50%] bg-foreground/30 blur-xl"
          aria-hidden="true"
        />
        {offsets.map((offset) => {
          const item = items[wrap(activeIndex + offset, items.length)];
          const position = offset + drag;
          const distance = Math.abs(position);
          const style: CarouselCardStyle = {
            width: `${cardWidth}px`,
            transform: `translate3d(calc(-50% + ${position * cardWidth * step}px), -50%, ${-Math.min(distance, 3) * 130}px) rotateY(${Math.max(-42, Math.min(42, position * -30))}deg) scale(${1 - Math.min(distance, 3) * 0.08})`,
            opacity: 1,
            zIndex: 10 - Math.abs(offset),
            pointerEvents: 'auto',
            '--gc-shade': Math.min(distance, 2) * 0.19,
          };

          return (
            <button
              key={`${item.id}-${offset}`}
              type="button"
              className={`absolute top-1/2 left-1/2 block cursor-pointer rounded-[14px] border border-border bg-card p-1.5 text-left text-card-foreground shadow-[inset_0_1px_0_color-mix(in_srgb,var(--foreground)_8%,transparent),0_18px_32px_color-mix(in_srgb,var(--foreground)_40%,transparent)] outline-offset-4 duration-700 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none ${
                dragging ? 'transition-none' : 'transition-[transform,opacity]'
              }`}
              data-active={offset === 0 || undefined}
              aria-label={offset === 0 ? `Xem phim ${item.title}` : `Chọn phim ${item.title}`}
              aria-current={offset === 0 ? 'true' : undefined}
              onClick={() => {
                if (performance.now() < suppressClickUntil.current) return;
                moveBy(offset);
              }}
              style={style}
            >
              <span className="relative block aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.image}
                  alt={`Áp phích phim ${item.title}`}
                  fill
                  sizes="(max-width: 640px) 58vw, 270px"
                  className="object-cover"
                  draggable={false}
                  preload={offset === 0}
                />
                <span
                  className="absolute inset-0 bg-black/70 opacity-[var(--gc-shade)] transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </button>
          );
        })}
      </div>
      <div className="relative z-10 row-start-3 flex flex-col items-center gap-4 px-5 pt-3">
        <div className="min-h-[58px] max-w-full text-center">
          <h1 className="mb-2 text-2xl leading-tight font-medium tracking-tight text-balance sm:text-[26px]">
            {active.title}
          </h1>
          <p className="text-xs leading-relaxed text-muted-foreground">{active.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-border bg-card/90 py-1.5 pr-2 pl-4 shadow-lg backdrop-blur-xl">
          <span
            className="flex items-center gap-1.5 border-r border-border pr-3.5 text-[11px] text-muted-foreground tabular-nums"
            aria-hidden="true"
          >
            <span className="text-foreground">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(items.length).padStart(2, '0')}</span>
          </span>
          <div className="flex items-center gap-1" role="group" aria-label="Điều khiển carousel">
            <button
              type="button"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none"
              onClick={() => moveBy(-1)}
              aria-label="Phim trước"
              disabled={items.length < 2}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-foreground/10 transition-colors hover:bg-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none"
              onClick={() => setPlaying((current) => !current)}
              aria-label={playing ? 'Tạm dừng tự động chuyển phim' : 'Tự động chuyển phim'}
              aria-pressed={playing}
              disabled={reducedMotion || items.length < 2}
            >
              {playing ? (
                <Pause className="size-3.5 fill-current" />
              ) : (
                <Play className="size-3.5 fill-current" />
              )}
            </button>
            <button
              type="button"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none"
              onClick={() => moveBy(1)}
              aria-label="Phim tiếp theo"
              disabled={items.length < 2}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
        <Link
          href={active.href}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
        >
          Xem phim
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
