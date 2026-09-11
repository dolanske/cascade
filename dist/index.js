var Vt = Object.defineProperty;
var Bt = (e, t, n) => t in e ? Vt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var d = (e, t, n) => Bt(e, typeof t != "symbol" ? t + "" : t, n);
import { isRef as Dt, watch as m, toValue as y, effectScope as J, markRaw as jt } from "@vue/reactivity";
function T(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function P(e) {
  return e == null;
}
function k(e) {
  return Array.isArray(e);
}
function pt(e) {
  return typeof e == "function";
}
function $(e) {
  return Dt(e) || pt(e);
}
function mt(e) {
  const t = typeof e;
  return t === "string" || t === "number" || t === "bigint";
}
function z(e) {
  return e == null || typeof e == "boolean";
}
const yt = /* @__PURE__ */ new WeakMap();
function Pt(e, t) {
  yt.set(e, t);
}
function Oe(e) {
  return yt.get(e) ?? null;
}
const v = {
  immediate: !0,
  deep: !1
}, D = {
  immediate: !0,
  deep: 1
};
function Lt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ot = /* @__PURE__ */ new Set();
function I(e, ...t) {
  ot.has(e) || (ot.add(e), console.warn(...t));
}
function _(e, t, n) {
  P(n) || n === !0 ? e.setAttribute(t, "") : n === !1 ? e.removeAttribute(t) : e.setAttribute(t, String(n));
}
function qt(e) {
  this.onInit(() => {
    const t = this.el;
    if (!$(e)) {
      for (const s of Object.keys(e))
        _(t, s, e[s]);
      return;
    }
    let n = [];
    m(() => y(e), (s) => {
      const i = Object.keys(s ?? {});
      for (const r of n)
        i.includes(r) || t.removeAttribute(r);
      for (const r of i)
        _(t, r, s[r]);
      n = i;
    }, D);
  });
}
function lt(e, t) {
  this.onInit(() => {
    $(t) ? m(() => y(t), (n) => _(this.el, e, n), v) : _(this.el, e, t);
  });
}
function q(e, t = /* @__PURE__ */ new Set()) {
  if (!e)
    return t;
  if (typeof e == "string")
    for (const n of e.split(/\s+/))
      n && t.add(n);
  else if (k(e))
    for (const n of e)
      q(n, t);
  else if (T(e))
    for (const n of Object.keys(e))
      y(e[n]) && q(n, t);
  return t;
}
function ct(e, t, n) {
  for (const s of t)
    n.has(s) || e.classList.remove(s);
  for (const s of n)
    t.has(s) || e.classList.add(s);
}
function ut(e, t, n) {
  const s = q(t), i = (r) => {
    for (const o of s)
      r ? e.classList.add(o) : e.classList.remove(o);
  };
  $(n) ? m(() => y(n), (r) => i(!!r), v) : i(!!n);
}
function Nt(e, t) {
  if (T(e) && !k(e) && !$(e) && t !== void 0)
    throw new TypeError("[cascade] `.class()` can not combine object notation with a second argument.");
  this.onInit(() => {
    const n = this.el;
    if (typeof e == "string" && t !== void 0) {
      ut(n, e, t);
      return;
    }
    if ($(e)) {
      let s = /* @__PURE__ */ new Set();
      m(() => q(y(e)), (i) => {
        ct(n, s, i), s = i;
      }, v);
      return;
    }
    if (T(e) && !k(e)) {
      for (const s of Object.keys(e))
        ut(n, s, e[s]);
      return;
    }
    ct(n, /* @__PURE__ */ new Set(), q(e));
  });
}
function Ot(e, t, n = {}) {
  this.el.dispatchEvent(new CustomEvent(e, {
    bubbles: !0,
    ...n,
    detail: t
  }));
}
const L = /* @__PURE__ */ new Set(), bt = Promise.resolve();
let F = null, Q = !1;
const Rt = 1e4;
function gt() {
  Q = !0;
  let e = 0;
  try {
    for (const t of L) {
      if (L.delete(t), ++e > Rt) {
        console.warn("[cascade] Infinite update loop detected. A reactive effect keeps triggering itself.");
        break;
      }
      try {
        t();
      } catch (n) {
        console.error("[cascade] Error while flushing a render job", n);
      }
    }
  } finally {
    L.clear(), Q = !1, F = null;
  }
}
function zt(e) {
  L.add(e), !(Q || F) && (F = bt.then(gt));
}
function Re(e) {
  const t = F ?? bt;
  return e ? t.then(e) : t;
}
function ze() {
  L.size > 0 && gt();
}
const X = (e, t) => {
  t ? e() : zt(e);
}, R = [];
let $t = 0;
function kt(e) {
  R.push(e);
}
function Ct() {
  $t++;
}
function wt() {
  if (!(--$t > 0 || R.length === 0))
    for (; R.length > 0; ) {
      const e = R.splice(0);
      for (const t of e)
        t.$mount();
    }
}
function N(e, t = []) {
  if (k(e))
    for (const n of e)
      N(n, t);
  else
    t.push(e);
  return t;
}
function _t(e, t, n) {
  const s = e.last();
  let i = e.first();
  for (; i; ) {
    const r = i === s ? null : i.nextSibling;
    t.insertBefore(i, n), i = r;
  }
}
function Ft(e, t) {
  var s;
  let n = e;
  for (; n; ) {
    const i = n === t ? null : n.nextSibling;
    (s = n.parentNode) == null || s.removeChild(n), n = i;
  }
}
function j(e, t = null) {
  return {
    text: t,
    first: () => e,
    last: () => e,
    destroy(n) {
      var s;
      n && ((s = e.parentNode) == null || s.removeChild(e));
    }
  };
}
function Z(e, t, n, s) {
  Ct();
  try {
    return Y(e, t, n, s);
  } finally {
    wt();
  }
}
function Y(e, t, n, s) {
  if (z(e)) {
    const r = document.createTextNode("");
    return n.insertBefore(r, s), j(r, r);
  }
  if (mt(e)) {
    const r = document.createTextNode(String(e));
    return n.insertBefore(r, s), j(r, r);
  }
  if (e instanceof A)
    return at(e, t, n, s);
  if (e instanceof Node)
    return n.insertBefore(e, s), j(e);
  if ($(e))
    return Ut(e, t, n, s);
  if (k(e))
    return at(new K(e), t, n, s);
  I("unknown-child", "[cascade] Unsupported child value, rendering nothing:", e);
  const i = document.createTextNode("");
  return n.insertBefore(i, s), j(i, i);
}
function xt(e, t, n) {
  const s = N(e.componentChildren), i = s.length;
  for (let r = 0; r < i; r++) {
    const o = s[r];
    z(o) || e.$blocks.push(Y(o, e, t, n));
  }
}
function at(e, t, n, s) {
  if (e.$initialized) {
    I(`remount-${e.identifier}`, "[cascade] A component instance can only be rendered once. Create a new instance instead of reusing", e);
    const i = document.createTextNode("");
    return n.insertBefore(i, s), j(i, i);
  }
  return e.parent = t instanceof K ? t.parent : t, e instanceof K ? Kt(e, n, s) : (e.$prepare(), e.$scope.run(() => {
    e.$init(), xt(e, e.el, null);
  }), e.$anchor && n.insertBefore(e.$anchor, s), e.$visible ? n.insertBefore(e.el, s) : e.$scope.pause(), kt(e), {
    text: null,
    first: () => e.$anchor ?? e.el,
    last: () => e.$visible ? e.el : e.$anchor,
    destroy: (i) => e.$destroy(i)
  });
}
function Kt(e, t, n) {
  const s = e.$start, i = e.$end;
  return t.insertBefore(s, n), t.insertBefore(i, n), e.$prepare(), e.$scope.run(() => {
    e.$init(), xt(e, t, i);
  }), kt(e), {
    text: null,
    first: () => s,
    last: () => i,
    destroy(r) {
      e.$destroy(!1), r && Ft(s, i);
    }
  };
}
function Ut(e, t, n, s) {
  const i = document.createTextNode(""), r = document.createTextNode("");
  n.insertBefore(i, s), n.insertBefore(r, s);
  let o = [];
  const l = m(() => y(e), (u) => {
    const c = r.parentNode;
    if (c) {
      Ct();
      try {
        o = Wt(o, N(u), t, c, r);
      } finally {
        wt();
      }
    }
  }, { immediate: !0, deep: 1, scheduler: X });
  return {
    text: null,
    first: () => i,
    last: () => r,
    destroy(u) {
      l();
      for (const c of o)
        c.block.destroy(u);
      o = [], u && (i.remove(), r.remove());
    }
  };
}
function Wt(e, t, n, s, i) {
  const r = /* @__PURE__ */ new Map();
  for (const c of e)
    if (c.key !== void 0) {
      if (r.has(c.key))
        continue;
      r.set(c.key, c);
    }
  const o = /* @__PURE__ */ new Set(), l = [], u = t.length;
  for (let c = 0; c < u; c++) {
    const f = t[c], p = f instanceof A ? f.$key : void 0;
    let b;
    if (p !== void 0) {
      const a = r.get(p);
      a && !o.has(a) ? b = a : a && I("duplicate-key", `[cascade] Duplicate key "${String(p)}" in a children list. Keys must be unique.`);
    } else {
      const a = e[c];
      a && a.key === void 0 && !o.has(a) && (a.item === f ? b = a : a.block.text && (mt(f) || z(f)) && (a.block.text.data = z(f) ? "" : String(f), a.item = f, b = a));
    }
    b ? (o.add(b), l.push(b)) : l.push({ key: p, item: f, block: null });
  }
  for (const c of e)
    o.has(c) || c.block.destroy(!0);
  return vt(e, l, s, i, (c, f) => Y(c.item, n, s, f)), l;
}
function vt(e, t, n, s, i) {
  const r = /* @__PURE__ */ new Map();
  for (let a = 0; a < e.length; a++)
    r.set(e[a], a);
  const o = t.length, l = Array.from({ length: o }, () => 0);
  let u = !1, c = 0;
  for (let a = 0; a < o; a++) {
    const C = r.get(t[a]);
    C !== void 0 && (l[a] = C + 1, C + 1 < c ? u = !0 : c = C + 1);
  }
  const f = u ? Ht(l) : [];
  let p = f.length - 1, b = s;
  for (let a = o - 1; a >= 0; a--) {
    const C = t[a];
    l[a] === 0 ? C.block = i(C, b) : u && (p < 0 || a !== f[p] ? _t(C.block, n, b) : p--), b = C.block.first();
  }
}
function Ht(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const c = e[s];
    if (c !== 0) {
      if (i = n[n.length - 1], e[i] < c) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        l = r + o >> 1, e[n[l]] < c ? r = l + 1 : o = l;
      c < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
function Jt(e, t) {
  const n = [];
  if (k(e)) {
    const s = e.length;
    for (let i = 0; i < s; i++)
      n.push({ item: e[i], args: [e[i], i], defaultKey: void 0 });
    return { items: n, usesIndex: t.length >= 2 };
  }
  if (typeof e == "number") {
    for (let s = 0; s < e; s++)
      n.push({ item: s, args: [s], defaultKey: s });
    return { items: n, usesIndex: !1 };
  }
  if (T(e)) {
    const s = Object.keys(e), i = s.length;
    for (let r = 0; r < i; r++) {
      const o = s[r], l = Reflect.get(e, o);
      n.push({ item: l, args: [l, o, r], defaultKey: o });
    }
    return { items: n, usesIndex: t.length >= 3 };
  }
  return { items: n, usesIndex: !1 };
}
function Qt(e, t, n = {}) {
  const s = n.key;
  let i = [];
  this.$setComponentChildren([]);
  const r = (l) => {
    let u = !0;
    l.stop = m(() => t(...l.args), (c) => {
      if (u) {
        u = !1, l.pending = c;
        return;
      }
      const f = l.block;
      if (!f)
        return;
      const p = f.first().parentNode;
      p && (l.block = Z(c, this, p, f.first()), f.destroy(!0));
    }, { immediate: !0, scheduler: X });
  }, o = (l) => {
    var tt, et, nt, st;
    const { items: u, usesIndex: c } = Jt(l, t), f = /* @__PURE__ */ new Map(), p = k(l) && !s ? /* @__PURE__ */ new Map() : null;
    for (const h of i)
      if (f.set(h.key, h), p) {
        const w = p.get(h.item);
        w ? w.push(h) : p.set(h.item, [h]);
      }
    const b = /* @__PURE__ */ new Set(), a = (h, w, M) => !!h && !b.has(h) && Object.is(h.item, w) && (!c || h.index === M), C = /* @__PURE__ */ new Set(), O = [], Mt = u.length;
    for (let h = 0; h < Mt; h++) {
      const { item: w, args: M, defaultKey: it } = u[h], E = { key: h, item: w, args: M, index: h, block: null, stop: null, pending: void 0 };
      let x, rt = !0;
      if (s)
        x = s(...M);
      else if (it !== void 0)
        x = it;
      else {
        r(E);
        const V = E.pending;
        V instanceof A && V.$key !== void 0 ? x = V.$key : (x = h, rt = !1, T(w) && V instanceof A && I(`for-key-${this.identifier}`, "[cascade] `.for()` renders a list of objects without keys. Add `.key(uniqueId)` to the returned component (or pass a `key` option) so items are tracked reliably when the list changes.", this.el));
      }
      C.has(x) && (I(`for-duplicate-${this.identifier}`, `[cascade] Duplicate key "${String(x)}" in \`.for()\`. Keys must be unique, the item is re-rendered on every update.`, this.el), x = Symbol("duplicate")), C.add(x), E.key = x;
      let S = f.get(x);
      a(S, w, h) || (S = void 0, p && !rt && (S = (tt = p.get(w)) == null ? void 0 : tt.find((V) => a(V, w, h)))), S ? ((et = E.stop) == null || et.call(E), S.key = x, S.index = h, b.add(S), O.push(S)) : O.push(E);
    }
    for (const h of i)
      b.has(h) || ((nt = h.stop) == null || nt.call(h), (st = h.block) == null || st.destroy(!0));
    vt(i, O, this.el, null, (h, w) => {
      h.stop || r(h);
      const M = Z(h.pending, this, this.el, w);
      return h.pending = void 0, M;
    }), i = O;
  };
  this.onInit(() => {
    let l = null;
    $(e) ? l = m(() => y(e), (u) => {
      this.$scope.run(() => o(u));
    }, { immediate: !0, deep: 1, scheduler: X }) : o(e), this.$blocks.push({
      destroy(u) {
        var c, f;
        l == null || l();
        for (const p of i)
          (c = p.stop) == null || c.call(p), (f = p.block) == null || f.destroy(u);
        i = [];
      }
    });
  });
}
function g(e, t) {
  this.onInit(() => {
    $(t) ? m(() => y(t), (n) => {
      Reflect.set(this.el, e, n ?? "");
    }, v) : Reflect.set(this.el, e, t ?? "");
  });
}
function Xt(e) {
  g.call(this, "innerHTML", e);
}
function Zt(e) {
  g.call(this, "id", e);
}
function Gt(e) {
  this.$anchor && I(`if-twice-${this.identifier}`, "[cascade] `.if()` was called more than once on a component, only the last condition applies.", this.el), this.$anchor ?? (this.$anchor = document.createComment("if"));
  let t = null;
  this.onInit(() => {
    if (!$(e)) {
      this.$setVisible(!!e);
      return;
    }
    t = J(!0), t.run(() => {
      m(() => y(e), (n) => this.$setVisible(!!n), v);
    });
  }), this.onDestroy(() => {
    t == null || t.stop(), t = null;
  });
}
const Yt = (e) => Number(e), te = (e) => Number.parseInt(e, 10), ee = (e) => e.trim(), ne = (e) => e.toUpperCase(), se = (e) => e.toLowerCase(), ie = (e) => e.replace(/(^|\s)(\S)/g, (t, n, s) => n + s.toUpperCase()), re = (e) => Lt(e);
function oe(e) {
  return (t) => t.substring(0, e);
}
function le(e, t) {
  return (n) => Math.min(t, Math.max(e, n));
}
function ce(e, t) {
  return (n) => n.replace(e, t);
}
function ue(e) {
  return (t) => t === "" || t == null || Number.isNaN(t) ? e : t;
}
const _e = {
  trim: ee,
  number: Yt,
  integer: te,
  uppercase: ne,
  lowercase: se,
  truncate: oe,
  capitalize: re,
  capitalizeAll: ie,
  clamp: le,
  replace: ce,
  fallback: ue
};
function ht(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function It(e, t, n) {
  if (k(e.value)) {
    const s = e.value.indexOf(t);
    n && s === -1 ? e.value.push(t) : !n && s !== -1 && e.value.splice(s, 1);
  } else
    e.value = n ? t : null;
}
function ft(e, t) {
  (!e.value || k(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (It(e, t.value, !0), t.removeAttribute("checked"));
}
function ae(e, t) {
  if (!t)
    return e;
  let n;
  return (...s) => {
    clearTimeout(n), n = setTimeout(() => e(...s), t);
  };
}
function he(e, t = {}) {
  const n = (s, i) => {
    this.on(s, ae(i, t.debounce), { options: t.eventOptions });
  };
  this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const s = this.el;
            ft(e, s), m(e, (i) => {
              s.checked = i === s.value || k(i) && i.includes(s.value);
            }, D), n("change", (i) => {
              const { checked: r, value: o } = i.target;
              It(e, o, r);
            });
            break;
          }
          case "radio": {
            const s = this.el;
            ft(e, s), m(e, (i) => {
              s.checked = i === s.value;
            }, D), n("change", (i) => {
              const { value: r, checked: o } = i.target;
              o && (e.value = r);
            });
            break;
          }
          default: {
            const s = this.el;
            m(e, (i) => {
              const r = String(i ?? "");
              s.value !== r && (s.value = r);
            }, D), n(t.lazy ? "change" : "input", (i) => {
              e.value = ht(i.target.value, t.transforms);
            });
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const s = this.el, i = k(e.value) ? e.value[0] : e.value;
        if (i)
          s.value = String(i);
        else if (s.childElementCount > 0) {
          const r = Array.from(s.children).find((o) => o.hasAttribute("selected"));
          if (r) {
            r.removeAttribute("selected");
            const o = r.value;
            e.value = o, s.value = o;
          }
        }
        m(e, (r) => {
          const o = String((k(r) ? r[0] : r) ?? "");
          s.value !== o && (s.value = o);
        }, { deep: 1 }), n("change", (r) => {
          e.value = ht(r.target.value, t.transforms);
        });
        break;
      }
      case "DETAILS": {
        const s = this.el;
        m(e, (i) => {
          s.open = !!(k(i) ? i[0] : i);
        }, D), n("toggle", () => {
          e.value = s.open;
        });
        break;
      }
      default:
        this.prop("modelValue", e);
    }
  });
}
function fe(e) {
  return (t, n) => typeof e != "number" ? !0 : Date.now() - n.lastCall >= e;
}
function de(e) {
  return () => new Promise((t) => {
    setTimeout(() => t(!0), e);
  });
}
const pe = (e, t) => t.executedTimes === 0, me = (e) => (e.stopPropagation(), !0), ye = (e) => (e.stopImmediatePropagation(), !0), be = (e) => (e.preventDefault(), !0), ge = () => !1, $e = (e) => e.target === e.currentTarget, Fe = {
  /**
   * Executes event callback if the provided expression passes.
   *
   * @param expression Ref<boolean> | boolean
   * @returns EventModifier
   */
  if: (e) => () => !!y(e),
  throttle: fe,
  once: pe,
  stop: me,
  stopImmediate: ye,
  prevent: be,
  cancel: ge,
  delay: de,
  self: $e
};
function ke(e, t, n = {}) {
  const s = {
    executedTimes: 0,
    lastCall: 0
  }, i = n.modifiers, r = (l) => {
    t(l, "detail" in l ? l.detail : void 0), s.executedTimes++, s.lastCall = Date.now();
  }, o = (l) => {
    if (!i || i.length === 0)
      return r(l);
    let u = 0;
    const c = () => {
      for (; u < i.length; ) {
        const f = i[u++](l, s);
        if (f instanceof Promise)
          return f.then((p) => {
            if (p)
              return c();
          });
        if (!f)
          return;
      }
      r(l);
    };
    c();
  };
  this.onMount(() => (this.el.addEventListener(e, o, n.options), () => this.el.removeEventListener(e, o, n.options)));
}
function W(e, t, n, s) {
  const i = Array.isArray(t) ? t : [t], r = [];
  this.on(e, (o) => {
    const l = o.key;
    if ((s == null ? void 0 : s.detect) === "some") {
      i.includes(l) && n(o);
      return;
    }
    r.push(l), r.length > i.length && r.shift(), r.length === i.length && i.every((u, c) => u === r[c]) && n(o);
  }, s);
}
function Ce(e) {
  this.onInit(() => {
    const t = this.el.style.getPropertyValue("display");
    let n = !1;
    const s = (i) => {
      if (i !== !n) {
        n = !i, i ? t ? this.el.style.setProperty("display", t) : this.el.style.removeProperty("display") : this.el.style.setProperty("display", "none");
        for (const r of this.$onVisibilityCbs)
          r(i);
      }
    };
    $(e) ? m(() => y(e), (i) => s(!!i), v) : s(!!e);
  });
}
function G(e) {
  return e.startsWith("--") ? e : e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function B(e, t, n) {
  P(n) || n === "" ? e.style.removeProperty(G(t)) : e.style.setProperty(G(t), String(n));
}
function we(e, t) {
  this.onInit(() => {
    const n = this.el;
    if (typeof e == "string") {
      $(t) ? m(() => y(t), (s) => B(n, e, s), v) : B(n, e, t);
      return;
    }
    if ($(e)) {
      t !== void 0 && I("style-ref-value", "[cascade] `.style()` ignores the second argument when the first one is a ref or getter.");
      let s = [];
      m(() => y(e), (i) => {
        if (!T(i)) {
          I("style-not-object", "[cascade] `.style()` refs must resolve to a style object.", i);
          return;
        }
        const r = Object.keys(i);
        for (const o of s)
          o in i || n.style.removeProperty(G(o));
        for (const o of r)
          B(n, o, Reflect.get(i, o));
        s = r;
      }, v);
      return;
    }
    if (T(e))
      for (const s of Object.keys(e)) {
        const i = Reflect.get(e, s);
        $(i) ? m(() => y(i), (r) => B(n, s, r), v) : B(n, s, i);
      }
  });
}
function xe(e) {
  g.call(this, "textContent", e);
}
let ve = 0;
class A {
  constructor(t, n) {
    /**
     * Unique identifier of the component instance.
     */
    d(this, "identifier");
    /**
     * Reference to the DOM element of the current component.
     */
    d(this, "el");
    /**
     * Children which will be rendered inside the component. Can be replaced
     * with `.nest()`.
     */
    d(this, "componentChildren", []);
    /**
     * Children which were passed when the component was created. Use them in
     * `.nest()` to create a slot.
     *
     * ```ts
     * // Inside Wrapper component
     * ctx.nest(div(ctx.children).class('wrapper'))
     * // Using the Wrapper component
     * Wrapper(h1('Hello world'))
     * // Will render
     * <div><div><h1>"Hello world"</h1></div></div>
     * ```
     */
    d(this, "children", []);
    /**
     * Reference to the parent component instance, if there is one.
     */
    d(this, "parent", null);
    /**
     * If true, the component can not have any child components
     */
    d(this, "isVoid", !1);
    /**
     * Element the component was mounted to with `.mount()`. Only the top-most
     * component has a root element.
     */
    d(this, "root", null);
    d(this, "isRoot", !1);
    //////////////////////////////
    // Internals
    d(this, "$onInitCbs", []);
    d(this, "$onMountCbs", []);
    d(this, "$onBeforeDestroyCbs", []);
    d(this, "$onDestroyCbs", []);
    d(this, "$onVisibilityCbs", []);
    /**
     * Amount of callbacks registered before the first initialization. Anything
     * registered later (inside `setup`, `onMount`, ...) belongs to a single
     * mount and is dropped on destroy, so the component can be mounted again.
     */
    d(this, "$persisted", null);
    /**
     * Every watcher of the component lives in this scope. Destroying the
     * component stops it, `.if()` pauses it while the component is hidden.
     */
    d(this, "$scope", J(!0));
    /**
     * Rendered children. Destroyed together with the component.
     */
    d(this, "$blocks", []);
    /**
     * Placeholder which keeps the position of the component while `.if()`
     * removed it from the DOM.
     */
    d(this, "$anchor", null);
    d(this, "$visible", !0);
    d(this, "$key");
    d(this, "$initialized", !1);
    d(this, "$mounted", !1);
    d(this, "$destroyed", !1);
    d(this, "$componentProps");
    jt(this), this.el = t, Pt(t, this), this.$componentProps = n ?? {}, this.identifier = `c${(++ve).toString(36)}`;
  }
  //////////////////////////////
  // Private API
  $setComponentChildren(t) {
    this.isVoid || (this.componentChildren = N(t));
  }
  /**
   * Resets the state for a (re)mount.
   */
  $prepare() {
    this.$destroyed && (this.$scope = J(!0), this.$childrenDetached || this.el.replaceChildren()), this.$destroyed = !1, this.$visible = !0;
  }
  /**
   * Runs `onInit` callbacks. Must run inside `$scope`.
   */
  $init() {
    if (!this.$initialized) {
      this.$initialized = !0, this.$persisted = [this.$onInitCbs.length, this.$onMountCbs.length, this.$onBeforeDestroyCbs.length, this.$onDestroyCbs.length, this.$onVisibilityCbs.length];
      for (const t of this.$onInitCbs)
        t();
    }
  }
  /**
   * Runs `onMount` callbacks once the component is in the DOM.
   */
  $mount() {
    this.$mounted || this.$destroyed || (this.$mounted = !0, this.$scope.run(() => {
      for (const t of this.$onMountCbs) {
        const n = t();
        pt(n) && this.$onDestroyCbs.push(n);
      }
    }), this.$visible || (this.$scope.resume(), this.$scope.pause()));
  }
  $setVisible(t) {
    var n;
    if (t !== this.$visible && (this.$visible = t, !!((n = this.$anchor) != null && n.parentNode))) {
      t ? (this.$scope.resume(), this.$anchor.parentNode.insertBefore(this.el, this.$anchor.nextSibling)) : (this.el.remove(), this.$scope.pause());
      for (const s of this.$onVisibilityCbs)
        s(t);
    }
  }
  $destroy(t = !0) {
    var l;
    if (!this.$initialized) {
      t && this.el.remove();
      return;
    }
    for (const u of this.$onBeforeDestroyCbs)
      u();
    for (const u of this.$blocks)
      u.destroy(t && this.$childrenDetached);
    this.$blocks = [];
    for (const u of this.$onDestroyCbs)
      u();
    this.$scope.stop(), t && (this.el.remove(), (l = this.$anchor) == null || l.remove());
    const [n, s, i, r, o] = this.$persisted;
    this.$onInitCbs.length = n, this.$onMountCbs.length = s, this.$onBeforeDestroyCbs.length = i, this.$onDestroyCbs.length = r, this.$onVisibilityCbs.length = o, this.$initialized = !1, this.$mounted = !1, this.$destroyed = !0;
  }
  /**
   * True when child blocks live next to the component instead of inside
   * `el` (fragments), so they must remove their own DOM nodes.
   */
  get $childrenDetached() {
    return !1;
  }
  //////////////////////////////
  // Lifecycle
  /**
   * Executes provided callback function when the component is initialized,
   * before it is inserted into the DOM. Reactive bindings are created here.
   *
   * @param callback {function}
   */
  onInit(t) {
    return this.$onInitCbs.push(t), this;
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM. The callback can return a cleanup function which runs on destroy.
   *
   * ```ts
   * ctx.onMount(() => {
   *   const interval = setInterval(tick, 1000)
   *   return () => clearInterval(interval)
   * })
   * ```
   */
  onMount(t) {
    return this.$onMountCbs.push(t), this;
  }
  /**
   * Executes provided callback right before the component is removed from
   * the DOM, while its element is still attached.
   */
  onBeforeDestroy(t) {
    return this.$onBeforeDestroyCbs.push(t), this;
  }
  /**
   * Executes provided callback function when the component is removed from
   * the DOM and all of its watchers have been stopped.
   */
  onDestroy(t) {
    return this.$onDestroyCbs.push(t), this;
  }
  /**
   * Executes provided callback whenever `.if()` inserts or removes the
   * component.
   */
  onVisibilityChange(t) {
    return this.$onVisibilityCbs.push(t), this;
  }
  //////////////////////////////
  // Public API
  /**
   * Mounts the component in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive scopes into an otherwise static site.
   *
   * @param target Selector or element, defaults to `body`
   */
  mount(t = "body") {
    const n = typeof t == "string" ? document.querySelector(t) : t;
    if (!n)
      throw new Error("Root element does not exist");
    return this.root = n, this.isRoot = !0, Z(this, null, n, null), this;
  }
  /**
   * Removes the component from the DOM, runs destroy hooks and stops every
   * watcher. A destroyed component can be rendered again, its setup and
   * bindings are re-created.
   */
  destroy() {
    this.$destroy(!0);
  }
  /**
   * Identifies the component inside `.for()` loops and reactive children
   * lists. When the source changes, components with the same key are kept
   * and moved instead of being re-created.
   *
   * ```ts
   * ctx.for(items, item => li(item.name).key(item.id))
   * ```
   */
  key(t) {
    return this.$key = t, this;
  }
  /**
   * Pass a single prop value into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   *
   * @param key {string}
   * @param value {any}
   */
  prop(t, n) {
    return Object.assign(this.$componentProps, { [t]: n }), this;
  }
  /**
   * Pass an object of props into the component. You can also pass in refs, but
   * make sure to use the `.value` in the components, as these refs are directly
   * passed through.
   */
  props(t) {
    return Object.assign(this.$componentProps, t), this;
  }
  /**
   * Create a component scope, in which you can declare reactive variables. When
   * the component is removed from the DOM, all of the scope properties get
   * removed. This is the best way to declare reusable components.
   */
  setup(t) {
    return this.onInit(() => {
      t(this, this.$componentProps);
    }), this;
  }
  //////////////////////////////
  // Content
  /**
   * Set `textContent` of the current component.
   */
  text(t) {
    return xe.call(this, t), this;
  }
  /**
   * Set `innerHTML` of the current component.
   */
  html(t) {
    return Xt.call(this, t), this;
  }
  /**
   * Replaces the component's children. Accepts everything a component
   * factory accepts: text, components, DOM nodes, refs and getters.
   */
  nest(t, ...n) {
    return this.$setComponentChildren([t, ...n]), this;
  }
  for(t, n, s) {
    return Qt.call(this, t, n, s), this;
  }
  //////////////////////////////
  // Events
  /**
   * Add an event listener to the current component. Native events are typed
   * by their name, custom events declared on the component are typed by their
   * payload.
   *
   * @param type Event name
   * @param listener Function which runs on event trigger, receives the event and the custom event payload
   * @param config Optional listener options and modifiers
   */
  on(t, n, s) {
    return ke.call(this, t, n, s), this;
  }
  /**
   * Emit a custom event which parent components can listen for. Additionally,
   * you can provide data which should be sent along.
   *
   * @param eventName Your custom event name
   * @param args Payload to send along and optional custom event options (bubbles by default)
   */
  emit(t, ...n) {
    return Ot.call(this, t, n[0], n[1]), this;
  }
  /**
   * Shorthand for binding `on("click")` event listener to the current component.
   */
  click(t, n) {
    return this.on("click", t, n);
  }
  /**
   * Shorthand for binding `on("submit")` event listener to the current component.
   */
  submit(t, n) {
    return this.on("submit", t, n);
  }
  /**
   * Shorthand for binding `on("focus")` event listener to the current component.
   */
  focus(t, n) {
    return this.on("focus", t, n);
  }
  /**
   * Shorthand for binding `on("blur")` event listener to the current component.
   */
  blur(t, n) {
    return this.on("blur", t, n);
  }
  /**
   * Shorthand for binding `on("change")` event listener to the current component.
   */
  change(t, n) {
    return this.on("change", t, n);
  }
  /**
   * Shorthand for binding `on("input")` event listener to the current component.
   */
  input(t, n) {
    return this.on("input", t, n);
  }
  /**
   * Shorthand for binding `on("keydown")` event listener to the current component.
   */
  keydown(t, n) {
    return this.on("keydown", t, n);
  }
  /**
   * Shorthand for binding `on("keydown")` event listener to the current
   * component and listening for specific keys to be pressed down.
   *
   * ```
   * Component.keydownExact(["Shift", "T"], () => ...)
   * ```
   */
  keydownExact(t, n, s) {
    return W.call(this, "keydown", t, n, s), this;
  }
  /**
   * Shorthand for binding `on("keyup")` event listener to the current component.
   */
  keyup(t, n) {
    return this.on("keyup", t, n);
  }
  /**
   * Shorthand for binding `on("keyup")` event listener to the current
   * component and listening for specific keys to be released.
   *
   * ```
   * Component.keyupExact(["Shift", "T"], () => ...)
   * ```
   */
  keyupExact(t, n, s) {
    return W.call(this, "keyup", t, n, s), this;
  }
  /**
   * Shorthand for binding `on("keypress")` event listener to the current component.
   */
  keypress(t, n) {
    return this.on("keypress", t, n);
  }
  /**
   * Shorthand for binding `on("keypress")` event listener to the current
   * component and listening for specific keys to be pressed.
   *
   * ```
   * Component.keypressExact(["Shift", "T"], () => ...)
   * ```
   */
  keypressExact(t, n, s) {
    return W.call(this, "keypress", t, n, s), this;
  }
  /**
   * Two way binding of a reactive variable to the value of an input, select,
   * textarea or details element.
   */
  model(t, n) {
    return he.call(this, t, n), this;
  }
  //////////////////////////////
  // Attributes
  /**
   * Bind static or reactive classes.
   *
   * ```ts
   * ctx.class('btn primary')
   * ctx.class('active', isActive)
   * ctx.class({ active: isActive, large: () => size.value > 10 })
   * ctx.class(() => [theme.value, { active: isActive.value }])
   * ```
   */
  class(t, n) {
    return Nt.call(this, t, n), this;
  }
  /**
   * Add static or reactive inline styles.
   */
  style(t, n) {
    return we.call(this, t, n), this;
  }
  /**
   * Bind attribute object to the component.
   */
  attrs(t) {
    return qt.call(this, t), this;
  }
  /**
   * Bind a single attribute to the component.
   */
  attr(t, n) {
    return lt.call(this, t, n), this;
  }
  /**
   * Dynamically bind a `disabled` attribute to the component.
   */
  disabled(t = !0) {
    return lt.call(this, "disabled", t), this;
  }
  /**
   * Dynamically bind an `id` attribute to the component.
   */
  id(t) {
    return Zt.call(this, t), this;
  }
  //////////////////////////////
  // Conditional rendering
  /**
   * Toggle between showing or hiding the current component. The component is
   * still rendered, but has `display: none` applied to it.
   *
   * This function also preserves the previously added inline styles.
   */
  show(t) {
    return Ce.call(this, t), this;
  }
  /**
   * Conditionally render a component. While the condition is falsy the
   * element is removed from the DOM and the component's watchers are paused.
   * The instance is kept, so toggling back is cheap.
   */
  if(t) {
    return Gt.call(this, t), this;
  }
}
class U extends A {
  constructor(t) {
    super(t), this.isVoid = !0;
  }
  $setComponentChildren(t) {
    this.componentChildren = [];
  }
}
class K extends A {
  constructor(n = []) {
    super(document.createElement("template"));
    d(this, "$start", document.createComment(""));
    d(this, "$end", document.createComment(""));
    this.componentChildren = N(n);
  }
  get $childrenDetached() {
    return !0;
  }
  $destroy(n = !0) {
    super.$destroy(n), n && (this.$start.remove(), this.$end.remove());
  }
  if(n) {
    return I("fragment-if", "[cascade] `.if()` is not supported on fragments. Use a getter child instead: `() => condition.value && fragment(...)`"), this;
  }
}
function Ie(e = [], ...t) {
  return new K([e, ...t]);
}
class Se extends U {
  constructor() {
    super(document.createElement("img"));
  }
  src(t) {
    return g.call(this, "src", t), this;
  }
  alt(t) {
    return g.call(this, "alt", t), this;
  }
  /**
   * `lazy` defers loading until the image is near the viewport
   */
  loading(t) {
    return g.call(this, "loading", t), this;
  }
}
function Ee(e) {
  const t = new Se();
  return e && t.src(e), t;
}
class St extends U {
  constructor(t, n) {
    super(t), t instanceof HTMLInputElement && n && (t.type = n);
  }
  type(t) {
    return this.el instanceof HTMLInputElement && (this.el.type = t), this;
  }
  value(t) {
    return g.call(this, "value", t), this;
  }
  placeholder(t) {
    return g.call(this, "placeholder", t), this;
  }
  name(t) {
    return g.call(this, "name", t), this;
  }
  required(t = !0) {
    return g.call(this, "required", t), this;
  }
  /**
   * Checked state of checkbox and radio inputs. For two way binding use
   * `.model()`.
   */
  checked(t = !0) {
    return g.call(this, "checked", t), this;
  }
  min(t) {
    return this.attr("min", t), this;
  }
  max(t) {
    return this.attr("max", t), this;
  }
  step(t) {
    return this.attr("step", t), this;
  }
  autofocus(t = !0) {
    return g.call(this, "autofocus", t), this;
  }
}
function Te(e = "text") {
  const t = document.createElement("input");
  return new St(t, e);
}
function Ae() {
  const e = document.createElement("textarea");
  return new St(e);
}
class Me extends U {
  constructor(t, n) {
    super(document.createElement("option")), P(n) || (P(t) && this.text(n), this.value(n)), P(t) || this.text(t);
  }
  value(t) {
    return g.call(this, "value", t), this;
  }
  /**
   * Marks the option as selected. Pass a ref or getter to control it
   * reactively.
   */
  selected(t = !0) {
    return $(t) ? g.call(this, "selected", t) : y(t) && this.attr("selected", !0), this;
  }
}
function Ve(e, t) {
  return new Me(e, t);
}
const Be = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], Et = ["area", "base", "br", "col", "embed", "hr", "link", "meta", "source", "track", "wbr"], Tt = Be.reduce((e, t) => (e[t] = (n = [], ...s) => {
  const i = new A(document.createElement(t));
  return i.$setComponentChildren([n, ...s]), i.children = i.componentChildren, i;
}, e), {}), At = Et.reduce((e, t) => (e[t] = () => new U(document.createElement(t)), e), {}), dt = Object.assign(Tt, At, {
  fragment: Ie,
  input: Te,
  textarea: Ae,
  option: Ve,
  img: Ee
}), H = /* @__PURE__ */ new Set(), De = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), je = "abcdefghiklmnopqrstuvwxyz".split("");
function Pe(e) {
  const t = e ? je : De;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += t[Math.floor(Math.random() * t.length)];
  return n;
}
function Ke(e = !1) {
  let t = "", n = 0;
  for (; t.length === 0 || H.has(t); )
    t = Pe(e), ++n > 5 && (t += H.size.toString(36));
  return H.add(t), t;
}
const Le = [
  ...Et,
  "img",
  "input",
  "textarea",
  "option"
];
function Ue(e, t) {
  return (n = [], ...s) => {
    const i = Le.includes(e) ? dt[e]() : dt[e](n, ...s);
    return i.setup(t), i;
  };
}
const {
  a: We,
  abbr: He,
  address: Je,
  applet: Qe,
  article: Xe,
  aside: Ze,
  audio: Ge,
  b: Ye,
  basefont: tn,
  bdi: en,
  bdo: nn,
  bgsound: sn,
  blink: rn,
  blockquote: on,
  body: ln,
  button: cn,
  canvas: un,
  caption: an,
  cite: hn,
  code: fn,
  colgroup: dn,
  content: pn,
  data: mn,
  datalist: yn,
  dd: bn,
  decorator: gn,
  del: $n,
  details: kn,
  dfn: Cn,
  dialog: wn,
  div: xn,
  dl: vn,
  dt: In,
  element: Sn,
  em: En,
  fieldset: Tn,
  figcaption: An,
  figure: Mn,
  footer: Vn,
  form: Bn,
  h1: Dn,
  h2: jn,
  h3: Pn,
  h4: Ln,
  h5: qn,
  h6: Nn,
  head: On,
  header: Rn,
  hgroup: zn,
  html: _n,
  i: Fn,
  iframe: Kn,
  ins: Un,
  isindex: Wn,
  kbd: Hn,
  keygen: Jn,
  label: Qn,
  legend: Xn,
  li: Zn,
  listing: Gn,
  main: Yn,
  map: ts,
  mark: es,
  menu: ns,
  meter: ss,
  nav: is,
  noscript: rs,
  object: os,
  ol: ls,
  optgroup: cs,
  output: us,
  p: as,
  picture: hs,
  pre: fs,
  progress: ds,
  q: ps,
  rp: ms,
  rt: ys,
  ruby: bs,
  s: gs,
  samp: $s,
  script: ks,
  section: Cs,
  select: ws,
  shadow: xs,
  small: vs,
  spacer: Is,
  span: Ss,
  strong: Es,
  style: Ts,
  sub: As,
  summary: Ms,
  sup: Vs,
  table: Bs,
  tbody: Ds,
  td: js,
  template: Ps,
  tfoot: Ls,
  th: qs,
  thead: Ns,
  time: Os,
  title: Rs,
  tr: zs,
  u: _s,
  ul: Fs,
  var: Ks,
  video: Us
} = Tt, {
  area: Ws,
  base: Hs,
  br: Js,
  col: Qs,
  embed: Xs,
  hr: Zs,
  link: Gs,
  meta: Ys,
  source: ti,
  track: ei,
  wbr: ni
} = At;
export {
  A as Component,
  K as Fragment,
  Se as ImgElement,
  St as InputElement,
  Fe as Modifier,
  Me as Option,
  _e as Transform,
  U as VoidComponent,
  We as a,
  He as abbr,
  Je as address,
  Qe as applet,
  Ws as area,
  Xe as article,
  Ze as aside,
  Ge as audio,
  Ye as b,
  Hs as base,
  tn as basefont,
  en as bdi,
  nn as bdo,
  sn as bgsound,
  rn as blink,
  on as blockquote,
  ln as body,
  Js as br,
  cn as button,
  un as canvas,
  an as caption,
  hn as cite,
  fn as code,
  Qs as col,
  dn as colgroup,
  pn as content,
  Ke as createId,
  mn as data,
  yn as datalist,
  bn as dd,
  gn as decorator,
  $n as del,
  kn as details,
  Cn as dfn,
  wn as dialog,
  xn as div,
  vn as dl,
  In as dt,
  Sn as element,
  En as em,
  Xs as embed,
  Tn as fieldset,
  An as figcaption,
  Mn as figure,
  ze as flushSync,
  Vn as footer,
  Bn as form,
  Ie as fragment,
  Oe as getInstance,
  Dn as h1,
  jn as h2,
  Pn as h3,
  Ln as h4,
  qn as h5,
  Nn as h6,
  On as head,
  Rn as header,
  zn as hgroup,
  Zs as hr,
  _n as html,
  Fn as i,
  Kn as iframe,
  Ee as img,
  Te as input,
  Un as ins,
  Wn as isindex,
  Hn as kbd,
  Jn as keygen,
  Qn as label,
  Xn as legend,
  Zn as li,
  Gs as link,
  Gn as listing,
  Yn as main,
  ts as map,
  es as mark,
  ns as menu,
  Ys as meta,
  ss as meter,
  is as nav,
  Re as nextTick,
  rs as noscript,
  os as object,
  ls as ol,
  cs as optgroup,
  Ve as option,
  us as output,
  as as p,
  hs as picture,
  fs as pre,
  ds as progress,
  ps as q,
  Ue as reusable,
  ms as rp,
  ys as rt,
  bs as ruby,
  gs as s,
  $s as samp,
  ks as script,
  Cs as section,
  ws as select,
  xs as shadow,
  vs as small,
  ti as source,
  Is as spacer,
  Ss as span,
  Es as strong,
  Ts as style,
  As as sub,
  Ms as summary,
  Vs as sup,
  Bs as table,
  Ds as tbody,
  js as td,
  Ps as template,
  Ae as textarea,
  Ls as tfoot,
  qs as th,
  Ns as thead,
  Os as time,
  Rs as title,
  zs as tr,
  ei as track,
  _s as u,
  Fs as ul,
  Ks as varElement,
  Us as video,
  ni as wbr
};
