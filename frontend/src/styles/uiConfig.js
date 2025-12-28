// ============================================
// TAILWIND DESIGN SYSTEM CONFIG
// Mobile-first • Accessible • Cross-browser • DRY
// ============================================

/**
 * PageLayout
 * --------------------------------------------------
 * - Header: sticky, full-width
 * - Main: min-height = 100vh - header height
 * - Footer: always pinned to bottom
 * - Mobile-first, accessible, DRY
 */

// --------------------------------------------
// Utility: responsive spacing helper
// --------------------------------------------

const responsive = (base, sm, md, lg, xl, xxl) => {
  let classes = base;
  if (sm) classes += ` sm:${sm}`;
  if (md) classes += ` md:${md}`;
  if (lg) classes += ` lg:${lg}`;
  if (xl) classes += ` xl:${xl}`;
  if (xxl) classes += ` 2xl:${xxl}`;
  return classes;
};

// --------------------------------------------
// Core spacing primitives (single source of truth)
// --------------------------------------------

const spacing = {
  marginX: responsive("mx-4", "mx-6", "mx-8", "mx-12", "mx-16", "mx-24"),
  marginY: responsive("my-6", "my-8", "my-10", "my-12", "my-16"),
  paddingX: responsive("px-4", "px-6", "px-8", "px-12", "px-16", "px-24"),
  paddingY: responsive("py-3", "py-4", "py-5", "py-6", "py-8"),
};

export const sectionPadding = `${spacing.paddingX} ${spacing.paddingY}`;

// --------------------------------------------
// Motion & transitions (accessibility aware)
// --------------------------------------------

const transitionColors = "transition-colors duration-200 ease-in-out";
const transitionAll =
  "motion-safe:transition-all motion-reduce:transition-none ease-in-out";

// --------------------------------------------------
// Color & text tokens (WCAG-AA friendly)
// --------------------------------------------------
export const text = {
  primary: "text-gray-900 dark:text-white",
  secondary: "text-gray-700 dark:text-gray-300",
  body: "text-gray-800 dark:text-gray-200",
  muted: "text-gray-500 dark:text-gray-400",
  header: "text-white",
  footer: "text-gray-200",
};

// --------------------------------------------
// Focus & interaction safety
// --------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";

const disabledState =
  "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

// --------------------------------------------
// Radius & elevation primitives
// --------------------------------------------

const rounded = "rounded-lg";
const shadow = "shadow-sm";

// --------------------------------------------
// Cart icon and badge styles
// --------------------------------------------
const cartIcon = {
  icon:
    "size-7 text-white-700 dark:text-gray-300 hover:text-blue-600 " +
    "transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",

  badge:
    "absolute -top-1 -right-1 min-w-[18px] h-[18px] " +
    "rounded-full bg-blue-500 text-white text-xs font-semibold " +
    "flex items-center justify-center",
};

// --------------------------------------------------------------
// Box container styles
// --------------------------------------------------------------
export const boxContainer = {
  base: `flex gap-4 text-gray-900 dark:text-gray-100`,
  center: `flex items-center justify-center gap-6 text-gray-900 dark:text-gray-100`,
  column: `flex flex-col gap-4 text-gray-900 dark:text-gray-100`,
  columnCenter: `flex flex-col items-center justify-center gap-4 text-gray-900 dark:text-gray-100`,
  rowSpaceBetween: `flex items-center justify-between gap-4 text-gray-900 dark:text-gray-100`,
  rowStart: `flex items-start justify-start gap-4 text-gray-900 dark:text-gray-100`,
  rowEnd: `flex items-end justify-end gap-4 text-gray-900 dark:text-gray-100`,
  responsive: `flex flex-col sm:flex-row gap-4 text-gray-900 dark:text-gray-100`,

    // Page-centered container with white background and black text
  pageCenter: `flex items-center justify-center min-h-screen bg-white text-black`,
};


// --------------------------------------------
// Layout primitives
// --------------------------------------------

export const pageLayout = {
  page: "flex min-h-screen flex-col bg-white dark:bg-gray-900",
  content: "flex flex-grow flex-col",
  mainSection:
    "flex-grow w-full min-h-[calc(100vh-72px)] bg-white text-black " +
    "md:min-h-[calc(100vh-80px)] " +
    "dark:text-black [&_*]:text-black",
};

// --------------------------------------------
// Typography system
// --------------------------------------------

const headingBase = "font-bold leading-tight";

export const typography = {
  display: `${headingBase} ${text.primary} text-3xl sm:text-4xl lg:text-5xl`,
  title: `${headingBase} ${text.primary} text-xl sm:text-2xl lg:text-2xl text-center uppercase  ${spacing.marginY}`,
  subtitle: `font-semibold ${text.secondary} text-xl md:text-2xl`,
  body: `${text.body} leading-relaxed text-base md:text-lg`,
  paragraph: `${text.body} leading-relaxed text-base md:text-lg max-w-prose py-4`,
  caption: `${text.muted} text-sm md:text-base`,
  small: `${text.muted} text-xs sm:text-sm`,
  button: "font-semibold uppercase tracking-wide text-sm sm:text-base",
};

// --------------------------------------------
// Forms (professional, white inputs, accessible)
// --------------------------------------------

const inputBgColor = "bg-white text-gray-900 dark:bg-white dark:text-gray-900";

const formBase =
  `appearance-none w-full min-h-[44px] px-3 py-2 border ` +
  `border-gray-300 hover:border-gray-400 ` +
  `focus-visible:border-blue-500 ` +
  `${inputBgColor} ` +
  `${rounded} ${shadow} ${transitionColors} ${focusRing}`;

