---
name: Agent Status Codes
description: Civic status wayfinding for a portable agent protocol.
colors:
  paper: "#f4f2ea"
  surface: "#fffef9"
  ink: "#10172a"
  muted: "#52606d"
  rule: "rgba(16, 23, 42, 0.22)"
  signal-blue: "#1637f2"
  signal-red: "#b42318"
  signal-red-field: "#ff5038"
  signal-yellow: "#7a5000"
  signal-yellow-field: "#ffca2c"
  signal-mint: "#a8edc3"
  signal-green: "#087443"
  signal-cyan: "#006a7a"
  signal-violet: "#7149c6"
  focus: "#7c4a00"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.8rem, 5vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 3rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.035em"
  code:
    fontFamily: "Source Code Pro, monospace"
    fontSize: "0.76rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
rounded:
  square: "0"
spacing:
  xs: "0.7rem"
  sm: "0.8rem"
  md: "1rem"
  lg: "1.2rem"
  section: "2.4rem"
components:
  navigation-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  navigation-link-active:
    textColor: "{colors.signal-blue}"
    typography: "{typography.label}"
  table-header:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.7rem 0.8rem"
  table-cell:
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    padding: "0.7rem 0.8rem"
  code-container:
    backgroundColor: "#e9e7df"
    textColor: "#111827"
    typography: "{typography.code}"
    rounded: "{rounded.square}"
  notice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "{spacing.md}"
---

# Design System: Agent Status Codes

## Overview

**Creative North Star: "Civic Status Wayfinding"**

The system uses the visual grammar of public infrastructure: paper-like fields, dark ink, one-pixel rules, compressed signage type, and colour assigned to routes and state. It is direct and functional. The interface stays flat, with hierarchy carried by typography, rules, fields, and alignment.

Protocol pages are restrained reading surfaces. Their navigation, tables, code, and notices use the same wayfinding language without reproducing the homepage's expressive composition. Light and dark themes preserve roles rather than fixed appearances.

**Key Characteristics:**

- Flat paper and ink surfaces with visible structural rules.
- Condensed headings and labels paired with hyperlegible body text.
- Monospaced numerals and protocol identifiers.
- Semantic colour used for navigation and status distinctions.
- Square containers, explicit focus, and responsive reading layouts.

## Colors

Warm paper and near-navy ink form the reading base. Saturated route colours identify links, active navigation, code classes, and status signals. The dark theme remaps the shared semantic variables to navy surfaces, warm text, and lighter signal colours.

### Primary

- **Signal Blue:** The main interactive colour for links, active navigation, and the primary route signal.

### Secondary

- **Signal Red and Red Field:** Primary-status and request-policy signals. The dark red carries text on light surfaces; the bright field supports filled markers.
- **Signal Yellow and Yellow Field:** Human-dependent and cautionary signals. The dark yellow carries readable text; the bright field supports filled markers.
- **Signal Green, Cyan, and Violet:** Distinct routes for successful outcomes, conditions, trust, retry, and related protocol categories.
- **Signal Mint:** A light supporting field within the route palette.

### Neutral

- **Paper:** The main page background in the light theme.
- **Surface:** A slightly lighter field for headers and bounded content.
- **Ink:** Primary text, strong fields, and table headers.
- **Muted:** Supporting copy and secondary labels.
- **Rule:** Low-contrast borders, dividers, and table structure.
- **Focus:** A high-contrast keyboard outline that remains distinct from the blue link state.

### Named Rules

**The Route Colour Rule.** Assign signal colours to protocol meaning, navigation, or state. Do not scatter them through ordinary prose as decoration.

**The Role-Preserving Theme Rule.** Dark mode changes the values of semantic roles. It does not change which roles a component uses.

## Typography

**Display Font:** Barlow Condensed with a sans-serif fallback  
**Body Font:** Atkinson Hyperlegible with a sans-serif fallback  
**Label/Mono Font:** Source Code Pro with a monospace fallback

