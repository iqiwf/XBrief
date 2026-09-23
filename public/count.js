var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key2 of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from2[key2], enumerable: !(desc = __getOwnPropDesc(from2, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/core-js/modules/_is-object.js
var require_is_object = __commonJS({
  "node_modules/core-js/modules/_is-object.js"(exports, module) {
    module.exports = function(it) {
      return typeof it === "object" ? it !== null : typeof it === "function";
    };
  }
});

// node_modules/core-js/modules/_an-object.js
var require_an_object = __commonJS({
  "node_modules/core-js/modules/_an-object.js"(exports, module) {
    var isObject2 = require_is_object();
    module.exports = function(it) {
      if (!isObject2(it)) throw TypeError(it + " is not an object!");
      return it;
    };
  }
});

// node_modules/core-js/modules/_defined.js
var require_defined = __commonJS({
  "node_modules/core-js/modules/_defined.js"(exports, module) {
    module.exports = function(it) {
      if (it == void 0) throw TypeError("Can't call method on  " + it);
      return it;
    };
  }
});

// node_modules/core-js/modules/_to-object.js
var require_to_object = __commonJS({
  "node_modules/core-js/modules/_to-object.js"(exports, module) {
    var defined = require_defined();
    module.exports = function(it) {
      return Object(defined(it));
    };
  }
});

// node_modules/core-js/modules/_to-integer.js
var require_to_integer = __commonJS({
  "node_modules/core-js/modules/_to-integer.js"(exports, module) {
    var ceil = Math.ceil;
    var floor2 = Math.floor;
    module.exports = function(it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor2 : ceil)(it);
    };
  }
});

// node_modules/core-js/modules/_to-length.js
var require_to_length = __commonJS({
  "node_modules/core-js/modules/_to-length.js"(exports, module) {
    var toInteger2 = require_to_integer();
    var min2 = Math.min;
    module.exports = function(it) {
      return it > 0 ? min2(toInteger2(it), 9007199254740991) : 0;
    };
  }
});

// node_modules/core-js/modules/_string-at.js
var require_string_at = __commonJS({
  "node_modules/core-js/modules/_string-at.js"(exports, module) {
    var toInteger2 = require_to_integer();
    var defined = require_defined();
    module.exports = function(TO_STRING3) {
      return function(that, pos) {
        var s = String(defined(that));
        var i3 = toInteger2(pos);
        var l = s.length;
        var a, b;
        if (i3 < 0 || i3 >= l) return TO_STRING3 ? "" : void 0;
        a = s.charCodeAt(i3);
        return a < 55296 || a > 56319 || i3 + 1 === l || (b = s.charCodeAt(i3 + 1)) < 56320 || b > 57343 ? TO_STRING3 ? s.charAt(i3) : a : TO_STRING3 ? s.slice(i3, i3 + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
      };
    };
  }
});

// node_modules/core-js/modules/_advance-string-index.js
var require_advance_string_index = __commonJS({
  "node_modules/core-js/modules/_advance-string-index.js"(exports, module) {
    "use strict";
    var at = require_string_at()(true);
    module.exports = function(S, index, unicode) {
      return index + (unicode ? at(S, index).length : 1);
    };
  }
});

// node_modules/core-js/modules/_cof.js
var require_cof = __commonJS({
  "node_modules/core-js/modules/_cof.js"(exports, module) {
    var toString = {}.toString;
    module.exports = function(it) {
      return toString.call(it).slice(8, -1);
    };
  }
});

// node_modules/core-js/modules/_core.js
var require_core = __commonJS({
  "node_modules/core-js/modules/_core.js"(exports, module) {
    var core = module.exports = { version: "2.6.12" };
    if (typeof __e == "number") __e = core;
  }
});

// node_modules/core-js/modules/_global.js
var require_global = __commonJS({
  "node_modules/core-js/modules/_global.js"(exports, module) {
    var global5 = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global5;
  }
});

// node_modules/core-js/modules/_library.js
var require_library = __commonJS({
  "node_modules/core-js/modules/_library.js"(exports, module) {
    module.exports = false;
  }
});

// node_modules/core-js/modules/_shared.js
var require_shared = __commonJS({
  "node_modules/core-js/modules/_shared.js"(exports, module) {
    var core = require_core();
    var global5 = require_global();
    var SHARED = "__core-js_shared__";
    var store = global5[SHARED] || (global5[SHARED] = {});
    (module.exports = function(key2, value) {
      return store[key2] || (store[key2] = value !== void 0 ? value : {});
    })("versions", []).push({
      version: core.version,
      mode: require_library() ? "pure" : "global",
      copyright: "\xA9 2020 Denis Pushkarev (zloirock.ru)"
    });
  }
});

// node_modules/core-js/modules/_uid.js
var require_uid = __commonJS({
  "node_modules/core-js/modules/_uid.js"(exports, module) {
    var id = 0;
    var px = Math.random();
    module.exports = function(key2) {
      return "Symbol(".concat(key2 === void 0 ? "" : key2, ")_", (++id + px).toString(36));
    };
  }
});

// node_modules/core-js/modules/_wks.js
var require_wks = __commonJS({
  "node_modules/core-js/modules/_wks.js"(exports, module) {
    var store = require_shared()("wks");
    var uid2 = require_uid();
    var Symbol2 = require_global().Symbol;
    var USE_SYMBOL = typeof Symbol2 == "function";
    var $exports = module.exports = function(name) {
      return store[name] || (store[name] = USE_SYMBOL && Symbol2[name] || (USE_SYMBOL ? Symbol2 : uid2)("Symbol." + name));
    };
    $exports.store = store;
  }
});

// node_modules/core-js/modules/_classof.js
var require_classof = __commonJS({
  "node_modules/core-js/modules/_classof.js"(exports, module) {
    var cof = require_cof();
    var TAG = require_wks()("toStringTag");
    var ARG = cof(/* @__PURE__ */ (function() {
      return arguments;
    })()) == "Arguments";
    var tryGet = function(it, key2) {
      try {
        return it[key2];
      } catch (e) {
      }
    };
    module.exports = function(it) {
      var O, T, B;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (T = tryGet(O = Object(it), TAG)) == "string" ? T : ARG ? cof(O) : (B = cof(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : B;
    };
  }
});

// node_modules/core-js/modules/_regexp-exec-abstract.js
var require_regexp_exec_abstract = __commonJS({
  "node_modules/core-js/modules/_regexp-exec-abstract.js"(exports, module) {
    "use strict";
    var classof2 = require_classof();
    var builtinExec = RegExp.prototype.exec;
    module.exports = function(R, S) {
      var exec = R.exec;
      if (typeof exec === "function") {
        var result = exec.call(R, S);
        if (typeof result !== "object") {
          throw new TypeError("RegExp exec method returned something other than an Object or null");
        }
        return result;
      }
      if (classof2(R) !== "RegExp") {
        throw new TypeError("RegExp#exec called on incompatible receiver");
      }
      return builtinExec.call(R, S);
    };
  }
});

// node_modules/core-js/modules/_flags.js
var require_flags = __commonJS({
  "node_modules/core-js/modules/_flags.js"(exports, module) {
    "use strict";
    var anObject6 = require_an_object();
    module.exports = function() {
      var that = anObject6(this);
      var result = "";
      if (that.global) result += "g";
      if (that.ignoreCase) result += "i";
      if (that.multiline) result += "m";
      if (that.unicode) result += "u";
      if (that.sticky) result += "y";
      return result;
    };
  }
});

// node_modules/core-js/modules/_regexp-exec.js
var require_regexp_exec = __commonJS({
  "node_modules/core-js/modules/_regexp-exec.js"(exports, module) {
    "use strict";
    var regexpFlags = require_flags();
    var nativeExec = RegExp.prototype.exec;
    var nativeReplace = String.prototype.replace;
    var patchedExec = nativeExec;
    var LAST_INDEX2 = "lastIndex";
    var UPDATES_LAST_INDEX_WRONG = (function() {
      var re12 = /a/, re22 = /b*/g;
      nativeExec.call(re12, "a");
      nativeExec.call(re22, "a");
      return re12[LAST_INDEX2] !== 0 || re22[LAST_INDEX2] !== 0;
    })();
    var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;
    if (PATCH) {
      patchedExec = function exec(str) {
        var re = this;
        var lastIndex, reCopy, match, i3;
        if (NPCG_INCLUDED) {
          reCopy = new RegExp("^" + re.source + "$(?!\\s)", regexpFlags.call(re));
        }
        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX2];
        match = nativeExec.call(re, str);
        if (UPDATES_LAST_INDEX_WRONG && match) {
          re[LAST_INDEX2] = re.global ? match.index + match[0].length : lastIndex;
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          nativeReplace.call(match[0], reCopy, function() {
            for (i3 = 1; i3 < arguments.length - 2; i3++) {
              if (arguments[i3] === void 0) match[i3] = void 0;
            }
          });
        }
        return match;
      };
    }
    module.exports = patchedExec;
  }
});

// node_modules/core-js/modules/_fails.js
var require_fails = __commonJS({
  "node_modules/core-js/modules/_fails.js"(exports, module) {
    module.exports = function(exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
  }
});

// node_modules/core-js/modules/_descriptors.js
var require_descriptors = __commonJS({
  "node_modules/core-js/modules/_descriptors.js"(exports, module) {
    module.exports = !require_fails()(function() {
      return Object.defineProperty({}, "a", { get: function() {
        return 7;
      } }).a != 7;
    });
  }
});

// node_modules/core-js/modules/_dom-create.js
var require_dom_create = __commonJS({
  "node_modules/core-js/modules/_dom-create.js"(exports, module) {
    var isObject2 = require_is_object();
    var document = require_global().document;
    var is = isObject2(document) && isObject2(document.createElement);
    module.exports = function(it) {
      return is ? document.createElement(it) : {};
    };
  }
});

// node_modules/core-js/modules/_ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "node_modules/core-js/modules/_ie8-dom-define.js"(exports, module) {
    module.exports = !require_descriptors() && !require_fails()(function() {
      return Object.defineProperty(require_dom_create()("div"), "a", { get: function() {
        return 7;
      } }).a != 7;
    });
  }
});

// node_modules/core-js/modules/_to-primitive.js
var require_to_primitive = __commonJS({
  "node_modules/core-js/modules/_to-primitive.js"(exports, module) {
    var isObject2 = require_is_object();
    module.exports = function(it, S) {
      if (!isObject2(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == "function" && !isObject2(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == "function" && !isObject2(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == "function" && !isObject2(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };
  }
});

// node_modules/core-js/modules/_object-dp.js
var require_object_dp = __commonJS({
  "node_modules/core-js/modules/_object-dp.js"(exports) {
    var anObject6 = require_an_object();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var toPrimitive3 = require_to_primitive();
    var dP3 = Object.defineProperty;
    exports.f = require_descriptors() ? Object.defineProperty : function defineProperty2(O, P, Attributes) {
      anObject6(O);
      P = toPrimitive3(P, true);
      anObject6(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP3(O, P, Attributes);
      } catch (e) {
      }
      if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
      if ("value" in Attributes) O[P] = Attributes.value;
      return O;
    };
  }
});

// node_modules/core-js/modules/_property-desc.js
var require_property_desc = __commonJS({
  "node_modules/core-js/modules/_property-desc.js"(exports, module) {
    module.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value
      };
    };
  }
});

// node_modules/core-js/modules/_hide.js
var require_hide = __commonJS({
  "node_modules/core-js/modules/_hide.js"(exports, module) {
    var dP3 = require_object_dp();
    var createDesc2 = require_property_desc();
    module.exports = require_descriptors() ? function(object, key2, value) {
      return dP3.f(object, key2, createDesc2(1, value));
    } : function(object, key2, value) {
      object[key2] = value;
      return object;
    };
  }
});

// node_modules/core-js/modules/_has.js
var require_has = __commonJS({
  "node_modules/core-js/modules/_has.js"(exports, module) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key2) {
      return hasOwnProperty.call(it, key2);
    };
  }
});

// node_modules/core-js/modules/_function-to-string.js
var require_function_to_string = __commonJS({
  "node_modules/core-js/modules/_function-to-string.js"(exports, module) {
    module.exports = require_shared()("native-function-to-string", Function.toString);
  }
});

// node_modules/core-js/modules/_redefine.js
var require_redefine = __commonJS({
  "node_modules/core-js/modules/_redefine.js"(exports, module) {
    var global5 = require_global();
    var hide2 = require_hide();
    var has2 = require_has();
    var SRC = require_uid()("src");
    var $toString3 = require_function_to_string();
    var TO_STRING3 = "toString";
    var TPL = ("" + $toString3).split(TO_STRING3);
    require_core().inspectSource = function(it) {
      return $toString3.call(it);
    };
    (module.exports = function(O, key2, val, safe) {
      var isFunction = typeof val == "function";
      if (isFunction) has2(val, "name") || hide2(val, "name", key2);
      if (O[key2] === val) return;
      if (isFunction) has2(val, SRC) || hide2(val, SRC, O[key2] ? "" + O[key2] : TPL.join(String(key2)));
      if (O === global5) {
        O[key2] = val;
      } else if (!safe) {
        delete O[key2];
        hide2(O, key2, val);
      } else if (O[key2]) {
        O[key2] = val;
      } else {
        hide2(O, key2, val);
      }
    })(Function.prototype, TO_STRING3, function toString() {
      return typeof this == "function" && this[SRC] || $toString3.call(this);
    });
  }
});

// node_modules/core-js/modules/_a-function.js
var require_a_function = __commonJS({
  "node_modules/core-js/modules/_a-function.js"(exports, module) {
    module.exports = function(it) {
      if (typeof it != "function") throw TypeError(it + " is not a function!");
      return it;
    };
  }
});

// node_modules/core-js/modules/_ctx.js
var require_ctx = __commonJS({
  "node_modules/core-js/modules/_ctx.js"(exports, module) {
    var aFunction2 = require_a_function();
    module.exports = function(fn, that, length) {
      aFunction2(fn);
      if (that === void 0) return fn;
      switch (length) {
        case 1:
          return function(a) {
            return fn.call(that, a);
          };
        case 2:
          return function(a, b) {
            return fn.call(that, a, b);
          };
        case 3:
          return function(a, b, c) {
            return fn.call(that, a, b, c);
          };
      }
      return function() {
        return fn.apply(that, arguments);
      };
    };
  }
});

// node_modules/core-js/modules/_export.js
var require_export = __commonJS({
  "node_modules/core-js/modules/_export.js"(exports, module) {
    var global5 = require_global();
    var core = require_core();
    var hide2 = require_hide();
    var redefine3 = require_redefine();
    var ctx2 = require_ctx();
    var PROTOTYPE2 = "prototype";
    var $export12 = function(type, name, source) {
      var IS_FORCED = type & $export12.F;
      var IS_GLOBAL = type & $export12.G;
      var IS_STATIC = type & $export12.S;
      var IS_PROTO = type & $export12.P;
      var IS_BIND = type & $export12.B;
      var target = IS_GLOBAL ? global5 : IS_STATIC ? global5[name] || (global5[name] = {}) : (global5[name] || {})[PROTOTYPE2];
      var exports2 = IS_GLOBAL ? core : core[name] || (core[name] = {});
      var expProto = exports2[PROTOTYPE2] || (exports2[PROTOTYPE2] = {});
      var key2, own, out, exp;
      if (IS_GLOBAL) source = name;
      for (key2 in source) {
        own = !IS_FORCED && target && target[key2] !== void 0;
        out = (own ? target : source)[key2];
        exp = IS_BIND && own ? ctx2(out, global5) : IS_PROTO && typeof out == "function" ? ctx2(Function.call, out) : out;
        if (target) redefine3(target, key2, out, type & $export12.U);
        if (exports2[key2] != out) hide2(exports2, key2, exp);
        if (IS_PROTO && expProto[key2] != out) expProto[key2] = out;
      }
    };
    global5.core = core;
    $export12.F = 1;
    $export12.G = 2;
    $export12.S = 4;
    $export12.P = 8;
    $export12.B = 16;
    $export12.W = 32;
    $export12.U = 64;
    $export12.R = 128;
    module.exports = $export12;
  }
});

// node_modules/core-js/modules/es6.regexp.exec.js
var require_es6_regexp_exec = __commonJS({
  "node_modules/core-js/modules/es6.regexp.exec.js"() {
    "use strict";
    var regexpExec2 = require_regexp_exec();
    require_export()({
      target: "RegExp",
      proto: true,
      forced: regexpExec2 !== /./.exec
    }, {
      exec: regexpExec2
    });
  }
});

// node_modules/core-js/modules/_fix-re-wks.js
var require_fix_re_wks = __commonJS({
  "node_modules/core-js/modules/_fix-re-wks.js"(exports, module) {
    "use strict";
    require_es6_regexp_exec();
    var redefine3 = require_redefine();
    var hide2 = require_hide();
    var fails3 = require_fails();
    var defined = require_defined();
    var wks3 = require_wks();
    var regexpExec2 = require_regexp_exec();
    var SPECIES = wks3("species");
    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails3(function() {
      var re = /./;
      re.exec = function() {
        var result = [];
        result.groups = { a: "7" };
        return result;
      };
      return "".replace(re, "$<a>") !== "7";
    });
    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function() {
      var re = /(?:)/;
      var originalExec = re.exec;
      re.exec = function() {
        return originalExec.apply(this, arguments);
      };
      var result = "ab".split(re);
      return result.length === 2 && result[0] === "a" && result[1] === "b";
    })();
    module.exports = function(KEY, length, exec) {
      var SYMBOL = wks3(KEY);
      var DELEGATES_TO_SYMBOL = !fails3(function() {
        var O = {};
        O[SYMBOL] = function() {
          return 7;
        };
        return ""[KEY](O) != 7;
      });
      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails3(function() {
        var execCalled = false;
        var re = /a/;
        re.exec = function() {
          execCalled = true;
          return null;
        };
        if (KEY === "split") {
          re.constructor = {};
          re.constructor[SPECIES] = function() {
            return re;
          };
        }
        re[SYMBOL]("");
        return !execCalled;
      }) : void 0;
      if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
        var nativeRegExpMethod = /./[SYMBOL];
        var fns = exec(
          defined,
          SYMBOL,
          ""[KEY],
          function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
            if (regexp.exec === regexpExec2) {
              if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
              }
              return { done: true, value: nativeMethod.call(str, regexp, arg2) };
            }
            return { done: false };
          }
        );
        var strfn = fns[0];
        var rxfn = fns[1];
        redefine3(String.prototype, KEY, strfn);
        hide2(
          RegExp.prototype,
          SYMBOL,
          length == 2 ? function(string, arg) {
            return rxfn.call(string, this, arg);
          } : function(string) {
            return rxfn.call(string, this);
          }
        );
      }
    };
  }
});

// node_modules/core-js/modules/_iobject.js
var require_iobject = __commonJS({
  "node_modules/core-js/modules/_iobject.js"(exports, module) {
    var cof = require_cof();
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
      return cof(it) == "String" ? it.split("") : Object(it);
    };
  }
});

// node_modules/core-js/modules/_to-iobject.js
var require_to_iobject = __commonJS({
  "node_modules/core-js/modules/_to-iobject.js"(exports, module) {
    var IObject = require_iobject();
    var defined = require_defined();
    module.exports = function(it) {
      return IObject(defined(it));
    };
  }
});

// node_modules/core-js/modules/_to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "node_modules/core-js/modules/_to-absolute-index.js"(exports, module) {
    var toInteger2 = require_to_integer();
    var max2 = Math.max;
    var min2 = Math.min;
    module.exports = function(index, length) {
      index = toInteger2(index);
      return index < 0 ? max2(index + length, 0) : min2(index, length);
    };
  }
});

// node_modules/core-js/modules/_array-includes.js
var require_array_includes = __commonJS({
  "node_modules/core-js/modules/_array-includes.js"(exports, module) {
    var toIObject3 = require_to_iobject();
    var toLength5 = require_to_length();
    var toAbsoluteIndex = require_to_absolute_index();
    module.exports = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIObject3($this);
        var length = toLength5(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          if (value != value) return true;
        }
        else for (; length > index; index++) if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
      };
    };
  }
});

// node_modules/core-js/modules/_strict-method.js
var require_strict_method = __commonJS({
  "node_modules/core-js/modules/_strict-method.js"(exports, module) {
    "use strict";
    var fails3 = require_fails();
    module.exports = function(method, arg) {
      return !!method && fails3(function() {
        arg ? method.call(null, function() {
        }, 1) : method.call(null);
      });
    };
  }
});

// node_modules/core-js/modules/_object-pie.js
var require_object_pie = __commonJS({
  "node_modules/core-js/modules/_object-pie.js"(exports) {
    exports.f = {}.propertyIsEnumerable;
  }
});

