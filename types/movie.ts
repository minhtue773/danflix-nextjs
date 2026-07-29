export interface MovieFilterParams {
  type?: string;
  category?: string;
  country?: string;
  year?: string;
  page?: string | number;
  limit?: string | number;
  sort_field?: string;
  sort_type?: string;
  sort_lang?: string;
}

export interface MoviePhimapi {
  _id: string;
  tmdb: Tmdb;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  country: Category[];
}

export interface Category {
  name: string;
  slug: string;
  id: string;
}

export interface Tmdb {
  id: string;
  type: string;
  vote_average: number;
}
