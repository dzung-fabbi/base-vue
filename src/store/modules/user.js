import * as api from "@/api/api";
import service from "@/utils/axios";

export const state = {
  listUsers: [],
  statistical: {},
  userDetail: {},
  listReportUser: [],
  reporterList: [],
}

export const getters = {
  listUsers: state => state.listUsers,
  statistical: state => state.statistical,
  userDetail: state => state.userDetail,
  listReportUser: state => state.listReportUser,
  reporterList: state => state.reporterList,
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
  setReportUserList(state, listReportUser) {
    state.listReportUser = listReportUser;
  },
  setReporterList(state, reporterList) {
    state.reporterList = reporterList;
  },
};

export const actions = {
  async getUsers({ commit }, params) {
    await service({
      url: api.GET_LIST_USER,
      method: "GET",
      params
    }).then(response => {
      commit("setListUsers", response);
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
      method: "POST",
      data: body
    }).then(response => {
      commit("setUserDetail", response.data);
    });
  },
  async blockUser(_, body) {
    await service({
      url: api.BLOCK_USER(body.userId),
      method: "POST",
      data: {
        status: body.status
      }
    }).then(response => {
      console.log(response);
    });
  },
  async getReportUserList({ commit }, params) {
    await service({
      url: api.GET_REPORT_USER_LIST,
      method: "GET",
      params
    }).then(response => {
      commit("setReportUserList", response);
    });
  },
  async deleteUser(_, body) {
    await service({
      url: api.DELETE_USER(body.userId),
      method: "GET",
      body
    }).then(response => {
      console.log(response);
    });
  },
  async getReporterList({ commit }, params) {
    await service({
      url: api.REPORT_LIST(params.userId),
      method: "GET",
      params
    }).then(response => {
      commit("setReporterList", response);
    });
  },
};
