import React from 'react';
import {
  ActionRow, Button, ModalDialog,
} from '@edx/paragon';
import PropTypes from 'prop-types';

import './index.scss';

export const Modal = (props) => {
  const {
    children,
    title,
    isOpen,
    handleCloseModal,
    handlePrimaryAction,
    variant,
    size,
  } = props;

  return (
    <ModalDialog
      title={title}
      isOpen={isOpen}
      onClose={handleCloseModal}
      size={size}
      variant={variant}
      isBlocking
      hasCloseButton={false}
      isFullscreenOnMobile
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {title}
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

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handlePrimaryAction: PropTypes.func.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  variant: 'default',
  size: 'md',
};
