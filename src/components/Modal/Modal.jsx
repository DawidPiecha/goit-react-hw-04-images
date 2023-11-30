import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  handleKeyUp = event => {
    const { showModal, onModalClose } = this.props;
    if (event.key === 'Escape' && showModal) {
      onModalClose();
    }
  };

  handleModalClose = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyUp);
  }

  render() {
    const { imageUrl } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleModalClose}>
        <div className={css.Modal}>
          <img className={css.ModalImage} src={imageUrl} alt="Large" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export { Modal };
