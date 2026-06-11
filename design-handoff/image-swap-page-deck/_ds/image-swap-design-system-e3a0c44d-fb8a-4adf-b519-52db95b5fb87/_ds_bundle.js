/* @ds-bundle: {"format":3,"namespace":"ImageSwapDesignSystem_e3a0c4","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Label","sourcePath":"components/core/Label.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsList","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsTrigger","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsContent","sourcePath":"components/core/Tabs.jsx"},{"name":"ImagePanel","sourcePath":"components/image-swap/ImagePanel.jsx"},{"name":"SwapControl","sourcePath":"components/image-swap/SwapControl.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"8594adc11e11","components/core/Button.jsx":"a00a477cb926","components/core/Card.jsx":"def48be35b71","components/core/Checkbox.jsx":"66abc68a9bea","components/core/Input.jsx":"7ce612f612c9","components/core/Label.jsx":"3cf2c8ad5a12","components/core/Switch.jsx":"70160907e379","components/core/Tabs.jsx":"4852caf4d0d3","components/image-swap/ImagePanel.jsx":"80ed06efa91c","components/image-swap/SwapControl.jsx":"6789f9b5c2ae","ui_kits/image-swap/TopBar.jsx":"444170ae937b","ui_kits/image-swap/Workspace.jsx":"61eb718902bb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ImageSwapDesignSystem_e3a0c4 = window.ImageSwapDesignSystem_e3a0c4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-badge-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: 0.125rem 0.625rem;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  line-height: 1.35;
}
.is-badge--primary { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); box-shadow: var(--shadow-xs); }
.is-badge--secondary { background: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
.is-badge--destructive { background: hsl(var(--destructive)); color: hsl(var(--destructive-foreground)); box-shadow: var(--shadow-xs); }
.is-badge--success { background: hsl(var(--success)); color: #fff; box-shadow: var(--shadow-xs); }
.is-badge--outline { color: inherit; border-color: var(--button-outline); }
`;
  document.head.appendChild(el);
}

/**
 * Badge — compact status / category label.
 */
function Badge({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `is-badge is-badge--${variant} ${className}`.trim()
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Inject component CSS once (enables :hover / :active states the
// inline-style API can't express — the signature "elevate" ink wash).
const STYLE_ID = "is-button-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--text-sm);
  line-height: 1;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: color var(--duration) var(--ease-standard),
              background-color var(--duration) var(--ease-standard),
              border-color var(--duration) var(--ease-standard);
  user-select: none;
}
.is-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: transparent;
  transition: background-color var(--duration) var(--ease-standard);
  pointer-events: none;
}
.is-btn:hover::after { background: var(--elevate-1); }
.is-btn:active::after { background: var(--elevate-2); }
.is-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
}
.is-btn:disabled { pointer-events: none; opacity: 0.5; }
.is-btn svg { width: 1rem; height: 1rem; flex-shrink: 0; }

/* sizes */
.is-btn--default { min-height: 2.25rem; padding: 0 1rem; }
.is-btn--sm { min-height: 2rem; padding: 0 0.75rem; font-size: var(--text-xs); border-radius: var(--radius-md); }
.is-btn--lg { min-height: 2.5rem; padding: 0 2rem; }
.is-btn--icon { height: 2.25rem; width: 2.25rem; padding: 0; }

/* variants */
.is-btn--primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary-border));
}
.is-btn--destructive {
  background: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
  border-color: hsl(var(--destructive-border));
  box-shadow: var(--shadow-xs);
}
.is-btn--secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border-color: hsl(var(--secondary-border));
}
.is-btn--outline {
  background: transparent;
  color: inherit;
  border-color: var(--button-outline);
  box-shadow: var(--shadow-xs);
}
.is-btn--outline:active { box-shadow: none; }
.is-btn--ghost { background: transparent; color: inherit; border-color: transparent; }
.is-btn--link {
  background: transparent;
  color: hsl(var(--primary));
  border-color: transparent;
  text-underline-offset: 4px;
  padding: 0;
  min-height: 0;
}
.is-btn--link:hover { text-decoration: underline; }
.is-btn--link::after { display: none; }
`;
  document.head.appendChild(el);
}

/**
 * Button — the primary interactive control of the Image Swap system.
 * Variants: primary (default), secondary, outline, ghost, destructive, link.
 * Sizes: default, sm, lg, icon.
 */
function Button({
  variant = "primary",
  size = "default",
  className = "",
  type = "button",
  children,
  ...props
}) {
  const cls = `is-btn is-btn--${variant} is-btn--${size} ${className}`.trim();
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-card-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-card {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--card-border));
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.is-card__header { display: flex; flex-direction: column; gap: 0.375rem; padding: 1.5rem; }
.is-card__title { font-size: var(--text-xl); font-weight: 600; line-height: 1.2; letter-spacing: -0.01em; margin: 0; }
.is-card__desc { font-size: var(--text-sm); color: hsl(var(--muted-foreground)); margin: 0; }
.is-card__content { padding: 0 1.5rem 1.5rem; }
.is-card__footer { display: flex; align-items: center; gap: 0.5rem; padding: 0 1.5rem 1.5rem; }
`;
  document.head.appendChild(el);
}

