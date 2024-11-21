import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/firebase";
import TheLogin from "../components/TheLogin.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: TheLogin,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/TheRegister.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../components/TheHome.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth; 
  const isAuthenticated = auth.currentUser; 

  if (requiresAuth && !isAuthenticated) {
    
    next({ name: "login" });
  } else {
    
    next();
  }
});
export default router;
