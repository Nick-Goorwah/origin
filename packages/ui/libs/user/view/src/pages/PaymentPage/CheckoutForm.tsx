import React, { ReactNode, FormEvent, FC, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import {
  Stripe,
  loadStripe,
  StripeElements,
  stripePromise,
} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { LoginPageLayout } from '../../containers';
import { Button } from '@mui/material';

export const CheckoutForm = () => {
  let stripePromise: Stripe;
  const getStripe = async () => {
    if (!stripePromise) {
      stripePromise = await loadStripe(process.env.BEARER_TOKEN_TEST);
    }
    return stripePromise;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Create a Checkout Session.
    const checkoutSession = await fetch('/api/checkout_sessions');

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout(
      (checkoutSession as any).errorMessage
    );
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as parameter here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.;

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error);
  };

  return <Button></Button>;
};
