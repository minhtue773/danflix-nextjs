'use client';

import { useState, useRef } from 'react';
import { MovieEpisode, MoviePhimapi, MovieEpisodeServerData } from '@/types/movie';
import NetflixVideoPlayer from './NetflixVideoPlayer';

interface InfoMovieProps {
  movie: MoviePhimapi;
  episodes: MovieEpisode[];
}

export default function InfoMovie({ movie, episodes }: InfoMovieProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  console.log(episodes);

  // Lưu trữ state index thay vì object để tránh sync issue khi props đổi
  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const hasEpisodes = episodes && episodes.length > 0;
  const currentServer = hasEpisodes ? episodes[currentServerIndex] : null;
  const totalEpisodes = currentServer?.server_data?.length || 0;
  const currentSrc: MovieEpisodeServerData | undefined =
    currentServer?.server_data?.[currentEpisodeIndex];

  // Hàm chuyển tập phim có kèm cuộn mượt đến Player
  const handleSelectEpisode = (epIdx: number) => {
    setCurrentEpisodeIndex(epIdx);

    // Chỉ scroll lên Player nếu Player đã bị khuất khỏi màn hình
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Hàm chuyển Server
  const handleSelectServer = (serverIdx: number) => {
    setCurrentServerIndex(serverIdx);
    setCurrentEpisodeIndex(0); // Tự động về tập 1 của server mới
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

  const isFirstEpisode = currentEpisodeIndex === 0;
  const isLastEpisode = currentEpisodeIndex === totalEpisodes - 1;

  return (
    <div className="space-y-6">
      {/* Video Player Section */}
      <div ref={playerRef} className="scroll-mt-4">
        <NetflixVideoPlayer
          key={`${currentServerIndex}-${currentSrc?.slug || currentEpisodeIndex}`}
          src={currentSrc?.link_m3u8}
          poster={movie?.thumb_url || movie?.poster_url}
          title={currentSrc?.name ? `${movie?.name} - ${currentSrc.name}` : movie?.name}
        />
      </div>

      {/* Quick Navigation Bar: Tập Trước / Tập Tiếp */}
      <div className="flex items-center justify-between gap-3 rounded-xl border bg-accent p-3 backdrop-blur-md">
        <button
          type="button"
          disabled={isFirstEpisode}
          onClick={() => handleSelectEpisode(currentEpisodeIndex - 1)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
            isFirstEpisode
              ? 'cursor-not-allowed border border-white/5 bg-white/5 text-white/30'
              : 'cursor-pointer border border-white/10 bg-white/10 text-white hover:border-[#FFD875] hover:bg-white/20 hover:text-[#FFD875]'
          }`}
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

        <span className="hidden text-xs font-medium text-white/60 sm:inline-block">
          Đang phát: <strong className="text-[#FFD875]">{currentSrc?.name || '---'}</strong>
        </span>

        <button
          type="button"
          disabled={isLastEpisode}
          onClick={() => handleSelectEpisode(currentEpisodeIndex + 1)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
            isLastEpisode
              ? 'cursor-not-allowed border border-white/5 bg-white/5 text-white/30'
              : 'cursor-pointer bg-[#FFD875] text-black shadow-md shadow-[#FFD875]/20 hover:bg-[#ffe299]'
          }`}
        >
          <span>Tập tiếp</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
                onClick={() => handleSelectServer(idx)}
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
            <span>Tổng số: {currentServer?.server_data?.length || 0} tập</span>
          </div>

          <div className="grid max-h-52 grid-cols-4 gap-2 overflow-y-auto py-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {currentServer?.server_data && currentServer.server_data.length > 0 ? (
              currentServer.server_data.map((item, idx) => {
                const isActive = currentEpisodeIndex === idx;

                return (
                  <button
                    key={item.slug || idx}
                    type="button"
                    onClick={() => handleSelectEpisode(idx)}
                    className={`flex h-10 cursor-pointer items-center justify-center rounded-md text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FFD875] text-black shadow-lg shadow-[#FFD875]/20'
                        : 'border border-white/10 bg-white/5 text-white/90 hover:border-[#FFD875]/50 hover:bg-white/10 hover:text-[#FFD875]'
                    }`}
                  >
                    {item.name}
                  </button>
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
