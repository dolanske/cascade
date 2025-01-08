var q = Object.defineProperty;
var H = (t, e, n) => e in t ? q(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => H(t, typeof e != "symbol" ? e + "" : e, n);
import { isRef as z, watch as h, toValue as p, effectScope as D } from "@vue/reactivity";
const F = /* @__PURE__ */ new Set(), B = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), N = "abcdefghiklmnopqrstuvwxyz".split("");
function U(t) {
  const e = t ? N : B;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += e[Math.floor(Math.random() * e.length)];
  return n;
}
function W(t = !1) {
  let e = "";
  for (; e.length === 0 || F.has(e); )
    e = U(t);
  return e;
}
function C(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function w(t) {
  return t == null;
}
function d(t) {
  return Array.isArray(t);
}
function X(t) {
  return typeof t == "function";
}
function f(t) {
  return z(t) || X(t);
}
function Gt(t) {
  return Object.hasOwn(t, "__instance") ? Reflect.get(t, "__instance") : null;
}
const $ = {
  immediate: !0,
  deep: !0
};
function j(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function G(t) {
  function e(n) {
    if (!(n instanceof y))
      return;
    n.$runOnDestroy();
    const { children: s } = n;
    if (s instanceof y)
      e(s);
    else if (d(s))
      for (const o of s)
        o instanceof y && e(o);
  }
  e(t), t.$runOnDestroy(), t.$closeScopes(), t.el.remove();
}
function v(t, e, n) {
  if (C(e)) {
    Object.entries(e).forEach(([s, o]) => {
      v(t, s, o);
    });
    return;
  }
  w(n) ? t.setAttribute(e, "") : typeof n == "boolean" ? n ? t.setAttribute(e, "") : t.removeAttribute(e) : t.setAttribute(e, String(n));
}
function J(t) {
  return this.onInit(() => {
    if (f(t)) {
      const e = h(() => p(t), (n) => v(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(e);
    } else
      v(this.el, t);
  }), this;
}
function Q(t, e) {
  return this.onInit(() => {
    if (f(e)) {
      const n = h(() => p(e), (s) => v(this.el, t, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      v(this.el, t, e);
  }), this;
}
function Z(t, e) {
  if (C(t) && !w(e))
    throw new TypeError("Cannot use object notation with second argument.");
  let n = "";
  const s = /* @__PURE__ */ Object.create(null), o = (l) => {
    for (const a of Object.keys(l))
      l[a] ? this.el.classList.add(a) : this.el.classList.remove(a);
  }, i = (l) => {
    if (l)
      if (typeof l == "string")
        n && this.el.classList.remove(n), n = l, this.el.classList.add(n);
      else if (d(l)) {
        const a = l.length;
        for (let m = 0; m < a; m++) {
          const k = l[m];
          if (k)
            typeof k == "string" ? (this.el.classList.add(k), s[m] = k) : C(l) && o(k);
          else {
            const E = s[m];
            E && (this.el.classList.remove(E), s[m] = null);
          }
        }
      } else C(l) && o(l);
  }, r = (l, a) => {
    f(a) ? this.onDestroy(h(() => p(a), (m) => {
      i({ [l]: m });
    }, $)) : l && a !== !1 && i(l);
  }, u = (l) => {
    for (const [a, m] of Object.entries(l))
      r(a, m);
  };
  return C(t) ? u(t) : typeof t == "string" && r(t, e), this;
}
function Y(t) {
  return this.attr("disabled", t), this;
}
function K(t, e, n = {
  bubbles: !0
}) {
  return this.el.dispatchEvent(new CustomEvent(t, {
    detail: e,
    ...n
  })), this;
}
function R(t, e, n) {
  const s = Array.from(t.childNodes).at(n);
  return s ? (t.replaceChild(e, s), !0) : !1;
}
function g(t, e, n) {
  const s = t instanceof Element ? t : t.el;
  if (e) {
    if (typeof e == "string" || typeof e == "number")
      if (w(n))
        s.innerHTML = String(e);
      else {
        const o = document.createTextNode(String(e));
        R(s, o, n) || s.appendChild(o);
      }
    else if (e instanceof O)
      g(s, e.componentChildren);
    else if (e instanceof Element)
      s.appendChild(e);
    else if (e instanceof y)
      t instanceof y && (e.parent = t), s.appendChild(e.el), e.$runOnInit(), g(e, e.componentChildren), e.$runOnMount();
    else if (Array.isArray(e)) {
      const o = e.length;
      for (let i = 0; i < o; i++) {
        const r = e[i];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? g(s, r, i) : r instanceof O ? g(s, r.componentChildren) : f(r) || (t instanceof y && (r.parent = t), s.appendChild(r.el), r.$runOnInit(), g(r, r.componentChildren), r.$runOnMount());
      }
    }
  }
}
function tt(t, e) {
  const n = (s) => {
    const o = [];
    if (d(s)) {
      const i = s.length;
      for (let r = 0; r < i; r++) {
        const u = e(s[r], r);
        u && o.push(u);
      }
    } else if (C(s)) {
      const i = Object.keys(s), r = i.length;
      for (let u = 0; u < r; u++) {
        const l = i[u], a = e(Reflect.get(s, l), l, u);
        a && o.push(a);
      }
    } else if (typeof s == "number")
      for (let i = 0; i < s; i++) {
        const r = e(i);
        r && o.push(r);
      }
    this.el.replaceChildren(), g(this.el, o);
  };
  return this.onInit(() => {
    if (f(t)) {
      const s = h(() => p(t), (o) => {
        n(o);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function b(t, e) {
  const n = (s) => {
    Reflect.set(this.el, t, s);
  };
  if (f(e)) {
    n(p(e));
    const s = h(() => p(e), (o) => {
      n(o);
    }, $);
    this.onDestroy(s);
  } else
    n(e);
}
function et(t) {
  return b.call(this, "innerHTML", t), this;
}
function nt(t) {
  return b.call(this, "id", t), this;
}
function st(t) {
  const e = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (o) => {
      o ? n.el.insertBefore(this.el, e) : this.el.remove();
    };
    if (n.el.insertBefore(e, this.el), f(t)) {
      const o = h(() => p(t), s, $);
      this.onDestroy(o);
    } else
      s(t);
  }), this;
}
const ot = (t) => Number(t), it = (t) => t.trim(), rt = (t) => t.toString().toUpperCase(), ct = (t) => t.toString().toUpperCase();
function lt(t) {
  return t.split("\\s+").map((e) => j(e)).join("\\s+");
}
const ut = (t) => j(t);
function at(t) {
  return (e) => e.substring(0, t);
}
const Jt = {
  trim: it,
  number: ot,
  uppercase: rt,
  lowercase: ct,
  truncate: at,
  capitalize: ut,
  capitalizeAll: lt
};
function I(t, e) {
  return !e || e.length === 0 ? t : e.reduce((n, s) => s(n), t);
}
function T(t, e, n) {
  d(t.value) ? t.value.includes(e) ? t.value.splice(t.value.indexOf(e), 1) : t.value.push(e) : n ? t.value = e : t.value = null;
}
function A(t, e) {
  (!t.value || d(t.value) && t.value.length === 0) && e.hasAttribute("checked") && (T(t, e.value, !0), e.removeAttribute("checked"));
}
function ht(t, e = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = h(t, (o) => {
              o === n.value || d(o) && o.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { checked: i, value: r } = o.target;
              T(t, r, i);
            }, e.eventOptions), A(t, n);
            break;
          }
          case "radio": {
            const n = this.el, s = h(t, (o) => {
              n.checked = o === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (o) => {
              const { value: i, checked: r } = o.target;
              r && (t.value = i);
            }, e.eventOptions), A(t, n);
            break;
          }
          default: {
            const n = this.el, s = h(t, (o) => {
              n.value = String(o);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(e.lazy ? "change" : "input", (o) => {
              let i = o.target.value;
              i = I(i, e.transforms), t.value = i;
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
          r = I(r, e.transforms), t.value = r;
        }, e.eventOptions);
        const o = d(t.value) ? t.value[0] : t.value;
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
        const o = d(t.value) ? t.value[0] : t.value;
        n.open = !!o;
        break;
      }
      default:
        this.prop("modelValue", t);
    }
  }), this;
}
function pt(t, ...e) {
  const n = d(t) ? t.concat(e) : [t].concat(e);
  return this.$setComponentChildren(n), this;
}
function dt(t) {
  return (e, n) => typeof t != "number" ? !0 : Date.now() - n.lastCall >= t;
}
function ft(t) {
  return () => new Promise((e) => {
    setTimeout(() => e(!0), t);
  });
}
const mt = (t, e) => e.executedTimes === 0, yt = (t) => (t.stopPropagation(), !0), bt = (t) => (t.stopImmediatePropagation(), !0), gt = (t) => (t.preventDefault(), !0), Ct = () => !1, Qt = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (t) => () => !!p(t),
  throttle: dt,
  once: mt,
  stop: yt,
  stopImmediate: bt,
  prevent: gt,
  cancel: Ct,
  delay: ft
};
function kt(t, e, n = {}) {
  const s = {
    executedTimes: 0,
    lastCall: 0
  };
  async function o(i) {
    if (n.modifiers) {
      for (const r of n.modifiers)
        if (!await r(i, s))
          return;
    }
    e(i, "detail" in i ? i.detail : void 0), s.executedTimes++, s.lastCall = Date.now();
  }
  return this.onMount(() => {
    this.el.addEventListener(t, o, n.options);
  }), this.onDestroy(() => {
    this.el.removeEventListener(t, o);
  }), this;
}
function wt(t, e) {
  return this.on("click", t, e);
}
function vt(t, e) {
  return this.on("submit", t, e);
}
function $t(t, e) {
  return this.on("focus", t, e);
}
function Et(t, e) {
  return this.on("blur", t, e);
}
function St(t, e) {
  return this.on("change", t, e);
}
function Ot(t, e) {
  return this.on("input", t, e);
}
function x(t, e, n, s) {
  const o = [];
  function i(u) {
    o.push(u), o.length > e.length && o.shift();
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
        i(l), r.every((k, E) => k === o[E]) && a();
        break;
      }
    }
  }, s);
}
function xt(t, e) {
  return this.on("keydown", t, e);
}
function Dt(t, e, n) {
  return x.call(this, "keydown", t, e, n), this;
}
function It(t, e) {
  return this.on("keyup", t, e);
}
function At(t, e, n) {
  return x.call(this, "keyup", t, e, n), this;
}
function Pt(t, e) {
  return this.on("keyup", t, e);
}
function jt(t, e, n) {
  return x.call(this, "keypress", t, e, n), this;
}
function Tt(t) {
  return this.onMount(() => {
    const e = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? w(e) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", e) : this.el.style.setProperty("display", "none");
    };
    if (f(t)) {
      const s = h(() => p(t), n, $);
      this.onDestroy(s);
    } else
      n(t);
  }), this;
}
function Lt(t, e) {
  const n = (s) => {
    if (!C(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const o = Object.keys(s);
    for (const i of o)
      this.el.style.setProperty(i, Reflect.get(s, i));
  };
  if (typeof t == "string")
    if (f(e)) {
      const s = h(() => p(e), (o) => {
        n({ [t]: o });
      });
      this.onDestroy(s);
    } else e && n({ [t]: e });
  else if (f(t))
    if (e)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = h(() => p(t), n, $);
      this.onDestroy(s);
    }
  else if (C(t)) {
    const s = Object.keys(t);
    for (const o of s) {
      const i = Reflect.get(t, o);
      if (f(i)) {
        const r = h(() => p(i), (u) => {
          w(u) || this.el.style.setProperty(o, String(u));
        });
        this.onDestroy(r);
      } else w(i) || this.el.style.setProperty(o, String(i));
    }
  }
  return this;
}
function Mt(t) {
  return b.call(this, "textContent", t), this;
}
class y {
  constructor(e, n) {
    /**
     * Set `textContent` of the current component.
     */
    c(this, "text", Mt);
    /**
     * Set `innerHTML` of the current component.
     */
    c(this, "html", et);
    /**
     * Add an event listener to the current component.
     *
     * @param on {keyof HTMLElementEventMap} Event name
     * @param listener {EventListenerOrEventListenerObject} Function which runs on event trigger
     * @param options {EventListenerOptions | undefined} Optional event configuration
     *
     */
    c(this, "on", kt);
    /**
     * Shorthand for binding `on("click")` event listener to the current component.
     */
    c(this, "click", wt);
    /**
     * Shorthand for binding `on("submit")` event listener to the current component.
     */
    c(this, "submit", vt);
    /**
     * Shorthand for binding `on("focus")` event listener to the current component.
     */
    c(this, "focus", $t);
    /**
     * Shorthand for binding `on("blur")` event listener to the current component.
     */
    c(this, "blur", Et);
    /**
     * Shorthand for binding `on("change")` event listener to the current component.
     */
    c(this, "change", St);
    /**
     * Shorthand for binding `on("input")` event listener to the current component.
     */
    c(this, "input", Ot);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current component.
     */
    c(this, "keydown", xt);
    /**
     * Shorthand for binding `on("keydown")` event listener to the current
     * component and listening for specific keys to be pressed down.
     *
     * ```
     * Component.keydownExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keydownExact", Dt);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current component.
     */
    c(this, "keyup", It);
    /**
     * Shorthand for binding `on("keyup")` event listener to the current
     * component and listening for specific keys to be released.
     *
     * ```
     * Component.keyupExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keyupExact", At);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current component.
     */
    c(this, "keypress", Pt);
    /**
     * Shorthand for binding `on("keypress")` event listener to the current
     * component and listening for specific keys to be pressed.
     *
     * ```
     * Component.keypressExact(["Shift", "T"], () => ...)
     * ```
     */
    c(this, "keypressExact", jt);
    /**
     * Bind reactive class object to the current component.
     */
    c(this, "class", Z);
    /**
     * Simple helper which allows you to insert component's children anywhere in
     * the chain. This was made mainly because it feels less natural to add
     * children to a component and only then use methods like `if` or `for` on it.
     */
    c(this, "nest", pt);
    /**
     * Two way binding of a reactive variable to the inputs / selects value.
     */
    c(this, "model", ht);
    /**
     * Bind attribute object to the component.
     */
    c(this, "attrs", J);
    /**
     * Bind a single attribute to the component.
     */
    c(this, "attr", Q);
    /**
     * Dynamically bind a `disabled` attribute to the component.
     */
    c(this, "disabled", Y);
    /**
     * Dynamically bind an `id` attribute to the component.
     */
    c(this, "id", nt);
    /**
     * Toggle between showing or hiding the current component. the component is still
     * rendered, but has `display: none` applied to it.
     *
     * This function also preserves the previously added inline styles.
     */
    c(this, "show", Tt);
    /**
     * Add reactive styling object to the current component.
     */
    c(this, "style", Lt);
    /**
     * Conditionally render a component.
     */
    c(this, "if", st);
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
    c(this, "$dynamicChildrenStopper", []);
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
    c(this, "for", tt);
    /**
     * Emit a custom event which parent components can listen for. Additionally,
     * you can provide data which should be sent along.
     *
     * @param eventName Your custom event name
     * @param data Any kind of data to be sent
     */
    c(this, "emit", K);
    this.el = e, Object.defineProperty(this.el, "__instance", this), this.$componentProps = n ?? {}, this.identifier = W(!0);
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
      const n = D();
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
    this.root = n, this.isRoot = !0, n.appendChild(this.el), this.$rerunSetup(), this.$runOnInit(), g(this, this.componentChildren), this.$runOnMount();
  }
  /**
   * Removes component from the DOM, deactivates its instance and removes all reactive scopes.
   */
  destroy() {
    G(this), this.$dynamicChildrenStopper.forEach((e) => e());
  }
  /**
   * Clones the component. All reactive variables, DOM child nodes and chained
   * functions should work. Cloning does not reassign the component back to the
   * DOM, so it must be re-inserted.
   *
   * @returns Cloned component
   */
  clone() {
    const e = new y(this.el);
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
      const n = D();
      n.run(() => {
        e(this, this.$componentProps);
      }), this.onDestroy(() => {
        n.stop();
      });
    }), this;
  }
}
class S extends y {
  constructor(e) {
    super(document.createElement(e));
  }
  $setComponentChildren(e) {
    this.componentChildren = [];
  }
}
class O extends y {
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
function Vt(t = [], ...e) {
  const n = d(t) ? t.concat(e) : [t].concat(e);
  return new O(n);
}
class _t extends S {
  constructor(n) {
    super("img");
    c(this, "el");
    this.el = n;
  }
  src(n) {
    return b.call(this, "src", n), this;
  }
  alt(n) {
    return b.call(this, "alt", n), this;
  }
}
function qt(t) {
  const e = document.createElement("img"), n = new _t(e);
  return t && n.src(t), n;
}
class L extends S {
  constructor(n, s) {
    super();
    c(this, "el");
    this.el = n, this.el instanceof HTMLInputElement && s && (this.el.type = s);
  }
  type(n) {
    this.el.type = n;
  }
  value(n) {
    return b.call(this, "value", n), this;
  }
  placeholder(n) {
    return b.call(this, "placeholder", n), this;
  }
  name(n) {
    return b.call(this, "name", n), this;
  }
  required(n) {
    return b.call(this, "required", n), this;
  }
}
function Ht(t = "text") {
  const e = document.createElement("input");
  return new L(e, t);
}
function zt() {
  const t = document.createElement("textarea");
  return new L(t);
}
class Ft extends S {
  constructor(e, n) {
    if (super("option"), n) {
      const s = p(n);
      this.el.value = String(s), this.el.textContent = String(s), f(n) && this.value(n);
    }
    e && (this.el.textContent = String(e));
  }
  value(e) {
    return b.call(this, "value", e), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function Bt(t, e) {
  return new Ft(t, e);
}
const Nt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "video"], M = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], V = Nt.reduce((t, e) => (t[e] = (n = [], ...s) => {
  const o = document.createElement(e), i = new y(o), r = d(n) ? n.concat(s) : [n].concat(s);
  return i.$setComponentChildren(r), i.children = r, i;
}, t), {}), _ = M.reduce((t, e) => (t[e] = () => {
  const n = new S(e);
  return n.isVoid = !0, n;
}, t), {}), P = Object.assign(V, _, {
  fragment: Vt,
  input: Ht,
  textarea: zt,
  option: Bt,
  img: qt
}), Ut = [
  ...M,
  "input",
  "textarea",
  "option"
];
function Zt(t, e) {
  return (n = [], ...s) => {
    const o = d(n) ? n.concat(s) : [n].concat(s), i = Ut.includes(t) ? P[t]() : P[t](o);
    return i.setup(e), i;
  };
}
const {
  a: Yt,
  abbr: Kt,
  address: Rt,
  applet: te,
  article: ee,
  aside: ne,
  audio: se,
  b: oe,
  basefont: ie,
  bdi: re,
  bdo: ce,
  bgsound: le,
  blink: ue,
  blockquote: ae,
  body: he,
  button: pe,
  canvas: de,
  caption: fe,
  cite: me,
  code: ye,
  colgroup: be,
  content: ge,
  data: Ce,
  datalist: ke,
  dd: we,
  decorator: ve,
  del: $e,
  details: Ee,
  dfn: Se,
  div: Oe,
  dl: xe,
  dt: De,
  element: Ie,
  em: Ae,
  fieldset: Pe,
  figcaption: je,
  figure: Te,
  footer: Le,
  form: Me,
  h1: Ve,
  h2: _e,
  h3: qe,
  h4: He,
  h5: ze,
  h6: Fe,
  head: Be,
  header: Ne,
  hgroup: Ue,
  html: We,
  i: Xe,
  iframe: Ge,
  ins: Je,
  isindex: Qe,
  kbd: Ze,
  keygen: Ye,
  label: Ke,
  legend: Re,
  li: tn,
  listing: en,
  main: nn,
  map: sn,
  mark: on,
  menu: rn,
  meter: cn,
  nav: ln,
  noscript: un,
  object: an,
  ol: hn,
  optgroup: pn,
  output: dn,
  p: fn,
  picture: mn,
  pre: yn,
  progress: bn,
  q: gn,
  rp: Cn,
  rt: kn,
  ruby: wn,
  s: vn,
  samp: $n,
  script: En,
  section: Sn,
  select: On,
  shadow: xn,
  small: Dn,
  spacer: In,
  span: An,
  strong: Pn,
  style: jn,
  sub: Tn,
  summary: Ln,
  sup: Mn,
  table: Vn,
  tbody: _n,
  td: qn,
  template: Hn,
  tfoot: zn,
  th: Fn,
  thead: Bn,
  time: Nn,
  title: Un,
  tr: Wn,
  u: Xn,
  ul: Gn,
  video: Jn
} = V, {
  area: Qn,
  base: Zn,
  br: Yn,
  col: Kn,
  embed: Rn,
  hr: ts,
  link: es,
  meta: ns,
  source: ss,
  track: os,
  wbr: is
} = _;
export {
  y as Component,
  Qt as Modifier,
  Jt as Transform,
  Yt as a,
  Kt as abbr,
  Rt as address,
  te as applet,
  Qn as area,
  ee as article,
  ne as aside,
  se as audio,
  oe as b,
  Zn as base,
  ie as basefont,
  re as bdi,
  ce as bdo,
  le as bgsound,
  ue as blink,
  ae as blockquote,
  he as body,
  Yn as br,
  pe as button,
  de as canvas,
  fe as caption,
  me as cite,
  ye as code,
  Kn as col,
  be as colgroup,
  ge as content,
  W as createId,
  Ce as data,
  ke as datalist,
  we as dd,
  ve as decorator,
  $e as del,
  Ee as details,
  Se as dfn,
  Oe as div,
  xe as dl,
  De as dt,
  Ie as element,
  Ae as em,
  Rn as embed,
  Pe as fieldset,
  je as figcaption,
  Te as figure,
  Le as footer,
  Me as form,
  Vt as fragment,
  Gt as getInstance,
  Ve as h1,
  _e as h2,
  qe as h3,
  He as h4,
  ze as h5,
  Fe as h6,
  Be as head,
  Ne as header,
  Ue as hgroup,
  ts as hr,
  We as html,
  Xe as i,
  Ge as iframe,
  qt as img,
  Ht as input,
  Je as ins,
  Qe as isindex,
  Ze as kbd,
  Ye as keygen,
  Ke as label,
  Re as legend,
  tn as li,
  es as link,
  en as listing,
  nn as main,
  sn as map,
  on as mark,
  rn as menu,
  ns as meta,
  cn as meter,
  ln as nav,
  un as noscript,
  an as object,
  hn as ol,
  pn as optgroup,
  Bt as option,
  dn as output,
  fn as p,
  mn as picture,
  yn as pre,
  bn as progress,
  gn as q,
  Zt as reusable,
  Cn as rp,
  kn as rt,
  wn as ruby,
  vn as s,
  $n as samp,
  En as script,
  Sn as section,
  On as select,
  xn as shadow,
  Dn as small,
  ss as source,
  In as spacer,
  An as span,
  Pn as strong,
  jn as style,
  Tn as sub,
  Ln as summary,
  Mn as sup,
  Vn as table,
  _n as tbody,
  qn as td,
  Hn as template,
  zt as textarea,
  zn as tfoot,
  Fn as th,
  Bn as thead,
  Nn as time,
  Un as title,
  Wn as tr,
  os as track,
  Xn as u,
  Gn as ul,
  Jn as video,
  is as wbr
};
