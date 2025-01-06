var Z = Object.defineProperty;
var q = (t) => {
  throw TypeError(t);
};
var Y = (t, e, n) => e in t ? Z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => Y(t, typeof e != "symbol" ? e + "" : e, n), H = (t, e, n) => e.has(t) || q("Cannot " + n);
var f = (t, e, n) => (H(t, e, "read from private field"), n ? n.call(t) : e.get(t)), E = (t, e, n) => e.has(t) ? q("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), L = (t, e, n, s) => (H(t, e, "write to private field"), s ? s.call(t, n) : e.set(t, n), n);
import { isRef as K, watch as h, toValue as d, effectScope as z } from "@vue/reactivity";
const R = /* @__PURE__ */ new Set(), tt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), et = "abcdefghiklmnopqrstuvwxyz".split("");
function nt(t) {
  const e = t ? et : tt;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function st(t = !1) {
  let e = "";
  for (; e.length === 0 || R.has(e); )
    e = nt(t);
  return e;
}
function v(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function x(t) {
  return t == null;
}
function y(t) {
  return Array.isArray(t);
}
function it(t) {
  return typeof t == "function";
}
function p(t) {
  return K(t) || it(t);
}
function oe(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const T = {
  immediate: !0,
  deep: !0
};
function U(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function ot(t) {
  function e(n) {
    if (!(n instanceof m))
      return;
    n.$runOnDestroy();
    const { children: s } = n;
    if (s instanceof m)
      e(s);
    else if (y(s))
      for (const i of s)
        i instanceof m && e(i);
  }
  e(t), t.$runOnDestroy(), t.$closeScopes(), t.el.remove();
}
function D(t, e, n) {
  if (v(e)) {
    Object.entries(e).forEach(([s, i]) => {
      D(t, s, i);
    });
    return;
  }
  x(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function rt(t) {
  return this.onInit(() => {
    if (p(t)) {
      const e = h(() => d(t), (n) => D(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      D(this.el, t);
  }), this;
}
function ct(t, e) {
  return this.onInit(() => {
    if (p(e)) {
      const n = h(() => d(e), (s) => D(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      D(this.el, t, e);
  }), this;
}
function lt(t, e) {
  if (v(t) && !x(e))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (l) => {
    for (const a of Object.keys(l))
      l[a] ? this.el.classList.add(a) : this.el.classList.remove(a);
  }, o = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (y(l)) {
        const a = l.length;
        for (let b = 0; b < a; b++) {
          const C = l[b];
          if (C)
            typeof C == "string" ? (this.el.classList.add(C), s[b] = C) : v(l) && i(C);
          else {
            const $ = s[b];
            $ && (this.el.classList.remove($), s[b] = null);
          }
        }
      } else v(l) && i(l);
  }, r = (l, a) => {
    p(a) ? this.onDestroy(h(() => d(a), (b) => {
      o({ [l]: b });
    }, T)) : l && a !== !1 && o(l);
  }, u = (l) => {
    for (const [a, b] of Object.entries(l))
      r(a, b);
  };
  return v(t) ? u(t) : typeof t == "string" && r(t, e), this;
}
function ut(t) {
  return this.attr("disabled", t), this;
}
function at(t, e, n = {
  bubbles: !0
}) {
  return this.el.dispatchEvent(new CustomEvent(t, {
    detail: e,
    ...n
  })), this;
}
function ht(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function g(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e)
    if (typeof e == "string" || typeof e == "number")
      if (x(n))
        s.innerHTML = String(e);
      else {
        const i = document.createTextNode(String(e));
        ht(s, i, n) || s.appendChild(i);
      }
    else if (e instanceof M)
      g(s, e.componentChildren);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof m)
      t instanceof m && (e.parent = t), s.appendChild(e.el), e.$runOnInit(), g(e, e.componentChildren), e.$runOnMount();
    else if (Array.isArray(e)) {
      const i = e.length;
      for (let o = 0; o < i; o++) {
        const r = e[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? g(s, r, o) : r instanceof M ? g(s, r.componentChildren) : p(r) ? h(() => d(r), (u) => {
          g(s, u, o);
        }, {
          immediate: !0,
          deep: !0
        }) : (t instanceof m && (r.parent = t), s.appendChild(r.el), r.$runOnInit(), g(r, r.componentChildren), r.$runOnMount());
      }
    } else p(e) && h(() => d(e), (i) => {
      i instanceof m ? i.destroy() : s.innerHTML = "", g(s, i);
    }, {
      immediate: !0,
      deep: !0
    });
}
function ft(t, e) {
  const n = (s) => {
    const i = [];
    if (y(s)) {
      const o = s.length;
      for (let r = 0; r < o; r++) {
        const u = e(s[r], r);
        u && i.push(u);
      }
    } else if (v(s)) {
      const o = Object.keys(s), r = o.length;
      for (let u = 0; u < r; u++) {
        const l = o[u], a = e(Reflect.get(s, l), l, u);
        a && i.push(a);
      }
    } else if (typeof s == "number")
      for (let o = 0; o < s; o++) {
        const r = e(o);
        r && i.push(r);
      }
    this.el.replaceChildren(), g(this.el, i);
  };
  return this.onInit(() => {
    if (p(t)) {
      const s = h(() => d(t), (i) => {
        n(i);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function k(t, e) {
  const n = (s) => {
    Reflect.set(this.el, t, s);
  };
  if (p(e)) {
    n(d(e));
    const s = h(() => d(e), (i) => {
      n(i);
    }, T);
    this.onDestroy(s);
  } else
    n(e);
}
function dt(t) {
  return k.call(this, "innerHTML", t), this;
}
function pt(t) {
  return k.call(this, "id", t), this;
}
function mt(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), p(t)) {
      const i = h(() => d(t), s, T);
      this.onDestroy(i);
    } else
      s(t);
  }), this;
}
const yt = (t) => Number(t), bt = (t) => t.trim(), gt = (t) => t.toString().toUpperCase(), kt = (t) => t.toString().toUpperCase();
function wt(t) {
  return t.split("\\s+").map((e) => U(e)).join("\\s+");
}
const vt = (t) => U(t);
function Ct(t) {
  return (e) => e.substring(0, t);
}
const re = {
  trim: bt,
  number: yt,
  uppercase: gt,
  lowercase: kt,
  truncate: Ct,
  capitalize: vt,
  capitalizeAll: wt
};
function F(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function W(t, e, n) {
  y(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function B(t, e) {
  (!t.value || y(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (W(t, e.value, !0), e.removeAttribute("checked"));
}
function Et(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(t, (i) => {
              i === n.value || y(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: r } = i.target;
              W(t, r, o);
            }, e.eventOptions), B(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(t, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: r } = i.target;
              r && (t.value = o);
            }, e.eventOptions), B(t, n);
            break;
          }
          default: {
            const n = this.el, s = h(t, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = F(o, e.transforms), t.value = o;
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
          r = F(r, e.transforms), t.value = r;
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
        const n = this.el, s = h(t, (o) => {
          n.open = !!o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          t.value = n.open;
        }, e.eventOptions);
        const i = y(t.value) ? t.value[0] : t.value;
        n.open = !!i;
        break;
      }
      default:
        this.prop("modelValue", t);
    }
  }), this;
}
function Ot(t, ...e) {
  const n = y(t) ? t.concat(e) : [t].concat(e);
  return this.$setComponentChildren(n), this;
}
function St(t) {
  return (e, n) => typeof t != "number" ? !0 : Date.now() - n.lastCall >= t;
}
function xt(t) {
  return () => new Promise((e) => {
    setTimeout(() => e(!0), t);
  });
}
const Dt = (t, e) => e.executedTimes === 0, At = (t) => (t.stopPropagation(), !0), It = (t) => (t.stopImmediatePropagation(), !0), jt = (t) => (t.preventDefault(), !0), Tt = () => !1, ce = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (t) => () => !!d(t),
  throttle: St,
  once: Dt,
  stop: At,
  stopImmediate: It,
  prevent: jt,
  cancel: Tt,
  delay: xt
};
function $t(t, e, n = {}) {
  const s = {
    executedTimes: 0,
    lastCall: 0
  };
  async function i(o) {
    if (n.modifiers) {
      for (const r of n.modifiers)
        if (!await r(o, s))
          return;
    }
    e(o, "detail" in o ? o.detail : void 0), s.executedTimes++, s.lastCall = Date.now();
  }
  return this.onMount(() => {
    this.el.addEventListener(t, i, n.options);
  }), this.onDestroy(() => {
    this.el.removeEventListener(t, i);
  }), this;
}
function Lt(t, e) {
  return this.on("click", t, e);
}
function Pt(t, e) {
  return this.on("submit", t, e);
}
function Mt(t, e) {
  return this.on("focus", t, e);
}
function Vt(t, e) {
  return this.on("blur", t, e);
}
function _t(t, e) {
  return this.on("change", t, e);
}
function qt(t, e) {
  return this.on("input", t, e);
}
function V(t, e, n, s) {
  const i = [];
  function o(u) {
    i.push(u), i.length > e.length && i.shift();
  }
  const r = Array.isArray(e) ? e : [e];
  this.on(t, (u) => {
    const l = u.key;
    function a() {
      n(u, "detail" in u ? u.detail : void 0);
    }
    switch ((s == null ? void 0 : s.detect) || "every") {
      case "some": {
        r.includes(l) && a();
        break;
      }
      case "every":
      default: {
        o(l), r.every((C, $) => C === i[$]) && a();
        break;
      }
    }
  }, s);
}
function Ht(t, e) {
  return this.on("keydown", t, e);
}
function zt(t, e, n) {
  return V.call(this, "keydown", t, e, n), this;
}
function Ft(t, e) {
  return this.on("keyup", t, e);
}
function Bt(t, e, n) {
  return V.call(this, "keyup", t, e, n), this;
}
function Nt(t, e) {
  return this.on("keyup", t, e);
}
function Ut(t, e, n) {
  return V.call(this, "keypress", t, e, n), this;
}
function Wt(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? x(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (p(t)) {
      const s = h(() => d(t), n, T);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Xt(t, e) {
  const n = (s) => {
    if (!v(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof t == "string")
    if (p(e)) {
      const s = h(() => d(e), (i) => {
        n({ [t]: i });
      });
      this.onDestroy(s);
    } else e && n({ [t]: e });
  else if (p(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = h(() => d(t), n, T);
      this.onDestroy(s);
    }
  else if (v(t)) {
    const s = Object.keys(t);
    for (const i of s) {
      const o = Reflect.get(t, i);
      if (p(o)) {
        const r = h(() => d(o), (u) => {
          x(u) || this.el.style.setProperty(i, String(u));
        });
        this.onDestroy(r);
      } else x(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function Gt(t) {
  return k.call(this, "textContent", t), this;
}
var A, I, j, O, S, w;
const _ = class _ {
  constructor(e, n) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", Gt);
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", dt);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", $t);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", Lt);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", Pt);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", Mt);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", Vt);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", _t);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", qt);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", Ht);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", zt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", Ft);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", Bt);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", Nt);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keypressExact", Ut);
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", lt);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", Ot);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", Et);
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
    c(this, "disabled", ut);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", pt);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", Wt);
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", Xt);
    /**
     * Conditionally render a component.
     */
    c(this, "if", mt);
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
    E(this, A, []);
    E(this, I, []);
    E(this, j, []);
    E(this, O, /* @__PURE__ */ new Set());
    E(this, S, /* @__PURE__ */ new Set());
    E(this, w);
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
    /**
     * Emit a custom event which parent components can listen for. Additionally,
     * you can provide data which should be sent along.
     *
     * @param eventName Your custom event name
     * @param data Any kind of data to be sent
     */
    c(this, "emit", at);
    this.el = e, Object.defineProperty(this.el, "__instance", this), L(this, w, n ?? {}), this.identifier = st(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  $setComponentChildren(e) {
    this.isVoid || (this.componentChildren = e);
  }
  $runOnMount() {
    for (const e of f(this, A))
      e();
  }
  $runOnDestroy() {
    for (const e of f(this, I))
      e();
  }
  $runOnInit() {
    for (const e of f(this, j))
      e();
  }
  $rerunSetup() {
    for (const e of f(this, O)) {
      const n = z();
      n.run(() => {
        e(this, f(this, w));
      }), f(this, S).add(n);
    }
  }
  $closeScopes() {
    for (const e of f(this, S))
      e.stop();
    L(this, S, /* @__PURE__ */ new Set());
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
    f(this, j).push(e);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(e) {
    f(this, A).push(e);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(e) {
    f(this, I).push(e);
  }
  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive #scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(e = "body") {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    n.appendChild(this.el), this.$rerunSetup(), this.$runOnInit(), g(this, this.componentChildren), this.$runOnMount();
  }
  /**
   * Removes component from the DOM, deactivates its instance and removes all reactive scopes.
   */
  destroy() {
    ot(this);
  }
  /**
   * Clones the component. All reactive variables, DOM child nodes and chained
   * functions should work. Cloning does not reassign the component back to the
   * DOM, so it must be re-inserted.
   *
   * @returns Cloned component
   */
  clone() {
    const e = new _(this.el);
    return e.componentChildren = this.componentChildren, L(e, O, new Set(f(this, O))), e;
  }
  /**
   * Pass a single prop value into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   *
   * @param key {string}
   * @param value {any}
   */
  prop(e, n) {
    return Object.assign(f(this, w), { [e]: n }), this;
  }
  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props(e) {
    for (const n of Object.keys(e))
      Object.assign(f(this, w), { [n]: e[n] });
    return this;
  }
  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
  setup(e) {
    return f(this, O).add(e), this.onInit(() => {
      const n = z();
      n.run(() => {
        e(this, f(this, w));
      }), this.onDestroy(() => {
        n.stop();
      });
    }), this;
  }
};
A = new WeakMap(), I = new WeakMap(), j = new WeakMap(), O = new WeakMap(), S = new WeakMap(), w = new WeakMap();
let m = _;
class P extends m {
  constructor(e) {
    super(document.createElement(e));
  }
  $setComponentChildren(e) {
    this.componentChildren = [];
  }
}
class M extends m {
  constructor(e = []) {
    super(document.createElement("template")), this.componentChildren = e;
  }
  mount(e) {
    const n = document.querySelector(e);
    if (!n)
      throw new Error("Root element does not exist");
    this.$runOnInit(), g(n, this.componentChildren), this.$runOnMount();
  }
}
function Jt(t = [], ...e) {
  const n = y(t) ? t.concat(e) : [t].concat(e);
  return new M(n);
}
class Qt extends P {
  constructor(n) {
    super("img");
    c(this, "el");
    this.el = n;
  }
  src(n) {
    return k.call(this, "src", n), this;
  }
  alt(n) {
    return k.call(this, "alt", n), this;
  }
}
function Zt(t) {
  const e = document.createElement("img"), n = new Qt(e);
  return t && n.src(t), n;
}
class X extends P {
  constructor(n, s) {
    super();
    c(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  type(n) {
    this.el.type = n;
  }
  value(n) {
    return k.call(this, "value", n), this;
  }
  placeholder(n) {
    return k.call(this, "placeholder", n), this;
  }
  name(n) {
    return k.call(this, "name", n), this;
  }
  required(n) {
    return k.call(this, "required", n), this;
  }
}
function Yt(t = "text") {
  const e = document.createElement("input");
  return new X(e, t);
}
function Kt() {
  const t = document.createElement("textarea");
  return new X(t);
}
class Rt extends P {
  constructor(e, n) {
    if (super("option"), n) {
      const s = d(n);
      this.el.value = String(s), this.el.textContent = String(s), p(n) && this.value(n);
    }
    e && (this.el.textContent = String(e));
  }
  value(e) {
    return k.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function te(t, e) {
  return new Rt(t, e);
}
const ee = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], G = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], J = ee.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const i = document.createElement(e), o = new m(i), r = y(n) ? n.concat(s) : [n].concat(s);
  return o.$setComponentChildren(r), o.children = r, o;
}, t), {}), Q = G.reduce((t, e) => (t[e] = () => {
  const n = new P(e);
  return n.isVoid = !0, n;
}, t), {}), N = Object.assign(J, Q, {
  fragment: Jt,
  input: Yt,
  textarea: Kt,
  option: te,
  img: Zt
}), ne = [
  ...G,
  "input",
  "textarea",
  "option"
];
function le(t, e) {
  return (n = [], ...s) => {
    const i = y(n) ? n.concat(s) : [n].concat(s), o = ne.includes(t) ? N[t]() : N[t](i);
    return o.setup(e), o;
  };
}
const {
  a: ue,
  abbr: ae,
  address: he,
  applet: fe,
  article: de,
  aside: pe,
  audio: me,
  b: ye,
  basefont: be,
  bdi: ge,
  bdo: ke,
  bgsound: we,
  blink: ve,
  blockquote: Ce,
  body: Ee,
  button: Oe,
  canvas: Se,
  caption: xe,
  cite: De,
  code: Ae,
  colgroup: Ie,
  content: je,
  data: Te,
  datalist: $e,
  dd: Le,
  decorator: Pe,
  del: Me,
  details: Ve,
  dfn: _e,
  div: qe,
  dl: He,
  dt: ze,
  element: Fe,
  em: Be,
  fieldset: Ne,
  figcaption: Ue,
  figure: We,
  footer: Xe,
  form: Ge,
  h1: Je,
  h2: Qe,
  h3: Ze,
  h4: Ye,
  h5: Ke,
  h6: Re,
  head: tn,
  header: en,
  hgroup: nn,
  html: sn,
  i: on,
  iframe: rn,
  ins: cn,
  isindex: ln,
  kbd: un,
  keygen: an,
  label: hn,
  legend: fn,
  li: dn,
  listing: pn,
  main: mn,
  map: yn,
  mark: bn,
  menu: gn,
  meter: kn,
  nav: wn,
  noscript: vn,
  object: Cn,
  ol: En,
  optgroup: On,
  output: Sn,
  p: xn,
  picture: Dn,
  pre: An,
  progress: In,
  q: jn,
  rp: Tn,
  rt: $n,
  ruby: Ln,
  s: Pn,
  samp: Mn,
  script: Vn,
  section: _n,
  select: qn,
  shadow: Hn,
  small: zn,
  spacer: Fn,
  span: Bn,
  strong: Nn,
  style: Un,
  sub: Wn,
  summary: Xn,
  sup: Gn,
  table: Jn,
  tbody: Qn,
  td: Zn,
  template: Yn,
  tfoot: Kn,
  th: Rn,
  thead: ts,
  time: es,
  title: ns,
  tr: ss,
  u: is,
  ul: os,
  video: rs
} = J, {
  area: cs,
  base: ls,
  br: us,
  col: as,
  embed: hs,
  hr: fs,
  link: ds,
  meta: ps,
  source: ms,
  track: ys,
  wbr: bs
} = Q;
export {
  m as Component,
  ce as Modifier,
  re as Transform,
  ue as a,
  ae as abbr,
  he as address,
  fe as applet,
  cs as area,
  de as article,
  pe as aside,
  me as audio,
  ye as b,
  ls as base,
  be as basefont,
  ge as bdi,
  ke as bdo,
  we as bgsound,
  ve as blink,
  Ce as blockquote,
  Ee as body,
  us as br,
  Oe as button,
  Se as canvas,
  xe as caption,
  De as cite,
  Ae as code,
  as as col,
  Ie as colgroup,
  je as content,
  st as createId,
  Te as data,
  $e as datalist,
  Le as dd,
  Pe as decorator,
  Me as del,
  Ve as details,
  _e as dfn,
  qe as div,
  He as dl,
  ze as dt,
  Fe as element,
  Be as em,
  hs as embed,
  Ne as fieldset,
  Ue as figcaption,
  We as figure,
  Xe as footer,
  Ge as form,
  Jt as fragment,
  oe as getInstance,
  Je as h1,
  Qe as h2,
  Ze as h3,
  Ye as h4,
  Ke as h5,
  Re as h6,
  tn as head,
  en as header,
  nn as hgroup,
  fs as hr,
  sn as html,
  on as i,
  rn as iframe,
  Zt as img,
  Yt as input,
  cn as ins,
  ln as isindex,
  un as kbd,
  an as keygen,
  hn as label,
  fn as legend,
  dn as li,
  ds as link,
  pn as listing,
  mn as main,
  yn as map,
  bn as mark,
  gn as menu,
  ps as meta,
  kn as meter,
  wn as nav,
  vn as noscript,
  Cn as object,
  En as ol,
  On as optgroup,
  te as option,
  Sn as output,
  xn as p,
  Dn as picture,
  An as pre,
  In as progress,
  jn as q,
  le as reusable,
  Tn as rp,
  $n as rt,
  Ln as ruby,
  Pn as s,
  Mn as samp,
  Vn as script,
  _n as section,
  qn as select,
  Hn as shadow,
  zn as small,
  ms as source,
  Fn as spacer,
  Bn as span,
  Nn as strong,
  Un as style,
  Wn as sub,
  Xn as summary,
  Gn as sup,
  Jn as table,
  Qn as tbody,
  Zn as td,
  Yn as template,
  Kt as textarea,
  Kn as tfoot,
  Rn as th,
  ts as thead,
  es as time,
  ns as title,
  ss as tr,
  ys as track,
  is as u,
  os as ul,
  rs as video,
  bs as wbr
};
