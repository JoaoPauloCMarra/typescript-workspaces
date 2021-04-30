import { act, cleanup, render, findByTestId } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetUsersDocument } from '@shared/ui-library/types/graphql';
import { wait } from '@shared/utils/index';

import HomePage from '../pages';

afterEach(cleanup);

const MOCK = {
  request: {
    query: GetUsersDocument,
    variables: {},
  },
  result: {
    data: [],
  },
};
const pageTitleId = 'page-title';
const expectedTitle = 'All users';

test('Tests Home Page', async () => {
  const { container } = render(
    <MockedProvider mocks={[MOCK]} addTypename={false}>
      <HomePage />
    </MockedProvider>,
  );
  await act(async () => {
    await wait(0);
  });

  expect(container).toBeTruthy();

  const titleEl = await findByTestId(container, pageTitleId);
  expect(titleEl).toBeTruthy();
  expect(titleEl.innerHTML).toContain(expectedTitle);
});
