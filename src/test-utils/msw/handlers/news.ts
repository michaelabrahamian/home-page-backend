import { rest } from 'msw';
import {
  SEARCH_ENDPOINT,
  THE_GUARDIAN_BASE_API_URL,
} from '../../../datasources/news';
import { DEFAULT_NEWS_CONTENT_RESPONSE } from '../mocks/news';

export const mockGetNewsContent = rest.get(
  `${THE_GUARDIAN_BASE_API_URL}/${SEARCH_ENDPOINT}`,
  (_, res, ctx) => res(ctx.json(DEFAULT_NEWS_CONTENT_RESPONSE))
);
