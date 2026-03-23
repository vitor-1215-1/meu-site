self.console = {
  log: function() {
    var a = Array.prototype.slice.call(arguments);
    self.postMessage({ type: 'log', data: a.map(function(x) {
      return typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x);
    }).join(' ') });
  },
  error: function() {
    var a = Array.prototype.slice.call(arguments);
    self.postMessage({ type: 'error', data: a.map(String).join(' ') });
  },
  warn: function() {
    var a = Array.prototype.slice.call(arguments);
    self.postMessage({ type: 'warn', data: a.map(String).join(' ') });
  },
  info: function() {
    var a = Array.prototype.slice.call(arguments);
    self.postMessage({ type: 'log', data: a.map(function(x) {
      return typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x);
    }).join(' ') });
  }
};

self.onmessage = function(ev) {
  if (!ev.data || ev.data.type !== 'run') return;
  try {
    eval(ev.data.code);
    self.postMessage({ type: 'done' });
  } catch(e) {
    self.postMessage({ type: 'error', data: e.stack || e.message || String(e) });
    self.postMessage({ type: 'done' });
  }
};
