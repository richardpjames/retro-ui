import React from 'react';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

const Purchase = () => {
  const Paddle = window.Paddle;
  const { user } = useAuth0();

  const openCheckout = () => {
    Paddle.Checkout.open({
      product: 601119, // Replace with your Product or Plan ID
      allowQuantity: false,
      disableLogout: true,
      email: user.email,
      passthrough: user.sub,
      success: '/dashboard',
      displayModeTheme: 'dark',
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
