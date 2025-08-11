import { FilterData } from "../../../api/generalService/types";
import { useBaseService } from "../../../api/generalService";
import { API_ROUTES, API_ROUTES_ID_PLACEHOLDER } from "../../../api/apiRoutes";
import { #{FUL_TABLE_NAME}#, #{FUL_TABLE_NAME}#ResponseData } from "../types";

export const use#{FUL_TABLE_NAME}#Service = () => {
  const {
    getFilteredObjects,
    get: getObject,
    create: createObject,
    update: updateObject,
    deleteObject: deleteBasicObject,
  } = useBaseService();

  const getData: (filterSpecification: FilterData) => Promise<#{FUL_TABLE_NAME}#ResponseData> = (filterSpecification) => {
    return getFilteredObjects<#{FUL_TABLE_NAME}#ResponseData>(API_ROUTES.FILTER_#{AUL_TABLE_NAME}#, filterSpecification);
  };

  const getById: (id?: string | number) => Promise<#{FUL_TABLE_NAME}#> = async (id?: string | number) => {
    const url = API_ROUTES.GET_BY_ID_#{AUL_TABLE_NAME}#.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return getObject<#{FUL_TABLE_NAME}#>(url);
  };
  const create: (object: #{FUL_TABLE_NAME}#) => Promise<#{FUL_TABLE_NAME}#> = async (object: #{FUL_TABLE_NAME}#) => {
    return createObject<#{FUL_TABLE_NAME}#>(API_ROUTES.ROOT_#{AUL_TABLE_NAME}#, object);
  };
  const update: (object: #{FUL_TABLE_NAME}#) => Promise<#{FUL_TABLE_NAME}#> = async (object: #{FUL_TABLE_NAME}#) => {
    const url = API_ROUTES.GET_BY_ID_#{AUL_TABLE_NAME}#.replace(API_ROUTES_ID_PLACEHOLDER, object.#{TABLE_PRIMARY_KEY_COLUMN}#?.toString() ?? "");
    return updateObject<#{FUL_TABLE_NAME}#>(url, object);
  };
  const deleteObject: (id?: #{TABLE_PRIMARY_KEY_COLUMN_TYPE}# | string) => Promise<boolean> = async (id?: #{TABLE_PRIMARY_KEY_COLUMN_TYPE}# | string) => {
    const url = API_ROUTES.GET_BY_ID_#{AUL_TABLE_NAME}#.replace(API_ROUTES_ID_PLACEHOLDER, id?.toString() ?? "");
    return deleteBasicObject(url);
  };
  return { getData, getById, create, update, deleteObject };
};
