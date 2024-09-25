import React, { FC, useContext } from "react";

import "../../../styles/modal.css";
import { KorisniciContext } from "../service/KorisniciContext";
import { KorisniciForm } from "./KorisniciForm";
import { CustomModal } from "../../../generalComponents";

export const KorisniciModal: FC = () => {
  const { isOpenKorisniciModal, closeKorisniciModal } = useContext(KorisniciContext);
  return (
    <CustomModal isOpen={isOpenKorisniciModal} close={closeKorisniciModal}>
      <KorisniciForm />
    </CustomModal>
  );
};
