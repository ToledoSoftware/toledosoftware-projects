export const usePostModal = () => {
  const isModalOpen = useState('isPostModalOpen', () => false);

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};