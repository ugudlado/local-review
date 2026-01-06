(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = n(i);
    fetch(i.href, l);
  }
})();
var dl =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function fs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ff = { exports: {} },
  Ul = {},
  Of = { exports: {} },
  ee = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yi = Symbol.for("react.element"),
  am = Symbol.for("react.portal"),
  cm = Symbol.for("react.fragment"),
  fm = Symbol.for("react.strict_mode"),
  pm = Symbol.for("react.profiler"),
  dm = Symbol.for("react.provider"),
  hm = Symbol.for("react.context"),
  mm = Symbol.for("react.forward_ref"),
  gm = Symbol.for("react.suspense"),
  ym = Symbol.for("react.memo"),
  xm = Symbol.for("react.lazy"),
  La = Symbol.iterator;
function km(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (La && e[La]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Mf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Bf = Object.assign,
  $f = {};
function vr(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = $f),
    (this.updater = n || Mf));
}
vr.prototype.isReactComponent = {};
vr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
vr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Uf() {}
Uf.prototype = vr.prototype;
function ps(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = $f),
    (this.updater = n || Mf));
}
var ds = (ps.prototype = new Uf());
ds.constructor = ps;
Bf(ds, vr.prototype);
ds.isPureReactComponent = !0;
var Ta = Array.isArray,
  Hf = Object.prototype.hasOwnProperty,
  hs = { current: null },
  Vf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Wf(e, t, n) {
  var r,
    i = {},
    l = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (l = "" + t.key),
    t))
      Hf.call(t, r) && !Vf.hasOwnProperty(r) && (i[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) i.children = n;
  else if (1 < u) {
    for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
    i.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) i[r] === void 0 && (i[r] = u[r]);
  return {
    $$typeof: yi,
    type: e,
    key: l,
    ref: o,
    props: i,
    _owner: hs.current,
  };
}
function vm(e, t) {
  return {
    $$typeof: yi,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ms(e) {
  return typeof e == "object" && e !== null && e.$$typeof === yi;
}
function wm(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var _a = /\/+/g;
function po(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? wm("" + e.key)
    : t.toString(36);
}
function Ji(e, t, n, r, i) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (l) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case yi:
          case am:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (i = i(o)),
      (e = r === "" ? "." + po(o, 0) : r),
      Ta(i)
        ? ((n = ""),
          e != null && (n = e.replace(_a, "$&/") + "/"),
          Ji(i, t, n, "", function (a) {
            return a;
          }))
        : i != null &&
          (ms(i) &&
            (i = vm(
              i,
              n +
                (!i.key || (o && o.key === i.key)
                  ? ""
                  : ("" + i.key).replace(_a, "$&/") + "/") +
                e,
            )),
          t.push(i)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Ta(e)))
    for (var u = 0; u < e.length; u++) {
      l = e[u];
      var s = r + po(l, u);
      o += Ji(l, t, n, s, i);
    }
  else if (((s = km(e)), typeof s == "function"))
    for (e = s.call(e), u = 0; !(l = e.next()).done; )
      ((l = l.value), (s = r + po(l, u++)), (o += Ji(l, t, n, s, i)));
  else if (l === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return o;
}
function Ii(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Ji(e, r, "", "", function (l) {
      return t.call(n, l, i++);
    }),
    r
  );
}
function Sm(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ue = { current: null },
  el = { transition: null },
  Cm = {
    ReactCurrentDispatcher: Ue,
    ReactCurrentBatchConfig: el,
    ReactCurrentOwner: hs,
  };
function Qf() {
  throw Error("act(...) is not supported in production builds of React.");
}
ee.Children = {
  map: Ii,
  forEach: function (e, t, n) {
    Ii(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Ii(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Ii(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ms(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
ee.Component = vr;
ee.Fragment = cm;
ee.Profiler = pm;
ee.PureComponent = ps;
ee.StrictMode = fm;
ee.Suspense = gm;
ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cm;
ee.act = Qf;
ee.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = Bf({}, e.props),
    i = e.key,
    l = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((l = t.ref), (o = hs.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (s in t)
      Hf.call(t, s) &&
        !Vf.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
    r.children = u;
  }
  return { $$typeof: yi, type: e.type, key: i, ref: l, props: r, _owner: o };
};
ee.createContext = function (e) {
  return (
    (e = {
      $$typeof: hm,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: dm, _context: e }),
    (e.Consumer = e)
  );
};
ee.createElement = Wf;
ee.createFactory = function (e) {
  var t = Wf.bind(null, e);
  return ((t.type = e), t);
};
ee.createRef = function () {
  return { current: null };
};
ee.forwardRef = function (e) {
  return { $$typeof: mm, render: e };
};
ee.isValidElement = ms;
ee.lazy = function (e) {
  return { $$typeof: xm, _payload: { _status: -1, _result: e }, _init: Sm };
};
ee.memo = function (e, t) {
  return { $$typeof: ym, type: e, compare: t === void 0 ? null : t };
};
ee.startTransition = function (e) {
  var t = el.transition;
  el.transition = {};
  try {
    e();
  } finally {
    el.transition = t;
  }
};
ee.unstable_act = Qf;
ee.useCallback = function (e, t) {
  return Ue.current.useCallback(e, t);
};
ee.useContext = function (e) {
  return Ue.current.useContext(e);
};
ee.useDebugValue = function () {};
ee.useDeferredValue = function (e) {
  return Ue.current.useDeferredValue(e);
};
ee.useEffect = function (e, t) {
  return Ue.current.useEffect(e, t);
};
ee.useId = function () {
  return Ue.current.useId();
};
ee.useImperativeHandle = function (e, t, n) {
  return Ue.current.useImperativeHandle(e, t, n);
};
ee.useInsertionEffect = function (e, t) {
  return Ue.current.useInsertionEffect(e, t);
};
ee.useLayoutEffect = function (e, t) {
  return Ue.current.useLayoutEffect(e, t);
};
ee.useMemo = function (e, t) {
  return Ue.current.useMemo(e, t);
};
ee.useReducer = function (e, t, n) {
  return Ue.current.useReducer(e, t, n);
};
ee.useRef = function (e) {
  return Ue.current.useRef(e);
};
ee.useState = function (e) {
  return Ue.current.useState(e);
};
ee.useSyncExternalStore = function (e, t, n) {
  return Ue.current.useSyncExternalStore(e, t, n);
};
ee.useTransition = function () {
  return Ue.current.useTransition();
};
ee.version = "18.3.1";
Of.exports = ee;
var B = Of.exports;
const Em = fs(B);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bm = B,
  Nm = Symbol.for("react.element"),
  Pm = Symbol.for("react.fragment"),
  Lm = Object.prototype.hasOwnProperty,
  Tm = bm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  _m = { key: !0, ref: !0, __self: !0, __source: !0 };
function qf(e, t, n) {
  var r,
    i = {},
    l = null,
    o = null;
  (n !== void 0 && (l = "" + n),
    t.key !== void 0 && (l = "" + t.key),
    t.ref !== void 0 && (o = t.ref));
  for (r in t) Lm.call(t, r) && !_m.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Nm,
    type: e,
    key: l,
    ref: o,
    props: i,
    _owner: Tm.current,
  };
}
Ul.Fragment = Pm;
Ul.jsx = qf;
Ul.jsxs = qf;
Ff.exports = Ul;
var v = Ff.exports,
  ru = {},
  Kf = { exports: {} },
  it = {},
  Yf = { exports: {} },
  Xf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(R, $) {
    var x = R.length;
    R.push($);
    e: for (; 0 < x; ) {
      var Y = (x - 1) >>> 1,
        q = R[Y];
      if (0 < i(q, $)) ((R[Y] = $), (R[x] = q), (x = Y));
      else break e;
    }
  }
  function n(R) {
    return R.length === 0 ? null : R[0];
  }
  function r(R) {
    if (R.length === 0) return null;
    var $ = R[0],
      x = R.pop();
    if (x !== $) {
      R[0] = x;
      e: for (var Y = 0, q = R.length, w = q >>> 1; Y < w; ) {
        var K = 2 * (Y + 1) - 1,
          he = R[K],
          se = K + 1,
          ot = R[se];
        if (0 > i(he, x))
          se < q && 0 > i(ot, he)
            ? ((R[Y] = ot), (R[se] = x), (Y = se))
            : ((R[Y] = he), (R[K] = x), (Y = K));
        else if (se < q && 0 > i(ot, x)) ((R[Y] = ot), (R[se] = x), (Y = se));
        else break e;
      }
    }
    return $;
  }
  function i(R, $) {
    var x = R.sortIndex - $.sortIndex;
    return x !== 0 ? x : R.id - $.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var o = Date,
      u = o.now();
    e.unstable_now = function () {
      return o.now() - u;
    };
  }
  var s = [],
    a = [],
    f = 1,
    c = null,
    d = 3,
    p = !1,
    m = !1,
    k = !1,
    P = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(R) {
    for (var $ = n(a); $ !== null; ) {
      if ($.callback === null) r(a);
      else if ($.startTime <= R)
        (r(a), ($.sortIndex = $.expirationTime), t(s, $));
      else break;
      $ = n(a);
    }
  }
  function E(R) {
    if (((k = !1), y(R), !m))
      if (n(s) !== null) ((m = !0), ie(b));
      else {
        var $ = n(a);
        $ !== null && le(E, $.startTime - R);
      }
  }
  function b(R, $) {
    ((m = !1), k && ((k = !1), h(_), (_ = -1)), (p = !0));
    var x = d;
    try {
      for (
        y($), c = n(s);
        c !== null && (!(c.expirationTime > $) || (R && !j()));

      ) {
        var Y = c.callback;
        if (typeof Y == "function") {
          ((c.callback = null), (d = c.priorityLevel));
          var q = Y(c.expirationTime <= $);
          (($ = e.unstable_now()),
            typeof q == "function" ? (c.callback = q) : c === n(s) && r(s),
            y($));
        } else r(s);
        c = n(s);
      }
      if (c !== null) var w = !0;
      else {
        var K = n(a);
        (K !== null && le(E, K.startTime - $), (w = !1));
      }
      return w;
    } finally {
      ((c = null), (d = x), (p = !1));
    }
  }
  var S = !1,
    T = null,
    _ = -1,
    D = 5,
    C = -1;
  function j() {
    return !(e.unstable_now() - C < D);
  }
  function F() {
    if (T !== null) {
      var R = e.unstable_now();
      C = R;
      var $ = !0;
      try {
        $ = T(!0, R);
      } finally {
        $ ? U() : ((S = !1), (T = null));
      }
    } else S = !1;
  }
  var U;
  if (typeof g == "function")
    U = function () {
      g(F);
    };
  else if (typeof MessageChannel < "u") {
    var Z = new MessageChannel(),
      V = Z.port2;
    ((Z.port1.onmessage = F),
      (U = function () {
        V.postMessage(null);
      }));
  } else
    U = function () {
      P(F, 0);
    };
  function ie(R) {
    ((T = R), S || ((S = !0), U()));
  }
  function le(R, $) {
    _ = P(function () {
      R(e.unstable_now());
    }, $);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (R) {
      R.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      m || p || ((m = !0), ie(b));
    }),
    (e.unstable_forceFrameRate = function (R) {
      0 > R || 125 < R
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (D = 0 < R ? Math.floor(1e3 / R) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (R) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = d;
      }
      var x = d;
      d = $;
      try {
        return R();
      } finally {
        d = x;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (R, $) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          R = 3;
      }
      var x = d;
      d = R;
      try {
        return $();
      } finally {
        d = x;
      }
    }),
    (e.unstable_scheduleCallback = function (R, $, x) {
      var Y = e.unstable_now();
      switch (
        (typeof x == "object" && x !== null
          ? ((x = x.delay), (x = typeof x == "number" && 0 < x ? Y + x : Y))
          : (x = Y),
        R)
      ) {
        case 1:
          var q = -1;
          break;
        case 2:
          q = 250;
          break;
        case 5:
          q = 1073741823;
          break;
        case 4:
          q = 1e4;
          break;
        default:
          q = 5e3;
      }
      return (
        (q = x + q),
        (R = {
          id: f++,
          callback: $,
          priorityLevel: R,
          startTime: x,
          expirationTime: q,
          sortIndex: -1,
        }),
        x > Y
          ? ((R.sortIndex = x),
            t(a, R),
            n(s) === null &&
              R === n(a) &&
              (k ? (h(_), (_ = -1)) : (k = !0), le(E, x - Y)))
          : ((R.sortIndex = q), t(s, R), m || p || ((m = !0), ie(b))),
        R
      );
    }),
    (e.unstable_shouldYield = j),
    (e.unstable_wrapCallback = function (R) {
      var $ = d;
      return function () {
        var x = d;
        d = $;
        try {
          return R.apply(this, arguments);
        } finally {
          d = x;
        }
      };
    }));
})(Xf);
Yf.exports = Xf;
var zm = Yf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Im = B,
  rt = zm;
function z(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Gf = new Set(),
  Zr = {};
function Bn(e, t) {
  (pr(e, t), pr(e + "Capture", t));
}
function pr(e, t) {
  for (Zr[e] = t, e = 0; e < t.length; e++) Gf.add(t[e]);
}
var Qt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  iu = Object.prototype.hasOwnProperty,
  jm =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  za = {},
  Ia = {};
function Dm(e) {
  return iu.call(Ia, e)
    ? !0
    : iu.call(za, e)
      ? !1
      : jm.test(e)
        ? (Ia[e] = !0)
        : ((za[e] = !0), !1);
}
function Am(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Rm(e, t, n, r) {
  if (t === null || typeof t > "u" || Am(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function He(e, t, n, r, i, l, o) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = o));
}
var Te = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Te[e] = new He(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Te[t] = new He(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Te[e] = new He(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Te[e] = new He(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Te[e] = new He(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Te[e] = new He(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Te[e] = new He(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Te[e] = new He(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Te[e] = new He(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var gs = /[\-:]([a-z])/g;
function ys(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(gs, ys);
    Te[t] = new He(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(gs, ys);
    Te[t] = new He(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(gs, ys);
  Te[t] = new He(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Te[e] = new He(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Te.xlinkHref = new He(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Te[e] = new He(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function xs(e, t, n, r) {
  var i = Te.hasOwnProperty(t) ? Te[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Rm(t, n, i, r) && (n = null),
    r || i === null
      ? Dm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((i = i.type),
              (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Xt = Im.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ji = Symbol.for("react.element"),
  qn = Symbol.for("react.portal"),
  Kn = Symbol.for("react.fragment"),
  ks = Symbol.for("react.strict_mode"),
  lu = Symbol.for("react.profiler"),
  Zf = Symbol.for("react.provider"),
  Jf = Symbol.for("react.context"),
  vs = Symbol.for("react.forward_ref"),
  ou = Symbol.for("react.suspense"),
  uu = Symbol.for("react.suspense_list"),
  ws = Symbol.for("react.memo"),
  nn = Symbol.for("react.lazy"),
  ep = Symbol.for("react.offscreen"),
  ja = Symbol.iterator;
function Nr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ja && e[ja]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var xe = Object.assign,
  ho;
function Rr(e) {
  if (ho === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ho = (t && t[1]) || "";
    }
  return (
    `
` +
    ho +
    e
  );
}
var mo = !1;
function go(e, t) {
  if (!e || mo) return "";
  mo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (a) {
          r = a;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var i = a.stack.split(`
`),
          l = r.stack.split(`
`),
          o = i.length - 1,
          u = l.length - 1;
        1 <= o && 0 <= u && i[o] !== l[u];

      )
        u--;
      for (; 1 <= o && 0 <= u; o--, u--)
        if (i[o] !== l[u]) {
          if (o !== 1 || u !== 1)
            do
              if ((o--, u--, 0 > u || i[o] !== l[u])) {
                var s =
                  `
` + i[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= o && 0 <= u);
          break;
        }
    }
  } finally {
    ((mo = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Rr(e) : "";
}
function Fm(e) {
  switch (e.tag) {
    case 5:
      return Rr(e.type);
    case 16:
      return Rr("Lazy");
    case 13:
      return Rr("Suspense");
    case 19:
      return Rr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = go(e.type, !1)), e);
    case 11:
      return ((e = go(e.type.render, !1)), e);
    case 1:
      return ((e = go(e.type, !0)), e);
    default:
      return "";
  }
}
function su(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Kn:
      return "Fragment";
    case qn:
      return "Portal";
    case lu:
      return "Profiler";
    case ks:
      return "StrictMode";
    case ou:
      return "Suspense";
    case uu:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Jf:
        return (e.displayName || "Context") + ".Consumer";
      case Zf:
        return (e._context.displayName || "Context") + ".Provider";
      case vs:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ws:
        return (
          (t = e.displayName || null),
          t !== null ? t : su(e.type) || "Memo"
        );
      case nn:
        ((t = e._payload), (e = e._init));
        try {
          return su(e(t));
        } catch {}
    }
  return null;
}
function Om(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return su(t);
    case 8:
      return t === ks ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function yn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function tp(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Mm(e) {
  var t = tp(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      l = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (o) {
          ((r = "" + o), l.call(this, o));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Di(e) {
  e._valueTracker || (e._valueTracker = Mm(e));
}
function np(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = tp(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function hl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function au(e, t) {
  var n = t.checked;
  return xe({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Da(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = yn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function rp(e, t) {
  ((t = t.checked), t != null && xs(e, "checked", t, !1));
}
function cu(e, t) {
  rp(e, t);
  var n = yn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? fu(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && fu(e, t.type, yn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Aa(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function fu(e, t, n) {
  (t !== "number" || hl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Fr = Array.isArray;
function lr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      ((i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + yn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function pu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(z(91));
  return xe({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ra(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(z(92));
      if (Fr(n)) {
        if (1 < n.length) throw Error(z(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: yn(n) };
}
function ip(e, t) {
  var n = yn(t.value),
    r = yn(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function Fa(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function lp(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function du(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? lp(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Ai,
  op = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Ai = Ai || document.createElement("div"),
          Ai.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ai.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Jr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Br = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Bm = ["Webkit", "ms", "Moz", "O"];
Object.keys(Br).forEach(function (e) {
  Bm.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Br[t] = Br[e]));
  });
});
function up(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Br.hasOwnProperty(e) && Br[e])
      ? ("" + t).trim()
      : t + "px";
}
function sp(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = up(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i));
    }
}
var $m = xe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function hu(e, t) {
  if (t) {
    if ($m[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(z(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(z(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(z(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(z(62));
  }
}
function mu(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var gu = null;
function Ss(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var yu = null,
  or = null,
  ur = null;
function Oa(e) {
  if ((e = vi(e))) {
    if (typeof yu != "function") throw Error(z(280));
    var t = e.stateNode;
    t && ((t = ql(t)), yu(e.stateNode, e.type, t));
  }
}
function ap(e) {
  or ? (ur ? ur.push(e) : (ur = [e])) : (or = e);
}
function cp() {
  if (or) {
    var e = or,
      t = ur;
    if (((ur = or = null), Oa(e), t)) for (e = 0; e < t.length; e++) Oa(t[e]);
  }
}
function fp(e, t) {
  return e(t);
}
function pp() {}
var yo = !1;
function dp(e, t, n) {
  if (yo) return e(t, n);
  yo = !0;
  try {
    return fp(e, t, n);
  } finally {
    ((yo = !1), (or !== null || ur !== null) && (pp(), cp()));
  }
}
function ei(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ql(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(z(231, t, typeof n));
  return n;
}
var xu = !1;
if (Qt)
  try {
    var Pr = {};
    (Object.defineProperty(Pr, "passive", {
      get: function () {
        xu = !0;
      },
    }),
      window.addEventListener("test", Pr, Pr),
      window.removeEventListener("test", Pr, Pr));
  } catch {
    xu = !1;
  }
function Um(e, t, n, r, i, l, o, u, s) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (f) {
    this.onError(f);
  }
}
var $r = !1,
  ml = null,
  gl = !1,
  ku = null,
  Hm = {
    onError: function (e) {
      (($r = !0), (ml = e));
    },
  };
function Vm(e, t, n, r, i, l, o, u, s) {
  (($r = !1), (ml = null), Um.apply(Hm, arguments));
}
function Wm(e, t, n, r, i, l, o, u, s) {
  if ((Vm.apply(this, arguments), $r)) {
    if ($r) {
      var a = ml;
      (($r = !1), (ml = null));
    } else throw Error(z(198));
    gl || ((gl = !0), (ku = a));
  }
}
function $n(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function hp(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Ma(e) {
  if ($n(e) !== e) throw Error(z(188));
}
function Qm(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = $n(e)), t === null)) throw Error(z(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var l = i.alternate;
    if (l === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === l.child) {
      for (l = i.child; l; ) {
        if (l === n) return (Ma(i), e);
        if (l === r) return (Ma(i), t);
        l = l.sibling;
      }
      throw Error(z(188));
    }
    if (n.return !== r.return) ((n = i), (r = l));
    else {
      for (var o = !1, u = i.child; u; ) {
        if (u === n) {
          ((o = !0), (n = i), (r = l));
          break;
        }
        if (u === r) {
          ((o = !0), (r = i), (n = l));
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = l.child; u; ) {
          if (u === n) {
            ((o = !0), (n = l), (r = i));
            break;
          }
          if (u === r) {
            ((o = !0), (r = l), (n = i));
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(z(189));
      }
    }
    if (n.alternate !== r) throw Error(z(190));
  }
  if (n.tag !== 3) throw Error(z(188));
  return n.stateNode.current === n ? e : t;
}
function mp(e) {
  return ((e = Qm(e)), e !== null ? gp(e) : null);
}
function gp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = gp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var yp = rt.unstable_scheduleCallback,
  Ba = rt.unstable_cancelCallback,
  qm = rt.unstable_shouldYield,
  Km = rt.unstable_requestPaint,
  ve = rt.unstable_now,
  Ym = rt.unstable_getCurrentPriorityLevel,
  Cs = rt.unstable_ImmediatePriority,
  xp = rt.unstable_UserBlockingPriority,
  yl = rt.unstable_NormalPriority,
  Xm = rt.unstable_LowPriority,
  kp = rt.unstable_IdlePriority,
  Hl = null,
  Ft = null;
function Gm(e) {
  if (Ft && typeof Ft.onCommitFiberRoot == "function")
    try {
      Ft.onCommitFiberRoot(Hl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Nt = Math.clz32 ? Math.clz32 : eg,
  Zm = Math.log,
  Jm = Math.LN2;
function eg(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Zm(e) / Jm) | 0)) | 0);
}
var Ri = 64,
  Fi = 4194304;
function Or(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function xl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    l = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var u = o & ~i;
    u !== 0 ? (r = Or(u)) : ((l &= o), l !== 0 && (r = Or(l)));
  } else ((o = n & ~i), o !== 0 ? (r = Or(o)) : l !== 0 && (r = Or(l)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (l = t & -t), i >= l || (i === 16 && (l & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - Nt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
  return r;
}
function tg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function ng(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var o = 31 - Nt(l),
      u = 1 << o,
      s = i[o];
    (s === -1
      ? (!(u & n) || u & r) && (i[o] = tg(u, t))
      : s <= t && (e.expiredLanes |= u),
      (l &= ~u));
  }
}
function vu(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function vp() {
  var e = Ri;
  return ((Ri <<= 1), !(Ri & 4194240) && (Ri = 64), e);
}
function xo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function xi(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Nt(t)),
    (e[t] = n));
}
function rg(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Nt(n),
      l = 1 << i;
    ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~l));
  }
}
function Es(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Nt(n),
      i = 1 << r;
    ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
  }
}
var ue = 0;
function wp(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Sp,
  bs,
  Cp,
  Ep,
  bp,
  wu = !1,
  Oi = [],
  an = null,
  cn = null,
  fn = null,
  ti = new Map(),
  ni = new Map(),
  ln = [],
  ig =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function $a(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      an = null;
      break;
    case "dragenter":
    case "dragleave":
      cn = null;
      break;
    case "mouseover":
    case "mouseout":
      fn = null;
      break;
    case "pointerover":
    case "pointerout":
      ti.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ni.delete(t.pointerId);
  }
}
function Lr(e, t, n, r, i, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [i],
      }),
      t !== null && ((t = vi(t)), t !== null && bs(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function lg(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return ((an = Lr(an, e, t, n, r, i)), !0);
    case "dragenter":
      return ((cn = Lr(cn, e, t, n, r, i)), !0);
    case "mouseover":
      return ((fn = Lr(fn, e, t, n, r, i)), !0);
    case "pointerover":
      var l = i.pointerId;
      return (ti.set(l, Lr(ti.get(l) || null, e, t, n, r, i)), !0);
    case "gotpointercapture":
      return (
        (l = i.pointerId),
        ni.set(l, Lr(ni.get(l) || null, e, t, n, r, i)),
        !0
      );
  }
  return !1;
}
function Np(e) {
  var t = Tn(e.target);
  if (t !== null) {
    var n = $n(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = hp(n)), t !== null)) {
          ((e.blockedOn = t),
            bp(e.priority, function () {
              Cp(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function tl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Su(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((gu = r), n.target.dispatchEvent(r), (gu = null));
    } else return ((t = vi(n)), t !== null && bs(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Ua(e, t, n) {
  tl(e) && n.delete(t);
}
function og() {
  ((wu = !1),
    an !== null && tl(an) && (an = null),
    cn !== null && tl(cn) && (cn = null),
    fn !== null && tl(fn) && (fn = null),
    ti.forEach(Ua),
    ni.forEach(Ua));
}
function Tr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    wu ||
      ((wu = !0),
      rt.unstable_scheduleCallback(rt.unstable_NormalPriority, og)));
}
function ri(e) {
  function t(i) {
    return Tr(i, e);
  }
  if (0 < Oi.length) {
    Tr(Oi[0], e);
    for (var n = 1; n < Oi.length; n++) {
      var r = Oi[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    an !== null && Tr(an, e),
      cn !== null && Tr(cn, e),
      fn !== null && Tr(fn, e),
      ti.forEach(t),
      ni.forEach(t),
      n = 0;
    n < ln.length;
    n++
  )
    ((r = ln[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < ln.length && ((n = ln[0]), n.blockedOn === null); )
    (Np(n), n.blockedOn === null && ln.shift());
}
var sr = Xt.ReactCurrentBatchConfig,
  kl = !0;
function ug(e, t, n, r) {
  var i = ue,
    l = sr.transition;
  sr.transition = null;
  try {
    ((ue = 1), Ns(e, t, n, r));
  } finally {
    ((ue = i), (sr.transition = l));
  }
}
function sg(e, t, n, r) {
  var i = ue,
    l = sr.transition;
  sr.transition = null;
  try {
    ((ue = 4), Ns(e, t, n, r));
  } finally {
    ((ue = i), (sr.transition = l));
  }
}
function Ns(e, t, n, r) {
  if (kl) {
    var i = Su(e, t, n, r);
    if (i === null) (Lo(e, t, r, vl, n), $a(e, r));
    else if (lg(i, e, t, n, r)) r.stopPropagation();
    else if (($a(e, r), t & 4 && -1 < ig.indexOf(e))) {
      for (; i !== null; ) {
        var l = vi(i);
        if (
          (l !== null && Sp(l),
          (l = Su(e, t, n, r)),
          l === null && Lo(e, t, r, vl, n),
          l === i)
        )
          break;
        i = l;
      }
      i !== null && r.stopPropagation();
    } else Lo(e, t, r, null, n);
  }
}
var vl = null;
function Su(e, t, n, r) {
  if (((vl = null), (e = Ss(r)), (e = Tn(e)), e !== null))
    if (((t = $n(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = hp(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((vl = e), null);
}
function Pp(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Ym()) {
        case Cs:
          return 1;
        case xp:
          return 4;
        case yl:
        case Xm:
          return 16;
        case kp:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var un = null,
  Ps = null,
  nl = null;
function Lp() {
  if (nl) return nl;
  var e,
    t = Ps,
    n = t.length,
    r,
    i = "value" in un ? un.value : un.textContent,
    l = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === i[l - r]; r++);
  return (nl = i.slice(e, 1 < r ? 1 - r : void 0));
}
function rl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Mi() {
  return !0;
}
function Ha() {
  return !1;
}
function lt(e) {
  function t(n, r, i, l, o) {
    ((this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = l),
      (this.target = o),
      (this.currentTarget = null));
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(l) : l[u]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? Mi
        : Ha),
      (this.isPropagationStopped = Ha),
      this
    );
  }
  return (
    xe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Mi));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Mi));
      },
      persist: function () {},
      isPersistent: Mi,
    }),
    t
  );
}
var wr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Ls = lt(wr),
  ki = xe({}, wr, { view: 0, detail: 0 }),
  ag = lt(ki),
  ko,
  vo,
  _r,
  Vl = xe({}, ki, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ts,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== _r &&
            (_r && e.type === "mousemove"
              ? ((ko = e.screenX - _r.screenX), (vo = e.screenY - _r.screenY))
              : (vo = ko = 0),
            (_r = e)),
          ko);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : vo;
    },
  }),
  Va = lt(Vl),
  cg = xe({}, Vl, { dataTransfer: 0 }),
  fg = lt(cg),
  pg = xe({}, ki, { relatedTarget: 0 }),
  wo = lt(pg),
  dg = xe({}, wr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  hg = lt(dg),
  mg = xe({}, wr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  gg = lt(mg),
  yg = xe({}, wr, { data: 0 }),
  Wa = lt(yg),
  xg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  kg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  vg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function wg(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = vg[e]) ? !!t[e] : !1;
}
function Ts() {
  return wg;
}
var Sg = xe({}, ki, {
    key: function (e) {
      if (e.key) {
        var t = xg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = rl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? kg[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ts,
    charCode: function (e) {
      return e.type === "keypress" ? rl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? rl(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Cg = lt(Sg),
  Eg = xe({}, Vl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Qa = lt(Eg),
  bg = xe({}, ki, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ts,
  }),
  Ng = lt(bg),
  Pg = xe({}, wr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Lg = lt(Pg),
  Tg = xe({}, Vl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  _g = lt(Tg),
  zg = [9, 13, 27, 32],
  _s = Qt && "CompositionEvent" in window,
  Ur = null;
Qt && "documentMode" in document && (Ur = document.documentMode);
var Ig = Qt && "TextEvent" in window && !Ur,
  Tp = Qt && (!_s || (Ur && 8 < Ur && 11 >= Ur)),
  qa = " ",
  Ka = !1;
function _p(e, t) {
  switch (e) {
    case "keyup":
      return zg.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function zp(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Yn = !1;
function jg(e, t) {
  switch (e) {
    case "compositionend":
      return zp(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ka = !0), qa);
    case "textInput":
      return ((e = t.data), e === qa && Ka ? null : e);
    default:
      return null;
  }
}
function Dg(e, t) {
  if (Yn)
    return e === "compositionend" || (!_s && _p(e, t))
      ? ((e = Lp()), (nl = Ps = un = null), (Yn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Tp && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Ag = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Ya(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Ag[e.type] : t === "textarea";
}
function Ip(e, t, n, r) {
  (ap(r),
    (t = wl(t, "onChange")),
    0 < t.length &&
      ((n = new Ls("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var Hr = null,
  ii = null;
function Rg(e) {
  Hp(e, 0);
}
function Wl(e) {
  var t = Zn(e);
  if (np(t)) return e;
}
function Fg(e, t) {
  if (e === "change") return t;
}
var jp = !1;
if (Qt) {
  var So;
  if (Qt) {
    var Co = "oninput" in document;
    if (!Co) {
      var Xa = document.createElement("div");
      (Xa.setAttribute("oninput", "return;"),
        (Co = typeof Xa.oninput == "function"));
    }
    So = Co;
  } else So = !1;
  jp = So && (!document.documentMode || 9 < document.documentMode);
}
function Ga() {
  Hr && (Hr.detachEvent("onpropertychange", Dp), (ii = Hr = null));
}
function Dp(e) {
  if (e.propertyName === "value" && Wl(ii)) {
    var t = [];
    (Ip(t, ii, e, Ss(e)), dp(Rg, t));
  }
}
function Og(e, t, n) {
  e === "focusin"
    ? (Ga(), (Hr = t), (ii = n), Hr.attachEvent("onpropertychange", Dp))
    : e === "focusout" && Ga();
}
function Mg(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Wl(ii);
}
function Bg(e, t) {
  if (e === "click") return Wl(t);
}
function $g(e, t) {
  if (e === "input" || e === "change") return Wl(t);
}
function Ug(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Tt = typeof Object.is == "function" ? Object.is : Ug;
function li(e, t) {
  if (Tt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!iu.call(t, i) || !Tt(e[i], t[i])) return !1;
  }
  return !0;
}
function Za(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ja(e, t) {
  var n = Za(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Za(n);
  }
}
function Ap(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Ap(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Rp() {
  for (var e = window, t = hl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = hl(e.document);
  }
  return t;
}
function zs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Hg(e) {
  var t = Rp(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Ap(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && zs(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          l = Math.min(r.start, i);
        ((r = r.end === void 0 ? l : Math.min(r.end, i)),
          !e.extend && l > r && ((i = r), (r = l), (l = i)),
          (i = Ja(n, l)));
        var o = Ja(n, r);
        i &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          l > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var Vg = Qt && "documentMode" in document && 11 >= document.documentMode,
  Xn = null,
  Cu = null,
  Vr = null,
  Eu = !1;
function ec(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Eu ||
    Xn == null ||
    Xn !== hl(r) ||
    ((r = Xn),
    "selectionStart" in r && zs(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Vr && li(Vr, r)) ||
      ((Vr = r),
      (r = wl(Cu, "onSelect")),
      0 < r.length &&
        ((t = new Ls("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Xn))));
}
function Bi(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Gn = {
    animationend: Bi("Animation", "AnimationEnd"),
    animationiteration: Bi("Animation", "AnimationIteration"),
    animationstart: Bi("Animation", "AnimationStart"),
    transitionend: Bi("Transition", "TransitionEnd"),
  },
  Eo = {},
  Fp = {};
Qt &&
  ((Fp = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Gn.animationend.animation,
    delete Gn.animationiteration.animation,
    delete Gn.animationstart.animation),
  "TransitionEvent" in window || delete Gn.transitionend.transition);
function Ql(e) {
  if (Eo[e]) return Eo[e];
  if (!Gn[e]) return e;
  var t = Gn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Fp) return (Eo[e] = t[n]);
  return e;
}
var Op = Ql("animationend"),
  Mp = Ql("animationiteration"),
  Bp = Ql("animationstart"),
  $p = Ql("transitionend"),
  Up = new Map(),
  tc =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function kn(e, t) {
  (Up.set(e, t), Bn(t, [e]));
}
for (var bo = 0; bo < tc.length; bo++) {
  var No = tc[bo],
    Wg = No.toLowerCase(),
    Qg = No[0].toUpperCase() + No.slice(1);
  kn(Wg, "on" + Qg);
}
kn(Op, "onAnimationEnd");
kn(Mp, "onAnimationIteration");
kn(Bp, "onAnimationStart");
kn("dblclick", "onDoubleClick");
kn("focusin", "onFocus");
kn("focusout", "onBlur");
kn($p, "onTransitionEnd");
pr("onMouseEnter", ["mouseout", "mouseover"]);
pr("onMouseLeave", ["mouseout", "mouseover"]);
pr("onPointerEnter", ["pointerout", "pointerover"]);
pr("onPointerLeave", ["pointerout", "pointerover"]);
Bn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Bn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Bn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Bn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Bn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Mr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  qg = new Set("cancel close invalid load scroll toggle".split(" ").concat(Mr));
function nc(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), Wm(r, t, void 0, e), (e.currentTarget = null));
}
function Hp(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var u = r[o],
            s = u.instance,
            a = u.currentTarget;
          if (((u = u.listener), s !== l && i.isPropagationStopped())) break e;
          (nc(i, u, a), (l = s));
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((u = r[o]),
            (s = u.instance),
            (a = u.currentTarget),
            (u = u.listener),
            s !== l && i.isPropagationStopped())
          )
            break e;
          (nc(i, u, a), (l = s));
        }
    }
  }
  if (gl) throw ((e = ku), (gl = !1), (ku = null), e);
}
function pe(e, t) {
  var n = t[Tu];
  n === void 0 && (n = t[Tu] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Vp(t, e, 2, !1), n.add(r));
}
function Po(e, t, n) {
  var r = 0;
  (t && (r |= 4), Vp(n, e, r, t));
}
var $i = "_reactListening" + Math.random().toString(36).slice(2);
function oi(e) {
  if (!e[$i]) {
    ((e[$i] = !0),
      Gf.forEach(function (n) {
        n !== "selectionchange" && (qg.has(n) || Po(n, !1, e), Po(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[$i] || ((t[$i] = !0), Po("selectionchange", !1, t));
  }
}
function Vp(e, t, n, r) {
  switch (Pp(t)) {
    case 1:
      var i = ug;
      break;
    case 4:
      i = sg;
      break;
    default:
      i = Ns;
  }
  ((n = i.bind(null, t, n, e)),
    (i = void 0),
    !xu ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1));
}
function Lo(e, t, n, r, i) {
  var l = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var u = r.stateNode.containerInfo;
        if (u === i || (u.nodeType === 8 && u.parentNode === i)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var s = o.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = o.stateNode.containerInfo),
              s === i || (s.nodeType === 8 && s.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; u !== null; ) {
          if (((o = Tn(u)), o === null)) return;
          if (((s = o.tag), s === 5 || s === 6)) {
            r = l = o;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  dp(function () {
    var a = l,
      f = Ss(n),
      c = [];
    e: {
      var d = Up.get(e);
      if (d !== void 0) {
        var p = Ls,
          m = e;
        switch (e) {
          case "keypress":
            if (rl(n) === 0) break e;
          case "keydown":
          case "keyup":
            p = Cg;
            break;
          case "focusin":
            ((m = "focus"), (p = wo));
            break;
          case "focusout":
            ((m = "blur"), (p = wo));
            break;
          case "beforeblur":
          case "afterblur":
            p = wo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            p = Va;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = fg;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = Ng;
            break;
          case Op:
          case Mp:
          case Bp:
            p = hg;
            break;
          case $p:
            p = Lg;
            break;
          case "scroll":
            p = ag;
            break;
          case "wheel":
            p = _g;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = gg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = Qa;
        }
        var k = (t & 4) !== 0,
          P = !k && e === "scroll",
          h = k ? (d !== null ? d + "Capture" : null) : d;
        k = [];
        for (var g = a, y; g !== null; ) {
          y = g;
          var E = y.stateNode;
          if (
            (y.tag === 5 &&
              E !== null &&
              ((y = E),
              h !== null && ((E = ei(g, h)), E != null && k.push(ui(g, E, y)))),
            P)
          )
            break;
          g = g.return;
        }
        0 < k.length &&
          ((d = new p(d, m, null, n, f)), c.push({ event: d, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((d = e === "mouseover" || e === "pointerover"),
          (p = e === "mouseout" || e === "pointerout"),
          d &&
            n !== gu &&
            (m = n.relatedTarget || n.fromElement) &&
            (Tn(m) || m[qt]))
        )
          break e;
        if (
          (p || d) &&
          ((d =
            f.window === f
              ? f
              : (d = f.ownerDocument)
                ? d.defaultView || d.parentWindow
                : window),
          p
            ? ((m = n.relatedTarget || n.toElement),
              (p = a),
              (m = m ? Tn(m) : null),
              m !== null &&
                ((P = $n(m)), m !== P || (m.tag !== 5 && m.tag !== 6)) &&
                (m = null))
            : ((p = null), (m = a)),
          p !== m)
        ) {
          if (
            ((k = Va),
            (E = "onMouseLeave"),
            (h = "onMouseEnter"),
            (g = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((k = Qa),
              (E = "onPointerLeave"),
              (h = "onPointerEnter"),
              (g = "pointer")),
            (P = p == null ? d : Zn(p)),
            (y = m == null ? d : Zn(m)),
            (d = new k(E, g + "leave", p, n, f)),
            (d.target = P),
            (d.relatedTarget = y),
            (E = null),
            Tn(f) === a &&
              ((k = new k(h, g + "enter", m, n, f)),
              (k.target = y),
              (k.relatedTarget = P),
              (E = k)),
            (P = E),
            p && m)
          )
            t: {
              for (k = p, h = m, g = 0, y = k; y; y = Hn(y)) g++;
              for (y = 0, E = h; E; E = Hn(E)) y++;
              for (; 0 < g - y; ) ((k = Hn(k)), g--);
              for (; 0 < y - g; ) ((h = Hn(h)), y--);
              for (; g--; ) {
                if (k === h || (h !== null && k === h.alternate)) break t;
                ((k = Hn(k)), (h = Hn(h)));
              }
              k = null;
            }
          else k = null;
          (p !== null && rc(c, d, p, k, !1),
            m !== null && P !== null && rc(c, P, m, k, !0));
        }
      }
      e: {
        if (
          ((d = a ? Zn(a) : window),
          (p = d.nodeName && d.nodeName.toLowerCase()),
          p === "select" || (p === "input" && d.type === "file"))
        )
          var b = Fg;
        else if (Ya(d))
          if (jp) b = $g;
          else {
            b = Mg;
            var S = Og;
          }
        else
          (p = d.nodeName) &&
            p.toLowerCase() === "input" &&
            (d.type === "checkbox" || d.type === "radio") &&
            (b = Bg);
        if (b && (b = b(e, a))) {
          Ip(c, b, n, f);
          break e;
        }
        (S && S(e, d, a),
          e === "focusout" &&
            (S = d._wrapperState) &&
            S.controlled &&
            d.type === "number" &&
            fu(d, "number", d.value));
      }
      switch (((S = a ? Zn(a) : window), e)) {
        case "focusin":
          (Ya(S) || S.contentEditable === "true") &&
            ((Xn = S), (Cu = a), (Vr = null));
          break;
        case "focusout":
          Vr = Cu = Xn = null;
          break;
        case "mousedown":
          Eu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Eu = !1), ec(c, n, f));
          break;
        case "selectionchange":
          if (Vg) break;
        case "keydown":
        case "keyup":
          ec(c, n, f);
      }
      var T;
      if (_s)
        e: {
          switch (e) {
            case "compositionstart":
              var _ = "onCompositionStart";
              break e;
            case "compositionend":
              _ = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _ = "onCompositionUpdate";
              break e;
          }
          _ = void 0;
        }
      else
        Yn
          ? _p(e, n) && (_ = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      (_ &&
        (Tp &&
          n.locale !== "ko" &&
          (Yn || _ !== "onCompositionStart"
            ? _ === "onCompositionEnd" && Yn && (T = Lp())
            : ((un = f),
              (Ps = "value" in un ? un.value : un.textContent),
              (Yn = !0))),
        (S = wl(a, _)),
        0 < S.length &&
          ((_ = new Wa(_, e, null, n, f)),
          c.push({ event: _, listeners: S }),
          T ? (_.data = T) : ((T = zp(n)), T !== null && (_.data = T)))),
        (T = Ig ? jg(e, n) : Dg(e, n)) &&
          ((a = wl(a, "onBeforeInput")),
          0 < a.length &&
            ((f = new Wa("onBeforeInput", "beforeinput", null, n, f)),
            c.push({ event: f, listeners: a }),
            (f.data = T))));
    }
    Hp(c, t);
  });
}
function ui(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function wl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      l = i.stateNode;
    (i.tag === 5 &&
      l !== null &&
      ((i = l),
      (l = ei(e, n)),
      l != null && r.unshift(ui(e, l, i)),
      (l = ei(e, t)),
      l != null && r.push(ui(e, l, i))),
      (e = e.return));
  }
  return r;
}
function Hn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function rc(e, t, n, r, i) {
  for (var l = t._reactName, o = []; n !== null && n !== r; ) {
    var u = n,
      s = u.alternate,
      a = u.stateNode;
    if (s !== null && s === r) break;
    (u.tag === 5 &&
      a !== null &&
      ((u = a),
      i
        ? ((s = ei(n, l)), s != null && o.unshift(ui(n, s, u)))
        : i || ((s = ei(n, l)), s != null && o.push(ui(n, s, u)))),
      (n = n.return));
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Kg = /\r\n?/g,
  Yg = /\u0000|\uFFFD/g;
function ic(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Kg,
      `
`,
    )
    .replace(Yg, "");
}
function Ui(e, t, n) {
  if (((t = ic(t)), ic(e) !== t && n)) throw Error(z(425));
}
function Sl() {}
var bu = null,
  Nu = null;
function Pu(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Lu = typeof setTimeout == "function" ? setTimeout : void 0,
  Xg = typeof clearTimeout == "function" ? clearTimeout : void 0,
  lc = typeof Promise == "function" ? Promise : void 0,
  Gg =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof lc < "u"
        ? function (e) {
            return lc.resolve(null).then(e).catch(Zg);
          }
        : Lu;
function Zg(e) {
  setTimeout(function () {
    throw e;
  });
}
function To(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(i), ri(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  ri(t);
}
function pn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function oc(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Sr = Math.random().toString(36).slice(2),
  Rt = "__reactFiber$" + Sr,
  si = "__reactProps$" + Sr,
  qt = "__reactContainer$" + Sr,
  Tu = "__reactEvents$" + Sr,
  Jg = "__reactListeners$" + Sr,
  ey = "__reactHandles$" + Sr;
function Tn(e) {
  var t = e[Rt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[qt] || n[Rt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = oc(e); e !== null; ) {
          if ((n = e[Rt])) return n;
          e = oc(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function vi(e) {
  return (
    (e = e[Rt] || e[qt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Zn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(z(33));
}
function ql(e) {
  return e[si] || null;
}
var _u = [],
  Jn = -1;
function vn(e) {
  return { current: e };
}
function de(e) {
  0 > Jn || ((e.current = _u[Jn]), (_u[Jn] = null), Jn--);
}
function fe(e, t) {
  (Jn++, (_u[Jn] = e.current), (e.current = t));
}
var xn = {},
  De = vn(xn),
  qe = vn(!1),
  Dn = xn;
function dr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return xn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    l;
  for (l in n) i[l] = t[l];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Ke(e) {
  return ((e = e.childContextTypes), e != null);
}
function Cl() {
  (de(qe), de(De));
}
function uc(e, t, n) {
  if (De.current !== xn) throw Error(z(168));
  (fe(De, t), fe(qe, n));
}
function Wp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(z(108, Om(e) || "Unknown", i));
  return xe({}, n, r);
}
function El(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || xn),
    (Dn = De.current),
    fe(De, e),
    fe(qe, qe.current),
    !0
  );
}
function sc(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(z(169));
  (n
    ? ((e = Wp(e, t, Dn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      de(qe),
      de(De),
      fe(De, e))
    : de(qe),
    fe(qe, n));
}
var Ut = null,
  Kl = !1,
  _o = !1;
function Qp(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function ty(e) {
  ((Kl = !0), Qp(e));
}
function wn() {
  if (!_o && Ut !== null) {
    _o = !0;
    var e = 0,
      t = ue;
    try {
      var n = Ut;
      for (ue = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Ut = null), (Kl = !1));
    } catch (i) {
      throw (Ut !== null && (Ut = Ut.slice(e + 1)), yp(Cs, wn), i);
    } finally {
      ((ue = t), (_o = !1));
    }
  }
  return null;
}
var er = [],
  tr = 0,
  bl = null,
  Nl = 0,
  ft = [],
  pt = 0,
  An = null,
  Ht = 1,
  Vt = "";
function Nn(e, t) {
  ((er[tr++] = Nl), (er[tr++] = bl), (bl = e), (Nl = t));
}
function qp(e, t, n) {
  ((ft[pt++] = Ht), (ft[pt++] = Vt), (ft[pt++] = An), (An = e));
  var r = Ht;
  e = Vt;
  var i = 32 - Nt(r) - 1;
  ((r &= ~(1 << i)), (n += 1));
  var l = 32 - Nt(t) + i;
  if (30 < l) {
    var o = i - (i % 5);
    ((l = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (Ht = (1 << (32 - Nt(t) + i)) | (n << i) | r),
      (Vt = l + e));
  } else ((Ht = (1 << l) | (n << i) | r), (Vt = e));
}
function Is(e) {
  e.return !== null && (Nn(e, 1), qp(e, 1, 0));
}
function js(e) {
  for (; e === bl; )
    ((bl = er[--tr]), (er[tr] = null), (Nl = er[--tr]), (er[tr] = null));
  for (; e === An; )
    ((An = ft[--pt]),
      (ft[pt] = null),
      (Vt = ft[--pt]),
      (ft[pt] = null),
      (Ht = ft[--pt]),
      (ft[pt] = null));
}
var tt = null,
  Je = null,
  me = !1,
  bt = null;
function Kp(e, t) {
  var n = ht(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function ac(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (tt = e), (Je = pn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (tt = e), (Je = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = An !== null ? { id: Ht, overflow: Vt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ht(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (tt = e),
            (Je = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function zu(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Iu(e) {
  if (me) {
    var t = Je;
    if (t) {
      var n = t;
      if (!ac(e, t)) {
        if (zu(e)) throw Error(z(418));
        t = pn(n.nextSibling);
        var r = tt;
        t && ac(e, t)
          ? Kp(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (me = !1), (tt = e));
      }
    } else {
      if (zu(e)) throw Error(z(418));
      ((e.flags = (e.flags & -4097) | 2), (me = !1), (tt = e));
    }
  }
}
function cc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  tt = e;
}
function Hi(e) {
  if (e !== tt) return !1;
  if (!me) return (cc(e), (me = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Pu(e.type, e.memoizedProps))),
    t && (t = Je))
  ) {
    if (zu(e)) throw (Yp(), Error(z(418)));
    for (; t; ) (Kp(e, t), (t = pn(t.nextSibling)));
  }
  if ((cc(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(z(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Je = pn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Je = null;
    }
  } else Je = tt ? pn(e.stateNode.nextSibling) : null;
  return !0;
}
function Yp() {
  for (var e = Je; e; ) e = pn(e.nextSibling);
}
function hr() {
  ((Je = tt = null), (me = !1));
}
function Ds(e) {
  bt === null ? (bt = [e]) : bt.push(e);
}
var ny = Xt.ReactCurrentBatchConfig;
function zr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(z(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(z(147, e));
      var i = r,
        l = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === l
        ? t.ref
        : ((t = function (o) {
            var u = i.refs;
            o === null ? delete u[l] : (u[l] = o);
          }),
          (t._stringRef = l),
          t);
    }
    if (typeof e != "string") throw Error(z(284));
    if (!n._owner) throw Error(z(290, e));
  }
  return e;
}
function Vi(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      z(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function fc(e) {
  var t = e._init;
  return t(e._payload);
}
function Xp(e) {
  function t(h, g) {
    if (e) {
      var y = h.deletions;
      y === null ? ((h.deletions = [g]), (h.flags |= 16)) : y.push(g);
    }
  }
  function n(h, g) {
    if (!e) return null;
    for (; g !== null; ) (t(h, g), (g = g.sibling));
    return null;
  }
  function r(h, g) {
    for (h = new Map(); g !== null; )
      (g.key !== null ? h.set(g.key, g) : h.set(g.index, g), (g = g.sibling));
    return h;
  }
  function i(h, g) {
    return ((h = gn(h, g)), (h.index = 0), (h.sibling = null), h);
  }
  function l(h, g, y) {
    return (
      (h.index = y),
      e
        ? ((y = h.alternate),
          y !== null
            ? ((y = y.index), y < g ? ((h.flags |= 2), g) : y)
            : ((h.flags |= 2), g))
        : ((h.flags |= 1048576), g)
    );
  }
  function o(h) {
    return (e && h.alternate === null && (h.flags |= 2), h);
  }
  function u(h, g, y, E) {
    return g === null || g.tag !== 6
      ? ((g = Fo(y, h.mode, E)), (g.return = h), g)
      : ((g = i(g, y)), (g.return = h), g);
  }
  function s(h, g, y, E) {
    var b = y.type;
    return b === Kn
      ? f(h, g, y.props.children, E, y.key)
      : g !== null &&
          (g.elementType === b ||
            (typeof b == "object" &&
              b !== null &&
              b.$$typeof === nn &&
              fc(b) === g.type))
        ? ((E = i(g, y.props)), (E.ref = zr(h, g, y)), (E.return = h), E)
        : ((E = cl(y.type, y.key, y.props, null, h.mode, E)),
          (E.ref = zr(h, g, y)),
          (E.return = h),
          E);
  }
  function a(h, g, y, E) {
    return g === null ||
      g.tag !== 4 ||
      g.stateNode.containerInfo !== y.containerInfo ||
      g.stateNode.implementation !== y.implementation
      ? ((g = Oo(y, h.mode, E)), (g.return = h), g)
      : ((g = i(g, y.children || [])), (g.return = h), g);
  }
  function f(h, g, y, E, b) {
    return g === null || g.tag !== 7
      ? ((g = jn(y, h.mode, E, b)), (g.return = h), g)
      : ((g = i(g, y)), (g.return = h), g);
  }
  function c(h, g, y) {
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return ((g = Fo("" + g, h.mode, y)), (g.return = h), g);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case ji:
          return (
            (y = cl(g.type, g.key, g.props, null, h.mode, y)),
            (y.ref = zr(h, null, g)),
            (y.return = h),
            y
          );
        case qn:
          return ((g = Oo(g, h.mode, y)), (g.return = h), g);
        case nn:
          var E = g._init;
          return c(h, E(g._payload), y);
      }
      if (Fr(g) || Nr(g))
        return ((g = jn(g, h.mode, y, null)), (g.return = h), g);
      Vi(h, g);
    }
    return null;
  }
  function d(h, g, y, E) {
    var b = g !== null ? g.key : null;
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return b !== null ? null : u(h, g, "" + y, E);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ji:
          return y.key === b ? s(h, g, y, E) : null;
        case qn:
          return y.key === b ? a(h, g, y, E) : null;
        case nn:
          return ((b = y._init), d(h, g, b(y._payload), E));
      }
      if (Fr(y) || Nr(y)) return b !== null ? null : f(h, g, y, E, null);
      Vi(h, y);
    }
    return null;
  }
  function p(h, g, y, E, b) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return ((h = h.get(y) || null), u(g, h, "" + E, b));
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case ji:
          return (
            (h = h.get(E.key === null ? y : E.key) || null),
            s(g, h, E, b)
          );
        case qn:
          return (
            (h = h.get(E.key === null ? y : E.key) || null),
            a(g, h, E, b)
          );
        case nn:
          var S = E._init;
          return p(h, g, y, S(E._payload), b);
      }
      if (Fr(E) || Nr(E)) return ((h = h.get(y) || null), f(g, h, E, b, null));
      Vi(g, E);
    }
    return null;
  }
  function m(h, g, y, E) {
    for (
      var b = null, S = null, T = g, _ = (g = 0), D = null;
      T !== null && _ < y.length;
      _++
    ) {
      T.index > _ ? ((D = T), (T = null)) : (D = T.sibling);
      var C = d(h, T, y[_], E);
      if (C === null) {
        T === null && (T = D);
        break;
      }
      (e && T && C.alternate === null && t(h, T),
        (g = l(C, g, _)),
        S === null ? (b = C) : (S.sibling = C),
        (S = C),
        (T = D));
    }
    if (_ === y.length) return (n(h, T), me && Nn(h, _), b);
    if (T === null) {
      for (; _ < y.length; _++)
        ((T = c(h, y[_], E)),
          T !== null &&
            ((g = l(T, g, _)),
            S === null ? (b = T) : (S.sibling = T),
            (S = T)));
      return (me && Nn(h, _), b);
    }
    for (T = r(h, T); _ < y.length; _++)
      ((D = p(T, h, _, y[_], E)),
        D !== null &&
          (e && D.alternate !== null && T.delete(D.key === null ? _ : D.key),
          (g = l(D, g, _)),
          S === null ? (b = D) : (S.sibling = D),
          (S = D)));
    return (
      e &&
        T.forEach(function (j) {
          return t(h, j);
        }),
      me && Nn(h, _),
      b
    );
  }
  function k(h, g, y, E) {
    var b = Nr(y);
    if (typeof b != "function") throw Error(z(150));
    if (((y = b.call(y)), y == null)) throw Error(z(151));
    for (
      var S = (b = null), T = g, _ = (g = 0), D = null, C = y.next();
      T !== null && !C.done;
      _++, C = y.next()
    ) {
      T.index > _ ? ((D = T), (T = null)) : (D = T.sibling);
      var j = d(h, T, C.value, E);
      if (j === null) {
        T === null && (T = D);
        break;
      }
      (e && T && j.alternate === null && t(h, T),
        (g = l(j, g, _)),
        S === null ? (b = j) : (S.sibling = j),
        (S = j),
        (T = D));
    }
    if (C.done) return (n(h, T), me && Nn(h, _), b);
    if (T === null) {
      for (; !C.done; _++, C = y.next())
        ((C = c(h, C.value, E)),
          C !== null &&
            ((g = l(C, g, _)),
            S === null ? (b = C) : (S.sibling = C),
            (S = C)));
      return (me && Nn(h, _), b);
    }
    for (T = r(h, T); !C.done; _++, C = y.next())
      ((C = p(T, h, _, C.value, E)),
        C !== null &&
          (e && C.alternate !== null && T.delete(C.key === null ? _ : C.key),
          (g = l(C, g, _)),
          S === null ? (b = C) : (S.sibling = C),
          (S = C)));
    return (
      e &&
        T.forEach(function (F) {
          return t(h, F);
        }),
      me && Nn(h, _),
      b
    );
  }
  function P(h, g, y, E) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === Kn &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case ji:
          e: {
            for (var b = y.key, S = g; S !== null; ) {
              if (S.key === b) {
                if (((b = y.type), b === Kn)) {
                  if (S.tag === 7) {
                    (n(h, S.sibling),
                      (g = i(S, y.props.children)),
                      (g.return = h),
                      (h = g));
                    break e;
                  }
                } else if (
                  S.elementType === b ||
                  (typeof b == "object" &&
                    b !== null &&
                    b.$$typeof === nn &&
                    fc(b) === S.type)
                ) {
                  (n(h, S.sibling),
                    (g = i(S, y.props)),
                    (g.ref = zr(h, S, y)),
                    (g.return = h),
                    (h = g));
                  break e;
                }
                n(h, S);
                break;
              } else t(h, S);
              S = S.sibling;
            }
            y.type === Kn
              ? ((g = jn(y.props.children, h.mode, E, y.key)),
                (g.return = h),
                (h = g))
              : ((E = cl(y.type, y.key, y.props, null, h.mode, E)),
                (E.ref = zr(h, g, y)),
                (E.return = h),
                (h = E));
          }
          return o(h);
        case qn:
          e: {
            for (S = y.key; g !== null; ) {
              if (g.key === S)
                if (
                  g.tag === 4 &&
                  g.stateNode.containerInfo === y.containerInfo &&
                  g.stateNode.implementation === y.implementation
                ) {
                  (n(h, g.sibling),
                    (g = i(g, y.children || [])),
                    (g.return = h),
                    (h = g));
                  break e;
                } else {
                  n(h, g);
                  break;
                }
              else t(h, g);
              g = g.sibling;
            }
            ((g = Oo(y, h.mode, E)), (g.return = h), (h = g));
          }
          return o(h);
        case nn:
          return ((S = y._init), P(h, g, S(y._payload), E));
      }
      if (Fr(y)) return m(h, g, y, E);
      if (Nr(y)) return k(h, g, y, E);
      Vi(h, y);
    }
    return (typeof y == "string" && y !== "") || typeof y == "number"
      ? ((y = "" + y),
        g !== null && g.tag === 6
          ? (n(h, g.sibling), (g = i(g, y)), (g.return = h), (h = g))
          : (n(h, g), (g = Fo(y, h.mode, E)), (g.return = h), (h = g)),
        o(h))
      : n(h, g);
  }
  return P;
}
var mr = Xp(!0),
  Gp = Xp(!1),
  Pl = vn(null),
  Ll = null,
  nr = null,
  As = null;
function Rs() {
  As = nr = Ll = null;
}
function Fs(e) {
  var t = Pl.current;
  (de(Pl), (e._currentValue = t));
}
function ju(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function ar(e, t) {
  ((Ll = e),
    (As = nr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Qe = !0), (e.firstContext = null)));
}
function gt(e) {
  var t = e._currentValue;
  if (As !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), nr === null)) {
      if (Ll === null) throw Error(z(308));
      ((nr = e), (Ll.dependencies = { lanes: 0, firstContext: e }));
    } else nr = nr.next = e;
  return t;
}
var _n = null;
function Os(e) {
  _n === null ? (_n = [e]) : _n.push(e);
}
function Zp(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Os(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Kt(e, r)
  );
}
function Kt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var rn = !1;
function Ms(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Jp(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Wt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function dn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), re & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Kt(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Os(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Kt(e, n)
  );
}
function il(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Es(e, n));
  }
}
function pc(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      l = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (l === null ? (i = l = o) : (l = l.next = o), (n = n.next));
      } while (n !== null);
      l === null ? (i = l = t) : (l = l.next = t);
    } else i = l = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: l,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function Tl(e, t, n, r) {
  var i = e.updateQueue;
  rn = !1;
  var l = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    u = i.shared.pending;
  if (u !== null) {
    i.shared.pending = null;
    var s = u,
      a = s.next;
    ((s.next = null), o === null ? (l = a) : (o.next = a), (o = s));
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (u = f.lastBaseUpdate),
      u !== o &&
        (u === null ? (f.firstBaseUpdate = a) : (u.next = a),
        (f.lastBaseUpdate = s)));
  }
  if (l !== null) {
    var c = i.baseState;
    ((o = 0), (f = a = s = null), (u = l));
    do {
      var d = u.lane,
        p = u.eventTime;
      if ((r & d) === d) {
        f !== null &&
          (f = f.next =
            {
              eventTime: p,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var m = e,
            k = u;
          switch (((d = t), (p = n), k.tag)) {
            case 1:
              if (((m = k.payload), typeof m == "function")) {
                c = m.call(p, c, d);
                break e;
              }
              c = m;
              break e;
            case 3:
              m.flags = (m.flags & -65537) | 128;
            case 0:
              if (
                ((m = k.payload),
                (d = typeof m == "function" ? m.call(p, c, d) : m),
                d == null)
              )
                break e;
              c = xe({}, c, d);
              break e;
            case 2:
              rn = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (d = i.effects),
          d === null ? (i.effects = [u]) : d.push(u));
      } else
        ((p = {
          eventTime: p,
          lane: d,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          f === null ? ((a = f = p), (s = c)) : (f = f.next = p),
          (o |= d));
      if (((u = u.next), u === null)) {
        if (((u = i.shared.pending), u === null)) break;
        ((d = u),
          (u = d.next),
          (d.next = null),
          (i.lastBaseUpdate = d),
          (i.shared.pending = null));
      }
    } while (!0);
    if (
      (f === null && (s = c),
      (i.baseState = s),
      (i.firstBaseUpdate = a),
      (i.lastBaseUpdate = f),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do ((o |= i.lane), (i = i.next));
      while (i !== t);
    } else l === null && (i.shared.lanes = 0);
    ((Fn |= o), (e.lanes = o), (e.memoizedState = c));
  }
}
function dc(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(z(191, i));
        i.call(r);
      }
    }
}
var wi = {},
  Ot = vn(wi),
  ai = vn(wi),
  ci = vn(wi);
function zn(e) {
  if (e === wi) throw Error(z(174));
  return e;
}
function Bs(e, t) {
  switch ((fe(ci, t), fe(ai, e), fe(Ot, wi), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : du(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = du(t, e)));
  }
  (de(Ot), fe(Ot, t));
}
function gr() {
  (de(Ot), de(ai), de(ci));
}
function ed(e) {
  zn(ci.current);
  var t = zn(Ot.current),
    n = du(t, e.type);
  t !== n && (fe(ai, e), fe(Ot, n));
}
function $s(e) {
  ai.current === e && (de(Ot), de(ai));
}
var ge = vn(0);
function _l(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var zo = [];
function Us() {
  for (var e = 0; e < zo.length; e++)
    zo[e]._workInProgressVersionPrimary = null;
  zo.length = 0;
}
var ll = Xt.ReactCurrentDispatcher,
  Io = Xt.ReactCurrentBatchConfig,
  Rn = 0,
  ye = null,
  Ce = null,
  be = null,
  zl = !1,
  Wr = !1,
  fi = 0,
  ry = 0;
function _e() {
  throw Error(z(321));
}
function Hs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Tt(e[n], t[n])) return !1;
  return !0;
}
function Vs(e, t, n, r, i, l) {
  if (
    ((Rn = l),
    (ye = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ll.current = e === null || e.memoizedState === null ? uy : sy),
    (e = n(r, i)),
    Wr)
  ) {
    l = 0;
    do {
      if (((Wr = !1), (fi = 0), 25 <= l)) throw Error(z(301));
      ((l += 1),
        (be = Ce = null),
        (t.updateQueue = null),
        (ll.current = ay),
        (e = n(r, i)));
    } while (Wr);
  }
  if (
    ((ll.current = Il),
    (t = Ce !== null && Ce.next !== null),
    (Rn = 0),
    (be = Ce = ye = null),
    (zl = !1),
    t)
  )
    throw Error(z(300));
  return e;
}
function Ws() {
  var e = fi !== 0;
  return ((fi = 0), e);
}
function jt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (be === null ? (ye.memoizedState = be = e) : (be = be.next = e), be);
}
function yt() {
  if (Ce === null) {
    var e = ye.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Ce.next;
  var t = be === null ? ye.memoizedState : be.next;
  if (t !== null) ((be = t), (Ce = e));
  else {
    if (e === null) throw Error(z(310));
    ((Ce = e),
      (e = {
        memoizedState: Ce.memoizedState,
        baseState: Ce.baseState,
        baseQueue: Ce.baseQueue,
        queue: Ce.queue,
        next: null,
      }),
      be === null ? (ye.memoizedState = be = e) : (be = be.next = e));
  }
  return be;
}
function pi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function jo(e) {
  var t = yt(),
    n = t.queue;
  if (n === null) throw Error(z(311));
  n.lastRenderedReducer = e;
  var r = Ce,
    i = r.baseQueue,
    l = n.pending;
  if (l !== null) {
    if (i !== null) {
      var o = i.next;
      ((i.next = l.next), (l.next = o));
    }
    ((r.baseQueue = i = l), (n.pending = null));
  }
  if (i !== null) {
    ((l = i.next), (r = r.baseState));
    var u = (o = null),
      s = null,
      a = l;
    do {
      var f = a.lane;
      if ((Rn & f) === f)
        (s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action)));
      else {
        var c = {
          lane: f,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        };
        (s === null ? ((u = s = c), (o = r)) : (s = s.next = c),
          (ye.lanes |= f),
          (Fn |= f));
      }
      a = a.next;
    } while (a !== null && a !== l);
    (s === null ? (o = r) : (s.next = u),
      Tt(r, t.memoizedState) || (Qe = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = s),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do ((l = i.lane), (ye.lanes |= l), (Fn |= l), (i = i.next));
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Do(e) {
  var t = yt(),
    n = t.queue;
  if (n === null) throw Error(z(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    l = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var o = (i = i.next);
    do ((l = e(l, o.action)), (o = o.next));
    while (o !== i);
    (Tt(l, t.memoizedState) || (Qe = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (n.lastRenderedState = l));
  }
  return [l, r];
}
function td() {}
function nd(e, t) {
  var n = ye,
    r = yt(),
    i = t(),
    l = !Tt(r.memoizedState, i);
  if (
    (l && ((r.memoizedState = i), (Qe = !0)),
    (r = r.queue),
    Qs(ld.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || l || (be !== null && be.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      di(9, id.bind(null, n, r, i, t), void 0, null),
      Ne === null)
    )
      throw Error(z(349));
    Rn & 30 || rd(n, t, i);
  }
  return i;
}
function rd(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ye.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ye.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function id(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), od(t) && ud(e));
}
function ld(e, t, n) {
  return n(function () {
    od(t) && ud(e);
  });
}
function od(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Tt(e, n);
  } catch {
    return !0;
  }
}
function ud(e) {
  var t = Kt(e, 1);
  t !== null && Pt(t, e, 1, -1);
}
function hc(e) {
  var t = jt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: pi,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = oy.bind(null, ye, e)),
    [t.memoizedState, e]
  );
}
function di(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ye.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ye.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function sd() {
  return yt().memoizedState;
}
function ol(e, t, n, r) {
  var i = jt();
  ((ye.flags |= e),
    (i.memoizedState = di(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Yl(e, t, n, r) {
  var i = yt();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (Ce !== null) {
    var o = Ce.memoizedState;
    if (((l = o.destroy), r !== null && Hs(r, o.deps))) {
      i.memoizedState = di(t, n, l, r);
      return;
    }
  }
  ((ye.flags |= e), (i.memoizedState = di(1 | t, n, l, r)));
}
function mc(e, t) {
  return ol(8390656, 8, e, t);
}
function Qs(e, t) {
  return Yl(2048, 8, e, t);
}
function ad(e, t) {
  return Yl(4, 2, e, t);
}
function cd(e, t) {
  return Yl(4, 4, e, t);
}
function fd(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function pd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Yl(4, 4, fd.bind(null, t, e), n)
  );
}
function qs() {}
function dd(e, t) {
  var n = yt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Hs(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function hd(e, t) {
  var n = yt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Hs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function md(e, t, n) {
  return Rn & 21
    ? (Tt(n, t) || ((n = vp()), (ye.lanes |= n), (Fn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Qe = !0)), (e.memoizedState = n));
}
function iy(e, t) {
  var n = ue;
  ((ue = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = Io.transition;
  Io.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((ue = n), (Io.transition = r));
  }
}
function gd() {
  return yt().memoizedState;
}
function ly(e, t, n) {
  var r = mn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    yd(e))
  )
    xd(t, n);
  else if (((n = Zp(e, t, n, r)), n !== null)) {
    var i = $e();
    (Pt(n, e, r, i), kd(n, t, r));
  }
}
function oy(e, t, n) {
  var r = mn(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (yd(e)) xd(t, i);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = t.lastRenderedReducer), l !== null)
    )
      try {
        var o = t.lastRenderedState,
          u = l(o, n);
        if (((i.hasEagerState = !0), (i.eagerState = u), Tt(u, o))) {
          var s = t.interleaved;
          (s === null
            ? ((i.next = i), Os(t))
            : ((i.next = s.next), (s.next = i)),
            (t.interleaved = i));
          return;
        }
      } catch {
      } finally {
      }
    ((n = Zp(e, t, i, r)),
      n !== null && ((i = $e()), Pt(n, e, r, i), kd(n, t, r)));
  }
}
function yd(e) {
  var t = e.alternate;
  return e === ye || (t !== null && t === ye);
}
function xd(e, t) {
  Wr = zl = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function kd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Es(e, n));
  }
}
var Il = {
    readContext: gt,
    useCallback: _e,
    useContext: _e,
    useEffect: _e,
    useImperativeHandle: _e,
    useInsertionEffect: _e,
    useLayoutEffect: _e,
    useMemo: _e,
    useReducer: _e,
    useRef: _e,
    useState: _e,
    useDebugValue: _e,
    useDeferredValue: _e,
    useTransition: _e,
    useMutableSource: _e,
    useSyncExternalStore: _e,
    useId: _e,
    unstable_isNewReconciler: !1,
  },
  uy = {
    readContext: gt,
    useCallback: function (e, t) {
      return ((jt().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: gt,
    useEffect: mc,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        ol(4194308, 4, fd.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return ol(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return ol(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = jt();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = jt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = ly.bind(null, ye, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = jt();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: hc,
    useDebugValue: qs,
    useDeferredValue: function (e) {
      return (jt().memoizedState = e);
    },
    useTransition: function () {
      var e = hc(!1),
        t = e[0];
      return ((e = iy.bind(null, e[1])), (jt().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ye,
        i = jt();
      if (me) {
        if (n === void 0) throw Error(z(407));
        n = n();
      } else {
        if (((n = t()), Ne === null)) throw Error(z(349));
        Rn & 30 || rd(r, t, n);
      }
      i.memoizedState = n;
      var l = { value: n, getSnapshot: t };
      return (
        (i.queue = l),
        mc(ld.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        di(9, id.bind(null, r, l, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = jt(),
        t = Ne.identifierPrefix;
      if (me) {
        var n = Vt,
          r = Ht;
        ((n = (r & ~(1 << (32 - Nt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = fi++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = ry++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  sy = {
    readContext: gt,
    useCallback: dd,
    useContext: gt,
    useEffect: Qs,
    useImperativeHandle: pd,
    useInsertionEffect: ad,
    useLayoutEffect: cd,
    useMemo: hd,
    useReducer: jo,
    useRef: sd,
    useState: function () {
      return jo(pi);
    },
    useDebugValue: qs,
    useDeferredValue: function (e) {
      var t = yt();
      return md(t, Ce.memoizedState, e);
    },
    useTransition: function () {
      var e = jo(pi)[0],
        t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: td,
    useSyncExternalStore: nd,
    useId: gd,
    unstable_isNewReconciler: !1,
  },
  ay = {
    readContext: gt,
    useCallback: dd,
    useContext: gt,
    useEffect: Qs,
    useImperativeHandle: pd,
    useInsertionEffect: ad,
    useLayoutEffect: cd,
    useMemo: hd,
    useReducer: Do,
    useRef: sd,
    useState: function () {
      return Do(pi);
    },
    useDebugValue: qs,
    useDeferredValue: function (e) {
      var t = yt();
      return Ce === null ? (t.memoizedState = e) : md(t, Ce.memoizedState, e);
    },
    useTransition: function () {
      var e = Do(pi)[0],
        t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: td,
    useSyncExternalStore: nd,
    useId: gd,
    unstable_isNewReconciler: !1,
  };
function Ct(e, t) {
  if (e && e.defaultProps) {
    ((t = xe({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Du(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : xe({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Xl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? $n(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = $e(),
      i = mn(e),
      l = Wt(r, i);
    ((l.payload = t),
      n != null && (l.callback = n),
      (t = dn(e, l, i)),
      t !== null && (Pt(t, e, i, r), il(t, e, i)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = $e(),
      i = mn(e),
      l = Wt(r, i);
    ((l.tag = 1),
      (l.payload = t),
      n != null && (l.callback = n),
      (t = dn(e, l, i)),
      t !== null && (Pt(t, e, i, r), il(t, e, i)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = $e(),
      r = mn(e),
      i = Wt(n, r);
    ((i.tag = 2),
      t != null && (i.callback = t),
      (t = dn(e, i, r)),
      t !== null && (Pt(t, e, r, n), il(t, e, r)));
  },
};
function gc(e, t, n, r, i, l, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, l, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !li(n, r) || !li(i, l)
        : !0
  );
}
function vd(e, t, n) {
  var r = !1,
    i = xn,
    l = t.contextType;
  return (
    typeof l == "object" && l !== null
      ? (l = gt(l))
      : ((i = Ke(t) ? Dn : De.current),
        (r = t.contextTypes),
        (l = (r = r != null) ? dr(e, i) : xn)),
    (t = new t(n, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Xl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  );
}
function yc(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Xl.enqueueReplaceState(t, t.state, null));
}
function Au(e, t, n, r) {
  var i = e.stateNode;
  ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), Ms(e));
  var l = t.contextType;
  (typeof l == "object" && l !== null
    ? (i.context = gt(l))
    : ((l = Ke(t) ? Dn : De.current), (i.context = dr(e, l))),
    (i.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == "function" && (Du(e, t, l, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Xl.enqueueReplaceState(i, i.state, null),
      Tl(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308));
}
function yr(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Fm(r)), (r = r.return));
    while (r);
    var i = n;
  } catch (l) {
    i =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Ao(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ru(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var cy = typeof WeakMap == "function" ? WeakMap : Map;
function wd(e, t, n) {
  ((n = Wt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (Dl || ((Dl = !0), (Qu = r)), Ru(e, t));
    }),
    n
  );
}
function Sd(e, t, n) {
  ((n = Wt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    ((n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Ru(e, t);
      }));
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == "function" &&
      (n.callback = function () {
        (Ru(e, t),
          typeof r != "function" &&
            (hn === null ? (hn = new Set([this])) : hn.add(this)));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function xc(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new cy();
    var i = new Set();
    r.set(t, i);
  } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
  i.has(n) || (i.add(n), (e = Ey.bind(null, e, t, n)), t.then(e, e));
}
function kc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function vc(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Wt(-1, 1)), (t.tag = 2), dn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var fy = Xt.ReactCurrentOwner,
  Qe = !1;
function Me(e, t, n, r) {
  t.child = e === null ? Gp(t, null, n, r) : mr(t, e.child, n, r);
}
function wc(e, t, n, r, i) {
  n = n.render;
  var l = t.ref;
  return (
    ar(t, i),
    (r = Vs(e, t, n, r, l, i)),
    (n = Ws()),
    e !== null && !Qe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Yt(e, t, i))
      : (me && n && Is(t), (t.flags |= 1), Me(e, t, r, i), t.child)
  );
}
function Sc(e, t, n, r, i) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" &&
      !ta(l) &&
      l.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), Cd(e, t, l, r, i))
      : ((e = cl(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((l = e.child), !(e.lanes & i))) {
    var o = l.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : li), n(o, r) && e.ref === t.ref)
    )
      return Yt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = gn(l, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Cd(e, t, n, r, i) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (li(l, r) && e.ref === t.ref)
      if (((Qe = !1), (t.pendingProps = r = l), (e.lanes & i) !== 0))
        e.flags & 131072 && (Qe = !0);
      else return ((t.lanes = e.lanes), Yt(e, t, i));
  }
  return Fu(e, t, n, r, i);
}
function Ed(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        fe(ir, Ze),
        (Ze |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = l !== null ? l.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          fe(ir, Ze),
          (Ze |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = l !== null ? l.baseLanes : n),
        fe(ir, Ze),
        (Ze |= r));
    }
  else
    (l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n),
      fe(ir, Ze),
      (Ze |= r));
  return (Me(e, t, i, n), t.child);
}
function bd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Fu(e, t, n, r, i) {
  var l = Ke(n) ? Dn : De.current;
  return (
    (l = dr(t, l)),
    ar(t, i),
    (n = Vs(e, t, n, r, l, i)),
    (r = Ws()),
    e !== null && !Qe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Yt(e, t, i))
      : (me && r && Is(t), (t.flags |= 1), Me(e, t, n, i), t.child)
  );
}
function Cc(e, t, n, r, i) {
  if (Ke(n)) {
    var l = !0;
    El(t);
  } else l = !1;
  if ((ar(t, i), t.stateNode === null))
    (ul(e, t), vd(t, n, r), Au(t, n, r, i), (r = !0));
  else if (e === null) {
    var o = t.stateNode,
      u = t.memoizedProps;
    o.props = u;
    var s = o.context,
      a = n.contextType;
    typeof a == "object" && a !== null
      ? (a = gt(a))
      : ((a = Ke(n) ? Dn : De.current), (a = dr(t, a)));
    var f = n.getDerivedStateFromProps,
      c =
        typeof f == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    (c ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== r || s !== a) && yc(t, o, r, a)),
      (rn = !1));
    var d = t.memoizedState;
    ((o.state = d),
      Tl(t, r, o, i),
      (s = t.memoizedState),
      u !== r || d !== s || qe.current || rn
        ? (typeof f == "function" && (Du(t, n, f, r), (s = t.memoizedState)),
          (u = rn || gc(t, n, u, r, d, s, a))
            ? (c ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (o.props = r),
          (o.state = s),
          (o.context = a),
          (r = u))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((o = t.stateNode),
      Jp(e, t),
      (u = t.memoizedProps),
      (a = t.type === t.elementType ? u : Ct(t.type, u)),
      (o.props = a),
      (c = t.pendingProps),
      (d = o.context),
      (s = n.contextType),
      typeof s == "object" && s !== null
        ? (s = gt(s))
        : ((s = Ke(n) ? Dn : De.current), (s = dr(t, s))));
    var p = n.getDerivedStateFromProps;
    ((f =
      typeof p == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== c || d !== s) && yc(t, o, r, s)),
      (rn = !1),
      (d = t.memoizedState),
      (o.state = d),
      Tl(t, r, o, i));
    var m = t.memoizedState;
    u !== c || d !== m || qe.current || rn
      ? (typeof p == "function" && (Du(t, n, p, r), (m = t.memoizedState)),
        (a = rn || gc(t, n, a, r, d, m, s) || !1)
          ? (f ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, m, s),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, m, s)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (u === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = m)),
        (o.props = r),
        (o.state = m),
        (o.context = s),
        (r = a))
      : (typeof o.componentDidUpdate != "function" ||
          (u === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ou(e, t, n, r, l, i);
}
function Ou(e, t, n, r, i, l) {
  bd(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return (i && sc(t, n, !1), Yt(e, t, l));
  ((r = t.stateNode), (fy.current = t));
  var u =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = mr(t, e.child, null, l)), (t.child = mr(t, null, u, l)))
      : Me(e, t, u, l),
    (t.memoizedState = r.state),
    i && sc(t, n, !0),
    t.child
  );
}
function Nd(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? uc(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && uc(e, t.context, !1),
    Bs(e, t.containerInfo));
}
function Ec(e, t, n, r, i) {
  return (hr(), Ds(i), (t.flags |= 256), Me(e, t, n, r), t.child);
}
var Mu = { dehydrated: null, treeContext: null, retryLane: 0 };
function Bu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Pd(e, t, n) {
  var r = t.pendingProps,
    i = ge.current,
    l = !1,
    o = (t.flags & 128) !== 0,
    u;
  if (
    ((u = o) ||
      (u = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    u
      ? ((l = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    fe(ge, i & 1),
    e === null)
  )
    return (
      Iu(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          l
            ? ((r = t.mode),
              (l = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = o))
                : (l = Jl(o, r, 0, null)),
              (e = jn(e, r, n, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = Bu(n)),
              (t.memoizedState = Mu),
              e)
            : Ks(t, o))
    );
  if (((i = e.memoizedState), i !== null && ((u = i.dehydrated), u !== null)))
    return py(e, t, o, r, u, i, n);
  if (l) {
    ((l = r.fallback), (o = t.mode), (i = e.child), (u = i.sibling));
    var s = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = gn(i, s)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      u !== null ? (l = gn(u, l)) : ((l = jn(l, o, n, null)), (l.flags |= 2)),
      (l.return = t),
      (r.return = t),
      (r.sibling = l),
      (t.child = r),
      (r = l),
      (l = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? Bu(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (l.memoizedState = o),
      (l.childLanes = e.childLanes & ~n),
      (t.memoizedState = Mu),
      r
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (r = gn(l, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Ks(e, t) {
  return (
    (t = Jl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Wi(e, t, n, r) {
  return (
    r !== null && Ds(r),
    mr(t, e.child, null, n),
    (e = Ks(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function py(e, t, n, r, i, l, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Ao(Error(z(422)))), Wi(e, t, o, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((l = r.fallback),
          (i = t.mode),
          (r = Jl({ mode: "visible", children: r.children }, i, 0, null)),
          (l = jn(l, i, o, null)),
          (l.flags |= 2),
          (r.return = t),
          (l.return = t),
          (r.sibling = l),
          (t.child = r),
          t.mode & 1 && mr(t, e.child, null, o),
          (t.child.memoizedState = Bu(o)),
          (t.memoizedState = Mu),
          l);
  if (!(t.mode & 1)) return Wi(e, t, o, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var u = r.dgst;
    return (
      (r = u),
      (l = Error(z(419))),
      (r = Ao(l, r, void 0)),
      Wi(e, t, o, r)
    );
  }
  if (((u = (o & e.childLanes) !== 0), Qe || u)) {
    if (((r = Ne), r !== null)) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      ((i = i & (r.suspendedLanes | o) ? 0 : i),
        i !== 0 &&
          i !== l.retryLane &&
          ((l.retryLane = i), Kt(e, i), Pt(r, e, i, -1)));
    }
    return (ea(), (r = Ao(Error(z(421)))), Wi(e, t, o, r));
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = by.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = l.treeContext),
      (Je = pn(i.nextSibling)),
      (tt = t),
      (me = !0),
      (bt = null),
      e !== null &&
        ((ft[pt++] = Ht),
        (ft[pt++] = Vt),
        (ft[pt++] = An),
        (Ht = e.id),
        (Vt = e.overflow),
        (An = t)),
      (t = Ks(t, r.children)),
      (t.flags |= 4096),
      t);
}
function bc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), ju(e.return, t, n));
}
function Ro(e, t, n, r, i) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = r),
      (l.tail = n),
      (l.tailMode = i));
}
function Ld(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    l = r.tail;
  if ((Me(e, t, r.children, n), (r = ge.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && bc(e, n, t);
        else if (e.tag === 19) bc(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((fe(ge, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          ((e = n.alternate),
            e !== null && _l(e) === null && (i = n),
            (n = n.sibling));
        ((n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Ro(t, !1, i, n, l));
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && _l(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
        }
        Ro(t, !0, n, null, l);
        break;
      case "together":
        Ro(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ul(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Yt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Fn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(z(153));
  if (t.child !== null) {
    for (
      e = t.child, n = gn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling),
        (n = n.sibling = gn(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function dy(e, t, n) {
  switch (t.tag) {
    case 3:
      (Nd(t), hr());
      break;
    case 5:
      ed(t);
      break;
    case 1:
      Ke(t.type) && El(t);
      break;
    case 4:
      Bs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      (fe(Pl, r._currentValue), (r._currentValue = i));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (fe(ge, ge.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Pd(e, t, n)
            : (fe(ge, ge.current & 1),
              (e = Yt(e, t, n)),
              e !== null ? e.sibling : null);
      fe(ge, ge.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Ld(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        fe(ge, ge.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Ed(e, t, n));
  }
  return Yt(e, t, n);
}
var Td, $u, _d, zd;
Td = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
$u = function () {};
_d = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    ((e = t.stateNode), zn(Ot.current));
    var l = null;
    switch (n) {
      case "input":
        ((i = au(e, i)), (r = au(e, r)), (l = []));
        break;
      case "select":
        ((i = xe({}, i, { value: void 0 })),
          (r = xe({}, r, { value: void 0 })),
          (l = []));
        break;
      case "textarea":
        ((i = pu(e, i)), (r = pu(e, r)), (l = []));
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Sl);
    }
    hu(n, r);
    var o;
    n = null;
    for (a in i)
      if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null)
        if (a === "style") {
          var u = i[a];
          for (o in u) u.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (Zr.hasOwnProperty(a)
              ? l || (l = [])
              : (l = l || []).push(a, null));
    for (a in r) {
      var s = r[a];
      if (
        ((u = i != null ? i[a] : void 0),
        r.hasOwnProperty(a) && s !== u && (s != null || u != null))
      )
        if (a === "style")
          if (u) {
            for (o in u)
              !u.hasOwnProperty(o) ||
                (s && s.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in s)
              s.hasOwnProperty(o) &&
                u[o] !== s[o] &&
                (n || (n = {}), (n[o] = s[o]));
          } else (n || (l || (l = []), l.push(a, n)), (n = s));
        else
          a === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (l = l || []).push(a, s))
            : a === "children"
              ? (typeof s != "string" && typeof s != "number") ||
                (l = l || []).push(a, "" + s)
              : a !== "suppressContentEditableWarning" &&
                a !== "suppressHydrationWarning" &&
                (Zr.hasOwnProperty(a)
                  ? (s != null && a === "onScroll" && pe("scroll", e),
                    l || u === s || (l = []))
                  : (l = l || []).push(a, s));
    }
    n && (l = l || []).push("style", n);
    var a = l;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
zd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ir(e, t) {
  if (!me)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ze(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling));
  else
    for (i = e.child; i !== null; )
      ((n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function hy(e, t, n) {
  var r = t.pendingProps;
  switch ((js(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ze(t), null);
    case 1:
      return (Ke(t.type) && Cl(), ze(t), null);
    case 3:
      return (
        (r = t.stateNode),
        gr(),
        de(qe),
        de(De),
        Us(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Hi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), bt !== null && (Yu(bt), (bt = null)))),
        $u(e, t),
        ze(t),
        null
      );
    case 5:
      $s(t);
      var i = zn(ci.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (_d(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(z(166));
          return (ze(t), null);
        }
        if (((e = zn(Ot.current)), Hi(t))) {
          ((r = t.stateNode), (n = t.type));
          var l = t.memoizedProps;
          switch (((r[Rt] = t), (r[si] = l), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (pe("cancel", r), pe("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              pe("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Mr.length; i++) pe(Mr[i], r);
              break;
            case "source":
              pe("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (pe("error", r), pe("load", r));
              break;
            case "details":
              pe("toggle", r);
              break;
            case "input":
              (Da(r, l), pe("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!l.multiple }),
                pe("invalid", r));
              break;
            case "textarea":
              (Ra(r, l), pe("invalid", r));
          }
          (hu(n, l), (i = null));
          for (var o in l)
            if (l.hasOwnProperty(o)) {
              var u = l[o];
              o === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ui(r.textContent, u, e),
                    (i = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ui(r.textContent, u, e),
                    (i = ["children", "" + u]))
                : Zr.hasOwnProperty(o) &&
                  u != null &&
                  o === "onScroll" &&
                  pe("scroll", r);
            }
          switch (n) {
            case "input":
              (Di(r), Aa(r, l, !0));
              break;
            case "textarea":
              (Di(r), Fa(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = Sl);
          }
          ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((o = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = lp(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[Rt] = t),
            (e[si] = r),
            Td(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((o = mu(n, r)), n)) {
              case "dialog":
                (pe("cancel", e), pe("close", e), (i = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (pe("load", e), (i = r));
                break;
              case "video":
              case "audio":
                for (i = 0; i < Mr.length; i++) pe(Mr[i], e);
                i = r;
                break;
              case "source":
                (pe("error", e), (i = r));
                break;
              case "img":
              case "image":
              case "link":
                (pe("error", e), pe("load", e), (i = r));
                break;
              case "details":
                (pe("toggle", e), (i = r));
                break;
              case "input":
                (Da(e, r), (i = au(e, r)), pe("invalid", e));
                break;
              case "option":
                i = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = xe({}, r, { value: void 0 })),
                  pe("invalid", e));
                break;
              case "textarea":
                (Ra(e, r), (i = pu(e, r)), pe("invalid", e));
                break;
              default:
                i = r;
            }
            (hu(n, i), (u = i));
            for (l in u)
              if (u.hasOwnProperty(l)) {
                var s = u[l];
                l === "style"
                  ? sp(e, s)
                  : l === "dangerouslySetInnerHTML"
                    ? ((s = s ? s.__html : void 0), s != null && op(e, s))
                    : l === "children"
                      ? typeof s == "string"
                        ? (n !== "textarea" || s !== "") && Jr(e, s)
                        : typeof s == "number" && Jr(e, "" + s)
                      : l !== "suppressContentEditableWarning" &&
                        l !== "suppressHydrationWarning" &&
                        l !== "autoFocus" &&
                        (Zr.hasOwnProperty(l)
                          ? s != null && l === "onScroll" && pe("scroll", e)
                          : s != null && xs(e, l, s, o));
              }
            switch (n) {
              case "input":
                (Di(e), Aa(e, r, !1));
                break;
              case "textarea":
                (Di(e), Fa(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + yn(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (l = r.value),
                  l != null
                    ? lr(e, !!r.multiple, l, !1)
                    : r.defaultValue != null &&
                      lr(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Sl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ze(t), null);
    case 6:
      if (e && t.stateNode != null) zd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(z(166));
        if (((n = zn(ci.current)), zn(Ot.current), Hi(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Rt] = t),
            (l = r.nodeValue !== n) && ((e = tt), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ui(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ui(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          l && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Rt] = t),
            (t.stateNode = r));
      }
      return (ze(t), null);
    case 13:
      if (
        (de(ge),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (me && Je !== null && t.mode & 1 && !(t.flags & 128))
          (Yp(), hr(), (t.flags |= 98560), (l = !1));
        else if (((l = Hi(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(z(318));
            if (
              ((l = t.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(z(317));
            l[Rt] = t;
          } else
            (hr(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ze(t), (l = !1));
        } else (bt !== null && (Yu(bt), (bt = null)), (l = !0));
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ge.current & 1 ? Ee === 0 && (Ee = 3) : ea())),
          t.updateQueue !== null && (t.flags |= 4),
          ze(t),
          null);
    case 4:
      return (
        gr(),
        $u(e, t),
        e === null && oi(t.stateNode.containerInfo),
        ze(t),
        null
      );
    case 10:
      return (Fs(t.type._context), ze(t), null);
    case 17:
      return (Ke(t.type) && Cl(), ze(t), null);
    case 19:
      if ((de(ge), (l = t.memoizedState), l === null)) return (ze(t), null);
      if (((r = (t.flags & 128) !== 0), (o = l.rendering), o === null))
        if (r) Ir(l, !1);
        else {
          if (Ee !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = _l(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    Ir(l, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((l = n),
                    (e = r),
                    (l.flags &= 14680066),
                    (o = l.alternate),
                    o === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = o.childLanes),
                        (l.lanes = o.lanes),
                        (l.child = o.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = o.memoizedProps),
                        (l.memoizedState = o.memoizedState),
                        (l.updateQueue = o.updateQueue),
                        (l.type = o.type),
                        (e = o.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (fe(ge, (ge.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          l.tail !== null &&
            ve() > xr &&
            ((t.flags |= 128), (r = !0), Ir(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = _l(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Ir(l, !0),
              l.tail === null && l.tailMode === "hidden" && !o.alternate && !me)
            )
              return (ze(t), null);
          } else
            2 * ve() - l.renderingStartTime > xr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Ir(l, !1), (t.lanes = 4194304));
        l.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = l.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (l.last = o));
      }
      return l.tail !== null
        ? ((t = l.tail),
          (l.rendering = t),
          (l.tail = t.sibling),
          (l.renderingStartTime = ve()),
          (t.sibling = null),
          (n = ge.current),
          fe(ge, r ? (n & 1) | 2 : n & 1),
          t)
        : (ze(t), null);
    case 22:
    case 23:
      return (
        Js(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ze & 1073741824 && (ze(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ze(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(z(156, t.tag));
}
function my(e, t) {
  switch ((js(t), t.tag)) {
    case 1:
      return (
        Ke(t.type) && Cl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        gr(),
        de(qe),
        de(De),
        Us(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return ($s(t), null);
    case 13:
      if (
        (de(ge), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(z(340));
        hr();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (de(ge), null);
    case 4:
      return (gr(), null);
    case 10:
      return (Fs(t.type._context), null);
    case 22:
    case 23:
      return (Js(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Qi = !1,
  Ie = !1,
  gy = typeof WeakSet == "function" ? WeakSet : Set,
  O = null;
function rr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ke(e, t, r);
      }
    else n.current = null;
}
function Uu(e, t, n) {
  try {
    n();
  } catch (r) {
    ke(e, t, r);
  }
}
var Nc = !1;
function yy(e, t) {
  if (((bu = kl), (e = Rp()), zs(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            l = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, l.nodeType);
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            u = -1,
            s = -1,
            a = 0,
            f = 0,
            c = e,
            d = null;
          t: for (;;) {
            for (
              var p;
              c !== n || (i !== 0 && c.nodeType !== 3) || (u = o + i),
                c !== l || (r !== 0 && c.nodeType !== 3) || (s = o + r),
                c.nodeType === 3 && (o += c.nodeValue.length),
                (p = c.firstChild) !== null;

            )
              ((d = c), (c = p));
            for (;;) {
              if (c === e) break t;
              if (
                (d === n && ++a === i && (u = o),
                d === l && ++f === r && (s = o),
                (p = c.nextSibling) !== null)
              )
                break;
              ((c = d), (d = c.parentNode));
            }
            c = p;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Nu = { focusedElem: e, selectionRange: n }, kl = !1, O = t; O !== null; )
    if (((t = O), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (O = e));
    else
      for (; O !== null; ) {
        t = O;
        try {
          var m = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m !== null) {
                  var k = m.memoizedProps,
                    P = m.memoizedState,
                    h = t.stateNode,
                    g = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? k : Ct(t.type, k),
                      P,
                    );
                  h.__reactInternalSnapshotBeforeUpdate = g;
                }
                break;
              case 3:
                var y = t.stateNode.containerInfo;
                y.nodeType === 1
                  ? (y.textContent = "")
                  : y.nodeType === 9 &&
                    y.documentElement &&
                    y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(z(163));
            }
        } catch (E) {
          ke(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (O = e));
          break;
        }
        O = t.return;
      }
  return ((m = Nc), (Nc = !1), m);
}
function Qr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var l = i.destroy;
        ((i.destroy = void 0), l !== void 0 && Uu(t, n, l));
      }
      i = i.next;
    } while (i !== r);
  }
}
function Gl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Hu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Id(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Id(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Rt], delete t[si], delete t[Tu], delete t[Jg], delete t[ey])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function jd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Pc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || jd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Vu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Sl)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Vu(e, t, n), e = e.sibling; e !== null; )
      (Vu(e, t, n), (e = e.sibling));
}
function Wu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Wu(e, t, n), e = e.sibling; e !== null; )
      (Wu(e, t, n), (e = e.sibling));
}
var Pe = null,
  Et = !1;
function Jt(e, t, n) {
  for (n = n.child; n !== null; ) (Dd(e, t, n), (n = n.sibling));
}
function Dd(e, t, n) {
  if (Ft && typeof Ft.onCommitFiberUnmount == "function")
    try {
      Ft.onCommitFiberUnmount(Hl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ie || rr(n, t);
    case 6:
      var r = Pe,
        i = Et;
      ((Pe = null),
        Jt(e, t, n),
        (Pe = r),
        (Et = i),
        Pe !== null &&
          (Et
            ? ((e = Pe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Pe.removeChild(n.stateNode)));
      break;
    case 18:
      Pe !== null &&
        (Et
          ? ((e = Pe),
            (n = n.stateNode),
            e.nodeType === 8
              ? To(e.parentNode, n)
              : e.nodeType === 1 && To(e, n),
            ri(e))
          : To(Pe, n.stateNode));
      break;
    case 4:
      ((r = Pe),
        (i = Et),
        (Pe = n.stateNode.containerInfo),
        (Et = !0),
        Jt(e, t, n),
        (Pe = r),
        (Et = i));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ie &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var l = i,
            o = l.destroy;
          ((l = l.tag),
            o !== void 0 && (l & 2 || l & 4) && Uu(n, t, o),
            (i = i.next));
        } while (i !== r);
      }
      Jt(e, t, n);
      break;
    case 1:
      if (
        !Ie &&
        (rr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (u) {
          ke(n, t, u);
        }
      Jt(e, t, n);
      break;
    case 21:
      Jt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ie = (r = Ie) || n.memoizedState !== null), Jt(e, t, n), (Ie = r))
        : Jt(e, t, n);
      break;
    default:
      Jt(e, t, n);
  }
}
function Lc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new gy()),
      t.forEach(function (r) {
        var i = Ny.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      }));
  }
}
function St(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var l = e,
          o = t,
          u = o;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              ((Pe = u.stateNode), (Et = !1));
              break e;
            case 3:
              ((Pe = u.stateNode.containerInfo), (Et = !0));
              break e;
            case 4:
              ((Pe = u.stateNode.containerInfo), (Et = !0));
              break e;
          }
          u = u.return;
        }
        if (Pe === null) throw Error(z(160));
        (Dd(l, o, i), (Pe = null), (Et = !1));
        var s = i.alternate;
        (s !== null && (s.return = null), (i.return = null));
      } catch (a) {
        ke(i, t, a);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (Ad(t, e), (t = t.sibling));
}
function Ad(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((St(t, e), It(e), r & 4)) {
        try {
          (Qr(3, e, e.return), Gl(3, e));
        } catch (k) {
          ke(e, e.return, k);
        }
        try {
          Qr(5, e, e.return);
        } catch (k) {
          ke(e, e.return, k);
        }
      }
      break;
    case 1:
      (St(t, e), It(e), r & 512 && n !== null && rr(n, n.return));
      break;
    case 5:
      if (
        (St(t, e),
        It(e),
        r & 512 && n !== null && rr(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Jr(i, "");
        } catch (k) {
          ke(e, e.return, k);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var l = e.memoizedProps,
          o = n !== null ? n.memoizedProps : l,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            (u === "input" && l.type === "radio" && l.name != null && rp(i, l),
              mu(u, o));
            var a = mu(u, l);
            for (o = 0; o < s.length; o += 2) {
              var f = s[o],
                c = s[o + 1];
              f === "style"
                ? sp(i, c)
                : f === "dangerouslySetInnerHTML"
                  ? op(i, c)
                  : f === "children"
                    ? Jr(i, c)
                    : xs(i, f, c, a);
            }
            switch (u) {
              case "input":
                cu(i, l);
                break;
              case "textarea":
                ip(i, l);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var p = l.value;
                p != null
                  ? lr(i, !!l.multiple, p, !1)
                  : d !== !!l.multiple &&
                    (l.defaultValue != null
                      ? lr(i, !!l.multiple, l.defaultValue, !0)
                      : lr(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[si] = l;
          } catch (k) {
            ke(e, e.return, k);
          }
      }
      break;
    case 6:
      if ((St(t, e), It(e), r & 4)) {
        if (e.stateNode === null) throw Error(z(162));
        ((i = e.stateNode), (l = e.memoizedProps));
        try {
          i.nodeValue = l;
        } catch (k) {
          ke(e, e.return, k);
        }
      }
      break;
    case 3:
      if (
        (St(t, e), It(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          ri(t.containerInfo);
        } catch (k) {
          ke(e, e.return, k);
        }
      break;
    case 4:
      (St(t, e), It(e));
      break;
    case 13:
      (St(t, e),
        It(e),
        (i = e.child),
        i.flags & 8192 &&
          ((l = i.memoizedState !== null),
          (i.stateNode.isHidden = l),
          !l ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Gs = ve())),
        r & 4 && Lc(e));
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ie = (a = Ie) || f), St(t, e), (Ie = a)) : St(t, e),
        It(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null),
          (e.stateNode.isHidden = a) && !f && e.mode & 1)
        )
          for (O = e, f = e.child; f !== null; ) {
            for (c = O = f; O !== null; ) {
              switch (((d = O), (p = d.child), d.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qr(4, d, d.return);
                  break;
                case 1:
                  rr(d, d.return);
                  var m = d.stateNode;
                  if (typeof m.componentWillUnmount == "function") {
                    ((r = d), (n = d.return));
                    try {
                      ((t = r),
                        (m.props = t.memoizedProps),
                        (m.state = t.memoizedState),
                        m.componentWillUnmount());
                    } catch (k) {
                      ke(r, n, k);
                    }
                  }
                  break;
                case 5:
                  rr(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    _c(c);
                    continue;
                  }
              }
              p !== null ? ((p.return = d), (O = p)) : _c(c);
            }
            f = f.sibling;
          }
        e: for (f = null, c = e; ; ) {
          if (c.tag === 5) {
            if (f === null) {
              f = c;
              try {
                ((i = c.stateNode),
                  a
                    ? ((l = i.style),
                      typeof l.setProperty == "function"
                        ? l.setProperty("display", "none", "important")
                        : (l.display = "none"))
                    : ((u = c.stateNode),
                      (s = c.memoizedProps.style),
                      (o =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (u.style.display = up("display", o))));
              } catch (k) {
                ke(e, e.return, k);
              }
            }
          } else if (c.tag === 6) {
            if (f === null)
              try {
                c.stateNode.nodeValue = a ? "" : c.memoizedProps;
              } catch (k) {
                ke(e, e.return, k);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            ((c.child.return = c), (c = c.child));
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            (f === c && (f = null), (c = c.return));
          }
          (f === c && (f = null),
            (c.sibling.return = c.return),
            (c = c.sibling));
        }
      }
      break;
    case 19:
      (St(t, e), It(e), r & 4 && Lc(e));
      break;
    case 21:
      break;
    default:
      (St(t, e), It(e));
  }
}
function It(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (jd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(z(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Jr(i, ""), (r.flags &= -33));
          var l = Pc(e);
          Wu(e, l, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            u = Pc(e);
          Vu(e, u, o);
          break;
        default:
          throw Error(z(161));
      }
    } catch (s) {
      ke(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function xy(e, t, n) {
  ((O = e), Rd(e));
}
function Rd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; O !== null; ) {
    var i = O,
      l = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || Qi;
      if (!o) {
        var u = i.alternate,
          s = (u !== null && u.memoizedState !== null) || Ie;
        u = Qi;
        var a = Ie;
        if (((Qi = o), (Ie = s) && !a))
          for (O = i; O !== null; )
            ((o = O),
              (s = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? zc(i)
                : s !== null
                  ? ((s.return = o), (O = s))
                  : zc(i));
        for (; l !== null; ) ((O = l), Rd(l), (l = l.sibling));
        ((O = i), (Qi = u), (Ie = a));
      }
      Tc(e);
    } else
      i.subtreeFlags & 8772 && l !== null ? ((l.return = i), (O = l)) : Tc(e);
  }
}
function Tc(e) {
  for (; O !== null; ) {
    var t = O;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ie || Gl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ie)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ct(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var l = t.updateQueue;
              l !== null && dc(t, l, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                dc(t, o, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var a = t.alternate;
                if (a !== null) {
                  var f = a.memoizedState;
                  if (f !== null) {
                    var c = f.dehydrated;
                    c !== null && ri(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(z(163));
          }
        Ie || (t.flags & 512 && Hu(t));
      } catch (d) {
        ke(t, t.return, d);
      }
    }
    if (t === e) {
      O = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (O = n));
      break;
    }
    O = t.return;
  }
}
function _c(e) {
  for (; O !== null; ) {
    var t = O;
    if (t === e) {
      O = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (O = n));
      break;
    }
    O = t.return;
  }
}
function zc(e) {
  for (; O !== null; ) {
    var t = O;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Gl(4, t);
          } catch (s) {
            ke(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              ke(t, i, s);
            }
          }
          var l = t.return;
          try {
            Hu(t);
          } catch (s) {
            ke(t, l, s);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Hu(t);
          } catch (s) {
            ke(t, o, s);
          }
      }
    } catch (s) {
      ke(t, t.return, s);
    }
    if (t === e) {
      O = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      ((u.return = t.return), (O = u));
      break;
    }
    O = t.return;
  }
}
var ky = Math.ceil,
  jl = Xt.ReactCurrentDispatcher,
  Ys = Xt.ReactCurrentOwner,
  mt = Xt.ReactCurrentBatchConfig,
  re = 0,
  Ne = null,
  Se = null,
  Le = 0,
  Ze = 0,
  ir = vn(0),
  Ee = 0,
  hi = null,
  Fn = 0,
  Zl = 0,
  Xs = 0,
  qr = null,
  We = null,
  Gs = 0,
  xr = 1 / 0,
  $t = null,
  Dl = !1,
  Qu = null,
  hn = null,
  qi = !1,
  sn = null,
  Al = 0,
  Kr = 0,
  qu = null,
  sl = -1,
  al = 0;
function $e() {
  return re & 6 ? ve() : sl !== -1 ? sl : (sl = ve());
}
function mn(e) {
  return e.mode & 1
    ? re & 2 && Le !== 0
      ? Le & -Le
      : ny.transition !== null
        ? (al === 0 && (al = vp()), al)
        : ((e = ue),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Pp(e.type))),
          e)
    : 1;
}
function Pt(e, t, n, r) {
  if (50 < Kr) throw ((Kr = 0), (qu = null), Error(z(185)));
  (xi(e, n, r),
    (!(re & 2) || e !== Ne) &&
      (e === Ne && (!(re & 2) && (Zl |= n), Ee === 4 && on(e, Le)),
      Ye(e, r),
      n === 1 && re === 0 && !(t.mode & 1) && ((xr = ve() + 500), Kl && wn())));
}
function Ye(e, t) {
  var n = e.callbackNode;
  ng(e, t);
  var r = xl(e, e === Ne ? Le : 0);
  if (r === 0)
    (n !== null && Ba(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ba(n), t === 1))
      (e.tag === 0 ? ty(Ic.bind(null, e)) : Qp(Ic.bind(null, e)),
        Gg(function () {
          !(re & 6) && wn();
        }),
        (n = null));
    else {
      switch (wp(r)) {
        case 1:
          n = Cs;
          break;
        case 4:
          n = xp;
          break;
        case 16:
          n = yl;
          break;
        case 536870912:
          n = kp;
          break;
        default:
          n = yl;
      }
      n = Vd(n, Fd.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Fd(e, t) {
  if (((sl = -1), (al = 0), re & 6)) throw Error(z(327));
  var n = e.callbackNode;
  if (cr() && e.callbackNode !== n) return null;
  var r = xl(e, e === Ne ? Le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Rl(e, r);
  else {
    t = r;
    var i = re;
    re |= 2;
    var l = Md();
    (Ne !== e || Le !== t) && (($t = null), (xr = ve() + 500), In(e, t));
    do
      try {
        Sy();
        break;
      } catch (u) {
        Od(e, u);
      }
    while (!0);
    (Rs(),
      (jl.current = l),
      (re = i),
      Se !== null ? (t = 0) : ((Ne = null), (Le = 0), (t = Ee)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = vu(e)), i !== 0 && ((r = i), (t = Ku(e, i)))), t === 1)
    )
      throw ((n = hi), In(e, 0), on(e, r), Ye(e, ve()), n);
    if (t === 6) on(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !vy(i) &&
          ((t = Rl(e, r)),
          t === 2 && ((l = vu(e)), l !== 0 && ((r = l), (t = Ku(e, l)))),
          t === 1))
      )
        throw ((n = hi), In(e, 0), on(e, r), Ye(e, ve()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(z(345));
        case 2:
          Pn(e, We, $t);
          break;
        case 3:
          if (
            (on(e, r), (r & 130023424) === r && ((t = Gs + 500 - ve()), 10 < t))
          ) {
            if (xl(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              ($e(), (e.pingedLanes |= e.suspendedLanes & i));
              break;
            }
            e.timeoutHandle = Lu(Pn.bind(null, e, We, $t), t);
            break;
          }
          Pn(e, We, $t);
          break;
        case 4:
          if ((on(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - Nt(r);
            ((l = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~l));
          }
          if (
            ((r = i),
            (r = ve() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * ky(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Lu(Pn.bind(null, e, We, $t), r);
            break;
          }
          Pn(e, We, $t);
          break;
        case 5:
          Pn(e, We, $t);
          break;
        default:
          throw Error(z(329));
      }
    }
  }
  return (Ye(e, ve()), e.callbackNode === n ? Fd.bind(null, e) : null);
}
function Ku(e, t) {
  var n = qr;
  return (
    e.current.memoizedState.isDehydrated && (In(e, t).flags |= 256),
    (e = Rl(e, t)),
    e !== 2 && ((t = We), (We = n), t !== null && Yu(t)),
    e
  );
}
function Yu(e) {
  We === null ? (We = e) : We.push.apply(We, e);
}
function vy(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            l = i.getSnapshot;
          i = i.value;
          try {
            if (!Tt(l(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function on(e, t) {
  for (
    t &= ~Xs,
      t &= ~Zl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Nt(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function Ic(e) {
  if (re & 6) throw Error(z(327));
  cr();
  var t = xl(e, 0);
  if (!(t & 1)) return (Ye(e, ve()), null);
  var n = Rl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = vu(e);
    r !== 0 && ((t = r), (n = Ku(e, r)));
  }
  if (n === 1) throw ((n = hi), In(e, 0), on(e, t), Ye(e, ve()), n);
  if (n === 6) throw Error(z(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Pn(e, We, $t),
    Ye(e, ve()),
    null
  );
}
function Zs(e, t) {
  var n = re;
  re |= 1;
  try {
    return e(t);
  } finally {
    ((re = n), re === 0 && ((xr = ve() + 500), Kl && wn()));
  }
}
function On(e) {
  sn !== null && sn.tag === 0 && !(re & 6) && cr();
  var t = re;
  re |= 1;
  var n = mt.transition,
    r = ue;
  try {
    if (((mt.transition = null), (ue = 1), e)) return e();
  } finally {
    ((ue = r), (mt.transition = n), (re = t), !(re & 6) && wn());
  }
}
function Js() {
  ((Ze = ir.current), de(ir));
}
function In(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Xg(n)), Se !== null))
    for (n = Se.return; n !== null; ) {
      var r = n;
      switch ((js(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && Cl());
          break;
        case 3:
          (gr(), de(qe), de(De), Us());
          break;
        case 5:
          $s(r);
          break;
        case 4:
          gr();
          break;
        case 13:
          de(ge);
          break;
        case 19:
          de(ge);
          break;
        case 10:
          Fs(r.type._context);
          break;
        case 22:
        case 23:
          Js();
      }
      n = n.return;
    }
  if (
    ((Ne = e),
    (Se = e = gn(e.current, null)),
    (Le = Ze = t),
    (Ee = 0),
    (hi = null),
    (Xs = Zl = Fn = 0),
    (We = qr = null),
    _n !== null)
  ) {
    for (t = 0; t < _n.length; t++)
      if (((n = _n[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          l = n.pending;
        if (l !== null) {
          var o = l.next;
          ((l.next = i), (r.next = o));
        }
        n.pending = r;
      }
    _n = null;
  }
  return e;
}
function Od(e, t) {
  do {
    var n = Se;
    try {
      if ((Rs(), (ll.current = Il), zl)) {
        for (var r = ye.memoizedState; r !== null; ) {
          var i = r.queue;
          (i !== null && (i.pending = null), (r = r.next));
        }
        zl = !1;
      }
      if (
        ((Rn = 0),
        (be = Ce = ye = null),
        (Wr = !1),
        (fi = 0),
        (Ys.current = null),
        n === null || n.return === null)
      ) {
        ((Ee = 1), (hi = t), (Se = null));
        break;
      }
      e: {
        var l = e,
          o = n.return,
          u = n,
          s = t;
        if (
          ((t = Le),
          (u.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var a = s,
            f = u,
            c = f.tag;
          if (!(f.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var d = f.alternate;
            d
              ? ((f.updateQueue = d.updateQueue),
                (f.memoizedState = d.memoizedState),
                (f.lanes = d.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var p = kc(o);
          if (p !== null) {
            ((p.flags &= -257),
              vc(p, o, u, l, t),
              p.mode & 1 && xc(l, a, t),
              (t = p),
              (s = a));
            var m = t.updateQueue;
            if (m === null) {
              var k = new Set();
              (k.add(s), (t.updateQueue = k));
            } else m.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              (xc(l, a, t), ea());
              break e;
            }
            s = Error(z(426));
          }
        } else if (me && u.mode & 1) {
          var P = kc(o);
          if (P !== null) {
            (!(P.flags & 65536) && (P.flags |= 256),
              vc(P, o, u, l, t),
              Ds(yr(s, u)));
            break e;
          }
        }
        ((l = s = yr(s, u)),
          Ee !== 4 && (Ee = 2),
          qr === null ? (qr = [l]) : qr.push(l),
          (l = o));
        do {
          switch (l.tag) {
            case 3:
              ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
              var h = wd(l, s, t);
              pc(l, h);
              break e;
            case 1:
              u = s;
              var g = l.type,
                y = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof g.getDerivedStateFromError == "function" ||
                  (y !== null &&
                    typeof y.componentDidCatch == "function" &&
                    (hn === null || !hn.has(y))))
              ) {
                ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                var E = Sd(l, u, t);
                pc(l, E);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      $d(n);
    } catch (b) {
      ((t = b), Se === n && n !== null && (Se = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function Md() {
  var e = jl.current;
  return ((jl.current = Il), e === null ? Il : e);
}
function ea() {
  ((Ee === 0 || Ee === 3 || Ee === 2) && (Ee = 4),
    Ne === null || (!(Fn & 268435455) && !(Zl & 268435455)) || on(Ne, Le));
}
function Rl(e, t) {
  var n = re;
  re |= 2;
  var r = Md();
  (Ne !== e || Le !== t) && (($t = null), In(e, t));
  do
    try {
      wy();
      break;
    } catch (i) {
      Od(e, i);
    }
  while (!0);
  if ((Rs(), (re = n), (jl.current = r), Se !== null)) throw Error(z(261));
  return ((Ne = null), (Le = 0), Ee);
}
function wy() {
  for (; Se !== null; ) Bd(Se);
}
function Sy() {
  for (; Se !== null && !qm(); ) Bd(Se);
}
function Bd(e) {
  var t = Hd(e.alternate, e, Ze);
  ((e.memoizedProps = e.pendingProps),
    t === null ? $d(e) : (Se = t),
    (Ys.current = null));
}
function $d(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = my(n, t)), n !== null)) {
        ((n.flags &= 32767), (Se = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((Ee = 6), (Se = null));
        return;
      }
    } else if (((n = hy(n, t, Ze)), n !== null)) {
      Se = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Se = t;
      return;
    }
    Se = t = e;
  } while (t !== null);
  Ee === 0 && (Ee = 5);
}
function Pn(e, t, n) {
  var r = ue,
    i = mt.transition;
  try {
    ((mt.transition = null), (ue = 1), Cy(e, t, n, r));
  } finally {
    ((mt.transition = i), (ue = r));
  }
  return null;
}
function Cy(e, t, n, r) {
  do cr();
  while (sn !== null);
  if (re & 6) throw Error(z(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(z(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var l = n.lanes | n.childLanes;
  if (
    (rg(e, l),
    e === Ne && ((Se = Ne = null), (Le = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      qi ||
      ((qi = !0),
      Vd(yl, function () {
        return (cr(), null);
      })),
    (l = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || l)
  ) {
    ((l = mt.transition), (mt.transition = null));
    var o = ue;
    ue = 1;
    var u = re;
    ((re |= 4),
      (Ys.current = null),
      yy(e, n),
      Ad(n, e),
      Hg(Nu),
      (kl = !!bu),
      (Nu = bu = null),
      (e.current = n),
      xy(n),
      Km(),
      (re = u),
      (ue = o),
      (mt.transition = l));
  } else e.current = n;
  if (
    (qi && ((qi = !1), (sn = e), (Al = i)),
    (l = e.pendingLanes),
    l === 0 && (hn = null),
    Gm(n.stateNode),
    Ye(e, ve()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }));
  if (Dl) throw ((Dl = !1), (e = Qu), (Qu = null), e);
  return (
    Al & 1 && e.tag !== 0 && cr(),
    (l = e.pendingLanes),
    l & 1 ? (e === qu ? Kr++ : ((Kr = 0), (qu = e))) : (Kr = 0),
    wn(),
    null
  );
}
function cr() {
  if (sn !== null) {
    var e = wp(Al),
      t = mt.transition,
      n = ue;
    try {
      if (((mt.transition = null), (ue = 16 > e ? 16 : e), sn === null))
        var r = !1;
      else {
        if (((e = sn), (sn = null), (Al = 0), re & 6)) throw Error(z(331));
        var i = re;
        for (re |= 4, O = e.current; O !== null; ) {
          var l = O,
            o = l.child;
          if (O.flags & 16) {
            var u = l.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s];
                for (O = a; O !== null; ) {
                  var f = O;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qr(8, f, l);
                  }
                  var c = f.child;
                  if (c !== null) ((c.return = f), (O = c));
                  else
                    for (; O !== null; ) {
                      f = O;
                      var d = f.sibling,
                        p = f.return;
                      if ((Id(f), f === a)) {
                        O = null;
                        break;
                      }
                      if (d !== null) {
                        ((d.return = p), (O = d));
                        break;
                      }
                      O = p;
                    }
                }
              }
              var m = l.alternate;
              if (m !== null) {
                var k = m.child;
                if (k !== null) {
                  m.child = null;
                  do {
                    var P = k.sibling;
                    ((k.sibling = null), (k = P));
                  } while (k !== null);
                }
              }
              O = l;
            }
          }
          if (l.subtreeFlags & 2064 && o !== null) ((o.return = l), (O = o));
          else
            e: for (; O !== null; ) {
              if (((l = O), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qr(9, l, l.return);
                }
              var h = l.sibling;
              if (h !== null) {
                ((h.return = l.return), (O = h));
                break e;
              }
              O = l.return;
            }
        }
        var g = e.current;
        for (O = g; O !== null; ) {
          o = O;
          var y = o.child;
          if (o.subtreeFlags & 2064 && y !== null) ((y.return = o), (O = y));
          else
            e: for (o = g; O !== null; ) {
              if (((u = O), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Gl(9, u);
                  }
                } catch (b) {
                  ke(u, u.return, b);
                }
              if (u === o) {
                O = null;
                break e;
              }
              var E = u.sibling;
              if (E !== null) {
                ((E.return = u.return), (O = E));
                break e;
              }
              O = u.return;
            }
        }
        if (
          ((re = i), wn(), Ft && typeof Ft.onPostCommitFiberRoot == "function")
        )
          try {
            Ft.onPostCommitFiberRoot(Hl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((ue = n), (mt.transition = t));
    }
  }
  return !1;
}
function jc(e, t, n) {
  ((t = yr(n, t)),
    (t = wd(e, t, 1)),
    (e = dn(e, t, 1)),
    (t = $e()),
    e !== null && (xi(e, 1, t), Ye(e, t)));
}
function ke(e, t, n) {
  if (e.tag === 3) jc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        jc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (hn === null || !hn.has(r)))
        ) {
          ((e = yr(n, e)),
            (e = Sd(t, e, 1)),
            (t = dn(t, e, 1)),
            (e = $e()),
            t !== null && (xi(t, 1, e), Ye(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Ey(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = $e()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Ne === e &&
      (Le & n) === n &&
      (Ee === 4 || (Ee === 3 && (Le & 130023424) === Le && 500 > ve() - Gs)
        ? In(e, 0)
        : (Xs |= n)),
    Ye(e, t));
}
function Ud(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Fi), (Fi <<= 1), !(Fi & 130023424) && (Fi = 4194304))
      : (t = 1));
  var n = $e();
  ((e = Kt(e, t)), e !== null && (xi(e, t, n), Ye(e, n)));
}
function by(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), Ud(e, n));
}
function Ny(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(z(314));
  }
  (r !== null && r.delete(t), Ud(e, n));
}
var Hd;
Hd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || qe.current) Qe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Qe = !1), dy(e, t, n));
      Qe = !!(e.flags & 131072);
    }
  else ((Qe = !1), me && t.flags & 1048576 && qp(t, Nl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (ul(e, t), (e = t.pendingProps));
      var i = dr(t, De.current);
      (ar(t, n), (i = Vs(null, t, r, e, i, n)));
      var l = Ws();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ke(r) ? ((l = !0), El(t)) : (l = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Ms(t),
            (i.updater = Xl),
            (t.stateNode = i),
            (i._reactInternals = t),
            Au(t, r, e, n),
            (t = Ou(null, t, r, !0, l, n)))
          : ((t.tag = 0), me && l && Is(t), Me(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (ul(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Ly(r)),
          (e = Ct(r, e)),
          i)
        ) {
          case 0:
            t = Fu(null, t, r, e, n);
            break e;
          case 1:
            t = Cc(null, t, r, e, n);
            break e;
          case 11:
            t = wc(null, t, r, e, n);
            break e;
          case 14:
            t = Sc(null, t, r, Ct(r.type, e), n);
            break e;
        }
        throw Error(z(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ct(r, i)),
        Fu(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ct(r, i)),
        Cc(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Nd(t), e === null)) throw Error(z(387));
        ((r = t.pendingProps),
          (l = t.memoizedState),
          (i = l.element),
          Jp(e, t),
          Tl(t, r, null, n));
        var o = t.memoizedState;
        if (((r = o.element), l.isDehydrated))
          if (
            ((l = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            t.flags & 256)
          ) {
            ((i = yr(Error(z(423)), t)), (t = Ec(e, t, r, n, i)));
            break e;
          } else if (r !== i) {
            ((i = yr(Error(z(424)), t)), (t = Ec(e, t, r, n, i)));
            break e;
          } else
            for (
              Je = pn(t.stateNode.containerInfo.firstChild),
                tt = t,
                me = !0,
                bt = null,
                n = Gp(t, null, r, n),
                t.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((hr(), r === i)) {
            t = Yt(e, t, n);
            break e;
          }
          Me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        ed(t),
        e === null && Iu(t),
        (r = t.type),
        (i = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (o = i.children),
        Pu(r, i) ? (o = null) : l !== null && Pu(r, l) && (t.flags |= 32),
        bd(e, t),
        Me(e, t, o, n),
        t.child
      );
    case 6:
      return (e === null && Iu(t), null);
    case 13:
      return Pd(e, t, n);
    case 4:
      return (
        Bs(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = mr(t, null, r, n)) : Me(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ct(r, i)),
        wc(e, t, r, i, n)
      );
    case 7:
      return (Me(e, t, t.pendingProps, n), t.child);
    case 8:
      return (Me(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (Me(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (l = t.memoizedProps),
          (o = i.value),
          fe(Pl, r._currentValue),
          (r._currentValue = o),
          l !== null)
        )
          if (Tt(l.value, o)) {
            if (l.children === i.children && !qe.current) {
              t = Yt(e, t, n);
              break e;
            }
          } else
            for (l = t.child, l !== null && (l.return = t); l !== null; ) {
              var u = l.dependencies;
              if (u !== null) {
                o = l.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (l.tag === 1) {
                      ((s = Wt(-1, n & -n)), (s.tag = 2));
                      var a = l.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var f = a.pending;
                        (f === null
                          ? (s.next = s)
                          : ((s.next = f.next), (f.next = s)),
                          (a.pending = s));
                      }
                    }
                    ((l.lanes |= n),
                      (s = l.alternate),
                      s !== null && (s.lanes |= n),
                      ju(l.return, n, t),
                      (u.lanes |= n));
                    break;
                  }
                  s = s.next;
                }
              } else if (l.tag === 10) o = l.type === t.type ? null : l.child;
              else if (l.tag === 18) {
                if (((o = l.return), o === null)) throw Error(z(341));
                ((o.lanes |= n),
                  (u = o.alternate),
                  u !== null && (u.lanes |= n),
                  ju(o, n, t),
                  (o = l.sibling));
              } else o = l.child;
              if (o !== null) o.return = l;
              else
                for (o = l; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((l = o.sibling), l !== null)) {
                    ((l.return = o.return), (o = l));
                    break;
                  }
                  o = o.return;
                }
              l = o;
            }
        (Me(e, t, i.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        ar(t, n),
        (i = gt(i)),
        (r = r(i)),
        (t.flags |= 1),
        Me(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = Ct(r, t.pendingProps)),
        (i = Ct(r.type, i)),
        Sc(e, t, r, i, n)
      );
    case 15:
      return Cd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ct(r, i)),
        ul(e, t),
        (t.tag = 1),
        Ke(r) ? ((e = !0), El(t)) : (e = !1),
        ar(t, n),
        vd(t, r, i),
        Au(t, r, i, n),
        Ou(null, t, r, !0, e, n)
      );
    case 19:
      return Ld(e, t, n);
    case 22:
      return Ed(e, t, n);
  }
  throw Error(z(156, t.tag));
};
function Vd(e, t) {
  return yp(e, t);
}
function Py(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function ht(e, t, n, r) {
  return new Py(e, t, n, r);
}
function ta(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Ly(e) {
  if (typeof e == "function") return ta(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === vs)) return 11;
    if (e === ws) return 14;
  }
  return 2;
}
function gn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ht(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function cl(e, t, n, r, i, l) {
  var o = 2;
  if (((r = e), typeof e == "function")) ta(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Kn:
        return jn(n.children, i, l, t);
      case ks:
        ((o = 8), (i |= 8));
        break;
      case lu:
        return (
          (e = ht(12, n, t, i | 2)),
          (e.elementType = lu),
          (e.lanes = l),
          e
        );
      case ou:
        return ((e = ht(13, n, t, i)), (e.elementType = ou), (e.lanes = l), e);
      case uu:
        return ((e = ht(19, n, t, i)), (e.elementType = uu), (e.lanes = l), e);
      case ep:
        return Jl(n, i, l, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Zf:
              o = 10;
              break e;
            case Jf:
              o = 9;
              break e;
            case vs:
              o = 11;
              break e;
            case ws:
              o = 14;
              break e;
            case nn:
              ((o = 16), (r = null));
              break e;
          }
        throw Error(z(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = ht(o, n, t, i)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = l),
    t
  );
}
function jn(e, t, n, r) {
  return ((e = ht(7, e, r, t)), (e.lanes = n), e);
}
function Jl(e, t, n, r) {
  return (
    (e = ht(22, e, r, t)),
    (e.elementType = ep),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Fo(e, t, n) {
  return ((e = ht(6, e, null, t)), (e.lanes = n), e);
}
function Oo(e, t, n) {
  return (
    (t = ht(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Ty(e, t, n, r, i) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = xo(0)),
    (this.expirationTimes = xo(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = xo(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null));
}
function na(e, t, n, r, i, l, o, u, s) {
  return (
    (e = new Ty(e, t, n, u, s)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = ht(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ms(l),
    e
  );
}
function _y(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: qn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Wd(e) {
  if (!e) return xn;
  e = e._reactInternals;
  e: {
    if ($n(e) !== e || e.tag !== 1) throw Error(z(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ke(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(z(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ke(n)) return Wp(e, n, t);
  }
  return t;
}
function Qd(e, t, n, r, i, l, o, u, s) {
  return (
    (e = na(n, r, !0, e, i, l, o, u, s)),
    (e.context = Wd(null)),
    (n = e.current),
    (r = $e()),
    (i = mn(n)),
    (l = Wt(r, i)),
    (l.callback = t ?? null),
    dn(n, l, i),
    (e.current.lanes = i),
    xi(e, i, r),
    Ye(e, r),
    e
  );
}
function eo(e, t, n, r) {
  var i = t.current,
    l = $e(),
    o = mn(i);
  return (
    (n = Wd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Wt(l, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = dn(i, t, o)),
    e !== null && (Pt(e, i, o, l), il(e, i, o)),
    o
  );
}
function Fl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Dc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ra(e, t) {
  (Dc(e, t), (e = e.alternate) && Dc(e, t));
}
function zy() {
  return null;
}
var qd =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function ia(e) {
  this._internalRoot = e;
}
to.prototype.render = ia.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(z(409));
  eo(e, t, null, null);
};
to.prototype.unmount = ia.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (On(function () {
      eo(null, e, null, null);
    }),
      (t[qt] = null));
  }
};
function to(e) {
  this._internalRoot = e;
}
to.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Ep();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ln.length && t !== 0 && t < ln[n].priority; n++);
    (ln.splice(n, 0, e), n === 0 && Np(e));
  }
};
function la(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function no(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Ac() {}
function Iy(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var l = r;
      r = function () {
        var a = Fl(o);
        l.call(a);
      };
    }
    var o = Qd(t, r, e, 0, null, !1, !1, "", Ac);
    return (
      (e._reactRootContainer = o),
      (e[qt] = o.current),
      oi(e.nodeType === 8 ? e.parentNode : e),
      On(),
      o
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var a = Fl(s);
      u.call(a);
    };
  }
  var s = na(e, 0, !1, null, null, !1, !1, "", Ac);
  return (
    (e._reactRootContainer = s),
    (e[qt] = s.current),
    oi(e.nodeType === 8 ? e.parentNode : e),
    On(function () {
      eo(t, s, n, r);
    }),
    s
  );
}
function ro(e, t, n, r, i) {
  var l = n._reactRootContainer;
  if (l) {
    var o = l;
    if (typeof i == "function") {
      var u = i;
      i = function () {
        var s = Fl(o);
        u.call(s);
      };
    }
    eo(t, o, e, i);
  } else o = Iy(n, t, e, i, r);
  return Fl(o);
}
Sp = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Or(t.pendingLanes);
        n !== 0 &&
          (Es(t, n | 1), Ye(t, ve()), !(re & 6) && ((xr = ve() + 500), wn()));
      }
      break;
    case 13:
      (On(function () {
        var r = Kt(e, 1);
        if (r !== null) {
          var i = $e();
          Pt(r, e, 1, i);
        }
      }),
        ra(e, 1));
  }
};
bs = function (e) {
  if (e.tag === 13) {
    var t = Kt(e, 134217728);
    if (t !== null) {
      var n = $e();
      Pt(t, e, 134217728, n);
    }
    ra(e, 134217728);
  }
};
Cp = function (e) {
  if (e.tag === 13) {
    var t = mn(e),
      n = Kt(e, t);
    if (n !== null) {
      var r = $e();
      Pt(n, e, t, r);
    }
    ra(e, t);
  }
};
Ep = function () {
  return ue;
};
bp = function (e, t) {
  var n = ue;
  try {
    return ((ue = e), t());
  } finally {
    ue = n;
  }
};
yu = function (e, t, n) {
  switch (t) {
    case "input":
      if ((cu(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = ql(r);
            if (!i) throw Error(z(90));
            (np(r), cu(r, i));
          }
        }
      }
      break;
    case "textarea":
      ip(e, n);
      break;
    case "select":
      ((t = n.value), t != null && lr(e, !!n.multiple, t, !1));
  }
};
fp = Zs;
pp = On;
var jy = { usingClientEntryPoint: !1, Events: [vi, Zn, ql, ap, cp, Zs] },
  jr = {
    findFiberByHostInstance: Tn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Dy = {
    bundleType: jr.bundleType,
    version: jr.version,
    rendererPackageName: jr.rendererPackageName,
    rendererConfig: jr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Xt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = mp(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: jr.findFiberByHostInstance || zy,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ki = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ki.isDisabled && Ki.supportsFiber)
    try {
      ((Hl = Ki.inject(Dy)), (Ft = Ki));
    } catch {}
}
it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = jy;
it.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!la(t)) throw Error(z(200));
  return _y(e, t, null, n);
};
it.createRoot = function (e, t) {
  if (!la(e)) throw Error(z(299));
  var n = !1,
    r = "",
    i = qd;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = na(e, 1, !1, null, null, n, !1, r, i)),
    (e[qt] = t.current),
    oi(e.nodeType === 8 ? e.parentNode : e),
    new ia(t)
  );
};
it.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(z(188))
      : ((e = Object.keys(e).join(",")), Error(z(268, e)));
  return ((e = mp(t)), (e = e === null ? null : e.stateNode), e);
};
it.flushSync = function (e) {
  return On(e);
};
it.hydrate = function (e, t, n) {
  if (!no(t)) throw Error(z(200));
  return ro(null, e, t, !0, n);
};
it.hydrateRoot = function (e, t, n) {
  if (!la(e)) throw Error(z(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    l = "",
    o = qd;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Qd(t, null, e, 1, n ?? null, i, !1, l, o)),
    (e[qt] = t.current),
    oi(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i));
  return new to(t);
};
it.render = function (e, t, n) {
  if (!no(t)) throw Error(z(200));
  return ro(null, e, t, !1, n);
};
it.unmountComponentAtNode = function (e) {
  if (!no(e)) throw Error(z(40));
  return e._reactRootContainer
    ? (On(function () {
        ro(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[qt] = null));
        });
      }),
      !0)
    : !1;
};
it.unstable_batchedUpdates = Zs;
it.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!no(n)) throw Error(z(200));
  if (e == null || e._reactInternals === void 0) throw Error(z(38));
  return ro(e, t, n, !1, r);
};
it.version = "18.3.1-next-f1338f8080-20240426";
function Kd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Kd);
    } catch (e) {
      console.error(e);
    }
}
(Kd(), (Kf.exports = it));
var Ay = Kf.exports,
  Rc = Ay;
((ru.createRoot = Rc.createRoot), (ru.hydrateRoot = Rc.hydrateRoot));
async function en(e) {
  if (!e.ok) {
    let t = `Request failed: ${e.status}`;
    try {
      const n = await e.json();
      n.error && (t = n.error);
    } catch {}
    throw new Error(t);
  }
  return await e.json();
}
const At = {
  async getContext(e) {
    const t = new URLSearchParams();
    e && t.set("worktree", e);
    const n = t.toString() ? `?${t.toString()}` : "",
      r = await fetch(`/local-api/context${n}`);
    return await en(r);
  },
  async getDiffBundle(e) {
    const t = new URLSearchParams();
    (e.worktreePath && t.set("worktree", e.worktreePath),
      e.targetBranch && t.set("target", e.targetBranch),
      e.sourceBranch && t.set("source", e.sourceBranch));
    const n = t.toString() ? `?${t.toString()}` : "",
      r = await fetch(`/local-api/diff${n}`);
    return await en(r);
  },
  async getCommits(e) {
    const t = new URLSearchParams();
    (e.worktreePath && t.set("worktree", e.worktreePath),
      e.targetBranch && t.set("target", e.targetBranch),
      e.sourceBranch && t.set("source", e.sourceBranch));
    const n = t.toString() ? `?${t.toString()}` : "",
      r = await fetch(`/local-api/commits${n}`);
    return (await en(r)).commits;
  },
  async getCommitDiff(e) {
    const t = new URLSearchParams();
    (e.worktreePath && t.set("worktree", e.worktreePath),
      t.set("commit", e.commit));
    const n = await fetch(`/local-api/commit-diff?${t.toString()}`);
    return (await en(n)).diff;
  },
  async listSessions() {
    const e = await fetch("/local-api/sessions");
    return (await en(e)).sessions;
  },
  async getSession(e) {
    const t = await fetch(`/local-api/sessions/${encodeURIComponent(e)}`);
    return (await en(t)).session;
  },
  async getFileContent(e) {
    const t = new URLSearchParams({ path: e.filePath });
    e.worktreePath && t.set("worktree", e.worktreePath);
    const n = await fetch(`/local-api/file?${t.toString()}`);
    return (await en(n)).content;
  },
  async saveSession(e) {
    const t = await fetch("/local-api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
    return await en(t);
  },
  async deleteSession(e) {
    const t = await fetch(`/local-api/sessions/${encodeURIComponent(e)}`, {
      method: "DELETE",
    });
    if (!t.ok) {
      let n = `Delete failed: ${t.status}`;
      try {
        const r = await t.json();
        r.error && (n = r.error);
      } catch {}
      throw new Error(n);
    }
  },
};
function Ry(e) {
  const t = e.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
  return t ? { oldStart: Number(t[1]), newStart: Number(t[2]) } : null;
}
function Fy(e) {
  const t = e.match(/^diff --git ([a-zA-Z])\/(.+) ([a-zA-Z])\//);
  if (!t) return null;
  const n = t[3],
    r = e.slice(13),
    i = ` ${n}/`;
  let l = r.lastIndexOf(i);
  for (; l > 0; ) {
    const o = r.slice(0, l),
      u = r.slice(l + i.length);
    if (o.length > 0 && u.length > 0)
      return { oldPath: o, newPath: u, newPrefix: n };
    l = r.lastIndexOf(i, l - 1);
  }
  return null;
}
function Oy(e, t, n) {
  return n === "D" ? e : t;
}
function Mo(e) {
  return e.replace(/[\r\t ]+$/, "");
}
function My(e) {
  if (!e.trim()) return [];
  const t = [],
    n = e.split(`
`);
  let r = null,
    i = null,
    l = 0,
    o = 0,
    u = "",
    s = "",
    a = "M",
    f = "b",
    c = "";
  const d = () => {
    if (r) return;
    const p = Mo(u || s),
      m = Mo(s || u),
      k = a;
    let P = Mo(Oy(p, m, k));
    if (!P && c) {
      const h = ` ${f}/`,
        g = c.lastIndexOf(h);
      g !== -1 && (P = c.slice(g + h.length).replace(/[\r\t ]+$/, ""));
    }
    ((r = { path: P || p || m, oldPath: p, newPath: m, status: k, hunks: [] }),
      t.push(r));
  };
  for (const p of n) {
    if (p.startsWith("diff --git ")) {
      const m = Fy(p);
      ((u = (m == null ? void 0 : m.oldPath) || ""),
        (s = (m == null ? void 0 : m.newPath) || ""),
        (f = (m == null ? void 0 : m.newPrefix) || "b"),
        (a = "M"),
        (c = p),
        (r = null),
        (i = null));
      continue;
    }
    if (p.startsWith("new file mode ")) {
      a = "A";
      continue;
    }
    if (p.startsWith("deleted file mode ")) {
      a = "D";
      continue;
    }
    if (p.startsWith("rename from ")) {
      u = p.slice(12).trim();
      continue;
    }
    if (p.startsWith("rename to ")) {
      s = p.slice(10).trim();
      continue;
    }
    if (/^--- [a-zA-Z]\//.test(p)) {
      u = p.slice(p.indexOf("/") + 1);
      continue;
    }
    if (p === "--- /dev/null") {
      u = u || "";
      continue;
    }
    if (/^\+\+\+ [a-zA-Z]\//.test(p)) {
      ((s = p.slice(p.indexOf("/") + 1)), d());
      continue;
    }
    if (p === "+++ /dev/null") {
      d();
      continue;
    }
    if (p.startsWith("@@")) {
      d();
      const m = Ry(p);
      if (!m || !r) continue;
      const k = r;
      ((l = m.oldStart),
        (o = m.newStart),
        (i = { header: p, lines: [] }),
        k.hunks.push(i));
      continue;
    }
    if (!(!r || !i)) {
      if (p.startsWith("+")) {
        (i.lines.push({
          kind: "add",
          content: p.slice(1),
          oldLineNumber: null,
          newLineNumber: o,
        }),
          (o += 1));
        continue;
      }
      if (p.startsWith("-")) {
        (i.lines.push({
          kind: "del",
          content: p.slice(1),
          oldLineNumber: l,
          newLineNumber: null,
        }),
          (l += 1));
        continue;
      }
      if (p.startsWith(" ")) {
        (i.lines.push({
          kind: "context",
          content: p.slice(1),
          oldLineNumber: l,
          newLineNumber: o,
        }),
          (l += 1),
          (o += 1));
        continue;
      }
      i.lines.push({
        kind: "meta",
        content: p,
        oldLineNumber: null,
        newLineNumber: null,
      });
    }
  }
  return t.filter((p) => p.hunks.length > 0 && p.path.trim().length > 0);
}
function oa(e, t, n) {
  return `${e}:${n}:${t}`;
}
function Xu() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Fc(e, t) {
  return `hunk-${e.replace(/[^a-zA-Z0-9_-]/g, "_")}-${t}`;
}
function Yd(e, t, n, r) {
  const i = e.find((l) => l.path === t);
  if (i) {
    for (const l of i.hunks)
      for (const o of l.lines)
        if ((r === "old" ? o.oldLineNumber : o.newLineNumber) === n)
          return o.content;
  }
}
function By(e, t) {
  return e.anchorContent
    ? Yd(t, e.filePath, e.line, e.side) !== e.anchorContent
    : !1;
}
function Oc(e, t) {
  const n = (r) =>
    r
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "_")
      .slice(0, 40) || "branch";
  return `${n(e)}-vs-${n(t)}.json`;
}
function et(e) {
  return {
    ...e,
    startLine: Math.min(e.startLine, e.endLine),
    endLine: Math.max(e.startLine, e.endLine),
  };
}
function Xd(e, t, n, r) {
  if (!e) return !1;
  const i = et(e);
  return i.filePath === t && i.side === n && r >= i.startLine && r <= i.endLine;
}
function Mc(e) {
  return oa(e.filePath, e.lineEnd || e.line, e.side);
}
function $y(e) {
  return e.lineEnd && e.lineEnd !== e.line
    ? `${e.side} ${e.line}–${e.lineEnd}`
    : `${e.side} line ${e.line}`;
}
function Bc(e) {
  return e.split("/").pop() || e;
}
function Uy(e, t) {
  const n = { path: "", folders: new Map(), files: [] };
  for (const l of e) {
    const o = l.path.split("/");
    let u = n;
    for (let s = 0; s < o.length - 1; s += 1) {
      const a = o[s],
        f = u.path ? `${u.path}/${a}` : a;
      (u.folders.has(a) ||
        u.folders.set(a, { name: a, path: f, folders: new Map(), files: [] }),
        (u = u.folders.get(a)));
    }
    u.files.push(l);
  }
  const r = [],
    i = (l, o) => {
      for (const u of Array.from(l.folders.keys()).sort()) {
        const s = l.folders.get(u),
          a = t.has(s.path);
        (r.push({
          kind: "folder",
          key: `folder:${s.path}`,
          name: s.name,
          depth: o,
          path: s.path,
          collapsed: a,
        }),
          a || i(s, o + 1));
      }
      for (const u of [...l.files].sort((s, a) => s.path.localeCompare(a.path)))
        r.push({ kind: "file", key: `file:${u.path}`, depth: o, file: u });
    };
  return (i(n, 0), r);
}
function Hy({
  threads: e,
  outdatedThreadIds: t,
  overviewFilter: n,
  onFilterChange: r,
  onThreadClick: i,
  onReset: l,
}) {
  const o = e.filter((a) => {
      const f = t.has(a.id);
      return n === "all"
        ? !0
        : n === "outdated"
          ? f
          : n === "open"
            ? a.status === "open" && !f
            : n === "resolved"
              ? a.status === "resolved" || a.status === "approved"
              : !0;
    }),
    u = new Map();
  for (const a of o) {
    const f = u.get(a.filePath) || [];
    (f.push(a), u.set(a.filePath, f));
  }
  const s = [
    { key: "all", label: "All" },
    { key: "open", label: "Open" },
    { key: "resolved", label: "Resolved" },
    { key: "outdated", label: "Outdated" },
  ];
  return v.jsxs("div", {
    className: "flex flex-col gap-2 overflow-y-auto p-2",
    children: [
      v.jsx("div", {
        className: "flex flex-wrap gap-1",
        children: s.map(({ key: a, label: f }) =>
          v.jsx(
            "button",
            {
              type: "button",
              onClick: () => r(a),
              className: `rounded-full px-2 py-0.5 text-[10px] font-medium ${n === a ? "bg-[#1f6feb] text-white" : "border border-[#30363d] text-slate-400 hover:bg-[#21262d]"}`,
              children: f,
            },
            a,
          ),
        ),
      }),
      v.jsx("button", {
        type: "button",
        onClick: l,
        className:
          "self-start rounded border border-rose-700/50 bg-rose-700/10 px-2 py-0.5 text-[10px] text-rose-400 hover:bg-rose-700/20",
        children: "Reset Session",
      }),
      u.size === 0 &&
        v.jsx("p", {
          className: "text-[11px] text-slate-600",
          children: "No threads match this filter.",
        }),
      Array.from(u.entries()).map(([a, f]) => {
        const c = f.filter((p) => p.status === "open" && !t.has(p.id)).length,
          d = f.filter((p) => t.has(p.id)).length;
        return v.jsxs(
          "div",
          {
            className: "rounded border border-[#30363d] bg-[#161b22]",
            children: [
              v.jsxs("div", {
                className:
                  "border-b border-[#30363d] px-2 py-1.5 text-[10px] text-slate-400",
                children: [
                  v.jsx("span", {
                    className: "font-mono",
                    children: a.split("/").pop(),
                  }),
                  c > 0 &&
                    v.jsxs("span", {
                      className: "ml-1 text-amber-400",
                      children: ["· ", c, " open"],
                    }),
                  d > 0 &&
                    v.jsxs("span", {
                      className: "ml-1 text-slate-500",
                      children: ["· ", d, " outdated"],
                    }),
                ],
              }),
              v.jsx("div", {
                className: "divide-y divide-[#21262d]",
                children: f.map((p) => {
                  const m = t.has(p.id),
                    k = p.messages[0],
                    P = m ? "◌" : p.status === "open" ? "●" : "✓",
                    h = m
                      ? "text-slate-500"
                      : p.status === "open"
                        ? "text-amber-400"
                        : "text-emerald-400";
                  return v.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => i(p),
                      className:
                        "w-full px-2 py-1.5 text-left hover:bg-[#21262d]",
                      children: [
                        v.jsxs("div", {
                          className: "flex items-baseline gap-1.5",
                          children: [
                            v.jsx("span", {
                              className: `text-[10px] ${h}`,
                              children: P,
                            }),
                            m &&
                              v.jsx("span", {
                                className:
                                  "rounded bg-slate-700/50 px-1 text-[9px] text-slate-400",
                                children: "OUTDATED",
                              }),
                            v.jsxs("span", {
                              className: "text-[10px] text-slate-600",
                              children: [p.side, ":", p.line],
                            }),
                          ],
                        }),
                        m &&
                          p.anchorContent &&
                          v.jsx("code", {
                            className:
                              "mt-0.5 block truncate rounded bg-[#0d1117] px-1 py-0.5 text-[9px] text-slate-500",
                            children: p.anchorContent,
                          }),
                        k &&
                          v.jsxs("p", {
                            className:
                              "mt-0.5 truncate text-[10px] text-slate-400",
                            children: [
                              "“",
                              k.text.slice(0, 60),
                              k.text.length > 60 ? "…" : "",
                              "”",
                            ],
                          }),
                        v.jsxs("p", {
                          className: "mt-0.5 text-[9px] text-slate-600",
                          children: [
                            p.messages.length,
                            " message",
                            p.messages.length !== 1 ? "s" : "",
                          ],
                        }),
                      ],
                    },
                    p.id,
                  );
                }),
              }),
            ],
          },
          a,
        );
      }),
    ],
  });
}
function Gu({ status: e }) {
  return e === "A"
    ? v.jsx("span", {
        className: "text-[10px] font-bold text-emerald-400 font-mono",
        children: "A",
      })
    : e === "D"
      ? v.jsx("span", {
          className: "text-[10px] font-bold text-rose-400 font-mono",
          children: "D",
        })
      : e === "M"
        ? v.jsx("span", {
            className: "text-[10px] font-bold text-amber-400 font-mono",
            children: "M",
          })
        : v.jsx("span", {
            className: "text-[10px] font-bold text-slate-400 font-mono",
            children: "R",
          });
}
function Vy({
  leftTab: e,
  onTabChange: t,
  pendingCount: n,
  visibleFiles: r,
  selectedFilePath: i,
  onFileSelect: l,
  showFolderTree: o,
  onFolderTreeChange: u,
  collapsedFolders: s,
  onFolderToggle: a,
  unresolvedThreadCountByFile: f,
  changeCountByFile: c,
  threads: d,
  outdatedThreadIds: p,
  overviewFilter: m,
  onOverviewFilterChange: k,
  onThreadClick: P,
  onReset: h,
  summaryNotes: g,
  onSummaryNotesChange: y,
}) {
  const E = Uy(r, s);
  return v.jsxs("aside", {
    className:
      "flex w-64 shrink-0 flex-col border-r border-[#30363d] bg-[#161b22]",
    children: [
      v.jsxs("div", {
        className: "flex border-b border-[#30363d]",
        children: [
          v.jsx("button", {
            type: "button",
            onClick: () => t("files"),
            className: `flex-1 py-1.5 text-[11px] font-medium ${e === "files" ? "border-b-2 border-[#1f6feb] text-slate-200" : "text-slate-500 hover:text-slate-300"}`,
            children: "Files",
          }),
          v.jsxs("button", {
            type: "button",
            onClick: () => t("overview"),
            className: `flex-1 py-1.5 text-[11px] font-medium ${e === "overview" ? "border-b-2 border-[#1f6feb] text-slate-200" : "text-slate-500 hover:text-slate-300"}`,
            children: ["Overview", n > 0 ? ` (${n})` : ""],
          }),
        ],
      }),
      e === "files" &&
        v.jsxs(v.Fragment, {
          children: [
            v.jsxs("div", {
              className:
                "flex items-center justify-between border-b border-[#30363d] px-3 py-2",
              children: [
                v.jsx("span", {
                  className:
                    "text-xs font-semibold uppercase tracking-wider text-slate-500",
                  children: "Files",
                }),
                v.jsxs("label", {
                  className:
                    "flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300",
                  children: [
                    v.jsx("input", {
                      type: "checkbox",
                      checked: o,
                      onChange: (b) => u(b.target.checked),
                      className: "accent-indigo-500",
                    }),
                    "tree",
                  ],
                }),
              ],
            }),
            v.jsx("div", {
              className: "flex-1 overflow-auto py-1",
              children:
                r.length === 0
                  ? v.jsx("p", {
                      className: "px-4 py-6 text-xs text-slate-600",
                      children: "No changed files",
                    })
                  : o
                    ? E.map((b) => {
                        if (b.kind === "folder")
                          return v.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => a(b.path),
                              className:
                                "flex w-full items-center gap-1.5 px-3 py-1 text-left text-xs text-slate-500 hover:bg-white/5 hover:text-slate-300",
                              style: { paddingLeft: `${12 + b.depth * 14}px` },
                              children: [
                                v.jsx("span", {
                                  className: "text-[10px]",
                                  children: b.collapsed ? "▶" : "▼",
                                }),
                                v.jsx("span", { children: b.name }),
                              ],
                            },
                            b.key,
                          );
                        const S = b.file,
                          T = S.path === i,
                          _ = f.get(S.path) || 0;
                        return v.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => l(S.path),
                            title: S.path,
                            className: `flex w-full items-center justify-between gap-1 py-1 text-left text-xs transition-colors ${T ? "bg-[#1f6feb]/20 text-slate-200" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`,
                            style: {
                              paddingLeft: `${12 + b.depth * 14}px`,
                              paddingRight: "12px",
                            },
                            children: [
                              v.jsxs("div", {
                                className: "flex min-w-0 items-center gap-1.5",
                                children: [
                                  v.jsx(Gu, { status: S.status }),
                                  v.jsx("span", {
                                    className: "truncate font-mono",
                                    children: Bc(S.path),
                                  }),
                                ],
                              }),
                              v.jsxs("div", {
                                className: "flex shrink-0 items-center gap-1",
                                children: [
                                  _ > 0 &&
                                    v.jsx("span", {
                                      className:
                                        "rounded-full bg-amber-500/20 px-1.5 text-[10px] text-amber-300",
                                      children: _,
                                    }),
                                  v.jsx("span", {
                                    className: "text-[10px] text-slate-600",
                                    children: c.get(S.path) || 0,
                                  }),
                                ],
                              }),
                            ],
                          },
                          b.key,
                        );
                      })
                    : r.map((b) => {
                        const S = b.path === i,
                          T = f.get(b.path) || 0;
                        return v.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => l(b.path),
                            title: b.path,
                            className: `flex w-full items-center justify-between gap-1 px-3 py-1 text-left text-xs transition-colors ${S ? "bg-[#1f6feb]/20 text-slate-200" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`,
                            children: [
                              v.jsxs("div", {
                                className: "flex min-w-0 items-center gap-1.5",
                                children: [
                                  v.jsx(Gu, { status: b.status }),
                                  v.jsx("span", {
                                    className: "truncate font-mono",
                                    children: Bc(b.path),
                                  }),
                                ],
                              }),
                              v.jsxs("div", {
                                className: "flex shrink-0 items-center gap-1",
                                children: [
                                  T > 0 &&
                                    v.jsx("span", {
                                      className:
                                        "rounded-full bg-amber-500/20 px-1.5 text-[10px] text-amber-300",
                                      children: T,
                                    }),
                                  v.jsx("span", {
                                    className: "text-[10px] text-slate-600",
                                    children: c.get(b.path) || 0,
                                  }),
                                ],
                              }),
                            ],
                          },
                          b.path,
                        );
                      }),
            }),
          ],
        }),
      e === "overview" &&
        v.jsx(Hy, {
          threads: d,
          outdatedThreadIds: p,
          overviewFilter: m,
          onFilterChange: k,
          onThreadClick: P,
          onReset: h,
        }),
      v.jsxs("div", {
        className: "border-t border-[#30363d] p-3",
        children: [
          v.jsx("label", {
            className:
              "mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-600",
            children: "Review notes",
          }),
          v.jsx("textarea", {
            value: g,
            onChange: (b) => y(b.target.value),
            rows: 3,
            placeholder: "High-level findings…",
            className:
              "w-full resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]",
          }),
        ],
      }),
    ],
  });
}
function Wy(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e)
    .join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " "))
    .trim();
}
const Qy = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  qy = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  Ky = {};
function $c(e, t) {
  return (Ky.jsx ? qy : Qy).test(e);
}
const Yy = /[ \t\n\f\r]/g;
function Xy(e) {
  return typeof e == "object" ? (e.type === "text" ? Uc(e.value) : !1) : Uc(e);
}
function Uc(e) {
  return e.replace(Yy, "") === "";
}
class Si {
  constructor(t, n, r) {
    ((this.normal = n), (this.property = t), r && (this.space = r));
  }
}
Si.prototype.normal = {};
Si.prototype.property = {};
Si.prototype.space = void 0;
function Gd(e, t) {
  const n = {},
    r = {};
  for (const i of e) (Object.assign(n, i.property), Object.assign(r, i.normal));
  return new Si(n, r, t);
}
function Zu(e) {
  return e.toLowerCase();
}
class Xe {
  constructor(t, n) {
    ((this.attribute = n), (this.property = t));
  }
}
Xe.prototype.attribute = "";
Xe.prototype.booleanish = !1;
Xe.prototype.boolean = !1;
Xe.prototype.commaOrSpaceSeparated = !1;
Xe.prototype.commaSeparated = !1;
Xe.prototype.defined = !1;
Xe.prototype.mustUseProperty = !1;
Xe.prototype.number = !1;
Xe.prototype.overloadedBoolean = !1;
Xe.prototype.property = "";
Xe.prototype.spaceSeparated = !1;
Xe.prototype.space = void 0;
let Gy = 0;
const X = Un(),
  we = Un(),
  Ju = Un(),
  I = Un(),
  ce = Un(),
  fr = Un(),
  Ge = Un();
function Un() {
  return 2 ** ++Gy;
}
const es = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: X,
        booleanish: we,
        commaOrSpaceSeparated: Ge,
        commaSeparated: fr,
        number: I,
        overloadedBoolean: Ju,
        spaceSeparated: ce,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Bo = Object.keys(es);
class ua extends Xe {
  constructor(t, n, r, i) {
    let l = -1;
    if ((super(t, n), Hc(this, "space", i), typeof r == "number"))
      for (; ++l < Bo.length; ) {
        const o = Bo[l];
        Hc(this, Bo[l], (r & es[o]) === es[o]);
      }
  }
}
ua.prototype.defined = !0;
function Hc(e, t, n) {
  n && (e[t] = n);
}
function Cr(e) {
  const t = {},
    n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new ua(r, e.transform(e.attributes || {}, r), i, e.space);
    (e.mustUseProperty &&
      e.mustUseProperty.includes(r) &&
      (l.mustUseProperty = !0),
      (t[r] = l),
      (n[Zu(r)] = r),
      (n[Zu(l.attribute)] = r));
  }
  return new Si(t, n, e.space);
}
const Zd = Cr({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: we,
    ariaAutoComplete: null,
    ariaBusy: we,
    ariaChecked: we,
    ariaColCount: I,
    ariaColIndex: I,
    ariaColSpan: I,
    ariaControls: ce,
    ariaCurrent: null,
    ariaDescribedBy: ce,
    ariaDetails: null,
    ariaDisabled: we,
    ariaDropEffect: ce,
    ariaErrorMessage: null,
    ariaExpanded: we,
    ariaFlowTo: ce,
    ariaGrabbed: we,
    ariaHasPopup: null,
    ariaHidden: we,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: ce,
    ariaLevel: I,
    ariaLive: null,
    ariaModal: we,
    ariaMultiLine: we,
    ariaMultiSelectable: we,
    ariaOrientation: null,
    ariaOwns: ce,
    ariaPlaceholder: null,
    ariaPosInSet: I,
    ariaPressed: we,
    ariaReadOnly: we,
    ariaRelevant: null,
    ariaRequired: we,
    ariaRoleDescription: ce,
    ariaRowCount: I,
    ariaRowIndex: I,
    ariaRowSpan: I,
    ariaSelected: we,
    ariaSetSize: I,
    ariaSort: null,
    ariaValueMax: I,
    ariaValueMin: I,
    ariaValueNow: I,
    ariaValueText: null,
    role: null,
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  },
});
function Jd(e, t) {
  return t in e ? e[t] : t;
}
function eh(e, t) {
  return Jd(e, t.toLowerCase());
}
const Zy = Cr({
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: fr,
      acceptCharset: ce,
      accessKey: ce,
      action: null,
      allow: null,
      allowFullScreen: X,
      allowPaymentRequest: X,
      allowUserMedia: X,
      alt: null,
      as: null,
      async: X,
      autoCapitalize: null,
      autoComplete: ce,
      autoFocus: X,
      autoPlay: X,
      blocking: ce,
      capture: null,
      charSet: null,
      checked: X,
      cite: null,
      className: ce,
      cols: I,
      colSpan: null,
      content: null,
      contentEditable: we,
      controls: X,
      controlsList: ce,
      coords: I | fr,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: X,
      defer: X,
      dir: null,
      dirName: null,
      disabled: X,
      download: Ju,
      draggable: we,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: X,
      formTarget: null,
      headers: ce,
      height: I,
      hidden: Ju,
      high: I,
      href: null,
      hrefLang: null,
      htmlFor: ce,
      httpEquiv: ce,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: X,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: X,
      itemId: null,
      itemProp: ce,
      itemRef: ce,
      itemScope: X,
      itemType: ce,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: X,
      low: I,
      manifest: null,
      max: null,
      maxLength: I,
      media: null,
      method: null,
      min: null,
      minLength: I,
      multiple: X,
      muted: X,
      name: null,
      nonce: null,
      noModule: X,
      noValidate: X,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: X,
      optimum: I,
      pattern: null,
      ping: ce,
      placeholder: null,
      playsInline: X,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: X,
      referrerPolicy: null,
      rel: ce,
      required: X,
      reversed: X,
      rows: I,
      rowSpan: I,
      sandbox: ce,
      scope: null,
      scoped: X,
      seamless: X,
      selected: X,
      shadowRootClonable: X,
      shadowRootDelegatesFocus: X,
      shadowRootMode: null,
      shape: null,
      size: I,
      sizes: null,
      slot: null,
      span: I,
      spellCheck: we,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: I,
      step: null,
      style: null,
      tabIndex: I,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: X,
      useMap: null,
      value: we,
      width: I,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: ce,
      axis: null,
      background: null,
      bgColor: null,
      border: I,
      borderColor: null,
      bottomMargin: I,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: X,
      declare: X,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: I,
      leftMargin: I,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: I,
      marginWidth: I,
      noResize: X,
      noHref: X,
      noShade: X,
      noWrap: X,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: I,
      rules: null,
      scheme: null,
      scrolling: we,
      standby: null,
      summary: null,
      text: null,
      topMargin: I,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: I,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: X,
      disableRemotePlayback: X,
      prefix: null,
      property: null,
      results: I,
      security: null,
      unselectable: null,
    },
    space: "html",
    transform: eh,
  }),
  Jy = Cr({
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      transformOrigin: "transform-origin",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin",
    },
    properties: {
      about: Ge,
      accentHeight: I,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: I,
      amplitude: I,
      arabicForm: null,
      ascent: I,
      attributeName: null,
      attributeType: null,
      azimuth: I,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: I,
      by: null,
      calcMode: null,
      capHeight: I,
      className: ce,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: I,
      diffuseConstant: I,
      direction: null,
      display: null,
      dur: null,
      divisor: I,
      dominantBaseline: null,
      download: X,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: I,
      enableBackground: null,
      end: null,
      event: null,
      exponent: I,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: I,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: fr,
      g2: fr,
      glyphName: fr,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: I,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: I,
      horizOriginX: I,
      horizOriginY: I,
      id: null,
      ideographic: I,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: I,
      k: I,
      k1: I,
      k2: I,
      k3: I,
      k4: I,
      kernelMatrix: Ge,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: I,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: I,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: I,
      overlineThickness: I,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: I,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: ce,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: I,
      pointsAtY: I,
      pointsAtZ: I,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: Ge,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: Ge,
      rev: Ge,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: Ge,
      requiredFeatures: Ge,
      requiredFonts: Ge,
      requiredFormats: Ge,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: I,
      specularExponent: I,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: I,
      strikethroughThickness: I,
      string: null,
      stroke: null,
      strokeDashArray: Ge,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: I,
      strokeOpacity: I,
      strokeWidth: null,
      style: null,
      surfaceScale: I,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: Ge,
      tabIndex: I,
      tableValues: null,
      target: null,
      targetX: I,
      targetY: I,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: Ge,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: I,
      underlineThickness: I,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: I,
      values: null,
      vAlphabetic: I,
      vMathematical: I,
      vectorEffect: null,
      vHanging: I,
      vIdeographic: I,
      version: null,
      vertAdvY: I,
      vertOriginX: I,
      vertOriginY: I,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: I,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
    space: "svg",
    transform: Jd,
  }),
  th = Cr({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
    space: "xlink",
    transform(e, t) {
      return "xlink:" + t.slice(5).toLowerCase();
    },
  }),
  nh = Cr({
    attributes: { xmlnsxlink: "xmlns:xlink" },
    properties: { xmlnsXLink: null, xmlns: null },
    space: "xmlns",
    transform: eh,
  }),
  rh = Cr({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: "xml",
    transform(e, t) {
      return "xml:" + t.slice(3).toLowerCase();
    },
  }),
  ex = {
    classId: "classID",
    dataType: "datatype",
    itemId: "itemID",
    strokeDashArray: "strokeDasharray",
    strokeDashOffset: "strokeDashoffset",
    strokeLineCap: "strokeLinecap",
    strokeLineJoin: "strokeLinejoin",
    strokeMiterLimit: "strokeMiterlimit",
    typeOf: "typeof",
    xLinkActuate: "xlinkActuate",
    xLinkArcRole: "xlinkArcrole",
    xLinkHref: "xlinkHref",
    xLinkRole: "xlinkRole",
    xLinkShow: "xlinkShow",
    xLinkTitle: "xlinkTitle",
    xLinkType: "xlinkType",
    xmlnsXLink: "xmlnsXlink",
  },
  tx = /[A-Z]/g,
  Vc = /-[a-z]/g,
  nx = /^data[-\w.:]+$/i;
function rx(e, t) {
  const n = Zu(t);
  let r = t,
    i = Xe;
  if (n in e.normal) return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && nx.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(Vc, lx);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!Vc.test(l)) {
        let o = l.replace(tx, ix);
        (o.charAt(0) !== "-" && (o = "-" + o), (t = "data" + o));
      }
    }
    i = ua;
  }
  return new i(r, t);
}
function ix(e) {
  return "-" + e.toLowerCase();
}
function lx(e) {
  return e.charAt(1).toUpperCase();
}
const ox = Gd([Zd, Zy, th, nh, rh], "html"),
  sa = Gd([Zd, Jy, th, nh, rh], "svg");
function ux(e) {
  return e.join(" ").trim();
}
var aa = {},
  Wc = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
  sx = /\n/g,
  ax = /^\s*/,
  cx = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
  fx = /^:\s*/,
  px = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
  dx = /^[;\s]*/,
  hx = /^\s+|\s+$/g,
  mx = `
`,
  Qc = "/",
  qc = "*",
  Ln = "",
  gx = "comment",
  yx = "declaration";
function xx(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1,
    r = 1;
  function i(m) {
    var k = m.match(sx);
    k && (n += k.length);
    var P = m.lastIndexOf(mx);
    r = ~P ? m.length - P : r + m.length;
  }
  function l() {
    var m = { line: n, column: r };
    return function (k) {
      return ((k.position = new o(m)), a(), k);
    };
  }
  function o(m) {
    ((this.start = m),
      (this.end = { line: n, column: r }),
      (this.source = t.source));
  }
  o.prototype.content = e;
  function u(m) {
    var k = new Error(t.source + ":" + n + ":" + r + ": " + m);
    if (
      ((k.reason = m),
      (k.filename = t.source),
      (k.line = n),
      (k.column = r),
      (k.source = e),
      !t.silent)
    )
      throw k;
  }
  function s(m) {
    var k = m.exec(e);
    if (k) {
      var P = k[0];
      return (i(P), (e = e.slice(P.length)), k);
    }
  }
  function a() {
    s(ax);
  }
  function f(m) {
    var k;
    for (m = m || []; (k = c()); ) k !== !1 && m.push(k);
    return m;
  }
  function c() {
    var m = l();
    if (!(Qc != e.charAt(0) || qc != e.charAt(1))) {
      for (
        var k = 2;
        Ln != e.charAt(k) && (qc != e.charAt(k) || Qc != e.charAt(k + 1));

      )
        ++k;
      if (((k += 2), Ln === e.charAt(k - 1)))
        return u("End of comment missing");
      var P = e.slice(2, k - 2);
      return (
        (r += 2),
        i(P),
        (e = e.slice(k)),
        (r += 2),
        m({ type: gx, comment: P })
      );
    }
  }
  function d() {
    var m = l(),
      k = s(cx);
    if (k) {
      if ((c(), !s(fx))) return u("property missing ':'");
      var P = s(px),
        h = m({
          type: yx,
          property: Kc(k[0].replace(Wc, Ln)),
          value: P ? Kc(P[0].replace(Wc, Ln)) : Ln,
        });
      return (s(dx), h);
    }
  }
  function p() {
    var m = [];
    f(m);
    for (var k; (k = d()); ) k !== !1 && (m.push(k), f(m));
    return m;
  }
  return (a(), p());
}
function Kc(e) {
  return e ? e.replace(hx, Ln) : Ln;
}
var kx = xx,
  vx =
    (dl && dl.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    };
Object.defineProperty(aa, "__esModule", { value: !0 });
aa.default = Sx;
const wx = vx(kx);
function Sx(e, t) {
  let n = null;
  if (!e || typeof e != "string") return n;
  const r = (0, wx.default)(e),
    i = typeof t == "function";
  return (
    r.forEach((l) => {
      if (l.type !== "declaration") return;
      const { property: o, value: u } = l;
      i ? t(o, u, l) : u && ((n = n || {}), (n[o] = u));
    }),
    n
  );
}
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
io.camelCase = void 0;
var Cx = /^--[a-zA-Z0-9_-]+$/,
  Ex = /-([a-z])/g,
  bx = /^[^-]+$/,
  Nx = /^-(webkit|moz|ms|o|khtml)-/,
  Px = /^-(ms)-/,
  Lx = function (e) {
    return !e || bx.test(e) || Cx.test(e);
  },
  Tx = function (e, t) {
    return t.toUpperCase();
  },
  Yc = function (e, t) {
    return "".concat(t, "-");
  },
  _x = function (e, t) {
    return (
      t === void 0 && (t = {}),
      Lx(e)
        ? e
        : ((e = e.toLowerCase()),
          t.reactCompat ? (e = e.replace(Px, Yc)) : (e = e.replace(Nx, Yc)),
          e.replace(Ex, Tx))
    );
  };
io.camelCase = _x;
var zx =
    (dl && dl.__importDefault) ||
    function (e) {
      return e && e.__esModule ? e : { default: e };
    },
  Ix = zx(aa),
  jx = io;
function ts(e, t) {
  var n = {};
  return (
    !e ||
      typeof e != "string" ||
      (0, Ix.default)(e, function (r, i) {
        r && i && (n[(0, jx.camelCase)(r, t)] = i);
      }),
    n
  );
}
ts.default = ts;
var Dx = ts;
const Ax = fs(Dx),
  ih = lh("end"),
  ca = lh("start");
function lh(e) {
  return t;
  function t(n) {
    const r = (n && n.position && n.position[e]) || {};
    if (
      typeof r.line == "number" &&
      r.line > 0 &&
      typeof r.column == "number" &&
      r.column > 0
    )
      return {
        line: r.line,
        column: r.column,
        offset:
          typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0,
      };
  }
}
function Rx(e) {
  const t = ca(e),
    n = ih(e);
  if (t && n) return { start: t, end: n };
}
function Yr(e) {
  return !e || typeof e != "object"
    ? ""
    : "position" in e || "type" in e
      ? Xc(e.position)
      : "start" in e || "end" in e
        ? Xc(e)
        : "line" in e || "column" in e
          ? ns(e)
          : "";
}
function ns(e) {
  return Gc(e && e.line) + ":" + Gc(e && e.column);
}
function Xc(e) {
  return ns(e && e.start) + "-" + ns(e && e.end);
}
function Gc(e) {
  return e && typeof e == "number" ? e : 1;
}
class Ae extends Error {
  constructor(t, n, r) {
    (super(), typeof n == "string" && ((r = n), (n = void 0)));
    let i = "",
      l = {},
      o = !1;
    if (
      (n &&
        ("line" in n && "column" in n
          ? (l = { place: n })
          : "start" in n && "end" in n
            ? (l = { place: n })
            : "type" in n
              ? (l = { ancestors: [n], place: n.position })
              : (l = { ...n })),
      typeof t == "string"
        ? (i = t)
        : !l.cause && t && ((o = !0), (i = t.message), (l.cause = t)),
      !l.ruleId && !l.source && typeof r == "string")
    ) {
      const s = r.indexOf(":");
      s === -1
        ? (l.ruleId = r)
        : ((l.source = r.slice(0, s)), (l.ruleId = r.slice(s + 1)));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1];
      s && (l.place = s.position);
    }
    const u = l.place && "start" in l.place ? l.place.start : l.place;
    ((this.ancestors = l.ancestors || void 0),
      (this.cause = l.cause || void 0),
      (this.column = u ? u.column : void 0),
      (this.fatal = void 0),
      (this.file = ""),
      (this.message = i),
      (this.line = u ? u.line : void 0),
      (this.name = Yr(l.place) || "1:1"),
      (this.place = l.place || void 0),
      (this.reason = this.message),
      (this.ruleId = l.ruleId || void 0),
      (this.source = l.source || void 0),
      (this.stack =
        o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : ""),
      (this.actual = void 0),
      (this.expected = void 0),
      (this.note = void 0),
      (this.url = void 0));
  }
}
Ae.prototype.file = "";
Ae.prototype.name = "";
Ae.prototype.reason = "";
Ae.prototype.message = "";
Ae.prototype.stack = "";
Ae.prototype.column = void 0;
Ae.prototype.line = void 0;
Ae.prototype.ancestors = void 0;
Ae.prototype.cause = void 0;
Ae.prototype.fatal = void 0;
Ae.prototype.place = void 0;
Ae.prototype.ruleId = void 0;
Ae.prototype.source = void 0;
const fa = {}.hasOwnProperty,
  Fx = new Map(),
  Ox = /[A-Z]/g,
  Mx = new Set(["table", "tbody", "thead", "tfoot", "tr"]),
  Bx = new Set(["td", "th"]),
  oh = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function $x(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`",
      );
    r = Yx(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Kx(n, t.jsx, t.jsxs);
  }
  const i = {
      Fragment: t.Fragment,
      ancestors: [],
      components: t.components || {},
      create: r,
      elementAttributeNameCase: t.elementAttributeNameCase || "react",
      evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
      filePath: n,
      ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
      passKeys: t.passKeys !== !1,
      passNode: t.passNode || !1,
      schema: t.space === "svg" ? sa : ox,
      stylePropertyNameCase: t.stylePropertyNameCase || "dom",
      tableCellAlignToStyle: t.tableCellAlignToStyle !== !1,
    },
    l = uh(i, e, void 0);
  return l && typeof l != "string"
    ? l
    : i.create(e, i.Fragment, { children: l || void 0 }, void 0);
}
function uh(e, t, n) {
  if (t.type === "element") return Ux(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Hx(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return Wx(e, t, n);
  if (t.type === "mdxjsEsm") return Vx(e, t);
  if (t.type === "root") return Qx(e, t, n);
  if (t.type === "text") return qx(e, t);
}
function Ux(e, t, n) {
  const r = e.schema;
  let i = r;
  (t.tagName.toLowerCase() === "svg" &&
    r.space === "html" &&
    ((i = sa), (e.schema = i)),
    e.ancestors.push(t));
  const l = ah(e, t.tagName, !1),
    o = Xx(e, t);
  let u = da(e, t);
  return (
    Mx.has(t.tagName) &&
      (u = u.filter(function (s) {
        return typeof s == "string" ? !Xy(s) : !0;
      })),
    sh(e, o, l, t),
    pa(o, u),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(t, l, o, n)
  );
}
function Hx(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return (r.type, e.evaluater.evaluateExpression(r.expression));
  }
  mi(e, t.position);
}
function Vx(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return e.evaluater.evaluateProgram(t.data.estree);
  mi(e, t.position);
}
function Wx(e, t, n) {
  const r = e.schema;
  let i = r;
  (t.name === "svg" && r.space === "html" && ((i = sa), (e.schema = i)),
    e.ancestors.push(t));
  const l = t.name === null ? e.Fragment : ah(e, t.name, !0),
    o = Gx(e, t),
    u = da(e, t);
  return (
    sh(e, o, l, t),
    pa(o, u),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(t, l, o, n)
  );
}
function Qx(e, t, n) {
  const r = {};
  return (pa(r, da(e, t)), e.create(t, e.Fragment, r, n));
}
function qx(e, t) {
  return t.value;
}
function sh(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function pa(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function Kx(e, t, n) {
  return r;
  function r(i, l, o, u) {
    const a = Array.isArray(o.children) ? n : t;
    return u ? a(l, o, u) : a(l, o);
  }
}
function Yx(e, t) {
  return n;
  function n(r, i, l, o) {
    const u = Array.isArray(l.children),
      s = ca(r);
    return t(
      i,
      l,
      o,
      u,
      {
        columnNumber: s ? s.column - 1 : void 0,
        fileName: e,
        lineNumber: s ? s.line : void 0,
      },
      void 0,
    );
  }
}
function Xx(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && fa.call(t.properties, i)) {
      const l = Zx(e, i, t.properties[i]);
      if (l) {
        const [o, u] = l;
        e.tableCellAlignToStyle &&
        o === "align" &&
        typeof u == "string" &&
        Bx.has(t.tagName)
          ? (r = u)
          : (n[o] = u);
      }
    }
  if (r) {
    const l = n.style || (n.style = {});
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function Gx(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        l.type;
        const o = l.expression;
        o.type;
        const u = o.properties[0];
        (u.type, Object.assign(n, e.evaluater.evaluateExpression(u.argument)));
      } else mi(e, t.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const u = r.value.data.estree.body[0];
          (u.type, (l = e.evaluater.evaluateExpression(u.expression)));
        } else mi(e, t.position);
      else l = r.value === null ? !0 : r.value;
      n[i] = l;
    }
  return n;
}
function da(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? new Map() : Fx;
  for (; ++r < t.children.length; ) {
    const l = t.children[r];
    let o;
    if (e.passKeys) {
      const s =
        l.type === "element"
          ? l.tagName
          : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement"
            ? l.name
            : void 0;
      if (s) {
        const a = i.get(s) || 0;
        ((o = s + "-" + a), i.set(s, a + 1));
      }
    }
    const u = uh(e, l, o);
    u !== void 0 && n.push(u);
  }
  return n;
}
function Zx(e, t, n) {
  const r = rx(e.schema, t);
  if (!(n == null || (typeof n == "number" && Number.isNaN(n)))) {
    if (
      (Array.isArray(n) && (n = r.commaSeparated ? Wy(n) : ux(n)),
      r.property === "style")
    ) {
      let i = typeof n == "object" ? n : Jx(e, String(n));
      return (e.stylePropertyNameCase === "css" && (i = e0(i)), ["style", i]);
    }
    return [
      e.elementAttributeNameCase === "react" && r.space
        ? ex[r.property] || r.property
        : r.attribute,
      n,
    ];
  }
}
function Jx(e, t) {
  try {
    return Ax(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle) return {};
    const r = n,
      i = new Ae("Cannot parse `style` attribute", {
        ancestors: e.ancestors,
        cause: r,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime",
      });
    throw (
      (i.file = e.filePath || void 0),
      (i.url = oh + "#cannot-parse-style-attribute"),
      i
    );
  }
}
function ah(e, t, n) {
  let r;
  if (!n) r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let l = -1,
      o;
    for (; ++l < i.length; ) {
      const u = $c(i[l])
        ? { type: "Identifier", name: i[l] }
        : { type: "Literal", value: i[l] };
      o = o
        ? {
            type: "MemberExpression",
            object: o,
            property: u,
            computed: !!(l && u.type === "Literal"),
            optional: !1,
          }
        : u;
    }
    r = o;
  } else
    r =
      $c(t) && !/^[a-z]/.test(t)
        ? { type: "Identifier", name: t }
        : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = r.value;
    return fa.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(r);
  mi(e);
}
function mi(e, t) {
  const n = new Ae("Cannot handle MDX estrees without `createEvaluater`", {
    ancestors: e.ancestors,
    place: t,
    ruleId: "mdx-estree",
    source: "hast-util-to-jsx-runtime",
  });
  throw (
    (n.file = e.filePath || void 0),
    (n.url = oh + "#cannot-handle-mdx-estrees-without-createevaluater"),
    n
  );
}
function e0(e) {
  const t = {};
  let n;
  for (n in e) fa.call(e, n) && (t[t0(n)] = e[n]);
  return t;
}
function t0(e) {
  let t = e.replace(Ox, n0);
  return (t.slice(0, 3) === "ms-" && (t = "-" + t), t);
}
function n0(e) {
  return "-" + e.toLowerCase();
}
const $o = {
    action: ["form"],
    cite: ["blockquote", "del", "ins", "q"],
    data: ["object"],
    formAction: ["button", "input"],
    href: ["a", "area", "base", "link"],
    icon: ["menuitem"],
    itemId: null,
    manifest: ["html"],
    ping: ["a", "area"],
    poster: ["video"],
    src: [
      "audio",
      "embed",
      "iframe",
      "img",
      "input",
      "script",
      "source",
      "track",
      "video",
    ],
  },
  r0 = {};
function ha(e, t) {
  const n = r0,
    r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0,
    i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return ch(e, r, i);
}
function ch(e, t, n) {
  if (i0(e)) {
    if ("value" in e) return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return Zc(e.children, t, n);
  }
  return Array.isArray(e) ? Zc(e, t, n) : "";
}
function Zc(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) r[i] = ch(e[i], t, n);
  return r.join("");
}
function i0(e) {
  return !!(e && typeof e == "object");
}
const Jc = document.createElement("i");
function ma(e) {
  const t = "&" + e + ";";
  Jc.innerHTML = t;
  const n = Jc.textContent;
  return (n.charCodeAt(n.length - 1) === 59 && e !== "semi") || n === t
    ? !1
    : n;
}
function nt(e, t, n, r) {
  const i = e.length;
  let l = 0,
    o;
  if (
    (t < 0 ? (t = -t > i ? 0 : i + t) : (t = t > i ? i : t),
    (n = n > 0 ? n : 0),
    r.length < 1e4)
  )
    ((o = Array.from(r)), o.unshift(t, n), e.splice(...o));
  else
    for (n && e.splice(t, n); l < r.length; )
      ((o = r.slice(l, l + 1e4)),
        o.unshift(t, 0),
        e.splice(...o),
        (l += 1e4),
        (t += 1e4));
}
function dt(e, t) {
  return e.length > 0 ? (nt(e, e.length, 0, t), e) : t;
}
const ef = {}.hasOwnProperty;
function fh(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; ) l0(t, e[n]);
  return t;
}
function l0(e, t) {
  let n;
  for (n in t) {
    const i = (ef.call(e, n) ? e[n] : void 0) || (e[n] = {}),
      l = t[n];
    let o;
    if (l)
      for (o in l) {
        ef.call(i, o) || (i[o] = []);
        const u = l[o];
        o0(i[o], Array.isArray(u) ? u : u ? [u] : []);
      }
  }
}
function o0(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; ) (t[n].add === "after" ? e : r).push(t[n]);
  nt(e, 0, 0, r);
}
function ph(e, t) {
  const n = Number.parseInt(e, t);
  return n < 9 ||
    n === 11 ||
    (n > 13 && n < 32) ||
    (n > 126 && n < 160) ||
    (n > 55295 && n < 57344) ||
    (n > 64975 && n < 65008) ||
    (n & 65535) === 65535 ||
    (n & 65535) === 65534 ||
    n > 1114111
    ? "�"
    : String.fromCodePoint(n);
}
function Lt(e) {
  return e
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const Be = Sn(/[A-Za-z]/),
  je = Sn(/[\dA-Za-z]/),
  u0 = Sn(/[#-'*+\--9=?A-Z^-~]/);
function Ol(e) {
  return e !== null && (e < 32 || e === 127);
}
const rs = Sn(/\d/),
  s0 = Sn(/[\dA-Fa-f]/),
  a0 = Sn(/[!-/:-@[-`{-~]/);
function H(e) {
  return e !== null && e < -2;
}
function ae(e) {
  return e !== null && (e < 0 || e === 32);
}
function J(e) {
  return e === -2 || e === -1 || e === 32;
}
const lo = Sn(new RegExp("\\p{P}|\\p{S}", "u")),
  Mn = Sn(/\s/);
function Sn(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Er(e) {
  const t = [];
  let n = -1,
    r = 0,
    i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let o = "";
    if (l === 37 && je(e.charCodeAt(n + 1)) && je(e.charCodeAt(n + 2))) i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) ||
        (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const u = e.charCodeAt(n + 1);
      l < 56320 && u > 56319 && u < 57344
        ? ((o = String.fromCharCode(l, u)), (i = 1))
        : (o = "�");
    } else o = String.fromCharCode(l);
    (o &&
      (t.push(e.slice(r, n), encodeURIComponent(o)), (r = n + i + 1), (o = "")),
      i && ((n += i), (i = 0)));
  }
  return t.join("") + e.slice(r);
}
function ne(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(s) {
    return J(s) ? (e.enter(n), u(s)) : t(s);
  }
  function u(s) {
    return J(s) && l++ < i ? (e.consume(s), u) : (e.exit(n), t(s));
  }
}
const c0 = { tokenize: f0 };
function f0(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(u),
      e.exit("lineEnding"),
      ne(e, t, "linePrefix")
    );
  }
  function i(u) {
    return (e.enter("paragraph"), l(u));
  }
  function l(u) {
    const s = e.enter("chunkText", { contentType: "text", previous: n });
    return (n && (n.next = s), (n = s), o(u));
  }
  function o(u) {
    if (u === null) {
      (e.exit("chunkText"), e.exit("paragraph"), e.consume(u));
      return;
    }
    return H(u) ? (e.consume(u), e.exit("chunkText"), l) : (e.consume(u), o);
  }
}
const p0 = { tokenize: d0 },
  tf = { tokenize: h0 };
function d0(e) {
  const t = this,
    n = [];
  let r = 0,
    i,
    l,
    o;
  return u;
  function u(y) {
    if (r < n.length) {
      const E = n[r];
      return ((t.containerState = E[1]), e.attempt(E[0].continuation, s, a)(y));
    }
    return a(y);
  }
  function s(y) {
    if ((r++, t.containerState._closeFlow)) {
      ((t.containerState._closeFlow = void 0), i && g());
      const E = t.events.length;
      let b = E,
        S;
      for (; b--; )
        if (t.events[b][0] === "exit" && t.events[b][1].type === "chunkFlow") {
          S = t.events[b][1].end;
          break;
        }
      h(r);
      let T = E;
      for (; T < t.events.length; ) ((t.events[T][1].end = { ...S }), T++);
      return (
        nt(t.events, b + 1, 0, t.events.slice(E)),
        (t.events.length = T),
        a(y)
      );
    }
    return u(y);
  }
  function a(y) {
    if (r === n.length) {
      if (!i) return d(y);
      if (i.currentConstruct && i.currentConstruct.concrete) return m(y);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return ((t.containerState = {}), e.check(tf, f, c)(y));
  }
  function f(y) {
    return (i && g(), h(r), d(y));
  }
  function c(y) {
    return (
      (t.parser.lazy[t.now().line] = r !== n.length),
      (o = t.now().offset),
      m(y)
    );
  }
  function d(y) {
    return ((t.containerState = {}), e.attempt(tf, p, m)(y));
  }
  function p(y) {
    return (r++, n.push([t.currentConstruct, t.containerState]), d(y));
  }
  function m(y) {
    if (y === null) {
      (i && g(), h(0), e.consume(y));
      return;
    }
    return (
      (i = i || t.parser.flow(t.now())),
      e.enter("chunkFlow", { _tokenizer: i, contentType: "flow", previous: l }),
      k(y)
    );
  }
  function k(y) {
    if (y === null) {
      (P(e.exit("chunkFlow"), !0), h(0), e.consume(y));
      return;
    }
    return H(y)
      ? (e.consume(y),
        P(e.exit("chunkFlow")),
        (r = 0),
        (t.interrupt = void 0),
        u)
      : (e.consume(y), k);
  }
  function P(y, E) {
    const b = t.sliceStream(y);
    if (
      (E && b.push(null),
      (y.previous = l),
      l && (l.next = y),
      (l = y),
      i.defineSkip(y.start),
      i.write(b),
      t.parser.lazy[y.start.line])
    ) {
      let S = i.events.length;
      for (; S--; )
        if (
          i.events[S][1].start.offset < o &&
          (!i.events[S][1].end || i.events[S][1].end.offset > o)
        )
          return;
      const T = t.events.length;
      let _ = T,
        D,
        C;
      for (; _--; )
        if (t.events[_][0] === "exit" && t.events[_][1].type === "chunkFlow") {
          if (D) {
            C = t.events[_][1].end;
            break;
          }
          D = !0;
        }
      for (h(r), S = T; S < t.events.length; )
        ((t.events[S][1].end = { ...C }), S++);
      (nt(t.events, _ + 1, 0, t.events.slice(T)), (t.events.length = S));
    }
  }
  function h(y) {
    let E = n.length;
    for (; E-- > y; ) {
      const b = n[E];
      ((t.containerState = b[1]), b[0].exit.call(t, e));
    }
    n.length = y;
  }
  function g() {
    (i.write([null]),
      (l = void 0),
      (i = void 0),
      (t.containerState._closeFlow = void 0));
  }
}
function h0(e, t, n) {
  return ne(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
  );
}
function kr(e) {
  if (e === null || ae(e) || Mn(e)) return 1;
  if (lo(e)) return 2;
}
function oo(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && ((t = l(t, n)), r.push(l));
  }
  return t;
}
const is = { name: "attention", resolveAll: m0, tokenize: g0 };
function m0(e, t) {
  let n = -1,
    r,
    i,
    l,
    o,
    u,
    s,
    a,
    f;
  for (; ++n < e.length; )
    if (
      e[n][0] === "enter" &&
      e[n][1].type === "attentionSequence" &&
      e[n][1]._close
    ) {
      for (r = n; r--; )
        if (
          e[r][0] === "exit" &&
          e[r][1].type === "attentionSequence" &&
          e[r][1]._open &&
          t.sliceSerialize(e[r][1]).charCodeAt(0) ===
            t.sliceSerialize(e[n][1]).charCodeAt(0)
        ) {
          if (
            (e[r][1]._close || e[n][1]._open) &&
            (e[n][1].end.offset - e[n][1].start.offset) % 3 &&
            !(
              (e[r][1].end.offset -
                e[r][1].start.offset +
                e[n][1].end.offset -
                e[n][1].start.offset) %
              3
            )
          )
            continue;
          s =
            e[r][1].end.offset - e[r][1].start.offset > 1 &&
            e[n][1].end.offset - e[n][1].start.offset > 1
              ? 2
              : 1;
          const c = { ...e[r][1].end },
            d = { ...e[n][1].start };
          (nf(c, -s),
            nf(d, s),
            (o = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: c,
              end: { ...e[r][1].end },
            }),
            (u = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: { ...e[n][1].start },
              end: d,
            }),
            (l = {
              type: s > 1 ? "strongText" : "emphasisText",
              start: { ...e[r][1].end },
              end: { ...e[n][1].start },
            }),
            (i = {
              type: s > 1 ? "strong" : "emphasis",
              start: { ...o.start },
              end: { ...u.end },
            }),
            (e[r][1].end = { ...o.start }),
            (e[n][1].start = { ...u.end }),
            (a = []),
            e[r][1].end.offset - e[r][1].start.offset &&
              (a = dt(a, [
                ["enter", e[r][1], t],
                ["exit", e[r][1], t],
              ])),
            (a = dt(a, [
              ["enter", i, t],
              ["enter", o, t],
              ["exit", o, t],
              ["enter", l, t],
            ])),
            (a = dt(
              a,
              oo(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t),
            )),
            (a = dt(a, [
              ["exit", l, t],
              ["enter", u, t],
              ["exit", u, t],
              ["exit", i, t],
            ])),
            e[n][1].end.offset - e[n][1].start.offset
              ? ((f = 2),
                (a = dt(a, [
                  ["enter", e[n][1], t],
                  ["exit", e[n][1], t],
                ])))
              : (f = 0),
            nt(e, r - 1, n - r + 3, a),
            (n = r + a.length - f - 2));
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function g0(e, t) {
  const n = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = kr(r);
  let l;
  return o;
  function o(s) {
    return ((l = s), e.enter("attentionSequence"), u(s));
  }
  function u(s) {
    if (s === l) return (e.consume(s), u);
    const a = e.exit("attentionSequence"),
      f = kr(s),
      c = !f || (f === 2 && i) || n.includes(s),
      d = !i || (i === 2 && f) || n.includes(r);
    return (
      (a._open = !!(l === 42 ? c : c && (i || !d))),
      (a._close = !!(l === 42 ? d : d && (f || !c))),
      t(s)
    );
  }
}
function nf(e, t) {
  ((e.column += t), (e.offset += t), (e._bufferIndex += t));
}
const y0 = { name: "autolink", tokenize: x0 };
function x0(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return (
      e.enter("autolink"),
      e.enter("autolinkMarker"),
      e.consume(p),
      e.exit("autolinkMarker"),
      e.enter("autolinkProtocol"),
      l
    );
  }
  function l(p) {
    return Be(p) ? (e.consume(p), o) : p === 64 ? n(p) : a(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || je(p) ? ((r = 1), u(p)) : a(p);
  }
  function u(p) {
    return p === 58
      ? (e.consume(p), (r = 0), s)
      : (p === 43 || p === 45 || p === 46 || je(p)) && r++ < 32
        ? (e.consume(p), u)
        : ((r = 0), a(p));
  }
  function s(p) {
    return p === 62
      ? (e.exit("autolinkProtocol"),
        e.enter("autolinkMarker"),
        e.consume(p),
        e.exit("autolinkMarker"),
        e.exit("autolink"),
        t)
      : p === null || p === 32 || p === 60 || Ol(p)
        ? n(p)
        : (e.consume(p), s);
  }
  function a(p) {
    return p === 64 ? (e.consume(p), f) : u0(p) ? (e.consume(p), a) : n(p);
  }
  function f(p) {
    return je(p) ? c(p) : n(p);
  }
  function c(p) {
    return p === 46
      ? (e.consume(p), (r = 0), f)
      : p === 62
        ? ((e.exit("autolinkProtocol").type = "autolinkEmail"),
          e.enter("autolinkMarker"),
          e.consume(p),
          e.exit("autolinkMarker"),
          e.exit("autolink"),
          t)
        : d(p);
  }
  function d(p) {
    if ((p === 45 || je(p)) && r++ < 63) {
      const m = p === 45 ? d : c;
      return (e.consume(p), m);
    }
    return n(p);
  }
}
const Ci = { partial: !0, tokenize: k0 };
function k0(e, t, n) {
  return r;
  function r(l) {
    return J(l) ? ne(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || H(l) ? t(l) : n(l);
  }
}
const dh = {
  continuation: { tokenize: w0 },
  exit: S0,
  name: "blockQuote",
  tokenize: v0,
};
function v0(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const u = r.containerState;
      return (
        u.open || (e.enter("blockQuote", { _container: !0 }), (u.open = !0)),
        e.enter("blockQuotePrefix"),
        e.enter("blockQuoteMarker"),
        e.consume(o),
        e.exit("blockQuoteMarker"),
        l
      );
    }
    return n(o);
  }
  function l(o) {
    return J(o)
      ? (e.enter("blockQuotePrefixWhitespace"),
        e.consume(o),
        e.exit("blockQuotePrefixWhitespace"),
        e.exit("blockQuotePrefix"),
        t)
      : (e.exit("blockQuotePrefix"), t(o));
  }
}
function w0(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return J(o)
      ? ne(
          e,
          l,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(o)
      : l(o);
  }
  function l(o) {
    return e.attempt(dh, t, n)(o);
  }
}
function S0(e) {
  e.exit("blockQuote");
}
const hh = { name: "characterEscape", tokenize: C0 };
function C0(e, t, n) {
  return r;
  function r(l) {
    return (
      e.enter("characterEscape"),
      e.enter("escapeMarker"),
      e.consume(l),
      e.exit("escapeMarker"),
      i
    );
  }
  function i(l) {
    return a0(l)
      ? (e.enter("characterEscapeValue"),
        e.consume(l),
        e.exit("characterEscapeValue"),
        e.exit("characterEscape"),
        t)
      : n(l);
  }
}
const mh = { name: "characterReference", tokenize: E0 };
function E0(e, t, n) {
  const r = this;
  let i = 0,
    l,
    o;
  return u;
  function u(c) {
    return (
      e.enter("characterReference"),
      e.enter("characterReferenceMarker"),
      e.consume(c),
      e.exit("characterReferenceMarker"),
      s
    );
  }
  function s(c) {
    return c === 35
      ? (e.enter("characterReferenceMarkerNumeric"),
        e.consume(c),
        e.exit("characterReferenceMarkerNumeric"),
        a)
      : (e.enter("characterReferenceValue"), (l = 31), (o = je), f(c));
  }
  function a(c) {
    return c === 88 || c === 120
      ? (e.enter("characterReferenceMarkerHexadecimal"),
        e.consume(c),
        e.exit("characterReferenceMarkerHexadecimal"),
        e.enter("characterReferenceValue"),
        (l = 6),
        (o = s0),
        f)
      : (e.enter("characterReferenceValue"), (l = 7), (o = rs), f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const d = e.exit("characterReferenceValue");
      return o === je && !ma(r.sliceSerialize(d))
        ? n(c)
        : (e.enter("characterReferenceMarker"),
          e.consume(c),
          e.exit("characterReferenceMarker"),
          e.exit("characterReference"),
          t);
    }
    return o(c) && i++ < l ? (e.consume(c), f) : n(c);
  }
}
const rf = { partial: !0, tokenize: N0 },
  lf = { concrete: !0, name: "codeFenced", tokenize: b0 };
function b0(e, t, n) {
  const r = this,
    i = { partial: !0, tokenize: b };
  let l = 0,
    o = 0,
    u;
  return s;
  function s(S) {
    return a(S);
  }
  function a(S) {
    const T = r.events[r.events.length - 1];
    return (
      (l =
        T && T[1].type === "linePrefix"
          ? T[2].sliceSerialize(T[1], !0).length
          : 0),
      (u = S),
      e.enter("codeFenced"),
      e.enter("codeFencedFence"),
      e.enter("codeFencedFenceSequence"),
      f(S)
    );
  }
  function f(S) {
    return S === u
      ? (o++, e.consume(S), f)
      : o < 3
        ? n(S)
        : (e.exit("codeFencedFenceSequence"),
          J(S) ? ne(e, c, "whitespace")(S) : c(S));
  }
  function c(S) {
    return S === null || H(S)
      ? (e.exit("codeFencedFence"), r.interrupt ? t(S) : e.check(rf, k, E)(S))
      : (e.enter("codeFencedFenceInfo"),
        e.enter("chunkString", { contentType: "string" }),
        d(S));
  }
  function d(S) {
    return S === null || H(S)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(S))
      : J(S)
        ? (e.exit("chunkString"),
          e.exit("codeFencedFenceInfo"),
          ne(e, p, "whitespace")(S))
        : S === 96 && S === u
          ? n(S)
          : (e.consume(S), d);
  }
  function p(S) {
    return S === null || H(S)
      ? c(S)
      : (e.enter("codeFencedFenceMeta"),
        e.enter("chunkString", { contentType: "string" }),
        m(S));
  }
  function m(S) {
    return S === null || H(S)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(S))
      : S === 96 && S === u
        ? n(S)
        : (e.consume(S), m);
  }
  function k(S) {
    return e.attempt(i, E, P)(S);
  }
  function P(S) {
    return (e.enter("lineEnding"), e.consume(S), e.exit("lineEnding"), h);
  }
  function h(S) {
    return l > 0 && J(S) ? ne(e, g, "linePrefix", l + 1)(S) : g(S);
  }
  function g(S) {
    return S === null || H(S)
      ? e.check(rf, k, E)(S)
      : (e.enter("codeFlowValue"), y(S));
  }
  function y(S) {
    return S === null || H(S)
      ? (e.exit("codeFlowValue"), g(S))
      : (e.consume(S), y);
  }
  function E(S) {
    return (e.exit("codeFenced"), t(S));
  }
  function b(S, T, _) {
    let D = 0;
    return C;
    function C(V) {
      return (S.enter("lineEnding"), S.consume(V), S.exit("lineEnding"), j);
    }
    function j(V) {
      return (
        S.enter("codeFencedFence"),
        J(V)
          ? ne(
              S,
              F,
              "linePrefix",
              r.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4,
            )(V)
          : F(V)
      );
    }
    function F(V) {
      return V === u ? (S.enter("codeFencedFenceSequence"), U(V)) : _(V);
    }
    function U(V) {
      return V === u
        ? (D++, S.consume(V), U)
        : D >= o
          ? (S.exit("codeFencedFenceSequence"),
            J(V) ? ne(S, Z, "whitespace")(V) : Z(V))
          : _(V);
    }
    function Z(V) {
      return V === null || H(V) ? (S.exit("codeFencedFence"), T(V)) : _(V);
    }
  }
}
function N0(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null
      ? n(o)
      : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const Uo = { name: "codeIndented", tokenize: L0 },
  P0 = { partial: !0, tokenize: T0 };
function L0(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return (e.enter("codeIndented"), ne(e, l, "linePrefix", 5)(a));
  }
  function l(a) {
    const f = r.events[r.events.length - 1];
    return f &&
      f[1].type === "linePrefix" &&
      f[2].sliceSerialize(f[1], !0).length >= 4
      ? o(a)
      : n(a);
  }
  function o(a) {
    return a === null
      ? s(a)
      : H(a)
        ? e.attempt(P0, o, s)(a)
        : (e.enter("codeFlowValue"), u(a));
  }
  function u(a) {
    return a === null || H(a)
      ? (e.exit("codeFlowValue"), o(a))
      : (e.consume(a), u);
  }
  function s(a) {
    return (e.exit("codeIndented"), t(a));
  }
}
function T0(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line]
      ? n(o)
      : H(o)
        ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i)
        : ne(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const u = r.events[r.events.length - 1];
    return u &&
      u[1].type === "linePrefix" &&
      u[2].sliceSerialize(u[1], !0).length >= 4
      ? t(o)
      : H(o)
        ? i(o)
        : n(o);
  }
}
const _0 = { name: "codeText", previous: I0, resolve: z0, tokenize: j0 };
function z0(e) {
  let t = e.length - 4,
    n = 3,
    r,
    i;
  if (
    (e[n][1].type === "lineEnding" || e[n][1].type === "space") &&
    (e[t][1].type === "lineEnding" || e[t][1].type === "space")
  ) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        ((e[n][1].type = "codeTextPadding"),
          (e[t][1].type = "codeTextPadding"),
          (n += 2),
          (t -= 2));
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0
      ? r !== t && e[r][1].type !== "lineEnding" && (i = r)
      : (r === t || e[r][1].type === "lineEnding") &&
        ((e[i][1].type = "codeTextData"),
        r !== i + 2 &&
          ((e[i][1].end = e[r - 1][1].end),
          e.splice(i + 2, r - i - 2),
          (t -= r - i - 2),
          (r = i + 2)),
        (i = void 0));
  return e;
}
function I0(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function j0(e, t, n) {
  let r = 0,
    i,
    l;
  return o;
  function o(c) {
    return (e.enter("codeText"), e.enter("codeTextSequence"), u(c));
  }
  function u(c) {
    return c === 96
      ? (e.consume(c), r++, u)
      : (e.exit("codeTextSequence"), s(c));
  }
  function s(c) {
    return c === null
      ? n(c)
      : c === 32
        ? (e.enter("space"), e.consume(c), e.exit("space"), s)
        : c === 96
          ? ((l = e.enter("codeTextSequence")), (i = 0), f(c))
          : H(c)
            ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), s)
            : (e.enter("codeTextData"), a(c));
  }
  function a(c) {
    return c === null || c === 32 || c === 96 || H(c)
      ? (e.exit("codeTextData"), s(c))
      : (e.consume(c), a);
  }
  function f(c) {
    return c === 96
      ? (e.consume(c), i++, f)
      : i === r
        ? (e.exit("codeTextSequence"), e.exit("codeText"), t(c))
        : ((l.type = "codeTextData"), a(c));
  }
}
class D0 {
  constructor(t) {
    ((this.left = t ? [...t] : []), (this.right = []));
  }
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" +
          t +
          "` in a splice buffer of size `" +
          (this.left.length + this.right.length) +
          "`",
      );
    return t < this.left.length
      ? this.left[t]
      : this.right[this.right.length - t + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return (this.setCursor(0), this.right.pop());
  }
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length
      ? this.left.slice(t, r)
      : t > this.left.length
        ? this.right
            .slice(
              this.right.length - r + this.left.length,
              this.right.length - t + this.left.length,
            )
            .reverse()
        : this.left
            .slice(t)
            .concat(
              this.right
                .slice(this.right.length - r + this.left.length)
                .reverse(),
            );
  }
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const l = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY,
    );
    return (r && Dr(this.left, r), l.reverse());
  }
  pop() {
    return (this.setCursor(Number.POSITIVE_INFINITY), this.left.pop());
  }
  push(t) {
    (this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t));
  }
  pushMany(t) {
    (this.setCursor(Number.POSITIVE_INFINITY), Dr(this.left, t));
  }
  unshift(t) {
    (this.setCursor(0), this.right.push(t));
  }
  unshiftMany(t) {
    (this.setCursor(0), Dr(this.right, t.reverse()));
  }
  setCursor(t) {
    if (
      !(
        t === this.left.length ||
        (t > this.left.length && this.right.length === 0) ||
        (t < 0 && this.left.length === 0)
      )
    )
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        Dr(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - t,
          Number.POSITIVE_INFINITY,
        );
        Dr(this.left, n.reverse());
      }
  }
}
function Dr(e, t) {
  let n = 0;
  if (t.length < 1e4) e.push(...t);
  else for (; n < t.length; ) (e.push(...t.slice(n, n + 1e4)), (n += 1e4));
}
function gh(e) {
  const t = {};
  let n = -1,
    r,
    i,
    l,
    o,
    u,
    s,
    a;
  const f = new D0(e);
  for (; ++n < f.length; ) {
    for (; n in t; ) n = t[n];
    if (
      ((r = f.get(n)),
      n &&
        r[1].type === "chunkFlow" &&
        f.get(n - 1)[1].type === "listItemPrefix" &&
        ((s = r[1]._tokenizer.events),
        (l = 0),
        l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2),
        l < s.length && s[l][1].type === "content"))
    )
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" &&
          ((s[l][1]._isInFirstContentOfListItem = !0), l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, A0(f, n)), (n = t[n]), (a = !0));
    else if (r[1]._container) {
      for (l = n, i = void 0; l--; )
        if (
          ((o = f.get(l)),
          o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
        )
          o[0] === "enter" &&
            (i && (f.get(i)[1].type = "lineEndingBlank"),
            (o[1].type = "lineEnding"),
            (i = l));
        else if (
          !(o[1].type === "linePrefix" || o[1].type === "listItemIndent")
        )
          break;
      i &&
        ((r[1].end = { ...f.get(i)[1].start }),
        (u = f.slice(i, n)),
        u.unshift(r),
        f.splice(i, n - i + 1, u));
    }
  }
  return (nt(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !a);
}
function A0(e, t) {
  const n = e.get(t)[1],
    r = e.get(t)[2];
  let i = t - 1;
  const l = [];
  let o = n._tokenizer;
  o ||
    ((o = r.parser[n.contentType](n.start)),
    n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const u = o.events,
    s = [],
    a = {};
  let f,
    c,
    d = -1,
    p = n,
    m = 0,
    k = 0;
  const P = [k];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; );
    (l.push(i),
      p._tokenizer ||
        ((f = r.sliceStream(p)),
        p.next || f.push(null),
        c && o.defineSkip(p.start),
        p._isInFirstContentOfListItem &&
          (o._gfmTasklistFirstContentOfListItem = !0),
        o.write(f),
        p._isInFirstContentOfListItem &&
          (o._gfmTasklistFirstContentOfListItem = void 0)),
      (c = p),
      (p = p.next));
  }
  for (p = n; ++d < u.length; )
    u[d][0] === "exit" &&
      u[d - 1][0] === "enter" &&
      u[d][1].type === u[d - 1][1].type &&
      u[d][1].start.line !== u[d][1].end.line &&
      ((k = d + 1),
      P.push(k),
      (p._tokenizer = void 0),
      (p.previous = void 0),
      (p = p.next));
  for (
    o.events = [],
      p ? ((p._tokenizer = void 0), (p.previous = void 0)) : P.pop(),
      d = P.length;
    d--;

  ) {
    const h = u.slice(P[d], P[d + 1]),
      g = l.pop();
    (s.push([g, g + h.length - 1]), e.splice(g, 2, h));
  }
  for (s.reverse(), d = -1; ++d < s.length; )
    ((a[m + s[d][0]] = m + s[d][1]), (m += s[d][1] - s[d][0] - 1));
  return a;
}
const R0 = { resolve: O0, tokenize: M0 },
  F0 = { partial: !0, tokenize: B0 };
function O0(e) {
  return (gh(e), e);
}
function M0(e, t) {
  let n;
  return r;
  function r(u) {
    return (
      e.enter("content"),
      (n = e.enter("chunkContent", { contentType: "content" })),
      i(u)
    );
  }
  function i(u) {
    return u === null ? l(u) : H(u) ? e.check(F0, o, l)(u) : (e.consume(u), i);
  }
  function l(u) {
    return (e.exit("chunkContent"), e.exit("content"), t(u));
  }
  function o(u) {
    return (
      e.consume(u),
      e.exit("chunkContent"),
      (n.next = e.enter("chunkContent", {
        contentType: "content",
        previous: n,
      })),
      (n = n.next),
      i
    );
  }
}
function B0(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return (
      e.exit("chunkContent"),
      e.enter("lineEnding"),
      e.consume(o),
      e.exit("lineEnding"),
      ne(e, l, "linePrefix")
    );
  }
  function l(o) {
    if (o === null || H(o)) return n(o);
    const u = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") &&
      u &&
      u[1].type === "linePrefix" &&
      u[2].sliceSerialize(u[1], !0).length >= 4
      ? t(o)
      : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function yh(e, t, n, r, i, l, o, u, s) {
  const a = s || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(h) {
    return h === 60
      ? (e.enter(r), e.enter(i), e.enter(l), e.consume(h), e.exit(l), d)
      : h === null || h === 32 || h === 41 || Ol(h)
        ? n(h)
        : (e.enter(r),
          e.enter(o),
          e.enter(u),
          e.enter("chunkString", { contentType: "string" }),
          k(h));
  }
  function d(h) {
    return h === 62
      ? (e.enter(l), e.consume(h), e.exit(l), e.exit(i), e.exit(r), t)
      : (e.enter(u), e.enter("chunkString", { contentType: "string" }), p(h));
  }
  function p(h) {
    return h === 62
      ? (e.exit("chunkString"), e.exit(u), d(h))
      : h === null || h === 60 || H(h)
        ? n(h)
        : (e.consume(h), h === 92 ? m : p);
  }
  function m(h) {
    return h === 60 || h === 62 || h === 92 ? (e.consume(h), p) : p(h);
  }
  function k(h) {
    return !f && (h === null || h === 41 || ae(h))
      ? (e.exit("chunkString"), e.exit(u), e.exit(o), e.exit(r), t(h))
      : f < a && h === 40
        ? (e.consume(h), f++, k)
        : h === 41
          ? (e.consume(h), f--, k)
          : h === null || h === 32 || h === 40 || Ol(h)
            ? n(h)
            : (e.consume(h), h === 92 ? P : k);
  }
  function P(h) {
    return h === 40 || h === 41 || h === 92 ? (e.consume(h), k) : k(h);
  }
}
function xh(e, t, n, r, i, l) {
  const o = this;
  let u = 0,
    s;
  return a;
  function a(p) {
    return (e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), f);
  }
  function f(p) {
    return u > 999 ||
      p === null ||
      p === 91 ||
      (p === 93 && !s) ||
      (p === 94 && !u && "_hiddenFootnoteSupport" in o.parser.constructs)
      ? n(p)
      : p === 93
        ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t)
        : H(p)
          ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), f)
          : (e.enter("chunkString", { contentType: "string" }), c(p));
  }
  function c(p) {
    return p === null || p === 91 || p === 93 || H(p) || u++ > 999
      ? (e.exit("chunkString"), f(p))
      : (e.consume(p), s || (s = !J(p)), p === 92 ? d : c);
  }
  function d(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), u++, c) : c(p);
  }
}
function kh(e, t, n, r, i, l) {
  let o;
  return u;
  function u(d) {
    return d === 34 || d === 39 || d === 40
      ? (e.enter(r),
        e.enter(i),
        e.consume(d),
        e.exit(i),
        (o = d === 40 ? 41 : d),
        s)
      : n(d);
  }
  function s(d) {
    return d === o
      ? (e.enter(i), e.consume(d), e.exit(i), e.exit(r), t)
      : (e.enter(l), a(d));
  }
  function a(d) {
    return d === o
      ? (e.exit(l), s(o))
      : d === null
        ? n(d)
        : H(d)
          ? (e.enter("lineEnding"),
            e.consume(d),
            e.exit("lineEnding"),
            ne(e, a, "linePrefix"))
          : (e.enter("chunkString", { contentType: "string" }), f(d));
  }
  function f(d) {
    return d === o || d === null || H(d)
      ? (e.exit("chunkString"), a(d))
      : (e.consume(d), d === 92 ? c : f);
  }
  function c(d) {
    return d === o || d === 92 ? (e.consume(d), f) : f(d);
  }
}
function Xr(e, t) {
  let n;
  return r;
  function r(i) {
    return H(i)
      ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), (n = !0), r)
      : J(i)
        ? ne(e, r, n ? "linePrefix" : "lineSuffix")(i)
        : t(i);
  }
}
const $0 = { name: "definition", tokenize: H0 },
  U0 = { partial: !0, tokenize: V0 };
function H0(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return (e.enter("definition"), o(p));
  }
  function o(p) {
    return xh.call(
      r,
      e,
      u,
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString",
    )(p);
  }
  function u(p) {
    return (
      (i = Lt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      p === 58
        ? (e.enter("definitionMarker"),
          e.consume(p),
          e.exit("definitionMarker"),
          s)
        : n(p)
    );
  }
  function s(p) {
    return ae(p) ? Xr(e, a)(p) : a(p);
  }
  function a(p) {
    return yh(
      e,
      f,
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString",
    )(p);
  }
  function f(p) {
    return e.attempt(U0, c, c)(p);
  }
  function c(p) {
    return J(p) ? ne(e, d, "whitespace")(p) : d(p);
  }
  function d(p) {
    return p === null || H(p)
      ? (e.exit("definition"), r.parser.defined.push(i), t(p))
      : n(p);
  }
}
function V0(e, t, n) {
  return r;
  function r(u) {
    return ae(u) ? Xr(e, i)(u) : n(u);
  }
  function i(u) {
    return kh(
      e,
      l,
      n,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString",
    )(u);
  }
  function l(u) {
    return J(u) ? ne(e, o, "whitespace")(u) : o(u);
  }
  function o(u) {
    return u === null || H(u) ? t(u) : n(u);
  }
}
const W0 = { name: "hardBreakEscape", tokenize: Q0 };
function Q0(e, t, n) {
  return r;
  function r(l) {
    return (e.enter("hardBreakEscape"), e.consume(l), i);
  }
  function i(l) {
    return H(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const q0 = { name: "headingAtx", resolve: K0, tokenize: Y0 };
function K0(e, t) {
  let n = e.length - 2,
    r = 3,
    i,
    l;
  return (
    e[r][1].type === "whitespace" && (r += 2),
    n - 2 > r && e[n][1].type === "whitespace" && (n -= 2),
    e[n][1].type === "atxHeadingSequence" &&
      (r === n - 1 || (n - 4 > r && e[n - 2][1].type === "whitespace")) &&
      (n -= r + 1 === n ? 2 : 4),
    n > r &&
      ((i = { type: "atxHeadingText", start: e[r][1].start, end: e[n][1].end }),
      (l = {
        type: "chunkText",
        start: e[r][1].start,
        end: e[n][1].end,
        contentType: "text",
      }),
      nt(e, r, n - r + 1, [
        ["enter", i, t],
        ["enter", l, t],
        ["exit", l, t],
        ["exit", i, t],
      ])),
    e
  );
}
function Y0(e, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return (e.enter("atxHeading"), l(f));
  }
  function l(f) {
    return (e.enter("atxHeadingSequence"), o(f));
  }
  function o(f) {
    return f === 35 && r++ < 6
      ? (e.consume(f), o)
      : f === null || ae(f)
        ? (e.exit("atxHeadingSequence"), u(f))
        : n(f);
  }
  function u(f) {
    return f === 35
      ? (e.enter("atxHeadingSequence"), s(f))
      : f === null || H(f)
        ? (e.exit("atxHeading"), t(f))
        : J(f)
          ? ne(e, u, "whitespace")(f)
          : (e.enter("atxHeadingText"), a(f));
  }
  function s(f) {
    return f === 35 ? (e.consume(f), s) : (e.exit("atxHeadingSequence"), u(f));
  }
  function a(f) {
    return f === null || f === 35 || ae(f)
      ? (e.exit("atxHeadingText"), u(f))
      : (e.consume(f), a);
  }
}
const X0 = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  of = ["pre", "script", "style", "textarea"],
  G0 = { concrete: !0, name: "htmlFlow", resolveTo: e1, tokenize: t1 },
  Z0 = { partial: !0, tokenize: r1 },
  J0 = { partial: !0, tokenize: n1 };
function e1(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); );
  return (
    t > 1 &&
      e[t - 2][1].type === "linePrefix" &&
      ((e[t][1].start = e[t - 2][1].start),
      (e[t + 1][1].start = e[t - 2][1].start),
      e.splice(t - 2, 2)),
    e
  );
}
function t1(e, t, n) {
  const r = this;
  let i, l, o, u, s;
  return a;
  function a(w) {
    return f(w);
  }
  function f(w) {
    return (e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(w), c);
  }
  function c(w) {
    return w === 33
      ? (e.consume(w), d)
      : w === 47
        ? (e.consume(w), (l = !0), k)
        : w === 63
          ? (e.consume(w), (i = 3), r.interrupt ? t : x)
          : Be(w)
            ? (e.consume(w), (o = String.fromCharCode(w)), P)
            : n(w);
  }
  function d(w) {
    return w === 45
      ? (e.consume(w), (i = 2), p)
      : w === 91
        ? (e.consume(w), (i = 5), (u = 0), m)
        : Be(w)
          ? (e.consume(w), (i = 4), r.interrupt ? t : x)
          : n(w);
  }
  function p(w) {
    return w === 45 ? (e.consume(w), r.interrupt ? t : x) : n(w);
  }
  function m(w) {
    const K = "CDATA[";
    return w === K.charCodeAt(u++)
      ? (e.consume(w), u === K.length ? (r.interrupt ? t : F) : m)
      : n(w);
  }
  function k(w) {
    return Be(w) ? (e.consume(w), (o = String.fromCharCode(w)), P) : n(w);
  }
  function P(w) {
    if (w === null || w === 47 || w === 62 || ae(w)) {
      const K = w === 47,
        he = o.toLowerCase();
      return !K && !l && of.includes(he)
        ? ((i = 1), r.interrupt ? t(w) : F(w))
        : X0.includes(o.toLowerCase())
          ? ((i = 6), K ? (e.consume(w), h) : r.interrupt ? t(w) : F(w))
          : ((i = 7),
            r.interrupt && !r.parser.lazy[r.now().line]
              ? n(w)
              : l
                ? g(w)
                : y(w));
    }
    return w === 45 || je(w)
      ? (e.consume(w), (o += String.fromCharCode(w)), P)
      : n(w);
  }
  function h(w) {
    return w === 62 ? (e.consume(w), r.interrupt ? t : F) : n(w);
  }
  function g(w) {
    return J(w) ? (e.consume(w), g) : C(w);
  }
  function y(w) {
    return w === 47
      ? (e.consume(w), C)
      : w === 58 || w === 95 || Be(w)
        ? (e.consume(w), E)
        : J(w)
          ? (e.consume(w), y)
          : C(w);
  }
  function E(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || je(w)
      ? (e.consume(w), E)
      : b(w);
  }
  function b(w) {
    return w === 61 ? (e.consume(w), S) : J(w) ? (e.consume(w), b) : y(w);
  }
  function S(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96
      ? n(w)
      : w === 34 || w === 39
        ? (e.consume(w), (s = w), T)
        : J(w)
          ? (e.consume(w), S)
          : _(w);
  }
  function T(w) {
    return w === s
      ? (e.consume(w), (s = null), D)
      : w === null || H(w)
        ? n(w)
        : (e.consume(w), T);
  }
  function _(w) {
    return w === null ||
      w === 34 ||
      w === 39 ||
      w === 47 ||
      w === 60 ||
      w === 61 ||
      w === 62 ||
      w === 96 ||
      ae(w)
      ? b(w)
      : (e.consume(w), _);
  }
  function D(w) {
    return w === 47 || w === 62 || J(w) ? y(w) : n(w);
  }
  function C(w) {
    return w === 62 ? (e.consume(w), j) : n(w);
  }
  function j(w) {
    return w === null || H(w) ? F(w) : J(w) ? (e.consume(w), j) : n(w);
  }
  function F(w) {
    return w === 45 && i === 2
      ? (e.consume(w), ie)
      : w === 60 && i === 1
        ? (e.consume(w), le)
        : w === 62 && i === 4
          ? (e.consume(w), Y)
          : w === 63 && i === 3
            ? (e.consume(w), x)
            : w === 93 && i === 5
              ? (e.consume(w), $)
              : H(w) && (i === 6 || i === 7)
                ? (e.exit("htmlFlowData"), e.check(Z0, q, U)(w))
                : w === null || H(w)
                  ? (e.exit("htmlFlowData"), U(w))
                  : (e.consume(w), F);
  }
  function U(w) {
    return e.check(J0, Z, q)(w);
  }
  function Z(w) {
    return (e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), V);
  }
  function V(w) {
    return w === null || H(w) ? U(w) : (e.enter("htmlFlowData"), F(w));
  }
  function ie(w) {
    return w === 45 ? (e.consume(w), x) : F(w);
  }
  function le(w) {
    return w === 47 ? (e.consume(w), (o = ""), R) : F(w);
  }
  function R(w) {
    if (w === 62) {
      const K = o.toLowerCase();
      return of.includes(K) ? (e.consume(w), Y) : F(w);
    }
    return Be(w) && o.length < 8
      ? (e.consume(w), (o += String.fromCharCode(w)), R)
      : F(w);
  }
  function $(w) {
    return w === 93 ? (e.consume(w), x) : F(w);
  }
  function x(w) {
    return w === 62
      ? (e.consume(w), Y)
      : w === 45 && i === 2
        ? (e.consume(w), x)
        : F(w);
  }
  function Y(w) {
    return w === null || H(w)
      ? (e.exit("htmlFlowData"), q(w))
      : (e.consume(w), Y);
  }
  function q(w) {
    return (e.exit("htmlFlow"), t(w));
  }
}
function n1(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return H(o)
      ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l)
      : n(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function r1(e, t, n) {
  return r;
  function r(i) {
    return (
      e.enter("lineEnding"),
      e.consume(i),
      e.exit("lineEnding"),
      e.attempt(Ci, t, n)
    );
  }
}
const i1 = { name: "htmlText", tokenize: l1 };
function l1(e, t, n) {
  const r = this;
  let i, l, o;
  return u;
  function u(x) {
    return (e.enter("htmlText"), e.enter("htmlTextData"), e.consume(x), s);
  }
  function s(x) {
    return x === 33
      ? (e.consume(x), a)
      : x === 47
        ? (e.consume(x), b)
        : x === 63
          ? (e.consume(x), y)
          : Be(x)
            ? (e.consume(x), _)
            : n(x);
  }
  function a(x) {
    return x === 45
      ? (e.consume(x), f)
      : x === 91
        ? (e.consume(x), (l = 0), m)
        : Be(x)
          ? (e.consume(x), g)
          : n(x);
  }
  function f(x) {
    return x === 45 ? (e.consume(x), p) : n(x);
  }
  function c(x) {
    return x === null
      ? n(x)
      : x === 45
        ? (e.consume(x), d)
        : H(x)
          ? ((o = c), le(x))
          : (e.consume(x), c);
  }
  function d(x) {
    return x === 45 ? (e.consume(x), p) : c(x);
  }
  function p(x) {
    return x === 62 ? ie(x) : x === 45 ? d(x) : c(x);
  }
  function m(x) {
    const Y = "CDATA[";
    return x === Y.charCodeAt(l++)
      ? (e.consume(x), l === Y.length ? k : m)
      : n(x);
  }
  function k(x) {
    return x === null
      ? n(x)
      : x === 93
        ? (e.consume(x), P)
        : H(x)
          ? ((o = k), le(x))
          : (e.consume(x), k);
  }
  function P(x) {
    return x === 93 ? (e.consume(x), h) : k(x);
  }
  function h(x) {
    return x === 62 ? ie(x) : x === 93 ? (e.consume(x), h) : k(x);
  }
  function g(x) {
    return x === null || x === 62
      ? ie(x)
      : H(x)
        ? ((o = g), le(x))
        : (e.consume(x), g);
  }
  function y(x) {
    return x === null
      ? n(x)
      : x === 63
        ? (e.consume(x), E)
        : H(x)
          ? ((o = y), le(x))
          : (e.consume(x), y);
  }
  function E(x) {
    return x === 62 ? ie(x) : y(x);
  }
  function b(x) {
    return Be(x) ? (e.consume(x), S) : n(x);
  }
  function S(x) {
    return x === 45 || je(x) ? (e.consume(x), S) : T(x);
  }
  function T(x) {
    return H(x) ? ((o = T), le(x)) : J(x) ? (e.consume(x), T) : ie(x);
  }
  function _(x) {
    return x === 45 || je(x)
      ? (e.consume(x), _)
      : x === 47 || x === 62 || ae(x)
        ? D(x)
        : n(x);
  }
  function D(x) {
    return x === 47
      ? (e.consume(x), ie)
      : x === 58 || x === 95 || Be(x)
        ? (e.consume(x), C)
        : H(x)
          ? ((o = D), le(x))
          : J(x)
            ? (e.consume(x), D)
            : ie(x);
  }
  function C(x) {
    return x === 45 || x === 46 || x === 58 || x === 95 || je(x)
      ? (e.consume(x), C)
      : j(x);
  }
  function j(x) {
    return x === 61
      ? (e.consume(x), F)
      : H(x)
        ? ((o = j), le(x))
        : J(x)
          ? (e.consume(x), j)
          : D(x);
  }
  function F(x) {
    return x === null || x === 60 || x === 61 || x === 62 || x === 96
      ? n(x)
      : x === 34 || x === 39
        ? (e.consume(x), (i = x), U)
        : H(x)
          ? ((o = F), le(x))
          : J(x)
            ? (e.consume(x), F)
            : (e.consume(x), Z);
  }
  function U(x) {
    return x === i
      ? (e.consume(x), (i = void 0), V)
      : x === null
        ? n(x)
        : H(x)
          ? ((o = U), le(x))
          : (e.consume(x), U);
  }
  function Z(x) {
    return x === null ||
      x === 34 ||
      x === 39 ||
      x === 60 ||
      x === 61 ||
      x === 96
      ? n(x)
      : x === 47 || x === 62 || ae(x)
        ? D(x)
        : (e.consume(x), Z);
  }
  function V(x) {
    return x === 47 || x === 62 || ae(x) ? D(x) : n(x);
  }
  function ie(x) {
    return x === 62
      ? (e.consume(x), e.exit("htmlTextData"), e.exit("htmlText"), t)
      : n(x);
  }
  function le(x) {
    return (
      e.exit("htmlTextData"),
      e.enter("lineEnding"),
      e.consume(x),
      e.exit("lineEnding"),
      R
    );
  }
  function R(x) {
    return J(x)
      ? ne(
          e,
          $,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4,
        )(x)
      : $(x);
  }
  function $(x) {
    return (e.enter("htmlTextData"), o(x));
  }
}
const ga = { name: "labelEnd", resolveAll: a1, resolveTo: c1, tokenize: f1 },
  o1 = { tokenize: p1 },
  u1 = { tokenize: d1 },
  s1 = { tokenize: h1 };
function a1(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (
      (n.push(e[t]),
      r.type === "labelImage" ||
        r.type === "labelLink" ||
        r.type === "labelEnd")
    ) {
      const i = r.type === "labelImage" ? 4 : 2;
      ((r.type = "data"), (t += i));
    }
  }
  return (e.length !== n.length && nt(e, 0, e.length, n), e);
}
function c1(e, t) {
  let n = e.length,
    r = 0,
    i,
    l,
    o,
    u;
  for (; n--; )
    if (((i = e[n][1]), l)) {
      if (i.type === "link" || (i.type === "labelLink" && i._inactive)) break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (
        e[n][0] === "enter" &&
        (i.type === "labelImage" || i.type === "labelLink") &&
        !i._balanced &&
        ((l = n), i.type !== "labelLink")
      ) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = n);
  const s = {
      type: e[l][1].type === "labelLink" ? "link" : "image",
      start: { ...e[l][1].start },
      end: { ...e[e.length - 1][1].end },
    },
    a = { type: "label", start: { ...e[l][1].start }, end: { ...e[o][1].end } },
    f = {
      type: "labelText",
      start: { ...e[l + r + 2][1].end },
      end: { ...e[o - 2][1].start },
    };
  return (
    (u = [
      ["enter", s, t],
      ["enter", a, t],
    ]),
    (u = dt(u, e.slice(l + 1, l + r + 3))),
    (u = dt(u, [["enter", f, t]])),
    (u = dt(
      u,
      oo(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), t),
    )),
    (u = dt(u, [["exit", f, t], e[o - 2], e[o - 1], ["exit", a, t]])),
    (u = dt(u, e.slice(o + 1))),
    (u = dt(u, [["exit", s, t]])),
    nt(e, l, e.length, u),
    e
  );
}
function f1(e, t, n) {
  const r = this;
  let i = r.events.length,
    l,
    o;
  for (; i--; )
    if (
      (r.events[i][1].type === "labelImage" ||
        r.events[i][1].type === "labelLink") &&
      !r.events[i][1]._balanced
    ) {
      l = r.events[i][1];
      break;
    }
  return u;
  function u(d) {
    return l
      ? l._inactive
        ? c(d)
        : ((o = r.parser.defined.includes(
            Lt(r.sliceSerialize({ start: l.end, end: r.now() })),
          )),
          e.enter("labelEnd"),
          e.enter("labelMarker"),
          e.consume(d),
          e.exit("labelMarker"),
          e.exit("labelEnd"),
          s)
      : n(d);
  }
  function s(d) {
    return d === 40
      ? e.attempt(o1, f, o ? f : c)(d)
      : d === 91
        ? e.attempt(u1, f, o ? a : c)(d)
        : o
          ? f(d)
          : c(d);
  }
  function a(d) {
    return e.attempt(s1, f, c)(d);
  }
  function f(d) {
    return t(d);
  }
  function c(d) {
    return ((l._balanced = !0), n(d));
  }
}
function p1(e, t, n) {
  return r;
  function r(c) {
    return (
      e.enter("resource"),
      e.enter("resourceMarker"),
      e.consume(c),
      e.exit("resourceMarker"),
      i
    );
  }
  function i(c) {
    return ae(c) ? Xr(e, l)(c) : l(c);
  }
  function l(c) {
    return c === 41
      ? f(c)
      : yh(
          e,
          o,
          u,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32,
        )(c);
  }
  function o(c) {
    return ae(c) ? Xr(e, s)(c) : f(c);
  }
  function u(c) {
    return n(c);
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40
      ? kh(
          e,
          a,
          n,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString",
        )(c)
      : f(c);
  }
  function a(c) {
    return ae(c) ? Xr(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41
      ? (e.enter("resourceMarker"),
        e.consume(c),
        e.exit("resourceMarker"),
        e.exit("resource"),
        t)
      : n(c);
  }
}
function d1(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return xh.call(
      r,
      e,
      l,
      o,
      "reference",
      "referenceMarker",
      "referenceString",
    )(u);
  }
  function l(u) {
    return r.parser.defined.includes(
      Lt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)),
    )
      ? t(u)
      : n(u);
  }
  function o(u) {
    return n(u);
  }
}
function h1(e, t, n) {
  return r;
  function r(l) {
    return (
      e.enter("reference"),
      e.enter("referenceMarker"),
      e.consume(l),
      e.exit("referenceMarker"),
      i
    );
  }
  function i(l) {
    return l === 93
      ? (e.enter("referenceMarker"),
        e.consume(l),
        e.exit("referenceMarker"),
        e.exit("reference"),
        t)
      : n(l);
  }
}
const m1 = { name: "labelStartImage", resolveAll: ga.resolveAll, tokenize: g1 };
function g1(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return (
      e.enter("labelImage"),
      e.enter("labelImageMarker"),
      e.consume(u),
      e.exit("labelImageMarker"),
      l
    );
  }
  function l(u) {
    return u === 91
      ? (e.enter("labelMarker"),
        e.consume(u),
        e.exit("labelMarker"),
        e.exit("labelImage"),
        o)
      : n(u);
  }
  function o(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? n(u)
      : t(u);
  }
}
const y1 = { name: "labelStartLink", resolveAll: ga.resolveAll, tokenize: x1 };
function x1(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return (
      e.enter("labelLink"),
      e.enter("labelMarker"),
      e.consume(o),
      e.exit("labelMarker"),
      e.exit("labelLink"),
      l
    );
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? n(o)
      : t(o);
  }
}
const Ho = { name: "lineEnding", tokenize: k1 };
function k1(e, t) {
  return n;
  function n(r) {
    return (
      e.enter("lineEnding"),
      e.consume(r),
      e.exit("lineEnding"),
      ne(e, t, "linePrefix")
    );
  }
}
const fl = { name: "thematicBreak", tokenize: v1 };
function v1(e, t, n) {
  let r = 0,
    i;
  return l;
  function l(a) {
    return (e.enter("thematicBreak"), o(a));
  }
  function o(a) {
    return ((i = a), u(a));
  }
  function u(a) {
    return a === i
      ? (e.enter("thematicBreakSequence"), s(a))
      : r >= 3 && (a === null || H(a))
        ? (e.exit("thematicBreak"), t(a))
        : n(a);
  }
  function s(a) {
    return a === i
      ? (e.consume(a), r++, s)
      : (e.exit("thematicBreakSequence"),
        J(a) ? ne(e, u, "whitespace")(a) : u(a));
  }
}
const Ve = {
    continuation: { tokenize: E1 },
    exit: N1,
    name: "list",
    tokenize: C1,
  },
  w1 = { partial: !0, tokenize: P1 },
  S1 = { partial: !0, tokenize: b1 };
function C1(e, t, n) {
  const r = this,
    i = r.events[r.events.length - 1];
  let l =
      i && i[1].type === "linePrefix"
        ? i[2].sliceSerialize(i[1], !0).length
        : 0,
    o = 0;
  return u;
  function u(p) {
    const m =
      r.containerState.type ||
      (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (
      m === "listUnordered"
        ? !r.containerState.marker || p === r.containerState.marker
        : rs(p)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = m), e.enter(m, { _container: !0 })),
        m === "listUnordered")
      )
        return (
          e.enter("listItemPrefix"),
          p === 42 || p === 45 ? e.check(fl, n, a)(p) : a(p)
        );
      if (!r.interrupt || p === 49)
        return (e.enter("listItemPrefix"), e.enter("listItemValue"), s(p));
    }
    return n(p);
  }
  function s(p) {
    return rs(p) && ++o < 10
      ? (e.consume(p), s)
      : (!r.interrupt || o < 2) &&
          (r.containerState.marker
            ? p === r.containerState.marker
            : p === 41 || p === 46)
        ? (e.exit("listItemValue"), a(p))
        : n(p);
  }
  function a(p) {
    return (
      e.enter("listItemMarker"),
      e.consume(p),
      e.exit("listItemMarker"),
      (r.containerState.marker = r.containerState.marker || p),
      e.check(Ci, r.interrupt ? n : f, e.attempt(w1, d, c))
    );
  }
  function f(p) {
    return ((r.containerState.initialBlankLine = !0), l++, d(p));
  }
  function c(p) {
    return J(p)
      ? (e.enter("listItemPrefixWhitespace"),
        e.consume(p),
        e.exit("listItemPrefixWhitespace"),
        d)
      : n(p);
  }
  function d(p) {
    return (
      (r.containerState.size =
        l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length),
      t(p)
    );
  }
}
function E1(e, t, n) {
  const r = this;
  return ((r.containerState._closeFlow = void 0), e.check(Ci, i, l));
  function i(u) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      ne(e, t, "listItemIndent", r.containerState.size + 1)(u)
    );
  }
  function l(u) {
    return r.containerState.furtherBlankLines || !J(u)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        o(u))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(S1, t, o)(u));
  }
  function o(u) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      ne(
        e,
        e.attempt(Ve, t, n),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
      )(u)
    );
  }
}
function b1(e, t, n) {
  const r = this;
  return ne(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o &&
      o[1].type === "listItemIndent" &&
      o[2].sliceSerialize(o[1], !0).length === r.containerState.size
      ? t(l)
      : n(l);
  }
}
function N1(e) {
  e.exit(this.containerState.type);
}
function P1(e, t, n) {
  const r = this;
  return ne(
    e,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5,
  );
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !J(l) && o && o[1].type === "listItemPrefixWhitespace" ? t(l) : n(l);
  }
}
const uf = { name: "setextUnderline", resolveTo: L1, tokenize: T1 };
function L1(e, t) {
  let n = e.length,
    r,
    i,
    l;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      (e[n][1].type === "content" && e.splice(n, 1),
        !l && e[n][1].type === "definition" && (l = n));
  const o = {
    type: "setextHeading",
    start: { ...e[r][1].start },
    end: { ...e[e.length - 1][1].end },
  };
  return (
    (e[i][1].type = "setextHeadingText"),
    l
      ? (e.splice(i, 0, ["enter", o, t]),
        e.splice(l + 1, 0, ["exit", e[r][1], t]),
        (e[r][1].end = { ...e[l][1].end }))
      : (e[r][1] = o),
    e.push(["exit", o, t]),
    e
  );
}
function T1(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(a) {
    let f = r.events.length,
      c;
    for (; f--; )
      if (
        r.events[f][1].type !== "lineEnding" &&
        r.events[f][1].type !== "linePrefix" &&
        r.events[f][1].type !== "content"
      ) {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c)
      ? (e.enter("setextHeadingLine"), (i = a), o(a))
      : n(a);
  }
  function o(a) {
    return (e.enter("setextHeadingLineSequence"), u(a));
  }
  function u(a) {
    return a === i
      ? (e.consume(a), u)
      : (e.exit("setextHeadingLineSequence"),
        J(a) ? ne(e, s, "lineSuffix")(a) : s(a));
  }
  function s(a) {
    return a === null || H(a) ? (e.exit("setextHeadingLine"), t(a)) : n(a);
  }
}
const _1 = { tokenize: z1 };
function z1(e) {
  const t = this,
    n = e.attempt(
      Ci,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        ne(
          e,
          e.attempt(this.parser.constructs.flow, i, e.attempt(R0, i)),
          "linePrefix",
        ),
      ),
    );
  return n;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return (
      e.enter("lineEndingBlank"),
      e.consume(l),
      e.exit("lineEndingBlank"),
      (t.currentConstruct = void 0),
      n
    );
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(l),
      e.exit("lineEnding"),
      (t.currentConstruct = void 0),
      n
    );
  }
}
const I1 = { resolveAll: wh() },
  j1 = vh("string"),
  D1 = vh("text");
function vh(e) {
  return { resolveAll: wh(e === "text" ? A1 : void 0), tokenize: t };
  function t(n) {
    const r = this,
      i = this.parser.constructs[e],
      l = n.attempt(i, o, u);
    return o;
    function o(f) {
      return a(f) ? l(f) : u(f);
    }
    function u(f) {
      if (f === null) {
        n.consume(f);
        return;
      }
      return (n.enter("data"), n.consume(f), s);
    }
    function s(f) {
      return a(f) ? (n.exit("data"), l(f)) : (n.consume(f), s);
    }
    function a(f) {
      if (f === null) return !0;
      const c = i[f];
      let d = -1;
      if (c)
        for (; ++d < c.length; ) {
          const p = c[d];
          if (!p.previous || p.previous.call(r, r.previous)) return !0;
        }
      return !1;
    }
  }
}
function wh(e) {
  return t;
  function t(n, r) {
    let i = -1,
      l;
    for (; ++i <= n.length; )
      l === void 0
        ? n[i] && n[i][1].type === "data" && ((l = i), i++)
        : (!n[i] || n[i][1].type !== "data") &&
          (i !== l + 2 &&
            ((n[l][1].end = n[i - 1][1].end),
            n.splice(l + 2, i - l - 2),
            (i = l + 2)),
          (l = void 0));
    return e ? e(n, r) : n;
  }
}
function A1(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if (
      (n === e.length || e[n][1].type === "lineEnding") &&
      e[n - 1][1].type === "data"
    ) {
      const r = e[n - 1][1],
        i = t.sliceStream(r);
      let l = i.length,
        o = -1,
        u = 0,
        s;
      for (; l--; ) {
        const a = i[l];
        if (typeof a == "string") {
          for (o = a.length; a.charCodeAt(o - 1) === 32; ) (u++, o--);
          if (o) break;
          o = -1;
        } else if (a === -2) ((s = !0), u++);
        else if (a !== -1) {
          l++;
          break;
        }
      }
      if ((t._contentTypeTextTrailing && n === e.length && (u = 0), u)) {
        const a = {
          type:
            n === e.length || s || u < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: l ? o : r.start._bufferIndex + o,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - u,
            offset: r.end.offset - u,
          },
          end: { ...r.end },
        };
        ((r.end = { ...a.start }),
          r.start.offset === r.end.offset
            ? Object.assign(r, a)
            : (e.splice(n, 0, ["enter", a, t], ["exit", a, t]), (n += 2)));
      }
      n++;
    }
  return e;
}
const R1 = {
    42: Ve,
    43: Ve,
    45: Ve,
    48: Ve,
    49: Ve,
    50: Ve,
    51: Ve,
    52: Ve,
    53: Ve,
    54: Ve,
    55: Ve,
    56: Ve,
    57: Ve,
    62: dh,
  },
  F1 = { 91: $0 },
  O1 = { [-2]: Uo, [-1]: Uo, 32: Uo },
  M1 = {
    35: q0,
    42: fl,
    45: [uf, fl],
    60: G0,
    61: uf,
    95: fl,
    96: lf,
    126: lf,
  },
  B1 = { 38: mh, 92: hh },
  $1 = {
    [-5]: Ho,
    [-4]: Ho,
    [-3]: Ho,
    33: m1,
    38: mh,
    42: is,
    60: [y0, i1],
    91: y1,
    92: [W0, hh],
    93: ga,
    95: is,
    96: _0,
  },
  U1 = { null: [is, I1] },
  H1 = { null: [42, 95] },
  V1 = { null: [] },
  W1 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: H1,
        contentInitial: F1,
        disable: V1,
        document: R1,
        flow: M1,
        flowInitial: O1,
        insideSpan: U1,
        string: B1,
        text: $1,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  );
function Q1(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: (n && n.line) || 1,
    column: (n && n.column) || 1,
    offset: (n && n.offset) || 0,
  };
  const i = {},
    l = [];
  let o = [],
    u = [];
  const s = {
      attempt: T(b),
      check: T(S),
      consume: g,
      enter: y,
      exit: E,
      interrupt: T(S, { interrupt: !0 }),
    },
    a = {
      code: null,
      containerState: {},
      defineSkip: k,
      events: [],
      now: m,
      parser: e,
      previous: null,
      sliceSerialize: d,
      sliceStream: p,
      write: c,
    };
  let f = t.tokenize.call(a, s);
  return (t.resolveAll && l.push(t), a);
  function c(j) {
    return (
      (o = dt(o, j)),
      P(),
      o[o.length - 1] !== null
        ? []
        : (_(t, 0), (a.events = oo(l, a.events, a)), a.events)
    );
  }
  function d(j, F) {
    return K1(p(j), F);
  }
  function p(j) {
    return q1(o, j);
  }
  function m() {
    const { _bufferIndex: j, _index: F, line: U, column: Z, offset: V } = r;
    return { _bufferIndex: j, _index: F, line: U, column: Z, offset: V };
  }
  function k(j) {
    ((i[j.line] = j.column), C());
  }
  function P() {
    let j;
    for (; r._index < o.length; ) {
      const F = o[r._index];
      if (typeof F == "string")
        for (
          j = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === j && r._bufferIndex < F.length;

        )
          h(F.charCodeAt(r._bufferIndex));
      else h(F);
    }
  }
  function h(j) {
    f = f(j);
  }
  function g(j) {
    (H(j)
      ? (r.line++, (r.column = 1), (r.offset += j === -3 ? 2 : 1), C())
      : j !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === o[r._index].length &&
            ((r._bufferIndex = -1), r._index++)),
      (a.previous = j));
  }
  function y(j, F) {
    const U = F || {};
    return (
      (U.type = j),
      (U.start = m()),
      a.events.push(["enter", U, a]),
      u.push(U),
      U
    );
  }
  function E(j) {
    const F = u.pop();
    return ((F.end = m()), a.events.push(["exit", F, a]), F);
  }
  function b(j, F) {
    _(j, F.from);
  }
  function S(j, F) {
    F.restore();
  }
  function T(j, F) {
    return U;
    function U(Z, V, ie) {
      let le, R, $, x;
      return Array.isArray(Z) ? q(Z) : "tokenize" in Z ? q([Z]) : Y(Z);
      function Y(se) {
        return ot;
        function ot(xt) {
          const Zt = xt !== null && se[xt],
            _t = xt !== null && se.null,
            Cn = [
              ...(Array.isArray(Zt) ? Zt : Zt ? [Zt] : []),
              ...(Array.isArray(_t) ? _t : _t ? [_t] : []),
            ];
          return q(Cn)(xt);
        }
      }
      function q(se) {
        return ((le = se), (R = 0), se.length === 0 ? ie : w(se[R]));
      }
      function w(se) {
        return ot;
        function ot(xt) {
          return (
            (x = D()),
            ($ = se),
            se.partial || (a.currentConstruct = se),
            se.name && a.parser.constructs.disable.null.includes(se.name)
              ? he()
              : se.tokenize.call(
                  F ? Object.assign(Object.create(a), F) : a,
                  s,
                  K,
                  he,
                )(xt)
          );
        }
      }
      function K(se) {
        return (j($, x), V);
      }
      function he(se) {
        return (x.restore(), ++R < le.length ? w(le[R]) : ie);
      }
    }
  }
  function _(j, F) {
    (j.resolveAll && !l.includes(j) && l.push(j),
      j.resolve &&
        nt(a.events, F, a.events.length - F, j.resolve(a.events.slice(F), a)),
      j.resolveTo && (a.events = j.resolveTo(a.events, a)));
  }
  function D() {
    const j = m(),
      F = a.previous,
      U = a.currentConstruct,
      Z = a.events.length,
      V = Array.from(u);
    return { from: Z, restore: ie };
    function ie() {
      ((r = j),
        (a.previous = F),
        (a.currentConstruct = U),
        (a.events.length = Z),
        (u = V),
        C());
    }
  }
  function C() {
    r.line in i &&
      r.column < 2 &&
      ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function q1(e, t) {
  const n = t.start._index,
    r = t.start._bufferIndex,
    i = t.end._index,
    l = t.end._bufferIndex;
  let o;
  if (n === i) o = [e[n].slice(r, l)];
  else {
    if (((o = e.slice(n, i)), r > -1)) {
      const u = o[0];
      typeof u == "string" ? (o[0] = u.slice(r)) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function K1(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const l = e[n];
    let o;
    if (typeof l == "string") o = l;
    else
      switch (l) {
        case -5: {
          o = "\r";
          break;
        }
        case -4: {
          o = `
`;
          break;
        }
        case -3: {
          o = `\r
`;
          break;
        }
        case -2: {
          o = t ? " " : "	";
          break;
        }
        case -1: {
          if (!t && i) continue;
          o = " ";
          break;
        }
        default:
          o = String.fromCharCode(l);
      }
    ((i = l === -2), r.push(o));
  }
  return r.join("");
}
function Y1(e) {
  const r = {
    constructs: fh([W1, ...((e || {}).extensions || [])]),
    content: i(c0),
    defined: [],
    document: i(p0),
    flow: i(_1),
    lazy: {},
    string: i(j1),
    text: i(D1),
  };
  return r;
  function i(l) {
    return o;
    function o(u) {
      return Q1(r, l, u);
    }
  }
}
function X1(e) {
  for (; !gh(e); );
  return e;
}
const sf = /[\0\t\n\r]/g;
function G1() {
  let e = 1,
    t = "",
    n = !0,
    r;
  return i;
  function i(l, o, u) {
    const s = [];
    let a, f, c, d, p;
    for (
      l =
        t +
        (typeof l == "string"
          ? l.toString()
          : new TextDecoder(o || void 0).decode(l)),
        c = 0,
        t = "",
        n && (l.charCodeAt(0) === 65279 && c++, (n = void 0));
      c < l.length;

    ) {
      if (
        ((sf.lastIndex = c),
        (a = sf.exec(l)),
        (d = a && a.index !== void 0 ? a.index : l.length),
        (p = l.charCodeAt(d)),
        !a)
      ) {
        t = l.slice(c);
        break;
      }
      if (p === 10 && c === d && r) (s.push(-3), (r = void 0));
      else
        switch (
          (r && (s.push(-5), (r = void 0)),
          c < d && (s.push(l.slice(c, d)), (e += d - c)),
          p)
        ) {
          case 0: {
            (s.push(65533), e++);
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, s.push(-2); e++ < f; ) s.push(-1);
            break;
          }
          case 10: {
            (s.push(-4), (e = 1));
            break;
          }
          default:
            ((r = !0), (e = 1));
        }
      c = d + 1;
    }
    return (u && (r && s.push(-5), t && s.push(t), s.push(null)), s);
  }
}
const Z1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function J1(e) {
  return e.replace(Z1, ek);
}
function ek(e, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1),
      l = i === 120 || i === 88;
    return ph(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return ma(n) || e;
}
const Sh = {}.hasOwnProperty;
function tk(e, t, n) {
  return (
    t && typeof t == "object" && ((n = t), (t = void 0)),
    nk(n)(
      X1(
        Y1(n)
          .document()
          .write(G1()(e, t, !0)),
      ),
    )
  );
}
function nk(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Li),
      autolinkProtocol: D,
      autolinkEmail: D,
      atxHeading: l(st),
      blockQuote: l(_t),
      characterEscape: D,
      characterReference: D,
      codeFenced: l(Cn),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(Cn, o),
      codeText: l(bi, o),
      codeTextData: D,
      data: D,
      codeFlowValue: D,
      definition: l(ut),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(Re),
      hardBreakEscape: l(Ni),
      hardBreakTrailing: l(Ni),
      htmlFlow: l(br, o),
      htmlFlowData: D,
      htmlText: l(br, o),
      htmlTextData: D,
      image: l(Pi),
      label: o,
      link: l(Li),
      listItem: l(co),
      listItemValue: d,
      listOrdered: l(Ti, c),
      listUnordered: l(Ti),
      paragraph: l(zt),
      reference: w,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(st),
      strong: l(fo),
      thematicBreak: l(zi),
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: b,
      autolink: s(),
      autolinkEmail: Zt,
      autolinkProtocol: xt,
      blockQuote: s(),
      characterEscapeValue: C,
      characterReferenceMarkerHexadecimal: he,
      characterReferenceMarkerNumeric: he,
      characterReferenceValue: se,
      characterReference: ot,
      codeFenced: s(P),
      codeFencedFence: k,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: m,
      codeFlowValue: C,
      codeIndented: s(h),
      codeText: s(V),
      codeTextData: C,
      data: C,
      definition: s(),
      definitionDestinationString: E,
      definitionLabelString: g,
      definitionTitleString: y,
      emphasis: s(),
      hardBreakEscape: s(F),
      hardBreakTrailing: s(F),
      htmlFlow: s(U),
      htmlFlowData: C,
      htmlText: s(Z),
      htmlTextData: C,
      image: s(le),
      label: $,
      labelText: R,
      lineEnding: j,
      link: s(ie),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: K,
      resourceDestinationString: x,
      resourceTitleString: Y,
      resource: q,
      setextHeading: s(_),
      setextHeadingLineSequence: T,
      setextHeadingText: S,
      strong: s(),
      thematicBreak: s(),
    },
  };
  Ch(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(L) {
    let A = { type: "root", children: [] };
    const W = {
        stack: [A],
        tokenStack: [],
        config: t,
        enter: u,
        exit: a,
        buffer: o,
        resume: f,
        data: n,
      },
      G = [];
    let te = -1;
    for (; ++te < L.length; )
      if (L[te][1].type === "listOrdered" || L[te][1].type === "listUnordered")
        if (L[te][0] === "enter") G.push(te);
        else {
          const Fe = G.pop();
          te = i(L, Fe, te);
        }
    for (te = -1; ++te < L.length; ) {
      const Fe = t[L[te][0]];
      Sh.call(Fe, L[te][1].type) &&
        Fe[L[te][1].type].call(
          Object.assign({ sliceSerialize: L[te][2].sliceSerialize }, W),
          L[te][1],
        );
    }
    if (W.tokenStack.length > 0) {
      const Fe = W.tokenStack[W.tokenStack.length - 1];
      (Fe[1] || af).call(W, void 0, Fe[0]);
    }
    for (
      A.position = {
        start: tn(
          L.length > 0 ? L[0][1].start : { line: 1, column: 1, offset: 0 },
        ),
        end: tn(
          L.length > 0
            ? L[L.length - 2][1].end
            : { line: 1, column: 1, offset: 0 },
        ),
      },
        te = -1;
      ++te < t.transforms.length;

    )
      A = t.transforms[te](A) || A;
    return A;
  }
  function i(L, A, W) {
    let G = A - 1,
      te = -1,
      Fe = !1,
      kt,
      at,
      ct,
      vt;
    for (; ++G <= W; ) {
      const Oe = L[G];
      switch (Oe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          (Oe[0] === "enter" ? te++ : te--, (vt = void 0));
          break;
        }
        case "lineEndingBlank": {
          Oe[0] === "enter" &&
            (kt && !vt && !te && !ct && (ct = G), (vt = void 0));
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          vt = void 0;
      }
      if (
        (!te && Oe[0] === "enter" && Oe[1].type === "listItemPrefix") ||
        (te === -1 &&
          Oe[0] === "exit" &&
          (Oe[1].type === "listUnordered" || Oe[1].type === "listOrdered"))
      ) {
        if (kt) {
          let Bt = G;
          for (at = void 0; Bt--; ) {
            const wt = L[Bt];
            if (
              wt[1].type === "lineEnding" ||
              wt[1].type === "lineEndingBlank"
            ) {
              if (wt[0] === "exit") continue;
              (at && ((L[at][1].type = "lineEndingBlank"), (Fe = !0)),
                (wt[1].type = "lineEnding"),
                (at = Bt));
            } else if (
              !(
                wt[1].type === "linePrefix" ||
                wt[1].type === "blockQuotePrefix" ||
                wt[1].type === "blockQuotePrefixWhitespace" ||
                wt[1].type === "blockQuoteMarker" ||
                wt[1].type === "listItemIndent"
              )
            )
              break;
          }
          (ct && (!at || ct < at) && (kt._spread = !0),
            (kt.end = Object.assign({}, at ? L[at][1].start : Oe[1].end)),
            L.splice(at || G, 0, ["exit", kt, Oe[2]]),
            G++,
            W++);
        }
        if (Oe[1].type === "listItemPrefix") {
          const Bt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Oe[1].start),
            end: void 0,
          };
          ((kt = Bt),
            L.splice(G, 0, ["enter", Bt, Oe[2]]),
            G++,
            W++,
            (ct = void 0),
            (vt = !0));
        }
      }
    }
    return ((L[A][1]._spread = Fe), W);
  }
  function l(L, A) {
    return W;
    function W(G) {
      (u.call(this, L(G), G), A && A.call(this, G));
    }
  }
  function o() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function u(L, A, W) {
    (this.stack[this.stack.length - 1].children.push(L),
      this.stack.push(L),
      this.tokenStack.push([A, W || void 0]),
      (L.position = { start: tn(A.start), end: void 0 }));
  }
  function s(L) {
    return A;
    function A(W) {
      (L && L.call(this, W), a.call(this, W));
    }
  }
  function a(L, A) {
    const W = this.stack.pop(),
      G = this.tokenStack.pop();
    if (G)
      G[0].type !== L.type &&
        (A ? A.call(this, L, G[0]) : (G[1] || af).call(this, L, G[0]));
    else
      throw new Error(
        "Cannot close `" +
          L.type +
          "` (" +
          Yr({ start: L.start, end: L.end }) +
          "): it’s not open",
      );
    W.position.end = tn(L.end);
  }
  function f() {
    return ha(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(L) {
    if (this.data.expectingFirstListItemValue) {
      const A = this.stack[this.stack.length - 2];
      ((A.start = Number.parseInt(this.sliceSerialize(L), 10)),
        (this.data.expectingFirstListItemValue = void 0));
    }
  }
  function p() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.lang = L;
  }
  function m() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.meta = L;
  }
  function k() {
    this.data.flowCodeInside ||
      (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function P() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    ((A.value = L.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")),
      (this.data.flowCodeInside = void 0));
  }
  function h() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.value = L.replace(/(\r?\n|\r)$/g, "");
  }
  function g(L) {
    const A = this.resume(),
      W = this.stack[this.stack.length - 1];
    ((W.label = A), (W.identifier = Lt(this.sliceSerialize(L)).toLowerCase()));
  }
  function y() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.title = L;
  }
  function E() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.url = L;
  }
  function b(L) {
    const A = this.stack[this.stack.length - 1];
    if (!A.depth) {
      const W = this.sliceSerialize(L).length;
      A.depth = W;
    }
  }
  function S() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function T(L) {
    const A = this.stack[this.stack.length - 1];
    A.depth = this.sliceSerialize(L).codePointAt(0) === 61 ? 1 : 2;
  }
  function _() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function D(L) {
    const W = this.stack[this.stack.length - 1].children;
    let G = W[W.length - 1];
    ((!G || G.type !== "text") &&
      ((G = _i()),
      (G.position = { start: tn(L.start), end: void 0 }),
      W.push(G)),
      this.stack.push(G));
  }
  function C(L) {
    const A = this.stack.pop();
    ((A.value += this.sliceSerialize(L)), (A.position.end = tn(L.end)));
  }
  function j(L) {
    const A = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const W = A.children[A.children.length - 1];
      ((W.position.end = tn(L.end)), (this.data.atHardBreak = void 0));
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      t.canContainEols.includes(A.type) &&
      (D.call(this, L), C.call(this, L));
  }
  function F() {
    this.data.atHardBreak = !0;
  }
  function U() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.value = L;
  }
  function Z() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.value = L;
  }
  function V() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.value = L;
  }
  function ie() {
    const L = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      ((L.type += "Reference"),
        (L.referenceType = A),
        delete L.url,
        delete L.title);
    } else (delete L.identifier, delete L.label);
    this.data.referenceType = void 0;
  }
  function le() {
    const L = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      ((L.type += "Reference"),
        (L.referenceType = A),
        delete L.url,
        delete L.title);
    } else (delete L.identifier, delete L.label);
    this.data.referenceType = void 0;
  }
  function R(L) {
    const A = this.sliceSerialize(L),
      W = this.stack[this.stack.length - 2];
    ((W.label = J1(A)), (W.identifier = Lt(A).toLowerCase()));
  }
  function $() {
    const L = this.stack[this.stack.length - 1],
      A = this.resume(),
      W = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), W.type === "link")) {
      const G = L.children;
      W.children = G;
    } else W.alt = A;
  }
  function x() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.url = L;
  }
  function Y() {
    const L = this.resume(),
      A = this.stack[this.stack.length - 1];
    A.title = L;
  }
  function q() {
    this.data.inReference = void 0;
  }
  function w() {
    this.data.referenceType = "collapsed";
  }
  function K(L) {
    const A = this.resume(),
      W = this.stack[this.stack.length - 1];
    ((W.label = A),
      (W.identifier = Lt(this.sliceSerialize(L)).toLowerCase()),
      (this.data.referenceType = "full"));
  }
  function he(L) {
    this.data.characterReferenceType = L.type;
  }
  function se(L) {
    const A = this.sliceSerialize(L),
      W = this.data.characterReferenceType;
    let G;
    W
      ? ((G = ph(A, W === "characterReferenceMarkerNumeric" ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (G = ma(A));
    const te = this.stack[this.stack.length - 1];
    te.value += G;
  }
  function ot(L) {
    const A = this.stack.pop();
    A.position.end = tn(L.end);
  }
  function xt(L) {
    C.call(this, L);
    const A = this.stack[this.stack.length - 1];
    A.url = this.sliceSerialize(L);
  }
  function Zt(L) {
    C.call(this, L);
    const A = this.stack[this.stack.length - 1];
    A.url = "mailto:" + this.sliceSerialize(L);
  }
  function _t() {
    return { type: "blockquote", children: [] };
  }
  function Cn() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function bi() {
    return { type: "inlineCode", value: "" };
  }
  function ut() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    };
  }
  function Re() {
    return { type: "emphasis", children: [] };
  }
  function st() {
    return { type: "heading", depth: 0, children: [] };
  }
  function Ni() {
    return { type: "break" };
  }
  function br() {
    return { type: "html", value: "" };
  }
  function Pi() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Li() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function Ti(L) {
    return {
      type: "list",
      ordered: L.type === "listOrdered",
      start: null,
      spread: L._spread,
      children: [],
    };
  }
  function co(L) {
    return { type: "listItem", spread: L._spread, checked: null, children: [] };
  }
  function zt() {
    return { type: "paragraph", children: [] };
  }
  function fo() {
    return { type: "strong", children: [] };
  }
  function _i() {
    return { type: "text", value: "" };
  }
  function zi() {
    return { type: "thematicBreak" };
  }
}
function tn(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function Ch(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Ch(e, r) : rk(e, r);
  }
}
function rk(e, t) {
  let n;
  for (n in t)
    if (Sh.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function af(e, t) {
  throw e
    ? new Error(
        "Cannot close `" +
          e.type +
          "` (" +
          Yr({ start: e.start, end: e.end }) +
          "): a different token (`" +
          t.type +
          "`, " +
          Yr({ start: t.start, end: t.end }) +
          ") is open",
      )
    : new Error(
        "Cannot close document, a token (`" +
          t.type +
          "`, " +
          Yr({ start: t.start, end: t.end }) +
          ") is still open",
      );
}
function ik(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return tk(r, {
      ...t.data("settings"),
      ...e,
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || [],
    });
  }
}
function lk(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function ok(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return (
    e.patch(t, n),
    [
      e.applyData(t, n),
      {
        type: "text",
        value: `
`,
      },
    ]
  );
}
function uk(e, t) {
  const n = t.value
      ? t.value +
        `
`
      : "",
    r = {},
    i = t.lang ? t.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let l = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }],
  };
  return (
    t.meta && (l.data = { meta: t.meta }),
    e.patch(t, l),
    (l = e.applyData(t, l)),
    (l = { type: "element", tagName: "pre", properties: {}, children: [l] }),
    e.patch(t, l),
    l
  );
}
function sk(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function ak(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function ck(e, t) {
  const n =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    r = String(t.identifier).toUpperCase(),
    i = Er(r.toLowerCase()),
    l = e.footnoteOrder.indexOf(r);
  let o,
    u = e.footnoteCounts.get(r);
  (u === void 0
    ? ((u = 0), e.footnoteOrder.push(r), (o = e.footnoteOrder.length))
    : (o = l + 1),
    (u += 1),
    e.footnoteCounts.set(r, u));
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (u > 1 ? "-" + u : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"],
    },
    children: [{ type: "text", value: String(o) }],
  };
  e.patch(t, s);
  const a = { type: "element", tagName: "sup", properties: {}, children: [s] };
  return (e.patch(t, a), e.applyData(t, a));
}
function fk(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function pk(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return (e.patch(t, n), e.applyData(t, n));
  }
}
function Eh(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (
    (n === "collapsed"
      ? (r += "[]")
      : n === "full" && (r += "[" + (t.label || t.identifier) + "]"),
    t.type === "imageReference")
  )
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t),
    l = i[0];
  l && l.type === "text"
    ? (l.value = "[" + l.value)
    : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return (
    o && o.type === "text"
      ? (o.value += r)
      : i.push({ type: "text", value: r }),
    i
  );
}
function dk(e, t) {
  const n = String(t.identifier).toUpperCase(),
    r = e.definitionById.get(n);
  if (!r) return Eh(e, t);
  const i = { src: Er(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return (e.patch(t, l), e.applyData(t, l));
}
function hk(e, t) {
  const n = { src: Er(t.url) };
  (t.alt !== null && t.alt !== void 0 && (n.alt = t.alt),
    t.title !== null && t.title !== void 0 && (n.title = t.title));
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return (e.patch(t, r), e.applyData(t, r));
}
function mk(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = { type: "element", tagName: "code", properties: {}, children: [n] };
  return (e.patch(t, r), e.applyData(t, r));
}
function gk(e, t) {
  const n = String(t.identifier).toUpperCase(),
    r = e.definitionById.get(n);
  if (!r) return Eh(e, t);
  const i = { href: Er(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t),
  };
  return (e.patch(t, l), e.applyData(t, l));
}
function yk(e, t) {
  const n = { href: Er(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t),
  };
  return (e.patch(t, r), e.applyData(t, r));
}
function xk(e, t, n) {
  const r = e.all(t),
    i = n ? kk(n) : bh(t),
    l = {},
    o = [];
  if (typeof t.checked == "boolean") {
    const f = r[0];
    let c;
    (f && f.type === "element" && f.tagName === "p"
      ? (c = f)
      : ((c = { type: "element", tagName: "p", properties: {}, children: [] }),
        r.unshift(c)),
      c.children.length > 0 && c.children.unshift({ type: "text", value: " " }),
      c.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: t.checked, disabled: !0 },
        children: [],
      }),
      (l.className = ["task-list-item"]));
  }
  let u = -1;
  for (; ++u < r.length; ) {
    const f = r[u];
    ((i || u !== 0 || f.type !== "element" || f.tagName !== "p") &&
      o.push({
        type: "text",
        value: `
`,
      }),
      f.type === "element" && f.tagName === "p" && !i
        ? o.push(...f.children)
        : o.push(f));
  }
  const s = r[r.length - 1];
  s &&
    (i || s.type !== "element" || s.tagName !== "p") &&
    o.push({
      type: "text",
      value: `
`,
    });
  const a = { type: "element", tagName: "li", properties: l, children: o };
  return (e.patch(t, a), e.applyData(t, a));
}
function kk(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; ) t = bh(n[r]);
  }
  return t;
}
function bh(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function vk(e, t) {
  const n = {},
    r = e.all(t);
  let i = -1;
  for (
    typeof t.start == "number" && t.start !== 1 && (n.start = t.start);
    ++i < r.length;

  ) {
    const o = r[i];
    if (
      o.type === "element" &&
      o.tagName === "li" &&
      o.properties &&
      Array.isArray(o.properties.className) &&
      o.properties.className.includes("task-list-item")
    ) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0),
  };
  return (e.patch(t, l), e.applyData(t, l));
}
function wk(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function Sk(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return (e.patch(t, n), e.applyData(t, n));
}
function Ck(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
function Ek(e, t) {
  const n = e.all(t),
    r = n.shift(),
    i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0),
    };
    (e.patch(t.children[0], o), i.push(o));
  }
  if (n.length > 0) {
    const o = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: e.wrap(n, !0),
      },
      u = ca(t.children[1]),
      s = ih(t.children[t.children.length - 1]);
    (u && s && (o.position = { start: u, end: s }), i.push(o));
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0),
  };
  return (e.patch(t, l), e.applyData(t, l));
}
function bk(e, t, n) {
  const r = n ? n.children : void 0,
    l = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td",
    o = n && n.type === "table" ? n.align : void 0,
    u = o ? o.length : t.children.length;
  let s = -1;
  const a = [];
  for (; ++s < u; ) {
    const c = t.children[s],
      d = {},
      p = o ? o[s] : void 0;
    p && (d.align = p);
    let m = { type: "element", tagName: l, properties: d, children: [] };
    (c && ((m.children = e.all(c)), e.patch(c, m), (m = e.applyData(c, m))),
      a.push(m));
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(a, !0),
  };
  return (e.patch(t, f), e.applyData(t, f));
}
function Nk(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    properties: {},
    children: e.all(t),
  };
  return (e.patch(t, n), e.applyData(t, n));
}
const cf = 9,
  ff = 32;
function Pk(e) {
  const t = String(e),
    n = /\r?\n|\r/g;
  let r = n.exec(t),
    i = 0;
  const l = [];
  for (; r; )
    (l.push(pf(t.slice(i, r.index), i > 0, !0), r[0]),
      (i = r.index + r[0].length),
      (r = n.exec(t)));
  return (l.push(pf(t.slice(i), i > 0, !1)), l.join(""));
}
function pf(e, t, n) {
  let r = 0,
    i = e.length;
  if (t) {
    let l = e.codePointAt(r);
    for (; l === cf || l === ff; ) (r++, (l = e.codePointAt(r)));
  }
  if (n) {
    let l = e.codePointAt(i - 1);
    for (; l === cf || l === ff; ) (i--, (l = e.codePointAt(i - 1)));
  }
  return i > r ? e.slice(r, i) : "";
}
function Lk(e, t) {
  const n = { type: "text", value: Pk(String(t.value)) };
  return (e.patch(t, n), e.applyData(t, n));
}
function Tk(e, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return (e.patch(t, n), e.applyData(t, n));
}
const _k = {
  blockquote: lk,
  break: ok,
  code: uk,
  delete: sk,
  emphasis: ak,
  footnoteReference: ck,
  heading: fk,
  html: pk,
  imageReference: dk,
  image: hk,
  inlineCode: mk,
  linkReference: gk,
  link: yk,
  listItem: xk,
  list: vk,
  paragraph: wk,
  root: Sk,
  strong: Ck,
  table: Ek,
  tableCell: Nk,
  tableRow: bk,
  text: Lk,
  thematicBreak: Tk,
  toml: Yi,
  yaml: Yi,
  definition: Yi,
  footnoteDefinition: Yi,
};
function Yi() {}
const Nh = -1,
  uo = 0,
  Gr = 1,
  Ml = 2,
  ya = 3,
  xa = 4,
  ka = 5,
  va = 6,
  Ph = 7,
  Lh = 8,
  df = typeof self == "object" ? self : globalThis,
  zk = (e, t) => {
    const n = (i, l) => (e.set(l, i), i),
      r = (i) => {
        if (e.has(i)) return e.get(i);
        const [l, o] = t[i];
        switch (l) {
          case uo:
          case Nh:
            return n(o, i);
          case Gr: {
            const u = n([], i);
            for (const s of o) u.push(r(s));
            return u;
          }
          case Ml: {
            const u = n({}, i);
            for (const [s, a] of o) u[r(s)] = r(a);
            return u;
          }
          case ya:
            return n(new Date(o), i);
          case xa: {
            const { source: u, flags: s } = o;
            return n(new RegExp(u, s), i);
          }
          case ka: {
            const u = n(new Map(), i);
            for (const [s, a] of o) u.set(r(s), r(a));
            return u;
          }
          case va: {
            const u = n(new Set(), i);
            for (const s of o) u.add(r(s));
            return u;
          }
          case Ph: {
            const { name: u, message: s } = o;
            return n(new df[u](s), i);
          }
          case Lh:
            return n(BigInt(o), i);
          case "BigInt":
            return n(Object(BigInt(o)), i);
          case "ArrayBuffer":
            return n(new Uint8Array(o).buffer, o);
          case "DataView": {
            const { buffer: u } = new Uint8Array(o);
            return n(new DataView(u), o);
          }
        }
        return n(new df[l](o), i);
      };
    return r;
  },
  hf = (e) => zk(new Map(), e)(0),
  Vn = "",
  { toString: Ik } = {},
  { keys: jk } = Object,
  Ar = (e) => {
    const t = typeof e;
    if (t !== "object" || !e) return [uo, t];
    const n = Ik.call(e).slice(8, -1);
    switch (n) {
      case "Array":
        return [Gr, Vn];
      case "Object":
        return [Ml, Vn];
      case "Date":
        return [ya, Vn];
      case "RegExp":
        return [xa, Vn];
      case "Map":
        return [ka, Vn];
      case "Set":
        return [va, Vn];
      case "DataView":
        return [Gr, n];
    }
    return n.includes("Array")
      ? [Gr, n]
      : n.includes("Error")
        ? [Ph, n]
        : [Ml, n];
  },
  Xi = ([e, t]) => e === uo && (t === "function" || t === "symbol"),
  Dk = (e, t, n, r) => {
    const i = (o, u) => {
        const s = r.push(o) - 1;
        return (n.set(u, s), s);
      },
      l = (o) => {
        if (n.has(o)) return n.get(o);
        let [u, s] = Ar(o);
        switch (u) {
          case uo: {
            let f = o;
            switch (s) {
              case "bigint":
                ((u = Lh), (f = o.toString()));
                break;
              case "function":
              case "symbol":
                if (e) throw new TypeError("unable to serialize " + s);
                f = null;
                break;
              case "undefined":
                return i([Nh], o);
            }
            return i([u, f], o);
          }
          case Gr: {
            if (s) {
              let d = o;
              return (
                s === "DataView"
                  ? (d = new Uint8Array(o.buffer))
                  : s === "ArrayBuffer" && (d = new Uint8Array(o)),
                i([s, [...d]], o)
              );
            }
            const f = [],
              c = i([u, f], o);
            for (const d of o) f.push(l(d));
            return c;
          }
          case Ml: {
            if (s)
              switch (s) {
                case "BigInt":
                  return i([s, o.toString()], o);
                case "Boolean":
                case "Number":
                case "String":
                  return i([s, o.valueOf()], o);
              }
            if (t && "toJSON" in o) return l(o.toJSON());
            const f = [],
              c = i([u, f], o);
            for (const d of jk(o))
              (e || !Xi(Ar(o[d]))) && f.push([l(d), l(o[d])]);
            return c;
          }
          case ya:
            return i([u, o.toISOString()], o);
          case xa: {
            const { source: f, flags: c } = o;
            return i([u, { source: f, flags: c }], o);
          }
          case ka: {
            const f = [],
              c = i([u, f], o);
            for (const [d, p] of o)
              (e || !(Xi(Ar(d)) || Xi(Ar(p)))) && f.push([l(d), l(p)]);
            return c;
          }
          case va: {
            const f = [],
              c = i([u, f], o);
            for (const d of o) (e || !Xi(Ar(d))) && f.push(l(d));
            return c;
          }
        }
        const { message: a } = o;
        return i([u, { name: s, message: a }], o);
      };
    return l;
  },
  mf = (e, { json: t, lossy: n } = {}) => {
    const r = [];
    return (Dk(!(t || n), !!t, new Map(), r)(e), r);
  },
  Bl =
    typeof structuredClone == "function"
      ? (e, t) =>
          t && ("json" in t || "lossy" in t) ? hf(mf(e, t)) : structuredClone(e)
      : (e, t) => hf(mf(e, t));
function Ak(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return (
    t > 1 &&
      n.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(t) }],
      }),
    n
  );
}
function Rk(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Fk(e) {
  const t =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    n = e.options.footnoteBackContent || Ak,
    r = e.options.footnoteBackLabel || Rk,
    i = e.options.footnoteLabel || "Footnotes",
    l = e.options.footnoteLabelTagName || "h2",
    o = e.options.footnoteLabelProperties || { className: ["sr-only"] },
    u = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const a = e.footnoteById.get(e.footnoteOrder[s]);
    if (!a) continue;
    const f = e.all(a),
      c = String(a.identifier).toUpperCase(),
      d = Er(c.toLowerCase());
    let p = 0;
    const m = [],
      k = e.footnoteCounts.get(c);
    for (; k !== void 0 && ++p <= k; ) {
      m.length > 0 && m.push({ type: "text", value: " " });
      let g = typeof n == "string" ? n : n(s, p);
      (typeof g == "string" && (g = { type: "text", value: g }),
        m.push({
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + t + "fnref-" + d + (p > 1 ? "-" + p : ""),
            dataFootnoteBackref: "",
            ariaLabel: typeof r == "string" ? r : r(s, p),
            className: ["data-footnote-backref"],
          },
          children: Array.isArray(g) ? g : [g],
        }));
    }
    const P = f[f.length - 1];
    if (P && P.type === "element" && P.tagName === "p") {
      const g = P.children[P.children.length - 1];
      (g && g.type === "text"
        ? (g.value += " ")
        : P.children.push({ type: "text", value: " " }),
        P.children.push(...m));
    } else f.push(...m);
    const h = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + d },
      children: e.wrap(f, !0),
    };
    (e.patch(a, h), u.push(h));
  }
  if (u.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: { ...Bl(o), id: "footnote-label" },
          children: [{ type: "text", value: i }],
        },
        {
          type: "text",
          value: `
`,
        },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(u, !0),
        },
        {
          type: "text",
          value: `
`,
        },
      ],
    };
}
const so = function (e) {
  if (e == null) return $k;
  if (typeof e == "function") return ao(e);
  if (typeof e == "object") return Array.isArray(e) ? Ok(e) : Mk(e);
  if (typeof e == "string") return Bk(e);
  throw new Error("Expected function, string, or object as test");
};
function Ok(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; ) t[n] = so(e[n]);
  return ao(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; ) if (t[l].apply(this, i)) return !0;
    return !1;
  }
}
function Mk(e) {
  const t = e;
  return ao(n);
  function n(r) {
    const i = r;
    let l;
    for (l in e) if (i[l] !== t[l]) return !1;
    return !0;
  }
}
function Bk(e) {
  return ao(t);
  function t(n) {
    return n && n.type === e;
  }
}
function ao(e) {
  return t;
  function t(n, r, i) {
    return !!(
      Uk(n) && e.call(this, n, typeof r == "number" ? r : void 0, i || void 0)
    );
  }
}
function $k() {
  return !0;
}
function Uk(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Th = [],
  Hk = !0,
  ls = !1,
  Vk = "skip";
function _h(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function"
    ? ((r = n), (n = t))
    : (i = t);
  const l = so(i),
    o = r ? -1 : 1;
  u(e, void 0, [])();
  function u(s, a, f) {
    const c = s && typeof s == "object" ? s : {};
    if (typeof c.type == "string") {
      const p =
        typeof c.tagName == "string"
          ? c.tagName
          : typeof c.name == "string"
            ? c.name
            : void 0;
      Object.defineProperty(d, "name", {
        value: "node (" + (s.type + (p ? "<" + p + ">" : "")) + ")",
      });
    }
    return d;
    function d() {
      let p = Th,
        m,
        k,
        P;
      if (
        (!t || l(s, a, f[f.length - 1] || void 0)) &&
        ((p = Wk(n(s, f))), p[0] === ls)
      )
        return p;
      if ("children" in s && s.children) {
        const h = s;
        if (h.children && p[0] !== Vk)
          for (
            k = (r ? h.children.length : -1) + o, P = f.concat(h);
            k > -1 && k < h.children.length;

          ) {
            const g = h.children[k];
            if (((m = u(g, k, P)()), m[0] === ls)) return m;
            k = typeof m[1] == "number" ? m[1] : k + o;
          }
      }
      return p;
    }
  }
}
function Wk(e) {
  return Array.isArray(e)
    ? e
    : typeof e == "number"
      ? [Hk, e]
      : e == null
        ? Th
        : [e];
}
function wa(e, t, n, r) {
  let i, l, o;
  (typeof t == "function" && typeof n != "function"
    ? ((l = void 0), (o = t), (i = n))
    : ((l = t), (o = n), (i = r)),
    _h(e, l, u, i));
  function u(s, a) {
    const f = a[a.length - 1],
      c = f ? f.children.indexOf(s) : void 0;
    return o(s, c, f);
  }
}
const os = {}.hasOwnProperty,
  Qk = {};
function qk(e, t) {
  const n = t || Qk,
    r = new Map(),
    i = new Map(),
    l = new Map(),
    o = { ..._k, ...n.handlers },
    u = {
      all: a,
      applyData: Yk,
      definitionById: r,
      footnoteById: i,
      footnoteCounts: l,
      footnoteOrder: [],
      handlers: o,
      one: s,
      options: n,
      patch: Kk,
      wrap: Gk,
    };
  return (
    wa(e, function (f) {
      if (f.type === "definition" || f.type === "footnoteDefinition") {
        const c = f.type === "definition" ? r : i,
          d = String(f.identifier).toUpperCase();
        c.has(d) || c.set(d, f);
      }
    }),
    u
  );
  function s(f, c) {
    const d = f.type,
      p = u.handlers[d];
    if (os.call(u.handlers, d) && p) return p(u, f, c);
    if (u.options.passThrough && u.options.passThrough.includes(d)) {
      if ("children" in f) {
        const { children: k, ...P } = f,
          h = Bl(P);
        return ((h.children = u.all(f)), h);
      }
      return Bl(f);
    }
    return (u.options.unknownHandler || Xk)(u, f, c);
  }
  function a(f) {
    const c = [];
    if ("children" in f) {
      const d = f.children;
      let p = -1;
      for (; ++p < d.length; ) {
        const m = u.one(d[p], f);
        if (m) {
          if (
            p &&
            d[p - 1].type === "break" &&
            (!Array.isArray(m) && m.type === "text" && (m.value = gf(m.value)),
            !Array.isArray(m) && m.type === "element")
          ) {
            const k = m.children[0];
            k && k.type === "text" && (k.value = gf(k.value));
          }
          Array.isArray(m) ? c.push(...m) : c.push(m);
        }
      }
    }
    return c;
  }
}
function Kk(e, t) {
  e.position && (t.position = Rx(e));
}
function Yk(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName,
      i = e.data.hChildren,
      l = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element") n.tagName = r;
      else {
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: o };
      }
    (n.type === "element" && l && Object.assign(n.properties, Bl(l)),
      "children" in n &&
        n.children &&
        i !== null &&
        i !== void 0 &&
        (n.children = i));
  }
  return n;
}
function Xk(e, t) {
  const n = t.data || {},
    r =
      "value" in t && !(os.call(n, "hProperties") || os.call(n, "hChildren"))
        ? { type: "text", value: t.value }
        : {
            type: "element",
            tagName: "div",
            properties: {},
            children: e.all(t),
          };
  return (e.patch(t, r), e.applyData(t, r));
}
function Gk(e, t) {
  const n = [];
  let r = -1;
  for (
    t &&
    n.push({
      type: "text",
      value: `
`,
    });
    ++r < e.length;

  )
    (r &&
      n.push({
        type: "text",
        value: `
`,
      }),
      n.push(e[r]));
  return (
    t &&
      e.length > 0 &&
      n.push({
        type: "text",
        value: `
`,
      }),
    n
  );
}
function gf(e) {
  let t = 0,
    n = e.charCodeAt(t);
  for (; n === 9 || n === 32; ) (t++, (n = e.charCodeAt(t)));
  return e.slice(t);
}
function yf(e, t) {
  const n = qk(e, t),
    r = n.one(e, void 0),
    i = Fk(n),
    l = Array.isArray(r)
      ? { type: "root", children: r }
      : r || { type: "root", children: [] };
  return (
    i &&
      l.children.push(
        {
          type: "text",
          value: `
`,
        },
        i,
      ),
    l
  );
}
function Zk(e, t) {
  return e && "run" in e
    ? async function (n, r) {
        const i = yf(n, { file: r, ...t });
        await e.run(i, r);
      }
    : function (n, r) {
        return yf(n, { file: r, ...(e || t) });
      };
}
function xf(e) {
  if (e) throw e;
}
var pl = Object.prototype.hasOwnProperty,
  zh = Object.prototype.toString,
  kf = Object.defineProperty,
  vf = Object.getOwnPropertyDescriptor,
  wf = function (t) {
    return typeof Array.isArray == "function"
      ? Array.isArray(t)
      : zh.call(t) === "[object Array]";
  },
  Sf = function (t) {
    if (!t || zh.call(t) !== "[object Object]") return !1;
    var n = pl.call(t, "constructor"),
      r =
        t.constructor &&
        t.constructor.prototype &&
        pl.call(t.constructor.prototype, "isPrototypeOf");
    if (t.constructor && !n && !r) return !1;
    var i;
    for (i in t);
    return typeof i > "u" || pl.call(t, i);
  },
  Cf = function (t, n) {
    kf && n.name === "__proto__"
      ? kf(t, n.name, {
          enumerable: !0,
          configurable: !0,
          value: n.newValue,
          writable: !0,
        })
      : (t[n.name] = n.newValue);
  },
  Ef = function (t, n) {
    if (n === "__proto__")
      if (pl.call(t, n)) {
        if (vf) return vf(t, n).value;
      } else return;
    return t[n];
  },
  Jk = function e() {
    var t,
      n,
      r,
      i,
      l,
      o,
      u = arguments[0],
      s = 1,
      a = arguments.length,
      f = !1;
    for (
      typeof u == "boolean" && ((f = u), (u = arguments[1] || {}), (s = 2)),
        (u == null || (typeof u != "object" && typeof u != "function")) &&
          (u = {});
      s < a;
      ++s
    )
      if (((t = arguments[s]), t != null))
        for (n in t)
          ((r = Ef(u, n)),
            (i = Ef(t, n)),
            u !== i &&
              (f && i && (Sf(i) || (l = wf(i)))
                ? (l
                    ? ((l = !1), (o = r && wf(r) ? r : []))
                    : (o = r && Sf(r) ? r : {}),
                  Cf(u, { name: n, newValue: e(f, o, i) }))
                : typeof i < "u" && Cf(u, { name: n, newValue: i })));
    return u;
  };
const Vo = fs(Jk);
function us(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return (
    (t === null ||
      t === Object.prototype ||
      Object.getPrototypeOf(t) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function ev() {
  const e = [],
    t = { run: n, use: r };
  return t;
  function n(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    u(null, ...i);
    function u(s, ...a) {
      const f = e[++l];
      let c = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++c < i.length; )
        (a[c] === null || a[c] === void 0) && (a[c] = i[c]);
      ((i = a), f ? tv(f, u)(...a) : o(null, ...a));
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + i);
    return (e.push(i), t);
  }
}
function tv(e, t) {
  let n;
  return r;
  function r(...o) {
    const u = e.length > o.length;
    let s;
    u && o.push(i);
    try {
      s = e.apply(this, o);
    } catch (a) {
      const f = a;
      if (u && n) throw f;
      return i(f);
    }
    u ||
      (s && s.then && typeof s.then == "function"
        ? s.then(l, i)
        : s instanceof Error
          ? i(s)
          : l(s));
  }
  function i(o, ...u) {
    n || ((n = !0), t(o, ...u));
  }
  function l(o) {
    i(null, o);
  }
}
const Dt = { basename: nv, dirname: rv, extname: iv, join: lv, sep: "/" };
function nv(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Ei(e);
  let n = 0,
    r = -1,
    i = e.length,
    l;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          n = i + 1;
          break;
        }
      } else r < 0 && ((l = !0), (r = i + 1));
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e) return "";
  let o = -1,
    u = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        n = i + 1;
        break;
      }
    } else
      (o < 0 && ((l = !0), (o = i + 1)),
        u > -1 &&
          (e.codePointAt(i) === t.codePointAt(u--)
            ? u < 0 && (r = i)
            : ((u = -1), (r = o))));
  return (n === r ? (r = o) : r < 0 && (r = e.length), e.slice(n, r));
}
function rv(e) {
  if ((Ei(e), e.length === 0)) return ".";
  let t = -1,
    n = e.length,
    r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0
    ? e.codePointAt(0) === 47
      ? "/"
      : "."
    : t === 1 && e.codePointAt(0) === 47
      ? "//"
      : e.slice(0, t);
}
function iv(e) {
  Ei(e);
  let t = e.length,
    n = -1,
    r = 0,
    i = -1,
    l = 0,
    o;
  for (; t--; ) {
    const u = e.codePointAt(t);
    if (u === 47) {
      if (o) {
        r = t + 1;
        break;
      }
      continue;
    }
    (n < 0 && ((o = !0), (n = t + 1)),
      u === 46 ? (i < 0 ? (i = t) : l !== 1 && (l = 1)) : i > -1 && (l = -1));
  }
  return i < 0 || n < 0 || l === 0 || (l === 1 && i === n - 1 && i === r + 1)
    ? ""
    : e.slice(i, n);
}
function lv(...e) {
  let t = -1,
    n;
  for (; ++t < e.length; )
    (Ei(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]));
  return n === void 0 ? "." : ov(n);
}
function ov(e) {
  Ei(e);
  const t = e.codePointAt(0) === 47;
  let n = uv(e, !t);
  return (
    n.length === 0 && !t && (n = "."),
    n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"),
    t ? "/" + n : n
  );
}
function uv(e, t) {
  let n = "",
    r = 0,
    i = -1,
    l = 0,
    o = -1,
    u,
    s;
  for (; ++o <= e.length; ) {
    if (o < e.length) u = e.codePointAt(o);
    else {
      if (u === 47) break;
      u = 47;
    }
    if (u === 47) {
      if (!(i === o - 1 || l === 1))
        if (i !== o - 1 && l === 2) {
          if (
            n.length < 2 ||
            r !== 2 ||
            n.codePointAt(n.length - 1) !== 46 ||
            n.codePointAt(n.length - 2) !== 46
          ) {
            if (n.length > 2) {
              if (((s = n.lastIndexOf("/")), s !== n.length - 1)) {
                (s < 0
                  ? ((n = ""), (r = 0))
                  : ((n = n.slice(0, s)),
                    (r = n.length - 1 - n.lastIndexOf("/"))),
                  (i = o),
                  (l = 0));
                continue;
              }
            } else if (n.length > 0) {
              ((n = ""), (r = 0), (i = o), (l = 0));
              continue;
            }
          }
          t && ((n = n.length > 0 ? n + "/.." : ".."), (r = 2));
        } else
          (n.length > 0
            ? (n += "/" + e.slice(i + 1, o))
            : (n = e.slice(i + 1, o)),
            (r = o - i - 1));
      ((i = o), (l = 0));
    } else u === 46 && l > -1 ? l++ : (l = -1);
  }
  return n;
}
function Ei(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const sv = { cwd: av };
function av() {
  return "/";
}
function ss(e) {
  return !!(
    e !== null &&
    typeof e == "object" &&
    "href" in e &&
    e.href &&
    "protocol" in e &&
    e.protocol &&
    e.auth === void 0
  );
}
function cv(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!ss(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        e +
        "`",
    );
    throw ((t.code = "ERR_INVALID_ARG_TYPE"), t);
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw ((t.code = "ERR_INVALID_URL_SCHEME"), t);
  }
  return fv(e);
}
function fv(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin',
    );
    throw ((r.code = "ERR_INVALID_FILE_URL_HOST"), r);
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters",
        );
        throw ((i.code = "ERR_INVALID_FILE_URL_PATH"), i);
      }
    }
  return decodeURIComponent(t);
}
const Wo = ["history", "path", "basename", "stem", "extname", "dirname"];
class Ih {
  constructor(t) {
    let n;
    (t
      ? ss(t)
        ? (n = { path: t })
        : typeof t == "string" || pv(t)
          ? (n = { value: t })
          : (n = t)
      : (n = {}),
      (this.cwd = "cwd" in n ? "" : sv.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored);
    let r = -1;
    for (; ++r < Wo.length; ) {
      const l = Wo[r];
      l in n &&
        n[l] !== void 0 &&
        n[l] !== null &&
        (this[l] = l === "history" ? [...n[l]] : n[l]);
    }
    let i;
    for (i in n) Wo.includes(i) || (this[i] = n[i]);
  }
  get basename() {
    return typeof this.path == "string" ? Dt.basename(this.path) : void 0;
  }
  set basename(t) {
    (qo(t, "basename"),
      Qo(t, "basename"),
      (this.path = Dt.join(this.dirname || "", t)));
  }
  get dirname() {
    return typeof this.path == "string" ? Dt.dirname(this.path) : void 0;
  }
  set dirname(t) {
    (bf(this.basename, "dirname"),
      (this.path = Dt.join(t || "", this.basename)));
  }
  get extname() {
    return typeof this.path == "string" ? Dt.extname(this.path) : void 0;
  }
  set extname(t) {
    if ((Qo(t, "extname"), bf(this.dirname, "extname"), t)) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Dt.join(this.dirname, this.stem + (t || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    (ss(t) && (t = cv(t)),
      qo(t, "path"),
      this.path !== t && this.history.push(t));
  }
  get stem() {
    return typeof this.path == "string"
      ? Dt.basename(this.path, this.extname)
      : void 0;
  }
  set stem(t) {
    (qo(t, "stem"),
      Qo(t, "stem"),
      (this.path = Dt.join(this.dirname || "", t + (this.extname || ""))));
  }
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw ((i.fatal = !0), i);
  }
  info(t, n, r) {
    const i = this.message(t, n, r);
    return ((i.fatal = void 0), i);
  }
  message(t, n, r) {
    const i = new Ae(t, n, r);
    return (
      this.path && ((i.name = this.path + ":" + i.name), (i.file = this.path)),
      (i.fatal = !1),
      this.messages.push(i),
      i
    );
  }
  toString(t) {
    return this.value === void 0
      ? ""
      : typeof this.value == "string"
        ? this.value
        : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Qo(e, t) {
  if (e && e.includes(Dt.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Dt.sep + "`",
    );
}
function qo(e, t) {
  if (!e) throw new Error("`" + t + "` cannot be empty");
}
function bf(e, t) {
  if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function pv(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const dv = function (e) {
    const r = this.constructor.prototype,
      i = r[e],
      l = function () {
        return i.apply(l, arguments);
      };
    return (Object.setPrototypeOf(l, r), l);
  },
  hv = {}.hasOwnProperty;
class Sa extends dv {
  constructor() {
    (super("copy"),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = ev()));
  }
  copy() {
    const t = new Sa();
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return (t.data(Vo(!0, {}, this.namespace)), t);
  }
  data(t, n) {
    return typeof t == "string"
      ? arguments.length === 2
        ? (Xo("data", this.frozen), (this.namespace[t] = n), this)
        : (hv.call(this.namespace, t) && this.namespace[t]) || void 0
      : t
        ? (Xo("data", this.frozen), (this.namespace = t), this)
        : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const t = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1) continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return (
      (this.frozen = !0),
      (this.freezeIndex = Number.POSITIVE_INFINITY),
      this
    );
  }
  parse(t) {
    this.freeze();
    const n = Gi(t),
      r = this.parser || this.Parser;
    return (Ko("parse", r), r(String(n), n));
  }
  process(t, n) {
    const r = this;
    return (
      this.freeze(),
      Ko("process", this.parser || this.Parser),
      Yo("process", this.compiler || this.Compiler),
      n ? i(void 0, n) : new Promise(i)
    );
    function i(l, o) {
      const u = Gi(t),
        s = r.parse(u);
      r.run(s, u, function (f, c, d) {
        if (f || !c || !d) return a(f);
        const p = c,
          m = r.stringify(p, d);
        (yv(m) ? (d.value = m) : (d.result = m), a(f, d));
      });
      function a(f, c) {
        f || !c ? o(f) : l ? l(c) : n(void 0, c);
      }
    }
  }
  processSync(t) {
    let n = !1,
      r;
    return (
      this.freeze(),
      Ko("processSync", this.parser || this.Parser),
      Yo("processSync", this.compiler || this.Compiler),
      this.process(t, i),
      Pf("processSync", "process", n),
      r
    );
    function i(l, o) {
      ((n = !0), xf(l), (r = o));
    }
  }
  run(t, n, r) {
    (Nf(t), this.freeze());
    const i = this.transformers;
    return (
      !r && typeof n == "function" && ((r = n), (n = void 0)),
      r ? l(void 0, r) : new Promise(l)
    );
    function l(o, u) {
      const s = Gi(n);
      i.run(t, s, a);
      function a(f, c, d) {
        const p = c || t;
        f ? u(f) : o ? o(p) : r(void 0, p, d);
      }
    }
  }
  runSync(t, n) {
    let r = !1,
      i;
    return (this.run(t, n, l), Pf("runSync", "run", r), i);
    function l(o, u) {
      (xf(o), (i = u), (r = !0));
    }
  }
  stringify(t, n) {
    this.freeze();
    const r = Gi(n),
      i = this.compiler || this.Compiler;
    return (Yo("stringify", i), Nf(t), i(t, r));
  }
  use(t, ...n) {
    const r = this.attachers,
      i = this.namespace;
    if ((Xo("use", this.frozen), t != null))
      if (typeof t == "function") s(t, n);
      else if (typeof t == "object") Array.isArray(t) ? u(t) : o(t);
      else throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function l(a) {
      if (typeof a == "function") s(a, []);
      else if (typeof a == "object")
        if (Array.isArray(a)) {
          const [f, ...c] = a;
          s(f, c);
        } else o(a);
      else throw new TypeError("Expected usable value, not `" + a + "`");
    }
    function o(a) {
      if (!("plugins" in a) && !("settings" in a))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither",
        );
      (u(a.plugins),
        a.settings && (i.settings = Vo(!0, i.settings, a.settings)));
    }
    function u(a) {
      let f = -1;
      if (a != null)
        if (Array.isArray(a))
          for (; ++f < a.length; ) {
            const c = a[f];
            l(c);
          }
        else throw new TypeError("Expected a list of plugins, not `" + a + "`");
    }
    function s(a, f) {
      let c = -1,
        d = -1;
      for (; ++c < r.length; )
        if (r[c][0] === a) {
          d = c;
          break;
        }
      if (d === -1) r.push([a, ...f]);
      else if (f.length > 0) {
        let [p, ...m] = f;
        const k = r[d][1];
        (us(k) && us(p) && (p = Vo(!0, k, p)), (r[d] = [a, p, ...m]));
      }
    }
  }
}
const mv = new Sa().freeze();
function Ko(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Yo(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Xo(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" +
        e +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.",
    );
}
function Nf(e) {
  if (!us(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Pf(e, t, n) {
  if (!n)
    throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function Gi(e) {
  return gv(e) ? e : new Ih(e);
}
function gv(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function yv(e) {
  return typeof e == "string" || xv(e);
}
function xv(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const kv = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
  Lf = [],
  Tf = { allowDangerousHtml: !0 },
  vv = /^(https?|ircs?|mailto|xmpp)$/i,
  wv = [
    { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
    { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
    {
      from: "allowNode",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowElement",
    },
    {
      from: "allowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowedElements",
    },
    { from: "className", id: "remove-classname" },
    {
      from: "disallowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "disallowedElements",
    },
    { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
    { from: "includeElementIndex", id: "#remove-includeelementindex" },
    {
      from: "includeNodeIndex",
      id: "change-includenodeindex-to-includeelementindex",
    },
    { from: "linkTarget", id: "remove-linktarget" },
    {
      from: "plugins",
      id: "change-plugins-to-remarkplugins",
      to: "remarkPlugins",
    },
    { from: "rawSourcePos", id: "#remove-rawsourcepos" },
    {
      from: "renderers",
      id: "change-renderers-to-components",
      to: "components",
    },
    { from: "source", id: "change-source-to-children", to: "children" },
    { from: "sourcePos", id: "#remove-sourcepos" },
    { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
    { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" },
  ];
function Sv(e) {
  const t = Cv(e),
    n = Ev(e);
  return bv(t.runSync(t.parse(n), n), e);
}
function Cv(e) {
  const t = e.rehypePlugins || Lf,
    n = e.remarkPlugins || Lf,
    r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Tf } : Tf;
  return mv().use(ik).use(n).use(Zk, r).use(t);
}
function Ev(e) {
  const t = e.children || "",
    n = new Ih();
  return (typeof t == "string" && (n.value = t), n);
}
function bv(e, t) {
  const n = t.allowedElements,
    r = t.allowElement,
    i = t.components,
    l = t.disallowedElements,
    o = t.skipHtml,
    u = t.unwrapDisallowed,
    s = t.urlTransform || Nv;
  for (const f of wv)
    Object.hasOwn(t, f.from) &&
      ("" +
        f.from +
        (f.to ? "use `" + f.to + "` instead" : "remove it") +
        kv +
        f.id,
      void 0);
  return (
    wa(e, a),
    $x(e, {
      Fragment: v.Fragment,
      components: i,
      ignoreInvalidStyle: !0,
      jsx: v.jsx,
      jsxs: v.jsxs,
      passKeys: !0,
      passNode: !0,
    })
  );
  function a(f, c, d) {
    if (f.type === "raw" && d && typeof c == "number")
      return (
        o
          ? d.children.splice(c, 1)
          : (d.children[c] = { type: "text", value: f.value }),
        c
      );
    if (f.type === "element") {
      let p;
      for (p in $o)
        if (Object.hasOwn($o, p) && Object.hasOwn(f.properties, p)) {
          const m = f.properties[p],
            k = $o[p];
          (k === null || k.includes(f.tagName)) &&
            (f.properties[p] = s(String(m || ""), p, f));
        }
    }
    if (f.type === "element") {
      let p = n ? !n.includes(f.tagName) : l ? l.includes(f.tagName) : !1;
      if (
        (!p && r && typeof c == "number" && (p = !r(f, c, d)),
        p && d && typeof c == "number")
      )
        return (
          u && f.children
            ? d.children.splice(c, 1, ...f.children)
            : d.children.splice(c, 1),
          c
        );
    }
  }
}
function Nv(e) {
  const t = e.indexOf(":"),
    n = e.indexOf("?"),
    r = e.indexOf("#"),
    i = e.indexOf("/");
  return t === -1 ||
    (i !== -1 && t > i) ||
    (n !== -1 && t > n) ||
    (r !== -1 && t > r) ||
    vv.test(e.slice(0, t))
    ? e
    : "";
}
function _f(e, t) {
  const n = String(e);
  if (typeof t != "string") throw new TypeError("Expected character");
  let r = 0,
    i = n.indexOf(t);
  for (; i !== -1; ) (r++, (i = n.indexOf(t, i + t.length)));
  return r;
}
function Pv(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Lv(e, t, n) {
  const i = so((n || {}).ignore || []),
    l = Tv(t);
  let o = -1;
  for (; ++o < l.length; ) _h(e, "text", u);
  function u(a, f) {
    let c = -1,
      d;
    for (; ++c < f.length; ) {
      const p = f[c],
        m = d ? d.children : void 0;
      if (i(p, m ? m.indexOf(p) : void 0, d)) return;
      d = p;
    }
    if (d) return s(a, f);
  }
  function s(a, f) {
    const c = f[f.length - 1],
      d = l[o][0],
      p = l[o][1];
    let m = 0;
    const P = c.children.indexOf(a);
    let h = !1,
      g = [];
    d.lastIndex = 0;
    let y = d.exec(a.value);
    for (; y; ) {
      const E = y.index,
        b = { index: y.index, input: y.input, stack: [...f, a] };
      let S = p(...y, b);
      if (
        (typeof S == "string" &&
          (S = S.length > 0 ? { type: "text", value: S } : void 0),
        S === !1
          ? (d.lastIndex = E + 1)
          : (m !== E && g.push({ type: "text", value: a.value.slice(m, E) }),
            Array.isArray(S) ? g.push(...S) : S && g.push(S),
            (m = E + y[0].length),
            (h = !0)),
        !d.global)
      )
        break;
      y = d.exec(a.value);
    }
    return (
      h
        ? (m < a.value.length &&
            g.push({ type: "text", value: a.value.slice(m) }),
          c.children.splice(P, 1, ...g))
        : (g = [a]),
      P + g.length
    );
  }
}
function Tv(e) {
  const t = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    t.push([_v(i[0]), zv(i[1])]);
  }
  return t;
}
function _v(e) {
  return typeof e == "string" ? new RegExp(Pv(e), "g") : e;
}
function zv(e) {
  return typeof e == "function"
    ? e
    : function () {
        return e;
      };
}
const Go = "phrasing",
  Zo = ["autolink", "link", "image", "label"];
function Iv() {
  return {
    transforms: [Mv],
    enter: {
      literalAutolink: Dv,
      literalAutolinkEmail: Jo,
      literalAutolinkHttp: Jo,
      literalAutolinkWww: Jo,
    },
    exit: {
      literalAutolink: Ov,
      literalAutolinkEmail: Fv,
      literalAutolinkHttp: Av,
      literalAutolinkWww: Rv,
    },
  };
}
function jv() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Go,
        notInConstruct: Zo,
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Go,
        notInConstruct: Zo,
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Go,
        notInConstruct: Zo,
      },
    ],
  };
}
function Dv(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Jo(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function Av(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function Rv(e) {
  this.config.exit.data.call(this, e);
  const t = this.stack[this.stack.length - 1];
  (t.type, (t.url = "http://" + this.sliceSerialize(e)));
}
function Fv(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function Ov(e) {
  this.exit(e);
}
function Mv(e) {
  Lv(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Bv],
      [
        new RegExp(
          "(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)",
          "gu",
        ),
        $v,
      ],
    ],
    { ignore: ["link", "linkReference"] },
  );
}
function Bv(e, t, n, r, i) {
  let l = "";
  if (
    !jh(i) ||
    (/^w/i.test(t) && ((n = t + n), (t = ""), (l = "http://")), !Uv(n))
  )
    return !1;
  const o = Hv(n + r);
  if (!o[0]) return !1;
  const u = {
    type: "link",
    title: null,
    url: l + t + o[0],
    children: [{ type: "text", value: t + o[0] }],
  };
  return o[1] ? [u, { type: "text", value: o[1] }] : u;
}
function $v(e, t, n, r) {
  return !jh(r, !0) || /[-\d_]$/.test(n)
    ? !1
    : {
        type: "link",
        title: null,
        url: "mailto:" + t + "@" + n,
        children: [{ type: "text", value: t + "@" + n }],
      };
}
function Uv(e) {
  const t = e.split(".");
  return !(
    t.length < 2 ||
    (t[t.length - 1] &&
      (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1]))) ||
    (t[t.length - 2] &&
      (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])))
  );
}
function Hv(e) {
  const t = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!t) return [e, void 0];
  e = e.slice(0, t.index);
  let n = t[0],
    r = n.indexOf(")");
  const i = _f(e, "(");
  let l = _f(e, ")");
  for (; r !== -1 && i > l; )
    ((e += n.slice(0, r + 1)), (n = n.slice(r + 1)), (r = n.indexOf(")")), l++);
  return [e, n];
}
function jh(e, t) {
  const n = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || Mn(n) || lo(n)) && (!t || n !== 47);
}
Dh.peek = Zv;
function Vv() {
  this.buffer();
}
function Wv(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function Qv() {
  this.buffer();
}
function qv(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e,
  );
}
function Kv(e) {
  const t = this.resume(),
    n = this.stack[this.stack.length - 1];
  (n.type,
    (n.identifier = Lt(this.sliceSerialize(e)).toLowerCase()),
    (n.label = t));
}
function Yv(e) {
  this.exit(e);
}
function Xv(e) {
  const t = this.resume(),
    n = this.stack[this.stack.length - 1];
  (n.type,
    (n.identifier = Lt(this.sliceSerialize(e)).toLowerCase()),
    (n.label = t));
}
function Gv(e) {
  this.exit(e);
}
function Zv() {
  return "[";
}
function Dh(e, t, n, r) {
  const i = n.createTracker(r);
  let l = i.move("[^");
  const o = n.enter("footnoteReference"),
    u = n.enter("reference");
  return (
    (l += i.move(n.safe(n.associationId(e), { after: "]", before: l }))),
    u(),
    o(),
    (l += i.move("]")),
    l
  );
}
function Jv() {
  return {
    enter: {
      gfmFootnoteCallString: Vv,
      gfmFootnoteCall: Wv,
      gfmFootnoteDefinitionLabelString: Qv,
      gfmFootnoteDefinition: qv,
    },
    exit: {
      gfmFootnoteCallString: Kv,
      gfmFootnoteCall: Yv,
      gfmFootnoteDefinitionLabelString: Xv,
      gfmFootnoteDefinition: Gv,
    },
  };
}
function ew(e) {
  let t = !1;
  return (
    e && e.firstLineBlank && (t = !0),
    {
      handlers: { footnoteDefinition: n, footnoteReference: Dh },
      unsafe: [
        { character: "[", inConstruct: ["label", "phrasing", "reference"] },
      ],
    }
  );
  function n(r, i, l, o) {
    const u = l.createTracker(o);
    let s = u.move("[^");
    const a = l.enter("footnoteDefinition"),
      f = l.enter("label");
    return (
      (s += u.move(l.safe(l.associationId(r), { before: s, after: "]" }))),
      f(),
      (s += u.move("]:")),
      r.children &&
        r.children.length > 0 &&
        (u.shift(4),
        (s += u.move(
          (t
            ? `
`
            : " ") +
            l.indentLines(l.containerFlow(r, u.current()), t ? Ah : tw),
        ))),
      a(),
      s
    );
  }
}
function tw(e, t, n) {
  return t === 0 ? e : Ah(e, t, n);
}
function Ah(e, t, n) {
  return (n ? "" : "    ") + e;
}
const nw = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe",
];
Rh.peek = uw;
function rw() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: lw },
    exit: { strikethrough: ow },
  };
}
function iw() {
  return {
    unsafe: [{ character: "~", inConstruct: "phrasing", notInConstruct: nw }],
    handlers: { delete: Rh },
  };
}
function lw(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function ow(e) {
  this.exit(e);
}
function Rh(e, t, n, r) {
  const i = n.createTracker(r),
    l = n.enter("strikethrough");
  let o = i.move("~~");
  return (
    (o += n.containerPhrasing(e, { ...i.current(), before: o, after: "~" })),
    (o += i.move("~~")),
    l(),
    o
  );
}
function uw() {
  return "~";
}
function sw(e) {
  return e.length;
}
function aw(e, t) {
  const n = t || {},
    r = (n.align || []).concat(),
    i = n.stringLength || sw,
    l = [],
    o = [],
    u = [],
    s = [];
  let a = 0,
    f = -1;
  for (; ++f < e.length; ) {
    const k = [],
      P = [];
    let h = -1;
    for (e[f].length > a && (a = e[f].length); ++h < e[f].length; ) {
      const g = cw(e[f][h]);
      if (n.alignDelimiters !== !1) {
        const y = i(g);
        ((P[h] = y), (s[h] === void 0 || y > s[h]) && (s[h] = y));
      }
      k.push(g);
    }
    ((o[f] = k), (u[f] = P));
  }
  let c = -1;
  if (typeof r == "object" && "length" in r) for (; ++c < a; ) l[c] = zf(r[c]);
  else {
    const k = zf(r);
    for (; ++c < a; ) l[c] = k;
  }
  c = -1;
  const d = [],
    p = [];
  for (; ++c < a; ) {
    const k = l[c];
    let P = "",
      h = "";
    k === 99
      ? ((P = ":"), (h = ":"))
      : k === 108
        ? (P = ":")
        : k === 114 && (h = ":");
    let g =
      n.alignDelimiters === !1 ? 1 : Math.max(1, s[c] - P.length - h.length);
    const y = P + "-".repeat(g) + h;
    (n.alignDelimiters !== !1 &&
      ((g = P.length + g + h.length), g > s[c] && (s[c] = g), (p[c] = g)),
      (d[c] = y));
  }
  (o.splice(1, 0, d), u.splice(1, 0, p), (f = -1));
  const m = [];
  for (; ++f < o.length; ) {
    const k = o[f],
      P = u[f];
    c = -1;
    const h = [];
    for (; ++c < a; ) {
      const g = k[c] || "";
      let y = "",
        E = "";
      if (n.alignDelimiters !== !1) {
        const b = s[c] - (P[c] || 0),
          S = l[c];
        S === 114
          ? (y = " ".repeat(b))
          : S === 99
            ? b % 2
              ? ((y = " ".repeat(b / 2 + 0.5)), (E = " ".repeat(b / 2 - 0.5)))
              : ((y = " ".repeat(b / 2)), (E = y))
            : (E = " ".repeat(b));
      }
      (n.delimiterStart !== !1 && !c && h.push("|"),
        n.padding !== !1 &&
          !(n.alignDelimiters === !1 && g === "") &&
          (n.delimiterStart !== !1 || c) &&
          h.push(" "),
        n.alignDelimiters !== !1 && h.push(y),
        h.push(g),
        n.alignDelimiters !== !1 && h.push(E),
        n.padding !== !1 && h.push(" "),
        (n.delimiterEnd !== !1 || c !== a - 1) && h.push("|"));
    }
    m.push(n.delimiterEnd === !1 ? h.join("").replace(/ +$/, "") : h.join(""));
  }
  return m.join(`
`);
}
function cw(e) {
  return e == null ? "" : String(e);
}
function zf(e) {
  const t = typeof e == "string" ? e.codePointAt(0) : 0;
  return t === 67 || t === 99
    ? 99
    : t === 76 || t === 108
      ? 108
      : t === 82 || t === 114
        ? 114
        : 0;
}
function fw(e, t, n, r) {
  const i = n.enter("blockquote"),
    l = n.createTracker(r);
  (l.move("> "), l.shift(2));
  const o = n.indentLines(n.containerFlow(e, l.current()), pw);
  return (i(), o);
}
function pw(e, t, n) {
  return ">" + (n ? "" : " ") + e;
}
function dw(e, t) {
  return If(e, t.inConstruct, !0) && !If(e, t.notInConstruct, !1);
}
function If(e, t, n) {
  if ((typeof t == "string" && (t = [t]), !t || t.length === 0)) return n;
  let r = -1;
  for (; ++r < t.length; ) if (e.includes(t[r])) return !0;
  return !1;
}
function jf(e, t, n, r) {
  let i = -1;
  for (; ++i < n.unsafe.length; )
    if (
      n.unsafe[i].character ===
        `
` &&
      dw(n.stack, n.unsafe[i])
    )
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function hw(e, t) {
  const n = String(e);
  let r = n.indexOf(t),
    i = r,
    l = 0,
    o = 0;
  if (typeof t != "string") throw new TypeError("Expected substring");
  for (; r !== -1; )
    (r === i ? ++l > o && (o = l) : (l = 1),
      (i = r + t.length),
      (r = n.indexOf(t, i)));
  return o;
}
function mw(e, t) {
  return !!(
    t.options.fences === !1 &&
    e.value &&
    !e.lang &&
    /[^ \r\n]/.test(e.value) &&
    !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value)
  );
}
function gw(e) {
  const t = e.options.fence || "`";
  if (t !== "`" && t !== "~")
    throw new Error(
      "Cannot serialize code with `" +
        t +
        "` for `options.fence`, expected `` ` `` or `~`",
    );
  return t;
}
function yw(e, t, n, r) {
  const i = gw(n),
    l = e.value || "",
    o = i === "`" ? "GraveAccent" : "Tilde";
  if (mw(e, n)) {
    const c = n.enter("codeIndented"),
      d = n.indentLines(l, xw);
    return (c(), d);
  }
  const u = n.createTracker(r),
    s = i.repeat(Math.max(hw(l, i) + 1, 3)),
    a = n.enter("codeFenced");
  let f = u.move(s);
  if (e.lang) {
    const c = n.enter(`codeFencedLang${o}`);
    ((f += u.move(
      n.safe(e.lang, { before: f, after: " ", encode: ["`"], ...u.current() }),
    )),
      c());
  }
  if (e.lang && e.meta) {
    const c = n.enter(`codeFencedMeta${o}`);
    ((f += u.move(" ")),
      (f += u.move(
        n.safe(e.meta, {
          before: f,
          after: `
`,
          encode: ["`"],
          ...u.current(),
        }),
      )),
      c());
  }
  return (
    (f += u.move(`
`)),
    l &&
      (f += u.move(
        l +
          `
`,
      )),
    (f += u.move(s)),
    a(),
    f
  );
}
function xw(e, t, n) {
  return (n ? "" : "    ") + e;
}
function Ca(e) {
  const t = e.options.quote || '"';
  if (t !== '"' && t !== "'")
    throw new Error(
      "Cannot serialize title with `" +
        t +
        "` for `options.quote`, expected `\"`, or `'`",
    );
  return t;
}
function kw(e, t, n, r) {
  const i = Ca(n),
    l = i === '"' ? "Quote" : "Apostrophe",
    o = n.enter("definition");
  let u = n.enter("label");
  const s = n.createTracker(r);
  let a = s.move("[");
  return (
    (a += s.move(
      n.safe(n.associationId(e), { before: a, after: "]", ...s.current() }),
    )),
    (a += s.move("]: ")),
    u(),
    !e.url || /[\0- \u007F]/.test(e.url)
      ? ((u = n.enter("destinationLiteral")),
        (a += s.move("<")),
        (a += s.move(n.safe(e.url, { before: a, after: ">", ...s.current() }))),
        (a += s.move(">")))
      : ((u = n.enter("destinationRaw")),
        (a += s.move(
          n.safe(e.url, {
            before: a,
            after: e.title
              ? " "
              : `
`,
            ...s.current(),
          }),
        ))),
    u(),
    e.title &&
      ((u = n.enter(`title${l}`)),
      (a += s.move(" " + i)),
      (a += s.move(n.safe(e.title, { before: a, after: i, ...s.current() }))),
      (a += s.move(i)),
      u()),
    o(),
    a
  );
}
function vw(e) {
  const t = e.options.emphasis || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" +
        t +
        "` for `options.emphasis`, expected `*`, or `_`",
    );
  return t;
}
function gi(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function $l(e, t, n) {
  const r = kr(e),
    i = kr(t);
  return r === void 0
    ? i === void 0
      ? n === "_"
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !1 }
      : i === 1
        ? { inside: !0, outside: !0 }
        : { inside: !1, outside: !0 }
    : r === 1
      ? i === void 0
        ? { inside: !1, outside: !1 }
        : i === 1
          ? { inside: !0, outside: !0 }
          : { inside: !1, outside: !1 }
      : i === void 0
        ? { inside: !1, outside: !1 }
        : i === 1
          ? { inside: !0, outside: !1 }
          : { inside: !1, outside: !1 };
}
Fh.peek = ww;
function Fh(e, t, n, r) {
  const i = vw(n),
    l = n.enter("emphasis"),
    o = n.createTracker(r),
    u = o.move(i);
  let s = o.move(
    n.containerPhrasing(e, { after: i, before: u, ...o.current() }),
  );
  const a = s.charCodeAt(0),
    f = $l(r.before.charCodeAt(r.before.length - 1), a, i);
  f.inside && (s = gi(a) + s.slice(1));
  const c = s.charCodeAt(s.length - 1),
    d = $l(r.after.charCodeAt(0), c, i);
  d.inside && (s = s.slice(0, -1) + gi(c));
  const p = o.move(i);
  return (
    l(),
    (n.attentionEncodeSurroundingInfo = {
      after: d.outside,
      before: f.outside,
    }),
    u + s + p
  );
}
function ww(e, t, n) {
  return n.options.emphasis || "*";
}
function Sw(e, t) {
  let n = !1;
  return (
    wa(e, function (r) {
      if (("value" in r && /\r?\n|\r/.test(r.value)) || r.type === "break")
        return ((n = !0), ls);
    }),
    !!((!e.depth || e.depth < 3) && ha(e) && (t.options.setext || n))
  );
}
function Cw(e, t, n, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1),
    l = n.createTracker(r);
  if (Sw(e, n)) {
    const f = n.enter("headingSetext"),
      c = n.enter("phrasing"),
      d = n.containerPhrasing(e, {
        ...l.current(),
        before: `
`,
        after: `
`,
      });
    return (
      c(),
      f(),
      d +
        `
` +
        (i === 1 ? "=" : "-").repeat(
          d.length -
            (Math.max(
              d.lastIndexOf("\r"),
              d.lastIndexOf(`
`),
            ) +
              1),
        )
    );
  }
  const o = "#".repeat(i),
    u = n.enter("headingAtx"),
    s = n.enter("phrasing");
  l.move(o + " ");
  let a = n.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...l.current(),
  });
  return (
    /^[\t ]/.test(a) && (a = gi(a.charCodeAt(0)) + a.slice(1)),
    (a = a ? o + " " + a : o),
    n.options.closeAtx && (a += " " + o),
    s(),
    u(),
    a
  );
}
Oh.peek = Ew;
function Oh(e) {
  return e.value || "";
}
function Ew() {
  return "<";
}
Mh.peek = bw;
function Mh(e, t, n, r) {
  const i = Ca(n),
    l = i === '"' ? "Quote" : "Apostrophe",
    o = n.enter("image");
  let u = n.enter("label");
  const s = n.createTracker(r);
  let a = s.move("![");
  return (
    (a += s.move(n.safe(e.alt, { before: a, after: "]", ...s.current() }))),
    (a += s.move("](")),
    u(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((u = n.enter("destinationLiteral")),
        (a += s.move("<")),
        (a += s.move(n.safe(e.url, { before: a, after: ">", ...s.current() }))),
        (a += s.move(">")))
      : ((u = n.enter("destinationRaw")),
        (a += s.move(
          n.safe(e.url, {
            before: a,
            after: e.title ? " " : ")",
            ...s.current(),
          }),
        ))),
    u(),
    e.title &&
      ((u = n.enter(`title${l}`)),
      (a += s.move(" " + i)),
      (a += s.move(n.safe(e.title, { before: a, after: i, ...s.current() }))),
      (a += s.move(i)),
      u()),
    (a += s.move(")")),
    o(),
    a
  );
}
function bw() {
  return "!";
}
Bh.peek = Nw;
function Bh(e, t, n, r) {
  const i = e.referenceType,
    l = n.enter("imageReference");
  let o = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("![");
  const a = n.safe(e.alt, { before: s, after: "]", ...u.current() });
  ((s += u.move(a + "][")), o());
  const f = n.stack;
  ((n.stack = []), (o = n.enter("reference")));
  const c = n.safe(n.associationId(e), {
    before: s,
    after: "]",
    ...u.current(),
  });
  return (
    o(),
    (n.stack = f),
    l(),
    i === "full" || !a || a !== c
      ? (s += u.move(c + "]"))
      : i === "shortcut"
        ? (s = s.slice(0, -1))
        : (s += u.move("]")),
    s
  );
}
function Nw() {
  return "!";
}
$h.peek = Pw;
function $h(e, t, n) {
  let r = e.value || "",
    i = "`",
    l = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); ) i += "`";
  for (
    /[^ \r\n]/.test(r) &&
    ((/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r)) || /^`|`$/.test(r)) &&
    (r = " " + r + " ");
    ++l < n.unsafe.length;

  ) {
    const o = n.unsafe[l],
      u = n.compilePattern(o);
    let s;
    if (o.atBreak)
      for (; (s = u.exec(r)); ) {
        let a = s.index;
        (r.charCodeAt(a) === 10 && r.charCodeAt(a - 1) === 13 && a--,
          (r = r.slice(0, a) + " " + r.slice(s.index + 1)));
      }
  }
  return i + r + i;
}
function Pw() {
  return "`";
}
function Uh(e, t) {
  const n = ha(e);
  return !!(
    !t.options.resourceLink &&
    e.url &&
    !e.title &&
    e.children &&
    e.children.length === 1 &&
    e.children[0].type === "text" &&
    (n === e.url || "mailto:" + n === e.url) &&
    /^[a-z][a-z+.-]+:/i.test(e.url) &&
    !/[\0- <>\u007F]/.test(e.url)
  );
}
Hh.peek = Lw;
function Hh(e, t, n, r) {
  const i = Ca(n),
    l = i === '"' ? "Quote" : "Apostrophe",
    o = n.createTracker(r);
  let u, s;
  if (Uh(e, n)) {
    const f = n.stack;
    ((n.stack = []), (u = n.enter("autolink")));
    let c = o.move("<");
    return (
      (c += o.move(
        n.containerPhrasing(e, { before: c, after: ">", ...o.current() }),
      )),
      (c += o.move(">")),
      u(),
      (n.stack = f),
      c
    );
  }
  ((u = n.enter("link")), (s = n.enter("label")));
  let a = o.move("[");
  return (
    (a += o.move(
      n.containerPhrasing(e, { before: a, after: "](", ...o.current() }),
    )),
    (a += o.move("](")),
    s(),
    (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
      ? ((s = n.enter("destinationLiteral")),
        (a += o.move("<")),
        (a += o.move(n.safe(e.url, { before: a, after: ">", ...o.current() }))),
        (a += o.move(">")))
      : ((s = n.enter("destinationRaw")),
        (a += o.move(
          n.safe(e.url, {
            before: a,
            after: e.title ? " " : ")",
            ...o.current(),
          }),
        ))),
    s(),
    e.title &&
      ((s = n.enter(`title${l}`)),
      (a += o.move(" " + i)),
      (a += o.move(n.safe(e.title, { before: a, after: i, ...o.current() }))),
      (a += o.move(i)),
      s()),
    (a += o.move(")")),
    u(),
    a
  );
}
function Lw(e, t, n) {
  return Uh(e, n) ? "<" : "[";
}
Vh.peek = Tw;
function Vh(e, t, n, r) {
  const i = e.referenceType,
    l = n.enter("linkReference");
  let o = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("[");
  const a = n.containerPhrasing(e, { before: s, after: "]", ...u.current() });
  ((s += u.move(a + "][")), o());
  const f = n.stack;
  ((n.stack = []), (o = n.enter("reference")));
  const c = n.safe(n.associationId(e), {
    before: s,
    after: "]",
    ...u.current(),
  });
  return (
    o(),
    (n.stack = f),
    l(),
    i === "full" || !a || a !== c
      ? (s += u.move(c + "]"))
      : i === "shortcut"
        ? (s = s.slice(0, -1))
        : (s += u.move("]")),
    s
  );
}
function Tw() {
  return "[";
}
function Ea(e) {
  const t = e.options.bullet || "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        t +
        "` for `options.bullet`, expected `*`, `+`, or `-`",
    );
  return t;
}
function _w(e) {
  const t = Ea(e),
    n = e.options.bulletOther;
  if (!n) return t === "*" ? "-" : "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" +
        n +
        "` for `options.bulletOther`, expected `*`, `+`, or `-`",
    );
  if (n === t)
    throw new Error(
      "Expected `bullet` (`" +
        t +
        "`) and `bulletOther` (`" +
        n +
        "`) to be different",
    );
  return n;
}
function zw(e) {
  const t = e.options.bulletOrdered || ".";
  if (t !== "." && t !== ")")
    throw new Error(
      "Cannot serialize items with `" +
        t +
        "` for `options.bulletOrdered`, expected `.` or `)`",
    );
  return t;
}
function Wh(e) {
  const t = e.options.rule || "*";
  if (t !== "*" && t !== "-" && t !== "_")
    throw new Error(
      "Cannot serialize rules with `" +
        t +
        "` for `options.rule`, expected `*`, `-`, or `_`",
    );
  return t;
}
function Iw(e, t, n, r) {
  const i = n.enter("list"),
    l = n.bulletCurrent;
  let o = e.ordered ? zw(n) : Ea(n);
  const u = e.ordered ? (o === "." ? ")" : ".") : _w(n);
  let s = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      ((o === "*" || o === "-") &&
        f &&
        (!f.children || !f.children[0]) &&
        n.stack[n.stack.length - 1] === "list" &&
        n.stack[n.stack.length - 2] === "listItem" &&
        n.stack[n.stack.length - 3] === "list" &&
        n.stack[n.stack.length - 4] === "listItem" &&
        n.indexStack[n.indexStack.length - 1] === 0 &&
        n.indexStack[n.indexStack.length - 2] === 0 &&
        n.indexStack[n.indexStack.length - 3] === 0 &&
        (s = !0),
      Wh(n) === o && f)
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const d = e.children[c];
        if (
          d &&
          d.type === "listItem" &&
          d.children &&
          d.children[0] &&
          d.children[0].type === "thematicBreak"
        ) {
          s = !0;
          break;
        }
      }
    }
  }
  (s && (o = u), (n.bulletCurrent = o));
  const a = n.containerFlow(e, r);
  return ((n.bulletLastUsed = o), (n.bulletCurrent = l), i(), a);
}
function jw(e) {
  const t = e.options.listItemIndent || "one";
  if (t !== "tab" && t !== "one" && t !== "mixed")
    throw new Error(
      "Cannot serialize items with `" +
        t +
        "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`",
    );
  return t;
}
function Dw(e, t, n, r) {
  const i = jw(n);
  let l = n.bulletCurrent || Ea(n);
  t &&
    t.type === "list" &&
    t.ordered &&
    (l =
      (typeof t.start == "number" && t.start > -1 ? t.start : 1) +
      (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) +
      l);
  let o = l.length + 1;
  (i === "tab" ||
    (i === "mixed" && ((t && t.type === "list" && t.spread) || e.spread))) &&
    (o = Math.ceil(o / 4) * 4);
  const u = n.createTracker(r);
  (u.move(l + " ".repeat(o - l.length)), u.shift(o));
  const s = n.enter("listItem"),
    a = n.indentLines(n.containerFlow(e, u.current()), f);
  return (s(), a);
  function f(c, d, p) {
    return d
      ? (p ? "" : " ".repeat(o)) + c
      : (p ? l : l + " ".repeat(o - l.length)) + c;
  }
}
function Aw(e, t, n, r) {
  const i = n.enter("paragraph"),
    l = n.enter("phrasing"),
    o = n.containerPhrasing(e, r);
  return (l(), i(), o);
}
const Rw = so([
  "break",
  "delete",
  "emphasis",
  "footnote",
  "footnoteReference",
  "image",
  "imageReference",
  "inlineCode",
  "inlineMath",
  "link",
  "linkReference",
  "mdxJsxTextElement",
  "mdxTextExpression",
  "strong",
  "text",
  "textDirective",
]);
function Fw(e, t, n, r) {
  return (
    e.children.some(function (o) {
      return Rw(o);
    })
      ? n.containerPhrasing
      : n.containerFlow
  ).call(n, e, r);
}
function Ow(e) {
  const t = e.options.strong || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize strong with `" +
        t +
        "` for `options.strong`, expected `*`, or `_`",
    );
  return t;
}
Qh.peek = Mw;
function Qh(e, t, n, r) {
  const i = Ow(n),
    l = n.enter("strong"),
    o = n.createTracker(r),
    u = o.move(i + i);
  let s = o.move(
    n.containerPhrasing(e, { after: i, before: u, ...o.current() }),
  );
  const a = s.charCodeAt(0),
    f = $l(r.before.charCodeAt(r.before.length - 1), a, i);
  f.inside && (s = gi(a) + s.slice(1));
  const c = s.charCodeAt(s.length - 1),
    d = $l(r.after.charCodeAt(0), c, i);
  d.inside && (s = s.slice(0, -1) + gi(c));
  const p = o.move(i + i);
  return (
    l(),
    (n.attentionEncodeSurroundingInfo = {
      after: d.outside,
      before: f.outside,
    }),
    u + s + p
  );
}
function Mw(e, t, n) {
  return n.options.strong || "*";
}
function Bw(e, t, n, r) {
  return n.safe(e.value, r);
}
function $w(e) {
  const t = e.options.ruleRepetition || 3;
  if (t < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" +
        t +
        "` for `options.ruleRepetition`, expected `3` or more",
    );
  return t;
}
function Uw(e, t, n) {
  const r = (Wh(n) + (n.options.ruleSpaces ? " " : "")).repeat($w(n));
  return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
const qh = {
  blockquote: fw,
  break: jf,
  code: yw,
  definition: kw,
  emphasis: Fh,
  hardBreak: jf,
  heading: Cw,
  html: Oh,
  image: Mh,
  imageReference: Bh,
  inlineCode: $h,
  link: Hh,
  linkReference: Vh,
  list: Iw,
  listItem: Dw,
  paragraph: Aw,
  root: Fw,
  strong: Qh,
  text: Bw,
  thematicBreak: Uw,
};
function Hw() {
  return {
    enter: { table: Vw, tableData: Df, tableHeader: Df, tableRow: Qw },
    exit: {
      codeText: qw,
      table: Ww,
      tableData: eu,
      tableHeader: eu,
      tableRow: eu,
    },
  };
}
function Vw(e) {
  const t = e._align;
  (this.enter(
    {
      type: "table",
      align: t.map(function (n) {
        return n === "none" ? null : n;
      }),
      children: [],
    },
    e,
  ),
    (this.data.inTable = !0));
}
function Ww(e) {
  (this.exit(e), (this.data.inTable = void 0));
}
function Qw(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function eu(e) {
  this.exit(e);
}
function Df(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function qw(e) {
  let t = this.resume();
  this.data.inTable && (t = t.replace(/\\([\\|])/g, Kw));
  const n = this.stack[this.stack.length - 1];
  (n.type, (n.value = t), this.exit(e));
}
function Kw(e, t) {
  return t === "|" ? t : e;
}
function Yw(e) {
  const t = e || {},
    n = t.tableCellPadding,
    r = t.tablePipeAlign,
    i = t.stringLength,
    l = n ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      {
        character: `
`,
        inConstruct: "tableCell",
      },
      { atBreak: !0, character: "|", after: "[	 :-]" },
      { character: "|", inConstruct: "tableCell" },
      { atBreak: !0, character: ":", after: "-" },
      { atBreak: !0, character: "-", after: "[:|-]" },
    ],
    handlers: { inlineCode: d, table: o, tableCell: s, tableRow: u },
  };
  function o(p, m, k, P) {
    return a(f(p, k, P), p.align);
  }
  function u(p, m, k, P) {
    const h = c(p, k, P),
      g = a([h]);
    return g.slice(
      0,
      g.indexOf(`
`),
    );
  }
  function s(p, m, k, P) {
    const h = k.enter("tableCell"),
      g = k.enter("phrasing"),
      y = k.containerPhrasing(p, { ...P, before: l, after: l });
    return (g(), h(), y);
  }
  function a(p, m) {
    return aw(p, { align: m, alignDelimiters: r, padding: n, stringLength: i });
  }
  function f(p, m, k) {
    const P = p.children;
    let h = -1;
    const g = [],
      y = m.enter("table");
    for (; ++h < P.length; ) g[h] = c(P[h], m, k);
    return (y(), g);
  }
  function c(p, m, k) {
    const P = p.children;
    let h = -1;
    const g = [],
      y = m.enter("tableRow");
    for (; ++h < P.length; ) g[h] = s(P[h], p, m, k);
    return (y(), g);
  }
  function d(p, m, k) {
    let P = qh.inlineCode(p, m, k);
    return (k.stack.includes("tableCell") && (P = P.replace(/\|/g, "\\$&")), P);
  }
}
function Xw() {
  return {
    exit: {
      taskListCheckValueChecked: Af,
      taskListCheckValueUnchecked: Af,
      paragraph: Zw,
    },
  };
}
function Gw() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: Jw },
  };
}
function Af(e) {
  const t = this.stack[this.stack.length - 2];
  (t.type, (t.checked = e.type === "taskListCheckValueChecked"));
}
function Zw(e) {
  const t = this.stack[this.stack.length - 2];
  if (t && t.type === "listItem" && typeof t.checked == "boolean") {
    const n = this.stack[this.stack.length - 1];
    n.type;
    const r = n.children[0];
    if (r && r.type === "text") {
      const i = t.children;
      let l = -1,
        o;
      for (; ++l < i.length; ) {
        const u = i[l];
        if (u.type === "paragraph") {
          o = u;
          break;
        }
      }
      o === n &&
        ((r.value = r.value.slice(1)),
        r.value.length === 0
          ? n.children.shift()
          : n.position &&
            r.position &&
            typeof r.position.start.offset == "number" &&
            (r.position.start.column++,
            r.position.start.offset++,
            (n.position.start = Object.assign({}, r.position.start))));
    }
  }
  this.exit(e);
}
function Jw(e, t, n, r) {
  const i = e.children[0],
    l = typeof e.checked == "boolean" && i && i.type === "paragraph",
    o = "[" + (e.checked ? "x" : " ") + "] ",
    u = n.createTracker(r);
  l && u.move(o);
  let s = qh.listItem(e, t, n, { ...r, ...u.current() });
  return (l && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, a)), s);
  function a(f) {
    return f + o;
  }
}
function eS() {
  return [Iv(), Jv(), rw(), Hw(), Xw()];
}
function tS(e) {
  return { extensions: [jv(), ew(e), iw(), Yw(e), Gw()] };
}
const nS = { tokenize: sS, partial: !0 },
  Kh = { tokenize: aS, partial: !0 },
  Yh = { tokenize: cS, partial: !0 },
  Xh = { tokenize: fS, partial: !0 },
  rS = { tokenize: pS, partial: !0 },
  Gh = { name: "wwwAutolink", tokenize: oS, previous: Jh },
  Zh = { name: "protocolAutolink", tokenize: uS, previous: em },
  Gt = { name: "emailAutolink", tokenize: lS, previous: tm },
  Mt = {};
function iS() {
  return { text: Mt };
}
let bn = 48;
for (; bn < 123; )
  ((Mt[bn] = Gt), bn++, bn === 58 ? (bn = 65) : bn === 91 && (bn = 97));
Mt[43] = Gt;
Mt[45] = Gt;
Mt[46] = Gt;
Mt[95] = Gt;
Mt[72] = [Gt, Zh];
Mt[104] = [Gt, Zh];
Mt[87] = [Gt, Gh];
Mt[119] = [Gt, Gh];
function lS(e, t, n) {
  const r = this;
  let i, l;
  return o;
  function o(c) {
    return !as(c) || !tm.call(r, r.previous) || ba(r.events)
      ? n(c)
      : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), u(c));
  }
  function u(c) {
    return as(c) ? (e.consume(c), u) : c === 64 ? (e.consume(c), s) : n(c);
  }
  function s(c) {
    return c === 46
      ? e.check(rS, f, a)(c)
      : c === 45 || c === 95 || je(c)
        ? ((l = !0), e.consume(c), s)
        : f(c);
  }
  function a(c) {
    return (e.consume(c), (i = !0), s);
  }
  function f(c) {
    return l && i && Be(r.previous)
      ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(c))
      : n(c);
  }
}
function oS(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return (o !== 87 && o !== 119) || !Jh.call(r, r.previous) || ba(r.events)
      ? n(o)
      : (e.enter("literalAutolink"),
        e.enter("literalAutolinkWww"),
        e.check(nS, e.attempt(Kh, e.attempt(Yh, l), n), n)(o));
  }
  function l(o) {
    return (e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(o));
  }
}
function uS(e, t, n) {
  const r = this;
  let i = "",
    l = !1;
  return o;
  function o(c) {
    return (c === 72 || c === 104) && em.call(r, r.previous) && !ba(r.events)
      ? (e.enter("literalAutolink"),
        e.enter("literalAutolinkHttp"),
        (i += String.fromCodePoint(c)),
        e.consume(c),
        u)
      : n(c);
  }
  function u(c) {
    if (Be(c) && i.length < 5)
      return ((i += String.fromCodePoint(c)), e.consume(c), u);
    if (c === 58) {
      const d = i.toLowerCase();
      if (d === "http" || d === "https") return (e.consume(c), s);
    }
    return n(c);
  }
  function s(c) {
    return c === 47 ? (e.consume(c), l ? a : ((l = !0), s)) : n(c);
  }
  function a(c) {
    return c === null || Ol(c) || ae(c) || Mn(c) || lo(c)
      ? n(c)
      : e.attempt(Kh, e.attempt(Yh, f), n)(c);
  }
  function f(c) {
    return (e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(c));
  }
}
function sS(e, t, n) {
  let r = 0;
  return i;
  function i(o) {
    return (o === 87 || o === 119) && r < 3
      ? (r++, e.consume(o), i)
      : o === 46 && r === 3
        ? (e.consume(o), l)
        : n(o);
  }
  function l(o) {
    return o === null ? n(o) : t(o);
  }
}
function aS(e, t, n) {
  let r, i, l;
  return o;
  function o(a) {
    return a === 46 || a === 95
      ? e.check(Xh, s, u)(a)
      : a === null || ae(a) || Mn(a) || (a !== 45 && lo(a))
        ? s(a)
        : ((l = !0), e.consume(a), o);
  }
  function u(a) {
    return (a === 95 ? (r = !0) : ((i = r), (r = void 0)), e.consume(a), o);
  }
  function s(a) {
    return i || r || !l ? n(a) : t(a);
  }
}
function cS(e, t) {
  let n = 0,
    r = 0;
  return i;
  function i(o) {
    return o === 40
      ? (n++, e.consume(o), i)
      : o === 41 && r < n
        ? l(o)
        : o === 33 ||
            o === 34 ||
            o === 38 ||
            o === 39 ||
            o === 41 ||
            o === 42 ||
            o === 44 ||
            o === 46 ||
            o === 58 ||
            o === 59 ||
            o === 60 ||
            o === 63 ||
            o === 93 ||
            o === 95 ||
            o === 126
          ? e.check(Xh, t, l)(o)
          : o === null || ae(o) || Mn(o)
            ? t(o)
            : (e.consume(o), i);
  }
  function l(o) {
    return (o === 41 && r++, e.consume(o), i);
  }
}
function fS(e, t, n) {
  return r;
  function r(u) {
    return u === 33 ||
      u === 34 ||
      u === 39 ||
      u === 41 ||
      u === 42 ||
      u === 44 ||
      u === 46 ||
      u === 58 ||
      u === 59 ||
      u === 63 ||
      u === 95 ||
      u === 126
      ? (e.consume(u), r)
      : u === 38
        ? (e.consume(u), l)
        : u === 93
          ? (e.consume(u), i)
          : u === 60 || u === null || ae(u) || Mn(u)
            ? t(u)
            : n(u);
  }
  function i(u) {
    return u === null || u === 40 || u === 91 || ae(u) || Mn(u) ? t(u) : r(u);
  }
  function l(u) {
    return Be(u) ? o(u) : n(u);
  }
  function o(u) {
    return u === 59 ? (e.consume(u), r) : Be(u) ? (e.consume(u), o) : n(u);
  }
}
function pS(e, t, n) {
  return r;
  function r(l) {
    return (e.consume(l), i);
  }
  function i(l) {
    return je(l) ? n(l) : t(l);
  }
}
function Jh(e) {
  return (
    e === null ||
    e === 40 ||
    e === 42 ||
    e === 95 ||
    e === 91 ||
    e === 93 ||
    e === 126 ||
    ae(e)
  );
}
function em(e) {
  return !Be(e);
}
function tm(e) {
  return !(e === 47 || as(e));
}
function as(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || je(e);
}
function ba(e) {
  let t = e.length,
    n = !1;
  for (; t--; ) {
    const r = e[t][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = !1;
      break;
    }
  }
  return (
    e.length > 0 &&
      !n &&
      (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0),
    n
  );
}
const dS = { tokenize: wS, partial: !0 };
function hS() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: xS,
        continuation: { tokenize: kS },
        exit: vS,
      },
    },
    text: {
      91: { name: "gfmFootnoteCall", tokenize: yS },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: mS,
        resolveTo: gS,
      },
    },
  };
}
function mS(e, t, n) {
  const r = this;
  let i = r.events.length;
  const l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o;
  for (; i--; ) {
    const s = r.events[i][1];
    if (s.type === "labelImage") {
      o = s;
      break;
    }
    if (
      s.type === "gfmFootnoteCall" ||
      s.type === "labelLink" ||
      s.type === "label" ||
      s.type === "image" ||
      s.type === "link"
    )
      break;
  }
  return u;
  function u(s) {
    if (!o || !o._balanced) return n(s);
    const a = Lt(r.sliceSerialize({ start: o.end, end: r.now() }));
    return a.codePointAt(0) !== 94 || !l.includes(a.slice(1))
      ? n(s)
      : (e.enter("gfmFootnoteCallLabelMarker"),
        e.consume(s),
        e.exit("gfmFootnoteCallLabelMarker"),
        t(s));
  }
}
function gS(e, t) {
  let n = e.length;
  for (; n--; )
    if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
      e[n][1];
      break;
    }
  ((e[n + 1][1].type = "data"),
    (e[n + 3][1].type = "gfmFootnoteCallLabelMarker"));
  const r = {
      type: "gfmFootnoteCall",
      start: Object.assign({}, e[n + 3][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    i = {
      type: "gfmFootnoteCallMarker",
      start: Object.assign({}, e[n + 3][1].end),
      end: Object.assign({}, e[n + 3][1].end),
    };
  (i.end.column++, i.end.offset++, i.end._bufferIndex++);
  const l = {
      type: "gfmFootnoteCallString",
      start: Object.assign({}, i.end),
      end: Object.assign({}, e[e.length - 1][1].start),
    },
    o = {
      type: "chunkString",
      contentType: "string",
      start: Object.assign({}, l.start),
      end: Object.assign({}, l.end),
    },
    u = [
      e[n + 1],
      e[n + 2],
      ["enter", r, t],
      e[n + 3],
      e[n + 4],
      ["enter", i, t],
      ["exit", i, t],
      ["enter", l, t],
      ["enter", o, t],
      ["exit", o, t],
      ["exit", l, t],
      e[e.length - 2],
      e[e.length - 1],
      ["exit", r, t],
    ];
  return (e.splice(n, e.length - n + 1, ...u), e);
}
function yS(e, t, n) {
  const r = this,
    i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l = 0,
    o;
  return u;
  function u(c) {
    return (
      e.enter("gfmFootnoteCall"),
      e.enter("gfmFootnoteCallLabelMarker"),
      e.consume(c),
      e.exit("gfmFootnoteCallLabelMarker"),
      s
    );
  }
  function s(c) {
    return c !== 94
      ? n(c)
      : (e.enter("gfmFootnoteCallMarker"),
        e.consume(c),
        e.exit("gfmFootnoteCallMarker"),
        e.enter("gfmFootnoteCallString"),
        (e.enter("chunkString").contentType = "string"),
        a);
  }
  function a(c) {
    if (l > 999 || (c === 93 && !o) || c === null || c === 91 || ae(c))
      return n(c);
    if (c === 93) {
      e.exit("chunkString");
      const d = e.exit("gfmFootnoteCallString");
      return i.includes(Lt(r.sliceSerialize(d)))
        ? (e.enter("gfmFootnoteCallLabelMarker"),
          e.consume(c),
          e.exit("gfmFootnoteCallLabelMarker"),
          e.exit("gfmFootnoteCall"),
          t)
        : n(c);
    }
    return (ae(c) || (o = !0), l++, e.consume(c), c === 92 ? f : a);
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), l++, a) : a(c);
  }
}
function xS(e, t, n) {
  const r = this,
    i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l,
    o = 0,
    u;
  return s;
  function s(m) {
    return (
      (e.enter("gfmFootnoteDefinition")._container = !0),
      e.enter("gfmFootnoteDefinitionLabel"),
      e.enter("gfmFootnoteDefinitionLabelMarker"),
      e.consume(m),
      e.exit("gfmFootnoteDefinitionLabelMarker"),
      a
    );
  }
  function a(m) {
    return m === 94
      ? (e.enter("gfmFootnoteDefinitionMarker"),
        e.consume(m),
        e.exit("gfmFootnoteDefinitionMarker"),
        e.enter("gfmFootnoteDefinitionLabelString"),
        (e.enter("chunkString").contentType = "string"),
        f)
      : n(m);
  }
  function f(m) {
    if (o > 999 || (m === 93 && !u) || m === null || m === 91 || ae(m))
      return n(m);
    if (m === 93) {
      e.exit("chunkString");
      const k = e.exit("gfmFootnoteDefinitionLabelString");
      return (
        (l = Lt(r.sliceSerialize(k))),
        e.enter("gfmFootnoteDefinitionLabelMarker"),
        e.consume(m),
        e.exit("gfmFootnoteDefinitionLabelMarker"),
        e.exit("gfmFootnoteDefinitionLabel"),
        d
      );
    }
    return (ae(m) || (u = !0), o++, e.consume(m), m === 92 ? c : f);
  }
  function c(m) {
    return m === 91 || m === 92 || m === 93 ? (e.consume(m), o++, f) : f(m);
  }
  function d(m) {
    return m === 58
      ? (e.enter("definitionMarker"),
        e.consume(m),
        e.exit("definitionMarker"),
        i.includes(l) || i.push(l),
        ne(e, p, "gfmFootnoteDefinitionWhitespace"))
      : n(m);
  }
  function p(m) {
    return t(m);
  }
}
function kS(e, t, n) {
  return e.check(Ci, t, e.attempt(dS, t, n));
}
function vS(e) {
  e.exit("gfmFootnoteDefinition");
}
function wS(e, t, n) {
  const r = this;
  return ne(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o &&
      o[1].type === "gfmFootnoteDefinitionIndent" &&
      o[2].sliceSerialize(o[1], !0).length === 4
      ? t(l)
      : n(l);
  }
}
function SS(e) {
  let n = (e || {}).singleTilde;
  const r = { name: "strikethrough", tokenize: l, resolveAll: i };
  return (
    n == null && (n = !0),
    {
      text: { 126: r },
      insideSpan: { null: [r] },
      attentionMarkers: { null: [126] },
    }
  );
  function i(o, u) {
    let s = -1;
    for (; ++s < o.length; )
      if (
        o[s][0] === "enter" &&
        o[s][1].type === "strikethroughSequenceTemporary" &&
        o[s][1]._close
      ) {
        let a = s;
        for (; a--; )
          if (
            o[a][0] === "exit" &&
            o[a][1].type === "strikethroughSequenceTemporary" &&
            o[a][1]._open &&
            o[s][1].end.offset - o[s][1].start.offset ===
              o[a][1].end.offset - o[a][1].start.offset
          ) {
            ((o[s][1].type = "strikethroughSequence"),
              (o[a][1].type = "strikethroughSequence"));
            const f = {
                type: "strikethrough",
                start: Object.assign({}, o[a][1].start),
                end: Object.assign({}, o[s][1].end),
              },
              c = {
                type: "strikethroughText",
                start: Object.assign({}, o[a][1].end),
                end: Object.assign({}, o[s][1].start),
              },
              d = [
                ["enter", f, u],
                ["enter", o[a][1], u],
                ["exit", o[a][1], u],
                ["enter", c, u],
              ],
              p = u.parser.constructs.insideSpan.null;
            (p && nt(d, d.length, 0, oo(p, o.slice(a + 1, s), u)),
              nt(d, d.length, 0, [
                ["exit", c, u],
                ["enter", o[s][1], u],
                ["exit", o[s][1], u],
                ["exit", f, u],
              ]),
              nt(o, a - 1, s - a + 3, d),
              (s = a + d.length - 2));
            break;
          }
      }
    for (s = -1; ++s < o.length; )
      o[s][1].type === "strikethroughSequenceTemporary" &&
        (o[s][1].type = "data");
    return o;
  }
  function l(o, u, s) {
    const a = this.previous,
      f = this.events;
    let c = 0;
    return d;
    function d(m) {
      return a === 126 && f[f.length - 1][1].type !== "characterEscape"
        ? s(m)
        : (o.enter("strikethroughSequenceTemporary"), p(m));
    }
    function p(m) {
      const k = kr(a);
      if (m === 126) return c > 1 ? s(m) : (o.consume(m), c++, p);
      if (c < 2 && !n) return s(m);
      const P = o.exit("strikethroughSequenceTemporary"),
        h = kr(m);
      return (
        (P._open = !h || (h === 2 && !!k)),
        (P._close = !k || (k === 2 && !!h)),
        u(m)
      );
    }
  }
}
class CS {
  constructor() {
    this.map = [];
  }
  add(t, n, r) {
    ES(this, t, n, r);
  }
  consume(t) {
    if (
      (this.map.sort(function (l, o) {
        return l[0] - o[0];
      }),
      this.map.length === 0)
    )
      return;
    let n = this.map.length;
    const r = [];
    for (; n > 0; )
      ((n -= 1),
        r.push(t.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]),
        (t.length = this.map[n][0]));
    (r.push(t.slice()), (t.length = 0));
    let i = r.pop();
    for (; i; ) {
      for (const l of i) t.push(l);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function ES(e, t, n, r) {
  let i = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === t) {
        ((e.map[i][1] += n), e.map[i][2].push(...r));
        return;
      }
      i += 1;
    }
    e.map.push([t, n, r]);
  }
}
function bS(e, t) {
  let n = !1;
  const r = [];
  for (; t < e.length; ) {
    const i = e[t];
    if (n) {
      if (i[0] === "enter")
        i[1].type === "tableContent" &&
          r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[t - 1][1].type === "tableDelimiterMarker") {
          const l = r.length - 1;
          r[l] = r[l] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow") break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
    t += 1;
  }
  return r;
}
function NS() {
  return { flow: { null: { name: "table", tokenize: PS, resolveAll: LS } } };
}
function PS(e, t, n) {
  const r = this;
  let i = 0,
    l = 0,
    o;
  return u;
  function u(C) {
    let j = r.events.length - 1;
    for (; j > -1; ) {
      const Z = r.events[j][1].type;
      if (Z === "lineEnding" || Z === "linePrefix") j--;
      else break;
    }
    const F = j > -1 ? r.events[j][1].type : null,
      U = F === "tableHead" || F === "tableRow" ? S : s;
    return U === S && r.parser.lazy[r.now().line] ? n(C) : U(C);
  }
  function s(C) {
    return (e.enter("tableHead"), e.enter("tableRow"), a(C));
  }
  function a(C) {
    return (C === 124 || ((o = !0), (l += 1)), f(C));
  }
  function f(C) {
    return C === null
      ? n(C)
      : H(C)
        ? l > 1
          ? ((l = 0),
            (r.interrupt = !0),
            e.exit("tableRow"),
            e.enter("lineEnding"),
            e.consume(C),
            e.exit("lineEnding"),
            p)
          : n(C)
        : J(C)
          ? ne(e, f, "whitespace")(C)
          : ((l += 1),
            o && ((o = !1), (i += 1)),
            C === 124
              ? (e.enter("tableCellDivider"),
                e.consume(C),
                e.exit("tableCellDivider"),
                (o = !0),
                f)
              : (e.enter("data"), c(C)));
  }
  function c(C) {
    return C === null || C === 124 || ae(C)
      ? (e.exit("data"), f(C))
      : (e.consume(C), C === 92 ? d : c);
  }
  function d(C) {
    return C === 92 || C === 124 ? (e.consume(C), c) : c(C);
  }
  function p(C) {
    return (
      (r.interrupt = !1),
      r.parser.lazy[r.now().line]
        ? n(C)
        : (e.enter("tableDelimiterRow"),
          (o = !1),
          J(C)
            ? ne(
                e,
                m,
                "linePrefix",
                r.parser.constructs.disable.null.includes("codeIndented")
                  ? void 0
                  : 4,
              )(C)
            : m(C))
    );
  }
  function m(C) {
    return C === 45 || C === 58
      ? P(C)
      : C === 124
        ? ((o = !0),
          e.enter("tableCellDivider"),
          e.consume(C),
          e.exit("tableCellDivider"),
          k)
        : b(C);
  }
  function k(C) {
    return J(C) ? ne(e, P, "whitespace")(C) : P(C);
  }
  function P(C) {
    return C === 58
      ? ((l += 1),
        (o = !0),
        e.enter("tableDelimiterMarker"),
        e.consume(C),
        e.exit("tableDelimiterMarker"),
        h)
      : C === 45
        ? ((l += 1), h(C))
        : C === null || H(C)
          ? E(C)
          : b(C);
  }
  function h(C) {
    return C === 45 ? (e.enter("tableDelimiterFiller"), g(C)) : b(C);
  }
  function g(C) {
    return C === 45
      ? (e.consume(C), g)
      : C === 58
        ? ((o = !0),
          e.exit("tableDelimiterFiller"),
          e.enter("tableDelimiterMarker"),
          e.consume(C),
          e.exit("tableDelimiterMarker"),
          y)
        : (e.exit("tableDelimiterFiller"), y(C));
  }
  function y(C) {
    return J(C) ? ne(e, E, "whitespace")(C) : E(C);
  }
  function E(C) {
    return C === 124
      ? m(C)
      : C === null || H(C)
        ? !o || i !== l
          ? b(C)
          : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(C))
        : b(C);
  }
  function b(C) {
    return n(C);
  }
  function S(C) {
    return (e.enter("tableRow"), T(C));
  }
  function T(C) {
    return C === 124
      ? (e.enter("tableCellDivider"),
        e.consume(C),
        e.exit("tableCellDivider"),
        T)
      : C === null || H(C)
        ? (e.exit("tableRow"), t(C))
        : J(C)
          ? ne(e, T, "whitespace")(C)
          : (e.enter("data"), _(C));
  }
  function _(C) {
    return C === null || C === 124 || ae(C)
      ? (e.exit("data"), T(C))
      : (e.consume(C), C === 92 ? D : _);
  }
  function D(C) {
    return C === 92 || C === 124 ? (e.consume(C), _) : _(C);
  }
}
function LS(e, t) {
  let n = -1,
    r = !0,
    i = 0,
    l = [0, 0, 0, 0],
    o = [0, 0, 0, 0],
    u = !1,
    s = 0,
    a,
    f,
    c;
  const d = new CS();
  for (; ++n < e.length; ) {
    const p = e[n],
      m = p[1];
    p[0] === "enter"
      ? m.type === "tableHead"
        ? ((u = !1),
          s !== 0 && (Rf(d, t, s, a, f), (f = void 0), (s = 0)),
          (a = {
            type: "table",
            start: Object.assign({}, m.start),
            end: Object.assign({}, m.end),
          }),
          d.add(n, 0, [["enter", a, t]]))
        : m.type === "tableRow" || m.type === "tableDelimiterRow"
          ? ((r = !0),
            (c = void 0),
            (l = [0, 0, 0, 0]),
            (o = [0, n + 1, 0, 0]),
            u &&
              ((u = !1),
              (f = {
                type: "tableBody",
                start: Object.assign({}, m.start),
                end: Object.assign({}, m.end),
              }),
              d.add(n, 0, [["enter", f, t]])),
            (i = m.type === "tableDelimiterRow" ? 2 : f ? 3 : 1))
          : i &&
              (m.type === "data" ||
                m.type === "tableDelimiterMarker" ||
                m.type === "tableDelimiterFiller")
            ? ((r = !1),
              o[2] === 0 &&
                (l[1] !== 0 &&
                  ((o[0] = o[1]),
                  (c = Zi(d, t, l, i, void 0, c)),
                  (l = [0, 0, 0, 0])),
                (o[2] = n)))
            : m.type === "tableCellDivider" &&
              (r
                ? (r = !1)
                : (l[1] !== 0 &&
                    ((o[0] = o[1]), (c = Zi(d, t, l, i, void 0, c))),
                  (l = o),
                  (o = [l[1], n, 0, 0])))
      : m.type === "tableHead"
        ? ((u = !0), (s = n))
        : m.type === "tableRow" || m.type === "tableDelimiterRow"
          ? ((s = n),
            l[1] !== 0
              ? ((o[0] = o[1]), (c = Zi(d, t, l, i, n, c)))
              : o[1] !== 0 && (c = Zi(d, t, o, i, n, c)),
            (i = 0))
          : i &&
            (m.type === "data" ||
              m.type === "tableDelimiterMarker" ||
              m.type === "tableDelimiterFiller") &&
            (o[3] = n);
  }
  for (
    s !== 0 && Rf(d, t, s, a, f), d.consume(t.events), n = -1;
    ++n < t.events.length;

  ) {
    const p = t.events[n];
    p[0] === "enter" &&
      p[1].type === "table" &&
      (p[1]._align = bS(t.events, n));
  }
  return e;
}
function Zi(e, t, n, r, i, l) {
  const o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData",
    u = "tableContent";
  n[0] !== 0 &&
    ((l.end = Object.assign({}, Wn(t.events, n[0]))),
    e.add(n[0], 0, [["exit", l, t]]));
  const s = Wn(t.events, n[1]);
  if (
    ((l = { type: o, start: Object.assign({}, s), end: Object.assign({}, s) }),
    e.add(n[1], 0, [["enter", l, t]]),
    n[2] !== 0)
  ) {
    const a = Wn(t.events, n[2]),
      f = Wn(t.events, n[3]),
      c = { type: u, start: Object.assign({}, a), end: Object.assign({}, f) };
    if ((e.add(n[2], 0, [["enter", c, t]]), r !== 2)) {
      const d = t.events[n[2]],
        p = t.events[n[3]];
      if (
        ((d[1].end = Object.assign({}, p[1].end)),
        (d[1].type = "chunkText"),
        (d[1].contentType = "text"),
        n[3] > n[2] + 1)
      ) {
        const m = n[2] + 1,
          k = n[3] - n[2] - 1;
        e.add(m, k, []);
      }
    }
    e.add(n[3] + 1, 0, [["exit", c, t]]);
  }
  return (
    i !== void 0 &&
      ((l.end = Object.assign({}, Wn(t.events, i))),
      e.add(i, 0, [["exit", l, t]]),
      (l = void 0)),
    l
  );
}
function Rf(e, t, n, r, i) {
  const l = [],
    o = Wn(t.events, n);
  (i && ((i.end = Object.assign({}, o)), l.push(["exit", i, t])),
    (r.end = Object.assign({}, o)),
    l.push(["exit", r, t]),
    e.add(n + 1, 0, l));
}
function Wn(e, t) {
  const n = e[t],
    r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const TS = { name: "tasklistCheck", tokenize: zS };
function _S() {
  return { text: { 91: TS } };
}
function zS(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.previous !== null || !r._gfmTasklistFirstContentOfListItem
      ? n(s)
      : (e.enter("taskListCheck"),
        e.enter("taskListCheckMarker"),
        e.consume(s),
        e.exit("taskListCheckMarker"),
        l);
  }
  function l(s) {
    return ae(s)
      ? (e.enter("taskListCheckValueUnchecked"),
        e.consume(s),
        e.exit("taskListCheckValueUnchecked"),
        o)
      : s === 88 || s === 120
        ? (e.enter("taskListCheckValueChecked"),
          e.consume(s),
          e.exit("taskListCheckValueChecked"),
          o)
        : n(s);
  }
  function o(s) {
    return s === 93
      ? (e.enter("taskListCheckMarker"),
        e.consume(s),
        e.exit("taskListCheckMarker"),
        e.exit("taskListCheck"),
        u)
      : n(s);
  }
  function u(s) {
    return H(s) ? t(s) : J(s) ? e.check({ tokenize: IS }, t, n)(s) : n(s);
  }
}
function IS(e, t, n) {
  return ne(e, r, "whitespace");
  function r(i) {
    return i === null ? n(i) : t(i);
  }
}
function jS(e) {
  return fh([iS(), hS(), SS(e), NS(), _S()]);
}
const DS = {};
function AS(e) {
  const t = this,
    n = e || DS,
    r = t.data(),
    i = r.micromarkExtensions || (r.micromarkExtensions = []),
    l = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []),
    o = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  (i.push(jS(n)), l.push(eS()), o.push(tS(n)));
}
function RS({ status: e }) {
  return e === "approved"
    ? v.jsx("span", {
        className:
          "inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30",
        children: "✓ approved",
      })
    : e === "resolved"
      ? v.jsx("span", {
          className:
            "inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 ring-1 ring-indigo-500/30",
          children: "✓ resolved",
        })
      : v.jsx("span", {
          className:
            "inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/30",
          children: "● open",
        });
}
function FS({ authorType: e, author: t }) {
  return e === "agent"
    ? v.jsx("div", {
        className:
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white",
        children: "AI",
      })
    : v.jsx("div", {
        className:
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-600 text-[11px] font-bold text-white",
        children: t.slice(0, 2).toUpperCase(),
      });
}
function nm({
  thread: e,
  replyDraft: t,
  onReplyChange: n,
  onReply: r,
  onStatusChange: i,
}) {
  return v.jsxs("div", {
    id: `thread-${e.id}`,
    className: "mt-2 rounded-lg border border-[#30363d] bg-[#161b22] shadow-lg",
    children: [
      v.jsxs("div", {
        className:
          "flex items-center gap-2 border-b border-[#30363d] px-3 py-2",
        children: [
          v.jsx(RS, { status: e.status }),
          v.jsx("span", {
            className: "text-[10px] text-slate-600",
            children: $y(e),
          }),
          v.jsxs("div", {
            className: "ml-auto flex gap-1",
            children: [
              v.jsx("button", {
                type: "button",
                onClick: () => i("open"),
                className:
                  "rounded border border-[#30363d] bg-[#21262d] px-1.5 py-0.5 text-[10px] text-slate-400 hover:bg-[#30363d]",
                children: "Reopen",
              }),
              v.jsx("button", {
                type: "button",
                onClick: () => i("resolved"),
                className:
                  "rounded border border-indigo-700/50 bg-indigo-700/20 px-1.5 py-0.5 text-[10px] text-indigo-300 hover:bg-indigo-700/40",
                children: "Resolve",
              }),
              v.jsx("button", {
                type: "button",
                onClick: () => i("approved"),
                className:
                  "rounded border border-emerald-700/50 bg-emerald-700/20 px-1.5 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-700/40",
                children: "Approve",
              }),
            ],
          }),
        ],
      }),
      v.jsx("div", {
        className: "divide-y divide-[#21262d]",
        children: e.messages.map((l) =>
          v.jsxs(
            "div",
            {
              className: "flex gap-3 px-3 py-2.5",
              children: [
                v.jsx(FS, { authorType: l.authorType, author: l.author }),
                v.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    v.jsxs("div", {
                      className: "mb-1 flex items-baseline gap-2",
                      children: [
                        v.jsx("span", {
                          className: "text-xs font-semibold text-slate-300",
                          children: l.author,
                        }),
                        v.jsx("span", {
                          className: "text-[10px] text-slate-600",
                          children: new Date(l.createdAt).toLocaleString(),
                        }),
                        l.authorType === "agent" &&
                          v.jsx("span", {
                            className:
                              "rounded bg-indigo-500/20 px-1 text-[9px] font-semibold text-indigo-300",
                            children: "AI",
                          }),
                      ],
                    }),
                    l.authorType === "agent"
                      ? v.jsx("div", {
                          className: "prose-review text-xs text-slate-300",
                          children: v.jsx(Sv, {
                            remarkPlugins: [AS],
                            children: l.text,
                          }),
                        })
                      : v.jsx("p", {
                          className:
                            "whitespace-pre-wrap text-xs text-slate-300",
                          children: l.text,
                        }),
                  ],
                }),
              ],
            },
            l.id,
          ),
        ),
      }),
      v.jsxs("div", {
        className: "flex gap-2 border-t border-[#30363d] px-3 py-2",
        children: [
          v.jsx("textarea", {
            rows: 2,
            value: t,
            onChange: (l) => n(l.target.value),
            onKeyDown: (l) => {
              l.key === "Enter" && (l.metaKey || l.ctrlKey) && r();
            },
            placeholder: "Reply… (⌘↵ to send)",
            className:
              "flex-1 resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]",
          }),
          v.jsx("button", {
            type: "button",
            onClick: r,
            className:
              "self-end rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-slate-300 hover:bg-[#30363d]",
            children: "Reply",
          }),
        ],
      }),
    ],
  });
}
function rm({
  selection: e,
  draft: t,
  onDraftChange: n,
  onSubmit: r,
  onCancel: i,
}) {
  return v.jsxs("div", {
    className:
      "mt-2 rounded-lg border border-[#1f6feb]/60 bg-[#161b22] shadow-lg",
    children: [
      v.jsxs("div", {
        className:
          "border-b border-[#30363d] px-3 py-2 text-[11px] text-slate-500",
        children: [
          "Commenting on ",
          e.side,
          " lines ",
          e.startLine,
          e.endLine !== e.startLine ? `–${e.endLine}` : "",
        ],
      }),
      v.jsxs("div", {
        className: "flex gap-2 p-3",
        children: [
          v.jsx("textarea", {
            rows: 3,
            value: t,
            onChange: (l) => n(l.target.value),
            onKeyDown: (l) => {
              (l.key === "Enter" && (l.metaKey || l.ctrlKey) && r(),
                l.key === "Escape" && i());
            },
            placeholder: "Leave a comment… (⌘↵ to submit, Esc to cancel)",
            autoFocus: !0,
            className:
              "flex-1 resize-none rounded border border-[#30363d] bg-[#0d1117] px-2 py-1.5 text-xs text-slate-300 placeholder-slate-700 outline-none focus:border-[#1f6feb]",
          }),
          v.jsxs("div", {
            className: "flex flex-col gap-1.5",
            children: [
              v.jsx("button", {
                type: "button",
                onClick: r,
                className:
                  "rounded border border-[#1f6feb]/50 bg-[#1f6feb]/20 px-3 py-1 text-xs font-medium text-blue-300 hover:bg-[#1f6feb]/30",
                children: "Comment",
              }),
              v.jsx("button", {
                type: "button",
                onClick: i,
                className:
                  "rounded border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs text-slate-400 hover:bg-[#30363d]",
                children: "Cancel",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function OS({
  fullFileLoading: e,
  fullFileError: t,
  fullFileContent: n,
  selectedFile: r,
  threadsByKey: i,
  outdatedThreadIds: l,
  showPendingOnly: o,
  dragSelection: u,
  composeSelection: s,
  composeDraft: a,
  replyDrafts: f,
  onReplyChange: c,
  onReply: d,
  onStatusChange: p,
  onDraftChange: m,
  onSubmitCompose: k,
  onCancelCompose: P,
  onBeginSelection: h,
  onDragUpdate: g,
  panelRef: y,
}) {
  return v.jsx("div", {
    ref: y,
    className: "flex min-h-0 flex-1 overflow-auto",
    children: e
      ? v.jsx("div", {
          className:
            "flex flex-1 items-center justify-center text-sm text-slate-600",
          children: "Loading…",
        })
      : t
        ? v.jsx("div", {
            className:
              "flex flex-1 items-center justify-center text-sm text-slate-600",
            children: "Could not load file",
          })
        : n === null
          ? v.jsx("div", {
              className:
                "flex flex-1 items-center justify-center text-sm text-slate-600",
              children: "Loading…",
            })
          : v.jsx("table", {
              className: "w-full border-collapse font-mono text-xs",
              children: v.jsx("tbody", {
                children: n
                  .split(
                    `
`,
                  )
                  .map((E, b) => {
                    const S = b + 1,
                      T = oa(r.path, S, "new"),
                      _ = (i.get(T) || []).filter((U) => !l.has(U.id)),
                      D = o ? _.filter((U) => U.status !== "approved") : _,
                      C = Xd(u || s, r.path, "new", S),
                      j = s ? et(s).endLine : null,
                      F =
                        s &&
                        et(s).filePath === r.path &&
                        et(s).side === "new" &&
                        j === S;
                    return v.jsxs(
                      "tr",
                      {
                        className: `group border-b border-[#21262d] ${C ? "ring-1 ring-inset ring-blue-500/50 bg-blue-900/20" : ""}`,
                        onMouseEnter: () => {
                          u &&
                            (u.filePath !== r.path ||
                              u.side !== "new" ||
                              g(r.path, "new", S));
                        },
                        children: [
                          v.jsx("td", {
                            className:
                              "w-6 border-r border-[#21262d] text-center align-top bg-[#0d1117]",
                            children: v.jsx("button", {
                              type: "button",
                              onMouseDown: (U) => {
                                (U.preventDefault(), h(r.path, "new", S));
                              },
                              className:
                                "h-full w-full text-slate-700 opacity-0 transition group-hover:opacity-100 hover:text-[#1f6feb]",
                              title: "Add comment (drag for range)",
                              children: "+",
                            }),
                          }),
                          v.jsx("td", {
                            className:
                              "w-12 select-none border-r border-[#21262d] px-2 py-0.5 text-right text-[10px] text-slate-600 bg-[#0d1117]",
                            children: S,
                          }),
                          v.jsxs("td", {
                            className: "py-0.5 pl-2 pr-4 text-slate-300",
                            children: [
                              v.jsx("pre", {
                                className: "whitespace-pre-wrap break-all",
                                children: E,
                              }),
                              D.map((U) =>
                                v.jsx(
                                  nm,
                                  {
                                    thread: U,
                                    replyDraft: f[U.id] || "",
                                    onReplyChange: (Z) => c(U.id, Z),
                                    onReply: () => d(U.id),
                                    onStatusChange: (Z) => p(U.id, Z),
                                  },
                                  U.id,
                                ),
                              ),
                              F && s
                                ? v.jsx(rm, {
                                    selection: et(s),
                                    draft: a,
                                    onDraftChange: m,
                                    onSubmit: k,
                                    onCancel: P,
                                  })
                                : null,
                            ],
                          }),
                        ],
                      },
                      S,
                    );
                  }),
              }),
            }),
  });
}
function MS({ gapLines: e, onExpand: t }) {
  return e <= 0
    ? null
    : v.jsx("tr", {
        children: v.jsx("td", {
          colSpan: 5,
          className: "bg-[#161b22] py-1",
          children: v.jsxs("button", {
            type: "button",
            onClick: t,
            className:
              "flex w-full items-center justify-center gap-2 text-[11px] text-slate-500 hover:text-slate-300",
            children: [
              v.jsx("span", { className: "h-px flex-1 bg-[#30363d]" }),
              v.jsxs("span", { children: ["↕ ", e, " lines not shown"] }),
              v.jsx("span", { className: "h-px flex-1 bg-[#30363d]" }),
            ],
          }),
        }),
      });
}
function BS({
  selectedFile: e,
  threadsByKey: t,
  outdatedThreadIds: n,
  showPendingOnly: r,
  dragSelection: i,
  composeSelection: l,
  composeDraft: o,
  replyDrafts: u,
  onReplyChange: s,
  onReply: a,
  onStatusChange: f,
  onDraftChange: c,
  onSubmitCompose: d,
  onCancelCompose: p,
  onBeginSelection: m,
  onDragUpdate: k,
  panelRef: P,
  expandedGaps: h,
  expansionContent: g,
  onExpandGap: y,
}) {
  return v.jsxs("div", {
    className: "flex min-h-0 flex-1",
    children: [
      v.jsx("div", {
        ref: P,
        className: "flex-1 overflow-auto",
        children: v.jsx("table", {
          className: "w-full border-collapse font-mono text-xs",
          children: v.jsx("tbody", {
            children: e.hunks.map((E, b) => {
              var T;
              const S = [];
              S.push(
                v.jsx(
                  "tr",
                  {
                    id: Fc(e.path, b),
                    children: v.jsx("td", {
                      colSpan: 5,
                      className:
                        "bg-[#1f2937] py-1 pl-4 text-[11px] text-slate-500",
                      children: E.header,
                    }),
                  },
                  `${e.path}-hunk-${b}`,
                ),
              );
              for (let _ = 0; _ < E.lines.length; _++) {
                const D = E.lines[_],
                  C =
                    D.newLineNumber !== null
                      ? "new"
                      : D.oldLineNumber !== null
                        ? "old"
                        : null,
                  j = C === "old" ? D.oldLineNumber : D.newLineNumber,
                  F = (() => {
                    if (D.kind !== "context") return null;
                    for (let K = _ + 1; K < E.lines.length; K++) {
                      if (E.lines[K].kind === "add")
                        return E.lines[K].newLineNumber;
                      if (E.lines[K].kind === "del") return null;
                    }
                    return null;
                  })(),
                  U = F ? "new" : C,
                  Z = F ?? j,
                  V = C && j ? oa(e.path, j, C) : "",
                  ie = (V ? t.get(V) || [] : []).filter((K) => !n.has(K.id)),
                  le = r ? ie.filter((K) => K.status !== "approved") : ie,
                  R = C && j ? Xd(i || l, e.path, C, j) : !1,
                  $ = l ? et(l).endLine : null,
                  x =
                    l &&
                    C &&
                    j &&
                    et(l).filePath === e.path &&
                    et(l).side === C &&
                    $ === j;
                let Y = "";
                D.kind === "add"
                  ? (Y = "bg-[#0d4a1a]")
                  : D.kind === "del"
                    ? (Y = "bg-[#4a0d0d]")
                    : D.kind === "meta" && (Y = "bg-[#1f2937]");
                let q = "";
                D.kind === "add"
                  ? (q = "bg-[#0a3d15]")
                  : D.kind === "del"
                    ? (q = "bg-[#3d0a0a]")
                    : D.kind === "meta"
                      ? (q = "bg-[#1a2332]")
                      : (q = "bg-[#0d1117]");
                const w = R
                  ? "ring-1 ring-inset ring-blue-500/50 bg-blue-900/20"
                  : "";
                S.push(
                  v.jsxs(
                    "tr",
                    {
                      className: `group border-b border-[#21262d] ${Y} ${w}`,
                      onMouseEnter: () => {
                        !i ||
                          !C ||
                          !j ||
                          i.filePath !== e.path ||
                          i.side !== C ||
                          k(e.path, C, j);
                      },
                      children: [
                        v.jsx("td", {
                          className: `w-6 border-r border-[#21262d] text-center align-top ${q}`,
                          children:
                            C && j
                              ? v.jsx("button", {
                                  type: "button",
                                  onMouseDown: (K) => {
                                    (K.preventDefault(),
                                      m(e.path, U ?? "new", Z ?? 1));
                                  },
                                  className:
                                    "h-full w-full text-slate-700 opacity-0 transition group-hover:opacity-100 hover:text-[#1f6feb]",
                                  title: "Add comment (drag for range)",
                                  children: "+",
                                })
                              : null,
                        }),
                        v.jsx("td", {
                          className: `w-12 select-none border-r border-[#21262d] px-2 py-0.5 text-right text-[10px] text-slate-600 ${q}`,
                          children: D.oldLineNumber ?? "",
                        }),
                        v.jsx("td", {
                          className: `w-12 select-none border-r border-[#21262d] px-2 py-0.5 text-right text-[10px] text-slate-600 ${q}`,
                          children: D.newLineNumber ?? "",
                        }),
                        v.jsx("td", {
                          className: `w-5 select-none px-1 py-0.5 text-center ${D.kind === "add" ? "text-emerald-400" : D.kind === "del" ? "text-rose-400" : "text-slate-700"}`,
                          children:
                            D.kind === "add"
                              ? "+"
                              : D.kind === "del"
                                ? "-"
                                : "",
                        }),
                        v.jsxs("td", {
                          className: "py-0.5 pl-2 pr-4 text-slate-300",
                          children: [
                            v.jsx("pre", {
                              className: "whitespace-pre-wrap break-all",
                              children: D.content,
                            }),
                            v.jsx("div", {
                              id: V
                                ? `thread-anchor-${V.replace(/[^a-zA-Z0-9_-]/g, "_")}`
                                : void 0,
                              children: le.map((K) =>
                                v.jsx(
                                  nm,
                                  {
                                    thread: K,
                                    replyDraft: u[K.id] || "",
                                    onReplyChange: (he) => s(K.id, he),
                                    onReply: () => a(K.id),
                                    onStatusChange: (he) => f(K.id, he),
                                  },
                                  K.id,
                                ),
                              ),
                            }),
                            x && l
                              ? v.jsx(rm, {
                                  selection: et(l),
                                  draft: o,
                                  onDraftChange: c,
                                  onSubmit: d,
                                  onCancel: p,
                                })
                              : null,
                          ],
                        }),
                      ],
                    },
                    `${e.path}-${b}-${_}`,
                  ),
                );
              }
              if (b < e.hunks.length - 1) {
                const _ = e.hunks[b + 1],
                  D = [...E.lines]
                    .reverse()
                    .find((V) => V.newLineNumber !== null),
                  C = (D == null ? void 0 : D.newLineNumber) ?? 0,
                  j = _.lines.find((V) => V.newLineNumber !== null),
                  F = (j == null ? void 0 : j.newLineNumber) ?? 0,
                  U = F - C - 1,
                  Z = ((T = h.get(e.path)) == null ? void 0 : T.has(b)) ?? !1;
                if (U > 0 && !Z)
                  S.push(
                    v.jsx(
                      MS,
                      { gapLines: U, onExpand: () => y(e.path, b) },
                      `gap-${e.path}-${b}`,
                    ),
                  );
                else if (Z) {
                  const V = (g.get(e.path) || "").split(`
`);
                  for (let ie = C + 1; ie < F; ie++) {
                    const le = V[ie - 1] ?? "";
                    S.push(
                      v.jsxs(
                        "tr",
                        {
                          className: "bg-[#0d1117]",
                          children: [
                            v.jsx("td", {
                              className:
                                "w-6 border-r border-[#21262d] bg-[#0d1117]",
                            }),
                            v.jsx("td", {
                              className:
                                "w-12 select-none border-r border-[#21262d] px-2 py-0.5 text-right text-[10px] text-slate-600 bg-[#0d1117]",
                              children: ie,
                            }),
                            v.jsx("td", {
                              className:
                                "w-12 select-none border-r border-[#21262d] px-2 py-0.5 text-right text-[10px] text-slate-600 bg-[#0d1117]",
                              children: ie,
                            }),
                            v.jsx("td", {
                              className:
                                "w-5 select-none px-1 py-0.5 bg-[#0d1117]",
                            }),
                            v.jsx("td", {
                              className: "py-0.5 pl-2 pr-4 text-slate-500",
                              children: v.jsx("pre", {
                                className: "whitespace-pre-wrap break-all",
                                children: le,
                              }),
                            }),
                          ],
                        },
                        `expand-${e.path}-${b}-${ie}`,
                      ),
                    );
                  }
                }
              }
              return S;
            }),
          }),
        }),
      }),
      v.jsxs("div", {
        className:
          "flex w-12 shrink-0 flex-col border-l border-[#30363d] bg-[#161b22] py-2",
        children: [
          v.jsx("div", {
            className:
              "mb-2 text-center text-[9px] font-semibold uppercase tracking-wider text-slate-700",
            children: "hunks",
          }),
          v.jsx("div", {
            className: "flex flex-col items-center gap-1.5 overflow-auto",
            children: e.hunks.map((E, b) => {
              let S = 0;
              for (const T of E.lines)
                (T.kind === "add" || T.kind === "del") && (S += 1);
              return v.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var T;
                    (T = document.getElementById(Fc(e.path, b))) == null ||
                      T.scrollIntoView({ block: "start", behavior: "smooth" });
                  },
                  className:
                    "flex w-9 flex-col items-center rounded border border-[#30363d] bg-[#21262d] py-1.5 text-[9px] text-slate-500 hover:bg-[#30363d] hover:text-slate-300",
                  title: E.header,
                  children: [
                    v.jsx("span", { children: b + 1 }),
                    v.jsx("div", {
                      className: "mt-1 h-1 w-6 rounded-full bg-[#30363d]",
                      children: v.jsx("div", {
                        className: "h-full rounded-full bg-[#1f6feb]",
                        style: { width: `${Math.min(100, (S / 12) * 100)}%` },
                      }),
                    }),
                  ],
                },
                `${e.path}-mini-${b}`,
              );
            }),
          }),
        ],
      }),
    ],
  });
}
function $S({
  sourceBranch: e,
  targetBranch: t,
  selectedWorktree: n,
  viewKey: r,
}) {
  const [i, l] = B.useState([]),
    [o, u] = B.useState({}),
    [s, a] = B.useState(""),
    [f, c] = B.useState("Ready"),
    [d, p] = B.useState(""),
    [m, k] = B.useState(null);
  (B.useEffect(() => {
    if (!e || !t) return;
    let E = !1;
    const b = Oc(e, t);
    return (
      p(b),
      (async () => {
        try {
          const S = await At.listSessions();
          if (E) return;
          if (S.includes(b)) {
            const T = await At.getSession(b);
            if (E) return;
            (l(T.threads || []),
              a(T.notes || ""),
              localStorage.setItem(`review.summary.${r}`, T.notes || ""),
              k(T.reviewVerdict ?? null),
              c(`Loaded session: ${b}`));
          } else l([]);
        } catch (S) {
          E || c(S instanceof Error ? S.message : "Failed to load session");
        }
      })(),
      () => {
        E = !0;
      }
    );
  }, [e, t]),
    B.useEffect(() => {
      const E = localStorage.getItem(`review.summary.${r}`);
      a(E || "");
    }, [r]),
    B.useEffect(() => {
      localStorage.setItem(`review.summary.${r}`, s);
    }, [r, s]),
    B.useEffect(() => {
      if (!e || !t || i.length === 0) return;
      const E = setTimeout(async () => {
        try {
          const b = Oc(e, t).replace(".json", "");
          await At.saveSession({
            name: b,
            notes: s,
            sourceBranch: e,
            targetBranch: t,
            worktreePath: n,
            threads: i,
            reviewVerdict: m,
          });
        } catch {}
      }, 200);
      return () => clearTimeout(E);
    }, [i, m]));
  const P = B.useRef(!1);
  return (
    B.useEffect(() => {
      !e || !t || (i.length !== 0 && (P.current = !0));
    }, [i, m]),
    B.useEffect(() => {}, [d]),
    {
      threads: i,
      setThreads: l,
      replyDrafts: o,
      setReplyDrafts: u,
      summaryNotes: s,
      setSummaryNotes: a,
      status: f,
      setStatus: c,
      resetSession: async () => {
        if (d)
          try {
            await At.deleteSession(d);
          } catch {}
        (l([]), a(""), k(null), c("Session reset"));
      },
      addReply: (E) => {
        const b = (o[E] || "").trim();
        if (!b) return;
        const S = new Date().toISOString(),
          T = {
            id: Xu(),
            authorType: "human",
            author: "reviewer",
            text: b,
            createdAt: S,
          };
        (l((_) =>
          _.map((D) =>
            D.id === E
              ? { ...D, messages: [...D.messages, T], lastUpdatedAt: S }
              : D,
          ),
        ),
          u((_) => ({ ..._, [E]: "" })));
      },
      updateThreadStatus: (E, b) => {
        const S = new Date().toISOString();
        l((T) =>
          T.map((_) =>
            _.id === E ? { ..._, status: b, lastUpdatedAt: S } : _,
          ),
        );
      },
      reviewVerdict: m,
      setReviewVerdict: k,
      currentSessionFileName: d,
    }
  );
}
function US(e) {
  const { commits: t, selectedCommit: n, onCommitChange: r } = e;
  B.useEffect(() => {
    const i = ["all", ...t.map((u) => u.hash)],
      l = n || "all",
      o = (u) => {
        var p;
        const s = u.target,
          a =
            (p = s == null ? void 0 : s.tagName) == null
              ? void 0
              : p.toLowerCase();
        if (
          a === "input" ||
          a === "textarea" ||
          a === "select" ||
          (s != null && s.isContentEditable) ||
          (u.key !== "[" && u.key !== "]")
        )
          return;
        u.preventDefault();
        const f = i.indexOf(l);
        if (f === -1) return;
        const c =
            u.key === "[" ? Math.max(f - 1, 0) : Math.min(f + 1, i.length - 1),
          d = i[c];
        r(d === "all" ? "" : d);
      };
    return (
      window.addEventListener("keydown", o),
      () => window.removeEventListener("keydown", o)
    );
  }, [t, n, r]);
}
function HS({ reviewVerdict: e, onApprove: t, onRequestChanges: n }) {
  return v.jsx("div", {
    className:
      "flex shrink-0 items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-2",
    children: v.jsxs("div", {
      className: "ml-auto flex gap-1",
      children: [
        v.jsx("button", {
          type: "button",
          onClick: t,
          className: `rounded border px-2.5 py-1 text-xs transition ${e === "approved" ? "border-emerald-600/70 bg-emerald-700/40 text-emerald-200" : "border-emerald-600/50 bg-emerald-700/20 text-emerald-300 hover:bg-emerald-700/30"}`,
          children: e === "approved" ? "✓ Approved" : "Approve",
        }),
        v.jsx("button", {
          type: "button",
          onClick: n,
          className: `flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs transition ${e === "changes_requested" ? "border-rose-600/70 bg-rose-700/40 text-rose-200" : "border-rose-700/50 bg-rose-700/20 text-rose-300 hover:bg-rose-700/30"}`,
          children:
            e === "changes_requested"
              ? "✗ Changes Requested"
              : "Request Changes",
        }),
      ],
    }),
  });
}
function VS() {
  const [e, t] = B.useState(null),
    [n, r] = B.useState(""),
    [i, l] = B.useState(""),
    [o, u] = B.useState("main"),
    [s, a] = B.useState(null),
    [f, c] = B.useState(""),
    [d, p] = B.useState([]),
    [m, k] = B.useState(""),
    [P, h] = B.useState(""),
    [g, y] = B.useState(!1),
    [E, b] = B.useState(!0),
    [S, T] = B.useState(new Set()),
    [_, D] = B.useState("files"),
    [C, j] = B.useState("all"),
    [F, U] = B.useState(!1),
    [Z, V] = B.useState(null),
    [ie, le] = B.useState(!1),
    [R, $] = B.useState(!1),
    [x, Y] = B.useState(null),
    [q, w] = B.useState(null),
    [K, he] = B.useState(""),
    [se, ot] = B.useState(new Map()),
    [xt, Zt] = B.useState(new Map()),
    _t = B.useRef(null),
    Cn = B.useRef(""),
    bi = m ? P : (s == null ? void 0 : s.allDiff) || "",
    ut = B.useMemo(() => {
      const N = My(bi),
        M = new Map();
      for (const Q of N) M.set(Q.path, Q);
      return Array.from(M.values());
    }, [bi]),
    Re = `${n}|${i}|${o}|${m || "all"}`,
    {
      threads: st,
      setThreads: Ni,
      replyDrafts: br,
      setReplyDrafts: Pi,
      summaryNotes: Li,
      setSummaryNotes: Ti,
      status: co,
      setStatus: zt,
      resetSession: fo,
      addReply: _i,
      updateThreadStatus: zi,
      reviewVerdict: L,
      setReviewVerdict: A,
    } = $S({
      sourceBranch: i,
      targetBranch: o,
      selectedWorktree: n,
      viewKey: Re,
    }),
    W = ut.find((N) => N.path === f) || ut[0] || null,
    G = B.useMemo(() => {
      const N = new Map();
      for (const M of st) {
        const Q = Mc(M),
          oe = N.get(Q) || [];
        (oe.push(M), N.set(Q, oe));
      }
      return N;
    }, [st]),
    te = B.useMemo(() => {
      const N = new Set();
      for (const M of st) By(M, ut) && N.add(M.id);
      return N;
    }, [st, ut]),
    Fe = st.filter((N) => N.status !== "approved").length,
    kt = B.useMemo(() => {
      const N = new Map();
      for (const M of st)
        M.status !== "approved" &&
          (te.has(M.id) || N.set(M.filePath, (N.get(M.filePath) || 0) + 1));
      return N;
    }, [st, te]),
    at = B.useMemo(() => {
      const N = new Map();
      for (const M of ut) {
        let Q = 0;
        for (const oe of M.hunks)
          for (const En of oe.lines)
            (En.kind === "add" || En.kind === "del") && (Q += 1);
        N.set(M.path, Q);
      }
      return N;
    }, [ut]),
    ct = B.useMemo(
      () => (g ? ut.filter((N) => (kt.get(N.path) || 0) > 0) : ut),
      [ut, g, kt],
    ),
    vt = async (N) => {
      if ((k(N), !N)) {
        (h(""), zt("Viewing all changes"));
        return;
      }
      zt(`Loading ${N.slice(0, 7)}...`);
      try {
        const M = await At.getCommitDiff({ worktreePath: n, commit: N });
        (h(M), zt(`Commit ${N.slice(0, 7)}`));
      } catch (M) {
        zt(M instanceof Error ? M.message : "Failed to load commit");
      }
    },
    Oe = async () => {
      try {
        const N = await At.getContext();
        (t(N),
          r(N.currentWorktree),
          l(N.currentBranch),
          u(N.branches.includes("main") ? "main" : N.defaultTargetBranch));
      } catch (N) {
        zt(N instanceof Error ? N.message : "Failed to load repo context");
      }
    },
    Bt = async (N, M, Q) => {
      if (!(!N || !M || !Q)) {
        zt(`Diffing ${M} ← ${Q}...`);
        try {
          const oe = await At.getDiffBundle({
            worktreePath: N,
            sourceBranch: M,
            targetBranch: Q,
          });
          (a(oe), k(""), h(""), zt(`${oe.sourceBranch} → ${oe.targetBranch}`));
        } catch (oe) {
          zt(oe instanceof Error ? oe.message : "Failed to load diff");
        }
      }
    },
    wt = async (N, M, Q) => {
      if (!(!N || !M || !Q))
        try {
          const oe = await At.getCommits({
            worktreePath: N,
            sourceBranch: M,
            targetBranch: Q,
          });
          p(oe);
        } catch {
          p([]);
        }
    },
    Na = (N, M, Q) => {
      (w(null), he(""), Y({ filePath: N, side: M, startLine: Q, endLine: Q }));
    },
    im = () => {
      x && (w(et(x)), he(""), Y(null));
    },
    Pa = () => {
      if (!q) return;
      const N = K.trim();
      if (!N) return;
      const M = new Date().toISOString(),
        Q = et(q),
        oe = {
          id: Xu(),
          authorType: "human",
          author: "reviewer",
          text: N,
          createdAt: M,
        },
        En = {
          id: Xu(),
          filePath: Q.filePath,
          line: Q.startLine,
          lineEnd: Q.endLine,
          side: Q.side,
          anchorContent: Yd(ut, Q.filePath, Q.startLine, Q.side),
          status: "open",
          messages: [oe],
          lastUpdatedAt: M,
        };
      (Ni((sm) => [...sm, En]), w(null), he(""));
    };
  (B.useEffect(() => {
    Oe();
  }, []),
    B.useEffect(() => {
      !n || !i || !o || (Bt(n, i, o), wt(n, i, o));
    }, [n, i, o]),
    B.useEffect(() => {
      if (Cn.current === Re) return;
      if (((Cn.current = Re), !ct.length)) {
        c("");
        return;
      }
      const N = localStorage.getItem(`review.selectedFile.${Re}`);
      if (N && ct.some((M) => M.path === N)) {
        c(N);
        return;
      }
      c(ct[0].path);
    }, [ct, Re]),
    B.useEffect(() => {
      f &&
        (localStorage.setItem(`review.selectedFile.${Re}`, f), V(null), le(!1));
    }, [Re, f]),
    B.useEffect(() => {
      !F ||
        !f ||
        ($(!0),
        le(!1),
        V(null),
        At.getFileContent({ worktreePath: n || void 0, filePath: f })
          .then((N) => V(N))
          .catch(() => le(!0))
          .finally(() => $(!1)));
    }, [F, f, n]),
    B.useEffect(() => {
      if (!x) return;
      const N = () => im();
      return (
        window.addEventListener("mouseup", N),
        () => window.removeEventListener("mouseup", N)
      );
    }, [x]),
    US({ commits: d, selectedCommit: m, onCommitChange: (N) => void vt(N) }));
  const lm = () => {
      A("approved");
    },
    om = () => {
      A("changes_requested");
    };
  (B.useEffect(() => {
    if (!q) return;
    const N = et(q),
      M = `review.compose.${Re}|${N.filePath}|${N.side}|${N.startLine}|${N.endLine}`;
    he(localStorage.getItem(M) || "");
  }, [q, Re]),
    B.useEffect(() => {
      if (!q) return;
      const N = et(q),
        M = `review.compose.${Re}|${N.filePath}|${N.side}|${N.startLine}|${N.endLine}`;
      localStorage.setItem(M, K);
    }, [q, K, Re]),
    B.useEffect(() => {
      const N = _t.current;
      if (!N || !f) return;
      const M = `review.scroll.${Re}|${f}`;
      N.scrollTop = Number(localStorage.getItem(M)) || 0;
      const Q = () => localStorage.setItem(M, String(N.scrollTop));
      return (
        N.addEventListener("scroll", Q),
        () => N.removeEventListener("scroll", Q)
      );
    }, [Re, f]));
  const um = async (N, M) => {
    if (!xt.has(N))
      try {
        const Q = await At.getFileContent({
          worktreePath: n || void 0,
          filePath: N,
        });
        Zt((oe) => new Map(oe).set(N, Q));
      } catch {
        return;
      }
    ot((Q) => {
      const oe = new Map(Q),
        En = new Set(oe.get(N) || []);
      return (En.add(M), oe.set(N, En), oe);
    });
  };
  return v.jsxs("div", {
    className: "flex h-screen flex-col bg-[#0d1117] text-slate-200",
    children: [
      v.jsxs("header", {
        className:
          "flex shrink-0 items-center gap-3 border-b border-[#30363d] bg-[#161b22] px-4 py-2.5",
        children: [
          v.jsx("span", {
            className: "mr-1 text-sm font-semibold text-slate-200",
            children: "Local Review",
          }),
          v.jsxs("div", {
            className:
              "flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1",
            children: [
              v.jsx("span", {
                className: "text-xs text-slate-500",
                children: "compare",
              }),
              v.jsx("select", {
                value: i,
                onChange: (N) => l(N.target.value),
                className: "bg-transparent text-xs text-slate-200 outline-none",
                children: ((e == null ? void 0 : e.branches) || []).map((N) =>
                  v.jsx("option", { value: N, children: N }, N),
                ),
              }),
            ],
          }),
          v.jsx("span", { className: "text-slate-600", children: "→" }),
          v.jsxs("div", {
            className:
              "flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1",
            children: [
              v.jsx("span", {
                className: "text-xs text-slate-500",
                children: "base",
              }),
              v.jsx("select", {
                value: o,
                onChange: (N) => u(N.target.value),
                className: "bg-transparent text-xs text-slate-200 outline-none",
                children: ((e == null ? void 0 : e.branches) || []).map((N) =>
                  v.jsx("option", { value: N, children: N }, N),
                ),
              }),
            ],
          }),
          v.jsxs("div", {
            className:
              "flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1",
            children: [
              v.jsx("span", {
                className: "text-xs text-slate-500",
                children: "commit",
              }),
              v.jsxs("select", {
                value: m,
                onChange: (N) => void vt(N.target.value),
                className:
                  "max-w-[220px] bg-transparent text-xs text-slate-200 outline-none",
                children: [
                  v.jsx("option", { value: "", children: "All changes" }),
                  d.map((N) =>
                    v.jsxs(
                      "option",
                      {
                        value: N.hash,
                        children: [N.shortHash, " ", N.subject],
                      },
                      N.hash,
                    ),
                  ),
                ],
              }),
              v.jsx("span", { className: "text-slate-600", children: "·" }),
              v.jsx("button", {
                type: "button",
                onClick: () => {
                  if (!m) return;
                  const N = d.findIndex((M) => M.hash === m);
                  vt(N <= 0 ? "" : d[N - 1].hash);
                },
                className: "text-xs text-slate-400 hover:text-slate-200",
                title: "Previous commit [ key",
                children: "‹",
              }),
              v.jsx("button", {
                type: "button",
                onClick: () => {
                  if (!d.length) return;
                  if (!m) {
                    vt(d[0].hash);
                    return;
                  }
                  const N = d.findIndex((M) => M.hash === m);
                  N < d.length - 1 && vt(d[N + 1].hash);
                },
                className: "text-xs text-slate-400 hover:text-slate-200",
                title: "Next commit ] key",
                children: "›",
              }),
            ],
          }),
          v.jsxs("div", {
            className: "ml-auto flex items-center gap-2",
            children: [
              Fe > 0 &&
                v.jsxs("span", {
                  className:
                    "rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-300 ring-1 ring-amber-500/30",
                  children: [Fe, " open"],
                }),
              v.jsxs("label", {
                className:
                  "flex cursor-pointer items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200",
                children: [
                  v.jsx("input", {
                    type: "checkbox",
                    checked: g,
                    onChange: (N) => y(N.target.checked),
                    className: "accent-amber-500",
                  }),
                  "Pending only",
                ],
              }),
              v.jsx("button", {
                type: "button",
                onClick: () => void Bt(n, i, o),
                className:
                  "rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-xs text-slate-300 hover:bg-[#30363d]",
                children: "Refresh",
              }),
            ],
          }),
        ],
      }),
      v.jsx(HS, { reviewVerdict: L, onApprove: lm, onRequestChanges: om }),
      v.jsxs("div", {
        className:
          "flex shrink-0 items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-1 text-[11px] text-slate-500",
        children: [
          v.jsx("span", { children: co }),
          v.jsx("span", { className: "mx-2 text-slate-700", children: "|" }),
          v.jsxs("span", { children: [ct.length, " files"] }),
          v.jsx("span", { className: "mx-2 text-slate-700", children: "|" }),
          v.jsxs("span", { children: [st.length, " threads"] }),
          v.jsx("span", { className: "mx-2 text-slate-700", children: "|" }),
          v.jsx("span", { children: "[ ] to navigate commits" }),
          L === "approved" &&
            v.jsx("span", {
              className:
                "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-500/30",
              children: "Approved",
            }),
          L === "changes_requested" &&
            v.jsx("span", {
              className:
                "rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-medium text-rose-300 ring-1 ring-rose-500/30",
              children: "Changes Requested",
            }),
        ],
      }),
      v.jsxs("div", {
        className: "flex min-h-0 flex-1",
        children: [
          v.jsx(Vy, {
            leftTab: _,
            onTabChange: D,
            pendingCount: Fe,
            visibleFiles: ct,
            selectedFilePath: f,
            onFileSelect: c,
            showFolderTree: E,
            onFolderTreeChange: b,
            collapsedFolders: S,
            onFolderToggle: (N) => {
              T((M) => {
                const Q = new Set(M);
                return (Q.has(N) ? Q.delete(N) : Q.add(N), Q);
              });
            },
            unresolvedThreadCountByFile: kt,
            changeCountByFile: at,
            threads: st,
            outdatedThreadIds: te,
            overviewFilter: C,
            onOverviewFilterChange: j,
            onThreadClick: (N) => {
              if (!te.has(N.id)) {
                (D("files"), c(N.filePath));
                const M = Mc(N);
                setTimeout(() => {
                  const Q = document.getElementById(
                    `thread-anchor-${M.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
                  );
                  Q == null ||
                    Q.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }
            },
            onReset: async () => {
              await fo();
            },
            summaryNotes: Li,
            onSummaryNotesChange: Ti,
          }),
          v.jsx("div", {
            className: "flex min-w-0 flex-1 flex-col",
            children: W
              ? v.jsxs(v.Fragment, {
                  children: [
                    v.jsxs("div", {
                      className:
                        "flex shrink-0 items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-2",
                      children: [
                        v.jsx(Gu, { status: W.status }),
                        v.jsx("span", {
                          className: "font-mono text-sm text-slate-300",
                          children: W.path,
                        }),
                        v.jsxs("span", {
                          className: "ml-auto flex items-center gap-3",
                          children: [
                            v.jsxs("span", {
                              className: "text-xs text-slate-600",
                              children: [at.get(W.path) || 0, " changes"],
                            }),
                            v.jsx("button", {
                              type: "button",
                              onClick: () => U((N) => !N),
                              className: `rounded px-2 py-0.5 text-xs transition ${F ? "bg-[#1f6feb] text-white" : "text-slate-400 hover:text-slate-200"}`,
                              title: F
                                ? "Switch to diff view"
                                : "View full file",
                              children: F ? "Diff" : "Full file",
                            }),
                          ],
                        }),
                      ],
                    }),
                    F &&
                      v.jsx(OS, {
                        fullFileLoading: R,
                        fullFileError: ie,
                        fullFileContent: Z,
                        selectedFile: W,
                        threadsByKey: G,
                        outdatedThreadIds: te,
                        showPendingOnly: g,
                        dragSelection: x,
                        composeSelection: q,
                        composeDraft: K,
                        replyDrafts: br,
                        onReplyChange: (N, M) => Pi((Q) => ({ ...Q, [N]: M })),
                        onReply: (N) => _i(N),
                        onStatusChange: (N, M) => zi(N, M),
                        onDraftChange: he,
                        onSubmitCompose: Pa,
                        onCancelCompose: () => {
                          (w(null), he(""));
                        },
                        onBeginSelection: Na,
                        onDragUpdate: (N, M, Q) =>
                          Y((oe) => oe && { ...oe, endLine: Q }),
                        panelRef: _t,
                      }),
                    !F &&
                      v.jsx(BS, {
                        selectedFile: W,
                        threadsByKey: G,
                        outdatedThreadIds: te,
                        showPendingOnly: g,
                        dragSelection: x,
                        composeSelection: q,
                        composeDraft: K,
                        replyDrafts: br,
                        onReplyChange: (N, M) => Pi((Q) => ({ ...Q, [N]: M })),
                        onReply: (N) => _i(N),
                        onStatusChange: (N, M) => zi(N, M),
                        onDraftChange: he,
                        onSubmitCompose: Pa,
                        onCancelCompose: () => {
                          (w(null), he(""));
                        },
                        onBeginSelection: Na,
                        onDragUpdate: (N, M, Q) =>
                          Y((oe) => oe && { ...oe, endLine: Q }),
                        panelRef: _t,
                        expandedGaps: se,
                        expansionContent: xt,
                        onExpandGap: (N, M) => void um(N, M),
                      }),
                  ],
                })
              : v.jsx("div", {
                  className:
                    "flex flex-1 items-center justify-center text-sm text-slate-600",
                  children: "Select a file to review",
                }),
          }),
        ],
      }),
    ],
  });
}
function WS() {
  return v.jsx("div", {
    className: "min-h-screen bg-slate-100",
    children: v.jsx(VS, {}),
  });
}
const QS = B.createContext(null),
  tu = { didCatch: !1, error: null };
let qS = class extends B.Component {
  constructor(t) {
    (super(t),
      (this.resetErrorBoundary = this.resetErrorBoundary.bind(this)),
      (this.state = tu));
  }
  static getDerivedStateFromError(t) {
    return { didCatch: !0, error: t };
  }
  resetErrorBoundary() {
    const { error: t } = this.state;
    if (t !== null) {
      for (var n, r, i = arguments.length, l = new Array(i), o = 0; o < i; o++)
        l[o] = arguments[o];
      ((n = (r = this.props).onReset) === null ||
        n === void 0 ||
        n.call(r, { args: l, reason: "imperative-api" }),
        this.setState(tu));
    }
  }
  componentDidCatch(t, n) {
    var r, i;
    (r = (i = this.props).onError) === null || r === void 0 || r.call(i, t, n);
  }
  componentDidUpdate(t, n) {
    const { didCatch: r } = this.state,
      { resetKeys: i } = this.props;
    if (r && n.error !== null && KS(t.resetKeys, i)) {
      var l, o;
      ((l = (o = this.props).onReset) === null ||
        l === void 0 ||
        l.call(o, { next: i, prev: t.resetKeys, reason: "keys" }),
        this.setState(tu));
    }
  }
  render() {
    const {
        children: t,
        fallbackRender: n,
        FallbackComponent: r,
        fallback: i,
      } = this.props,
      { didCatch: l, error: o } = this.state;
    let u = t;
    if (l) {
      const s = { error: o, resetErrorBoundary: this.resetErrorBoundary };
      if (typeof n == "function") u = n(s);
      else if (r) u = B.createElement(r, s);
      else if (i !== void 0) u = i;
      else throw o;
    }
    return B.createElement(
      QS.Provider,
      {
        value: {
          didCatch: l,
          error: o,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      u,
    );
  }
};
function KS() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, r) => !Object.is(n, t[r]));
}
const nu = {
    debug: "color: #6b7280; font-weight: normal;",
    info: "color: #3b82f6; font-weight: normal;",
    warn: "color: #f59e0b; font-weight: bold;",
    error: "color: #ef4444; font-weight: bold;",
    label: "color: #8b5cf6; font-weight: bold;",
    dim: "color: #9ca3af; font-weight: normal;",
  },
  YS = { debug: "🔍", info: "ℹ️", warn: "⚠️", error: "❌" };
function XS() {
  return new Date().toISOString().split("T")[1].slice(0, 12);
}
function Qn(e, t, n) {
  if (e === "debug" || e === "info") return;
  const r = XS(),
    i = YS[e],
    l = nu[e],
    o = `%c[${r}] %c[ui] %c${i} ${t}`,
    u = [nu.dim, nu.label, l];
  n && Object.keys(n).length > 0
    ? (console.groupCollapsed(o, ...u),
      console.log("Context:", n),
      console.groupEnd())
    : console.log(o, ...u);
}
function GS(e, t, n) {
  const r = { ...n };
  (t instanceof Error
    ? ((r.name = t.name), (r.message = t.message), (r.stack = t.stack))
    : (r.error = String(t)),
    Qn("error", e, r));
}
const cs = {
  debug: (e, t) => Qn("debug", e, t),
  info: (e, t) => Qn("info", e, t),
  warn: (e, t) => Qn("warn", e, t),
  error: (e, t) => Qn("error", e, t),
  logError: GS,
  api: (e, t, n, r) => {
    const i = n ? (n >= 500 ? "🔴" : n >= 400 ? "🟡" : "🟢") : "⏳",
      l = r ? ` (${r}ms)` : "",
      o = n ? ` ${n}` : "";
    Qn("info", `${i} ${e} ${t}${o}${l}`);
  },
};
function ZS({ error: e, resetErrorBoundary: t }) {
  return v.jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-gray-50 px-4",
    children: v.jsxs("div", {
      className: "max-w-md w-full bg-white rounded-lg shadow-lg p-6",
      children: [
        v.jsx("div", {
          className:
            "flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full",
          children: v.jsx("svg", {
            className: "w-6 h-6 text-red-600",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: v.jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
            }),
          }),
        }),
        v.jsx("h2", {
          className: "mt-4 text-xl font-semibold text-center text-gray-900",
          children: "Something went wrong",
        }),
        v.jsx("p", {
          className: "mt-2 text-sm text-center text-gray-600",
          children:
            "An unexpected error occurred. Please try refreshing the page.",
        }),
        !1,
        v.jsxs("div", {
          className: "mt-6 flex gap-3",
          children: [
            v.jsx("button", {
              onClick: t,
              className:
                "flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              children: "Try Again",
            }),
            v.jsx("button", {
              onClick: () => window.location.reload(),
              className:
                "flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
              children: "Refresh Page",
            }),
          ],
        }),
      ],
    }),
  });
}
function JS({ children: e }) {
  const t = (r, i) => {
      cs.logError("React error boundary caught error", r, {
        componentStack: i.componentStack,
      });
    },
    n = () => {
      cs.info("Error boundary reset");
    };
  return v.jsx(qS, {
    FallbackComponent: ZS,
    onError: t,
    onReset: n,
    children: e,
  });
}
cs.info("App starting", { env: "production", localApi: "/local-api" });
ru.createRoot(document.getElementById("root")).render(
  v.jsx(Em.StrictMode, { children: v.jsx(JS, { children: v.jsx(WS, {}) }) }),
);
