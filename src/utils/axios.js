import axios from "axios";
import Cookie from "js-cookie";
import Vue from "vue";
import errorMessage from "../commons/message.json";
import router from "../router";

const service = axios.create({
  baseURL: process.env.VUE_APP_MY_ENV_BASE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  }
});

service.interceptors.request.use(
  config => {
    const token = Cookie.get("token");
    if (token) {
      config.headers.common["Accept"] = "application/json";
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response.status === 401) {
      return Promise.reject(error);
    }

    if (error.response.status === 403) {
      router.push({ name: "403" });

      return Promise.reject(error);
    }

    if (error.response.status === 404) {
      return Promise.reject(error);
    }

    var msg = null;
    if (
      error.response.status === 422 &&
      error.response.data.error.code === 4220
    ) {
      let messages = error.response.data.error.message;
      let firstKey = Object.keys(messages)[0];
      let firstValue = messages[firstKey][0];
      let part = firstValue.slice(
        firstValue.indexOf(".") + 1,
        firstValue.length
      );

      msg = `${part}`;
    } else {
      if (error.response.data.error.code) {
        if (error.response.data.error.code === "5022") {
          return Promise.reject(error);
        } else if (error.response.data.error.code === "4043") {
          return Promise.reject(error);
        } else if (error.response.data.error.code === "5026") {
          return Promise.reject(error);
        } else if (error.response.data.error.code === "5001") {
          return Promise.reject(error);
        } else {
          msg = errorMessage.error[`${error.response.data.error.code}`];
        }
      }
    }

    const vm = new Vue({});
    vm.$bvToast.toast(msg + "!", {
      title: "Error",
      noCloseButton: false,
      autoHideDelay: 10000,
      appendToast: true,
      toaster: "b-toaster-top-center",
      variant: "danger",
      solid: true
    });

    return Promise.reject(error);
  }
);

export default service;
