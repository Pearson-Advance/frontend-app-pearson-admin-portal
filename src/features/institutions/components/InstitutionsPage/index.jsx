import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';
import { fetchInstitutions, createInstitution } from 'features/institutions/data';
import { useLocation } from 'react-router';
import { Filters } from 'features/institutions/components/Filters';
import { InstitutionForm } from 'features/institutions/components/institutionForm';
import { Add } from '@edx/paragon/icons';
import { ActionRow, Button } from '@edx/paragon';
import { Modal } from 'features/shared/components/Modal';
import { closeModalForm, openModalForm } from 'features/institutions/data/slices';

const initialFormValues = {
  id: '',
  name: '',
  shortName: '',
  active: true,
};

const InstitutionsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [fields, setFields] = useState(initialFormValues);
  const { data, form } = useSelector(state => state.institutions);
  const params = new URLSearchParams(location.search);

  const handleCloseModal = () => {
    setFields(initialFormValues);
    dispatch(closeModalForm());
  };

  const handleOpenModal = () => {
    setFields(initialFormValues);
    dispatch(openModalForm());
  };

  const handleSubmit = () => {
    dispatch(createInstitution(
      fields.name,
      fields.shortName,
      fields.active,
    ));
  };

  useEffect(() => {
    dispatch(fetchInstitutions(params.get('search'), params.get('active'), params.get('name')));
  }, [dispatch, location.search]);

  return (
    <Container size="xl">
      <Filters />
      <Modal
        title="Add institution"
        isOpen={form.isOpen}
        handleCloseModal={handleCloseModal}
        handlePrimaryAction={handleSubmit}
      >
        <InstitutionForm
          fields={fields}
          setFields={setFields}
          errors={form.errors}
        />
      </Modal>
      <ActionRow>
        <Button variant="outline-primary" onClick={handleOpenModal} iconBefore={Add}>Add institution</Button>
      </ActionRow>
      <InstitutionsTable data={data} />
    </Container>
  );
};

export { InstitutionsPage };