// node_modules/core-js/modules/_object-gopd.js
var require_object_gopd = __commonJS({
  "node_modules/core-js/modules/_object-gopd.js"(exports) {
    var pIE = require_object_pie();
    var createDesc2 = require_property_desc();
    var toIObject3 = require_to_iobject();
    var toPrimitive3 = require_to_primitive();
    var has2 = require_has();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var gOPD3 = Object.getOwnPropertyDescriptor;
    exports.f = require_descriptors() ? gOPD3 : function getOwnPropertyDescriptor2(O, P) {
      O = toIObject3(O);
      P = toPrimitive3(P, true);
      if (IE8_DOM_DEFINE) try {
        return gOPD3(O, P);
      } catch (e) {
      }
      if (has2(O, P)) return createDesc2(!pIE.f.call(O, P), O[P]);
    };
  }
});

// node_modules/core-js/modules/_set-proto.js
var require_set_proto = __commonJS({
  "node_modules/core-js/modules/_set-proto.js"(exports, module) {
    var isObject2 = require_is_object();
    var anObject6 = require_an_object();
    var check = function(O, proto3) {
      anObject6(O);
      if (!isObject2(proto3) && proto3 !== null) throw TypeError(proto3 + ": can't set as prototype!");
    };
    module.exports = {
      set: Object.setPrototypeOf || ("__proto__" in {} ? (
        // eslint-disable-line
        (function(test3, buggy, set) {
          try {
            set = require_ctx()(Function.call, require_object_gopd().f(Object.prototype, "__proto__").set, 2);
            set(test3, []);
            buggy = !(test3 instanceof Array);
          } catch (e) {
            buggy = true;
          }
          return function setPrototypeOf(O, proto3) {
            check(O, proto3);
            if (buggy) O.__proto__ = proto3;
            else set(O, proto3);
            return O;
          };
        })({}, false)
      ) : void 0),
      check
    };
  }
});

// node_modules/core-js/modules/_inherit-if-required.js
var require_inherit_if_required = __commonJS({
  "node_modules/core-js/modules/_inherit-if-required.js"(exports, module) {
    var isObject2 = require_is_object();
    var setPrototypeOf = require_set_proto().set;
    module.exports = function(that, target, C) {
      var S = target.constructor;
      var P;
      if (S !== C && typeof S == "function" && (P = S.prototype) !== C.prototype && isObject2(P) && setPrototypeOf) {
        setPrototypeOf(that, P);
      }
      return that;
    };
  }
});

// node_modules/core-js/modules/_shared-key.js
var require_shared_key = __commonJS({
  "node_modules/core-js/modules/_shared-key.js"(exports, module) {
    var shared2 = require_shared()("keys");
    var uid2 = require_uid();
    module.exports = function(key2) {
      return shared2[key2] || (shared2[key2] = uid2(key2));
    };
  }
});

// node_modules/core-js/modules/_object-keys-internal.js
var require_object_keys_internal = __commonJS({
  "node_modules/core-js/modules/_object-keys-internal.js"(exports, module) {
    var has2 = require_has();
    var toIObject3 = require_to_iobject();
    var arrayIndexOf = require_array_includes()(false);
    var IE_PROTO = require_shared_key()("IE_PROTO");
    module.exports = function(object, names) {
      var O = toIObject3(object);
      var i3 = 0;
      var result = [];
      var key2;
      for (key2 in O) if (key2 != IE_PROTO) has2(O, key2) && result.push(key2);
      while (names.length > i3) if (has2(O, key2 = names[i3++])) {
        ~arrayIndexOf(result, key2) || result.push(key2);
      }
      return result;
    };
  }
});

// node_modules/core-js/modules/_enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "node_modules/core-js/modules/_enum-bug-keys.js"(exports, module) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }
});

// node_modules/core-js/modules/_object-gopn.js
var require_object_gopn = __commonJS({
  "node_modules/core-js/modules/_object-gopn.js"(exports) {
    var $keys3 = require_object_keys_internal();
    var hiddenKeys = require_enum_bug_keys().concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames2(O) {
      return $keys3(O, hiddenKeys);
    };
  }
});

// node_modules/core-js/modules/_is-regexp.js
var require_is_regexp = __commonJS({
  "node_modules/core-js/modules/_is-regexp.js"(exports, module) {
    var isObject2 = require_is_object();
    var cof = require_cof();
    var MATCH = require_wks()("match");
    module.exports = function(it) {
      var isRegExp3;
      return isObject2(it) && ((isRegExp3 = it[MATCH]) !== void 0 ? !!isRegExp3 : cof(it) == "RegExp");
    };
  }
});

// node_modules/core-js/modules/_set-species.js
var require_set_species = __commonJS({
  "node_modules/core-js/modules/_set-species.js"(exports, module) {
    "use strict";
    var global5 = require_global();
    var dP3 = require_object_dp();
    var DESCRIPTORS3 = require_descriptors();
    var SPECIES = require_wks()("species");
    module.exports = function(KEY) {
      var C = global5[KEY];
      if (DESCRIPTORS3 && C && !C[SPECIES]) dP3.f(C, SPECIES, {
        configurable: true,
        get: function() {
          return this;
        }
      });
    };
  }
});

// node_modules/core-js/modules/_species-constructor.js
var require_species_constructor = __commonJS({
  "node_modules/core-js/modules/_species-constructor.js"(exports, module) {
    var anObject6 = require_an_object();
    var aFunction2 = require_a_function();
    var SPECIES = require_wks()("species");
    module.exports = function(O, D) {
      var C = anObject6(O).constructor;
      var S;
      return C === void 0 || (S = anObject6(C)[SPECIES]) == void 0 ? D : aFunction2(S);
    };
  }
});

// node_modules/punycode/punycode.js
var require_punycode = __commonJS({
  "node_modules/punycode/punycode.js"(exports, module) {
    (function(root) {
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = typeof module == "object" && module && !module.nodeType && module;
      var freeGlobal = typeof global == "object" && global;
      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
        root = freeGlobal;
      }
      var punycode2, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, baseMinusTMin = base - tMin, floor2 = Math.floor, stringFromCharCode = String.fromCharCode, key2;
      function error(type) {
        throw new RangeError(errors[type]);
      }
      function map(array, fn) {
        var length = array.length;
        var result = [];
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [], counter = 0, length = string.length, value, extra;
        while (counter < length) {
          value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      function ucs2encode(array) {
        return map(array, function(value) {
          var output = "";
          if (value > 65535) {
            value -= 65536;
            output += stringFromCharCode(value >>> 10 & 1023 | 55296);
            value = 56320 | value & 1023;
          }
          output += stringFromCharCode(value);
          return output;
        }).join("");
      }
      function basicToDigit(codePoint2) {
        if (codePoint2 - 48 < 10) {
          return codePoint2 - 22;
        }
        if (codePoint2 - 65 < 26) {
          return codePoint2 - 65;
        }
        if (codePoint2 - 97 < 26) {
          return codePoint2 - 97;
        }
        return base;
      }
      function digitToBasic(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      }
      function adapt(delta, numPoints, firstTime) {
        var k2 = 0;
        delta = firstTime ? floor2(delta / damp) : delta >> 1;
        delta += floor2(delta / numPoints);
        for (; delta > baseMinusTMin * tMax >> 1; k2 += base) {
          delta = floor2(delta / baseMinusTMin);
        }
        return floor2(k2 + (baseMinusTMin + 1) * delta / (delta + skew));
      }
      function decode(input) {
        var output = [], inputLength = input.length, out, i3 = 0, n = initialN, bias = initialBias, basic, j2, index, oldi, w, k2, digit, t, baseMinusT;
        basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (j2 = 0; j2 < basic; ++j2) {
          if (input.charCodeAt(j2) >= 128) {
            error("not-basic");
          }
          output.push(input.charCodeAt(j2));
        }
        for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          for (oldi = i3, w = 1, k2 = base; ; k2 += base) {
            if (index >= inputLength) {
              error("invalid-input");
            }
            digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor2((maxInt - i3) / w)) {
              error("overflow");
            }
            i3 += digit * w;
            t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
            if (digit < t) {
              break;
            }
            baseMinusT = base - t;
            if (w > floor2(maxInt / baseMinusT)) {
              error("overflow");
            }
            w *= baseMinusT;
          }
          out = output.length + 1;
          bias = adapt(i3 - oldi, out, oldi == 0);
          if (floor2(i3 / out) > maxInt - n) {
            error("overflow");
          }
          n += floor2(i3 / out);
          i3 %= out;
          output.splice(i3++, 0, n);
        }
        return ucs2encode(output);
      }
      function encode(input) {
        var n, delta, handledCPCount, basicLength, bias, j2, m, q, k2, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
        input = ucs2decode(input);
        inputLength = input.length;
        n = initialN;
        delta = 0;
        bias = initialBias;
        for (j2 = 0; j2 < inputLength; ++j2) {
          currentValue = input[j2];
          if (currentValue < 128) {
            output.push(stringFromCharCode(currentValue));
          }
        }
        handledCPCount = basicLength = output.length;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          for (m = maxInt, j2 = 0; j2 < inputLength; ++j2) {
            currentValue = input[j2];
            if (currentValue >= n && currentValue < m) {
              m = currentValue;
            }
          }
          handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor2((maxInt - delta) / handledCPCountPlusOne)) {
            error("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          for (j2 = 0; j2 < inputLength; ++j2) {
            currentValue = input[j2];
            if (currentValue < n && ++delta > maxInt) {
              error("overflow");
            }
            if (currentValue == n) {
              for (q = delta, k2 = base; ; k2 += base) {
                t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
                if (q < t) {
                  break;
                }
                qMinusT = q - t;
                baseMinusT = base - t;
                output.push(
                  stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                );
                q = floor2(qMinusT / baseMinusT);
              }
              output.push(stringFromCharCode(digitToBasic(q, 0)));
              bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
              delta = 0;
              ++handledCPCount;
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      }
      function toUnicode(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      }
      function toASCII(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      }
      punycode2 = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "1.4.1",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define("punycode", function() {
          return punycode2;
        });
      } else if (freeExports && freeModule) {
        if (module.exports == freeExports) {
          freeModule.exports = punycode2;
        } else {
          for (key2 in punycode2) {
            punycode2.hasOwnProperty(key2) && (freeExports[key2] = punycode2[key2]);
          }
        }
      } else {
        root.punycode = punycode2;
      }
    })(exports);
  }
});

// node_modules/core-js/modules/es6.regexp.flags.js
var require_es6_regexp_flags = __commonJS({
  "node_modules/core-js/modules/es6.regexp.flags.js"() {
    if (require_descriptors() && /./g.flags != "g") require_object_dp().f(RegExp.prototype, "flags", {
      configurable: true,
      get: require_flags()
    });
  }
});

// node_modules/core-js/modules/_is-array.js
var require_is_array = __commonJS({
  "node_modules/core-js/modules/_is-array.js"(exports, module) {
    var cof = require_cof();
    module.exports = Array.isArray || function isArray2(arg) {
      return cof(arg) == "Array";
    };
  }
});

// node_modules/core-js/modules/_array-reduce.js
var require_array_reduce = __commonJS({
  "node_modules/core-js/modules/_array-reduce.js"(exports, module) {
    var aFunction2 = require_a_function();
    var toObject6 = require_to_object();
    var IObject = require_iobject();
    var toLength5 = require_to_length();
    module.exports = function(that, callbackfn, aLen, memo, isRight) {
      aFunction2(callbackfn);
      var O = toObject6(that);
      var self2 = IObject(O);
      var length = toLength5(O.length);
      var index = isRight ? length - 1 : 0;
      var i3 = isRight ? -1 : 1;
      if (aLen < 2) for (; ; ) {
        if (index in self2) {
          memo = self2[index];
          index += i3;
          break;
        }
        index += i3;
        if (isRight ? index < 0 : length <= index) {
          throw TypeError("Reduce of empty array with no initial value");
        }
      }
      for (; isRight ? index >= 0 : length > index; index += i3) if (index in self2) {
        memo = callbackfn(memo, self2[index], index, O);
      }
      return memo;
    };
  }
});

// node_modules/core-js/modules/_add-to-unscopables.js
var require_add_to_unscopables = __commonJS({
  "node_modules/core-js/modules/_add-to-unscopables.js"(exports, module) {
    var UNSCOPABLES = require_wks()("unscopables");
    var ArrayProto = Array.prototype;
    if (ArrayProto[UNSCOPABLES] == void 0) require_hide()(ArrayProto, UNSCOPABLES, {});
    module.exports = function(key2) {
      ArrayProto[UNSCOPABLES][key2] = true;
    };
  }
});

// node_modules/core-js/modules/_iter-step.js
var require_iter_step = __commonJS({
  "node_modules/core-js/modules/_iter-step.js"(exports, module) {
    module.exports = function(done, value) {
      return { value, done: !!done };
    };
  }
});

// node_modules/core-js/modules/_iterators.js
var require_iterators = __commonJS({
  "node_modules/core-js/modules/_iterators.js"(exports, module) {
    module.exports = {};
  }
});

// node_modules/core-js/modules/_object-keys.js
var require_object_keys = __commonJS({
  "node_modules/core-js/modules/_object-keys.js"(exports, module) {
    var $keys3 = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    module.exports = Object.keys || function keys2(O) {
      return $keys3(O, enumBugKeys);
    };
  }
});

// node_modules/core-js/modules/_object-dps.js
var require_object_dps = __commonJS({
  "node_modules/core-js/modules/_object-dps.js"(exports, module) {
    var dP3 = require_object_dp();
    var anObject6 = require_an_object();
    var getKeys2 = require_object_keys();
    module.exports = require_descriptors() ? Object.defineProperties : function defineProperties2(O, Properties) {
      anObject6(O);
      var keys2 = getKeys2(Properties);
      var length = keys2.length;
      var i3 = 0;
      var P;
      while (length > i3) dP3.f(O, P = keys2[i3++], Properties[P]);
      return O;
    };
  }
});

// node_modules/core-js/modules/_html.js
var require_html = __commonJS({
  "node_modules/core-js/modules/_html.js"(exports, module) {
    var document = require_global().document;
    module.exports = document && document.documentElement;
  }
});

// node_modules/core-js/modules/_object-create.js
var require_object_create = __commonJS({
  "node_modules/core-js/modules/_object-create.js"(exports, module) {
    var anObject6 = require_an_object();
    var dPs = require_object_dps();
    var enumBugKeys = require_enum_bug_keys();
    var IE_PROTO = require_shared_key()("IE_PROTO");
    var Empty = function() {
    };
    var PROTOTYPE2 = "prototype";
    var createDict = function() {
      var iframe = require_dom_create()("iframe");
      var i3 = enumBugKeys.length;
      var lt = "<";
      var gt = ">";
      var iframeDocument;
      iframe.style.display = "none";
      require_html().appendChild(iframe);
      iframe.src = "javascript:";
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
      iframeDocument.close();
      createDict = iframeDocument.F;
      while (i3--) delete createDict[PROTOTYPE2][enumBugKeys[i3]];
      return createDict();
    };
    module.exports = Object.create || function create2(O, Properties) {
      var result;
      if (O !== null) {
        Empty[PROTOTYPE2] = anObject6(O);
        result = new Empty();
        Empty[PROTOTYPE2] = null;
        result[IE_PROTO] = O;
      } else result = createDict();
      return Properties === void 0 ? result : dPs(result, Properties);
    };
  }
});

// node_modules/core-js/modules/_set-to-string-tag.js
var require_set_to_string_tag = __commonJS({
  "node_modules/core-js/modules/_set-to-string-tag.js"(exports, module) {
    var def = require_object_dp().f;
    var has2 = require_has();
    var TAG = require_wks()("toStringTag");
    module.exports = function(it, tag, stat) {
      if (it && !has2(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
    };
  }
});

// node_modules/core-js/modules/_iter-create.js
var require_iter_create = __commonJS({
  "node_modules/core-js/modules/_iter-create.js"(exports, module) {
    "use strict";
    var create2 = require_object_create();
    var descriptor = require_property_desc();
    var setToStringTag2 = require_set_to_string_tag();
    var IteratorPrototype = {};
    require_hide()(IteratorPrototype, require_wks()("iterator"), function() {
      return this;
    });
    module.exports = function(Constructor, NAME2, next) {
      Constructor.prototype = create2(IteratorPrototype, { next: descriptor(1, next) });
      setToStringTag2(Constructor, NAME2 + " Iterator");
    };
  }
});

// node_modules/core-js/modules/_object-gpo.js
var require_object_gpo = __commonJS({
  "node_modules/core-js/modules/_object-gpo.js"(exports, module) {
    var has2 = require_has();
    var toObject6 = require_to_object();
    var IE_PROTO = require_shared_key()("IE_PROTO");
    var ObjectProto2 = Object.prototype;
    module.exports = Object.getPrototypeOf || function(O) {
      O = toObject6(O);
      if (has2(O, IE_PROTO)) return O[IE_PROTO];
      if (typeof O.constructor == "function" && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto2 : null;
    };
  }
});

// node_modules/core-js/modules/_iter-define.js
var require_iter_define = __commonJS({
  "node_modules/core-js/modules/_iter-define.js"(exports, module) {
    "use strict";
    var LIBRARY = require_library();
    var $export12 = require_export();
    var redefine3 = require_redefine();
    var hide2 = require_hide();
    var Iterators2 = require_iterators();
    var $iterCreate = require_iter_create();
    var setToStringTag2 = require_set_to_string_tag();
    var getPrototypeOf = require_object_gpo();
    var ITERATOR2 = require_wks()("iterator");
    var BUGGY = !([].keys && "next" in [].keys());
    var FF_ITERATOR = "@@iterator";
    var KEYS = "keys";
    var VALUES = "values";
    var returnThis = function() {
      return this;
    };
    module.exports = function(Base2, NAME2, Constructor, next, DEFAULT, IS_SET, FORCED) {
      $iterCreate(Constructor, NAME2, next);
      var getMethod = function(kind) {
        if (!BUGGY && kind in proto3) return proto3[kind];
        switch (kind) {
          case KEYS:
            return function keys2() {
              return new Constructor(this, kind);
            };
          case VALUES:
            return function values() {
              return new Constructor(this, kind);
            };
        }
        return function entries() {
          return new Constructor(this, kind);
        };
      };
      var TAG = NAME2 + " Iterator";
      var DEF_VALUES = DEFAULT == VALUES;
      var VALUES_BUG = false;
      var proto3 = Base2.prototype;
      var $native2 = proto3[ITERATOR2] || proto3[FF_ITERATOR] || DEFAULT && proto3[DEFAULT];
      var $default = $native2 || getMethod(DEFAULT);
      var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : void 0;
      var $anyNative = NAME2 == "Array" ? proto3.entries || $native2 : $native2;
      var methods, key2, IteratorPrototype;
      if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base2()));
        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
          setToStringTag2(IteratorPrototype, TAG, true);
          if (!LIBRARY && typeof IteratorPrototype[ITERATOR2] != "function") hide2(IteratorPrototype, ITERATOR2, returnThis);
        }
      }
      if (DEF_VALUES && $native2 && $native2.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native2.call(this);
        };
      }
      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto3[ITERATOR2])) {
        hide2(proto3, ITERATOR2, $default);
      }
      Iterators2[NAME2] = $default;
      Iterators2[TAG] = returnThis;
      if (DEFAULT) {
        methods = {
          values: DEF_VALUES ? $default : getMethod(VALUES),
          keys: IS_SET ? $default : getMethod(KEYS),
          entries: $entries
        };
        if (FORCED) for (key2 in methods) {
          if (!(key2 in proto3)) redefine3(proto3, key2, methods[key2]);
        }
        else $export12($export12.P + $export12.F * (BUGGY || VALUES_BUG), NAME2, methods);
      }
      return methods;
    };
  }
});

// node_modules/core-js/modules/es6.array.iterator.js
var require_es6_array_iterator = __commonJS({
  "node_modules/core-js/modules/es6.array.iterator.js"(exports, module) {
    "use strict";
    var addToUnscopables = require_add_to_unscopables();
    var step = require_iter_step();
    var Iterators2 = require_iterators();
    var toIObject3 = require_to_iobject();
    module.exports = require_iter_define()(Array, "Array", function(iterated, kind) {
      this._t = toIObject3(iterated);
      this._i = 0;
      this._k = kind;
    }, function() {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;
      if (!O || index >= O.length) {
        this._t = void 0;
        return step(1);
      }
      if (kind == "keys") return step(0, index);
      if (kind == "values") return step(0, O[index]);
      return step(0, [index, O[index]]);
    }, "values");
    Iterators2.Arguments = Iterators2.Array;
    addToUnscopables("keys");
    addToUnscopables("values");
    addToUnscopables("entries");
  }
});

