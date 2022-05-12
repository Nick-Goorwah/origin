import { PageNotFound } from '@energyweb/origin-ui-core';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { UserAppEnvProvider, UserEnvVariables } from './context';
import { PaymentPage } from './pages';
import { TMenuSection } from '@energyweb/origin-ui-core';

export type PaymentRoutesConfig = {
  menuSections: TMenuSection;
};

export interface PaymentAppProps {
  menuSections: TMenuSection;
}

export const PaymentApp: FC<PaymentAppProps> = ({ menuSections }) => {
  return (
    <Routes>
      <Route path="payment" element={<PaymentPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
