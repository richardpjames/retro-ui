import React, { useEffect } from 'react';

const Purchase = () => {
  const Paddle = window.Paddle;

  useEffect(() => {
    Paddle.Checkout.open({
      method: 'inline',
      product: 601119, // Replace with your Product or Plan ID
      allowQuantity: false,
      disableLogout: true,
      frameTarget: 'checkout-container', // The className of your checkout <div>
      frameInitialHeight: 416,
      frameStyle:
        'width:100%; min-width:495px; background-color: transparent; border: none;', // Please ensure the minimum width is kept at or above 495px
    });
  }, [Paddle.Checkout]);

  return (
    <div className="container">
      <div className="checkout-container"></div>
    </div>
  );
};

export default Purchase;
