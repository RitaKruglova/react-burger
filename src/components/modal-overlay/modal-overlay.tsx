import { FC, ReactNode } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ children }) => {
  return (
    <div className={modalOverlayStyles.overlay} id="overlay">
      {children}
    </div>
  )
}

export default ModalOverlay;