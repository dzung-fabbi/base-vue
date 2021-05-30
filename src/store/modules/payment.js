import * as api from "@/api/payment";
import service from "@/utils/axios";

export const state = {
  listSettings: [],
  managementList: [],
}

export const getters = {
  listSettings: state => state.listSettings,
  managementList: state => state.managementList,
};

export const mutations = {
  setListSettings(state, listSettings) {
    state.listSettings = listSettings;
  },
  setManagementList(state, managementList) {
    state.managementList = managementList;
  },
};

export const actions = {
  async getSettings({ commit }, params) {
    await service({
      url: api.GET_LIST_PAYMENT_SETTING,
      method: "GET",
      params
    }).then(response => {
      commit("setListSettings", response.data);
    });
  },
  async updateSettings(_, data) {
    await service({
      url: api.UPDATE_PAYMENT_SETTING,
      method: "POST",
      data
    });
  },
  async getPaymentManagementList({ commit }, params) {
    await service({
      url: api.GET_PAYMENT_MANAGEMENT,
      method: "GET",
      params
    }).then(response => {
      commit("setManagementList", response);
    });
  },
};
