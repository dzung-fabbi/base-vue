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
  {
    path: "/users",
    component: {
      render: c => c("router-view")
    },
    children: [
      {
        path: "/",
        name: "UserList",
        component: () => import("../views/User/List.vue"),
        meta: {
          requireLogin: true,
        },
      },
      {
        path: ":id/detail",
        name: "UserDetail",
        component: () => import("../views/User/Detail.vue"),
        meta: {
          requireLogin: true,
        },
      },
      {
        path: "blocks",
        component: {
          render: c => c("router-view")
        },
        children: [
          {
            path: "/",
            name: "UserBlockList",
            component: () => import("../views/User/Block/List.vue"),
            meta: {
              requireLogin: true,
            },
          },
          {
            path: ":id/detail",
            name: "UserBlockDetail",
            component: () => import("../views/User/Report/Detail.vue"),
            meta: {
              requireLogin: true,
            },
          },
        ]
      },
      {
        path: "reports",
        component: {
          render: c => c("router-view")
        },
        children: [
          {
            path: "/",
            name: "UserReportList",
            component: () => import("../views/User/Report/List.vue"),
            meta: {
              requireLogin: true,
            },
          },
          {
            path: ":id/detail",
            name: "UserReportDetail",
            component: () => import("../views/User/Report/Detail.vue"),
            meta: {
              requireLogin: true,
            },
          },
        ]
      }
    ]
  },
  {
    path: "/revenues",
    component: {
      render: c => c("router-view")
    },
    children: [
      {
        path: "system",
        name: "RevenueSystem",
        component: () => import("../views/Revenue/System.vue"),
        meta: {
          requireLogin: true,
        },
      },
      {
        path: "user",
        name: "RevenueUser",
        component: {
          render: c => c("router-view")
        },
        meta: {
          requireLogin: true,
        },
        children: [
          {
            path: "",
            name: "RevenueUser",
            component: () => import("../views/Revenue/User.vue"),
            meta: {
              requireLogin: true,
            },
          },
          {
            path: ":id",
            name: "RevenueUserDetail",
            component: () => import("../views/Revenue/UserRevenueDetail.vue"),
            meta: {
              requireLogin: true,
            },
          },
        ]
      },
    ]
  },
  {
    path: "/payments",
    component: {
      render: c => c("router-view")
    },
    children: [
      {
        path: "",
        name: "PaymentList",
        component: () => import("../views/Payment/List.vue"),
        meta: {
          requireLogin: true,
        },
      },
      {
        path: "setting",
        name: "PaymentSetting",
        component: () => import("../views/Payment/Setting.vue"),
        meta: {
          requireLogin: true,
        },
      },
    ]
  },
  {
    path: "/live-managements",
    name: "LiveManagement",
    component: () => import("../views/LiveManagement.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/announcement",
    component: {
      render: c => c("router-view")
    },
    children: [
      {
        path: "",
        name: "AnnouncementList",
        component: () => import("../views/Announcement/List.vue"),
        meta: {
          requireLogin: true,
        },
      },
      {
        path: ":id",
        name: "AnnouncementDetail",
        component: () => import("../views/Announcement/Detail.vue"),
        meta: {
          requireLogin: true,
        },
      },
    ]
  },
];
