import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ children }) {
  return (
    <div className={modalOverlayStyles.overlay} id="overlay">
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node
}

export default ModalOverlay;