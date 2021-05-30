import * as api from "@/api/api";
import service from "@/utils/axios";

export const state = {
  liveManagementList: [],
};

export const getters = {
  liveManagementList: state => state.liveManagementList,
};

export const mutations = {
  setLiveManagementList(state, liveManagementList) {
    state.liveManagementList = liveManagementList;
  },
};

export const actions = {
  async getLiveManagementList({ commit }, params) {
    await service({
      url: api.LIVE_MANAGEMENT,
      method: "GET",
      params
    }).then(response => {
      commit("setLiveManagementList", response);
    });
  },
};
