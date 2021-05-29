import * as api from "@/api/api";
import service from "@/utils/axios";

export const state = {
  listUsers: [],
  statistical: {},
  userDetail: {},
  listBlockUser: [],
}

export const getters = {
  listUsers: state => state.listUsers,
  statistical: state => state.statistical,
  userDetail: state => state.userDetail,
  listBlockUser: state => state.listBlockUser,
};

export const mutations = {
  setListUsers(state, listUsers) {
    state.listUsers = listUsers;
  },
  setStatistical(state, statistical) {
    state.statistical = statistical;
  },
  setUserDetail(state, userDetail) {
    state.userDetail = userDetail;
  },
  setBlockUserList(state, listBlockUser) {
    state.listBlockUser = listBlockUser;
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
  async getUserDetail({ commit }, params) {
    await service({
      url: api.GET_USER_DETAIL(params.userId),
      method: "GET",
    }).then(response => {
      commit("setUserDetail", response.data);
    });
  },
  async updateUserInfo({ commit }, body) {
    await service({
      url: api.UPDATE_USER_INFO(body.userId),
      method: "PUT",
      body
    }).then(response => {
      commit("setUserDetail", response.data);
    });
  },
  async blockUser(_, body) {
    await service({
      url: api.BLOCK_USER(body.userId),
      method: "PUT",
      body
    }).then(response => {
      console.log(response);
    });
  },
  async getBlockUserList({ commit }, params) {
    await service({
      url: api.GET_BLOCK_USER_LIST,
      method: "GET",
      params
    }).then(response => {
      commit("setBlockUserList", response.data);
    });
  },
  async deleteUser(_, body) {
    await service({
      url: api.DELETE_USER(body.userId),
      method: "PUT",
      body
    }).then(response => {
      console.log(response);
    });
  },
};
