!(function (e) {
  var n = {};
  function t(o) {
    if (n[o]) return n[o].exports;
    var r = (n[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
  }
  (t.m = e),
    (t.c = n),
    (t.d = function (e, n, o) {
      t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
    }),
    (t.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (t.t = function (e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e;
      if (4 & n && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (t.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: e }),
        2 & n && "string" != typeof e)
      )
        for (var r in e)
          t.d(
            o,
            r,
            function (n) {
              return e[n];
            }.bind(null, r)
          );
      return o;
    }),
    (t.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(n, "a", n), n;
    }),
    (t.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.p = ""),
    t((t.s = 260));
})({
  260: function (e, n) {
    !(function () {
      function e() {
        const e = new URLSearchParams(document.location.search),
          t = window.decodeURIComponent(e.get("uri")),
          o = window.decodeURIComponent(e.get("t"));
        o &&
          (function (e) {
            e && (document.title = e);
            document.title;
          })(o),
          t &&
            ((function (e) {
              let t = document.createElement("link");
              (t.href = n(e)),
                (t.rel = "shortcut icon"),
                document.head.appendChild(t);
            })(t),
            (function (e) {
              let t = document.querySelector("#tab-icon");
              t.style.backgroundImage = `url("${n(e)}")`;
            })(t),
            (function (e) {
              let n = document.querySelector("#tab-url");
              n && e && (n.innerText = e);
            })(t)),
          window.addEventListener(
            "click",
            function (e) {
              return (function (e) {
                return window.location.replace(e);
              })(t);
            },
            !1
          );
      }
      function n(e) {
        return "chrome://favicon/size/16@2x/" + e;
      }
      document.addEventListener("DOMContentLoaded", function (n) {
        e();
      });
    })();
  },
});
