// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/underscore/modules/_setup.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_ARRAY_INDEX = exports.nonEnumerableProps = exports.hasEnumBug = exports._isFinite = exports._isNaN = exports.nativeIsView = exports.nativeCreate = exports.nativeKeys = exports.nativeIsArray = exports.supportsDataView = exports.supportsArrayBuffer = exports.hasOwnProperty = exports.toString = exports.slice = exports.push = exports.SymbolProto = exports.ObjProto = exports.ArrayProto = exports.root = exports.VERSION = void 0;
// Current version.
var VERSION = '1.12.0'; // Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.

exports.VERSION = VERSION;
var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || Function('return this')() || {}; // Save bytes in the minified (but not gzipped) version:

exports.root = root;
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;
exports.ObjProto = ObjProto;
exports.ArrayProto = ArrayProto;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null; // Create quick reference variables for speed access to core prototypes.

exports.SymbolProto = SymbolProto;
var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty; // Modern feature detection.

exports.hasOwnProperty = hasOwnProperty;
exports.toString = toString;
exports.slice = slice;
exports.push = push;
var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
    supportsDataView = typeof DataView !== 'undefined'; // All **ECMAScript 5+** native function implementations that we hope to use
// are declared here.

exports.supportsDataView = supportsDataView;
exports.supportsArrayBuffer = supportsArrayBuffer;
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create,
    nativeIsView = supportsArrayBuffer && ArrayBuffer.isView; // Create references to these builtin functions because we override them.

exports.nativeIsView = nativeIsView;
exports.nativeCreate = nativeCreate;
exports.nativeKeys = nativeKeys;
exports.nativeIsArray = nativeIsArray;
var _isNaN = isNaN,
    _isFinite = isFinite; // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.

exports._isFinite = _isFinite;
exports._isNaN = _isNaN;
var hasEnumBug = !{
  toString: null
}.propertyIsEnumerable('toString');
exports.hasEnumBug = hasEnumBug;
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // The largest integer that can be represented exactly.

exports.nonEnumerableProps = nonEnumerableProps;
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
exports.MAX_ARRAY_INDEX = MAX_ARRAY_INDEX;
},{}],"node_modules/underscore/modules/restArguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restArguments;

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;

    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }

    switch (startIndex) {
      case 0:
        return func.call(this, rest);

      case 1:
        return func.call(this, arguments[0], rest);

      case 2:
        return func.call(this, arguments[0], arguments[1], rest);
    }

    var args = Array(startIndex + 1);

    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }

    args[startIndex] = rest;
    return func.apply(this, args);
  };
}
},{}],"node_modules/underscore/modules/isObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

// Is a given variable an object?
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}
},{}],"node_modules/underscore/modules/isNull.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNull;

// Is a given value equal to null?
function isNull(obj) {
  return obj === null;
}
},{}],"node_modules/underscore/modules/isUndefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUndefined;

// Is a given variable undefined?
function isUndefined(obj) {
  return obj === void 0;
}
},{}],"node_modules/underscore/modules/isBoolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;

var _setup = require("./_setup.js");

// Is a given value a boolean?
function isBoolean(obj) {
  return obj === true || obj === false || _setup.toString.call(obj) === '[object Boolean]';
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/isElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isElement;

// Is a given value a DOM element?
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}
},{}],"node_modules/underscore/modules/_tagTester.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tagTester;

var _setup = require("./_setup.js");

// Internal function for creating a `toString`-based type tester.
function tagTester(name) {
  var tag = '[object ' + name + ']';
  return function (obj) {
    return _setup.toString.call(obj) === tag;
  };
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/isString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('String');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isNumber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Number');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Date');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isRegExp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('RegExp');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Error');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isSymbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Symbol');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isArrayBuffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('ArrayBuffer');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/isFunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _setup = require("./_setup.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFunction = (0, _tagTester.default)('Function'); // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).

var nodelist = _setup.root.document && _setup.root.document.childNodes;

if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
  isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
}

var _default = isFunction;
exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_hasObjectTag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Object');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/_stringTagBug.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE11 = exports.hasStringTagBug = void 0;

var _setup = require("./_setup.js");

var _hasObjectTag = _interopRequireDefault(require("./_hasObjectTag.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
// In IE 11, the most common among them, this problem also applies to
// `Map`, `WeakMap` and `Set`.
var hasStringTagBug = _setup.supportsDataView && (0, _hasObjectTag.default)(new DataView(new ArrayBuffer(8))),
    isIE11 = typeof Map !== 'undefined' && (0, _hasObjectTag.default)(new Map());
exports.isIE11 = isIE11;
exports.hasStringTagBug = hasStringTagBug;
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./_hasObjectTag.js":"node_modules/underscore/modules/_hasObjectTag.js"}],"node_modules/underscore/modules/isDataView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isArrayBuffer = _interopRequireDefault(require("./isArrayBuffer.js"));

var _stringTagBug = require("./_stringTagBug.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDataView = (0, _tagTester.default)('DataView'); // In IE 10 - Edge 13, we need a different heuristic
// to determine whether an object is a `DataView`.

function ie10IsDataView(obj) {
  return obj != null && (0, _isFunction.default)(obj.getInt8) && (0, _isArrayBuffer.default)(obj.buffer);
}

var _default = _stringTagBug.hasStringTagBug ? ie10IsDataView : isDataView;

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./isArrayBuffer.js":"node_modules/underscore/modules/isArrayBuffer.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js"}],"node_modules/underscore/modules/isArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setup = require("./_setup.js");

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given value an array?
// Delegates to ECMA5's native `Array.isArray`.
var _default = _setup.nativeIsArray || (0, _tagTester.default)('Array');

exports.default = _default;
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/_has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = has;

var _setup = require("./_setup.js");

// Internal function to check whether `key` is an own property name of `obj`.
function has(obj, key) {
  return obj != null && _setup.hasOwnProperty.call(obj, key);
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/isArguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArguments = (0, _tagTester.default)('Arguments'); // Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.

(function () {
  if (!isArguments(arguments)) {
    isArguments = function (obj) {
      return (0, _has.default)(obj, 'callee');
    };
  }
})();

var _default = isArguments;
exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/isFinite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFinite;

var _setup = require("./_setup.js");

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given object a finite number?
function isFinite(obj) {
  return !(0, _isSymbol.default)(obj) && (0, _setup._isFinite)(obj) && !isNaN(parseFloat(obj));
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isSymbol.js":"node_modules/underscore/modules/isSymbol.js"}],"node_modules/underscore/modules/isNaN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNaN;

var _setup = require("./_setup.js");

var _isNumber = _interopRequireDefault(require("./isNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is the given value `NaN`?
function isNaN(obj) {
  return (0, _isNumber.default)(obj) && (0, _setup._isNaN)(obj);
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isNumber.js":"node_modules/underscore/modules/isNumber.js"}],"node_modules/underscore/modules/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constant;

// Predicate-generating function. Often useful outside of Underscore.
function constant(value) {
  return function () {
    return value;
  };
}
},{}],"node_modules/underscore/modules/_createSizePropertyCheck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSizePropertyCheck;

var _setup = require("./_setup.js");

// Common internal logic for `isArrayLike` and `isBufferLike`.
function createSizePropertyCheck(getSizeProperty) {
  return function (collection) {
    var sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= _setup.MAX_ARRAY_INDEX;
  };
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_shallowProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowProperty;

// Internal helper to generate a function to obtain property `key` from `obj`.
function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
}
},{}],"node_modules/underscore/modules/_getByteLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shallowProperty = _interopRequireDefault(require("./_shallowProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to obtain the `byteLength` property of an object.
var _default = (0, _shallowProperty.default)('byteLength');

exports.default = _default;
},{"./_shallowProperty.js":"node_modules/underscore/modules/_shallowProperty.js"}],"node_modules/underscore/modules/_isBufferLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createSizePropertyCheck = _interopRequireDefault(require("./_createSizePropertyCheck.js"));

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to determine whether we should spend extensive checks against
// `ArrayBuffer` et al.
var _default = (0, _createSizePropertyCheck.default)(_getByteLength.default);

exports.default = _default;
},{"./_createSizePropertyCheck.js":"node_modules/underscore/modules/_createSizePropertyCheck.js","./_getByteLength.js":"node_modules/underscore/modules/_getByteLength.js"}],"node_modules/underscore/modules/isTypedArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setup = require("./_setup.js");

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _isBufferLike = _interopRequireDefault(require("./_isBufferLike.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given value a typed array?
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;

function isTypedArray(obj) {
  // `ArrayBuffer.isView` is the most future-proof, so use it when available.
  // Otherwise, fall back on the above regular expression.
  return _setup.nativeIsView ? (0, _setup.nativeIsView)(obj) && !(0, _isDataView.default)(obj) : (0, _isBufferLike.default)(obj) && typedArrayPattern.test(_setup.toString.call(obj));
}

var _default = _setup.supportsArrayBuffer ? isTypedArray : (0, _constant.default)(false);

exports.default = _default;
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isDataView.js":"node_modules/underscore/modules/isDataView.js","./constant.js":"node_modules/underscore/modules/constant.js","./_isBufferLike.js":"node_modules/underscore/modules/_isBufferLike.js"}],"node_modules/underscore/modules/_getLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shallowProperty = _interopRequireDefault(require("./_shallowProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to obtain the `length` property of an object.
var _default = (0, _shallowProperty.default)('length');

exports.default = _default;
},{"./_shallowProperty.js":"node_modules/underscore/modules/_shallowProperty.js"}],"node_modules/underscore/modules/_collectNonEnumProps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectNonEnumProps;

var _setup = require("./_setup.js");

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to create a simple lookup structure.
// `collectNonEnumProps` used to depend on `_.contains`, but this led to
// circular imports. `emulatedSet` is a one-off solution that only works for
// arrays of strings.
function emulatedSet(keys) {
  var hash = {};

  for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;

  return {
    contains: function (key) {
      return hash[key];
    },
    push: function (key) {
      hash[key] = true;
      return keys.push(key);
    }
  };
} // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
// be iterated by `for key in ...` and thus missed. Extends `keys` in place if
// needed.


function collectNonEnumProps(obj, keys) {
  keys = emulatedSet(keys);
  var nonEnumIdx = _setup.nonEnumerableProps.length;
  var constructor = obj.constructor;

  var proto = (0, _isFunction.default)(constructor) && constructor.prototype || _setup.ObjProto; // Constructor is a special case.


  var prop = 'constructor';
  if ((0, _has.default)(obj, prop) && !keys.contains(prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = _setup.nonEnumerableProps[nonEnumIdx];

    if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
      keys.push(prop);
    }
  }
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keys;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

var _has = _interopRequireDefault(require("./_has.js"));

var _collectNonEnumProps = _interopRequireDefault(require("./_collectNonEnumProps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
function keys(obj) {
  if (!(0, _isObject.default)(obj)) return [];
  if (_setup.nativeKeys) return (0, _setup.nativeKeys)(obj);
  var keys = [];

  for (var key in obj) if ((0, _has.default)(obj, key)) keys.push(key); // Ahem, IE < 9.


  if (_setup.hasEnumBug) (0, _collectNonEnumProps.default)(obj, keys);
  return keys;
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_has.js":"node_modules/underscore/modules/_has.js","./_collectNonEnumProps.js":"node_modules/underscore/modules/_collectNonEnumProps.js"}],"node_modules/underscore/modules/isEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isString = _interopRequireDefault(require("./isString.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
function isEmpty(obj) {
  if (obj == null) return true; // Skip the more expensive `toString`-based type checks if `obj` has no
  // `.length`.

  var length = (0, _getLength.default)(obj);
  if (typeof length == 'number' && ((0, _isArray.default)(obj) || (0, _isString.default)(obj) || (0, _isArguments.default)(obj))) return length === 0;
  return (0, _getLength.default)((0, _keys.default)(obj)) === 0;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./isString.js":"node_modules/underscore/modules/isString.js","./isArguments.js":"node_modules/underscore/modules/isArguments.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/isMatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMatch;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns whether an object has a given set of `key:value` pairs.
function isMatch(object, attrs) {
  var _keys = (0, _keys2.default)(attrs),
      length = _keys.length;

  if (object == null) return !length;
  var obj = Object(object);

  for (var i = 0; i < length; i++) {
    var key = _keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }

  return true;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/underscore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _;

var _setup = require("./_setup.js");

// If Underscore is called as a function, it returns a wrapped object that can
// be used OO-style. This wrapper holds altered versions of all functions added
// through `_.mixin`. Wrapped objects may be chained.
function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
}

_.VERSION = _setup.VERSION; // Extracts the result from a wrapped and chained object.

_.prototype.value = function () {
  return this._wrapped;
}; // Provide unwrapping proxies for some methods used in engine operations
// such as arithmetic and JSON stringification.


_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

_.prototype.toString = function () {
  return String(this._wrapped);
};
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_toBufferView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toBufferView;

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to wrap or shallow-copy an ArrayBuffer,
// typed array or DataView to a new view, reusing the buffer.
function toBufferView(bufferSource) {
  return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, (0, _getByteLength.default)(bufferSource));
}
},{"./_getByteLength.js":"node_modules/underscore/modules/_getByteLength.js"}],"node_modules/underscore/modules/isEqual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEqual;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _setup = require("./_setup.js");

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

var _isTypedArray = _interopRequireDefault(require("./isTypedArray.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

var _has = _interopRequireDefault(require("./_has.js"));

var _toBufferView = _interopRequireDefault(require("./_toBufferView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We use this string twice, so give it a name for minification.
var tagDataView = '[object DataView]'; // Internal recursive comparison function for `_.isEqual`.

function eq(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

  if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

  if (a !== a) return b !== b; // Exhaust primitive checks

  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
} // Internal recursive comparison function for `_.isEqual`.


function deepEq(a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  if (a instanceof _underscore.default) a = a._wrapped;
  if (b instanceof _underscore.default) b = b._wrapped; // Compare `[[Class]]` names.

  var className = _setup.toString.call(a);

  if (className !== _setup.toString.call(b)) return false; // Work around a bug in IE 10 - Edge 13.

  if (_stringTagBug.hasStringTagBug && className == '[object Object]' && (0, _isDataView.default)(a)) {
    if (!(0, _isDataView.default)(b)) return false;
    className = tagDataView;
  }

  switch (className) {
    // These types are compared by value.
    case '[object RegExp]': // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;

    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;

    case '[object Symbol]':
      return _setup.SymbolProto.valueOf.call(a) === _setup.SymbolProto.valueOf.call(b);

    case '[object ArrayBuffer]':
    case tagDataView:
      // Coerce to typed array so we can fall through.
      return deepEq((0, _toBufferView.default)(a), (0, _toBufferView.default)(b), aStack, bStack);
  }

  var areArrays = className === '[object Array]';

  if (!areArrays && (0, _isTypedArray.default)(a)) {
    var byteLength = (0, _getByteLength.default)(a);
    if (byteLength !== (0, _getByteLength.default)(b)) return false;
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
    areArrays = true;
  }

  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.

    var aCtor = a.constructor,
        bCtor = b.constructor;

    if (aCtor !== bCtor && !((0, _isFunction.default)(aCtor) && aCtor instanceof aCtor && (0, _isFunction.default)(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
      return false;
    }
  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.


  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  } // Add the first object to the stack of traversed objects.


  aStack.push(a);
  bStack.push(b); // Recursively compare objects and arrays.

  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var _keys = (0, _keys2.default)(a),
        key;

    length = _keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

    if ((0, _keys2.default)(b).length !== length) return false;

    while (length--) {
      // Deep compare each member
      key = _keys[length];
      if (!((0, _has.default)(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  } // Remove the first object from the stack of traversed objects.


  aStack.pop();
  bStack.pop();
  return true;
} // Perform a deep comparison to check if two objects are equal.


function isEqual(a, b) {
  return eq(a, b);
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_getByteLength.js":"node_modules/underscore/modules/_getByteLength.js","./isTypedArray.js":"node_modules/underscore/modules/isTypedArray.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./isDataView.js":"node_modules/underscore/modules/isDataView.js","./keys.js":"node_modules/underscore/modules/keys.js","./_has.js":"node_modules/underscore/modules/_has.js","./_toBufferView.js":"node_modules/underscore/modules/_toBufferView.js"}],"node_modules/underscore/modules/allKeys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = allKeys;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

var _collectNonEnumProps = _interopRequireDefault(require("./_collectNonEnumProps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve all the enumerable property names of an object.
function allKeys(obj) {
  if (!(0, _isObject.default)(obj)) return [];
  var keys = [];

  for (var key in obj) keys.push(key); // Ahem, IE < 9.


  if (_setup.hasEnumBug) (0, _collectNonEnumProps.default)(obj, keys);
  return keys;
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_collectNonEnumProps.js":"node_modules/underscore/modules/_collectNonEnumProps.js"}],"node_modules/underscore/modules/_methodFingerprint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ie11fingerprint = ie11fingerprint;
exports.setMethods = exports.weakMapMethods = exports.mapMethods = void 0;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Since the regular `Object.prototype.toString` type tests don't work for
// some types in IE 11, we use a fingerprinting heuristic instead, based
// on the methods. It's not great, but it's the best we got.
// The fingerprint method lists are defined below.
function ie11fingerprint(methods) {
  var length = (0, _getLength.default)(methods);
  return function (obj) {
    if (obj == null) return false; // `Map`, `WeakMap` and `Set` have no enumerable keys.

    var keys = (0, _allKeys.default)(obj);
    if ((0, _getLength.default)(keys)) return false;

    for (var i = 0; i < length; i++) {
      if (!(0, _isFunction.default)(obj[methods[i]])) return false;
    } // If we are testing against `WeakMap`, we need to ensure that
    // `obj` doesn't have a `forEach` method in order to distinguish
    // it from a regular `Map`.


    return methods !== weakMapMethods || !(0, _isFunction.default)(obj[forEachName]);
  };
} // In the interest of compact minification, we write
// each string in the fingerprints only once.


var forEachName = 'forEach',
    hasName = 'has',
    commonInit = ['clear', 'delete'],
    mapTail = ['get', hasName, 'set']; // `Map`, `WeakMap` and `Set` each have slightly different
// combinations of the above sublists.

var mapMethods = commonInit.concat(forEachName, mapTail),
    weakMapMethods = commonInit.concat(mapTail),
    setMethods = ['add'].concat(commonInit, forEachName, hasName);
exports.setMethods = setMethods;
exports.weakMapMethods = weakMapMethods;
exports.mapMethods = mapMethods;
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js"}],"node_modules/underscore/modules/isMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.mapMethods) : (0, _tagTester.default)('Map');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"node_modules/underscore/modules/_methodFingerprint.js"}],"node_modules/underscore/modules/isWeakMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.weakMapMethods) : (0, _tagTester.default)('WeakMap');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"node_modules/underscore/modules/_methodFingerprint.js"}],"node_modules/underscore/modules/isSet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.setMethods) : (0, _tagTester.default)('Set');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"node_modules/underscore/modules/_methodFingerprint.js"}],"node_modules/underscore/modules/isWeakSet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('WeakSet');

exports.default = _default;
},{"./_tagTester.js":"node_modules/underscore/modules/_tagTester.js"}],"node_modules/underscore/modules/values.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = values;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve the values of an object's properties.
function values(obj) {
  var _keys = (0, _keys2.default)(obj);

  var length = _keys.length;
  var values = Array(length);

  for (var i = 0; i < length; i++) {
    values[i] = obj[_keys[i]];
  }

  return values;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pairs;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convert an object into a list of `[key, value]` pairs.
// The opposite of `_.object` with one argument.
function pairs(obj) {
  var _keys = (0, _keys2.default)(obj);

  var length = _keys.length;
  var pairs = Array(length);

  for (var i = 0; i < length; i++) {
    pairs[i] = [_keys[i], obj[_keys[i]]];
  }

  return pairs;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/invert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invert;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Invert the keys and values of an object. The values must be serializable.
function invert(obj) {
  var result = {};

  var _keys = (0, _keys2.default)(obj);

  for (var i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }

  return result;
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = functions;

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a sorted list of the function names available on the object.
function functions(obj) {
  var names = [];

  for (var key in obj) {
    if ((0, _isFunction.default)(obj[key])) names.push(key);
  }

  return names.sort();
}
},{"./isFunction.js":"node_modules/underscore/modules/isFunction.js"}],"node_modules/underscore/modules/_createAssigner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAssigner;

// An internal function for creating assigner functions.
function createAssigner(keysFunc, defaults) {
  return function (obj) {
    var length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;

    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;

      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }

    return obj;
  };
}
},{}],"node_modules/underscore/modules/extend.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Extend a given object with all the properties in passed-in object(s).
var _default = (0, _createAssigner.default)(_allKeys.default);

exports.default = _default;
},{"./_createAssigner.js":"node_modules/underscore/modules/_createAssigner.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js"}],"node_modules/underscore/modules/extendOwn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assigns a given object with all the own properties in the passed-in
// object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
var _default = (0, _createAssigner.default)(_keys.default);

exports.default = _default;
},{"./_createAssigner.js":"node_modules/underscore/modules/_createAssigner.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/defaults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fill in a given object with default properties.
var _default = (0, _createAssigner.default)(_allKeys.default, true);

exports.default = _default;
},{"./_createAssigner.js":"node_modules/underscore/modules/_createAssigner.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js"}],"node_modules/underscore/modules/_baseCreate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = baseCreate;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a naked function reference for surrogate-prototype-swapping.
function ctor() {
  return function () {};
} // An internal function for creating a new object that inherits from another.


function baseCreate(prototype) {
  if (!(0, _isObject.default)(prototype)) return {};
  if (_setup.nativeCreate) return (0, _setup.nativeCreate)(prototype);
  var Ctor = ctor();
  Ctor.prototype = prototype;
  var result = new Ctor();
  Ctor.prototype = null;
  return result;
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _baseCreate = _interopRequireDefault(require("./_baseCreate.js"));

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
function create(prototype, props) {
  var result = (0, _baseCreate.default)(prototype);
  if (props) (0, _extendOwn.default)(result, props);
  return result;
}
},{"./_baseCreate.js":"node_modules/underscore/modules/_baseCreate.js","./extendOwn.js":"node_modules/underscore/modules/extendOwn.js"}],"node_modules/underscore/modules/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _extend = _interopRequireDefault(require("./extend.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a (shallow-cloned) duplicate of an object.
function clone(obj) {
  if (!(0, _isObject.default)(obj)) return obj;
  return (0, _isArray.default)(obj) ? obj.slice() : (0, _extend.default)({}, obj);
}
},{"./isObject.js":"node_modules/underscore/modules/isObject.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./extend.js":"node_modules/underscore/modules/extend.js"}],"node_modules/underscore/modules/tap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tap;

// Invokes `interceptor` with the `obj` and then returns `obj`.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
}
},{}],"node_modules/underscore/modules/toPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPath;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Normalize a (deep) property `path` to array.
// Like `_.iteratee`, this function can be customized.
function toPath(path) {
  return (0, _isArray.default)(path) ? path : [path];
}

