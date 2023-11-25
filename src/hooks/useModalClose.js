import { useEffect } from 'react';

export function useModalClose(closeModal) {
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
}