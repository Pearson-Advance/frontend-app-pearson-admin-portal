import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvidersAndIntl } from 'test-utils';
import { StudentEnrollmentsPage } from 'features/enrollments/components/StudentEnrollmentsPage';
import { updateBulkEnrollmentsAction } from 'features/enrollments/data';

let mockEnrollmentsQuery = { data: undefined, isFetching: false, isError: false };
const mockTriggerGetAllEnrollments = jest.fn();

jest.mock('features/enrollments/data/apiSlice', () => ({
  useGetStudentEnrollmentsQuery: () => mockEnrollmentsQuery,
  useLazyGetStudentEnrollmentsQuery: () => [mockTriggerGetAllEnrollments],
}));

jest.mock('features/institutions/data/apiSlice', () => ({
  useGetInstitutionsQuery: () => ({ data: [] }),
}));

jest.mock('features/enrollments/data', () => {
  const originalModule = jest.requireActual('features/enrollments/data');
  return {
    ...originalModule,
    updateBulkEnrollmentsAction: jest.fn(() => () => Promise.resolve()),
  };
});

const renderWithStore = () => renderWithProvidersAndIntl(<StudentEnrollmentsPage />);

beforeEach(() => {
  mockEnrollmentsQuery = { data: undefined, isFetching: false, isError: false };
  jest.clearAllMocks();
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

test('Should trigger bulk action modal and execute action on submit', async () => {
  mockEnrollmentsQuery = {
    data: {
      results: [
        {
          id: 1, learnerEmail: 'user1@example.com', ccxId: 101, status: 'Pending',
        },
        {
          id: 2, learnerEmail: 'user2@example.com', ccxId: 101, status: 'Pending',
        },
      ],
      count: 2,
      numPages: 1,
      currentPage: 1,
    },
    isFetching: false,
    isError: false,
  };

  const { container } = renderWithStore();

  fireEvent.change(screen.getByTestId('learnerEmail'), {
    target: { name: 'learnerEmail', value: 'user' },
  });
  fireEvent.click(screen.getByRole('button', { name: /apply filters/i }));

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  const actionsDropdown = container.querySelector('#bulk-actions-dropdown-toggle');
  expect(actionsDropdown).toBeInTheDocument();
  fireEvent.click(actionsDropdown);

  const revokeOption = await screen.findByText('Revoke');
  fireEvent.click(revokeOption);

  expect(screen.getByText(/Are you sure you want the selected learners to be revoked\?/i)).toBeInTheDocument();
  const submitBtn = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitBtn);

  expect(updateBulkEnrollmentsAction).toHaveBeenCalledTimes(1);
  expect(updateBulkEnrollmentsAction).toHaveBeenCalledWith(
    {
      action: 'revoke',
      enrollments: [{ learnerEmail: 'user1@example.com', ccxId: 101 }],
    },
  );
});
