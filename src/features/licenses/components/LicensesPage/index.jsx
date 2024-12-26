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
import {
  fetchLicenses, createLicense, editLicense,
} from 'features/licenses/data';
import { fetchInstitutions } from 'features/institutions/data';
import { has } from 'lodash';

import { openLicenseModal, closeLicenseModal } from 'features/licenses/data/slices';

const initialFormValues = {
  licenseName: '',
  institution: '',
  courses: [],
  status: 'active',
  courseAccessDuration: 180,
  catalogs: [],
};

const LicensesPage = () => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(initialFormValues);
  const { selectedInstitution } = useSelector(state => state.page.globalFilters);
  const { data, form } = useSelector(state => state.licenses);
  const create = !has(form.license, 'id');

  useEffect(() => {
    dispatch(changeTab(TabIndex.LICENSES));
    dispatch(fetchLicenses(selectedInstitution));
    dispatch(fetchInstitutions());
  }, [dispatch, selectedInstitution]);

  useEffect(() => {
    if (!create) {
      setFields({
        licenseName: form.license.licenseName,
        status: form.license.status,
        courses: form.license.courses,
        license: form.license.id,
        institution: form.license.institution,
        catalogs: form.license.catalogs || [],
      });
    }
  }, [create, form]);

  const handleCloseModal = () => {
    setFields(initialFormValues);
    dispatch(closeLicenseModal());
  };

  const handleOpenModal = () => {
    setFields(initialFormValues);
    dispatch(openLicenseModal());
  };

  const handleSubmit = () => {
    if (create) {
      dispatch(
        createLicense(
          fields.licenseName,
          parseInt(fields.institution, 10),
          fields.courses,
          fields.courseAccessDuration,
          fields.status,
          fields.catalogs,
        ),
      );
    } else {
      dispatch(
        editLicense(
          fields.licenseName,
          parseInt(fields.license, 10),
          fields.status,
          fields.courses,
        ),
      );
    }
  };

  return (
    <Container className="pr-6 pl-6 pt-4 pb-4">
      <Modal
        title={!create ? `Edit license for ${fields.institution} Institution:` : 'Add license:  '}
        isOpen={form.isOpen}
        handleCloseModal={handleCloseModal}
        handlePrimaryAction={handleSubmit}
        size="lg"
      >
        <LicenseForm
          created={create}
          courses_selected={[]}
          fields={fields}
          setFields={setFields}
          errors={form.errors}
        />
      </Modal>
      <ActionRow className="pb-4">
        <Button variant="outline-primary" onClick={handleOpenModal} iconBefore={Add}>Add license</Button>
      </ActionRow>
      <LicenseTable data={data} />
    </Container>
  );
};

export { LicensesPage };
