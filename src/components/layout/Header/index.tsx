import HeaderDesktop from './HeaderDestop';
import NavMobile from './NavMobile';

export default function Header() {
  return (
    <>
      <header className="fixed top-4 right-0 left-0 z-40 hidden px-4 md:block md:px-8">
        <HeaderDesktop />
      </header>

      <header className="fixed right-0 bottom-4 left-0 z-40 mx-4 flex h-14 items-center justify-around overflow-hidden rounded-4xl border bg-card/70 py-2 text-white backdrop-blur-md md:hidden">
        <NavMobile />
      </header>
    </>
  );
}
