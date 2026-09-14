import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { CheckboxControl } from '@openedx/paragon';
import { useSelectionContext } from './SelectionContext';

const ControlledSelect = ({ row }) => {
  const { selectedRowsMap, onToggleRow } = useSelectionContext();
  const rowData = row.original || row;
  const id = `${rowData.id}-${rowData.status}`;
  const isChecked = Boolean(selectedRowsMap[id]);

  const handleChange = useCallback(() => {
    onToggleRow(rowData);
  }, [rowData, onToggleRow]);

  return (
    <CheckboxControl
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

ControlledSelect.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      status: PropTypes.string,
    }),
  }).isRequired,
};

export default ControlledSelect;
