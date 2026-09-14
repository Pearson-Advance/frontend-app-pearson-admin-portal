import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';
import { BulkActionBar } from './BulkActionBar';

const BulkSelectionBar = ({
  selectedFlatRows,
  totalCount,
  onApplyAction,
  onSelectAll,
  onClearSelection,
  isSelectingAll,
}) => {
  const selectedCount = selectedFlatRows.length;

  if (selectedCount === 0) {
    return null;
  }

  const allSelected = selectedCount >= totalCount;

  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div>
        <span className="mr-2">{selectedCount} selected</span>
        {!allSelected && (
          <Button
            variant="link"
            size="inline"
            className="p-0 mr-2"
            onClick={onSelectAll}
            disabled={isSelectingAll}
          >
            {isSelectingAll ? 'Selecting all…' : `Select all ${totalCount}`}
          </Button>
        )}
        <Button
          variant="link"
          size="inline"
          className="p-0"
          onClick={onClearSelection}
        >
          Clear selection
        </Button>
      </div>

      <BulkActionBar
        onApplyAction={onApplyAction}
        selectedFlatRows={selectedFlatRows}
      />
    </div>
  );
};

BulkSelectionBar.propTypes = {
  selectedFlatRows: PropTypes.arrayOf(PropTypes.shape({})),
  totalCount: PropTypes.number.isRequired,
  onApplyAction: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onClearSelection: PropTypes.func.isRequired,
  isSelectingAll: PropTypes.bool,
};

BulkSelectionBar.defaultProps = {
  selectedFlatRows: [],
  isSelectingAll: false,
};

export default BulkSelectionBar;
