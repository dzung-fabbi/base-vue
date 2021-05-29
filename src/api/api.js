export const LOGIN_USER_API = "/api/v1/admin/login";
export const GET_INFO_ACCOUNT = "/api/v1/admin/user-info";
export const GET_LIST_USER = "/api/v1/admin/user-list";
export const GET_STATISTICAL_USER = "/api/v1/admin/user-statistical";
export const GET_USER_DETAIL = user_id => `/api/v1/admin/user-info/${user_id}`;
export const UPDATE_USER_INFO = user_id => `/api/v1/admin/user-info/${user_id}`;
export const BLOCK_USER = user_id => `/api/v1/admin/block-user/${user_id}`;
export const GET_BLOCK_USER_LIST = "/api/v1/admin/user-list";
export const DELETE_USER = user_id => `/api/v1/admin/delete-user/${user_id}`;
