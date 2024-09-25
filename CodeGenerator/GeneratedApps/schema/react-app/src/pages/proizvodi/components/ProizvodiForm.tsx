import React, { useState, FC, useMemo, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/form.css";
import "../../../styles/modal.css";
import { useProizvodiService } from "../service/ProizvodiService";
import { ProizvodiContext } from "../service/ProizvodiContext";
import { FormContainer, FormErrorMessage, FormSubmitButton, FormTitle } from "../../../generalComponents/form/FormComponents";
import { Proizvodi, ProizvodiColumns } from "../types";

import * as toastr from "toastr";
import { FormForeignObjectField } from "../../../generalComponents/form/FormForeignObjectField";
import { FormBody } from "../../../generalComponents/form/FormBody";
import { useMutation } from "@tanstack/react-query";
import { Box, Modal } from "@mui/material";




export const ProizvodiForm: FC = () => {
  const { editProizvodi, handleSubmitNewProizvodi, handleEditProizvodi } = useContext(ProizvodiContext);
  const { create, update } = useProizvodiService();

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
  } = useForm<Proizvodi>({
    defaultValues: editProizvodi,
    mode: "onSubmit",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const isEditMode = useMemo(() => Boolean(editProizvodi), [editProizvodi]);




  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      handleSubmitNewProizvodi(data);
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
      handleEditProizvodi?.(data);
      toastr.success("Successfully updated.");
    },
    onError: (error: any) => {
      const resMessage = error.message || error.toString();
      setErrorMessage(resMessage);
      toastr.error(resMessage);
    },
  });

  const onSubmit = async (data: Proizvodi) => {
    const submitData = { ...data, id: isEditMode ? editProizvodi?.id : data.id };

    setErrorMessage("");
    if (isEditMode) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  return (
    <FormContainer>
      <FormTitle title={isEditMode ? "Edit proizvodi" : "Create new proizvodi"} />
      <FormBody<Proizvodi> fields={ProizvodiColumns} isEditMode={isEditMode} register={register} errors={errors} watch={watch} setValue={setValue} />


      <FormErrorMessage message={errorMessage} />
      <FormSubmitButton label={"Save"} onClick={handleSubmit(onSubmit)} />

    </FormContainer>
  );
};
export default ProizvodiForm;
