'use client';

import { useEffect, useRef, useState } from 'react';
import { MediaPlayer, MediaProvider, type MediaPlayerInstance } from '@vidstack/react';
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default';
import { Film, Play, RotateCcw } from 'lucide-react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface NetflixVideoPlayerProps {
  src?: string;
  movieId: string;
  poster?: string;
  title?: string;
}

// Hàm hỗ trợ format giây thành mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function NetflixVideoPlayer({
  src,
  movieId,
  poster,
  title,
}: NetflixVideoPlayerProps) {
  const playerRef = useRef<MediaPlayerInstance>(null);
  const [error, setError] = useState(false);

  // State quản lý Modal
  const [resumeTime, setResumeTime] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const lastSavedTime = useRef<number>(0);
  const STORAGE_KEY = `watch_progress_${movieId}`;

  useEffect(() => {
    setError(false);
    setShowModal(false);
    setResumeTime(null);
  }, [src]);

  // Khai báo khi video sẵn sàng phát
  const handleCanPlay = () => {
    const player = playerRef.current;
    if (!player) return;

    const savedTime = localStorage.getItem(STORAGE_KEY);
    if (savedTime) {
      const time = parseFloat(savedTime);
      // Chỉ hiện modal nếu thời gian xem dở lớn hơn 5 giây và chưa xem xong (trước 10 giây cuối)
      if (time > 5 && time < player.duration - 10) {
        setResumeTime(time);
        setShowModal(true);
      }
    }
  };

  // Đồng ý xem tiếp từ điểm dở dang
  const handleConfirmResume = () => {
    const player = playerRef.current;
    if (player && resumeTime !== null) {
      player.currentTime = resumeTime;
      player.play();
    }
    setShowModal(false);
  };

  // Xem lại từ đầu
  const handleRestart = () => {
    const player = playerRef.current;
    if (player) {
      player.currentTime = 0;
      player.play();
    }
    localStorage.removeItem(STORAGE_KEY);
    setShowModal(false);
  };

  const handleTimeUpdate = (detail: { currentTime: number }) => {
    const player = playerRef.current;
    if (!player) return;

    const current = detail.currentTime;

    // Tua qua intro (15m - 15m45s)
    const start = 15 * 60;
    const end = 15 * 60 + 45;
    if (current >= start && current < end) {
      player.currentTime = end;
      return;
    }

    // Lưu vị trí xem (mỗi 3 giây)
    if (Math.abs(current - lastSavedTime.current) >= 3) {
      localStorage.setItem(STORAGE_KEY, current.toString());
      lastSavedTime.current = current;
    }
  };

  const handleEnded = () => {
    localStorage.removeItem(STORAGE_KEY);
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
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      <MediaPlayer
        ref={playerRef}
        src={src}
        title={title}
        poster={poster}
        playsInline
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
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

      <Dialog open={showModal && resumeTime !== null} onOpenChange={setShowModal}>
        <DialogContent showCloseButton={false} className="md:max-w-md! md:p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Bạn đang xem dở tập phim này
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-400">
              Hệ thống ghi nhận bạn đã xem đến mốc{' '}
              <span className="font-semibold text-red-500">
                {resumeTime !== null && formatTime(resumeTime)}
              </span>
              . Bạn có muốn xem tiếp không?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              onClick={handleConfirmResume}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
            >
              <Play className="h-4 w-4 fill-white" />
              Xem tiếp
            </button>
            <button
              onClick={handleRestart}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border bg-accent px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-accent/70 active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              Xem lại từ đầu
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
