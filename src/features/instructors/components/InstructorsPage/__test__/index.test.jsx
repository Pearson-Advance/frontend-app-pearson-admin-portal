import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProvidersAndIntl } from 'test-utils';
import { InstructorsPage } from 'features/instructors/components/InstructorsPage';

// Import RTK Query hooks for mock spying
import { useGetInstructorsQuery } from 'features/instructors/data/apiSlice';
import { useGetInstitutionsQuery } from 'features/institutions/data/apiSlice';

// 1. Mock RTK Query API Slices
jest.mock('features/instructors/data/apiSlice', () => ({
  useGetInstructorsQuery: jest.fn(),
}));

jest.mock('features/institutions/data/apiSlice', () => ({
  useGetInstitutionsQuery: jest.fn(),
}));

// 2. Mock Redux Selectors & Thunks
jest.mock('features/licenses/data/selectors', () => ({
  managedCoursesForSelect: jest.fn(() => [
    { id: 'course-v1:React', displayName: 'React 101', label: 'React 101 - course-v1:React' },
  ]),
}));

jest.mock('features/licenses/data', () => ({
  fetchEligibleCourses: jest.fn(() => ({ type: 'mock/fetchEligibleCourses' })),
  cancelFetchEligibleCourses: jest.fn(() => ({ type: 'mock/cancelFetchEligibleCourses' })),
}));

// Mock default RTK Query responses
const defaultInstructorsResponse = {
  data: {
    results: [],
    count: 0,
    numPages: 0,
    currentPage: 1,
  },
  isFetching: false,
  isError: false,
};

const defaultInstitutionsResponse = {
  data: [
    { id: 'inst-1', name: 'MIT' },
    { id: 'inst-2', name: 'Harvard' },
  ],
};

const renderComponent = () => renderWithProvidersAndIntl(<InstructorsPage />);

describe('Test suite for InstructorsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useGetInstitutionsQuery.mockReturnValue(defaultInstitutionsResponse);
    useGetInstructorsQuery.mockReturnValue(defaultInstructorsResponse);
  });

  test('Should render filters, table, and pagination components', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clean filters|clear filters/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByLabelText(/paginationNavigation/i)).toBeInTheDocument();
  });

  test('Should trigger useGetInstructorsQuery on initial render with page 1', () => {
    renderComponent();

    expect(useGetInstructorsQuery).toHaveBeenCalledWith({
      page: 1,
    });
  });

  test('Should apply filters correctly when clicking search', () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/instructor email/i);
    fireEvent.change(emailInput, { target: { name: 'instructorEmail', value: 'instructor@test.com' } });

    const searchButton = screen.getByRole('button', { name: /apply filters/i });
    fireEvent.click(searchButton);

    expect(useGetInstructorsQuery).toHaveBeenLastCalledWith({
      instructorEmail: 'instructor@test.com',
      institutionId: null,
      courseName: null,
      active: '',
      page: 1,
    });
  });

  test('Should reset filters and reload initial page when clicking clear filters', () => {
    renderComponent();

    const clearButton = screen.getByRole('button', { name: /clean filters|clear filters/i });
    fireEvent.click(clearButton);

    expect(useGetInstructorsQuery).toHaveBeenLastCalledWith({
      page: 1,
    });
  });

  test('Should render table with flattened class data from RTK Query response', () => {
    useGetInstructorsQuery.mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            instructorEmail: 'instructor@test.com',
            classesDetail: [
              {
                masterCourseName: 'React 101',
                masterCourseId: 'course-v1:React',
                className: 'Class A',
                classId: '101A',
                startDate: '2026-01-01',
                endDate: '2026-12-31',
              },
            ],
          },
        ],
        count: 1,
        numPages: 1,
        currentPage: 1,
      },
      isFetching: false,
      isError: false,
    });

    renderComponent();

    expect(screen.getByText('instructor@test.com')).toBeInTheDocument();
    expect(screen.getByText('React 101')).toBeInTheDocument();
    expect(screen.getByText('Class A')).toBeInTheDocument();
  });
});
