import React from 'react';
import { Factory } from 'rosie';
import { screen, fireEvent } from '@testing-library/react';
import { InstitutionAdminsPage } from 'features/institutionAdmins/components/InstitutionAdminsPage';
import { renderWithProvidersAndIntl } from 'test-utils';

let store;
let component;

describe('Test suite for InstitutionAdminsPage component.', () => {
  beforeEach(() => {
    component = renderWithProvidersAndIntl(<InstitutionAdminsPage data={[]} />);
    store = component.store;

    Factory.resetAll();
  });

  test('render InstitutionAdminsPage component', () => {
    expect(component.container.querySelectorAll('table')).toHaveLength(1);
  });

  test('click on add institution admin button to open the modal form', () => {
    const beforeClick = store.getState().admins;
    const expected = {
      ...beforeClick,
      form: {
        ...beforeClick.form,
        isOpen: true,
      },
    };
    const addButton = screen.getByRole('button', { name: 'Add admin' });

    fireEvent.click(addButton);

    expect(store.getState().admins).toEqual(expected);
  });

  test('click on add institution admin button to open the modal form, then click on cancel', () => {
    const beforeClick = store.getState().admins;
    const expected = {
      ...beforeClick,
      form: {
        ...beforeClick.form,
        isOpen: false,
      },
    };
    const addButton = screen.getByRole('button', { name: 'Add admin' });

    fireEvent.click(addButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    fireEvent.click(cancelButton);

    expect(store.getState().admins).toEqual(expected);
  });
});
