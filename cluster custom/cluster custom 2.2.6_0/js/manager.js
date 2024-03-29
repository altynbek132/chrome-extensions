!(function (e) {
  var t = {};
  function n(s) {
    if (t[s]) return t[s].exports;
    var i = (t[s] = { i: s, l: !1, exports: {} });
    return e[s].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, s) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
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
      var s = Object.create(null);
      if (
        (n.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            s,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return s;
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
    n((n.s = 198));
})([
  ,
  ,
  ,
  ,
  function (e, t) {
    e.exports = class PanelButton extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        this.loadEventListeners();
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented.");
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      get icon() {
        return this.querySelector(".icon");
      }
    };
  },
  ,
  ,
  ,
  ,
  ,
  function (e, t) {
    e.exports = {
      range: function (e, t) {
        return new Array(t - e).fill().map((t, n) => n + e);
      },
      getParentElementByAttribute: function e(t, n) {
        if (!t.parentNode) return null;
        if (t.hasAttribute(n)) return t;
        return e(t.parentNode, n);
      },
      clearElement: function (e) {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
        return !0;
      },
      getParentByClass: function e(t, n) {
        if (!t.parentNode) return null;
        if (t.classList.contains(n)) return t;
        return e(t.parentNode, n);
      },
      readFile: function (e) {
        return new Promise((t, n) => {
          const s = new FileReader();
          s.addEventListener("load", (e) =>
            e.target.result
              ? t(e.target.result)
              : n(new Error("Failed to read input file"))
          ),
            s.addEventListener("error", (e) =>
              n(new Error("Failed to read input file"))
            ),
            s.readAsText(e);
        });
      },
      validFileType: function (e, t) {
        return t.some((t) => e.type === t);
      },
    };
  },
  ,
  ,
  ,
  ,
  ,
  function (e, t) {
    e.exports = function (e) {
      var t = Array.prototype.slice.call(arguments).slice(1);
      return new Promise(function (n, s) {
        e.apply(
          null,
          t.concat(function (e) {
            return chrome.runtime.lastError
              ? s(new Error(chrome.runtime.lastError.message))
              : n(e);
          })
        );
      });
    };
  },
  ,
  ,
  ,
  ,
  function (e, t, n) {
    var s = n(16);
    e.exports = r;
    var i = r.prototype;
    function r() {}
    (i.get = function (e) {
      return s(chrome.tabs.get, e);
    }),
      (i.setActive = function (e) {
        return s(chrome.tabs.update, e, { active: !0, highlighted: !0 });
      }),
      (i.getCurrent = function () {
        return s(chrome.tabs.getCurrent);
      }),
      (i.getFocused = function () {
        return s(chrome.tabs.query, { active: !0, currentWindow: !0 });
      }),
      (i.remove = function (e) {
        return s(chrome.tabs.remove, e);
      }),
      (i.create = function (e, t, n, i) {
        return s(chrome.tabs.create, {
          url: e,
          windowId: t,
          pinned: i,
          selected: n,
        });
      }),
      (i.getAllInWindow = function (e) {
        return s(chrome.tabs.query, { windowId: e });
      }),
      (i.move = function (e, t, n) {
        return (
          "number" != typeof n &&
            (console.warn("Move tab index is not a integer"), (n = -1)),
          s(chrome.tabs.move, e, { windowId: t, index: n })
        );
      }),
      (i.discard = function (e) {
        return s(chrome.tabs.discard, e);
      }),
      (i.executeScript = function (e, t) {
        return s(chrome.tabs.executeScript, e, t);
      }),
      (i.update = function (e, t) {
        return s(chrome.tabs.update, e, t);
      });
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t) {
    e.exports = class DropdownButton extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        return (
          this.addEventListener("click", (e) => {
            if (!this.disabled) return this.toggleDropdown();
          }),
          window.addEventListener("click", (e) => {
            if (this.isActive() && !this.contains(e.target))
              return this.toggleDropdown();
          }),
          this.loadEventListeners()
        );
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      get content() {
        return this.querySelector(".dropdown-content");
      }
      set selected(e) {
        var t = this.content.querySelector("[selected]");
        if (t && t.id === e) return !1;
        t && t.removeAttribute("selected"),
          Array.from(this.content.children).some((t) => {
            if (t.id === e) return t.setAttribute("selected", ""), !0;
          });
      }
      get selected() {
        var e = this.content.querySelector("[selected]");
        return e ? e.id : null;
      }
      setContent(e, t) {
        for (var n = this.content; n.hasChildNodes(); )
          n.removeChild(n.lastChild);
        return this._renderContent(e, t);
      }
      _renderContent(e, t) {
        throw new Error("Abstract method not implemented.");
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented.");
      }
      isActive() {
        return this.content.classList.contains("dropdown-show");
      }
      toggleDropdown() {
        return (
          this.isActive() ||
            this.dispatchEvent(
              new CustomEvent("loadDropdown", { bubbles: !0 })
            ),
          this.content.classList.toggle("dropdown-show")
        );
      }
    };
  },
  ,
  function (e, t, n) {
    var s = n(16);
    e.exports = r;
    var i = r.prototype;
    function r() {}
    (i.get = function (e, t = !0) {
      return s(chrome.windows.get, e, { populate: t });
    }),
      (i.getAll = function (e = !0) {
        return s(chrome.windows.getAll, {
          populate: e,
          windowTypes: ["normal"],
        });
      }),
      (i.getCurrent = function () {
        return s(chrome.windows.getCurrent, { populate: !0 });
      }),
      (i.setFocus = function (e) {
        return s(chrome.windows.update, e, { focused: !0 });
      }),
      (i.remove = function (e) {
        return s(chrome.windows.remove, e);
      }),
      (i.create = function (e = null, t = null, n = !1) {
        return s(
          chrome.windows.create,
          e ? { url: e, focused: n } : { focused: n, tabId: t }
        );
      }),
      (i.createPopupWindow = function (e, t, n, i, r) {
        return s(chrome.windows.create, {
          url: e,
          left: t,
          top: n,
          width: i,
          height: r,
          type: "popup",
        });
      });
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t) {
    var n = {
      sendMuteActiveTab: (e) =>
        s({ command: "window -active-tabs -mute", data: e }),
      sendUnmuteActiveTab: (e) =>
        s({ command: "window -active-tabs -unmute", data: e }),
      sendUpdateActiveWindow: (e) =>
        s({
          command: "window -active -update",
          data: { winId: e.winId, title: e.title },
        }),
      sendQuickSort: (e) =>
        s({
          command: "window -active -sort",
          data: { winId: e.winId, property: "hostname" },
        }),
      sendRemoveDuplicates: (e) =>
        s({
          command: "window -active -remove-duplicates",
          data: { winId: e.winId },
        }),
      sendUpdateSavedWindow: (e) =>
        s({
          command: "window -saved -update",
          data: { winId: e.winId, title: e.title },
        }),
      sendMergeActiveWindows: (e) =>
        s({
          command: "windows -active -merge",
          data: { selected: e.selected.map((e) => Number(e)) },
        }),
      sendMergeSavedWindows: (e) =>
        s({ command: "windows -saved -merge", data: { selected: e.selected } }),
      sendErrorAlert: (e) =>
        s({ command: "manager -alert -error", data: { message: e.message } }),
      sendImportWindows: (e) =>
        s({ command: "windows -saved -import", data: { file: e.file } }),
      sendExportSavedWindow: (e) =>
        s({
          command: "window -saved -export",
          data: { export: e.export, winId: e.winId },
        }),
      sendExportSavedWindows: (e) =>
        s({ command: "windows -saved -export", data: { export: e.export } }),
      sendExportActiveWindow: (e) =>
        s({
          command: "window -active -export",
          data: { export: e.export, winId: e.winId, title: e.title },
        }),
      sendExportActiveWindows: (e) =>
        s({ command: "windows -active -export", data: { export: e.export } }),
      sendSignOut: (e) => s({ command: "auth -signout", data: {} }),
      sendSignIn: (e) => s({ command: "auth -signin", data: {} }),
      sendUnsuspendTabs: (e) =>
        s({
          command: "window -active-tabs -unsuspend",
          data: { tabIds: e.tabIds },
        }),
      sendSuspendTabs: (e) =>
        s({
          command: "window -active-tabs -suspend",
          data: { tabIds: e.tabIds },
        }),
      sendRemoveSavedWindow: (e) =>
        s({ command: "windows -saved -remove", data: { winId: e.winId } }),
      sendCreateSavedWindow: (e) =>
        s({ command: "windows -saved -create", data: { win: e.win } }),
      sendMoveSavedTabs: (e) =>
        s({
          command: "window -saved-tabs -move",
          data: {
            winId: e.winId,
            targetWinId: e.targetWinId,
            tabIds: e.tabIds,
          },
        }),
      sendMoveSavedTab: (e) =>
        s({
          command: "window -saved-tab -move",
          data: {
            winId: e.winId,
            targetWinId: e.targetWinId,
            tabId: e.tabId,
            index: Number(e.toIndex),
          },
        }),
      sendRemoveSavedTabs: (e) =>
        s({
          command: "window -saved-tabs -remove",
          data: { winId: e.winId, tabIds: e.tabIds },
        }),
      sendCreateSavedTabs: (e) =>
        s({
          command: "window -saved-tabs -create",
          data: { winId: e.winId, tabs: e.tabs },
        }),
      sendRemoveTabs: (e) =>
        s({
          command: "window -active-tabs -remove",
          data: { tabIds: e.tabIds },
        }),
      sendCreateTabs: (e) =>
        s({
          command: "window -active-tabs -create",
          data: { winId: e.winId, urls: e.urls },
        }),
      sendMoveTabs: (e) =>
        s({
          command: "window -active-tabs -move",
          data: {
            tabIds: e.tabIds,
            targetWinId: e.targetWinId,
            index: Number(e.toIndex),
            focused: e.focused,
          },
        }),
      sendRemoveWindow: (e) =>
        s({
          command: "windows -active -remove",
          data: { winId: Number(e.winId) },
        }),
      sendCreateWindow: (e) =>
        s({ command: "windows -active -new", data: { urls: e.tabUrls } }),
      sendGetSettings: () => s({ command: "extension -get-settings" }),
      sendUpdateSettings: (e) =>
        s({ command: "extension -update-settings", data: { options: e } }),
      sendGetActiveWindows: (e) =>
        s({
          command: "windows -active",
          data: { currentWinId: e.currentWinId || null },
        }),
      sendGetActiveWindow: (e) =>
        s({ command: "window -active", data: { winId: Number(e) } }),
      sendGetCurrentWindow: () =>
        new Promise(function (e, t) {
          chrome.tabs.query({ active: !0, currentWindow: !0 }, function (t) {
            return t.length > 0 ? e(t[0].windowId) : e(null);
          });
        }),
      sendSaveWindow: (e) =>
        s({
          command: "window -save",
          data: {
            activeWinId: e.winId,
            savedWinId: e.targetId,
            closeOnSave: e.closeOnSave,
          },
        }),
      sendSaveNewWindow: (e) =>
        s({
          command: "window -save-new",
          data: {
            winId: Number(e.winId),
            title: e.title,
            closeOnSave: e.closeOnSave,
          },
        }),
      sendGetSavedWindow: (e) =>
        s({ command: "window -saved", data: { winId: e.winId } }),
      sendGetSavedWindows: () => s({ command: "windows -saved", data: {} }),
    };
    function s(e) {
      return new Promise((t, n) =>
        chrome.runtime.sendMessage(
          e,
          (e) => (
            chrome.runtime.lastError &&
              console.warn(chrome.runtime.lastError.message),
            t(e)
          )
        )
      );
    }
    e.exports = n;
  },
  function (e, t, n) {
    var s;
    !(function (i) {
      "use strict";
      var r,
        a,
        o,
        d =
          ((r =
            /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g),
          (a =
            /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g),
          (o = /[^-+\dA-Z]/g),
          function (e, t, n, s) {
            if (
              (1 !== arguments.length ||
                "string" !==
                  (null === (i = e)
                    ? "null"
                    : void 0 === i
                    ? "undefined"
                    : "object" != typeof i
                    ? typeof i
                    : Array.isArray(i)
                    ? "array"
                    : {}.toString.call(i).slice(8, -1).toLowerCase()) ||
                /\d/.test(e) ||
                ((t = e), (e = void 0)),
              (e = e || new Date()) instanceof Date || (e = new Date(e)),
              isNaN(e))
            )
              throw TypeError("Invalid date");
            var i,
              l = (t = String(d.masks[t] || t || d.masks.default)).slice(0, 4);
            ("UTC:" !== l && "GMT:" !== l) ||
              ((t = t.slice(4)), (n = !0), "GMT:" === l && (s = !0));
            var h = n ? "getUTC" : "get",
              u = e[h + "Date"](),
              m = e[h + "Day"](),
              v = e[h + "Month"](),
              b = e[h + "FullYear"](),
              p = e[h + "Hours"](),
              w = e[h + "Minutes"](),
              g = e[h + "Seconds"](),
              f = e[h + "Milliseconds"](),
              E = n ? 0 : e.getTimezoneOffset(),
              y = (function (e) {
                var t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
                t.setDate(t.getDate() - ((t.getDay() + 6) % 7) + 3);
                var n = new Date(t.getFullYear(), 0, 4);
                n.setDate(n.getDate() - ((n.getDay() + 6) % 7) + 3);
                var s = t.getTimezoneOffset() - n.getTimezoneOffset();
                t.setHours(t.getHours() - s);
                var i = (t - n) / 6048e5;
                return 1 + Math.floor(i);
              })(e),
              L = (function (e) {
                var t = e.getDay();
                return 0 === t && (t = 7), t;
              })(e),
              C = {
                d: u,
                dd: c(u),
                ddd: d.i18n.dayNames[m],
                dddd: d.i18n.dayNames[m + 7],
                m: v + 1,
                mm: c(v + 1),
                mmm: d.i18n.monthNames[v],
                mmmm: d.i18n.monthNames[v + 12],
                yy: String(b).slice(2),
                yyyy: b,
                h: p % 12 || 12,
                hh: c(p % 12 || 12),
                H: p,
                HH: c(p),
                M: w,
                MM: c(w),
                s: g,
                ss: c(g),
                l: c(f, 3),
                L: c(Math.round(f / 10)),
                t: p < 12 ? "a" : "p",
                tt: p < 12 ? "am" : "pm",
                T: p < 12 ? "A" : "P",
                TT: p < 12 ? "AM" : "PM",
                Z: s
                  ? "GMT"
                  : n
                  ? "UTC"
                  : (String(e).match(a) || [""]).pop().replace(o, ""),
                o:
                  (E > 0 ? "-" : "+") +
                  c(100 * Math.floor(Math.abs(E) / 60) + (Math.abs(E) % 60), 4),
                S: ["th", "st", "nd", "rd"][
                  u % 10 > 3 ? 0 : (((u % 100) - (u % 10) != 10) * u) % 10
                ],
                W: y,
                N: L,
              };
            return t.replace(r, function (e) {
              return e in C ? C[e] : e.slice(1, e.length - 1);
            });
          });
      function c(e, t) {
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
          (s = function () {
            return d;
          }.call(t, n, t, e)) || (e.exports = s);
    })();
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t, n) {
    var s = n(16);
    function i() {}
    (e.exports = i),
      (i.prototype.sendMessage = function (e) {
        return s(chrome.runtime.sendMessage, e);
      });
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t, n) {
    var s = n(10);
    n(204);
    e.exports = class AbstractListBox extends HTMLElement {
      constructor(e) {
        super(),
          (this._loadData = e || !1),
          (this.filter = ""),
          (this.className = "listbox");
      }
      get factory() {
        throw new Error("Abstract method not implemeneted");
      }
      set sortTabsMethod(e) {
        this.setAttribute("sort-tabs", String(e));
      }
      get sortTabsMethod() {
        return Number(this.getAttribute("sort-tabs"));
      }
      set sortMethod(e) {
        this.setAttribute("sort", String(e));
      }
      get sortMethod() {
        return this.getAttribute("sort");
      }
      set collapsed(e) {
        this.setAttribute("collapsed", String(e));
      }
      get collapsed() {
        return this.getAttribute("collapsed");
      }
      get count() {
        return this.children.length;
      }
      get checked() {
        return this.getArray().find((e) => e.isChecked());
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      set filter(e) {
        this.setAttribute("filter", e);
      }
      get filter() {
        return this.getAttribute("filter");
      }
      static get observedAttributes() {
        return ["sort-tabs", "collapsed", "filter"];
      }
      attributeChangedCallback(e, t, n) {
        switch (e) {
          case "sort-tabs":
            return this.getArray().forEach((e) => {
              e.sort = n;
            });
          case "collapsed":
            return this.getArray().forEach((e) => {
              e.collapsed = "true" == n;
            });
          case "filter":
            return this.getArray().forEach((e) => {
              e.filter = n;
            });
        }
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.addEventListener("winCheckedChange", (e) => {
            if (e.detail.checked)
              return this.getArray().forEach((t) => {
                t.id !== e.detail.winId && t.clearSelected();
              });
          }),
          this.loadEventListeners();
      }
      _init(e) {
        return this.clear(), this.addArray(e), this;
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemeneted");
      }
      clearSelected() {
        return !!this.checked && this.checked.clearSelected();
      }
      hide() {
        this.setAttribute("hidden", "");
      }
      show() {
        this.removeAttribute("hidden");
      }
      hideWindows() {
        return this.getArray().map((e) => e.hide());
      }
      showWindows(e) {
        var t = this.getArray();
        return e
          ? t.map((t) => {
              if (e.indexOf(String(t.id)) > -1) return t.show();
            })
          : this.getArray().map((e) => e.show());
      }
      get(e) {
        return this.querySelector(`[id='${e}']`);
      }
      add(e) {
        e.title = this.createWindowTitle(e, this.count);
        var t = this.appendChild(
          this.factory.create("window", e, this.sortTabsMethod)
        );
        this.setWindowStatus(e, t);
      }
      addArray(e) {
        var t = document.createDocumentFragment();
        e.forEach((e) => {
          (e.title = this.createWindowTitle(e, t.children.length)),
            t.appendChild(
              this.factory.create("window", e, this.sortTabsMethod)
            );
        }),
          this.appendChild(t),
          this.getArray().forEach((t) => {
            this.setWindowStatus(
              e.find((e) => e.id === t.id),
              t
            );
          }),
          (t = null);
      }
      getArray() {
        return Array.prototype.slice.call(this.children);
      }
      getByIndex(e) {
        if (e < 0) throw new Error("Trying to access negative index");
        return this.getArray()[e];
      }
      indexOf(e) {
        return this.getArray()
          .map((e) => e.id)
          .indexOf(e);
      }
      clear() {
        return s.clearElement(this);
      }
      createWindowTitle(e, t) {
        throw new Error("Abstract function not implemeneted.");
      }
      setWindowStatus(e, t) {
        throw new Error("Abstract function not implemeneted.");
      }
    };
  },
  function (e, t, n) {
    var s = n(205),
      i = n(206),
      r = n(207),
      a = n(208),
      o = n(209),
      d = n(210),
      c = n(212),
      l = n(214),
      h = n(216),
      u = n(217),
      m = n(218),
      v = n(219);
    function b() {
      return (
        (this.getName = function (e) {
          switch (e) {
            case "header":
              return "saved-header";
            case "tabs":
              return "saved-tabs";
            case "tab":
              return "saved-tab";
            default:
              throw new Error("Invalid factory type input.");
          }
        }),
        (this.create = function (e, t) {
          var n = null;
          switch (e) {
            case "header":
              return (n = new s().construct("savedheader")), new h(n, t);
            case "tabs":
              return (
                (n = {
                  tabs: new s().construct("savedtabs"),
                  tab: new s().construct("savedtab"),
                }),
                new v(n, t)
              );
            case "tab":
              return (n = new s().construct("savedtab")), new m(s, t);
            default:
              throw new Error("Invalid factory type input.");
          }
        }),
        this
      );
    }
    function p() {
      return (
        (this.getName = function (e) {
          switch (e) {
            case "header":
              return "active-header";
            case "tabs":
              return "active-tabs";
            case "tab":
              return "active-tab";
            case "hostnames":
              return "active-hostnames";
            default:
              throw new Error("Invalid factory type input.");
          }
        }),
        (this.create = function (e, t, n) {
          var r = null;
          switch (e) {
            case "header":
              return (r = new s().construct("activeheader")), new i(r, t);
            case "tabs":
              return (
                (r = {
                  tabs: new s().construct("activetabs"),
                  tab: new s().construct("activetab"),
                }),
                new o(r, t, n)
              );
            case "tab":
              return (r = new s().construct("activetab")), new a(s, t);
            case "hostnames":
              return new d(new w(), t, n);
            default:
              throw new Error("Invalid factory type input.");
          }
        }),
        this
      );
    }
    function w() {
      (this.getName = function (e) {
        switch (e) {
          case "hostname":
            return "active-hostname";
        }
      }),
        (this.create = function (e, t, n) {
          switch (e) {
            case "hostname":
              return new c(new g(), t, n);
            default:
              throw new Error("Invalid factory type input.");
          }
        });
    }
    function g() {
      return (
        (this.getName = function (e) {
          switch (e) {
            case "header":
              return "active-hostname-header";
            case "tabs":
              return "active-tabs";
            case "tab":
              return "active-tab";
            default:
              throw new Error("Invalid factory type input.");
          }
        }),
        (this.create = function (e, t, n) {
          var i = null;
          switch (e) {
            case "header":
              return (
                (i = new s().construct("activehostnameheader")), new l(i, t)
              );
            case "tabs":
              return (
                (i = {
                  tabs: new s().construct("activetabs"),
                  tab: new s().construct("activetab"),
                }),
                new o(i, t, n)
              );
            case "tab":
              return (i = new s().construct("activetab")), new a(s, t);
            default:
              throw new Error("Invalid factory type input.");
          }
        }),
        this
      );
    }
    function f() {
      (this.getName = function (e) {
        switch (e) {
          case "window":
            return "active-win";
        }
      }),
        (this.create = function (e, t, n) {
          switch (e) {
            case "window":
              return new r(new p(), t, n);
            default:
              throw new Error("Invalid factory type input.");
          }
        });
    }
    function E() {
      (this.getName = function (e) {
        switch (e) {
          case "window":
            return "saved-win";
        }
      }),
        (this.create = function (e, t) {
          switch (e) {
            case "window":
              return new u(new b(), t, 0);
            default:
              throw new Error("Invalid factory type input.");
          }
        });
    }
    e.exports = {
      ListComponentsInjector: function (e) {
        switch (e) {
          case "active":
            return new f();
          case "saved":
            return new E();
          default:
            throw new Error("Invalid injector type input.");
        }
      },
      WinComponentsInjector: function (e) {
        switch (e) {
          case "active":
            return new p();
          case "saved":
            return new b();
          default:
            throw new Error("Invalid injector type input.");
        }
      },
    };
  },
  function (e, t) {
    var n = "fold-icon",
      s = "unfold-icon";
    e.exports = class AbstractWinHeader extends HTMLElement {
      constructor(e, t) {
        super(),
          (this.builder = e),
          (this._loadData = t || !1),
          (this.className = "header");
      }
      _init(e) {
        this.appendChild(this.builder(e));
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.addEventListener("focusin", (e) => {
            if (e.target === this.linkAnchor) return (this.focused = !0);
          }),
          this.addEventListener("focusout", (e) => {
            if (e.target === this.linkAnchor) return (this.focused = !1);
          }),
          this.addEventListener("click", (e) => {
            if (!this.disabled) {
              const t = this.querySelector(".win-checkbox");
              return (
                e.target === t || t.contains(e.target)
                  ? (this.checked = !this.checked)
                  : (this.checked = !1),
                this.dispatchEvent(
                  new CustomEvent("headerClick", {
                    detail: { checked: this.checked },
                    bubbles: !0,
                  })
                )
              );
            }
          }),
          this.collapseButton().addEventListener(
            "collapseWinButtonClicked",
            (e) =>
              this.collapseButton().querySelector(".icon").classList.contains(n)
                ? this.dispatchEvent(
                    new CustomEvent("collapseWindow", { bubbles: !0 })
                  )
                : this.dispatchEvent(
                    new CustomEvent("expandWindow", { bubbles: !0 })
                  )
          ),
          this.addEventListener("dblclick", (e) => {
            e.stopImmediatePropagation();
            for (let t = 0; t < e.path.length; t++)
              if (
                e.path[t].tagName &&
                (e.path[t].tagName.includes("BUTTON") ||
                  e.path[t].tagName.includes("MODAL"))
              )
                return null;
            const t = this.querySelector(".win-checkbox");
            if (e.target !== t && !t.contains(e.target))
              return (
                !this.collapseButton().disabled &&
                (this.collapseButton()
                  .querySelector(".icon")
                  .classList.contains(n)
                  ? this.dispatchEvent(
                      new CustomEvent("collapseWindow", { bubbles: !0 })
                    )
                  : this.dispatchEvent(
                      new CustomEvent("expandWindow", { bubbles: !0 })
                    ))
              );
          }),
          this.loadEventListeners();
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented.");
      }
      static get observedAttributes() {
        return ["checked"];
      }
      attributeChangedCallback(e, t, n) {
        if ("checked" === e)
          return (
            this.checked
              ? this.checkbox || (this.checkbox = !0)
              : this.checkbox && (this.checkbox = !1),
            this.dispatchEvent(
              new CustomEvent("headerCheckedChange", {
                detail: { checked: this.checkbox },
                bubbles: !0,
              })
            )
          );
      }
      set focused(e) {
        e ? this.setAttribute("focused", "") : this.removeAttribute("focused");
      }
      get focused() {
        return this.hasAttribute("focused");
      }
      set checked(e) {
        if (this.disabled) return !1;
        e ? this.setAttribute("checked", "") : this.removeAttribute("checked");
      }
      get checked() {
        return this.hasAttribute("checked");
      }
      get checkbox() {
        return this.querySelector(".win-checkbox").checked;
      }
      set checkbox(e) {
        var t = this.querySelector(".win-checkbox");
        return (
          (t.checked = e),
          (this.checked = e),
          t.dispatchEvent(new Event("change", { bubbles: !0 })),
          t
        );
      }
      get title() {
        return this.querySelector(".win-link a").textContent;
      }
      set title(e) {
        this.querySelector(".win-link a").textContent = e;
      }
      get link() {
        return this.querySelector(".win-link a").href;
      }
      set link(e) {
        this.querySelector(".win-link a").href =
          "chrome://windows/{winId}".replace("{winId}", e);
      }
      get icon() {
        return this.querySelector(".win-icon").style.backgroundImage;
      }
      set icon(e) {
        this.querySelector(".win-icon").style.backgroundImage =
          'url("{imageUrl}")'.replace("{imageUrl}", e);
      }
      get linkAnchor() {
        return this.querySelector(".win-link a");
      }
      get activeElement() {
        return this.querySelector(":focus");
      }
      get tabCount() {
        return this.querySelector(".tab-count");
      }
      set tabCount(e) {
        this.tabCount.textContent = `(${e})`;
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      update(e) {
        (this.title = e.title), (this.link = e.id), (this.icon = e.url);
      }
      collapseButton() {
        return this.querySelector("collapse-win-button");
      }
      toggleCollapseButton() {
        var e = this.collapseButton().querySelector(".icon");
        return e.classList.contains(n)
          ? (e.classList.remove(n), e.classList.add(s), !1)
          : e.classList.contains(s)
          ? (e.classList.remove(s), e.classList.add(n), !0)
          : void 0;
      }
    };
  },
  function (e, t, n) {
    const s = n(10);
    e.exports = class AbstractWin extends HTMLElement {
      constructor(e, t, n) {
        super(),
          (this.factory = e),
          (this._loadData = t || !1),
          (this.sort = Number(n)),
          (this.filter = ""),
          (this.className = "win");
      }
      static get observed() {
        return ["collapsed", "sort", "filter"];
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.loadHeaderEventListeners(),
          this.loadTabsEventListeners(),
          this.loadEventListeners();
      }
      attributeChangedBase(e, t, n) {
        switch (e) {
          case "collapsed":
            (t = "true" === t),
              (n = "true" === n) &&
                !t &&
                (this.header.toggleCollapseButton(), this.tabs.hide()),
              !n && t && (this.header.toggleCollapseButton(), this.tabs.show());
            break;
          case "sort":
            return this.sortTabs(t, n);
          case "filter":
            this.tabs && (this.tabs.filter = n);
            break;
          default:
            return !1;
        }
      }
      loadHeaderEventListeners() {
        this.addEventListener("focusHeader", (e) =>
          this.header.linkAnchor.focus()
        ),
          this.header.addEventListener("headerClick", (e) => {
            e.detail.checked ? this.selectAll() : this.clearSelected();
          }),
          this.header.addEventListener("headerCheckedChange", (e) =>
            this.dispatchEvent(
              new CustomEvent("winCheckedChange", {
                detail: { checked: e.detail.checked, winId: this.id },
                bubbles: !0,
              })
            )
          ),
          this.header.addEventListener("collapseWindow", (e) => {
            this.collapsed = !0;
          }),
          this.header.addEventListener("expandWindow", (e) => {
            this.collapsed = !1;
          }),
          this.header.addEventListener("keydown", (e) => {
            if (e.target === this.header.activeElement && this.header.focused)
              switch (e.key) {
                case "ArrowDown":
                  if ((e.preventDefault(), this.sort < 2)) {
                    var t = this.tabs.getByIndex(0, !0);
                    t.linkAnchor.focus(),
                      t.linkAnchor.dispatchEvent(new CustomEvent("focusin"));
                  }
                  break;
                case "ArrowRight":
                  return (
                    e.preventDefault(),
                    this.header.collapseButton().disabled
                      ? void 0
                      : (this.collapsed = !1)
                  );
                case "ArrowLeft":
                  return e.preventDefault(), (this.collapsed = !0);
                case " ":
                  return e.preventDefault(), this.toggleSelected();
              }
          });
      }
      loadTabsEventListeners() {
        this.tabs.addEventListener("tabsChanged", (e) => {
          (this.header.tabCount = this.tabs.count),
            this.tabs.visibleCount ? this.show() : this.hide();
        }),
          this.tabs.addEventListener("visibleTabsChanged", (e) =>
            e.detail.visibleCount ? this.show() : this.hide()
          ),
          this.tabs.addEventListener("removeTabs", (e) => {
            e.detail.winId = this.id;
          }),
          this.tabs.addEventListener("selectChange", (e) => {
            e.detail.selected
              ? this.header.checkbox || (this.header.checkbox = !0)
              : this.header.checkbox &&
                this.selectedTabs.length < 1 &&
                (this.header.checkbox = !1);
          }),
          this.tabs.addEventListener("updateRequest", (e) =>
            this.dispatchEvent(
              new CustomEvent("updateWinTabs", {
                detail: { winId: this.id },
                bubbles: !0,
              })
            )
          );
      }
      _init(e) {
        this.id = e.id;
        var t = this.factory.create("header", e),
          n = (function (e, t, n) {
            return t < 2
              ? { tabs: e.create("tabs", n, t), name: e.getName("tabs") }
              : {
                  tabs: e.create("hostnames", n, t),
                  name: e.getName("hostnames"),
                };
          })(this.factory, this.sort, e.tabs);
        return (
          this.appendChild(t),
          this.appendChild(n.tabs),
          (this.tabs = this.querySelector(n.name)),
          (this.header = this.querySelector(this.factory.getName("header"))),
          this
        );
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented");
      }
      set filter(e) {
        this.setAttribute("filter", e);
      }
      get filter() {
        return this.getAttribute("filter");
      }
      set sort(e) {
        this.setAttribute("sort", e);
      }
      get sort() {
        return Number(this.getAttribute("sort"));
      }
      set selected(e) {
        this.setAttribute("selected", !!e);
      }
      get selected() {
        return "true" === this.getAttribute("selected");
      }
      get selectedTabs() {
        return this.tabs.selected;
      }
      set collapsed(e) {
        this.setAttribute("collapsed", !!e);
      }
      get collapsed() {
        return "true" === this.getAttribute("collapsed");
      }
      get title() {
        return this.header.title;
      }
      set title(e) {
        this.header.title = e;
      }
      selectAll() {
        return this.tabs.clearAnchor(), this.tabs.setSelected(1);
      }
      clearSelected() {
        return this.tabs.clearAnchor(), this.tabs.setSelected(0);
      }
      isChecked() {
        return this.header.checked;
      }
      toggleSelected() {
        return this.isChecked() ? this.clearSelected() : this.selectAll();
      }
      clear() {
        return (
          (this.header.checked = !1),
          s.clearElement(this.querySelector(".tabs"))
        );
      }
      update() {
        throw new Error("Abstract method not implemented.");
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      hide() {
        if (!this.hasAttribute("hidden"))
          return this.setAttribute("hidden", "");
      }
      show() {
        if (this.hasAttribute("hidden")) return this.removeAttribute("hidden");
      }
      sortTabs(e, t) {
        throw new Error("Abstract method not implemented.");
      }
    };
  },
  function (e, t, n) {
    const s = n(10);
    e.exports = class AbstractTab extends HTMLElement {
      constructor(e, t) {
        super(),
          (this.builder = e),
          (this._loadData = t || !1),
          (this.className = "tab");
      }
      _init(e) {
        this.appendChild(this.builder(e));
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.loadEventListeners();
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented");
      }
      static get observedAttributes() {
        return ["selected"];
      }
      attributeChangedCallback(e, t, n) {
        this.disabled ||
          ("selected" === e &&
            (this.selected
              ? this.checkbox || (this.checkbox = !0)
              : this.checkbox && (this.checkbox = !1),
            this.mute ||
              this.dispatchEvent(
                new CustomEvent("selectChange", {
                  detail: { id: this.id, selected: this.selected },
                  bubbles: !0,
                })
              ),
            (this.mute = !1)));
      }
      get mute() {
        return this.hasAttribute("mute");
      }
      set mute(e) {
        e ? this.setAttribute("mute", "") : this.removeAttribute("mute");
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      get title() {
        return this.querySelector(".tab-title > a").textContent;
      }
      set title(e) {
        this.querySelector(".tab-title > a").textContent = e;
      }
      get link() {
        return this.querySelector(".tab-title > a").href;
      }
      set link(e) {
        this.querySelector(".tab-title > a").href = e;
      }
      get domain() {
        return this.querySelector(".tab-domain").textContent;
      }
      set domain(e) {
        this.querySelector(".tab-domain").textContent = e;
      }
      set anchor(e) {
        e ? this.setAttribute("anchor", "") : this.removeAttribute("anchor");
      }
      set icon(e) {
        this.querySelector(".tab-icon").style.backgroundImage = (function (e) {
          return 'url("{imageUrl}")'.replace(
            "{imageUrl}",
            "chrome://favicon/size/16@2x/" + e
          );
        })(e);
      }
      get icon() {
        return this.querySelector(".tab-icon").style.backgroundImage;
      }
      get anchor() {
        return this.hasAttribute("anchor");
      }
      set selected(e) {
        if (this.disabled) return !1;
        this.setAttribute("selected", !!e);
      }
      get selected() {
        return "true" === this.getAttribute("selected");
      }
      get draggable() {
        return "true" === this.getAttribute("draggable");
      }
      set draggable(e) {
        e
          ? this.setAttribute("draggable", !0)
          : this.setAttribute("draggable", !1);
      }
      get checkbox() {
        return this.querySelector(".tab-checkbox").checked;
      }
      set checkbox(e) {
        var t = this.querySelector(".tab-checkbox");
        (t.checked = e), t.checked && !this.selected && (this.selected = !0);
      }
      get hasFocus() {
        return (
          document.activeElement === this ||
          this.contains(document.activeElement)
        );
      }
      set focused(e) {
        e ? this.setAttribute("focused", "") : this.removeAttribute("focused");
      }
      get focused() {
        return this.hasAttribute("focused");
      }
      get linkAnchor() {
        return this.querySelector(".tab-entry a");
      }
      hide() {
        return this.setAttribute("hidden", ""), this;
      }
      show() {
        return this.removeAttribute("hidden"), this;
      }
      update(e) {
        (this.title = e.title || this.title),
          (this.link = e.url || this.link),
          (this.icon = e.url || this.icon),
          (this.domain = e.hostname || this.domain);
      }
      clear() {
        return s.clearElement(this);
      }
    };
  },
  function (e, t, n) {
    const s = n(10);
    e.exports = class AbstractTabs extends HTMLElement {
      constructor(e, t, n) {
        super(),
          (this.builder = e),
          (this._loadData = t || !1),
          (this.sort = Number(n)),
          (this.filter = ""),
          (this.className = "tabs");
      }
      _init(e) {
        return this.addArray(e), this;
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.addEventListener("click", (e) => {
            var t = s.getParentElementByAttribute(e.target, "id");
            if (!t || t.classList.contains("hostname"));
            else {
              var n = t.querySelector(".tab-title");
              if (e.target === n || n.contains(e.target)) return;
              if (
                t.removeButton &&
                (e.target === t.removeButton ||
                  t.removeButton.contains(e.target))
              )
                return this.dispatchEvent(
                  new CustomEvent("removeTabClicked", {
                    detail: {
                      tabId: t.id,
                      url: t.link,
                      domain: t.domain,
                      title: t.title,
                      favicon: t.icon,
                    },
                    bubbles: !0,
                  })
                );
              if (
                ((t.selected = !t.selected), t.linkAnchor.focus(), e.shiftKey)
              ) {
                var i = this.indexOf(t.id, !0),
                  r = this.getAnchor(),
                  a = 0;
                r && (a = this.indexOf(r.id, !0));
                var o = Math.min(i, a),
                  d = Math.max(i, a),
                  c = this.getByIndexRange(o, d + 1);
                this.setSelected(
                  c.map((e) => e.id),
                  t.selected
                ),
                  this.setAnchor(t.id);
              } else this.setAnchor(t.id);
            }
          }),
          this.addEventListener("focusin", (e) => {
            var t = s.getParentElementByAttribute(e.target, "id");
            return !(!t || e.target !== t.linkAnchor) && (t.focused = !0);
          }),
          this.addEventListener("focusout", (e) => {
            var t = s.getParentElementByAttribute(e.target, "id");
            return !(!t || e.target !== t.linkAnchor) && (t.focused = !1);
          }),
          this.addEventListener("keydown", (e) => {
            var t = s.getParentElementByAttribute(e.target, "id");
            if (t && e.target === t.linkAnchor && t.focused) {
              if (e.shiftKey && "Tab" === e.key)
                return (
                  e.preventDefault(),
                  this.dispatchEvent(
                    new CustomEvent("focusHeader", { bubbles: !0 })
                  )
                );
              if ("ArrowDown" === e.key || "ArrowUp" === e.key) {
                e.preventDefault();
                var n = this.indexOf(t.id, !0),
                  i = 0;
                "ArrowDown" === e.key
                  ? (i = n + 1 > this.visibleCount - 1 ? 0 : n + 1)
                  : "ArrowUp" === e.key &&
                    (i = n - 1 >= 0 ? n - 1 : this.visibleCount - 1);
                var r = this.getByIndex(i, !0);
                return (
                  r.linkAnchor.focus(),
                  r.linkAnchor.dispatchEvent(new CustomEvent("focusin"))
                );
              }
              if (" " === e.key)
                return (
                  e.preventDefault(),
                  this.setAnchor(t.id),
                  (t.selected = !t.selected)
                );
              if ("Delete" === e.key || "Backspace" === e.key) {
                e.preventDefault();
                let n = this.selected;
                return n.length > 0
                  ? this.dispatchEvent(
                      new CustomEvent("removeTabs", {
                        detail: { tabIds: n },
                        bubbles: !0,
                      })
                    )
                  : this.dispatchEvent(
                      new CustomEvent("removeTabs", {
                        detail: { tabIds: [t.id] },
                        bubbles: !0,
                      })
                    );
              }
            }
          }),
          this.loadEventListeners();
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented");
      }
      static get observedAttributes() {
        return ["disabled", "filter"];
      }
      attributeChangedCallback(e, t, n) {
        switch (e) {
          case "disabled":
            this.getArray().forEach(function (e) {
              e.disabled = this.disabled;
            }, this);
            break;
          case "filter":
            if (n && "" !== n) {
              let e = (function (e, t) {
                const n = e
                  .split(" ")
                  .filter((e) => e)
                  .map((e) => new RegExp(e, "i"));
                var s = "",
                  i = 0;
                return t.filter((e) => {
                  (i = 0), (s = e.title + (e.link.split("://")[1] || ""));
                  for (var t = 0; t < n.length; t++) n[t].test(s) && i++;
                  return i === n.length;
                });
              })(n, this.getArray()).map((e) => e.id);
              return this.setFilter(e, !0);
            }
            return this.clearFilter();
        }
      }
      get selected() {
        return this.getArray()
          .filter((e) => e.selected)
          .map((e) => e.id);
      }
      setSelected(e, t) {
        var n = this.getArray(),
          s = n.length;
        if (!e || e.length < 1)
          n.forEach(function (e, t) {
            t !== s - 1 && (e.mute = !0), (e.selected = !1);
          });
        else if (1 === e || e.length === n.length)
          n.filter((e) => !e.hidden).forEach((e, t) => {
            t !== s - 1 && (e.mute = !0), (e.selected = !0);
          });
        else {
          let n = null;
          e.forEach((s, i) => {
            (n = this.get(s)),
              i !== e.length - 1 && (n.mute = !0),
              (n.selected = t);
          }, this);
        }
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      get count() {
        return this.children.length;
      }
      get visibleCount() {
        return Array.from(this.children).filter((e) => !e.hidden).length;
      }
      set filter(e) {
        this.setAttribute("filter", e);
      }
      get filter() {
        return this.getAttribute("filter");
      }
      setAnchor(e) {
        this.clearAnchor();
        var t = this.get(e);
        return (t.anchor = !0), t;
      }
      getAnchor() {
        return this.querySelector("[anchor]") || null;
      }
      clearAnchor() {
        var e = this.getAnchor();
        return e && (e.anchor = !1), !0;
      }
      getArray(e) {
        return Array.prototype.slice.call(this.children);
      }
      addArray(e) {
        throw new Error("Abstract method not implemented.");
      }
      updateArray(e) {
        return this.clear(), this.addArray(e), this;
      }
      add(e) {
        throw new Error("Abstract method not implemented.");
      }
      get(e) {
        return this.querySelector(`[id='${e}']`);
      }
      getTabs(e) {
        return e.map((e) => this.get(e)).filter((e) => e);
      }
      updateTab(e) {
        var t = this.get(e.id);
        return t
          ? t.update(e)
          : (console.warn("Failed to update tab, tab doesn't exist."), !1);
      }
      getByIndex(e, t) {
        return e < 0
          ? (console.error("Trying to access negative index."), null)
          : t
          ? this.getArray().filter((e) => !e.hidden)[e]
          : this.getArray()[e];
      }
      getByIndexRange(e, t) {
        return s.range(e, t).map((e) => this.getByIndex(e, !0), this);
      }
      removeTab(e) {
        return (
          !!this.getArray().some((t) => {
            if (t.id == e) return (t.selected = !1), t.remove(), !0;
          }) &&
          this.dispatchEvent(
            new CustomEvent("tabsChanged", {
              detail: { tabCount: this.count },
              bubbles: !0,
            })
          )
        );
      }
      removeTabs(e) {
        return e.every(function (e) {
          return this.removeTab(e);
        }, this);
      }
      moveTab(e, t) {
        if (t < 0)
          return console.error("Trying to move tab to negative index."), !1;
        var n = this.get(e);
        if (n) {
          if (0 === t) return this.insertBefore(n, this.firstChild);
          var s = this.getByIndex(t);
          return s.nextElementSibling === n
            ? this.insertBefore(n, s)
            : this.insertBefore(n, s.nextElementSibling);
        }
        return console.warn("Failed to move tab, tabId doesn't exist."), !1;
      }
      indexOf(e, t) {
        return t
          ? this.getArray()
              .filter((e) => !e.hidden)
              .map((e) => e.id)
              .indexOf(e)
          : this.getArray()
              .map((e) => e.id)
              .indexOf(e);
      }
      insert(e, t) {
        return t < 0
          ? (console.error("Trying to insert a tab at a negative index."), !1)
          : !this.get(e.id) &&
              (0 === t
                ? this.insertBefore(this.builder.tab(e), this.firstChild)
                : this.insertBefore(
                    this.builder.tab(e),
                    this.getByIndex(t).nextSibling
                  ));
      }
      removeAt(e) {
        return this.getByIndex(e).remove();
      }
      contains(e) {
        return this.get(e);
      }
      getByDomain(e) {
        return this.getArray().filter((t) => t.domain === e);
      }
      clear() {
        return s.clearElement(this);
      }
      setFilter(e, t = !1) {
        let n = this.getArray(),
          s = n
            .map((n) => {
              if (t) {
                if (!e.includes(n.id)) return n.hide();
              } else if (e.includes(n.id)) return n.hide();
            })
            .filter(Boolean),
          i = n.length - s.length;
        return (
          this.dispatchEvent(
            new CustomEvent("visibleTabsChanged", {
              detail: { visibleCount: i },
              bubbles: !0,
            })
          ),
          s
        );
      }
      clearFilter() {
        let e = this.getArray();
        e.map((e) => e.show()),
          this.dispatchEvent(
            new CustomEvent("visibleTabsChanged", {
              detail: { visibleCount: e.length },
              bubbles: !0,
            })
          );
      }
      hide() {
        this.setAttribute("hidden", "");
      }
      show() {
        this.removeAttribute("hidden");
      }
    };
  },
  function (e, t) {
    e.exports = class ListPanel extends HTMLElement {
      constructor() {
        super();
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented.");
      }
      hide() {
        this.classList.add("active");
      }
      show() {
        this.classList.remove("active");
      }
      activeToggle() {
        this.classList.toggle("active");
      }
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (e, t, n) {
    /**
     * @name Cluster Manager
     * @author Dag Holmberg
     * @license Copyright (c) 2019 Dag Holmberg. All rights reserved.
     */
    const s = n(199).debug,
      i = n(21),
      r = n(200);
    n(201);
    const a = n(202),
      o = n(229),
      d = n(243),
      c = n(245),
      l = n(252);
    n(253), n(254), n(255);
    const h = new l(),
      u = new l(),
      m = new i(),
      v = [
        "#activelist-panel",
        "#savedlist-panel",
        "#about-panel",
        "#settings-panel",
        "#help-panel",
      ],
      b = [
        "#active-page",
        "#saved-page",
        "#about-page",
        "#settings-page",
        "#help-page",
      ],
      p = [
        "#active-tab",
        "#saved-tab",
        "#about-tab",
        "#settings-tab",
        "#help-tab",
      ],
      w = { active: 0, saved: 1, about: 2, settings: 3, help: 4 },
      g = "selected",
      f = ".extension-version",
      E = {
        state: { activePage: 0, activeNav: 0 },
        commands: {
          MANAGER_OPENED: "manager -opened",
          GET_ACTIVE_WINDOWS: "windows -active",
          GET_SAVED_WINDOWS: "windows -saved",
          GET_SETTINGS: "extension -get-settings",
          UPDATE_SETTINGS: "extension -update-settings",
          MANAGER_READY: "manager -ready",
        },
        init: function (e) {
          n(256);
          var t = w[e] || 0;
          return (
            E.setActivePage(t),
            m
              .getCurrent()
              .then((e) =>
                S({ command: E.commands.MANAGER_OPENED, data: { tab: e } })
              )
              .then(() => E.load(e))
              .catch(
                (e) => (
                  (e.message = "Failed to load Manager: " + e.message),
                  console.error(e)
                )
              )
          );
        },
        load: function (e) {
          console.info("Window Manager: loading...", e),
            window.addEventListener("hashchange", k),
            (function () {
              try {
                document.querySelector(f).textContent =
                  chrome.runtime.getManifest().version;
              } catch (e) {
                document.querySelector(f).textContent = "latest";
              }
            })(),
            document.addEventListener(
              "visibilitychange",
              () => {
                if (!document.hidden) return y();
              },
              !1
            );
          var t = S({ command: E.commands.GET_SETTINGS });
          t.then((e) => r.init(e, E.sendMessage)).catch((e) => {
            (e.message = `Failed to get extension settings: ${e.message}`),
              console.error(e);
          });
          let n = document.querySelector(".review-on-google");
          t.then((e) => {
            return (
              (!e.hasOwnProperty("reviewed") || !e.reviewed) &&
              ((n.hidden = !1),
              n.addEventListener("click", function t(s) {
                return (
                  (n.hidden = !0),
                  n.removeEventListener("click", t),
                  chrome.storage.sync.set({ settings: { ...e, reviewed: !0 } })
                );
              }),
              !0)
            );
          }).catch((e) => {
            console.error(e);
          });
          var s = document.querySelector("active-list"),
            i = document.querySelector("activelist-panel");
          (this.activeListController = new a(s, h)),
            (this.activePanelController = new o(
              i,
              this.activeListController,
              h,
              this.alertPopup
            ));
          var l = document.querySelector("saved-list"),
            m = document.querySelector("savedlist-panel");
          (this.savedListController = new d(l, u)),
            (this.savedPanelController = new c(m, this.savedListController, u));
          var v = [];
          v.push(this.activeListController.init()),
            v.push(this.savedListController.init()),
            Promise.all(v)
              .then(() => t)
              .then(
                (e) => (
                  this.activePanelController.init(e),
                  this.savedPanelController.init(e),
                  !0
                )
              )
              .then(() => chrome.runtime.onMessage.addListener(I))
              .then(() => S({ command: E.commands.MANAGER_READY, data: {} }))
              .then(() => console.info("Window Manager: loaded"))
              .catch((e) => {
                (e.message = "Failed to load manager: " + e.message),
                  console.error(e);
              });
        },
        sendMessage: function (e) {
          return S(e);
        },
        setActivePage: function (e) {
          if (
            !("number" != typeof e || e < 0 || Number(e) === E.state.activePage)
          ) {
            var t,
              n = E.state.activePage,
              s = C(n),
              i = L(n);
            s.classList.toggle("active"),
              i.classList.toggle("active"),
              (E.state.activePage = e),
              (t = e),
              x().classList.toggle(g),
              (E.state.activeNav = t),
              x().classList.toggle(g);
            var r = C(e),
              a = L(e);
            r.classList.toggle("active"), a.classList.toggle("active");
          }
        },
        getActivePage: function (e) {
          return C(e);
        },
        get alertPopup() {
          return document.querySelector("alert-popup");
        },
      };
    function y() {
      try {
        return (
          !(E.state.activePage > 1) &&
          L(E.state.activePage).querySelector(".search-field").focus()
        );
      } catch (e) {
        console.error(e);
      }
    }
    function L(e) {
      return document.querySelector(v[e]);
    }
    function C(e) {
      return document.querySelector(b[e]);
    }
    function x() {
      return document.querySelector(p[E.state.activeNav]);
    }
    function k(e) {
      var t = document.location.hash.slice(1),
        n = w[t] || 0;
      E.setActivePage(n);
    }
    function A(e) {
      const t = document
        .querySelector(".panel.active")
        .querySelector(".panel-notification");
      clearTimeout(n), (t.textContent = e);
      var n = setTimeout(() => {
        t.textContent = "";
      }, 3500);
    }
    function S(e) {
      return new Promise(function (t, n) {
        return chrome.runtime.sendMessage(
          e,
          (e) => (
            chrome.runtime.lastError &&
              console.warn(chrome.runtime.lastError.message),
            t(e)
          )
        );
      });
    }
    function I(e, t, n) {
      s && console.log("Window Manager: message recived", e);
      var i = e.command,
        r = e.data;
      switch (i) {
        case "wm -window -tab -update":
          return E.activeListController.updateTab(r.tab), !1;
        case "wm -window -tab -remove":
          return E.activeListController.removeTab(r.winId, r.tabId), !1;
        case "wm -window -tabs -add":
          return E.activeListController.addTab(r.tab), !1;
        case "wm -window -remove":
          return (
            E.activeListController.removeWindow(r.winId),
            E.activePanelController.update(),
            A("Closed window"),
            !1
          );
        case "wm -window -update":
          return E.activeListController.updateWindow(r.winId, r.options), !1;
        case "wm -windows -add":
          return (
            E.activeListController.addWindow(r.win),
            E.activePanelController.update(),
            !1
          );
        case "wm -window -tab -replace":
          return (
            E.activeListController.replaceTab(r.addedTab, r.removedTabId), !1
          );
        case "wm -tab -detached":
          return E.activeListController.detachTab(r.detachInfo, r.tabId), !1;
        case "wm -tab -attached":
          return E.activeListController.attachTab(r.tab, r.attachInfo), !1;
        case "wm -tab -moved":
          return E.activeListController.moveTab(r.tabId, r.moveInfo), !1;
        case "wm -savedwindow -add":
          return (
            E.savedListController.addWindow(r.win),
            E.savedPanelController.update(),
            A("Added window"),
            !1
          );
        case "wm -savedwindow -remove":
          return (
            E.savedListController.removeWindow(r.id),
            E.savedPanelController.update(),
            A("Removed window"),
            !1
          );
        case "wm -savedwindow -update":
          return (
            E.savedListController.updateWindow(r.win), A("Updated window"), !1
          );
        case "wm -savedwindow -saved":
          return A("Saved window"), !1;
        case "wm -user -auth":
          return (
            E.activePanelController.sync(r.user, r.license),
            E.savedPanelController.sync(r.user, r.license),
            !1
          );
        case "wm -alert":
          return E.alertPopup.showAlert(r.message, r.type), !1;
        case "wm -search -focus":
          return y(), n();
        default:
          return !1;
      }
    }
    document.addEventListener("DOMContentLoaded", function (e) {
      var t = window.location.hash.slice(1);
      E.init(t), (window.WM = E);
    });
  },
  function (e) {
    e.exports = { debug: !1 };
  },
  function (e, t) {
    const n = "open-window-manager",
      s = "chrome://extensions/configureCommands",
      i = {
        updating: !1,
        init: function (e, t) {
          (this.openManagerShortcut = document.querySelector(
            "#open-manager-shortcut"
          )),
            (this.configureShortcuts = document.querySelector(
              "#configure-shortcuts"
            )),
            (this.displayColumnsCheckbox =
              document.querySelector("#display-columns")),
            (this.darkThemeCheckbox = document.querySelector("#dark-theme")),
            (this.suspendWindowsCheckbox =
              document.querySelector("#suspend-windows")),
            (this.pinManagerCheckbox = document.querySelector("#pin-manager")),
            (this.exportCSVButton = document.querySelector("#export-csv")),
            (this.exportJSONButton = document.querySelector("#export-json")),
            e.hasOwnProperty("pinManager") &&
              e.pinManager &&
              (this.pinManagerCheckbox.checked = !0),
            e.hasOwnProperty("displayColumns") &&
              2 === e.displayColumns &&
              ((this.displayColumnsCheckbox.checked = !0),
              document.body.classList.remove("single-column"),
              document.body.classList.add("double-column")),
            e.hasOwnProperty("darkTheme") &&
              e.darkTheme &&
              ((this.darkThemeCheckbox.checked = !0),
              document.documentElement.classList.add("dark")),
            e.hasOwnProperty("disableSuspendOpenedWindows") &&
              e.disableSuspendOpenedWindows &&
              (this.suspendWindowsCheckbox.checked = !0),
            new Promise(function (e) {
              chrome.commands.getAll(function (t) {
                return (
                  t.forEach(function (t) {
                    if (t.name === n) return e(t);
                  }),
                  e(null)
                );
              });
            }).then(
              function (e) {
                this.openManagerShortcut.textContent = e.shortcut || "Not Set";
              }.bind(this)
            ),
            this.configureShortcuts.addEventListener("click", function (e) {
              chrome.tabs.create({ url: s });
            }),
            this.pinManagerCheckbox.addEventListener(
              "change",
              (e) =>
                !i.updating &&
                ((i.updating = !0),
                i.pinManagerCheckbox.setAttribute("disabled", ""),
                r({ pinManager: i.pinManagerCheckbox.checked }, t).finally(
                  () => (
                    (i.updating = !1),
                    i.pinManagerCheckbox.removeAttribute("disabled")
                  )
                ))
            ),
            this.displayColumnsCheckbox.addEventListener("change", (e) => {
              if (i.updating) return !1;
              (i.updating = !0),
                i.displayColumnsCheckbox.setAttribute("disabled", "");
              var n = document.body;
              return n.classList.contains("single-column")
                ? (n.classList.remove("single-column"),
                  n.classList.add("double-column"),
                  r({ displayColumns: 2 }, t).finally(
                    () => (
                      (i.updating = !1),
                      i.displayColumnsCheckbox.removeAttribute("disabled")
                    )
                  ))
                : n.classList.contains("double-column")
                ? (n.classList.remove("double-column"),
                  n.classList.add("single-column"),
                  r({ displayColumns: 1 }, t).finally(
                    () => (
                      (i.updating = !1),
                      i.displayColumnsCheckbox.removeAttribute("disabled")
                    )
                  ))
                : void 0;
            }),
            this.darkThemeCheckbox.addEventListener(
              "change",
              (e) =>
                !i.updating &&
                ((i.updating = !0),
                i.darkThemeCheckbox.setAttribute("disabled", ""),
                document.documentElement.classList.contains("dark")
                  ? (document.documentElement.classList.remove("dark"),
                    r({ darkTheme: !1 }, t).finally(
                      () => (
                        (i.updating = !1),
                        i.darkThemeCheckbox.removeAttribute("disabled")
                      )
                    ))
                  : (document.documentElement.classList.add("dark"),
                    r({ darkTheme: !0 }, t).finally(
                      () => (
                        (i.updating = !1),
                        i.darkThemeCheckbox.removeAttribute("disabled")
                      )
                    )))
            ),
            this.suspendWindowsCheckbox.addEventListener(
              "change",
              (e) =>
                !i.updating &&
                ((i.updating = !0),
                i.suspendWindowsCheckbox.setAttribute("disabled", ""),
                this.suspendWindowsCheckbox.checked
                  ? r({ disableSuspendOpenedWindows: !0 }, t).finally(
                      () => (
                        (i.updating = !1),
                        i.suspendWindowsCheckbox.removeAttribute("disabled")
                      )
                    )
                  : r({ disableSuspendOpenedWindows: !1 }, t).finally(
                      () => (
                        (i.updating = !1),
                        i.suspendWindowsCheckbox.removeAttribute("disabled")
                      )
                    ))
            );
        },
      };
    function r(e, t) {
      return t({ command: "extension -update-settings", data: { options: e } });
    }
    e.exports = i;
  },
  function (e, t) {
    !(function () {
      "use strict";
      if (!("adoptedStyleSheets" in document)) {
        function e(e) {
          if (
            (function (e) {
              return e.replace(/\s/g, "").match(/\@import/);
            })(e)
          )
            throw new Error(
              "@import is not allowed when using CSSStyleSheet's replaceSync method"
            );
          if (this[s])
            return (
              (this[s]._sheet.innerHTML = e), l(this), this[s]._sheet.sheet
            );
          throw new TypeError(
            "replaceSync can only be called on a constructed style sheet"
          );
        }
        function t(e) {
          return new Promise((t, n) => {
            this[s]
              ? ((this[s]._sheet.innerHTML = e),
                t(this[s]._sheet.sheet),
                l(this))
              : n("replace can only be called on a constructed style sheet");
          });
        }
        const s = Symbol("constructible style sheets"),
          i = Symbol("constructed"),
          r = Symbol("obsolete"),
          a = document.createElement("iframe"),
          o =
            (Symbol("Styles"),
            (e) => {
              e.forEach((e) => {
                const { addedNodes: t, removedNodes: n } = e;
                n.forEach((e) => {
                  e[i] &&
                    !e[r] &&
                    setTimeout(() => {
                      e[i].appendChild(e);
                    });
                }),
                  t.forEach((e) => {
                    const { shadowRoot: t } = e;
                    t &&
                      t.adoptedStyleSheets &&
                      t.adoptedStyleSheets.forEach((e) => {
                        t.appendChild(e[s]._sheet);
                      });
                  });
              });
            });
        new MutationObserver(o).observe(document.body, { childList: !0 }),
          (a.hidden = !0),
          document.body.appendChild(a);
        const d = a.contentWindow.document.body,
          c = (e, t) => {
            const n = t[s]._sheet.cloneNode(!0);
            if (
              (e.body && (e = e.body),
              (n[i] = e),
              t[s]._adopters.push({ location: e, clone: n }),
              e.appendChild(n),
              n.sheet)
            )
              for (const e of t[s].pastActions)
                "method" === e.type && n.sheet[e.key](...e.args);
            return n;
          },
          l = (e) => {
            e[s]._adopters.forEach((t) => {
              t.clone.innerHTML = e[s]._sheet.innerHTML;
            });
          };
        class S {
          constructor() {
            (this._adopters = []), (this.pastActions = []);
            const n = document.createElement("style");
            return (
              d.appendChild(n),
              (this._sheet = n),
              (n.sheet[s] = this),
              n.sheet.constructor.prototype.replace ||
                ((n.sheet.constructor.prototype.replace = t),
                (n.sheet.constructor.prototype.replaceSync = e)),
              n.sheet
            );
          }
        }
        function n(e) {
          const t = CSSStyleSheet.prototype[e];
          CSSStyleSheet.prototype[e] = function (...n) {
            return (
              s in this &&
                (this[s]._adopters.forEach((t) => {
                  t.clone.sheet && t.clone.sheet[e](...n);
                }),
                this[s].pastActions.push({ type: "method", key: e, args: n })),
              t.call(this, ...n)
            );
          };
        }
        (StyleSheet.prototype.replace = t),
          (CSSStyleSheet.prototype.replace = t),
          (CSSStyleSheet.prototype.replaceSync = e),
          (StyleSheet.prototype.replaceSync = e),
          n("addImport"),
          n("addPageRule"),
          n("addRule"),
          n("deleteRule"),
          n("insertRule"),
          n("removeImport"),
          n("removeRule"),
          (window.CSSStyleSheet = S);
        const h = {
          get() {
            return this._adopted || [];
          },
          set(e) {
            const t = this.body ? this.body : this;
            if (
              ((this._adopted = this._adopted || []),
              new MutationObserver(o).observe(this, { childList: !0 }),
              !Array.isArray(e))
            )
              throw new TypeError("Adopted style sheets must be an Array");
            e.forEach((e) => {
              if (!e instanceof CSSStyleSheet)
                throw new TypeError(
                  "Adopted style sheets must be of type CSSStyleSheet"
                );
            });
            const n = [...new Set(e)];
            this._adopted
              .filter((e) => !n.includes(e))
              .forEach((e) => {
                const n = e[s]._adopters.filter((e) => e.location === t)[0]
                  .clone;
                (n[r] = !0), n.parentNode.removeChild(n);
              }),
              (this._adopted = n),
              this.isConnected && e.forEach((e) => c(this, e));
          },
        };
        Object.defineProperty(ShadowRoot.prototype, "adoptedStyleSheets", h),
          Object.defineProperty(Document.prototype, "adoptedStyleSheets", h);
      }
    })();
  },
  function (e, t, n) {
    var s = n(46);
    n(203);
    e.exports = class ActiveListController {
      constructor(e, t) {
        (this.activeList = e), (this.command = t);
      }
      init() {
        return this.update().then(() => this.loadEventListeners());
      }
      loadEventListeners() {
        this.activeList.addEventListener("muteTabButtonClicked", (e) =>
          e.detail.muted
            ? s.sendUnmuteActiveTab({ tabId: e.detail.tabId })
            : s.sendMuteActiveTab({ tabId: e.detail.tabId })
        ),
          this.activeList.addEventListener(
            "openInNewWindowButtonClicked",
            (e) => {
              let t = this.activeList.get(e.detail.winId);
              if (t)
                return s.sendMoveTabs({
                  tabIds: t.selectedTabs,
                  targetWinId: null,
                  toIndex: -1,
                  focused: !1,
                });
            }
          ),
          this.activeList.addEventListener("renameWinClicked", (e) =>
            s.sendUpdateActiveWindow({
              winId: e.detail.winId,
              title: e.detail.title,
            })
          ),
          this.activeList.addEventListener("winCheckedChange", (e) => {
            var t = null;
            e.detail.checked
              ? (((t = this.activeList.get(
                  e.detail.winId
                )).header.closeTabsButton.disabled = !1),
                (t.header.openInNewWinButton.disabled = !1))
              : (((t = this.activeList.get(
                  e.detail.winId
                )).header.closeTabsButton.disabled = !0),
                (t.header.openInNewWinButton.disabled = !0));
          }),
          this.activeList.addEventListener("updateWindows", (e) =>
            this.update()
          ),
          this.activeList.addEventListener("updateWindow", (e) =>
            this.updateWindow(e.detail.winId)
          ),
          this.activeList.addEventListener("updateWinTabs", (e) =>
            this.updateWindow(e.detail.winId, { tabsOnly: !0 })
          ),
          this.activeList.addEventListener("tabsMoved", (e) =>
            s.sendMoveTabs({
              tabIds: e.detail.tabIds,
              targetWinId: e.detail.winId,
              toIndex: e.detail.toIndex,
            })
          ),
          this.activeList.addEventListener("closeWinClicked", (e) => {
            var t = this.command.create(
              s.sendRemoveWindow,
              s.sendCreateWindow,
              {
                winId: e.detail.winId,
                tabUrls: this.activeList
                  .get(e.detail.winId)
                  .tabs.getArray()
                  .map((e) => e.link),
              }
            );
            return this.command.execute(t);
          }),
          this.activeList.addEventListener("removeTabClicked", (e) => {
            var t = this.command.create(s.sendRemoveTabs, s.sendCreateTabs, {
              tabIds: [e.detail.tabId],
              winId: e.detail.winId,
              urls: [e.detail.url],
            });
            return this.command.execute(t);
          }),
          this.activeList.addEventListener("removeTabs", (e) => {
            var t = this.command.create(s.sendRemoveTabs, s.sendCreateTabs, {
              tabIds: e.detail.tabIds,
              winId: e.detail.winId,
              urls: this.activeList
                .get(e.detail.winId)
                .tabs.getTabs(e.detail.tabIds)
                .map((e) => e.link),
            });
            return this.command.execute(t);
          }),
          this.activeList.addEventListener("closeHostnameClicked", (e) => {
            var t = this.command.create(s.sendRemoveTabs, s.sendCreateTabs, {
              tabIds: e.detail.tabIds,
              urls: e.detail.urls,
              winId: e.detail.winId,
            });
            return this.command.execute(t);
          }),
          this.activeList.addEventListener("openHostnameNewClicked", (e) =>
            s.sendMoveTabs({
              tabIds: e.detail.tabIds,
              targetWinId: null,
              toIndex: -1,
              focused: !1,
            })
          ),
          this.activeList.addEventListener("saveNewWinClicked", (e) =>
            s.sendSaveNewWindow({
              winId: e.detail.winId,
              title: e.detail.title,
              closeOnSave: e.detail.closeOnSave,
            })
          ),
          this.activeList.addEventListener("saveWinClicked", (e) =>
            s.sendSaveWindow({
              winId: e.detail.winId,
              targetId: e.detail.targetId,
              closeOnSave: e.detail.closeOnSave,
            })
          ),
          this.activeList.addEventListener(
            "openSaveAsWinButtonClicked",
            (e) => {
              const t = this.activeList.get(e.detail.winId);
              return (
                !!t &&
                s
                  .sendGetSavedWindows()
                  .then(
                    (e) =>
                      !!e &&
                      t.header.saveWinModal.setOptions(
                        e.map((e) => ({ title: e.title, id: e.id }))
                      )
                  )
              );
            }
          ),
          this.activeList.addEventListener("suspendWinButtonClicked", (e) => {
            const t = this.activeList.get(e.detail.winId),
              n = t.selectedTabs;
            return s.sendSuspendTabs({
              tabIds: n.length
                ? n.map((e) => Number(e))
                : t.tabs.getArray().map((e) => Number(e.id)),
            });
          }),
          this.activeList.addEventListener("exportWindowClicked", (e) =>
            "csv" === e.detail.export
              ? s.sendExportActiveWindow({
                  export: "csv",
                  winId: e.detail.winId,
                  title: e.detail.title,
                })
              : "json" === e.detail.export
              ? s.sendExportActiveWindow({
                  export: "json",
                  winId: e.detail.winId,
                  title: e.detail.title,
                })
              : void 0
          ),
          this.activeList.addEventListener("closeTabsButtonClicked", (e) => {
            const t = this.activeList.checked;
            if (t) {
              const e = t.selectedTabs,
                n = this.command.create(s.sendRemoveTabs, s.sendCreateTabs, {
                  tabIds: e,
                  winId: t.id,
                  urls: t.tabs.getTabs(e).map((e) => e.link),
                });
              return this.command.execute(n);
            }
          }),
          this.activeList.addEventListener("removeDuplicatesClicked", (e) =>
            s.sendRemoveDuplicates({ winId: e.detail.winId })
          ),
          this.activeList.addEventListener("quickSortClicked", (e) =>
            s.sendQuickSort({ winId: e.detail.winId })
          );
      }
      update() {
        return s
          .sendGetCurrentWindow()
          .then((e) => s.sendGetActiveWindows({ currentWinId: e }))
          .then((e) =>
            s
              .sendGetSettings()
              .then(
                (t) => (
                  (this.sort = Number(t.sortMethod)),
                  (this.activeList.sortTabsMethod = t.sortMethod),
                  this.activeList.clear(),
                  this.activeList.addArray(e)
                )
              )
          )
          .catch(function (e) {
            return (function (e, t) {
              console.error(e);
            })(e);
          });
      }
      setTabsSort(e) {
        return (
          (this.sort = e),
          this.activeList.clearSelected(),
          (this.activeList.sortTabsMethod = e),
          s.sendUpdateSettings({ sortMethod: String(e) }).then(() => {})
        );
      }
      updateWindow(e, t = {}) {
        return s
          .sendGetActiveWindow(e)
          .then((n) => this.activeList.updateWindow(e, n, t));
      }
      addWindow(e) {
        try {
          return this.activeList.add(e);
        } catch (e) {
          console.error("Failed to add window", e);
        }
      }
      removeWindow(e) {
        var t = this.activeList.get(e);
        return t
          ? (this.activeList.clearSelected(), t.remove())
          : (console.warn("Failed to remove window, window doesn't exist."),
            !1);
      }
      replaceTab(e, t) {
        var n = this.activeList.get(e.windowId);
        return n
          ? (n.tabs.removeTab(t), n.tabs.add(e))
          : (console.warn("Failed to replace tab, window doesn't exist."), !1);
      }
      detachTab(e, t) {
        var n = this.activeList.get(e.oldWindowId);
        return n
          ? n.tabs.removeTab(t)
          : (console.warn("Failed to detach tab, window doesn't exist."), !1);
      }
      attachTab(e, t) {
        var n = this.activeList.get(e.windowId);
        return n
          ? e.isManager
            ? this.update()
            : this.updateWindow(n.id, { tabsOnly: !0 }).catch((e) =>
                this.update()
              )
          : (console.warn("Failed to attach tab, window doesn't exist."), !1);
      }
      moveTab(e, t) {
        var n = this.activeList.get(t.windowId);
        if (n) {
          var s = t.toIndex;
          return 1 === this.sort
            ? n.tabs.moveTab(e, n.tabs.count - 1 - s)
            : n.tabs.moveTab(e, s);
        }
        return console.warn("Failed to move tab, window doesn't exist."), !1;
      }
      updateTab(e) {
        var t = this.activeList.get(e.windowId);
        return t
          ? t.tabs.updateTab(e)
          : (console.warn("Failed to update tab, window doesn't exist."), !1);
      }
      removeTab(e, t) {
        var n = this.activeList.get(e);
        return n
          ? n.tabs.removeTab(t)
          : (console.warn("Failed to remove tab, window doesn't exist."), !1);
      }
      addTab(e, t) {
        var n = this.activeList.get(e.windowId);
        return n
          ? n.tabs.add(e, t)
          : (console.warn("Failed to add tab, window doesn't exist."), !1);
      }
      search(e) {
        return (
          this.activeList.clearSelected(),
          this.clearSearch(),
          (this.activeList.filter = e),
          this
        );
      }
      clearSearch() {
        return (this.activeList.filter = ""), this;
      }
    };
  },
  function (e, t, n) {
    var s = n(82),
      i = new (n(83).ListComponentsInjector)("active"),
      r = "Current Window",
      a = "Window ";
    n(220), n(221), n(222), n(223), n(224), n(225), n(226), n(227), n(228);
    class ActiveList extends s {
      get factory() {
        return i;
      }
      loadEventListeners() {}
      updateWindow(e, t, n) {
        const s = this.get(e);
        return s
          ? n.tabsOnly
            ? s.updateTabs(t.tabs)
            : n.titleOnly
            ? (s.title = t.title)
            : s.update(t)
          : (console.warn("Failed to update window, id doesn't exist."), !1);
      }
      setWindowTitle(e, t) {
        const n = this.get(e);
        if (n) return (n.title = t), n;
      }
      clearWindowTitle(e) {
        const t = this.get(e);
        if (t) {
          let n = this.indexOf(e);
          return (
            (t.title =
              n < 1
                ? this.createWindowTitle(t, 0)
                : this.createWindowTitle(t, this.count)),
            t
          );
        }
      }
      createWindowTitle(e, t) {
        if (e.title) return e.title;
        if (0 === t) return r;
        return this.getArray().find((e) => e.title === a + t)
          ? a + (t + 1)
          : a + t;
      }
      setWindowStatus(e, t) {}
    }
    customElements.define("active-list", ActiveList), (e.exports = ActiveList);
  },
  function (e, t, n) {
    var s = n(4);
    class CollapseWinButton extends s {
      loadEventListeners() {
        this.addEventListener("click", (e) => {
          if (!this.disabled)
            return this.dispatchEvent(
              new CustomEvent("collapseWinButtonClicked", { bubbles: !0 })
            );
        });
      }
    }
    customElements.define("collapse-win-button", CollapseWinButton),
      (e.exports = CollapseWinButton);
  },
  function (e, t, n) {
    var s = n(47);
    e.exports = function () {
      this.construct = function (e) {
        var t = null;
        switch (e) {
          case "activeheader":
            return (
              (t = document.querySelector(i)),
              function (e) {
                return (function (e, t) {
                  t.content.querySelector(".win-icon").style.backgroundImage =
                    w(c);
                  var n = t.content.querySelector(".win-link a");
                  return (
                    (n.textContent = e.title),
                    (n.href = g(e.id)),
                    (t.content.querySelector(
                      ".tab-count"
                    ).textContent = `(${e.tabs.length})`),
                    document.importNode(t.content, !0)
                  );
                })(e, t);
              }
            );
          case "activetabs":
            return (
              (t = document.querySelector(r)),
              function (e) {
                return m(e, t, b);
              }
            );
          case "activehostnameheader":
            return (
              (t = document.querySelector(a)),
              function (e) {
                return (function (e, t) {
                  var n = t.content;
                  return (
                    (n.querySelector(".hostname-icon").style.backgroundImage =
                      ((s = e.iconUrl),
                      s
                        ? u.replace("{imageUrl}", h + s)
                        : u.replace("{imageUrl}", c))),
                    (n.querySelector(".hostname-title").textContent = e.title),
                    document.importNode(t.content, !0)
                  );
                  var s;
                })(e, t);
              }
            );
          case "activetab":
            return (
              (t = document.querySelector(r)),
              function (e, n) {
                return b(e, t, n);
              }
            );
          case "savedheader":
            return (
              (t = document.querySelector(o)),
              function (e) {
                return (function (e, t) {
                  t.content.querySelector(".win-icon").style.backgroundImage =
                    w(l);
                  var n = t.content.querySelector(".win-link a");
                  return (
                    (n.textContent = e.title),
                    (n.href = g(e.id)),
                    (t.content.querySelector(
                      ".tab-count"
                    ).textContent = `(${e.tabs.length})`),
                    (t.content.querySelector(".win-date").textContent = s(
                      e.lastModified,
                      "mmm d, yyyy"
                    )),
                    document.importNode(t.content, !0)
                  );
                })(e, t);
              }
            );
          case "savedtabs":
            return (
              (t = document.querySelector(d)),
              function (e) {
                return m(e, t, v);
              }
            );
          case "savedtab":
            return (
              (t = document.querySelector(d)),
              function (e, n) {
                return v(e, t, n);
              }
            );
          default:
            throw new Error("Invalid builder type input.");
        }
      };
    };
    const i = "#active-win-header-template",
      r = "#active-tab-template",
      a = "#active-hostname-header-template",
      o = "#saved-win-header-template",
      d = "#saved-tab-template",
      c = (chrome.extension.getURL(""), "/res/icons/chrome.ico"),
      l = "/res/icons/chrome-gray.png",
      h = "chrome://favicon/size/16@2x/",
      u = 'url("{imageUrl}")';
    function m(e, t, n) {
      for (var s = document.createDocumentFragment(), i = 0; i < e.length; i++)
        s.appendChild(n(e[i], t));
      return s;
    }
    function v(e, t, n) {
      var s = t.content.children[0];
      s.id = e.id;
      var i = s.querySelector(".tab-title a");
      return (
        (s.querySelector(".tab-icon").style.backgroundImage = p(e.url)),
        (i.href = e.url),
        (i.textContent = e.title || "New Tab"),
        (s.querySelector(".tab-domain").textContent = e.hostname),
        n && s.setAttribute("hidden", ""),
        document.importNode(t.content, !0)
      );
    }
    function b(e, t, n) {
      var s = t.content.children[0];
      s.id = e.id;
      var i,
        r,
        a = s.querySelector(".tab-title a");
      return (
        (s.querySelector(".tab-icon").style.backgroundImage = p(e.url)),
        (a.href = e.url),
        (a.dataset.tabLink =
          ((i = e.id),
          (r = e.windowId),
          "chrome://windows/{winId}/tabs/{tabId}"
            .replace("{winId}", r)
            .replace("{tabId}", i))),
        (a.textContent = e.title),
        (s.querySelector(".tab-domain").textContent = e.hostname),
        n && s.setAttribute("hidden", ""),
        s.setAttribute("suspended", e.suspended || e.discarded),
        s.setAttribute("audible", e.audible),
        s.setAttribute("muted", e.mutedInfo.muted),
        e.isManager
          ? s.setAttribute("manager", !0)
          : s.removeAttribute("manager"),
        document.importNode(t.content, !0)
      );
    }
    function p(e) {
      return u.replace("{imageUrl}", h + e);
    }
    function w(e) {
      return u.replace("{imageUrl}", e);
    }
    function g(e) {
      return "chrome://windows/{winId}".replace("{winId}", e);
    }
  },
  function (e, t, n) {
    var s = n(84);
    class ActiveHeader extends s {
      loadEventListeners() {}
      get saveWinModal() {
        return this.querySelector("savewin-modal");
      }
      get closeTabsButton() {
        return this.querySelector("close-tabs-button");
      }
      get renameWinModal() {
        return this.querySelector("rename-win-modal");
      }
      get renameWinButton() {
        return this.querySelector("rename-win-button");
      }
      get openInNewWinButton() {
        return this.querySelector("open-in-new-win-button");
      }
    }
    customElements.define("active-header", ActiveHeader),
      (e.exports = ActiveHeader);
  },
  function (e, t, n) {
    var s = n(85);
    const i = n(10);
    var r = new (function () {
      (this.movedTab = null),
        (this.movedWinId = null),
        (this.targetTab = null),
        (this.targetWinId = null),
        (this.isMoved = !1),
        (this.toIndex = null),
        (this.reset = function () {
          for (var e in this)
            this.hasOwnProperty(e) && "reset" !== e && (this[e] = null);
        });
    })();
    class ActiveWin extends s {
      get id() {
        return Number(this.getAttribute("id"));
      }
      set id(e) {
        return this.setAttribute("id", e);
      }
      static get observedAttributes() {
        return this.observed;
      }
      attributeChangedCallback(e, t, n) {
        return this.attributeChangedBase(e, t, n);
      }
      loadEventListeners() {
        this.header.openInNewWinButton.addEventListener(
          "openInNewWindowButtonClicked",
          (e) => (e.detail.winId = this.id)
        ),
          this.header.renameWinModal.addEventListener(
            "renameWinClicked",
            (e) => {
              e.detail.winId = this.id;
            }
          ),
          this.header.renameWinButton.addEventListener(
            "renameWinButtonClicked",
            (e) =>
              this.header.renameWinModal.hidden
                ? ((e.detail.winId = this.id),
                  this.header.renameWinModal.show(),
                  this.header.renameWinModal.inputBox.focus())
                : this.header.renameWinModal.hide()
          ),
          this.moreDropdownButton.addEventListener(
            "exportWindowClicked",
            (e) => {
              e.detail.winId = this.id;
            }
          ),
          this.moreDropdownButton.addEventListener("quickSortClicked", (e) => {
            e.detail.winId = this.id;
          }),
          this.moreDropdownButton.addEventListener(
            "removeDuplicatesClicked",
            (e) => {
              e.detail.winId = this.id;
            }
          ),
          this.moreDropdownButton.addEventListener(
            "exportWindowClicked",
            (e) => {
              (e.detail.winId = this.id), (e.detail.title = this.header.title);
            }
          ),
          this.suspendWinButton.addEventListener(
            "suspendWinButtonClicked",
            (e) => {
              e.detail.winId = this.id;
            },
            !1
          ),
          this.saveAsButton.addEventListener(
            "openSaveAsWinButtonClicked",
            (e) =>
              {
                return this.header.saveWinModal.hidden
                  ? ((e.detail.winId = this.id),
                    this.header.saveWinModal.show(),
                    this.header.saveWinModal.inputBox.focus())
                  : this.header.saveWinModal.hide();
              },
            !1
          ),
          this.header.saveWinModal.addEventListener(
            "saveNewWinClicked",
            (e) => {
              (e.detail.winId = this.id),
                (this.saveButton.disabled = !0),
                setTimeout(() => {
                  this.saveButton.disabled = !1;
                }, 2e3);
            },
            !1
          ),
          this.header.saveWinModal.addEventListener(
            "saveWinClicked",
            (e) => {
              e.detail.winId = this.id;
            },
            !1
          ),
          this.closeWinButton.addEventListener(
            "closeWinButtonClicked",
            (e) =>
              this.dispatchEvent(
                new CustomEvent("closeWinClicked", {
                  detail: { winId: this.id },
                  bubbles: !0,
                })
              ),
            !1
          ),
          this.addEventListener(
            "removeTabClicked",
            (e) => {
              e.detail.winId = this.id;
            },
            !1
          ),
          this.addEventListener(
            "closeHostnameClicked",
            (e) => {
              (e.detail.tabIds = e.detail.tabs.map((e) => e.id)),
                (e.detail.urls = e.detail.tabs.map((e) => e.link)),
                (e.detail.winId = this.id);
            },
            !1
          ),
          this.addEventListener(
            "dragstart",
            (e) => {
              if (
                ((e.dataTransfer.effectAllowed = "move"),
                (e.dataTransfer.dropEffect = "move"),
                "tab" === e.target.className)
              )
                return (
                  this.clearSelected(),
                  (r.movedTab = this.tabs.get(e.target.id)),
                  (r.movedWinId = this.id),
                  e.dataTransfer.setData("text", e.target.id)
                );
            },
            !1
          ),
          this.addEventListener(
            "dragover",
            (e) => {
              (e.dataTransfer.dropEffect = "move"), e.preventDefault();
              var t = i.getParentByClass(e.target, "tab");
              if (t && t !== r.movedTab) {
                (r.targetTab = t), (r.targetWinId = this.id);
                var n = t.getBoundingClientRect(),
                  s = n.y + n.height / 2;
                if (e.clientY - s > 0) {
                  if (t.nextElementSibling !== r.movedTab)
                    return (
                      (r.isMoved = !0),
                      (r.toIndex = this.tabs.indexOf(t.id)),
                      t.nextElementSibling
                        ? this.tabs.insertBefore(
                            r.movedTab,
                            t.nextElementSibling
                          )
                        : ((0 !== r.toIndex &&
                            r.toIndex !== this.tabs.count - 1) ||
                            (r.toIndex += 1),
                          this.tabs.appendChild(r.movedTab))
                    );
                } else if (t.previousElementSibling !== r.movedTab)
                  return (
                    (r.isMoved = !0),
                    (r.toIndex = this.tabs.indexOf(t.id)),
                    this.tabs.insertBefore(r.movedTab, t)
                  );
              }
            },
            !1
          ),
          this.addEventListener(
            "drop",
            (e) => {
              if ((e.preventDefault(), r.targetTab && r.isMoved)) {
                r.toIndex < 0 || r.toIndex;
                return r.targetWinId === r.movedWinId
                  ? (a.call(this, [r.movedTab.id], r.movedWinId, r.toIndex),
                    r.reset())
                  : (a.call(this, [r.movedTab.id], r.targetWinId, r.toIndex),
                    r.reset());
              }
            },
            !1
          ),
          this.addEventListener("dragend", (e) => {
            if (r.isMoved)
              return (
                this.dispatchEvent(
                  new CustomEvent("updateWinTabs", {
                    detail: { winId: r.movedWinId },
                    bubbles: !0,
                  })
                ),
                r.targetWinId !== r.movedWinId &&
                  this.dispatchEvent(
                    new CustomEvent("updateWinTabs", {
                      detail: { winId: r.targetWinId },
                      bubbles: !0,
                    })
                  ),
                r.reset()
              );
          });
      }
      sortTabs(e, t) {
        if (this.id) {
          if (Number(e) < 2 && Number(t) < 2)
            return (
              (this.tabs.sort = Number(t)),
              (function (e) {
                var t = e.ownerDocument.createDocumentFragment();
                for (; e.lastChild; ) t.appendChild(e.lastChild);
                e.appendChild(t);
              })(this.tabs)
            );
          const s = this.tabs.hidden;
          var n = (function (e, t, n) {
            if (t < 2)
              return { tabs: e.create("tabs", n, t), name: e.getName("tabs") };
            return {
              tabs: e.create("hostnames", n, t),
              name: e.getName("hostnames"),
            };
          })(this.factory, t, []);
          return (
            this.appendChild(n.tabs),
            this.tabs.remove(),
            (this.tabs = this.querySelector(n.name)),
            (this.tabs.hidden = s),
            this.loadTabsEventListeners(),
            this.dispatchEvent(
              new CustomEvent("updateWinTabs", {
                detail: { winId: this.id },
                bubbles: !0,
              })
            )
          );
        }
      }
      updateTabs(e) {
        return this.clearSelected(), this.tabs.updateArray(e);
      }
      update(e) {
        return this.clearSelected(), this.tabs.updateArray(e.tabs);
      }
      get closeWinButton() {
        return this.querySelector("close-win-button");
      }
      get saveAsButton() {
        return this.querySelector("save-as-button");
      }
      get suspendWinButton() {
        return this.querySelector("suspend-win-button");
      }
      get unsuspendWinButton() {
        return this.querySelector("unsuspend-win-button");
      }
      get moreDropdownButton() {
        return this.querySelector("more-dropdown-button");
      }
      get renameWinButton() {
        return this.querySelector("rename-win-button");
      }
    }
    function a(e, t, n) {
      return (
        this.sort > 0 && (n = (n = this.tabs.count - 1 - n) < 0 ? 0 : n),
        this.dispatchEvent(
          new CustomEvent("tabsMoved", {
            detail: { tabIds: e, winId: t, toIndex: n },
            bubbles: !0,
          })
        )
      );
    }
    customElements.define("active-win", ActiveWin), (e.exports = ActiveWin);
  },
  function (e, t, n) {
    var s = n(86);
    class ActiveTab extends s {
      loadEventListeners() {}
      get id() {
        return Number(this.getAttribute("id"));
      }
      set id(e) {
        this.setAttribute("id", e);
      }
      get removeButton() {
        return this.querySelector(".remove-button");
      }
      get suspended() {
        return "true" === this.getAttribute("suspended");
      }
      set suspended(e) {
        this.setAttribute("suspended", e);
      }
      get isManager() {
        return this.hasAttribute("manager");
      }
      get audible() {
        return this.getAttribute("audible");
      }
      set audible(e) {
        return this.setAttribute("audible", Boolean(e));
      }
      get muted() {
        return this.getAttribute("muted");
      }
      set muted(e) {
        return this.setAttribute("muted", Boolean(e));
      }
      update(e) {
        (this.title = e.title || this.title),
          (this.link = e.url || this.link),
          (this.icon = e.url || this.icon),
          (this.domain = e.hostname || this.domain),
          (this.suspended = e.suspended || e.disarded || !1),
          (this.audible = e.audible || !1),
          (this.muted = e.mutedInfo.muted || !1);
      }
    }
    customElements.define("active-tab", ActiveTab), (e.exports = ActiveTab);
  },
  function (e, t, n) {
    var s = n(87),
      i = { ASCENDING: 0, DESCENDING: 1 };
    class ActiveTabs extends s {
      loadEventListeners() {
        this.addEventListener("muteTabButtonClicked", (e) => {
          const t = e.path.find((e) => "ACTIVE-TAB" === e.tagName);
          if (!t) return !1;
          (e.detail.tabId = t.id), (e.detail.muted = "true" == t.muted);
        });
      }
      addArray(e) {
        return (
          this.sort === i.DESCENDING
            ? this.appendChild(this.builder.tabs(e.reverse()))
            : this.appendChild(this.builder.tabs(e)),
          this.dispatchEvent(
            new CustomEvent("tabsChanged", {
              detail: { tabCount: this.count },
              bubbles: !0,
            })
          )
        );
      }
      add(e) {
        return (
          !this.contains(e.id) &&
          (this.sort === i.DESCENDING
            ? e.index === this.count
              ? this.insertBefore(
                  this.builder.tab(e, this.filter),
                  this.firstElementChild
                )
              : e.index
              ? this.insertBefore(
                  this.builder.tab(e, this.filter),
                  this.getByIndex(this.count - e.index)
                )
              : this.appendChild(this.builder.tab(e, this.filter))
            : e.index === this.count
            ? this.appendChild(this.builder.tab(e, this.filter))
            : e.index
            ? this.insertBefore(
                this.builder.tab(e, this.filter),
                this.getByIndex(e.index)
              )
            : this.insertBefore(
                this.builder.tab(e, this.filter),
                this.firstElementChild
              ),
          this.dispatchEvent(
            new CustomEvent("tabsChanged", {
              detail: { tabCount: this.count },
              bubbles: !0,
            })
          ))
        );
      }
    }
    customElements.define("active-tabs", ActiveTabs), (e.exports = ActiveTabs);
  },
  function (e, t, n) {
    var s = n(211);
    class ActiveHostnames extends s {
      loadEventListeners() {}
    }
    customElements.define("active-hostnames", ActiveHostnames),
      (e.exports = ActiveHostnames);
  },
  function (e, t, n) {
    const s = n(10);
    function i(e, t, n) {
      var s = "other";
      return (
        n && (s = a(n)),
        [
          s,
          { title: n || "other", iconUrl: t || null, tabs: e, count: e.length },
        ]
      );
    }
    function r(e, t) {
      return "other" === e[0]
        ? 1
        : e[1].count < t[1].count
        ? 1
        : e[1].count > t[1].count
        ? -1
        : 0;
    }
    function a(e) {
      return e.replace(/\./g, "-");
    }
    e.exports = class AbstractHostnames extends HTMLElement {
      constructor(e, t, n) {
        super(),
          (this.factory = e),
          (this._loadData = t || !1),
          (this.className = "hostnames"),
          (this.sort = Number(n));
      }
      _init(e) {
        return this.addArray(e), this;
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.addEventListener("removeTabs", (e) => {
            var t = this.getHostnames().map((e) =>
              e.tabs.selected.length ? e.tabs.selected : null
            );
            e.detail.tabIds = t
              .filter((e) => e)
              .reduce((e, t) => e.concat(t), []);
          }),
          this.loadEventListeners();
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented");
      }
      static get observedAttributes() {
        return ["disabled"];
      }
      attributeChangedCallback(e, t, n) {
        "disabled" === e &&
          this.getArray().forEach(function (e) {
            e.disabled = this.disabled;
          }, this);
      }
      get selected() {
        return this.getArray()
          .map(function (e) {
            return e.selected ? e.id : null;
          })
          .filter(function (e) {
            return e;
          });
      }
      setSelected(e, t) {
        var n = this.getHostnames();
        !e || e.length < 1
          ? n.forEach((e) => {
              e.clearSelected();
            })
          : 1 === e || e.length === tabs.length
          ? n.forEach((e) => {
              e.selectAll();
            })
          : console.warn("Not yet implemented");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      setAnchor(e) {
        this.clearAnchor();
        var t = this.get(e);
        return (t.anchor = !0), t;
      }
      getAnchor() {
        return this.querySelector("[anchor]") || null;
      }
      clearAnchor() {
        var e = this.getAnchor();
        return e && (e.anchor = !1), !0;
      }
      getArray(e) {
        return this.getHostnames()
          .map((e) => Array.from(e.querySelector(".tabs").children))
          .reduce((e, t) => e.concat(t), []);
      }
      addArray(e) {
        var t = document.createDocumentFragment();
        (function (e) {
          var t,
            n = new Map(),
            s = null,
            i = {};
          return (
            n.set("other", {
              title: "other",
              iconUrl: null,
              tabs: [],
              count: 0,
            }),
            e.forEach(function (e) {
              (s = a(e.hostname)),
                n.has(s)
                  ? ((i = n.get(s)).tabs.push(e), (i.count = i.tabs.length))
                  : n.set(s, {
                      title: e.hostname,
                      iconUrl: e.url,
                      tabs: [e],
                      count: 1,
                    });
            }),
            (t = n).forEach(function (e, n) {
              e.count < 2 &&
                "other" !== n &&
                (t.get("other").tabs.push(e.tabs[0]),
                (t.get("other").count = t.get("other").tabs.length),
                t.delete(n));
            }),
            t.get("other").count < 1 && t.delete("other"),
            Array.from(t).sort(r)
          );
        })(e).forEach((e) => {
          t.appendChild(this.factory.create("hostname", e, this.sort));
        }),
          this.appendChild(t),
          (t = null);
      }
      updateArray(e) {
        return this.clear(), this.addArray(e), this;
      }
      getHostnames() {
        return Array.from(this.children);
      }
      getHostname(e) {
        return this.querySelector(`[id='${e}']`);
      }
      getHostnameCount() {
        return this.getHostnames().length;
      }
      get count() {
        try {
          return this.getArray().length;
        } catch (e) {
          return 0;
        }
      }
      add(e) {
        if (this.contains(e.id))
          return (
            console.warn(
              "Failed to add tab, a tab with that id already exist."
            ),
            !1
          );
        var t = this.getHostname(a(e.hostname));
        if (t) return t.tabs.add(e);
        var n = this.getHostname("other");
        if (n) {
          if (n.tabs.getByDomain(e.hostname).length < 1) return n.tabs.add(e);
          var s = this.factory.create(
              "hostname",
              i([e], e.url, e.hostname),
              this.sort
            ),
            r = n.tabs.getByDomain(e.hostname),
            o = document.createDocumentFragment();
          return (
            r.forEach((e) => o.appendChild(e)),
            this.insertBefore(s, n),
            n.tabs.count || n.remove(),
            this.getHostname(a(e.hostname)).tabs.appendChild(o)
          );
        }
        var d = this.factory.create("hostname", i([e]), this.sort);
        return this.appendChild(d);
      }
      removeTab(e) {
        if (!this.contains(e))
          return console.warn("Trying to remove a tab that doesn't exist."), !1;
        var t = this.get(e),
          n = this.getHostname(a(t.domain)) || this.getHostname("other");
        if ("other" === n.name) return n.tabs.removeTab(e);
        if (n.tabs.getByDomain(t.domain).length > 2) return n.tabs.removeTab(e);
        n.tabs.removeTab(e);
        var s = n.tabs.getArray(),
          r = this.getHostname("other");
        if (r) return r.tabs.appendChild(s[0]), n.remove();
        var o = this.factory.create("hostname", i([]), this.sort);
        return (
          this.appendChild(o),
          this.getHostname("other").tabs.appendChild(s[0]),
          n.remove()
        );
      }
      updateTab(e) {
        var t = this.get(e.id);
        if (!t)
          return console.warn("Trying to update a tab that doesn't exist."), !1;
        if (t.domain === e.hostname) return t.update(e);
        var n = this.getHostname(a(e.hostname)),
          s = this.getHostname(a(t.domain)) || this.getHostname("other"),
          r = this.getHostname("other"),
          o = null,
          d = document.createDocumentFragment(),
          c = [];
        return n
          ? (t.update(e),
            n.tabs.appendChild(t),
            "other" === s.name
              ? void (s.tabs.count || s.remove())
              : r && s.tabs.count < 2
              ? (s.tabs.getArray().forEach((e) => r.tabs.appendChild(e)),
                s.remove())
              : !r && s.tabs.count < 2
              ? ((o = this.factory.create("hostname", i([]), this.sort)),
                this.appendChild(o),
                s.tabs.getArray().forEach((e) => d.appendChild(e)),
                o.tabs.appendChild(d),
                s.remove())
              : void 0)
          : r
          ? r.tabs.getByDomain(e.hostname).length > 0
            ? (t.update(e),
              (n = this.factory.create(
                "hostname",
                i([], e.url, e.hostname),
                this.sort
              )),
              this.insertBefore(n, r),
              (c = r.tabs.getByDomain(e.hostname)).push(t),
              c.forEach((e) => d.appendChild(e)),
              n.tabs.appendChild(d),
              void ("other" === s.name
                ? r.tabs.count || r.remove()
                : s.tabs.count < 2 &&
                  (s.tabs.getArray().forEach((e) => r.tabs.appendChild(e)),
                  s.remove())))
            : (t.update(e),
              void (
                "other" !== s.name &&
                (r.tabs.appendChild(t),
                s.tabs.count < 2 &&
                  (s.tabs.getArray().forEach((e) => r.tabs.appendChild(e)),
                  s.remove()))
              ))
          : (t.update(e),
            (o = this.factory.create("hostname", i([]), this.sort)),
            this.appendChild(o),
            o.tabs.appendChild(t),
            void (
              s.tabs.count < 2 &&
              (s.tabs.getArray().forEach((e) => o.tabs.appendChild(e)),
              s.remove())
            ));
      }
      moveTab(e, t) {}
      get(e) {
        return this.querySelector(`[id='${e}']`);
      }
      getByIndex(e) {
        return e < 0
          ? (console.error("Trying to access negative index."), null)
          : this.getArray()[e];
      }
      getByIndexRange(e, t) {
        return s.range(e, t).map(function (e) {
          return this.getByIndex(e);
        }, this);
      }
      getTabs(e) {
        return e.map((e) => this.get(e)).filter((e) => e);
      }
      removeTabs(e) {
        return e.every(function (e) {
          return this.removeTab(e);
        }, this);
      }
      indexOf(e) {
        return this.getArray()
          .map((e) => e.id)
          .indexOf(e);
      }
      insert(e, t) {
        return 0 === e
          ? this.insertBefore(t, this.firstChild)
          : this.insertBefore(t, this.getByIndex(e).nextSibling);
      }
      removeAt(e) {
        return this.getByIndex(e).remove();
      }
      contains(e) {
        return this.get(e);
      }
      clear() {
        return s.clearElement(this);
      }
      hide() {
        this.setAttribute("hidden", !0), (this.style.display = "none");
      }
      show() {
        this.removeAttribute("hidden", !1), (this.style.display = "block");
      }
      setFilter() {}
      clearFilter() {}
      get visibleCount() {
        return 1;
      }
    };
  },
  function (e, t, n) {
    var s = n(213);
    class ActiveHostname extends s {
      loadEventListeners() {
        this.removeButton.addEventListener("click", (e) =>
          this.dispatchEvent(
            new CustomEvent("closeHostnameClicked", {
              detail: { tabs: this.tabs.getArray() },
              bubbles: !0,
            })
          )
        ),
          this.openNewWinButton.addEventListener("click", (e) =>
            this.dispatchEvent(
              new CustomEvent("openHostnameNewClicked", {
                detail: {
                  tabIds: this.getTabIds(),
                  urls: this.tabs.getArray().map((e) => e.link),
                },
                bubbles: !0,
              })
            )
          ),
          this.header.addEventListener("keydown", (e) => {
            if (
              e.target === this.header.activeElement &&
              ("Delete" === e.key || "Backspace" === e.key)
            )
              switch ((e.preventDefault(), e.key)) {
                case "Delete":
                case "Backspace":
                  return this.dispatchEvent(
                    new CustomEvent("closeHostnameClicked", {
                      detail: { tabs: this.tabs.getArray() },
                      bubbles: !0,
                    })
                  );
              }
          });
      }
      get removeButton() {
        return this.querySelector(".remove-button");
      }
      get openNewWinButton() {
        return this.querySelector(".open-button");
      }
    }
    customElements.define("active-hostname", ActiveHostname),
      (e.exports = ActiveHostname);
  },
  function (e, t, n) {
    const s = n(10);
    e.exports = class AbstractHostname extends HTMLElement {
      constructor(e, t, n) {
        super(),
          (this.factory = e),
          (this._loadData = t || !1),
          (this.sort = n),
          (this.className = "hostname");
      }
      _init(e) {
        this.id = e[0];
        var t = this.factory.create("header", e[1]),
          n = this.factory.create("tabs", e[1].tabs, this.sort);
        return (
          this.appendChild(t),
          this.appendChild(n),
          (this.tabs = this.querySelector(this.factory.getName("tabs"))),
          (this.header = this.querySelector(this.factory.getName("header"))),
          this.tabs.getArray().forEach((e) => {
            e.draggable = !1;
          }),
          this
        );
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.header.addEventListener("headerClick", (e) => {
            this.tabs.clearAnchor(),
              e.detail.checked ? this.selectAll() : this.clearSelected();
          }),
          this.tabs.addEventListener("selectChange", (e) => {
            e.detail.selected
              ? this.header.checkbox || (this.header.checkbox = !0)
              : this.header.checkbox &&
                this.selectedTabs.length < 1 &&
                (this.header.checkbox = !1);
          }),
          this.header.addEventListener("collapseWindow", (e) => {
            this.collapsed = !0;
          }),
          this.header.addEventListener("expandWindow", (e) => {
            this.collapsed = !1;
          }),
          this.header.addEventListener("keydown", (e) => {
            if (
              e.target === this.header.activeElement &&
              this.header.focused &&
              ("ArrowDown" === e.key ||
                "ArrowRight" === e.key ||
                "ArrowLeft" === e.key)
            )
              switch ((e.preventDefault(), e.key)) {
                case "ArrowDown":
                  var t = this.tabs.getByIndex(0);
                  t.linkAnchor.focus(),
                    t.linkAnchor.dispatchEvent(new CustomEvent("focusin"));
                  break;
                case "ArrowRight":
                  return (this.collapsed = !1);
                case "ArrowLeft":
                  return (this.collapsed = !0);
              }
          }),
          this.loadEventListeners();
      }
      static get observedAttributes() {
        return ["collapsed"];
      }
      attributeChangedCallback(e, t, n) {
        switch (e) {
          case "collapsed":
            (t = "true" === t),
              (n = "true" === n) &&
                !t &&
                (this.header.toggleCollapseButton(), this.tabs.hide()),
              !n && t && (this.header.toggleCollapseButton(), this.tabs.show());
            break;
          default:
            return !1;
        }
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented");
      }
      set selected(e) {
        this.setAttribute("selected", !!e);
      }
      get selected() {
        return "true" === this.getAttribute("selected");
      }
      get selectedTabs() {
        return this.tabs.selected;
      }
      set collapsed(e) {
        this.setAttribute("collapsed", !!e);
      }
      get collapsed() {
        return "true" === this.getAttribute("collapsed");
      }
      get name() {
        return this.header.title;
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      selectAll() {
        return this.tabs.setSelected(1, !0);
      }
      selectTabs(e, t) {
        return this.tabs.setSelected(e, t);
      }
      clearSelected() {
        return this.tabs.setSelected(0);
      }
      clear() {
        return (
          (this.header.checked = !1),
          s.clearElement(this.querySelector(".tabs"))
        );
      }
      update(e) {
        this.clear();
      }
      getTabIds() {
        return this.tabs.getArray().map((e) => e.id);
      }
    };
  },
  function (e, t, n) {
    var s = n(215);
    class ActiveHostnameHeader extends s {
      loadEventListeners() {}
    }
    customElements.define("active-hostname-header", ActiveHostnameHeader),
      (e.exports = ActiveHostnameHeader);
  },
  function (e, t) {
    var n = "fold-icon",
      s = "unfold-icon";
    e.exports = class AbstractHostnameHeader extends HTMLElement {
      constructor(e, t) {
        super(),
          (this.builder = e),
          (this._loadData = t || !1),
          (this.className = "hostname-header");
      }
      _init(e) {
        this.appendChild(this.builder(e));
      }
      connectedCallback() {
        this._loadData && (this._init(this._loadData), (this._loadData = !1)),
          this.addEventListener("click", (e) => {
            const t = this.querySelector(".hostname-checkbox");
            return (
              e.target === t || t.contains(e.target)
                ? (this.checked = !this.checked)
                : (this.checked = !1),
              this.dispatchEvent(
                new CustomEvent("headerClick", {
                  detail: { checked: this.checked },
                  bubbles: !0,
                })
              )
            );
          }),
          this.collapseButton().addEventListener("click", (e) =>
            this.collapseButton().querySelector(".icon").classList.contains(n)
              ? this.dispatchEvent(
                  new CustomEvent("collapseWindow", { bubbles: !0 })
                )
              : this.dispatchEvent(
                  new CustomEvent("expandWindow", { bubbles: !0 })
                )
          ),
          this.addEventListener("dblclick", (e) => {
            e.stopImmediatePropagation();
            const t = this.querySelector(".hostname-checkbox");
            if (e.target !== t && !t.contains(e.target))
              return this.collapseButton()
                .querySelector(".icon")
                .classList.contains(n)
                ? this.dispatchEvent(
                    new CustomEvent("collapseWindow", { bubbles: !0 })
                  )
                : this.dispatchEvent(
                    new CustomEvent("expandWindow", { bubbles: !0 })
                  );
          }),
          this.addEventListener("focusin", (e) => {
            var t = this.querySelector(".hostname-checkbox"),
              n = this.querySelector(".hostname-checkbox:active");
            return (
              e.target === t && !n && (e.target.parentElement.focused = !0)
            );
          }),
          this.addEventListener(
            "focusout",
            (e) =>
              e.target === this.querySelector(".hostname-checkbox") &&
              (e.target.parentElement.focused = !1)
          ),
          this.loadEventListeners();
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented.");
      }
      static get observedAttributes() {
        return ["checked"];
      }
      attributeChangedCallback(e, t, n) {
        "checked" === e &&
          (this.checked
            ? this.checkbox || (this.checkbox = !0)
            : this.checkbox && (this.checkbox = !1));
      }
      set checked(e) {
        if (this.disabled) return !1;
        e ? this.setAttribute("checked", "") : this.removeAttribute("checked");
      }
      get checked() {
        return this.hasAttribute("checked");
      }
      get checkbox() {
        return this.querySelector(".hostname-checkbox").checked;
      }
      set checkbox(e) {
        var t = this.querySelector(".hostname-checkbox");
        return (
          (t.checked = e),
          (this.checked = e),
          t.dispatchEvent(new Event("change", { bubbles: !0 })),
          t
        );
      }
      get activeElement() {
        return this.querySelector(":focus");
      }
      get title() {
        return this.querySelector(".hostname-title").textContent;
      }
      set title(e) {
        this.querySelector(".hostname-title").textContent = e;
      }
      get icon() {
        return this.querySelector(".hostname-icon").style.backgroundImage;
      }
      set icon(e) {
        this.querySelector(".hostname-icon").style.backgroundImage =
          buildWinIcon(e);
      }
      set focused(e) {
        e ? this.setAttribute("focused", "") : this.removeAttribute("focused");
      }
      get focused() {
        return this.hasAttribute("focused");
      }
      update(e) {
        (this.title = e.title), (this.icon = e.icon);
      }
      collapseButton() {
        return this.querySelector(".collapse-button");
      }
      toggleCollapseButton() {
        var e = this.collapseButton().querySelector(".icon");
        return e.classList.contains(n)
          ? (e.classList.remove(n), e.classList.add(s), !1)
          : e.classList.contains(s)
          ? (e.classList.remove(s), e.classList.add(n), !0)
          : void 0;
      }
    };
  },
  function (e, t, n) {
    var s = n(84);
    class SavedHeader extends s {
      loadEventListeners() {}
      get renameWinModal() {
        return this.querySelector("rename-win-modal");
      }
      get renameWinButton() {
        return this.querySelector("rename-win-button");
      }
    }
    customElements.define("saved-header", SavedHeader),
      (e.exports = SavedHeader);
  },
  function (e, t, n) {
    var s = n(85);
    const i = n(10);
    var r = new (function () {
      (this.movedTab = null),
        (this.movedWinId = null),
        (this.targetTab = null),
        (this.targetWinId = null),
        (this.isMoved = !1),
        (this.toIndex = null),
        (this.reset = function () {
          for (var e in this)
            this.hasOwnProperty(e) && "reset" !== e && (this[e] = null);
        });
    })();
    class SavedWin extends s {
      get id() {
        return this.getAttribute("id");
      }
      set id(e) {
        return this.setAttribute("id", e);
      }
      static get observedAttributes() {
        return this.observed;
      }
      attributeChangedCallback(e, t, n) {
        return this.attributeChangedBase(e, t, n);
      }
      loadEventListeners() {
        this.header.renameWinModal.addEventListener("renameWinClicked", (e) => {
          e.detail.winId = this.id;
        }),
          this.header.renameWinButton.addEventListener(
            "renameWinButtonClicked",
            (e) =>
              this.header.renameWinModal.hidden
                ? ((e.detail.winId = this.id),
                  this.header.renameWinModal.show(),
                  this.header.renameWinModal.inputBox.focus())
                : this.header.renameWinModal.hide()
          ),
          this.moreDropdownButton.addEventListener(
            "exportWindowClicked",
            (e) => {
              e.detail.winId = this.id;
            }
          ),
          this.removeButton.addEventListener(
            "click",
            (e) =>
              this.dispatchEvent(
                new CustomEvent("removeWinClicked", {
                  detail: { winId: this.id },
                  bubbles: !0,
                })
              ),
            !1
          ),
          this.addEventListener(
            "removeTabClicked",
            (e) => {
              e.detail.winId = this.id;
            },
            !1
          ),
          this.addEventListener(
            "dragstart",
            (e) => {
              if (
                ((e.dataTransfer.effectAllowed = "move"),
                (e.dataTransfer.dropEffect = "move"),
                "tab" === e.target.className)
              )
                return (
                  this.clearSelected(),
                  (r.movedTab = this.tabs.get(e.target.id)),
                  (r.movedWinId = this.id),
                  e.dataTransfer.setData("text", e.target.id)
                );
            },
            !1
          ),
          this.addEventListener(
            "dragover",
            (e) => {
              (e.dataTransfer.dropEffect = "move"), e.preventDefault();
              var t = i.getParentByClass(e.target, "tab");
              if (t && t !== r.movedTab) {
                (r.targetTab = t), (r.targetWinId = this.id);
                var n = t.getBoundingClientRect(),
                  s = n.y + n.height / 2;
                if (e.clientY - s > 0) {
                  if (t.nextElementSibling !== r.movedTab)
                    return (
                      (r.isMoved = !0),
                      (r.toIndex = this.tabs.indexOf(t.id)),
                      t.nextElementSibling
                        ? this.tabs.insertBefore(
                            r.movedTab,
                            t.nextElementSibling
                          )
                        : ((0 !== r.toIndex &&
                            r.toIndex !== this.tabs.count - 1) ||
                            (r.toIndex += 1),
                          this.tabs.appendChild(r.movedTab))
                    );
                } else if (t.previousElementSibling !== r.movedTab)
                  return (
                    (r.isMoved = !0),
                    (r.toIndex = this.tabs.indexOf(t.id)),
                    this.tabs.insertBefore(r.movedTab, t)
                  );
              }
            },
            !1
          ),
          this.addEventListener(
            "drop",
            (e) => {
              if ((e.preventDefault(), r.targetTab && r.isMoved)) {
                r.toIndex < 0 || r.toIndex;
                return r.targetWinId === r.movedWinId
                  ? (a.call(
                      this,
                      r.movedWinId,
                      r.movedWinId,
                      [r.movedTab.id],
                      r.toIndex
                    ),
                    r.reset())
                  : (a.call(
                      this,
                      r.movedWinId,
                      r.targetWinId,
                      [r.movedTab.id],
                      r.toIndex
                    ),
                    r.reset());
              }
            },
            !1
          ),
          this.addEventListener("dragend", (e) => {
            if (r.isMoved)
              return (
                this.dispatchEvent(
                  new CustomEvent("updateSavedWinTabs", {
                    detail: { winId: r.movedWinId },
                    bubbles: !0,
                  })
                ),
                r.targetWinId !== r.movedWinId &&
                  this.dispatchEvent(
                    new CustomEvent("updateSavedWinTabs", {
                      detail: { winId: r.targetWinId },
                      bubbles: !0,
                    })
                  ),
                r.reset()
              );
          });
      }
      get removeButton() {
        return this.querySelector(".remove-button");
      }
      get moreDropdownButton() {
        return this.querySelector("more-dropdown-button");
      }
      sortTabs() {}
      update(e) {
        return (
          this.clearSelected(),
          (this.title = e.title),
          this.tabs.updateArray(e.tabs),
          !0
        );
      }
    }
    function a(e, t, n, s) {
      return this.dispatchEvent(
        new CustomEvent("savedTabsMoved", {
          detail: { winId: e, targetWinId: t, tabIds: n, toIndex: s },
          bubbles: !0,
        })
      );
    }
    customElements.define("saved-win", SavedWin), (e.exports = SavedWin);
  },
  function (e, t, n) {
    var s = n(86);
    class SavedTab extends s {
      get id() {
        return this.getAttribute("id");
      }
      set id(e) {
        this.setAttribute("id", e);
      }
      loadEventListeners() {}
      get removeButton() {
        return this.querySelector(".remove-button");
      }
    }
    customElements.define("saved-tab", SavedTab), (e.exports = SavedTab);
  },
  function (e, t, n) {
    var s = n(87);
    n(10);
    class SavedTabs extends s {
      loadEventListeners() {}
      addArray(e) {
        return (
          this.appendChild(this.builder.tabs(e)),
          this.dispatchEvent(
            new CustomEvent("tabsChanged", {
              detail: { tabCount: this.count },
              bubbles: !0,
            })
          )
        );
      }
      add(e) {
        return (
          !this.contains(e.id) &&
          (this.appendChild(this.builder.tab(e, this.filter)),
          this.dispatchEvent(
            new CustomEvent("tabsChanged", {
              detail: { tabCount: this.count },
              bubbles: !0,
            })
          ))
        );
      }
    }
    customElements.define("saved-tabs", SavedTabs), (e.exports = SavedTabs);
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "save-as-button",
      class SaveAsButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if ((e.stopPropagation(), !this.disabled))
              return this.dispatchEvent(
                new CustomEvent("openSaveAsWinButtonClicked", {
                  detail: {},
                  bubbles: !0,
                })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "close-win-button",
      class CloseWinButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("closeWinButtonClicked", { bubbles: !0 })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "suspend-win-button",
      class SuspendWinButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return (
                (this.disabled = !0),
                setTimeout(() => {
                  this.disabled = !1;
                }, 3e3),
                this.dispatchEvent(
                  new CustomEvent("suspendWinButtonClicked", {
                    detail: { winId: null },
                    bubbles: !0,
                  })
                )
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "rename-win-button",
      class RenameWinButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if ((e.stopPropagation(), !this.disabled))
              return this.dispatchEvent(
                new CustomEvent("renameWinButtonClicked", {
                  detail: {},
                  bubbles: !0,
                })
              );
          });
        }
      }
    );
  },
  function (e, t) {
    const n =
      "<form class='rename-win-form'>\n    <div class='top-content'>\n      <label>Rename window</label>\n      <input name='window-name' class='rename-input-form' placeholder='Window Name' type='text' maxlength='64' required autofocus value=\"window\">\n    </div>\n    <div class='button-group'>\n      <div class='select-buttons'>\n        <button type=button class='cancel-form-button select-button'>Cancel</button>\n        <button type=submit class='save-form-button select-button'>Save</button>\n      </div>\n    </div>\n  </form>";
    class RenameWinModal extends HTMLElement {
      constructor() {
        super(), (this.loaded = !1);
      }
      static get observedAttributes() {
        return ["hidden"];
      }
      connectedCallback() {
        if (!this.loaded) {
          var e = document.createElement("div");
          e.classList.add("modal-content"),
            (e.innerHTML = n),
            this.appendChild(e),
            this.loadEventListeners(),
            (this.loaded = !0);
        }
      }
      attributeChangedCallback(e, t, n) {
        if ("hidden" === e && !this.hasAttribute("hidden")) return this.reset();
      }
      loadEventListeners() {
        window.addEventListener(
          "click",
          (e) => {
            if (!this.hidden && !this.contains(e.target)) return this.hide();
          },
          !1
        ),
          this.modalForm.addEventListener(
            "submit",
            (e) => (
              e.preventDefault(),
              this.dispatchEvent(
                new CustomEvent("renameWinClicked", {
                  detail: { title: this.inputBox.value },
                  bubbles: !0,
                })
              ),
              this.hide()
            ),
            !1
          ),
          this.cancelButton.addEventListener("click", (e) => this.hide());
      }
      hide() {
        this.setAttribute("hidden", "");
      }
      show() {
        this.removeAttribute("hidden");
      }
      reset() {
        this.inputBox.setCustomValidity(""),
          this.modalForm.reset(),
          (this.inputBox.disabled = !1);
      }
      get hidden() {
        return this.hasAttribute("hidden");
      }
      get inputBox() {
        return this.querySelector(".rename-input-form");
      }
      get modalForm() {
        return this.querySelector(".rename-win-form");
      }
      get saveButton() {
        return this.querySelector(".save-form-button");
      }
      get cancelButton() {
        return this.querySelector(".cancel-form-button");
      }
    }
    customElements.define("rename-win-modal", RenameWinModal),
      (e.exports = RenameWinModal);
  },
  function (e, t) {
    class SaveWinModal extends HTMLElement {
      constructor() {
        super(), (this.loaded = !1);
      }
      static get observedAttributes() {
        return ["hidden"];
      }
      connectedCallback() {
        if (!this.loaded) {
          const e = document.querySelector("#savewin-modal-template"),
            t = document.importNode(e.content, !0);
          this.appendChild(t), this.loadEventListeners(), (this.loaded = !0);
        }
      }
      attributeChangedCallback(e, t, n) {
        if ("hidden" === e && !this.hasAttribute("hidden")) return this.reset();
      }
      loadEventListeners() {
        window.addEventListener(
          "click",
          (e) => {
            if (!this.hidden && !this.contains(e.target)) return this.hide();
          },
          !1
        ),
          this.selector.addEventListener(
            "change",
            (e) => {
              "new" !== e.target.value
                ? (this.inputBox.disabled = !0)
                : (this.inputBox.disabled = !1);
            },
            !1
          ),
          this.modalForm.addEventListener(
            "submit",
            (e) => (
              e.preventDefault(),
              "new" === this.selector.value
                ? this.dispatchEvent(
                    new CustomEvent("saveNewWinClicked", {
                      detail: {
                        title: this.inputBox.value,
                        closeOnSave: this.closeWinCheckbox.checked,
                      },
                      bubbles: !0,
                    })
                  )
                : this.dispatchEvent(
                    new CustomEvent("saveWinClicked", {
                      detail: {
                        targetId: this.selector.value,
                        closeOnSave: this.closeWinCheckbox.checked,
                      },
                      bubbles: !0,
                    })
                  ),
              this.hide()
            ),
            !1
          ),
          this.cancelButton.addEventListener("click", (e) => this.hide());
      }
      hide() {
        this.setAttribute("hidden", "");
      }
      show() {
        this.removeAttribute("hidden");
      }
      setOptions(e) {
        const t = this.selector;
        for (; t.hasChildNodes(); ) t.removeChild(t.lastChild);
        let n = document.createElement("option");
        return (
          (n.value = "new"),
          (n.textContent = "New Window"),
          t.appendChild(n),
          this._renderOptions(e, t)
        );
      }
      _renderOptions(e, t) {
        if (e.length) {
          var n = document.createDocumentFragment(),
            s = {};
          return (
            e.forEach(
              (e) => (
                ((s = document.createElement("option")).value = e.id),
                (s.textContent = e.title),
                n.appendChild(s)
              )
            ),
            t.appendChild(n)
          );
        }
      }
      reset() {
        this.inputBox.setCustomValidity(""),
          this.modalForm.reset(),
          (this.selector.value = "new"),
          (this.inputBox.disabled = !1);
      }
      get hidden() {
        return this.hasAttribute("hidden");
      }
      get inputBox() {
        return this.querySelector(".save-input-form");
      }
      get modalForm() {
        return this.querySelector(".savewin-form");
      }
      get saveButton() {
        return this.querySelector(".save-form-button");
      }
      get cancelButton() {
        return this.querySelector(".cancel-form-button");
      }
      get closeWinCheckbox() {
        return this.querySelector(".close-win-checkbox");
      }
      get selector() {
        return this.querySelector(".save-selector select");
      }
    }
    customElements.define("savewin-modal", SaveWinModal),
      (e.exports = SaveWinModal);
  },
  function (e, t, n) {
    var s = n(29);
    class MoreDropdownButton extends s {
      loadEventListeners() {
        Array.from(this.content.children).forEach((e) => {
          e.addEventListener("click", (e) => {
            if (!e.target.dataset) return !1;
            if (e.target.dataset.export)
              return this.dispatchEvent(
                new CustomEvent("exportWindowClicked", {
                  detail: { export: e.target.dataset.export },
                  bubbles: !0,
                })
              );
            if (e.target.dataset.type) {
              if ("remove-duplicates" === e.target.dataset.type)
                return this.dispatchEvent(
                  new CustomEvent("removeDuplicatesClicked", {
                    detail: { winId: null },
                    bubbles: !0,
                  })
                );
              if ("quick-sort" === e.target.dataset.type)
                return this.dispatchEvent(
                  new CustomEvent("quickSortClicked", {
                    detail: { winId: null },
                    bubbles: !0,
                  })
                );
            }
            return !1;
          });
        });
      }
    }
    customElements.define("more-dropdown-button", MoreDropdownButton),
      (e.exports = MoreDropdownButton);
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "open-in-new-win-button",
      class OpenInNewWindowButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("openInNewWindowButtonClicked", {
                  detail: { winId: null },
                  bubbles: !0,
                })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "mute-tab-button",
      class MuteTabButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if ((e.preventDefault(), e.stopPropagation(), !this.disabled))
              return this.dispatchEvent(
                new CustomEvent("muteTabButtonClicked", {
                  detail: { tabId: null, muted: !1 },
                  bubbles: !0,
                })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    const s = n(46);
    var i = n(47);
    n(230);
    function r(e, t = null) {
      return Array.from(e.getArray())
        .map((e) => ({ title: e.title, id: e.id }))
        .filter((e) => e.id !== t);
    }
    function a(e) {
      return { url: e.link, title: e.title, hostname: e.domain };
    }
    e.exports = class ActivePanelController {
      constructor(e, t, n, s) {
        (this.activeListPanel = e),
          (this.activeListController = t),
          (this.command = n),
          (this.searching = !1),
          (this.alertPopup = s);
      }
      init(e) {
        this.update(e), this.loadEventListeners();
      }
      update(e) {
        e && (this.activeListPanel.sort = e.sortMethod);
        const t = Array.from(this.activeListController.activeList.getArray());
        this.activeListPanel.mergeButton.disabled = !(t.length > 1);
        const n = document.querySelector("#display-columns");
        let s = this.activeListPanel.columnButton.icon;
        n.checked
          ? (s.classList.remove("column-icon"), s.classList.add("list-icon"))
          : (s.classList.remove("list-icon"), s.classList.add("column-icon"));
        const i = this.activeListController.activeList
          .getArray()
          .every((e) => e.collapsed);
        this.activeListPanel.expandWindowsButton.expand = i;
      }
      sync(e, t) {
        if (e)
          return (
            t
              ? (this.activeListPanel.syncButton.status = "license")
              : ((this.activeListPanel.syncButton.status = "signedin"),
                chrome.storage.local.get("hideLicenseAlert", (e) => {
                  e.hasOwnProperty("hideLicenseAlert") ||
                    (this.alertPopup.showNoLicense(),
                    chrome.storage.local.set({ hideLicenseAlert: !0 }));
                })),
            this.activeListPanel.syncButton.renderMenu(e)
          );
        this.activeListPanel.syncButton.status = "default";
      }
      loadEventListeners() {
        this.activeListPanel.expandWindowsButton.addEventListener(
          "expandWindowsButtonClicked",
          (e) => {
            const t = this.activeListController.activeList
              .getArray()
              .every((e) => e.collapsed);
            return (
              (this.activeListPanel.expandWindowsButton.expand = !t),
              (this.activeListController.activeList.collapsed = !t)
            );
          }
        ),
          this.activeListPanel.mergeButton.addEventListener(
            "mergeApplyButtonClicked",
            (e) => {
              s.sendMergeActiveWindows({ selected: e.detail.selected });
            }
          ),
          this.activeListPanel.addEventListener(
            "mergeWindowsDropdownOpen",
            (e) => {
              const t = r(this.activeListController.activeList);
              return this.activeListPanel.mergeButton.setContent(t);
            }
          ),
          this.activeListPanel.addEventListener("moveTabsDropdownOpen", (e) => {
            const t = this.activeListController.activeList.checked;
            if (!t) return !1;
            const n = r(this.activeListController.activeList, Number(t.id));
            return this.activeListPanel.moveButton.setContent(n);
          }),
          this.activeListPanel.addEventListener("saveToDropdownOpen", (e) =>
            s
              .sendGetSavedWindows()
              .then((e) =>
                e
                  ? Array.from(e).map((e) => ({
                      title: e.title,
                      id: e.id,
                      meta: i(e.lastModified, "mmm d, yyyy"),
                    }))
                  : []
              )
              .then((e) => this.activeListPanel.saveToButton.menu.setItems(e))
          ),
          this.activeListPanel.addEventListener("themeButtonClicked", (e) =>
            document.querySelector("#dark-theme").click()
          ),
          this.activeListPanel.addEventListener("columnButtonClicked", (e) => {
            const t = document.querySelector("#display-columns");
            let n = this.activeListPanel.columnButton.icon;
            return (
              t.checked
                ? (n.classList.remove("list-icon"),
                  n.classList.add("column-icon"))
                : (n.classList.remove("column-icon"),
                  n.classList.add("list-icon")),
              t.click()
            );
          }),
          this.activeListPanel.addEventListener("exportWindowsClicked", (e) => {
            console.log("export clicked", e.detail);
          }),
          this.activeListPanel.addEventListener(
            "signoutButtonClicked",
            (e) => s.sendSignOut(),
            !1
          ),
          this.activeListPanel.addEventListener(
            "syncButtonClicked",
            (e) =>
              s.sendSignIn().then((e) => {
                if (!e)
                  return s.sendErrorAlert({ message: "Failed to login user" });
              }),
            !1
          ),
          this.command.target.addEventListener("commandUndo", (e) => {
            e.count || (this.activeListPanel.undoButton.disabled = !0);
          }),
          this.command.target.addEventListener("commandExecuted", (e) => {
            this.activeListPanel.undoButton.disabled = !1;
          }),
          this.activeListPanel.addEventListener("closeUndoButtonClicked", (e) =>
            this.command.undo()
          ),
          this.activeListController.activeList.addEventListener(
            "winCheckedChange",
            (e) => {
              e.detail.checked
                ? ((this.activeListPanel.closeTabsButton.disabled = !1),
                  (this.activeListPanel.moveButton.disabled = !1),
                  (this.activeListPanel.saveToButton.disabled = !1))
                : ((this.activeListPanel.closeTabsButton.disabled = !0),
                  (this.activeListPanel.moveButton.disabled = !0),
                  (this.activeListPanel.saveToButton.disabled = !0));
            }
          ),
          this.activeListPanel.addEventListener(
            "saveToListItemClicked",
            (e) => {
              const t = this.activeListController.activeList.checked;
              if (t) {
                var n = t.selectedTabs;
                return s.sendCreateSavedTabs({
                  winId: e.detail.id,
                  tabs: t.tabs.getTabs(n).map(a),
                });
              }
            }
          ),
          this.activeListPanel.addEventListener(
            "moveTabsButtonClicked",
            (e) => {
              var t = this.activeListController.activeList.checked,
                n = null;
              if (
                ("new" !== e.detail.winId &&
                  (n = this.activeListController.activeList.get(
                    e.detail.winId
                  ).id),
                t)
              )
                return s.sendMoveTabs({
                  tabIds: t.selectedTabs,
                  targetWinId: n || null,
                  index: null,
                });
            }
          ),
          this.activeListPanel.addEventListener(
            "closeTabsButtonClicked",
            (e) => {
              var t = this.activeListController.activeList.checked;
              if (t) {
                var n = t.selectedTabs,
                  i = this.command.create(s.sendRemoveTabs, s.sendCreateTabs, {
                    tabIds: n,
                    winId: t.id,
                    urls: t.tabs.getTabs(n).map((e) => e.link),
                  });
                return this.command.execute(i);
              }
            }
          ),
          this.activeListPanel.addEventListener("sortTabsButtonClicked", (e) =>
            this.activeListController.setTabsSort(Number(e.detail.sort))
          ),
          this.activeListPanel.searchField.addEventListener(
            "search",
            (e) => (
              (this.searching = !0),
              "" === e.target.value
                ? ((this.searching = !1),
                  this.activeListController.clearSearch())
                : this.activeListController.activeList.sortTabsMethod > 1
                ? this.activeListController
                    .setTabsSort(0)
                    .then(
                      () => (
                        (this.activeListPanel.sort = 0),
                        this.activeListController.search(e.target.value)
                      )
                    )
                : this.activeListController.search(e.target.value)
            )
          ),
          this.activeListPanel.searchField.addEventListener("keyup", (e) =>
            this.activeListPanel.searchField.dispatchEvent(new Event("search"))
          );
      }
    };
  },
  function (e, t, n) {
    var s = n(88),
      i = ["sort-asc", "sort-desc", "sort-domain"];
    n(231),
      n(232),
      n(233),
      n(234),
      n(235),
      n(236),
      n(237),
      n(238),
      n(240),
      n(241),
      n(242);
    class ActiveListPanel extends s {
      connectedCallback() {
        (this.moveButton = this.querySelector("move-dropdown-button")),
          (this.saveToButton = this.querySelector("saveto-dropdown-button")),
          (this.closeTabsButton = this.querySelector("close-tabs-button")),
          (this.sortButton = this.querySelector("sort-dropdown-button")),
          (this.undoButton = this.querySelector("close-undo-button")),
          (this.searchField = this.querySelector("#active-search")),
          (this.syncButton = this.querySelector("sync-button")),
          (this.columnButton = this.querySelector("column-button")),
          (this.themeButton = this.querySelector("theme-button")),
          (this.mergeButton = this.querySelector("merge-dropdown-button")),
          (this.expandWindowsButton = this.querySelector(
            "expand-windows-button"
          ));
      }
      get sort() {
        return this.sortButton.selected;
      }
      set sort(e) {
        this.sortButton.selected = i[Number(e)];
      }
      clearSearchField() {
        this.searchField.value = "";
      }
    }
    customElements.define("activelist-panel", ActiveListPanel),
      (e.exports = ActiveListPanel);
  },
  function (e, t, n) {
    var s = n(29);
    class MoveDropdownButton extends s {
      loadEventListeners() {
        this.addEventListener("loadDropdown", (e) =>
          this.dispatchEvent(
            new CustomEvent("moveTabsDropdownOpen", { bubbles: !0 })
          )
        );
      }
      _renderContent(e) {
        e = e || [];
        var t = this.content;
        e.unshift({ title: "New Window", id: "new" });
        var n = {};
        return e.forEach((e) => {
          (n = document.createElement("div")).addEventListener("click", (e) =>
            this.dispatchEvent(
              new CustomEvent("moveTabsButtonClicked", {
                detail: { winId: e.target.dataset.moveWinId },
                bubbles: !0,
              })
            )
          ),
            "new" === e.id && n.classList.add("icon-blue"),
            (n.textContent = e.title),
            (n.dataset.moveWinId = e.id),
            t.appendChild(n);
        });
      }
    }
    customElements.define("move-dropdown-button", MoveDropdownButton),
      (e.exports = MoveDropdownButton);
  },
  function (e, t, n) {
    var s = n(29),
      i = n(10);
    class SortDropdownButton extends s {
      loadEventListeners() {
        Array.from(this.content.children).forEach((e) => {
          e.addEventListener("click", (e) => {
            var t = i.getParentElementByAttribute(e.target, "data-sort");
            return (
              this.selected !== t.id &&
              ((this.selected = t.id),
              this.dispatchEvent(
                new CustomEvent("sortTabsButtonClicked", {
                  detail: { sort: t.dataset.sort },
                  bubbles: !0,
                })
              ))
            );
          });
        });
      }
    }
    customElements.define("sort-dropdown-button", SortDropdownButton),
      (e.exports = SortDropdownButton);
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "close-tabs-button",
      class CloseTabsButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("closeTabsButtonClicked", { bubbles: !0 })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "close-undo-button",
      class CloseUndoButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("closeUndoButtonClicked", { bubbles: !0 })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "sync-button",
      class SyncButton extends s {
        constructor() {
          super();
        }
        static get observedAttributes() {
          return ["status"];
        }
        attributeChangedCallback(e, t, n) {
          switch (e) {
            case "status":
              "signedin" === n
                ? ((this.syncMenu.hidden = !1),
                  (this.buyLicenseItem.hidden = !1),
                  (this.syncing = "off"))
                : "license" === n
                ? ((this.syncMenu.hidden = !1),
                  (this.buyLicenseItem.hidden = !0),
                  (this.syncing = "on"))
                : ((this.syncMenu.hidden = !0), (this.syncing = "default"));
          }
        }
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled && !this.signedIn)
              return this.dispatchEvent(
                new CustomEvent("syncButtonClicked", { bubbles: !0 })
              );
          }),
            this.addEventListener("click", (e) => {
              if (!this.disabled && this.signedIn) return this.toggleMenu();
            }),
            window.addEventListener("click", (e) => {
              if (this.isMenuActive && !this.contains(e.target))
                return this.toggleMenu();
            }),
            this.signOutItem.addEventListener("click", (e) =>
              this.dispatchEvent(
                new CustomEvent("signoutButtonClicked", { bubbles: !0 })
              )
            ),
            this.licenseItem.addEventListener("click", (e) =>
              window.open("https://clusterwm.com/buy.html", "_blank")
            );
        }
        get status() {
          return this.getAttribute("status");
        }
        set status(e) {
          return this.setAttribute("status", e);
        }
        get licenseItem() {
          return this.querySelector(".sync-purchase-license");
        }
        get signedIn() {
          let e = this.getAttribute("status");
          return "signedin" === e || "license" === e;
        }
        get syncMenu() {
          return this.querySelector(".sync-menu");
        }
        get buyLicenseItem() {
          return this.querySelector(".sync-purchase-license");
        }
        get menuContent() {
          return this.querySelector(".menu-content");
        }
        get isMenuActive() {
          return this.menuContent.classList.contains("active");
        }
        get signOutItem() {
          return this.querySelector(".sync-signout");
        }
        toggleMenu() {
          return this.menuContent.classList.toggle("active");
        }
        get syncing() {
          return this.querySelector(".icon").classList.contains("sync-on-icon");
        }
        set syncing(e) {
          const t = this.querySelector(".icon");
          switch (e) {
            case "on":
              t.classList.remove("sync-icon"),
                t.classList.remove("sync-off-icon"),
                t.classList.add("sync-on-icon"),
                t.setAttribute("aria-label", "Sync enabled");
              break;
            case "off":
              t.classList.remove("sync-icon"),
                t.classList.remove("sync-on-icon"),
                t.classList.add("sync-off-icon"),
                t.setAttribute("aria-label", "Enable sync");
              break;
            default:
              t.classList.remove("sync-off-icon"),
                t.classList.remove("sync-on-icon"),
                t.classList.add("sync-icon"),
                t.setAttribute("aria-label", "Enable sync");
          }
        }
        renderMenu(e) {
          this.querySelector(".sync-user").querySelector(
            ".menu-item-text"
          ).textContent = e.email;
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "theme-button",
      class ThemeButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("themeButtonClicked", { bubbles: !0 })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "column-button",
      class ColumnButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("columnButtonClicked", { bubbles: !0 })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(239);
    class MergeDropdownButton extends s {
      loadEventListeners() {
        this.addEventListener("loadDropdown", (e) =>
          this.dispatchEvent(
            new CustomEvent("mergeWindowsDropdownOpen", { bubbles: !0 })
          )
        ),
          this.addEventListener("itemSelected", (e) => {
            (this.querySelector("button.apply").disabled = !(
              this.selected.length > 1
            )),
              (this.querySelector("button.clear").disabled = !(
                this.selected.length > 0
              ));
          });
      }
      _renderContent(e) {
        e = e || [];
        var t = this.content,
          n = {},
          s = document.createElement("div");
        s.classList.add("no-hover", "no-icon");
        var i = document.createElement("button");
        i.classList.add("apply", "select-button"),
          (i.textContent = "Apply"),
          i.addEventListener(
            "click",
            (e) => (
              this.dispatchEvent(
                new CustomEvent("mergeApplyButtonClicked", {
                  detail: { selected: this.selected },
                  bubbles: !0,
                })
              ),
              this.toggleDropdown()
            )
          ),
          (i.disabled = !0),
          s.appendChild(i);
        var r = document.createElement("button");
        r.classList.add("clear", "select-button"),
          (r.textContent = "Clear"),
          r.addEventListener("click", (e) => {
            this.clearSelected(),
              (this.applyButton.disabled = !0),
              (this.clearButton.disabled = !0);
          }),
          (r.disabled = !0),
          s.appendChild(r),
          t.appendChild(s),
          e.forEach((e) => {
            (n = document.createElement("div")).addEventListener(
              "click",
              (t) => (this.selected = String(e.id))
            ),
              (n.textContent = e.title),
              (n.id = e.id),
              t.appendChild(n);
          });
      }
      get applyButton() {
        return this.querySelector("button.apply");
      }
      get clearButton() {
        return this.querySelector("button.clear");
      }
    }
    customElements.define("merge-dropdown-button", MergeDropdownButton),
      (e.exports = MergeDropdownButton);
  },
  function (e, t) {
    e.exports = class MultiSelectDropdownButton extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        return (
          this.addEventListener("click", (e) => {
            if (!this.disabled && !this.content.contains(e.target))
              return this.toggleDropdown();
          }),
          window.addEventListener("click", (e) => {
            if (this.isActive() && !this.contains(e.target))
              return this.toggleDropdown();
          }),
          this.loadEventListeners()
        );
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      get content() {
        return this.querySelector(".dropdown-content");
      }
      set selected(e) {
        const t = this.selected,
          n = this.getItem(e);
        t.length && t.find((t) => t === e)
          ? n.removeAttribute("selected")
          : n.setAttribute("selected", ""),
          this.dispatchEvent(new CustomEvent("itemSelected", { bubbles: !0 }));
      }
      get selected() {
        var e = Array.from(this.content.querySelectorAll("[selected]"));
        return e.length ? e.map((e) => e.id) : [];
      }
      clearSelected() {
        const e = Array.from(this.content.querySelectorAll("[selected]"));
        return e.length ? e.map((e) => e.removeAttribute("selected")) : [];
      }
      getItem(e) {
        return this.content.querySelector('[id="' + e + '"]');
      }
      setContent(e, t) {
        for (var n = this.content; n.hasChildNodes(); )
          n.removeChild(n.lastChild);
        return this._renderContent(e, t);
      }
      _renderContent(e, t) {
        throw new Error("Abstract method not implemented.");
      }
      loadEventListeners() {
        throw new Error("Abstract method not implemented.");
      }
      isActive() {
        return this.content.classList.contains("dropdown-show");
      }
      toggleDropdown() {
        return (
          this.isActive() ||
            this.dispatchEvent(
              new CustomEvent("loadDropdown", { bubbles: !0 })
            ),
          this.content.classList.toggle("dropdown-show")
        );
      }
    };
  },
  function (e, t) {
    const n = document.createElement("template"),
      s = new CSSStyleSheet();
    s.replaceSync(
      "\n  :host {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    cursor: pointer;\n    color: black;\n    padding: 8px 12px 8px 12px;\n    text-decoration: none;\n    border-bottom: 1px solid #eeeeee;\n    border-color: var(--list-item-border-color, #eeeeee);\n    color: var(--list-item-color, #000);\n    max-width: 230px;\n    white-space: nowrap;\n    overflow: hidden;\n  }\n  :host:not([disabled])[selected]) {\n    background-color: var(--list-item-select-bg, rgba(171, 239, 205, 0.34));\n  }\n  :host(:not([disabled]):active) {\n    opacity: 0.7;\n  }\n  :host(:not([disabled]):hover) {\n    background-color: var(--list-item-hover-gb, #ebebeb);\n  }\n  slot[name=title]::slotted(*) {\n    max-width: 100px;\n    width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    margin-right: 16px;\n  }\n  slot[name=meta]::slotted(*) {\n    color: rgb(115, 119, 122);\n  }\n  slot[name=icon]::slotted(*) {\n    background-image: var(--list-item-icon, url(/res/icons/chrome.ico));\n    background-size: 16px;\n    background-position-y: center;\n    background-repeat: no-repeat;\n    height: 18px;\n    width: 18px;\n    line-height: 18px;\n    flex-shrink: 0;\n    -webkit-margin-end: 4px;\n  }\n"
    ),
      (n.innerHTML =
        "\n  <slot name='icon'></slot>\n  <slot name='title'></slot>\n  <slot name='meta'></slot>\n");
    class ListItem extends HTMLElement {
      constructor(e) {
        super();
        const t = this.attachShadow({ mode: "open" });
        t.appendChild(document.importNode(n.content, !0)),
          (t.adoptedStyleSheets = [s]),
          (this.data = e);
      }
      connectedCallback() {
        this.data && this.render_(this.data);
      }
      render_(e) {
        let t = document.createElement("span");
        (t.slot = "icon"), this.appendChild(t);
        let n = document.createElement("span");
        if (
          ((n.slot = "title"),
          (n.textContent = e.title),
          this.appendChild(n),
          e.meta)
        ) {
          let t = document.createElement("span");
          (t.slot = "meta"), (t.textContent = e.meta), this.appendChild(t);
        }
        return this;
      }
      get title() {
        return this.querySelector("[slot=title]").textContent;
      }
      set title(e) {
        return (this.querySelector("[slot=title]").textContent = e);
      }
      get meta() {
        return this.querySelector("[slot=meta]").textContent;
      }
      set meta(e) {
        return (this.querySelector("[slot=meta]").textContent = e);
      }
    }
    customElements.define("list-item", ListItem);
    const i = document.createElement("template"),
      r = new CSSStyleSheet();
    r.replaceSync(
      "\n  [hidden] {\n      display: none;\n    }\n    :host-context(.dark) {\n      --list-bg: #1A1A1B;\n      --list-border-color: #343536;\n      --border: 1px solid #343536;\n      --filter-bg: #1A1A1B;\n      --filter-color: #C4C7C9;\n      --filter-focus-bg: #0c0c0c;\n      --list-item-border-color: #343536;\n      --list-item-color: #C4C7C9;\n      --list-item-select-bg: #3366864a;\n      --list-item-hover-gb: #3366864a;\n    }\n    :host {\n      --max-height: 238px;\n      display: none;\n      contain: content;\n      position: absolute;\n      background-color: var(--list-bg, #ffffff);\n      min-width: 180px;\n      max-width: 230px;\n      max-height: var(--max-height);\n      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n      z-index: 1;\n      top: 24px;\n      right: 0px;\n      border: 1px solid var(--list-border-color, #dddddd);\n      border-radius: 3px;\n      box-sizing: border-box;\n      overflow: hidden;\n    }\n    :host([show]) {\n      display: block;\n    }\n    :host list-items {\n      display: block;\n      max-height: calc(var(--max-height) - 50px);\n      overflow-y: auto\n    }\n    :host list-actions {\n      display: block;\n      padding: 8px 12px 8px 12px;\n      border-bottom: var(--border, 1px solid #ebebeb);\n    }\n    :host list-actions input {\n      width: 100%;\n      color: var(--filter-color, #000);\n      background-color: var(--filter-bg, #fff);\n      max-width: 100%;\n      border: var(--border, 1px solid #dfe2e5);\n      border-radius: 3px;\n      padding: 6px;\n      font-size: 0.875em;\n    }\n    :host list-actions input:focus {\n      -webkit-transition: border-color 200ms;\n      border-color: rgb(77, 144, 254);\n      outline: none;\n      background-color: var(--filter-focus-bg, #fff);\n    }\n    :host list-divider {\n      display: block;\n      user-select: none;\n      border-top: var(--border, 1px solid #ebebeb);\n    }\n    ::slotted(list-item:last-child) {\n      border-bottom: none;\n    }\n  }\n"
    ),
      (i.innerHTML =
        "\n  <list-actions>\n    <input type='search' placeholder='Search...'>\n  </list-actions>\n  <list-items>\n    <slot name='item'></slot>\n  </list-items>\n");
    class DropdownFilterList extends HTMLElement {
      constructor() {
        super();
        const e = this.attachShadow({ mode: "open" });
        e.appendChild(document.importNode(i.content, !0)),
          (e.adoptedStyleSheets = [r]);
      }
      connectedCallback() {
        this.render_([
          { id: 1, title: "test", meta: "May 31, 2019" },
          { id: 2, title: "project", meta: "May 31, 2019" },
        ]),
          this.loadEventListeners();
      }
      static get observedAttributes() {
        return ["no-filter"];
      }
      attributeChangedCallback(e, t, n) {
        switch (e) {
          case "no-filter":
            return void (
              n !== t &&
              (this.shadowRoot.querySelector("list-actions").hidden =
                "true" === n)
            );
          default:
            return;
        }
      }
      loadEventListeners() {
        this.list.addEventListener("click", (e) => {
          let t = e.path.find((e) => "LIST-ITEM" === e.tagName);
          return (
            !(!t || t.hasAttribute("disabled")) &&
            (this.dispatchEvent(
              new CustomEvent("listItemClicked", {
                detail: { id: t.id },
                bubbles: !0,
              })
            ),
            !!this.hasAttribute("show") && this.toggle())
          );
        }),
          this.filterField.addEventListener("keyup", (e) =>
            this.filterField.dispatchEvent(new Event("search"))
          ),
          this.filterField.addEventListener("search", (e) => {
            this.dispatchEvent(
              new CustomEvent("listFilterChanged", {
                detail: { value: e.target.value },
                bubbles: !0,
              })
            ),
              this.clearFilter(),
              this.filter(e.target.value);
          });
      }
      get filterField() {
        return this.shadowRoot.querySelector("list-actions input");
      }
      get list() {
        return this.shadowRoot.querySelector("list-items");
      }
      get items() {
        return Array.from(this.children);
      }
      get disabled() {
        return this.hasAttribute("disabled");
      }
      set disabled(e) {
        e
          ? this.setAttribute("disabled", "")
          : this.removeAttribute("disabled");
      }
      set select(e) {
        var t = this.querySelector("[selected]");
        if (t && t.id === e) return !1;
        t && t.removeAttribute("selected"),
          Array.from(this.children).some((t) => {
            if (t.id === e) return t.setAttribute("selected", ""), !0;
          });
      }
      get selected() {
        var e = this.querySelector("[selected]");
        return e ? e.id : null;
      }
      setItems(e, t) {
        return this.render_(e, t);
      }
      toggle() {
        return this.hasAttribute("show")
          ? this.removeAttribute("show")
          : (this.dispatchEvent(
              new CustomEvent("loadingDropdown", { bubbles: !0 })
            ),
            this.setAttribute("show", ""),
            this.filterField.focus());
      }
      filter(e) {
        let t = new RegExp(`^${e}`, "i"),
          n = this.items.filter((e) => !e.textContent.match(t));
        return n.forEach((e) => e.setAttribute("hidden", "")), n;
      }
      clearFilter() {
        return this.items.forEach((e) => e.removeAttribute("hidden")), !0;
      }
      clear() {
        for (; this.hasChildNodes(); ) this.removeChild(this.lastChild);
        return !0;
      }
      render_(e = [], t) {
        if ((this.clear(), !(e = e || []).length))
          return this.appendChild(
            a({ id: 1, title: "Empty", disabled: !0, icon: !1 })
          );
        let n = document.createDocumentFragment();
        return (
          e.map((e) => a(e, t)).forEach((e) => n.appendChild(e)),
          this.appendChild(n)
        );
      }
    }
    function a(e, t) {
      let n = new ListItem(e);
      return (
        (n.slot = "item"),
        (n.id = e.id),
        e.id === t && n.setAttribute("selected", ""),
        e.disabled && n.setAttribute("disabled", ""),
        n
      );
    }
    customElements.define("dropdown-filter-list", DropdownFilterList),
      (e.exports = DropdownFilterList);
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "saveto-dropdown-button",
      class SaveToDropdownButton extends s {
        get menu() {
          return this.querySelector("[role=menu]");
        }
        loadEventListeners() {
          window.addEventListener("click", (e) => {
            if (this.contains(e.target)) return !1;
            const t = this.querySelector("[role=menu]");
            return !(
              !t ||
              !t.hasAttribute("show") ||
              (t.toggle(), this.removeAttribute("aria-expanded"), 0)
            );
          }),
            this.addEventListener("click", (e) => {
              if (!this.disabled) {
                const t = this.querySelector("[role=menu]");
                if (e.path.some((e) => e === t)) return !1;
                if (
                  (this.dispatchEvent(
                    new CustomEvent("saveToDropdownButtonClicked", {
                      bubbles: !0,
                    })
                  ),
                  t)
                )
                  return (
                    t.toggle(),
                    t.hasAttribute("show")
                      ? this.setAttribute("aria-expanded", !0)
                      : this.removeAttribute("aria-expanded"),
                    !0
                  );
              }
            }),
            this.addEventListener("loadingDropdown", (e) =>
              this.dispatchEvent(
                new CustomEvent("saveToDropdownOpen", { bubbles: !0 })
              )
            ),
            this.addEventListener("listItemClicked", (e) =>
              this.dispatchEvent(
                new CustomEvent("saveToListItemClicked", {
                  detail: { ...e.detail },
                  bubbles: !0,
                })
              )
            );
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "expand-windows-button",
      class ExpandWindowsButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("expandWindowsButtonClicked", { bubbles: !0 })
              );
          });
        }
        static get observedAttributes() {
          return ["expand"];
        }
        attributeChangedCallback(e, t, n) {
          switch (e) {
            case "expand":
              return void (
                n !== t &&
                ("true" == n
                  ? (this.icon.classList.remove("unfold-less-icon"),
                    this.icon.classList.add("unfold-more-icon"))
                  : (this.icon.classList.remove("unfold-more-icon"),
                    this.icon.classList.add("unfold-less-icon")))
              );
            default:
              return !1;
          }
        }
        set expand(e) {
          this.setAttribute("expand", e);
        }
        get expand() {
          return this.getAttribute("expand");
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(46);
    n(244);
    e.exports = class SavedListController {
      constructor(e, t) {
        (this.savedList = e), (this.command = t);
      }
      init() {
        return this.update().then(() => {
          (this.savedList.collapsed = !0), this.loadEventListeners();
        });
      }
      loadEventListeners() {
        this.savedList.addEventListener("renameWinClicked", (e) =>
          s.sendUpdateSavedWindow({
            winId: e.detail.winId,
            title: e.detail.title,
          })
        ),
          this.savedList.addEventListener("removeTabs", (e) => {
            let t = this.savedList
              .get(e.detail.winId)
              .tabs.getTabs(e.detail.tabIds)
              .map((e) => ({
                id: null,
                url: e.link,
                hostname: e.domain,
                title: e.title,
              }));
            var n = this.command.create(
              s.sendRemoveSavedTabs,
              s.sendCreateSavedTabs,
              { tabIds: e.detail.tabIds, winId: e.detail.winId, tabs: t }
            );
            return this.command.execute(n);
          }),
          this.savedList.addEventListener("savedTabsMoved", (e) =>
            s.sendMoveSavedTab({
              winId: e.detail.winId,
              targetWinId: e.detail.targetWinId,
              tabId: e.detail.tabIds[0],
              toIndex: e.detail.toIndex,
            })
          ),
          this.savedList.addEventListener("updateSavedWinTabs", (e) =>
            s
              .sendGetSavedWindow({ winId: e.detail.winId })
              .then((e) => this.updateWindow(e))
          ),
          this.savedList.addEventListener(
            "removeWinClicked",
            (e) => {
              const t = this.savedList.get(e.detail.winId),
                n = this.command.create(
                  s.sendRemoveSavedWindow,
                  s.sendCreateSavedWindow,
                  {
                    winId: e.detail.winId,
                    win: {
                      id: null,
                      title: t.title,
                      tabs: t.tabs
                        .getArray()
                        .map((e) => ({
                          id: null,
                          title: e.title,
                          hostname: e.domain,
                          url: e.link,
                        })),
                    },
                  }
                );
              return this.command.execute(n);
            },
            !1
          ),
          this.savedList.addEventListener(
            "removeTabClicked",
            (e) => {
              const t = this.command.create(
                s.sendRemoveSavedTabs,
                s.sendCreateSavedTabs,
                {
                  tabIds: [e.detail.tabId],
                  winId: e.detail.winId,
                  tabs: [
                    {
                      id: null,
                      url: e.detail.url,
                      hostname: e.detail.domain,
                      title: e.detail.title,
                    },
                  ],
                }
              );
              return this.command.execute(t);
            },
            !1
          ),
          this.savedList.addEventListener("exportWindowClicked", (e) =>
            "csv" === e.detail.export
              ? s.sendExportSavedWindow({
                  export: "csv",
                  winId: e.detail.winId,
                })
              : "json" === e.detail.export
              ? s.sendExportSavedWindow({
                  export: "json",
                  winId: e.detail.winId,
                })
              : void 0
          );
      }
      update() {
        return s
          .sendGetSavedWindows()
          .then((e) => (this.savedList.clear(), this.savedList.addArray(e)));
      }
      addWindow(e) {
        try {
          return this.savedList.add(e);
        } catch (e) {
          console.error("Failed to add window", e);
        }
      }
      removeWindow(e) {
        var t = this.savedList.get(e);
        return t
          ? (this.savedList.clearSelected(), t.remove())
          : (console.warn("Failed to remove window, window doesn't exist."),
            !1);
      }
      updateWindow(e) {
        var t = this.savedList.get(e.id);
        return t
          ? t.update(e)
          : (console.warn("Failed to update window, window doesn't exist."),
            !1);
      }
      search(e) {
        return (
          this.savedList.clearSelected(),
          this.clearSearch(),
          (this.savedList.filter = e),
          this
        );
      }
      clearSearch() {
        return (this.savedList.filter = ""), this;
      }
    };
  },
  function (e, t, n) {
    var s = n(82),
      i = new (n(83).ListComponentsInjector)("saved");
    class SavedList extends s {
      get factory() {
        return i;
      }
      loadEventListeners() {}
      createWindowTitle(e, t) {
        return e.title;
      }
      setWindowStatus(e, t) {}
    }
    customElements.define("saved-list", SavedList), (e.exports = SavedList);
  },
  function (e, t, n) {
    const s = n(46);
    n(246);
    function i(e, t = null) {
      return Array.from(e.getArray())
        .map((e) => ({ title: e.title, id: e.id }))
        .filter((e) => e.id !== t);
    }
    e.exports = class SavedPanelController {
      constructor(e, t, n) {
        (this.savedListPanel = e),
          (this.savedListController = t),
          (this.command = n),
          (this.searching = !1);
      }
      init(e) {
        this.update(e), this.loadEventListeners();
      }
      update(e) {
        e && (this.savedListPanel.sort = e.savedSortMethod);
        const t = Array.from(this.savedListController.savedList.getArray());
        this.savedListPanel.mergeButton.disabled = !(t.length > 1);
        const n = document.querySelector("#display-columns");
        let s = this.savedListPanel.columnButton.icon;
        n.checked
          ? (s.classList.remove("column-icon"), s.classList.add("list-icon"))
          : (s.classList.remove("list-icon"), s.classList.add("column-icon"));
        const i = this.savedListController.savedList
          .getArray()
          .every((e) => e.collapsed);
        this.savedListPanel.expandWindowsButton.expand = i;
      }
      sync(e, t) {
        if (e)
          return (
            t
              ? (this.savedListPanel.syncButton.status = "license")
              : ((this.savedListPanel.syncButton.status = "signedin"),
                chrome.storage.local.get("hideLicenseAlert", (e) => {
                  e.hasOwnProperty("hideLicenseAlert") ||
                    (this.alertPopup.showNoLicense(),
                    chrome.storage.local.set({ hideLicenseAlert: !0 }));
                })),
            this.savedListPanel.syncButton.renderMenu(e)
          );
        this.savedListPanel.syncButton.status = "default";
      }
      loadEventListeners() {
        this.savedListPanel.expandWindowsButton.addEventListener(
          "expandWindowsButtonClicked",
          (e) => {
            const t = this.savedListController.savedList
              .getArray()
              .every((e) => e.collapsed);
            return (
              (this.savedListPanel.expandWindowsButton.expand = !t),
              (this.savedListController.savedList.collapsed = !t)
            );
          }
        ),
          this.savedListPanel.mergeButton.addEventListener(
            "mergeApplyButtonClicked",
            (e) => {
              s.sendMergeSavedWindows({ selected: e.detail.selected });
            }
          ),
          this.savedListPanel.addEventListener(
            "mergeWindowsDropdownOpen",
            (e) => {
              const t = i(this.savedListController.savedList);
              return this.savedListPanel.mergeButton.setContent(t);
            }
          ),
          this.savedListPanel.addEventListener("moveTabsDropdownOpen", (e) => {
            const t = this.savedListController.savedList.checked;
            if (!t) return !1;
            const n = i(this.savedListController.savedList, t.id);
            return this.savedListPanel.moveButton.setContent(n);
          }),
          this.savedListPanel.addEventListener("themeButtonClicked", (e) =>
            document.querySelector("#dark-theme").click()
          ),
          this.savedListPanel.addEventListener("columnButtonClicked", (e) => {
            const t = document.querySelector("#display-columns");
            let n = this.savedListPanel.columnButton.icon;
            return (
              t.checked
                ? (n.classList.remove("list-icon"),
                  n.classList.add("column-icon"))
                : (n.classList.remove("column-icon"),
                  n.classList.add("list-icon")),
              t.click()
            );
          }),
          this.savedListPanel.addEventListener("exportWindowsClicked", (e) =>
            s.sendExportSavedWindows({ export: e.detail.export })
          ),
          this.savedListPanel.addEventListener("signoutButtonClicked", (e) =>
            s.sendSignOut()
          ),
          this.savedListPanel.addEventListener("syncButtonClicked", (e) =>
            s.sendSignIn().then((e) => {
              if (!e)
                return s.sendErrorAlert({ message: "Failed to login user" });
            })
          ),
          this.savedListPanel.searchField.addEventListener(
            "search",
            (e) => (
              (this.searching = !0),
              "" === e.target.value
                ? ((this.searching = !1),
                  this.savedListController.clearSearch())
                : this.savedListController.search(e.target.value)
            )
          ),
          this.savedListPanel.searchField.addEventListener("keyup", (e) =>
            this.savedListPanel.searchField.dispatchEvent(new Event("search"))
          ),
          this.command.target.addEventListener("commandUndo", (e) => {
            e.count || (this.savedListPanel.undoButton.disabled = !0);
          }),
          this.command.target.addEventListener("commandExecuted", (e) => {
            this.savedListPanel.undoButton.disabled = !1;
          }),
          this.savedListPanel.addEventListener("removeUndoButtonClicked", (e) =>
            this.command.undo()
          ),
          this.savedListController.savedList.addEventListener(
            "winCheckedChange",
            (e) => {
              e.detail.checked
                ? ((this.savedListPanel.removeTabsButton.disabled = !1),
                  (this.savedListPanel.moveButton.disabled = !1))
                : ((this.savedListPanel.removeTabsButton.disabled = !0),
                  (this.savedListPanel.moveButton.disabled = !0));
            }
          ),
          this.savedListPanel.addEventListener(
            "moveSavedTabsButtonClicked",
            (e) => {
              var t = this.savedListController.savedList.checked,
                n = null;
              if (
                ("new" !== e.detail.winId &&
                  (n = this.savedListController.savedList.get(
                    e.detail.winId
                  ).id),
                t)
              )
                return s.sendMoveSavedTabs({
                  winId: t.id,
                  tabIds: t.selectedTabs,
                  targetWinId: n || null,
                  index: null,
                });
            }
          ),
          this.savedListPanel.addEventListener(
            "removeTabsButtonClicked",
            (e) => {
              var t = this.savedListController.savedList.checked;
              if (t) {
                var n = t.selectedTabs;
                const e = this.command.create(
                  s.sendRemoveSavedTabs,
                  s.sendCreateSavedTabs,
                  {
                    tabIds: n,
                    winId: t.id,
                    tabs: t.tabs
                      .getTabs(n)
                      .map((e) => ({
                        id: null,
                        url: e.link,
                        hostname: e.domain,
                        title: e.title,
                      })),
                  }
                );
                return this.command.execute(e);
              }
            }
          ),
          this.savedListPanel.addEventListener("windowsUploaded", (e) =>
            s.sendImportWindows({ file: e.detail.file })
          );
      }
    };
  },
  function (e, t, n) {
    var s = n(88);
    n(247), n(248), n(249), n(250), n(251);
    class SavedListPanel extends s {
      connectedCallback() {
        (this.searchField = this.querySelector("#saved-search")),
          (this.undoButton = this.querySelector("#remove-undo-button")),
          (this.moveButton = this.querySelector("#move-saved-button")),
          (this.removeTabsButton = this.querySelector("#remove-tabs-button")),
          (this.syncButton = this.querySelector("sync-button")),
          (this.columnButton = this.querySelector("column-button")),
          (this.themeButton = this.querySelector("theme-button")),
          (this.mergeButton = this.querySelector("merge-dropdown-button")),
          (this.expandWindowsButton = this.querySelector(
            "expand-windows-button"
          ));
      }
      get sort() {}
      set sort(e) {}
      clearSearchField() {
        this.searchField.value = "";
      }
    }
    customElements.define("savedlist-panel", SavedListPanel),
      (e.exports = SavedListPanel);
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "remove-tabs-button",
      class RemoveTabsButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("removeTabsButtonClicked", { bubbles: !0 })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(4);
    customElements.define(
      "remove-undo-button",
      class RemoveUndoButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return this.dispatchEvent(
                new CustomEvent("removeUndoButtonClicked", { bubbles: !0 })
              );
          });
        }
      }
    );
  },
  function (e, t, n) {
    var s = n(29);
    class MoveSavedTabsDropdownButton extends s {
      loadEventListeners() {
        this.addEventListener("loadDropdown", (e) =>
          this.dispatchEvent(
            new CustomEvent("moveTabsDropdownOpen", { bubbles: !0 })
          )
        );
      }
      _renderContent(e) {
        (e = e || []).unshift({ title: "New Window", id: "new" });
        var t = this.content,
          n = {};
        return e.forEach((e) => {
          (n = document.createElement("div")).addEventListener("click", (e) =>
            this.dispatchEvent(
              new CustomEvent("moveSavedTabsButtonClicked", {
                detail: { winId: e.target.dataset.moveWinId },
                bubbles: !0,
              })
            )
          ),
            "new" === e.id && n.classList.add("icon-blue"),
            (n.textContent = e.title),
            (n.dataset.moveWinId = e.id),
            t.appendChild(n);
        });
      }
    }
    customElements.define(
      "move-saved-dropdown-button",
      MoveSavedTabsDropdownButton
    ),
      (e.exports = MoveSavedTabsDropdownButton);
  },
  function (e, t, n) {
    var s = n(4),
      i = n(10);
    const r = ["text/csv", "application/json"];
    customElements.define(
      "import-windows-button",
      class ImportWindowsButton extends s {
        loadEventListeners() {
          this.addEventListener("click", (e) => {
            if (!this.disabled)
              return e.target === this.icon && this.label.click();
          }),
            this.inputField.addEventListener(
              "change",
              (e) =>
                !!this.inputField.files.length &&
                !!i.validFileType(this.inputField.files[0], r) &&
                i
                  .readFile(this.inputField.files[0])
                  .then((e) =>
                    this.dispatchEvent(
                      new CustomEvent("windowsUploaded", {
                        detail: {
                          file: {
                            data: e,
                            type: this.inputField.files[0].type.slice(),
                          },
                        },
                        bubbles: !0,
                      })
                    )
                  )
                  .catch((e) =>
                    this.dispatchEvent(
                      new CustomEvent("fileUploadFailed", { bubbles: !0 })
                    )
                  )
            );
        }
        get icon() {
          return this.querySelector(".icon");
        }
        get label() {
          return this.querySelector("label");
        }
        get inputField() {
          return this.querySelector("input");
        }
      }
    );
  },
  function (e, t, n) {
    const s = n(29);
    class ExportWindowsButton extends s {
      loadEventListeners() {
        Array.from(this.content.children).forEach((e) => {
          e.addEventListener(
            "click",
            (e) =>
              !(!e.target.dataset || !e.target.dataset.export) &&
              this.dispatchEvent(
                new CustomEvent("exportWindowsClicked", {
                  detail: { export: e.target.dataset.export },
                  bubbles: !0,
                })
              )
          );
        });
      }
    }
    customElements.define("export-windows-button", ExportWindowsButton),
      (e.exports = ExportWindowsButton);
  },
  function (e, t) {
    var n = [];
    e.exports = class Command {
      constructor() {
        this.target = document.createElement("div");
      }
      execute(e) {
        return e
          .execute(e.value)
          .then(
            () => (
              n.push(e),
              this.target.dispatchEvent(
                new CustomEvent("commandExecuted", {
                  detail: { count: this.count },
                  bubbles: !0,
                })
              )
            )
          );
      }
      undo() {
        if (n.length) {
          var e = n.pop();
          return (
            e.undo(e.value),
            this.target.dispatchEvent(
              new CustomEvent("commandUndo", {
                detail: { count: this.count },
                bubbles: !0,
              })
            )
          );
        }
        return !1;
      }
      get count() {
        return n.length;
      }
      create(e, t, n) {
        return new (function (e, t, n) {
          (this.execute = e), (this.undo = t), (this.value = n);
        })(e, t, n);
      }
    };
  },
  function (e, t, n) {
    var s = n(21),
      i = n(31),
      r = new s(),
      a = new i();
    customElements.define(
      "tab-link",
      class TabLink extends HTMLAnchorElement {
        constructor() {
          super();
        }
        connectedCallback() {
          function e(e) {
            e.preventDefault();
          }
          function t() {
            document.removeEventListener("selectstart", e),
              document.removeEventListener("mouseup", t);
          }
          this.hasAttribute("role") || this.setAttribute("role", "link"),
            this.addEventListener("keydown", (e) => {
              "Enter" != e.key ||
                this.href ||
                window.setTimeout(this.click.bind(this), 0);
            }),
            this.addEventListener("click", (e) => {
              e.preventDefault();
              var t = this.dataset.tabLink.match(/\d+/g),
                n = Number(t[0]),
                s = Number(t[1]);
              return (e.ctrlKey || e.metaKey) && e.target.href
                ? chrome.tabs.create({ url: e.target.href, selected: !1 })
                : a
                    .getCurrent()
                    .then(function (e) {
                      return e.id !== n
                        ? a
                            .setFocus(n)
                            .then(function () {
                              return r.setActive(s);
                            })
                            .catch(function (e) {
                              return Promise.reject(e);
                            })
                        : r.setActive(s);
                    })
                    .catch(function (e) {
                      console.error(e);
                    });
            }),
            this.addEventListener("mousedown", (n) => {
              n.preventDefault(),
                document.addEventListener("selectstart", e),
                document.addEventListener("mouseup", t),
                document.activeElement != this &&
                  this.classList.add("no-outline");
            }),
            this.addEventListener("blur", () => {
              this.classList.remove("no-outline");
            });
        }
      },
      { extends: "a" }
    );
  },
  function (e, t, n) {
    var s = new (n(31))();
    customElements.define(
      "win-link",
      class WinLink extends HTMLAnchorElement {
        constructor() {
          super();
        }
        connectedCallback() {
          function e(e) {
            e.preventDefault();
          }
          function t() {
            document.removeEventListener("selectstart", e),
              document.removeEventListener("mouseup", t);
          }
          this.hasAttribute("role") || this.setAttribute("role", "link"),
            this.addEventListener("keydown", (e) => {
              "Enter" != e.key ||
                this.href ||
                window.setTimeout(this.click.bind(this), 0);
            }),
            this.addEventListener("click", (e) => {
              e.preventDefault();
              var t = this.pathname.match(/\d+/g),
                n = Number(t[0]);
              return s
                .getCurrent()
                .then(function (e) {
                  if (e.id !== n)
                    return s.setFocus(n).catch(function (e) {
                      return Promise.reject(e);
                    });
                })
                .catch(function (e) {
                  console.error(e.message);
                });
            }),
            this.addEventListener("mousedown", (n) => {
              n.preventDefault(),
                document.addEventListener("selectstart", e),
                document.addEventListener("mouseup", t),
                document.activeElement != this &&
                  this.classList.add("no-outline");
            }),
            this.addEventListener("blur", function () {
              this.classList.remove("no-outline");
            });
        }
      },
      { extends: "a" }
    );
  },
  function (e, t, n) {
    var s = new (n(62))(),
      i = "window -open";
    customElements.define(
      "record-link",
      class SavedWinLink extends HTMLAnchorElement {
        constructor() {
          super();
        }
        connectedCallback() {
          function e(e) {
            e.preventDefault();
          }
          function t() {
            document.removeEventListener("selectstart", e),
              document.removeEventListener("mouseup", t);
          }
          this.hasAttribute("role") || this.setAttribute("role", "link"),
            this.addEventListener("keydown", (e) => {
              "Enter" != e.key ||
                this.href ||
                window.setTimeout(this.click.bind(this), 0);
            }),
            this.addEventListener("click", (e) => {
              e.preventDefault();
              var t = this.pathname.match(/([-_a-zA-Z0-9]+)/g)[0];
              return s
                .sendMessage({ command: i, data: { ids: [t] } })
                .catch(function (e) {
                  console.error(e);
                });
            }),
            this.addEventListener("mousedown", (n) => {
              n.preventDefault(),
                document.addEventListener("selectstart", e),
                document.addEventListener("mouseup", t),
                document.activeElement != this &&
                  this.classList.add("no-outline");
            }),
            this.addEventListener("blur", () => {
              this.classList.remove("no-outline");
            });
        }
      },
      { extends: "a" }
    );
  },
  function (e, t) {
    customElements.define(
      "alert-popup",
      class AlertPopup extends HTMLElement {
        constructor() {
          super();
        }
        static get observedAttributes() {
          return [];
        }
        attributeChangedCallback(e, t, n) {}
        connectedCallback() {
          this.loadEventListeners();
        }
        loadEventListeners() {
          this.closeButton.addEventListener(
            "click",
            (e) => {
              this.hide();
            },
            !1
          );
        }
        render(e, t, n) {
          (this.header = e),
            (this.errorAlert = n || !1),
            (this.content.innerHTML = t);
        }
        hide() {
          this.hidden = !0;
        }
        show() {
          this.hidden = !1;
        }
        showNoLicense() {
          this.render(
            "No License",
            '<p>Cloud backups is currently disabled because there was no license associated with that email. To activate cloud syncing you can purchase a full license with a one time payment. Buying a license helps support future development.</p><a href="https://clusterwm.com/buy.html" style="float:right; margin-bottom:14px;">Learn More</a>'
          ),
            this.show();
        }
        showAlert(e, t) {
          switch (t) {
            case "error":
              return this.render("Error", "<p>" + e + "</p>", !0), this.show();
            default:
              return (
                this.render("information", "<p>" + e + "</p>", !1), this.show()
              );
          }
        }
        get errorAlert() {
          return this.classList.has("error");
        }
        set errorAlert(e) {
          return e
            ? this.classList.add("error")
            : this.classList.remove("error");
        }
        get closeButton() {
          return this.querySelector(".close-button");
        }
        get content() {
          return this.querySelector(".content");
        }
        get header() {
          return this.querySelector(".header");
        }
        set header(e) {
          this.header.textContent = e;
        }
      }
    );
  },
]);
