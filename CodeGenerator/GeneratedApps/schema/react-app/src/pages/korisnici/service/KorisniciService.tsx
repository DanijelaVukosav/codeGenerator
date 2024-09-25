import Response, { FilterData } from "../../../api/generalService/types";
import { useBaseService } from "../../../api/generalService";
import { API_ROUTES, API_ROUTES_ID_PLACEHOLDER } from "../../../api/apiRoutes";
import { Korisnici, KorisniciResponseData } from "../types";

export const useKorisniciService = () => {
  const {
    getAll: getAllObjects,
    getFilteredObjects,
    get: getObject,
    create: createObject,
    update: updateObject,
    deleteObject: deleteBasicObject,
  } = useBaseService();

  const getAll: () => Promise<Response> = () => {
    return getAllObjects(API_ROUTES.ROOT_KORISNICI);
  };
  const getData: (filterSpecification: FilterData) => Promise<KorisniciResponseData> = (filterSpecification) => {
    return getFilteredObjects<KorisniciResponseData>(API_ROUTES.FILTER_KORISNICI, filterSpecification);
  };

  const getById: (id?: string | number) => Promise<Korisnici> = async (id?: string | number) => {
    const url = API_ROUTES.GET_BY_ID_KORISNICI.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return await getObject<Korisnici>(url);
  };
  const create: (object: Korisnici) => Promise<Korisnici> = async (object: Korisnici) => {
    return await createObject<Korisnici>(API_ROUTES.ROOT_KORISNICI, object);
  };
  const update: (object: Korisnici) => Promise<Korisnici> = async (object: Korisnici) => {
    const url = API_ROUTES.GET_BY_ID_KORISNICI.replace(API_ROUTES_ID_PLACEHOLDER, object.id?.toString() ?? "");
    return await updateObject<Korisnici>(url, object);
  };
  const deleteObject: (id?: number | string) => Promise<boolean> = async (id?: number | string) => {
    const url = API_ROUTES.GET_BY_ID_KORISNICI.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return await deleteBasicObject(url);
  };
  return { getAll, getData, getById, create, update, deleteObject };
};