// node_modules/core-js/modules/_object-sap.js
var require_object_sap = __commonJS({
  "node_modules/core-js/modules/_object-sap.js"(exports, module) {
    var $export12 = require_export();
    var core = require_core();
    var fails3 = require_fails();
    module.exports = function(KEY, exec) {
      var fn = (core.Object || {})[KEY] || Object[KEY];
      var exp = {};
      exp[KEY] = exec(fn);
      $export12($export12.S + $export12.F * fails3(function() {
        fn(1);
      }), "Object", exp);
    };
  }
});

// node_modules/twemoji-parser/dist/lib/regex.js
var require_regex = __commonJS({
  "node_modules/twemoji-parser/dist/lib/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = /(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef9]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd70\udd73-\udd76\udd7a\udd7c-\udda2\uddb4\uddb7\uddc0-\uddc2\uddd0\uddde-\uddff]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
  }
});

// node_modules/twemoji-parser/dist/index.js
var require_dist = __commonJS({
  "node_modules/twemoji-parser/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TypeName = void 0;
    exports.parse = parse;
    exports.toCodePoints = toCodePoints;
    var _regex = require_regex();
    var _regex2 = _interopRequireDefault(_regex);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var TypeName = exports.TypeName = "emoji";
    function parse(text, options) {
      var assetType = options && options.assetType ? options.assetType : "svg";
      var getTwemojiUrl = options && options.buildUrl ? options.buildUrl : function(codepoints2, assetType2) {
        return assetType2 === "png" ? "https://twemoji.maxcdn.com/2/72x72/" + codepoints2 + ".png" : "https://twemoji.maxcdn.com/2/svg/" + codepoints2 + ".svg";
      };
      var entities = [];
      _regex2.default.lastIndex = 0;
      while (true) {
        var result = _regex2.default.exec(text);
        if (!result) {
          break;
        }
        var emojiText = result[0];
        var codepoints = toCodePoints(removeVS16s(emojiText)).join("-");
        entities.push({
          url: codepoints ? getTwemojiUrl(codepoints, assetType) : "",
          indices: [result.index, _regex2.default.lastIndex],
          text: emojiText,
          type: TypeName
        });
      }
      return entities;
    }
    var vs16RegExp = /\uFE0F/g;
    var zeroWidthJoiner = String.fromCharCode(8205);
    var removeVS16s = function removeVS16s2(rawEmoji) {
      return rawEmoji.indexOf(zeroWidthJoiner) < 0 ? rawEmoji.replace(vs16RegExp, "") : rawEmoji;
    };
    function toCodePoints(unicodeSurrogates) {
      var points = [];
      var char = 0;
      var previous = 0;
      var i3 = 0;
      while (i3 < unicodeSurrogates.length) {
        char = unicodeSurrogates.charCodeAt(i3++);
        if (previous) {
          points.push((65536 + (previous - 55296 << 10) + (char - 56320)).toString(16));
          previous = 0;
        } else if (char > 55296 && char <= 56319) {
          previous = char;
        } else {
          points.push(char.toString(16));
        }
      }
      return points;
    }
  }
});

// node_modules/core-js/modules/_object-gops.js
var require_object_gops = __commonJS({
  "node_modules/core-js/modules/_object-gops.js"(exports) {
    exports.f = Object.getOwnPropertySymbols;
  }
});

// node_modules/core-js/modules/_own-keys.js
var require_own_keys = __commonJS({
  "node_modules/core-js/modules/_own-keys.js"(exports, module) {
    var gOPN3 = require_object_gopn();
    var gOPS = require_object_gops();
    var anObject6 = require_an_object();
    var Reflect2 = require_global().Reflect;
    module.exports = Reflect2 && Reflect2.ownKeys || function ownKeys3(it) {
      var keys2 = gOPN3.f(anObject6(it));
      var getSymbols = gOPS.f;
      return getSymbols ? keys2.concat(getSymbols(it)) : keys2;
    };
  }
});

// node_modules/core-js/modules/_create-property.js
var require_create_property = __commonJS({
  "node_modules/core-js/modules/_create-property.js"(exports, module) {
    "use strict";
    var $defineProperty2 = require_object_dp();
    var createDesc2 = require_property_desc();
    module.exports = function(object, index, value) {
      if (index in object) $defineProperty2.f(object, index, createDesc2(0, value));
      else object[index] = value;
    };
  }
});

// node_modules/core-js/modules/_array-species-constructor.js
var require_array_species_constructor = __commonJS({
  "node_modules/core-js/modules/_array-species-constructor.js"(exports, module) {
    var isObject2 = require_is_object();
    var isArray2 = require_is_array();
    var SPECIES = require_wks()("species");
    module.exports = function(original) {
      var C;
      if (isArray2(original)) {
        C = original.constructor;
        if (typeof C == "function" && (C === Array || isArray2(C.prototype))) C = void 0;
        if (isObject2(C)) {
          C = C[SPECIES];
          if (C === null) C = void 0;
        }
      }
      return C === void 0 ? Array : C;
    };
  }
});

// node_modules/core-js/modules/_array-species-create.js
var require_array_species_create = __commonJS({
  "node_modules/core-js/modules/_array-species-create.js"(exports, module) {
    var speciesConstructor2 = require_array_species_constructor();
    module.exports = function(original, length) {
      return new (speciesConstructor2(original))(length);
    };
  }
});

