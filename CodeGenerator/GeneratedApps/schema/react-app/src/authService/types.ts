export type Roles = Record<string, string[]>;

export const USER_LOCAL_STORAGE_KEY = "USER_TOKENS";

export interface SystemUser {
  id: number;
  username: string;
  email: string;
  name: string;
  casl: string[];
  email_verified: boolean;
  family_name: string;
  given_name: string;
  preferred_username: string;
  sub: string;
  can: UserAbilities[];
  authorities: any;
  superUser?: boolean;
  activate: boolean;
  password?: string;
  permissions: string[];
}

export interface SystemUserData {
  id: number;
  username: string;
  email: string;
  name: string;
  casl: string[];
  email_verified: boolean;
  family_name: string;
  given_name: string;
  preferred_username: string;
  sub: string;
  can: UserAbilities[];
  authorities: any;
  superUser?: boolean;
  activate: boolean;
  password?: string;
  permissions: { id: string; name: string }[];
}

export const initialSystemUser: SystemUser = {
  id: 0,
  username: "",
  email: "",
  name: "",
  casl: [],
  email_verified: false,
  family_name: "",
  given_name: "",
  preferred_username: "",
  sub: "",
  can: [],
  authorities: [],
  superUser: false,
  activate: false,
  password: "",
  permissions: [],
};

export type SystemUsersResponseData = {
  content: SystemUserData[];
  totalPages: number;
};

export type AuthObject = {
  accessToken?: string;
  refreshToken?: string;
};

export interface UserAbilities {
  subject: string;
  actions: string[];
}
