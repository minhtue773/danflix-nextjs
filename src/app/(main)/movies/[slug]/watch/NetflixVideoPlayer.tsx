'use client';

import { useEffect, useRef, useState } from 'react';
import { MediaPlayer, MediaProvider, type MediaPlayerInstance } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import { Film } from 'lucide-react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

interface NetflixVideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
}

export default function NetflixVideoPlayer({ src, poster, title }: NetflixVideoPlayerProps) {
  // Gán Type chuẩn MediaPlayerInstance cho ref
  const playerRef = useRef<MediaPlayerInstance>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const handleTimeUpdate = (detail: { currentTime: number }) => {
    const player = playerRef.current;
    if (!player) return;

    const current = detail.currentTime;
    const start = 15 * 60; // 15 phút
    const end = 15 * 60 + 45; // 15 phút 45 giây

    // Nếu rơi vào khoảng này thì tự động tua qua
    if (current >= start && current < end) {
      player.currentTime = end;
    }
  };

  if (!src || error) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-white/10 bg-black/90 text-white">
        <div className="flex flex-col items-center gap-2">
          <Film className="h-10 w-10 animate-pulse text-red-500" />
          <p className="font-semibold text-red-500">
            {!src ? 'Chưa có nguồn phát video!' : 'Không thể kết nối tới máy chủ video!'}
          </p>
          <p className="text-xs text-white/50">Vui lòng thử chọn Server hoặc tập phim khác.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      <MediaPlayer
        ref={playerRef}
        src={src}
        title={title}
        poster={poster}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onError={() => setError(true)}
        className="h-full w-full"
        keyShortcuts={{
          togglePaused: 'k Space',
          toggleMuted: 'm',
          toggleFullscreen: 'f',
          togglePictureInPicture: 'i',
          toggleCaptions: 'c',
          seekBackward: 'ArrowLeft j',
          seekForward: 'ArrowRight l',
          volumeUp: 'ArrowUp',
          volumeDown: 'ArrowDown',
          speedUp: '>',
          slowDown: '<',
        }}
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
