---
version: alpha
name: Kababjees Fried Chicken
description: A bold, high-contrast fast-food system with energetic red accents, compact controls, and friendly rounded surfaces.
colors:
  primary: "#EC1E26"
  secondary: "#212529"
  tertiary: "#FFFFFF"
  neutral: "#F5F5F5"
  surface: "#FFFFFF"
  on-surface: "#212529"
  error: "#EC1E26"
  primary-60: "#F15A5F"
  primary-80: "#F58A8D"
  primary-10: "#FDE9EA"
typography:
  headline-display:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: 700
    lineHeight: 38px
    letterSpacing: 0px
  headline-lg:
    fontFamily: Poppins
    fontSize: 26px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: 0px
  headline-md:
    fontFamily: Poppins
    fontSize: 20px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: 500
    lineHeight: 22px
    letterSpacing: 0px
  body-lg:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-md:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  body-sm:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
  label-lg:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0px
  label-md:
    fontFamily: Poppins
    fontSize: 11px
    fontWeight: 500
    lineHeight: 14px
    letterSpacing: 0px
  label-sm:
    fontFamily: Poppins
    fontSize: 10px
    fontWeight: 500
    lineHeight: 12px
    letterSpacing: 0px
  brand-display:
    fontFamily: Raleway Black
    fontSize: 15px
    fontWeight: 500
    lineHeight: 22px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 7px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 2px
  sm: 10px
  md: 24px
  lg: 32px
  xl: 146px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xl}"
    padding: 6px 12px
    height: 40px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 6px 12px
    height: 40px
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 7px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
    height: 40px
  chip:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px 10px
  modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 2px 6px
# Kababjees Fried Chicken

## Overview
Kababjees Fried Chicken feels bold, playful, and immediately appetizing, with a strong fast-food personality built around high-contrast red, black, and white. The interface is promotional and conversion-focused, aimed at users making quick ordering decisions rather than browsing a calm editorial experience. Density is moderate overall, but key actions are kept compact and highly visible to support speed and clarity.

## Colors
- **Primary (#EC1E26):** A vivid fried-chicken red used for the strongest calls to action, active states, selected chips, and brand emphasis. It carries the energetic, spicy tone of the product.
- **Secondary (#212529):** A near-black charcoal used for body text, outlines, and secondary controls. It provides the contrast needed to keep the interface readable over white surfaces.
- **Tertiary (#FFFFFF):** Clean white used for cards, modal surfaces, button text, and negative space. It keeps the system feeling bright and food-focused.
- **Neutral (#F5F5F5):** A soft off-white background tone that helps separate floating panels from the page without introducing cool grays.
- **Surface (#FFFFFF):** The main card and modal surface color, reinforcing a clean, lightweight ordering flow.
- **On-surface (#212529):** The default text color on white surfaces, keeping hierarchy strong while matching the dark brand outline language.
- **Error (#EC1E26):** Error, warning, and attention states reuse the same saturated red, so the system feels unified rather than introducing extra colors.
- **Primary scale variants (#F15A5F, #F58A8D, #FDE9EA):** Softer red steps are useful for hover, pressed, and subtle highlight states where the full brand red would be too aggressive.

## Typography
Poppins is the main interface typeface, and it gives the site a rounded, modern, highly legible feel that suits quick commerce and ordering. Headlines use 700 and 600 weights for strong hierarchy, while body and labels stay lighter and compact so the interface can fit many touch targets into limited space. Raleway Black is reserved for brand-forward display moments, adding a distinctive logo-like tone that feels more expressive than the UI text.

Headings are clean and mostly untracked, with no meaningful uppercase or letter-spacing treatment visible in the source. Labels and buttons stay concise, typically around 10–12px, which helps keep controls compact without feeling cramped. Body text remains small but readable, prioritizing utility and speed over editorial spaciousness.

## Layout
The page uses a centered, fixed-max-width feel rather than a fully fluid editorial grid, with a large hero area occupying the majority of the viewport. A prominent modal sits above the page content and becomes the focal interaction, which is ideal for order-type and location selection. Spacing follows a tight but consistent rhythm, with compact internal padding in controls and larger separation between major blocks.

The extracted spacing scale shows a clear jump from micro spacing at 2px to standard spacing around 10px, then to 24px and 32px for structure. Very large offsets are used for broad page spacing and section breathing room, but the interface still keeps most controls within easy reach. Cards and inputs favor modest padding so that content density remains efficient.

## Elevation & Depth
Depth is created mostly through contrast, layering, and soft shadow rather than heavy 3D effects. The modal and cards sit on bright white surfaces against a darker or more saturated background, which makes hierarchy obvious even before reading text. Shadows are soft and subtle, supporting separation without making the UI feel glossy or overly decorative.

The system is functionally flat in many places, especially buttons and form fields, where borders and color carry the main hierarchy. This restrained approach keeps the interface crisp and fast to scan. When elevation is needed, it is used selectively for floating panels and prominent containers.

## Shapes
The shape language is rounded but still controlled, with corner radii centered around small-to-medium values rather than pill-only treatment everywhere. Buttons lean into a more rounded rectangle, while cards and modals use gentler curves to feel approachable and modern. Inputs and secondary controls remain slightly squared to preserve clarity and make dense control groups easier to parse.

Overall, the geometry feels friendly and commercial rather than luxury or minimalist. Rounded forms soften the strong red palette and keep the ordering flow welcoming.

## Components
Buttons are the most important action element in the system. `button-primary` should be used for the main conversion action, with a strong red fill, white text, compact padding, and a 40px target height. `button-secondary` should remain transparent with a dark outline and darker text for less-prominent actions. `button-link` is reserved for subtle text actions and should stay unboxed and underlined only when necessary.

Cards use a white background, minimal border treatment, and soft elevation. They should feel lightweight and content-first, with enough padding to separate imagery or iconography from the surface. `card` should be the default container for grouping small actions, selection tiles, or product-style summaries.

Inputs are compact and functional, with a white fill, subtle border, and 40px height. They should prioritize clear placeholder text and visible focus states, without heavy ornamentation. Use the same geometry language as `button-secondary` so form controls feel part of one system.

Chips and pills, such as order-type toggles or location selectors, should use the full radius and a dense label style. Active states should switch to the primary red, while inactive states can stay neutral or white with dark text. This keeps selection patterns obvious without overwhelming the rest of the layout.

Modals should be centered, bright, and strongly separated from the page content. They should use generous padding, soft rounded corners, and clean internal spacing so the user can quickly complete a single task. Badges may use the primary color for small count or status indicators, but they should stay compact and never compete with primary buttons.

## Do's and Don'ts
- Do keep primary actions red, compact, and immediately visible.
- Do use Poppins for nearly all interface text to maintain consistency.
- Do preserve the white-surface, dark-text contrast for readability.
- Do keep cards and modals softly rounded with restrained shadowing.
- Don't introduce bright accent colors that compete with the brand red.
- Don't use heavy gradients, glossy effects, or overly decorative shadows.
- Don't make buttons tall or airy; the system favors efficient, dense controls.
- Don't mix in serif or highly stylized fonts for UI content.