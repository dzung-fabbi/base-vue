import Vue from "vue";
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import plugins from "./plugins";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import Meta from "vue-meta";
import { loadVeeValidateExtend } from "./plugins/vee-validate";
import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(plugins);
Vue.use(Meta);
Vue.component('default-layout', DashboardLayout);
Vue.component('empty-layout', EmptyLayout);
loadVeeValidateExtend();
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

new Vue({
  router,
  store,
  ...App
}).$mount("#app");
