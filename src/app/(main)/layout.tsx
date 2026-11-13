import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/app/providers';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>
        <Header />
      </Providers>
      <main>{children}</main>
      <Footer />
    </>
  );
}
