import { useCallback, useMemo, useState } from "react";

export const useControlModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const result = useMemo(
    () => ({ isOpen, openModal, closeModal }),
    [closeModal, isOpen, openModal]
  );

  return result;
};
