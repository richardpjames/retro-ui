import React from 'react';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

const Purchase = () => {
  const Paddle = window.Paddle;
  const { user } = useAuth0();

  const openCheckout = () => {
    Paddle.Checkout.open({
      //method: 'inline',
      product: 601119, // Replace with your Product or Plan ID
      allowQuantity: false,
      disableLogout: true,
      email: user.email,
      passthrough: user.sub,
      //frameTarget: 'checkout-container', // The className of your checkout <div>
      //frameInitialHeight: 416,
      //frameStyle:
      //  'width:100%; min-width:495px; background-color: transparent; border: none;', // Please ensure the minimum width is kept at or above 495px
    });
  };

  return (
    <div className="container">
      <button onClick={openCheckout} className="button">
        Start Purchase
      </button>
    </div>
  );
};

export default withAuthenticationRequired(Purchase);
