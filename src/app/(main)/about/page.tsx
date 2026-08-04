import { Effects } from '@/components/animate-ui/primitives/effects/effect';
import BannerPage from '@/components/common/BannerPage';
import Testimonials from '@/components/testimonials-2';

export default function About() {
  const breadcrumb = [
    {
      title: 'Giới thiệu',
      href: '/about',
    },
  ];

  return (
    <>
      <BannerPage breadcrumb={breadcrumb} />
      <section className="@container bg-background py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Effects
            delay={300}
            inView
            holdDelay={350}
            fade
            slide={{ direction: 'down', offset: 10 }}
          >
            <h1 className="mb-10 text-center text-4xl font-medium text-balance sm:text-5xl">
              Mọi thứ về <span className="text-red-500">DAN</span>FLIX
            </h1>
            <Testimonials />
          </Effects>
        </div>
      </section>
    </>
  );
}
