import React, { FC, ReactNode, useState, useEffect } from 'react';

// import { loadStripe } from "@stripe/stripe-js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Stripe, loadStripe } from '@stripe/react-stripe-js';
import StripeCheckout from './ReactStripeCheckout';
import { GenericForm } from '@energyweb/origin-ui-core';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useLogInPageEffects } from '../LoginPage/LoginPage.effects';
import { EnergyWebLogo } from '@energyweb/origin-ui-assets';
import { useStyles } from '../LoginPage/LoginPage.styles';
import { useTranslation } from 'react-i18next';
import ReactStripeCheckout from './ReactStripeCheckout';

export interface PaymentPageProps {
  bgImage?: string;
  formIcon?: ReactNode;
  loginPageBgImage?: string;
  loginFormIcon?: ReactNode;
}

export const PaymentPage: FC<PaymentPageProps> = ({ bgImage, formIcon }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  let stripePromise: Promise<Stripe | null>;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.PUBLISHER_BEARER_KEY!);
    }
    return stripePromise;
  };

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
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <StripeCheckout
      name="Three Comma Co." // the pop-in header title
      description="Big Data Stuff" // the pop-in header subtitle
      image="https://stripe.com/img/documentation/checkout/marketplace.png" // the pop-in header image (default none)
      ComponentClass="div"
      label="Buy the Thing" // text inside the Stripe button
      panelLabel="Give Money" // prepended to the amount in the bottom pay button
      amount={1000000} // cents
      currency="USD"
      stripeKey="..."
      locale="zh"
      email="info@vidhub.co"
      // Note: Enabling either address option will give the user the ability to
      // fill out both. Addresses are sent as a second parameter in the token callback.
      shippingAddress
      billingAddress={false}
      // Note: enabling both zipCode checks and billing or shipping address will
      // cause zipCheck to be pulled from billing address (set to shipping if none provided).
      zipCode={false}
      alipay // accept Alipay (default false)
      bitcoin // accept Bitcoins (default false)
      allowRememberMe // "Remember Me" option (default true)
      token={ReactStripeCheckout.propTypes.token} // submit callback
      opened={ReactStripeCheckout.propTypes.opened} // called when the checkout popin is opened (no IE6/7)
      closed={ReactStripeCheckout.propTypes.closed} // called when the checkout popin is closed (no IE6/7)
      // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
      // you are using multiple stripe keys
      reconfigureOnUpdate={false}
      // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
      // useful if you're using React-Tap-Event-Plugin
      triggerEvent="onTouchTap"
    >
      <button className="btn btn-primary">
        Use your own child component, which gets wrapped in whatever component
        you pass into as "ComponentClass" (defaults to span)
      </button>
    </StripeCheckout>
  );
};
