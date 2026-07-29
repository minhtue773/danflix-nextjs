export default function CompanySection() {
  const companies = [
    {
      id: 1,
      video: '/assets/videos/marvel.mp4',
      image: '/assets/images/marvel.png',
    },
    {
      id: 2,
      video: '/assets/videos/disney.mp4',
      image: '/assets/images/disney.png',
    },
    {
      id: 3,
      video: '/assets/videos/pixar.mp4',
      image: '/assets/images/pixar.png',
    },
    {
      id: 4,
      video: '/assets/videos/nationalG.mp4',
      image: '/assets/images/nationalG.png',
    },
    {
      id: 5,
      video: '/assets/videos/starwar.mp4',
      image: '/assets/images/starwar.png',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-5 md:gap-6">
        {companies.map((item) => (
          <div
            key={item.id}
            className="relative aspect-video rounded-lg border shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            <img src={item.image} className="h-full w-full opacity-100" />
            <video
              src={item.video}
              autoPlay
              loop
              playsInline
              muted
              className="absolute inset-0 z-10 h-full w-full rounded-md opacity-0 hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </>
  );
}
