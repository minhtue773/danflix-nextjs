'use client';

import { useEffect, useState } from 'react';
import { MovieEpisode, MoviePhimapi } from '@/types/movie';
import NetflixVideoPlayer from './NetflixVideoPlayer';

interface InfoMovieProps {
  movie: MoviePhimapi;
  episodes: MovieEpisode[];
}

export default function InfoMovie({ movie, episodes }: InfoMovieProps) {
  // Lấy tập đầu tiên của Server đầu tiên làm mặc định
  const initialServer = episodes?.[0];
  const initialEpisode = initialServer?.server_data?.[0];

  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(initialEpisode);

  // Khi danh sách episodes thay đổi, reset lại server và tập phim
  useEffect(() => {
    if (episodes && episodes.length > 0) {
      setCurrentServerIndex(0);
      setCurrentSrc(episodes[0]?.server_data?.[0]);
    }
  }, [episodes]);

  // Lấy Server tương ứng với tab đang chọn
  const currentServer = episodes?.[currentServerIndex];

  return (
    <div className="space-y-6">
      {/* Video Player - Đổi key theo link video để tự động reload mượt mà khi đổi tập */}
      <NetflixVideoPlayer
        key={currentSrc?.link_m3u8}
        src={currentSrc?.link_m3u8}
        poster={movie?.thumb_url || movie?.poster_url}
        title={currentSrc?.name ? `${movie?.name} - ${currentSrc.name}` : movie?.name}
      />

      {/* Control Panel & Episodes List */}
      <div className="space-y-4 text-[12px]">
        {episodes && episodes.length > 0 ? (
          <>
            {/* Danh sách Server */}
            <div className="flex flex-wrap items-center gap-2 border-l-4 border-[#FFD875] pl-3">
              <span className="font-semibold text-white/80">Server:</span>
              {episodes.map((item, idx) => (
                <button
                  key={item.server_name || idx}
                  type="button"
                  onClick={() => {
                    setCurrentServerIndex(idx);
                    // Tự động phát tập 1 của server mới chọn
                    setCurrentSrc(item.server_data?.[0]);
                  }}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 transition-all ${
                    currentServerIndex === idx
                      ? 'bg-[#FFD875] font-bold text-black'
                      : 'border border-white/30 text-white hover:text-[#FFD875]'
                  }`}
                >
                  {item.server_name}
                </button>
              ))}
            </div>

            {/* Danh sách Tập Phim */}
            <div className="flex max-h-48 flex-wrap items-center gap-2 overflow-auto py-2">
              {currentServer?.server_data && currentServer.server_data.length > 0 ? (
                currentServer.server_data.map((item) => {
                  const isActive = currentSrc?.slug === item.slug;

                  return (
                    <button
                      key={item.slug || item.name}
                      type="button"
                      onClick={() => {
                        setCurrentSrc(item);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`min-w-14 cursor-pointer rounded-lg p-2 transition-all ${
                        isActive
                          ? 'bg-[#FFD875] font-bold text-black'
                          : 'border border-white/20 bg-white/10 text-white hover:border-[#FFD875] hover:text-[#FFD875]'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })
              ) : (
                <p className="text-white/70">Không có tập phim nào khả dụng ở Server này.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-lg text-red-500">
            Bản phim này đã được gỡ vì một số lý do. Xin lỗi vì sự bất tiện này!
          </p>
        )}
      </div>
    </div>
  );
}
