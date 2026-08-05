import React from 'react';
import { renderWithProvidersAndIntl } from 'test-utils';
import { InstructorsTable } from 'features/instructors/components/InstructorsTable';
import { getColumns } from 'features/instructors/components/InstructorsTable/columns';

describe('Test suite for InstructorsTable', () => {
  const mockData = [
    {
      institutionName: 'MIT',
      instructorName: 'John Doe',
      instructorEmail: 'john@example.com',
      active: true,
      masterCourseName: 'React 101',
      className: 'Class A',
      startDate: '2026-01-01T00:00:00Z',
      endDate: '2026-12-31T00:00:00Z',
    },
    {
      institutionName: 'Harvard',
      instructorName: 'Jane Smith',
      instructorEmail: 'jane@example.com',
      active: false,
      masterCourseName: 'Node.js Basics',
      className: 'Class B',
      startDate: '2026-02-01T00:00:00Z',
      endDate: '2026-11-30T00:00:00Z',
    },
  ];

  test('render InstructorsTable with no data', () => {
    const component = renderWithProvidersAndIntl(
      <InstructorsTable
        data={[]}
        count={0}
        columns={getColumns()}
      />,
    );

    expect(component.container).toHaveTextContent('No instructor data found.');
  });

  test('render InstructorsTable with data', () => {
    const component = renderWithProvidersAndIntl(
      <InstructorsTable
        data={mockData}
        count={mockData.length}
        columns={getColumns()}
      />,
    );

    const tableRows = component.container.querySelectorAll('tr');

    expect(component.container).not.toHaveTextContent('No instructor data found.');
    expect(tableRows).toHaveLength(3);
    expect(component.container).toHaveTextContent('MIT');
    expect(component.container).toHaveTextContent('Harvard');
    expect(component.container).toHaveTextContent('John Doe');
    expect(component.container).toHaveTextContent('Jane Smith');
    expect(component.container).toHaveTextContent('john@example.com');
    expect(component.container).toHaveTextContent('jane@example.com');
    expect(component.container).toHaveTextContent('Active');
    expect(component.container).toHaveTextContent('Inactive');
    expect(component.container).toHaveTextContent('React 101');
    expect(component.container).toHaveTextContent('Node.js Basics');
    expect(component.container).toHaveTextContent('Class A');
    expect(component.container).toHaveTextContent('Class B');
    expect(component.container).toHaveTextContent('01/01/26');
    expect(component.container).toHaveTextContent('12/31/26');
  });
});
