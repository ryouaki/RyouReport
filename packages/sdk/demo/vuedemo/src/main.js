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
Vue.config.productionTip = false;

Vue.config.errorHandler = function (err, vm, info) {
  $ryou.err({
    message: err.message,
    source: vm.$options.name,
    error: info
  });
}

var oldXhr = XMLHttpRequest;

window.XMLHttpRequest = function () {
  var xhr = new oldXhr();
  var _open = xhr.open;
  var _send = xhr.send;
  var _start = null;
  var _method = null;
  var _body = null;

  xhr.open = function () {
    _start = new Date();
    _method = arguments[0];
    _open.apply(xhr, arguments);
  }

  xhr.send = function () {
    _body = arguments[0];
    _send.apply(xhr, arguments);
  }

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4) {
      var _time = new Date() - _start;
      if (xhr.status != 200) {
        $ryou.err({
          time: _time,
          url: xhr.responseURL,
          responseText: xhr.responseText,
          status: xhr.status,
          method: _method,
          body: _body
        })
      } else {
        $ryou.log({
          time: _time,
          url: xhr.responseURL,
          responseText: xhr.responseText,
          status: xhr.status,
          method: _method,
          body: _body
        })
      }
    }
    return true;
  }, true);
  return xhr;
}

var x = new XMLHttpRequest();

x.open('get', '/log?1=1');

x.send();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
