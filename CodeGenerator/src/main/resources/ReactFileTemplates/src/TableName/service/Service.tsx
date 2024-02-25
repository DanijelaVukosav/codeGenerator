import React, { useState, createContext, FC } from "react";
import ReactDOM from "react-dom/client";
{IMPORT_TABLE_SERVICE_FOREIGN_KEYS}
{IMPORT_FOREIGN_KEYS_TABLE_NAME_IN_SERVICE}
import BaseService from "../../generalService/Service";
import Response from "../../generalService/ServiceResponse";
import { {FL_TABLE_NAME} } from "../types";
import * as toastr from "toastr";

export const {DEFAULT_TABLE_OBJECT}: {FL_TABLE_NAME} = {
  {DEFAULT_VALUES_OF_COLUMNS}
};

export const PATH_ROOT = "/{ASL_TABLE_NAME}";
export const PATH_SEPARATOR = "/";

export default class {TABLE_SERVICE} {
  public static async getAll(): Promise<{FL_TABLE_NAME}[]> {
    return BaseService.getAll<{FL_TABLE_NAME}[]>(PATH_ROOT).then((rp) => {
      if (rp.Status) {
        const data = rp.Data;
        return data;
      } else {
        return undefined;
      }
    });
  }
  public static async getById(id ?: string): Promise <{FL_TABLE_NAME} | undefined> {
    return BaseService.get<{FL_TABLE_NAME}>(PATH_ROOT + PATH_SEPARATOR, id).then(
        async (rp) => {
        if (rp.Status) {
          const object = rp.Data as {FL_TABLE_NAME};
          /*return AdresaService.getById(object.idAdresa + "").then((data) => {
            object.adresa = data;
            return { ...object, adresa: data };
          });*/
          {NESTED_CATCH_FOREIGN_OBJECTS}
          return object;
        } else {
          toastr.error(rp.Messages);
          return {DEFAULT_TABLE_OBJECT};
        }
      }
    );
  }
  public static async create(object: {FL_TABLE_NAME}): Promise <{FL_TABLE_NAME}> {
    return BaseService.create<{FL_TABLE_NAME}>(PATH_ROOT, object).then((rp) => {
      if (rp.Status) {
        toastr.success("Successfully saved.");
        return rp.Data;
      } else {
        toastr.error(rp.Messages);
      }
    });

    return {DEFAULT_TABLE_OBJECT};
  }
  public static async update(
    object: {FL_TABLE_NAME},
    idObject: string | number
  ): Promise < {FL_TABLE_NAME} > {
    return BaseService.update<{FL_TABLE_NAME}>(PATH_ROOT + PATH_SEPARATOR, idObject, object).then(
      (rp) => {
        if (rp.Status) {
          toastr.success("Successfully saved.");
          //this.props.history.goBack();
          return rp.Data;
        } else {
          toastr.error(rp.Messages);
          return {DEFAULT_TABLE_OBJECT};
        }
      }
    );
  }
  public static async delete(idObject?: number | string) {
    return BaseService.delete(PATH_ROOT + PATH_SEPARATOR, {
      id: idObject,
    }).then((rp) => {
      if (rp.Status) {
        toastr.success("Successfully saved.");
        return;
      } else {
        toastr.error(rp.Messages);
      }
    });
  }
}
