import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CheckboxControl } from '@openedx/paragon';

const useConvertIndeterminateProp = (props) => {
  const updatedProps = useMemo(() => {
    const { indeterminate, ...rest } = props;
    return { isIndeterminate: indeterminate, ...rest };
  }, [props]);
  return updatedProps;
};

const ControlledSelect = ({ row }) => {
  const toggleSelected = useCallback(() => {
    row.toggleRowSelected();
  }, [row]);

  const updatedProps = useConvertIndeterminateProp(row.getToggleRowSelectedProps());

  return (
    <CheckboxControl
      {...updatedProps}
      onChange={toggleSelected}
    />
  );
};

ControlledSelect.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    getToggleRowSelectedProps: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    toggleRowSelected: PropTypes.func.isRequired,
  }).isRequired,
};

export default ControlledSelect;
