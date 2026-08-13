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
  episode_total: number;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  content: string;
  country: Category[];
}

export interface MovieEpisode {
  server_name: string;
  server_data: MovieEpisodeServerData[];
}

export interface MovieEpisodeServerData {
  name: string;
  slug: string;
  link_m3u8: string;
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
