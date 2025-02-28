import { CertificateDTO } from '@energyweb/issuer-irec-api-react-query-client';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { prepareBeneficiariesOptions } from '../utils';
import { formatSelectedBlockchainItems } from './formatSelectedBlockchain';
import {
  SelectedItem,
  TUseBeneficiaryFormLogic,
  TUseRetireActionLogic,
} from './types';

export const useRetireActionLogic: TUseRetireActionLogic<
  CertificateDTO['id']
> = ({ selectedIds, blockchainCertificates, allDevices, allFuelTypes }) => {
  const { t } = useTranslation();

  const selectedItems: SelectedItem<CertificateDTO['id']>[] = selectedIds
    ? formatSelectedBlockchainItems({
        selectedIds,
        allDevices,
        blockchainCertificates,
        allFuelTypes,
      })
    : [];

  return {
    title: t('certificate.blockchainInbox.selectedForRetirement'),
    buttonText: t('certificate.blockchainInbox.retireButton'),
    selectedItems,
    selectDisabledTooltip: t(
      'certificate.blockchainInbox.addBeneficiariesTooltip'
    ),
  };
};

export const useBeneficiaryFormLogic: TUseBeneficiaryFormLogic = ({
  allBeneficiaries,
}) => {
  const { t } = useTranslation();
  return {
    initialValues: {
      beneficiary: undefined,
      startDate: '',
      endDate: '',
      purpose: '',
    },
    validationSchema: yup.object({
      beneficiary: yup
        .number()
        .required()
        .label(t('certificate.blockchainInbox.beneficiary')),
      startDate: yup
        .string()
        .required()
        .label(t('certificate.blockchainInbox.startDate')),
      endDate: yup
        .string()
        .required()
        .label(t('certificate.blockchainInbox.endDate')),
      purpose: yup
        .string()
        .required()
        .label(t('certificate.blockchainInbox.purpose')),
    }),
    fields: [
      {
        name: 'beneficiary',
        label: t('certificate.blockchainInbox.selectBeneficiary'),
        select: true,
        options: prepareBeneficiariesOptions(allBeneficiaries),
        textFieldProps: {
          variant: 'filled' as any,
        },
      },
      {
        name: 'startDate',
        label: t('certificate.blockchainInbox.startDate'),
        datePicker: true,
        textFieldProps: {
          variant: 'filled' as any,
          margin: 'none',
        },
      },
      {
        name: 'endDate',
        label: t('certificate.blockchainInbox.endDate'),
        datePicker: true,
        textFieldProps: {
          variant: 'filled' as any,
          margin: 'none',
        },
      },
      {
        name: 'purpose',
        label: t('certificate.blockchainInbox.purpose'),
        textFieldProps: {
          variant: 'filled' as any,
          margin: 'none',
        },
      },
    ],
  };
};
