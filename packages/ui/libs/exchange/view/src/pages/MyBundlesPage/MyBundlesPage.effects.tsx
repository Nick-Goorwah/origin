import React from 'react';
import { Bundle } from '@energyweb/exchange-react-query-client';
import {
  useAllDeviceFuelTypes,
  useApiAllDevices,
  useApiMyBundles,
  useApiRemoveBundleHandler,
  useApiUserAndAccount,
} from '@energyweb/origin-ui-exchange-data';
import {
  useMyBundlesTablesLogic,
  usePermissionsLogic,
} from '@energyweb/origin-ui-exchange-logic';
import { Cancel } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  ExchangeModalsActionsEnum,
  useExchangeModalsDispatch,
} from '../../context';
import { TableActionData } from '@energyweb/origin-ui-core';

export const useMyBundlesPageEffects = () => {
  const { t } = useTranslation();
  const {
    user,
    exchangeDepositAddress,
    isLoading: userAndAccountLoading,
  } = useApiUserAndAccount();
  const { canAccessPage, requirementsProps } = usePermissionsLogic({
    user,
    exchangeDepositAddress,
  });
  const { myBundles, isLoading: areBundlesLoading } = useApiMyBundles();
  const { allDevices, isLoading: areDevicesLoading } = useApiAllDevices();
  const { allTypes: allFuelTypes, isLoading: areFuelTypesLoading } =
    useAllDeviceFuelTypes();

  const dispatchModals = useExchangeModalsDispatch();

  const openDetailsModal = (bundle: Bundle) => {
    dispatchModals({
      type: ExchangeModalsActionsEnum.SHOW_BUNDLE_DETAILS,
      payload: {
        open: true,
        bundle,
        isOwner: true,
      },
    });
  };

  const { removeHandler, isMutating } = useApiRemoveBundleHandler();

  const actions: TableActionData<Bundle['id']>[] = [
    {
      icon: <Cancel />,
      name: t('exchange.myBundles.removeBundle'),
      onClick: removeHandler,
      loading: isMutating,
    },
  ];

  const isLoading =
    areBundlesLoading ||
    areDevicesLoading ||
    areFuelTypesLoading ||
    userAndAccountLoading;
  const tableData = useMyBundlesTablesLogic({
    myBundles,
    allDevices,
    actions,
    allFuelTypes,
    isLoading,
    openDetailsModal,
  });

  return {
    tableData,
    canAccessPage,
    requirementsProps,
  };
};
