var U = Object.defineProperty;
var W = (t, e, n) => e in t ? U(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var r = (t, e, n) => W(t, typeof e != "symbol" ? e + "" : e, n);
import { isRef as X, watch as d, toValue as y, effectScope as j } from "@vue/reactivity";
const G = /* @__PURE__ */ new Set(), J = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), K = "abcdefghiklmnopqrstuvwxyz".split("");
function Q(t) {
  const e = t ? K : J;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function Z(t = !1) {
  let e = "";
  for (; e.length === 0 || G.has(e); )
    e = Q(t);
  return e;
}
function w(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function S(t) {
  return t == null;
}
function C(t) {
  return Array.isArray(t);
}
function Y(t) {
  return typeof t == "function";
}
function b(t) {
  return X(t) || Y(t);
}
function te(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const P = {
  immediate: !0,
  deep: !0
};
function _(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function R(t) {
  function e(n) {
    if (!(n instanceof p))
      return;
    n.$runOnDestroy();
    const { children: s } = n;
    if (s instanceof p)
      e(s);
    else if (C(s))
      for (const i of s)
        i instanceof p && e(i);
  }
  e(t), t.$runOnDestroy(), t.$closeScopes(), t.el.remove();
}
function x(t, e, n) {
  if (w(e)) {
    Object.entries(e).forEach(([s, i]) => {
      x(t, s, i);
    });
    return;
  }
  S(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function tt(t) {
  return this.onInit(() => {
    if (b(t)) {
      const e = d(() => y(t), (n) => x(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      x(this.el, t);
  }), this;
}
function et(t, e) {
  return this.onInit(() => {
    if (b(e)) {
      const n = d(() => y(e), (s) => x(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      x(this.el, t, e);
  }), this;
}
function nt(t, e) {
  if (w(t) && !S(e))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (u) => {
    for (const h of Object.keys(u))
      u[h] ? this.el.classList.add(h) : this.el.classList.remove(h);
  }, o = (u) => {
    if (u)
      if (typeof u == "string")
        n && this.el.classList.remove(n), n = u, this.el.classList.add(n);
      else if (C(u)) {
        const h = u.length;
        for (let f = 0; f < h; f++) {
          const l = u[f];
          if (l)
            typeof l == "string" ? (this.el.classList.add(l), s[f] = l) : w(u) && i(l);
          else {
            const a = s[f];
            a && (this.el.classList.remove(a), s[f] = null);
          }
        }
      } else w(u) && i(u);
  }, c = (u, h) => {
    b(h) ? this.onDestroy(d(() => y(h), (f) => {
      o({ [u]: f });
    }, P)) : u && h !== !1 && o(u);
  }, m = (u) => {
    for (const [h, f] of Object.entries(u))
      c(h, f);
  };
  return w(t) ? m(t) : typeof t == "string" && c(t, e), this;
}
function st(t) {
  return this.attr("disabled", t), this;
}
function ot(t, e, n = {
  bubbles: !0
}) {
  return this.el.dispatchEvent(new CustomEvent(t, {
    detail: e,
    ...n
  })), this;
}
function it(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function rt(t) {
  t instanceof p ? t.destroy() : t instanceof Element && t.remove();
}
function D(t) {
  if (t instanceof Element) {
    const e = Reflect.get(t, "__instance");
    e instanceof p && e.$mountPending && e.$runOnMount();
  }
  for (const e of Array.from(t.childNodes))
    D(e);
}
function E(t, e, n, s) {
  const i = t instanceof Element ? t : t.el, o = s ?? i;
  if (e instanceof A)
    for (const c of e.componentChildren)
      E(t, c, n, o);
  else if (e instanceof p)
    t instanceof p && (e.parent = t), n && n.parentNode === o ? o.insertBefore(e.el, n) : o.appendChild(e.el), e.$runOnInit(), O(e, e.componentChildren), e.el.isConnected ? e.$runOnMount() : e.$deferOnMount();
  else if (e instanceof Element)
    n && n.parentNode === o ? o.insertBefore(e, n) : o.appendChild(e);
  else if (typeof e == "string" || typeof e == "number") {
    const c = document.createTextNode(String(e));
    n && n.parentNode === o ? o.insertBefore(c, n) : o.appendChild(c);
  }
}
function T(t, e, n) {
  const s = n ?? (t instanceof Element ? t : t.el), i = document.createComment("dynamic");
  s.appendChild(i);
  let o;
  const c = () => {
    if (o === void 0)
      return;
    const h = Array.isArray(o) ? o : [o];
    for (const f of h)
      rt(f);
    o = void 0;
  }, u = d(() => y(e), (h) => {
    c(), o = h;
    const f = Array.isArray(h) ? h : [h];
    for (const l of f)
      E(t, l, i);
  }, { immediate: !0 });
  t instanceof p && t.onDestroy(() => {
    u(), c(), i.remove();
  });
}
function O(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e != null) {
    if (b(e)) {
      T(t, e);
      return;
    }
    if (typeof e == "string" || typeof e == "number")
      if (S(n))
        s.innerHTML = String(e);
      else {
        const i = document.createTextNode(String(e));
        it(s, i, n) || s.appendChild(i);
      }
    else if (e instanceof A)
      O(s, e.componentChildren);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof p)
      E(t, e);
    else if (Array.isArray(e)) {
      const i = document.createDocumentFragment();
      for (const o of e)
        if (o instanceof A)
          for (const c of o.componentChildren)
            E(t, c, void 0, i);
        else b(o) ? T(t, o, i) : E(t, o, void 0, i);
      s.appendChild(i), s.isConnected && D(s);
    }
  }
}
function ct(t, e, n) {
  let s = [];
  const i = (o) => {
    const c = [], m = /* @__PURE__ */ new Map();
    if (n)
      for (const l of s)
        m.set(l.key, l);
    const u = (l, a, g) => {
      const k = n ? n(l, a) : a, $ = n ? m.get(k) : void 0;
      c.push({ key: k, value: l, child: $ && $.value === l ? $.child : g });
    };
    if (C(o)) {
      const l = o.length;
      for (let a = 0; a < l; a++) {
        const g = e(o[a], a);
        g && u(o[a], a, g);
      }
    } else if (w(o)) {
      const l = Object.keys(o), a = l.length;
      for (let g = 0; g < a; g++) {
        const k = l[g], $ = e(Reflect.get(o, k), k, g);
        $ && u(Reflect.get(o, k), g, $);
      }
    } else if (typeof o == "number")
      for (let l = 0; l < o; l++) {
        const a = e(l);
        a && u(l, l, a);
      }
    const h = c, f = new Set(h.map((l) => l.child));
    for (const l of s)
      f.has(l.child) || (l.child instanceof p ? l.child.destroy() : l.child instanceof Element && l.child.remove());
    if (n) {
      const l = document.createDocumentFragment();
      for (const a of h)
        a.child instanceof p ? (a.child.parent = this, l.appendChild(a.child.el)) : a.child instanceof Element ? l.appendChild(a.child) : l.appendChild(document.createTextNode(String(a.child)));
      this.el.replaceChildren(l), this.el.isConnected && D(this.el);
      for (const a of h)
        s.some((g) => g.child === a.child) || O(this, a.child);
    } else {
      const l = document.createDocumentFragment();
      for (const a of h)
        E(this, a.child, void 0, l);
      this.el.replaceChildren(), this.el.appendChild(l), this.el.isConnected && D(this.el);
    }
    s = h;
  };
  return this.onInit(() => {
    if (b(t)) {
      const o = d(() => y(t), (c) => {
        i(c);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(o);
    } else
      i(t);
  }), this;
}
function v(t, e) {
  const n = (s) => {
    Reflect.set(this.el, t, s);
  };
  if (b(e)) {
    n(y(e));
    const s = d(() => y(e), (i) => {
      n(i);
    }, P);
    this.onDestroy(s);
  } else
    n(e);
}
function lt(t) {
  return v.call(this, "innerHTML", t), this;
}
function at(t) {
  return v.call(this, "id", t), this;
}
function ut(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    if (!this.parent)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      const c = e.parentNode;
      c && (o ? this.el.parentNode !== c && c.insertBefore(this.el, e) : this.el.parentNode === c && this.el.remove());
    }, i = this.el.parentNode;
    if (!i)
      return console.warn("Component element not found. `if()` will not work.");
    if (i.insertBefore(e, this.el), b(t)) {
      const o = d(() => y(t), s, { immediate: !0 });
      this.onDestroy(o);
    } else
      s(t);
  }), this;
}
const ht = (t) => Number(t), ft = (t) => t.trim(), dt = (t) => t.toString().toUpperCase(), pt = (t) => t.toString().toUpperCase();
function mt(t) {
  return t.split("\\s+").map((e) => _(e)).join("\\s+");
}
const yt = (t) => _(t);
function bt(t) {
  return (e) => e.substring(0, t);
}
const ee = {
  trim: ft,
  number: ht,
  uppercase: dt,
  lowercase: pt,
  truncate: bt,
  capitalize: yt,
  capitalizeAll: mt
};
function L(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function q(t, e, n) {
  C(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function N(t, e) {
  (!t.value || C(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (q(t, e.value, !0), e.removeAttribute("checked"));
}
function gt(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = d(t, (i) => {
              i === n.value || C(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: c } = i.target;
              q(t, c, o);
            }, e.eventOptions), N(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = d(t, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: c } = i.target;
              c && (t.value = o);
            }, e.eventOptions), N(t, n);
            break;
          }
          default: {
            const n = this.el, s = d(t, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = L(o, e.transforms), t.value = o;
            }, e.eventOptions), n.value = String(t.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = d(t, (o) => {
          t.value = o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (o) => {
          let c = o.target.value;
          c = L(c, e.transforms), t.value = c;
        }, e.eventOptions);
        const i = C(t.value) ? t.value[0] : t.value;
        if (i)
          n.value = i.toString();
        else if (n.childElementCount > 0) {
          const o = Array.from(n.children).find((c) => c.hasAttribute("selected"));
          if (o) {
            o.removeAttribute("selected");
            const c = o.value;
            t.value = c, n.value = c;
          }
        }
        break;
      }
      case "DETAILS": {
        const n = this.el, s = d(t, (o) => {
          n.open = !!o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          t.value = n.open;
        }, e.eventOptions);
        const i = C(t.value) ? t.value[0] : t.value;
        n.open = !!i;
        break;
      }
      default:
        this.prop("modelValue", t);
    }
  }), this;
}
function Ct(t, ...e) {
  const n = C(t) ? t.concat(e) : [t].concat(e);
  return this.$setComponentChildren(n), this;
}
function vt(t) {
  return (e, n) => typeof t != "number" ? !0 : Date.now() - n.lastCall >= t;
}
function wt(t) {
  return () => new Promise((e) => {
    setTimeout(() => e(!0), t);
  });
}
const kt = (t, e) => e.executedTimes === 0, $t = (t) => (t.stopPropagation(), !0), Et = (t) => (t.stopImmediatePropagation(), !0), St = (t) => (t.preventDefault(), !0), xt = () => !1, ne = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (t) => () => !!y(t),
  throttle: vt,
  once: kt,
  stop: $t,
  stopImmediate: Et,
  prevent: St,
  cancel: xt,
  delay: wt
};
function Ot(t, e, n = {}) {
  const s = {
    executedTimes: 0,
    lastCall: 0
  };
  async function i(o) {
    if (n.modifiers) {
      for (const c of n.modifiers)
        if (!await c(o, s))
          return;
    }
    e(o, "detail" in o ? o.detail : void 0), s.executedTimes++, s.lastCall = Date.now();
  }
  return this.onMount(() => {
    this.el.addEventListener(t, i, n.options);
  }), this.onDestroy(() => {
    this.el.removeEventListener(t, i);
  }), this;
}
function Dt(t, e) {
  return this.on("click", t, e);
}
function At(t, e) {
  return this.on("submit", t, e);
}
function Pt(t, e) {
  return this.on("focus", t, e);
}
function It(t, e) {
  return this.on("blur", t, e);
}
function Mt(t, e) {
  return this.on("change", t, e);
}
function jt(t, e) {
  return this.on("input", t, e);
}
function M(t, e, n, s) {
  const i = [];
  function o(m) {
    i.push(m), i.length > e.length && i.shift();
  }
  const c = Array.isArray(e) ? e : [e];
  this.on(t, (m) => {
    const u = m.key;
    function h() {
      n(m, "detail" in m ? m.detail : void 0);
    }
    switch ((s == null ? void 0 : s.detect) || "every") {
      case "some": {
        c.includes(u) && h();
        break;
      }
      case "every":
      default: {
        o(u), c.every((l, a) => l === i[a]) && h();
        break;
      }
    }
  }, s);
}
function Tt(t, e) {
  return this.on("keydown", t, e);
}
function Lt(t, e, n) {
  return M.call(this, "keydown", t, e, n), this;
}
function Nt(t, e) {
  return this.on("keyup", t, e);
}
function Vt(t, e, n) {
  return M.call(this, "keyup", t, e, n), this;
}
function _t(t, e) {
  return this.on("keyup", t, e);
}
function qt(t, e, n) {
  return M.call(this, "keypress", t, e, n), this;
}
function Bt(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? S(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (b(t)) {
      const s = d(() => y(t), n, P);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Ft(t, e) {
  const n = (s) => {
    if (!w(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof t == "string")
    if (b(e)) {
      const s = d(() => y(e), (i) => {
        n({ [t]: i });
      });
      this.onDestroy(s);
    } else e && n({ [t]: e });
  else if (b(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = d(() => y(t), n, P);
      this.onDestroy(s);
    }
  else if (w(t)) {
    const s = Object.keys(t);
    for (const i of s) {
      const o = Reflect.get(t, i);
      if (b(o)) {
        const c = d(() => y(o), (m) => {
          S(m) || this.el.style.setProperty(i, String(m));
        });
        this.onDestroy(c);
      } else S(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function Ht(t) {
  return v.call(this, "textContent", t), this;
}
class p {
  constructor(e, n) {
    /**
     * Set `textContent` of the current component.
     */
    r(this, "text", Ht);
    /**
     * Set `innerHTML` of the current component.
     */
    r(this, "html", lt);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    r(this, "on", Ot);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    r(this, "click", Dt);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    r(this, "submit", At);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    r(this, "focus", Pt);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    r(this, "blur", It);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    r(this, "change", Mt);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    r(this, "input", jt);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    r(this, "keydown", Tt);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    r(this, "keydownExact", Lt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    r(this, "keyup", Nt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    r(this, "keyupExact", Vt);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    r(this, "keypress", _t);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    r(this, "keypressExact", qt);
    /**
     * Bind reactive class object to the current component.
     */
    r(this, "class", nt);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    r(this, "nest", Ct);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    r(this, "model", gt);
    /**
     * Bind attribute object to the component.
     */
    r(this, "attrs", tt);
    /**
     * Bind a single attribute to the component.
     */
    r(this, "attr", et);
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    r(this, "disabled", st);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    r(this, "id", at);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    r(this, "show", Bt);
    /**
     * Add reactive styling object to the current component.
     */
    r(this, "style", Ft);
    /**
     * Conditionally render a component.
     */
    r(this, "if", ut);
    //
    // Public stuff which could be useful to users
    r(this, "identifier");
    /**
     * Stores reference to the mounted DOM Element of the current component.
     */
    r(this, "el");
    /**
     * Stores child component instances.
     */
    r(this, "componentChildren", []);
    /**
     * Normally, providing children to a component will render them as the first descendant of said component. You can change the place where children will render, effectively creating a slot component.
     * You can do this by using `ctx.children` in your component's `.nest()` call.
     *
     * ```ts
     * // Inside Wrapper component
     * ctx.nest(div(ctx.children).class("wrapper"))
     * // Using the Wrapper component
     * Wrapper(h1("Hello world"))
     * // Will render
     * <div><div><h1>"Hello world"</h1></div></div>
     * ```
     */
    r(this, "children", []);
    /**
     * Stores the reference to the parent Component instance, if it has one.
     */
    r(this, "parent", null);
    /**
     * If true, the component can not have any child components
     */
    r(this, "isVoid", !1);
    /**
     * Stores reference to the element the component is mounted to. Only the
     * top-most component has a root element.
     */
    r(this, "root", null);
    r(this, "isRoot", !1);
    //
    // Private stuff for implementation
    r(this, "$onMountCbs", []);
    r(this, "$onDestroyCbs", []);
    r(this, "$onInitCbs", []);
    r(this, "$isMounted", !1);
    r(this, "$mountPending", !1);
    r(this, "$scopes", /* @__PURE__ */ new Set());
    r(this, "$runningScopes", /* @__PURE__ */ new Set());
    r(this, "$componentProps");
    /**
     * Iterate over the provided object / array / number and execute the provided
     * callback for each item. Components returned from the callback are then
     * rendered.
     *
     * It is recommended not to use other chained methods when using `for`,
     * because the base element is replaced with the return value of the callback
     * function. All logic should therefore be handled there.
     *
     * @param source Array|Object|Number
     * @param callback Function which runs for each provided item.
     * @returns Component to render
     *
     *
     */
    r(this, "for", ct);
    /**
     * Emit a custom event which parent components can listen for. Additionally,
     * you can provide data which should be sent along.
     *
     * @param eventName Your custom event name
     * @param data Any kind of data to be sent
     */
    r(this, "emit", ot);
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.$componentProps = n ?? {}, this.identifier = Z(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  $setComponentChildren(e) {
    this.isVoid || (this.componentChildren = e);
  }
  $runOnMount() {
    if (!this.$isMounted) {
      this.$isMounted = !0, this.$mountPending = !1;
      for (const e of this.$onMountCbs)
        e();
    }
  }
  $deferOnMount() {
    this.$mountPending = !0;
  }
  $runOnDestroy() {
    for (const e of this.$onDestroyCbs)
      e();
  }
  $runOnInit() {
    for (const e of this.$onInitCbs)
      e();
  }
  $rerunSetup() {
    for (const e of this.$scopes) {
      const n = j();
      n.run(() => {
        e(this, this.$componentProps);
      }), this.$runningScopes.add(n);
    }
  }
  $closeScopes() {
    for (const e of this.$runningScopes)
      e.stop();
    this.$runningScopes = /* @__PURE__ */ new Set();
  }
  /////////////////////////////////////////////////////////////
  // Public API
  /**
   * Executes provided callback function when the component is initialized.
   * Before being rendered in the DOM.
   *
   * @param callback {function}
   */
  onInit(e) {
    this.$onInitCbs.push(e);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(e) {
    this.$onMountCbs.push(e);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(e) {
    this.$onDestroyCbs.push(e);
  }
  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive #scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(e = "body") {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    this.root = n, this.isRoot = !0, n.appendChild(this.el), this.$rerunSetup(), this.$runOnInit(), O(this, this.componentChildren), this.$runOnMount();
  }
  /**
   * Removes component from the DOM, deactivates its instance and removes all reactive scopes.
   */
  destroy() {
    R(this);
  }
  /**
   * Clones the component. All reactive variables, DOM child nodes and chained
   * functions should work. Cloning does not reassign the component back to the
   * DOM, so it must be re-inserted.
   *
   * @returns Cloned component
   */
  clone() {
    const e = new p(this.el);
    return e.componentChildren = this.componentChildren, e.$scopes = new Set(this.$scopes), e;
  }
  /**
   * Pass a single prop value into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   *
   * @param key {string}
   * @param value {any}
   */
  prop(e, n) {
    return Object.assign(this.$componentProps, { [e]: n }), this;
  }
  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props(e) {
    for (const n of Object.keys(e))
      Object.assign(this.$componentProps, { [n]: e[n] });
    return this;
  }
  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
  setup(e) {
    return this.$scopes.add(e), this.onInit(() => {
      const n = j();
      n.run(() => {
        e(this, this.$componentProps);
      }), this.onDestroy(() => {
        n.stop();
      });
    }), this;
  }
}
class I extends p {
  constructor(e) {
    super(document.createElement(e));
  }
  $setComponentChildren(e) {
    this.componentChildren = [];
  }
}
class A extends p {
  constructor(e = []) {
    super(document.createElement("template")), this.componentChildren = e;
  }
  mount(e) {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    this.$runOnInit(), O(n, this.componentChildren), this.$runOnMount();
  }
}
function zt(t = [], ...e) {
  const n = C(t) ? t.concat(e) : [t].concat(e);
  return new A(n);
}
class Ut extends I {
  constructor(n) {
    super("img");
    r(this, "el");
    this.el = n;
  }
  src(n) {
    return v.call(this, "src", n), this;
  }
  alt(n) {
    return v.call(this, "alt", n), this;
  }
}
function Wt(t) {
  const e = document.createElement("img"), n = new Ut(e);
  return t && n.src(t), n;
}
class B extends I {
  constructor(n, s) {
    super();
    r(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  type(n) {
    this.el.type = n;
  }
  value(n) {
    return v.call(this, "value", n), this;
  }
  placeholder(n) {
    return v.call(this, "placeholder", n), this;
  }
  name(n) {
    return v.call(this, "name", n), this;
  }
  required(n) {
    return v.call(this, "required", n), this;
  }
}
function Xt(t = "text") {
  const e = document.createElement("input");
  return new B(e, t);
}
function Gt() {
  const t = document.createElement("textarea");
  return new B(t);
}
class Jt extends I {
  constructor(e, n) {
    if (super("option"), n) {
      const s = y(n);
      this.el.value = String(s), this.el.textContent = String(s), b(n) && this.value(n);
    }
    e && (this.el.textContent = String(e));
  }
  value(e) {
    return v.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function Kt(t, e) {
  return new Jt(t, e);
}
const Qt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], F = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], H = Qt.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const i = document.createElement(e), o = new p(i), c = C(n) ? n.concat(s) : [n].concat(s);
  return o.$setComponentChildren(c), o.children = c, o;
}, t), {}), z = F.reduce((t, e) => (t[e] = () => {
  const n = new I(e);
  return n.isVoid = !0, n;
}, t), {}), V = Object.assign(H, z, {
  fragment: zt,
  input: Xt,
  textarea: Gt,
  option: Kt,
  img: Wt
}), Zt = [
  ...F,
  "input",
  "textarea",
  "option"
];
function se(t, e) {
  return (n = [], ...s) => {
    const i = C(n) ? n.concat(s) : [n].concat(s), o = Zt.includes(t) ? V[t]() : V[t](i);
    return o.setup(e), o;
  };
}
const {
  a: oe,
  abbr: ie,
  address: re,
  applet: ce,
  article: le,
  aside: ae,
  audio: ue,
  b: he,
  basefont: fe,
  bdi: de,
  bdo: pe,
  bgsound: me,
  blink: ye,
  blockquote: be,
  body: ge,
  button: Ce,
  canvas: ve,
  caption: we,
  cite: ke,
  code: $e,
  colgroup: Ee,
  content: Se,
  data: xe,
  datalist: Oe,
  dd: De,
  decorator: Ae,
  del: Pe,
  details: Ie,
  dfn: Me,
  div: je,
  dl: Te,
  dt: Le,
  element: Ne,
  em: Ve,
  fieldset: _e,
  figcaption: qe,
  figure: Be,
  footer: Fe,
  form: He,
  h1: ze,
  h2: Ue,
  h3: We,
  h4: Xe,
  h5: Ge,
  h6: Je,
  head: Ke,
  header: Qe,
  hgroup: Ze,
  html: Ye,
  i: Re,
  iframe: tn,
  ins: en,
  isindex: nn,
  kbd: sn,
  keygen: on,
  label: rn,
  legend: cn,
  li: ln,
  listing: an,
  main: un,
  map: hn,
  mark: fn,
  menu: dn,
  meter: pn,
  nav: mn,
  noscript: yn,
  object: bn,
  ol: gn,
  optgroup: Cn,
  output: vn,
  p: wn,
  picture: kn,
  pre: $n,
  progress: En,
  q: Sn,
  rp: xn,
  rt: On,
  ruby: Dn,
  s: An,
  samp: Pn,
  script: In,
  section: Mn,
  select: jn,
  shadow: Tn,
  small: Ln,
  spacer: Nn,
  span: Vn,
  strong: _n,
  style: qn,
  sub: Bn,
  summary: Fn,
  sup: Hn,
  table: zn,
  tbody: Un,
  td: Wn,
  template: Xn,
  tfoot: Gn,
  th: Jn,
  thead: Kn,
  time: Qn,
  title: Zn,
  tr: Yn,
  u: Rn,
  ul: ts,
  video: es
} = H, {
  area: ns,
  base: ss,
  br: os,
  col: is,
  embed: rs,
  hr: cs,
  link: ls,
  meta: as,
  source: us,
  track: hs,
  wbr: fs
} = z;
export {
  p as Component,
  ne as Modifier,
  ee as Transform,
  oe as a,
  ie as abbr,
  re as address,
  ce as applet,
  ns as area,
  le as article,
  ae as aside,
  ue as audio,
  he as b,
  ss as base,
  fe as basefont,
  de as bdi,
  pe as bdo,
  me as bgsound,
  ye as blink,
  be as blockquote,
  ge as body,
  os as br,
  Ce as button,
  ve as canvas,
  we as caption,
  ke as cite,
  $e as code,
  is as col,
  Ee as colgroup,
  Se as content,
  Z as createId,
  xe as data,
  Oe as datalist,
  De as dd,
  Ae as decorator,
  Pe as del,
  Ie as details,
  Me as dfn,
  je as div,
  Te as dl,
  Le as dt,
  Ne as element,
  Ve as em,
  rs as embed,
  _e as fieldset,
  qe as figcaption,
  Be as figure,
  Fe as footer,
  He as form,
  zt as fragment,
  te as getInstance,
  ze as h1,
  Ue as h2,
  We as h3,
  Xe as h4,
  Ge as h5,
  Je as h6,
  Ke as head,
  Qe as header,
  Ze as hgroup,
  cs as hr,
  Ye as html,
  Re as i,
  tn as iframe,
  Wt as img,
  Xt as input,
  en as ins,
  nn as isindex,
  sn as kbd,
  on as keygen,
  rn as label,
  cn as legend,
  ln as li,
  ls as link,
  an as listing,
  un as main,
  hn as map,
  fn as mark,
  dn as menu,
  as as meta,
  pn as meter,
  mn as nav,
  yn as noscript,
  bn as object,
  gn as ol,
  Cn as optgroup,
  Kt as option,
  vn as output,
  wn as p,
  kn as picture,
  $n as pre,
  En as progress,
  Sn as q,
  se as reusable,
  xn as rp,
  On as rt,
  Dn as ruby,
  An as s,
  Pn as samp,
  In as script,
  Mn as section,
  jn as select,
  Tn as shadow,
  Ln as small,
  us as source,
  Nn as spacer,
  Vn as span,
  _n as strong,
  qn as style,
  Bn as sub,
  Fn as summary,
  Hn as sup,
  zn as table,
  Un as tbody,
  Wn as td,
  Xn as template,
  Gt as textarea,
  Gn as tfoot,
  Jn as th,
  Kn as thead,
  Qn as time,
  Zn as title,
  Yn as tr,
  hs as track,
  Rn as u,
  ts as ul,
  es as video,
  fs as wbr
};
