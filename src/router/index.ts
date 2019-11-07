import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/women',
    name: 'women',
    component: () => import('../views/Women.vue'),
  },
  {
    path: '/men',
    name: 'men',
    component: () => import('../views/Men.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/men/:id(\\d+)',
    name: 'men-product',
    component: () => import('../views/Product.vue'),
  },
  {
    path: '/women/:id(\\d+)',
    name: 'women-product',
    component: () => import('../views/Product.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const siteCondition: boolean = to.name !== 'home'
  && to.name !== 'women' && to.name !== 'men' && to.name !== 'cart'
  && to.name !== 'men-product' && to.name !== 'women-product';
  if (siteCondition) {
     next('/');
  } else {
    next();
  }
});

export default router;
