import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useModalClose } from '../../hooks/useModalClose';
import { FC, ReactNode } from 'react';

interface IModalProps {
  isOrderDetails: boolean;
  isOrderPage?: boolean;
  title: string | number;
  children: ReactNode;
  closeModal: () => void;
}

const Modal: FC<IModalProps> = ({ isOrderDetails, isOrderPage, title, children, closeModal}) => {
  useModalClose(closeModal);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={modalStyles.container}>
        <h4 className={`${isOrderDetails ? 'mt-30 text text_type_digits-large' : `mt-10 ${modalStyles.title} text text_type_main-large`} ${isOrderPage ? 'text text_type_digits-default' : ''}`}>{title}</h4>
        <div className={`${modalStyles.button} mt-15 mr-10`}>
          <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

export default Modal;