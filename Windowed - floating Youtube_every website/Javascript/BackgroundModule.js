// Import is not yet allowed in firefox, so for now I put tint_image in manifest.json
// import { tint_image } from './tint_image.js';

let NEED_REFRESH_TITLE = `This page needs to be reloaded for Windowed to activate. Click here to reload.`;
let BROWSERACTION_ICON = "/Images/Icon_Windowed_Mono@1x.png";

let browser_info_promise = browser.runtime.getBrowserInfo
  ? browser.runtime.getBrowserInfo()
  : Promise.resolve({ name: "Chrome" });
let is_firefox = browser_info_promise.then(
  (browser_info) => browser_info.name === "Firefox"
);

let is_valid_window = (window) => {
  return (
    window.incognito === false &&
    window.type === "normal" &&
    window.state !== "minimized"
  );
};

let firefix_window = async (window_properties) => {
  let is_it_firefox = await is_firefox;
  if (is_it_firefox) {
    let { focused, ...good_properties } = window_properties;
    return good_properties;
  } else {
    return window_properties;
  }
};

// Get a window to put our tab on: either the last focussed, a random, or none;
// In case of none being found, null is returned and the caller should make a new window himself (with the tab attached)
const get_fallback_window = async (windowId) => {
  const first_fallback_window = await browser.windows.getLastFocused({
    windowTypes: ["normal"],
  });

  if (
    first_fallback_window.id !== windowId &&
    is_valid_window(first_fallback_window)
  ) {
    return first_fallback_window;
  } else {
    const windows = await browser.windows.getAll({ windowTypes: ["normal"] });
    const right_window = windows
      .filter((x) => is_valid_window(x))
      .filter((x) => x.id !== windowId)
      .sort((a, b) => a.tabs.length - b.tabs.length)[0];

    if (right_window) {
      return right_window;
    } else {
      return null;
    }
  }
};

// TODO Instead of using this static height, I can maybe "ping" the page I'm popup-izing
// after it is done becoming a popup: then it can figure out it's position itself
// (and check the size of it's current header itself)
const Chrome_Popup_Menubar_Height = 22; // Do `window.outerHeight - window.innerHeight` in a popup tab

let chrome_response = (fn) => async (request, sender, response_fn) => {
  try {
    let result = await fn(request, sender);
    return { type: "resolve", value: result };
  } catch (err) {
    return {
      type: "reject",
      value: { message: err.message, stack: err.stack },
    };
  }
};
let clean_mode = (mode, disabled) => {
  // Any other mode than the known ones are ignored
  if (mode == "fullscreen" || mode == "windowed" || mode == "in-window") {
    return mode;
  }
  return disabled === true ? "fullscreen" : "ask";
};
let get_host_config = async (tab) => {
  let host = new URL(tab.url).host;
  let host_mode = `mode(${host})`;
  let host_pip = `pip(${host})`;
  let {
    [host_mode]: mode,
    [host]: disabled,
    [host_pip]: pip,
  } = await browser.storage.sync.get([host_mode, host, host_pip]);
  mode ??= "in-window";
  if (mode == "ask") {
    mode = "in-window";
  }
  disabled ??= false;

  return {
    mode: clean_mode(mode, disabled),
    pip: pip === true,
  };
};

