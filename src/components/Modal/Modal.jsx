import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, DivModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <DivModal>{this.props.children}</DivModal>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
