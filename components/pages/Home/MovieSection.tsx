import CardMovie from '@/components/common/CardMovie';
import { MoviePhimapi } from '@/types/movie';

interface MovieSectionProps {
  title: string;
  movies: MoviePhimapi[];
}

export default function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <>
      <h2 className="font-heading mb-6 border-l-4 border-red-500 pl-4 text-xl font-bold capitalize">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
        {movies.map((item) => (
          <CardMovie movie={item} key={item.tmdb.id} />
        ))}
      </div>
    </>
  );
}
