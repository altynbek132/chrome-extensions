/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _options_default_options_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

const optionsTextArea = document.querySelector('textarea#options-text');
chrome.storage.sync.get('optionsText', e => {
  optionsTextArea.value = e.optionsText || _options_default_options_text__WEBPACK_IMPORTED_MODULE_0__["defaultOptionsText"];
});
document.querySelector('button#submit-button').addEventListener('click', e => {
  chrome.storage.sync.set({
    optionsText: optionsTextArea.value
  });
});
document.querySelector('button#reset-button').addEventListener('click', e => {
  if (window.confirm('Are you sure?')) {
    chrome.storage.sync.clear(() => window.location.reload());
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptionsText", function() { return defaultOptionsText; });
const defaultOptionsText = `({
  // Hello, and thanks for trying my extension, this is all JavaScript

  isSelectionValid: function ({ selectionString, selection }) {
    return (
      selectionString.length >= 3 &&
      selection.type !== 'None' &&
      selection.type !== 'Caret'
    );
  },

  isWindowLocationValid: function (windowLocation) {
    const blacklistedHosts = [
      'linkedin.com',
      'collabedit.com',
      'coderpad.io',
      'jsbin.com',
      'plnkr.co',
      'youtube.com',
      'track.toggl.com',
    ];
    return !blacklistedHosts.some(h => windowLocation.host.includes(h));
  },

  areKeysPressed: function (pressedKeys = []) {
    // return pressedKeys.includes('Meta'); // CMD key
    // return pressedKeys.includes('Alt'); // Option key
    return true;
  },

  occurrenceRegex: function (selectionString) {
    return new RegExp(selectionString, 'i'); // partial word, case insensitive
    // return new RegExp(selectionString); // partial word, case sensitive
    // return new RegExp(\`\\\\b\${selectionString}\\\\b\`, 'i'); // whole word, case insensitive
    // return new RegExp(\`\\\\b\${selectionString}\\\\b\`); // whole word, case sensitive
  },

  isAncestorNodeValid: (
    function isAncestorNodeValid (ancestorNode) {
      return (
        (!ancestorNode) ||
        (!ancestorNode.classList || !ancestorNode.classList.contains('CodeMirror')) &&
        (ancestorNode.nodeName !== 'SCRIPT') &&
        (ancestorNode.nodeName !== 'STYLE') &&
        (ancestorNode.nodeName !== 'HEAD') &&
        (ancestorNode.nodeName !== 'TITLE') &&
        (ancestorNode.nodeName !== 'INPUT') &&
        (ancestorNode.nodeName !== 'TEXTAREA') &&
        (ancestorNode.contentEditable !== 'true') &&
        (isAncestorNodeValid(ancestorNode.parentNode))
      );
    }
  ),

  trimRegex: function () {
    // leading, selectionString, trailing
    // trim parts maintained for offset analysis
    return /^(\\s*)(\\S+(?:\\s+\\S+)*)(\\s*)$/;
  },

  highlightedClassName: 'highlighted_selection',

  styles: {
    backgroundColor: 'rgb(255,255,0,1)', // yellow 100%
    margin: '0',
    padding: '0',
    // lineHeight: '1',
    display: 'inline',
  },

  areScrollMarkersEnabled: function () {
    return true;
  },

  scrollMarkerClassName: 'highlighted_selection_scroll_marker',

  scrollMarkerStyles: function ({ window, document, highlightedNode }) {
    const clientRect = highlightedNode.getBoundingClientRect();
    if (!clientRect.width || !clientRect.height) {
      return false;
    }

    return {
      height: '2px',
      width: '16px',
      boxSizing: 'content-box',
      border: '1px solid grey',
      position: 'fixed',
      top: (
        // window height times percent of element position in document
        window.innerHeight * (
          + window.scrollY
          + clientRect.top
          + (0.5 * (clientRect.top - clientRect.bottom))
        ) / document.body.clientHeight
      ) + 'px',
      right: '0px',
      backgroundColor: 'yellow',
      zIndex: '2147483647',
    };
  },
})`;

/***/ })
/******/ ]);