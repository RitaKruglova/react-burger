import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';

function Modal({ isOrderDetailsPlace, title, setIsOrderDetailsModalOpen }) {
  function closeModal() {
    setIsOrderDetailsModalOpen(false);
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
    <ModalOverlay>
      <div className={modalStyles.container}>
        <h4 className={`${modalStyles.title}${isOrderDetailsPlace ? ' text text_type_digits-large mt-30' : 'mt-10'}`}>{title}</h4>
        <div className={`${modalStyles.button} mt-15 mr-10`}>
          <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        {isOrderDetailsPlace ?
          <OrderDetails />
          :
          <p>скоро сделаю</p>
        }
      </div>
    </ModalOverlay>
  )
}

export default Modal;