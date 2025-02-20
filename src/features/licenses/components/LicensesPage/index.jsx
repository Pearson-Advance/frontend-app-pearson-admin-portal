import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { Add } from '@edx/paragon/icons';
import {
  Container, ActionRow, Button,
} from '@edx/paragon';
import { LicenseTable } from 'features/licenses/components/LicenseTable';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex, LicenseTypes } from 'features/shared/data/constants';
import { Modal } from 'features/shared/components/Modal';
import { LicenseForm } from 'features/licenses/components/LicenseForm';
import {
  fetchLicenses, createLicense, editLicense, fetchCatalogs,
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
  licenseType: LicenseTypes.COURSES,
};

const LicensesPage = () => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(initialFormValues);
  const { selectedInstitution } = useSelector(state => state.page.globalFilters);
  const { data, form } = useSelector(state => state.licenses);
  const [isLoading, setIsLoading] = useState(false);
  const create = !has(form.license, 'id');

  const showCatalogSelector = getConfig().SHOW_CATALOG_SELECTOR || false;

  useEffect(() => {
    dispatch(changeTab(TabIndex.LICENSES));
    dispatch(fetchLicenses(selectedInstitution));
    dispatch(fetchInstitutions());
    if (showCatalogSelector) {
      dispatch(fetchCatalogs());
    }
  }, [dispatch, selectedInstitution, showCatalogSelector]);

  useEffect(() => {
    if (!create) {
      setFields({
        licenseName: form.license.licenseName,
        status: form.license.status,
        courses: form.license.courses,
        license: form.license.id,
        institution: form.license.institution,
        catalogs: form.license.catalogs || [],
        licenseType: form.license.licenseType,
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

  const handleSubmit = async () => {
    setIsLoading(true);

    if (isLoading) {
      return null;
    }

    if (create) {
      const newLicenseData = {
        licenseName: fields.licenseName,
        institution: parseInt(fields.institution, 10),
        courses: fields.courses,
        courseAccessDuration: fields.courseAccessDuration,
        status: fields.status,
        catalogs: fields.catalogs,
        licenseType: fields.licenseType,
      };
      await dispatch(
        createLicense(newLicenseData),
      );
    } else {
      const editData = {
        licenseName: fields.licenseName,
        licenseId: parseInt(fields.license, 10),
        status: fields.status,
        courses: fields.courses,
        catalogs: fields.catalogs,
        licenseType: fields.licenseType,
      };
      await dispatch(
        editLicense(editData),
      );
    }

    setIsLoading(false);
    return null;
  };

  return (
    <Container className="pr-6 pl-6 pt-4 pb-4">
      <Modal
        title={!create ? `Edit license for ${fields.institution} Institution:` : 'Add license:  '}
        isOpen={form.isOpen}
        handleCloseModal={handleCloseModal}
        handlePrimaryAction={handleSubmit}
        size="lg"
        disablePrimaryAction={isLoading}
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
