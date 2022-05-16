import React from 'react';
import {
  PaymentAppProps,
  LoginApp,
  LoginAppProps,
} from '@energyweb/origin-ui-user-view';
import { PaymentApp } from '../../../../libs/user/view/src/PaymentApp';

const PaymentRoute = (props: PaymentAppProps) => {
  return <PaymentApp {...props} />;
};

export default PaymentRoute;
