import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { InstitutionsPage } from 'features/institutions/components/InstitutionsPage';
import { renderWithProvidersAndIntl } from 'test-utils';

let store;
let component;

describe('Test suite for InstitutionsPage component.', () => {
  beforeEach(() => {
    component = renderWithProvidersAndIntl(<InstitutionsPage data={[]} />);
    store = component.store;
  });

  test('render InstitutionsPage component', () => {
    expect(component.container.querySelectorAll('table')).toHaveLength(1);
  });

  test('click on open modal.', () => {
    const beforeClick = store.getState().institutions;
    const expected = {
      ...beforeClick,
      form: {
        ...beforeClick.form,
        isOpen: true,
      },
    };
    const addButton = screen.getByRole('button', { name: 'Add institution' });

    fireEvent.click(addButton);

    expect(store.getState().institutions).toEqual(expected);
  });

  test('click on open modal then on cancel.', () => {
    const beforeClick = store.getState().institutions;
    const expected = {
      ...beforeClick,
      form: {
        ...beforeClick.form,
        isOpen: false,
      },
    };
    const addButton = screen.getByRole('button', { name: 'Add institution' });

    fireEvent.click(addButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    fireEvent.click(cancelButton);

    expect(store.getState().institutions).toEqual(expected);
  });
});
