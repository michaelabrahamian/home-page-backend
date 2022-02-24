import { SEARCH_ENDPOINT, THE_GUARDIAN_BASE_API_URL } from './datasources/news';
import { server as apolloServer } from './server';
import { server as mswServer, rest } from './test-utils/msw';

const GET_NEWS = `query GetNews($query: String) {
  news(query: $query) {
    results {
      id
      title
      url
      publicationDate
      category
    }
  }
}`;

describe('GraphQL server', () => {
  it('returns a correct news response', async () => {
    const result = await apolloServer.executeOperation({
      query: GET_NEWS,
      variables: { query: 'TEST_QUERY' },
    });

    expect(result.errors).toBeUndefined();

    expect(result.data).toMatchObject({
      news: {
        results: [
          {
            category: 'Australia news',
            id: 'australia-news/2021/oct/27/western-sydney-disproportionately-fined-for-covid-lockdown-breaches',
            publicationDate: '2021-10-27T00:32:38Z',
            title:
              'Western Sydney disproportionately fined for Covid lockdown breaches',
            url: 'https://www.theguardian.com/australia-news/2021/oct/27/western-sydney-disproportionately-fined-for-covid-lockdown-breaches',
          },
          {
            category: 'Sport',
            id: 'sport/live/2021/sep/17/nrl-2021-semi-finals-manly-vs-sydney-live-scores-updates-teams-sea-eagles-v-roosters-season-week-2-semi-final-fixture-team-latest-news-results-score-start-time-tonight-kick-off-mackay-queensland',
            publicationDate: '2021-09-17T11:46:29Z',
            title:
              'Manly Sea Eagles obliterate Sydney Roosters – as it happened',
            url: 'https://www.theguardian.com/sport/live/2021/sep/17/nrl-2021-semi-finals-manly-vs-sydney-live-scores-updates-teams-sea-eagles-v-roosters-season-week-2-semi-final-fixture-team-latest-news-results-score-start-time-tonight-kick-off-mackay-queensland',
          },
        ],
      },
    });
  });

  it('returns an error when there is a downstream network issue', async () => {
    mswServer.use(
      rest.get(
        `${THE_GUARDIAN_BASE_API_URL}/${SEARCH_ENDPOINT}`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    const result = await apolloServer.executeOperation({
      query: GET_NEWS,
      variables: { query: 'TEST_QUERY' },
    });

    expect(result.errors).toBeDefined();

    const error = result.errors[0];
    expect(error.message).toMatchInlineSnapshot(`"500: Internal Server Error"`);
    expect(error.extensions.code).toMatchInlineSnapshot(
      `"INTERNAL_SERVER_ERROR"`
    );
  });
});
