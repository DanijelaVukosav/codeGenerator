import { FilterData } from "./types";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const useBaseService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAll: <T>(url: string) => Promise<T> = async <T,>(url: string) => {
    return await axiosPrivate.get<Array<any>>(url).then((response: any) => {
      return response.data as T;
    });
  };

  const getFilteredObjects: <T>(url: string, filter: FilterData) => Promise<T> = async <T,>(url: string, filter: FilterData) => {
    return axiosPrivate.post<Array<any>>(url, filter).then((response: any) => {
      return response.data as T;
    });
  };

  const get: <T>(url: string, params?: any) => Promise<T> = async <T,>(url: string, params?: any) => {
    return axiosPrivate.get<any>(url, params).then((response: any) => {
      return response.data as T;
    });
  };

  const deleteObject: (url: string, params?: any) => Promise<boolean> = async (url: string, params?: any) => {
    return axiosPrivate.delete(url, params).then((response) => {
      return Boolean(response.data);
    });
  };

  const create: <T>(url: string, obj: any) => Promise<T> = async <T,>(url: string, obj: any) => {
    const response = await axiosPrivate.post(url, obj);
    return response.data as T;
  };

  const update: <T>(url: string, obj: any) => Promise<T> = async <T,>(url: string, obj: any) => {
    return await axiosPrivate.put(url, obj).then((response: any) => {
      return response.data as T;
    });
  };

  return {
    getAll,
    getFilteredObjects,
    get,
    create,
    update,
    deleteObject,
  };
};
