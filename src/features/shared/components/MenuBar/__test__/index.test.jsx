/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { MenuBar } from 'features/shared/components/MenuBar';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: '/',
    },
  }),
}));

describe('MenuBar tests', () => {
  test('renders MenuBar component', () => {
    const component = render(<MenuBar />);
    const navLinks = component.container.querySelectorAll('a');

    expect(component.container).toHaveTextContent('Institutions');
    expect(navLinks).toHaveLength(4);
  });

  test('redirects to the institutions URL on clicking the institutions button', () => {
    const component = render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>,
    );

    fireEvent.click(component.getByText('Institutions'));

    expect(mockHistoryPush).not.toHaveBeenCalledWith('/');
  });

  test('redirects to the licenses URL on clicking the licenses button', () => {
    const component = render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>,
    );

    fireEvent.click(component.getByText('Licenses'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/license');
  });
});
