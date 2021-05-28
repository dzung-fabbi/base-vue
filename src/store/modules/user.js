import * as api from "@/api/api";
import service from "@/utils/axios";

export const state = {
  listUsers: [],
  statistical: {},
}

export const getters = {
  listUsers: state => state.listUsers,
  statistical: state => state.statistical,
};

export const mutations = {
  setListUsers(state, listUsers) {
    state.listUsers = listUsers;
  },
  setStatistical(state, statistical) {
    state.statistical = statistical;
  },
};

export const actions = {
  async getUsers({ commit }, params) {
    await service({
      url: api.GET_LIST_USER,
      method: "GET",
      params
    }).then(response => {
      commit("setListUsers", response.data);
    });
  },
  async getStatistical({ commit }) {
    await service({
      url: api.GET_STATISTICAL_USER,
      method: "GET",
    }).then(response => {
      commit("setStatistical", response.data);
    });
  },
};
