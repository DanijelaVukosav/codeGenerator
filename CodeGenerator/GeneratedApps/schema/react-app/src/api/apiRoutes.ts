export const API_ROUTES_ID_PLACEHOLDER = "${API_ROUTES_ID_PLACEHOLDER}";
export const API_ROUTES = {
  LOGIN: "/auth/signin",
  SIGN_UP: "/auth/signup",
  REFRESH_TOKEN: "/auth/refreshtoken",
  SYSTEM_USER_DETAILS: "/systemUser/me",
  SYSTEM_USER_ACTIVATE: "/systemUser/activate",
  ALL_SYSTEM_USERS: "/systemUser/all",
  FILTER_SYSTEM_USERS: "/systemUser/filter",
  SYSTEM_USER_SIGN_UP: "/systemUser/signup",
  ROOT_SYSTEM_USERS: "/systemUser/",
  ALL_SYSTEM_USERS_PERMISSIONS: "/systemUser/allPermissions",

ROOT_KORISNICI:  "/data/korisnici",
FILTER_KORISNICI:  "/data/korisnici/filter",
GET_BY_ID_KORISNICI:  "/data/korisnici/${API_ROUTES_ID_PLACEHOLDER}",

ROOT_PROIZVODI:  "/data/proizvodi",
FILTER_PROIZVODI:  "/data/proizvodi/filter",
GET_BY_ID_PROIZVODI:  "/data/proizvodi/${API_ROUTES_ID_PLACEHOLDER}",

ROOT_NARUDZBE:  "/data/narudzbe",
FILTER_NARUDZBE:  "/data/narudzbe/filter",
GET_BY_ID_NARUDZBE:  "/data/narudzbe/${API_ROUTES_ID_PLACEHOLDER}",

};
