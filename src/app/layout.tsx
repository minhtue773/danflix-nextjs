import { Noto_Serif, Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'DANFLIX - Khám phá thế giới điện ảnh',
  description: 'Khám phá phim lẻ, phim bộ và phim chiếu rạp mới cập nhật trên DANFLIX.',
};

const fontSans = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
});

const fontHeading = Noto_Serif({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-heading',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fontSans.variable} ${fontHeading.variable} dark suppressHydrationWarning h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <NextTopLoader
          color="#bf000f"
          initialPosition={0.08}
          crawlSpeed={200}
          height={8}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
        />
        {children}
      </body>
    </html>
  );
}
