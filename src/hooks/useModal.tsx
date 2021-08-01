import { useContext } from 'react';

import { ModalContext } from '../contexts/ModalContext';

export default useModal;

function useModal() {
  return useContext(ModalContext);
}
