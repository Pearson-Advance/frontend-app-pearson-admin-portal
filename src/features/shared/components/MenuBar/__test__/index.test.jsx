/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { fireEvent } from '@testing-library/dom';

import { MenuBar } from 'features/shared/components/MenuBar';
import { renderWithProviders } from 'test-utils';

const mockNavigate = jest.fn();
const mockLocation = { pathname: '/' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe('MenuBar tests', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLocation.pathname = '/';
  });

  test('renders MenuBar component', () => {
    const component = renderWithProviders(<MenuBar />, { route: '/' });
    const navLinks = component.container.querySelectorAll('a');

    expect(component.container).toHaveTextContent('Institutions');
    expect(navLinks).toHaveLength(5);
  });

  test('does not navigate when clicking current route (institutions)', () => {
    mockLocation.pathname = '/';

    const component = renderWithProviders(<MenuBar />, { route: '/' });

    fireEvent.click(component.getByText('Institutions'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navigates to the licenses URL on clicking the licenses button', () => {
    mockLocation.pathname = '/';

    const component = renderWithProviders(<MenuBar />, { route: '/' });

    fireEvent.click(component.getByText('Licenses'));

    expect(mockNavigate).toHaveBeenCalledWith('/licenses');
  });
});
