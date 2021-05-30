export const LOGIN_USER_API = "/api/v1/cms/login";
export const GET_INFO_ACCOUNT = "/api/v1/cms/user-info";
export const GET_LIST_USER = "/api/v1/cms/user-list";
export const GET_STATISTICAL_USER = "/api/v1/cms/user-statistical";
export const GET_USER_DETAIL = user_id => `/api/v1/cms/user-info/${user_id}`;
export const UPDATE_USER_INFO = user_id => `/api/v1/cms/user-info/${user_id}`;
export const BLOCK_USER = user_id => `/api/v1/cms/block-user/${user_id}`;
export const GET_BLOCK_USER_LIST = "/api/v1/cms/user-list";
export const DELETE_USER = user_id => `/api/v1/cms/delete-user/${user_id}`;
