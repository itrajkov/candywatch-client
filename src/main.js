import Vue from "vue";
import VueYoutube from "vue-youtube";
import ElementUI from "element-ui";
import VueRouter from "vue-router";

import App from "./App.vue";
import routes from "./routes";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(VueYoutube);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
