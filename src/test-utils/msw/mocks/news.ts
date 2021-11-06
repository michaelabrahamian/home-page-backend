import { NewsContentResponse } from '../../../types/news';

export const DEFAULT_NEWS_CONTENT_RESPONSE: NewsContentResponse = {
  response: {
    status: 'ok',
    userTier: 'developer',
    total: 44677,
    startIndex: 1,
    pageSize: 10,
    currentPage: 1,
    pages: 4468,
    orderBy: 'relevance',
    results: [
      {
        id: 'australia-news/2021/oct/27/western-sydney-disproportionately-fined-for-covid-lockdown-breaches',
        type: 'article',
        sectionId: 'australia-news',
        sectionName: 'Australia news',
        webPublicationDate: '2021-10-27T00:32:38Z',
        webTitle:
          'Western Sydney disproportionately fined for Covid lockdown breaches',
        webUrl:
          'https://www.theguardian.com/australia-news/2021/oct/27/western-sydney-disproportionately-fined-for-covid-lockdown-breaches',
        apiUrl:
          'https://content.guardianapis.com/australia-news/2021/oct/27/western-sydney-disproportionately-fined-for-covid-lockdown-breaches',
        isHosted: false,
        pillarId: 'pillar/news',
        pillarName: 'News',
      },
      {
        id: 'sport/live/2021/sep/17/nrl-2021-semi-finals-manly-vs-sydney-live-scores-updates-teams-sea-eagles-v-roosters-season-week-2-semi-final-fixture-team-latest-news-results-score-start-time-tonight-kick-off-mackay-queensland',
        type: 'liveblog',
        sectionId: 'sport',
        sectionName: 'Sport',
        webPublicationDate: '2021-09-17T11:46:29Z',
        webTitle:
          'Manly Sea Eagles obliterate Sydney Roosters – as it happened',
        webUrl:
          'https://www.theguardian.com/sport/live/2021/sep/17/nrl-2021-semi-finals-manly-vs-sydney-live-scores-updates-teams-sea-eagles-v-roosters-season-week-2-semi-final-fixture-team-latest-news-results-score-start-time-tonight-kick-off-mackay-queensland',
        apiUrl:
          'https://content.guardianapis.com/sport/live/2021/sep/17/nrl-2021-semi-finals-manly-vs-sydney-live-scores-updates-teams-sea-eagles-v-roosters-season-week-2-semi-final-fixture-team-latest-news-results-score-start-time-tonight-kick-off-mackay-queensland',
        isHosted: false,
        pillarId: 'pillar/sport',
        pillarName: 'Sport',
      },
    ],
  },
};
