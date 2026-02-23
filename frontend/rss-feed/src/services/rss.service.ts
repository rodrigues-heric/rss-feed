import { api } from '@/lib/api';

interface SubscribeResponse {
  message: string;
  feedId: string;
  url: string;
}

interface UnsubscribeResponse {
  message: string;
  feedId: string;
}

export const rssService = {
  async subscribe(url: string): Promise<SubscribeResponse> {
    const response = await api.post<SubscribeResponse>('/rss/subscribe', {
      url,
    });
    return response.data;
  },

  async unsubscribe(feedId: string): Promise<UnsubscribeResponse> {
    const response = await api.delete<UnsubscribeResponse>(
      `/rss/delete/${feedId}`
    );
    return response.data;
  },
};
