var z = Object.defineProperty;
var B = (t, e, n) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => B(t, typeof e != "symbol" ? e + "" : e, n);
import { isRef as F, watch as h, toValue as p, effectScope as D, ref as N } from "@vue/reactivity";
const U = /* @__PURE__ */ new Set(), W = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), $ = "abcdefghiklmnopqrstuvwxyz".split("");
function X(t) {
  const e = t ? $ : W;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function G(t = !1) {
  let e = "";
  for (; e.length === 0 || U.has(e); )
    e = X(t);
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
  return F(t) || j(t);
}
function Zt(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const w = {
  immediate: !0,
  deep: !0
};
function T(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function J(t) {
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
function v(t, e, n) {
  if (g(e)) {
    Object.entries(e).forEach(([s, o]) => {
      v(t, s, o);
    });
    return;
  }
  k(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function Q(t) {
  return this.onInit(() => {
    if (f(t)) {
      const e = h(() => p(t), (n) => v(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      v(this.el, t);
  }), this;
}
function Z(t, e) {
  return this.onInit(() => {
    if (f(e)) {
      const n = h(() => p(e), (s) => v(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      v(this.el, t, e);
  }), this;
}
function Y(t, e) {
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
    }, w)) : l && a !== !1 && i(l);
  }, u = (l) => {
    for (const [a, m] of Object.entries(l))
      r(a, m);
  };
  return g(t) ? u(t) : typeof t == "string" && r(t, e), this;
}
function K(t) {
  return this.attr("disabled", t), this;
}
function R(t, e, n) {
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
        R(s, o, n) || s.appendChild(o);
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
function tt(t, e) {
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
    }, w);
    this.onDestroy(s);
  } else
    n(e);
}
function et(t) {
  return _.call(this, "innerHTML", t), this;
}
function nt(t) {
  return _.call(this, "id", t), this;
}
function st(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      o ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), f(t)) {
      const o = h(() => p(t), s, w);
      this.onDestroy(o);
    } else
      s(t);
  }), this;
}
const ot = (t) => Number(t), it = (t) => t.trim(), rt = (t) => t.toString().toUpperCase(), ct = (t) => t.toString().toUpperCase();
function lt(t) {
  return t.split("\\s+").map((e) => T(e)).join("\\s+");
}
const ut = (t) => T(t);
function at(t) {
  return (e) => e.substring(0, t);
}
const Yt = {
  trim: it,
  number: ot,
  uppercase: rt,
  lowercase: ct,
  truncate: at,
  capitalize: ut,
  capitalizeAll: lt
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
function ht(t, e = {}) {
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
function pt(t, ...e) {
  const n = y(t) ? t.concat(e) : [t].concat(e);
  return this.__setComponentChildren(n), this;
}
function ft(t) {
  return (e, n) => typeof t != "number" ? !0 : Date.now() - n.lastCall >= t;
}
function dt(t) {
  return () => new Promise((e) => {
    setTimeout(() => e(!0), t);
  });
}
const mt = (t, e) => e.executedTimes === 0, yt = (t) => (t.stopPropagation(), !0), bt = (t) => (t.stopImmediatePropagation(), !0), _t = (t) => (t.preventDefault(), !0), gt = () => !1, Kt = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (t) => () => !!p(t),
  throttle: ft,
  once: mt,
  stop: yt,
  stopImmediate: bt,
  prevent: _t,
  cancel: gt,
  delay: dt
};
function Ct(t, e, n = {}) {
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
function kt(t, e) {
  return this.on("click", t, e);
}
function vt(t, e) {
  return this.on("submit", t, e);
}
function wt(t, e) {
  return this.on("focus", t, e);
}
function Et(t, e) {
  return this.on("blur", t, e);
}
function St(t, e) {
  return this.on("change", t, e);
}
function Ot(t, e) {
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
function xt(t, e) {
  return this.on("keydown", t, e);
}
function Dt(t, e, n) {
  return x.call(this, "keydown", t, e, n), this;
}
function It(t, e) {
  return this.on("keyup", t, e);
}
function At(t, e, n) {
  return x.call(this, "keyup", t, e, n), this;
}
function Pt(t, e) {
  return this.on("keyup", t, e);
}
function jt(t, e, n) {
  return x.call(this, "keypress", t, e, n), this;
}
function Tt(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? k(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (f(t)) {
      const s = h(() => p(t), n, w);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Lt(t, e) {
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
      const s = h(() => p(t), n, w);
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
function Mt(t) {
  return _.call(this, "textContent", t), this;
}
class d {
  constructor(e, n) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", Mt);
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", et);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", Ct);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", kt);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", vt);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", wt);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", Et);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", St);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", Ot);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", xt);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", Dt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", It);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", At);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", Pt);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keypressExact", jt);
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", Y);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", pt);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", ht);
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", Q);
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", Z);
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", K);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", nt);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", Tt);
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", Lt);
    /**
     * Conditionally render a component.
     */
    c(this, "if", st);
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
    c(this, "for", tt);
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.__componentProps = n ?? {}, this.identifier = G(!0);
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
    J(this);
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
function Vt(t) {
  return new O(t);
}
class qt extends S {
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
function Ht(t) {
  const e = document.createElement("img"), n = new qt(e);
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
function zt(t = "text") {
  const e = document.createElement("input");
  return new M(e, t);
}
function Bt() {
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
function Nt(t, e) {
  return new Ft(t, e);
}
const Ut = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], V = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], q = Ut.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const o = document.createElement(e), i = new d(o), r = y(n) ? n.concat(s) : [n].concat(s);
  return i.__setComponentChildren(r), i.children = r, i;
}, t), {}), H = V.reduce((t, e) => (t[e] = () => {
  const n = new S(e);
  return n.isVoid = !0, n;
}, t), {}), P = Object.assign(q, H, {
  fragment: Vt,
  input: zt,
  textarea: Bt,
  option: Nt,
  img: Ht
}), Wt = [
  ...V,
  "input",
  "textarea",
  "option"
];
function $t(t, e) {
  return (n = [], ...s) => {
    const o = y(n) ? n.concat(s) : [n].concat(s), i = Wt.includes(t) ? P[t]() : P[t](o);
    return i.setup(e), i;
  };
}
const {
  a: Rt,
  abbr: te,
  address: ee,
  applet: ne,
  article: se,
  aside: oe,
  audio: ie,
  b: re,
  basefont: ce,
  bdi: le,
  bdo: ue,
  bgsound: ae,
  blink: he,
  blockquote: pe,
  body: fe,
  button: de,
  canvas: me,
  caption: ye,
  cite: be,
  code: _e,
  colgroup: ge,
  content: Ce,
  data: ke,
  datalist: ve,
  dd: we,
  decorator: Ee,
  del: Se,
  details: Oe,
  dfn: xe,
  div: Xt,
  dl: De,
  dt: Ie,
  element: Ae,
  em: Pe,
  fieldset: je,
  figcaption: Te,
  figure: Le,
  footer: Me,
  form: Ve,
  h1: qe,
  h2: He,
  h3: ze,
  h4: Be,
  h5: Fe,
  h6: Ne,
  head: Ue,
  header: We,
  hgroup: $e,
  html: Xe,
  i: Ge,
  iframe: Je,
  ins: Qe,
  isindex: Ze,
  kbd: Ye,
  keygen: Ke,
  label: Re,
  legend: tn,
  li: en,
  listing: nn,
  main: sn,
  map: on,
  mark: rn,
  menu: cn,
  meter: ln,
  nav: un,
  noscript: an,
  object: hn,
  ol: pn,
  optgroup: fn,
  output: dn,
  p: mn,
  picture: yn,
  pre: bn,
  progress: _n,
  q: gn,
  rp: Cn,
  rt: kn,
  ruby: vn,
  s: wn,
  samp: En,
  script: Sn,
  section: On,
  select: xn,
  shadow: Dn,
  small: In,
  spacer: An,
  span: Pn,
  strong: jn,
  style: Tn,
  sub: Ln,
  summary: Mn,
  sup: Vn,
  table: qn,
  tbody: Hn,
  td: zn,
  template: Bn,
  tfoot: Fn,
  th: Nn,
  thead: Un,
  time: Wn,
  title: $n,
  tr: Xn,
  u: Gn,
  ul: Jn,
  video: Qn
} = q, {
  area: Zn,
  base: Yn,
  br: Kn,
  col: Rn,
  embed: ts,
  hr: es,
  link: ns,
  meta: ss,
  source: os,
  track: is,
  wbr: rs
} = H, Gt = $t("button", (t) => {
  const e = N(0);
  t.click(() => e.value++), t.text(() => `Clicked: ${e.value} times`);
});
Xt(
  Gt()
).mount("#app");
export {
  d as Component,
  Kt as Modifier,
  Yt as Transform,
  Rt as a,
  te as abbr,
  ee as address,
  ne as applet,
  Zn as area,
  se as article,
  oe as aside,
  ie as audio,
  re as b,
  Yn as base,
  ce as basefont,
  le as bdi,
  ue as bdo,
  ae as bgsound,
  he as blink,
  pe as blockquote,
  fe as body,
  Kn as br,
  de as button,
  me as canvas,
  ye as caption,
  be as cite,
  _e as code,
  Rn as col,
  ge as colgroup,
  Ce as content,
  G as createId,
  ke as data,
  ve as datalist,
  we as dd,
  Ee as decorator,
  Se as del,
  Oe as details,
  xe as dfn,
  Xt as div,
  De as dl,
  Ie as dt,
  Ae as element,
  Pe as em,
  ts as embed,
  je as fieldset,
  Te as figcaption,
  Le as figure,
  Me as footer,
  Ve as form,
  Vt as fragment,
  Zt as getInstance,
  qe as h1,
  He as h2,
  ze as h3,
  Be as h4,
  Fe as h5,
  Ne as h6,
  Ue as head,
  We as header,
  $e as hgroup,
  es as hr,
  Xe as html,
  Ge as i,
  Je as iframe,
  Ht as img,
  zt as input,
  Qe as ins,
  Ze as isindex,
  Ye as kbd,
  Ke as keygen,
  Re as label,
  tn as legend,
  en as li,
  ns as link,
  nn as listing,
  sn as main,
  on as map,
  rn as mark,
  cn as menu,
  ss as meta,
  ln as meter,
  un as nav,
  an as noscript,
  hn as object,
  pn as ol,
  fn as optgroup,
  Nt as option,
  dn as output,
  mn as p,
  yn as picture,
  bn as pre,
  _n as progress,
  gn as q,
  $t as reusable,
  Cn as rp,
  kn as rt,
  vn as ruby,
  wn as s,
  En as samp,
  Sn as script,
  On as section,
  xn as select,
  Dn as shadow,
  In as small,
  os as source,
  An as spacer,
  Pn as span,
  jn as strong,
  Tn as style,
  Ln as sub,
  Mn as summary,
  Vn as sup,
  qn as table,
  Hn as tbody,
  zn as td,
  Bn as template,
  Bt as textarea,
  Fn as tfoot,
  Nn as th,
  Un as thead,
  Wn as time,
  $n as title,
  Xn as tr,
  is as track,
  Gn as u,
  Jn as ul,
  Qn as video,
  rs as wbr
};
