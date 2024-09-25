import * as React from "react";
import "../../../styles/singlePage.css";
import "../../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ProizvodiContextProvider } from "../service/ProizvodiContext";
import ProizvodiData from "./ProizvodiData";
import { useParams } from "react-router-dom";
import { ProizvodiModal } from "../components/ProizvodiModal";
import { SinglePageWrapper } from "../../../generalComponents";

type ProizvodiPageProps = {
  objectId?: string | number;
  simpleView?: boolean;
};

export const ProizvodiPage: React.FC<ProizvodiPageProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <ProizvodiContextProvider objectId={props.objectId ?? id} isEnabledTableActions={!props?.simpleView}>
      <SinglePageWrapper simpleView={props?.simpleView ?? false}>
        <React.Fragment>
          <ProizvodiData />
          <ProizvodiModal />
        </React.Fragment>
      </SinglePageWrapper>
    </ProizvodiContextProvider>
  );
};

export default ProizvodiPage;
