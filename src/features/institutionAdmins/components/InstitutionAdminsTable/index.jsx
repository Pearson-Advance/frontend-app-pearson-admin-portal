import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DataTable from '@edx/paragon/dist/DataTable';
import {
  Row, Col, TextFilter, useToggle,
} from '@edx/paragon';
import { editInstitutionAdmin } from 'features/institutionAdmins/data';
import { Modal } from 'features/shared/components/Modal';
import { isEmpty } from 'lodash';
import { getColumns } from './columns';

const InstitutionAdminsTable = ({ data }) => {
  const dispatch = useDispatch();
  const [isOpen, open, close] = useToggle(false);
  const [selectedRow, setRow] = useState({});
  const targetState = selectedRow.active ? 'disable' : 'enable';

  const handleSubmit = () => {
    if (!isEmpty(selectedRow)) {
      dispatch(editInstitutionAdmin(parseInt(selectedRow.id, 10), !selectedRow.active));
    }

    setRow({});
    close();
  };

  const columns = getColumns({ open, setRow });

  return (
    <>
      <Row className="justify-content-center my-4 border-gray-300 bg-light-100 my-3">
        <Col xs={12}>
          <DataTable
            isSortable
            isFilterable
            showFiltersInSidebar
            isPaginated
            defaultColumnValues={{ Filter: TextFilter }}
            initialState={{
              pageSize: 10,
              pageIndex: 0,
            }}
            itemCount={data.length}
            data={data}
            columns={columns}
          >
            <DataTable.Table />
            <DataTable.EmptyTable content="No results found." />
            <DataTable.TableFooter />
          </DataTable>
        </Col>
      </Row>
      <Modal
        title={`Are you sure you want to ${targetState} the admin?`}
        isOpen={isOpen}
        handleCloseModal={close}
        handlePrimaryAction={handleSubmit}
        variant="warning"
      >
        {selectedRow.active
        && <p>This operation will remove <b>{`${selectedRow.user.username}'s`}</b> accesses of all licensed courses of <b>{`${selectedRow.institution.name}`}.</b></p>}
      </Modal>
    </>
  );
};

InstitutionAdminsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

InstitutionAdminsTable.defaultProps = {
  data: [],
};

export { InstitutionAdminsTable };
