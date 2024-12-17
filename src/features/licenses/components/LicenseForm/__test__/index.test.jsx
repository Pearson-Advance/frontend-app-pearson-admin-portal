import React from 'react';
import { renderWithProviders } from 'test-utils';

import { LicenseForm } from 'features/licenses/components/LicenseForm';

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
  test('Should render form fields', () => {
    const { getByText } = renderWithProviders(
      <LicenseForm
        created
        errors={{}}
        fields={initialFormValues}
      />,
      { preloadedState: mockStore },
    );

    expect(getByText('License Name')).toBeInTheDocument();
    expect(getByText('Institution')).toBeInTheDocument();
    expect(getByText('Institution 1')).toBeInTheDocument();
    expect(getByText('Course access duration')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Select Catalog')).toBeInTheDocument();
  });

  test('Edit mode', () => {
    const { getByText } = renderWithProviders(
      <LicenseForm
        created={false}
        errors={{}}
        fields={initialFormValues}
      />,
      { preloadedState: mockStore },
    );

    expect(getByText('License Name')).toBeInTheDocument();
    expect(getByText('Select Master Courses...')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
  });
});
