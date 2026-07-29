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
      <FAQs />
    </>
  );
}
