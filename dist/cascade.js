var j = Object.defineProperty;
var A = (t, e, n) => e in t ? j(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => (A(t, typeof e != "symbol" ? e + "" : e, n), n);
import { watch as h } from "@vue-reactivity/watch";
import { isRef as y, effectScope as I, computed as L } from "@vue/reactivity";
function g(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function v(t) {
  return t == null;
}
function b(t) {
  return Object.prototype.toString.call(t) == "[object Function]";
}
function m(t) {
  return Array.isArray(t);
}
function ae(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
function p(t, e, n) {
  const s = (o) => {
    Reflect.set(this.el, t, o);
  };
  if (b(e) || y(e)) {
    const o = h(e, (i) => {
      s(n ? String(i) : i);
    }, {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(o);
  } else
    s(n ? String(e) : e);
  return this;
}
function P(t) {
  return p.call(this, "textContent", t), this;
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
function N(t) {
  let e = "";
  const n = /* @__PURE__ */ Object.create(null), s = (i) => {
    for (const r of Object.keys(i))
      i[r] ? this.el.classList.add(r) : this.el.classList.remove(r);
  }, o = (i) => {
    if (i)
      if (typeof i == "string")
        e && this.el.classList.remove(e), e = i, this.el.classList.add(e);
      else if (m(i)) {
        const r = i.length;
        for (let l = 0; l < r; l++) {
          const u = i[l];
          if (u)
            typeof u == "string" ? (this.el.classList.add(u), n[l] = u) : g(i) && s(u);
          else {
            const a = n[l];
            a && (this.el.classList.remove(a), n[l] = null);
          }
        }
      } else
        g(i) && s(i);
  };
  if (b(t)) {
    const i = h(t, (r) => o(r), {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(i);
  } else
    o(t);
  return this;
}
function q(t) {
  return p.call(this, "innerHTML", t), this;
}
function F(t) {
  const e = I();
  return this.onInit(() => {
    e.run(() => {
      t(this, this.componentProps);
    });
  }), this.onDestroy(() => {
    e.stop();
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
function k(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function x(t, e, n) {
  m(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function D(t, e) {
  (!t.value || m(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (x(t, e.value, !0), e.removeAttribute("checked"));
}
function z(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(t, (o) => {
              o === n.value || m(o) && o.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { checked: i, value: r } = o.target;
              x(t, r, i);
            }, e.eventOptions), D(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(t, (o) => {
              n.checked = o === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { value: i, checked: r } = o.target;
              r && (t.value = i);
            }, e.eventOptions), D(t, n);
            break;
          }
          default: {
            const n = this.el, s = h(t, (o) => {
              n.value = String(o);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (o) => {
              let i = o.target.value;
              i = k(i, e.transforms), t.value = i;
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
          r = k(r, e.transforms), t.value = r;
        }, e.eventOptions);
        const o = m(t.value) ? t.value[0] : t.value;
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
        const o = m(t.value) ? t.value[0] : t.value;
        n.open = !!o;
        break;
      }
    }
  }), this;
}
function U(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function d(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e)
    if (typeof e == "string" || typeof e == "number")
      if (v(n))
        s.innerHTML = String(e);
      else {
        const o = document.createTextNode(String(e));
        U(s, o, n) || s.appendChild(o);
      }
    else if (e instanceof O)
      d(s, e.children);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof f)
      t instanceof f && (e.parent = t), s.appendChild(e.el), e.__runOnInit(), d(e, e.children), e.__runOnMount();
    else if (Array.isArray(e)) {
      const o = e.length;
      for (let i = 0; i < o; i++) {
        const r = e[i];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? d(s, r, i) : r instanceof O ? d(s, r.children) : b(r) ? h(r, (l) => d(s, l, i), {
          immediate: !0,
          deep: !0
        }) : (t instanceof f && (r.parent = t), s.appendChild(r.el), r.__runOnInit(), d(r, r.children), r.__runOnMount());
      }
    } else
      b(e) && h(e, (o) => d(s, o), {
        immediate: !0,
        deep: !0
      });
}
function _(t, e, n) {
  if (g(e)) {
    Object.entries(e).forEach(([s, o]) => {
      _(t, s, o);
    });
    return;
  }
  v(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function W(t) {
  return this.onInit(() => {
    if (b(t)) {
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
    if (b(e) || y(e)) {
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
  return p.call(this, "id", t), this;
}
function K(t) {
  function e(n) {
    if (!(n instanceof f))
      return;
    for (const o of n.onDestroyCbs)
      o();
    const { children: s } = n;
    if (s instanceof f)
      e(s);
    else if (m(s))
      for (const o of s)
        o instanceof f && e(o);
  }
  e(t), t.__runOnDestroy(), t.el.remove();
}
function Q(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? v(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (b(t) || y(t)) {
      const s = h(t, n, {
        deep: !0,
        immediate: !0
      });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Y(t, e) {
  let n;
  const s = () => {
    const i = this.el.cloneNode(!0);
    return new f(i);
  }, o = (i) => {
    const r = [];
    if (m(i)) {
      const l = i.length;
      for (let u = 0; u < l; u++) {
        const a = s();
        e(a, { value: i[u], index: u }), r.push(a);
      }
    } else if (g(i)) {
      const l = Object.keys(i), u = l.length;
      for (let a = 0; a < u; a++) {
        const w = l[a], C = s();
        e(C, {
          value: Reflect.get(i, w),
          key: w,
          index: a
        }), r.push(C);
      }
    } else if (typeof i == "number")
      for (let l = 0; l < i; l++) {
        const u = s();
        e(u, l), r.push(u);
      }
    n == null || n.replaceChildren(), n && d(n, r);
  };
  return this.onInit(() => {
    if (n = this.el.parentElement, y(t)) {
      const i = h(t, (r) => {
        o(r);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(i);
    } else
      o(t);
  }), this;
}
function Z(t, e) {
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
    if (y(e)) {
      const s = h(e, (o) => {
        n({ [t]: o });
      });
      this.onDestroy(s);
    } else
      e && n({ [t]: e });
  else if (y(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = h(t, n, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(s);
    }
  else if (g(t)) {
    const s = Object.keys(t);
    for (const o of s) {
      const i = Reflect.get(t, o);
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
function $(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      o ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), b(t)) {
      const o = L(t), i = h(o, s, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(i);
    } else
      s(t);
  }), this;
}
class f {
  // __isElse?: boolean
  // __isElseIf?: ConditionalExpr
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
    // if = if_impl.bind(this)
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
    // else = else_impl.bind(this)
    // elseIf = elseif_impl.bind(this)
    c(this, "el");
    c(this, "children", []);
    c(this, "componentProps");
    c(this, "parent", null);
    // Lifecycle
    c(this, "onMountCbs", []);
    c(this, "onDestroyCbs", []);
    c(this, "onInitCbs", []);
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.componentProps = n;
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
    n.appendChild(this.el), this.__runOnInit(), d(this, this.children), this.__runOnMount();
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
    return Y.call(this, e, n);
  }
}
class E extends f {
  constructor(e) {
    super(document.createElement(e));
  }
  __children(e) {
    this.children = [];
  }
}
class O extends f {
  constructor(e = []) {
    super(document.createElement("template")), this.children = e;
  }
  mount(e) {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), d(n, this.children), this.__runOnMount();
  }
}
function R(t) {
  return new O(t);
}
class S extends E {
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
function ee(t = "text") {
  const e = document.createElement("input");
  return new S(e, t);
}
function te() {
  const t = document.createElement("textarea");
  return new S(t);
}
class ne extends E {
  constructor(e, n) {
    super("option"), e && (this.el.value = String(e), this.el.textContent = String(e)), n && (this.el.textContent = String(n));
  }
  value(e) {
    return p.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function se(t, e) {
  return new ne(t, e);
}
const ie = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], oe = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], re = ie.reduce((t, e) => (t[e] = (n) => {
  const s = document.createElement(e), o = new f(s);
  return n && o.__children(n), o;
}, t), {}), ce = oe.reduce((t, e) => (t[e] = () => new E(e), t), {}), de = Object.assign(re, ce, {
  fragment: R,
  input: ee,
  textarea: te,
  option: se
});
export {
  f as Component,
  de as El,
  ae as getInstance
};