/** Card — surface container for grouped content. */
function Card({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `is-card ${className}`.trim()
  }, props), children);
}
function CardHeader({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `is-card__header ${className}`.trim()
  }, props), children);
}
function CardTitle({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("h3", _extends({
    className: `is-card__title ${className}`.trim()
  }, props), children);
}
function CardDescription({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    className: `is-card__desc ${className}`.trim()
  }, props), children);
}
function CardContent({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `is-card__content ${className}`.trim()
  }, props), children);
}
function CardFooter({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `is-card__footer ${className}`.trim()
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-checkbox-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  border: 1px solid hsl(var(--primary));
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  padding: 0;
  box-shadow: var(--shadow-xs);
  transition: background-color var(--duration) var(--ease-standard);
}
.is-checkbox[data-state="checked"] { background: hsl(var(--primary)); }
.is-checkbox:focus-visible { outline: none; box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring)); }
.is-checkbox:disabled { cursor: not-allowed; opacity: 0.5; }
.is-checkbox svg { width: 0.75rem; height: 0.75rem; color: hsl(var(--primary-foreground)); opacity: 0; transition: opacity var(--duration) var(--ease-standard); }
.is-checkbox[data-state="checked"] svg { opacity: 1; }
`;
  document.head.appendChild(el);
}

/** Checkbox — boolean selection control. Controlled or uncontrolled. */
function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className = "",
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  function toggle() {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onCheckedChange && onCheckedChange(!on);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": on,
    "data-state": on ? "checked" : "unchecked",
    disabled: disabled,
    onClick: toggle,
    className: `is-checkbox ${className}`.trim()
  }, props), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-input-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-input {
  display: flex;
  height: 2.25rem;
  width: 100%;
  border: 1px solid hsl(var(--input));
  border-radius: var(--radius-md);
  background: transparent;
  padding: 0.25rem 0.75rem;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: hsl(var(--foreground));
  box-shadow: var(--shadow-xs);
  transition: border-color var(--duration) var(--ease-standard),
              box-shadow var(--duration) var(--ease-standard);
}
.is-input::placeholder { color: hsl(var(--muted-foreground)); }
.is-input:focus-visible {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 1px hsl(var(--ring));
}
.is-input:disabled { cursor: not-allowed; opacity: 0.5; }
`;
  document.head.appendChild(el);
}

/** Input — single-line text field. */
function Input({
  className = "",
  type = "text",
  ...props
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    className: `is-input ${className}`.trim()
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-label-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: 1;
  color: hsl(var(--foreground));
}
`;
  document.head.appendChild(el);
}

/** Label — form field caption. */
function Label({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    className: `is-label ${className}`.trim()
  }, props), children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Label.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-switch-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 1.25rem;
  width: 2.25rem;
  flex-shrink: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-full);
  background: hsl(var(--input));
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  padding: 0;
  transition: background-color var(--duration) var(--ease-standard);
}
.is-switch[data-state="checked"] { background: hsl(var(--primary)); }
.is-switch:focus-visible { outline: none; box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring)); }
.is-switch:disabled { cursor: not-allowed; opacity: 0.5; }
.is-switch__thumb {
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: var(--radius-full);
  background: hsl(var(--background));
  box-shadow: var(--shadow);
  transition: transform var(--duration) var(--ease-standard);
  transform: translateX(0);
}
.is-switch[data-state="checked"] .is-switch__thumb { transform: translateX(1rem); }
`;
  document.head.appendChild(el);
}

