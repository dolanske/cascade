var L = Object.defineProperty;
var M = (e, t, n) => t in e ? L(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => (M(e, typeof t != "symbol" ? t + "" : t, n), n);
import { isRef as f, effectScope as I, ref as T } from "@vue/reactivity";
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
function Ot(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
const S = {
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
    }, S);
    this.onDestroy(i);
  } else
    s(n ? String(t) : t);
  return this;
}
function q(e) {
  return g.call(this, "textContent", e), this;
}
function V(e, t, n) {
  return this.onMount(() => {
    this.el.addEventListener(e, t, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(e, t);
  }), this;
}
function B(e, t) {
  return this.on("click", e, t);
}
function F(e, t) {
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
            const k = s[d];
            k && (this.el.classList.remove(k), s[d] = null);
          }
        }
      } else
        y(l) && i(l);
  }, r = (l, a) => {
    f(a) ? this.onDestroy(h(a, (d) => {
      o({ [l]: d });
    }, S)) : l && a && o(l);
  }, u = (l) => {
    for (const [a, d] of Object.entries(l))
      r(a, d);
  };
  return y(e) ? u(e) : typeof e == "string" && r(e, t), this;
}
function H(e) {
  return g.call(this, "innerHTML", e), this;
}
function N(e) {
  return this.scopes.add(e), this.onInit(() => {
    const t = I();
    t.run(() => {
      e(this, this.componentProps);
    }), this.onDestroy(() => {
      t.stop();
    });
  }), this;
}
function W(e, t) {
  return Object.assign(this.componentProps, { [e]: t }), this;
}
function z(e) {
  for (const t of Object.keys(e))
    this.prop(t, e[t]);
  return this;
}
function U(e, ...t) {
  const n = b(e) ? e.concat(t) : [e].concat(t);
  return this.__children(n), this;
}
function D(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function j(e, t, n) {
  b(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function A(e, t) {
  (!e.value || b(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (j(e, t.value, !0), t.removeAttribute("checked"));
}
function X(e, t = {}) {
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
              j(e, r, o);
            }, t.eventOptions), A(e, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(e, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: r } = i.target;
              r && (e.value = o);
            }, t.eventOptions), A(e, n);
            break;
          }
          default: {
            const n = this.el, s = h(e, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(t.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = D(o, t.transforms), e.value = o;
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
          r = D(r, t.transforms), e.value = r;
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
function J(e) {
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
function K(e, t) {
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
function Q(e) {
  return this.attr("disabled", e), this;
}
function Z(e) {
  return g.call(this, "id", e), this;
}
function $(e) {
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
function Y(e) {
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
function R(e, t) {
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
function tt(e, t) {
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
function et(e) {
  const t = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i === !1 || v(i) ? this.el.remove() : n.el.insertBefore(this.el, t);
    };
    if (n.el.insertBefore(t, this.el), f(e)) {
      const i = h(e, s, S);
      this.onDestroy(i);
    } else
      s(e);
  }), this;
}
function nt() {
  const e = new m(this.el);
  return e.children = this.children, e.scopes = new Set(this.scopes), e;
}
const st = /* @__PURE__ */ new Set(), it = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), ot = "abcdefghiklmnopqrstuvwxyz".split("");
function rt(e) {
  const t = e ? ot : it;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += t[Math.floor(Math.random() * t.length)];
  return n;
}
function ct(e = !1) {
  let t = "";
  for (; t.length === 0 || st.has(t); )
    t = rt(e);
  return t;
}
class m {
  constructor(t, n = {}) {
    /**
     * Set `textContent` of the current node.
     *
     * @param text {string | () => string}
     */
    c(this, "text", q.bind(this));
    /**
     * Set `innerHTML` of the current node.
     */
    c(this, "html", H.bind(this));
    /**
     * Add an event listener to the current node.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", V.bind(this));
    /**
     * Shorthand for binding `on("click")` event listener to the current node.
     */
    c(this, "click", B.bind(this));
    /**
     * Bind reactive class object to the current node.
     */
    c(this, "class", F.bind(this));
    /**
     * Create a component scope, in which you can declare reactive variables. When
     * the component is removed from the DOM, all of the scope properties get
     * removed. This is the best way to declare reusable components.
     */
    c(this, "setup", N.bind(this));
    /**
     * Pass a single prop value into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     *
     * @param propKey {string}
     * @param propValue {any}
     */
    c(this, "prop", W.bind(this));
    /**
     * Pass an object of props into the component. You can also pass in refs, but
     * make sure to use the `.value` in the components, as these refs are directly
     * passed through.
     */
    c(this, "props", z.bind(this));
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", U.bind(this));
    c(this, "model", X.bind(this));
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
    c(this, "show", Y.bind(this));
    /**
     * Add reactive styling object to the current node.
     */
    c(this, "style", tt.bind(this));
    c(this, "if", et.bind(this));
    c(this, "clone", nt.bind(this));
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
    this.el = t, Object.defineProperty(this.el, "__instance", this), this.componentProps = n, this.__identifier = ct(!0);
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
      const n = I();
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
    $(this);
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
    return R.call(this, t, n);
  }
}
class E extends m {
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
function lt(e) {
  return new O(e);
}
class x extends E {
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
function ht(e = "text") {
  const t = document.createElement("input");
  return new x(t, e);
}
function ut() {
  const e = document.createElement("textarea");
  return new x(e);
}
class at extends E {
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
  return new at(e, t);
}
const dt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], P = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], pt = dt.reduce((e, t) => (e[t] = (n) => {
  const s = document.createElement(t), i = new m(s);
  return n && i.__children(n), i;
}, e), {}), mt = P.reduce((e, t) => (e[t] = () => new E(t), e), {}), C = Object.assign(pt, mt, {
  fragment: lt,
  input: ht,
  textarea: ut,
  option: ft
}), bt = [
  ...P,
  "input",
  "textarea",
  "option"
];
function yt(e, t) {
  return (n) => {
    const s = bt.includes(e) ? C[e]() : C[e](n);
    return s.setup(t), s;
  };
}
const gt = yt("div", (e) => {
  const t = T(!1);
  e.text("henlo"), e.class({ pink: t }, !1), e.nest([
    "hello",
    C.button("change").click(() => t.value = !t.value)
  ]);
});
gt().mount("#app");
export {
  C as $,
  m as Component,
  Ot as getInstance,
  yt as reusable
};
