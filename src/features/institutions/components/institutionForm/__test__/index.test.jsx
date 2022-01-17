import React from 'react';
import { render, screen } from '@testing-library/react';
import { InstitutionForm } from 'features/institutions/components/institutionForm';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

let initialFormValues;
let errors;

describe('Test suite for InstitutionForm', () => {
  beforeEach(() => {
    initialFormValues = {
      id: '',
      name: '',
      shortName: '',
      externalId: '',
      active: true,
    };
    errors = {};
  });

  test('render InstitutionForm component with short name error', () => {
    errors = {
      shortName: 'Institution with this short name already exists.',
    };

    const component = render(
      <Provider store={initializeStore()}>
        <InstitutionForm fields={initialFormValues} setFields={() => {}} errors={errors} />
      </Provider>,
    );

    expect(component.queryByText(errors.shortName)).toBeInTheDocument();
  });

  test('render InstitutionForm component with name error', () => {
    errors = {
      name: 'Institution with this short name already exists.',
    };

    const component = render(
      <Provider store={initializeStore()}>
        <InstitutionForm fields={initialFormValues} setFields={() => {}} errors={errors} />
      </Provider>,
    );

    expect(component.queryByText(errors.name)).toBeInTheDocument();
  });

  test('render InstitutionForm component with the checkbox in false', () => {
    initialFormValues.active = false;

    render(
      <Provider store={initializeStore()}>
        <InstitutionForm fields={initialFormValues} setFields={() => {}} errors={errors} />
      </Provider>,
    );

    const activeButton = screen.getByRole('checkbox', { name: 'Active' });
    expect(activeButton).not.toBeChecked();
  });
});
