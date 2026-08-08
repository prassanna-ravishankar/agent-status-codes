---
name: Agent Status Codes
description: Engineered standards reference for an open agent protocol
colors:
  ink: "#0e1116"
  body-ink: "#262c35"
  soft-ink: "#303742"
  muted: "#5a6479"
  paper: "#ffffff"
  page: "#f6f8fa"
  soft: "#eef1f5"
  blue-field: "#eef3ff"
  rule: "#d7dce3"
  rule-strong: "#aeb6c2"
  blue: "#1f57d6"
  code-green: "#0f7b55"
  class-1: "#2f6bff"
  class-2: "#0f8a5f"
  class-3: "#c2740b"
  class-4: "#7a5af8"
  class-5: "#e2622b"
  class-6: "#c42b2b"
  class-7: "#0e7c86"
  class-8: "#5a6479"
  class-9: "#8e4ba8"
typography:
  body:
    fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.55
  mono:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "14px"
    lineHeight: 1.55
  display:
    fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(42px, 5vw, 68px)"
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  label-xs: { fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", lineHeight: 1.2 }
  label: { fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", lineHeight: 1.3 }
  small: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "13px", lineHeight: 1.45 }
  nav: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "15px", lineHeight: 1.2 }
  title-sm: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "18px", lineHeight: 1.25 }
  intro: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "19px", lineHeight: 1.5 }
  heading-sm: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "21px", lineHeight: 1.2 }
  lead: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "23px", lineHeight: 1.45 }
  heading: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "26px", lineHeight: 1.2 }
  heading-md: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "28px", lineHeight: 1.15 }
  heading-lg: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "32px", lineHeight: 1.05 }
  page-sm: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "36px", lineHeight: 1.05 }
  page: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "40px", lineHeight: 1 }
  display-sm: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "48px", lineHeight: 0.98 }
  display-md: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "52px", lineHeight: 0.98 }
  display-lg: { fontFamily: "IBM Plex Sans Variable, system-ui, sans-serif", fontSize: "64px", lineHeight: 0.98 }
---

# Design System: Agent Status Codes

## Overview

**Creative north star: Engineered standards reference**

ASC is precise, quiet, and easy to scan. The site uses protocol data as its
visual material rather than adding an illustrative layer around it. The August
2026 design-system ZIP is a visual brief, not a component library. The site
adopts its compact navigation, IBM Plex typography, cool slate surfaces,
numbered class colors, flat geometry, and searchable registry. It does not
adopt the prototype's invented content, dashboard controls, severity model,
HTTP mappings, or application-console components.

## Colors

White and cool slate surfaces carry the content. Near-black ink provides the
main contrast. An accessible dark blue marks links, focus, and active
navigation. Code green is limited to example strings.

Each numeric class has one stable color. Class color identifies a rail, filter,
code marker, or section rule. Class labels use ink because several class colors
do not meet text contrast on white. Color never carries meaning alone.

ASC 0.1 uses one light reference theme. System contrast preferences strengthen
rules. Dark mode is outside the current publishing contract.

## Typography

IBM Plex Sans is the reading and interface face. IBM Plex Mono is reserved for
codes, field names, numeric classes, labels, and payloads. Headings use the sans
face, compact line height, and restrained negative tracking. Body text stays at
16 pixels with a readable measure.

Code styling belongs to real code, identifiers, and protocol values. Concepts
must be expressed through prose, tables, or diagrams rather than decorative
code blocks. The documented ramp covers the small labels, body sizes, and fluid
heading endpoints used in production.

## Layout

The top navigation is the primary orientation device. Protocol, Registry,
Implement, and RFCs stay visible on wide screens. Search, version, and source
control share the bar without competing with those destinations.

One nine-part class index appears per page. The homepage uses the labeled class
index below its status envelope. Other pages use the compact class rail below
the header. Both link to explicit authoritative registry anchors.

Documentation pages use three rails when space permits: section navigation,
the document, and an on-page contents list. Narrow screens preserve that
reading order without fixed sidebars. Registry tables scroll horizontally
rather than hiding fields.

## Elevation & Depth

Surfaces are flat. Rules and cool-slate fields create separation. The example
status envelope alone may use one small offset field to read as a concrete
object. There are no gradients, glass effects, or decorative shadows.

## Shapes

Borders are one pixel and corner radii stay between zero and four pixels.
Controls are rectangular. Circular geometry is reserved for literal icons or
status nodes, not general containers. Avoid pills and rounded card grids.

## Components

### Header and class navigation

The header combines the code-native SVG mark, text wordmark, four durable
destinations, search, version, and GitHub. Active top navigation uses the
longest matching route so nested destinations do not activate two items.
Class navigation always keeps its text in ink and uses color through rules and
fields.

### Buttons and links

Primary actions use ink fill; secondary actions use a one-pixel ink border.
Text links use accessible blue. Every interactive element receives a visible
three-pixel focus outline. Headings do not need full stops.

### Status envelope

The homepage envelope is a semantic figure containing a real ASC 0.1 payload.
It is not a decorative formula. Syntax color is secondary to readable text.

### Documentation navigation

Section and on-page navigation remain quieter than the document. The active
section uses a blue rule and field. Links retain visible focus.

### Registry and filters

`docs/spec/registry.md` is the only assignment source. Astro parses it into the
homepage count, class pages, rows, filters, and deep links. Search covers code,
name, and meaning. Tables show only authoritative fields.

### Search and footer

Pagefind provides static full-text search with no server component. The footer
states version, experimental status, contribution entry points, and license.

### Logo

The mark is an aperture formed by two brackets around five colored signal
lines. It represents a common envelope carrying several protocol facts. The
mark remains code-native SVG and is paired with a plain-text wordmark.

## Do's and Don'ts

### Do

- Start with the interoperability problem, then state what ASC defines.
- Keep protocol pages calm, scannable, keyboard accessible, and printable.
- Use class color with a text label and keep assigned meanings authoritative.
- Use code presentation for machine-readable values and real examples.
- Keep ASC 0.1 visibly experimental.

### Don't

- Do not invent adoption, governance, severity, or HTTP mappings.
- Do not add gradients, glass, card grids, or oversized protocol theatre.
- Do not use class color as small body text or as general decoration.
- Do not use slogan cadence, unexplained abstractions, or em dashes.
- Do not duplicate registry assignments outside the authoritative Markdown.
