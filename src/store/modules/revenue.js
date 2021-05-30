import * as api from "@/api/api";
import service from "@/utils/axios";

export const state = {
  systemRevenueList: [],
};

export const getters = {
  systemRevenueList: state => state.systemRevenueList,
};

export const mutations = {
  setSystemRevenueList(state, systemRevenueList) {
    state.systemRevenueList = systemRevenueList;
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
};
