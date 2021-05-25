export default [
  {
    path: "/fobidden",
    name: "403",
    component: () => import("../components/Fobidden.vue"),
    meta: { layout: "empty" }
  },
  {
    path: "*",
    name: "404",
    component: () => import("../components/PageNotFound.vue"),
    meta: { layout: "empty" }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
];