/** Switch — binary on/off toggle. Controlled via `checked` + `onCheckedChange`, or uncontrolled. */
function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className = "",
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  function toggle() {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onCheckedChange && onCheckedChange(!on);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    "data-state": on ? "checked" : "unchecked",
    disabled: disabled,
    onClick: toggle,
    className: `is-switch ${className}`.trim()
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "is-switch__thumb"
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-tabs-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-tabs__list {
  display: inline-flex;
  align-items: center;
  height: 2.25rem;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: var(--radius-lg);
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}
.is-tabs__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.25rem 0.75rem;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: inherit;
  background: transparent;
  cursor: pointer;
  transition: color var(--duration) var(--ease-standard),
              background-color var(--duration) var(--ease-standard);
}
.is-tabs__trigger[data-state="active"] {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  box-shadow: var(--shadow);
}
.is-tabs__trigger:focus-visible { outline: none; box-shadow: 0 0 0 2px hsl(var(--ring)); }
.is-tabs__content { margin-top: 0.5rem; }
`;
  document.head.appendChild(el);
}
const TabsCtx = React.createContext(null);

/** Tabs — segmented tab navigation (pill-in-trough style). */
function Tabs({
  value,
  defaultValue,
  onValueChange,
  className = "",
  children,
  ...props
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const active = isControlled ? value : internal;
  const setActive = v => {
    if (!isControlled) setInternal(v);
    onValueChange && onValueChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className
  }, props), /*#__PURE__*/React.createElement(TabsCtx.Provider, {
    value: {
      active,
      setActive
    }
  }, children));
}
function TabsList({
  className = "",
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: `is-tabs__list ${className}`.trim()
  }, props), children);
}
function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}) {
  const ctx = React.useContext(TabsCtx);
  const active = ctx && ctx.active === value;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "tab",
    "aria-selected": active,
    "data-state": active ? "active" : "inactive",
    onClick: () => ctx && ctx.setActive(value),
    className: `is-tabs__trigger ${className}`.trim()
  }, props), children);
}
function TabsContent({
  value,
  className = "",
  children,
  ...props
}) {
  const ctx = React.useContext(TabsCtx);
  if (!ctx || ctx.active !== value) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tabpanel",
    className: `is-tabs__content ${className}`.trim()
  }, props), children);
}
Object.assign(__ds_scope, { Tabs, TabsList, TabsTrigger, TabsContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/image-swap/ImagePanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-imagepanel-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-panel {
  position: relative;
  flex: 1;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed hsl(var(--border));
  border-radius: var(--radius-lg);
  background: hsl(var(--card));
  cursor: pointer;
  overflow: hidden;
  transition: border-color var(--duration) var(--ease-standard),
              box-shadow var(--duration) var(--ease-standard);
}
.is-panel:hover { border-color: hsl(var(--primary)); box-shadow: var(--shadow-md); }
.is-panel--filled { border-style: solid; }
.is-panel img { width: 100%; height: 100%; object-fit: contain; }
.is-panel__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: hsl(var(--muted-foreground));
  user-select: none;
  text-align: center;
}
.is-panel__placeholder svg { width: 3rem; height: 3rem; opacity: 0.5; }
.is-panel__placeholder strong { font-size: var(--text-sm); font-weight: 500; }
.is-panel__placeholder small { font-size: var(--text-xs); opacity: 0.7; }
.is-panel__label {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: hsl(var(--foreground) / 0.7);
  color: hsl(var(--background));
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  pointer-events: none;
}
`;
  document.head.appendChild(el);
}

/**
 * ImagePanel — the signature drop/preview tile of the Image Swap tool.
 * Shows the loaded image (contain-fit) or a click-to-load placeholder,
 * with an uppercase pill label pinned to the bottom.
 */
