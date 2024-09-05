import React, { useState, FC, useMemo, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/form.css";
import "../../../styles/modal.css";
import { use#{FUL_TABLE_NAME}#Service } from "../service/#{FUL_TABLE_NAME}#Service";
import { #{FUL_TABLE_NAME}#Context } from "../service/#{FUL_TABLE_NAME}#Context";
import { FormContainer, FormErrorMessage, FormSubmitButton, FormTitle } from "../../../generalComponents/form/FormComponents";
import { #{FUL_TABLE_NAME}#, #{FUL_TABLE_NAME}#Columns } from "../types";

import * as toastr from "toastr";
import { FormForeignObjectField } from "../../../generalComponents/form/FormForeignObjectField";
import { FormBody } from "../../../generalComponents/form/FormBody";
import { useMutation } from "@tanstack/react-query";
import { Box, Modal } from "@mui/material";

#{IMPORT_FOREIGN_TABLE_TYPES_IN_COMPONENT}#
#{IMPORT_INDEX_OF_FOREIGN_TABLES}#

export const #{FUL_TABLE_NAME}#Form: FC = () => {
  const { edit#{FUL_TABLE_NAME}#, handleSubmitNew#{FUL_TABLE_NAME}#, handleEdit#{FUL_TABLE_NAME}# } = useContext(#{FUL_TABLE_NAME}#Context);
  const { create, update } = use#{FUL_TABLE_NAME}#Service();

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
  } = useForm<#{FUL_TABLE_NAME}#>({
    defaultValues: edit#{FUL_TABLE_NAME}#,
    mode: "onSubmit",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const isEditMode = useMemo(() => Boolean(edit#{FUL_TABLE_NAME}#), [edit#{FUL_TABLE_NAME}#]);

  #{STATE_FOR_MODAL_OF_FOREIGN_TABLES}#
  #{WATCH_TABLE_FOREIGN_OBJECTS}#

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      handleSubmitNew#{FUL_TABLE_NAME}#(data);
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
      handleEdit#{FUL_TABLE_NAME}#?.(data);
      toastr.success("Successfully updated.");
    },
    onError: (error: any) => {
      const resMessage = error.message || error.toString();
      setErrorMessage(resMessage);
      toastr.error(resMessage);
    },
  });

  const onSubmit = async (data: #{FUL_TABLE_NAME}#) => {
    const submitData = { ...data, id: isEditMode ? edit#{FUL_TABLE_NAME}#?.id : data.id };
    #{FORM_CHECK_FOREIGN_FIELDS}#
    setErrorMessage("");
    if (isEditMode) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  return (
    <FormContainer>
      <FormTitle title={isEditMode ? "Edit #{FLL_TABLE_NAME}#" : "Create new #{FLL_TABLE_NAME}#"} />
      <FormBody<#{FUL_TABLE_NAME}#> fields={#{FUL_TABLE_NAME}#Columns} isEditMode={isEditMode} register={register} errors={errors} watch={watch} setValue={setValue} />

      #{FORM_FOREIGN_TABLES_FIELDS}#
      <FormErrorMessage message={errorMessage} />
      <FormSubmitButton label={"Save"} onClick={handleSubmit(onSubmit)} />
      #{FORM_FOREIGN_TABLES_INDEX_MODAL}#
    </FormContainer>
  );
};
export default #{FUL_TABLE_NAME}#Form;
