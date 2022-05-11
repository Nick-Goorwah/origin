import { PageNotFound } from '@energyweb/origin-ui-core';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { UserAppEnvProvider, UserEnvVariables } from './context';
import { PaymentPage } from './pages';

export interface PaymentAppProps {
  routesConfig: {
    showUserProfile: boolean;
    showSettings: boolean;
  };
  envVariables: UserEnvVariables;
}

export const PaymentApp: FC<PaymentAppProps> = ({
  routesConfig,
  envVariables,
}) => {
  const { showSettings } = routesConfig;
  return (
    <UserAppEnvProvider variables={envVariables}>
      <Routes>
        {showSettings && <Route path="payment" element={<PaymentPage />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserAppEnvProvider>
  );
};
