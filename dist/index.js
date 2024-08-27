var H = Object.defineProperty;
var F = (t, e, n) => e in t ? H(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => (F(t, typeof e != "symbol" ? e + "" : e, n), n);
import { isRef as B, toValue as d, effectScope as j } from "@vue/reactivity";
import { watch as a } from "@vue-reactivity/watch";
function g(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function C(t) {
  return t == null;
}
function _(t) {
  return Array.isArray(t);
}
function L(t) {
  return typeof t == "function";
}
function f(t) {
  return B(t) || L(t);
}
function Vt(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const v = {
  immediate: !0,
  deep: !0
};
function y(t, e, n) {
  const s = (i) => {
    Reflect.set(this.el, t, i);
  };
  if (f(e)) {
    const i = a(() => d(e), (o) => {
      s(n ? String(o) : o);
    }, v);
    this.onDestroy(i);
  } else
    s(n ? String(e) : e);
  return this;
}
function W(t) {
  return y.call(this, "textContent", t == null ? void 0 : t.toString()), this;
}
function N(t, e, n) {
  return this.onMount(() => {
    this.el.addEventListener(t, e, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(t, e);
  }), this;
}
function z(t, e) {
  return this.on("click", t, e);
}
function $(t, e) {
  return this.on("submit", t, e);
}
function U(t, e) {
  return this.on("focus", t, e);
}
function X(t, e) {
  return this.on("blur", t, e);
}
function G(t, e) {
  return this.on("change", t, e);
}
function J(t, e) {
  return this.on("input", t, e);
}
function x(t, e, n, s) {
  const i = [];
  function o(h) {
    i.push(h), i.length > e.length && i.shift();
  }
  const r = Array.isArray(e) ? e : [e];
  return this.on(t, (h) => {
    const l = h.key;
    function u() {
      L(n) ? n(h) : n.handleEvent(h);
    }
    switch ((s == null ? void 0 : s.detect) || "every") {
      case "some": {
        r.includes(l) && u();
        break;
      }
      case "every":
      default: {
        o(l), r.every((k, E) => k === i[E]) && u();
        break;
      }
    }
  }, s);
}
function Q(t, e) {
  return this.on("keydown", t, e);
}
function Z(t, e, n) {
  return x.call(this, "keydown", t, e, n);
}
function Y(t, e) {
  return this.on("keyup", t, e);
}
function K(t, e, n) {
  return x.call(this, "keyup", t, e, n);
}
function R(t, e) {
  return this.on("keyup", t, e);
}
function tt(t, e, n) {
  return x.call(this, "keypress", t, e, n);
}
function et(t, e) {
  if (g(t) && !C(e))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (l) => {
    for (const u of Object.keys(l))
      l[u] ? this.el.classList.add(u) : this.el.classList.remove(u);
  }, o = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (_(l)) {
        const u = l.length;
        for (let p = 0; p < u; p++) {
          const k = l[p];
          if (k)
            typeof k == "string" ? (this.el.classList.add(k), s[p] = k) : g(l) && i(k);
          else {
            const E = s[p];
            E && (this.el.classList.remove(E), s[p] = null);
          }
        }
      } else
        g(l) && i(l);
  }, r = (l, u) => {
    f(u) ? this.onDestroy(a(() => d(u), (p) => {
      o({ [l]: p });
    }, v)) : l && u !== !1 && o(l);
  }, h = (l) => {
    for (const [u, p] of Object.entries(l))
      r(u, p);
  };
  return g(t) ? h(t) : typeof t == "string" && r(t, e), this;
}
function nt(t) {
  return y.call(this, "innerHTML", t), this;
}
function st(t) {
  return this.__scopes.add(t), this.onInit(() => {
    const e = j();
    e.run(() => {
      t(this, this.__componentProps);
    }), this.onDestroy(() => {
      e.stop();
    });
  }), this;
}
function it(t, e) {
  return Object.assign(this.__componentProps, { [t]: e }), this;
}
function ot(t) {
  for (const e of Object.keys(t))
    this.prop(e, t[e]);
  return this;
}
function rt(t, ...e) {
  const n = _(t) ? t.concat(e) : [t].concat(e);
  return this.__setComponentChildren(n), this;
}
function D(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function P(t, e, n) {
  _(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function I(t, e) {
  (!t.value || _(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (P(t, e.value, !0), e.removeAttribute("checked"));
}
function ct(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = a(t, (i) => {
              i === n.value || _(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
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
        const i = _(t.value) ? t.value[0] : t.value;
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
        const i = _(t.value) ? t.value[0] : t.value;
        n.open = !!i;
        break;
      }
    }
  }), this;
}
function lt(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function b(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e)
    if (typeof e == "string" || typeof e == "number")
      if (C(n))
        s.innerHTML = String(e);
      else {
        const i = document.createTextNode(String(e));
        lt(s, i, n) || s.appendChild(i);
      }
    else if (e instanceof O)
      b(s, e.componentChildren);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof m)
      t instanceof m && (e.parent = t), s.appendChild(e.el), e.__runOnInit(), b(e, e.componentChildren), e.__runOnMount();
    else if (Array.isArray(e)) {
      const i = e.length;
      for (let o = 0; o < i; o++) {
        const r = e[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? b(s, r, o) : r instanceof O ? b(s, r.componentChildren) : f(r) ? a(() => d(r), (h) => {
          b(s, h, o);
        }, {
          immediate: !0,
          deep: !0
        }) : (t instanceof m && (r.parent = t), s.appendChild(r.el), r.__runOnInit(), b(r, r.componentChildren), r.__runOnMount());
      }
    } else
      f(e) && a(() => d(e), (i) => {
        i instanceof m ? i.destroy() : s.innerHTML = "", b(s, i);
      }, {
        immediate: !0,
        deep: !0
      });
}
function w(t, e, n) {
  if (g(e)) {
    Object.entries(e).forEach(([s, i]) => {
      w(t, s, i);
    });
    return;
  }
  C(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function ht(t) {
  return this.onInit(() => {
    if (f(t)) {
      const e = a(() => d(t), (n) => w(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      w(this.el, t);
  }), this;
}
function ut(t, e) {
  return this.onInit(() => {
    if (f(e)) {
      const n = a(() => d(e), (s) => w(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      w(this.el, t, e);
  }), this;
}
function at(t) {
  return this.attr("disabled", t), this;
}
function dt(t) {
  return y.call(this, "id", t), this;
}
function ft(t) {
  function e(n) {
    if (!(n instanceof m))
      return;
    for (const i of n.__onDestroyCbs)
      i();
    const { children: s } = n;
    if (s instanceof m)
      e(s);
    else if (_(s))
      for (const i of s)
        i instanceof m && e(i);
  }
  e(t), t.__runOnDestroy(), t.el.remove();
}
function pt(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? C(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (f(t)) {
      const s = a(() => d(t), n, v);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function mt(t, e) {
  return this.onInit(() => {
    const n = (s) => {
      const i = [];
      if (_(s)) {
        const o = s.length;
        for (let r = 0; r < o; r++) {
          const h = e(s[r], r);
          h && i.push(h);
        }
      } else if (g(s)) {
        const o = Object.keys(s), r = o.length;
        for (let h = 0; h < r; h++) {
          const l = o[h], u = e(Reflect.get(s, l), l, h);
          u && i.push(u);
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
function bt(t, e) {
  const n = (s) => {
    if (!g(s)) {
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
      const s = a(() => d(t), n, v);
      this.onDestroy(s);
    }
  else if (g(t)) {
    const s = Object.keys(t);
    for (const i of s) {
      const o = Reflect.get(t, i);
      if (f(o)) {
        const r = a(() => d(o), (h) => {
          C(h) || this.el.style.setProperty(i, String(h));
        });
        this.onDestroy(r);
      } else
        C(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function yt(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), f(t)) {
      const i = a(() => d(t), s, v);
      this.onDestroy(i);
    } else
      s(t);
  }), this;
}
function _t() {
  const t = new m(this.el);
  return t.componentChildren = this.componentChildren, t.__scopes = new Set(this.__scopes), t;
}
const gt = /* @__PURE__ */ new Set(), kt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), Ct = "abcdefghiklmnopqrstuvwxyz".split("");
function wt(t) {
  const e = t ? Ct : kt;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function vt(t = !1) {
  let e = "";
  for (; e.length === 0 || gt.has(e); )
    e = wt(t);
  return e;
}
class m {
  constructor(e, n = {}) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", W.bind(this));
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", nt.bind(this));
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", N.bind(this));
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", z.bind(this));
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", $.bind(this));
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", U.bind(this));
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", X.bind(this));
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", G.bind(this));
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", J.bind(this));
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", Q.bind(this));
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", Z.bind(this));
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", Y.bind(this));
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", K.bind(this));
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", R.bind(this));
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keypressExact", tt.bind(this));
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", et.bind(this));
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    c(this, "setup", st.bind(this));
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param propKey {string}
     * @param propValue {any}
     */
    c(this, "prop", it.bind(this));
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    c(this, "props", ot.bind(this));
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", rt.bind(this));
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", ct.bind(this));
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", ht.bind(this));
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", ut.bind(this));
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", at.bind(this));
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", dt.bind(this));
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", pt.bind(this));
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", bt.bind(this));
    /**
     * Conditionally render a component.
     */
    c(this, "if", yt.bind(this));
    /**
     * Clone the component
     */
    c(this, "clone", _t.bind(this));
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
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.__componentProps = n, this.identifier = vt(!0);
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
      const n = j();
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
  // Removes the root component and its desendants. It also
  destroy() {
    ft(this);
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
class S extends m {
  constructor(e) {
    super(document.createElement(e));
  }
  __setComponentChildren(e) {
    this.componentChildren = [];
  }
}
class O extends m {
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
function Et(t) {
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
    return y.call(this, "value", n), this;
  }
  placeholder(n) {
    return y.call(this, "placeholder", n), this;
  }
  name(n) {
    return y.call(this, "name", n), this;
  }
  required(n) {
    return y.call(this, "required", n), this;
  }
}
function St(t = "text") {
  const e = document.createElement("input");
  return new M(e, t);
}
function Ot() {
  const t = document.createElement("textarea");
  return new M(t);
}
class xt extends S {
  constructor(e, n) {
    if (super("option"), n) {
      const s = d(n);
      this.el.value = String(s), this.el.textContent = String(s), f(n) && this.value(n);
    }
    e && (this.el.textContent = String(e));
  }
  value(e) {
    return y.call(this, "value", e), this;
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
    return y.call(this, "src", n), this;
  }
  alt(n) {
    return y.call(this, "alt", n), this;
  }
}
function At(t) {
  const e = document.createElement("img"), n = new It(e);
  return t && n.src(t), n;
}
const jt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], T = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], V = jt.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const i = document.createElement(e), o = new m(i), r = _(n) ? n.concat(s) : [n].concat(s);
  return o.__setComponentChildren(r), o.children = r, o;
}, t), {}), q = T.reduce((t, e) => (t[e] = () => {
  const n = new S(e);
  return n.isVoid = !0, n;
}, t), {}), A = Object.assign(V, q, {
  fragment: Et,
  input: St,
  textarea: Ot,
  option: Dt,
  img: At
}), Lt = [
  ...T,
  "input",
  "textarea",
  "option"
];
function qt(t, e) {
  return (n) => {
    const s = Lt.includes(t) ? A[t]() : A[t](n);
    return s.setup(e), s;
  };
}
const {
  a: Ht,
  abbr: Ft,
  address: Bt,
  applet: Wt,
  article: Nt,
  aside: zt,
  audio: $t,
  b: Ut,
  basefont: Xt,
  bdi: Gt,
  bdo: Jt,
  bgsound: Qt,
  blink: Zt,
  blockquote: Yt,
  body: Kt,
  button: Rt,
  canvas: te,
  caption: ee,
  cite: ne,
  code: se,
  colgroup: ie,
  content: oe,
  data: re,
  datalist: ce,
  dd: le,
  decorator: he,
  del: ue,
  details: ae,
  dfn: de,
  div: fe,
  dl: pe,
  dt: me,
  element: be,
  em: ye,
  fieldset: _e,
  figcaption: ge,
  figure: ke,
  footer: Ce,
  form: we,
  h1: ve,
  h2: Ee,
  h3: Se,
  h4: Oe,
  h5: xe,
  h6: De,
  head: Ie,
  header: Ae,
  hgroup: je,
  html: Le,
  i: Pe,
  iframe: Me,
  ins: Te,
  isindex: Ve,
  kbd: qe,
  keygen: He,
  label: Fe,
  legend: Be,
  li: We,
  listing: Ne,
  main: ze,
  map: $e,
  mark: Ue,
  menu: Xe,
  meter: Ge,
  nav: Je,
  noscript: Qe,
  object: Ze,
  ol: Ye,
  optgroup: Ke,
  output: Re,
  p: tn,
  picture: en,
  pre: nn,
  progress: sn,
  q: on,
  rp: rn,
  rt: cn,
  ruby: ln,
  s: hn,
  samp: un,
  script: an,
  section: dn,
  select: fn,
  shadow: pn,
  small: mn,
  spacer: bn,
  span: yn,
  strong: _n,
  style: gn,
  sub: kn,
  summary: Cn,
  sup: wn,
  table: vn,
  tbody: En,
  td: Sn,
  template: On,
  tfoot: xn,
  th: Dn,
  thead: In,
  time: An,
  title: jn,
  tr: Ln,
  u: Pn,
  ul: Mn,
  video: Tn
} = V, {
  area: Vn,
  base: qn,
  br: Hn,
  col: Fn,
  embed: Bn,
  hr: Wn,
  link: Nn,
  meta: zn,
  source: $n,
  track: Un,
  wbr: Xn
} = q;
export {
  m as Component,
  Ht as a,
  Ft as abbr,
  Bt as address,
  Wt as applet,
  Vn as area,
  Nt as article,
  zt as aside,
  $t as audio,
  Ut as b,
  qn as base,
  Xt as basefont,
  Gt as bdi,
  Jt as bdo,
  Qt as bgsound,
  Zt as blink,
  Yt as blockquote,
  Kt as body,
  Hn as br,
  Rt as button,
  te as canvas,
  ee as caption,
  ne as cite,
  se as code,
  Fn as col,
  ie as colgroup,
  oe as content,
  vt as createId,
  re as data,
  ce as datalist,
  le as dd,
  he as decorator,
  ue as del,
  ae as details,
  de as dfn,
  fe as div,
  pe as dl,
  me as dt,
  be as element,
  ye as em,
  Bn as embed,
  _e as fieldset,
  ge as figcaption,
  ke as figure,
  Ce as footer,
  we as form,
  Et as fragment,
  Vt as getInstance,
  ve as h1,
  Ee as h2,
  Se as h3,
  Oe as h4,
  xe as h5,
  De as h6,
  Ie as head,
  Ae as header,
  je as hgroup,
  Wn as hr,
  Le as html,
  Pe as i,
  Me as iframe,
  At as img,
  St as input,
  Te as ins,
  Ve as isindex,
  qe as kbd,
  He as keygen,
  Fe as label,
  Be as legend,
  We as li,
  Nn as link,
  Ne as listing,
  ze as main,
  $e as map,
  Ue as mark,
  Xe as menu,
  zn as meta,
  Ge as meter,
  Je as nav,
  Qe as noscript,
  Ze as object,
  Ye as ol,
  Ke as optgroup,
  Dt as option,
  Re as output,
  tn as p,
  en as picture,
  nn as pre,
  sn as progress,
  on as q,
  qt as reusable,
  rn as rp,
  cn as rt,
  ln as ruby,
  hn as s,
  un as samp,
  an as script,
  dn as section,
  fn as select,
  pn as shadow,
  mn as small,
  $n as source,
  bn as spacer,
  yn as span,
  _n as strong,
  gn as style,
  kn as sub,
  Cn as summary,
  wn as sup,
  vn as table,
  En as tbody,
  Sn as td,
  On as template,
  Ot as textarea,
  xn as tfoot,
  Dn as th,
  In as thead,
  An as time,
  jn as title,
  Ln as tr,
  Un as track,
  Pn as u,
  Mn as ul,
  Tn as video,
  Xn as wbr
};
