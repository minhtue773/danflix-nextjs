import HeaderDesktop from './HeaderDestop';
import NavMobile from './NavMobile';

export default function Header() {
  return (
    <>
      <header className="fixed top-4 right-0 left-0 z-40 hidden px-4 md:block md:px-8">
        <HeaderDesktop />
      </header>

      <header className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 px-4 md:hidden">
        <NavMobile />
      </header>
    </>
  );
}
