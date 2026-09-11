import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '@openedx/paragon/dist/DataTable';
import { Row, Col } from '@openedx/paragon';
import { PersistController } from 'features/shared/components/PersistController';
import BulkSelectionBar from 'features/enrollments/components/BulkSelection/BulkSelectionBar';
import { SelectionContext } from 'features/enrollments/components/BulkSelection/SelectionContext';
import { selectColumn } from './columns';
import './index.scss';

const StudentEnrollmentsTable = React.memo(({
  data,
  count,
  columns,
  hideColumns,
  isLoading,
  hasActiveFilters,
  isError,
  onOpenBulkModal,
  selectedFlatRows,
  selectedRowsMap,
  onToggleRow,
  onSelectAll,
  onClearSelection,
  isSelectingAll,
}) => {
  let emptyContent = 'No enrollments found.';

  if (isError) {
    emptyContent = 'An error occurred while loading enrollments. Please try again.';
  } else if (!hasActiveFilters) {
    emptyContent = 'Set your filters and click search to view the results.';
  }

  const contextValue = React.useMemo(
    () => ({ selectedRowsMap, onToggleRow }),
    [selectedRowsMap, onToggleRow],
  );

  return (
    <SelectionContext.Provider value={contextValue}>
      <Row className="enrollments-table-wrapper justify-content-center my-4 border-gray-300 bg-light-100 my-3">
        <Col xs={12} className="mb-2">
          <BulkSelectionBar
            selectedFlatRows={selectedFlatRows}
            totalCount={count}
            onApplyAction={onOpenBulkModal}
            onSelectAll={onSelectAll}
            onClearSelection={onClearSelection}
            isSelectingAll={isSelectingAll}
          />
        </Col>
        <Col xs={12}>
          <DataTable
            isSelectable
            isSortable
            manualSortBy
            isLoading={isLoading}
            itemCount={count}
            data={data}
            columns={columns}
            initialState={hideColumns}
            manualSelectColumn={selectColumn}
            initialTableOptions={{
              autoResetSelectedRows: false,
              getRowId: (row) => `${row.id}-${row.status}`,
            }}
          >
            <DataTable.TableControlBar />
            <DataTable.Table />
            <DataTable.EmptyTable content={emptyContent} />
            <DataTable.TableFooter />
            <PersistController />
          </DataTable>
        </Col>
      </Row>
    </SelectionContext.Provider>
  );
});

StudentEnrollmentsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  count: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.shape([])),
  hideColumns: PropTypes.oneOfType([PropTypes.object]),
  isLoading: PropTypes.bool,
  hasActiveFilters: PropTypes.bool,
  isError: PropTypes.bool,
  onOpenBulkModal: PropTypes.func.isRequired,
  selectedFlatRows: PropTypes.arrayOf(PropTypes.shape({})),
  selectedRowsMap: PropTypes.shape({}),
  onToggleRow: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onClearSelection: PropTypes.func.isRequired,
  isSelectingAll: PropTypes.bool,
};

StudentEnrollmentsTable.defaultProps = {
  data: [],
  count: 0,
  columns: [],
  hideColumns: {},
  isLoading: false,
  hasActiveFilters: false,
  isError: false,
  selectedFlatRows: [],
  selectedRowsMap: {},
  isSelectingAll: false,
};

export { StudentEnrollmentsTable };
