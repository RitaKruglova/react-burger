import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';

function Modal({ isOrderDetails, title, setIsModalOpen, currentIngredient = null }) {
  function closeModal() {
    setIsModalOpen(false);
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
        <h4 className={`${isOrderDetails ? 'mt-30 text text_type_digits-large' : `mt-10 ${modalStyles.title} text text text_type_main-large`}`}>{title}</h4>
        <div className={`${modalStyles.button} mt-15 mr-10`}>
          <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        {isOrderDetails ?
          <OrderDetails />
          :
          <IngredientDetails currentIngredient={currentIngredient} />
        }
      </div>
    </ModalOverlay>
  )
}

Modal.propTypes = {
  isOrderDetails: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  currentIngredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(['bun', 'main', 'sauce']),
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })
}

export default Modal;