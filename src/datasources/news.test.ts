import { initDataSource } from '../test-utils/datasource-utils';
import {
  NewsContentFormatted,
  NewsContentResponse,
  NewsItemFormatted,
} from '../types/news';
import { NewsAPI, sortNewsByPublicationDateDesc } from './news';

const initNewsAPI = () => initDataSource(new NewsAPI());

describe('News datasource', () => {
  it('reduces a news content response correctly', () => {
    const newsAPI = initNewsAPI();

    const mockResponse: NewsContentResponse = {
      response: {
        status: 'ok',
        userTier: 'developer',
        total: 123,
        startIndex: 2,
        pageSize: 15,
        currentPage: 4,
        pages: 1451,
        orderBy: 'relevance',
        results: [
          {
            id: 'TEST_ID',
            type: 'TEST_TYPE',
            sectionId: 'TEST_SECTION_ID',
            sectionName: 'TEST_SECTION_NAME',
            webPublicationDate: '2021-12-27T00:32:38Z',
            webTitle: 'TEST_WEB_TITLE',
            webUrl: 'TEST_WEB_URL',
            apiUrl: 'TEST_API_URL',
            isHosted: false,
            pillarId: 'TEST_PILLAR_ID',
            pillarName: 'TEST_PILLAR_NAME',
          },
          {
            id: 'TEST_ID_2',
            type: 'TEST_TYPE_2',
            sectionId: 'TEST_SECTION_ID_2',
            sectionName: 'TEST_SECTION_NAME_2',
            webPublicationDate: '2021-11-27T00:32:38Z',
            webTitle: 'TEST_WEB_TITLE_2',
            webUrl: 'TEST_WEB_URL_2',
            apiUrl: 'TEST_API_URL_2',
            isHosted: false,
            pillarId: 'TEST_PILLAR_ID_2',
            pillarName: 'TEST_PILLAR_NAME_2',
          },
        ],
      },
    };

    const expectedParsedNewsContent = {
      results: [
        {
          id: mockResponse.response.results[0].id,
          title: mockResponse.response.results[0].webTitle,
          url: mockResponse.response.results[0].webUrl,
          publicationDate: mockResponse.response.results[0].webPublicationDate,
          category: mockResponse.response.results[0].sectionName,
        },
        {
          id: mockResponse.response.results[1].id,
          title: mockResponse.response.results[1].webTitle,
          url: mockResponse.response.results[1].webUrl,
          publicationDate: mockResponse.response.results[1].webPublicationDate,
          category: mockResponse.response.results[1].sectionName,
        },
      ],
    };

    const reducedResult = newsAPI.reduceNews(mockResponse);

    expect(reducedResult).toEqual(expectedParsedNewsContent);
  });

  it('sorts the news articles in the response in descending publication date order', () => {
    const newsAPI = initNewsAPI();

    const mockResponse: NewsContentResponse = {
      response: {
        status: 'ok',
        userTier: 'developer',
        total: 123,
        startIndex: 2,
        pageSize: 15,
        currentPage: 4,
        pages: 1451,
        orderBy: 'relevance',
        results: [
          {
            id: 'TEST_ID',
            type: 'TEST_TYPE',
            sectionId: 'TEST_SECTION_ID',
            sectionName: 'TEST_SECTION_NAME',
            webPublicationDate: '2021-12-27T00:32:38Z',
            webTitle: 'TEST_WEB_TITLE',
            webUrl: 'TEST_WEB_URL',
            apiUrl: 'TEST_API_URL',
            isHosted: false,
            pillarId: 'TEST_PILLAR_ID',
            pillarName: 'TEST_PILLAR_NAME',
          },
          {
            id: 'TEST_ID_2',
            type: 'TEST_TYPE_2',
            sectionId: 'TEST_SECTION_ID_2',
            sectionName: 'TEST_SECTION_NAME_2',
            webPublicationDate: '2022-12-27T00:32:38Z',
            webTitle: 'TEST_WEB_TITLE_2',
            webUrl: 'TEST_WEB_URL_2',
            apiUrl: 'TEST_API_URL_2',
            isHosted: false,
            pillarId: 'TEST_PILLAR_ID_2',
            pillarName: 'TEST_PILLAR_NAME_2',
          },
        ],
      },
    };

    const expectedParsedNewsContent = {
      results: [
        {
          id: mockResponse.response.results[1].id,
          title: mockResponse.response.results[1].webTitle,
          url: mockResponse.response.results[1].webUrl,
          publicationDate: mockResponse.response.results[1].webPublicationDate,
          category: mockResponse.response.results[1].sectionName,
        },
        {
          id: mockResponse.response.results[0].id,
          title: mockResponse.response.results[0].webTitle,
          url: mockResponse.response.results[0].webUrl,
          publicationDate: mockResponse.response.results[0].webPublicationDate,
          category: mockResponse.response.results[0].sectionName,
        },
      ],
    };

    const reducedResult = newsAPI.reduceNews(mockResponse);

    expect(reducedResult).toEqual(expectedParsedNewsContent);
  });

  it('fetches and reduces a news query response', async () => {
    const newsAPI = initNewsAPI();

    const newsResponse = await newsAPI.getNewsContent({ query: 'Sydney' });

    const expectedNews: NewsContentFormatted = {
      results: [
        {
          id: 'australia-news/2021/oct/27/western-sydney-disproportionately-fined-for-covid-lockdown-breaches',
          title:
            'Western Sydney disproportionately fined for Covid lockdown breaches',
          url: 'https://www.theguardian.com/australia-news/2021/oct/27/western-sydney-disproportionately-fined-for-covid-lockdown-breaches',
          category: 'Australia news',
          publicationDate: '2021-10-27T00:32:38Z',
        },
        {
          id: 'sport/live/2021/sep/17/nrl-2021-semi-finals-manly-vs-sydney-live-scores-updates-teams-sea-eagles-v-roosters-season-week-2-semi-final-fixture-team-latest-news-results-score-start-time-tonight-kick-off-mackay-queensland',
          title: 'Manly Sea Eagles obliterate Sydney Roosters – as it happened',
          url: 'https://www.theguardian.com/sport/live/2021/sep/17/nrl-2021-semi-finals-manly-vs-sydney-live-scores-updates-teams-sea-eagles-v-roosters-season-week-2-semi-final-fixture-team-latest-news-results-score-start-time-tonight-kick-off-mackay-queensland',
          category: 'Sport',
          publicationDate: '2021-09-17T11:46:29Z',
        },
      ],
    };

    expect(expectedNews).toEqual(newsResponse);
  });
});

describe('sortNewsByPublicationDateDesc', () => {
  const oldNewsItem: NewsItemFormatted = {
    id: 'A',
    title: 'News Item A',
    url: 'itemA.com',
    publicationDate: '2022-01-01T00:00:00Z',
    category: 'Category A',
  };

  const newNewsItem: NewsItemFormatted = {
    id: 'B',
    title: 'News Item B',
    url: 'itemB.com',
    publicationDate: '2022-02-01T00:00:00Z',
    category: 'Category B',
  };

  it.each([
    {
      newsItemsToCompare: [oldNewsItem, newNewsItem],
      expectedResult: 1,
    },
    {
      newsItemsToCompare: [newNewsItem, oldNewsItem],
      expectedResult: -1,
    },
  ])(
    'sorts correctly for articles with different dates',
    ({ newsItemsToCompare, expectedResult }) => {
      const sortValue = sortNewsByPublicationDateDesc(
        newsItemsToCompare[0],
        newsItemsToCompare[1]
      );
      expect(sortValue).toBe(expectedResult);
    }
  );

  it('sorts correctly for articles with the same publication date', () => {
    const sortValue = sortNewsByPublicationDateDesc(newNewsItem, newNewsItem);
    expect(sortValue).toBe(0);
  });
});
