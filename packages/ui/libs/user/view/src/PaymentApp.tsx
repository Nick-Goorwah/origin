import { PageNotFound } from '@energyweb/origin-ui-core';
import React, { FC, ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import { UserAppEnvProvider, UserEnvVariables } from './context';
import { LoginPage, PaymentPage, RegisterPage } from './pages';
import { TMenuSection } from '@energyweb/origin-ui-core';
import ReactStripeCheckout from './pages/PaymentPage/ReactStripeCheckout';

export type PaymentRoutesConfig = {
  showLoginPage: boolean;
  showPaymentPage: boolean;
};

export interface PaymentAppProps {
  routesConfig: {
    showLoginPage: boolean;
    showPaymentPage: boolean;
  };
}

export const PaymentApp: FC<PaymentAppProps> = ({ routesConfig }) => {
  const { showLoginPage, showPaymentPage } = routesConfig;
  return (
    <Routes>
      {showPaymentPage && <Route path="/payment" element={<PaymentPage />} />}
      {showPaymentPage == false && (
        <Route path="*" element={<PageNotFound />} />
      )}
    </Routes>
  );
};
