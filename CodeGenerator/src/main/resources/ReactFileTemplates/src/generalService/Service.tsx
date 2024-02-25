import React from "react";
import axios from "axios";
import Response from "./ServiceResponse";
import { STATUS_CODES } from "http";
import { ok } from "assert";
import authHeader from "../loginService/auth-header";

export default class BaseService {
  private static baseURL: string = "http://localhost:8080/api/data";

  public static async getAll<T>(url: string): Promise<Response> {
    let res = await axios
      .get<Array<T>>(this.baseURL + url, { headers: authHeader() })
      .then((response: any) => {
        const result = response.data;
        if (result && response.status == "200") {
          return new Response(true, result, "Success", "");
        } else {
          const msg =
            result.messageList && result.messageList.length > 0
              ? result.messageList[0].text
              : "Error";
          return new Response(false, null, "Error", msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, "Error", error);
      });
    return res;
  }

  public static get<T>(url: string, param: any): Promise<Response> {
    let res = axios
      .get<T>(this.baseURL + url + param, { headers: authHeader() })
      .then((response: any) => {
        const result = response.data;
        console.log("Result from get By id", result);

        if (result && response.status == "200") {
          return new Response(true, result, "Success", "");
        } else {
          const msg =
            result.messageList && result.messageList.length > 0
              ? result.messageList[0].text
              : "Error";
          return new Response(false, null, "Error", msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, "Error", error);
      });
    return res;
  }
  public static async delete(url: string, param: any): Promise<Response> {
    console.log(param, param.id, this.baseURL + url + param.id);

    let res = axios
      .delete(this.baseURL + url + param.id, { headers: authHeader() })
      .then((response) => {
        const result = response.data;
        if (response.status == 200) {
          return new Response(true, result, "Success", "");
        } else {
          const msg =
            result.messageList && result.messageList.length > 0
              ? result.messageList[0].text
              : "Error";
          return new Response(false, null, "Error", msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, "Error", error);
      });
    return res;
  }
  public static create<T>(url: string, obj: T): Promise<Response> {
    let res = axios
      .post(this.baseURL + url, obj, { headers: authHeader() })
      .then((response) => {
        const result = response.data;
        if (result && response.status === 200) {
          return new Response(true, result, "Success", "");
        } else {
          const msg =
            result.messageList && result.messageList.length > 0
              ? result.messageList[0].text
              : "Error";
          return new Response(false, null, "Error", msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, "Error", error);
      });
    return res;
  }
  public static async update<T>(url: string, param: any, obj: T): Promise<Response> {
    let res = axios
      .put(this.baseURL + url + param, obj, { headers: authHeader() })
      .then((response) => {
        const result = response.data;
        if (result && response.status === 200) {
          return new Response(true, result, "Success", "");
        } else {
          const msg =
            result.messageList && result.messageList.length > 0
              ? result.messageList[0].text
              : "Error";
          return new Response(false, null, "Error", msg);
        }
      })
      .catch(function (error) {
        return new Response(false, null, "Error", error);
      });
    return res;
  }
}
