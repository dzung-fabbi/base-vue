export default [
  {
    path: "/fobidden",
    name: "403",
    component: () => import("../components/Fobidden.vue"),
    meta: {
      layout: "empty",
      requireLogin: false,
    }
  },
  {
    path: "*",
    name: "404",
    component: () => import("../components/PageNotFound.vue"),
    meta: {
      layout: "empty",
      requireLogin: false,
    }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requireLogin: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "empty",
      requireLogin: false,
    },
  },
];
