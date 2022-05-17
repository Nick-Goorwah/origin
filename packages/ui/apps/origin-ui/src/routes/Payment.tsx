import React from 'react';
import {
  PaymentAppProps,
  PaymentApp,
  LoginApp,
  LoginAppProps,
} from '@energyweb/origin-ui-user-view';

const PaymentRoute = (props: PaymentAppProps) => {
  return <PaymentApp {...props} />;
};

export default PaymentRoute;
