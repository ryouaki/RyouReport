import Vue from 'vue';
import 'normalize.css';

import '@/styles/common.css';
import App from '@/views/App.vue';
import router from '@/route';
import store from '@/store';
require('./$ryou')
$ryou.init('app', '/log');
$ryou.autoReportHistory();
$ryou.autoEventReport(['click']);
$ryou.catchGlobalError();
$ryou.listenAjax();
Vue.config.productionTip = false;

Vue.config.errorHandler = function (err, vm, info) {
  $ryou.err({
    message: err.message,
    source: vm.$options.name,
    error: info
  });
}

var x = new XMLHttpRequest();

x.open('get', '/log?1=1');

x.send();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
