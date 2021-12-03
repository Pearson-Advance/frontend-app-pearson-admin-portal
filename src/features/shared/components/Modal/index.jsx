import React from 'react';
import {
  ActionRow, Button, ModalDialog,
} from '@edx/paragon';

import './index.scss';

export const Modal = (props) => {
  const {
    children,
    title,
    isOpen,
    handleCloseModal,
    handlePrimaryAction,
  } = props;

  return (
    <ModalDialog
      title={title}
      isOpen={isOpen}
      onClose={handleCloseModal}
      size="md"
      variant="default"
      isBlocking
      hasCloseButton={false}
      isFullscreenOnMobile
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          Add institution
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body className="modal-body-overflow-initial">
        {children}
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <Button variant="tertiary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePrimaryAction}>
            Save
          </Button>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};