_underscore.default.toPath = toPath;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./isArray.js":"node_modules/underscore/modules/isArray.js"}],"node_modules/underscore/modules/_toPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPath;

var _underscore = _interopRequireDefault(require("./underscore.js"));

require("./toPath.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal wrapper for `_.toPath` to enable minification.
// Similar to `cb` for `_.iteratee`.
function toPath(path) {
  return _underscore.default.toPath(path);
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./toPath.js":"node_modules/underscore/modules/toPath.js"}],"node_modules/underscore/modules/_deepGet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepGet;

// Internal function to obtain a nested property in `obj` along `path`.
function deepGet(obj, path) {
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }

  return length ? obj : void 0;
}
},{}],"node_modules/underscore/modules/get.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

var _toPath = _interopRequireDefault(require("./_toPath.js"));

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _isUndefined = _interopRequireDefault(require("./isUndefined.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the value of the (deep) property on `path` from `object`.
// If any property in `path` does not exist or if the value is
// `undefined`, return `defaultValue` instead.
// The `path` is normalized through `_.toPath`.
function get(object, path, defaultValue) {
  var value = (0, _deepGet.default)(object, (0, _toPath.default)(path));
  return (0, _isUndefined.default)(value) ? defaultValue : value;
}
},{"./_toPath.js":"node_modules/underscore/modules/_toPath.js","./_deepGet.js":"node_modules/underscore/modules/_deepGet.js","./isUndefined.js":"node_modules/underscore/modules/isUndefined.js"}],"node_modules/underscore/modules/has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = has;

var _has2 = _interopRequireDefault(require("./_has.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shortcut function for checking if an object has a given property directly on
// itself (in other words, not on a prototype). Unlike the internal `has`
// function, this public version can also traverse nested properties.
function has(obj, path) {
  path = (0, _toPath.default)(path);
  var length = path.length;

  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (!(0, _has2.default)(obj, key)) return false;
    obj = obj[key];
  }

  return !!length;
}
},{"./_has.js":"node_modules/underscore/modules/_has.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identity;

// Keep the identity function around for default iteratees.
function identity(value) {
  return value;
}
},{}],"node_modules/underscore/modules/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matcher;

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

var _isMatch = _interopRequireDefault(require("./isMatch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
function matcher(attrs) {
  attrs = (0, _extendOwn.default)({}, attrs);
  return function (obj) {
    return (0, _isMatch.default)(obj, attrs);
  };
}
},{"./extendOwn.js":"node_modules/underscore/modules/extendOwn.js","./isMatch.js":"node_modules/underscore/modules/isMatch.js"}],"node_modules/underscore/modules/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = property;

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indices.
function property(path) {
  path = (0, _toPath.default)(path);
  return function (obj) {
    return (0, _deepGet.default)(obj, path);
  };
}
},{"./_deepGet.js":"node_modules/underscore/modules/_deepGet.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/_optimizeCb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optimizeCb;

// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    // The 2-argument case is omitted because we’re not using it.

    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };

    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }

  return function () {
    return func.apply(context, arguments);
  };
}
},{}],"node_modules/underscore/modules/_baseIteratee.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = baseIteratee;

var _identity = _interopRequireDefault(require("./identity.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

var _property = _interopRequireDefault(require("./property.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `_.identity`,
// an arbitrary callback, a property matcher, or a property accessor.
function baseIteratee(value, context, argCount) {
  if (value == null) return _identity.default;
  if ((0, _isFunction.default)(value)) return (0, _optimizeCb.default)(value, context, argCount);
  if ((0, _isObject.default)(value) && !(0, _isArray.default)(value)) return (0, _matcher.default)(value);
  return (0, _property.default)(value);
}
},{"./identity.js":"node_modules/underscore/modules/identity.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./isObject.js":"node_modules/underscore/modules/isObject.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./matcher.js":"node_modules/underscore/modules/matcher.js","./property.js":"node_modules/underscore/modules/property.js","./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js"}],"node_modules/underscore/modules/iteratee.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = iteratee;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _baseIteratee = _interopRequireDefault(require("./_baseIteratee.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only `argCount` argument.
function iteratee(value, context) {
  return (0, _baseIteratee.default)(value, context, Infinity);
}

_underscore.default.iteratee = iteratee;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./_baseIteratee.js":"node_modules/underscore/modules/_baseIteratee.js"}],"node_modules/underscore/modules/_cb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cb;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _baseIteratee = _interopRequireDefault(require("./_baseIteratee.js"));

var _iteratee = _interopRequireDefault(require("./iteratee.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The function we call internally to generate a callback. It invokes
// `_.iteratee` if overridden, otherwise `baseIteratee`.
function cb(value, context, argCount) {
  if (_underscore.default.iteratee !== _iteratee.default) return _underscore.default.iteratee(value, context);
  return (0, _baseIteratee.default)(value, context, argCount);
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./_baseIteratee.js":"node_modules/underscore/modules/_baseIteratee.js","./iteratee.js":"node_modules/underscore/modules/iteratee.js"}],"node_modules/underscore/modules/mapObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapObject;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the results of applying the `iteratee` to each element of `obj`.
// In contrast to `_.map` it returns an object.
function mapObject(obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context);

  var _keys = (0, _keys2.default)(obj),
      length = _keys.length,
      results = {};

  for (var index = 0; index < length; index++) {
    var currentKey = _keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;

// Predicate-generating function. Often useful outside of Underscore.
function noop() {}
},{}],"node_modules/underscore/modules/propertyOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = propertyOf;

var _noop = _interopRequireDefault(require("./noop.js"));

var _get = _interopRequireDefault(require("./get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generates a function for a given object that returns a given property.
function propertyOf(obj) {
  if (obj == null) return _noop.default;
  return function (path) {
    return (0, _get.default)(obj, path);
  };
}
},{"./noop.js":"node_modules/underscore/modules/noop.js","./get.js":"node_modules/underscore/modules/get.js"}],"node_modules/underscore/modules/times.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = times;

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run a function **n** times.
function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = (0, _optimizeCb.default)(iteratee, context, 1);

  for (var i = 0; i < n; i++) accum[i] = iteratee(i);

  return accum;
}
},{"./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js"}],"node_modules/underscore/modules/random.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = random;

// Return a random integer between `min` and `max` (inclusive).
function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}
},{}],"node_modules/underscore/modules/now.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// A (possibly faster) way to get the current timestamp as an integer.
var _default = Date.now || function () {
  return new Date().getTime();
};

exports.default = _default;
},{}],"node_modules/underscore/modules/_createEscaper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEscaper;

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to generate functions for escaping and unescaping strings
// to/from HTML interpolation.
function createEscaper(map) {
  var escaper = function (match) {
    return map[match];
  }; // Regexes for identifying a key that needs to be escaped.


  var source = '(?:' + (0, _keys.default)(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}
},{"./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_escapeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Internal list of HTML entities for escaping.
var _default = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
exports.default = _default;
},{}],"node_modules/underscore/modules/escape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEscaper = _interopRequireDefault(require("./_createEscaper.js"));

var _escapeMap = _interopRequireDefault(require("./_escapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function for escaping strings to HTML interpolation.
var _default = (0, _createEscaper.default)(_escapeMap.default);

exports.default = _default;
},{"./_createEscaper.js":"node_modules/underscore/modules/_createEscaper.js","./_escapeMap.js":"node_modules/underscore/modules/_escapeMap.js"}],"node_modules/underscore/modules/_unescapeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invert = _interopRequireDefault(require("./invert.js"));

var _escapeMap = _interopRequireDefault(require("./_escapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal list of HTML entities for unescaping.
var _default = (0, _invert.default)(_escapeMap.default);

exports.default = _default;
},{"./invert.js":"node_modules/underscore/modules/invert.js","./_escapeMap.js":"node_modules/underscore/modules/_escapeMap.js"}],"node_modules/underscore/modules/unescape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEscaper = _interopRequireDefault(require("./_createEscaper.js"));

var _unescapeMap = _interopRequireDefault(require("./_unescapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function for unescaping strings from HTML interpolation.
var _default = (0, _createEscaper.default)(_unescapeMap.default);

exports.default = _default;
},{"./_createEscaper.js":"node_modules/underscore/modules/_createEscaper.js","./_unescapeMap.js":"node_modules/underscore/modules/_unescapeMap.js"}],"node_modules/underscore/modules/templateSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// By default, Underscore uses ERB-style template delimiters. Change the
// following template settings to use alternative delimiters.
var _default = _underscore.default.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

exports.default = _default;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;

