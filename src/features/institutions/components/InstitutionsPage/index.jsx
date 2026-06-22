import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@openedx/paragon/dist/Container';
import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';
import {
  fetchInstitutions, createInstitution, editInstitution, cancelFetchInstitutions,
} from 'features/institutions/data';
import { InstitutionForm } from 'features/institutions/components/institutionForm';
import { Add } from '@openedx/paragon/icons';
import { ActionRow, Button } from '@openedx/paragon';
import { Modal } from 'features/shared/components/Modal';
import { closeModalForm, openModalForm, resetStatus } from 'features/institutions/data/slices';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex, RequestStatus } from 'features/shared/data/constants';
import { has } from 'lodash';

const initialFormValues = {
  id: '',
  name: '',
  shortName: '',
  externalId: '',
  supportLink: '',
  active: true,
};

const InstitutionsPage = () => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(initialFormValues);
  const { data, form, status: institutionsStatus } = useSelector(state => state.institutions);
  const { selectedInstitution } = useSelector(state => state.page.globalFilters);
  const create = !has(form.institution, 'id');

  const handleCloseModal = () => {
    setFields(initialFormValues);
    dispatch(closeModalForm());
  };

  const handleOpenModal = () => {
    setFields(initialFormValues);
    dispatch(openModalForm());
  };

  const handleSubmit = () => {
    if (create) {
      dispatch(createInstitution(
        fields.name,
        fields.shortName,
        fields.externalId,
        fields.active,
      ));
    } else {
      dispatch(editInstitution(
        form.institution.id,
        fields.name,
        fields.shortName,
        fields.externalId,
        fields.active,
      ));
    }
  };

  useEffect(() => {
    dispatch(changeTab(TabIndex.INSTITUTIONS));
    dispatch(fetchInstitutions(selectedInstitution));
    return () => {
      dispatch(cancelFetchInstitutions());
      dispatch(resetStatus());
    };
  }, [dispatch, selectedInstitution]);

  useEffect(() => {
    if (!create) {
      setFields({
        name: form.institution.name,
        shortName: form.institution.shortName,
        externalId: form.institution.externalId,
        active: form.institution.active,
        supportLink: form.institution.supportLink,
      });
    }
  }, [dispatch, create, form]);

  return (
    <Container size="xl">
      <Modal
        title={create ? 'Add institution' : `Edit institution: ${form.institution.shortName}`}
        isOpen={form.isOpen}
        handleCloseModal={handleCloseModal}
        handlePrimaryAction={handleSubmit}
      >
        <InstitutionForm
          fields={fields}
          setFields={setFields}
          errors={form.errors}
          isCreating={create}
        />
      </Modal>
      <ActionRow className="pt-4">
        <Button variant="outline-primary" onClick={handleOpenModal} iconBefore={Add}>Add institution</Button>
      </ActionRow>
      <InstitutionsTable data={data} isLoading={institutionsStatus === RequestStatus.IN_PROGRESS} />
    </Container>
  );
};

export { InstitutionsPage };
