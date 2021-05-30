<template>
  <div id="payment-setting">
    <div class="heading">
      <h2>設定</h2>
      <button
        @click="editSetting"
        class="btn btn-dark background-black"
      >
        {{ isEdit ? '保存' : '編集'}}
      </button>
    </div>
    <div class="content">
      <div class="form-content">
        <div class="form-header">
          <div class="left-header">総合ランキング順位</div>
          <div class="right-header">還元率</div>
        </div>
        <div class="form-input">
          <div v-for="(setting, index) in settings" :key="index" class="form-row">
            <div class="input-column">
              <money 
                type="text" class="form-control" 
                v-model="setting.range_from" 
                :disabled="!isEdit"
                v-bind="config"
                @blur.native="onBlur(index, 'range_from')"
              />
            </div>
            <div class="sign-column">
              <span>~</span>
            </div>
            <div class="input-column">
              <money 
                type="text" class="form-control" 
                v-model="setting.range_to" 
                :disabled="!isEdit"
                v-bind="config"
                @blur.native="onBlur(index, 'range_to')"
              />
            </div>
            <div class="sign-column">
              <span>=</span>
            </div>
            <div class="input-column">
              <money 
                type="text" class="form-control" 
                v-model="setting.final" 
                :disabled="!isEdit"
                v-bind="config"
                @blur.native="onBlur(index, 'final')"
              />
            </div>
            <div v-if="isEdit" class="button-column">
              <button @click="removeSetting(index)" class="btn js-delete-column">
                <DeleteIcon/>
              </button>
            </div>
          </div>
        </div>
        <div v-if="isEdit" class="form-bottom">
          <button @click="addSetting" class="btn js-bt-add">
            + 追加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import DeleteIcon from "@/components/Icon/DeleteIcon";
import { MESSAGES } from "@/utils/const";

export default {
  name: 'PaymentSetting',
  components: {
    DeleteIcon
  },
  data() {
    return {
      isEdit: false,
      config: {
        decimal: '',
        thousands: '',
        prefix: '',
        suffix: '%',
        precision: 0,
        masked: false
      }
    }
  },
  computed: {
    ...mapGetters({
      settings: "payment/listSettings",
    })
  },
  created () {
    this.getSettingList();
  },
  methods: {
    getSettingList() {
      this.$root.$refs.loading.start();
      this.$store.dispatch("payment/getSettings").then(() => {
        this.$root.$refs.loading.finish();
      }).catch(() => {
        this.$root.$refs.loading.start();
      });
    },
    editSetting() {
      if (this.isEdit && this.validateSetting()) {
        this.$root.$refs.loading.start();
        this.$store.dispatch("payment/updateSettings", this.settings).then(() => {
          this.$toast(MESSAGES.SAVE_SUCCESS, MESSAGES.NOTICE, "success");
          this.$root.$refs.loading.finish();
          this.isEdit = false;
          this.getSettingList();
        }).catch(() => {
          this.$toast(MESSAGES.SAVE_ERROR, MESSAGES.NOTICE, "danger");
          this.$root.$refs.loading.finish();
        });
      } else {
        this.isEdit = true;
      }
    },
    removeSetting(index) {
      this.settings.splice(index, 1);
    },
    addSetting() {
      this.settings.push({
        final: 0,
        range_from: 0,
        range_to: 0
      });
    },
    validateSetting() {
      for (let index = 0; index < this.settings.length; index++) {
        if (this.settings[index].range_from >= this.settings[index].range_to) {
          this.$toast(MESSAGES.ERROR_PAYMENT_SETTING_1, MESSAGES.NOTICE, "danger");
          return false;
        } else if (index > 0 && this.settings[index].range_from <= this.settings[index - 1].range_to) {
          this.$toast(MESSAGES.ERROR_PAYMENT_SETTING_2, MESSAGES.NOTICE, "danger");
          return false;
        }
      }
      return true;
    },
    onBlur(index, property) {
      if (this.settings[index][property] > 100) {
        this.settings[index][property] = 100;
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/payment/setting.scss';
</style>
