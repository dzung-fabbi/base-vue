import * as api from "@/api/payment";
import service from "@/utils/axios";

export const state = {
  listSettings: [],
}

export const getters = {
  listSettings: state => state.listSettings,
};

export const mutations = {
  setListSettings(state, listSettings) {
    state.listSettings = listSettings;
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
};
