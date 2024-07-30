import { getInstance } from './util'
import { Component, fragment } from './component'
import type { ComponentChildren as Children } from './types'
import { reusable } from './reusable'
import { htmlNormalElFactory, htmlVoidElFactory } from './factory'
import { input, textarea } from './components/input'
import { option } from './components/select'
import { img } from './components/img'
import { createId } from './id'

const {
  a,
  abbr,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  basefont,
  bdi,
  bdo,
  bgsound,
  blink,
  blockquote,
  body,
  button,
  canvas,
  caption,
  cite,
  code,
  colgroup,
  content,
  data,
  datalist,
  dd,
  decorator,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  element,
  em,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  head,
  header,
  hgroup,
  html,
  i,
  iframe,
  ins,
  isindex,
  kbd,
  keygen,
  label,
  legend,
  li,
  listing,
  main,
  map,
  mark,
  menu,
  meter,
  nav,
  noscript,
  object,
  ol,
  optgroup,
  output,
  p,
  picture,
  pre,
  progress,
  q,
  rp,
  rt,
  ruby,
  s,
  samp,
  script,
  section,
  select,
  shadow,
  small,
  spacer,
  span,
  strong,
  style,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  template,
  tfoot,
  th,
  thead,
  time,
  title,
  tr,
  u,
  ul,
  video,
} = htmlNormalElFactory

const {
  area,
  base,
  br,
  col,
  embed,
  hr,
  link,
  meta,
  source,
  track,
  wbr,
} = htmlVoidElFactory

export {
  reusable,
  getInstance,
  createId,
  Component,
  Children,
  fragment,
  input,
  textarea,
  option,
  a,
  abbr,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  basefont,
  bdi,
  bdo,
  bgsound,
  blink,
  blockquote,
  body,
  button,
  canvas,
  caption,
  cite,
  code,
  colgroup,
  content,
  data,
  datalist,
  dd,
  decorator,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  element,
  em,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  head,
  header,
  hgroup,
  html,
  i,
  iframe,
  ins,
  isindex,
  kbd,
  keygen,
  label,
  legend,
  li,
  listing,
  main,
  map,
  mark,
  menu,
  meter,
  nav,
  noscript,
  object,
  ol,
  optgroup,
  output,
  p,
  picture,
  pre,
  progress,
  q,
  rp,
  rt,
  ruby,
  s,
  samp,
  script,
  section,
  select,
  shadow,
  small,
  spacer,
  span,
  strong,
  style,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  template,
  tfoot,
  th,
  thead,
  time,
  title,
  tr,
  u,
  ul,
  video,
  area,
  base,
  br,
  col,
  embed,
  hr,
  link,
  meta,
  source,
  track,
  wbr,
  img
}

// Test

const CC = input().setup((ctx) => {
  ctx.keydown((e: any) => {
    console.log(e.key)
  })

  ctx.keydownExact(["Alt","c"], () => {
    console.log("C!!!")
  })
})

CC.mount("#app")