var T = Object.defineProperty;
var q = (e, t, n) => t in e ? T(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => (q(e, typeof t != "symbol" ? t + "" : t, n), n);
import { isRef as d, effectScope as A } from "@vue/reactivity";
import { watch as h } from "@vue-reactivity/watch";
function y(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function v(e) {
  return e == null;
}
function m(e) {
  return Array.isArray(e);
}
function vt(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
const k = {
  immediate: !0,
  deep: !0
};
function g(e, t, n) {
  const s = (i) => {
    Reflect.set(this.el, e, i);
  };
  if (d(t)) {
    const i = h(t, (o) => {
      s(n ? String(o) : o);
    }, k);
    this.onDestroy(i);
  } else
    s(n ? String(t) : t);
  return this;
}
function V(e) {
  return g.call(this, "textContent", e), this;
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
  if (y(e) && !v(t))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (l) => {
    for (const u of Object.keys(l))
      l[u] ? this.el.classList.add(u) : this.el.classList.remove(u);
  }, o = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (m(l)) {
        const u = l.length;
        for (let f = 0; f < u; f++) {
          const _ = l[f];
          if (_)
            typeof _ == "string" ? (this.el.classList.add(_), s[f] = _) : y(l) && i(_);
          else {
            const S = s[f];
            S && (this.el.classList.remove(S), s[f] = null);
          }
        }
      } else
        y(l) && i(l);
  }, r = (l, u) => {
    d(u) ? this.onDestroy(h(u, (f) => {
      o({ [l]: f });
    }, k)) : l && u !== !1 && o(l);
  }, a = (l) => {
    for (const [u, f] of Object.entries(l))
      r(u, f);
  };
  return y(e) ? a(e) : typeof e == "string" && r(e, t), this;
}
function N(e) {
  return g.call(this, "innerHTML", e), this;
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
  const n = m(e) ? e.concat(t) : [e].concat(t);
  return this.__children(n), this;
}
function E(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function j(e, t, n) {
  m(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function D(e, t) {
  (!e.value || m(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (j(e, t.value, !0), t.removeAttribute("checked"));
}
function $(e, t = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(e, (i) => {
              i === n.value || m(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: r } = i.target;
              j(e, r, o);
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
              o = E(o, t.transforms), e.value = o;
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
          r = E(r, t.transforms), e.value = r;
        }, t.eventOptions);
        const i = m(e.value) ? e.value[0] : e.value;
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
        const i = m(e.value) ? e.value[0] : e.value;
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
    else if (t instanceof O)
      p(s, t.children);
    else if (t instanceof Element)
      s.appendChild(t);
    else if (t instanceof b)
      e instanceof b && (t.parent = e), s.appendChild(t.el), t.__runOnInit(), p(t, t.children), t.__runOnMount();
    else if (Array.isArray(t)) {
      const i = t.length;
      for (let o = 0; o < i; o++) {
        const r = t[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? p(s, r, o) : r instanceof O ? p(s, r.children) : d(r) ? h(r, (a) => p(s, a, o), {
          immediate: !0,
          deep: !0
        }) : (e instanceof b && (r.parent = e), s.appendChild(r.el), r.__runOnInit(), p(r, r.children), r.__runOnMount());
      }
    } else
      d(t) && h(t, (i) => p(s, i), {
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
  return g.call(this, "id", e), this;
}
function Y(e) {
  function t(n) {
    if (!(n instanceof b))
      return;
    for (const i of n.onDestroyCbs)
      i();
    const { children: s } = n;
    if (s instanceof b)
      t(s);
    else if (m(s))
      for (const i of s)
        i instanceof b && t(i);
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
      if (m(s)) {
        const o = s.length;
        for (let r = 0; r < o; r++) {
          const a = t(s[r], r);
          a && i.push(a);
        }
      } else if (y(s)) {
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
    if (!y(s)) {
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
  else if (y(e)) {
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
      const i = h(e, s, k);
      this.onDestroy(i);
    } else
      s(e);
  }), this;
}
function st() {
  const e = new b(this.el);
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
class b {
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
class C extends b {
  constructor(t) {
    super(document.createElement(t));
  }
  __children(t) {
    this.children = [];
  }
}
class O extends b {
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
  return new O(e);
}
class I extends C {
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
function at(e = "text") {
  const t = document.createElement("input");
  return new I(t, e);
}
function ut() {
  const e = document.createElement("textarea");
  return new I(e);
}
class dt extends C {
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
function ft(e, t) {
  return new dt(e, t);
}
const pt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], P = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], L = pt.reduce((e, t) => (e[t] = (n = [], ...s) => {
  const i = document.createElement(t), o = new b(i), r = m(n) ? n.concat(s) : [n].concat(s);
  return o.__children(r), o;
}, e), {}), M = P.reduce((e, t) => (e[t] = () => new C(t), e), {}), x = Object.assign(L, M, {
  fragment: ht,
  input: at,
  textarea: ut,
  option: ft
}), mt = [
  ...P,
  "input",
  "textarea",
  "option"
];
function _t(e, t) {
  return (n) => {
    const s = mt.includes(e) ? x[e]() : x[e](n);
    return s.setup(t), s;
  };
}
const {
  a: wt,
  abbr: Ot,
  address: kt,
  applet: Ct,
  article: St,
  aside: Et,
  audio: Dt,
  b: xt,
  basefont: At,
  bdi: jt,
  bdo: It,
  bgsound: Pt,
  blink: Lt,
  blockquote: Mt,
  body: Tt,
  button: qt,
  canvas: Vt,
  caption: Bt,
  cite: Ft,
  code: Ht,
  colgroup: Nt,
  content: Wt,
  data: zt,
  datalist: Ut,
  dd: Xt,
  decorator: $t,
  del: Gt,
  details: Jt,
  dfn: Kt,
  div: Qt,
  dl: Zt,
  dt: Yt,
  element: Rt,
  em: te,
  fieldset: ee,
  figcaption: ne,
  figure: se,
  footer: ie,
  form: oe,
  h1: re,
  h2: ce,
  h3: le,
  h4: he,
  h5: ae,
  h6: ue,
  head: de,
  header: fe,
  hgroup: pe,
  html: me,
  i: be,
  iframe: ye,
  ins: ge,
  isindex: ve,
  kbd: _e,
  keygen: we,
  label: Oe,
  legend: ke,
  li: Ce,
  listing: Se,
  main: Ee,
  map: De,
  mark: xe,
  menu: Ae,
  meter: je,
  nav: Ie,
  noscript: Pe,
  object: Le,
  ol: Me,
  optgroup: Te,
  output: qe,
  p: Ve,
  picture: Be,
  pre: Fe,
  progress: He,
  q: Ne,
  rp: We,
  rt: ze,
  ruby: Ue,
  s: Xe,
  samp: $e,
  script: Ge,
  section: Je,
  select: Ke,
  shadow: Qe,
  small: Ze,
  spacer: Ye,
  span: Re,
  strong: tn,
  style: en,
  sub: nn,
  summary: sn,
  sup: on,
  table: rn,
  tbody: cn,
  td: ln,
  template: hn,
  tfoot: an,
  th: un,
  thead: dn,
  time: fn,
  title: pn,
  tr: mn,
  u: bn,
  ul: yn,
  video: gn
} = L, {
  area: vn,
  base: _n,
  br: wn,
  col: On,
  embed: kn,
  hr: Cn,
  img: Sn,
  link: En,
  meta: Dn,
  source: xn,
  track: An,
  wbr: jn
} = M;
export {
  b as Component,
  wt as a,
  Ot as abbr,
  kt as address,
  Ct as applet,
  vn as area,
  St as article,
  Et as aside,
  Dt as audio,
  xt as b,
  _n as base,
  At as basefont,
  jt as bdi,
  It as bdo,
  Pt as bgsound,
  Lt as blink,
  Mt as blockquote,
  Tt as body,
  wn as br,
  qt as button,
  Vt as canvas,
  Bt as caption,
  Ft as cite,
  Ht as code,
  On as col,
  Nt as colgroup,
  Wt as content,
  lt as createId,
  zt as data,
  Ut as datalist,
  Xt as dd,
  $t as decorator,
  Gt as del,
  Jt as details,
  Kt as dfn,
  Qt as div,
  Zt as dl,
  Yt as dt,
  Rt as element,
  te as em,
  kn as embed,
  ee as fieldset,
  ne as figcaption,
  se as figure,
  ie as footer,
  oe as form,
  ht as fragment,
  vt as getInstance,
  re as h1,
  ce as h2,
  le as h3,
  he as h4,
  ae as h5,
  ue as h6,
  de as head,
  fe as header,
  pe as hgroup,
  Cn as hr,
  me as html,
  be as i,
  ye as iframe,
  Sn as img,
  at as input,
  ge as ins,
  ve as isindex,
  _e as kbd,
  we as keygen,
  Oe as label,
  ke as legend,
  Ce as li,
  En as link,
  Se as listing,
  Ee as main,
  De as map,
  xe as mark,
  Ae as menu,
  Dn as meta,
  je as meter,
  Ie as nav,
  Pe as noscript,
  Le as object,
  Me as ol,
  Te as optgroup,
  ft as option,
  qe as output,
  Ve as p,
  Be as picture,
  Fe as pre,
  He as progress,
  Ne as q,
  _t as reusable,
  We as rp,
  ze as rt,
  Ue as ruby,
  Xe as s,
  $e as samp,
  Ge as script,
  Je as section,
  Ke as select,
  Qe as shadow,
  Ze as small,
  xn as source,
  Ye as spacer,
  Re as span,
  tn as strong,
  en as style,
  nn as sub,
  sn as summary,
  on as sup,
  rn as table,
  cn as tbody,
  ln as td,
  hn as template,
  ut as textarea,
  an as tfoot,
  un as th,
  dn as thead,
  fn as time,
  pn as title,
  mn as tr,
  An as track,
  bn as u,
  yn as ul,
  gn as video,
  jn as wbr
};
