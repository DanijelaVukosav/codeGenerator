import Response, { FilterData } from "../../../api/generalService/types";
import { useBaseService } from "../../../api/generalService";
import { API_ROUTES, API_ROUTES_ID_PLACEHOLDER } from "../../../api/apiRoutes";
import { Narudzbe, NarudzbeResponseData } from "../types";

export const useNarudzbeService = () => {
  const {
    getAll: getAllObjects,
    getFilteredObjects,
    get: getObject,
    create: createObject,
    update: updateObject,
    deleteObject: deleteBasicObject,
  } = useBaseService();

  const getAll: () => Promise<Response> = () => {
    return getAllObjects(API_ROUTES.ROOT_NARUDZBE);
  };
  const getData: (filterSpecification: FilterData) => Promise<NarudzbeResponseData> = (filterSpecification) => {
    return getFilteredObjects<NarudzbeResponseData>(API_ROUTES.FILTER_NARUDZBE, filterSpecification);
  };

  const getById: (id?: string | number) => Promise<Narudzbe> = async (id?: string | number) => {
    const url = API_ROUTES.GET_BY_ID_NARUDZBE.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return await getObject<Narudzbe>(url);
  };
  const create: (object: Narudzbe) => Promise<Narudzbe> = async (object: Narudzbe) => {
    return await createObject<Narudzbe>(API_ROUTES.ROOT_NARUDZBE, object);
  };
  const update: (object: Narudzbe) => Promise<Narudzbe> = async (object: Narudzbe) => {
    const url = API_ROUTES.GET_BY_ID_NARUDZBE.replace(API_ROUTES_ID_PLACEHOLDER, object.id?.toString() ?? "");
    return await updateObject<Narudzbe>(url, object);
  };
  const deleteObject: (id?: number | string) => Promise<boolean> = async (id?: number | string) => {
    const url = API_ROUTES.GET_BY_ID_NARUDZBE.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return await deleteBasicObject(url);
  };
  return { getAll, getData, getById, create, update, deleteObject };
};
