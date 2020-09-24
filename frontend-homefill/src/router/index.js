import Vue from "vue";
import VueRouter from "vue-router";
import frontPage from "../components/auth/FrontPage.vue";
import mainApp from "../components/Mainapp.vue";
import store from "../store";
// add not found
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "User",
    component: frontPage
  },
  {
    path: "/app",
    name: "MainApp",
    component: mainApp
  },
  { path: "*", name: "not" }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    if (to.path == "/") {
      if (store.getters.authStatus) {
        next("/app");
      } else {
        next();
      }
    } else if (to.path == "/app") {
      if (store.getters.authStatus) {
        next();
      } else {
        next("/");
      }
    } else {
      next({ name: "not" });
    }
  }, 300);
});
export default router;
