import * as api from "@/api/api";
import service from "@/utils/axios";
import Cookie from "js-cookie";

export const state = {
  user: {},
  access_token: Cookie.get("access_token"),
};

export const getters = {
  user: state => state.user,
  token: state => state.access_token,
};

export const mutations = {
  setLogin(state, user) {
    state.user = user;
    Cookie.set("access_token", user.access_token, {expires: 2592000});
  },
  setAccountInfo(state, user) {
    state.user = user;
  },
};

export const actions = {
  loginUser({commit}, data) {
    return new Promise((resolve, reject) => {
      service({
        url: api.LOGIN_USER_API,
        method: "POST",
        data
      })
        .then(response => {
          resolve(response);
          commit("setLogin", response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async getInfoUser({commit}) {
    await service({
      url: api.GET_INFO_ACCOUNT,
      method: "GET"
    }).then(response => {
      commit("setAccountInfo", response.data);
    });
  },
};