const formContainer = `w-[500px] p-6 m-6 border border-green-500 dark:border-green-700 rounded-lg shadow-md space-y-4`;

export const formElements = {
  formContainer: `${formContainer}`,
  form: "flex flex-col  bg-white",
  input: `${formBase} placeholder-gray-400`,
  textarea: `${formBase} resize-none`,
  select: `${formBase}`,
  password: `${formBase}`,
  datePicker: `${formBase}`,

  fileUpload:
    `w-full min-h-[44px] px-3 py-2 border-2 border-dashed ` +
    `border-gray-300 hover:border-blue-400 ${rounded} cursor-pointer ` +
    `${transitionColors} ${focusRing}`,

  radio: `text-blue-600 ${focusRing} ${transitionColors}`,

  checkbox:
    "appearance-none relative inline-flex items-center justify-center " +
    "h-4 w-4 min-h-[16px] min-w-[16px] " +
    "bg-white dark:bg-white " +
    "border border-gray-400 rounded " +
    "hover:border-gray-400 " +
    "checked:bg-blue-600 checked:border-blue-600 " +
    "checked:after:content-['✓'] " +
    "checked:after:text-white checked:after:text-xs checked:after:font-bold " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " +
    "transition-colors cursor-pointer",

  label: `block text-sm font-medium ${text.secondary} mb-1.5`,
};

// --------------------------------------------
// Buttons (touch-friendly & state-safe)
// --------------------------------------------

const buttonBase =
  `inline-flex items-center justify-center min-h-[44px] ` +
  `px-3 py-2 sm:px-4 sm:py-2 font-semibold cursor-pointer ${rounded} ${shadow} ` +
  `${transitionColors} ${focusRing} ${disabledState}`;

export const buttonVariants = {
  primary: `${buttonBase} bg-blue-500 text-white hover:bg-blue-400`,
  secondary: `${buttonBase} bg-gray-200 text-gray-900 hover:bg-gray-300`,
  success: `${buttonBase} bg-green-600 text-white hover:bg-green-700`,
  danger: `${buttonBase} bg-red-600 text-white hover:bg-red-700`,
  warning: `${buttonBase} bg-yellow-500 text-white hover:bg-yellow-600`,
  info: `${buttonBase} bg-sky-500 text-white hover:bg-sky-600`,
  ghost:
    `${buttonBase} bg-transparent shadow-none ` +
    `text-gray-700 dark:text-gray-300 ` +
    `hover:bg-gray-100 dark:hover:bg-gray-800`,
  outline:
    `${buttonBase} border border-gray-300 dark:border-gray-700 ` +
    `text-gray-700 dark:text-gray-300 ` +
    `hover:bg-gray-50 dark:hover:bg-gray-800`,
};

// --------------------------------------------
// Size tokens (shared across components)
// --------------------------------------------

export const sizes = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
  xl: "text-xl px-6 py-4",
};

// --------------------------------------------
// Radius & shadows (exported scales)
// --------------------------------------------

export const radii = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const shadows = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

// --------------------------------------------
// Z-index scale (collision-safe)
// --------------------------------------------

export const zIndex = {
  base: "z-0",
  dropdown: "z-40",
  overlay: "z-45",
  modal: "z-50",
  toast: "z-[60]",
};

// --------------------------------------------
// Header
// --------------------------------------------

export const header = {
  height: "h-[72px] md:h-[80px]",
  container:
    `sticky top-0 z-40 flex w-full items-center justify-between ` +
    `bg-gray-900/90 backdrop-blur dark:bg-gray-900/90 ${sectionPadding} shadow-md px-4 md:px-6 lg:px-12`,
  brand: `font-bold text-xl sm:text-2xl lg:text-3xl ${text.header}`,
  nav: "hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 font-medium text-white",
  navItem: `relative px-2 py-1 hover:text-blue-400 ${transitionColors} ${focusRing}`,
  navItemActive:
    "text-blue-400 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-400",
  mobileMenuButton: `md:hidden p-2 rounded-lg text-white ${focusRing}`,
  mobileMenu: `md:hidden flex flex-col gap-2 bg-gray-900 shadow-md ${spacing.paddingX} pb-6`,
  mobileNavItem: "rounded-lg px-4 py-3 hover:bg-gray-800 text-white",
  reactIcon: `${cartIcon.icon}`,
  badgeBase: `${cartIcon.badge}`,
};

// --------------------------------------------------
// Header and menu active and none active link styles
// --------------------------------------------------
export const headerNavLinkStatus = {
  inActive:
    "relative px-2 py-1 font-medium transition-colors " +
    "text-gray-700 dark:text-gray-300 hover:text-blue-600 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",

  active:
    "text-red-500 font-semibold " +
    "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-red-600",
};

// --------------------------------------------
// Footer
// --------------------------------------------

export const footer = {
  container: `relative w-full bg-gray-900 text-gray-200 shadow-inner ${sectionPadding}`,
  sectionsContainer:
    "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
  section: "flex flex-col gap-2",
  heading: "text-lg sm:text-xl font-semibold text-white",
  link: "hover:text-gray-300 transition-colors",
  copyright: "mt-6 text-sm text-gray-400",
};

// --------------------------------------------
// Motion presets
// --------------------------------------------

export const transitions = {
  fast: `${transitionAll} duration-150`,
  normal: `${transitionAll} duration-300`,
  slow: `${transitionAll} duration-500`,
  none: "transition-none",
};
