import { Modal, ModalContent } from "@app/components/v2";
import { UsePopUpState } from "@app/hooks/usePopUp";

import { EditLoginForm } from "./EditLoginForm";

type Props = {
  popUp: UsePopUpState<["editLogin"]>;
  handlePopUpToggle: (popUpName: keyof UsePopUpState<["editLogin"]>, state?: boolean) => void;
};

export const EditLoginModal = ({ popUp, handlePopUpToggle }: Props) => {
  return (
    <Modal
      isOpen={popUp?.editLogin?.isOpen}
      onOpenChange={(isOpen) => {
        handlePopUpToggle("editLogin", isOpen);
      }}
    >
      <ModalContent title="Edit Login">
        <EditLoginForm handlePopUpToggle={handlePopUpToggle} />
      </ModalContent>
    </Modal>
  );
};
