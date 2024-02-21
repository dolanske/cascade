var A = Object.defineProperty;
var j = (t, e, n) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => (j(t, typeof e != "symbol" ? e + "" : e, n), n);
import { isRef as b, effectScope as k, computed as L } from "@vue/reactivity";
import { watch as h } from "@vue-reactivity/watch";
function y(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function v(t) {
  return t == null;
}
function m(t) {
  return Object.prototype.toString.call(t) == "[object Function]";
}
function p(t) {
  return Array.isArray(t);
}
function ye(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
function f(t, e, n) {
  const s = (i) => {
    Reflect.set(this.el, t, i);
  };
  if (m(e) || b(e)) {
    const i = h(e, (o) => {
      s(n ? String(o) : o);
    }, {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(i);
  } else
    s(n ? String(e) : e);
  return this;
}
function P(t) {
  return f.call(this, "textContent", t), this;
}
function M(t, e, n) {
  return this.onMount(() => {
    this.el.addEventListener(t, e, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(t, e);
  }), this;
}
function T(t, e) {
  return this.on("click", t, e);
}
function q(t) {
  let e = "";
  const n = /* @__PURE__ */ Object.create(null), s = (o) => {
    for (const r of Object.keys(o))
      o[r] ? this.el.classList.add(r) : this.el.classList.remove(r);
  }, i = (o) => {
    if (o)
      if (typeof o == "string")
        e && this.el.classList.remove(e), e = o, this.el.classList.add(e);
      else if (p(o)) {
        const r = o.length;
        for (let l = 0; l < r; l++) {
          const d = o[l];
          if (d)
            typeof d == "string" ? (this.el.classList.add(d), n[l] = d) : y(o) && s(d);
          else {
            const g = n[l];
            g && (this.el.classList.remove(g), n[l] = null);
          }
        }
      } else
        y(o) && s(o);
  };
  if (m(t)) {
    const o = h(t, (r) => i(r), {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(o);
  } else
    i(t);
  return this;
}
function N(t) {
  return f.call(this, "innerHTML", t), this;
}
function F(t) {
  return this.scopes.add(t), this.onInit(() => {
    const e = k();
    e.run(() => {
      t(this, this.componentProps);
    }), this.onDestroy(() => {
      e.stop();
    });
  }), this;
}
function V(t, e) {
  return Object.assign(this.componentProps, { [t]: e }), this;
}
function B(t) {
  for (const e of Object.keys(t))
    this.prop(e, t[e]);
  return this;
}
function H(t) {
  return this.__children(t), this;
}
function S(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function D(t, e, n) {
  p(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function C(t, e) {
  (!t.value || p(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (D(t, e.value, !0), e.removeAttribute("checked"));
}
function z(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(t, (i) => {
              i === n.value || p(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: r } = i.target;
              D(t, r, o);
            }, e.eventOptions), C(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(t, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: r } = i.target;
              r && (t.value = o);
            }, e.eventOptions), C(t, n);
            break;
          }
          default: {
            const n = this.el, s = h(t, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = S(o, e.transforms), t.value = o;
            }, e.eventOptions), n.value = String(t.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = h(t, (o) => {
          t.value = o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (o) => {
          let r = o.target.value;
          r = S(r, e.transforms), t.value = r;
        }, e.eventOptions);
        const i = p(t.value) ? t.value[0] : t.value;
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
        const n = this.el, s = h(t, (o) => {
          n.open = !!o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          t.value = n.open;
        }, e.eventOptions);
        const i = p(t.value) ? t.value[0] : t.value;
        n.open = !!i;
        break;
      }
    }
  }), this;
}
function W(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function u(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e)
    if (typeof e == "string" || typeof e == "number")
      if (v(n))
        s.innerHTML = String(e);
      else {
        const i = document.createTextNode(String(e));
        W(s, i, n) || s.appendChild(i);
      }
    else if (e instanceof w)
      u(s, e.children);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof a)
      t instanceof a && (e.parent = t), s.appendChild(e.el), e.__runOnInit(), u(e, e.children), e.__runOnMount();
    else if (Array.isArray(e)) {
      const i = e.length;
      for (let o = 0; o < i; o++) {
        const r = e[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? u(s, r, o) : r instanceof w ? u(s, r.children) : m(r) ? h(r, (l) => u(s, l, o), {
          immediate: !0,
          deep: !0
        }) : (t instanceof a && (r.parent = t), s.appendChild(r.el), r.__runOnInit(), u(r, r.children), r.__runOnMount());
      }
    } else
      m(e) && h(e, (i) => u(s, i), {
        immediate: !0,
        deep: !0
      });
}
function _(t, e, n) {
  if (y(e)) {
    Object.entries(e).forEach(([s, i]) => {
      _(t, s, i);
    });
    return;
  }
  v(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function U(t) {
  return this.onInit(() => {
    if (m(t)) {
      const e = h(t, (n) => _(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      _(this.el, t);
  }), this;
}
function X(t, e) {
  return this.onInit(() => {
    if (m(e) || b(e)) {
      const n = h(e, (s) => _(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      _(this.el, t, e);
  }), this;
}
function G(t) {
  return this.attr("disabled", t), this;
}
function J(t) {
  return f.call(this, "id", t), this;
}
function K(t) {
  function e(n) {
    if (!(n instanceof a))
      return;
    for (const i of n.onDestroyCbs)
      i();
    const { children: s } = n;
    if (s instanceof a)
      e(s);
    else if (p(s))
      for (const i of s)
        i instanceof a && e(i);
  }
  e(t), t.__runOnDestroy(), t.el.remove();
}
function Q(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? v(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (m(t) || b(t)) {
      const s = h(t, n, {
        deep: !0,
        immediate: !0
      });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Z(t, e) {
  return this.onInit(() => {
    const n = (s) => {
      const i = [];
      if (p(s)) {
        const o = s.length;
        for (let r = 0; r < o; r++) {
          const l = e(s[r], r);
          l && i.push(l);
        }
      } else if (y(s)) {
        const o = Object.keys(s), r = o.length;
        for (let l = 0; l < r; l++) {
          const d = o[l], g = e(Reflect.get(s, d), d, l);
          g && i.push(g);
        }
      } else if (typeof s == "number")
        for (let o = 0; o < s; o++) {
          const r = e(o);
          r && i.push(r);
        }
      this.el.replaceChildren(), u(this.el, i);
    };
    if (b(t)) {
      const s = h(t, (i) => {
        n(i);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Y(t, e) {
  const n = (s) => {
    if (!y(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof t == "string")
    if (b(e)) {
      const s = h(e, (i) => {
        n({ [t]: i });
      });
      this.onDestroy(s);
    } else
      e && n({ [t]: e });
  else if (b(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = h(t, n, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(s);
    }
  else if (y(t)) {
    const s = Object.keys(t);
    for (const i of s) {
      const o = Reflect.get(t, i);
      if (b(o)) {
        const r = h(o, (l) => {
          v(l) || this.el.style.setProperty(i, String(l));
        });
        this.onDestroy(r);
      } else
        v(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function $(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), m(t)) {
      const i = L(t), o = h(i, s, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(o);
    } else
      s(t);
  }), this;
}
function R() {
  const t = new a(this.el);
  return t.children = this.children, t.scopes = new Set(this.scopes), t;
}
const ee = /* @__PURE__ */ new Set(), te = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), ne = "abcdefghiklmnopqrstuvwxyz".split("");
function se(t) {
  const e = t ? ne : te;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function ie(t = !1) {
  let e = "";
  for (; e.length === 0 || ee.has(e); )
    e = se(t);
  return e;
}
class a {
  constructor(e, n = {}) {
    /**
     * Set `textContent` of the current node.
     *
     * @param text {string | () => string}
     */
    c(this, "text", P.bind(this));
    /**
     * Set `innerHTML` of the current node.
     */
    c(this, "html", N.bind(this));
    /**
     * Add an event listener to the current node.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", M.bind(this));
    /**
     * Shorthand for binding `on("click")` event listener to the current node.
     */
    c(this, "click", T.bind(this));
    /**
     * Bind reactive class object to the current node.
     */
    c(this, "class", q.bind(this));
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    c(this, "setup", F.bind(this));
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param propKey {string}
     * @param propValue {any}
     */
    c(this, "prop", V.bind(this));
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    c(this, "props", B.bind(this));
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", H.bind(this));
    c(this, "model", z.bind(this));
    c(this, "attrs", U.bind(this));
    c(this, "attr", X.bind(this));
    /**
     * Dynamically bind a `disabled` attribute to the node.
     */
    c(this, "disabled", G.bind(this));
    /**
     * Dynamically bind an `id` attribute to the node.
     */
    c(this, "id", J.bind(this));
    /**
     * Toggle between showing or hiding the current node. The node is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", Q.bind(this));
    /**
     * Add reactive styling object to the current node.
     */
    c(this, "style", Y.bind(this));
    c(this, "if", $.bind(this));
    c(this, "clone", R.bind(this));
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
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.componentProps = n, this.__identifier = ie(!0);
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
      const n = k();
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
    n.appendChild(this.el), this.__rerunSetup(), this.__runOnInit(), u(this, this.children), this.__runOnMount();
  }
  // Removes the root node and its desendants. It also
  destroy() {
    K(this);
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
    return Z.call(this, e, n);
  }
}
class O extends a {
  constructor(e) {
    super(document.createElement(e));
  }
  __children(e) {
    this.children = [];
  }
}
class w extends a {
  constructor(e = []) {
    super(document.createElement("template")), this.children = e;
  }
  mount(e) {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), u(n, this.children), this.__runOnMount();
  }
}
function oe(t) {
  return new w(t);
}
class x extends O {
  constructor(n, s) {
    super();
    c(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  value(n) {
    return f.call(this, "value", n), this;
  }
  placeholder(n) {
    return f.call(this, "placeholder", n), this;
  }
  name(n) {
    return f.call(this, "name", n), this;
  }
  required(n) {
    return f.call(this, "required", n), this;
  }
}
function re(t = "text") {
  const e = document.createElement("input");
  return new x(e, t);
}
function ce() {
  const t = document.createElement("textarea");
  return new x(t);
}
class le extends O {
  constructor(e, n) {
    super("option"), e && (this.el.value = String(e), this.el.textContent = String(e)), n && (this.el.textContent = String(n));
  }
  value(e) {
    return f.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function he(t, e) {
  return new le(t, e);
}
const ue = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], I = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], ae = ue.reduce((t, e) => (t[e] = (n) => {
  const s = document.createElement(e), i = new a(s);
  return n && i.__children(n), i;
}, t), {}), de = I.reduce((t, e) => (t[e] = () => new O(e), t), {}), E = Object.assign(ae, de, {
  fragment: oe,
  input: re,
  textarea: ce,
  option: he
}), fe = [
  ...I,
  "input",
  "textarea",
  "option"
];
function ge(t, e) {
  return (n) => {
    const s = fe.includes(t) ? E[t]() : E[t](n);
    return s.setup(e), s;
  };
}
export {
  a as Component,
  E as El,
  ye as getInstance,
  ge as reusable
};
