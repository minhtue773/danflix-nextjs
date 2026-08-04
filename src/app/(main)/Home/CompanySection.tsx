import { Effect } from '@/components/animate-ui/primitives/effects/effect';
import { Marquee } from '@/components/ui/marquee';

export default function CompanySection() {
  const companies = [
    {
      id: 1,
      image: '/assets/images/marvel.png',
    },
    {
      id: 2,
      image: '/assets/images/disney.png',
    },
    {
      id: 3,
      image: '/assets/images/pixar.png',
    },
    {
      id: 4,
      image: '/assets/images/nationalG.png',
    },
    {
      id: 5,
      image: '/assets/images/starwar.png',
    },
  ];

  return (
    <>
      <section className="w-full">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="overflow-hidden">
            <Effect fade slide={{ direction: 'up' }} blur>
              <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
                <Marquee className="mask-x-from-75% [--duration:20s] [&_svg]:mr-10" pauseOnHover>
                  {companies.map((item) => (
                    <div key={item.id} className="relative aspect-video w-40 shadow-md">
                      <img src={item.image} className="h-full w-full opacity-100" />
                    </div>
                  ))}
                </Marquee>
              </div>
            </Effect>
          </div>
        </div>
      </section>
    </>
  );
}
