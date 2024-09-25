import Response, { FilterData } from "../../../api/generalService/types";
import { useBaseService } from "../../../api/generalService";
import { API_ROUTES, API_ROUTES_ID_PLACEHOLDER } from "../../../api/apiRoutes";
import { Proizvodi, ProizvodiResponseData } from "../types";

export const useProizvodiService = () => {
  const {
    getAll: getAllObjects,
    getFilteredObjects,
    get: getObject,
    create: createObject,
    update: updateObject,
    deleteObject: deleteBasicObject,
  } = useBaseService();

  const getAll: () => Promise<Response> = () => {
    return getAllObjects(API_ROUTES.ROOT_PROIZVODI);
  };
  const getData: (filterSpecification: FilterData) => Promise<ProizvodiResponseData> = (filterSpecification) => {
    return getFilteredObjects<ProizvodiResponseData>(API_ROUTES.FILTER_PROIZVODI, filterSpecification);
  };

  const getById: (id?: string | number) => Promise<Proizvodi> = async (id?: string | number) => {
    const url = API_ROUTES.GET_BY_ID_PROIZVODI.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return await getObject<Proizvodi>(url);
  };
  const create: (object: Proizvodi) => Promise<Proizvodi> = async (object: Proizvodi) => {
    return await createObject<Proizvodi>(API_ROUTES.ROOT_PROIZVODI, object);
  };
  const update: (object: Proizvodi) => Promise<Proizvodi> = async (object: Proizvodi) => {
    const url = API_ROUTES.GET_BY_ID_PROIZVODI.replace(API_ROUTES_ID_PLACEHOLDER, object.id?.toString() ?? "");
    return await updateObject<Proizvodi>(url, object);
  };
  const deleteObject: (id?: number | string) => Promise<boolean> = async (id?: number | string) => {
    const url = API_ROUTES.GET_BY_ID_PROIZVODI.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return await deleteBasicObject(url);
  };
  return { getAll, getData, getById, create, update, deleteObject };
};