// node_modules/core-js/modules/_array-methods.js
var require_array_methods = __commonJS({
  "node_modules/core-js/modules/_array-methods.js"(exports, module) {
    var ctx2 = require_ctx();
    var IObject = require_iobject();
    var toObject6 = require_to_object();
    var toLength5 = require_to_length();
    var asc = require_array_species_create();
    module.exports = function(TYPE, $create2) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      var create2 = $create2 || asc;
      return function($this, callbackfn, that) {
        var O = toObject6($this);
        var self2 = IObject(O);
        var f = ctx2(callbackfn, that, 3);
        var length = toLength5(self2.length);
        var index = 0;
        var result = IS_MAP ? create2($this, length) : IS_FILTER ? create2($this, 0) : void 0;
        var val, res;
        for (; length > index; index++) if (NO_HOLES || index in self2) {
          val = self2[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res;
            else if (res) switch (TYPE) {
              case 3:
                return true;
              // some
              case 5:
                return val;
              // find
              case 6:
                return index;
              // findIndex
              case 2:
                result.push(val);
            }
            else if (IS_EVERY) return false;
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
      };
    };
  }
});

// node_modules/core-js/modules/_meta.js
var require_meta = __commonJS({
  "node_modules/core-js/modules/_meta.js"(exports, module) {
    var META2 = require_uid()("meta");
    var isObject2 = require_is_object();
    var has2 = require_has();
    var setDesc = require_object_dp().f;
    var id = 0;
    var isExtensible = Object.isExtensible || function() {
      return true;
    };
    var FREEZE = !require_fails()(function() {
      return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function(it) {
      setDesc(it, META2, { value: {
        i: "O" + ++id,
        // object ID
        w: {}
        // weak collections IDs
      } });
    };
    var fastKey = function(it, create2) {
      if (!isObject2(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
      if (!has2(it, META2)) {
        if (!isExtensible(it)) return "F";
        if (!create2) return "E";
        setMeta(it);
      }
      return it[META2].i;
    };
    var getWeak = function(it, create2) {
      if (!has2(it, META2)) {
        if (!isExtensible(it)) return true;
        if (!create2) return false;
        setMeta(it);
      }
      return it[META2].w;
    };
    var onFreeze = function(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !has2(it, META2)) setMeta(it);
      return it;
    };
    var meta = module.exports = {
      KEY: META2,
      NEED: false,
      fastKey,
      getWeak,
      onFreeze
    };
  }
});

// node_modules/core-js/modules/_wks-ext.js
var require_wks_ext = __commonJS({
  "node_modules/core-js/modules/_wks-ext.js"(exports) {
    exports.f = require_wks();
  }
});

// node_modules/core-js/modules/_wks-define.js
var require_wks_define = __commonJS({
  "node_modules/core-js/modules/_wks-define.js"(exports, module) {
    var global5 = require_global();
    var core = require_core();
    var LIBRARY = require_library();
    var wksExt2 = require_wks_ext();
    var defineProperty2 = require_object_dp().f;
    module.exports = function(name) {
      var $Symbol2 = core.Symbol || (core.Symbol = LIBRARY ? {} : global5.Symbol || {});
      if (name.charAt(0) != "_" && !(name in $Symbol2)) defineProperty2($Symbol2, name, { value: wksExt2.f(name) });
    };
  }
});

// node_modules/core-js/modules/_enum-keys.js
var require_enum_keys = __commonJS({
  "node_modules/core-js/modules/_enum-keys.js"(exports, module) {
    var getKeys2 = require_object_keys();
    var gOPS = require_object_gops();
    var pIE = require_object_pie();
    module.exports = function(it) {
      var result = getKeys2(it);
      var getSymbols = gOPS.f;
      if (getSymbols) {
        var symbols = getSymbols(it);
        var isEnum2 = pIE.f;
        var i3 = 0;
        var key2;
        while (symbols.length > i3) if (isEnum2.call(it, key2 = symbols[i3++])) result.push(key2);
      }
      return result;
    };
  }
});

// node_modules/core-js/modules/_object-gopn-ext.js
var require_object_gopn_ext = __commonJS({
  "node_modules/core-js/modules/_object-gopn-ext.js"(exports, module) {
    var toIObject3 = require_to_iobject();
    var gOPN3 = require_object_gopn().f;
    var toString = {}.toString;
    var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    var getWindowNames = function(it) {
      try {
        return gOPN3(it);
      } catch (e) {
        return windowNames.slice();
      }
    };
    module.exports.f = function getOwnPropertyNames2(it) {
      return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : gOPN3(toIObject3(it));
    };
  }
});

// node_modules/core-js/modules/_iter-call.js
var require_iter_call = __commonJS({
  "node_modules/core-js/modules/_iter-call.js"(exports, module) {
    var anObject6 = require_an_object();
    module.exports = function(iterator, fn, value, entries) {
      try {
        return entries ? fn(anObject6(value)[0], value[1]) : fn(value);
      } catch (e) {
        var ret = iterator["return"];
        if (ret !== void 0) anObject6(ret.call(iterator));
        throw e;
      }
    };
  }
});

// node_modules/core-js/modules/_is-array-iter.js
var require_is_array_iter = __commonJS({
  "node_modules/core-js/modules/_is-array-iter.js"(exports, module) {
    var Iterators2 = require_iterators();
    var ITERATOR2 = require_wks()("iterator");
    var ArrayProto = Array.prototype;
    module.exports = function(it) {
      return it !== void 0 && (Iterators2.Array === it || ArrayProto[ITERATOR2] === it);
    };
  }
});

// node_modules/core-js/modules/core.get-iterator-method.js
var require_core_get_iterator_method = __commonJS({
  "node_modules/core-js/modules/core.get-iterator-method.js"(exports, module) {
    var classof2 = require_classof();
    var ITERATOR2 = require_wks()("iterator");
    var Iterators2 = require_iterators();
    module.exports = require_core().getIteratorMethod = function(it) {
      if (it != void 0) return it[ITERATOR2] || it["@@iterator"] || Iterators2[classof2(it)];
    };
  }
});

// node_modules/core-js/modules/_iter-detect.js
var require_iter_detect = __commonJS({
  "node_modules/core-js/modules/_iter-detect.js"(exports, module) {
    var ITERATOR2 = require_wks()("iterator");
    var SAFE_CLOSING = false;
    try {
      riter = [7][ITERATOR2]();
      riter["return"] = function() {
        SAFE_CLOSING = true;
      };
      Array.from(riter, function() {
        throw 2;
      });
    } catch (e) {
    }
    var riter;
    module.exports = function(exec, skipClosing) {
      if (!skipClosing && !SAFE_CLOSING) return false;
      var safe = false;
      try {
        var arr = [7];
        var iter = arr[ITERATOR2]();
        iter.next = function() {
          return { done: safe = true };
        };
        arr[ITERATOR2] = function() {
          return iter;
        };
        exec(arr);
      } catch (e) {
      }
      return safe;
    };
  }
});

// node_modules/core-js/modules/es6.regexp.replace.js
var anObject = require_an_object();
var toObject = require_to_object();
var toLength = require_to_length();
var toInteger = require_to_integer();
var advanceStringIndex = require_advance_string_index();
var regExpExec = require_regexp_exec_abstract();
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;
var maybeToString = function(it) {
  return it === void 0 ? it : String(it);
};
require_fix_re_wks()("replace", 2, function(defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == void 0 ? void 0 : searchValue[REPLACE];
      return fn !== void 0 ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function(regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === "function";
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global5 = rx.global;
      if (global5) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global5) break;
        var matchStr = String(result[0]);
        if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = "";
      var nextSourcePosition = 0;
      for (var i3 = 0; i3 < results.length; i3++) {
        result = results[i3];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        for (var j2 = 1; j2 < result.length; j2++) captures.push(maybeToString(result[j2]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== void 0) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(void 0, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== void 0) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function(match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case "$":
          return "$";
        case "&":
          return matched;
        case "`":
          return str.slice(0, position);
        case "'":
          return str.slice(tailPos);
        case "<":
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default:
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === void 0 ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === void 0 ? "" : capture;
    });
  }
});

// node_modules/core-js/modules/es6.array.index-of.js
var $export = require_export();
var $indexOf = require_array_includes()(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
$export($export.P + $export.F * (NEGATIVE_ZERO || !require_strict_method()($native)), "Array", {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement) {
    return NEGATIVE_ZERO ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

// node_modules/twitter-text/dist/esm/regexp/cashtag.js
var cashtag = /[a-z]{1,6}(?:[._][a-z]{1,2})?/i;
var cashtag_default = cashtag;

// node_modules/twitter-text/dist/esm/regexp/punct.js
var punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/;
var punct_default = punct;

// node_modules/core-js/modules/es6.regexp.constructor.js
var global2 = require_global();
var inheritIfRequired = require_inherit_if_required();
var dP = require_object_dp().f;
var gOPN = require_object_gopn().f;
var isRegExp = require_is_regexp();
var $flags = require_flags();
var $RegExp = global2.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
var CORRECT_NEW = new $RegExp(re1) !== re1;
if (require_descriptors() && (!CORRECT_NEW || require_fails()(function() {
  re2[require_wks()("match")] = false;
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, "i") != "/a/i";
}))) {
  $RegExp = function RegExp2(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === void 0;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(
      CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f),
      tiRE ? this : proto,
      $RegExp
    );
  };
  proxy = function(key2) {
    key2 in $RegExp || dP($RegExp, key2, {
      configurable: true,
      get: function() {
        return Base[key2];
      },
      set: function(it) {
        Base[key2] = it;
      }
    });
  };
  for (keys = gOPN(Base), i = 0; keys.length > i; ) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require_redefine()(global2, "RegExp", $RegExp);
}
var proxy;
var keys;
var i;
require_set_species()("RegExp");

// node_modules/twitter-text/dist/esm/lib/regexSupplant.js
function regexSupplant_default(regex, map, flags) {
  flags = flags || "";
  if (typeof regex !== "string") {
    if (regex.global && flags.indexOf("g") < 0) {
      flags += "g";
    }
    if (regex.ignoreCase && flags.indexOf("i") < 0) {
      flags += "i";
    }
    if (regex.multiline && flags.indexOf("m") < 0) {
      flags += "m";
    }
    regex = regex.source;
  }
  return new RegExp(regex.replace(/#\{(\w+)\}/g, function(match, name) {
    var newRegex = map[name] || "";
    if (typeof newRegex !== "string") {
      newRegex = newRegex.source;
    }
    return newRegex;
  }), flags);
}

// node_modules/twitter-text/dist/esm/regexp/spacesGroup.js
var spacesGroup = /\x09-\x0D\x20\x85\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000/;
var spacesGroup_default = spacesGroup;

// node_modules/twitter-text/dist/esm/regexp/spaces.js
var spaces_default = regexSupplant_default(/[#{spacesGroup}]/, {
  spacesGroup: spacesGroup_default
});

// node_modules/twitter-text/dist/esm/regexp/validCashtag.js
var validCashtag = regexSupplant_default("(^|#{spaces})(\\$)(#{cashtag})(?=$|\\s|[#{punct}])", {
  cashtag: cashtag_default,
  spaces: spaces_default,
  punct: punct_default
}, "gi");
var validCashtag_default = validCashtag;

// node_modules/twitter-text/dist/esm/extractCashtagsWithIndices.js
function extractCashtagsWithIndices_default(text) {
  if (!text || text.indexOf("$") === -1) {
    return [];
  }
  var tags = [];
  text.replace(validCashtag_default, function(match, before, dollar, cashtag2, offset, chunk) {
    var startPosition = offset + before.length;
    var endPosition = startPosition + cashtag2.length + 1;
    tags.push({
      cashtag: cashtag2,
      indices: [startPosition, endPosition]
    });
  });
  return tags;
}

// node_modules/core-js/modules/es6.regexp.match.js
var anObject2 = require_an_object();
var toLength2 = require_to_length();
var advanceStringIndex2 = require_advance_string_index();
var regExpExec2 = require_regexp_exec_abstract();
require_fix_re_wks()("match", 1, function(defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == void 0 ? void 0 : regexp[MATCH];
      return fn !== void 0 ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function(regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject2(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec2(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec2(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === "") rx.lastIndex = advanceStringIndex2(S, toLength2(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

// node_modules/twitter-text/dist/esm/regexp/hashSigns.js
var hashSigns = /[#＃]/;
var hashSigns_default = hashSigns;

// node_modules/twitter-text/dist/esm/regexp/endHashtagMatch.js
var endHashtagMatch = regexSupplant_default(/^(?:#{hashSigns}|:\/\/)/, {
  hashSigns: hashSigns_default
});
var endHashtagMatch_default = endHashtagMatch;

// node_modules/twitter-text/dist/esm/regexp/validCCTLD.js
var validCCTLD = regexSupplant_default(RegExp("(?:(?:\uD55C\uAD6D|\u9999\u6E2F|\u6FB3\u9580|\u65B0\u52A0\u5761|\u53F0\u7063|\u53F0\u6E7E|\u4E2D\u570B|\u4E2D\u56FD|\u10D2\u10D4|\u0EA5\u0EB2\u0EA7|\u0E44\u0E17\u0E22|\u0DBD\u0D82\u0D9A\u0DCF|\u0D2D\u0D3E\u0D30\u0D24\u0D02|\u0CAD\u0CBE\u0CB0\u0CA4|\u0C2D\u0C3E\u0C30\u0C24\u0C4D|\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD|\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8|\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE|\u0B2D\u0B3E\u0B30\u0B24|\u0AAD\u0ABE\u0AB0\u0AA4|\u0A2D\u0A3E\u0A30\u0A24|\u09AD\u09BE\u09F0\u09A4|\u09AD\u09BE\u09B0\u09A4|\u09AC\u09BE\u0982\u09B2\u09BE|\u092D\u093E\u0930\u094B\u0924|\u092D\u093E\u0930\u0924\u092E\u094D|\u092D\u093E\u0930\u0924|\u0680\u0627\u0631\u062A|\u067E\u0627\u06A9\u0633\u062A\u0627\u0646|\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627|\u0645\u0644\u064A\u0633\u064A\u0627|\u0645\u0635\u0631|\u0642\u0637\u0631|\u0641\u0644\u0633\u0637\u064A\u0646|\u0639\u0645\u0627\u0646|\u0639\u0631\u0627\u0642|\u0633\u0648\u0631\u064A\u0629|\u0633\u0648\u062F\u0627\u0646|\u062A\u0648\u0646\u0633|\u0628\u06BE\u0627\u0631\u062A|\u0628\u0627\u0631\u062A|\u0627\u06CC\u0631\u0627\u0646|\u0627\u0645\u0627\u0631\u0627\u062A|\u0627\u0644\u0645\u063A\u0631\u0628|\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629|\u0627\u0644\u062C\u0632\u0627\u0626\u0631|\u0627\u0644\u0628\u062D\u0631\u064A\u0646|\u0627\u0644\u0627\u0631\u062F\u0646|\u0570\u0561\u0575|\u049B\u0430\u0437|\u0443\u043A\u0440|\u0441\u0440\u0431|\u0440\u0444|\u043C\u043E\u043D|\u043C\u043A\u0434|\u0435\u044E|\u0431\u0435\u043B|\u0431\u0433|\u03B5\u03C5|\u03B5\u03BB|zw|zm|za|yt|ye|ws|wf|vu|vn|vi|vg|ve|vc|va|uz|uy|us|um|uk|ug|ua|tz|tw|tv|tt|tr|tp|to|tn|tm|tl|tk|tj|th|tg|tf|td|tc|sz|sy|sx|sv|su|st|ss|sr|so|sn|sm|sl|sk|sj|si|sh|sg|se|sd|sc|sb|sa|rw|ru|rs|ro|re|qa|py|pw|pt|ps|pr|pn|pm|pl|pk|ph|pg|pf|pe|pa|om|nz|nu|nr|np|no|nl|ni|ng|nf|ne|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|mn|mm|ml|mk|mh|mg|mf|me|md|mc|ma|ly|lv|lu|lt|ls|lr|lk|li|lc|lb|la|kz|ky|kw|kr|kp|kn|km|ki|kh|kg|ke|jp|jo|jm|je|it|is|ir|iq|io|in|im|il|ie|id|hu|ht|hr|hn|hm|hk|gy|gw|gu|gt|gs|gr|gq|gp|gn|gm|gl|gi|gh|gg|gf|ge|gd|gb|ga|fr|fo|fm|fk|fj|fi|eu|et|es|er|eh|eg|ee|ec|dz|do|dm|dk|dj|de|cz|cy|cx|cw|cv|cu|cr|co|cn|cm|cl|ck|ci|ch|cg|cf|cd|cc|ca|bz|by|bw|bv|bt|bs|br|bq|bo|bn|bm|bl|bj|bi|bh|bg|bf|be|bd|bb|ba|az|ax|aw|au|at|as|ar|aq|ao|an|am|al|ai|ag|af|ae|ad|ac)(?=[^0-9a-zA-Z@+-]|$))"));
var validCCTLD_default = validCCTLD;

// node_modules/twitter-text/dist/esm/regexp/directionalMarkersGroup.js
var directionalMarkersGroup = /\u202A-\u202E\u061C\u200E\u200F\u2066\u2067\u2068\u2069/;
var directionalMarkersGroup_default = directionalMarkersGroup;

// node_modules/twitter-text/dist/esm/regexp/invalidCharsGroup.js
var invalidCharsGroup = /\uFFFE\uFEFF\uFFFF/;
var invalidCharsGroup_default = invalidCharsGroup;

// node_modules/twitter-text/dist/esm/lib/stringSupplant.js
function stringSupplant_default(str, map) {
  return str.replace(/#\{(\w+)\}/g, function(match, name) {
    return map[name] || "";
  });
}

// node_modules/twitter-text/dist/esm/regexp/invalidDomainChars.js
var invalidDomainChars = stringSupplant_default("#{punct}#{spacesGroup}#{invalidCharsGroup}#{directionalMarkersGroup}", {
  punct: punct_default,
  spacesGroup: spacesGroup_default,
  invalidCharsGroup: invalidCharsGroup_default,
  directionalMarkersGroup: directionalMarkersGroup_default
});
var invalidDomainChars_default = invalidDomainChars;

// node_modules/twitter-text/dist/esm/regexp/validDomainChars.js
var validDomainChars = regexSupplant_default(/[^#{invalidDomainChars}]/, {
  invalidDomainChars: invalidDomainChars_default
});
var validDomainChars_default = validDomainChars;

// node_modules/twitter-text/dist/esm/regexp/validDomainName.js
var validDomainName = regexSupplant_default(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/, {
  validDomainChars: validDomainChars_default
});
var validDomainName_default = validDomainName;

// node_modules/twitter-text/dist/esm/regexp/validGTLD.js
var validGTLD = regexSupplant_default(RegExp("(?:(?:\uC0BC\uC131|\uB2F7\uCEF4|\uB2F7\uB137|\u9999\u683C\u91CC\u62C9|\u9910\u5385|\u98DF\u54C1|\u98DE\u5229\u6D66|\u96FB\u8A0A\u76C8\u79D1|\u96C6\u56E2|\u901A\u8CA9|\u8D2D\u7269|\u8C37\u6B4C|\u8BFA\u57FA\u4E9A|\u8054\u901A|\u7F51\u7EDC|\u7F51\u7AD9|\u7F51\u5E97|\u7F51\u5740|\u7EC4\u7EC7\u673A\u6784|\u79FB\u52A8|\u73E0\u5B9D|\u70B9\u770B|\u6E38\u620F|\u6DE1\u9A6C\u9521|\u673A\u6784|\u66F8\u7C4D|\u65F6\u5C1A|\u65B0\u95FB|\u653F\u5E9C|\u653F\u52A1|\u62DB\u8058|\u624B\u8868|\u624B\u673A|\u6211\u7231\u4F60|\u6148\u5584|\u5FAE\u535A|\u5E7F\u4E1C|\u5DE5\u884C|\u5BB6\u96FB|\u5A31\u4E50|\u5929\u4E3B\u6559|\u5927\u62FF|\u5927\u4F17\u6C7D\u8F66|\u5728\u7EBF|\u5609\u91CC\u5927\u9152\u5E97|\u5609\u91CC|\u5546\u6807|\u5546\u5E97|\u5546\u57CE|\u516C\u76CA|\u516C\u53F8|\u516B\u5366|\u5065\u5EB7|\u4FE1\u606F|\u4F5B\u5C71|\u4F01\u4E1A|\u4E2D\u6587\u7F51|\u4E2D\u4FE1|\u4E16\u754C|\u30DD\u30A4\u30F3\u30C8|\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3|\u30BB\u30FC\u30EB|\u30B9\u30C8\u30A2|\u30B3\u30E0|\u30B0\u30FC\u30B0\u30EB|\u30AF\u30E9\u30A6\u30C9|\u307F\u3093\u306A|\u0E04\u0E2D\u0E21|\u0938\u0902\u0917\u0920\u0928|\u0928\u0947\u091F|\u0915\u0949\u092E|\u0647\u0645\u0631\u0627\u0647|\u0645\u0648\u0642\u0639|\u0645\u0648\u0628\u0627\u064A\u0644\u064A|\u0643\u0648\u0645|\u0643\u0627\u062B\u0648\u0644\u064A\u0643|\u0639\u0631\u0628|\u0634\u0628\u0643\u0629|\u0628\u064A\u062A\u0643|\u0628\u0627\u0632\u0627\u0631|\u0627\u0644\u0639\u0644\u064A\u0627\u0646|\u0627\u0631\u0627\u0645\u0643\u0648|\u0627\u062A\u0635\u0627\u0644\u0627\u062A|\u0627\u0628\u0648\u0638\u0628\u064A|\u05E7\u05D5\u05DD|\u0441\u0430\u0439\u0442|\u0440\u0443\u0441|\u043E\u0440\u0433|\u043E\u043D\u043B\u0430\u0439\u043D|\u043C\u043E\u0441\u043A\u0432\u0430|\u043A\u043E\u043C|\u043A\u0430\u0442\u043E\u043B\u0438\u043A|\u0434\u0435\u0442\u0438|zuerich|zone|zippo|zip|zero|zara|zappos|yun|youtube|you|yokohama|yoga|yodobashi|yandex|yamaxun|yahoo|yachts|xyz|xxx|xperia|xin|xihuan|xfinity|xerox|xbox|wtf|wtc|wow|world|works|work|woodside|wolterskluwer|wme|winners|wine|windows|win|williamhill|wiki|wien|whoswho|weir|weibo|wedding|wed|website|weber|webcam|weatherchannel|weather|watches|watch|warman|wanggou|wang|walter|walmart|wales|vuelos|voyage|voto|voting|vote|volvo|volkswagen|vodka|vlaanderen|vivo|viva|vistaprint|vista|vision|visa|virgin|vip|vin|villas|viking|vig|video|viajes|vet|versicherung|verm\xF6gensberatung|verm\xF6gensberater|verisign|ventures|vegas|vanguard|vana|vacations|ups|uol|uno|university|unicom|uconnect|ubs|ubank|tvs|tushu|tunes|tui|tube|trv|trust|travelersinsurance|travelers|travelchannel|travel|training|trading|trade|toys|toyota|town|tours|total|toshiba|toray|top|tools|tokyo|today|tmall|tkmaxx|tjx|tjmaxx|tirol|tires|tips|tiffany|tienda|tickets|tiaa|theatre|theater|thd|teva|tennis|temasek|telefonica|telecity|tel|technology|tech|team|tdk|tci|taxi|tax|tattoo|tatar|tatamotors|target|taobao|talk|taipei|tab|systems|symantec|sydney|swiss|swiftcover|swatch|suzuki|surgery|surf|support|supply|supplies|sucks|style|study|studio|stream|store|storage|stockholm|stcgroup|stc|statoil|statefarm|statebank|starhub|star|staples|stada|srt|srl|spreadbetting|spot|sport|spiegel|space|soy|sony|song|solutions|solar|sohu|software|softbank|social|soccer|sncf|smile|smart|sling|skype|sky|skin|ski|site|singles|sina|silk|shriram|showtime|show|shouji|shopping|shop|shoes|shiksha|shia|shell|shaw|sharp|shangrila|sfr|sexy|sex|sew|seven|ses|services|sener|select|seek|security|secure|seat|search|scot|scor|scjohnson|science|schwarz|schule|school|scholarships|schmidt|schaeffler|scb|sca|sbs|sbi|saxo|save|sas|sarl|sapo|sap|sanofi|sandvikcoromant|sandvik|samsung|samsclub|salon|sale|sakura|safety|safe|saarland|ryukyu|rwe|run|ruhr|rugby|rsvp|room|rogers|rodeo|rocks|rocher|rmit|rip|rio|ril|rightathome|ricoh|richardli|rich|rexroth|reviews|review|restaurant|rest|republican|report|repair|rentals|rent|ren|reliance|reit|reisen|reise|rehab|redumbrella|redstone|red|recipes|realty|realtor|realestate|read|raid|radio|racing|qvc|quest|quebec|qpon|pwc|pub|prudential|pru|protection|property|properties|promo|progressive|prof|productions|prod|pro|prime|press|praxi|pramerica|post|porn|politie|poker|pohl|pnc|plus|plumbing|playstation|play|place|pizza|pioneer|pink|ping|pin|pid|pictures|pictet|pics|piaget|physio|photos|photography|photo|phone|philips|phd|pharmacy|pfizer|pet|pccw|pay|passagens|party|parts|partners|pars|paris|panerai|panasonic|pamperedchef|page|ovh|ott|otsuka|osaka|origins|orientexpress|organic|org|orange|oracle|open|ooo|onyourside|online|onl|ong|one|omega|ollo|oldnavy|olayangroup|olayan|okinawa|office|off|observer|obi|nyc|ntt|nrw|nra|nowtv|nowruz|now|norton|northwesternmutual|nokia|nissay|nissan|ninja|nikon|nike|nico|nhk|ngo|nfl|nexus|nextdirect|next|news|newholland|new|neustar|network|netflix|netbank|net|nec|nba|navy|natura|nationwide|name|nagoya|nadex|nab|mutuelle|mutual|museum|mtr|mtpc|mtn|msd|movistar|movie|mov|motorcycles|moto|moscow|mortgage|mormon|mopar|montblanc|monster|money|monash|mom|moi|moe|moda|mobily|mobile|mobi|mma|mls|mlb|mitsubishi|mit|mint|mini|mil|microsoft|miami|metlife|merckmsd|meo|menu|men|memorial|meme|melbourne|meet|media|med|mckinsey|mcdonalds|mcd|mba|mattel|maserati|marshalls|marriott|markets|marketing|market|map|mango|management|man|makeup|maison|maif|madrid|macys|luxury|luxe|lupin|lundbeck|ltda|ltd|lplfinancial|lpl|love|lotto|lotte|london|lol|loft|locus|locker|loans|loan|llp|llc|lixil|living|live|lipsy|link|linde|lincoln|limo|limited|lilly|like|lighting|lifestyle|lifeinsurance|life|lidl|liaison|lgbt|lexus|lego|legal|lefrak|leclerc|lease|lds|lawyer|law|latrobe|latino|lat|lasalle|lanxess|landrover|land|lancome|lancia|lancaster|lamer|lamborghini|ladbrokes|lacaixa|kyoto|kuokgroup|kred|krd|kpn|kpmg|kosher|komatsu|koeln|kiwi|kitchen|kindle|kinder|kim|kia|kfh|kerryproperties|kerrylogistics|kerryhotels|kddi|kaufen|juniper|juegos|jprs|jpmorgan|joy|jot|joburg|jobs|jnj|jmp|jll|jlc|jio|jewelry|jetzt|jeep|jcp|jcb|java|jaguar|iwc|iveco|itv|itau|istanbul|ist|ismaili|iselect|irish|ipiranga|investments|intuit|international|intel|int|insure|insurance|institute|ink|ing|info|infiniti|industries|inc|immobilien|immo|imdb|imamat|ikano|iinet|ifm|ieee|icu|ice|icbc|ibm|hyundai|hyatt|hughes|htc|hsbc|how|house|hotmail|hotels|hoteles|hot|hosting|host|hospital|horse|honeywell|honda|homesense|homes|homegoods|homedepot|holiday|holdings|hockey|hkt|hiv|hitachi|hisamitsu|hiphop|hgtv|hermes|here|helsinki|help|healthcare|health|hdfcbank|hdfc|hbo|haus|hangout|hamburg|hair|guru|guitars|guide|guge|gucci|guardian|group|grocery|gripe|green|gratis|graphics|grainger|gov|got|gop|google|goog|goodyear|goodhands|goo|golf|goldpoint|gold|godaddy|gmx|gmo|gmbh|gmail|globo|global|gle|glass|glade|giving|gives|gifts|gift|ggee|george|genting|gent|gea|gdn|gbiz|gay|garden|gap|games|game|gallup|gallo|gallery|gal|fyi|futbol|furniture|fund|fun|fujixerox|fujitsu|ftr|frontier|frontdoor|frogans|frl|fresenius|free|fox|foundation|forum|forsale|forex|ford|football|foodnetwork|food|foo|fly|flsmidth|flowers|florist|flir|flights|flickr|fitness|fit|fishing|fish|firmdale|firestone|fire|financial|finance|final|film|fido|fidelity|fiat|ferrero|ferrari|feedback|fedex|fast|fashion|farmers|farm|fans|fan|family|faith|fairwinds|fail|fage|extraspace|express|exposed|expert|exchange|everbank|events|eus|eurovision|etisalat|esurance|estate|esq|erni|ericsson|equipment|epson|epost|enterprises|engineering|engineer|energy|emerck|email|education|edu|edeka|eco|eat|earth|dvr|dvag|durban|dupont|duns|dunlop|duck|dubai|dtv|drive|download|dot|doosan|domains|doha|dog|dodge|doctor|docs|dnp|diy|dish|discover|discount|directory|direct|digital|diet|diamonds|dhl|dev|design|desi|dentist|dental|democrat|delta|deloitte|dell|delivery|degree|deals|dealer|deal|dds|dclk|day|datsun|dating|date|data|dance|dad|dabur|cyou|cymru|cuisinella|csc|cruises|cruise|crs|crown|cricket|creditunion|creditcard|credit|cpa|courses|coupons|coupon|country|corsica|coop|cool|cookingchannel|cooking|contractors|contact|consulting|construction|condos|comsec|computer|compare|company|community|commbank|comcast|com|cologne|college|coffee|codes|coach|clubmed|club|cloud|clothing|clinique|clinic|click|cleaning|claims|cityeats|city|citic|citi|citadel|cisco|circle|cipriani|church|chrysler|chrome|christmas|chloe|chintai|cheap|chat|chase|charity|channel|chanel|cfd|cfa|cern|ceo|center|ceb|cbs|cbre|cbn|cba|catholic|catering|cat|casino|cash|caseih|case|casa|cartier|cars|careers|career|care|cards|caravan|car|capitalone|capital|capetown|canon|cancerresearch|camp|camera|cam|calvinklein|call|cal|cafe|cab|bzh|buzz|buy|business|builders|build|bugatti|budapest|brussels|brother|broker|broadway|bridgestone|bradesco|box|boutique|bot|boston|bostik|bosch|boots|booking|book|boo|bond|bom|bofa|boehringer|boats|bnpparibas|bnl|bmw|bms|blue|bloomberg|blog|blockbuster|blanco|blackfriday|black|biz|bio|bingo|bing|bike|bid|bible|bharti|bet|bestbuy|best|berlin|bentley|beer|beauty|beats|bcn|bcg|bbva|bbt|bbc|bayern|bauhaus|basketball|baseball|bargains|barefoot|barclays|barclaycard|barcelona|bar|bank|band|bananarepublic|banamex|baidu|baby|azure|axa|aws|avianca|autos|auto|author|auspost|audio|audible|audi|auction|attorney|athleta|associates|asia|asda|arte|art|arpa|army|archi|aramco|arab|aquarelle|apple|app|apartments|aol|anz|anquan|android|analytics|amsterdam|amica|amfam|amex|americanfamily|americanexpress|alstom|alsace|ally|allstate|allfinanz|alipay|alibaba|alfaromeo|akdn|airtel|airforce|airbus|aigo|aig|agency|agakhan|africa|afl|afamilycompany|aetna|aero|aeg|adult|ads|adac|actor|active|aco|accountants|accountant|accenture|academy|abudhabi|abogado|able|abc|abbvie|abbott|abb|abarth|aarp|aaa|onion)(?=[^0-9a-zA-Z@+-]|$))"));
var validGTLD_default = validGTLD;

// node_modules/twitter-text/dist/esm/regexp/validPunycode.js
var validPunycode = /(?:xn--[\-0-9a-z]+)/;
var validPunycode_default = validPunycode;

// node_modules/twitter-text/dist/esm/regexp/validSubdomain.js
var validSubdomain = regexSupplant_default(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/, {
  validDomainChars: validDomainChars_default
});
var validSubdomain_default = validSubdomain;

// node_modules/twitter-text/dist/esm/regexp/validDomain.js
var validDomain = regexSupplant_default(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/, {
  validDomainName: validDomainName_default,
  validSubdomain: validSubdomain_default,
  validGTLD: validGTLD_default,
  validCCTLD: validCCTLD_default,
  validPunycode: validPunycode_default
});
var validDomain_default = validDomain;

// node_modules/twitter-text/dist/esm/regexp/validPortNumber.js
var validPortNumber = /[0-9]+/;
var validPortNumber_default = validPortNumber;

// node_modules/twitter-text/dist/esm/regexp/cyrillicLettersAndMarks.js
var cyrillicLettersAndMarks = /\u0400-\u04FF/;
var cyrillicLettersAndMarks_default = cyrillicLettersAndMarks;

// node_modules/twitter-text/dist/esm/regexp/latinAccentChars.js
var latinAccentChars = /\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0100-\u024F\u0253\u0254\u0256\u0257\u0259\u025B\u0263\u0268\u026F\u0272\u0289\u028B\u02BB\u0300-\u036F\u1E00-\u1EFF/;
var latinAccentChars_default = latinAccentChars;

// node_modules/twitter-text/dist/esm/regexp/validGeneralUrlPathChars.js
var validGeneralUrlPathChars = regexSupplant_default(/[a-z#{cyrillicLettersAndMarks}0-9!\*';:=\+,\.\$\/%#\[\]\-\u2013_~@\|&#{latinAccentChars}]/i, {
  cyrillicLettersAndMarks: cyrillicLettersAndMarks_default,
  latinAccentChars: latinAccentChars_default
});
var validGeneralUrlPathChars_default = validGeneralUrlPathChars;

// node_modules/twitter-text/dist/esm/regexp/validUrlBalancedParens.js
var validUrlBalancedParens = regexSupplant_default("\\((?:#{validGeneralUrlPathChars}+|(?:#{validGeneralUrlPathChars}*\\(#{validGeneralUrlPathChars}+\\)#{validGeneralUrlPathChars}*))\\)", {
  validGeneralUrlPathChars: validGeneralUrlPathChars_default
}, "i");
var validUrlBalancedParens_default = validUrlBalancedParens;

// node_modules/twitter-text/dist/esm/regexp/validUrlPathEndingChars.js
var validUrlPathEndingChars = regexSupplant_default(/[\+\-a-z#{cyrillicLettersAndMarks}0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i, {
  cyrillicLettersAndMarks: cyrillicLettersAndMarks_default,
  latinAccentChars: latinAccentChars_default,
  validUrlBalancedParens: validUrlBalancedParens_default
});
var validUrlPathEndingChars_default = validUrlPathEndingChars;

// node_modules/twitter-text/dist/esm/regexp/validUrlPath.js
var validUrlPath = regexSupplant_default("(?:(?:#{validGeneralUrlPathChars}*(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*#{validUrlPathEndingChars})|(?:@#{validGeneralUrlPathChars}+/))", {
  validGeneralUrlPathChars: validGeneralUrlPathChars_default,
  validUrlBalancedParens: validUrlBalancedParens_default,
  validUrlPathEndingChars: validUrlPathEndingChars_default
}, "i");
var validUrlPath_default = validUrlPath;

// node_modules/twitter-text/dist/esm/regexp/validUrlPrecedingChars.js
var validUrlPrecedingChars = regexSupplant_default(/(?:[^A-Za-z0-9@＠$#＃#{invalidCharsGroup}]|[#{directionalMarkersGroup}]|^)/, {
  invalidCharsGroup: invalidCharsGroup_default,
  directionalMarkersGroup: directionalMarkersGroup_default
});
var validUrlPrecedingChars_default = validUrlPrecedingChars;

// node_modules/twitter-text/dist/esm/regexp/validUrlQueryChars.js
var validUrlQueryChars = /[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i;
var validUrlQueryChars_default = validUrlQueryChars;

// node_modules/twitter-text/dist/esm/regexp/validUrlQueryEndingChars.js
var validUrlQueryEndingChars = /[a-z0-9\-_&=#\/]/i;
var validUrlQueryEndingChars_default = validUrlQueryEndingChars;

// node_modules/twitter-text/dist/esm/regexp/extractUrl.js
var extractUrl = regexSupplant_default("((#{validUrlPrecedingChars})((https?:\\/\\/)?(#{validDomain})(?::(#{validPortNumber}))?(\\/#{validUrlPath}*)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?))", {
  validUrlPrecedingChars: validUrlPrecedingChars_default,
  validDomain: validDomain_default,
  validPortNumber: validPortNumber_default,
  validUrlPath: validUrlPath_default,
  validUrlQueryChars: validUrlQueryChars_default,
  validUrlQueryEndingChars: validUrlQueryEndingChars_default
}, "gi");
var extractUrl_default = extractUrl;

// node_modules/twitter-text/dist/esm/regexp/invalidUrlWithoutProtocolPrecedingChars.js
var invalidUrlWithoutProtocolPrecedingChars = /[-_.\/]$/;
var invalidUrlWithoutProtocolPrecedingChars_default = invalidUrlWithoutProtocolPrecedingChars;

// node_modules/core-js/modules/es6.regexp.split.js
var isRegExp2 = require_is_regexp();
var anObject3 = require_an_object();
var speciesConstructor = require_species_constructor();
var advanceStringIndex3 = require_advance_string_index();
var toLength3 = require_to_length();
var callRegExpExec = require_regexp_exec_abstract();
var regexpExec = require_regexp_exec();
var fails = require_fails();
var $min = Math.min;
var $push = [].push;
var $SPLIT = "split";
var LENGTH = "length";
var LAST_INDEX = "lastIndex";
var MAX_UINT32 = 4294967295;
var SUPPORTS_Y = !fails(function() {
  RegExp(MAX_UINT32, "y");
});
require_fix_re_wks()("split", 2, function(defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if ("abbc"[$SPLIT](/(b)*/)[1] == "c" || "test"[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || "ab"[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || "."[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || "."[$SPLIT](/()()/)[LENGTH] > 1 || ""[$SPLIT](/.?/)[LENGTH]) {
    internalSplit = function(separator, limit) {
      var string = String(this);
      if (separator === void 0 && limit === 0) return [];
      if (!isRegExp2(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : "");
      var lastLastIndex = 0;
      var splitLimit = limit === void 0 ? MAX_UINT32 : limit >>> 0;
      var separatorCopy = new RegExp(separator.source, flags + "g");
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++;
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test("")) output.push("");
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  } else if ("0"[$SPLIT](void 0, 0)[LENGTH]) {
    internalSplit = function(separator, limit) {
      return separator === void 0 && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }
  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == void 0 ? void 0 : separator[SPLIT];
      return splitter !== void 0 ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function(regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;
      var rx = anObject3(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);
      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (SUPPORTS_Y ? "y" : "g");
      var splitter = new C(SUPPORTS_Y ? rx : "^(?:" + rx.source + ")", flags);
      var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (z === null || (e = $min(toLength3(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
          q = advanceStringIndex3(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i3 = 1; i3 <= z.length - 1; i3++) {
            A.push(z[i3]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

// node_modules/twitter-text/dist/esm/lib/idna.js
var import_punycode = __toESM(require_punycode());

// node_modules/twitter-text/dist/esm/regexp/validAsciiDomain.js
var validAsciiDomain = regexSupplant_default(/(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi, {
  latinAccentChars: latinAccentChars_default,
  validGTLD: validGTLD_default,
  validCCTLD: validCCTLD_default,
  validPunycode: validPunycode_default
});
var validAsciiDomain_default = validAsciiDomain;

// node_modules/twitter-text/dist/esm/lib/idna.js
var MAX_DOMAIN_LABEL_LENGTH = 63;
var PUNYCODE_ENCODED_DOMAIN_PREFIX = "xn--";
var idna = {
  toAscii: function toAscii(domain) {
    if (domain.substring(0, 4) === PUNYCODE_ENCODED_DOMAIN_PREFIX && !domain.match(validAsciiDomain_default)) {
      return;
    }
    var labels = domain.split(".");
    for (var i3 = 0; i3 < labels.length; i3++) {
      var label = labels[i3];
      var punycodeEncodedLabel = import_punycode.default.toASCII(label);
      if (punycodeEncodedLabel.length < 1 || punycodeEncodedLabel.length > MAX_DOMAIN_LABEL_LENGTH) {
        return;
      }
    }
    return labels.join(".");
  }
};
var idna_default = idna;

// node_modules/twitter-text/dist/esm/regexp/validTcoUrl.js
var validTcoUrl = regexSupplant_default(/^https?:\/\/t\.co\/([a-z0-9]+)(?:\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?/, {
  validUrlQueryChars: validUrlQueryChars_default,
  validUrlQueryEndingChars: validUrlQueryEndingChars_default
}, "i");
var validTcoUrl_default = validTcoUrl;

// node_modules/twitter-text/dist/esm/extractUrlsWithIndices.js
var DEFAULT_PROTOCOL = "https://";
var DEFAULT_PROTOCOL_OPTIONS = {
  extractUrlsWithoutProtocol: true
};
var MAX_URL_LENGTH = 4096;
var MAX_TCO_SLUG_LENGTH = 40;
var extractUrlsWithIndices = function extractUrlsWithIndices2(text) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_PROTOCOL_OPTIONS;
  if (!text || (options.extractUrlsWithoutProtocol ? !text.match(/\./) : !text.match(/:/))) {
    return [];
  }
  var urls = [];
  var _loop = function _loop2() {
    var before = RegExp.$2;
    var url = RegExp.$3;
    var protocol = RegExp.$4;
    var domain = RegExp.$5;
    var path = RegExp.$7;
    var endPosition = extractUrl_default.lastIndex;
    var startPosition = endPosition - url.length;
    if (!isValidUrl(url, protocol || DEFAULT_PROTOCOL, domain)) {
      return "continue";
    }
    if (!protocol) {
      if (!options.extractUrlsWithoutProtocol || before.match(invalidUrlWithoutProtocolPrecedingChars_default)) {
        return "continue";
      }
      var lastUrl = null;
      var asciiEndPosition = 0;
      domain.replace(validAsciiDomain_default, function(asciiDomain) {
        var asciiStartPosition = domain.indexOf(asciiDomain, asciiEndPosition);
        asciiEndPosition = asciiStartPosition + asciiDomain.length;
        lastUrl = {
          url: asciiDomain,
          indices: [startPosition + asciiStartPosition, startPosition + asciiEndPosition]
        };
        urls.push(lastUrl);
      });
      if (lastUrl == null) {
        return "continue";
      }
      if (path) {
        lastUrl.url = url.replace(domain, lastUrl.url);
        lastUrl.indices[1] = endPosition;
      }
    } else {
      if (url.match(validTcoUrl_default)) {
        var tcoUrlSlug = RegExp.$1;
        if (tcoUrlSlug && tcoUrlSlug.length > MAX_TCO_SLUG_LENGTH) {
          return "continue";
        } else {
          url = RegExp.lastMatch;
          endPosition = startPosition + url.length;
        }
      }
      urls.push({
        url,
        indices: [startPosition, endPosition]
      });
    }
  };
  while (extractUrl_default.exec(text)) {
    var _ret = _loop();
    if (_ret === "continue") continue;
  }
  return urls;
};
var isValidUrl = function isValidUrl2(url, protocol, domain) {
  var urlLength = url.length;
  var punycodeEncodedDomain = idna_default.toAscii(domain);
  if (!punycodeEncodedDomain || !punycodeEncodedDomain.length) {
    return false;
  }
  urlLength = urlLength + punycodeEncodedDomain.length - domain.length;
  return protocol.length + urlLength <= MAX_URL_LENGTH;
};
var extractUrlsWithIndices_default = extractUrlsWithIndices;

// node_modules/core-js/modules/es6.array.sort.js
var $export2 = require_export();
var aFunction = require_a_function();
var toObject2 = require_to_object();
var fails2 = require_fails();
var $sort = [].sort;
var test = [1, 2, 3];
$export2($export2.P + $export2.F * (fails2(function() {
  test.sort(void 0);
}) || !fails2(function() {
  test.sort(null);
}) || !require_strict_method()($sort)), "Array", {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === void 0 ? $sort.call(toObject2(this)) : $sort.call(toObject2(this), aFunction(comparefn));
  }
});

// node_modules/twitter-text/dist/esm/removeOverlappingEntities.js
function removeOverlappingEntities_default(entities) {
  entities.sort(function(a, b) {
    return a.indices[0] - b.indices[0];
  });
  var prev = entities[0];
  for (var i3 = 1; i3 < entities.length; i3++) {
    if (prev.indices[1] > entities[i3].indices[0]) {
      entities.splice(i3, 1);
      i3--;
    } else {
      prev = entities[i3];
    }
  }
}

// node_modules/twitter-text/dist/esm/regexp/astralLetterAndMarks.js
var astralLetterAndMarks = /\ud800[\udc00-\udc0b\udc0d-\udc26\udc28-\udc3a\udc3c\udc3d\udc3f-\udc4d\udc50-\udc5d\udc80-\udcfa\uddfd\ude80-\ude9c\udea0-\uded0\udee0\udf00-\udf1f\udf30-\udf40\udf42-\udf49\udf50-\udf7a\udf80-\udf9d\udfa0-\udfc3\udfc8-\udfcf]|\ud801[\udc00-\udc9d\udd00-\udd27\udd30-\udd63\ude00-\udf36\udf40-\udf55\udf60-\udf67]|\ud802[\udc00-\udc05\udc08\udc0a-\udc35\udc37\udc38\udc3c\udc3f-\udc55\udc60-\udc76\udc80-\udc9e\udd00-\udd15\udd20-\udd39\udd80-\uddb7\uddbe\uddbf\ude00-\ude03\ude05\ude06\ude0c-\ude13\ude15-\ude17\ude19-\ude33\ude38-\ude3a\ude3f\ude60-\ude7c\ude80-\ude9c\udec0-\udec7\udec9-\udee6\udf00-\udf35\udf40-\udf55\udf60-\udf72\udf80-\udf91]|\ud803[\udc00-\udc48]|\ud804[\udc00-\udc46\udc7f-\udcba\udcd0-\udce8\udd00-\udd34\udd50-\udd73\udd76\udd80-\uddc4\uddda\ude00-\ude11\ude13-\ude37\udeb0-\udeea\udf01-\udf03\udf05-\udf0c\udf0f\udf10\udf13-\udf28\udf2a-\udf30\udf32\udf33\udf35-\udf39\udf3c-\udf44\udf47\udf48\udf4b-\udf4d\udf57\udf5d-\udf63\udf66-\udf6c\udf70-\udf74]|\ud805[\udc80-\udcc5\udcc7\udd80-\uddb5\uddb8-\uddc0\ude00-\ude40\ude44\ude80-\udeb7]|\ud806[\udca0-\udcdf\udcff\udec0-\udef8]|\ud808[\udc00-\udf98]|\ud80c[\udc00-\udfff]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude38\ude40-\ude5e\uded0-\udeed\udef0-\udef4\udf00-\udf36\udf40-\udf43\udf63-\udf77\udf7d-\udf8f]|\ud81b[\udf00-\udf44\udf50-\udf7e\udf8f-\udf9f]|\ud82c[\udc00\udc01]|\ud82f[\udc00-\udc6a\udc70-\udc7c\udc80-\udc88\udc90-\udc99\udc9d\udc9e]|\ud834[\udd65-\udd69\udd6d-\udd72\udd7b-\udd82\udd85-\udd8b\uddaa-\uddad\ude42-\ude44]|\ud835[\udc00-\udc54\udc56-\udc9c\udc9e\udc9f\udca2\udca5\udca6\udca9-\udcac\udcae-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd1e-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd52-\udea5\udea8-\udec0\udec2-\udeda\udedc-\udefa\udefc-\udf14\udf16-\udf34\udf36-\udf4e\udf50-\udf6e\udf70-\udf88\udf8a-\udfa8\udfaa-\udfc2\udfc4-\udfcb]|\ud83a[\udc00-\udcc4\udcd0-\udcd6]|\ud83b[\ude00-\ude03\ude05-\ude1f\ude21\ude22\ude24\ude27\ude29-\ude32\ude34-\ude37\ude39\ude3b\ude42\ude47\ude49\ude4b\ude4d-\ude4f\ude51\ude52\ude54\ude57\ude59\ude5b\ude5d\ude5f\ude61\ude62\ude64\ude67-\ude6a\ude6c-\ude72\ude74-\ude77\ude79-\ude7c\ude7e\ude80-\ude89\ude8b-\ude9b\udea1-\udea3\udea5-\udea9\udeab-\udebb]|\ud840[\udc00-\udfff]|\ud841[\udc00-\udfff]|\ud842[\udc00-\udfff]|\ud843[\udc00-\udfff]|\ud844[\udc00-\udfff]|\ud845[\udc00-\udfff]|\ud846[\udc00-\udfff]|\ud847[\udc00-\udfff]|\ud848[\udc00-\udfff]|\ud849[\udc00-\udfff]|\ud84a[\udc00-\udfff]|\ud84b[\udc00-\udfff]|\ud84c[\udc00-\udfff]|\ud84d[\udc00-\udfff]|\ud84e[\udc00-\udfff]|\ud84f[\udc00-\udfff]|\ud850[\udc00-\udfff]|\ud851[\udc00-\udfff]|\ud852[\udc00-\udfff]|\ud853[\udc00-\udfff]|\ud854[\udc00-\udfff]|\ud855[\udc00-\udfff]|\ud856[\udc00-\udfff]|\ud857[\udc00-\udfff]|\ud858[\udc00-\udfff]|\ud859[\udc00-\udfff]|\ud85a[\udc00-\udfff]|\ud85b[\udc00-\udfff]|\ud85c[\udc00-\udfff]|\ud85d[\udc00-\udfff]|\ud85e[\udc00-\udfff]|\ud85f[\udc00-\udfff]|\ud860[\udc00-\udfff]|\ud861[\udc00-\udfff]|\ud862[\udc00-\udfff]|\ud863[\udc00-\udfff]|\ud864[\udc00-\udfff]|\ud865[\udc00-\udfff]|\ud866[\udc00-\udfff]|\ud867[\udc00-\udfff]|\ud868[\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|\ud86a[\udc00-\udfff]|\ud86b[\udc00-\udfff]|\ud86c[\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|\ud87e[\udc00-\ude1d]|\udb40[\udd00-\uddef]/;
var astralLetterAndMarks_default = astralLetterAndMarks;

// node_modules/twitter-text/dist/esm/regexp/bmpLetterAndMarks.js
var bmpLetterAndMarks = /A-Za-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u052f\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07ca-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0-\u08b2\u08e4-\u0963\u0971-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09f0\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a70-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0c00-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c81-\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0cf1\u0cf2\u0d01-\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u103f\u1050-\u108f\u109a-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16f1-\u16f8\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u180b-\u180d\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191e\u1920-\u192b\u1930-\u193b\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f\u1aa7\u1ab0-\u1abe\u1b00-\u1b4b\u1b6b-\u1b73\u1b80-\u1baf\u1bba-\u1bf3\u1c00-\u1c37\u1c4d-\u1c4f\u1c5a-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1cf8\u1cf9\u1d00-\u1df5\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u20d0-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005\u3006\u302a-\u302f\u3031-\u3035\u303b\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua672\ua674-\ua67d\ua67f-\ua69d\ua69f-\ua6e5\ua6f0\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua7ad\ua7b0\ua7b1\ua7f7-\ua827\ua840-\ua873\ua880-\ua8c4\ua8e0-\ua8f7\ua8fb\ua90a-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf\ua9e0-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa36\uaa40-\uaa4d\uaa60-\uaa76\uaa7a-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab5f\uab64\uab65\uabc0-\uabea\uabec\uabed\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf870-\uf87f\uf882\uf884-\uf89f\uf8b8\uf8c1-\uf8d6\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe2d\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc/;
var bmpLetterAndMarks_default = bmpLetterAndMarks;

// node_modules/twitter-text/dist/esm/regexp/nonBmpCodePairs.js
var nonBmpCodePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gm;
var nonBmpCodePairs_default = nonBmpCodePairs;

// node_modules/twitter-text/dist/esm/regexp/hashtagAlpha.js
var hashtagAlpha = regexSupplant_default(/(?:[#{bmpLetterAndMarks}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}))/, {
  bmpLetterAndMarks: bmpLetterAndMarks_default,
  nonBmpCodePairs: nonBmpCodePairs_default,
  astralLetterAndMarks: astralLetterAndMarks_default
});
var hashtagAlpha_default = hashtagAlpha;

// node_modules/twitter-text/dist/esm/regexp/astralNumerals.js
var astralNumerals = /\ud801[\udca0-\udca9]|\ud804[\udc66-\udc6f\udcf0-\udcf9\udd36-\udd3f\uddd0-\uddd9\udef0-\udef9]|\ud805[\udcd0-\udcd9\ude50-\ude59\udec0-\udec9]|\ud806[\udce0-\udce9]|\ud81a[\ude60-\ude69\udf50-\udf59]|\ud835[\udfce-\udfff]/;
var astralNumerals_default = astralNumerals;

// node_modules/twitter-text/dist/esm/regexp/bmpNumerals.js
var bmpNumerals = /0-9\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0de6-\u0def\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\ua9f0-\ua9f9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19/;
var bmpNumerals_default = bmpNumerals;

// node_modules/twitter-text/dist/esm/regexp/hashtagSpecialChars.js
var hashtagSpecialChars = /_\u200c\u200d\ua67e\u05be\u05f3\u05f4\uff5e\u301c\u309b\u309c\u30a0\u30fb\u3003\u0f0b\u0f0c\xb7/;
var hashtagSpecialChars_default = hashtagSpecialChars;

// node_modules/twitter-text/dist/esm/regexp/hashtagAlphaNumeric.js
var hashtagAlphaNumeric = regexSupplant_default(/(?:[#{bmpLetterAndMarks}#{bmpNumerals}#{hashtagSpecialChars}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}|#{astralNumerals}))/, {
  bmpLetterAndMarks: bmpLetterAndMarks_default,
  bmpNumerals: bmpNumerals_default,
  hashtagSpecialChars: hashtagSpecialChars_default,
  nonBmpCodePairs: nonBmpCodePairs_default,
  astralLetterAndMarks: astralLetterAndMarks_default,
  astralNumerals: astralNumerals_default
});
var hashtagAlphaNumeric_default = hashtagAlphaNumeric;

// node_modules/twitter-text/dist/esm/regexp/codePoint.js
var codePoint = /(?:[^\uD800-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/;
var codePoint_default = codePoint;

// node_modules/twitter-text/dist/esm/regexp/hashtagBoundary.js
var hashtagBoundary = regexSupplant_default(/(?:^|\uFE0E|\uFE0F|$|(?!#{hashtagAlphaNumeric}|&)#{codePoint})/, {
  codePoint: codePoint_default,
  hashtagAlphaNumeric: hashtagAlphaNumeric_default
});
var hashtagBoundary_default = hashtagBoundary;

// node_modules/twitter-text/dist/esm/regexp/validHashtag.js
var validHashtag = regexSupplant_default(/(#{hashtagBoundary})(#{hashSigns})(?!\uFE0F|\u20E3)(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi, {
  hashtagBoundary: hashtagBoundary_default,
  hashSigns: hashSigns_default,
  hashtagAlphaNumeric: hashtagAlphaNumeric_default,
  hashtagAlpha: hashtagAlpha_default
});
var validHashtag_default = validHashtag;

// node_modules/twitter-text/dist/esm/extractHashtagsWithIndices.js
var extractHashtagsWithIndices = function extractHashtagsWithIndices2(text, options) {
  if (!options) {
    options = {
      checkUrlOverlap: true
    };
  }
  if (!text || !text.match(hashSigns_default)) {
    return [];
  }
  var tags = [];
  text.replace(validHashtag_default, function(match, before, hash, hashText, offset, chunk) {
    var after = chunk.slice(offset + match.length);
    if (after.match(endHashtagMatch_default)) {
      return;
    }
    var startPosition = offset + before.length;
    var endPosition = startPosition + hashText.length + 1;
    tags.push({
      hashtag: hashText,
      indices: [startPosition, endPosition]
    });
  });
  if (options.checkUrlOverlap) {
    var urls = extractUrlsWithIndices_default(text);
    if (urls.length > 0) {
      var entities = tags.concat(urls);
      removeOverlappingEntities_default(entities);
      tags = [];
      for (var i3 = 0; i3 < entities.length; i3++) {
        if (entities[i3].hashtag) {
          tags.push(entities[i3]);
        }
      }
    }
  }
  return tags;
};
var extractHashtagsWithIndices_default = extractHashtagsWithIndices;

// node_modules/twitter-text/dist/esm/regexp/atSigns.js
var atSigns = /[@＠]/;
var atSigns_default = atSigns;

// node_modules/twitter-text/dist/esm/regexp/endMentionMatch.js
var endMentionMatch = regexSupplant_default(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/, {
  atSigns: atSigns_default,
  latinAccentChars: latinAccentChars_default
});
var endMentionMatch_default = endMentionMatch;

// node_modules/twitter-text/dist/esm/regexp/validMentionPrecedingChars.js
var validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|(?:^|[^a-zA-Z0-9_+~.-])(?:rt|RT|rT|Rt):?)/;
var validMentionPrecedingChars_default = validMentionPrecedingChars;

// node_modules/twitter-text/dist/esm/regexp/validMentionOrList.js
var validMentionOrList = regexSupplant_default(
  "(#{validMentionPrecedingChars})(#{atSigns})([a-zA-Z0-9_]{1,20})(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?",
  // $4: List (optional)
  {
    validMentionPrecedingChars: validMentionPrecedingChars_default,
    atSigns: atSigns_default
  },
  "g"
);
var validMentionOrList_default = validMentionOrList;

// node_modules/twitter-text/dist/esm/extractMentionsOrListsWithIndices.js
function extractMentionsOrListsWithIndices_default(text) {
  if (!text || !text.match(atSigns_default)) {
    return [];
  }
  var possibleNames = [];
  text.replace(validMentionOrList_default, function(match, before, atSign, screenName, slashListname, offset, chunk) {
    var after = chunk.slice(offset + match.length);
    if (!after.match(endMentionMatch_default)) {
      slashListname = slashListname || "";
      var startPosition = offset + before.length;
      var endPosition = startPosition + screenName.length + slashListname.length + 1;
      possibleNames.push({
        screenName,
        listSlug: slashListname,
        indices: [startPosition, endPosition]
      });
    }
  });
  return possibleNames;
}

// node_modules/twitter-text/dist/esm/extractEntitiesWithIndices.js
function extractEntitiesWithIndices_default(text, options) {
  var entities = extractUrlsWithIndices_default(text, options).concat(extractMentionsOrListsWithIndices_default(text)).concat(extractHashtagsWithIndices_default(text, {
    checkUrlOverlap: false
  })).concat(extractCashtagsWithIndices_default(text));
  if (entities.length == 0) {
    return [];
  }
  removeOverlappingEntities_default(entities);
  return entities;
}

// node_modules/twitter-text/dist/esm/lib/clone.js
function clone_default(o) {
  var r = {};
  for (var k2 in o) {
    if (o.hasOwnProperty(k2)) {
      r[k2] = o[k2];
    }
  }
  return r;
}

// node_modules/twitter-text/dist/esm/extractHtmlAttrsFromOptions.js
var BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
};
var OPTIONS_NOT_ATTRIBUTES = {
  urlClass: true,
  listClass: true,
  usernameClass: true,
  hashtagClass: true,
  cashtagClass: true,
  usernameUrlBase: true,
  listUrlBase: true,
  hashtagUrlBase: true,
  cashtagUrlBase: true,
  usernameUrlBlock: true,
  listUrlBlock: true,
  hashtagUrlBlock: true,
  linkUrlBlock: true,
  usernameIncludeSymbol: true,
  suppressLists: true,
  suppressNoFollow: true,
  targetBlank: true,
  suppressDataScreenName: true,
  urlEntities: true,
  symbolTag: true,
  textWithSymbolTag: true,
  urlTarget: true,
  invisibleTagAttrs: true,
  linkAttributeBlock: true,
  linkTextBlock: true,
  htmlEscapeNonEntities: true
};
function extractHtmlAttrsFromOptions_default(options) {
  var htmlAttrs = {};
  for (var k2 in options) {
    var v = options[k2];
    if (OPTIONS_NOT_ATTRIBUTES[k2]) {
      continue;
    }
    if (BOOLEAN_ATTRIBUTES[k2]) {
      v = v ? k2 : null;
    }
    if (v == null) {
      continue;
    }
    htmlAttrs[k2] = v;
  }
  return htmlAttrs;
}

// node_modules/twitter-text/dist/esm/htmlEscape.js
var HTML_ENTITIES = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#39;"
};
function htmlEscape_default(text) {
  return text && text.replace(/[&"'><]/g, function(character) {
    return HTML_ENTITIES[character];
  });
}

// node_modules/core-js/modules/es6.regexp.to-string.js
require_es6_regexp_flags();
var anObject4 = require_an_object();
var $flags2 = require_flags();
var DESCRIPTORS = require_descriptors();
var TO_STRING = "toString";
var $toString = /./[TO_STRING];
var define2 = function(fn) {
  require_redefine()(RegExp.prototype, TO_STRING, fn, true);
};
if (require_fails()(function() {
  return $toString.call({ source: "a", flags: "b" }) != "/a/b";
})) {
  define2(function toString() {
    var R = anObject4(this);
    return "/".concat(
      R.source,
      "/",
      "flags" in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags2.call(R) : void 0
    );
  });
} else if ($toString.name != TO_STRING) {
  define2(function toString() {
    return $toString.call(this);
  });
}

// node_modules/core-js/modules/es6.date.to-string.js
var DateProto = Date.prototype;
var INVALID_DATE = "Invalid Date";
var TO_STRING2 = "toString";
var $toString2 = DateProto[TO_STRING2];
var getTime = DateProto.getTime;
if (/* @__PURE__ */ new Date(NaN) + "" != INVALID_DATE) {
  require_redefine()(DateProto, TO_STRING2, function toString() {
    var value = getTime.call(this);
    return value === value ? $toString2.call(this) : INVALID_DATE;
  });
}

// node_modules/core-js/modules/es6.object.to-string.js
var classof = require_classof();
var test2 = {};
test2[require_wks()("toStringTag")] = "z";
if (test2 + "" != "[object z]") {
  require_redefine()(Object.prototype, "toString", function toString() {
    return "[object " + classof(this) + "]";
  }, true);
}

// node_modules/twitter-text/dist/esm/tagAttrs.js
var BOOLEAN_ATTRIBUTES2 = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
};
function tagAttrs_default(attributes) {
  var htmlAttrs = "";
  for (var k2 in attributes) {
    var v = attributes[k2];
    if (BOOLEAN_ATTRIBUTES2[k2]) {
      v = v ? k2 : null;
    }
    if (v == null) {
      continue;
    }
    htmlAttrs += " ".concat(htmlEscape_default(k2), '="').concat(htmlEscape_default(v.toString()), '"');
  }
  return htmlAttrs;
}

// node_modules/twitter-text/dist/esm/linkToText.js
function linkToText_default(entity, text, attributes, options) {
  if (!options.suppressNoFollow) {
    attributes.rel = "nofollow";
  }
  if (options.linkAttributeBlock) {
    options.linkAttributeBlock(entity, attributes);
  }
  if (options.linkTextBlock) {
    text = options.linkTextBlock(entity, text);
  }
  var d = {
    text,
    attr: tagAttrs_default(attributes)
  };
  return stringSupplant_default("<a#{attr}>#{text}</a>", d);
}

// node_modules/twitter-text/dist/esm/linkToTextWithSymbol.js
function linkToTextWithSymbol_default(entity, symbol, text, attributes, options) {
  var taggedSymbol = options.symbolTag ? "<".concat(options.symbolTag, ">").concat(symbol, "</").concat(options.symbolTag, ">") : symbol;
  text = htmlEscape_default(text);
  var taggedText = options.textWithSymbolTag ? "<".concat(options.textWithSymbolTag, ">").concat(text, "</").concat(options.textWithSymbolTag, ">") : text;
  if (options.usernameIncludeSymbol || !symbol.match(atSigns_default)) {
    return linkToText_default(entity, taggedSymbol + taggedText, attributes, options);
  } else {
    return taggedSymbol + linkToText_default(entity, taggedText, attributes, options);
  }
}

// node_modules/twitter-text/dist/esm/linkToCashtag.js
function linkToCashtag_default(entity, text, options) {
  var cashtag2 = htmlEscape_default(entity.cashtag);
  var attrs = clone_default(options.htmlAttrs || {});
  attrs.href = options.cashtagUrlBase + cashtag2;
  attrs.title = "$".concat(cashtag2);
  attrs["class"] = options.cashtagClass;
  if (options.targetBlank) {
    attrs.target = "_blank";
  }
  return linkToTextWithSymbol_default(entity, "$", cashtag2, attrs, options);
}

// node_modules/twitter-text/dist/esm/regexp/rtlChars.js
var rtlChars = /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm;
var rtlChars_default = rtlChars;

// node_modules/twitter-text/dist/esm/linkToHashtag.js
function linkToHashtag_default(entity, text, options) {
  var hash = text.substring(entity.indices[0], entity.indices[0] + 1);
  var hashtag = htmlEscape_default(entity.hashtag);
  var attrs = clone_default(options.htmlAttrs || {});
  attrs.href = options.hashtagUrlBase + hashtag;
  attrs.title = "#".concat(hashtag);
  attrs["class"] = options.hashtagClass;
  if (hashtag.charAt(0).match(rtlChars_default)) {
    attrs["class"] += " rtl";
  }
  if (options.targetBlank) {
    attrs.target = "_blank";
  }
  return linkToTextWithSymbol_default(entity, hash, hashtag, attrs, options);
}

// node_modules/twitter-text/dist/esm/linkTextWithEntity.js
function linkTextWithEntity_default(entity, options) {
  var displayUrl = entity.display_url;
  var expandedUrl = entity.expanded_url;
  var displayUrlSansEllipses = displayUrl.replace(/…/g, "");
  if (expandedUrl.indexOf(displayUrlSansEllipses) != -1) {
    var displayUrlIndex = expandedUrl.indexOf(displayUrlSansEllipses);
    var v = {
      displayUrlSansEllipses,
      // Portion of expandedUrl that precedes the displayUrl substring
      beforeDisplayUrl: expandedUrl.substr(0, displayUrlIndex),
      // Portion of expandedUrl that comes after displayUrl
      afterDisplayUrl: expandedUrl.substr(displayUrlIndex + displayUrlSansEllipses.length),
      precedingEllipsis: displayUrl.match(/^…/) ? "\u2026" : "",
      followingEllipsis: displayUrl.match(/…$/) ? "\u2026" : ""
    };
    for (var k2 in v) {
      if (v.hasOwnProperty(k2)) {
        v[k2] = htmlEscape_default(v[k2]);
      }
    }
    v["invisible"] = options.invisibleTagAttrs;
    return stringSupplant_default("<span class='tco-ellipsis'>#{precedingEllipsis}<span #{invisible}>&nbsp;</span></span><span #{invisible}>#{beforeDisplayUrl}</span><span class='js-display-url'>#{displayUrlSansEllipses}</span><span #{invisible}>#{afterDisplayUrl}</span><span class='tco-ellipsis'><span #{invisible}>&nbsp;</span>#{followingEllipsis}</span>", v);
  }
  return displayUrl;
}

// node_modules/twitter-text/dist/esm/regexp/urlHasProtocol.js
var urlHasProtocol = /^https?:\/\//i;
var urlHasProtocol_default = urlHasProtocol;

// node_modules/twitter-text/dist/esm/linkToUrl.js
function linkToUrl_default(entity, text, options) {
  var url = entity.url;
  var displayUrl = url;
  var linkText = htmlEscape_default(displayUrl);
  var urlEntity = options.urlEntities && options.urlEntities[url] || entity;
  if (urlEntity.display_url) {
    linkText = linkTextWithEntity_default(urlEntity, options);
  }
  var attrs = clone_default(options.htmlAttrs || {});
  if (!url.match(urlHasProtocol_default)) {
    url = "http://".concat(url);
  }
  attrs.href = url;
  if (options.targetBlank) {
    attrs.target = "_blank";
  }
  if (options.urlClass) {
    attrs["class"] = options.urlClass;
  }
  if (options.urlTarget) {
    attrs.target = options.urlTarget;
  }
  if (!options.title && urlEntity.display_url) {
    attrs.title = urlEntity.expanded_url;
  }
  return linkToText_default(entity, linkText, attrs, options);
}

// node_modules/twitter-text/dist/esm/linkToMentionAndList.js
function linkToMentionAndList_default(entity, text, options) {
  var at = text.substring(entity.indices[0], entity.indices[0] + 1);
  var user = htmlEscape_default(entity.screenName);
  var slashListname = htmlEscape_default(entity.listSlug);
  var isList = entity.listSlug && !options.suppressLists;
  var attrs = clone_default(options.htmlAttrs || {});
  attrs["class"] = isList ? options.listClass : options.usernameClass;
  attrs.href = isList ? options.listUrlBase + user + slashListname : options.usernameUrlBase + user;
  if (!isList && !options.suppressDataScreenName) {
    attrs["data-screen-name"] = user;
  }
  if (options.targetBlank) {
    attrs.target = "_blank";
  }
  return linkToTextWithSymbol_default(entity, at, isList ? user + slashListname : user, attrs, options);
}

// node_modules/twitter-text/dist/esm/autoLinkEntities.js
var DEFAULT_LIST_CLASS = "tweet-url list-slug";
var DEFAULT_USERNAME_CLASS = "tweet-url username";
var DEFAULT_HASHTAG_CLASS = "tweet-url hashtag";
var DEFAULT_CASHTAG_CLASS = "tweet-url cashtag";
function autoLinkEntities_default(text, entities, options) {
  var options = clone_default(options || {});
  options.hashtagClass = options.hashtagClass || DEFAULT_HASHTAG_CLASS;
  options.hashtagUrlBase = options.hashtagUrlBase || "https://twitter.com/search?q=%23";
  options.cashtagClass = options.cashtagClass || DEFAULT_CASHTAG_CLASS;
  options.cashtagUrlBase = options.cashtagUrlBase || "https://twitter.com/search?q=%24";
  options.listClass = options.listClass || DEFAULT_LIST_CLASS;
  options.usernameClass = options.usernameClass || DEFAULT_USERNAME_CLASS;
  options.usernameUrlBase = options.usernameUrlBase || "https://twitter.com/";
  options.listUrlBase = options.listUrlBase || "https://twitter.com/";
  options.htmlAttrs = extractHtmlAttrsFromOptions_default(options);
  options.invisibleTagAttrs = options.invisibleTagAttrs || "style='position:absolute;left:-9999px;'";
  var urlEntities, i3, len;
  if (options.urlEntities) {
    urlEntities = {};
    for (i3 = 0, len = options.urlEntities.length; i3 < len; i3++) {
      urlEntities[options.urlEntities[i3].url] = options.urlEntities[i3];
    }
    options.urlEntities = urlEntities;
  }
  var result = "";
  var beginIndex = 0;
  entities.sort(function(a, b) {
    return a.indices[0] - b.indices[0];
  });
  var nonEntity = options.htmlEscapeNonEntities ? htmlEscape_default : function(text2) {
    return text2;
  };
  for (var i3 = 0; i3 < entities.length; i3++) {
    var entity = entities[i3];
    result += nonEntity(text.substring(beginIndex, entity.indices[0]));
    if (entity.url) {
      result += linkToUrl_default(entity, text, options);
    } else if (entity.hashtag) {
      result += linkToHashtag_default(entity, text, options);
    } else if (entity.screenName) {
      result += linkToMentionAndList_default(entity, text, options);
    } else if (entity.cashtag) {
      result += linkToCashtag_default(entity, text, options);
    }
    beginIndex = entity.indices[1];
  }
  result += nonEntity(text.substring(beginIndex, text.length));
  return result;
}

// node_modules/twitter-text/dist/esm/autoLink.js
function autoLink_default(text, options) {
  var entities = extractEntitiesWithIndices_default(text, {
    extractUrlsWithoutProtocol: false
  });
  return autoLinkEntities_default(text, entities, options);
}

// node_modules/twitter-text/dist/esm/autoLinkCashtags.js
function autoLinkCashtags_default(text, options) {
  var entities = extractCashtagsWithIndices_default(text);
  return autoLinkEntities_default(text, entities, options);
}

// node_modules/twitter-text/dist/esm/autoLinkHashtags.js
function autoLinkHashtags_default(text, options) {
  var entities = extractHashtagsWithIndices_default(text);
  return autoLinkEntities_default(text, entities, options);
}

// node_modules/twitter-text/dist/esm/autoLinkUrlsCustom.js
function autoLinkUrlsCustom_default(text, options) {
  var entities = extractUrlsWithIndices_default(text, {
    extractUrlsWithoutProtocol: false
  });
  return autoLinkEntities_default(text, entities, options);
}

// node_modules/twitter-text/dist/esm/autoLinkUsernamesOrLists.js
function autoLinkUsernamesOrLists_default(text, options) {
  var entities = extractMentionsOrListsWithIndices_default(text);
  return autoLinkEntities_default(text, entities, options);
}

// node_modules/twitter-text/dist/esm/lib/convertUnicodeIndices.js
var convertUnicodeIndices = function convertUnicodeIndices2(text, entities, indicesInUTF16) {
  if (entities.length === 0) {
    return;
  }
  var charIndex = 0;
  var codePointIndex = 0;
  entities.sort(function(a, b) {
    return a.indices[0] - b.indices[0];
  });
  var entityIndex = 0;
  var entity = entities[0];
  while (charIndex < text.length) {
    if (entity.indices[0] === (indicesInUTF16 ? charIndex : codePointIndex)) {
      var len = entity.indices[1] - entity.indices[0];
      entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
      entity.indices[1] = entity.indices[0] + len;
      entityIndex++;
      if (entityIndex === entities.length) {
        break;
      }
      entity = entities[entityIndex];
    }
    var c = text.charCodeAt(charIndex);
    if (c >= 55296 && c <= 56319 && charIndex < text.length - 1) {
      c = text.charCodeAt(charIndex + 1);
      if (c >= 56320 && c <= 57343) {
        charIndex++;
      }
    }
    codePointIndex++;
    charIndex++;
  }
};
var convertUnicodeIndices_default = convertUnicodeIndices;

// node_modules/twitter-text/dist/esm/modifyIndicesFromUnicodeToUTF16.js
function modifyIndicesFromUnicodeToUTF16_default(text, entities) {
  convertUnicodeIndices_default(text, entities, false);
}

// node_modules/twitter-text/dist/esm/autoLinkWithJSON.js
function autoLinkWithJSON_default(text, json, options) {
  if (json.user_mentions) {
    for (var i3 = 0; i3 < json.user_mentions.length; i3++) {
      json.user_mentions[i3].screenName = json.user_mentions[i3].screen_name;
    }
  }
  if (json.hashtags) {
    for (var i3 = 0; i3 < json.hashtags.length; i3++) {
      json.hashtags[i3].hashtag = json.hashtags[i3].text;
    }
  }
  if (json.symbols) {
    for (var i3 = 0; i3 < json.symbols.length; i3++) {
      json.symbols[i3].cashtag = json.symbols[i3].text;
    }
  }
  var entities = [];
  for (var key2 in json) {
    entities = entities.concat(json[key2]);
  }
  modifyIndicesFromUnicodeToUTF16_default(text, entities);
  return autoLinkEntities_default(text, entities, options);
}

// node_modules/twitter-text/dist/esm/configs.js
var configs_default = {
  version1: {
    version: 1,
    maxWeightedTweetLength: 140,
    scale: 1,
    defaultWeight: 1,
    transformedURLLength: 23,
    ranges: []
  },
  version2: {
    version: 2,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    transformedURLLength: 23,
    ranges: [{
      start: 0,
      end: 4351,
      weight: 100
    }, {
      start: 8192,
      end: 8205,
      weight: 100
    }, {
      start: 8208,
      end: 8223,
      weight: 100
    }, {
      start: 8242,
      end: 8247,
      weight: 100
    }]
  },
  version3: {
    version: 3,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    emojiParsingEnabled: true,
    transformedURLLength: 23,
    ranges: [{
      start: 0,
      end: 4351,
      weight: 100
    }, {
      start: 8192,
      end: 8205,
      weight: 100
    }, {
      start: 8208,
      end: 8223,
      weight: 100
    }, {
      start: 8242,
      end: 8247,
      weight: 100
    }]
  },
  defaults: {
    version: 3,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    emojiParsingEnabled: true,
    transformedURLLength: 23,
    ranges: [{
      start: 0,
      end: 4351,
      weight: 100
    }, {
      start: 8192,
      end: 8205,
      weight: 100
    }, {
      start: 8208,
      end: 8223,
      weight: 100
    }, {
      start: 8242,
      end: 8247,
      weight: 100
    }]
  }
};

// node_modules/twitter-text/dist/esm/convertUnicodeIndices.js
function convertUnicodeIndices_default2(text, entities, indicesInUTF16) {
  if (entities.length == 0) {
    return;
  }
  var charIndex = 0;
  var codePointIndex = 0;
  entities.sort(function(a, b) {
    return a.indices[0] - b.indices[0];
  });
  var entityIndex = 0;
  var entity = entities[0];
  while (charIndex < text.length) {
    if (entity.indices[0] == (indicesInUTF16 ? charIndex : codePointIndex)) {
      var len = entity.indices[1] - entity.indices[0];
      entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
      entity.indices[1] = entity.indices[0] + len;
      entityIndex++;
      if (entityIndex == entities.length) {
        break;
      }
      entity = entities[entityIndex];
    }
    var c = text.charCodeAt(charIndex);
    if (c >= 55296 && c <= 56319 && charIndex < text.length - 1) {
      c = text.charCodeAt(charIndex + 1);
      if (c >= 56320 && c <= 57343) {
        charIndex++;
      }
    }
    codePointIndex++;
    charIndex++;
  }
}

// node_modules/twitter-text/dist/esm/extractCashtags.js
function extractCashtags_default(text) {
  var cashtagsOnly = [], cashtagsWithIndices = extractCashtagsWithIndices_default(text);
  for (var i3 = 0; i3 < cashtagsWithIndices.length; i3++) {
    cashtagsOnly.push(cashtagsWithIndices[i3].cashtag);
  }
  return cashtagsOnly;
}

// node_modules/twitter-text/dist/esm/extractHashtags.js
function extractHashtags_default(text) {
  var hashtagsOnly = [];
  var hashtagsWithIndices = extractHashtagsWithIndices_default(text);
  for (var i3 = 0; i3 < hashtagsWithIndices.length; i3++) {
    hashtagsOnly.push(hashtagsWithIndices[i3].hashtag);
  }
  return hashtagsOnly;
}

// node_modules/twitter-text/dist/esm/extractMentionsWithIndices.js
function extractMentionsWithIndices_default(text) {
  var mentions = [];
  var mentionOrList;
  var mentionsOrLists = extractMentionsOrListsWithIndices_default(text);
  for (var i3 = 0; i3 < mentionsOrLists.length; i3++) {
    mentionOrList = mentionsOrLists[i3];
    if (mentionOrList.listSlug === "") {
      mentions.push({
        screenName: mentionOrList.screenName,
        indices: mentionOrList.indices
      });
    }
  }
  return mentions;
}

// node_modules/twitter-text/dist/esm/extractMentions.js
function extractMentions_default(text) {
  var screenNamesOnly = [], screenNamesWithIndices = extractMentionsWithIndices_default(text);
  for (var i3 = 0; i3 < screenNamesWithIndices.length; i3++) {
    var screenName = screenNamesWithIndices[i3].screenName;
    screenNamesOnly.push(screenName);
  }
  return screenNamesOnly;
}

// node_modules/twitter-text/dist/esm/regexp/validReply.js
var validReply = regexSupplant_default(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/, {
  atSigns: atSigns_default,
  spaces: spaces_default
});
var validReply_default = validReply;

// node_modules/twitter-text/dist/esm/extractReplies.js
function extractReplies_default(text) {
  if (!text) {
    return null;
  }
  var possibleScreenName = text.match(validReply_default);
  if (!possibleScreenName || RegExp.rightContext.match(endMentionMatch_default)) {
    return null;
  }
  return possibleScreenName[1];
}

// node_modules/twitter-text/dist/esm/extractUrls.js
function extractUrls_default(text, options) {
  var urlsOnly = [];
  var urlsWithIndices = extractUrlsWithIndices_default(text, options);
  for (var i3 = 0; i3 < urlsWithIndices.length; i3++) {
    urlsOnly.push(urlsWithIndices[i3].url);
  }
  return urlsOnly;
}

// node_modules/core-js/modules/es6.array.is-array.js
var $export3 = require_export();
$export3($export3.S, "Array", { isArray: require_is_array() });

// node_modules/twitter-text/dist/esm/lib/getCharacterWeight.js
var getCharacterWeight = function getCharacterWeight2(ch, options) {
  var defaultWeight = options.defaultWeight, ranges = options.ranges;
  var weight = defaultWeight;
  var chCodePoint = ch.charCodeAt(0);
  if (Array.isArray(ranges)) {
    for (var i3 = 0, length = ranges.length; i3 < length; i3++) {
      var currRange = ranges[i3];
      if (chCodePoint >= currRange.start && chCodePoint <= currRange.end) {
        weight = currRange.weight;
        break;
      }
    }
  }
  return weight;
};
var getCharacterWeight_default = getCharacterWeight;

// node_modules/twitter-text/dist/esm/modifyIndicesFromUTF16ToUnicode.js
function modifyIndicesFromUTF16ToUnicode_default(text, entities) {
  convertUnicodeIndices_default(text, entities, true);
}

// node_modules/core-js/modules/es6.array.reduce.js
var $export4 = require_export();
var $reduce = require_array_reduce();
$export4($export4.P + $export4.F * !require_strict_method()([].reduce, true), "Array", {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

// node_modules/core-js/modules/web.dom.iterable.js
var $iterators = require_es6_array_iterator();
var getKeys = require_object_keys();
var redefine = require_redefine();
var global3 = require_global();
var hide = require_hide();
var Iterators = require_iterators();
var wks = require_wks();
var ITERATOR = wks("iterator");
var TO_STRING_TAG = wks("toStringTag");
var ArrayValues = Iterators.Array;
var DOMIterables = {
  CSSRuleList: true,
  // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true,
  // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true,
  // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};
for (collections = getKeys(DOMIterables), i2 = 0; i2 < collections.length; i2++) {
  NAME = collections[i2];
  explicit = DOMIterables[NAME];
  Collection = global3[NAME];
  proto2 = Collection && Collection.prototype;
  if (proto2) {
    if (!proto2[ITERATOR]) hide(proto2, ITERATOR, ArrayValues);
    if (!proto2[TO_STRING_TAG]) hide(proto2, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) {
      for (key in $iterators) if (!proto2[key]) redefine(proto2, key, $iterators[key], true);
    }
  }
}
var NAME;
var explicit;
var Collection;
var proto2;
var key;
var collections;
var i2;

// node_modules/twitter-text/dist/esm/parseTweet.js
var import_es6_array11 = __toESM(require_es6_array_iterator());

// node_modules/core-js/modules/es6.object.keys.js
var toObject3 = require_to_object();
var $keys = require_object_keys();
require_object_sap()("keys", function() {
  return function keys2(it) {
    return $keys(toObject3(it));
  };
});

// node_modules/twitter-text/dist/esm/regexp/invalidChars.js
var invalidChars = regexSupplant_default(/[#{invalidCharsGroup}]/, {
  invalidCharsGroup: invalidCharsGroup_default
});
var invalidChars_default = invalidChars;

// node_modules/twitter-text/dist/esm/hasInvalidCharacters.js
function hasInvalidCharacters_default(text) {
  return invalidChars_default.test(text);
}

// node_modules/twitter-text/dist/esm/parseTweet.js
var import_twemoji_parser = __toESM(require_dist());

// node_modules/twitter-text/dist/esm/regexp/urlHasHttps.js
var urlHasHttps = /^https:\/\//i;
var urlHasHttps_default = urlHasHttps;

// node_modules/twitter-text/dist/esm/parseTweet.js
var parseTweet = function parseTweet2() {
  var text = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : configs_default.defaults;
  var mergedOptions = Object.keys(options).length ? options : configs_default.defaults;
  var defaultWeight = mergedOptions.defaultWeight, emojiParsingEnabled = mergedOptions.emojiParsingEnabled, scale = mergedOptions.scale, maxWeightedTweetLength = mergedOptions.maxWeightedTweetLength, transformedURLLength = mergedOptions.transformedURLLength;
  var normalizedText = typeof String.prototype.normalize === "function" ? text.normalize() : text;
  var urlEntitiesMap = transformEntitiesToHash(extractUrlsWithIndices_default(normalizedText));
  var emojiEntitiesMap = emojiParsingEnabled ? transformEntitiesToHash((0, import_twemoji_parser.parse)(normalizedText)) : [];
  var tweetLength = normalizedText.length;
  var weightedLength = 0;
  var validDisplayIndex = 0;
  var valid = true;
  for (var charIndex = 0; charIndex < tweetLength; charIndex++) {
    if (urlEntitiesMap[charIndex]) {
      var _urlEntitiesMap$charI = urlEntitiesMap[charIndex], url = _urlEntitiesMap$charI.url, indices = _urlEntitiesMap$charI.indices;
      weightedLength += transformedURLLength * scale;
      charIndex += url.length - 1;
    } else if (emojiParsingEnabled && emojiEntitiesMap[charIndex]) {
      var _emojiEntitiesMap$cha = emojiEntitiesMap[charIndex], emoji = _emojiEntitiesMap$cha.text, _indices = _emojiEntitiesMap$cha.indices;
      weightedLength += defaultWeight;
      charIndex += emoji.length - 1;
    } else {
      charIndex += isSurrogatePair(normalizedText, charIndex) ? 1 : 0;
      weightedLength += getCharacterWeight_default(normalizedText.charAt(charIndex), mergedOptions);
    }
    if (valid) {
      valid = !hasInvalidCharacters_default(normalizedText.substring(charIndex, charIndex + 1));
    }
    if (valid && weightedLength <= maxWeightedTweetLength * scale) {
      validDisplayIndex = charIndex;
    }
  }
  weightedLength = weightedLength / scale;
  valid = valid && weightedLength > 0 && weightedLength <= maxWeightedTweetLength;
  var permillage = Math.floor(weightedLength / maxWeightedTweetLength * 1e3);
  var normalizationOffset = text.length - normalizedText.length;
  validDisplayIndex += normalizationOffset;
  return {
    weightedLength,
    valid,
    permillage,
    validRangeStart: 0,
    validRangeEnd: validDisplayIndex,
    displayRangeStart: 0,
    displayRangeEnd: text.length > 0 ? text.length - 1 : 0
  };
};
var transformEntitiesToHash = function transformEntitiesToHash2(entities) {
  return entities.reduce(function(map, entity) {
    map[entity.indices[0]] = entity;
    return map;
  }, {});
};
var isSurrogatePair = function isSurrogatePair2(text, cIndex) {
  if (cIndex < text.length - 1) {
    var c = text.charCodeAt(cIndex);
    var cNext = text.charCodeAt(cIndex + 1);
    return 55296 <= c && c <= 56319 && 56320 <= cNext && cNext <= 57343;
  }
  return false;
};
var parseTweet_default = parseTweet;

// node_modules/twitter-text/dist/esm/getTweetLength.js
var getTweetLength = function getTweetLength2(text) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : configs_default.defaults;
  return parseTweet_default(text, options).weightedLength;
};
var getTweetLength_default = getTweetLength;

// node_modules/twitter-text/dist/esm/getUnicodeTextLength.js
function getUnicodeTextLength_default(text) {
  return text.replace(nonBmpCodePairs_default, " ").length;
}

// node_modules/twitter-text/dist/esm/splitTags.js
function splitTags_default(text) {
  var firstSplits = text.split("<"), secondSplits, allSplits = [], split;
  for (var i3 = 0; i3 < firstSplits.length; i3 += 1) {
    split = firstSplits[i3];
    if (!split) {
      allSplits.push("");
    } else {
      secondSplits = split.split(">");
      for (var j2 = 0; j2 < secondSplits.length; j2 += 1) {
        allSplits.push(secondSplits[j2]);
      }
    }
  }
  return allSplits;
}

// node_modules/twitter-text/dist/esm/hitHighlight.js
function hitHighlight_default(text, hits, options) {
  var defaultHighlightTag = "em";
  hits = hits || [];
  options = options || {};
  if (hits.length === 0) {
    return text;
  }
  var tagName = options.tag || defaultHighlightTag, tags = ["<".concat(tagName, ">"), "</".concat(tagName, ">")], chunks = splitTags_default(text), i3, j2, result = "", chunkIndex = 0, chunk = chunks[0], prevChunksLen = 0, chunkCursor = 0, startInChunk = false, chunkChars = chunk, flatHits = [], index, hit, tag, placed, hitSpot;
  for (i3 = 0; i3 < hits.length; i3 += 1) {
    for (j2 = 0; j2 < hits[i3].length; j2 += 1) {
      flatHits.push(hits[i3][j2]);
    }
  }
  for (index = 0; index < flatHits.length; index += 1) {
    hit = flatHits[index];
    tag = tags[index % 2];
    placed = false;
    while (chunk != null && hit >= prevChunksLen + chunk.length) {
      result += chunkChars.slice(chunkCursor);
      if (startInChunk && hit === prevChunksLen + chunkChars.length) {
        result += tag;
        placed = true;
      }
      if (chunks[chunkIndex + 1]) {
        result += "<".concat(chunks[chunkIndex + 1], ">");
      }
      prevChunksLen += chunkChars.length;
      chunkCursor = 0;
      chunkIndex += 2;
      chunk = chunks[chunkIndex];
      chunkChars = chunk;
      startInChunk = false;
    }
    if (!placed && chunk != null) {
      hitSpot = hit - prevChunksLen;
      result += chunkChars.slice(chunkCursor, hitSpot) + tag;
      chunkCursor = hitSpot;
      if (index % 2 === 0) {
        startInChunk = true;
      } else {
        startInChunk = false;
      }
    } else if (!placed) {
      placed = true;
      result += tag;
    }
  }
  if (chunk != null) {
    if (chunkCursor < chunkChars.length) {
      result += chunkChars.slice(chunkCursor);
    }
    for (index = chunkIndex + 1; index < chunks.length; index += 1) {
      result += index % 2 === 0 ? chunks[index] : "<".concat(chunks[index], ">");
    }
  }
  return result;
}

// node_modules/core-js/modules/es6.object.define-property.js
var $export5 = require_export();
$export5($export5.S + $export5.F * !require_descriptors(), "Object", { defineProperty: require_object_dp().f });

// node_modules/core-js/modules/es6.object.define-properties.js
var $export6 = require_export();
$export6($export6.S + $export6.F * !require_descriptors(), "Object", { defineProperties: require_object_dps() });

// node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var $export7 = require_export();
var ownKeys = require_own_keys();
var toIObject = require_to_iobject();
var gOPD = require_object_gopd();
var createProperty = require_create_property();
$export7($export7.S, "Object", {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys2 = ownKeys(O);
    var result = {};
    var i3 = 0;
    var key2, desc;
    while (keys2.length > i3) {
      desc = getDesc(O, key2 = keys2[i3++]);
      if (desc !== void 0) createProperty(result, key2, desc);
    }
    return result;
  }
});

// node_modules/core-js/modules/es6.array.for-each.js
var $export8 = require_export();
var $forEach = require_array_methods()(0);
var STRICT = require_strict_method()([].forEach, true);
$export8($export8.P + $export8.F * !STRICT, "Array", {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

// node_modules/core-js/modules/es6.array.filter.js
var $export9 = require_export();
var $filter = require_array_methods()(2);
$export9($export9.P + $export9.F * !require_strict_method()([].filter, true), "Array", {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

// node_modules/core-js/modules/es6.symbol.js
var global4 = require_global();
var has = require_has();
var DESCRIPTORS2 = require_descriptors();
var $export10 = require_export();
var redefine2 = require_redefine();
var META = require_meta().KEY;
var $fails = require_fails();
var shared = require_shared();
var setToStringTag = require_set_to_string_tag();
var uid = require_uid();
var wks2 = require_wks();
var wksExt = require_wks_ext();
var wksDefine = require_wks_define();
var enumKeys = require_enum_keys();
var isArray = require_is_array();
var anObject5 = require_an_object();
var isObject = require_is_object();
var toObject4 = require_to_object();
var toIObject2 = require_to_iobject();
var toPrimitive = require_to_primitive();
var createDesc = require_property_desc();
var _create = require_object_create();
var gOPNExt = require_object_gopn_ext();
var $GOPD = require_object_gopd();
var $GOPS = require_object_gops();
var $DP = require_object_dp();
var $keys2 = require_object_keys();
var gOPD2 = $GOPD.f;
var dP2 = $DP.f;
var gOPN2 = gOPNExt.f;
var $Symbol = global4.Symbol;
var $JSON = global4.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = "prototype";
var HIDDEN = wks2("_hidden");
var TO_PRIMITIVE = wks2("toPrimitive");
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared("symbol-registry");
var AllSymbols = shared("symbols");
var OPSymbols = shared("op-symbols");
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == "function" && !!$GOPS.f;
var QObject = global4.QObject;
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
var setSymbolDesc = DESCRIPTORS2 && $fails(function() {
  return _create(dP2({}, "a", {
    get: function() {
      return dP2(this, "a", { value: 7 }).a;
    }
  })).a != 7;
}) ? function(it, key2, D) {
  var protoDesc = gOPD2(ObjectProto, key2);
  if (protoDesc) delete ObjectProto[key2];
  dP2(it, key2, D);
  if (protoDesc && it !== ObjectProto) dP2(ObjectProto, key2, protoDesc);
} : dP2;
var wrap = function(tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};
var isSymbol = USE_NATIVE && typeof $Symbol.iterator == "symbol" ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  return it instanceof $Symbol;
};
var $defineProperty = function defineProperty(it, key2, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key2, D);
  anObject5(it);
  key2 = toPrimitive(key2, true);
  anObject5(D);
  if (has(AllSymbols, key2)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP2(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key2] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key2]) it[HIDDEN][key2] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    }
    return setSymbolDesc(it, key2, D);
  }
  return dP2(it, key2, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject5(it);
  var keys2 = enumKeys(P = toIObject2(P));
  var i3 = 0;
  var l = keys2.length;
  var key2;
  while (l > i3) $defineProperty(it, key2 = keys2[i3++], P[key2]);
  return it;
};
var $create = function create(it, P) {
  return P === void 0 ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key2) {
  var E = isEnum.call(this, key2 = toPrimitive(key2, true));
  if (this === ObjectProto && has(AllSymbols, key2) && !has(OPSymbols, key2)) return false;
  return E || !has(this, key2) || !has(AllSymbols, key2) || has(this, HIDDEN) && this[HIDDEN][key2] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key2) {
  it = toIObject2(it);
  key2 = toPrimitive(key2, true);
  if (it === ObjectProto && has(AllSymbols, key2) && !has(OPSymbols, key2)) return;
  var D = gOPD2(it, key2);
  if (D && has(AllSymbols, key2) && !(has(it, HIDDEN) && it[HIDDEN][key2])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN2(toIObject2(it));
  var result = [];
  var i3 = 0;
  var key2;
  while (names.length > i3) {
    if (!has(AllSymbols, key2 = names[i3++]) && key2 != HIDDEN && key2 != META) result.push(key2);
  }
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN2(IS_OP ? OPSymbols : toIObject2(it));
  var result = [];
  var i3 = 0;
  var key2;
  while (names.length > i3) {
    if (has(AllSymbols, key2 = names[i3++]) && (IS_OP ? has(ObjectProto, key2) : true)) result.push(AllSymbols[key2]);
  }
  return result;
};
if (!USE_NATIVE) {
  $Symbol = function Symbol2() {
    if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
    var tag = uid(arguments.length > 0 ? arguments[0] : void 0);
    var $set = function(value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS2 && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine2($Symbol[PROTOTYPE], "toString", function toString() {
    return this._k;
  });
  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require_object_gopn().f = gOPNExt.f = $getOwnPropertyNames;
  require_object_pie().f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;
  if (DESCRIPTORS2 && !require_library()) {
    redefine2(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, true);
  }
  wksExt.f = function(name) {
    return wrap(wks2(name));
  };
}
$export10($export10.G + $export10.W + $export10.F * !USE_NATIVE, { Symbol: $Symbol });
for (es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
"hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), j = 0; es6Symbols.length > j; ) wks2(es6Symbols[j++]);
var es6Symbols;
var j;
for (wellKnownSymbols = $keys2(wks2.store), k = 0; wellKnownSymbols.length > k; ) wksDefine(wellKnownSymbols[k++]);
var wellKnownSymbols;
var k;
$export10($export10.S + $export10.F * !USE_NATIVE, "Symbol", {
  // 19.4.2.1 Symbol.for(key)
  "for": function(key2) {
    return has(SymbolRegistry, key2 += "") ? SymbolRegistry[key2] : SymbolRegistry[key2] = $Symbol(key2);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol!");
    for (var key2 in SymbolRegistry) if (SymbolRegistry[key2] === sym) return key2;
  },
  useSetter: function() {
    setter = true;
  },
  useSimple: function() {
    setter = false;
  }
});
$export10($export10.S + $export10.F * !USE_NATIVE, "Object", {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});
var FAILS_ON_PRIMITIVES = $fails(function() {
  $GOPS.f(1);
});
$export10($export10.S + $export10.F * FAILS_ON_PRIMITIVES, "Object", {
  getOwnPropertySymbols: function getOwnPropertySymbols2(it) {
    return $GOPS.f(toObject4(it));
  }
});
$JSON && $export10($export10.S + $export10.F * (!USE_NATIVE || $fails(function() {
  var S = $Symbol();
  return _stringify([S]) != "[null]" || _stringify({ a: S }) != "{}" || _stringify(Object(S)) != "{}";
})), "JSON", {
  stringify: function stringify(it) {
    var args = [it];
    var i3 = 1;
    var replacer, $replacer;
    while (arguments.length > i3) args.push(arguments[i3++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === void 0 || isSymbol(it)) return;
    if (!isArray(replacer)) replacer = function(key2, value) {
      if (typeof $replacer == "function") value = $replacer.call(this, key2, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require_hide()($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
setToStringTag($Symbol, "Symbol");
setToStringTag(Math, "Math", true);
setToStringTag(global4.JSON, "JSON", true);

// node_modules/twitter-text/dist/esm/isInvalidTweet.js
var import_es6_array14 = __toESM(require_es6_array_iterator());

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive2(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i3 = e.call(t, r || "default");
    if ("object" != _typeof(i3)) return i3;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i3 = toPrimitive2(t, "string");
  return "symbol" == _typeof(i3) ? i3 : i3 + "";
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

// node_modules/twitter-text/dist/esm/isInvalidTweet.js
function ownKeys2(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = arguments[i3] != null ? arguments[i3] : {};
    if (i3 % 2) {
      ownKeys2(source, true).forEach(function(key2) {
        _defineProperty(target, key2, source[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(source).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
      });
    }
  }
  return target;
}
function isInvalidTweet_default(text) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : configs_default.defaults;
  if (!text) {
    return "empty";
  }
  var mergedOptions = _objectSpread({}, configs_default.defaults, {}, options);
  var maxLength = mergedOptions.maxWeightedTweetLength;
  if (getTweetLength_default(text, mergedOptions) > maxLength) {
    return "too_long";
  }
  if (hasInvalidCharacters_default(text)) {
    return "invalid_characters";
  }
  return false;
}

// node_modules/twitter-text/dist/esm/isValidHashtag.js
function isValidHashtag_default(hashtag) {
  if (!hashtag) {
    return false;
  }
  var extracted = extractHashtags_default(hashtag);
  return extracted.length === 1 && extracted[0] === hashtag.slice(1);
}

// node_modules/twitter-text/dist/esm/isValidList.js
var VALID_LIST_RE = regexSupplant_default(/^#{validMentionOrList}$/, {
  validMentionOrList: validMentionOrList_default
});
function isValidList_default(usernameList) {
  var match = usernameList.match(VALID_LIST_RE);
  return !!(match && match[1] == "" && match[4]);
}

// node_modules/twitter-text/dist/esm/isValidTweetText.js
function isValidTweetText_default(text, options) {
  return !isInvalidTweet_default(text, options);
}

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnreserved.js
var validateUrlUnreserved = /[a-z\u0400-\u04FF0-9\-._~]/i;
var validateUrlUnreserved_default = validateUrlUnreserved;

// node_modules/twitter-text/dist/esm/regexp/validateUrlPctEncoded.js
var validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i;
var validateUrlPctEncoded_default = validateUrlPctEncoded;

// node_modules/twitter-text/dist/esm/regexp/validateUrlSubDelims.js
var validateUrlSubDelims = /[!$&'()*+,;=]/i;
var validateUrlSubDelims_default = validateUrlSubDelims;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUserinfo.js
var validateUrlUserinfo = regexSupplant_default("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|:)*", {
  validateUrlUnreserved: validateUrlUnreserved_default,
  validateUrlPctEncoded: validateUrlPctEncoded_default,
  validateUrlSubDelims: validateUrlSubDelims_default
}, "i");
var validateUrlUserinfo_default = validateUrlUserinfo;

// node_modules/twitter-text/dist/esm/regexp/validateUrlDomainSegment.js
var validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i;
var validateUrlDomainSegment_default = validateUrlDomainSegment;

// node_modules/twitter-text/dist/esm/regexp/validateUrlDomainTld.js
var validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i;
var validateUrlDomainTld_default = validateUrlDomainTld;

// node_modules/twitter-text/dist/esm/regexp/validateUrlSubDomainSegment.js
var validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i;
var validateUrlSubDomainSegment_default = validateUrlSubDomainSegment;

// node_modules/twitter-text/dist/esm/regexp/validateUrlDomain.js
var validateUrlDomain = regexSupplant_default(/(?:(?:#{validateUrlSubDomainSegment}\.)*(?:#{validateUrlDomainSegment}\.)#{validateUrlDomainTld})/i, {
  validateUrlSubDomainSegment: validateUrlSubDomainSegment_default,
  validateUrlDomainSegment: validateUrlDomainSegment_default,
  validateUrlDomainTld: validateUrlDomainTld_default
});
var validateUrlDomain_default = validateUrlDomain;

// node_modules/twitter-text/dist/esm/regexp/validateUrlDecOctet.js
var validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i;
var validateUrlDecOctet_default = validateUrlDecOctet;

// node_modules/twitter-text/dist/esm/regexp/validateUrlIpv4.js
var validateUrlIpv4 = regexSupplant_default(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i, {
  validateUrlDecOctet: validateUrlDecOctet_default
});
var validateUrlIpv4_default = validateUrlIpv4;

// node_modules/twitter-text/dist/esm/regexp/validateUrlIpv6.js
var validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i;
var validateUrlIpv6_default = validateUrlIpv6;

// node_modules/twitter-text/dist/esm/regexp/validateUrlIp.js
var validateUrlIp = regexSupplant_default("(?:#{validateUrlIpv4}|#{validateUrlIpv6})", {
  validateUrlIpv4: validateUrlIpv4_default,
  validateUrlIpv6: validateUrlIpv6_default
}, "i");
var validateUrlIp_default = validateUrlIp;

// node_modules/twitter-text/dist/esm/regexp/validateUrlHost.js
var validateUrlHost = regexSupplant_default("(?:#{validateUrlIp}|#{validateUrlDomain})", {
  validateUrlIp: validateUrlIp_default,
  validateUrlDomain: validateUrlDomain_default
}, "i");
var validateUrlHost_default = validateUrlHost;

// node_modules/twitter-text/dist/esm/regexp/validateUrlPort.js
var validateUrlPort = /[0-9]{1,5}/;
var validateUrlPort_default = validateUrlPort;

// node_modules/twitter-text/dist/esm/regexp/validateUrlAuthority.js
var validateUrlAuthority = regexSupplant_default(
  // $1 userinfo
  "(?:(#{validateUrlUserinfo})@)?(#{validateUrlHost})(?::(#{validateUrlPort}))?",
  {
    validateUrlUserinfo: validateUrlUserinfo_default,
    validateUrlHost: validateUrlHost_default,
    validateUrlPort: validateUrlPort_default
  },
  "i"
);
var validateUrlAuthority_default = validateUrlAuthority;

// node_modules/twitter-text/dist/esm/regexp/validateUrlPchar.js
var validateUrlPchar = regexSupplant_default("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|[:|@])", {
  validateUrlUnreserved: validateUrlUnreserved_default,
  validateUrlPctEncoded: validateUrlPctEncoded_default,
  validateUrlSubDelims: validateUrlSubDelims_default
}, "i");
var validateUrlPchar_default = validateUrlPchar;

// node_modules/twitter-text/dist/esm/regexp/validateUrlFragment.js
var validateUrlFragment = regexSupplant_default(/(#{validateUrlPchar}|\/|\?)*/i, {
  validateUrlPchar: validateUrlPchar_default
});
var validateUrlFragment_default = validateUrlFragment;

// node_modules/twitter-text/dist/esm/regexp/validateUrlPath.js
var validateUrlPath = regexSupplant_default(/(\/#{validateUrlPchar}*)*/i, {
  validateUrlPchar: validateUrlPchar_default
});
var validateUrlPath_default = validateUrlPath;

// node_modules/twitter-text/dist/esm/regexp/validateUrlQuery.js
var validateUrlQuery = regexSupplant_default(/(#{validateUrlPchar}|\/|\?)*/i, {
  validateUrlPchar: validateUrlPchar_default
});
var validateUrlQuery_default = validateUrlQuery;

// node_modules/twitter-text/dist/esm/regexp/validateUrlScheme.js
var validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i;
var validateUrlScheme_default = validateUrlScheme;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnencoded.js
var validateUrlUnencoded = regexSupplant_default("^(?:([^:/?#]+):\\/\\/)?([^/?#]*)([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$", "i");
var validateUrlUnencoded_default = validateUrlUnencoded;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnicodeSubDomainSegment.js
var validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
var validateUrlUnicodeSubDomainSegment_default = validateUrlUnicodeSubDomainSegment;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnicodeDomainSegment.js
var validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
var validateUrlUnicodeDomainSegment_default = validateUrlUnicodeDomainSegment;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnicodeDomainTld.js
var validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
var validateUrlUnicodeDomainTld_default = validateUrlUnicodeDomainTld;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnicodeDomain.js
var validateUrlUnicodeDomain = regexSupplant_default(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i, {
  validateUrlUnicodeSubDomainSegment: validateUrlUnicodeSubDomainSegment_default,
  validateUrlUnicodeDomainSegment: validateUrlUnicodeDomainSegment_default,
  validateUrlUnicodeDomainTld: validateUrlUnicodeDomainTld_default
});
var validateUrlUnicodeDomain_default = validateUrlUnicodeDomain;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnicodeHost.js
var validateUrlUnicodeHost = regexSupplant_default("(?:#{validateUrlIp}|#{validateUrlUnicodeDomain})", {
  validateUrlIp: validateUrlIp_default,
  validateUrlUnicodeDomain: validateUrlUnicodeDomain_default
}, "i");
var validateUrlUnicodeHost_default = validateUrlUnicodeHost;

// node_modules/twitter-text/dist/esm/regexp/validateUrlUnicodeAuthority.js
var validateUrlUnicodeAuthority = regexSupplant_default(
  // $1 userinfo
  "(?:(#{validateUrlUserinfo})@)?(#{validateUrlUnicodeHost})(?::(#{validateUrlPort}))?",
  {
    validateUrlUserinfo: validateUrlUserinfo_default,
    validateUrlUnicodeHost: validateUrlUnicodeHost_default,
    validateUrlPort: validateUrlPort_default
  },
  "i"
);
var validateUrlUnicodeAuthority_default = validateUrlUnicodeAuthority;

// node_modules/twitter-text/dist/esm/isValidUrl.js
function isValidMatch(string, regex, optional) {
  if (!optional) {
    return typeof string === "string" && string.match(regex) && RegExp["$&"] === string;
  }
  return !string || string.match(regex) && RegExp["$&"] === string;
}
function isValidUrl_default(url, unicodeDomains, requireProtocol) {
  if (unicodeDomains == null) {
    unicodeDomains = true;
  }
  if (requireProtocol == null) {
    requireProtocol = true;
  }
  if (!url) {
    return false;
  }
  var urlParts = url.match(validateUrlUnencoded_default);
  if (!urlParts || urlParts[0] !== url) {
    return false;
  }
  var scheme = urlParts[1], authority = urlParts[2], path = urlParts[3], query = urlParts[4], fragment = urlParts[5];
  if (!((!requireProtocol || isValidMatch(scheme, validateUrlScheme_default) && scheme.match(/^https?$/i)) && isValidMatch(path, validateUrlPath_default) && isValidMatch(query, validateUrlQuery_default, true) && isValidMatch(fragment, validateUrlFragment_default, true))) {
    return false;
  }
  return unicodeDomains && isValidMatch(authority, validateUrlUnicodeAuthority_default) || !unicodeDomains && isValidMatch(authority, validateUrlAuthority_default);
}

// node_modules/twitter-text/dist/esm/isValidUsername.js
function isValidUsername_default(username) {
  if (!username) {
    return false;
  }
  var extracted = extractMentions_default(username);
  return extracted.length === 1 && extracted[0] === username.slice(1);
}

// node_modules/twitter-text/dist/esm/regexp/index.js
var regexp_default = {
  astralLetterAndMarks: astralLetterAndMarks_default,
  astralNumerals: astralNumerals_default,
  atSigns: atSigns_default,
  bmpLetterAndMarks: bmpLetterAndMarks_default,
  bmpNumerals: bmpNumerals_default,
  cashtag: cashtag_default,
  codePoint: codePoint_default,
  cyrillicLettersAndMarks: cyrillicLettersAndMarks_default,
  endHashtagMatch: endHashtagMatch_default,
  endMentionMatch: endMentionMatch_default,
  extractUrl: extractUrl_default,
  hashSigns: hashSigns_default,
  hashtagAlpha: hashtagAlpha_default,
  hashtagAlphaNumeric: hashtagAlphaNumeric_default,
  hashtagBoundary: hashtagBoundary_default,
  hashtagSpecialChars: hashtagSpecialChars_default,
  invalidChars: invalidChars_default,
  invalidCharsGroup: invalidCharsGroup_default,
  invalidDomainChars: invalidDomainChars_default,
  invalidUrlWithoutProtocolPrecedingChars: invalidUrlWithoutProtocolPrecedingChars_default,
  latinAccentChars: latinAccentChars_default,
  nonBmpCodePairs: nonBmpCodePairs_default,
  punct: punct_default,
  rtlChars: rtlChars_default,
  spaces: spaces_default,
  spacesGroup: spacesGroup_default,
  urlHasHttps: urlHasHttps_default,
  urlHasProtocol: urlHasProtocol_default,
  validAsciiDomain: validAsciiDomain_default,
  validateUrlAuthority: validateUrlAuthority_default,
  validateUrlDecOctet: validateUrlDecOctet_default,
  validateUrlDomain: validateUrlDomain_default,
  validateUrlDomainSegment: validateUrlDomainSegment_default,
  validateUrlDomainTld: validateUrlDomainTld_default,
  validateUrlFragment: validateUrlFragment_default,
  validateUrlHost: validateUrlHost_default,
  validateUrlIp: validateUrlIp_default,
  validateUrlIpv4: validateUrlIpv4_default,
  validateUrlIpv6: validateUrlIpv6_default,
  validateUrlPath: validateUrlPath_default,
  validateUrlPchar: validateUrlPchar_default,
  validateUrlPctEncoded: validateUrlPctEncoded_default,
  validateUrlPort: validateUrlPort_default,
  validateUrlQuery: validateUrlQuery_default,
  validateUrlScheme: validateUrlScheme_default,
  validateUrlSubDelims: validateUrlSubDelims_default,
  validateUrlSubDomainSegment: validateUrlSubDomainSegment_default,
  validateUrlUnencoded: validateUrlUnencoded_default,
  validateUrlUnicodeAuthority: validateUrlUnicodeAuthority_default,
  validateUrlUnicodeDomain: validateUrlUnicodeDomain_default,
  validateUrlUnicodeDomainSegment: validateUrlUnicodeDomainSegment_default,
  validateUrlUnicodeDomainTld: validateUrlUnicodeDomainTld_default,
  validateUrlUnicodeHost: validateUrlUnicodeHost_default,
  validateUrlUnicodeSubDomainSegment: validateUrlUnicodeSubDomainSegment_default,
  validateUrlUnreserved: validateUrlUnreserved_default,
  validateUrlUserinfo: validateUrlUserinfo_default,
  validCashtag: validCashtag_default,
  validCCTLD: validCCTLD_default,
  validDomain: validDomain_default,
  validDomainChars: validDomainChars_default,
  validDomainName: validDomainName_default,
  validGeneralUrlPathChars: validGeneralUrlPathChars_default,
  validGTLD: validGTLD_default,
  validHashtag: validHashtag_default,
  validMentionOrList: validMentionOrList_default,
  validMentionPrecedingChars: validMentionPrecedingChars_default,
  validPortNumber: validPortNumber_default,
  validPunycode: validPunycode_default,
  validReply: validReply_default,
  validSubdomain: validSubdomain_default,
  validTcoUrl: validTcoUrl_default,
  validUrlBalancedParens: validUrlBalancedParens_default,
  validUrlPath: validUrlPath_default,
  validUrlPathEndingChars: validUrlPathEndingChars_default,
  validUrlPrecedingChars: validUrlPrecedingChars_default,
  validUrlQueryChars: validUrlQueryChars_default,
  validUrlQueryEndingChars: validUrlQueryEndingChars_default
};

// node_modules/core-js/modules/es6.string.iterator.js
var $at = require_string_at()(true);
require_iter_define()(String, "String", function(iterated) {
  this._t = String(iterated);
  this._i = 0;
}, function() {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: void 0, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// node_modules/core-js/modules/es6.array.from.js
var ctx = require_ctx();
var $export11 = require_export();
var toObject5 = require_to_object();
var call = require_iter_call();
var isArrayIter = require_is_array_iter();
var toLength4 = require_to_length();
var createProperty2 = require_create_property();
var getIterFn = require_core_get_iterator_method();
$export11($export11.S + $export11.F * !require_iter_detect()(function(iter) {
  Array.from(iter);
}), "Array", {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike) {
    var O = toObject5(arrayLike);
    var C = typeof this == "function" ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : void 0;
    var mapping = mapfn !== void 0;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : void 0, 2);
    if (iterFn != void 0 && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty2(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength4(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty2(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

// node_modules/twitter-text/dist/esm/standardizeIndices.js
function standardizeIndices(text, startIndex, endIndex) {
  var totalUnicodeTextLength = getUnicodeTextLength_default(text);
  var encodingDiff = text.length - totalUnicodeTextLength;
  if (encodingDiff > 0) {
    var byCodePair = Array.from(text);
    var beforeText = startIndex === 0 ? "" : byCodePair.slice(0, startIndex).join("");
    var actualText = byCodePair.slice(startIndex, endIndex).join("");
    return [beforeText.length, beforeText.length + actualText.length];
  }
  return [startIndex, endIndex];
}

// node_modules/twitter-text/dist/esm/index.js
var esm_default = {
  autoLink: autoLink_default,
  autoLinkCashtags: autoLinkCashtags_default,
  autoLinkEntities: autoLinkEntities_default,
  autoLinkHashtags: autoLinkHashtags_default,
  autoLinkUrlsCustom: autoLinkUrlsCustom_default,
  autoLinkUsernamesOrLists: autoLinkUsernamesOrLists_default,
  autoLinkWithJSON: autoLinkWithJSON_default,
  configs: configs_default,
  convertUnicodeIndices: convertUnicodeIndices_default2,
  extractCashtags: extractCashtags_default,
  extractCashtagsWithIndices: extractCashtagsWithIndices_default,
  extractEntitiesWithIndices: extractEntitiesWithIndices_default,
  extractHashtags: extractHashtags_default,
  extractHashtagsWithIndices: extractHashtagsWithIndices_default,
  extractHtmlAttrsFromOptions: extractHtmlAttrsFromOptions_default,
  extractMentions: extractMentions_default,
  extractMentionsOrListsWithIndices: extractMentionsOrListsWithIndices_default,
  extractMentionsWithIndices: extractMentionsWithIndices_default,
  extractReplies: extractReplies_default,
  extractUrls: extractUrls_default,
  extractUrlsWithIndices: extractUrlsWithIndices_default,
  getTweetLength: getTweetLength_default,
  getUnicodeTextLength: getUnicodeTextLength_default,
  hasInvalidCharacters: hasInvalidCharacters_default,
  hitHighlight: hitHighlight_default,
  htmlEscape: htmlEscape_default,
  isInvalidTweet: isInvalidTweet_default,
  isValidHashtag: isValidHashtag_default,
  isValidList: isValidList_default,
  isValidTweetText: isValidTweetText_default,
  isValidUrl: isValidUrl_default,
  isValidUsername: isValidUsername_default,
  linkTextWithEntity: linkTextWithEntity_default,
  linkToCashtag: linkToCashtag_default,
  linkToHashtag: linkToHashtag_default,
  linkToMentionAndList: linkToMentionAndList_default,
  linkToText: linkToText_default,
  linkToTextWithSymbol: linkToTextWithSymbol_default,
  linkToUrl: linkToUrl_default,
  modifyIndicesFromUTF16ToUnicode: modifyIndicesFromUTF16ToUnicode_default,
  modifyIndicesFromUnicodeToUTF16: modifyIndicesFromUnicodeToUTF16_default,
  regexen: regexp_default,
  removeOverlappingEntities: removeOverlappingEntities_default,
  parseTweet: parseTweet_default,
  splitTags: splitTags_default,
  standardizeIndices,
  tagAttrs: tagAttrs_default
};

// lib/count.js
var LIMITS = {
  standard: 280,
  premium: 25e3
};
function xCount(text) {
  return esm_default.parseTweet(String(text ?? "")).weightedLength;
}
export {
  LIMITS,
  xCount
};
