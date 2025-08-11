import React, { useState, FC, useMemo, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../styles/registration.css";
import { SystemUser } from "../../authService/types";
import { useSystemUsersService } from "../service/SystemUserService";
import { SystemUserContext } from "../service/SystemUserContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import toastr from "toastr";
import { FormContainer, FormErrorMessage, FormSubmitButton, FormTitle } from "../../generalComponents/form/FormComponents";
import { FormBody } from "../../generalComponents/form/FormBody";
import { SystemUserColumns } from "../types";
import { AxiosError } from 'axios';

export const SystemUserForm: FC = () => {
  const { editUser, handleSubmitNewAccount, handleEditSystemUser } = useContext(SystemUserContext);
  const { getAllPermissions, create, update } = useSystemUsersService();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SystemUser>({
    defaultValues: editUser,
    mode: "onSubmit",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const isEditMode = useMemo(() => Boolean(editUser), [editUser]);

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      toastr.success("Successfully created.");
      handleSubmitNewAccount(data);
    },
    onError: (error: AxiosError) => {
      const resMessage = error.message || error.toString();
      setErrorMessage(resMessage);
      toastr.error(resMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      handleEditSystemUser?.(data);
      toastr.success("Successfully updated.");
    },
    onError: (error: AxiosError) => {
      const resMessage = error.message || error.toString();
      setErrorMessage(resMessage);
      toastr.error(resMessage);
    },
  });

  const { data: allPermissions } = useQuery({
    queryKey: ["allPermissions"],
    queryFn: getAllPermissions,
  });

  const onSubmit = async (data: SystemUser) => {
    setErrorMessage("");
    if (isEditMode) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <FormContainer>
      <FormTitle title={isEditMode ? "Edit account" : "Create new account"} />
      <FormBody<SystemUser>
        fields={SystemUserColumns}
        isEditMode={isEditMode}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        multiselectOptions={{ permissions: allPermissions ?? [] }}
      />
      <FormErrorMessage message={errorMessage} />
      <FormSubmitButton label={"Save"} onClick={handleSubmit(onSubmit)} />
    </FormContainer>
  );
};
