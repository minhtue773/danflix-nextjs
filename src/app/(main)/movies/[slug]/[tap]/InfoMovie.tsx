'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MovieEpisode, MoviePhimapi, MovieEpisodeServerData } from '@/types/movie';
import NetflixVideoPlayer from './NetflixVideoPlayer';

interface InfoMovieProps {
  movie: MoviePhimapi;
  episodes: MovieEpisode[];
  movieSlug: string;
  currentTapSlug: string;
}

export default function InfoMovie({ movie, episodes, movieSlug, currentTapSlug }: InfoMovieProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  // 1. Quản lý Server State
  const [currentServerIndex, setCurrentServerIndex] = useState<number>(0);
  const hasEpisodes = Array.isArray(episodes) && episodes.length > 0;
  const currentServer = hasEpisodes ? episodes[currentServerIndex] : null;
  const serverData = useMemo(() => currentServer?.server_data || [], [currentServer]);
  const totalEpisodes = serverData.length;

  // 2. Chuẩn hóa & Tìm tập hiện tại chuẩn xác
  const activeEpisodeIndex = useMemo(() => {
    if (!serverData.length) return 0;

    const normalizedCurrent = decodeURIComponent(currentTapSlug).toLowerCase().trim();

    const index = serverData.findIndex((item) => {
      const slug = item.slug?.toString().toLowerCase().trim();
      const name = item.name?.toString().toLowerCase().trim();
      return (
        slug === normalizedCurrent ||
        name === normalizedCurrent ||
        `tap-${slug}` === normalizedCurrent ||
        `tap-${name}` === normalizedCurrent
      );
    });

    return index !== -1 ? index : 0;
  }, [serverData, currentTapSlug]);

  // 1. Tạo ref cho nút tập phim đang active
  const activeEpisodeRef = useRef<HTMLAnchorElement | null>(null);

  // 2. Tự động cuộn đến tập active mỗi khi `activeEpisodeIndex` thay đổi
  useEffect(() => {
    if (activeEpisodeRef.current) {
      activeEpisodeRef.current.scrollIntoView({
        behavior: 'smooth', // Cuộn mượt mà
        block: 'nearest', // Cuộn đến vị trí gần nhất trong khung scroll
        inline: 'nearest',
      });
    }
  }, [activeEpisodeIndex]);

  const currentSrc: MovieEpisodeServerData | undefined = serverData[activeEpisodeIndex];

  // 3. Helper Tạo Link Tập Phim (Có kèm query server nếu không phải server 0)
  const getEpisodeUrl = (targetSlug?: string, serverIdx = currentServerIndex) => {
    if (!targetSlug) return `/movies/${movieSlug}`;
    const baseUrl = `/movies/${movieSlug}/${targetSlug}`;
    return serverIdx > 0 ? `${baseUrl}?server=${serverIdx}` : baseUrl;
  };

  // 4. Scroll mượt lên video player khi chọn tập
  const handleScrollToPlayer = () => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!hasEpisodes) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400 backdrop-blur-sm">
        <p className="text-base font-medium">
          Bản phim này hiện chưa có tập nào hoặc đã được gỡ. Xin lỗi vì sự bất tiện này!
        </p>
      </div>
    );
  }

  const isFirstEpisode = activeEpisodeIndex === 0;
  const isLastEpisode = activeEpisodeIndex === totalEpisodes - 1;

  const prevEpisode = !isFirstEpisode ? serverData[activeEpisodeIndex - 1] : null;
  const nextEpisode = !isLastEpisode ? serverData[activeEpisodeIndex + 1] : null;

  return (
    <div className="space-y-6">
      {/* Video Player Section */}
      <div ref={playerRef} className="scroll-mt-6">
        <NetflixVideoPlayer
          key={`${currentServerIndex}-${currentSrc?.slug || activeEpisodeIndex}`}
          movieId={`${movieSlug}_tap_${currentTapSlug || '1'}`}
          src={currentSrc?.link_m3u8}
          poster={movie?.thumb_url || movie?.poster_url}
          title={currentSrc?.name ? `${movie?.name} - ${currentSrc.name}` : movie?.name}
        />
      </div>

      {/* Quick Navigation Bar: Tập Trước / Tập Tiếp */}
      <div className="flex items-center justify-between gap-3 rounded-xl border bg-accent p-3 backdrop-blur-md">
        {/* Nút Tập Trước */}
        {isFirstEpisode || !prevEpisode ? (
          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold text-white/30"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Tập trước</span>
          </button>
        ) : (
          <Link
            href={getEpisodeUrl(prevEpisode.slug)}
            onClick={handleScrollToPlayer}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-[#FFD875] hover:bg-white/20 hover:text-[#FFD875]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Tập trước</span>
          </Link>
        )}

        <span className="hidden text-xs font-medium text-white/60 sm:inline-block">
          Đang phát: <strong className="text-[#FFD875]">{currentSrc?.name || '---'}</strong>
        </span>

        {/* Nút Tập Tiếp */}
        {isLastEpisode || !nextEpisode ? (
          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold text-white/30"
          >
            <span>Tập tiếp</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <Link
            href={getEpisodeUrl(nextEpisode.slug)}
            onClick={handleScrollToPlayer}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#FFD875] px-4 py-2 text-xs font-semibold text-black shadow-md shadow-[#FFD875]/20 transition-all hover:bg-[#ffe299]"
          >
            <span>Tập tiếp</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Control Panel & Episodes List */}
      <div className="space-y-4 rounded-xl border bg-accent p-4">
        {/* Danh sách Server */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <span className="text-amber-500">Đổi Server:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {episodes.map((item, idx) => (
              <button
                key={item.server_name || idx}
                type="button"
                onClick={() => setCurrentServerIndex(idx)}
                className={`cursor-pointer rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${
                  currentServerIndex === idx
                    ? 'bg-[#FFD875] font-bold text-black shadow-md shadow-[#FFD875]/20'
                    : 'border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.server_name}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Danh sách Tập Phim */}
        <div>
          <div className="mb-3 flex items-center justify-between text-sm text-white/60">
            <span>Danh sách tập</span>
            <span>Tổng số: {totalEpisodes} tập</span>
          </div>

          <div className="grid max-h-52 grid-cols-4 gap-2 overflow-y-auto py-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {serverData.length > 0 ? (
              serverData.map((item, idx) => {
                const isActive = activeEpisodeIndex === idx;

                return (
                  <Link
                    key={item.slug || idx}
                    href={getEpisodeUrl(item.slug)}
                    ref={isActive ? activeEpisodeRef : null}
                    onClick={handleScrollToPlayer}
                    className={`flex h-10 cursor-pointer items-center justify-center rounded-md text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FFD875] font-bold text-black shadow-lg shadow-[#FFD875]/20'
                        : 'border border-white/10 bg-white/5 text-white/90 hover:border-[#FFD875]/50 hover:bg-white/10 hover:text-[#FFD875]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })
            ) : (
              <p className="col-span-full py-4 text-center text-xs text-white/50">
                Không có tập phim nào khả dụng ở Server này.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
