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

export interface PaymentPageProps {
  bgImage?: string;
  formIcon?: ReactNode;
  loginPageBgImage?: string;
  loginFormIcon?: ReactNode;
  token?: string;
  stripeKey?: string;
}

export const PaymentPage: FC<PaymentPageProps> = ({
  bgImage,
  formIcon,
  loginFormIcon,
  loginPageBgImage,
  token,
  stripeKey,
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  let stripePromise: Promise<Stripe | null>;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.PUBLISHER_BEARER_KEY!);
    }
    return stripePromise;
  };

  // @ts-ignore
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <StripeCheckout
      token={Stripe.token}
      stripeKey={Stripe.stripeKey}
      name="Three Comma Co." // the pop-in header title
      description="Big Data Stuff" // the pop-in header subtitle
      image="https://stripe.com/img/documentation/checkout/marketplace.png" // the pop-in header image (default none)
      ComponentClass="div"
      label="Buy the Thing" // text inside the Stripe button
      panelLabel="Give Money" // prepended to the amount in the bottom pay button
      amount={1000000} // cents
      currency="USD"
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
      opened={StripeCheckout.propTypes.opened} // called when the checkout popin is opened (no IE6/7)
      closed={StripeCheckout.propTypes.closed} // called when the checkout popin is closed (no IE6/7)
      // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
      // you are using multiple stripe keys
      reconfigureOnUpdate={false}
      // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
      // useful if you're using React-Tap-Event-Plugin
      triggerEvent="onTouchTap"
    >
      <button className="btn btn-primary">Buy Now We are In the Money</button>
    </StripeCheckout>
  );
};
