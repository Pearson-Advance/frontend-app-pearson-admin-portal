import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvidersAndIntl } from 'test-utils';
import BulkEnrollmentConfirmation from 'features/enrollments/components/BulkSelection/BulkEnrollmentConfirmation';

describe('BulkEnrollmentConfirmation', () => {
  test('renders message for singular learner and "from" preposition', () => {
    renderWithProvidersAndIntl(
      <BulkEnrollmentConfirmation selectedCount={1} statusText="revoked" />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('revoked')).toBeInTheDocument();
    expect(screen.getByText(/selected learner will be/i)).toBeInTheDocument();
    expect(screen.getByText(/from their respective courses/i)).toBeInTheDocument();
  });

  test('renders message for plural learners and "to" preposition when status is enrolled', () => {
    renderWithProvidersAndIntl(
      <BulkEnrollmentConfirmation selectedCount={5} statusText="enrolled" />,
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('enrolled')).toBeInTheDocument();
    expect(screen.getByText(/selected learners will be/i)).toBeInTheDocument();
    expect(screen.getByText(/to their respective courses/i)).toBeInTheDocument();
  });
});
