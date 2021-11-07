export type NewsContentFormatted = {
  results: Array<NewsItemFormatted>;
};

export type NewsItemFormatted = {
  id: string;
  title: string;
  url: string;
  publicationDate: string;
  category: string;
};

export type NewsContentResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: Array<NewsItemResponse>;
  };
};

export type NewsItemResponse = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};
