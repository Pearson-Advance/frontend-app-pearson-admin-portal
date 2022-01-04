import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Add } from '@edx/paragon/icons';
import {
  Container, ActionRow, Button,
} from '@edx/paragon';
import { LicenseTable } from 'features/licenses/components/LicenseTable';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';
import { Modal } from 'features/shared/components/Modal';
import { LicenseForm } from 'features/licenses/components/LicenseForm';
import { fetchInstitutions } from 'features/institutions/data';
import { createLicense, fetchLicenseManageCourses } from 'features/licenses/data';
import { openLicenseModal, closeLicenseModal } from 'features/licenses/data/slices';

const initialFormValues = {
  institution: '',
  course: '',
  status: 'active',
  courseAccessDuration: 180,
};

const LicensesPage = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(state => state.licenses);
  const [fields, setFields] = useState(initialFormValues);

  useEffect(() => {
    dispatch(changeTab(TabIndex.LICENSES));
    dispatch(fetchInstitutions());
    dispatch(fetchLicenseManageCourses());
  }, [dispatch]);

  const handleCloseModal = () => {
    setFields(initialFormValues);
    dispatch(closeLicenseModal());
  };

  const handleOpenModal = () => {
    setFields(initialFormValues);
    dispatch(openLicenseModal());
  };

  const handleSubmit = () => {
    dispatch(
      createLicense(
        parseInt(fields.institution, 10),
        fields.course,
        fields.courseAccessDuration,
        fields.status,
      ),
    );
  };

  return (
    <Container className="pr-6 pl-6 pt-4 pb-4">
      <Modal
        title="Add license"
        isOpen={form.isOpen}
        handleCloseModal={handleCloseModal}
        handlePrimaryAction={handleSubmit}
      >
        <LicenseForm
          fields={fields}
          setFields={setFields}
          errors={form.errors}
        />
      </Modal>
      <ActionRow className="pb-4">
        <Button variant="outline-primary" onClick={handleOpenModal} iconBefore={Add}>Add license</Button>
      </ActionRow>
      <LicenseTable />
    </Container>
  );
};

export { LicensesPage };
