import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userEvent from '@testing-library/user-event';

import { StudentEnrollmentsPage } from 'features/enrollments/components/StudentEnrollmentsPage';

const enrollmentsReducer = (state = {
  status: 'in-progress',
  data: [],
  requestResponse: {
    results: [],
    count: 0,
    numPages: 0,
    currentPage: 1,
  },
  filtersForm: {
    institutions: null,
    managedMasterCourses: null,
  },
  updateEnrollmentStatus: {
    errorMessage: '',
  },
}) => state;

const pageReducer = (state = {
  dataTable: { sortBy: {} },
  tab: 2,
}) => state;

const institutionsReducer = () => ({});
const licensesReducer = () => ({});

const renderWithStore = () => {
  const store = createStore(combineReducers({
    enrollments: enrollmentsReducer,
    page: pageReducer,
    institutions: institutionsReducer,
    licenses: licensesReducer,
  }));

  render(
    <Provider store={store}>
      <StudentEnrollmentsPage />
    </Provider>,
  );

  return store;
};

test('Should render filters and pagination', () => {
  renderWithStore();

  expect(screen.getByText(/export/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();

  expect(screen.getByRole('table')).toBeInTheDocument();

  expect(screen.getByLabelText(/paginationNavigation/i)).toBeInTheDocument();
});

test('Should open the modal from the table', async () => {
  const store = createStore(combineReducers({
    enrollments: () => ({
      ...enrollmentsReducer(),
      requestResponse: {
        results: [{
          learnerEmail: 'test@example.com',
          ccxId: 123,
          ccxName: 'Test Course',
          status: 'active',
        }],
        count: 1,
        numPages: 1,
        currentPage: 1,
      },
    }),
    page: pageReducer,
    institutions: institutionsReducer,
    licenses: licensesReducer,
  }));

  render(
    <Provider store={store}>
      <StudentEnrollmentsPage />
    </Provider>,
  );

  const actionButton = await screen.findByRole('button', { name: /manage/i });
  userEvent.click(actionButton);

  expect(await screen.findByText(/Are you sure/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});
