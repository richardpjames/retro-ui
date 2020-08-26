const useModalsController = (setOptions, setVisible) => {
  // Function for showing the modal
  const showModal = async (options) => {
    // These are the blank options which will be applied if none provided
    const defaultOptions = {
      title: 'RetroSpectacle',
      message: 'No Message',
      action: 'Okay',
      markdown: '',
      danger: false,
      icon: 'fas fa-check',
      function: () => {},
      hideCancel: false,
    };
    // Set the options for the modal and set its visibility to false
    setOptions({ ...defaultOptions, ...options });
    setVisible(true);
  };
  // Only one funtion, which sets the modal and makes it visible
  return { showModal };
};

export default useModalsController;
