var L = Object.defineProperty;
var M = (e, t, n) => t in e ? L(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => (M(e, typeof t != "symbol" ? t + "" : t, n), n);
import { isRef as f, effectScope as x } from "@vue/reactivity";
import { watch as h } from "@vue-reactivity/watch";
function y(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function v(e) {
  return e == null;
}
function b(e) {
  return Array.isArray(e);
}
function vt(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
const C = {
  immediate: !0,
  deep: !0
};
function g(e, t, n) {
  const s = (i) => {
    Reflect.set(this.el, e, i);
  };
  if (f(t)) {
    const i = h(t, (o) => {
      s(n ? String(o) : o);
    }, C);
    this.onDestroy(i);
  } else
    s(n ? String(t) : t);
  return this;
}
function T(e) {
  return g.call(this, "textContent", e), this;
}
function q(e, t, n) {
  return this.onMount(() => {
    this.el.addEventListener(e, t, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(e, t);
  }), this;
}
function V(e, t) {
  return this.on("click", e, t);
}
function B(e, t) {
  if (y(e) && !v(t))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (l) => {
    for (const a of Object.keys(l))
      l[a] ? this.el.classList.add(a) : this.el.classList.remove(a);
  }, o = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (b(l)) {
        const a = l.length;
        for (let d = 0; d < a; d++) {
          const _ = l[d];
          if (_)
            typeof _ == "string" ? (this.el.classList.add(_), s[d] = _) : y(l) && i(_);
          else {
            const E = s[d];
            E && (this.el.classList.remove(E), s[d] = null);
          }
        }
      } else
        y(l) && i(l);
  }, r = (l, a) => {
    f(a) ? this.onDestroy(h(a, (d) => {
      o({ [l]: d });
    }, C)) : l && a !== !1 && o(l);
  }, u = (l) => {
    for (const [a, d] of Object.entries(l))
      r(a, d);
  };
  return y(e) ? u(e) : typeof e == "string" && r(e, t), this;
}
function F(e) {
  return g.call(this, "innerHTML", e), this;
}
function H(e) {
  return this.scopes.add(e), this.onInit(() => {
    const t = x();
    t.run(() => {
      e(this, this.componentProps);
    }), this.onDestroy(() => {
      t.stop();
    });
  }), this;
}
function N(e, t) {
  return Object.assign(this.componentProps, { [e]: t }), this;
}
function W(e) {
  for (const t of Object.keys(e))
    this.prop(t, e[t]);
  return this;
}
function z(e, ...t) {
  const n = b(e) ? e.concat(t) : [e].concat(t);
  return this.__children(n), this;
}
function k(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function I(e, t, n) {
  b(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function D(e, t) {
  (!e.value || b(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (I(e, t.value, !0), t.removeAttribute("checked"));
}
function U(e, t = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(e, (i) => {
              i === n.value || b(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: r } = i.target;
              I(e, r, o);
            }, t.eventOptions), D(e, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(e, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: r } = i.target;
              r && (e.value = o);
            }, t.eventOptions), D(e, n);
            break;
          }
          default: {
            const n = this.el, s = h(e, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(t.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = k(o, t.transforms), e.value = o;
            }, t.eventOptions), n.value = String(e.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = h(e, (o) => {
          e.value = o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (o) => {
          let r = o.target.value;
          r = k(r, t.transforms), e.value = r;
        }, t.eventOptions);
        const i = b(e.value) ? e.value[0] : e.value;
        if (i)
          n.value = i.toString();
        else if (n.childElementCount > 0) {
          const o = Array.from(n.children).find((r) => r.hasAttribute("selected"));
          if (o) {
            o.removeAttribute("selected");
            const r = o.value;
            e.value = r, n.value = r;
          }
        }
        break;
      }
      case "DETAILS": {
        const n = this.el, s = h(e, (o) => {
          n.open = !!o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          e.value = n.open;
        }, t.eventOptions);
        const i = b(e.value) ? e.value[0] : e.value;
        n.open = !!i;
        break;
      }
    }
  }), this;
}
function X(e, t, n) {
  const s = Array.from(e.childNodes).at(n);
  return s ? (e.replaceChild(t, s), !0) : !1;
}
function p(e, t, n) {
  const s = e instanceof Element ? e : e.el;
  if (t)
    if (typeof t == "string" || typeof t == "number")
      if (v(n))
        s.innerHTML = String(t);
      else {
        const i = document.createTextNode(String(t));
        X(s, i, n) || s.appendChild(i);
      }
    else if (t instanceof O)
      p(s, t.children);
    else if (t instanceof Element)
      s.appendChild(t);
    else if (t instanceof m)
      e instanceof m && (t.parent = e), s.appendChild(t.el), t.__runOnInit(), p(t, t.children), t.__runOnMount();
    else if (Array.isArray(t)) {
      const i = t.length;
      for (let o = 0; o < i; o++) {
        const r = t[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? p(s, r, o) : r instanceof O ? p(s, r.children) : f(r) ? h(r, (u) => p(s, u, o), {
          immediate: !0,
          deep: !0
        }) : (e instanceof m && (r.parent = e), s.appendChild(r.el), r.__runOnInit(), p(r, r.children), r.__runOnMount());
      }
    } else
      f(t) && h(t, (i) => p(s, i), {
        immediate: !0,
        deep: !0
      });
}
function w(e, t, n) {
  if (y(t)) {
    Object.entries(t).forEach(([s, i]) => {
      w(e, s, i);
    });
    return;
  }
  v(n) ? e.setAttribute(t, "") : typeof n == "boolean" ? n ? e.setAttribute(t, "") : e.removeAttribute(t) : e.setAttribute(t, String(n));
}
function G(e) {
  return this.onInit(() => {
    if (f(e)) {
      const t = h(e, (n) => w(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(t);
    } else
      w(this.el, e);
  }), this;
}
function J(e, t) {
  return this.onInit(() => {
    if (f(t)) {
      const n = h(t, (s) => w(this.el, e, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      w(this.el, e, t);
  }), this;
}
function K(e) {
  return this.attr("disabled", e), this;
}
function Q(e) {
  return g.call(this, "id", e), this;
}
function Z(e) {
  function t(n) {
    if (!(n instanceof m))
      return;
    for (const i of n.onDestroyCbs)
      i();
    const { children: s } = n;
    if (s instanceof m)
      t(s);
    else if (b(s))
      for (const i of s)
        i instanceof m && t(i);
  }
  t(e), e.__runOnDestroy(), e.el.remove();
}
function $(e) {
  return this.onMount(() => {
    const t = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? v(t) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", t) : this.el.style.setProperty("display", "none");
    };
    if (f(e)) {
      const s = h(e, n, {
        deep: !0,
        immediate: !0
      });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function Y(e, t) {
  return this.onInit(() => {
    const n = (s) => {
      const i = [];
      if (b(s)) {
        const o = s.length;
        for (let r = 0; r < o; r++) {
          const u = t(s[r], r);
          u && i.push(u);
        }
      } else if (y(s)) {
        const o = Object.keys(s), r = o.length;
        for (let u = 0; u < r; u++) {
          const l = o[u], a = t(Reflect.get(s, l), l, u);
          a && i.push(a);
        }
      } else if (typeof s == "number")
        for (let o = 0; o < s; o++) {
          const r = t(o);
          r && i.push(r);
        }
      this.el.replaceChildren(), p(this.el, i);
    };
    if (f(e)) {
      const s = h(e, (i) => {
        n(i);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function R(e, t) {
  const n = (s) => {
    if (!y(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof e == "string")
    if (f(t)) {
      const s = h(t, (i) => {
        n({ [e]: i });
      });
      this.onDestroy(s);
    } else
      t && n({ [e]: t });
  else if (f(e))
    if (t)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = h(e, n, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(s);
    }
  else if (y(e)) {
    const s = Object.keys(e);
    for (const i of s) {
      const o = Reflect.get(e, i);
      if (f(o)) {
        const r = h(o, (u) => {
          v(u) || this.el.style.setProperty(i, String(u));
        });
        this.onDestroy(r);
      } else
        v(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function tt(e) {
  const t = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, t) : this.el.remove();
    };
    if (n.el.insertBefore(t, this.el), f(e)) {
      const i = h(e, s, C);
      this.onDestroy(i);
    } else
      s(e);
  }), this;
}
function et() {
  const e = new m(this.el);
  return e.children = this.children, e.scopes = new Set(this.scopes), e;
}
const nt = /* @__PURE__ */ new Set(), st = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), it = "abcdefghiklmnopqrstuvwxyz".split("");
function ot(e) {
  const t = e ? it : st;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += t[Math.floor(Math.random() * t.length)];
  return n;
}
function rt(e = !1) {
  let t = "";
  for (; t.length === 0 || nt.has(t); )
    t = ot(e);
  return t;
}
class m {
  constructor(t, n = {}) {
    /**
     * Set `textContent` of the current node.
     *
     * @param text {string | () => string}
     */
    c(this, "text", T.bind(this));
    /**
     * Set `innerHTML` of the current node.
     */
    c(this, "html", F.bind(this));
    /**
     * Add an event listener to the current node.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", q.bind(this));
    /**
     * Shorthand for binding `on("click")` event listener to the current node.
     */
    c(this, "click", V.bind(this));
    /**
     * Bind reactive class object to the current node.
     */
    c(this, "class", B.bind(this));
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    c(this, "setup", H.bind(this));
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param propKey {string}
     * @param propValue {any}
     */
    c(this, "prop", N.bind(this));
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    c(this, "props", W.bind(this));
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", z.bind(this));
    c(this, "model", U.bind(this));
    c(this, "attrs", G.bind(this));
    c(this, "attr", J.bind(this));
    /**
     * Dynamically bind a `disabled` attribute to the node.
     */
    c(this, "disabled", K.bind(this));
    /**
     * Dynamically bind an `id` attribute to the node.
     */
    c(this, "id", Q.bind(this));
    /**
     * Toggle between showing or hiding the current node. The node is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", $.bind(this));
    /**
     * Add reactive styling object to the current node.
     */
    c(this, "style", R.bind(this));
    c(this, "if", tt.bind(this));
    c(this, "clone", et.bind(this));
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
    this.el = t, Object.defineProperty(this.el, "__instance", this), this.componentProps = n, this.__identifier = rt(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  __children(t) {
    this.children = t;
  }
  __runOnMount() {
    for (const t of this.onMountCbs)
      t();
  }
  __runOnDestroy() {
    for (const t of this.onDestroyCbs)
      t();
  }
  __runOnInit() {
    for (const t of this.onInitCbs)
      t();
  }
  __rerunSetup() {
    for (const t of this.scopes) {
      const n = x();
      n.run(() => {
        t(this, this.componentProps);
      }), this.runningScopes.add(n);
    }
  }
  __closeScopes() {
    for (const t of this.runningScopes)
      t.stop();
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
  onInit(t) {
    this.onInitCbs.push(t);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(t) {
    this.onMountCbs.push(t);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(t) {
    this.onDestroyCbs.push(t);
  }
  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(t = "body") {
    const n = document.querySelector(t);
    if (!n)
      throw new Error("Root element does not exist");
    n.appendChild(this.el), this.__rerunSetup(), this.__runOnInit(), p(this, this.children), this.__runOnMount();
  }
  // Removes the root node and its desendants. It also
  destroy() {
    Z(this);
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
  for(t, n) {
    return Y.call(this, t, n);
  }
}
class S extends m {
  constructor(t) {
    super(document.createElement(t));
  }
  __children(t) {
    this.children = [];
  }
}
class O extends m {
  constructor(t = []) {
    super(document.createElement("template")), this.children = t;
  }
  mount(t) {
    const n = document.querySelector(t);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), p(n, this.children), this.__runOnMount();
  }
}
function ct(e) {
  return new O(e);
}
class j extends S {
  constructor(n, s) {
    super();
    c(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  value(n) {
    return g.call(this, "value", n), this;
  }
  placeholder(n) {
    return g.call(this, "placeholder", n), this;
  }
  name(n) {
    return g.call(this, "name", n), this;
  }
  required(n) {
    return g.call(this, "required", n), this;
  }
}
function lt(e = "text") {
  const t = document.createElement("input");
  return new j(t, e);
}
function ht() {
  const e = document.createElement("textarea");
  return new j(e);
}
class ut extends S {
  constructor(t, n) {
    super("option"), t && (this.el.value = String(t), this.el.textContent = String(t)), n && (this.el.textContent = String(n));
  }
  value(t) {
    return g.call(this, "value", t), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function at(e, t) {
  return new ut(e, t);
}
const ft = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], P = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], dt = ft.reduce((e, t) => (e[t] = (n) => {
  const s = document.createElement(t), i = new m(s);
  return n && i.__children(n), i;
}, e), {}), pt = P.reduce((e, t) => (e[t] = () => new S(t), e), {}), A = Object.assign(dt, pt, {
  fragment: ct,
  input: lt,
  textarea: ht,
  option: at
}), mt = [
  ...P,
  "input",
  "textarea",
  "option"
];
function _t(e, t) {
  return (n) => {
    const s = mt.includes(e) ? A[e]() : A[e](n);
    return s.setup(t), s;
  };
}
export {
  A as $,
  m as Component,
  vt as getInstance,
  _t as reusable
};
