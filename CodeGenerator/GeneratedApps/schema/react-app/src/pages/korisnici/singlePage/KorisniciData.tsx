import * as React from "react";
import { FC, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Korisnici, KorisniciColumns } from "../types";
import { KorisniciContext } from "../service/KorisniciContext";
import { useAbility } from "../../../router/casl/AbilityContext";
import { Button, DeleteButton, EditButton, PageTabs, Tab } from "../../../generalComponents";
import { FilterCriteriaOperator } from "../../../api/generalService/types";
import { ObjectDetails } from "../../../generalComponents/singlePage/ObjectDetails";

import NarudzbeIndex from "../../narudzbe/NarudzbeIndex";


const KorisniciData: FC = () => {
  const { ability } = useAbility();
  const navigate = useNavigate();
  const { singleObject, openEditKorisniciModal, onDeleteKorisnici, isEnabledTableActions } = useContext(KorisniciContext);

  const pageTabs = useMemo(() => {
    const tabs: Tab[] = [];
 ability.can("NARUDZBE_READ", "NARUDZBE_READ") &&
      tabs.push({
        tabTitle: "Narudzbe",
        tabContent: (
          <NarudzbeIndex
            isEnabledTableActions={false}
            predefinedFilterCriteria={{
              key: "korisnik_id",
              operation: FilterCriteriaOperator.EQUALS,
              type: "number",
              value: singleObject?.id,
            }}
          />
        ),
      });
    return tabs;
  }, [ability, singleObject]);

  return (
    <React.Fragment>
      {Boolean(singleObject) && (
          <React.Fragment>
            <h2 style={{paddingBottom: '30px'}}>Korisnici</h2>
            <ObjectDetails<Korisnici> object={singleObject} fields={KorisniciColumns}/>

            {isEnabledTableActions && (
                <React.Fragment>
                  <div>
                    <EditButton
                        abilitySubject={"KORISNICI_UPDATE"}
                        onClick={() => {
                          singleObject && openEditKorisniciModal(singleObject);
                        }}
                        customStyle={"width_80px"}
                    >
                      Edit
                    </EditButton>
                    &nbsp; &nbsp;
                    <DeleteButton
                        abilitySubject={"KORISNICI_DELETE"}
                        onClick={() => {
                          onDeleteKorisnici(singleObject?.id ??
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

export default KorisniciData;
