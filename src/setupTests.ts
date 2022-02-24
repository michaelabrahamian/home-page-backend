import { server as mswServer } from './test-utils/msw/server';
import { server as apolloServer } from './server';

// Establish API mocking before all tests.
beforeAll(() =>
  mswServer.listen({
    onUnhandledRequest: 'warn',
  })
);

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mswServer.resetHandlers());

// Clean up after the tests are finished.
afterAll(async () => {
  mswServer.close();
  await apolloServer.stop();
});
