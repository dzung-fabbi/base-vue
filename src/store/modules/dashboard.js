import * as api from "@/api/dashboard";
import service from "@/utils/axios";

export const actions = {
  async getDashboardAnalytic(_, params) {
    return new Promise((resolve, reject) => {
      service({
        url: api.GET_DASHBOARD_ANALYTIC,
        method: "GET",
        params
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  async getDashboardIncome(_, params) {
    return new Promise((resolve, reject) => {
      service({
        url: api.GET_DASHBOARD_INCOME,
        method: "GET",
        params
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  async getDashboardDistributor(_, params) {
    return new Promise((resolve, reject) => {
      service({
        url: api.GET_DASHBOARD_DISTRIBUTOR,
        method: "GET",
        params
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  async getDashboardRegister(_, params) {
    return new Promise((resolve, reject) => {
      service({
        url: api.GET_DASHBOARD_REGISTER,
        method: "GET",
        params
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
};
