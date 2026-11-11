import { Effect } from '@/components/animate-ui/primitives/effects/effect';
import { Marquee } from '@/components/ui/marquee';
import Image from 'next/image';

export default function CompanySection() {
  const companies = [
    {
      id: 1,
      name: 'Marvel',
      image: '/assets/images/marvel.png',
    },
    {
      id: 2,
      name: 'Disney',
      image: '/assets/images/disney.png',
    },
    {
      id: 3,
      name: 'Pixar',
      image: '/assets/images/pixar.png',
    },
    {
      id: 4,
      name: 'National Geographic',
      image: '/assets/images/nationalG.png',
    },
    {
      id: 5,
      name: 'Star Wars',
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
                      <Image
                        src={item.image}
                        alt={`${item.name} logo`}
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
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
