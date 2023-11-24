import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ children }) {
  return (
    <div className={modalOverlayStyles.overlay} id="overlay">
      {children}
    </div>
  )
}

export default ModalOverlay;