import React, { FC, useContext } from "react";

import "../../../styles/modal.css";
import { #{FUL_TABLE_NAME}#Context } from "../service/#{FUL_TABLE_NAME}#Context";
import { #{FUL_TABLE_NAME}#Form } from "./#{FUL_TABLE_NAME}#Form";
import { CustomModal } from "../../../generalComponents";

export const #{FUL_TABLE_NAME}#Modal: FC = () => {
  const { isOpen#{FUL_TABLE_NAME}#Modal, close#{FUL_TABLE_NAME}#Modal } = useContext(#{FUL_TABLE_NAME}#Context);
  return (
    <CustomModal isOpen={isOpen#{FUL_TABLE_NAME}#Modal} close={close#{FUL_TABLE_NAME}#Modal}>
      <#{FUL_TABLE_NAME}#Form />
    </CustomModal>
  );
};
