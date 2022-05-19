import { useUser, useUserLogin } from '@energyweb/origin-ui-user-data';
import { useUserLogInFormConfig } from '@energyweb/origin-ui-user-logic';
import {
  UserModalsActionsEnum,
  useUserModalsDispatch,
} from '@energyweb/origin-ui-user-view';
import {
  InvitationDTO,
  UserDTO,
} from '@energyweb/origin-backend-react-query-client';

export const usePaymentPageEffects = () => {
  const { user, userLoading } = useUser();

  const dispatchModals = useUserModalsDispatch();
  const openRegisterOrgModal = () => {
    dispatchModals({
      type: UserModalsActionsEnum.SHOW_LOGIN_REGISTER_ORG,
      payload: true,
    });
  };

  const openInvitationModal = (invitation: InvitationDTO, user: UserDTO) => {
    dispatchModals({
      type: UserModalsActionsEnum.SHOW_PENDING_INVITATION,
      payload: {
        open: true,
        invitation,
        user,
      },
    });
  };

  const openExchangeAddressModal = () => {
    dispatchModals({
      type: UserModalsActionsEnum.SHOW_CREATE_EXCHANGE_ADDRESS,
      payload: true,
    });
  };

  const submitHandler = useUserLogin(
    openRegisterOrgModal,
    openInvitationModal,
    openExchangeAddressModal
  );
  const formProps = useUserLogInFormConfig(submitHandler);

  return { formProps, user, userLoading };
};