var _defaults = _interopRequireDefault(require("./defaults.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

require("./templateSettings.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When customizing `_.templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
// string literal.

var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

function escapeChar(match) {
  return '\\' + escapes[match];
} // JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.


function template(text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = (0, _defaults.default)({}, settings, _underscore.default.templateSettings); // Combine delimiters into one regular expression via alternation.

  var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g'); // Compile the template source, escaping string literals appropriately.

  var index = 0;
  var source = "__p+='";
  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;

    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    } // Adobe VMs need the match returned to produce the correct offset.


    return match;
  });
  source += "';\n"; // If a variable is not specified, place data values in local scope.

  if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
  source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';
  var render;

  try {
    render = new Function(settings.variable || 'obj', '_', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  var template = function (data) {
    return render.call(this, data, _underscore.default);
  }; // Provide the compiled source as a convenience for precompilation.


  var argument = settings.variable || 'obj';
  template.source = 'function(' + argument + '){\n' + source + '}';
  return template;
}
},{"./defaults.js":"node_modules/underscore/modules/defaults.js","./underscore.js":"node_modules/underscore/modules/underscore.js","./templateSettings.js":"node_modules/underscore/modules/templateSettings.js"}],"node_modules/underscore/modules/result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = result;

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.
function result(obj, path, fallback) {
  path = (0, _toPath.default)(path);
  var length = path.length;

  if (!length) {
    return (0, _isFunction.default)(fallback) ? fallback.call(obj) : fallback;
  }

  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];

    if (prop === void 0) {
      prop = fallback;
      i = length; // Ensure we don't continue iterating.
    }

    obj = (0, _isFunction.default)(prop) ? prop.call(obj) : prop;
  }

  return obj;
}
},{"./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/uniqueId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqueId;
// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var idCounter = 0;

function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
}
},{}],"node_modules/underscore/modules/chain.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chain;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start chaining a wrapped Underscore object.
function chain(obj) {
  var instance = (0, _underscore.default)(obj);
  instance._chain = true;
  return instance;
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/_executeBound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = executeBound;

var _baseCreate = _interopRequireDefault(require("./_baseCreate.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to execute `sourceFunc` bound to `context` with optional
// `args`. Determines whether to execute a function as a constructor or as a
// normal function.
function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  var self = (0, _baseCreate.default)(sourceFunc.prototype);
  var result = sourceFunc.apply(self, args);
  if ((0, _isObject.default)(result)) return result;
  return self;
}
},{"./_baseCreate.js":"node_modules/underscore/modules/_baseCreate.js","./isObject.js":"node_modules/underscore/modules/isObject.js"}],"node_modules/underscore/modules/partial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _executeBound = _interopRequireDefault(require("./_executeBound.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. `_` acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
var partial = (0, _restArguments.default)(function (func, boundArgs) {
  var placeholder = partial.placeholder;

  var bound = function () {
    var position = 0,
        length = boundArgs.length;
    var args = Array(length);

    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }

    while (position < arguments.length) args.push(arguments[position++]);

    return (0, _executeBound.default)(func, bound, this, this, args);
  };

  return bound;
});
partial.placeholder = _underscore.default;
var _default = partial;
exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./_executeBound.js":"node_modules/underscore/modules/_executeBound.js","./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/bind.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _executeBound = _interopRequireDefault(require("./_executeBound.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a function bound to a given object (assigning `this`, and arguments,
// optionally).
var _default = (0, _restArguments.default)(function (func, context, args) {
  if (!(0, _isFunction.default)(func)) throw new TypeError('Bind must be called on a function');
  var bound = (0, _restArguments.default)(function (callArgs) {
    return (0, _executeBound.default)(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_executeBound.js":"node_modules/underscore/modules/_executeBound.js"}],"node_modules/underscore/modules/_isArrayLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createSizePropertyCheck = _interopRequireDefault(require("./_createSizePropertyCheck.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
var _default = (0, _createSizePropertyCheck.default)(_getLength.default);

exports.default = _default;
},{"./_createSizePropertyCheck.js":"node_modules/underscore/modules/_createSizePropertyCheck.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/_flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal implementation of a recursive `flatten` function.
function flatten(input, depth, strict, output) {
  output = output || [];

  if (!depth && depth !== 0) {
    depth = Infinity;
  } else if (depth <= 0) {
    return output.concat(input);
  }

  var idx = output.length;

  for (var i = 0, length = (0, _getLength.default)(input); i < length; i++) {
    var value = input[i];

    if ((0, _isArrayLike.default)(value) && ((0, _isArray.default)(value) || (0, _isArguments.default)(value))) {
      // Flatten current level of array or arguments object.
      if (depth > 1) {
        flatten(value, depth - 1, strict, output);
        idx = output.length;
      } else {
        var j = 0,
            len = value.length;

        while (j < len) output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./isArguments.js":"node_modules/underscore/modules/isArguments.js"}],"node_modules/underscore/modules/bindAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _bind = _interopRequireDefault(require("./bind.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
var _default = (0, _restArguments.default)(function (obj, keys) {
  keys = (0, _flatten.default)(keys, false, false);
  var index = keys.length;
  if (index < 1) throw new Error('bindAll must be passed function names');

  while (index--) {
    var key = keys[index];
    obj[key] = (0, _bind.default)(obj[key], obj);
  }

  return obj;
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js","./bind.js":"node_modules/underscore/modules/bind.js"}],"node_modules/underscore/modules/memoize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoize;

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Memoize an expensive function by storing its results.
function memoize(func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!(0, _has.default)(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };

  memoize.cache = {};
  return memoize;
}
},{"./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
var _default = (0, _restArguments.default)(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js"}],"node_modules/underscore/modules/defer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _partial = _interopRequireDefault(require("./partial.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Defers a function, scheduling it to run after the current call stack has
// cleared.
var _default = (0, _partial.default)(_delay.default, _underscore.default, 1);

exports.default = _default;
},{"./partial.js":"node_modules/underscore/modules/partial.js","./delay.js":"node_modules/underscore/modules/delay.js","./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

var _now2 = _interopRequireDefault(require("./now.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : (0, _now2.default)();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var _now = (0, _now2.default)();

    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
},{"./now.js":"node_modules/underscore/modules/now.js"}],"node_modules/underscore/modules/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When a sequence of calls of the returned function ends, the argument
// function is triggered. The end of a sequence is defined by the `wait`
// parameter. If `immediate` is passed, the argument function will be
// triggered at the beginning of the sequence instead of at the end.
function debounce(func, wait, immediate) {
  var timeout, result;

  var later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = (0, _restArguments.default)(function (args) {
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = (0, _delay.default)(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./delay.js":"node_modules/underscore/modules/delay.js"}],"node_modules/underscore/modules/wrap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrap;

var _partial = _interopRequireDefault(require("./partial.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
function wrap(func, wrapper) {
  return (0, _partial.default)(wrapper, func);
}
},{"./partial.js":"node_modules/underscore/modules/partial.js"}],"node_modules/underscore/modules/negate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = negate;

// Returns a negated version of the passed-in predicate.
function negate(predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
}
},{}],"node_modules/underscore/modules/compose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);

    while (i--) result = args[i].call(this, result);

    return result;
  };
}
},{}],"node_modules/underscore/modules/after.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = after;

// Returns a function that will only be executed on and after the Nth call.
function after(times, func) {
  return function () {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
}
},{}],"node_modules/underscore/modules/before.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = before;

// Returns a function that will only be executed up to (but not including) the
// Nth call.
function before(times, func) {
  var memo;
  return function () {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }

    if (times <= 1) func = null;
    return memo;
  };
}
},{}],"node_modules/underscore/modules/once.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _partial = _interopRequireDefault(require("./partial.js"));

var _before = _interopRequireDefault(require("./before.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
var _default = (0, _partial.default)(_before.default, 2);

exports.default = _default;
},{"./partial.js":"node_modules/underscore/modules/partial.js","./before.js":"node_modules/underscore/modules/before.js"}],"node_modules/underscore/modules/findKey.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findKey;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first key on an object that passes a truth test.
function findKey(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = (0, _keys2.default)(obj),
      key;

  for (var i = 0, length = _keys.length; i < length; i++) {
    key = _keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_createPredicateIndexFinder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPredicateIndexFinder;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to generate `_.findIndex` and `_.findLastIndex`.
function createPredicateIndexFinder(dir) {
  return function (array, predicate, context) {
    predicate = (0, _cb.default)(predicate, context);
    var length = (0, _getLength.default)(array);
    var index = dir > 0 ? 0 : length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }

    return -1;
  };
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/findIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPredicateIndexFinder = _interopRequireDefault(require("./_createPredicateIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first index on an array-like that passes a truth test.
var _default = (0, _createPredicateIndexFinder.default)(1);

exports.default = _default;
},{"./_createPredicateIndexFinder.js":"node_modules/underscore/modules/_createPredicateIndexFinder.js"}],"node_modules/underscore/modules/findLastIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPredicateIndexFinder = _interopRequireDefault(require("./_createPredicateIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the last index on an array-like that passes a truth test.
var _default = (0, _createPredicateIndexFinder.default)(-1);

exports.default = _default;
},{"./_createPredicateIndexFinder.js":"node_modules/underscore/modules/_createPredicateIndexFinder.js"}],"node_modules/underscore/modules/sortedIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortedIndex;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
function sortedIndex(array, obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context, 1);
  var value = iteratee(obj);
  var low = 0,
      high = (0, _getLength.default)(array);

  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
  }

  return low;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/_createIndexFinder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIndexFinder;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _setup = require("./_setup.js");

var _isNaN = _interopRequireDefault(require("./isNaN.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
function createIndexFinder(dir, predicateFind, sortedIndex) {
  return function (array, item, idx) {
    var i = 0,
        length = (0, _getLength.default)(array);

    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }

    if (item !== item) {
      idx = predicateFind(_setup.slice.call(array, i, length), _isNaN.default);
      return idx >= 0 ? idx + i : -1;
    }

    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }

    return -1;
  };
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./isNaN.js":"node_modules/underscore/modules/isNaN.js"}],"node_modules/underscore/modules/indexOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sortedIndex = _interopRequireDefault(require("./sortedIndex.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _createIndexFinder = _interopRequireDefault(require("./_createIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
var _default = (0, _createIndexFinder.default)(1, _findIndex.default, _sortedIndex.default);

exports.default = _default;
},{"./sortedIndex.js":"node_modules/underscore/modules/sortedIndex.js","./findIndex.js":"node_modules/underscore/modules/findIndex.js","./_createIndexFinder.js":"node_modules/underscore/modules/_createIndexFinder.js"}],"node_modules/underscore/modules/lastIndexOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _findLastIndex = _interopRequireDefault(require("./findLastIndex.js"));

var _createIndexFinder = _interopRequireDefault(require("./_createIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the position of the last occurrence of an item in an array,
// or -1 if the item is not included in the array.
var _default = (0, _createIndexFinder.default)(-1, _findLastIndex.default);

exports.default = _default;
},{"./findLastIndex.js":"node_modules/underscore/modules/findLastIndex.js","./_createIndexFinder.js":"node_modules/underscore/modules/_createIndexFinder.js"}],"node_modules/underscore/modules/find.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = find;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _findKey = _interopRequireDefault(require("./findKey.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the first value which passes a truth test.
function find(obj, predicate, context) {
  var keyFinder = (0, _isArrayLike.default)(obj) ? _findIndex.default : _findKey.default;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1) return obj[key];
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./findIndex.js":"node_modules/underscore/modules/findIndex.js","./findKey.js":"node_modules/underscore/modules/findKey.js"}],"node_modules/underscore/modules/findWhere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findWhere;

var _find = _interopRequireDefault(require("./find.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.find`: getting the first
// object containing specific `key:value` pairs.
function findWhere(obj, attrs) {
  return (0, _find.default)(obj, (0, _matcher.default)(attrs));
}
},{"./find.js":"node_modules/underscore/modules/find.js","./matcher.js":"node_modules/underscore/modules/matcher.js"}],"node_modules/underscore/modules/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = each;

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The cornerstone for collection functions, an `each`
// implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
function each(obj, iteratee, context) {
  iteratee = (0, _optimizeCb.default)(iteratee, context);
  var i, length;

  if ((0, _isArrayLike.default)(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var _keys = (0, _keys2.default)(obj);

    for (i = 0, length = _keys.length; i < length; i++) {
      iteratee(obj[_keys[i]], _keys[i], obj);
    }
  }

  return obj;
}
},{"./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the results of applying the iteratee to each element.
function map(obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length,
      results = Array(length);

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_createReduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReduce;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to create a reducing function, iterating left or right.
function createReduce(dir) {
  // Wrap code that reassigns argument variables in a separate function than
  // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
  var reducer = function (obj, iteratee, memo, initial) {
    var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
        length = (_keys || obj).length,
        index = dir > 0 ? 0 : length - 1;

    if (!initial) {
      memo = obj[_keys ? _keys[index] : index];
      index += dir;
    }

    for (; index >= 0 && index < length; index += dir) {
      var currentKey = _keys ? _keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }

    return memo;
  };

  return function (obj, iteratee, memo, context) {
    var initial = arguments.length >= 3;
    return reducer(obj, (0, _optimizeCb.default)(iteratee, context, 4), memo, initial);
  };
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js","./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js"}],"node_modules/underscore/modules/reduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createReduce = _interopRequireDefault(require("./_createReduce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
var _default = (0, _createReduce.default)(1);

exports.default = _default;
},{"./_createReduce.js":"node_modules/underscore/modules/_createReduce.js"}],"node_modules/underscore/modules/reduceRight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createReduce = _interopRequireDefault(require("./_createReduce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The right-associative version of reduce, also known as `foldr`.
var _default = (0, _createReduce.default)(-1);

exports.default = _default;
},{"./_createReduce.js":"node_modules/underscore/modules/_createReduce.js"}],"node_modules/underscore/modules/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return all the elements that pass a truth test.
function filter(obj, predicate, context) {
  var results = [];
  predicate = (0, _cb.default)(predicate, context);
  (0, _each.default)(obj, function (value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/reject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reject;

var _filter = _interopRequireDefault(require("./filter.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return all the elements for which a truth test fails.
function reject(obj, predicate, context) {
  return (0, _filter.default)(obj, (0, _negate.default)((0, _cb.default)(predicate)), context);
}
},{"./filter.js":"node_modules/underscore/modules/filter.js","./negate.js":"node_modules/underscore/modules/negate.js","./_cb.js":"node_modules/underscore/modules/_cb.js"}],"node_modules/underscore/modules/every.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = every;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine whether all of the elements pass a truth test.
function every(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }

  return true;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/some.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = some;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if at least one element in the object passes a truth test.
function some(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }

  return false;
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _indexOf = _interopRequireDefault(require("./indexOf.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if the array or object contains a given item (using `===`).
function contains(obj, item, fromIndex, guard) {
  if (!(0, _isArrayLike.default)(obj)) obj = (0, _values.default)(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return (0, _indexOf.default)(obj, item, fromIndex) >= 0;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./values.js":"node_modules/underscore/modules/values.js","./indexOf.js":"node_modules/underscore/modules/indexOf.js"}],"node_modules/underscore/modules/invoke.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Invoke a method (with arguments) on every item in a collection.
var _default = (0, _restArguments.default)(function (obj, path, args) {
  var contextPath, func;

  if ((0, _isFunction.default)(path)) {
    func = path;
  } else {
    path = (0, _toPath.default)(path);
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }

  return (0, _map.default)(obj, function (context) {
    var method = func;

    if (!method) {
      if (contextPath && contextPath.length) {
        context = (0, _deepGet.default)(context, contextPath);
      }

      if (context == null) return void 0;
      method = context[path];
    }

    return method == null ? method : method.apply(context, args);
  });
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./map.js":"node_modules/underscore/modules/map.js","./_deepGet.js":"node_modules/underscore/modules/_deepGet.js","./_toPath.js":"node_modules/underscore/modules/_toPath.js"}],"node_modules/underscore/modules/pluck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluck;

var _map = _interopRequireDefault(require("./map.js"));

var _property = _interopRequireDefault(require("./property.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.map`: fetching a property.
function pluck(obj, key) {
  return (0, _map.default)(obj, (0, _property.default)(key));
}
},{"./map.js":"node_modules/underscore/modules/map.js","./property.js":"node_modules/underscore/modules/property.js"}],"node_modules/underscore/modules/where.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = where;

var _filter = _interopRequireDefault(require("./filter.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.filter`: selecting only
// objects containing specific `key:value` pairs.
function where(obj, attrs) {
  return (0, _filter.default)(obj, (0, _matcher.default)(attrs));
}
},{"./filter.js":"node_modules/underscore/modules/filter.js","./matcher.js":"node_modules/underscore/modules/matcher.js"}],"node_modules/underscore/modules/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the maximum element (or element-based computation).
function max(obj, iteratee, context) {
  var result = -Infinity,
      lastComputed = -Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0, _isArrayLike.default)(obj) ? obj : (0, _values.default)(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value > result) {
        result = value;
      }
    }
  } else {
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./values.js":"node_modules/underscore/modules/values.js","./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the minimum element (or element-based computation).
function min(obj, iteratee, context) {
  var result = Infinity,
      lastComputed = Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0, _isArrayLike.default)(obj) ? obj : (0, _values.default)(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value < result) {
        result = value;
      }
    }
  } else {
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./values.js":"node_modules/underscore/modules/values.js","./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/sample.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sample;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _clone = _interopRequireDefault(require("./clone.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _random = _interopRequireDefault(require("./random.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `_.map`.
function sample(obj, n, guard) {
  if (n == null || guard) {
    if (!(0, _isArrayLike.default)(obj)) obj = (0, _values.default)(obj);
    return obj[(0, _random.default)(obj.length - 1)];
  }

  var sample = (0, _isArrayLike.default)(obj) ? (0, _clone.default)(obj) : (0, _values.default)(obj);
  var length = (0, _getLength.default)(sample);
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;

  for (var index = 0; index < n; index++) {
    var rand = (0, _random.default)(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }

  return sample.slice(0, n);
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./clone.js":"node_modules/underscore/modules/clone.js","./values.js":"node_modules/underscore/modules/values.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js","./random.js":"node_modules/underscore/modules/random.js"}],"node_modules/underscore/modules/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shuffle;

var _sample = _interopRequireDefault(require("./sample.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shuffle a collection.
function shuffle(obj) {
  return (0, _sample.default)(obj, Infinity);
}
},{"./sample.js":"node_modules/underscore/modules/sample.js"}],"node_modules/underscore/modules/sortBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortBy;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

var _map = _interopRequireDefault(require("./map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sort the object's values by a criterion produced by an iteratee.
function sortBy(obj, iteratee, context) {
  var index = 0;
  iteratee = (0, _cb.default)(iteratee, context);
  return (0, _pluck.default)((0, _map.default)(obj, function (value, key, list) {
    return {
      value: value,
      index: index++,
      criteria: iteratee(value, key, list)
    };
  }).sort(function (left, right) {
    var a = left.criteria;
    var b = right.criteria;

    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }

    return left.index - right.index;
  }), 'value');
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./pluck.js":"node_modules/underscore/modules/pluck.js","./map.js":"node_modules/underscore/modules/map.js"}],"node_modules/underscore/modules/_group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = group;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// An internal function used for aggregate "group by" operations.
function group(behavior, partition) {
  return function (obj, iteratee, context) {
    var result = partition ? [[], []] : {};
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
}
},{"./_cb.js":"node_modules/underscore/modules/_cb.js","./each.js":"node_modules/underscore/modules/each.js"}],"node_modules/underscore/modules/groupBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
var _default = (0, _group.default)(function (result, value, key) {
  if ((0, _has.default)(result, key)) result[key].push(value);else result[key] = [value];
});

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/indexBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Indexes the object's values by a criterion, similar to `_.groupBy`, but for
// when you know that your index values will be unique.
var _default = (0, _group.default)(function (result, value, key) {
  result[key] = value;
});

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js"}],"node_modules/underscore/modules/countBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
var _default = (0, _group.default)(function (result, value, key) {
  if ((0, _has.default)(result, key)) result[key]++;else result[key] = 1;
});

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js","./_has.js":"node_modules/underscore/modules/_has.js"}],"node_modules/underscore/modules/partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Split a collection into two arrays: one whose elements all pass the given
// truth test, and one whose elements all do not pass the truth test.
var _default = (0, _group.default)(function (result, value, pass) {
  result[pass ? 0 : 1].push(value);
}, true);

exports.default = _default;
},{"./_group.js":"node_modules/underscore/modules/_group.js"}],"node_modules/underscore/modules/toArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toArray;

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _setup = require("./_setup.js");

var _isString = _interopRequireDefault(require("./isString.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _values = _interopRequireDefault(require("./values.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Safely create a real, live array from anything iterable.
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

function toArray(obj) {
  if (!obj) return [];
  if ((0, _isArray.default)(obj)) return _setup.slice.call(obj);

  if ((0, _isString.default)(obj)) {
    // Keep surrogate pair characters together.
    return obj.match(reStrSymbol);
  }

  if ((0, _isArrayLike.default)(obj)) return (0, _map.default)(obj, _identity.default);
  return (0, _values.default)(obj);
}
},{"./isArray.js":"node_modules/underscore/modules/isArray.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./isString.js":"node_modules/underscore/modules/isString.js","./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./map.js":"node_modules/underscore/modules/map.js","./identity.js":"node_modules/underscore/modules/identity.js","./values.js":"node_modules/underscore/modules/values.js"}],"node_modules/underscore/modules/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = size;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the number of elements in a collection.
function size(obj) {
  if (obj == null) return 0;
  return (0, _isArrayLike.default)(obj) ? obj.length : (0, _keys.default)(obj).length;
}
},{"./_isArrayLike.js":"node_modules/underscore/modules/_isArrayLike.js","./keys.js":"node_modules/underscore/modules/keys.js"}],"node_modules/underscore/modules/_keyInObj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyInObj;

// Internal `_.pick` helper function to determine whether `key` is an enumerable
// property name of `obj`.
function keyInObj(value, key, obj) {
  return key in obj;
}
},{}],"node_modules/underscore/modules/pick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

var _keyInObj = _interopRequireDefault(require("./_keyInObj.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a copy of the object only containing the allowed properties.
var _default = (0, _restArguments.default)(function (obj, keys) {
  var result = {},
      iteratee = keys[0];
  if (obj == null) return result;

  if ((0, _isFunction.default)(iteratee)) {
    if (keys.length > 1) iteratee = (0, _optimizeCb.default)(iteratee, keys[1]);
    keys = (0, _allKeys.default)(obj);
  } else {
    iteratee = _keyInObj.default;
    keys = (0, _flatten.default)(keys, false, false);
    obj = Object(obj);
  }

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    var value = obj[key];
    if (iteratee(value, key, obj)) result[key] = value;
  }

  return result;
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./_optimizeCb.js":"node_modules/underscore/modules/_optimizeCb.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js","./_keyInObj.js":"node_modules/underscore/modules/_keyInObj.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js"}],"node_modules/underscore/modules/omit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _pick = _interopRequireDefault(require("./pick.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a copy of the object without the disallowed properties.
var _default = (0, _restArguments.default)(function (obj, keys) {
  var iteratee = keys[0],
      context;

  if ((0, _isFunction.default)(iteratee)) {
    iteratee = (0, _negate.default)(iteratee);
    if (keys.length > 1) context = keys[1];
  } else {
    keys = (0, _map.default)((0, _flatten.default)(keys, false, false), String);

    iteratee = function (value, key) {
      return !(0, _contains.default)(keys, key);
    };
  }

  return (0, _pick.default)(obj, iteratee, context);
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./negate.js":"node_modules/underscore/modules/negate.js","./map.js":"node_modules/underscore/modules/map.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js","./contains.js":"node_modules/underscore/modules/contains.js","./pick.js":"node_modules/underscore/modules/pick.js"}],"node_modules/underscore/modules/initial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initial;

var _setup = require("./_setup.js");

// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
function initial(array, n, guard) {
  return _setup.slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = first;

var _initial = _interopRequireDefault(require("./initial.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the first element of an array. Passing **n** will return the first N
// values in the array. The **guard** check allows it to work with `_.map`.
function first(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[0];
  return (0, _initial.default)(array, array.length - n);
}
},{"./initial.js":"node_modules/underscore/modules/initial.js"}],"node_modules/underscore/modules/rest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rest;

var _setup = require("./_setup.js");

// Returns everything but the first entry of the `array`. Especially useful on
// the `arguments` object. Passing an **n** will return the rest N values in the
// `array`.
function rest(array, n, guard) {
  return _setup.slice.call(array, n == null || guard ? 1 : n);
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = last;

var _rest = _interopRequireDefault(require("./rest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the last element of an array. Passing **n** will return the last N
// values in the array.
function last(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[array.length - 1];
  return (0, _rest.default)(array, Math.max(0, array.length - n));
}
},{"./rest.js":"node_modules/underscore/modules/rest.js"}],"node_modules/underscore/modules/compact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compact;

var _filter = _interopRequireDefault(require("./filter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Trim out all falsy values from an array.
function compact(array) {
  return (0, _filter.default)(array, Boolean);
}
},{"./filter.js":"node_modules/underscore/modules/filter.js"}],"node_modules/underscore/modules/flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _flatten2 = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Flatten out an array, either recursively (by default), or up to `depth`.
// Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
function flatten(array, depth) {
  return (0, _flatten2.default)(array, depth, false);
}
},{"./_flatten.js":"node_modules/underscore/modules/_flatten.js"}],"node_modules/underscore/modules/difference.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
var _default = (0, _restArguments.default)(function (array, rest) {
  rest = (0, _flatten.default)(rest, true, true);
  return (0, _filter.default)(array, function (value) {
    return !(0, _contains.default)(rest, value);
  });
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js","./filter.js":"node_modules/underscore/modules/filter.js","./contains.js":"node_modules/underscore/modules/contains.js"}],"node_modules/underscore/modules/without.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _difference = _interopRequireDefault(require("./difference.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a version of the array that does not contain the specified value(s).
var _default = (0, _restArguments.default)(function (array, otherArrays) {
  return (0, _difference.default)(array, otherArrays);
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./difference.js":"node_modules/underscore/modules/difference.js"}],"node_modules/underscore/modules/uniq.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniq;

var _isBoolean = _interopRequireDefault(require("./isBoolean.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.
function uniq(array, isSorted, iteratee, context) {
  if (!(0, _isBoolean.default)(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }

  if (iteratee != null) iteratee = (0, _cb.default)(iteratee, context);
  var result = [];
  var seen = [];

  for (var i = 0, length = (0, _getLength.default)(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;

    if (isSorted && !iteratee) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!(0, _contains.default)(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!(0, _contains.default)(result, value)) {
      result.push(value);
    }
  }

  return result;
}
},{"./isBoolean.js":"node_modules/underscore/modules/isBoolean.js","./_cb.js":"node_modules/underscore/modules/_cb.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js","./contains.js":"node_modules/underscore/modules/contains.js"}],"node_modules/underscore/modules/union.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _uniq = _interopRequireDefault(require("./uniq.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
var _default = (0, _restArguments.default)(function (arrays) {
  return (0, _uniq.default)((0, _flatten.default)(arrays, true, true));
});

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./uniq.js":"node_modules/underscore/modules/uniq.js","./_flatten.js":"node_modules/underscore/modules/_flatten.js"}],"node_modules/underscore/modules/intersection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intersection;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce an array that contains every item shared between all the
// passed-in arrays.
function intersection(array) {
  var result = [];
  var argsLength = arguments.length;

  for (var i = 0, length = (0, _getLength.default)(array); i < length; i++) {
    var item = array[i];
    if ((0, _contains.default)(result, item)) continue;
    var j;

    for (j = 1; j < argsLength; j++) {
      if (!(0, _contains.default)(arguments[j], item)) break;
    }

    if (j === argsLength) result.push(item);
  }

  return result;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js","./contains.js":"node_modules/underscore/modules/contains.js"}],"node_modules/underscore/modules/unzip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unzip;

var _max = _interopRequireDefault(require("./max.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Complement of zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
function unzip(array) {
  var length = array && (0, _max.default)(array, _getLength.default).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = (0, _pluck.default)(array, index);
  }

  return result;
}
},{"./max.js":"node_modules/underscore/modules/max.js","./_getLength.js":"node_modules/underscore/modules/_getLength.js","./pluck.js":"node_modules/underscore/modules/pluck.js"}],"node_modules/underscore/modules/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _unzip = _interopRequireDefault(require("./unzip.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Zip together multiple lists into a single array -- elements that share
// an index go together.
var _default = (0, _restArguments.default)(_unzip.default);

exports.default = _default;
},{"./restArguments.js":"node_modules/underscore/modules/restArguments.js","./unzip.js":"node_modules/underscore/modules/unzip.js"}],"node_modules/underscore/modules/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = object;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of `_.pairs`.
function object(list, values) {
  var result = {};

  for (var i = 0, length = (0, _getLength.default)(list); i < length; i++) {
    if (values) {
      result[list[i]] = values[i];
    } else {
      result[list[i][0]] = list[i][1];
    }
  }

  return result;
}
},{"./_getLength.js":"node_modules/underscore/modules/_getLength.js"}],"node_modules/underscore/modules/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;

// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](https://docs.python.org/library/functions.html#range).
function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }

  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}
},{}],"node_modules/underscore/modules/chunk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chunk;

var _setup = require("./_setup.js");

// Chunk a single array into multiple arrays, each containing `count` or fewer
// items.
function chunk(array, count) {
  if (count == null || count < 1) return [];
  var result = [];
  var i = 0,
      length = array.length;

  while (i < length) {
    result.push(_setup.slice.call(array, i, i += count));
  }

  return result;
}
},{"./_setup.js":"node_modules/underscore/modules/_setup.js"}],"node_modules/underscore/modules/_chainResult.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chainResult;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper function to continue chaining intermediate results.
function chainResult(instance, obj) {
  return instance._chain ? (0, _underscore.default)(obj).chain() : obj;
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js"}],"node_modules/underscore/modules/mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mixin;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _functions = _interopRequireDefault(require("./functions.js"));

var _setup = require("./_setup.js");

var _chainResult = _interopRequireDefault(require("./_chainResult.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add your own custom functions to the Underscore object.
function mixin(obj) {
  (0, _each.default)((0, _functions.default)(obj), function (name) {
    var func = _underscore.default[name] = obj[name];

    _underscore.default.prototype[name] = function () {
      var args = [this._wrapped];

      _setup.push.apply(args, arguments);

      return (0, _chainResult.default)(this, func.apply(_underscore.default, args));
    };
  });
  return _underscore.default;
}
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./each.js":"node_modules/underscore/modules/each.js","./functions.js":"node_modules/underscore/modules/functions.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_chainResult.js":"node_modules/underscore/modules/_chainResult.js"}],"node_modules/underscore/modules/underscore-array-methods.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _setup = require("./_setup.js");

var _chainResult = _interopRequireDefault(require("./_chainResult.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add all mutator `Array` functions to the wrapper.
(0, _each.default)(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
  var method = _setup.ArrayProto[name];

  _underscore.default.prototype[name] = function () {
    var obj = this._wrapped;

    if (obj != null) {
      method.apply(obj, arguments);

      if ((name === 'shift' || name === 'splice') && obj.length === 0) {
        delete obj[0];
      }
    }

    return (0, _chainResult.default)(this, obj);
  };
}); // Add all accessor `Array` functions to the wrapper.

(0, _each.default)(['concat', 'join', 'slice'], function (name) {
  var method = _setup.ArrayProto[name];

  _underscore.default.prototype[name] = function () {
    var obj = this._wrapped;
    if (obj != null) obj = method.apply(obj, arguments);
    return (0, _chainResult.default)(this, obj);
  };
});
var _default = _underscore.default;
exports.default = _default;
},{"./underscore.js":"node_modules/underscore/modules/underscore.js","./each.js":"node_modules/underscore/modules/each.js","./_setup.js":"node_modules/underscore/modules/_setup.js","./_chainResult.js":"node_modules/underscore/modules/_chainResult.js"}],"node_modules/underscore/modules/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VERSION", {
  enumerable: true,
  get: function () {
    return _setup.VERSION;
  }
});
Object.defineProperty(exports, "restArguments", {
  enumerable: true,
  get: function () {
    return _restArguments.default;
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function () {
    return _isObject.default;
  }
});
Object.defineProperty(exports, "isNull", {
  enumerable: true,
  get: function () {
    return _isNull.default;
  }
});
Object.defineProperty(exports, "isUndefined", {
  enumerable: true,
  get: function () {
    return _isUndefined.default;
  }
});
Object.defineProperty(exports, "isBoolean", {
  enumerable: true,
  get: function () {
    return _isBoolean.default;
  }
});
Object.defineProperty(exports, "isElement", {
  enumerable: true,
  get: function () {
    return _isElement.default;
  }
});
Object.defineProperty(exports, "isString", {
  enumerable: true,
  get: function () {
    return _isString.default;
  }
});
Object.defineProperty(exports, "isNumber", {
  enumerable: true,
  get: function () {
    return _isNumber.default;
  }
});
Object.defineProperty(exports, "isDate", {
  enumerable: true,
  get: function () {
    return _isDate.default;
  }
});
Object.defineProperty(exports, "isRegExp", {
  enumerable: true,
  get: function () {
    return _isRegExp.default;
  }
});
Object.defineProperty(exports, "isError", {
  enumerable: true,
  get: function () {
    return _isError.default;
  }
});
Object.defineProperty(exports, "isSymbol", {
  enumerable: true,
  get: function () {
    return _isSymbol.default;
  }
});
Object.defineProperty(exports, "isArrayBuffer", {
  enumerable: true,
  get: function () {
    return _isArrayBuffer.default;
  }
});
Object.defineProperty(exports, "isDataView", {
  enumerable: true,
  get: function () {
    return _isDataView.default;
  }
});
Object.defineProperty(exports, "isArray", {
  enumerable: true,
  get: function () {
    return _isArray.default;
  }
});
Object.defineProperty(exports, "isFunction", {
  enumerable: true,
  get: function () {
    return _isFunction.default;
  }
});
Object.defineProperty(exports, "isArguments", {
  enumerable: true,
  get: function () {
    return _isArguments.default;
  }
});
Object.defineProperty(exports, "isFinite", {
  enumerable: true,
  get: function () {
    return _isFinite.default;
  }
});
Object.defineProperty(exports, "isNaN", {
  enumerable: true,
  get: function () {
    return _isNaN.default;
  }
});
Object.defineProperty(exports, "isTypedArray", {
  enumerable: true,
  get: function () {
    return _isTypedArray.default;
  }
});
Object.defineProperty(exports, "isEmpty", {
  enumerable: true,
  get: function () {
    return _isEmpty.default;
  }
});
Object.defineProperty(exports, "isMatch", {
  enumerable: true,
  get: function () {
    return _isMatch.default;
  }
});
Object.defineProperty(exports, "isEqual", {
  enumerable: true,
  get: function () {
    return _isEqual.default;
  }
});
Object.defineProperty(exports, "isMap", {
  enumerable: true,
  get: function () {
    return _isMap.default;
  }
});
Object.defineProperty(exports, "isWeakMap", {
  enumerable: true,
  get: function () {
    return _isWeakMap.default;
  }
});
Object.defineProperty(exports, "isSet", {
  enumerable: true,
  get: function () {
    return _isSet.default;
  }
});
Object.defineProperty(exports, "isWeakSet", {
  enumerable: true,
  get: function () {
    return _isWeakSet.default;
  }
});
Object.defineProperty(exports, "keys", {
  enumerable: true,
  get: function () {
    return _keys.default;
  }
});
Object.defineProperty(exports, "allKeys", {
  enumerable: true,
  get: function () {
    return _allKeys.default;
  }
});
Object.defineProperty(exports, "values", {
  enumerable: true,
  get: function () {
    return _values.default;
  }
});
Object.defineProperty(exports, "pairs", {
  enumerable: true,
  get: function () {
    return _pairs.default;
  }
});
Object.defineProperty(exports, "invert", {
  enumerable: true,
  get: function () {
    return _invert.default;
  }
});
Object.defineProperty(exports, "functions", {
  enumerable: true,
  get: function () {
    return _functions.default;
  }
});
Object.defineProperty(exports, "methods", {
  enumerable: true,
  get: function () {
    return _functions.default;
  }
});
Object.defineProperty(exports, "extend", {
  enumerable: true,
  get: function () {
    return _extend.default;
  }
});
Object.defineProperty(exports, "extendOwn", {
  enumerable: true,
  get: function () {
    return _extendOwn.default;
  }
});
Object.defineProperty(exports, "assign", {
  enumerable: true,
  get: function () {
    return _extendOwn.default;
  }
});
Object.defineProperty(exports, "defaults", {
  enumerable: true,
  get: function () {
    return _defaults.default;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "clone", {
  enumerable: true,
  get: function () {
    return _clone.default;
  }
});
Object.defineProperty(exports, "tap", {
  enumerable: true,
  get: function () {
    return _tap.default;
  }
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _get.default;
  }
});
Object.defineProperty(exports, "has", {
  enumerable: true,
  get: function () {
    return _has.default;
  }
});
Object.defineProperty(exports, "mapObject", {
  enumerable: true,
  get: function () {
    return _mapObject.default;
  }
});
Object.defineProperty(exports, "identity", {
  enumerable: true,
  get: function () {
    return _identity.default;
  }
});
Object.defineProperty(exports, "constant", {
  enumerable: true,
  get: function () {
    return _constant.default;
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function () {
    return _noop.default;
  }
});
Object.defineProperty(exports, "toPath", {
  enumerable: true,
  get: function () {
    return _toPath.default;
  }
});
Object.defineProperty(exports, "property", {
  enumerable: true,
  get: function () {
    return _property.default;
  }
});
Object.defineProperty(exports, "propertyOf", {
  enumerable: true,
  get: function () {
    return _propertyOf.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "matches", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "times", {
  enumerable: true,
  get: function () {
    return _times.default;
  }
});
Object.defineProperty(exports, "random", {
  enumerable: true,
  get: function () {
    return _random.default;
  }
});
Object.defineProperty(exports, "now", {
  enumerable: true,
  get: function () {
    return _now.default;
  }
});
Object.defineProperty(exports, "escape", {
  enumerable: true,
  get: function () {
    return _escape.default;
  }
});
Object.defineProperty(exports, "unescape", {
  enumerable: true,
  get: function () {
    return _unescape.default;
  }
});
Object.defineProperty(exports, "templateSettings", {
  enumerable: true,
  get: function () {
    return _templateSettings.default;
  }
});
Object.defineProperty(exports, "template", {
  enumerable: true,
  get: function () {
    return _template.default;
  }
});
Object.defineProperty(exports, "result", {
  enumerable: true,
  get: function () {
    return _result.default;
  }
});
Object.defineProperty(exports, "uniqueId", {
  enumerable: true,
  get: function () {
    return _uniqueId.default;
  }
});
Object.defineProperty(exports, "chain", {
  enumerable: true,
  get: function () {
    return _chain.default;
  }
});
Object.defineProperty(exports, "iteratee", {
  enumerable: true,
  get: function () {
    return _iteratee.default;
  }
});
Object.defineProperty(exports, "partial", {
  enumerable: true,
  get: function () {
    return _partial.default;
  }
});
Object.defineProperty(exports, "bind", {
  enumerable: true,
  get: function () {
    return _bind.default;
  }
});
Object.defineProperty(exports, "bindAll", {
  enumerable: true,
  get: function () {
    return _bindAll.default;
  }
});
Object.defineProperty(exports, "memoize", {
  enumerable: true,
  get: function () {
    return _memoize.default;
  }
});
Object.defineProperty(exports, "delay", {
  enumerable: true,
  get: function () {
    return _delay.default;
  }
});
Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function () {
    return _defer.default;
  }
});
Object.defineProperty(exports, "throttle", {
  enumerable: true,
  get: function () {
    return _throttle.default;
  }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () {
    return _debounce.default;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrap.default;
  }
});
Object.defineProperty(exports, "negate", {
  enumerable: true,
  get: function () {
    return _negate.default;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function () {
    return _compose.default;
  }
});
Object.defineProperty(exports, "after", {
  enumerable: true,
  get: function () {
    return _after.default;
  }
});
Object.defineProperty(exports, "before", {
  enumerable: true,
  get: function () {
    return _before.default;
  }
});
Object.defineProperty(exports, "once", {
  enumerable: true,
  get: function () {
    return _once.default;
  }
});
Object.defineProperty(exports, "findKey", {
  enumerable: true,
  get: function () {
    return _findKey.default;
  }
});
Object.defineProperty(exports, "findIndex", {
  enumerable: true,
  get: function () {
    return _findIndex.default;
  }
});
Object.defineProperty(exports, "findLastIndex", {
  enumerable: true,
  get: function () {
    return _findLastIndex.default;
  }
});
Object.defineProperty(exports, "sortedIndex", {
  enumerable: true,
  get: function () {
    return _sortedIndex.default;
  }
});
Object.defineProperty(exports, "indexOf", {
  enumerable: true,
  get: function () {
    return _indexOf.default;
  }
});
Object.defineProperty(exports, "lastIndexOf", {
  enumerable: true,
  get: function () {
    return _lastIndexOf.default;
  }
});
Object.defineProperty(exports, "find", {
  enumerable: true,
  get: function () {
    return _find.default;
  }
});
Object.defineProperty(exports, "detect", {
  enumerable: true,
  get: function () {
    return _find.default;
  }
});
Object.defineProperty(exports, "findWhere", {
  enumerable: true,
  get: function () {
    return _findWhere.default;
  }
});
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function () {
    return _each.default;
  }
});
Object.defineProperty(exports, "forEach", {
  enumerable: true,
  get: function () {
    return _each.default;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "collect", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "reduce", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "foldl", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "inject", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "reduceRight", {
  enumerable: true,
  get: function () {
    return _reduceRight.default;
  }
});
Object.defineProperty(exports, "foldr", {
  enumerable: true,
  get: function () {
    return _reduceRight.default;
  }
});
Object.defineProperty(exports, "filter", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "reject", {
  enumerable: true,
  get: function () {
    return _reject.default;
  }
});
Object.defineProperty(exports, "every", {
  enumerable: true,
  get: function () {
    return _every.default;
  }
});
Object.defineProperty(exports, "all", {
  enumerable: true,
  get: function () {
    return _every.default;
  }
});
Object.defineProperty(exports, "some", {
  enumerable: true,
  get: function () {
    return _some.default;
  }
});
Object.defineProperty(exports, "any", {
  enumerable: true,
  get: function () {
    return _some.default;
  }
});
Object.defineProperty(exports, "contains", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "includes", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "include", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "invoke", {
  enumerable: true,
  get: function () {
    return _invoke.default;
  }
});
Object.defineProperty(exports, "pluck", {
  enumerable: true,
  get: function () {
    return _pluck.default;
  }
});
Object.defineProperty(exports, "where", {
  enumerable: true,
  get: function () {
    return _where.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _max.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _min.default;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return _shuffle.default;
  }
});
Object.defineProperty(exports, "sample", {
  enumerable: true,
  get: function () {
    return _sample.default;
  }
});
Object.defineProperty(exports, "sortBy", {
  enumerable: true,
  get: function () {
    return _sortBy.default;
  }
});
Object.defineProperty(exports, "groupBy", {
  enumerable: true,
  get: function () {
    return _groupBy.default;
  }
});
Object.defineProperty(exports, "indexBy", {
  enumerable: true,
  get: function () {
    return _indexBy.default;
  }
});
Object.defineProperty(exports, "countBy", {
  enumerable: true,
  get: function () {
    return _countBy.default;
  }
});
Object.defineProperty(exports, "partition", {
  enumerable: true,
  get: function () {
    return _partition.default;
  }
});
Object.defineProperty(exports, "toArray", {
  enumerable: true,
  get: function () {
    return _toArray.default;
  }
});
Object.defineProperty(exports, "size", {
  enumerable: true,
  get: function () {
    return _size.default;
  }
});
Object.defineProperty(exports, "pick", {
  enumerable: true,
  get: function () {
    return _pick.default;
  }
});
Object.defineProperty(exports, "omit", {
  enumerable: true,
  get: function () {
    return _omit.default;
  }
});
Object.defineProperty(exports, "first", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "head", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "take", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "initial", {
  enumerable: true,
  get: function () {
    return _initial.default;
  }
});
Object.defineProperty(exports, "last", {
  enumerable: true,
  get: function () {
    return _last.default;
  }
});
Object.defineProperty(exports, "rest", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "tail", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "drop", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "compact", {
  enumerable: true,
  get: function () {
    return _compact.default;
  }
});
Object.defineProperty(exports, "flatten", {
  enumerable: true,
  get: function () {
    return _flatten.default;
  }
});
Object.defineProperty(exports, "without", {
  enumerable: true,
  get: function () {
    return _without.default;
  }
});
Object.defineProperty(exports, "uniq", {
  enumerable: true,
  get: function () {
    return _uniq.default;
  }
});
Object.defineProperty(exports, "unique", {
  enumerable: true,
  get: function () {
    return _uniq.default;
  }
});
Object.defineProperty(exports, "union", {
  enumerable: true,
  get: function () {
    return _union.default;
  }
});
Object.defineProperty(exports, "intersection", {
  enumerable: true,
  get: function () {
    return _intersection.default;
  }
});
Object.defineProperty(exports, "difference", {
  enumerable: true,
  get: function () {
    return _difference.default;
  }
});
Object.defineProperty(exports, "unzip", {
  enumerable: true,
  get: function () {
    return _unzip.default;
  }
});
Object.defineProperty(exports, "transpose", {
  enumerable: true,
  get: function () {
    return _unzip.default;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return _zip.default;
  }
});
Object.defineProperty(exports, "object", {
  enumerable: true,
  get: function () {
    return _object.default;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "chunk", {
  enumerable: true,
  get: function () {
    return _chunk.default;
  }
});
Object.defineProperty(exports, "mixin", {
  enumerable: true,
  get: function () {
    return _mixin.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _underscoreArrayMethods.default;
  }
});

var _setup = require("./_setup.js");

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isNull = _interopRequireDefault(require("./isNull.js"));

var _isUndefined = _interopRequireDefault(require("./isUndefined.js"));

var _isBoolean = _interopRequireDefault(require("./isBoolean.js"));

var _isElement = _interopRequireDefault(require("./isElement.js"));

var _isString = _interopRequireDefault(require("./isString.js"));

var _isNumber = _interopRequireDefault(require("./isNumber.js"));

var _isDate = _interopRequireDefault(require("./isDate.js"));

var _isRegExp = _interopRequireDefault(require("./isRegExp.js"));

var _isError = _interopRequireDefault(require("./isError.js"));

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

var _isArrayBuffer = _interopRequireDefault(require("./isArrayBuffer.js"));

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

var _isFinite = _interopRequireDefault(require("./isFinite.js"));

var _isNaN = _interopRequireDefault(require("./isNaN.js"));

var _isTypedArray = _interopRequireDefault(require("./isTypedArray.js"));

var _isEmpty = _interopRequireDefault(require("./isEmpty.js"));

var _isMatch = _interopRequireDefault(require("./isMatch.js"));

var _isEqual = _interopRequireDefault(require("./isEqual.js"));

var _isMap = _interopRequireDefault(require("./isMap.js"));

var _isWeakMap = _interopRequireDefault(require("./isWeakMap.js"));

var _isSet = _interopRequireDefault(require("./isSet.js"));

var _isWeakSet = _interopRequireDefault(require("./isWeakSet.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _pairs = _interopRequireDefault(require("./pairs.js"));

var _invert = _interopRequireDefault(require("./invert.js"));

var _functions = _interopRequireDefault(require("./functions.js"));

var _extend = _interopRequireDefault(require("./extend.js"));

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

var _defaults = _interopRequireDefault(require("./defaults.js"));

var _create = _interopRequireDefault(require("./create.js"));

var _clone = _interopRequireDefault(require("./clone.js"));

var _tap = _interopRequireDefault(require("./tap.js"));

var _get = _interopRequireDefault(require("./get.js"));

var _has = _interopRequireDefault(require("./has.js"));

var _mapObject = _interopRequireDefault(require("./mapObject.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _noop = _interopRequireDefault(require("./noop.js"));

var _toPath = _interopRequireDefault(require("./toPath.js"));

var _property = _interopRequireDefault(require("./property.js"));

var _propertyOf = _interopRequireDefault(require("./propertyOf.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

var _times = _interopRequireDefault(require("./times.js"));

var _random = _interopRequireDefault(require("./random.js"));

var _now = _interopRequireDefault(require("./now.js"));

var _escape = _interopRequireDefault(require("./escape.js"));

var _unescape = _interopRequireDefault(require("./unescape.js"));

var _templateSettings = _interopRequireDefault(require("./templateSettings.js"));

var _template = _interopRequireDefault(require("./template.js"));

var _result = _interopRequireDefault(require("./result.js"));

var _uniqueId = _interopRequireDefault(require("./uniqueId.js"));

var _chain = _interopRequireDefault(require("./chain.js"));

var _iteratee = _interopRequireDefault(require("./iteratee.js"));

var _partial = _interopRequireDefault(require("./partial.js"));

var _bind = _interopRequireDefault(require("./bind.js"));

var _bindAll = _interopRequireDefault(require("./bindAll.js"));

var _memoize = _interopRequireDefault(require("./memoize.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

var _defer = _interopRequireDefault(require("./defer.js"));

var _throttle = _interopRequireDefault(require("./throttle.js"));

var _debounce = _interopRequireDefault(require("./debounce.js"));

var _wrap = _interopRequireDefault(require("./wrap.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _compose = _interopRequireDefault(require("./compose.js"));

var _after = _interopRequireDefault(require("./after.js"));

var _before = _interopRequireDefault(require("./before.js"));

var _once = _interopRequireDefault(require("./once.js"));

var _findKey = _interopRequireDefault(require("./findKey.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _findLastIndex = _interopRequireDefault(require("./findLastIndex.js"));

var _sortedIndex = _interopRequireDefault(require("./sortedIndex.js"));

var _indexOf = _interopRequireDefault(require("./indexOf.js"));

var _lastIndexOf = _interopRequireDefault(require("./lastIndexOf.js"));

var _find = _interopRequireDefault(require("./find.js"));

var _findWhere = _interopRequireDefault(require("./findWhere.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _reduce = _interopRequireDefault(require("./reduce.js"));

var _reduceRight = _interopRequireDefault(require("./reduceRight.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _reject = _interopRequireDefault(require("./reject.js"));

var _every = _interopRequireDefault(require("./every.js"));

var _some = _interopRequireDefault(require("./some.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _invoke = _interopRequireDefault(require("./invoke.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

var _where = _interopRequireDefault(require("./where.js"));

var _max = _interopRequireDefault(require("./max.js"));

var _min = _interopRequireDefault(require("./min.js"));

var _shuffle = _interopRequireDefault(require("./shuffle.js"));

var _sample = _interopRequireDefault(require("./sample.js"));

var _sortBy = _interopRequireDefault(require("./sortBy.js"));

var _groupBy = _interopRequireDefault(require("./groupBy.js"));

var _indexBy = _interopRequireDefault(require("./indexBy.js"));

var _countBy = _interopRequireDefault(require("./countBy.js"));

var _partition = _interopRequireDefault(require("./partition.js"));

var _toArray = _interopRequireDefault(require("./toArray.js"));

var _size = _interopRequireDefault(require("./size.js"));

var _pick = _interopRequireDefault(require("./pick.js"));

var _omit = _interopRequireDefault(require("./omit.js"));

var _first = _interopRequireDefault(require("./first.js"));

var _initial = _interopRequireDefault(require("./initial.js"));

var _last = _interopRequireDefault(require("./last.js"));

var _rest = _interopRequireDefault(require("./rest.js"));

var _compact = _interopRequireDefault(require("./compact.js"));

var _flatten = _interopRequireDefault(require("./flatten.js"));

var _without = _interopRequireDefault(require("./without.js"));

var _uniq = _interopRequireDefault(require("./uniq.js"));

var _union = _interopRequireDefault(require("./union.js"));

var _intersection = _interopRequireDefault(require("./intersection.js"));

var _difference = _interopRequireDefault(require("./difference.js"));

var _unzip = _interopRequireDefault(require("./unzip.js"));

var _zip = _interopRequireDefault(require("./zip.js"));

var _object = _interopRequireDefault(require("./object.js"));

var _range = _interopRequireDefault(require("./range.js"));

var _chunk = _interopRequireDefault(require("./chunk.js"));

var _mixin = _interopRequireDefault(require("./mixin.js"));

var _underscoreArrayMethods = _interopRequireDefault(require("./underscore-array-methods.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./_setup.js":"node_modules/underscore/modules/_setup.js","./restArguments.js":"node_modules/underscore/modules/restArguments.js","./isObject.js":"node_modules/underscore/modules/isObject.js","./isNull.js":"node_modules/underscore/modules/isNull.js","./isUndefined.js":"node_modules/underscore/modules/isUndefined.js","./isBoolean.js":"node_modules/underscore/modules/isBoolean.js","./isElement.js":"node_modules/underscore/modules/isElement.js","./isString.js":"node_modules/underscore/modules/isString.js","./isNumber.js":"node_modules/underscore/modules/isNumber.js","./isDate.js":"node_modules/underscore/modules/isDate.js","./isRegExp.js":"node_modules/underscore/modules/isRegExp.js","./isError.js":"node_modules/underscore/modules/isError.js","./isSymbol.js":"node_modules/underscore/modules/isSymbol.js","./isArrayBuffer.js":"node_modules/underscore/modules/isArrayBuffer.js","./isDataView.js":"node_modules/underscore/modules/isDataView.js","./isArray.js":"node_modules/underscore/modules/isArray.js","./isFunction.js":"node_modules/underscore/modules/isFunction.js","./isArguments.js":"node_modules/underscore/modules/isArguments.js","./isFinite.js":"node_modules/underscore/modules/isFinite.js","./isNaN.js":"node_modules/underscore/modules/isNaN.js","./isTypedArray.js":"node_modules/underscore/modules/isTypedArray.js","./isEmpty.js":"node_modules/underscore/modules/isEmpty.js","./isMatch.js":"node_modules/underscore/modules/isMatch.js","./isEqual.js":"node_modules/underscore/modules/isEqual.js","./isMap.js":"node_modules/underscore/modules/isMap.js","./isWeakMap.js":"node_modules/underscore/modules/isWeakMap.js","./isSet.js":"node_modules/underscore/modules/isSet.js","./isWeakSet.js":"node_modules/underscore/modules/isWeakSet.js","./keys.js":"node_modules/underscore/modules/keys.js","./allKeys.js":"node_modules/underscore/modules/allKeys.js","./values.js":"node_modules/underscore/modules/values.js","./pairs.js":"node_modules/underscore/modules/pairs.js","./invert.js":"node_modules/underscore/modules/invert.js","./functions.js":"node_modules/underscore/modules/functions.js","./extend.js":"node_modules/underscore/modules/extend.js","./extendOwn.js":"node_modules/underscore/modules/extendOwn.js","./defaults.js":"node_modules/underscore/modules/defaults.js","./create.js":"node_modules/underscore/modules/create.js","./clone.js":"node_modules/underscore/modules/clone.js","./tap.js":"node_modules/underscore/modules/tap.js","./get.js":"node_modules/underscore/modules/get.js","./has.js":"node_modules/underscore/modules/has.js","./mapObject.js":"node_modules/underscore/modules/mapObject.js","./identity.js":"node_modules/underscore/modules/identity.js","./constant.js":"node_modules/underscore/modules/constant.js","./noop.js":"node_modules/underscore/modules/noop.js","./toPath.js":"node_modules/underscore/modules/toPath.js","./property.js":"node_modules/underscore/modules/property.js","./propertyOf.js":"node_modules/underscore/modules/propertyOf.js","./matcher.js":"node_modules/underscore/modules/matcher.js","./times.js":"node_modules/underscore/modules/times.js","./random.js":"node_modules/underscore/modules/random.js","./now.js":"node_modules/underscore/modules/now.js","./escape.js":"node_modules/underscore/modules/escape.js","./unescape.js":"node_modules/underscore/modules/unescape.js","./templateSettings.js":"node_modules/underscore/modules/templateSettings.js","./template.js":"node_modules/underscore/modules/template.js","./result.js":"node_modules/underscore/modules/result.js","./uniqueId.js":"node_modules/underscore/modules/uniqueId.js","./chain.js":"node_modules/underscore/modules/chain.js","./iteratee.js":"node_modules/underscore/modules/iteratee.js","./partial.js":"node_modules/underscore/modules/partial.js","./bind.js":"node_modules/underscore/modules/bind.js","./bindAll.js":"node_modules/underscore/modules/bindAll.js","./memoize.js":"node_modules/underscore/modules/memoize.js","./delay.js":"node_modules/underscore/modules/delay.js","./defer.js":"node_modules/underscore/modules/defer.js","./throttle.js":"node_modules/underscore/modules/throttle.js","./debounce.js":"node_modules/underscore/modules/debounce.js","./wrap.js":"node_modules/underscore/modules/wrap.js","./negate.js":"node_modules/underscore/modules/negate.js","./compose.js":"node_modules/underscore/modules/compose.js","./after.js":"node_modules/underscore/modules/after.js","./before.js":"node_modules/underscore/modules/before.js","./once.js":"node_modules/underscore/modules/once.js","./findKey.js":"node_modules/underscore/modules/findKey.js","./findIndex.js":"node_modules/underscore/modules/findIndex.js","./findLastIndex.js":"node_modules/underscore/modules/findLastIndex.js","./sortedIndex.js":"node_modules/underscore/modules/sortedIndex.js","./indexOf.js":"node_modules/underscore/modules/indexOf.js","./lastIndexOf.js":"node_modules/underscore/modules/lastIndexOf.js","./find.js":"node_modules/underscore/modules/find.js","./findWhere.js":"node_modules/underscore/modules/findWhere.js","./each.js":"node_modules/underscore/modules/each.js","./map.js":"node_modules/underscore/modules/map.js","./reduce.js":"node_modules/underscore/modules/reduce.js","./reduceRight.js":"node_modules/underscore/modules/reduceRight.js","./filter.js":"node_modules/underscore/modules/filter.js","./reject.js":"node_modules/underscore/modules/reject.js","./every.js":"node_modules/underscore/modules/every.js","./some.js":"node_modules/underscore/modules/some.js","./contains.js":"node_modules/underscore/modules/contains.js","./invoke.js":"node_modules/underscore/modules/invoke.js","./pluck.js":"node_modules/underscore/modules/pluck.js","./where.js":"node_modules/underscore/modules/where.js","./max.js":"node_modules/underscore/modules/max.js","./min.js":"node_modules/underscore/modules/min.js","./shuffle.js":"node_modules/underscore/modules/shuffle.js","./sample.js":"node_modules/underscore/modules/sample.js","./sortBy.js":"node_modules/underscore/modules/sortBy.js","./groupBy.js":"node_modules/underscore/modules/groupBy.js","./indexBy.js":"node_modules/underscore/modules/indexBy.js","./countBy.js":"node_modules/underscore/modules/countBy.js","./partition.js":"node_modules/underscore/modules/partition.js","./toArray.js":"node_modules/underscore/modules/toArray.js","./size.js":"node_modules/underscore/modules/size.js","./pick.js":"node_modules/underscore/modules/pick.js","./omit.js":"node_modules/underscore/modules/omit.js","./first.js":"node_modules/underscore/modules/first.js","./initial.js":"node_modules/underscore/modules/initial.js","./last.js":"node_modules/underscore/modules/last.js","./rest.js":"node_modules/underscore/modules/rest.js","./compact.js":"node_modules/underscore/modules/compact.js","./flatten.js":"node_modules/underscore/modules/flatten.js","./without.js":"node_modules/underscore/modules/without.js","./uniq.js":"node_modules/underscore/modules/uniq.js","./union.js":"node_modules/underscore/modules/union.js","./intersection.js":"node_modules/underscore/modules/intersection.js","./difference.js":"node_modules/underscore/modules/difference.js","./unzip.js":"node_modules/underscore/modules/unzip.js","./zip.js":"node_modules/underscore/modules/zip.js","./object.js":"node_modules/underscore/modules/object.js","./range.js":"node_modules/underscore/modules/range.js","./chunk.js":"node_modules/underscore/modules/chunk.js","./mixin.js":"node_modules/underscore/modules/mixin.js","./underscore-array-methods.js":"node_modules/underscore/modules/underscore-array-methods.js"}],"node_modules/underscore/modules/index-default.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var allExports = _interopRequireWildcard(require("./index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Default Export
// ==============
// In this module, we mix our bundled exports into the `_` object and export
// the result. This is analogous to setting `module.exports = _` in CommonJS.
// Hence, this module is also the entry point of our UMD bundle and the package
// entry point for CommonJS and AMD users. In other words, this is (the source
// of) the module you are interfacing with when you do any of the following:
//
// ```js
// // CommonJS
// var _ = require('underscore');
//
// // AMD
// define(['underscore'], function(_) {...});
//
// // UMD in the browser
// // _ is available as a global variable
// ```
// Add all of the Underscore functions to the wrapper object.
var _ = (0, allExports.mixin)(allExports); // Legacy Node.js API.


_._ = _; // Export the Underscore API.

var _default = _;
exports.default = _default;
},{"./index.js":"node_modules/underscore/modules/index.js"}],"node_modules/underscore/modules/index-all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _indexDefault.default;
  }
});

var _indexDefault = _interopRequireDefault(require("./index-default.js"));

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./index-default.js":"node_modules/underscore/modules/index-default.js","./index.js":"node_modules/underscore/modules/index.js"}],"node_modules/list.js/src/utils/get-by-class.js":[function(require,module,exports) {
/**
 * A cross-browser implementation of getElementsByClass.
 * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
 *
 * Find all elements with class `className` inside `container`.
 * Use `single = true` to increase performance in older browsers
 * when only one element is needed.
 *
 * @param {String} className
 * @param {Element} container
 * @param {Boolean} single
 * @api public
 */
module.exports = function () {
  if (document.getElementsByClassName) {
    return function (container, className, single) {
      if (single) {
        return container.getElementsByClassName(className)[0];
      } else {
        return container.getElementsByClassName(className);
      }
    };
  } else if (document.querySelector) {
    return function (container, className, single) {
      className = '.' + className;

      if (single) {
        return container.querySelector(className);
      } else {
        return container.querySelectorAll(className);
      }
    };
  } else {
    return function (container, className, single) {
      var classElements = [],
          tag = '*';

      if (container === null) {
        container = document;
      }

      var els = container.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");

      for (var i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
          if (single) {
            return els[i];
          } else {
            classElements[j] = els[i];
            j++;
          }
        }
      }

      return classElements;
    };
  }
}();
},{}],"node_modules/list.js/src/utils/extend.js":[function(require,module,exports) {
/*
 * Source: https://github.com/segmentio/extend
 */
module.exports = function extend(object) {
  // Takes an unlimited number of extenders.
  var args = Array.prototype.slice.call(arguments, 1); // For each extender, copy their properties on our object.

  for (var i = 0, source; source = args[i]; i++) {
    if (!source) continue;

    for (var property in source) {
      object[property] = source[property];
    }
  }

  return object;
};
},{}],"node_modules/list.js/src/utils/index-of.js":[function(require,module,exports) {
var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }

  return -1;
};
},{}],"node_modules/list.js/src/utils/to-array.js":[function(require,module,exports) {
/**
 * Source: https://github.com/timoxley/to-array
 *
 * Convert an array-like object into an `Array`.
 * If `collection` is already an `Array`, then will return a clone of `collection`.
 *
 * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
 * @return {Array} Naive conversion of `collection` to a new `Array`.
 * @api public
 */
module.exports = function toArray(collection) {
  if (typeof collection === 'undefined') return [];
  if (collection === null) return [null];
  if (collection === window) return [window];
  if (typeof collection === 'string') return [collection];
  if (isArray(collection)) return collection;
  if (typeof collection.length != 'number') return [collection];
  if (typeof collection === 'function' && collection instanceof Function) return [collection];
  var arr = [];

  for (var i = 0; i < collection.length; i++) {
    if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
      arr.push(collection[i]);
    }
  }

  if (!arr.length) return [];
  return arr;
};

function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}
},{}],"node_modules/list.js/src/utils/events.js":[function(require,module,exports) {
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '',
    toArray = require('./to-array');
/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */


exports.bind = function (el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0; i < el.length; i++) {
    el[i][bind](prefix + type, fn, capture || false);
  }
};
/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */


exports.unbind = function (el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0; i < el.length; i++) {
    el[i][unbind](prefix + type, fn, capture || false);
  }
};
},{"./to-array":"node_modules/list.js/src/utils/to-array.js"}],"node_modules/list.js/src/utils/to-string.js":[function(require,module,exports) {
module.exports = function (s) {
  s = s === undefined ? "" : s;
  s = s === null ? "" : s;
  s = s.toString();
  return s;
};
},{}],"node_modules/list.js/src/utils/natural-sort.js":[function(require,module,exports) {
/*
 * Natural Sort algorithm for Javascript - Version 0.8.1 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
module.exports = function (a, b, opts) {
  var re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,
      sre = /^\s+|\s+$/g,
      // trim pre-post whitespace
  snre = /\s+/g,
      // normalize all whitespace to single ' ' character
  dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
      hre = /^0x[0-9a-f]+$/i,
      ore = /^0/,
      options = opts || {},
      i = function (s) {
    return (options.insensitive && ('' + s).toLowerCase() || '' + s).replace(sre, '');
  },
      // convert all to strings strip whitespace
  x = i(a),
      y = i(b),
      // chunk/tokenize
  xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
      yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
      // numeric, hex or date detection
  xD = parseInt(x.match(hre), 16) || xN.length !== 1 && Date.parse(x),
      yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
      normChunk = function (s, l) {
    // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
    return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
  },
      oFxNcL,
      oFyNcL; // first try and sort Hex codes or Dates


  if (yD) {
    if (xD < yD) {
      return -1;
    } else if (xD > yD) {
      return 1;
    }
  } // natural sorting through split numeric strings and default strings


  for (var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
    oFxNcL = normChunk(xN[cLoc] || '', xNl);
    oFyNcL = normChunk(yN[cLoc] || '', yNl); // handle numeric vs string comparison - number < string - (Kyle Adams)

    if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
      return isNaN(oFxNcL) ? 1 : -1;
    } // if unicode use locale comparison


    if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
      var comp = oFxNcL.localeCompare(oFyNcL);
      return comp / Math.abs(comp);
    }

    if (oFxNcL < oFyNcL) {
      return -1;
    } else if (oFxNcL > oFyNcL) {
      return 1;
    }
  }

  return 0;
};
},{}],"node_modules/list.js/src/utils/classes.js":[function(require,module,exports) {
/**
 * Module dependencies.
 */
var index = require('./index-of');
/**
 * Whitespace regexp.
 */


var re = /\s+/;
/**
 * toString reference.
 */

var toString = Object.prototype.toString;
/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function (el) {
  return new ClassList(el);
};
/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */


function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }

  this.el = el;
  this.list = el.classList;
}
/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.add = function (name) {
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  } // fallback


  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};
/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.remove = function (name) {
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  } // classList


  if (this.list) {
    this.list.remove(name);
    return this;
  } // fallback


  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};
/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */


ClassList.prototype.removeMatching = function (re) {
  var arr = this.array();

  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }

  return this;
};
/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.toggle = function (name, force) {
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }

    return this;
  } // fallback


  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};
/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */


ClassList.prototype.array = function () {
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};
/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.has = ClassList.prototype.contains = function (name) {
  return this.list ? this.list.contains(name) : !!~index(this.array(), name);
};
},{"./index-of":"node_modules/list.js/src/utils/index-of.js"}],"node_modules/list.js/src/utils/get-attribute.js":[function(require,module,exports) {
/**
 * A cross-browser implementation of getAttribute.
 * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
 *
 * Return the value for `attr` at `element`.
 *
 * @param {Element} el
 * @param {String} attr
 * @api public
 */
module.exports = function (el, attr) {
  var result = el.getAttribute && el.getAttribute(attr) || null;

  if (!result) {
    var attrs = el.attributes;
    var length = attrs.length;

    for (var i = 0; i < length; i++) {
      if (attr[i] !== undefined) {
        if (attr[i].nodeName === attr) {
          result = attr[i].nodeValue;
        }
      }
    }
  }

  return result;
};
},{}],"node_modules/list.js/src/item.js":[function(require,module,exports) {
module.exports = function (list) {
  return function (initValues, element, notCreate) {
    var item = this;
    this._values = {};
    this.found = false; // Show if list.searched == true and this.found == true

    this.filtered = false; // Show if list.filtered == true and this.filtered == true

    var init = function (initValues, element, notCreate) {
      if (element === undefined) {
        if (notCreate) {
          item.values(initValues, notCreate);
        } else {
          item.values(initValues);
        }
      } else {
        item.elm = element;
        var values = list.templater.get(item, initValues);
        item.values(values);
      }
    };

    this.values = function (newValues, notCreate) {
      if (newValues !== undefined) {
        for (var name in newValues) {
          item._values[name] = newValues[name];
        }

        if (notCreate !== true) {
          list.templater.set(item, item.values());
        }
      } else {
        return item._values;
      }
    };

    this.show = function () {
      list.templater.show(item);
    };

    this.hide = function () {
      list.templater.hide(item);
    };

    this.matching = function () {
      return list.filtered && list.searched && item.found && item.filtered || list.filtered && !list.searched && item.filtered || !list.filtered && list.searched && item.found || !list.filtered && !list.searched;
    };

    this.visible = function () {
      return item.elm && item.elm.parentNode == list.list ? true : false;
    };

    init(initValues, element, notCreate);
  };
};
},{}],"node_modules/list.js/src/add-async.js":[function(require,module,exports) {
module.exports = function (list) {
  var addAsync = function (values, callback, items) {
    var valuesToAdd = values.splice(0, 50);
    items = items || [];
    items = items.concat(list.add(valuesToAdd));

    if (values.length > 0) {
      setTimeout(function () {
        addAsync(values, callback, items);
      }, 1);
    } else {
      list.update();
      callback(items);
    }
  };

  return addAsync;
};
},{}],"node_modules/list.js/src/parse.js":[function(require,module,exports) {
module.exports = function (list) {
  var Item = require('./item')(list);

  var getChildren = function (parent) {
    var nodes = parent.childNodes,
        items = [];

    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        items.push(nodes[i]);
      }
    }

    return items;
  };

  var parse = function (itemElements, valueNames) {
    for (var i = 0, il = itemElements.length; i < il; i++) {
      list.items.push(new Item(valueNames, itemElements[i]));
    }
  };

  var parseAsync = function (itemElements, valueNames) {
    var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?

    parse(itemsToIndex, valueNames);

    if (itemElements.length > 0) {
      setTimeout(function () {
        parseAsync(itemElements, valueNames);
      }, 1);
    } else {
      list.update();
      list.trigger('parseComplete');
    }
  };

  list.handlers.parseComplete = list.handlers.parseComplete || [];
  return function () {
    var itemsToIndex = getChildren(list.list),
        valueNames = list.valueNames;

    if (list.indexAsync) {
      parseAsync(itemsToIndex, valueNames);
    } else {
      parse(itemsToIndex, valueNames);
    }
  };
};
},{"./item":"node_modules/list.js/src/item.js"}],"node_modules/list.js/src/templater.js":[function(require,module,exports) {
var Templater = function (list) {
  var itemSource,
      templater = this;

  var init = function () {
    itemSource = templater.getItemSource(list.item);

    if (itemSource) {
      itemSource = templater.clearSourceItem(itemSource, list.valueNames);
    }
  };

  this.clearSourceItem = function (el, valueNames) {
    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm;

      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          el.setAttribute('data-' + valueNames[i].data[j], '');
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(el, valueNames[i].name, true);

        if (elm) {
          elm.setAttribute(valueNames[i].attr, "");
        }
      } else {
        elm = list.utils.getByClass(el, valueNames[i], true);

        if (elm) {
          elm.innerHTML = "";
        }
      }

      elm = undefined;
    }

    return el;
  };

  this.getItemSource = function (item) {
    if (item === undefined) {
      var nodes = list.list.childNodes,
          items = [];

      for (var i = 0, il = nodes.length; i < il; i++) {
        // Only textnodes have a data attribute
        if (nodes[i].data === undefined) {
          return nodes[i].cloneNode(true);
        }
      }
    } else if (/<tr[\s>]/g.exec(item)) {
      var tbody = document.createElement('tbody');
      tbody.innerHTML = item;
      return tbody.firstChild;
    } else if (item.indexOf("<") !== -1) {
      var div = document.createElement('div');
      div.innerHTML = item;
      return div.firstChild;
    } else {
      var source = document.getElementById(list.item);

      if (source) {
        return source;
      }
    }

    return undefined;
  };

  this.get = function (item, valueNames) {
    templater.create(item);
    var values = {};

    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm;

      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          values[valueNames[i].data[j]] = list.utils.getAttribute(item.elm, 'data-' + valueNames[i].data[j]);
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(item.elm, valueNames[i].name, true);
        values[valueNames[i].name] = elm ? list.utils.getAttribute(elm, valueNames[i].attr) : "";
      } else {
        elm = list.utils.getByClass(item.elm, valueNames[i], true);
        values[valueNames[i]] = elm ? elm.innerHTML : "";
      }

      elm = undefined;
    }

    return values;
  };

  this.set = function (item, values) {
    var getValueName = function (name) {
      for (var i = 0, il = list.valueNames.length; i < il; i++) {
        if (list.valueNames[i].data) {
          var data = list.valueNames[i].data;

          for (var j = 0, jl = data.length; j < jl; j++) {
            if (data[j] === name) {
              return {
                data: name
              };
            }
          }
        } else if (list.valueNames[i].attr && list.valueNames[i].name && list.valueNames[i].name == name) {
          return list.valueNames[i];
        } else if (list.valueNames[i] === name) {
          return name;
        }
      }
    };

    var setValue = function (name, value) {
      var elm;
      var valueName = getValueName(name);
      if (!valueName) return;

      if (valueName.data) {
        item.elm.setAttribute('data-' + valueName.data, value);
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item.elm, valueName.name, true);

        if (elm) {
          elm.setAttribute(valueName.attr, value);
        }
      } else {
        elm = list.utils.getByClass(item.elm, valueName, true);

        if (elm) {
          elm.innerHTML = value;
        }
      }

      elm = undefined;
    };

    if (!templater.create(item)) {
      for (var v in values) {
        if (values.hasOwnProperty(v)) {
          setValue(v, values[v]);
        }
      }
    }
  };

  this.create = function (item) {
    if (item.elm !== undefined) {
      return false;
    }

    if (itemSource === undefined) {
      throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");
    }
    /* If item source does not exists, use the first item in list as
    source for new items */


    var newItem = itemSource.cloneNode(true);
    newItem.removeAttribute('id');
    item.elm = newItem;
    templater.set(item, item.values());
    return true;
  };

  this.remove = function (item) {
    if (item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.show = function (item) {
    templater.create(item);
    list.list.appendChild(item.elm);
  };

  this.hide = function (item) {
    if (item.elm !== undefined && item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.clear = function () {
    /* .innerHTML = ''; fucks up IE */
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1) {
        list.list.removeChild(list.list.firstChild);
      }
    }
  };

  init();
};

module.exports = function (list) {
  return new Templater(list);
};
},{}],"node_modules/list.js/src/search.js":[function(require,module,exports) {
module.exports = function (list) {
  var item, text, columns, searchString, customSearch;
  var prepare = {
    resetList: function () {
      list.i = 1;
      list.templater.clear();
      customSearch = undefined;
    },
    setOptions: function (args) {
      if (args.length == 2 && args[1] instanceof Array) {
        columns = args[1];
      } else if (args.length == 2 && typeof args[1] == "function") {
        columns = undefined;
        customSearch = args[1];
      } else if (args.length == 3) {
        columns = args[1];
        customSearch = args[2];
      } else {
        columns = undefined;
      }
    },
    setColumns: function () {
      if (list.items.length === 0) return;

      if (columns === undefined) {
        columns = list.searchColumns === undefined ? prepare.toArray(list.items[0].values()) : list.searchColumns;
      }
    },
    setSearchString: function (s) {
      s = list.utils.toString(s).toLowerCase();
      s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters

      searchString = s;
    },
    toArray: function (values) {
      var tmpColumn = [];

      for (var name in values) {
        tmpColumn.push(name);
      }

      return tmpColumn;
    }
  };
  var search = {
    list: function () {
      for (var k = 0, kl = list.items.length; k < kl; k++) {
        search.item(list.items[k]);
      }
    },
    item: function (item) {
      item.found = false;

      for (var j = 0, jl = columns.length; j < jl; j++) {
        if (search.values(item.values(), columns[j])) {
          item.found = true;
          return;
        }
      }
    },
    values: function (values, column) {
      if (values.hasOwnProperty(column)) {
        text = list.utils.toString(values[column]).toLowerCase();

        if (searchString !== "" && text.search(searchString) > -1) {
          return true;
        }
      }

      return false;
    },
    reset: function () {
      list.reset.search();
      list.searched = false;
    }
  };

  var searchMethod = function (str) {
    list.trigger('searchStart');
    prepare.resetList();
    prepare.setSearchString(str);
    prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction

    prepare.setColumns();

    if (searchString === "") {
      search.reset();
    } else {
      list.searched = true;

      if (customSearch) {
        customSearch(searchString, columns);
      } else {
        search.list();
      }
    }

    list.update();
    list.trigger('searchComplete');
    return list.visibleItems;
  };

  list.handlers.searchStart = list.handlers.searchStart || [];
  list.handlers.searchComplete = list.handlers.searchComplete || [];
  list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'keyup', function (e) {
    var target = e.target || e.srcElement,
        // IE have srcElement
    alreadyCleared = target.value === "" && !list.searched;

    if (!alreadyCleared) {
      // If oninput already have resetted the list, do nothing
      searchMethod(target.value);
    }
  }); // Used to detect click on HTML5 clear button

  list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'input', function (e) {
    var target = e.target || e.srcElement;

    if (target.value === "") {
      searchMethod('');
    }
  });
  return searchMethod;
};
},{}],"node_modules/list.js/src/filter.js":[function(require,module,exports) {
module.exports = function (list) {
  // Add handlers
  list.handlers.filterStart = list.handlers.filterStart || [];
  list.handlers.filterComplete = list.handlers.filterComplete || [];
  return function (filterFunction) {
    list.trigger('filterStart');
    list.i = 1; // Reset paging

    list.reset.filter();

    if (filterFunction === undefined) {
      list.filtered = false;
    } else {
      list.filtered = true;
      var is = list.items;

      for (var i = 0, il = is.length; i < il; i++) {
        var item = is[i];

        if (filterFunction(item)) {
          item.filtered = true;
        } else {
          item.filtered = false;
        }
      }
    }

    list.update();
    list.trigger('filterComplete');
    return list.visibleItems;
  };
};
},{}],"node_modules/list.js/src/sort.js":[function(require,module,exports) {
module.exports = function (list) {
  list.sortFunction = list.sortFunction || function (itemA, itemB, options) {
    options.desc = options.order == "desc" ? true : false; // Natural sort uses this format

    return list.utils.naturalSort(itemA.values()[options.valueName], itemB.values()[options.valueName], options);
  };

  var buttons = {
    els: undefined,
    clear: function () {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        list.utils.classes(buttons.els[i]).remove('asc');
        list.utils.classes(buttons.els[i]).remove('desc');
      }
    },
    getOrder: function (btn) {
      var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

      if (predefinedOrder == "asc" || predefinedOrder == "desc") {
        return predefinedOrder;
      } else if (list.utils.classes(btn).has('desc')) {
        return "asc";
      } else if (list.utils.classes(btn).has('asc')) {
        return "desc";
      } else {
        return "asc";
      }
    },
    getInSensitive: function (btn, options) {
      var insensitive = list.utils.getAttribute(btn, 'data-insensitive');

      if (insensitive === "false") {
        options.insensitive = false;
      } else {
        options.insensitive = true;
      }
    },
    setOrder: function (options) {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        var btn = buttons.els[i];

        if (list.utils.getAttribute(btn, 'data-sort') !== options.valueName) {
          continue;
        }

        var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          if (predefinedOrder == options.order) {
            list.utils.classes(btn).add(options.order);
          }
        } else {
          list.utils.classes(btn).add(options.order);
        }
      }
    }
  };

  var sort = function () {
    list.trigger('sortStart');
    var options = {};
    var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

    if (target) {
      options.valueName = list.utils.getAttribute(target, 'data-sort');
      buttons.getInSensitive(target, options);
      options.order = buttons.getOrder(target);
    } else {
      options = arguments[1] || options;
      options.valueName = arguments[0];
      options.order = options.order || "asc";
      options.insensitive = typeof options.insensitive == "undefined" ? true : options.insensitive;
    }

    buttons.clear();
    buttons.setOrder(options);
    options.sortFunction = options.sortFunction || list.sortFunction;
    list.items.sort(function (a, b) {
      var mult = options.order === 'desc' ? -1 : 1;
      return options.sortFunction(a, b, options) * mult;
    });
    list.update();
    list.trigger('sortComplete');
  }; // Add handlers


  list.handlers.sortStart = list.handlers.sortStart || [];
  list.handlers.sortComplete = list.handlers.sortComplete || [];
  buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
  list.utils.events.bind(buttons.els, 'click', sort);
  list.on('searchStart', buttons.clear);
  list.on('filterStart', buttons.clear);
  return sort;
};
},{}],"node_modules/list.js/index.js":[function(require,module,exports) {
var define;
(function (window, undefined) {
  "use strict";

  var document = window.document,
      getByClass = require('./src/utils/get-by-class'),
      extend = require('./src/utils/extend'),
      indexOf = require('./src/utils/index-of'),
      events = require('./src/utils/events'),
      toString = require('./src/utils/to-string'),
      naturalSort = require('./src/utils/natural-sort'),
      classes = require('./src/utils/classes'),
      getAttribute = require('./src/utils/get-attribute'),
      toArray = require('./src/utils/to-array');

  var List = function (id, options, values) {
    var self = this,
        init,
        Item = require('./src/item')(self),
        addAsync = require('./src/add-async')(self);

    init = {
      start: function () {
        self.listClass = "list";
        self.searchClass = "search";
        self.sortClass = "sort";
        self.page = 10000;
        self.i = 1;
        self.items = [];
        self.visibleItems = [];
        self.matchingItems = [];
        self.searched = false;
        self.filtered = false;
        self.searchColumns = undefined;
        self.handlers = {
          'updated': []
        };
        self.plugins = {};
        self.valueNames = [];
        self.utils = {
          getByClass: getByClass,
          extend: extend,
          indexOf: indexOf,
          events: events,
          toString: toString,
          naturalSort: naturalSort,
          classes: classes,
          getAttribute: getAttribute,
          toArray: toArray
        };
        self.utils.extend(self, options);
        self.listContainer = typeof id === 'string' ? document.getElementById(id) : id;

        if (!self.listContainer) {
          return;
        }

        self.list = getByClass(self.listContainer, self.listClass, true);
        self.parse = require('./src/parse')(self);
        self.templater = require('./src/templater')(self);
        self.search = require('./src/search')(self);
        self.filter = require('./src/filter')(self);
        self.sort = require('./src/sort')(self);
        this.handlers();
        this.items();
        self.update();
        this.plugins();
      },
      handlers: function () {
        for (var handler in self.handlers) {
          if (self[handler]) {
            self.on(handler, self[handler]);
          }
        }
      },
      items: function () {
        self.parse(self.list);

        if (values !== undefined) {
          self.add(values);
        }
      },
      plugins: function () {
        for (var i = 0; i < self.plugins.length; i++) {
          var plugin = self.plugins[i];
          self[plugin.name] = plugin;
          plugin.init(self, List);
        }
      }
    };
    /*
    * Re-parse the List, use if html have changed
    */

    this.reIndex = function () {
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.parse(self.list);
    };

    this.toJSON = function () {
      var json = [];

      for (var i = 0, il = self.items.length; i < il; i++) {
        json.push(self.items[i].values());
      }

      return json;
    };
    /*
    * Add object to list
    */


    this.add = function (values, callback) {
      if (values.length === 0) {
        return;
      }

      if (callback) {
        addAsync(values, callback);
        return;
      }

      var added = [],
          notCreate = false;

      if (values[0] === undefined) {
        values = [values];
      }

      for (var i = 0, il = values.length; i < il; i++) {
        var item = null;
        notCreate = self.items.length > self.page ? true : false;
        item = new Item(values[i], undefined, notCreate);
        self.items.push(item);
        added.push(item);
      }

      self.update();
      return added;
    };

    this.show = function (i, page) {
      this.i = i;
      this.page = page;
      self.update();
      return self;
    };
    /* Removes object from list.
    * Loops through the list and removes objects where
    * property "valuename" === value
    */


    this.remove = function (valueName, value, options) {
      var found = 0;

      for (var i = 0, il = self.items.length; i < il; i++) {
        if (self.items[i].values()[valueName] == value) {
          self.templater.remove(self.items[i], options);
          self.items.splice(i, 1);
          il--;
          i--;
          found++;
        }
      }

      self.update();
      return found;
    };
    /* Gets the objects in the list which
    * property "valueName" === value
    */


    this.get = function (valueName, value) {
      var matchedItems = [];

      for (var i = 0, il = self.items.length; i < il; i++) {
        var item = self.items[i];

        if (item.values()[valueName] == value) {
          matchedItems.push(item);
        }
      }

      return matchedItems;
    };
    /*
    * Get size of the list
    */


    this.size = function () {
      return self.items.length;
    };
    /*
    * Removes all items from the list
    */


    this.clear = function () {
      self.templater.clear();
      self.items = [];
      return self;
    };

    this.on = function (event, callback) {
      self.handlers[event].push(callback);
      return self;
    };

    this.off = function (event, callback) {
      var e = self.handlers[event];
      var index = indexOf(e, callback);

      if (index > -1) {
        e.splice(index, 1);
      }

      return self;
    };

    this.trigger = function (event) {
      var i = self.handlers[event].length;

      while (i--) {
        self.handlers[event][i](self);
      }

      return self;
    };

    this.reset = {
      filter: function () {
        var is = self.items,
            il = is.length;

        while (il--) {
          is[il].filtered = false;
        }

        return self;
      },
      search: function () {
        var is = self.items,
            il = is.length;

        while (il--) {
          is[il].found = false;
        }

        return self;
      }
    };

    this.update = function () {
      var is = self.items,
          il = is.length;
      self.visibleItems = [];
      self.matchingItems = [];
      self.templater.clear();

      for (var i = 0; i < il; i++) {
        if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
          is[i].show();
          self.visibleItems.push(is[i]);
          self.matchingItems.push(is[i]);
        } else if (is[i].matching()) {
          self.matchingItems.push(is[i]);
          is[i].hide();
        } else {
          is[i].hide();
        }
      }

      self.trigger('updated');
      return self;
    };

    init.start();
  }; // AMD support


  if (typeof define === 'function' && define.amd) {
    define(function () {
      return List;
    });
  }

  module.exports = List;
  window.List = List;
})(window);
},{"./src/utils/get-by-class":"node_modules/list.js/src/utils/get-by-class.js","./src/utils/extend":"node_modules/list.js/src/utils/extend.js","./src/utils/index-of":"node_modules/list.js/src/utils/index-of.js","./src/utils/events":"node_modules/list.js/src/utils/events.js","./src/utils/to-string":"node_modules/list.js/src/utils/to-string.js","./src/utils/natural-sort":"node_modules/list.js/src/utils/natural-sort.js","./src/utils/classes":"node_modules/list.js/src/utils/classes.js","./src/utils/get-attribute":"node_modules/list.js/src/utils/get-attribute.js","./src/utils/to-array":"node_modules/list.js/src/utils/to-array.js","./src/item":"node_modules/list.js/src/item.js","./src/add-async":"node_modules/list.js/src/add-async.js","./src/parse":"node_modules/list.js/src/parse.js","./src/templater":"node_modules/list.js/src/templater.js","./src/search":"node_modules/list.js/src/search.js","./src/filter":"node_modules/list.js/src/filter.js","./src/sort":"node_modules/list.js/src/sort.js"}],"node_modules/aria-accordion/src/util.js":[function(require,module,exports) {
var extend = function(out) {
  out = out || {};
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        out[key] = arguments[i][key];
      }
    }
  }
  return out;
};

module.exports = {
  extend: extend
}

},{}],"node_modules/aria-accordion/src/accordion.js":[function(require,module,exports) {
'use strict';

var extend = require('./util').extend;

var defaultOpts = {
  collapseOthers: false,
  customHiding: false,
  contentPrefix: 'accordion',
  openFirst: false
};

var defaultSelectors = {
  trigger: 'button'
};

/**
 * Creates a new accordion component
 * @constructor
 * @param {Element} elm - The element that contains the entire accordion
 * @param {object} selectors - Selectors for locating DOM elements
 * @param {object} opts - Options for configuring behavior
 */

var Accordion = function(elm, selectors, opts) {
  this.elm = elm;
  this.selectors = extend({}, defaultSelectors, selectors);
  this.opts = extend({}, defaultOpts, opts);

  this.triggers = this.findTriggers();

  this.listeners = [];
  this.addEventListener(this.elm, 'click', this.handleClickElm.bind(this));

  if (this.opts.openFirst) {
    this.expand(this.triggers[0]);
  }
};

Accordion.prototype.handleClickElm = function(e) {
  // If the target is the button, toggle the button
  // Else see if the target is a child of a button
  if (this.triggers.indexOf(e.target) > -1) {
    this.toggle(e.target);
  } else {
    var self = this;
    this.triggers.forEach(function(trigger){
      if (e.target.parentElement === trigger) {
        self.toggle(trigger);
      }
    });
  }
};

Accordion.prototype.findTriggers = function() {
  var self = this;
  var triggers = [].slice.call(this.elm.querySelectorAll(this.selectors.trigger));
  triggers.forEach(function(trigger, index) {
    self.setAria(trigger, index);
  });
  return triggers;
};

Accordion.prototype.setAria = function(trigger, index) {
  var content = trigger.nextElementSibling;
  var contentID;

  if (content.hasAttribute('id')) {
    contentID = content.getAttribute('id');
  } else {
    contentID = this.opts.contentPrefix + '-' + 'content-' + index;
    content.setAttribute('id', contentID);
  }

  trigger.setAttribute('aria-controls', contentID);
  trigger.setAttribute('aria-expanded', 'false');
  content.setAttribute('aria-hidden', 'true');
  this.setStyles(content);
};

Accordion.prototype.toggle = function(elm) {
  var f = elm.getAttribute('aria-expanded') === 'true' ? this.collapse : this.expand;
  f.call(this, elm);
};

Accordion.prototype.expand = function(button) {
  if (this.opts.collapseOthers) {
    this.collapseAll();
  }
  var content = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', 'true');
  content.setAttribute('aria-hidden', 'false');
  this.setStyles(content);
};

Accordion.prototype.collapse = function(button) {
  var content = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', 'false');
  content.setAttribute('aria-hidden', 'true');
  this.setStyles(content);
};

Accordion.prototype.collapseAll = function() {
  var self = this;
  this.triggers.forEach(function(trigger) {
    self.collapse(trigger);
  });
};

Accordion.prototype.expandAll = function() {
  var self = this;
  this.triggers.forEach(function(trigger) {
    self.expand(trigger);
  });
};

Accordion.prototype.setStyles = function(content) {
  var prop = content.getAttribute('aria-hidden') === 'true' ? 'none' : 'block';

  if (!this.opts.customHiding) {
    content.style.display = prop;
  }
};

Accordion.prototype.addEventListener = function(elm, event, callback) {
  if (elm) {
    elm.addEventListener(event, callback);
    this.listeners.push({
      elm: elm,
      event: event,
      callback: callback
    });
  }
};

Accordion.prototype.destroy = function() {
  this.listeners.forEach(function(listener) {
    listener.elm.removeEventListener(listener.event, listener.callback);
  });
};

module.exports = { Accordion: Accordion };

},{"./util":"node_modules/aria-accordion/src/util.js"}],"node_modules/glossary-panel/src/glossary.js":[function(require,module,exports) {
'use strict';

var _ = require('underscore');
var List = require('list.js');
var Accordion = require('aria-accordion').Accordion;

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

// https://davidwalsh.name/element-matches-selector
function selectorMatches(el, selector) {
  var p = Element.prototype;
  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}

function forEach(values, callback) {
  return [].forEach.call(values, callback);
}

var itemTemplate = _.template(
  '<li class="{{ glossaryItemClass }}">' +
    '<button class="data-glossary-term {{ termClass }}">{{ term }}' +
    '</button>' +
    '<div class="{{ definitionClass }}">{{ definition }}</div>' +
  '</li>',
  {interpolate: /\{\{(.+?)\}\}/g}
);

var defaultSelectors = {
  glossaryID: '#glossary',
  toggle: '.js-glossary-toggle',
  close: '.js-glossary-close',
  listClass: '.js-glossary-list',
  searchClass: '.js-glossary-search'
};

var defaultClasses = {
  definitionClass: 'glossary__definition',
  glossaryItemClass: 'glossary__item',
  highlightedTerm: 'term--highlight',
  termClass: 'glossary__term'
};

function removeTabindex(elm) {
  var elms = getTabIndex(elm);
  forEach(elms, function(elm) {
    elm.setAttribute('tabIndex', '-1');
  });
}

function restoreTabindex(elm) {
  var elms = getTabIndex(elm);
  forEach(elms, function(elm) {
    elm.setAttribute('tabIndex', '0');
  });
}

function getTabIndex(elm) {
  return elm.querySelectorAll('a, button, input, [tabindex]');
}

/**
 * Glossary widget
 * @constructor
 * @param {Array} terms - Term objects with "glossary-term" and "glossary-definition" keys
 * @param {Object} selectors - CSS selectors for glossary components
 * @param {Object} classes - CSS classes to be applied for styling
 */
function Glossary(terms, selectors, classes) {
  this.terms = terms;
  this.selectors = _.extend({}, defaultSelectors, selectors);
  this.classes = _.extend({}, defaultClasses, classes);

  this.body = document.querySelector(this.selectors.glossaryID);
  this.toggleBtn = document.querySelector(this.selectors.toggle);
  this.closeBtn = document.querySelector(this.selectors.close);
  this.search = this.body.querySelector(this.selectors.searchClass);
  this.listElm = this.body.querySelector(this.selectors.listClass);
  this.selectedTerm = this.toggleBtn;

  // Initialize state
  this.isOpen = false;

  // Update DOM
  this.populate();
  this.initList();
  this.linkTerms();

  // Remove tabindices
  removeTabindex(this.body);

  // Initialize accordions
  this.accordion = new Accordion(this.listElm, null, {contentPrefix: 'glossary'});

  // Bind listeners
  this.listeners = [];
  this.addEventListener(this.toggleBtn, 'click', this.toggle.bind(this));
  this.addEventListener(this.closeBtn, 'click', this.hide.bind(this));
  this.addEventListener(this.search, 'input', this.handleInput.bind(this));
  this.addEventListener(document.body, 'keyup', this.handleKeyup.bind(this));
}

Glossary.prototype.populate = function() {
  this.terms.forEach(function(term) {
    var opts = {
      term: term.term,
      definition: term.definition,
      definitionClass: this.classes.definitionClass,
      glossaryItemClass: this.classes.glossaryItemClass,
      termClass: this.classes.termClass
    };
    this.listElm.insertAdjacentHTML('beforeend', itemTemplate(opts));
  }, this);
};

/** Initialize list.js list of terms */
Glossary.prototype.initList = function() {
  var glossaryId = this.selectors.glossaryID.slice(1);
  var listClass = this.selectors.listClass.slice(1);
  var searchClass = this.selectors.searchClass.slice(1);
  var options = {
    valueNames: ['data-glossary-term'],
    listClass: listClass,
    searchClass: searchClass,
  };
  this.list = new List(glossaryId, options);
  this.list.sort('data-glossary-term', {order: 'asc'});
};

/** Add links to terms in body */
Glossary.prototype.linkTerms = function() {
  var terms = document.querySelectorAll('[data-term]');
  forEach(terms, function(term) {
    term.setAttribute('title', 'Click to define');
    term.setAttribute('tabIndex', 0);
    term.setAttribute('data-term', (term.getAttribute('data-term') || '').toLowerCase());
  });
  document.body.addEventListener('click', this.handleTermTouch.bind(this));
  document.body.addEventListener('keyup', this.handleTermTouch.bind(this));
};

Glossary.prototype.handleTermTouch = function(e) {
  if (e.which === KEYCODE_ENTER || e.type === 'click') {
    if (selectorMatches(e.target, '[data-term]')) {
      this.show(e);
      this.selectedTerm = e.target;
      this.findTerm(e.target.getAttribute('data-term'));
    }
    else {
      this.selectedTerm = this.toggleBtn;
    }
  }
};

/** Highlight a term */
Glossary.prototype.findTerm = function(term) {
  this.search.value = term;
  var highlightClass = this.classes.highlightedTerm;

  // Highlight the term and remove other highlights
  forEach(this.body.querySelectorAll('.' + highlightClass), function(term) {
    term.classList.remove(highlightClass);
  });
  forEach(this.body.querySelectorAll('span[data-term="' + term + '"]'), function(term) {
    term.classList.add(highlightClass);
  });
  this.list.filter(function(item) {
    return item._values['data-glossary-term'].toLowerCase() === term;
  });

  this.list.search();
  var button = this.list.visibleItems[0].elm.querySelector('button');
  this.accordion.expand(button);
};

Glossary.prototype.toggle = function() {
  var method = this.isOpen ? this.hide : this.show;
  method.apply(this);
};

Glossary.prototype.show = function() {
  this.body.setAttribute('aria-hidden', 'false');
  this.toggleBtn.setAttribute('aria-expanded', 'true');
  this.search.focus();
  this.isOpen = true;
  restoreTabindex(this.body);
};

Glossary.prototype.hide = function() {
  this.body.setAttribute('aria-hidden', 'true');
  this.toggleBtn.setAttribute('aria-expanded', 'false');
  this.selectedTerm.focus();
  this.isOpen = false;
  removeTabindex(this.body);
};

/** Remove existing filters on input */
Glossary.prototype.handleInput = function() {
  if (this.list.filtered) {
    this.list.filter();
  }
};

/** Close glossary on escape keypress */
Glossary.prototype.handleKeyup = function(e) {
  if (e.keyCode == KEYCODE_ESC) {
    if (this.isOpen) {
      this.hide();
    }
  }
};

Glossary.prototype.addEventListener = function(elm, event, callback) {
  if (elm) {
    elm.addEventListener(event, callback);
    this.listeners.push({
      elm: elm,
      event: event,
      callback: callback
    });
  }
};

Glossary.prototype.destroy = function() {
  this.accordion.destroy();
  this.listeners.forEach(function(listener) {
    listener.elm.removeEventListener(listener.event, listener.callback);
  });
};

module.exports = Glossary;

},{"underscore":"node_modules/underscore/modules/index-all.js","list.js":"node_modules/list.js/index.js","aria-accordion":"node_modules/aria-accordion/src/accordion.js"}],"terms.json":[function(require,module,exports) {
module.exports = [{
  "term": "A-spectral-class",
  "definition": "Hot white stars (7,500 -10,000 K effective temperature). They show strong H lines and ionised metal lines in their spectra. Examples include Sirius A (A1 V), the brightest star in the night sky and Deneb (A2 Ia), a supergiant."
}, {
  "term": "ZAMS",
  "definition": "This is the position of a zero age star when it arrives on the main sequence. It is used to infer the age of cluster stars."
}];
},{}],"init.js":[function(require,module,exports) {
var Glossary = require('glossary-panel'); // JSON file of terms and definitions


var terms = require('./terms'); // Optional configuration objects
//var selectors = { ... };
//var classes = { ... };


new Glossary(terms);
},{"glossary-panel":"node_modules/glossary-panel/src/glossary.js","./terms":"terms.json"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50993" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","init.js"], null)
//# sourceMappingURL=/init.9d6cb373.js.map