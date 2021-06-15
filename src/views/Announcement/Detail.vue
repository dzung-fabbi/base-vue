<template>
  <div id="announcement-detail">
    <div class="heading text-start">
      <div class="left-heading"><h2>アナウンス詳細</h2></div>
      <div class="right-heading live-management-heading">
        <button type="button"
                class="btn btn-dark background-black float-end me-2 w-128">
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
          <div class="col-7 text-end"><span>7批クオツ命雑レム</span></div>
        </div>
        <div class="row mb-5">
          <div class="col-5 text-start"><span>作成日</span></div>
          <div class="col-7 text-end"><span>2020-08-20</span></div>
        </div>
        <div class="row mb-5">
          <div class="col-5 text-start"><span>アナウンスタイプ</span></div>
          <div class="col-7 text-end"><span>Maintain</span></div>
        </div>
        <div class="row">
          <div class="col-12 text-start"><span>内容</span></div>
          <div class="col-12 announcement-text text-start">
          <span>
            クフミ多静もかくド継64情ヱ歓チ朝証イ育回すろ作近ど一支りじス告大や長表注帰多数期づぱぽた。能ご紙表セチミ種体ぼ獣2税リかげれ無洋ゃ価済ネソコ旧格ろる全稿ヱ子上聞モヤヒク築演げ役止全ヱナ本立イスたく真子切3形づラつ問構満さずゃ
          </span>
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
                          rules="max:255"
                          v-slot="{ errors }"
                          class="w-100"
                      >
                        <input
                            class="form-control"
                            type="text"
                            v-model="announcementChange.name"
                            placeholder="タイトル"
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
                        ></textarea>
                        <span class="error text-left f-w3">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="button-group">
                    <button type="button" class="btn background-C4C4C4 me-2" v-on:click="showModal">キャンセル
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
export default {
  data() {
    return  {
      isShowModal: false,
      announcement: {
        name: '',
        created_at: '',
        type: '',
        content: '',
      },
      announcementChange: {
        name: '',
        content: '',
      }
    }
  },
  methods: {
    showModal() {
      this.isShowModal = !this.isShowModal;
    },
    updateAnnouncement() {

    }
  }
}
</script>
<style scoped lang="scss">
  @import '@/assets/scss/revenue/system.scss';
</style>
