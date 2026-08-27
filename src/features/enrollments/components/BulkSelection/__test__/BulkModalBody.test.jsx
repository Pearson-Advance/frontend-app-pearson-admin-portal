/* eslint-disable react/prop-types */
import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvidersAndIntl } from 'test-utils';
import BulkModalBody from 'features/enrollments/components/BulkSelection/BulkModalBody';

jest.mock('features/enrollments/components/StudentEnrollmentsPage/components/DateExtensionForm', () => function DummyDateExtensionForm({ extendDate }) {
  return <div data-testid="date-extension-form">{extendDate}</div>;
});

describe('BulkModalBody', () => {
  const defaultProps = {
    extendDate: '2026-12-31',
    onDateChange: jest.fn(),
    selectedCount: 3,
    statusText: 'revoked',
  };

  test('renders DateExtensionForm when isExtendAction is true', () => {
    renderWithProvidersAndIntl(
      <BulkModalBody {...defaultProps} isExtendAction />,
    );

    expect(screen.getByTestId('date-extension-form')).toBeInTheDocument();
    expect(screen.queryByText(/selected learners will be/i)).not.toBeInTheDocument();
  });

  test('renders BulkEnrollmentConfirmation when isExtendAction is false', () => {
    renderWithProvidersAndIntl(
      <BulkModalBody {...defaultProps} isExtendAction={false} />,
    );

    expect(screen.queryByTestId('date-extension-form')).not.toBeInTheDocument();
    expect(screen.getByText(/selected learners will be/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
