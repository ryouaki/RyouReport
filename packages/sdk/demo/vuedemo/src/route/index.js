import Vue from 'vue';
import VueRouter from 'vue-router';
import Fullscreen from '@/layouts/Fullscreen';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Fullscreen,
    children: [
      {
        path: 'a',
        component: () => import('@/views/A'),
      },
      {
        path: 'b',
        component: () => import('@/views/B'),
      }
    ]
  }
];

export default new VueRouter({
  mode: 'history',
  routes,
});
