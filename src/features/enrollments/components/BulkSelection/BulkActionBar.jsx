import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, OverlayTrigger, Tooltip } from '@openedx/paragon';
import { getAvailableBulkActions } from 'features/shared/data/utils';
import { BULK_ACTION_LABELS } from 'features/shared/data/constants';

export const BulkActionBar = ({
  selectedFlatRows = [],
  onApplyAction,
}) => {
  const selectedRowsData = selectedFlatRows.map((row) => row.original || row);

  const availableActions = getAvailableBulkActions(selectedRowsData);
  const hasCommonActions = availableActions.length > 0 && selectedRowsData.length > 0;

  const dropdownButton = (
    <div style={{ display: 'inline-block' }} tabIndex={!hasCommonActions ? 0 : undefined}>
      <Dropdown
        onSelect={(actionKey) => {
          if (actionKey) {
            onApplyAction(actionKey, selectedFlatRows);
          }
        }}
      >
        <Dropdown.Toggle
          id="bulk-actions-dropdown-toggle"
          variant="primary"
          disabled={!hasCommonActions}
        >
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {availableActions.map((actionKey) => (
            <Dropdown.Item key={actionKey} eventKey={actionKey}>
              {BULK_ACTION_LABELS[actionKey] || actionKey}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  if (!hasCommonActions && selectedRowsData.length > 0) {
    return (
      <OverlayTrigger
        placement="top"
        overlay={(
          <Tooltip id="no-common-actions-tooltip">
            There are no applicable actions for the selected combination of items.
          </Tooltip>
        )}
      >
        {dropdownButton}
      </OverlayTrigger>
    );
  }

  return dropdownButton;
};

BulkActionBar.propTypes = {
  selectedFlatRows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    learnerEmail: PropTypes.string,
    ccxId: PropTypes.string,
    ccxName: PropTypes.string,
    institution: PropTypes.string,
    masterCourseId: PropTypes.string,
    masterCourseName: PropTypes.string,
  })),
  onApplyAction: PropTypes.func.isRequired,
};

BulkActionBar.defaultProps = {
  selectedFlatRows: [],
};
