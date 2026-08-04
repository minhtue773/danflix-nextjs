import Image from 'next/image';
import { CustomBreadcrumb } from './CustomBreadcrumb';

interface breadcrumb {
  title: string;
  href?: string;
}

interface BannerPageProps {
  breadcrumb: breadcrumb[];
}

export default function BannerPage({ breadcrumb }: BannerPageProps) {
  return (
    <>
      <section className="w-full">
        <div className="relative h-[36vh] mask-b-from-80%">
          <div className="absolute inset-0 bg-amber-100">
            <Image
              loading="eager"
              fill
              src="/assets/images/1.jpg"
              alt="slidebanner"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <CustomBreadcrumb items={breadcrumb} />
          </div>
        </div>
      </section>
    </>
  );
}
