var j = Object.defineProperty;
var A = (e, t, n) => t in e ? j(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var c = (e, t, n) => (A(e, typeof t != "symbol" ? t + "" : t, n), n);
import { watch as h } from "@vue-reactivity/watch";
import { isRef as y, effectScope as I, computed as L } from "@vue/reactivity";
function g(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function v(e) {
  return e == null;
}
function b(e) {
  return Object.prototype.toString.call(e) == "[object Function]";
}
function m(e) {
  return Array.isArray(e);
}
function de(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
function p(e, t, n) {
  const s = (o) => {
    Reflect.set(this.el, e, o);
  };
  if (b(t) || y(t)) {
    const o = h(t, (i) => {
      s(n ? String(i) : i);
    }, {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(o);
  } else
    s(n ? String(t) : t);
  return this;
}
function P(e) {
  return p.call(this, "textContent", e), this;
}
function M(e, t, n) {
  return this.onMount(() => {
    this.el.addEventListener(e, t, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(e, t);
  }), this;
}
function T(e, t) {
  return this.on("click", e, t);
}
function N(e) {
  let t = "";
  const n = /* @__PURE__ */ Object.create(null), s = (i) => {
    for (const r of Object.keys(i))
      i[r] ? this.el.classList.add(r) : this.el.classList.remove(r);
  }, o = (i) => {
    if (i)
      if (typeof i == "string")
        t && this.el.classList.remove(t), t = i, this.el.classList.add(t);
      else if (m(i)) {
        const r = i.length;
        for (let l = 0; l < r; l++) {
          const u = i[l];
          if (u)
            typeof u == "string" ? (this.el.classList.add(u), n[l] = u) : g(i) && s(u);
          else {
            const d = n[l];
            d && (this.el.classList.remove(d), n[l] = null);
          }
        }
      } else
        g(i) && s(i);
  };
  if (b(e)) {
    const i = h(e, (r) => o(r), {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(i);
  } else
    o(e);
  return this;
}
function q(e) {
  return p.call(this, "innerHTML", e), this;
}
function F(e) {
  return this.onInit(() => {
    const t = I();
    t.run(() => {
      e(this, this.componentProps);
    }), this.onDestroy(() => {
      t.stop();
    });
  }), this;
}
function V(e, t) {
  return Object.assign(this.componentProps, { [e]: t }), this;
}
function B(e) {
  for (const t of Object.keys(e))
    this.prop(t, e[t]);
  return this;
}
function H(e) {
  return this.__children(e), this;
}
function k(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function x(e, t, n) {
  m(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function D(e, t) {
  (!e.value || m(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (x(e, t.value, !0), t.removeAttribute("checked"));
}
function z(e, t = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(e, (o) => {
              o === n.value || m(o) && o.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { checked: i, value: r } = o.target;
              x(e, r, i);
            }, t.eventOptions), D(e, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(e, (o) => {
              n.checked = o === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { value: i, checked: r } = o.target;
              r && (e.value = i);
            }, t.eventOptions), D(e, n);
            break;
          }
          default: {
            const n = this.el, s = h(e, (o) => {
              n.value = String(o);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(t.lazy ? "change" : "input", (o) => {
              let i = o.target.value;
              i = k(i, t.transforms), e.value = i;
            }, t.eventOptions), n.value = String(e.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = h(e, (i) => {
          e.value = i;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (i) => {
          let r = i.target.value;
          r = k(r, t.transforms), e.value = r;
        }, t.eventOptions);
        const o = m(e.value) ? e.value[0] : e.value;
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
        const n = this.el, s = h(e, (i) => {
          n.open = !!i;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          e.value = n.open;
        }, t.eventOptions);
        const o = m(e.value) ? e.value[0] : e.value;
        n.open = !!o;
        break;
      }
    }
  }), this;
}
function U(e, t, n) {
  const s = Array.from(e.childNodes).at(n);
  return s ? (e.replaceChild(t, s), !0) : !1;
}
function f(e, t, n) {
  const s = e instanceof Element ? e : e.el;
  if (t)
    if (typeof t == "string" || typeof t == "number")
      if (v(n))
        s.innerHTML = String(t);
      else {
        const o = document.createTextNode(String(t));
        U(s, o, n) || s.appendChild(o);
      }
    else if (t instanceof O)
      f(s, t.children);
    else if (t instanceof Element)
      s.appendChild(t);
    else if (t instanceof a)
      e instanceof a && (t.parent = e), s.appendChild(t.el), t.__runOnInit(), f(t, t.children), t.__runOnMount();
    else if (Array.isArray(t)) {
      const o = t.length;
      for (let i = 0; i < o; i++) {
        const r = t[i];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? f(s, r, i) : r instanceof O ? f(s, r.children) : b(r) ? h(r, (l) => f(s, l, i), {
          immediate: !0,
          deep: !0
        }) : (e instanceof a && (r.parent = e), s.appendChild(r.el), r.__runOnInit(), f(r, r.children), r.__runOnMount());
      }
    } else
      b(t) && h(t, (o) => f(s, o), {
        immediate: !0,
        deep: !0
      });
}
function _(e, t, n) {
  if (g(t)) {
    Object.entries(t).forEach(([s, o]) => {
      _(e, s, o);
    });
    return;
  }
  v(n) ? e.setAttribute(t, "") : typeof n == "boolean" ? n ? e.setAttribute(t, "") : e.removeAttribute(t) : e.setAttribute(t, String(n));
}
function W(e) {
  return this.onInit(() => {
    if (b(e)) {
      const t = h(e, (n) => _(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(t);
    } else
      _(this.el, e);
  }), this;
}
function X(e, t) {
  return this.onInit(() => {
    if (b(t) || y(t)) {
      const n = h(t, (s) => _(this.el, e, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      _(this.el, e, t);
  }), this;
}
function G(e) {
  return this.attr("disabled", e), this;
}
function J(e) {
  return p.call(this, "id", e), this;
}
function K(e) {
  function t(n) {
    if (!(n instanceof a))
      return;
    for (const o of n.onDestroyCbs)
      o();
    const { children: s } = n;
    if (s instanceof a)
      t(s);
    else if (m(s))
      for (const o of s)
        o instanceof a && t(o);
  }
  t(e), e.__runOnDestroy(), e.el.remove();
}
function Q(e) {
  return this.onMount(() => {
    const t = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? v(t) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", t) : this.el.style.setProperty("display", "none");
    };
    if (b(e) || y(e)) {
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
  let n;
  const s = () => {
    const i = this.el.cloneNode(!0);
    return new a(i);
  }, o = (i) => {
    const r = [];
    if (m(i)) {
      const l = i.length;
      for (let u = 0; u < l; u++) {
        const d = s();
        t(d, { value: i[u], index: u }), r.push(d);
      }
    } else if (g(i)) {
      const l = Object.keys(i), u = l.length;
      for (let d = 0; d < u; d++) {
        const E = l[d], C = s();
        t(C, {
          value: Reflect.get(i, E),
          key: E,
          index: d
        }), r.push(C);
      }
    } else if (typeof i == "number")
      for (let l = 0; l < i; l++) {
        const u = s();
        t(u, l), r.push(u);
      }
    n == null || n.replaceChildren(), n && f(n, r);
  };
  return this.onInit(() => {
    if (n = this.el.parentElement, y(e)) {
      const i = h(e, (r) => {
        o(r);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(i);
    } else
      o(e);
  }), this;
}
function Z(e, t) {
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
    if (y(t)) {
      const s = h(t, (o) => {
        n({ [e]: o });
      });
      this.onDestroy(s);
    } else
      t && n({ [e]: t });
  else if (y(e))
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
    for (const o of s) {
      const i = Reflect.get(e, o);
      if (y(i)) {
        const r = h(i, (l) => {
          v(l) || this.el.style.setProperty(o, String(l));
        });
        this.onDestroy(r);
      } else
        v(i) || this.el.style.setProperty(o, String(i));
    }
  }
  return this;
}
function $(e) {
  const t = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      o ? n.el.insertBefore(this.el, t) : this.el.remove();
    };
    if (n.el.insertBefore(t, this.el), b(e)) {
      const o = L(e), i = h(o, s, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(i);
    } else
      s(e);
  }), this;
}
function R() {
  const e = new a(this.el);
  return e.children = this.children, e.el = this.el.cloneNode(!0), e;
}
class a {
  // __isElse?: boolean
  // __isElseIf?: ConditionalExpr
  constructor(t, n = {}) {
    /**
     * Set `textContent` of the current node.
     *
     * @param text {string | () => string}
     */
    c(this, "text", P.bind(this));
    /**
     * Set `innerHTML` of the current node.
     */
    c(this, "html", q.bind(this));
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
    c(this, "class", N.bind(this));
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
    c(this, "attrs", W.bind(this));
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
    c(this, "style", Z.bind(this));
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
    this.el = t, Object.defineProperty(this.el, "__instance", this), this.componentProps = n;
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
    n.appendChild(this.el), this.__runOnInit(), f(this, this.children), this.__runOnMount();
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
  for(t, n) {
    return Y.call(this, t, n);
  }
}
class w extends a {
  constructor(t) {
    super(document.createElement(t));
  }
  __children(t) {
    this.children = [];
  }
}
class O extends a {
  constructor(t = []) {
    super(document.createElement("template")), this.children = t;
  }
  mount(t) {
    const n = document.querySelector(t);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), f(n, this.children), this.__runOnMount();
  }
}
function ee(e) {
  return new O(e);
}
class S extends w {
  constructor(n, s) {
    super();
    c(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  value(n) {
    return p.call(this, "value", n), this;
  }
  placeholder(n) {
    return p.call(this, "placeholder", n), this;
  }
  name(n) {
    return p.call(this, "name", n), this;
  }
  required(n) {
    return p.call(this, "required", n), this;
  }
}
function te(e = "text") {
  const t = document.createElement("input");
  return new S(t, e);
}
function ne() {
  const e = document.createElement("textarea");
  return new S(e);
}
class se extends w {
  constructor(t, n) {
    super("option"), t && (this.el.value = String(t), this.el.textContent = String(t)), n && (this.el.textContent = String(n));
  }
  value(t) {
    return p.call(this, "value", t), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function ie(e, t) {
  return new se(e, t);
}
const oe = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], re = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], ce = oe.reduce((e, t) => (e[t] = (n) => {
  const s = document.createElement(t), o = new a(s);
  return n && o.__children(n), o;
}, e), {}), le = re.reduce((e, t) => (e[t] = () => new w(t), e), {}), fe = Object.assign(ce, le, {
  fragment: ee,
  input: te,
  textarea: ne,
  option: ie
});
export {
  a as Component,
  fe as El,
  de as getInstance
};
