import React from 'react';

const LoadingSpinner = () => {
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content has-text-centered">
          <img src="/loading.svg" alt="loading..." />
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
