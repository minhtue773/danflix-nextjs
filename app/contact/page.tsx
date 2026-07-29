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
      <Contact />
    </>
  );
}
