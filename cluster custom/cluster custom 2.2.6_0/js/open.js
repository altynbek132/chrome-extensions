!(function (e) {
  var r = {};
  function n(t) {
    if (r[t]) return r[t].exports;
    var o = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = r),
    (n.d = function (e, r, t) {
      n.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, r) {
      if ((1 & r && (e = n(e)), 8 & r)) return e;
      if (4 & r && "object" == typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (n.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: e }),
        2 & r && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            t,
            o,
            function (r) {
              return e[r];
            }.bind(null, o)
          );
      return t;
    }),
    (n.n = function (e) {
      var r =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(r, "a", r), r;
    }),
    (n.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }),
    (n.p = ""),
    n((n.s = 261));
})({
  261: function (e, r) {
    document.addEventListener("DOMContentLoaded", (e) => {
      var r = new URL(document.location);
      r.searchParams.has("id") &&
        (function (e) {
          return new Promise((r, n) =>
            chrome.runtime.sendMessage(e, (e) =>
              chrome.runtime.lastError ? n(chrome.runtime.lastError) : r(e)
            )
          );
        })({
          command: "window -open",
          data: { ids: [r.searchParams.get("id")] },
        }).catch((e) => window.close()),
        window.close();
    });
  },
});