**Character:** Condensed display type reads like civic signage and gives long protocol headings a decisive silhouette. Atkinson Hyperlegible keeps dense documentation comfortable. Source Code Pro separates identifiers, numeric codes, and payloads from explanatory text.

### Hierarchy

- **Display:** Bold, tightly tracked, and fluid. Use for page titles with a short measure.
- **Headline:** Bold and tightly tracked. Use for major document sections separated by a top rule.
- **Title:** Bold and compact. Use for third-level headings.
- **Body:** Regular with generous line height. Keep primary prose, lists, and paragraphs within a 72-character measure.
- **Label:** Bold, compact, and usually uppercase. Use for masthead, tabs, navigation, and table headers.
- **Code:** Regular monospaced text. Use for code blocks, identifiers, field values, and numeric statuses.

### Named Rules

**The Three-Voice Rule.** Use condensed type for orientation, hyperlegible type for explanation, and monospace for machine-readable values.

## Layout

The site uses a wide outer grid capped at 92rem and a narrower reading measure inside it. Document content starts with 2.4rem of top space. Major sections use generous vertical separation and a one-pixel top rule. Tables can occupy the available content width while prose remains constrained.

At narrow viewports below 44.9844em, document padding and heading sizes reduce, and wide tables become horizontally scrollable. The underlying reading order remains linear. System colour preferences, reduced-motion preferences, and print output are supported.

## Elevation & Depth

The system has no shadows. Paper and surface tones separate regions, while one-pixel rules define boundaries. Filled ink and signal fields create emphasis without simulated elevation. Gradients and translucent glass effects are absent.

### Named Rules

**The Flat Infrastructure Rule.** Use tonal fields, rules, and alignment for depth. Do not introduce elevation as decoration.

## Shapes

Containers, tables, code blocks, and notices use square corners. Borders are one pixel and use the shared rule colour. Circular geometry is reserved for literal route nodes, not general component styling. Directional clipping belongs only to markers that communicate direction.

### Named Rules

**The Square Field Rule.** Keep documentation containers square. Do not turn content groups into rounded card grids.

## Components

### Navigation

- **Style:** Condensed, bold, uppercase labels sit on the surface field between one-pixel rules.
- **Default / Hover:** Default tabs use reduced opacity. Hover and active states use Signal Blue at full opacity.
- **Active:** Side navigation adds a two-pixel blue inline rule and bold text.
- **Focus:** Keyboard focus uses a three-pixel Focus outline with a three-pixel offset.

### Links

- **Style:** Body links use Signal Blue with a visible underline, increased underline thickness, and clear offset.
- **Focus:** The same three-pixel Focus outline applies to links in content, headers, and tabs.

### Tables

- **Structure:** Tables use collapsed one-pixel rules, square corners, and the full available content width.
- **Header:** Ink field, Paper text, condensed uppercase labels, and no wrapping.
- **Cells:** Compact padding and a dense reading size support registry scanning.
- **Narrow screens:** Tables scroll horizontally rather than compressing or hiding columns.

### Code Blocks

- **Style:** Monospaced content sits on a tonal code field inside a one-pixel rule.
- **Shape:** Code containers remain square and have no shadow.
- **Theme:** Light mode uses a pale grey field with dark code. Dark mode uses a near-black field with warm code text.

### Notices

- **Style:** Admonitions and disclosure blocks use a single rule around a flat surface.
- **Shape:** Corners remain square.
- **Depth:** No shadow is applied.

## Do's and Don'ts

### Do:

- **Do** keep normative pages calm, scannable, and within the established reading measure.
- **Do** use the three type families according to orientation, explanation, and machine-readable content.
- **Do** preserve semantic colour roles across light and dark themes.
- **Do** expose keyboard focus and horizontal table overflow.
- **Do** keep ASC 0.1 visibly experimental where maturity is stated.

### Don't:

- **Don't** infer protocol meaning from colour alone.
- **Don't** use route colours as incidental prose decoration.
- **Don't** add shadows, gradients, glass effects, or rounded card grids.
- **Don't** apply homepage-specific interchange or class-band composition to protocol pages.
- **Don't** trade reading order or printable structure for visual expression.
