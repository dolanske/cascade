var z = Object.defineProperty;
var F = (t, e, n) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => F(t, typeof e != "symbol" ? e + "" : e, n);
import { isRef as B, toValue as p, effectScope as D } from "@vue/reactivity";
import { watch as h } from "@vue-reactivity/watch";
function g(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function k(t) {
  return t == null;
}
function y(t) {
  return Array.isArray(t);
}
function j(t) {
  return typeof t == "function";
}
function f(t) {
  return B(t) || j(t);
}
function Qt(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const v = {
  immediate: !0,
  deep: !0
};
function T(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function _(t, e, n) {
  const s = (o) => {
    Reflect.set(this.el, t, o);
  };
  if (f(e)) {
    const o = h(() => p(e), (i) => {
      s(n ? String(i) : i);
    }, v);
    this.onDestroy(o);
  } else
    s(n ? String(e) : e);
}
function N(t) {
  return _.call(this, "textContent", t == null ? void 0 : t.toString()), this;
}
function U(t) {
  return (e, n) => typeof t != "number" ? !0 : Date.now() - n.lastCall >= t;
}
function W(t) {
  return () => new Promise((e) => {
    setTimeout(() => e(!0), t);
  });
}
const $ = (t, e) => e.executedTimes === 0, X = (t) => (t.stopPropagation(), !0), G = (t) => (t.stopImmediatePropagation(), !0), J = (t) => (t.preventDefault(), !0), Q = () => !1, Z = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (t) => () => !!p(t),
  throttle: U,
  once: $,
  stop: X,
  stopImmediate: G,
  prevent: J,
  cancel: Q,
  delay: W
};
function Y(t, e, n = {}) {
  const s = {
    executedTimes: 0,
    lastCall: 0
  };
  async function o(i) {
    if (n.modifiers) {
      for (const r of n.modifiers)
        if (!await r(i, s))
          return;
    }
    "handleEvent" in e ? e.handleEvent(i) : e(i), s.executedTimes++, s.lastCall = Date.now();
  }
  return this.onMount(() => {
    this.el.addEventListener(t, o, n.options);
  }), this.onDestroy(() => {
    this.el.removeEventListener(t, o);
  }), this;
}
function K(t, e) {
  return this.on("click", t, e);
}
function R(t, e) {
  return this.on("submit", t, e);
}
function tt(t, e) {
  return this.on("focus", t, e);
}
function et(t, e) {
  return this.on("blur", t, e);
}
function nt(t, e) {
  return this.on("change", t, e);
}
function st(t, e) {
  return this.on("input", t, e);
}
function O(t, e, n, s) {
  const o = [];
  function i(u) {
    o.push(u), o.length > e.length && o.shift();
  }
  const r = Array.isArray(e) ? e : [e];
  this.on(t, (u) => {
    const l = u.key;
    function a() {
      j(n) ? n(u) : n.handleEvent(u);
    }
    switch ((s == null ? void 0 : s.detect) || "every") {
      case "some": {
        r.includes(l) && a();
        break;
      }
      case "every":
      default: {
        i(l), r.every((C, E) => C === o[E]) && a();
        break;
      }
    }
  }, s);
}
function ot(t, e) {
  return this.on("keydown", t, e);
}
function it(t, e, n) {
  return O.call(this, "keydown", t, e, n), this;
}
function rt(t, e) {
  return this.on("keyup", t, e);
}
function ct(t, e, n) {
  return O.call(this, "keyup", t, e, n), this;
}
function lt(t, e) {
  return this.on("keyup", t, e);
}
function ut(t, e, n) {
  return O.call(this, "keypress", t, e, n), this;
}
function at(t, e) {
  if (g(t) && !k(e))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), o = (l) => {
    for (const a of Object.keys(l))
      l[a] ? this.el.classList.add(a) : this.el.classList.remove(a);
  }, i = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (y(l)) {
        const a = l.length;
        for (let m = 0; m < a; m++) {
          const C = l[m];
          if (C)
            typeof C == "string" ? (this.el.classList.add(C), s[m] = C) : g(l) && o(C);
          else {
            const E = s[m];
            E && (this.el.classList.remove(E), s[m] = null);
          }
        }
      } else g(l) && o(l);
  }, r = (l, a) => {
    f(a) ? this.onDestroy(h(() => p(a), (m) => {
      i({ [l]: m });
    }, v)) : l && a !== !1 && i(l);
  }, u = (l) => {
    for (const [a, m] of Object.entries(l))
      r(a, m);
  };
  return g(t) ? u(t) : typeof t == "string" && r(t, e), this;
}
function ht(t) {
  return _.call(this, "innerHTML", t), this;
}
function pt(t, ...e) {
  const n = y(t) ? t.concat(e) : [t].concat(e);
  return this.__setComponentChildren(n), this;
}
const ft = (t) => Number(t), dt = (t) => t.trim(), mt = (t) => t.toString().toUpperCase(), yt = (t) => t.toString().toUpperCase();
function bt(t) {
  return t.split("\\s+").map((e) => T(e)).join("\\s+");
}
const _t = (t) => T(t);
function gt(t) {
  return (e) => e.substring(0, t);
}
const Zt = {
  trim: dt,
  number: ft,
  uppercase: mt,
  lowercase: yt,
  truncate: gt,
  capitalize: _t,
  capitalizeAll: bt
};
function I(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function L(t, e, n) {
  y(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function A(t, e) {
  (!t.value || y(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (L(t, e.value, !0), e.removeAttribute("checked"));
}
function Ct(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(t, (o) => {
              o === n.value || y(o) && o.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { checked: i, value: r } = o.target;
              L(t, r, i);
            }, e.eventOptions), A(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(t, (o) => {
              n.checked = o === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { value: i, checked: r } = o.target;
              r && (t.value = i);
            }, e.eventOptions), A(t, n);
            break;
          }
          default: {
            const n = this.el, s = h(t, (o) => {
              n.value = String(o);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (o) => {
              let i = o.target.value;
              i = I(i, e.transforms), t.value = i;
            }, e.eventOptions), n.value = String(t.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = h(t, (i) => {
          t.value = i;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (i) => {
          let r = i.target.value;
          r = I(r, e.transforms), t.value = r;
        }, e.eventOptions);
        const o = y(t.value) ? t.value[0] : t.value;
        if (o)
          n.value = o.toString();
        else if (n.childElementCount > 0) {
          const i = Array.from(n.children).find((r) => r.hasAttribute("selected"));
          if (i) {
            i.removeAttribute("selected");
            const r = i.value;
            t.value = r, n.value = r;
          }
        }
        break;
      }
      case "DETAILS": {
        const n = this.el, s = h(t, (i) => {
          n.open = !!i;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          t.value = n.open;
        }, e.eventOptions);
        const o = y(t.value) ? t.value[0] : t.value;
        n.open = !!o;
        break;
      }
    }
  }), this;
}
function kt(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function b(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e)
    if (typeof e == "string" || typeof e == "number")
      if (k(n))
        s.innerHTML = String(e);
      else {
        const o = document.createTextNode(String(e));
        kt(s, o, n) || s.appendChild(o);
      }
    else if (e instanceof x)
      b(s, e.componentChildren);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof d)
      t instanceof d && (e.parent = t), s.appendChild(e.el), e.__runOnInit(), b(e, e.componentChildren), e.__runOnMount();
    else if (Array.isArray(e)) {
      const o = e.length;
      for (let i = 0; i < o; i++) {
        const r = e[i];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? b(s, r, i) : r instanceof x ? b(s, r.componentChildren) : f(r) ? h(() => p(r), (u) => {
          b(s, u, i);
        }, {
          immediate: !0,
          deep: !0
        }) : (t instanceof d && (r.parent = t), s.appendChild(r.el), r.__runOnInit(), b(r, r.componentChildren), r.__runOnMount());
      }
    } else f(e) && h(() => p(e), (o) => {
      o instanceof d ? o.destroy() : s.innerHTML = "", b(s, o);
    }, {
      immediate: !0,
      deep: !0
    });
}
function w(t, e, n) {
  if (g(e)) {
    Object.entries(e).forEach(([s, o]) => {
      w(t, s, o);
    });
    return;
  }
  k(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function wt(t) {
  return this.onInit(() => {
    if (f(t)) {
      const e = h(() => p(t), (n) => w(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      w(this.el, t);
  }), this;
}
function vt(t, e) {
  return this.onInit(() => {
    if (f(e)) {
      const n = h(() => p(e), (s) => w(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      w(this.el, t, e);
  }), this;
}
function Et(t) {
  return this.attr("disabled", t), this;
}
function St(t) {
  return _.call(this, "id", t), this;
}
function xt(t) {
  function e(n) {
    if (!(n instanceof d))
      return;
    for (const o of n.__onDestroyCbs)
      o();
    const { children: s } = n;
    if (s instanceof d)
      e(s);
    else if (y(s))
      for (const o of s)
        o instanceof d && e(o);
  }
  e(t), t.__runOnDestroy(), t.el.remove();
}
function Ot(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? k(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (f(t)) {
      const s = h(() => p(t), n, v);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Dt(t, e) {
  return this.onInit(() => {
    const n = (s) => {
      const o = [];
      if (y(s)) {
        const i = s.length;
        for (let r = 0; r < i; r++) {
          const u = e(s[r], r);
          u && o.push(u);
        }
      } else if (g(s)) {
        const i = Object.keys(s), r = i.length;
        for (let u = 0; u < r; u++) {
          const l = i[u], a = e(Reflect.get(s, l), l, u);
          a && o.push(a);
        }
      } else if (typeof s == "number")
        for (let i = 0; i < s; i++) {
          const r = e(i);
          r && o.push(r);
        }
      this.el.replaceChildren(), b(this.el, o);
    };
    if (f(t)) {
      const s = h(() => p(t), (o) => {
        n(o);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function It(t, e) {
  const n = (s) => {
    if (!g(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const o = Object.keys(s);
    for (const i of o)
      this.el.style.setProperty(i, Reflect.get(s, i));
  };
  if (typeof t == "string")
    if (f(e)) {
      const s = h(() => p(e), (o) => {
        n({ [t]: o });
      });
      this.onDestroy(s);
    } else e && n({ [t]: e });
  else if (f(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = h(() => p(t), n, v);
      this.onDestroy(s);
    }
  else if (g(t)) {
    const s = Object.keys(t);
    for (const o of s) {
      const i = Reflect.get(t, o);
      if (f(i)) {
        const r = h(() => p(i), (u) => {
          k(u) || this.el.style.setProperty(o, String(u));
        });
        this.onDestroy(r);
      } else k(i) || this.el.style.setProperty(o, String(i));
    }
  }
  return this;
}
function At(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      o ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), f(t)) {
      const o = h(() => p(t), s, v);
      this.onDestroy(o);
    } else
      s(t);
  }), this;
}
const Pt = /* @__PURE__ */ new Set(), jt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), Tt = "abcdefghiklmnopqrstuvwxyz".split("");
function Lt(t) {
  const e = t ? Tt : jt;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function Mt(t = !1) {
  let e = "";
  for (; e.length === 0 || Pt.has(e); )
    e = Lt(t);
  return e;
}
class d {
  constructor(e, n) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", N);
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", ht);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", Y);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", K);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", R);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", tt);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", et);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", nt);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", st);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", ot);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", it);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", rt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", ct);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", lt);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keypressExact", ut);
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", at);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", pt);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", Ct);
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", wt);
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", vt);
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", Et);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", St);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", Ot);
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", It);
    /**
     * Conditionally render a component.
     */
    c(this, "if", At);
    //
    // Public stuff which could be useful to users
    c(this, "identifier");
    /**
     * Stores reference to the mounted DOM Element of the current component.
     */
    c(this, "el");
    /**
     * Stores child component instances.
     */
    c(this, "componentChildren", []);
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
    c(this, "children", []);
    /**
     * Stores the reference to the parent Component instance, if it has one.
     */
    c(this, "parent", null);
    /**
     * If true, the component can not have any child components
     */
    c(this, "isVoid", !1);
    //
    // Private stuff for implementation
    c(this, "__onMountCbs", []);
    c(this, "__onDestroyCbs", []);
    c(this, "__onInitCbs", []);
    c(this, "__scopes", /* @__PURE__ */ new Set());
    c(this, "__runningScopes", /* @__PURE__ */ new Set());
    c(this, "__componentProps");
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
    c(this, "for", Dt);
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.__componentProps = n ?? {}, this.identifier = Mt(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  __setComponentChildren(e) {
    this.isVoid || (this.componentChildren = e);
  }
  __runOnMount() {
    for (const e of this.__onMountCbs)
      e();
  }
  __runOnDestroy() {
    for (const e of this.__onDestroyCbs)
      e();
  }
  __runOnInit() {
    for (const e of this.__onInitCbs)
      e();
  }
  __rerunSetup() {
    for (const e of this.__scopes) {
      const n = D();
      n.run(() => {
        e(this, this.__componentProps);
      }), this.__runningScopes.add(n);
    }
  }
  __closeScopes() {
    for (const e of this.__runningScopes)
      e.stop();
    this.__runningScopes = /* @__PURE__ */ new Set();
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
    this.__onInitCbs.push(e);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(e) {
    this.__onMountCbs.push(e);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(e) {
    this.__onDestroyCbs.push(e);
  }
  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive __scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(e = "body") {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    n.appendChild(this.el), this.__rerunSetup(), this.__runOnInit(), b(this, this.componentChildren), this.__runOnMount();
  }
  /**
   * Removes component from the DOM, deactivates its instance and removes all reactive scopes.
   */
  destroy() {
    xt(this);
  }
  /**
   * Clones the component. All reactive variables, DOM child nodes and chained
   * functions should work. Cloning does not reassign the component back to the
   * DOM, so it must be re-inserted.
   *
   * @returns Cloned component
   */
  clone() {
    const e = new d(this.el);
    return e.componentChildren = this.componentChildren, e.__scopes = new Set(this.__scopes), e;
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
    return Object.assign(this.__componentProps, { [e]: n }), this;
  }
  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props(e) {
    for (const n of Object.keys(e))
      Object.assign(this.__componentProps, { [n]: e[n] });
    return this;
  }
  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
  setup(e) {
    return this.__scopes.add(e), this.onInit(() => {
      const n = D();
      n.run(() => {
        e(this, this.__componentProps);
      }), this.onDestroy(() => {
        n.stop();
      });
    }), this;
  }
}
class S extends d {
  constructor(e) {
    super(document.createElement(e));
  }
  __setComponentChildren(e) {
    this.componentChildren = [];
  }
}
class x extends d {
  constructor(e = []) {
    super(document.createElement("template")), this.componentChildren = e;
  }
  mount(e) {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), b(n, this.componentChildren), this.__runOnMount();
  }
}
function Vt(t) {
  return new x(t);
}
class M extends S {
  constructor(n, s) {
    super();
    c(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  type(n) {
    this.el.type = n;
  }
  value(n) {
    return _.call(this, "value", n), this;
  }
  placeholder(n) {
    return _.call(this, "placeholder", n), this;
  }
  name(n) {
    return _.call(this, "name", n), this;
  }
  required(n) {
    return _.call(this, "required", n), this;
  }
}
function qt(t = "text") {
  const e = document.createElement("input");
  return new M(e, t);
}
function Ht() {
  const t = document.createElement("textarea");
  return new M(t);
}
class zt extends S {
  constructor(e, n) {
    if (super("option"), n) {
      const s = p(n);
      this.el.value = String(s), this.el.textContent = String(s), f(n) && this.value(n);
    }
    e && (this.el.textContent = String(e));
  }
  value(e) {
    return _.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function Ft(t, e) {
  return new zt(t, e);
}
class Bt extends S {
  constructor(n) {
    super("img");
    c(this, "el");
    this.el = n;
  }
  src(n) {
    return _.call(this, "src", n), this;
  }
  alt(n) {
    return _.call(this, "alt", n), this;
  }
}
function Nt(t) {
  const e = document.createElement("img"), n = new Bt(e);
  return t && n.src(t), n;
}
const Ut = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], V = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], q = Ut.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const o = document.createElement(e), i = new d(o), r = y(n) ? n.concat(s) : [n].concat(s);
  return i.__setComponentChildren(r), i.children = r, i;
}, t), {}), H = V.reduce((t, e) => (t[e] = () => {
  const n = new S(e);
  return n.isVoid = !0, n;
}, t), {}), P = Object.assign(q, H, {
  fragment: Vt,
  input: qt,
  textarea: Ht,
  option: Ft,
  img: Nt
}), Wt = [
  ...V,
  "input",
  "textarea",
  "option"
];
function Yt(t, e) {
  return (n = [], ...s) => {
    const o = y(n) ? n.concat(s) : [n].concat(s), i = Wt.includes(t) ? P[t]() : P[t](o);
    return i.setup(e), i;
  };
}
const {
  a: Kt,
  abbr: Rt,
  address: te,
  applet: ee,
  article: ne,
  aside: se,
  audio: oe,
  b: ie,
  basefont: re,
  bdi: ce,
  bdo: le,
  bgsound: ue,
  blink: ae,
  blockquote: he,
  body: pe,
  button: $t,
  canvas: fe,
  caption: de,
  cite: me,
  code: ye,
  colgroup: be,
  content: _e,
  data: ge,
  datalist: Ce,
  dd: ke,
  decorator: we,
  del: ve,
  details: Ee,
  dfn: Se,
  div: xe,
  dl: Oe,
  dt: De,
  element: Ie,
  em: Ae,
  fieldset: Pe,
  figcaption: je,
  figure: Te,
  footer: Le,
  form: Me,
  h1: Ve,
  h2: qe,
  h3: He,
  h4: ze,
  h5: Fe,
  h6: Be,
  head: Ne,
  header: Ue,
  hgroup: We,
  html: $e,
  i: Xe,
  iframe: Ge,
  ins: Je,
  isindex: Qe,
  kbd: Ze,
  keygen: Ye,
  label: Ke,
  legend: Re,
  li: tn,
  listing: en,
  main: nn,
  map: sn,
  mark: on,
  menu: rn,
  meter: cn,
  nav: ln,
  noscript: un,
  object: an,
  ol: hn,
  optgroup: pn,
  output: fn,
  p: dn,
  picture: mn,
  pre: yn,
  progress: bn,
  q: _n,
  rp: gn,
  rt: Cn,
  ruby: kn,
  s: wn,
  samp: vn,
  script: En,
  section: Sn,
  select: xn,
  shadow: On,
  small: Dn,
  spacer: In,
  span: An,
  strong: Pn,
  style: jn,
  sub: Tn,
  summary: Ln,
  sup: Mn,
  table: Vn,
  tbody: qn,
  td: Hn,
  template: zn,
  tfoot: Fn,
  th: Bn,
  thead: Nn,
  time: Un,
  title: Wn,
  tr: $n,
  u: Xn,
  ul: Gn,
  video: Jn
} = q, {
  area: Qn,
  base: Zn,
  br: Yn,
  col: Kn,
  embed: Rn,
  hr: ts,
  link: es,
  meta: ns,
  source: ss,
  track: os,
  wbr: is
} = H;
$t().text("Click").on("click", () => {
  console.log("Clicked");
}, {
  modifiers: [Z.delay(500)]
}).mount("#app");
export {
  d as Component,
  Z as Modifiers,
  Zt as Transform,
  Kt as a,
  Rt as abbr,
  te as address,
  ee as applet,
  Qn as area,
  ne as article,
  se as aside,
  oe as audio,
  ie as b,
  Zn as base,
  re as basefont,
  ce as bdi,
  le as bdo,
  ue as bgsound,
  ae as blink,
  he as blockquote,
  pe as body,
  Yn as br,
  $t as button,
  fe as canvas,
  de as caption,
  me as cite,
  ye as code,
  Kn as col,
  be as colgroup,
  _e as content,
  Mt as createId,
  ge as data,
  Ce as datalist,
  ke as dd,
  we as decorator,
  ve as del,
  Ee as details,
  Se as dfn,
  xe as div,
  Oe as dl,
  De as dt,
  Ie as element,
  Ae as em,
  Rn as embed,
  Pe as fieldset,
  je as figcaption,
  Te as figure,
  Le as footer,
  Me as form,
  Vt as fragment,
  Qt as getInstance,
  Ve as h1,
  qe as h2,
  He as h3,
  ze as h4,
  Fe as h5,
  Be as h6,
  Ne as head,
  Ue as header,
  We as hgroup,
  ts as hr,
  $e as html,
  Xe as i,
  Ge as iframe,
  Nt as img,
  qt as input,
  Je as ins,
  Qe as isindex,
  Ze as kbd,
  Ye as keygen,
  Ke as label,
  Re as legend,
  tn as li,
  es as link,
  en as listing,
  nn as main,
  sn as map,
  on as mark,
  rn as menu,
  ns as meta,
  cn as meter,
  ln as nav,
  un as noscript,
  an as object,
  hn as ol,
  pn as optgroup,
  Ft as option,
  fn as output,
  dn as p,
  mn as picture,
  yn as pre,
  bn as progress,
  _n as q,
  Yt as reusable,
  gn as rp,
  Cn as rt,
  kn as ruby,
  wn as s,
  vn as samp,
  En as script,
  Sn as section,
  xn as select,
  On as shadow,
  Dn as small,
  ss as source,
  In as spacer,
  An as span,
  Pn as strong,
  jn as style,
  Tn as sub,
  Ln as summary,
  Mn as sup,
  Vn as table,
  qn as tbody,
  Hn as td,
  zn as template,
  Ht as textarea,
  Fn as tfoot,
  Bn as th,
  Nn as thead,
  Un as time,
  Wn as title,
  $n as tr,
  os as track,
  Xn as u,
  Gn as ul,
  Jn as video,
  is as wbr
};
