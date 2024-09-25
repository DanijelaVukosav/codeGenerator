import React, { useState, FC, useMemo, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/form.css";
import "../../../styles/modal.css";
import { useKorisniciService } from "../service/KorisniciService";
import { KorisniciContext } from "../service/KorisniciContext";
import { FormContainer, FormErrorMessage, FormSubmitButton, FormTitle } from "../../../generalComponents/form/FormComponents";
import { Korisnici, KorisniciColumns } from "../types";

import * as toastr from "toastr";
import { FormForeignObjectField } from "../../../generalComponents/form/FormForeignObjectField";
import { FormBody } from "../../../generalComponents/form/FormBody";
import { useMutation } from "@tanstack/react-query";
import { Box, Modal } from "@mui/material";




export const KorisniciForm: FC = () => {
  const { editKorisnici, handleSubmitNewKorisnici, handleEditKorisnici } = useContext(KorisniciContext);
  const { create, update } = useKorisniciService();

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
  } = useForm<Korisnici>({
    defaultValues: editKorisnici,
    mode: "onSubmit",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const isEditMode = useMemo(() => Boolean(editKorisnici), [editKorisnici]);




  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      handleSubmitNewKorisnici(data);
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
      handleEditKorisnici?.(data);
      toastr.success("Successfully updated.");
    },
    onError: (error: any) => {
      const resMessage = error.message || error.toString();
      setErrorMessage(resMessage);
      toastr.error(resMessage);
    },
  });

  const onSubmit = async (data: Korisnici) => {
    const submitData = { ...data, id: isEditMode ? editKorisnici?.id : data.id };

    setErrorMessage("");
    if (isEditMode) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  return (
    <FormContainer>
      <FormTitle title={isEditMode ? "Edit korisnici" : "Create new korisnici"} />
      <FormBody<Korisnici> fields={KorisniciColumns} isEditMode={isEditMode} register={register} errors={errors} watch={watch} setValue={setValue} />


      <FormErrorMessage message={errorMessage} />
      <FormSubmitButton label={"Save"} onClick={handleSubmit(onSubmit)} />

    </FormContainer>
  );
};
export default KorisniciForm;
