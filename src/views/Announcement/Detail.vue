<template>
  <div id="announcement-detail">
    <div class="heading text-start">
      <div class="left-heading"><h2>アナウンス詳細</h2></div>
      <div class="right-heading live-management-heading">
        <button
            type="button"
            class="btn btn-dark background-black float-end me-2 w-128"
            v-on:click="DeleteAnnouncement"
        >
          削除
        </button>
        <button
            type="button"
            class="btn btn-dark background-black float-end me-2 w-128"
            v-on:click="showModal"
        >
          情報編集
        </button>
      </div>
    </div>
    <div class="content announcement-content color-8B9DA5">
      <div class="main-content">
        <div class="row mb-5">
          <div class="col-5 text-start"><span>タイトル</span></div>
          <div class="col-7 text-end"><span>{{ announcement.title }}</span></div>
        </div>
        <div class="row mb-5">
          <div class="col-5 text-start"><span>作成日</span></div>
          <div class="col-7 text-end"><span>{{ announcement.create_at }}</span></div>
        </div>
        <div class="row mb-5">
          <div class="col-5 text-start"><span>アナウンスタイプ</span></div>
          <div class="col-7 text-end"><span>{{ announcement.type }}</span></div>
        </div>
        <div class="row">
          <div class="col-12 text-start"><span>内容</span></div>
          <div class="col-12 announcement-text text-start">
            <div v-html="announcement.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-edit-announcement">
      <div class="modal fade" :class="{'show': isShowModal}" id="edit-announcement-modal" tabindex="-1"
           aria-labelledby="edit-announcement-modal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered dialog-edit-user">
          <div class="modal-content">
            <div class="modal-title"><span>アナウンス編集</span></div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <div class="modal-body text-start">
                <div class="detail color-8B9DA5">
                  <div class="row mb-4">
                    <div class="col-12 mb-2">タイトル</div>
                    <div class="col-12 input-group">
                      <ValidationProvider
                          name="タイトル"
                          rules="required|max:255"
                          v-slot="{ errors }"
                          class="w-100"
                      >
                        <input
                            class="form-control"
                            type="text"
                            v-model="announcementChange.title"
                            placeholder="タイトル"
                            @blur="handleBlur"
                        >
                        <span class="error text-left f-w3">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-6 mb-2">内容</div>
                    <div class="col-12 input-group">
                      <ValidationProvider
                          name="内容"
                          rules="required|max:255"
                          v-slot="{ errors }"
                          class="w-100"
                      >
                        <textarea
                            class="form-control"
                            type="text"
                            placeholder="内容"
                            rows="5"
                            v-model="announcementChange.content"
                            @blur="handleBlur"
                        ></textarea>
                        <span class="error text-left f-w3">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="button-group">
                    <button type="button" class="btn background-C4C4C4 me-2" v-on:click="closeModal">キャンセル
                    </button>
                    <button type="button" class="btn btn-dark background-black float-end"
                            v-on:click="handleSubmit(updateAnnouncement)">保存
                    </button>
                  </div>
                </div>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {MESSAGES, MODAL} from "@/utils/const";

export default {
  data() {
    return {
      isShowModal: false,
      announcement: {
        id: '',
        title: '',
        create_at: '',
        type: '',
        content: '',
      },
      announcementChange: {
        id: '',
        title: '',
        content: '',
      }
    }
  },
  created() {
    this.getAnnouncementDetail();
  },
  methods: {
    showModal() {
      this.isShowModal = !this.isShowModal;
    },
    closeModal() {
      this.isShowModal = false;
      this.announcementChange = {...this.announcement};
    },
    async getAnnouncementDetail() {
      this.$root.$refs.loading.start();
      const params = {
        id: this.$route.params.id
      };
      await this.$store.dispatch('announcement/getAnnouncementDetail', params);
      this.announcement = this.$store.getters['announcement/announcement'];
      this.announcement.create_at = this.formatDate(this.announcement.create_at);
      this.announcementChange = {...this.announcement};
      this.$root.$refs.loading.finish();
    },
    async updateAnnouncement() {
      this.$root.$refs.loading.start();
      const body = {
        id: this.$route.params.id,
        title: this.announcementChange.title,
        content: this.announcementChange.content,
      };
      await this.$store.dispatch('announcement/updateAnnouncement', body);
      this.isShowModal = false;
      await this.getAnnouncementDetail();
      this.$root.$refs.loading.finish();
    },
    formatDate(date) {
      if (!date) return;
      return this.$dayjs(date).format('YYYY-MM-DD');
    },
    handleBlur() {
      if (this.announcementChange.title) {
        this.announcementChange.title = this.announcementChange.title.trim();
      }
      if (this.announcementChange.content) {
        this.announcementChange.content = this.announcementChange.content.trim();
      }
    },
    async DeleteAnnouncement() {
      let isBlock = false;
      this.$bvModal.msgBoxConfirm(MESSAGES.CONFIRM_DELETE_ANNOUNCEMENT, {
        title: MODAL.CONFIRM_DELETE_ANNOUNCEMENT_TITLE,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: MODAL.LABEL_OK,
        cancelTitle: MODAL.LABEL_CANCEL,
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
        headerClass: 'confirm-modal',
      })
          .then(async value => {
            isBlock = value;
            if (isBlock) {
              this.$root.$refs.loading.start();
              const body = {
                id: this.announcement.id,
              }
              await this.$store.dispatch('announcement/deleteAnnouncementDetail', body)
                  .then(async () => {
                    this.$toast(
                        MESSAGES.DELETE_ANNOUNCEMENT_SUCCESS,
                        MODAL.MODAL_NOTICE,
                        MODAL.MODAL_TYPE_SUCCESS,
                    );
                    this.$router.push({name: 'AnnouncementList'});
                    this.$root.$refs.loading.finish();
                  })
                  .catch(error => {
                    console.log(error)
                    this.$root.$refs.loading.finish();
                    this.$toast(
                        MESSAGES.DELETE_ANNOUNCEMENT_FAIL,
                        MODAL.MODAL_NOTICE,
                        MODAL.MODAL_TYPE_DANGER,
                    );
                  });
            }
          })
          .catch(err => {
            // An error occurred
            console.log(err)
          })
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/revenue/system.scss';
</style>
