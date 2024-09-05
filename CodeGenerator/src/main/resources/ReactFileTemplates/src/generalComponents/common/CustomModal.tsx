import * as React from "react";
import "../../styles/modal.css";
import "../../styles/utils.css";
import { FC, ReactNode } from "react";

interface CustomModalProps {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;

  modalClassName?: string;
}

export const CustomModal: FC<CustomModalProps> = ({ isOpen, close, children, modalClassName }) => {
  return (
    <div>
      {isOpen && (
        <div className={"custom-modal"}>
          <div className={`custom-modal-content ${modalClassName ?? ""} `}>
            <>
              <span className="close" onClick={close}>
                &times;
              </span>
              {children}
            </>
          </div>
        </div>
      )}
    </div>
  );
};
