import React, { useState, FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import "../styles/registration.css";
import { SystemUser } from "../authService/types";
import { useSystemUsersService } from "../systemUsers/service/SystemUserService";
import { useQuery } from "@tanstack/react-query";

type Props = {
  object?: SystemUser;
  onSuccessfulSubmit: (user: SystemUser) => void;
  onSuccessfulEdit?: (user: SystemUser) => void;
};
export const RegisterComponent: FC<Props> = ({ onSuccessfulSubmit, object, onSuccessfulEdit }) => {
  const { getAllPermissions, create, update } = useSystemUsersService();

  const { register, handleSubmit } = useForm({ defaultValues: object });

  const [errorMessage, setErrorMessage] = useState("");

  const isEditMode = useMemo(() => Boolean(object), [object]);

  const { data: allPermissions } = useQuery({
    queryKey: ["allPermissions"],
    queryFn: getAllPermissions,
  });

  const handleRegistration = async (data: any) => {
    setErrorMessage("");
    const submitData = {
      ...data,
      permissions: data.permissions ? data.permissions : [],
      id: isEditMode ? object?.id ?? "-1" : data.id,
    };
    if (isEditMode) {
      await update(submitData).then(
        (data) => {
          onSuccessfulEdit?.(data);
        },
        (error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          setErrorMessage(resMessage);
        },
      );
      return;
    }
    await create(submitData).then(
      (data) => {
        onSuccessfulSubmit(data);
      },
      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setErrorMessage(resMessage);
      },
    );
  };

  return (
    <form className="registration_form_wrapper" onSubmit={handleSubmit(handleRegistration)}>
      <div className="registration_form_container">
        <div className="title_container">
          <p className="title">{isEditMode ? "Edit user account" : "Create new Account"}</p>
        </div>
        <br />
        <div className="input_container">
          <label className="input_label" htmlFor="firstname">
            Username:
          </label>
          <input
            placeholder="Username"
            title="Inpit title"
            type="text"
            className="input_field input_padding"
            id="username"
            {...register("username", { required: true })}
            disabled={isEditMode}
          />
        </div>
        <div className="input_container">
          <label className="input_label" htmlFor="email">
            Email:
          </label>

          <input
            placeholder="name@mail.com"
            title="Inpit title"
            type="email"
            className="input_field input_padding"
            id="email"
            {...register("email", { required: true })}
            disabled={isEditMode}
          />
        </div>
        <div className="input_container ">
          <p className="input_label">Permissions</p>
          <div className="checkbox_group">
            <input type="checkbox" className="input_field" style={{ marginRight: "5px" }} id={"isSuperUser+"} {...register("superUser")} />

            <label className="input_label" style={{ display: "inline-block", marginBottom: "5px" }} id={"isSuperUser"}>
              SUPER USER ACCOUNT
            </label>
          </div>

          <div className="checkbox_wrapper">
            {allPermissions?.map((permission) => {
              return (
                <div className="checkbox_group">
                  <input
                    type="checkbox"
                    className="input_field"
                    style={{ marginRight: "5px" }}
                    id={"permission+" + permission}
                    {...register("permissions")}
                    value={permission}
                    defaultChecked={object?.permissions?.some((permiss: string) => {
                      return permiss === permission;
                    })}
                  />

                  <label className="input_label" style={{ display: "inline-block", marginBottom: "5px" }} id={"permission+" + permission}>
                    {permission}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {!isEditMode && (
          <div className="input_container">
            <label className="input_label" htmlFor="password">
              Password:
            </label>

            <input
              placeholder="......"
              title="Inpit title"
              type="password"
              className="input_field input_padding"
              id="password"
              {...register("password", { required: true })}
            />
          </div>
        )}
        {errorMessage && <p style={{ color: "#dc3545" }}>{errorMessage}</p>}
        <button title="Sign In" type="submit" className="sign-in_btn">
          <span>Create account</span>
        </button>
      </div>
    </form>
  );
};
export default RegisterComponent;
