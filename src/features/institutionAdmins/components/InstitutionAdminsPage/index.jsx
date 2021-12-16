import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionRow, Button } from '@edx/paragon';
import { Add } from '@edx/paragon/icons';
import Container from '@edx/paragon/dist/Container';
import { InstitutionAdminForm } from 'features/institutionAdmins/components/institutionAdminForm';
import { InstitutionAdminsTable } from 'features/institutionAdmins/components/InstitutionAdminsTable';
import { fetchInstitutionAdmins, selectAdmins, createInstitutionAdmin } from 'features/institutionAdmins/data';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';
import { Modal } from 'features/shared/components/Modal';
import { closeModal, openModal } from 'features/institutionAdmins/data/slices';

const initialFormValues = {
  institutionId: '',
  adminEmail: '',
};

const InstitutionAdminsPage = () => {
  const dispatch = useDispatch();
  const { data, form } = useSelector(selectAdmins);
  const [fields, setFields] = useState(initialFormValues);

  const handleCloseModal = () => {
    setFields(initialFormValues);
    dispatch(closeModal());
  };

  const handleOpenModal = () => {
    setFields(initialFormValues);
    dispatch(openModal());
  };

  const handleSubmit = () => {
    dispatch(createInstitutionAdmin(parseInt(fields.institutionId, 10), fields.adminEmail));
  };

  useEffect(() => {
    dispatch(changeTab(TabIndex.ADMINS));
    dispatch(fetchInstitutionAdmins());
  }, [dispatch]);

  return (
    <Container size="xl">
      <Modal
        title="Add admin"
        isOpen={form.isOpen}
        handleCloseModal={handleCloseModal}
        handlePrimaryAction={handleSubmit}
      >
        <InstitutionAdminForm
          fields={fields}
          setFields={setFields}
          errors={form.errors}
        />
      </Modal>
      <ActionRow className="pt-4">
        <Button variant="outline-primary" onClick={handleOpenModal} iconBefore={Add}>Add admin</Button>
      </ActionRow>
      <InstitutionAdminsTable data={data} />
    </Container>
  );
};

export { InstitutionAdminsPage };
