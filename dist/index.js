var H = Object.defineProperty;
var B = (t, e, n) => e in t ? H(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => (B(t, typeof e != "symbol" ? e + "" : e, n), n);
import { isRef as W, toValue as d, effectScope as j } from "@vue/reactivity";
import { watch as a } from "@vue-reactivity/watch";
function k(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function w(t) {
  return t == null;
}
function y(t) {
  return Array.isArray(t);
}
function L(t) {
  return typeof t == "function";
}
function f(t) {
  return W(t) || L(t);
}
function Vt(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const E = {
  immediate: !0,
  deep: !0
};
function m(t, e, n) {
  const s = (i) => {
    Reflect.set(this.el, t, i);
  };
  if (f(e)) {
    const i = a(() => d(e), (o) => {
      s(n ? String(o) : o);
    }, E);
    this.onDestroy(i);
  } else
    s(n ? String(e) : e);
  return this;
}
function N(t) {
  return m.call(this, "textContent", t), this;
}
function z(t, e, n) {
  return this.onMount(() => {
    this.el.addEventListener(t, e, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(t, e);
  }), this;
}
function $(t, e) {
  return this.on("click", t, e);
}
function U(t, e) {
  return this.on("submit", t, e);
}
function X(t, e) {
  return this.on("focus", t, e);
}
function G(t, e) {
  return this.on("blur", t, e);
}
function J(t, e) {
  return this.on("change", t, e);
}
function Q(t, e) {
  return this.on("input", t, e);
}
function x(t, e, n, s) {
  const i = [];
  function o(u) {
    i.push(u), i.length > e.length && i.shift();
  }
  const r = Array.isArray(e) ? e : [e];
  return this.on(t, (u) => {
    const l = u.key;
    function h() {
      L(n) ? n(u) : n.handleEvent(u);
    }
    switch ((s == null ? void 0 : s.detect) || "every") {
      case "every": {
        o(l), r.every((v, C) => {
          if (v === i[C])
            return !0;
        }) && h();
        break;
      }
      case "some": {
        r.includes(l) && h();
        break;
      }
    }
  }, s);
}
function Z(t, e) {
  return this.on("keydown", t, e);
}
function Y(t, e, n) {
  return x.call(this, "keydown", t, e, n);
}
function K(t, e) {
  return this.on("keyup", t, e);
}
function R(t, e, n) {
  return x.call(this, "keyup", t, e, n);
}
function tt(t, e) {
  return this.on("keyup", t, e);
}
function et(t, e, n) {
  return x.call(this, "keypress", t, e, n);
}
function nt(t, e) {
  if (k(t) && !w(e))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (l) => {
    for (const h of Object.keys(l))
      l[h] ? this.el.classList.add(h) : this.el.classList.remove(h);
  }, o = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (y(l)) {
        const h = l.length;
        for (let p = 0; p < h; p++) {
          const v = l[p];
          if (v)
            typeof v == "string" ? (this.el.classList.add(v), s[p] = v) : k(l) && i(v);
          else {
            const C = s[p];
            C && (this.el.classList.remove(C), s[p] = null);
          }
        }
      } else
        k(l) && i(l);
  }, r = (l, h) => {
    f(h) ? this.onDestroy(a(() => d(h), (p) => {
      o({ [l]: p });
    }, E)) : l && h !== !1 && o(l);
  }, u = (l) => {
    for (const [h, p] of Object.entries(l))
      r(h, p);
  };
  return k(t) ? u(t) : typeof t == "string" && r(t, e), this;
}
function st(t) {
  return m.call(this, "innerHTML", t), this;
}
function it(t) {
  return this.scopes.add(t), this.onInit(() => {
    const e = j();
    e.run(() => {
      t(this, this.componentProps);
    }), this.onDestroy(() => {
      e.stop();
    });
  }), this;
}
function ot(t, e) {
  return Object.assign(this.componentProps, { [t]: e }), this;
}
function rt(t) {
  for (const e of Object.keys(t))
    this.prop(e, t[e]);
  return this;
}
function ct(t, ...e) {
  const n = y(t) ? t.concat(e) : [t].concat(e);
  return this.__children(n), this;
}
function D(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function P(t, e, n) {
  y(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function I(t, e) {
  (!t.value || y(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (P(t, e.value, !0), e.removeAttribute("checked"));
}
function lt(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = a(t, (i) => {
              i === n.value || y(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: r } = i.target;
              P(t, r, o);
            }, e.eventOptions), I(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = a(t, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: r } = i.target;
              r && (t.value = o);
            }, e.eventOptions), I(t, n);
            break;
          }
          default: {
            const n = this.el, s = a(t, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = D(o, e.transforms), t.value = o;
            }, e.eventOptions), n.value = String(t.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = a(t, (o) => {
          t.value = o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (o) => {
          let r = o.target.value;
          r = D(r, e.transforms), t.value = r;
        }, e.eventOptions);
        const i = y(t.value) ? t.value[0] : t.value;
        if (i)
          n.value = i.toString();
        else if (n.childElementCount > 0) {
          const o = Array.from(n.children).find((r) => r.hasAttribute("selected"));
          if (o) {
            o.removeAttribute("selected");
            const r = o.value;
            t.value = r, n.value = r;
          }
        }
        break;
      }
      case "DETAILS": {
        const n = this.el, s = a(t, (o) => {
          n.open = !!o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          t.value = n.open;
        }, e.eventOptions);
        const i = y(t.value) ? t.value[0] : t.value;
        n.open = !!i;
        break;
      }
    }
  }), this;
}
function ut(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function b(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e)
    if (typeof e == "string" || typeof e == "number")
      if (w(n))
        s.innerHTML = String(e);
      else {
        const i = document.createTextNode(String(e));
        ut(s, i, n) || s.appendChild(i);
      }
    else if (e instanceof O)
      b(s, e.children);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof g)
      t instanceof g && (e.parent = t), s.appendChild(e.el), e.__runOnInit(), b(e, e.children), e.__runOnMount();
    else if (Array.isArray(e)) {
      const i = e.length;
      for (let o = 0; o < i; o++) {
        const r = e[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? b(s, r, o) : r instanceof O ? b(s, r.children) : f(r) ? a(() => d(r), (u) => b(s, u, o), {
          immediate: !0,
          deep: !0
        }) : (t instanceof g && (r.parent = t), s.appendChild(r.el), r.__runOnInit(), b(r, r.children), r.__runOnMount());
      }
    } else
      f(e) && a(() => d(e), (i) => b(s, i), {
        immediate: !0,
        deep: !0
      });
}
function _(t, e, n) {
  if (k(e)) {
    Object.entries(e).forEach(([s, i]) => {
      _(t, s, i);
    });
    return;
  }
  w(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function ht(t) {
  return this.onInit(() => {
    if (f(t)) {
      const e = a(() => d(t), (n) => _(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      _(this.el, t);
  }), this;
}
function at(t, e) {
  return this.onInit(() => {
    if (f(e)) {
      const n = a(() => d(e), (s) => _(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      _(this.el, t, e);
  }), this;
}
function dt(t) {
  return this.attr("disabled", t), this;
}
function ft(t) {
  return m.call(this, "id", t), this;
}
function pt(t) {
  function e(n) {
    if (!(n instanceof g))
      return;
    for (const i of n.onDestroyCbs)
      i();
    const { children: s } = n;
    if (s instanceof g)
      e(s);
    else if (y(s))
      for (const i of s)
        i instanceof g && e(i);
  }
  e(t), t.__runOnDestroy(), t.el.remove();
}
function bt(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? w(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (f(t)) {
      const s = a(() => d(t), n, E);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function mt(t, e) {
  return this.onInit(() => {
    const n = (s) => {
      const i = [];
      if (y(s)) {
        const o = s.length;
        for (let r = 0; r < o; r++) {
          const u = e(s[r], r);
          u && i.push(u);
        }
      } else if (k(s)) {
        const o = Object.keys(s), r = o.length;
        for (let u = 0; u < r; u++) {
          const l = o[u], h = e(Reflect.get(s, l), l, u);
          h && i.push(h);
        }
      } else if (typeof s == "number")
        for (let o = 0; o < s; o++) {
          const r = e(o);
          r && i.push(r);
        }
      this.el.replaceChildren(), b(this.el, i);
    };
    if (f(t)) {
      const s = a(() => d(t), (i) => {
        n(i);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function yt(t, e) {
  const n = (s) => {
    if (!k(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof t == "string")
    if (f(e)) {
      const s = a(() => d(e), (i) => {
        n({ [t]: i });
      });
      this.onDestroy(s);
    } else
      e && n({ [t]: e });
  else if (f(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = a(() => d(t), n, E);
      this.onDestroy(s);
    }
  else if (k(t)) {
    const s = Object.keys(t);
    for (const i of s) {
      const o = Reflect.get(t, i);
      if (f(o)) {
        const r = a(() => d(o), (u) => {
          w(u) || this.el.style.setProperty(i, String(u));
        });
        this.onDestroy(r);
      } else
        w(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function gt(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), f(t)) {
      const i = a(() => d(t), s, E);
      this.onDestroy(i);
    } else
      s(t);
  }), this;
}
function kt() {
  const t = new g(this.el);
  return t.children = this.children, t.scopes = new Set(this.scopes), t;
}
const vt = /* @__PURE__ */ new Set(), wt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), _t = "abcdefghiklmnopqrstuvwxyz".split("");
function Et(t) {
  const e = t ? _t : wt;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function Ct(t = !1) {
  let e = "";
  for (; e.length === 0 || vt.has(e); )
    e = Et(t);
  return e;
}
class g {
  constructor(e, n = {}) {
    /**
     * Set `textContent` of the current component.
     *
     * @param text {string | () => string}
     */
    c(this, "text", N.bind(this));
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", st.bind(this));
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", z.bind(this));
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", $.bind(this));
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", U.bind(this));
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", X.bind(this));
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", G.bind(this));
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", J.bind(this));
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", Q.bind(this));
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", Z.bind(this));
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     * 
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", Y.bind(this));
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", K.bind(this));
    /**
    * Shorthand for binding `on("keyup")` event listener to the current
    * component and listening for specific keys to be released.
    * 
    * ```
    * Component.keyupExact(["Shift", "T"], () => ...)
    * ```
    */
    c(this, "keyupExact", R.bind(this));
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", tt.bind(this));
    /**
    * Shorthand for binding `on("keypress")` event listener to the current
    * component and listening for specific keys to be pressed.
    * 
    * ```
    * Component.keypressExact(["Shift", "T"], () => ...)
    * ```
    */
    c(this, "keypressExact", et.bind(this));
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", nt.bind(this));
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    c(this, "setup", it.bind(this));
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param propKey {string}
     * @param propValue {any}
     */
    c(this, "prop", ot.bind(this));
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    c(this, "props", rt.bind(this));
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", ct.bind(this));
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", lt.bind(this));
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", ht.bind(this));
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", at.bind(this));
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", dt.bind(this));
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", ft.bind(this));
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", bt.bind(this));
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", yt.bind(this));
    /**
     * Conditionally render a component.
     */
    c(this, "if", gt.bind(this));
    /**
     * Clone the component
     */
    c(this, "clone", kt.bind(this));
    c(this, "el");
    c(this, "children", []);
    c(this, "componentProps");
    c(this, "parent", null);
    // Lifecycle
    c(this, "onMountCbs", []);
    c(this, "onDestroyCbs", []);
    c(this, "onInitCbs", []);
    c(this, "scopes", /* @__PURE__ */ new Set());
    c(this, "runningScopes", /* @__PURE__ */ new Set());
    c(this, "__identifier");
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.componentProps = n, this.__identifier = Ct(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  __children(e) {
    this.children = e;
  }
  __runOnMount() {
    for (const e of this.onMountCbs)
      e();
  }
  __runOnDestroy() {
    for (const e of this.onDestroyCbs)
      e();
  }
  __runOnInit() {
    for (const e of this.onInitCbs)
      e();
  }
  __rerunSetup() {
    for (const e of this.scopes) {
      const n = j();
      n.run(() => {
        e(this, this.componentProps);
      }), this.runningScopes.add(n);
    }
  }
  __closeScopes() {
    for (const e of this.runningScopes)
      e.stop();
    this.runningScopes = /* @__PURE__ */ new Set();
  }
  /////////////////////////////////////////////////////////////
  // Public API
  /**
   * Executes provided callback function when the component is initialized.
   * Before being rendered in the dom.
   *
   * @param callback {function}
   */
  onInit(e) {
    this.onInitCbs.push(e);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(e) {
    this.onMountCbs.push(e);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(e) {
    this.onDestroyCbs.push(e);
  }
  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(e = "body") {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    n.appendChild(this.el), this.__rerunSetup(), this.__runOnInit(), b(this, this.children), this.__runOnMount();
  }
  // Removes the root component and its desendants. It also
  destroy() {
    pt(this);
  }
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
  for(e, n) {
    return mt.call(this, e, n);
  }
}
class S extends g {
  constructor(e) {
    super(document.createElement(e));
  }
  __children(e) {
    this.children = [];
  }
}
class O extends g {
  constructor(e = []) {
    super(document.createElement("template")), this.children = e;
  }
  mount(e) {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), b(n, this.children), this.__runOnMount();
  }
}
function St(t) {
  return new O(t);
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
    return m.call(this, "value", n), this;
  }
  placeholder(n) {
    return m.call(this, "placeholder", n), this;
  }
  name(n) {
    return m.call(this, "name", n), this;
  }
  required(n) {
    return m.call(this, "required", n), this;
  }
}
function T(t = "text") {
  const e = document.createElement("input");
  return new M(e, t);
}
function Ot() {
  const t = document.createElement("textarea");
  return new M(t);
}
class xt extends S {
  constructor(e, n) {
    super("option"), e && (this.el.value = String(e), this.el.textContent = String(e)), n && (this.el.textContent = String(n));
  }
  value(e) {
    return m.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function Dt(t, e) {
  return new xt(t, e);
}
class It extends S {
  constructor(n) {
    super("img");
    c(this, "el");
    this.el = n;
  }
  src(n) {
    return m.call(this, "src", n), this;
  }
  alt(n) {
    return m.call(this, "alt", n), this;
  }
}
function At(t) {
  const e = document.createElement("img"), n = new It(e);
  return t && n.src(t), n;
}
const jt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], q = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], V = jt.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const i = document.createElement(e), o = new g(i), r = y(n) ? n.concat(s) : [n].concat(s);
  return o.__children(r), o;
}, t), {}), F = q.reduce((t, e) => (t[e] = () => new S(e), t), {}), A = Object.assign(V, F, {
  fragment: St,
  input: T,
  textarea: Ot,
  option: Dt,
  img: At
}), Lt = [
  ...q,
  "input",
  "textarea",
  "option"
];
function Ft(t, e) {
  return (n) => {
    const s = Lt.includes(t) ? A[t]() : A[t](n);
    return s.setup(e), s;
  };
}
const {
  a: Ht,
  abbr: Bt,
  address: Wt,
  applet: Nt,
  article: zt,
  aside: $t,
  audio: Ut,
  b: Xt,
  basefont: Gt,
  bdi: Jt,
  bdo: Qt,
  bgsound: Zt,
  blink: Yt,
  blockquote: Kt,
  body: Rt,
  button: te,
  canvas: ee,
  caption: ne,
  cite: se,
  code: ie,
  colgroup: oe,
  content: re,
  data: ce,
  datalist: le,
  dd: ue,
  decorator: he,
  del: ae,
  details: de,
  dfn: fe,
  div: pe,
  dl: be,
  dt: me,
  element: ye,
  em: ge,
  fieldset: ke,
  figcaption: ve,
  figure: we,
  footer: _e,
  form: Ee,
  h1: Ce,
  h2: Se,
  h3: Oe,
  h4: xe,
  h5: De,
  h6: Ie,
  head: Ae,
  header: je,
  hgroup: Le,
  html: Pe,
  i: Me,
  iframe: Te,
  ins: qe,
  isindex: Ve,
  kbd: Fe,
  keygen: He,
  label: Be,
  legend: We,
  li: Ne,
  listing: ze,
  main: $e,
  map: Ue,
  mark: Xe,
  menu: Ge,
  meter: Je,
  nav: Qe,
  noscript: Ze,
  object: Ye,
  ol: Ke,
  optgroup: Re,
  output: tn,
  p: en,
  picture: nn,
  pre: sn,
  progress: on,
  q: rn,
  rp: cn,
  rt: ln,
  ruby: un,
  s: hn,
  samp: an,
  script: dn,
  section: fn,
  select: pn,
  shadow: bn,
  small: mn,
  spacer: yn,
  span: gn,
  strong: kn,
  style: vn,
  sub: wn,
  summary: _n,
  sup: En,
  table: Cn,
  tbody: Sn,
  td: On,
  template: xn,
  tfoot: Dn,
  th: In,
  thead: An,
  time: jn,
  title: Ln,
  tr: Pn,
  u: Mn,
  ul: Tn,
  video: qn
} = V, {
  area: Vn,
  base: Fn,
  br: Hn,
  col: Bn,
  embed: Wn,
  hr: Nn,
  link: zn,
  meta: $n,
  source: Un,
  track: Xn,
  wbr: Gn
} = F, Pt = T().setup((t) => {
  t.keydown((e) => {
    console.log(e.key);
  }), t.keydownExact(["Alt", "c"], () => {
    console.log("C!!!");
  });
});
Pt.mount("#app");
export {
  g as Component,
  Ht as a,
  Bt as abbr,
  Wt as address,
  Nt as applet,
  Vn as area,
  zt as article,
  $t as aside,
  Ut as audio,
  Xt as b,
  Fn as base,
  Gt as basefont,
  Jt as bdi,
  Qt as bdo,
  Zt as bgsound,
  Yt as blink,
  Kt as blockquote,
  Rt as body,
  Hn as br,
  te as button,
  ee as canvas,
  ne as caption,
  se as cite,
  ie as code,
  Bn as col,
  oe as colgroup,
  re as content,
  Ct as createId,
  ce as data,
  le as datalist,
  ue as dd,
  he as decorator,
  ae as del,
  de as details,
  fe as dfn,
  pe as div,
  be as dl,
  me as dt,
  ye as element,
  ge as em,
  Wn as embed,
  ke as fieldset,
  ve as figcaption,
  we as figure,
  _e as footer,
  Ee as form,
  St as fragment,
  Vt as getInstance,
  Ce as h1,
  Se as h2,
  Oe as h3,
  xe as h4,
  De as h5,
  Ie as h6,
  Ae as head,
  je as header,
  Le as hgroup,
  Nn as hr,
  Pe as html,
  Me as i,
  Te as iframe,
  At as img,
  T as input,
  qe as ins,
  Ve as isindex,
  Fe as kbd,
  He as keygen,
  Be as label,
  We as legend,
  Ne as li,
  zn as link,
  ze as listing,
  $e as main,
  Ue as map,
  Xe as mark,
  Ge as menu,
  $n as meta,
  Je as meter,
  Qe as nav,
  Ze as noscript,
  Ye as object,
  Ke as ol,
  Re as optgroup,
  Dt as option,
  tn as output,
  en as p,
  nn as picture,
  sn as pre,
  on as progress,
  rn as q,
  Ft as reusable,
  cn as rp,
  ln as rt,
  un as ruby,
  hn as s,
  an as samp,
  dn as script,
  fn as section,
  pn as select,
  bn as shadow,
  mn as small,
  Un as source,
  yn as spacer,
  gn as span,
  kn as strong,
  vn as style,
  wn as sub,
  _n as summary,
  En as sup,
  Cn as table,
  Sn as tbody,
  On as td,
  xn as template,
  Ot as textarea,
  Dn as tfoot,
  In as th,
  An as thead,
  jn as time,
  Ln as title,
  Pn as tr,
  Xn as track,
  Mn as u,
  Tn as ul,
  qn as video,
  Gn as wbr
};
