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
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mb-10 animate-in text-center text-4xl font-medium text-balance delay-100 duration-1000 ease-in-out fill-mode-both slide-in-from-top-10 fade-in sm:text-5xl">
            Mọi thứ về <span className="text-red-500">DAN</span>FLIX
          </h1>
          <div className="animate-in delay-400 duration-1000 ease-in-out fill-mode-both slide-in-from-top-10 fade-in">
            <Testimonials />
          </div>
        </div>
      </section>
    </>
  );
}
