import Vue from 'vue';
import 'normalize.css';

import '@/styles/common.css';
import App from '@/views/App.vue';
import router from '@/route';
import store from '@/store';
require('./$ryou')
$ryou.init('app', '/log');
$ryou.autoReportHistory();
Vue.config.productionTip = false;

Vue.config.errorHandler = function (err, vm, info) {
  $ryou.err({
    message: err.message,
    source: vm.$options.name,
    error: info
  });
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
