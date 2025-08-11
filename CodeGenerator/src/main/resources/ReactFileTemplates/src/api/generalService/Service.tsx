import { CustomObjectType, FilterData } from './types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { AxiosResponse } from 'axios';

export const useBaseService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAll: <T>(url: string) => Promise<T> = async <T,>(url: string) => {
    return axiosPrivate.get<T>(url).then((response: AxiosResponse<T, T>) => {
      return response.data;
    });
  };

  const getFilteredObjects: <T>(url: string, filter: FilterData) => Promise<T> = async <T,>(
      url: string,
      filter: FilterData
  ) => {
    return axiosPrivate.post<T>(url, filter).then((response: AxiosResponse<T, T>) => {
      return response.data;
    });
  };

  const get: <T>(url: string, params?: CustomObjectType) => Promise<T> = async <T,>(
      url: string,
      params?: CustomObjectType
  ) => {
    return axiosPrivate.get<T>(url, params).then((response: AxiosResponse<T, T>) => {
      return response.data;
    });
  };

  const deleteObject: (url: string, params?: CustomObjectType) => Promise<boolean> = async (
      url: string,
      params?: CustomObjectType
  ) => {
    return axiosPrivate.delete(url, params).then((response) => {
      return Boolean(response.data);
    });
  };

  const create: <T>(url: string, obj: T) => Promise<T> = async <T,>(url: string, obj: T) => {
    const response: AxiosResponse<T, T> = await axiosPrivate.post(url, obj);
    return response.data;
  };

  const update: <T>(url: string, obj: T) => Promise<T> = async <T,>(url: string, obj: T) => {
    return axiosPrivate.put(url, obj).then((response: AxiosResponse<T, T>) => {
      return response.data;
    });
  };

  return {
    getAll,
    getFilteredObjects,
    get,
    create,
    update,
    deleteObject
  };
};
