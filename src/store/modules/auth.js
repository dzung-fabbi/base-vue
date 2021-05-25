import * as api from "@/api/api";
import service from "@/utils/axios";

export const state = {
  user: {},
};

export const getters = {
  user: state => state.user,
};

export const mutations = {
  setLogin(state, user) {
    state.user = user;
  },
};

export const actions = {
  loginUser({ commit }, data) {
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
};
