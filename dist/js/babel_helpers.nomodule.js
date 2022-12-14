System.register([], function (_export, _context) {
  "use strict";

  var arrayWithoutHoles, nonIterableSpread, _toConsumableArray, arrayWithHoles, nonIterableRest, _slicedToArray, defineProperty, nativeTypeOf, customTypeOf, _typeof;

  /* eslint-disable no-eq-null, eqeqeq */
  function arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    var arr2 = new Array(len);

    for (var i = 0; i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  /* eslint-disable consistent-return */


  function unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  // filters on symbol properties only. Returned string properties are always
  // enumerable. It is good to use in objectSpread.
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  _export("a", _objectSpread2);

  return {
    setters: [],
    execute: function () {
      /* eslint-disable */
      (function () {
        if (typeof document === "undefined" || "adoptedStyleSheets" in document) {
          return;
        }

        var hasShadyCss = "ShadyCSS" in window && !ShadyCSS.nativeShadow;
        var bootstrapper = document.implementation.createHTMLDocument("");
        var closedShadowRootRegistry = new WeakMap();

        var _DOMException = typeof DOMException === "object" ? Error : DOMException;

        var defineProperty = Object.defineProperty;
        var forEach = Array.prototype.forEach;

        var hasBrokenRules = function () {
          var style = bootstrapper.createElement("style");
          style.textContent = '.x{content:"y"}';
          bootstrapper.body.appendChild(style);
          return style.sheet.cssRules[0].style.content !== '"y"';
        }();

        var brokenRulePatterns = [/content:\s*["']/gm];

        function fixBrokenRules(content) {
          return brokenRulePatterns.reduce(function (acc, pattern) {
            return acc.replace(pattern, "$&%%%");
          }, content);
        }

        var placeholderPatterns = [/(content:\s*["'])%%%/gm];
        var getCssText = hasBrokenRules ? function (rule) {
          return placeholderPatterns.reduce(function (acc, pattern) {
            return acc.replace(pattern, "$1");
          }, rule.cssText);
        } : function (rule) {
          return rule.cssText;
        };
        var importPattern = /@import.+?;?$/gm;

        function rejectImports(contents) {
          var _contents = contents.replace(importPattern, "");

          if (_contents !== contents) {
            console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418");
          }

          return _contents.trim();
        }

        function clearRules(sheet) {
          for (var i = 0; i < sheet.cssRules.length; i++) {
            sheet.deleteRule(0);
          }
        }

        function insertAllRules(from, to) {
          forEach.call(from.cssRules, function (rule, i) {
            to.insertRule(getCssText(rule), i);
          });
        }

        function isElementConnected(element) {
          return "isConnected" in element ? element.isConnected : document.contains(element);
        }

        function unique(arr) {
          return arr.filter(function (value, index) {
            return arr.indexOf(value) === index;
          });
        }

        function diff(arr1, arr2) {
          return arr1.filter(function (value) {
            return arr2.indexOf(value) === -1;
          });
        }

        function removeNode(node) {
          node.parentNode.removeChild(node);
        }

        function getShadowRoot(element) {
          return element.shadowRoot || closedShadowRootRegistry.get(element);
        }

        var cssStyleSheetMethods = ["addRule", "deleteRule", "insertRule", "removeRule"];
        var NonConstructedStyleSheet = CSSStyleSheet;
        var nonConstructedProto = NonConstructedStyleSheet.prototype;

        nonConstructedProto.replace = function () {
          return Promise.reject(new _DOMException("Can't call replace on non-constructed CSSStyleSheets."));
        };

        nonConstructedProto.replaceSync = function () {
          throw new _DOMException("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.");
        };

        function isCSSStyleSheetInstance(instance) {
          return typeof instance === "object" ? proto$1.isPrototypeOf(instance) || nonConstructedProto.isPrototypeOf(instance) : false;
        }

        function isNonConstructedStyleSheetInstance(instance) {
          return typeof instance === "object" ? nonConstructedProto.isPrototypeOf(instance) : false;
        }

        var $basicStyleSheet = new WeakMap();
        var $locations = new WeakMap();
        var $adoptersByLocation = new WeakMap();

        function addAdopterLocation(sheet, location) {
          var adopter = document.createElement("style");
          $adoptersByLocation.get(sheet).set(location, adopter);
          $locations.get(sheet).push(location);
          return adopter;
        }

        function getAdopterByLocation(sheet, location) {
          return $adoptersByLocation.get(sheet).get(location);
        }

        function removeAdopterLocation(sheet, location) {
          $adoptersByLocation.get(sheet).delete(location);
          $locations.set(sheet, $locations.get(sheet).filter(function (_location) {
            return _location !== location;
          }));
        }

        function restyleAdopter(sheet, adopter) {
          requestAnimationFrame(function () {
            clearRules(adopter.sheet);
            insertAllRules($basicStyleSheet.get(sheet), adopter.sheet);
          });
        }

        function checkInvocationCorrectness(self) {
          if (!$basicStyleSheet.has(self)) {
            throw new TypeError("Illegal invocation");
          }
        }

        function ConstructedStyleSheet() {
          var self = this;
          var style = document.createElement("style");
          bootstrapper.body.appendChild(style);
          $basicStyleSheet.set(self, style.sheet);
          $locations.set(self, []);
          $adoptersByLocation.set(self, new WeakMap());
        }

        var proto$1 = ConstructedStyleSheet.prototype;

        proto$1.replace = function replace(contents) {
          try {
            this.replaceSync(contents);
            return Promise.resolve(this);
          } catch (e) {
            return Promise.reject(e);
          }
        };

        proto$1.replaceSync = function replaceSync(contents) {
          checkInvocationCorrectness(this);

          if (typeof contents === "string") {
            var self_1 = this;
            var style = $basicStyleSheet.get(self_1).ownerNode;
            style.textContent = hasBrokenRules ? fixBrokenRules(rejectImports(contents)) : rejectImports(contents);
            $basicStyleSheet.set(self_1, style.sheet);
            $locations.get(self_1).forEach(function (location) {
              if (location.isConnected()) {
                restyleAdopter(self_1, getAdopterByLocation(self_1, location));
              }
            });
          }
        };

        defineProperty(proto$1, "cssRules", {
          configurable: true,
          enumerable: true,
          get: function cssRules() {
            checkInvocationCorrectness(this);
            return $basicStyleSheet.get(this).cssRules;
          }
        });
        cssStyleSheetMethods.forEach(function (method) {
          proto$1[method] = function () {
            var self = this;
            checkInvocationCorrectness(self);
            var args = arguments;
            $locations.get(self).forEach(function (location) {
              if (location.isConnected()) {
                var sheet = getAdopterByLocation(self, location).sheet;
                sheet[method].apply(sheet, args);
              }
            });

            if (hasBrokenRules) {
              if (method === "insertRule") {
                args[0] = fixBrokenRules(args[0]);
              }

              if (method === "addRule") {
                args[1] = fixBrokenRules(args[1]);
              }
            }

            var basic = $basicStyleSheet.get(self);
            return basic[method].apply(basic, args);
          };
        });
        defineProperty(ConstructedStyleSheet, Symbol.hasInstance, {
          configurable: true,
          value: isCSSStyleSheetInstance
        });
        var defaultObserverOptions = {
          childList: true,
          subtree: true
        };
        var locations = new WeakMap();

        function getAssociatedLocation(element) {
          var location = locations.get(element);

          if (!location) {
            location = new Location(element);
            locations.set(element, location);
          }

          return location;
        }

        function attachAdoptedStyleSheetProperty(constructor) {
          defineProperty(constructor.prototype, "adoptedStyleSheets", {
            configurable: true,
            enumerable: true,
            get: function get() {
              return getAssociatedLocation(this).sheets;
            },
            set: function set(sheets) {
              getAssociatedLocation(this).update(sheets);
            }
          });
        }

        function traverseWebComponents(node, callback) {
          var iter = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT, function (foundNode) {
            return getShadowRoot(foundNode) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }, null, false);

          for (var next = void 0; next = iter.nextNode();) {
            callback(getShadowRoot(next));
          }
        }

        var $element = new WeakMap();
        var $uniqueSheets = new WeakMap();
        var $observer = new WeakMap();

        function isExistingAdopter(self, element) {
          return element instanceof HTMLStyleElement && $uniqueSheets.get(self).some(function (sheet) {
            return getAdopterByLocation(sheet, self);
          });
        }

        function getAdopterContainer(self) {
          var element = $element.get(self);
          return element instanceof Document ? element.body : element;
        }

        function adopt(self) {
          var styleList = document.createDocumentFragment();
          var sheets = $uniqueSheets.get(self);
          var observer = $observer.get(self);
          var container = getAdopterContainer(self);
          observer.disconnect();
          sheets.forEach(function (sheet) {
            styleList.appendChild(getAdopterByLocation(sheet, self) || addAdopterLocation(sheet, self));
          });
          container.insertBefore(styleList, null);
          observer.observe(container, defaultObserverOptions);
          sheets.forEach(function (sheet) {
            restyleAdopter(sheet, getAdopterByLocation(sheet, self));
          });
        }

        function Location(element) {
          var self = this;
          self.sheets = [];
          $element.set(self, element);
          $uniqueSheets.set(self, []);
          $observer.set(self, new MutationObserver(function (mutations, observer) {
            if (!document) {
              observer.disconnect();
              return;
            }

            mutations.forEach(function (mutation) {
              if (!hasShadyCss) {
                forEach.call(mutation.addedNodes, function (node) {
                  if (!(node instanceof Element)) {
                    return;
                  }

                  traverseWebComponents(node, function (root) {
                    getAssociatedLocation(root).connect();
                  });
                });
              }

              forEach.call(mutation.removedNodes, function (node) {
                if (!(node instanceof Element)) {
                  return;
                }

                if (isExistingAdopter(self, node)) {
                  adopt(self);
                }

                if (!hasShadyCss) {
                  traverseWebComponents(node, function (root) {
                    getAssociatedLocation(root).disconnect();
                  });
                }
              });
            });
          }));
        }

        Location.prototype = {
          isConnected: function isConnected() {
            var element = $element.get(this);
            return element instanceof Document ? element.readyState !== "loading" : isElementConnected(element.host);
          },
          connect: function connect() {
            var container = getAdopterContainer(this);
            $observer.get(this).observe(container, defaultObserverOptions);

            if ($uniqueSheets.get(this).length > 0) {
              adopt(this);
            }

            traverseWebComponents(container, function (root) {
              getAssociatedLocation(root).connect();
            });
          },
          disconnect: function disconnect() {
            $observer.get(this).disconnect();
          },
          update: function update(sheets) {
            var self = this;
            var locationType = $element.get(self) === document ? "Document" : "ShadowRoot";

            if (!Array.isArray(sheets)) {
              throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Iterator getter is not callable.");
            }

            if (!sheets.every(isCSSStyleSheetInstance)) {
              throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Failed to convert value to 'CSSStyleSheet'");
            }

            if (sheets.some(isNonConstructedStyleSheetInstance)) {
              throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Can't adopt non-constructed stylesheets");
            }

            self.sheets = sheets;
            var oldUniqueSheets = $uniqueSheets.get(self);
            var uniqueSheets = unique(sheets);
            var removedSheets = diff(oldUniqueSheets, uniqueSheets);
            removedSheets.forEach(function (sheet) {
              removeNode(getAdopterByLocation(sheet, self));
              removeAdopterLocation(sheet, self);
            });
            $uniqueSheets.set(self, uniqueSheets);

            if (self.isConnected() && uniqueSheets.length > 0) {
              adopt(self);
            }
          }
        };
        window.CSSStyleSheet = ConstructedStyleSheet;
        attachAdoptedStyleSheetProperty(Document);

        if ("ShadowRoot" in window) {
          attachAdoptedStyleSheetProperty(ShadowRoot);
          var proto = Element.prototype;
          var attach_1 = proto.attachShadow;

          proto.attachShadow = function attachShadow(init) {
            var root = attach_1.call(this, init);

            if (init.mode === "closed") {
              closedShadowRootRegistry.set(this, root);
            }

            return root;
          };
        }

        var documentLocation = getAssociatedLocation(document);

        if (documentLocation.isConnected()) {
          documentLocation.connect();
        } else {
          document.addEventListener("DOMContentLoaded", documentLocation.connect.bind(documentLocation));
        }
      })();

      arrayWithoutHoles = arr => {
        if (Array.isArray(arr)) return arrayLikeToArray(arr);
      };

      nonIterableSpread = () => {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      };

      _export("c", _toConsumableArray = arr => arrayWithoutHoles(arr) || _iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread()); // eslint-disable-next-line consistent-return


      arrayWithHoles = arr => {
        if (Array.isArray(arr)) return arr;
      };

      nonIterableRest = () => {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      };

      _export("b", _slicedToArray = (arr, i) => arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest());

      defineProperty = (obj, key, value) => {
        // Shortcircuit the slow defineProperty path when possible.
        // We are trying to avoid issues where setters defined on the
        // prototype cause side effects under the fast path of simple
        // assignment. By checking for existence of the property with
        // the in operator, we can optimize most of this overhead away.
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      };

      nativeTypeOf = obj => typeof obj;

      customTypeOf = obj => {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _export("_", _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? nativeTypeOf : customTypeOf);
    }
  };
});