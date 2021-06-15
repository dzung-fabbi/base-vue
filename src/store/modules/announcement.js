import * as api from "@/api/announcement";
import service from "@/utils/axios";

export const state = {
  announcement: {},
};

export const getters = {
  announcement: state => state.announcement,
};

export const mutations = {
  setAnnouncementDetail(state, announcement) {
    state.announcement = announcement;
  },
};

export const actions = {
  async getAnnouncementDetail({ commit }, params) {
    await service({
      url: api.GET_ANNOUNCEMENT_DETAIL(params.id),
      method: "GET"
    }).then(response => {
      commit("setAnnouncementDetail", response.data);
    });
  },
  async updateAnnouncement(_, body) {
    await service({
      url: api.UPDATE_ANNOUNCEMENT(body.id),
      method: 'POST',
      data: body
    }).then(response => {
      console.log(response)
    })
  },

  async deleteAnnouncementDetail(_, params) {
    await service({
      url: api.DELETE_ANNOUNCEMENT(params.id),
      method: "DELETE"
    }).then(response => {
      console.log(response)
    });
  },
};
