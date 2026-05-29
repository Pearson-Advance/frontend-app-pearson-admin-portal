import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InstitutionForm } from 'features/institutions/components/institutionForm';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

const renderComponent = (props = {}) => {
  const defaultProps = {
    fields: {
      id: '',
      name: '',
      shortName: '',
      externalId: '',
      supportLink: '',
      active: true,
    },
    setFields: jest.fn(),
    errors: {},
    isCreating: false,
    ...props,
  };

  return render(
    <Provider store={initializeStore()}>
      <InstitutionForm {...defaultProps} />
    </Provider>,
  );
};

describe('Test suite for InstitutionForm', () => {
  describe('Field rendering', () => {
    test('renders all base fields', () => {
      renderComponent();

      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Short name')).toBeInTheDocument();
      expect(screen.getByLabelText('External Id')).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /active/i })).toBeInTheDocument();
    });

    test('renders support link field when isCreating is false', () => {
      renderComponent({ isCreating: false });

      expect(screen.getByLabelText('Support link')).toBeInTheDocument();
    });

    test('does not render support link field when isCreating is true', () => {
      renderComponent({ isCreating: true });

      expect(screen.queryByLabelText('Support link')).not.toBeInTheDocument();
    });
  });

  describe('Error messages', () => {
    test('displays name error message', () => {
      const errors = { name: 'Institution with this name already exists.' };
      renderComponent({ errors });

      expect(screen.getByText(errors.name)).toBeInTheDocument();
    });

    test('displays shortName error message', () => {
      const errors = { shortName: 'Institution with this short name already exists.' };
      renderComponent({ errors });

      expect(screen.getByText(errors.shortName)).toBeInTheDocument();
    });

    test('displays externalId error message', () => {
      const errors = { externalId: 'This external ID is already in use.' };
      renderComponent({ errors });

      expect(screen.getByText(errors.externalId)).toBeInTheDocument();
    });

    test('displays supportLink error message', () => {
      const errors = { supportLink: 'Invalid support link format.' };
      renderComponent({ errors, isCreating: false });

      expect(screen.getByText(errors.supportLink)).toBeInTheDocument();
    });

    test('does not display error messages when errors object is empty', () => {
      const { container } = renderComponent({ errors: {} });

      expect(container.querySelector('.pgn__form-control-feedback')).not.toBeInTheDocument();
    });
  });

  describe('Checkbox behavior', () => {
    test('renders checkbox as checked when active is true', () => {
      renderComponent();

      expect(screen.getByRole('checkbox', { name: /active/i })).toBeChecked();
    });

    test('renders checkbox as unchecked when active is false', () => {
      const fields = {
        active: false, name: '', shortName: '', externalId: '', supportLink: '',
      };
      renderComponent({ fields });

      expect(screen.getByRole('checkbox', { name: /active/i })).not.toBeChecked();
    });

    test('calls setFields toggling active when checkbox is clicked', () => {
      const setFields = jest.fn();
      const fields = {
        active: true, name: '', shortName: '', externalId: '', supportLink: '',
      };
      renderComponent({ fields, setFields });

      fireEvent.click(screen.getByRole('checkbox', { name: /active/i }));

      expect(setFields).toHaveBeenCalledWith({ ...fields, active: false });
    });
  });

  describe('Input changes', () => {
    test('calls setFields with updated name value on input change', () => {
      const setFields = jest.fn();
      const fields = {
        active: true, name: '', shortName: '', externalId: '', supportLink: '',
      };
      renderComponent({ fields, setFields });

      fireEvent.change(screen.getByLabelText('Name'), { target: { name: 'name', value: 'New Institution' } });

      expect(setFields).toHaveBeenCalledWith({ ...fields, name: 'New Institution' });
    });
  });
});
