import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvidersAndIntl } from 'test-utils';
import { StudentEnrollmentsPage } from 'features/enrollments/components/StudentEnrollmentsPage';

let mockEnrollmentsQuery = { data: undefined, isFetching: false, isError: false };

jest.mock('features/enrollments/data/apiSlice', () => ({
  useGetStudentEnrollmentsQuery: () => mockEnrollmentsQuery,
}));

jest.mock('features/institutions/data/apiSlice', () => ({
  useGetInstitutionsQuery: () => ({ data: [] }),
}));

const renderWithStore = () => renderWithProvidersAndIntl(<StudentEnrollmentsPage />);

beforeEach(() => {
  mockEnrollmentsQuery = { data: undefined, isFetching: false, isError: false };
});

test('Should render filters and pagination', () => {
  renderWithStore();

  expect(screen.getByRole('button', { name: /export enrollments/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();

  expect(screen.getByRole('table')).toBeInTheDocument();

  expect(screen.getByLabelText(/paginationNavigation/i)).toBeInTheDocument();
});

test('Should prompt the user to set filters before showing results', () => {
  renderWithStore();

  expect(screen.getByText(/set your filters and click search to view the results/i)).toBeInTheDocument();
});

test('Should open the modal from the table', async () => {
  mockEnrollmentsQuery = {
    data: {
      results: [{
        learnerEmail: 'test@example.com',
        ccxId: 123,
        ccxName: 'Test Course',
        status: 'Active',
      }],
      count: 1,
      numPages: 1,
      currentPage: 1,
    },
    isFetching: false,
    isError: false,
  };

  renderWithStore();

  fireEvent.change(screen.getByTestId('learnerEmail'), {
    target: { name: 'learnerEmail', value: 'test@example.com' },
  });
  fireEvent.click(screen.getByRole('button', { name: /apply filters/i }));

  const actionMenu = await screen.findByRole('button', { name: /menu for actions/i });
  userEvent.click(actionMenu);

  const disableItem = await screen.findByText('Disable');
  userEvent.click(disableItem);

  expect(await screen.findByText(/Are you sure/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});
