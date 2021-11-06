import { RESTDataSource } from 'apollo-datasource-rest';
import { NEWS_API_KEY } from '../config';
import { NewsContentFormatted, NewsContentResponse } from '../types/news';

export const THE_GUARDIAN_BASE_API_URL = 'https://content.guardianapis.com';

export const SEARCH_ENDPOINT = 'search';

export class NewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = THE_GUARDIAN_BASE_API_URL;
  }

  async getNewsContent({
    query,
  }: GetNewsContentArgs): Promise<NewsContentFormatted> {
    const response: NewsContentResponse = await this.get(SEARCH_ENDPOINT, {
      q: query,
      'api-key': NEWS_API_KEY,
    });

    return this.reduceNews(response);
  }

  reduceNews(responsePayload: NewsContentResponse): NewsContentFormatted {
    return {
      results: responsePayload.response.results.map((result) => ({
        id: result.id,
        title: result.webTitle,
        url: result.webUrl,
        publicationDate: result.webPublicationDate,
        category: result.sectionName,
      })),
    };
  }
}

export type GetNewsContentArgs = {
  query: string;
};
