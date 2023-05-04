import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/SignUp.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Home.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Products.vue"),
  },
  {
    path: "/product/:id",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Detail.vue"),
  },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Cart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
