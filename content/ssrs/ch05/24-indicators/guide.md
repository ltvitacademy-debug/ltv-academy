# Lesson 24 — Indicators

**Chapter 5 · Charts & Visual Elements · Lesson 24 of 40**

## What you'll learn

- What an Indicator is, and how it's really just a simplified gauge
- The four built-in indicator sets and what each communicates
- Why indicators are especially effective inside tables and matrices
- How Reporting Services decides which icon to show for a given value

## An indicator is a gauge with no frame, no pointer — just a state

An **Indicator** displays a single data value, exactly like a gauge
does. But where a gauge has a frame, a scale, and a pointer, an
indicator strips all of that away and leaves only **states** — each
one represented by a small icon (and optionally a label). That
simplicity is the whole point: indicators stay legible even at the tiny
sizes a table row or matrix cell forces on them.

![A table of sales by territory and sales person, with an Indicator column showing green, yellow, or red circle icons per row and per territory subtotal.](/courses/ssrs/ch05/24-indicators/indicator-traffic-light.gif)
*A traffic-light indicator column — one glance tells you which rows need attention.*

Look at what that table actually does: every detail row and every
territory subtotal gets its own indicator, evaluated independently.
Pamela Ansam-Wolfe's $0 in sales reads red; David Campbell's
$3,587,378 reads green — same column, same icon set, completely
different signal, at a glance, without reading a single number.

## The four built-in indicator sets

Report Builder ships with four categories of indicator icons, each
suited to a different kind of message:

- **Directional** — up, down, and flat arrows. Use these to show a
  *trend* (sales climbing, falling, or holding steady), not an absolute
  state.
- **Symbols** — checkmarks, exclamation marks, and similar recognized
  icons. Use these to show *state* (passed, needs attention).
- **Shapes** — traffic lights, diamonds, and similar recognized shapes.
  Use these to show *condition* (on track, at risk, blocked).
- **Ratings** — filled squares, stars, and similar progressive icons.
  Use these to show a *rating* or a *degree of completion*.

Each set has three or more icons, and each icon owns a percentage (or
numeric) range of the data. By default, ranges are even percentage
slices of the detected min/max — a five-icon set gets five 20%-wide
bands — but every range is fully editable.

## Indicators vs. gauges vs. sparklines — pick the right one

- Need to show **one value**, simply, at small size? Use an
  **indicator**.
- Need a **frame, scale, and pointer** — something that reads like a
  literal dial? Use a **gauge**.
- Need to show **multiple data points** (a trend over time), not just
  one current state? Indicators can't do that — use a **sparkline**
  instead (Lesson 25).

## Key terms

| Term | Meaning |
|---|---|
| Indicator | A simple gauge with only states and icons — no frame, scale, or pointer |
| Indicator set | One named collection of 3+ icons (Directional, Symbols, Shape, Ratings) |
| State | The percentage or numeric range that determines which icon in the set displays |
| Gauge panel | The top-level container an indicator is always positioned inside |

## Lab

1. Add a table bound to a sales-by-territory dataset, with one row per
   territory.
2. In the last column, insert an Indicator and choose the **3 Arrows
   (Colored)** directional set.
3. Bind the indicator to your sales total field and run the report.
   Confirm each row shows red, yellow, or green based on where its
   value falls.
4. Open the indicator's properties and change the start/end values for
   one state, then re-run the report and see how the icon assignment
   shifts.

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: what
are the two structural elements a gauge has that an indicator doesn't,
and why does that make indicators better suited to a crowded table
column?
