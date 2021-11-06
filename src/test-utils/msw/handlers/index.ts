import { DefaultRequestBody, MockedRequest, RestHandler } from 'msw';
import { mockGetNewsContent } from './news';
import { mockGetWeather } from './weather';

export const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
  mockGetWeather,
  mockGetNewsContent,
];
