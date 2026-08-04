import BannerPage from '@/components/common/BannerPage';
import Contact from '@/components/contact-1';

export default function ContactPage() {
  const breadcrumb = [
    {
      title: 'Liên hệ',
      href: '/contact',
    },
  ];
  return (
    <>
      <BannerPage breadcrumb={breadcrumb} />
      <section className="@container bg-background py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <Contact />
        </div>
      </section>
    </>
  );
}
