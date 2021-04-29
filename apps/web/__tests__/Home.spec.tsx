import { cleanup, render, screen } from '@testing-library/react';
import 'react';

import HomePage from '../pages';

afterEach(cleanup);

const pageTitleId = 'page-title';
const expectedTitle = 'Welcome to <a href="https://nextjs.org">Next.js!</a>';

test('Tests Home Page', () => {
  render(<HomePage />);
  const pageTitle = screen.getByTestId(pageTitleId);

  expect(pageTitle).toBeTruthy();
  expect(pageTitle.innerHTML).toBe(expectedTitle);
});
