import React, { FC, useContext } from "react";

import "../../../styles/modal.css";
import { ProizvodiContext } from "../service/ProizvodiContext";
import { ProizvodiForm } from "./ProizvodiForm";
import { CustomModal } from "../../../generalComponents";

export const ProizvodiModal: FC = () => {
  const { isOpenProizvodiModal, closeProizvodiModal } = useContext(ProizvodiContext);
  return (
    <CustomModal isOpen={isOpenProizvodiModal} close={closeProizvodiModal}>
      <ProizvodiForm />
    </CustomModal>
  );
};
