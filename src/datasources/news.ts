import { RESTDataSource } from 'apollo-datasource-rest';
import { NEWS_API_KEY, NEWS_REQUEST_PAGE_SIZE } from '../config';
import {
  NewsContentFormatted,
  NewsContentResponse,
  NewsItemFormatted,
} from '../types/news';

export const THE_GUARDIAN_BASE_API_URL = 'https://content.guardianapis.com';

export const SEARCH_ENDPOINT = 'search';

const FALLBACK_NEWS_REQUEST_PAGE_SIZE = 50;

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
      'page-size': NEWS_REQUEST_PAGE_SIZE ?? FALLBACK_NEWS_REQUEST_PAGE_SIZE,
    });

    return this.reduceNews(response);
  }

  reduceNews(responsePayload: NewsContentResponse): NewsContentFormatted {
    return {
      results: responsePayload.response.results
        .map((result) => ({
          id: result.id,
          title: result.webTitle,
          url: result.webUrl,
          publicationDate: result.webPublicationDate,
          category: result.sectionName,
        }))
        .sort(sortNewsByPublicationDateDesc),
    };
  }
}

export const sortNewsByPublicationDateDesc = (
  articleA: NewsItemFormatted,
  articleB: NewsItemFormatted
): 1 | -1 | 0 => {
  if (articleA.publicationDate < articleB.publicationDate) {
    return 1;
  }

  if (articleA.publicationDate > articleB.publicationDate) {
    return -1;
  }

  return 0;
};

export type GetNewsContentArgs = {
  query: string;
};
