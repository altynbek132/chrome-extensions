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
    t((t.s = 257));
})({
  16: function (e, n) {
    e.exports = function (e) {
      var n = Array.prototype.slice.call(arguments).slice(1);
      return new Promise(function (t, o) {
        e.apply(
          null,
          n.concat(function (e) {
            return chrome.runtime.lastError
              ? o(new Error(chrome.runtime.lastError.message))
              : t(e);
          })
        );
      });
    };
  },
  21: function (e, n, t) {
    var o = t(16);
    e.exports = c;
    var r = c.prototype;
    function c() {}
    (r.get = function (e) {
      return o(chrome.tabs.get, e);
    }),
      (r.setActive = function (e) {
        return o(chrome.tabs.update, e, { active: !0, highlighted: !0 });
      }),
      (r.getCurrent = function () {
        return o(chrome.tabs.getCurrent);
      }),
      (r.getFocused = function () {
        return o(chrome.tabs.query, { active: !0, currentWindow: !0 });
      }),
      (r.remove = function (e) {
        return o(chrome.tabs.remove, e);
      }),
      (r.create = function (e, n, t, r) {
        return o(chrome.tabs.create, {
          url: e,
          windowId: n,
          pinned: r,
          selected: t,
        });
      }),
      (r.getAllInWindow = function (e) {
        return o(chrome.tabs.query, { windowId: e });
      }),
      (r.move = function (e, n, t) {
        return (
          "number" != typeof t &&
            (console.warn("Move tab index is not a integer"), (t = -1)),
          o(chrome.tabs.move, e, { windowId: n, index: t })
        );
      }),
      (r.discard = function (e) {
        return o(chrome.tabs.discard, e);
      }),
      (r.executeScript = function (e, n) {
        return o(chrome.tabs.executeScript, e, n);
      }),
      (r.update = function (e, n) {
        return o(chrome.tabs.update, e, n);
      });
  },
  257: function (e, n, t) {
    var o = t(21),
      r = t(62);
    const c = new o(),
      i = new r(),
      u = "window -active-tabs -suspend",
      s = "window -active-tabs -unsuspend",
      d = "window -active -sort",
      a = "window -active -remove-duplicates";
    var w = {
      init: function () {
        (this.mainMenu = document.querySelector("#main-menu")),
          (this.manager = document.querySelector("#open-manager")),
          (this.saveNewWindow = document.querySelector("#save-new-window")),
          (this.openWindow = document.querySelector("#open-window")),
          (this.suspendWindow = document.querySelector("#suspend-window")),
          (this.unsuspendWindow = document.querySelector("#unsuspend-window")),
          (this.sortTabs = document.querySelector("#sort-tabs")),
          (this.removeDuplicates =
            document.querySelector("#remove-duplicates")),
          this.loadEvents();
        var e = document.querySelector("#manager-command"),
          n = document.querySelector("#quicksort-command");
        chrome.commands.getAll((t) => {
          t.forEach((t) => {
            "open-window-manager" === t.name
              ? (e.textContent = t.shortcut.replace("Command+", "⌘"))
              : "quick-sort" === t.name &&
                (n.textContent = t.shortcut.replace("Command+", "⌘"));
          });
        }),
          console.info("Menu: loaded");
      },
      loadEvents: function () {
        this.manager.addEventListener("click", function (e) {
          return m()
            .then(function (e) {
              return chrome.runtime.sendMessage({
                command: "menu --open-manager",
                data: { activeTab: e },
              });
            })
            .catch(function (e) {
              return console.error(e), window.close();
            });
        }),
          this.openWindow.addEventListener("click", function (e) {
            return h(
              chrome.extension.getURL("menu-open-popup.html"),
              460,
              260
            ).then(function () {
              return window.close();
            });
          }),
          this.saveNewWindow.addEventListener("click", function (e) {
            return l()
              .then(function (e) {
                return i
                  .sendMessage({ command: "user -set-cache", data: { win: e } })
                  .then(function () {
                    return h(
                      chrome.extension.getURL("menu-save-popup.html"),
                      429,
                      166
                    );
                  })
                  .then(function () {
                    return window.close();
                  });
              })
              .catch(function (e) {
                return console.error(e), window.close();
              });
          }),
          this.suspendWindow.addEventListener(
            "click",
            (e) =>
              l().then((e) =>
                e
                  ? (function (e) {
                      return i
                        .sendMessage({ command: u, data: { tabIds: e } })
                        .catch((e) => (console.error(e), window.close()));
                    })(e.tabs.map((e) => e.id))
                      .then(() => window.close())
                      .catch((e) => (console.error(e), window.close()))
                  : (console.error("Failed to get current window"),
                    window.close())
              ),
            !1
          ),
          this.unsuspendWindow.addEventListener("click", (e) =>
            l()
              .then((e) =>
                e
                  ? (function (e) {
                      return i
                        .sendMessage({ command: s, data: { tabIds: e } })
                        .catch((e) => (console.error(e), window.close()));
                    })(e.tabs.map((e) => e.id)).then(() => window.close())
                  : Promise.reject(new Error("Failed to get current window"))
              )
              .catch((e) => (console.error(e), window.close()))
          ),
          this.removeDuplicates.addEventListener("click", (e) =>
            l()
              .then((e) =>
                e
                  ? (function (e) {
                      return i
                        .sendMessage({ command: a, data: { winId: e } })
                        .catch((e) => (console.error(e), window.close()));
                    })(e.id).then(window.close)
                  : Promise.reject(new Error("Failed to get current window"))
              )
              .catch((e) => (console.error(e), window.close()))
          ),
          this.sortTabs.addEventListener("click", (e) =>
            l()
              .then((e) =>
                e
                  ? (function (e) {
                      return i
                        .sendMessage({
                          command: d,
                          data: { winId: e, property: "hostname" },
                        })
                        .catch((e) => (console.error(e), window.close()));
                    })(e.id).then(window.close)
                  : Promise.reject(new Error("Failed to get current window"))
              )
              .catch((e) => (console.error(e), window.close()))
          );
      },
    };
    function l() {
      return m()
        .then(function (e) {
          return i.sendMessage({
            command: "window -active",
            data: { winId: e.windowId },
          });
        })
        .then(function (e) {
          return e || Promise.reject("Failed to get current window");
        });
    }
    function m(e) {
      return c.getFocused({ active: !0, currentWindow: !0 }).then(function (e) {
        return e.length < 1
          ? Promise.reject("Menu was opened when no window was focused")
          : e[0];
      });
    }
    function h(e, n, t) {
      var o = Math.round(screen.width / 2 - n / 2),
        r = Math.round(screen.height / 2 - t / 2);
      return new Promise(function (c, i) {
        chrome.windows.create(
          {
            url: e,
            top: r,
            left: o,
            width: n,
            height: t,
            focused: !0,
            type: "popup",
          },
          c
        );
      });
    }
    document.addEventListener("DOMContentLoaded", function (e) {
      w.init();
    });
  },
  62: function (e, n, t) {
    var o = t(16);
    function r() {}
    (e.exports = r),
      (r.prototype.sendMessage = function (e) {
        return o(chrome.runtime.sendMessage, e);
      });
  },
});
