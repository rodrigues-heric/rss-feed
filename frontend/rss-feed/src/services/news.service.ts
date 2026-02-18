import { api } from '@/lib/api';
import type { NewsResponse } from '@/interfaces/news.interface';

export const newsService = {
  async getSubscribedNews(page = 1): Promise<NewsResponse | undefined> {
    try {
      const response = await api.get<NewsResponse>('/rss/news', {
        params: {
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error occurred while fetching subscribed news: ', error);
    }
  },
};
