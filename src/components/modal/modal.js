import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useModalClose } from '../../hooks/useModalClose';

function Modal({ isOrderDetails, title, setIsModalOpen, children}) {
  function closeModal() {
    setIsModalOpen(false);
  }

  useModalClose(closeModal);

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={modalStyles.container}>
        <h4 className={`${isOrderDetails ? 'mt-30 text text_type_digits-large' : `mt-10 ${modalStyles.title} text text text_type_main-large`}`}>{title}</h4>
        <div className={`${modalStyles.button} mt-15 mr-10`}>
          <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal-root')
  )
}

Modal.propTypes = {
  isOrderDetails: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Modal;