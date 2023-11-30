import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ showModal, onModalClose, imageUrl }) => {
  // ta funkcja pozwala na zamknięcie modala po kliknięciu na overlay. nasłuch handleModalClose został założony na divie-overlay więc event.currentTarget dotyczy właśnie tego diva
  const handleModalClose = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  useEffect(() => {
    //funkcja która działa tak: jeśli modal jest otwarty i jednocześnie zostaje naciśnięty ESC - zamyka się modal. OnModalClose ma swoje źrodło w app.jsx
    const handleKeyUp = event => {
      if (event.key === 'Escape' && showModal) {
        onModalClose();
      }
    };
    //dadanie nasłuchu podczas montowania komponentu
    const keyListener = window.addEventListener('keydown', handleKeyUp);
    //usunięcie nasłuchu po odmontowaniu komponentu
    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, [showModal, onModalClose]);

  return (
    <div className={css.Overlay} onClick={handleModalClose}>
      <div className={css.Modal}>
        <img className={css.ModalImage} src={imageUrl} alt="Large" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export { Modal };
