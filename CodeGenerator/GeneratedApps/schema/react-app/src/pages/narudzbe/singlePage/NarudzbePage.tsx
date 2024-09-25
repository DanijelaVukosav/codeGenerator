import * as React from "react";
import "../../../styles/singlePage.css";
import "../../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NarudzbeContextProvider } from "../service/NarudzbeContext";
import NarudzbeData from "./NarudzbeData";
import { useParams } from "react-router-dom";
import { NarudzbeModal } from "../components/NarudzbeModal";
import { SinglePageWrapper } from "../../../generalComponents";

type NarudzbePageProps = {
  objectId?: string | number;
  simpleView?: boolean;
};

export const NarudzbePage: React.FC<NarudzbePageProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <NarudzbeContextProvider objectId={props.objectId ?? id} isEnabledTableActions={!props?.simpleView}>
      <SinglePageWrapper simpleView={props?.simpleView ?? false}>
        <React.Fragment>
          <NarudzbeData />
          <NarudzbeModal />
        </React.Fragment>
      </SinglePageWrapper>
    </NarudzbeContextProvider>
  );
};

export default NarudzbePage;
