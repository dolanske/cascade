var H = Object.defineProperty;
var F = (e, t, n) => t in e ? H(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => (F(e, typeof t != "symbol" ? t + "" : t, n), n);
import { isRef as B, toValue as f, effectScope as D } from "@vue/reactivity";
import { watch as a } from "@vue-reactivity/watch";
function g(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function C(e) {
  return e == null;
}
function y(e) {
  return Array.isArray(e);
}
function L(e) {
  return typeof e == "function";
}
function p(e) {
  return B(e) || L(e);
}
function Lt(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
const v = {
  immediate: !0,
  deep: !0
};
function _(e, t, n) {
  const s = (o) => {
    Reflect.set(this.el, e, o);
  };
  if (p(t)) {
    const o = a(() => f(t), (i) => {
      s(n ? String(i) : i);
    }, v);
    this.onDestroy(o);
  } else
    s(n ? String(t) : t);
}
function W(e) {
  return _.call(this, "textContent", e == null ? void 0 : e.toString()), this;
}
function N(e, t, n) {
  return this.onMount(() => {
    this.el.addEventListener(e, t, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(e, t);
  }), this;
}
function z(e, t) {
  return this.on("click", e, t);
}
function $(e, t) {
  return this.on("submit", e, t);
}
function U(e, t) {
  return this.on("focus", e, t);
}
function X(e, t) {
  return this.on("blur", e, t);
}
function G(e, t) {
  return this.on("change", e, t);
}
function J(e, t) {
  return this.on("input", e, t);
}
function x(e, t, n, s) {
  const o = [];
  function i(u) {
    o.push(u), o.length > t.length && o.shift();
  }
  const r = Array.isArray(t) ? t : [t];
  this.on(e, (u) => {
    const l = u.key;
    function h() {
      L(n) ? n(u) : n.handleEvent(u);
    }
    switch ((s == null ? void 0 : s.detect) || "every") {
      case "some": {
        r.includes(l) && h();
        break;
      }
      case "every":
      default: {
        i(l), r.every((k, E) => k === o[E]) && h();
        break;
      }
    }
  }, s);
}
function Q(e, t) {
  return this.on("keydown", e, t);
}
function Z(e, t, n) {
  return x.call(this, "keydown", e, t, n), this;
}
function Y(e, t) {
  return this.on("keyup", e, t);
}
function K(e, t, n) {
  return x.call(this, "keyup", e, t, n), this;
}
function R(e, t) {
  return this.on("keyup", e, t);
}
function tt(e, t, n) {
  return x.call(this, "keypress", e, t, n), this;
}
function et(e, t) {
  if (g(e) && !C(t))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), o = (l) => {
    for (const h of Object.keys(l))
      l[h] ? this.el.classList.add(h) : this.el.classList.remove(h);
  }, i = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (y(l)) {
        const h = l.length;
        for (let m = 0; m < h; m++) {
          const k = l[m];
          if (k)
            typeof k == "string" ? (this.el.classList.add(k), s[m] = k) : g(l) && o(k);
          else {
            const E = s[m];
            E && (this.el.classList.remove(E), s[m] = null);
          }
        }
      } else
        g(l) && o(l);
  }, r = (l, h) => {
    p(h) ? this.onDestroy(a(() => f(h), (m) => {
      i({ [l]: m });
    }, v)) : l && h !== !1 && i(l);
  }, u = (l) => {
    for (const [h, m] of Object.entries(l))
      r(h, m);
  };
  return g(e) ? u(e) : typeof e == "string" && r(e, t), this;
}
function nt(e) {
  return _.call(this, "innerHTML", e), this;
}
function st(e, ...t) {
  const n = y(e) ? e.concat(t) : [e].concat(t);
  return this.__setComponentChildren(n), this;
}
function I(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function P(e, t, n) {
  y(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function j(e, t) {
  (!e.value || y(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (P(e, t.value, !0), t.removeAttribute("checked"));
}
function ot(e, t = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = a(e, (o) => {
              o === n.value || y(o) && o.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { checked: i, value: r } = o.target;
              P(e, r, i);
            }, t.eventOptions), j(e, n);
            break;
          }
          case "radio": {
            const n = this.el, s = a(e, (o) => {
              n.checked = o === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { value: i, checked: r } = o.target;
              r && (e.value = i);
            }, t.eventOptions), j(e, n);
            break;
          }
          default: {
            const n = this.el, s = a(e, (o) => {
              n.value = String(o);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(t.lazy ? "change" : "input", (o) => {
              let i = o.target.value;
              i = I(i, t.transforms), e.value = i;
            }, t.eventOptions), n.value = String(e.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = a(e, (i) => {
          e.value = i;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (i) => {
          let r = i.target.value;
          r = I(r, t.transforms), e.value = r;
        }, t.eventOptions);
        const o = y(e.value) ? e.value[0] : e.value;
        if (o)
          n.value = o.toString();
        else if (n.childElementCount > 0) {
          const i = Array.from(n.children).find((r) => r.hasAttribute("selected"));
          if (i) {
            i.removeAttribute("selected");
            const r = i.value;
            e.value = r, n.value = r;
          }
        }
        break;
      }
      case "DETAILS": {
        const n = this.el, s = a(e, (i) => {
          n.open = !!i;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          e.value = n.open;
        }, t.eventOptions);
        const o = y(e.value) ? e.value[0] : e.value;
        n.open = !!o;
        break;
      }
    }
  }), this;
}
function it(e, t, n) {
  const s = Array.from(e.childNodes).at(n);
  return s ? (e.replaceChild(t, s), !0) : !1;
}
function b(e, t, n) {
  const s = e instanceof Element ? e : e.el;
  if (t)
    if (typeof t == "string" || typeof t == "number")
      if (C(n))
        s.innerHTML = String(t);
      else {
        const o = document.createTextNode(String(t));
        it(s, o, n) || s.appendChild(o);
      }
    else if (t instanceof O)
      b(s, t.componentChildren);
    else if (t instanceof Element)
      s.appendChild(t);
    else if (t instanceof d)
      e instanceof d && (t.parent = e), s.appendChild(t.el), t.__runOnInit(), b(t, t.componentChildren), t.__runOnMount();
    else if (Array.isArray(t)) {
      const o = t.length;
      for (let i = 0; i < o; i++) {
        const r = t[i];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? b(s, r, i) : r instanceof O ? b(s, r.componentChildren) : p(r) ? a(() => f(r), (u) => {
          b(s, u, i);
        }, {
          immediate: !0,
          deep: !0
        }) : (e instanceof d && (r.parent = e), s.appendChild(r.el), r.__runOnInit(), b(r, r.componentChildren), r.__runOnMount());
      }
    } else
      p(t) && a(() => f(t), (o) => {
        o instanceof d ? o.destroy() : s.innerHTML = "", b(s, o);
      }, {
        immediate: !0,
        deep: !0
      });
}
function w(e, t, n) {
  if (g(t)) {
    Object.entries(t).forEach(([s, o]) => {
      w(e, s, o);
    });
    return;
  }
  C(n) ? e.setAttribute(t, "") : typeof n == "boolean" ? n ? e.setAttribute(t, "") : e.removeAttribute(t) : e.setAttribute(t, String(n));
}
function rt(e) {
  return this.onInit(() => {
    if (p(e)) {
      const t = a(() => f(e), (n) => w(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(t);
    } else
      w(this.el, e);
  }), this;
}
function ct(e, t) {
  return this.onInit(() => {
    if (p(t)) {
      const n = a(() => f(t), (s) => w(this.el, e, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      w(this.el, e, t);
  }), this;
}
function lt(e) {
  return this.attr("disabled", e), this;
}
function ut(e) {
  return _.call(this, "id", e), this;
}
function ht(e) {
  function t(n) {
    if (!(n instanceof d))
      return;
    for (const o of n.__onDestroyCbs)
      o();
    const { children: s } = n;
    if (s instanceof d)
      t(s);
    else if (y(s))
      for (const o of s)
        o instanceof d && t(o);
  }
  t(e), e.__runOnDestroy(), e.el.remove();
}
function at(e) {
  return this.onMount(() => {
    const t = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? C(t) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", t) : this.el.style.setProperty("display", "none");
    };
    if (p(e)) {
      const s = a(() => f(e), n, v);
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function ft(e, t) {
  return this.onInit(() => {
    const n = (s) => {
      const o = [];
      if (y(s)) {
        const i = s.length;
        for (let r = 0; r < i; r++) {
          const u = t(s[r], r);
          u && o.push(u);
        }
      } else if (g(s)) {
        const i = Object.keys(s), r = i.length;
        for (let u = 0; u < r; u++) {
          const l = i[u], h = t(Reflect.get(s, l), l, u);
          h && o.push(h);
        }
      } else if (typeof s == "number")
        for (let i = 0; i < s; i++) {
          const r = t(i);
          r && o.push(r);
        }
      this.el.replaceChildren(), b(this.el, o);
    };
    if (p(e)) {
      const s = a(() => f(e), (o) => {
        n(o);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function pt(e, t) {
  const n = (s) => {
    if (!g(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const o = Object.keys(s);
    for (const i of o)
      this.el.style.setProperty(i, Reflect.get(s, i));
  };
  if (typeof e == "string")
    if (p(t)) {
      const s = a(() => f(t), (o) => {
        n({ [e]: o });
      });
      this.onDestroy(s);
    } else
      t && n({ [e]: t });
  else if (p(e))
    if (t)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = a(() => f(e), n, v);
      this.onDestroy(s);
    }
  else if (g(e)) {
    const s = Object.keys(e);
    for (const o of s) {
      const i = Reflect.get(e, o);
      if (p(i)) {
        const r = a(() => f(i), (u) => {
          C(u) || this.el.style.setProperty(o, String(u));
        });
        this.onDestroy(r);
      } else
        C(i) || this.el.style.setProperty(o, String(i));
    }
  }
  return this;
}
function dt(e) {
  const t = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      o ? n.el.insertBefore(this.el, t) : this.el.remove();
    };
    if (n.el.insertBefore(t, this.el), p(e)) {
      const o = a(() => f(e), s, v);
      this.onDestroy(o);
    } else
      s(e);
  }), this;
}
const mt = /* @__PURE__ */ new Set(), yt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), bt = "abcdefghiklmnopqrstuvwxyz".split("");
function _t(e) {
  const t = e ? bt : yt;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += t[Math.floor(Math.random() * t.length)];
  return n;
}
function gt(e = !1) {
  let t = "";
  for (; t.length === 0 || mt.has(t); )
    t = _t(e);
  return t;
}
class d {
  constructor(t, n) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", W);
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", nt);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", N);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", z);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", $);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", U);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", X);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", G);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", J);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", Q);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", Z);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", Y);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", K);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", R);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keypressExact", tt);
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", et);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", st);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", ot);
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", rt);
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", ct);
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", lt);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", ut);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", at);
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", pt);
    /**
     * Conditionally render a component.
     */
    c(this, "if", dt);
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
    c(this, "for", ft);
    this.el = t, Object.defineProperty(this.el, "__instance", this), this.__componentProps = n ?? {}, this.identifier = gt(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  __setComponentChildren(t) {
    this.isVoid || (this.componentChildren = t);
  }
  __runOnMount() {
    for (const t of this.__onMountCbs)
      t();
  }
  __runOnDestroy() {
    for (const t of this.__onDestroyCbs)
      t();
  }
  __runOnInit() {
    for (const t of this.__onInitCbs)
      t();
  }
  __rerunSetup() {
    for (const t of this.__scopes) {
      const n = D();
      n.run(() => {
        t(this, this.__componentProps);
      }), this.__runningScopes.add(n);
    }
  }
  __closeScopes() {
    for (const t of this.__runningScopes)
      t.stop();
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
  onInit(t) {
    this.__onInitCbs.push(t);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(t) {
    this.__onMountCbs.push(t);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(t) {
    this.__onDestroyCbs.push(t);
  }
  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive __scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(t = "body") {
    const n = document.querySelector(t);
    if (!n)
      throw new Error("Root element does not exist");
    n.appendChild(this.el), this.__rerunSetup(), this.__runOnInit(), b(this, this.componentChildren), this.__runOnMount();
  }
  /**
   * Removes component from the DOM, deactivates its instance and removes all reactive scopes.
   */
  destroy() {
    ht(this);
  }
  /**
   * Clones the component. All reactive variables, DOM child nodes and chained
   * functions should work. Cloning does not reassign the component back to the
   * DOM, so it must be re-inserted.
   *
   * @returns Cloned component
   */
  clone() {
    const t = new d(this.el);
    return t.componentChildren = this.componentChildren, t.__scopes = new Set(this.__scopes), t;
  }
  /**
   * Pass a single prop value into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   *
   * @param key {string}
   * @param value {any}
   */
  prop(t, n) {
    return Object.assign(this.__componentProps, { [t]: n }), this;
  }
  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props(t) {
    for (const n of Object.keys(t))
      Object.assign(this.__componentProps, { [n]: t[n] });
    return this;
  }
  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
  setup(t) {
    return this.__scopes.add(t), this.onInit(() => {
      const n = D();
      n.run(() => {
        t(this, this.__componentProps);
      }), this.onDestroy(() => {
        n.stop();
      });
    }), this;
  }
}
class S extends d {
  constructor(t) {
    super(document.createElement(t));
  }
  __setComponentChildren(t) {
    this.componentChildren = [];
  }
}
class O extends d {
  constructor(t = []) {
    super(document.createElement("template")), this.componentChildren = t;
  }
  mount(t) {
    const n = document.querySelector(t);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), b(n, this.componentChildren), this.__runOnMount();
  }
}
function kt(e) {
  return new O(e);
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
function Ct(e = "text") {
  const t = document.createElement("input");
  return new M(t, e);
}
function wt() {
  const e = document.createElement("textarea");
  return new M(e);
}
class vt extends S {
  constructor(t, n) {
    if (super("option"), n) {
      const s = f(n);
      this.el.value = String(s), this.el.textContent = String(s), p(n) && this.value(n);
    }
    t && (this.el.textContent = String(t));
  }
  value(t) {
    return _.call(this, "value", t), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function Et(e, t) {
  return new vt(e, t);
}
class St extends S {
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
function Ot(e) {
  const t = document.createElement("img"), n = new St(t);
  return e && n.src(e), n;
}
const xt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], T = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], V = xt.reduce((e, t) => (e[t] = (n = [], ...s) => {
  const o = document.createElement(t), i = new d(o), r = y(n) ? n.concat(s) : [n].concat(s);
  return i.__setComponentChildren(r), i.children = r, i;
}, e), {}), q = T.reduce((e, t) => (e[t] = () => {
  const n = new S(t);
  return n.isVoid = !0, n;
}, e), {}), A = Object.assign(V, q, {
  fragment: kt,
  input: Ct,
  textarea: wt,
  option: Et,
  img: Ot
}), Dt = [
  ...T,
  "input",
  "textarea",
  "option"
];
function Pt(e, t) {
  return (n = [], ...s) => {
    const o = y(n) ? n.concat(s) : [n].concat(s), i = Dt.includes(e) ? A[e]() : A[e](o);
    return i.setup(t), i;
  };
}
const {
  a: Mt,
  abbr: Tt,
  address: Vt,
  applet: qt,
  article: Ht,
  aside: Ft,
  audio: Bt,
  b: Wt,
  basefont: Nt,
  bdi: zt,
  bdo: $t,
  bgsound: Ut,
  blink: Xt,
  blockquote: Gt,
  body: Jt,
  button: Qt,
  canvas: Zt,
  caption: Yt,
  cite: Kt,
  code: Rt,
  colgroup: te,
  content: ee,
  data: ne,
  datalist: se,
  dd: oe,
  decorator: ie,
  del: re,
  details: ce,
  dfn: le,
  div: ue,
  dl: he,
  dt: ae,
  element: fe,
  em: pe,
  fieldset: de,
  figcaption: me,
  figure: ye,
  footer: be,
  form: _e,
  h1: ge,
  h2: ke,
  h3: Ce,
  h4: we,
  h5: ve,
  h6: Ee,
  head: Se,
  header: Oe,
  hgroup: xe,
  html: De,
  i: Ie,
  iframe: je,
  ins: Ae,
  isindex: Le,
  kbd: Pe,
  keygen: Me,
  label: Te,
  legend: Ve,
  li: qe,
  listing: He,
  main: Fe,
  map: Be,
  mark: We,
  menu: Ne,
  meter: ze,
  nav: $e,
  noscript: Ue,
  object: Xe,
  ol: Ge,
  optgroup: Je,
  output: Qe,
  p: Ze,
  picture: Ye,
  pre: Ke,
  progress: Re,
  q: tn,
  rp: en,
  rt: nn,
  ruby: sn,
  s: on,
  samp: rn,
  script: cn,
  section: ln,
  select: un,
  shadow: hn,
  small: an,
  spacer: fn,
  span: pn,
  strong: dn,
  style: mn,
  sub: yn,
  summary: bn,
  sup: _n,
  table: gn,
  tbody: kn,
  td: Cn,
  template: wn,
  tfoot: vn,
  th: En,
  thead: Sn,
  time: On,
  title: xn,
  tr: Dn,
  u: In,
  ul: jn,
  video: An
} = V, {
  area: Ln,
  base: Pn,
  br: Mn,
  col: Tn,
  embed: Vn,
  hr: qn,
  link: Hn,
  meta: Fn,
  source: Bn,
  track: Wn,
  wbr: Nn
} = q;
export {
  d as Component,
  Mt as a,
  Tt as abbr,
  Vt as address,
  qt as applet,
  Ln as area,
  Ht as article,
  Ft as aside,
  Bt as audio,
  Wt as b,
  Pn as base,
  Nt as basefont,
  zt as bdi,
  $t as bdo,
  Ut as bgsound,
  Xt as blink,
  Gt as blockquote,
  Jt as body,
  Mn as br,
  Qt as button,
  Zt as canvas,
  Yt as caption,
  Kt as cite,
  Rt as code,
  Tn as col,
  te as colgroup,
  ee as content,
  gt as createId,
  ne as data,
  se as datalist,
  oe as dd,
  ie as decorator,
  re as del,
  ce as details,
  le as dfn,
  ue as div,
  he as dl,
  ae as dt,
  fe as element,
  pe as em,
  Vn as embed,
  de as fieldset,
  me as figcaption,
  ye as figure,
  be as footer,
  _e as form,
  kt as fragment,
  Lt as getInstance,
  ge as h1,
  ke as h2,
  Ce as h3,
  we as h4,
  ve as h5,
  Ee as h6,
  Se as head,
  Oe as header,
  xe as hgroup,
  qn as hr,
  De as html,
  Ie as i,
  je as iframe,
  Ot as img,
  Ct as input,
  Ae as ins,
  Le as isindex,
  Pe as kbd,
  Me as keygen,
  Te as label,
  Ve as legend,
  qe as li,
  Hn as link,
  He as listing,
  Fe as main,
  Be as map,
  We as mark,
  Ne as menu,
  Fn as meta,
  ze as meter,
  $e as nav,
  Ue as noscript,
  Xe as object,
  Ge as ol,
  Je as optgroup,
  Et as option,
  Qe as output,
  Ze as p,
  Ye as picture,
  Ke as pre,
  Re as progress,
  tn as q,
  Pt as reusable,
  en as rp,
  nn as rt,
  sn as ruby,
  on as s,
  rn as samp,
  cn as script,
  ln as section,
  un as select,
  hn as shadow,
  an as small,
  Bn as source,
  fn as spacer,
  pn as span,
  dn as strong,
  mn as style,
  yn as sub,
  bn as summary,
  _n as sup,
  gn as table,
  kn as tbody,
  Cn as td,
  wn as template,
  wt as textarea,
  vn as tfoot,
  En as th,
  Sn as thead,
  On as time,
  xn as title,
  Dn as tr,
  Wn as track,
  In as u,
  jn as ul,
  An as video,
  Nn as wbr
};
