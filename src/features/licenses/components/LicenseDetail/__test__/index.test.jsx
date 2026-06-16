/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Factory } from 'rosie';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { LicenseDetail } from 'features/licenses/components/LicenseDetail';
import 'features/licenses/data/__factories__';
import { TabIndex, DELETE_ORDER_ERROR_MESSAGES } from 'features/shared/data/constants';

import { initializeStore } from 'store';
import { renderWithProvidersAndIntl } from 'test-utils';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: 1 }),
}));

const licensesApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
const licensesOrdersApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-orders/`;

const licenseData = {
  institution: { name: 'Training center 1' },
  courses: [{ displayName: 'Master Course' }],
  purchasedSeats: 100,
  courseAccessDuration: 180,
  status: 'active',
  licenseOrder: Factory.buildList('licenseOrder', 2),
};

describe('Test suite for license detail component.', () => {
  let axiosMock;
  let store;

  beforeEach(() => {
    mockNavigate.mockClear();

    initializeMockApp({
      authenticatedUser: {
        userId: 1,
        username: 'testuser',
        administrator: true,
        roles: [],
      },
    });

    axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    store = initializeStore();
  });

  afterEach(() => {
    axiosMock?.restore();
  });

  test('render license detail component', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseData);

    const { container } = renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(container).toHaveTextContent('Training center 1');
    });

    expect(container).toHaveTextContent('Master Course');
    expect(store.getState().page.tab).toEqual(TabIndex.LICENSES);
  });

  test('render license detail with no orders', async () => {
    const licenseDataNoOrders = { ...licenseData, licenseOrder: [] };
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseDataNoOrders);

    const { container } = renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(container).toHaveTextContent('Training center 1');
    });

    expect(container).toHaveTextContent('No orders found.');
  });

  test('removes an order after confirming in the modal', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseData);
    axiosMock.onDelete(new RegExp(`${licensesOrdersApiUrl}\\d+/`)).reply(204);

    renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(screen.getAllByLabelText('Remove order').length).toBeGreaterThan(0);
    });

    fireEvent.click(screen.getAllByLabelText('Remove order')[0]);

    expect(screen.getByText('Are you sure you want to remove this order? This will deactivate it.'))
      .toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    await waitFor(() => {
      expect(axiosMock.history.delete.length).toBe(1);
    });

    // The confirmation modal closes once the deletion succeeds.
    await waitFor(() => {
      expect(screen.queryByText('Are you sure you want to remove this order? This will deactivate it.'))
        .not.toBeInTheDocument();
    });
  });

  test('disables the Remove button while the deletion request is in flight', async () => {
    let resolveDelete;
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseData);
    axiosMock.onDelete(new RegExp(`${licensesOrdersApiUrl}\\d+/`)).reply(
      () => new Promise((resolve) => { resolveDelete = () => resolve([204]); }),
    );

    renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(screen.getAllByLabelText('Remove order').length).toBeGreaterThan(0);
    });

    fireEvent.click(screen.getAllByLabelText('Remove order')[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    // While the request is pending the primary action is disabled so it cannot be re-submitted.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled();
    });

    resolveDelete();

    await waitFor(() => {
      expect(axiosMock.history.delete.length).toBe(1);
    });
  });

  test('shows an error message when removing an order is forbidden', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseData);
    axiosMock.onDelete(new RegExp(`${licensesOrdersApiUrl}\\d+/`)).reply(403);

    renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(screen.getAllByLabelText('Remove order').length).toBeGreaterThan(0);
    });

    fireEvent.click(screen.getAllByLabelText('Remove order')[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    await waitFor(() => {
      expect(screen.getByText(DELETE_ORDER_ERROR_MESSAGES[403]))
        .toBeInTheDocument();
    });

    // The modal stays open so the user can read the error.
    expect(screen.getByText('Are you sure you want to remove this order? This will deactivate it.'))
      .toBeInTheDocument();
  });

  test('hides the Edit and Remove actions for inactive orders', async () => {
    const mixedOrders = [
      Factory.build('licenseOrder', { active: true }),
      Factory.build('licenseOrder', { active: false }),
    ];
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, { ...licenseData, licenseOrder: mixedOrders });

    renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(screen.getByText('Training center 1')).toBeInTheDocument();
    });

    // Only the active order exposes the Edit/Remove actions; the inactive one is read-only.
    expect(screen.getAllByLabelText('Remove order')).toHaveLength(1);
    expect(screen.getAllByLabelText('Edit')).toHaveLength(1);
  });

  test('render license detail with a failed request', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(500);

    const { container } = renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(axiosMock.history.get.length).toBeGreaterThan(0);
    });

    expect(container).not.toHaveTextContent('Institution:');
    expect(container.querySelectorAll('table')).toHaveLength(0);
  });
});
