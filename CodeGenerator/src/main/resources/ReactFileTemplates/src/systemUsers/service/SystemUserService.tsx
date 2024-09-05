import Response, { FilterData } from "../../api/generalService/types";
import { useBaseService } from "../../api/generalService";
import { API_ROUTES } from "../../api/apiRoutes";
import { SystemUser, SystemUsersResponseData } from "../../authService/types";

export const useSystemUsersService = () => {
  const {
    getAll: getAllObjects,
    getFilteredObjects,
    get: getObject,
    create: createObject,
    update: updateObject,
    deleteObject: deleteBasicObject,
  } = useBaseService();

  const getAll: () => Promise<Response> = () => {
    return getAllObjects(API_ROUTES.ALL_SYSTEM_USERS);
  };
  const getData: (filterSpecification: FilterData) => Promise<SystemUsersResponseData> = (filterSpecification) => {
    return getFilteredObjects<SystemUsersResponseData>(API_ROUTES.FILTER_SYSTEM_USERS, filterSpecification);
  };
  const getAllPermissions: () => Promise<string[]> = () => {
    return getAllObjects<string[]>(API_ROUTES.ALL_SYSTEM_USERS_PERMISSIONS);
  };

  const getById: (id?: string) => Promise<SystemUser | undefined> = async (id?: string) => {
    return await getObject<SystemUser>(API_ROUTES.ALL_SYSTEM_USERS, id);
  };
  const create: (object: SystemUser) => Promise<SystemUser> = async (object: SystemUser) => {
    return await createObject<SystemUser>(API_ROUTES.SYSTEM_USER_SIGN_UP, object);
  };
  const update: (object: SystemUser) => Promise<SystemUser> = async (object: SystemUser) => {
    const url = API_ROUTES.ROOT_SYSTEM_USERS + object.id;
    return await updateObject<SystemUser>(url, object);
  };
  const deleteObject: (idObject?: number | string) => Promise<boolean> = async (idObject?: number | string) => {
    const url = API_ROUTES.ROOT_SYSTEM_USERS + idObject;
    return await deleteBasicObject(url, {
      id: idObject,
    });
  };
  return { getAll, getData, getById, create, update, deleteObject, getAllPermissions };
};
