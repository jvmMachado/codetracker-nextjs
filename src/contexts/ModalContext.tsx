import { createContext, useState, ReactNode } from 'react';

export { ModalContext, ModalContextProvider };

type ModalContextType = {
  modalOpen: boolean;
  toggleModal: () => void;
  editModalOpen: boolean;
  toggleEditModal: () => void;
};

const ModalContext = createContext({} as ModalContextType);

//

type ModalProviderProps = {
  children: ReactNode;
};

function ModalContextProvider({ children }: ModalProviderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((e) => !e);
  };

  const toggleEditModal = () => {
    setEditModalOpen((e) => !e);
  };

  return (
    <ModalContext.Provider
      value={{ modalOpen, editModalOpen, toggleModal, toggleEditModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
