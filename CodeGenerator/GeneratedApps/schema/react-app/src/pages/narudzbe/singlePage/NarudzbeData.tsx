import * as React from "react";
import { FC, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Narudzbe, NarudzbeColumns } from "../types";
import { NarudzbeContext } from "../service/NarudzbeContext";
import { useAbility } from "../../../router/casl/AbilityContext";
import { Button, DeleteButton, EditButton, PageTabs, Tab } from "../../../generalComponents";
import { FilterCriteriaOperator } from "../../../api/generalService/types";
import { ObjectDetails } from "../../../generalComponents/singlePage/ObjectDetails";
import KorisniciPage from "../../korisnici/singlePage/KorisniciPage";
import ProizvodiPage from "../../proizvodi/singlePage/ProizvodiPage";



const NarudzbeData: FC = () => {
  const { ability } = useAbility();
  const navigate = useNavigate();
  const { singleObject, openEditNarudzbeModal, onDeleteNarudzbe, isEnabledTableActions } = useContext(NarudzbeContext);

  const pageTabs = useMemo(() => {
    const tabs: Tab[] = [];

    return tabs;
  }, [ability, singleObject]);

  return (
    <React.Fragment>
      {Boolean(singleObject) && (
          <React.Fragment>
            <h2 style={{paddingBottom: '30px'}}>Narudzbe</h2>
            <ObjectDetails<Narudzbe> object={singleObject} fields={NarudzbeColumns}/>
<KorisniciPage objectId={singleObject?.korisnik_id} simpleView={true} />
<ProizvodiPage objectId={singleObject?.proizvod_id} simpleView={true} />
            {isEnabledTableActions && (
                <React.Fragment>
                  <div>
                    <EditButton
                        abilitySubject={"NARUDZBE_UPDATE"}
                        onClick={() => {
                          singleObject && openEditNarudzbeModal(singleObject);
                        }}
                        customStyle={"width_80px"}
                    >
                      Edit
                    </EditButton>
                    &nbsp; &nbsp;
                    <DeleteButton
                        abilitySubject={"NARUDZBE_DELETE"}
                        onClick={() => {
                          onDeleteNarudzbe(singleObject?.id??
                          -1
                        )
                          ;
                        }}
                        customStyle={"width_80px"}
                    >
                      Delete
                    </DeleteButton>
                  </div>
                  <PageTabs tabs={pageTabs}/>
                  <div style={{paddingTop: "20px"}}>
                    <Button
                        label="Go Back"
                        className="btn btn-success"
                        onClick={() => {
                          navigate(-1);
                        }}
                    />
                  </div>
                </React.Fragment>
            )}
          </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NarudzbeData;
