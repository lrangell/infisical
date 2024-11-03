import { Modal, ModalContent } from "@app/components/v2";
import { UsePopUpState } from "@app/hooks/usePopUp";

import { CreateLoginForm } from "./CreateLoginForm";

type Props = {
  popUp: UsePopUpState<["createLogin"]>;
  handlePopUpToggle: (popUpName: keyof UsePopUpState<["createLogin"]>, state?: boolean) => void;
};

export const AddLoginModal = ({ popUp, handlePopUpToggle }: Props) => {
  return (
    <Modal
      isOpen={popUp?.createLogin?.isOpen}
      onOpenChange={(isOpen) => {
        handlePopUpToggle("createLogin", isOpen);
      }}
    >
      <ModalContent title="Create new Login">
        <CreateLoginForm handlePopUpToggle={handlePopUpToggle} />
      </ModalContent>
    </Modal>
  );
};
