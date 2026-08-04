import BannerPage from '@/components/common/BannerPage';
import FAQs from '@/components/faqs-2';

export default function FAQPage() {
  const breadcrumb = [
    {
      title: 'FAQs',
      href: '/faq',
    },
  ];
  return (
    <>
      <BannerPage breadcrumb={breadcrumb} />
      <section className="@container bg-background py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <FAQs />
        </div>
      </section>
    </>
  );
}
