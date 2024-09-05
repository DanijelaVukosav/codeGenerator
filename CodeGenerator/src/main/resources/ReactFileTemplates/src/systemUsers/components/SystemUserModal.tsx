import React, { FC, useContext } from "react";
import "../../styles/modal.css";
import { SystemUserContext } from "../service/SystemUserContext";
import { SystemUserForm } from "./SystemUserForm";
import { CustomModal } from "../../generalComponents";

export const SystemUserModal: FC = () => {
  const { isOpenUserModal, closeUserModal } = useContext(SystemUserContext);

  return (
    <CustomModal isOpen={isOpenUserModal} close={closeUserModal}>
      <SystemUserForm />
    </CustomModal>
  );
};
