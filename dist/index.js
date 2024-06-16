var T = Object.defineProperty;
var q = (e, t, n) => t in e ? T(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => (q(e, typeof t != "symbol" ? t + "" : t, n), n);
import { isRef as d, effectScope as A } from "@vue/reactivity";
import { watch as h } from "@vue-reactivity/watch";
function g(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function v(e) {
  return e == null;
}
function b(e) {
  return Array.isArray(e);
}
function wt(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
const C = {
  immediate: !0,
  deep: !0
};
function m(e, t, n) {
  const s = (i) => {
    Reflect.set(this.el, e, i);
  };
  if (d(t)) {
    const i = h(t, (o) => {
      s(n ? String(o) : o);
    }, C);
    this.onDestroy(i);
  } else
    s(n ? String(t) : t);
  return this;
}
function V(e) {
  return m.call(this, "textContent", e), this;
}
function B(e, t, n) {
  return this.onMount(() => {
    this.el.addEventListener(e, t, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(e, t);
  }), this;
}
function F(e, t) {
  return this.on("click", e, t);
}
function H(e, t) {
  if (g(e) && !v(t))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (l) => {
    for (const u of Object.keys(l))
      l[u] ? this.el.classList.add(u) : this.el.classList.remove(u);
  }, o = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (b(l)) {
        const u = l.length;
        for (let f = 0; f < u; f++) {
          const _ = l[f];
          if (_)
            typeof _ == "string" ? (this.el.classList.add(_), s[f] = _) : g(l) && i(_);
          else {
            const E = s[f];
            E && (this.el.classList.remove(E), s[f] = null);
          }
        }
      } else
        g(l) && i(l);
  }, r = (l, u) => {
    d(u) ? this.onDestroy(h(u, (f) => {
      o({ [l]: f });
    }, C)) : l && u !== !1 && o(l);
  }, a = (l) => {
    for (const [u, f] of Object.entries(l))
      r(u, f);
  };
  return g(e) ? a(e) : typeof e == "string" && r(e, t), this;
}
function N(e) {
  return m.call(this, "innerHTML", e), this;
}
function W(e) {
  return this.scopes.add(e), this.onInit(() => {
    const t = A();
    t.run(() => {
      e(this, this.componentProps);
    }), this.onDestroy(() => {
      t.stop();
    });
  }), this;
}
function z(e, t) {
  return Object.assign(this.componentProps, { [e]: t }), this;
}
function U(e) {
  for (const t of Object.keys(e))
    this.prop(t, e[t]);
  return this;
}
function X(e, ...t) {
  const n = b(e) ? e.concat(t) : [e].concat(t);
  return this.__children(n), this;
}
function S(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function I(e, t, n) {
  b(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function D(e, t) {
  (!e.value || b(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (I(e, t.value, !0), t.removeAttribute("checked"));
}
function $(e, t = {}) {
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
              o = S(o, t.transforms), e.value = o;
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
          r = S(r, t.transforms), e.value = r;
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
function G(e, t, n) {
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
        G(s, i, n) || s.appendChild(i);
      }
    else if (t instanceof k)
      p(s, t.children);
    else if (t instanceof Element)
      s.appendChild(t);
    else if (t instanceof y)
      e instanceof y && (t.parent = e), s.appendChild(t.el), t.__runOnInit(), p(t, t.children), t.__runOnMount();
    else if (Array.isArray(t)) {
      const i = t.length;
      for (let o = 0; o < i; o++) {
        const r = t[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? p(s, r, o) : r instanceof k ? p(s, r.children) : d(r) ? h(r, (a) => p(s, a, o), {
          immediate: !0,
          deep: !0
        }) : (e instanceof y && (r.parent = e), s.appendChild(r.el), r.__runOnInit(), p(r, r.children), r.__runOnMount());
      }
    } else
      d(t) && h(t, (i) => p(s, i), {
        immediate: !0,
        deep: !0
      });
}
function w(e, t, n) {
  if (g(t)) {
    Object.entries(t).forEach(([s, i]) => {
      w(e, s, i);
    });
    return;
  }
  v(n) ? e.setAttribute(t, "") : typeof n == "boolean" ? n ? e.setAttribute(t, "") : e.removeAttribute(t) : e.setAttribute(t, String(n));
}
function J(e) {
  return this.onInit(() => {
    if (d(e)) {
      const t = h(e, (n) => w(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(t);
    } else
      w(this.el, e);
  }), this;
}
function K(e, t) {
  return this.onInit(() => {
    if (d(t)) {
      const n = h(t, (s) => w(this.el, e, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      w(this.el, e, t);
  }), this;
}
function Q(e) {
  return this.attr("disabled", e), this;
}
function Z(e) {
  return m.call(this, "id", e), this;
}
function Y(e) {
  function t(n) {
    if (!(n instanceof y))
      return;
    for (const i of n.onDestroyCbs)
      i();
    const { children: s } = n;
    if (s instanceof y)
      t(s);
    else if (b(s))
      for (const i of s)
        i instanceof y && t(i);
  }
  t(e), e.__runOnDestroy(), e.el.remove();
}
function R(e) {
  return this.onMount(() => {
    const t = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? v(t) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", t) : this.el.style.setProperty("display", "none");
    };
    if (d(e)) {
      const s = h(e, n, {
        deep: !0,
        immediate: !0
      });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function tt(e, t) {
  return this.onInit(() => {
    const n = (s) => {
      const i = [];
      if (b(s)) {
        const o = s.length;
        for (let r = 0; r < o; r++) {
          const a = t(s[r], r);
          a && i.push(a);
        }
      } else if (g(s)) {
        const o = Object.keys(s), r = o.length;
        for (let a = 0; a < r; a++) {
          const l = o[a], u = t(Reflect.get(s, l), l, a);
          u && i.push(u);
        }
      } else if (typeof s == "number")
        for (let o = 0; o < s; o++) {
          const r = t(o);
          r && i.push(r);
        }
      this.el.replaceChildren(), p(this.el, i);
    };
    if (d(e)) {
      const s = h(e, (i) => {
        n(i);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function et(e, t) {
  const n = (s) => {
    if (!g(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof e == "string")
    if (d(t)) {
      const s = h(t, (i) => {
        n({ [e]: i });
      });
      this.onDestroy(s);
    } else
      t && n({ [e]: t });
  else if (d(e))
    if (t)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = h(e, n, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(s);
    }
  else if (g(e)) {
    const s = Object.keys(e);
    for (const i of s) {
      const o = Reflect.get(e, i);
      if (d(o)) {
        const r = h(o, (a) => {
          v(a) || this.el.style.setProperty(i, String(a));
        });
        this.onDestroy(r);
      } else
        v(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function nt(e) {
  const t = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, t) : this.el.remove();
    };
    if (n.el.insertBefore(t, this.el), d(e)) {
      const i = h(e, s, C);
      this.onDestroy(i);
    } else
      s(e);
  }), this;
}
function st() {
  const e = new y(this.el);
  return e.children = this.children, e.scopes = new Set(this.scopes), e;
}
const it = /* @__PURE__ */ new Set(), ot = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), rt = "abcdefghiklmnopqrstuvwxyz".split("");
function ct(e) {
  const t = e ? rt : ot;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += t[Math.floor(Math.random() * t.length)];
  return n;
}
function lt(e = !1) {
  let t = "";
  for (; t.length === 0 || it.has(t); )
    t = ct(e);
  return t;
}
class y {
  constructor(t, n = {}) {
    /**
     * Set `textContent` of the current node.
     *
     * @param text {string | () => string}
     */
    c(this, "text", V.bind(this));
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
    c(this, "on", B.bind(this));
    /**
     * Shorthand for binding `on("click")` event listener to the current node.
     */
    c(this, "click", F.bind(this));
    /**
     * Bind reactive class object to the current node.
     */
    c(this, "class", H.bind(this));
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    c(this, "setup", W.bind(this));
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param propKey {string}
     * @param propValue {any}
     */
    c(this, "prop", z.bind(this));
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    c(this, "props", U.bind(this));
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", X.bind(this));
    c(this, "model", $.bind(this));
    c(this, "attrs", J.bind(this));
    c(this, "attr", K.bind(this));
    /**
     * Dynamically bind a `disabled` attribute to the node.
     */
    c(this, "disabled", Q.bind(this));
    /**
     * Dynamically bind an `id` attribute to the node.
     */
    c(this, "id", Z.bind(this));
    /**
     * Toggle between showing or hiding the current node. The node is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", R.bind(this));
    /**
     * Add reactive styling object to the current node.
     */
    c(this, "style", et.bind(this));
    c(this, "if", nt.bind(this));
    c(this, "clone", st.bind(this));
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
    this.el = t, Object.defineProperty(this.el, "__instance", this), this.componentProps = n, this.__identifier = lt(!0);
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
      const n = A();
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
    Y(this);
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
    return tt.call(this, t, n);
  }
}
class O extends y {
  constructor(t) {
    super(document.createElement(t));
  }
  __children(t) {
    this.children = [];
  }
}
class k extends y {
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
function ht(e) {
  return new k(e);
}
class j extends O {
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
function at(e = "text") {
  const t = document.createElement("input");
  return new j(t, e);
}
function ut() {
  const e = document.createElement("textarea");
  return new j(e);
}
class dt extends O {
  constructor(t, n) {
    super("option"), t && (this.el.value = String(t), this.el.textContent = String(t)), n && (this.el.textContent = String(n));
  }
  value(t) {
    return m.call(this, "value", t), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function ft(e, t) {
  return new dt(e, t);
}
class pt extends O {
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
function mt(e) {
  const t = document.createElement("img"), n = new pt(t);
  return e && n.src(e), n;
}
const bt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], P = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], L = bt.reduce((e, t) => (e[t] = (n = [], ...s) => {
  const i = document.createElement(t), o = new y(i), r = b(n) ? n.concat(s) : [n].concat(s);
  return o.__children(r), o;
}, e), {}), M = P.reduce((e, t) => (e[t] = () => new O(t), e), {}), x = Object.assign(L, M, {
  fragment: ht,
  input: at,
  textarea: ut,
  option: ft,
  img: mt
}), yt = [
  ...P,
  "input",
  "textarea",
  "option"
];
function Ot(e, t) {
  return (n) => {
    const s = yt.includes(e) ? x[e]() : x[e](n);
    return s.setup(t), s;
  };
}
const {
  a: kt,
  abbr: Ct,
  address: Et,
  applet: St,
  article: Dt,
  aside: xt,
  audio: At,
  b: It,
  basefont: jt,
  bdi: Pt,
  bdo: Lt,
  bgsound: Mt,
  blink: Tt,
  blockquote: qt,
  body: Vt,
  button: Bt,
  canvas: Ft,
  caption: Ht,
  cite: Nt,
  code: Wt,
  colgroup: zt,
  content: Ut,
  data: Xt,
  datalist: $t,
  dd: Gt,
  decorator: Jt,
  del: Kt,
  details: Qt,
  dfn: Zt,
  div: Yt,
  dl: Rt,
  dt: te,
  element: ee,
  em: ne,
  fieldset: se,
  figcaption: ie,
  figure: oe,
  footer: re,
  form: ce,
  h1: le,
  h2: he,
  h3: ae,
  h4: ue,
  h5: de,
  h6: fe,
  head: pe,
  header: me,
  hgroup: be,
  html: ye,
  i: ge,
  iframe: ve,
  ins: _e,
  isindex: we,
  kbd: Oe,
  keygen: ke,
  label: Ce,
  legend: Ee,
  li: Se,
  listing: De,
  main: xe,
  map: Ae,
  mark: Ie,
  menu: je,
  meter: Pe,
  nav: Le,
  noscript: Me,
  object: Te,
  ol: qe,
  optgroup: Ve,
  output: Be,
  p: Fe,
  picture: He,
  pre: Ne,
  progress: We,
  q: ze,
  rp: Ue,
  rt: Xe,
  ruby: $e,
  s: Ge,
  samp: Je,
  script: Ke,
  section: Qe,
  select: Ze,
  shadow: Ye,
  small: Re,
  spacer: tn,
  span: en,
  strong: nn,
  style: sn,
  sub: on,
  summary: rn,
  sup: cn,
  table: ln,
  tbody: hn,
  td: an,
  template: un,
  tfoot: dn,
  th: fn,
  thead: pn,
  time: mn,
  title: bn,
  tr: yn,
  u: gn,
  ul: vn,
  video: _n
} = L, {
  area: wn,
  base: On,
  br: kn,
  col: Cn,
  embed: En,
  hr: Sn,
  link: Dn,
  meta: xn,
  source: An,
  track: In,
  wbr: jn
} = M;
export {
  y as Component,
  kt as a,
  Ct as abbr,
  Et as address,
  St as applet,
  wn as area,
  Dt as article,
  xt as aside,
  At as audio,
  It as b,
  On as base,
  jt as basefont,
  Pt as bdi,
  Lt as bdo,
  Mt as bgsound,
  Tt as blink,
  qt as blockquote,
  Vt as body,
  kn as br,
  Bt as button,
  Ft as canvas,
  Ht as caption,
  Nt as cite,
  Wt as code,
  Cn as col,
  zt as colgroup,
  Ut as content,
  lt as createId,
  Xt as data,
  $t as datalist,
  Gt as dd,
  Jt as decorator,
  Kt as del,
  Qt as details,
  Zt as dfn,
  Yt as div,
  Rt as dl,
  te as dt,
  ee as element,
  ne as em,
  En as embed,
  se as fieldset,
  ie as figcaption,
  oe as figure,
  re as footer,
  ce as form,
  ht as fragment,
  wt as getInstance,
  le as h1,
  he as h2,
  ae as h3,
  ue as h4,
  de as h5,
  fe as h6,
  pe as head,
  me as header,
  be as hgroup,
  Sn as hr,
  ye as html,
  ge as i,
  ve as iframe,
  mt as img,
  at as input,
  _e as ins,
  we as isindex,
  Oe as kbd,
  ke as keygen,
  Ce as label,
  Ee as legend,
  Se as li,
  Dn as link,
  De as listing,
  xe as main,
  Ae as map,
  Ie as mark,
  je as menu,
  xn as meta,
  Pe as meter,
  Le as nav,
  Me as noscript,
  Te as object,
  qe as ol,
  Ve as optgroup,
  ft as option,
  Be as output,
  Fe as p,
  He as picture,
  Ne as pre,
  We as progress,
  ze as q,
  Ot as reusable,
  Ue as rp,
  Xe as rt,
  $e as ruby,
  Ge as s,
  Je as samp,
  Ke as script,
  Qe as section,
  Ze as select,
  Ye as shadow,
  Re as small,
  An as source,
  tn as spacer,
  en as span,
  nn as strong,
  sn as style,
  on as sub,
  rn as summary,
  cn as sup,
  ln as table,
  hn as tbody,
  an as td,
  un as template,
  ut as textarea,
  dn as tfoot,
  fn as th,
  pn as thead,
  mn as time,
  bn as title,
  yn as tr,
  In as track,
  gn as u,
  vn as ul,
  _n as video,
  jn as wbr
};
