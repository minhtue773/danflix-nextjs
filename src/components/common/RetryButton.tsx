'use client';

import { useRouter } from 'next/navigation';

export default function RetryButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      className="font-medium text-primary underline underline-offset-4"
    >
      Thử tải lại
    </button>
  );
}
