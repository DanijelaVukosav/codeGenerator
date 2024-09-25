import React, { useState, FC, useMemo, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/form.css";
import "../../../styles/modal.css";
import { useNarudzbeService } from "../service/NarudzbeService";
import { NarudzbeContext } from "../service/NarudzbeContext";
import { FormContainer, FormErrorMessage, FormSubmitButton, FormTitle } from "../../../generalComponents/form/FormComponents";
import { Narudzbe, NarudzbeColumns } from "../types";

import * as toastr from "toastr";
import { FormForeignObjectField } from "../../../generalComponents/form/FormForeignObjectField";
import { FormBody } from "../../../generalComponents/form/FormBody";
import { useMutation } from "@tanstack/react-query";
import { Box, Modal } from "@mui/material";

import { Korisnici } from "../../korisnici/types";
import { Proizvodi } from "../../proizvodi/types";
import KorisniciIndex from "../../korisnici/KorisniciIndex";
import ProizvodiIndex from "../../proizvodi/ProizvodiIndex";

export const NarudzbeForm: FC = () => {
  const { editNarudzbe, handleSubmitNewNarudzbe, handleEditNarudzbe } = useContext(NarudzbeContext);
  const { create, update } = useNarudzbeService();

  const boxStyle = useMemo(() => {
    return {
      width: "70vw",
      height: "70vh",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      overflow: "auto",
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Narudzbe>({
    defaultValues: editNarudzbe,
    mode: "onSubmit",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const isEditMode = useMemo(() => Boolean(editNarudzbe), [editNarudzbe]);

const [isOpenKorisniciModal, setOpenKorisniciModal] = useState<boolean>(false);
const [isOpenProizvodiModal, setOpenProizvodiModal] = useState<boolean>(false);
const { korisnici_korisnik_id,proizvodi_proizvod_id } = watch();

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      handleSubmitNewNarudzbe(data);
      toastr.success("Successfully created.");
    },
    onError: (error: any) => {
      const resMessage = error.message || error.toString();
      setErrorMessage(resMessage);
      toastr.error(resMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      handleEditNarudzbe?.(data);
      toastr.success("Successfully updated.");
    },
    onError: (error: any) => {
      const resMessage = error.message || error.toString();
      setErrorMessage(resMessage);
      toastr.error(resMessage);
    },
  });

  const onSubmit = async (data: Narudzbe) => {
    const submitData = { ...data, id: isEditMode ? editNarudzbe?.id : data.id };
if (!submitData.korisnik_id) {
      setErrorMessage("korisnici is required!");
      return;
    }
if (!submitData.proizvod_id) {
      setErrorMessage("proizvodi is required!");
      return;
    }
    setErrorMessage("");
    if (isEditMode) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  return (
    <FormContainer>
      <FormTitle title={isEditMode ? "Edit narudzbe" : "Create new narudzbe"} />
      <FormBody<Narudzbe> fields={NarudzbeColumns} isEditMode={isEditMode} register={register} errors={errors} watch={watch} setValue={setValue} />

<FormForeignObjectField
        label={`korisnici`}
        onClick={() => setOpenKorisniciModal(true)}
        isEditMode={isEditMode}
        selectedObjectLabel={korisnici_korisnik_id?.id?.toString() ?? editNarudzbe?.korisnik_id?.toString()}
      />
<FormForeignObjectField
        label={`proizvodi`}
        onClick={() => setOpenProizvodiModal(true)}
        isEditMode={isEditMode}
        selectedObjectLabel={proizvodi_proizvod_id?.id?.toString() ?? editNarudzbe?.proizvod_id?.toString()}
      />
      <FormErrorMessage message={errorMessage} />
      <FormSubmitButton label={"Save"} onClick={handleSubmit(onSubmit)} />
<Modal open={isOpenKorisniciModal} onClose={() => setOpenKorisniciModal(false)} className={"center-modal"} sx={{ overflow: "auto" }}>
        <Box sx={boxStyle}>
          <KorisniciIndex
            selectedRowId={korisnici_korisnik_id?.id ?? editNarudzbe?.korisnik_id}
            onRowSelect={(korisnici_korisnik_id: Korisnici) => {
              setValue("korisnici_korisnik_id", korisnici_korisnik_id);
              setValue("korisnik_id", korisnici_korisnik_id.id);
              setOpenKorisniciModal(false);
            }}
            isEnabledTableActions={false}
          />
        </Box>
      </Modal>
<Modal open={isOpenProizvodiModal} onClose={() => setOpenProizvodiModal(false)} className={"center-modal"} sx={{ overflow: "auto" }}>
        <Box sx={boxStyle}>
          <ProizvodiIndex
            selectedRowId={proizvodi_proizvod_id?.id ?? editNarudzbe?.proizvod_id}
            onRowSelect={(proizvodi_proizvod_id: Proizvodi) => {
              setValue("proizvodi_proizvod_id", proizvodi_proizvod_id);
              setValue("proizvod_id", proizvodi_proizvod_id.id);
              setOpenProizvodiModal(false);
            }}
            isEnabledTableActions={false}
          />
        </Box>
      </Modal>
    </FormContainer>
  );
};
export default NarudzbeForm;
