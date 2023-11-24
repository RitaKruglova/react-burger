import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { useEffect } from 'react';

function Modal({ isOrderDetailsPlace, title, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleOverlayClose(event) {
      if (event.target.id === 'overlay') {
        closeModal();
      }
    }

    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('click', handleOverlayClose);
    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
      document.removeEventListener('keydown', handleEscapeClose);
    }
  })

  return (
    <div className={modalStyles.container}>
      <h4 className={`${modalStyles.title}${isOrderDetailsPlace ? ' text text_type_digits-large' : ''}`}>{title}</h4>
      <CloseIcon type="primary" onClick={closeModal}/>
    </div>
  )
}

export default Modal;