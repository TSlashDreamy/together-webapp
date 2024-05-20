import { useCallback, useState } from "react";

interface ModalState {
  isOpen: boolean;
  showModal: () => void;
  hideModal: () => void;
}

export const useModal = (): ModalState => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hideModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  const showModal = useCallback(() => setIsOpen(true), [setIsOpen]);

  return {
    isOpen,
    showModal,
    hideModal,
  };
};
