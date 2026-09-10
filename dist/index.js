var z = Object.defineProperty;
var U = (t, e, n) => e in t ? z(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => U(t, typeof e != "symbol" ? e + "" : e, n);
import { isRef as W, watch as f, toValue as y, effectScope as j } from "@vue/reactivity";
const X = /* @__PURE__ */ new Set(), G = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), J = "abcdefghiklmnopqrstuvwxyz".split("");
function K(t) {
  const e = t ? J : G;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function Q(t = !1) {
  let e = "";
  for (; e.length === 0 || X.has(e); )
    e = K(t);
  return e;
}
function w(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function S(t) {
  return t == null;
}
function C(t) {
  return Array.isArray(t);
}
function Z(t) {
  return typeof t == "function";
}
function b(t) {
  return W(t) || Z(t);
}
function Rt(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const A = {
  immediate: !0,
  deep: !0
};
function N(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Y(t) {
  function e(n) {
    if (!(n instanceof m))
      return;
    n.$runOnDestroy();
    const { children: s } = n;
    if (s instanceof m)
      e(s);
    else if (C(s))
      for (const i of s)
        i instanceof m && e(i);
  }
  e(t), t.$runOnDestroy(), t.$closeScopes(), t.el.remove();
}
function x(t, e, n) {
  if (w(e)) {
    Object.entries(e).forEach(([s, i]) => {
      x(t, s, i);
    });
    return;
  }
  S(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function R(t) {
  return this.onInit(() => {
    if (b(t)) {
      const e = f(() => y(t), (n) => x(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      x(this.el, t);
  }), this;
}
function tt(t, e) {
  return this.onInit(() => {
    if (b(e)) {
      const n = f(() => y(e), (s) => x(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      x(this.el, t, e);
  }), this;
}
function et(t, e) {
  if (w(t) && !S(e))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), i = (u) => {
    for (const h of Object.keys(u))
      u[h] ? this.el.classList.add(h) : this.el.classList.remove(h);
  }, o = (u) => {
    if (u)
      if (typeof u == "string")
        n && this.el.classList.remove(n), n = u, this.el.classList.add(n);
      else if (C(u)) {
        const h = u.length;
        for (let d = 0; d < h; d++) {
          const l = u[d];
          if (l)
            typeof l == "string" ? (this.el.classList.add(l), s[d] = l) : w(u) && i(l);
          else {
            const a = s[d];
            a && (this.el.classList.remove(a), s[d] = null);
          }
        }
      } else w(u) && i(u);
  }, r = (u, h) => {
    b(h) ? this.onDestroy(f(() => y(h), (d) => {
      o({ [u]: d });
    }, A)) : u && h !== !1 && o(u);
  }, p = (u) => {
    for (const [h, d] of Object.entries(u))
      r(h, d);
  };
  return w(t) ? p(t) : typeof t == "string" && r(t, e), this;
}
function nt(t) {
  return this.attr("disabled", t), this;
}
function st(t, e, n = {
  bubbles: !0
}) {
  return this.el.dispatchEvent(new CustomEvent(t, {
    detail: e,
    ...n
  })), this;
}
function ot(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function it(t) {
  t instanceof m ? t.destroy() : t instanceof Element && t.remove();
}
function $(t, e, n, s) {
  const i = t instanceof Element ? t : t.el, o = s ?? i;
  if (e instanceof O)
    for (const r of e.componentChildren)
      $(t, r, n, o);
  else if (e instanceof m)
    t instanceof m && (e.parent = t), n && n.parentNode === o ? o.insertBefore(e.el, n) : o.appendChild(e.el), e.$runOnInit(), D(e, e.componentChildren), e.$runOnMount();
  else if (e instanceof Element)
    n && n.parentNode === o ? o.insertBefore(e, n) : o.appendChild(e);
  else if (typeof e == "string" || typeof e == "number") {
    const r = document.createTextNode(String(e));
    n && n.parentNode === o ? o.insertBefore(r, n) : o.appendChild(r);
  }
}
function T(t, e, n) {
  const s = n ?? (t instanceof Element ? t : t.el), i = document.createComment("dynamic");
  s.appendChild(i);
  let o;
  const r = () => {
    if (o === void 0)
      return;
    const h = Array.isArray(o) ? o : [o];
    for (const d of h)
      it(d);
    o = void 0;
  }, u = f(() => y(e), (h) => {
    r(), o = h;
    const d = Array.isArray(h) ? h : [h];
    for (const l of d)
      $(t, l, i);
  }, { immediate: !0 });
  t instanceof m && t.onDestroy(() => {
    u(), r(), i.remove();
  });
}
function D(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e != null) {
    if (b(e)) {
      T(t, e);
      return;
    }
    if (typeof e == "string" || typeof e == "number")
      if (S(n))
        s.innerHTML = String(e);
      else {
        const i = document.createTextNode(String(e));
        ot(s, i, n) || s.appendChild(i);
      }
    else if (e instanceof O)
      D(s, e.componentChildren);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof m)
      $(t, e);
    else if (Array.isArray(e)) {
      const i = document.createDocumentFragment();
      for (const o of e)
        if (o instanceof O)
          for (const r of o.componentChildren)
            $(t, r, void 0, i);
        else b(o) ? T(t, o, i) : $(t, o, void 0, i);
      s.appendChild(i);
    }
  }
}
function rt(t, e, n) {
  let s = [];
  const i = (o) => {
    const r = [], p = /* @__PURE__ */ new Map();
    if (n)
      for (const l of s)
        p.set(l.key, l);
    const u = (l, a, g) => {
      const k = n ? n(l, a) : a, E = n ? p.get(k) : void 0;
      r.push({ key: k, value: l, child: E && E.value === l ? E.child : g });
    };
    if (C(o)) {
      const l = o.length;
      for (let a = 0; a < l; a++) {
        const g = e(o[a], a);
        g && u(o[a], a, g);
      }
    } else if (w(o)) {
      const l = Object.keys(o), a = l.length;
      for (let g = 0; g < a; g++) {
        const k = l[g], E = e(Reflect.get(o, k), k, g);
        E && u(Reflect.get(o, k), g, E);
      }
    } else if (typeof o == "number")
      for (let l = 0; l < o; l++) {
        const a = e(l);
        a && u(l, l, a);
      }
    const h = r, d = new Set(h.map((l) => l.child));
    for (const l of s)
      d.has(l.child) || (l.child instanceof m ? l.child.destroy() : l.child instanceof Element && l.child.remove());
    if (n) {
      const l = document.createDocumentFragment();
      for (const a of h)
        a.child instanceof m ? (a.child.parent = this, l.appendChild(a.child.el)) : a.child instanceof Element ? l.appendChild(a.child) : l.appendChild(document.createTextNode(String(a.child)));
      this.el.replaceChildren(l);
      for (const a of h)
        s.some((g) => g.child === a.child) || D(this, a.child);
    } else {
      const l = document.createDocumentFragment();
      for (const a of h)
        $(this, a.child, void 0, l);
      this.el.replaceChildren(), this.el.appendChild(l);
    }
    s = h;
  };
  return this.onInit(() => {
    if (b(t)) {
      const o = f(() => y(t), (r) => {
        i(r);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(o);
    } else
      i(t);
  }), this;
}
function v(t, e) {
  const n = (s) => {
    Reflect.set(this.el, t, s);
  };
  if (b(e)) {
    n(y(e));
    const s = f(() => y(e), (i) => {
      n(i);
    }, A);
    this.onDestroy(s);
  } else
    n(e);
}
function ct(t) {
  return v.call(this, "innerHTML", t), this;
}
function lt(t) {
  return v.call(this, "id", t), this;
}
function at(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    if (!this.parent)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      const r = e.parentNode;
      r && (o ? this.el.parentNode !== r && r.insertBefore(this.el, e) : this.el.parentNode === r && this.el.remove());
    }, i = this.el.parentNode;
    if (!i)
      return console.warn("Component element not found. `if()` will not work.");
    if (i.insertBefore(e, this.el), b(t)) {
      const o = f(() => y(t), s, { immediate: !0 });
      this.onDestroy(o);
    } else
      s(t);
  }), this;
}
const ut = (t) => Number(t), ht = (t) => t.trim(), dt = (t) => t.toString().toUpperCase(), ft = (t) => t.toString().toUpperCase();
function pt(t) {
  return t.split("\\s+").map((e) => N(e)).join("\\s+");
}
const mt = (t) => N(t);
function yt(t) {
  return (e) => e.substring(0, t);
}
const te = {
  trim: ht,
  number: ut,
  uppercase: dt,
  lowercase: ft,
  truncate: yt,
  capitalize: mt,
  capitalizeAll: pt
};
function L(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function _(t, e, n) {
  C(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function M(t, e) {
  (!t.value || C(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (_(t, e.value, !0), e.removeAttribute("checked"));
}
function bt(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = f(t, (i) => {
              i === n.value || C(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: r } = i.target;
              _(t, r, o);
            }, e.eventOptions), M(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = f(t, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: r } = i.target;
              r && (t.value = o);
            }, e.eventOptions), M(t, n);
            break;
          }
          default: {
            const n = this.el, s = f(t, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = L(o, e.transforms), t.value = o;
            }, e.eventOptions), n.value = String(t.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = f(t, (o) => {
          t.value = o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (o) => {
          let r = o.target.value;
          r = L(r, e.transforms), t.value = r;
        }, e.eventOptions);
        const i = C(t.value) ? t.value[0] : t.value;
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
        const n = this.el, s = f(t, (o) => {
          n.open = !!o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          t.value = n.open;
        }, e.eventOptions);
        const i = C(t.value) ? t.value[0] : t.value;
        n.open = !!i;
        break;
      }
      default:
        this.prop("modelValue", t);
    }
  }), this;
}
function gt(t, ...e) {
  const n = C(t) ? t.concat(e) : [t].concat(e);
  return this.$setComponentChildren(n), this;
}
function Ct(t) {
  return (e, n) => typeof t != "number" ? !0 : Date.now() - n.lastCall >= t;
}
function vt(t) {
  return () => new Promise((e) => {
    setTimeout(() => e(!0), t);
  });
}
const wt = (t, e) => e.executedTimes === 0, kt = (t) => (t.stopPropagation(), !0), Et = (t) => (t.stopImmediatePropagation(), !0), $t = (t) => (t.preventDefault(), !0), St = () => !1, ee = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (t) => () => !!y(t),
  throttle: Ct,
  once: wt,
  stop: kt,
  stopImmediate: Et,
  prevent: $t,
  cancel: St,
  delay: vt
};
function xt(t, e, n = {}) {
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
function Dt(t, e) {
  return this.on("click", t, e);
}
function Ot(t, e) {
  return this.on("submit", t, e);
}
function At(t, e) {
  return this.on("focus", t, e);
}
function It(t, e) {
  return this.on("blur", t, e);
}
function Pt(t, e) {
  return this.on("change", t, e);
}
function jt(t, e) {
  return this.on("input", t, e);
}
function P(t, e, n, s) {
  const i = [];
  function o(p) {
    i.push(p), i.length > e.length && i.shift();
  }
  const r = Array.isArray(e) ? e : [e];
  this.on(t, (p) => {
    const u = p.key;
    function h() {
      n(p, "detail" in p ? p.detail : void 0);
    }
    switch ((s == null ? void 0 : s.detect) || "every") {
      case "some": {
        r.includes(u) && h();
        break;
      }
      case "every":
      default: {
        o(u), r.every((l, a) => l === i[a]) && h();
        break;
      }
    }
  }, s);
}
function Tt(t, e) {
  return this.on("keydown", t, e);
}
function Lt(t, e, n) {
  return P.call(this, "keydown", t, e, n), this;
}
function Mt(t, e) {
  return this.on("keyup", t, e);
}
function Vt(t, e, n) {
  return P.call(this, "keyup", t, e, n), this;
}
function Nt(t, e) {
  return this.on("keyup", t, e);
}
function _t(t, e, n) {
  return P.call(this, "keypress", t, e, n), this;
}
function qt(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? S(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (b(t)) {
      const s = f(() => y(t), n, A);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Bt(t, e) {
  const n = (s) => {
    if (!w(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof t == "string")
    if (b(e)) {
      const s = f(() => y(e), (i) => {
        n({ [t]: i });
      });
      this.onDestroy(s);
    } else e && n({ [t]: e });
  else if (b(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = f(() => y(t), n, A);
      this.onDestroy(s);
    }
  else if (w(t)) {
    const s = Object.keys(t);
    for (const i of s) {
      const o = Reflect.get(t, i);
      if (b(o)) {
        const r = f(() => y(o), (p) => {
          S(p) || this.el.style.setProperty(i, String(p));
        });
        this.onDestroy(r);
      } else S(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function Ft(t) {
  return v.call(this, "textContent", t), this;
}
class m {
  constructor(e, n) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", Ft);
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", ct);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", xt);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", Dt);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", Ot);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", At);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", It);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", Pt);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", jt);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", Tt);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", Lt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", Mt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", Vt);
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
    c(this, "keypressExact", _t);
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", et);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", gt);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", bt);
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", R);
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", tt);
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", nt);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", lt);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", qt);
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", Bt);
    /**
     * Conditionally render a component.
     */
    c(this, "if", at);
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
    /**
     * Stores reference to the element the component is mounted to. Only the
     * top-most component has a root element.
     */
    c(this, "root", null);
    c(this, "isRoot", !1);
    //
    // Private stuff for implementation
    c(this, "$onMountCbs", []);
    c(this, "$onDestroyCbs", []);
    c(this, "$onInitCbs", []);
    c(this, "$scopes", /* @__PURE__ */ new Set());
    c(this, "$runningScopes", /* @__PURE__ */ new Set());
    c(this, "$componentProps");
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
    c(this, "for", rt);
    /**
     * Emit a custom event which parent components can listen for. Additionally,
     * you can provide data which should be sent along.
     *
     * @param eventName Your custom event name
     * @param data Any kind of data to be sent
     */
    c(this, "emit", st);
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.$componentProps = n ?? {}, this.identifier = Q(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  $setComponentChildren(e) {
    this.isVoid || (this.componentChildren = e);
  }
  $runOnMount() {
    for (const e of this.$onMountCbs)
      e();
  }
  $runOnDestroy() {
    for (const e of this.$onDestroyCbs)
      e();
  }
  $runOnInit() {
    for (const e of this.$onInitCbs)
      e();
  }
  $rerunSetup() {
    for (const e of this.$scopes) {
      const n = j();
      n.run(() => {
        e(this, this.$componentProps);
      }), this.$runningScopes.add(n);
    }
  }
  $closeScopes() {
    for (const e of this.$runningScopes)
      e.stop();
    this.$runningScopes = /* @__PURE__ */ new Set();
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
    this.$onInitCbs.push(e);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(e) {
    this.$onMountCbs.push(e);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(e) {
    this.$onDestroyCbs.push(e);
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
    this.root = n, this.isRoot = !0, n.appendChild(this.el), this.$rerunSetup(), this.$runOnInit(), D(this, this.componentChildren), this.$runOnMount();
  }
  /**
   * Removes component from the DOM, deactivates its instance and removes all reactive scopes.
   */
  destroy() {
    Y(this);
  }
  /**
   * Clones the component. All reactive variables, DOM child nodes and chained
   * functions should work. Cloning does not reassign the component back to the
   * DOM, so it must be re-inserted.
   *
   * @returns Cloned component
   */
  clone() {
    const e = new m(this.el);
    return e.componentChildren = this.componentChildren, e.$scopes = new Set(this.$scopes), e;
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
    return Object.assign(this.$componentProps, { [e]: n }), this;
  }
  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props(e) {
    for (const n of Object.keys(e))
      Object.assign(this.$componentProps, { [n]: e[n] });
    return this;
  }
  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
  setup(e) {
    return this.$scopes.add(e), this.onInit(() => {
      const n = j();
      n.run(() => {
        e(this, this.$componentProps);
      }), this.onDestroy(() => {
        n.stop();
      });
    }), this;
  }
}
class I extends m {
  constructor(e) {
    super(document.createElement(e));
  }
  $setComponentChildren(e) {
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
    this.$runOnInit(), D(n, this.componentChildren), this.$runOnMount();
  }
}
function Ht(t = [], ...e) {
  const n = C(t) ? t.concat(e) : [t].concat(e);
  return new O(n);
}
class zt extends I {
  constructor(n) {
    super("img");
    c(this, "el");
    this.el = n;
  }
  src(n) {
    return v.call(this, "src", n), this;
  }
  alt(n) {
    return v.call(this, "alt", n), this;
  }
}
function Ut(t) {
  const e = document.createElement("img"), n = new zt(e);
  return t && n.src(t), n;
}
class q extends I {
  constructor(n, s) {
    super();
    c(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  type(n) {
    this.el.type = n;
  }
  value(n) {
    return v.call(this, "value", n), this;
  }
  placeholder(n) {
    return v.call(this, "placeholder", n), this;
  }
  name(n) {
    return v.call(this, "name", n), this;
  }
  required(n) {
    return v.call(this, "required", n), this;
  }
}
function Wt(t = "text") {
  const e = document.createElement("input");
  return new q(e, t);
}
function Xt() {
  const t = document.createElement("textarea");
  return new q(t);
}
class Gt extends I {
  constructor(e, n) {
    if (super("option"), n) {
      const s = y(n);
      this.el.value = String(s), this.el.textContent = String(s), b(n) && this.value(n);
    }
    e && (this.el.textContent = String(e));
  }
  value(e) {
    return v.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function Jt(t, e) {
  return new Gt(t, e);
}
const Kt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], B = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], F = Kt.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const i = document.createElement(e), o = new m(i), r = C(n) ? n.concat(s) : [n].concat(s);
  return o.$setComponentChildren(r), o.children = r, o;
}, t), {}), H = B.reduce((t, e) => (t[e] = () => {
  const n = new I(e);
  return n.isVoid = !0, n;
}, t), {}), V = Object.assign(F, H, {
  fragment: Ht,
  input: Wt,
  textarea: Xt,
  option: Jt,
  img: Ut
}), Qt = [
  ...B,
  "input",
  "textarea",
  "option"
];
function ne(t, e) {
  return (n = [], ...s) => {
    const i = C(n) ? n.concat(s) : [n].concat(s), o = Qt.includes(t) ? V[t]() : V[t](i);
    return o.setup(e), o;
  };
}
const {
  a: se,
  abbr: oe,
  address: ie,
  applet: re,
  article: ce,
  aside: le,
  audio: ae,
  b: ue,
  basefont: he,
  bdi: de,
  bdo: fe,
  bgsound: pe,
  blink: me,
  blockquote: ye,
  body: be,
  button: ge,
  canvas: Ce,
  caption: ve,
  cite: we,
  code: ke,
  colgroup: Ee,
  content: $e,
  data: Se,
  datalist: xe,
  dd: De,
  decorator: Oe,
  del: Ae,
  details: Ie,
  dfn: Pe,
  div: je,
  dl: Te,
  dt: Le,
  element: Me,
  em: Ve,
  fieldset: Ne,
  figcaption: _e,
  figure: qe,
  footer: Be,
  form: Fe,
  h1: He,
  h2: ze,
  h3: Ue,
  h4: We,
  h5: Xe,
  h6: Ge,
  head: Je,
  header: Ke,
  hgroup: Qe,
  html: Ze,
  i: Ye,
  iframe: Re,
  ins: tn,
  isindex: en,
  kbd: nn,
  keygen: sn,
  label: on,
  legend: rn,
  li: cn,
  listing: ln,
  main: an,
  map: un,
  mark: hn,
  menu: dn,
  meter: fn,
  nav: pn,
  noscript: mn,
  object: yn,
  ol: bn,
  optgroup: gn,
  output: Cn,
  p: vn,
  picture: wn,
  pre: kn,
  progress: En,
  q: $n,
  rp: Sn,
  rt: xn,
  ruby: Dn,
  s: On,
  samp: An,
  script: In,
  section: Pn,
  select: jn,
  shadow: Tn,
  small: Ln,
  spacer: Mn,
  span: Vn,
  strong: Nn,
  style: _n,
  sub: qn,
  summary: Bn,
  sup: Fn,
  table: Hn,
  tbody: zn,
  td: Un,
  template: Wn,
  tfoot: Xn,
  th: Gn,
  thead: Jn,
  time: Kn,
  title: Qn,
  tr: Zn,
  u: Yn,
  ul: Rn,
  video: ts
} = F, {
  area: es,
  base: ns,
  br: ss,
  col: os,
  embed: is,
  hr: rs,
  link: cs,
  meta: ls,
  source: as,
  track: us,
  wbr: hs
} = H;
export {
  m as Component,
  ee as Modifier,
  te as Transform,
  se as a,
  oe as abbr,
  ie as address,
  re as applet,
  es as area,
  ce as article,
  le as aside,
  ae as audio,
  ue as b,
  ns as base,
  he as basefont,
  de as bdi,
  fe as bdo,
  pe as bgsound,
  me as blink,
  ye as blockquote,
  be as body,
  ss as br,
  ge as button,
  Ce as canvas,
  ve as caption,
  we as cite,
  ke as code,
  os as col,
  Ee as colgroup,
  $e as content,
  Q as createId,
  Se as data,
  xe as datalist,
  De as dd,
  Oe as decorator,
  Ae as del,
  Ie as details,
  Pe as dfn,
  je as div,
  Te as dl,
  Le as dt,
  Me as element,
  Ve as em,
  is as embed,
  Ne as fieldset,
  _e as figcaption,
  qe as figure,
  Be as footer,
  Fe as form,
  Ht as fragment,
  Rt as getInstance,
  He as h1,
  ze as h2,
  Ue as h3,
  We as h4,
  Xe as h5,
  Ge as h6,
  Je as head,
  Ke as header,
  Qe as hgroup,
  rs as hr,
  Ze as html,
  Ye as i,
  Re as iframe,
  Ut as img,
  Wt as input,
  tn as ins,
  en as isindex,
  nn as kbd,
  sn as keygen,
  on as label,
  rn as legend,
  cn as li,
  cs as link,
  ln as listing,
  an as main,
  un as map,
  hn as mark,
  dn as menu,
  ls as meta,
  fn as meter,
  pn as nav,
  mn as noscript,
  yn as object,
  bn as ol,
  gn as optgroup,
  Jt as option,
  Cn as output,
  vn as p,
  wn as picture,
  kn as pre,
  En as progress,
  $n as q,
  ne as reusable,
  Sn as rp,
  xn as rt,
  Dn as ruby,
  On as s,
  An as samp,
  In as script,
  Pn as section,
  jn as select,
  Tn as shadow,
  Ln as small,
  as as source,
  Mn as spacer,
  Vn as span,
  Nn as strong,
  _n as style,
  qn as sub,
  Bn as summary,
  Fn as sup,
  Hn as table,
  zn as tbody,
  Un as td,
  Wn as template,
  Xt as textarea,
  Xn as tfoot,
  Gn as th,
  Jn as thead,
  Kn as time,
  Qn as title,
  Zn as tr,
  us as track,
  Yn as u,
  Rn as ul,
  ts as video,
  hs as wbr
};