browser.runtime.onMessage.addListener(
  chrome_response(async (request, sender) => {
    if (request.type === "update_windowed_button") {
      let tabs = request.id
        ? [await browser.tabs.get(request.id)]
        : await browser.tabs.query(request.query);
      for (let tab of tabs) {
        await update_button_on_tab(tab);
      }
      return;
    }

    if (request.type === "get_windowed_config") {
      return await get_host_config(sender.tab);
    }

    // Detatch the current tab and put it into a standalone popup window
    if (request.type === "please_make_me_a_popup") {
      // TODO Save windowId and index inside that window,
      // so when you "pop" it back, it will go where you opened it
      let {
        left: screenLeft,
        top: screenTop,
        type: windowType,
      } = await browser.windows.get(sender.tab.windowId);

      // TODO Check possible 'panel' support in firefox
      let frame = request.position;
      if (windowType === "popup") {
        // Already a popup, no need to re-create the window
        await browser.windows.update(
          sender.tab.windowId,
          await firefix_window({
            focused: true,
            left: Math.round(screenLeft + frame.left),
            top: Math.round(
              screenTop + frame.top - Chrome_Popup_Menubar_Height
            ),
            width: Math.round(frame.width),
            height: Math.round(frame.height + Chrome_Popup_Menubar_Height),
          })
        );
        return;
      }

      const created_window = await browser.windows.create(
        await firefix_window({
          tabId: sender.tab.id,
          type: "popup",
          focused: true,
          left: Math.round(screenLeft + frame.left),
          top: Math.round(screenTop + frame.top - Chrome_Popup_Menubar_Height),
          width: Math.round(frame.width),
          height: Math.round(frame.height + Chrome_Popup_Menubar_Height),
        })
      );

      if (await is_firefox) {
        await browser.windows.update(created_window.id, {
          titlePreface: "Windowed: ",
          focused: true,
        });
      }
      return;
    }

    /*
		Take the current tab, and put it into a tab-ed window again.
		1. Last focussed window
		2. Other tab-containing window (not popups without tab bar)
		3. New window we create
	*/
    if (request.type === "please_make_me_a_tab_again") {
      let { type: windowType } = await browser.windows.get(sender.tab.windowId);
      if (windowType === "normal") {
        return;
      }

      let fallback_window = await get_fallback_window(sender.tab.windowId);

      if (fallback_window) {
        await browser.tabs.move(sender.tab.id, {
          windowId: fallback_window.id,
          index: -1,
        });
        await browser.tabs.update(sender.tab.id, { active: true });
      } else {
        // No other window open: create a new window with tabs
        let create_window_with_tabs = await browser.windows.create({
          tabId: sender.tab.id,
          type: "normal",
        });
      }
      return;
    }
  })
);

let current_port_promises = {};
let ping_content_script = async (tabId) => {
  try {
    if (current_port_promises[tabId] != null) {
      return await current_port_promises[tabId];
    } else {
      current_port_promises[tabId] = new Promise((resolve, reject) => {
        let port = browser.tabs.connect(tabId);
        port.onMessage.addListener((message) => {
          resolve(true);
          port.disconnect();
        });
        port.onDisconnect.addListener((p) => {
          resolve(false);
        });
      });
      return await current_port_promises[tabId];
    }
  } finally {
    delete current_port_promises[tabId];
  }
};

