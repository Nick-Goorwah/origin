import React, { FC, ReactNode, useState, useEffect } from 'react';

// import { loadStripe } from "@stripe/stripe-js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Stripe, loadStripe } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';
import { GenericForm } from '@energyweb/origin-ui-core';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useLogInPageEffects } from '../LoginPage/LoginPage.effects';

export interface PaymentPageProps {
  bgImage?: string;
  formIcon?: ReactNode;
}

export const PaymentPage: FC<PaymentPageProps> = ({ formIcon }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  let stripePromise: Promise<Stripe | null>;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.PUBLISHER_BEARER_KEY!);
    }
    return stripePromise;
  };
  /* const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({items: [{id: "xl-tshirt"}]}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
*/
  const appearance = {
    theme: 'stripe',
  };

  const { formProps, navigateToRegister, navigateToResetPassword } =
    useLogInPageEffects();
  /*
  const options = {
    clientSecret,
    appearance,
  };
  */
  // @ts-ignore
  return (
    <div className="PaymentPage">
      <GenericForm {...formProps}>
        <Box>
          <CheckoutForm children={formIcon} />
        </Box>
      </GenericForm>
    </div>
  );
};
