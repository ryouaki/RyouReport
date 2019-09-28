(function (global) {
  var RyouReport = global.$ryou = {};

  var __report_host_ = '/log';
  var __app_key_ = 'Ryou Report';
  var __usid_ = '';
  var __history_key_url_ = 'ryou-pre-url';
  var __history_key_date_ = 'ryou-pre-date';
  var __uuid_ = _guid(); 

  function _reportHistory() {
    var now = new Date().getTime();
    var url = sessionStorage.getItem(__history_key_url_);
    var date = sessionStorage.getItem(__history_key_date_);
    var hasQuery = location.href.indexOf('?');
    var currentUrl = hasQuery > 0 ? location.href.substr(0, hasQuery) : location.href;
    
    if (!url || !date || url != currentUrl) {
      sessionStorage.setItem(__history_key_url_, currentUrl);
      sessionStorage.setItem(__history_key_date_, now);
    } 
    
    if (url != currentUrl) {
      _sendGet('navigation', {
        from: url == null ? '' : url,
        to: currentUrl,
        newTime: now,
        lastTime: date == null ? now : date
      })
    }
  }

  function autoReportHistory() {
    global.addEventListener("hashchange", _reportHistory);
    global.addEventListener("popstate", _reportHistory);
    if (history) {
      var _pushState = history.pushState;
      var _replaceState = history.replaceState;
      history.pushState = function () {
        _pushState.apply(this, arguments);
        _reportHistory();
      }
      history.replaceState = function () {
        _replaceState.apply(this, arguments);
        _reportHistory();
      }
    }
  }

  function init(key, host) {
    __report_host_ = host || '/log';
    __app_key_ = key || 'Ryou-Report';
    _reportHistory();
    perf();
  }

  function login(userid) {
    __usid_ = userid;
  }

  function _guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function _formatData(log) {
    var data = log;
    if (typeof data !== 'string') {
      data = JSON.stringify(log);
    }
    return {
      uuid: __uuid_,
      usid: __usid_,
      log: encodeURIComponent(data),
      app: __app_key_,
      rect: window.innerHeight + '*' + window.innerWidth,
      url: encodeURIComponent(location.href),
      rfr: encodeURIComponent(document.referrer)
    }
  }

  function _toQuery(log) {
    var retStr = '';
    var keys = Object.keys(log);
    var len = keys.length;

    for ( var i = 0; i < len; i++) {
      retStr += keys[i] + '=' + log[keys[i]] + '&';
    }

    return retStr + 'rt=' + new Date().getTime();
  }

  function _sendGet(type, data) {
    var log = _toQuery(_formatData(data));
    var img = document.createElement('img');
    img.src = __report_host_ + '?type=' + type + '&' +log;
    img.onload = img.onerror = function () {
      img.onload = null,
      img.onerror = null
    };
  }

  function _sendPost(type, data) {
    var payload = _formatData(data);
    payload.type = type;
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('post', __report_host_);
    ajaxObj.setRequestHeader("Content-type", "application/json");
    ajaxObj.send(JSON.stringify(payload));
    ajaxObj.onreadystatechange = function () {
      if (ajaxObj.readyState == 4 && ajaxObj.status != 200) {
        console.error(ajaxObj.responseText);
      }
    };
  }

  function _getPerformanceInfo() {
    var timing = performance.timing || {
      loadEventEnd: 0,
      navigationStart: 0,
      domComplete: 0,
      responseEnd: 0,
      domainLookupEnd: 0,
      domainLookupStart: 0,
      responseStart: 0,
      requestStart: 0,
      loadEventStart: 0,
      fetchStart: 0,
      connectEnd: 0,
      connectStart: 0
    };
  
    return {
      loadPage: timing.loadEventEnd - timing.navigationStart, 
      beforeLoad: timing.loadEventStart - timing.navigationStart, 
      domReady: timing.domComplete - timing.responseEnd, 
      lookupDomain: timing.domainLookupEnd - timing.domainLookupStart, 
      ttfb: timing.responseStart - timing.navigationStart, 
      request: timing.responseEnd - timing.requestStart, 
      loadEvent: timing.loadEventEnd - timing.loadEventStart,
      appcache: timing.domainLookupStart - timing.fetchStart,
      connect: timing.connectEnd - timing.connectStart
    };
  }

  function _getXPath(element) {
    if (element.id && element.id.length > 0) { 
      return `//*[@id="${element.id}"]`
    }
    
    if (element === document.body) {
      return '/html/' + element.tagName.toLowerCase()
    }
  
    if (element.parentNode) {
      var siblings = element.parentNode.childNodes 
      siblings = Array.from(siblings).filter((sibling) => {
        return sibling.tagName === element.tagName
      })
      var len = siblings.length
    
      if (len === 1) {
        return _getXPath(element.parentNode) + '/' + element.tagName.toLowerCase()
      } else if (len > 1) {
        var ix = 1
        for (var i = 0; i < len; i++) {
          var sibling = siblings[i]
          if (sibling === element) {
            return _getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']'
          } else if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
            ix++
          }
        }
      }
    } else {
      return '';
    }
  }

  function autoEventReport(events) {
    var registryEvents = events || [];
    function eventReport(event) {
      var xpath = _getXPath(event.target);
      _sendGet('event', {
        event: event.type,
        value: xpath
      })
    }
    registryEvents.forEach((event) => {
      global.addEventListener(event, eventReport, false);
    })
  }

  function perf() {
    global.addEventListener('load', function () {
      setTimeout(function timeout() {
        _sendGet('perf', _getPerformanceInfo());
      })
    }, false);
  }

  function err(error) {
    _sendPost('error', error)
  }

  function event(event, value) {
    _sendGet('event', {
      event: event,
      value: value
    })
  }

  function log(msg) {
    _sendGet('log', msg || '');
  }

  RyouReport.init = init;
  RyouReport.log = log;
  RyouReport.event = event;
  RyouReport.err = err;
  RyouReport.autoEventReport = autoEventReport;
  RyouReport.autoReportHistory = autoReportHistory;
  RyouReport.login = login;

  RyouReport.version = '1.0.0';
}(window));
