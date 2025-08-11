import { CustomObjectType } from '../api/generalService/types';

export const USER_LOCAL_STORAGE_KEY = 'USER_TOKENS';

export interface SystemUserPermission extends CustomObjectType {
  id: number;
  name: string;
}

export interface SystemUser extends CustomObjectType {
  id: number;
  username: string;
  email: string;
  can: UserAbilities[];
  authorities: string[];
  superUser?: boolean;
  activate: boolean;
  password?: string;
  permissions: SystemUserPermission[] | string[];
}

export interface SystemUserData {
  id: number;
  username: string;
  email: string;
  can: UserAbilities[];
  authorities: string[];
  superUser?: boolean;
  activate: boolean;
  password?: string;
  permissions: { id: string; name: string }[];
}

export interface SystemUsersResponseData {
  content: SystemUserData[];
  totalPages: number;
}

export interface AuthObject {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserAbilities extends CustomObjectType {
  subject: string;
  action: string[];
}
