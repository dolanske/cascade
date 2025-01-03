var z = Object.defineProperty;
var F = (t, e, n) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => F(t, typeof e != "symbol" ? e + "" : e, n);
import { isRef as B, watch as h, toValue as p, effectScope as D } from "@vue/reactivity";
const N = /* @__PURE__ */ new Set(), U = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), W = "abcdefghiklmnopqrstuvwxyz".split("");
function $(t) {
  const e = t ? W : U;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function X(t = !1) {
  let e = "";
  for (; e.length === 0 || N.has(e); )
    e = $(t);
  return e;
}
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
function Xt(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const v = {
  immediate: !0,
  deep: !0
};
function T(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function G(t) {
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
function w(t, e, n) {
  if (g(e)) {
    Object.entries(e).forEach(([s, o]) => {
      w(t, s, o);
    });
    return;
  }
  k(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function J(t) {
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
function Q(t, e) {
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
function Z(t, e) {
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
function Y(t) {
  return this.attr("disabled", t), this;
}
function K(t, e, n) {
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
        K(s, o, n) || s.appendChild(o);
      }
    else if (e instanceof O)
      b(s, e.componentChildren);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof d)
      t instanceof d && (e.parent = t), s.appendChild(e.el), e.__runOnInit(), b(e, e.componentChildren), e.__runOnMount();
    else if (Array.isArray(e)) {
      const o = e.length;
      for (let i = 0; i < o; i++) {
        const r = e[i];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? b(s, r, i) : r instanceof O ? b(s, r.componentChildren) : f(r) ? h(() => p(r), (u) => {
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
function R(t, e) {
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
  return this.onInit(() => {
    if (f(t)) {
      const s = h(() => p(t), (o) => {
        n(o);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function _(t, e) {
  const n = (s) => {
    console.log(this.el, t, s), Reflect.set(this.el, t, s);
  };
  if (f(e)) {
    n(p(e));
    const s = h(() => p(e), (o) => {
      n(o);
    }, v);
    this.onDestroy(s);
  } else
    n(e);
}
function tt(t) {
  return _.call(this, "innerHTML", t), this;
}
function et(t) {
  return _.call(this, "id", t), this;
}
function nt(t) {
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
const st = (t) => Number(t), ot = (t) => t.trim(), it = (t) => t.toString().toUpperCase(), rt = (t) => t.toString().toUpperCase();
function ct(t) {
  return t.split("\\s+").map((e) => T(e)).join("\\s+");
}
const lt = (t) => T(t);
function ut(t) {
  return (e) => e.substring(0, t);
}
const Gt = {
  trim: ot,
  number: st,
  uppercase: it,
  lowercase: rt,
  truncate: ut,
  capitalize: lt,
  capitalizeAll: ct
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
function at(t, e = {}) {
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
function ht(t, ...e) {
  const n = y(t) ? t.concat(e) : [t].concat(e);
  return this.__setComponentChildren(n), this;
}
function pt(t) {
  return (e, n) => typeof t != "number" ? !0 : Date.now() - n.lastCall >= t;
}
function ft(t) {
  return () => new Promise((e) => {
    setTimeout(() => e(!0), t);
  });
}
const dt = (t, e) => e.executedTimes === 0, mt = (t) => (t.stopPropagation(), !0), yt = (t) => (t.stopImmediatePropagation(), !0), bt = (t) => (t.preventDefault(), !0), _t = () => !1, Jt = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (t) => () => !!p(t),
  throttle: pt,
  once: dt,
  stop: mt,
  stopImmediate: yt,
  prevent: bt,
  cancel: _t,
  delay: ft
};
function gt(t, e, n = {}) {
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
function Ct(t, e) {
  return this.on("click", t, e);
}
function kt(t, e) {
  return this.on("submit", t, e);
}
function wt(t, e) {
  return this.on("focus", t, e);
}
function vt(t, e) {
  return this.on("blur", t, e);
}
function Et(t, e) {
  return this.on("change", t, e);
}
function St(t, e) {
  return this.on("input", t, e);
}
function x(t, e, n, s) {
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
function Ot(t, e) {
  return this.on("keydown", t, e);
}
function xt(t, e, n) {
  return x.call(this, "keydown", t, e, n), this;
}
function Dt(t, e) {
  return this.on("keyup", t, e);
}
function It(t, e, n) {
  return x.call(this, "keyup", t, e, n), this;
}
function At(t, e) {
  return this.on("keyup", t, e);
}
function Pt(t, e, n) {
  return x.call(this, "keypress", t, e, n), this;
}
function jt(t) {
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
function Tt(t, e) {
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
function Lt(t) {
  return _.call(this, "textContent", t), this;
}
class d {
  constructor(e, n) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", Lt);
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", tt);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", gt);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", Ct);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", kt);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", wt);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", vt);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", Et);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", St);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", Ot);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", xt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", Dt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", It);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", At);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keypressExact", Pt);
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", Z);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", ht);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", at);
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", J);
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", Q);
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", Y);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", et);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", jt);
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", Tt);
    /**
     * Conditionally render a component.
     */
    c(this, "if", nt);
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
    c(this, "for", R);
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.__componentProps = n ?? {}, this.identifier = X(!0);
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
    G(this);
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
class O extends d {
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
function Mt(t) {
  return new O(t);
}
class Vt extends S {
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
function qt(t) {
  const e = document.createElement("img"), n = new Vt(e);
  return t && n.src(t), n;
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
function Ht(t = "text") {
  const e = document.createElement("input");
  return new M(e, t);
}
function zt() {
  const t = document.createElement("textarea");
  return new M(t);
}
class Ft extends S {
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
function Bt(t, e) {
  return new Ft(t, e);
}
const Nt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], V = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], q = Nt.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const o = document.createElement(e), i = new d(o), r = y(n) ? n.concat(s) : [n].concat(s);
  return i.__setComponentChildren(r), i.children = r, i;
}, t), {}), H = V.reduce((t, e) => (t[e] = () => {
  const n = new S(e);
  return n.isVoid = !0, n;
}, t), {}), P = Object.assign(q, H, {
  fragment: Mt,
  input: Ht,
  textarea: zt,
  option: Bt,
  img: qt
}), Ut = [
  ...V,
  "input",
  "textarea",
  "option"
];
function Qt(t, e) {
  return (n = [], ...s) => {
    const o = y(n) ? n.concat(s) : [n].concat(s), i = Ut.includes(t) ? P[t]() : P[t](o);
    return i.setup(e), i;
  };
}
const {
  a: Zt,
  abbr: Yt,
  address: Kt,
  applet: Rt,
  article: te,
  aside: ee,
  audio: ne,
  b: se,
  basefont: oe,
  bdi: ie,
  bdo: re,
  bgsound: ce,
  blink: le,
  blockquote: ue,
  body: ae,
  button: he,
  canvas: pe,
  caption: fe,
  cite: de,
  code: me,
  colgroup: ye,
  content: be,
  data: _e,
  datalist: ge,
  dd: Ce,
  decorator: ke,
  del: we,
  details: ve,
  dfn: Ee,
  div: Se,
  dl: Oe,
  dt: xe,
  element: De,
  em: Ie,
  fieldset: Ae,
  figcaption: Pe,
  figure: je,
  footer: Te,
  form: Le,
  h1: Me,
  h2: Ve,
  h3: qe,
  h4: He,
  h5: ze,
  h6: Fe,
  head: Be,
  header: Ne,
  hgroup: Ue,
  html: We,
  i: $e,
  iframe: Xe,
  ins: Ge,
  isindex: Je,
  kbd: Qe,
  keygen: Ze,
  label: Ye,
  legend: Ke,
  li: Re,
  listing: tn,
  main: en,
  map: nn,
  mark: sn,
  menu: on,
  meter: rn,
  nav: cn,
  noscript: ln,
  object: un,
  ol: an,
  optgroup: hn,
  output: pn,
  p: fn,
  picture: dn,
  pre: mn,
  progress: yn,
  q: bn,
  rp: _n,
  rt: gn,
  ruby: Cn,
  s: kn,
  samp: wn,
  script: vn,
  section: En,
  select: Sn,
  shadow: On,
  small: xn,
  spacer: Dn,
  span: In,
  strong: An,
  style: Pn,
  sub: jn,
  summary: Tn,
  sup: Ln,
  table: Mn,
  tbody: Vn,
  td: qn,
  template: Hn,
  tfoot: zn,
  th: Fn,
  thead: Bn,
  time: Nn,
  title: Un,
  tr: Wn,
  u: $n,
  ul: Xn,
  video: Gn
} = q, {
  area: Jn,
  base: Qn,
  br: Zn,
  col: Yn,
  embed: Kn,
  hr: Rn,
  link: ts,
  meta: es,
  source: ns,
  track: ss,
  wbr: os
} = H;
export {
  d as Component,
  Jt as Modifier,
  Gt as Transform,
  Zt as a,
  Yt as abbr,
  Kt as address,
  Rt as applet,
  Jn as area,
  te as article,
  ee as aside,
  ne as audio,
  se as b,
  Qn as base,
  oe as basefont,
  ie as bdi,
  re as bdo,
  ce as bgsound,
  le as blink,
  ue as blockquote,
  ae as body,
  Zn as br,
  he as button,
  pe as canvas,
  fe as caption,
  de as cite,
  me as code,
  Yn as col,
  ye as colgroup,
  be as content,
  X as createId,
  _e as data,
  ge as datalist,
  Ce as dd,
  ke as decorator,
  we as del,
  ve as details,
  Ee as dfn,
  Se as div,
  Oe as dl,
  xe as dt,
  De as element,
  Ie as em,
  Kn as embed,
  Ae as fieldset,
  Pe as figcaption,
  je as figure,
  Te as footer,
  Le as form,
  Mt as fragment,
  Xt as getInstance,
  Me as h1,
  Ve as h2,
  qe as h3,
  He as h4,
  ze as h5,
  Fe as h6,
  Be as head,
  Ne as header,
  Ue as hgroup,
  Rn as hr,
  We as html,
  $e as i,
  Xe as iframe,
  qt as img,
  Ht as input,
  Ge as ins,
  Je as isindex,
  Qe as kbd,
  Ze as keygen,
  Ye as label,
  Ke as legend,
  Re as li,
  ts as link,
  tn as listing,
  en as main,
  nn as map,
  sn as mark,
  on as menu,
  es as meta,
  rn as meter,
  cn as nav,
  ln as noscript,
  un as object,
  an as ol,
  hn as optgroup,
  Bt as option,
  pn as output,
  fn as p,
  dn as picture,
  mn as pre,
  yn as progress,
  bn as q,
  Qt as reusable,
  _n as rp,
  gn as rt,
  Cn as ruby,
  kn as s,
  wn as samp,
  vn as script,
  En as section,
  Sn as select,
  On as shadow,
  xn as small,
  ns as source,
  Dn as spacer,
  In as span,
  An as strong,
  Pn as style,
  jn as sub,
  Tn as summary,
  Ln as sup,
  Mn as table,
  Vn as tbody,
  qn as td,
  Hn as template,
  zt as textarea,
  zn as tfoot,
  Fn as th,
  Bn as thead,
  Nn as time,
  Un as title,
  Wn as tr,
  ss as track,
  $n as u,
  Xn as ul,
  Gn as video,
  os as wbr
};
