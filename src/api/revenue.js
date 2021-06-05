export const SYSTEM_REVENUE = "/api/v1/cms/purchase/managements";
export const GET_USERS_REVENUE = "/api/v1/cms/income/managements";
export const EXPORT_USERS_REVENUE = "/api/v1/cms/income/export/csv";
export const GET_USER_REVENUE_INCOME = revenue_id => `/api/v1/cms/user/${revenue_id}/incomes`;
export const GET_USER_REVENUE_PURCHASE = revenue_id => `/api/v1/cms/user/${revenue_id}/purchases`;
export const GET_USER_REVENUE_DONATE = revenue_id => `/api/v1/cms/user/${revenue_id}/donates`;
export const GET_USER_REVENUE_ANALYTIC = revenue_id => `/api/v1/cms/user/${revenue_id}/income/analytic`;
