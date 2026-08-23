# UnitFlow Design Directions

## Three approaches considered

| Theme Name | Very Brief Intro | Probability |
|---|---|---:|
| Instrument Panel | A tactile scientific-instrument language: precise typography, calibration marks, slim dividers, and thoughtful data density. It makes everyday conversion feel credible and controlled. | 0.04 |
| Field Notes | Editorial utility with warm paper, deep ink, and inked annotations, making conversion feel approachable and human. | 0.07 |
| Signal Workshop | A dark, high-contrast technical workspace informed by illuminated measurement equipment and status LEDs. | 0.02 |

## Chosen approach: Instrument Panel

### Design Movement
**Contemporary scientific instrumentation** with Swiss information-design discipline. The experience treats conversion as an act of measurement rather than a generic SaaS form.

### Core Principles
1. **Precision as texture:** measured rules, calibrated labels, clear numeral alignment, and restrained technical notation create confidence.
2. **One dominant action:** the converter is the visual instrument; all supporting content frames and clarifies it rather than competes with it.
3. **Warmly functional:** an ivory workspace and atmospheric blue field avoid sterile monochrome while retaining an exacting, professional tone.
4. **Meaningful density:** helpful details—saved pairs, recent work, conversion formulae—appear in orderly bands with room to breathe.

### Color Philosophy
The primary environment is a near-black blue field that recalls a precision lab after dusk, used only for orientation and focus. The working surface is warm ivory to make values feel approachable and readable. **Instrument orange** is reserved for the single, memorable moment of action and confirmation, while muted blue-greys organize secondary information without turning the interface into a colourful dashboard.

### Layout Paradigm
The site follows a **workbench composition**: a slim fixed navigation rail contains primary destinations, while the main canvas is a vertically flowing measurement bench. The hero occupies an offset top field; the converter physically overlaps it like a portable instrument placed on a work surface. Supporting sections form horizontal utility strips rather than a conventional centred landing-page grid.

### Signature Elements
1. **Calibration rulers:** quiet dotted and tick-mark dividers, used to pace major sections.
2. **Conversion beam:** a central black/orange transfer control connecting from and to values.
3. **Instrument labels:** tiny uppercase category labels paired with large, highly legible numerical display fields.

### Interaction Philosophy
The interface should feel decisive and measured. Input results change instantly. Swapping gives a short rotational acknowledgment; saving or copying produces a concise confirmation. High-frequency actions stay near-instant, and overlays keep obvious keyboard routes and visible focus states.

### Animation
The first-view elements enter through low-distance opacity and translate motion, staggered 55ms apart. The swap icon turns 180 degrees in 180ms with an ease-out curve, and unit menus fade/scale from their triggering fields over 180ms. Action buttons use a 120ms press scale. Any nonessential animation is disabled under reduced-motion preferences; no looping decoration is used.

### Typography System
**DM Mono** supplies numeric displays, labels, and measurements, reinforcing mathematical clarity. **Manrope** provides the interface and long-form body copy in a calm, contemporary voice. Display headlines use Manrope at 700–800 weight with tight tracking; numeric results use DM Mono 600 with tabular figures; labels use DM Mono uppercase at 11–12px with expanded tracking.

### Brand Essence
**UnitFlow is the calm, precise conversion workbench for people who need trustworthy answers without friction.**

Personality: **precise, capable, understated**.

### Brand Voice
Headlines are direct and useful; CTAs describe the concrete next action; microcopy clarifies state without ceremony. Avoid generic welcomes and exaggerated promises.

Examples:

> “Move from kilometres to metres without breaking focus.”

> “Save this pairing for the next calculation.”

### Wordmark & Logo
The mark is a bold pair of opposing measurement brackets split by a single orange transfer point—an abstract reference to values travelling between two scales. The wordmark combines a compact geometric symbol with a confident Manrope title, never a default text treatment.

### Signature Brand Color
**Instrument Orange — `#F26A3D`**. It marks active conversion, preserved favourites, and moments of confirmation.

## Style Decisions

1. The UnitFlow bracket-and-transfer-point mark and wordmark remain visible in the primary navigation on every route.
2. Category and utility icons use muted blue-grey linework by default. **Instrument Orange `#F26A3D`** is reserved for active conversion, selected states, saved items, confirmations, and hover emphasis.
3. Each non-converter route includes a visible calibration strip so the whole product reads as one measurement workbench rather than a collection of generic pages.
