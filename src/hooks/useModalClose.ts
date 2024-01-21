import { useEffect } from 'react';

export const useModalClose = (closeModal: () => void): void => {
  useEffect(() => {
    function handleOverlayClose(event: MouseEvent) {
      if (event.target instanceof HTMLElement && event.target.id === 'overlay') {
        closeModal();
      }
    }

    function handleEscapeClose(event: KeyboardEvent) {
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