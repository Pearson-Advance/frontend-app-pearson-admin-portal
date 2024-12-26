import React from 'react';
import { renderWithProviders } from 'test-utils';

import { LicenseForm } from 'features/licenses/components/LicenseForm';
import { fireEvent, waitFor } from '@testing-library/react';

jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    SHOW_CATALOG_SELECTOR: true,
  })),
}));

const mockStore = {
  institutions: {
    data: [{
      id: 1,
      name: 'Institution 1',
      active: true,
    }],
  },
  licenses: {
    eligibleCourses: [{
      value: 'coursev1',
      label: 'master course v1',
    }],
    form: {
      license: {
        id: 5,
        courses: [
          'master course',
        ],
      },
    },
    catalogs: {
      data: [
        {
          value: '123',
          label: 'full catalog',
        },
      ],
    },
  },
};

const initialFormValues = {
  licenseName: '',
  institution: '',
  courses: [],
  status: 'active',
  courseAccessDuration: 180,
  catalogs: [],
};

describe('LicenseForm component', () => {
  test('Should render form fields', async () => {
    const { getByText, queryByText } = renderWithProviders(
      <LicenseForm
        created
        errors={{}}
        setFields={() => {}}
        fields={initialFormValues}
      />,
      { preloadedState: mockStore },
    );

    const institutionSelector = getByText('Institution');
    const institutionOption = getByText('Institution 1');

    expect(getByText('License Name')).toBeInTheDocument();
    expect(institutionSelector).toBeInTheDocument();
    expect(institutionOption).toBeInTheDocument();

    fireEvent.click(institutionSelector);

    await waitFor(() => {
      expect(institutionOption).toBeInTheDocument();
      expect(getByText('Select Master Courses...')).toBeInTheDocument();
    });

    expect(getByText('Course access duration')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();

    const catalogSelector = getByText('Catalogs');
    const courseSelector = getByText('Master Courses');

    expect(catalogSelector).toBeInTheDocument();
    expect(courseSelector).toBeInTheDocument();

    fireEvent.click(catalogSelector);
    expect(getByText('Select Catalog')).toBeInTheDocument();
    expect(queryByText('Select Master Courses...')).not.toBeInTheDocument();
  });

  test('Edit mode', () => {
    const formValues = {
      licenseName: 'Demo License',
      institution: '2',
      courses: ['coursev1'],
      status: 'active',
      courseAccessDuration: 180,
      catalogs: [],
    };

    const { getByText, getByDisplayValue } = renderWithProviders(
      <LicenseForm
        created={false}
        errors={{}}
        setFields={() => {}}
        fields={formValues}
      />,
      { preloadedState: mockStore },
    );

    expect(getByText('License Name')).toBeInTheDocument();
    expect(getByDisplayValue('Demo License')).toBeInTheDocument();

    // Ensure that the selected course is displayed
    expect(getByText('master course v1')).toBeInTheDocument();
  });
});
