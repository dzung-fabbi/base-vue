import * as api from "@/api/revenue";
import service from "@/utils/axios";

export const state = {
  systemRevenueList: [],
  userRevenueList: []
};

export const getters = {
  systemRevenueList: state => state.systemRevenueList,
  userRevenueList: state => state.userRevenueList,
};

export const mutations = {
  setSystemRevenueList(state, systemRevenueList) {
    state.systemRevenueList = systemRevenueList;
  },
  setUserRevenueList(state, data) {
    state.userRevenueList = data;
  },
};

export const actions = {
  async getSystemRevenueList({ commit }, params) {
    await service({
      url: api.SYSTEM_REVENUE,
      method: "GET",
      params
    }).then(response => {
      commit("setSystemRevenueList", response);
    });
  },
  async getUserRevenueList({ commit }, params) {
    await service({
      url: api.GET_USERS_REVENUE,
      method: "GET",
      params
    }).then(response => {
      commit("setUserRevenueList", response);
    });
  },
  export() {
    return new Promise((resolve, reject) => {
      service({
        url: api.EXPORT_USERS_REVENUE,
        method: "GET"
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
};
