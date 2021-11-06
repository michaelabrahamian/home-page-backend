import { RESTDataSource } from 'apollo-datasource-rest';

export const initDataSource = <T extends RESTDataSource>(dataSource: T) => {
  dataSource.initialize({
    context: {},
    cache: {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    },
  });

  return dataSource;
};
