import * as api from "@/api/api";
import service from "@/utils/axios";

export const state = {
  mediaUrl: '',
};

export const getters = {
  mediaUrl: state => state.mediaUrl,
};

export const mutations = {
  setMediaUrl(state, mediaUrl) {
    state.mediaUrl = mediaUrl;
  },
};

export const actions = {
  async uploadMedia(_, body) {
    return new Promise((resolve, reject) => {
      service({
        url: api.UPLOAD_MEDIA,
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: body
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