let icon_theme_color = async (tab) => {
  if (await is_firefox) {
    let theme = await browser.theme.getCurrent(tab.windowId);
    if (theme?.colors?.icons != null) {
      return theme.colors.icons;
    }
    if (theme?.colors?.popup_text != null) {
      return theme.colors.popup_text;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "rgba(255,255,255,0.8)"
      : "rgb(250, 247, 252)";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "rgba(255,255,255,0.8)"
    : "#5f6368";
};

let notify_tab_state = async (tabId, properties) => {
  let port = browser.tabs.connect(tabId);
  // port.postMessage(JSON.stringify({ method: 'notify', data: properties }))
};

let apply_browser_action = async (tabId, action) => {
  await browser.browserAction.setIcon({
    tabId: tabId,
    imageData: action.icon,
  });
  await browser.browserAction.setTitle({
    tabId: tabId,
    title: action.title,
  });
};

let update_button_on_tab = async (tab) => {
  let has_contentscript_active =
    tab.status === "complete" && (await ping_content_script(tab.id));

  if (
    has_contentscript_active === false &&
    (tab.url.match(/^about:/) ||
      tab.url.match(/^chrome:\/\//) ||
      tab.url.match(/^https?:\/\/chrome\.google\.com/) ||
      tab.url.match(/^https?:\/\/support\.mozilla\.org/))
  ) {
    await apply_browser_action(tab.id, {
      icon: await tint_image(BROWSERACTION_ICON, "rgba(208, 2, 27, .22)"),
      title: "For security reasons, windowed is not supported on this domain.",
    });
    return;
  }

  if (tab.status === "complete" && has_contentscript_active === false) {
    await apply_browser_action(tab.id, {
      icon: await tint_image(BROWSERACTION_ICON, "#D0021B"),
      title: NEED_REFRESH_TITLE,
    });
    return;
  }

  let host = new URL(tab.url).host;
  let config = await get_host_config(tab);
  if (config.mode === "fullscreen" && config.pip === false) {
    // ONLY FULLSCREEN - Dimmed icon because it is basically disabled
    await apply_browser_action(tab.id, {
      icon: await tint_image(BROWSERACTION_ICON, "rgba(133, 133, 133, 0.5)"),
      title: `Windowed is disabled on ${host}, click to re-activate`,
    });
    await notify_tab_state(tab.id, { disabled: true });
  } else if (config.mode === "ask" && config.pip === false) {
    // ONLY ASK - Normal white icon because this is "normal"
    await apply_browser_action(tab.id, {
      icon: await tint_image(BROWSERACTION_ICON, await icon_theme_color(tab)),
      title: `Windowed is enabled on ${host}`,
    });
    await notify_tab_state(tab.id, { disabled: false });
  } else {
    // SOMETHING SPECIFIC - Light blue because now the extension is really changing your browsing explicitly
    await apply_browser_action(tab.id, {
      icon: await tint_image(BROWSERACTION_ICON, "#16a8a8"),
      title: `Windowed is enabled on ${host}`,
    });
    await notify_tab_state(tab.id, { disabled: false });
  }
};

// Events where I refresh the browser action button
browser.runtime.onInstalled.addListener(async () => {
  let all_tabs = await browser.tabs.query({});
  for (let tab of all_tabs) {
    await update_button_on_tab(tab);
  }
});
browser.tabs.onUpdated.addListener(async (tabId, changed, tab) => {
  if (changed.url != null || changed.status != null) {
    await update_button_on_tab(tab);
  }
});

// Because I load this as a module now,
(async () => {
  let all_tabs = await browser.tabs.query({});
  for (let tab of all_tabs) {
    await update_button_on_tab(tab);
  }
})();

// Not sure if I need this one -
// only reason I need it is for when one would toggle Enabled/Disabled
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  let tab = await browser.tabs.get(tabId);
  await update_button_on_tab(tab);
});

browser.browserAction.onClicked.addListener(async (tab) => {
  // let title = await browser.browserAction.getTitle({
  //   tabId: tab.id,
  // });
  // if (title === NEED_REFRESH_TITLE) {
  //   browser.tabs.reload(tab.id);
  //   return;
  // }
  // let host = new URL(tab.url).host;
  // if (await is_disabled(tab)) {
  //   await browser.storage.sync.remove([host]);
  // } else {
  //   await browser.storage.sync.set({
  //     [host]: true,
  //   });
  // }
  // await update_button_on_tab(tab);
  // let tabs_with_same_host = await browser.tabs.query({
  //   url: `*://${host}/*`,
  // });
  // for (let tab_with_same_host of tabs_with_same_host) {
  //   await update_button_on_tab(tab_with_same_host);
  // }
});

// TODO Change CSP headers on firefox to allow script injection?
// browser.webRequest.onBeforeRequest.addListener(request => {
// 	console.log('HEY~', request);
// 	var headers = details.responseHeaders;
// 	return {
// 		responseHeaders: headers.map(header => {
// 			const name = header.name.toLowerCase();
// 			console.log(`header:`, header)
// 			if (name !== "content-security-policy" && name !== "x-webkit-csp") {
// 				return header;
// 			} else {
// 				return header;
// 			}
// 		}),
// 	};
// }, { urls: ["<all_urls>"], types: ['main_frame', 'sub_frame'] }, ['blocking', 'responseHeaders']);
