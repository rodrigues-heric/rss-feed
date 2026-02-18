export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  author?: string;
  pubDate: string;
  sourceUrl: string;
}

export interface NewsResponse {
  data: NewsItem[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNextPage: boolean;
  };
}
