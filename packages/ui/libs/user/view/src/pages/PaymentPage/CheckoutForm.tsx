import React, { ReactNode, FormEvent, FC } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { Stripe, loadStripe } from '@stripe/stripe-js';
import { LoginPageLayoutProps } from '../../containers';
import { PaymentPageProps } from './PaymentPage';

export interface CheckoutFormProps {
  bgImage?: string;
  children: ReactNode;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({
  bgImage: string,
  children: ReactNode,
}) => {
  let stripePromise: Promise<Stripe | null>;
  const getStripe = async () => {
    if (!stripePromise) {
      let stripePromise = await loadStripe(process.env.BEARER_TOKEN_TEST);
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
  let children;
  return <> {<b> Hello World </b>} </>;
};
