!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 258));
})({
  258: function (e, t, n) {
    var r = n(47),
      o = "windows -saved",
      i = "window -open",
      a = null;
    function u() {
      var e = document.querySelector("#container"),
        t = document.querySelector("#scrolling-container"),
        n = document.querySelector("#button-cancel"),
        u = document.querySelector("#button-open");
      return (
        (e.style.height = window.innerHeight - 65 + "px"),
        (t.style.height = window.innerHeight - 65 - 30 + "px"),
        (e.style.width = window.innerWidth - 45 + "px"),
        window.addEventListener("resize", function (n) {
          (e.style.height = window.innerHeight - 65 + "px"),
            (t.style.height = window.innerHeight - 65 - 30 + "px"),
            (e.style.width = window.innerWidth - 45 + "px");
        }),
        n.addEventListener("click", function (e) {
          return window.close();
        }),
        u.addEventListener("click", function (e) {
          var t = a;
          t &&
            chrome.runtime.sendMessage(
              { command: i, data: { ids: [t] } },
              function () {
                return window.close();
              }
            );
        }),
        (function (e) {
          return ((t = { command: o, data: { filterActive: !0 } }),
          new Promise(function (e, n) {
            return chrome.runtime.sendMessage(t, e);
          }))
            .then(function (e) {
              return e
                ? e
                    .map(function (e) {
                      return e || null;
                    })
                    .filter(function (e) {
                      return e;
                    })
                : null;
            })
            .then(function (t) {
              return t
                ? (function (e) {
                    return new Promise(function (t, n) {
                      return (function (e, t) {
                        console.log("response", e);
                        var n = document.querySelector("#main-table tbody"),
                          o = document.querySelector("#table-template"),
                          i = o.content.querySelector(".table-row"),
                          a = o.content.querySelector(".table-item-text"),
                          u = o.content.querySelector(".table-item-date"),
                          d = {};
                        e.forEach(function (e, t) {
                          i.setAttribute("tabindex", 0),
                            i.setAttribute("data-key", e.id),
                            (a.textContent = e.title),
                            (u.textContent = r(e.lastModified, "fullDate")),
                            (d = document.importNode(o.content, !0)),
                            n.appendChild(d);
                        }),
                          t();
                      })(e, t);
                    });
                  })(t).then(function () {
                    return (function (e) {
                      var t = document.querySelector("#main-table"),
                        n = null;
                      (e.disabled = !0),
                        t.addEventListener("click", function (t) {
                          var r,
                            o = (function e(t, n) {
                              if (!t.parentNode) return null;
                              if (t.hasAttribute(n)) return t;
                              return e(t.parentNode, n);
                            })(t.target, "data-key");
                          o && (e.disabled = !0),
                            (n = document.querySelector(".selected")) &&
                              n.classList.toggle("selected"),
                            o.classList.toggle("selected"),
                            o,
                            o.focus(),
                            (r = o.dataset.key),
                            (a = r),
                            (e.disabled = !1);
                        });
                    })(e);
                  })
                : null;
            });
          var t;
        })(u)
      );
    }
    document.addEventListener("DOMContentLoaded", function (e) {
      return u();
    });
  },
  47: function (e, t, n) {
    var r;
    !(function (o) {
      "use strict";
      var i,
        a,
        u,
        d =
          ((i =
            /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g),
          (a =
            /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g),
          (u = /[^-+\dA-Z]/g),
          function (e, t, n, r) {
            if (
              (1 !== arguments.length ||
                "string" !==
                  (null === (o = e)
                    ? "null"
                    : void 0 === o
                    ? "undefined"
                    : "object" != typeof o
                    ? typeof o
                    : Array.isArray(o)
                    ? "array"
                    : {}.toString.call(o).slice(8, -1).toLowerCase()) ||
                /\d/.test(e) ||
                ((t = e), (e = void 0)),
              (e = e || new Date()) instanceof Date || (e = new Date(e)),
              isNaN(e))
            )
              throw TypeError("Invalid date");
            var o,
              s = (t = String(d.masks[t] || t || d.masks.default)).slice(0, 4);
            ("UTC:" !== s && "GMT:" !== s) ||
              ((t = t.slice(4)), (n = !0), "GMT:" === s && (r = !0));
            var c = n ? "getUTC" : "get",
              y = e[c + "Date"](),
              m = e[c + "Day"](),
              f = e[c + "Month"](),
              g = e[c + "FullYear"](),
              h = e[c + "Hours"](),
              M = e[c + "Minutes"](),
              p = e[c + "Seconds"](),
              b = e[c + "Milliseconds"](),
              T = n ? 0 : e.getTimezoneOffset(),
              v = (function (e) {
                var t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
                t.setDate(t.getDate() - ((t.getDay() + 6) % 7) + 3);
                var n = new Date(t.getFullYear(), 0, 4);
                n.setDate(n.getDate() - ((n.getDay() + 6) % 7) + 3);
                var r = t.getTimezoneOffset() - n.getTimezoneOffset();
                t.setHours(t.getHours() - r);
                var o = (t - n) / 6048e5;
                return 1 + Math.floor(o);
              })(e),
              w = (function (e) {
                var t = e.getDay();
                return 0 === t && (t = 7), t;
              })(e),
              S = {
                d: y,
                dd: l(y),
                ddd: d.i18n.dayNames[m],
                dddd: d.i18n.dayNames[m + 7],
                m: f + 1,
                mm: l(f + 1),
                mmm: d.i18n.monthNames[f],
                mmmm: d.i18n.monthNames[f + 12],
                yy: String(g).slice(2),
                yyyy: g,
                h: h % 12 || 12,
                hh: l(h % 12 || 12),
                H: h,
                HH: l(h),
                M: M,
                MM: l(M),
                s: p,
                ss: l(p),
                l: l(b, 3),
                L: l(Math.round(b / 10)),
                t: h < 12 ? "a" : "p",
                tt: h < 12 ? "am" : "pm",
                T: h < 12 ? "A" : "P",
                TT: h < 12 ? "AM" : "PM",
                Z: r
                  ? "GMT"
                  : n
                  ? "UTC"
                  : (String(e).match(a) || [""]).pop().replace(u, ""),
                o:
                  (T > 0 ? "-" : "+") +
                  l(100 * Math.floor(Math.abs(T) / 60) + (Math.abs(T) % 60), 4),
                S: ["th", "st", "nd", "rd"][
                  y % 10 > 3 ? 0 : (((y % 100) - (y % 10) != 10) * y) % 10
                ],
                W: v,
                N: w,
              };
            return t.replace(i, function (e) {
              return e in S ? S[e] : e.slice(1, e.length - 1);
            });
          });
      function l(e, t) {
        for (e = String(e), t = t || 2; e.length < t; ) e = "0" + e;
        return e;
      }
      (d.masks = {
        default: "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
        expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z",
      }),
        (d.i18n = {
          dayNames: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          monthNames: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        }),
        void 0 ===
          (r = function () {
            return d;
          }.call(t, n, t, e)) || (e.exports = r);
    })();
  },
});
