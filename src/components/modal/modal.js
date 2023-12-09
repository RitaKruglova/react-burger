import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useModalClose } from '../../hooks/useModalClose';

function Modal({ isOrderDetails, title, children, closeModal}) {
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired
}

export default Modal;