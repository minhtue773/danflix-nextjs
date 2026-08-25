import { MovieFilterParams } from '@/types/movie';

const API_BASE_URL = process.env.NEXT_PUBLIC_PHIMAPI_URL || 'https://phimapi.com';

export const movieService = {
  async getMovies(params: MovieFilterParams = {}) {
    const queryParams = new URLSearchParams();
    queryParams.set('page', String(params.page || '1'));
    queryParams.set('limit', String(params.limit || '20'));
    queryParams.set('sort_field', params.sort_field || 'year');
    queryParams.set('sort_type', params.sort_type || 'desc');

    if (params.category) queryParams.set('category', params.category);
    if (params.country) queryParams.set('country', params.country);
    if (params.year) queryParams.set('year', params.year);
    if (params.sort_lang) queryParams.set('sort_lang', params.sort_lang);

    const endpoint = params.type || 'phim-le';
    const apiUrl = `${API_BASE_URL}/v1/api/danh-sach/${endpoint}?${queryParams.toString()}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Lỗi khi tải dữ liệu phim từ endpoint: ${endpoint}`);
    }

    return res.json();
  },

  async getMovieDetail(slug: string) {
    const apiUrl = `${API_BASE_URL}/phim/${slug}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Lỗi khi tải dữ liệu chi tiết phim với slug: ${slug}`);
    }

    return res.json();
  },

  async searchMovie(q: string, page: string, limit: string) {
    const apiUrl = `${API_BASE_URL}/v1/api/tim-kiem?keyword=${q}&page=${page}&limit=${limit}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Lỗi khi tải dữ liệu`);
    }

    return res.json();
  },

  // Sau này có thể mở rộng thêm các hàm khác dễ dàng:
  // async getMovieDetail(slug: string) { ... },
  // async searchMovies(keyword: string) { ... },
};