function ImagePanel({
  src = null,
  label,
  placeholder = "Load Image",
  hint = "Click to browse",
  onClick,
  className = "",
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `is-panel ${src ? "is-panel--filled" : ""} ${className}`.trim(),
    onClick: onClick,
    title: "Click to load an image from file"
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: label || "preview"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "is-panel__placeholder"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "8.5",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "21 15 16 10 5 21"
  })), /*#__PURE__*/React.createElement("strong", null, placeholder), /*#__PURE__*/React.createElement("small", null, hint)), label && /*#__PURE__*/React.createElement("div", {
    className: "is-panel__label"
  }, label));
}
Object.assign(__ds_scope, { ImagePanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/image-swap/ImagePanel.jsx", error: String((e && e.message) || e) }); }

// components/image-swap/SwapControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "is-swapcontrol-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.is-swap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.is-swap--horizontal { flex-direction: row; }
.is-swap__btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-full);
  background: hsl(var(--card));
  color: hsl(var(--foreground));
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color var(--duration) var(--ease-standard),
              border-color var(--duration) var(--ease-standard),
              transform var(--duration-fast) var(--ease-standard);
}
.is-swap__btn:hover:not(:disabled) {
  background: hsl(var(--primary));
  border-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  transform: scale(1.08);
}
.is-swap__btn:active:not(:disabled) { transform: scale(0.95); }
.is-swap__btn:disabled { opacity: 0.35; cursor: not-allowed; }
.is-swap__divider { width: 1px; height: 1.5rem; background: hsl(var(--border)); }
.is-swap--horizontal .is-swap__divider { width: 1.5rem; height: 1px; }
`;
  document.head.appendChild(el);
}

/**
 * SwapControl — the paired arrow buttons that copy an image between
 * two panels. Vertical by default (collapses to horizontal on mobile).
 */
function SwapControl({
  onForward,
  onBack,
  disabledForward = false,
  disabledBack = false,
  orientation = "vertical",
  className = "",
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `is-swap is-swap--${orientation} ${className}`.trim()
  }, props), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "is-swap__btn",
    onClick: onForward,
    disabled: disabledForward,
    title: "Copy left \u2192 right",
    "aria-label": "Copy left to right"
  }, "\u203A"), /*#__PURE__*/React.createElement("div", {
    className: "is-swap__divider"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "is-swap__btn",
    onClick: onBack,
    disabled: disabledBack,
    title: "Copy right \u2192 left",
    "aria-label": "Copy right to left"
  }, "\u2039"));
}
Object.assign(__ds_scope, { SwapControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/image-swap/SwapControl.jsx", error: String((e && e.message) || e) }); }

// ui_kits/image-swap/TopBar.jsx
try { (() => {
/* TopBar — product header: logo lockup, mode badge, theme toggle, reset. */
function TopBar({
  dark,
  onToggleDark,
  onReset
}) {
  const {
    Badge,
    Button,
    Switch
  } = window.ImageSwapDesignSystem_e3a0c4;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      height: 60,
      padding: "0 24px",
      borderBottom: "1px solid hsl(var(--border))",
      background: "hsl(var(--card))"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "30",
    height: "30",
    alt: "Image Swap"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "hsl(var(--foreground))"
    }
  }, "Image", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "hsl(var(--primary))"
    }
  }, " Swap")), /*#__PURE__*/React.createElement(Badge, {
    variant: "secondary"
  }, "Compare"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13,
      color: "hsl(var(--muted-foreground))"
    }
  }, "Dark", /*#__PURE__*/React.createElement(Switch, {
    checked: dark,
    onCheckedChange: onToggleDark
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: onReset
  }, "Reset")));
}
window.TopBar = TopBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/image-swap/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/image-swap/Workspace.jsx
try { (() => {
/* Workspace — the two image panels with the swap control between them. */
function Workspace({
  imageA,
  imageB,
  onPick,
  onCopyAtoB,
  onCopyBtoA
}) {
  const {
    ImagePanel,
    SwapControl
  } = window.ImageSwapDesignSystem_e3a0c4;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      width: "100%",
      maxWidth: 820,
      margin: "0 auto"
    },
    className: "kit-workspace"
  }, /*#__PURE__*/React.createElement(ImagePanel, {
    label: "Image 1",
    src: imageA,
    onClick: () => onPick("a")
  }), /*#__PURE__*/React.createElement(SwapControl, {
    onForward: onCopyAtoB,
    onBack: onCopyBtoA,
    disabledForward: !imageA,
    disabledBack: !imageB
  }), /*#__PURE__*/React.createElement(ImagePanel, {
    label: "Image 2",
    src: imageB,
    onClick: () => onPick("b")
  }));
}
window.Workspace = Workspace;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/image-swap/Workspace.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TabsList = __ds_scope.TabsList;

__ds_ns.TabsTrigger = __ds_scope.TabsTrigger;

__ds_ns.TabsContent = __ds_scope.TabsContent;

__ds_ns.ImagePanel = __ds_scope.ImagePanel;

__ds_ns.SwapControl = __ds_scope.SwapControl;

})();
