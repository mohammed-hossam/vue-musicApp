import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ManageView from "../views/ManageView.vue";
import useUserStore from "../stores/user.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/manage",
    name: "manage",
    component: ManageView,
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //   console.log("manage route gaurd");
    //   next();
    // },
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    redirect: { name: "home" },
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import("../views/AboutView.vue"),
  // },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-600",
});

router.beforeEach((to, from, next) => {
  console.log("global gaurd");
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
