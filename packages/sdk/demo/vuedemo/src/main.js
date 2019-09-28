import Vue from 'vue';
import 'normalize.css';

import '@/styles/common.css';
import App from '@/views/App.vue';
import router from '@/route';
import store from '@/store';
require('./$ryou')
$ryou.init('app', 'http://localhost:3000/log');
$ryou.autoReportHistory();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
