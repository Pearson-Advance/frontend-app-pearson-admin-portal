import React from 'react';
import { renderWithProviders } from 'test-utils';
import { getConfig } from '@edx/frontend-platform';

import { LicenseForm } from 'features/licenses/components/LicenseForm';
import { fireEvent, waitFor } from '@testing-library/react';
import { LicenseTypes } from 'features/shared/data/constants';

jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    SHOW_CATALOG_SELECTOR: true,
  })),
}));

jest.mock('react-select', () => function reactSelect({ options, currentValue, onChange }) {
  function handleChange(event) {
    const currentOption = options.find(
      (option) => option.value === event.currentTarget.value,
    );
    onChange(currentOption);
  }

  return (
    <select data-testid="select" value={currentValue} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

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
        {
          value: '111',
          label: 'demo catalog',
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
    const { getByText } = renderWithProviders(
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
      expect(getByText('master course v1')).toBeInTheDocument();
    });

    expect(getByText('Course access duration')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();

    const catalogSelector = getByText('Catalogs');
    const courseSelector = getByText('Master Courses');

    expect(catalogSelector).toBeInTheDocument();
    expect(courseSelector).toBeInTheDocument();

    fireEvent.click(catalogSelector);
    expect(getByText('full catalog')).toBeInTheDocument();
  });

  test('Edit mode', () => {
    const formValues = {
      licenseName: 'Demo License',
      institution: '2',
      courses: ['coursev1'],
      status: 'active',
      courseAccessDuration: 180,
      catalogs: [],
      licenseType: LicenseTypes.COURSES,
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
    expect(getByText('Master Courses')).toBeInTheDocument();
    expect(getByText('master course v1')).toBeInTheDocument();
  });

  test('Edit mode with catalog', () => {
    const formValues = {
      licenseName: 'Demo License',
      institution: '2',
      courses: [],
      status: 'active',
      courseAccessDuration: 180,
      catalogs: ['123'],
      licenseType: LicenseTypes.CATALOG,
    };

    const { getByText } = renderWithProviders(
      <LicenseForm
        created={false}
        errors={{}}
        setFields={() => {}}
        fields={formValues}
      />,
      { preloadedState: mockStore },
    );

    // Ensure that the selected catalog is displayed
    expect(getByText('Catalogs')).toBeInTheDocument();
    expect(getByText('full catalog')).toBeInTheDocument();
  });

  test('Disable license name field according to catalog selected', async () => {
    const { getByText, getByTestId, getByRole } = renderWithProviders(
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
    const licenseNameField = getByRole('textbox', { name: 'License Name' });

    expect(institutionSelector).toBeInTheDocument();
    expect(institutionOption).toBeInTheDocument();

    fireEvent.click(institutionSelector);

    await waitFor(() => {
      expect(institutionOption).toBeInTheDocument();
    });

    const catalogRadio = getByText('Catalogs');

    expect(catalogRadio).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(catalogRadio);
    });

    fireEvent.change(getByTestId('select'), { target: { value: '123' } });

    expect(getByText('full catalog')).toBeInTheDocument();
    expect(licenseNameField).toBeDisabled();
  });

  test('Multiple catalog selector', async () => {
    getConfig.mockImplementation(() => ({
      MULTI_CATALOG_SELECTOR: true,
      SHOW_CATALOG_SELECTOR: true,
    }));

    const formValues = {
      licenseName: 'Demo License',
      institution: '2',
      courses: [],
      status: 'active',
      courseAccessDuration: 180,
      catalogs: ['123', '111'],
      licenseType: LicenseTypes.CATALOG,
    };

    const { getByText } = renderWithProviders(
      <LicenseForm
        created={false}
        errors={{}}
        setFields={() => {}}
        fields={formValues}
      />,
      { preloadedState: mockStore },
    );

    expect(getByText('Catalogs')).toBeInTheDocument();
    expect(getByText('full catalog')).toBeInTheDocument();
    expect(getByText('demo catalog')).toBeInTheDocument();
  });
});
