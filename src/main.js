import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import VueYoutube from "vue-youtube";
import ElementUI from "element-ui";

Vue.use(ElementUI);
Vue.use(VueYoutube);

new Vue({
  render: h => h(App)
}).$mount("#app");
