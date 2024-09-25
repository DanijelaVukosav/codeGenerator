import * as React from "react";
import "../../../styles/singlePage.css";
import "../../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { KorisniciContextProvider } from "../service/KorisniciContext";
import KorisniciData from "./KorisniciData";
import { useParams } from "react-router-dom";
import { KorisniciModal } from "../components/KorisniciModal";
import { SinglePageWrapper } from "../../../generalComponents";

type KorisniciPageProps = {
  objectId?: string | number;
  simpleView?: boolean;
};

export const KorisniciPage: React.FC<KorisniciPageProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <KorisniciContextProvider objectId={props.objectId ?? id} isEnabledTableActions={!props?.simpleView}>
      <SinglePageWrapper simpleView={props?.simpleView ?? false}>
        <React.Fragment>
          <KorisniciData />
          <KorisniciModal />
        </React.Fragment>
      </SinglePageWrapper>
    </KorisniciContextProvider>
  );
};

export default KorisniciPage;
