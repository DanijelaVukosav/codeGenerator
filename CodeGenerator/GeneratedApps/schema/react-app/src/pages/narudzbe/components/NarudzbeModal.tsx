import React, { FC, useContext } from "react";

import "../../../styles/modal.css";
import { NarudzbeContext } from "../service/NarudzbeContext";
import { NarudzbeForm } from "./NarudzbeForm";
import { CustomModal } from "../../../generalComponents";

export const NarudzbeModal: FC = () => {
  const { isOpenNarudzbeModal, closeNarudzbeModal } = useContext(NarudzbeContext);
  return (
    <CustomModal isOpen={isOpenNarudzbeModal} close={closeNarudzbeModal}>
      <NarudzbeForm />
    </CustomModal>
  );
};
