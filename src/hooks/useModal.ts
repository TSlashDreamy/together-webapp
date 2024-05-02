import { useCallback, useState } from "react";

interface IModalProps {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

export const useModal = (): IModalProps => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hideModal = useCallback(() => setIsVisible(false), [setIsVisible]);
  const showModal = useCallback(() => setIsVisible(true), [setIsVisible]);

  return {
    isVisible,
    showModal,
    hideModal,
  };
};
