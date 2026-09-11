# Lesson 23 — Gauges

**Chapter 5 · Charts & Visual Elements · Lesson 23 of 40**

## What you'll learn

- What a Gauge data region is, and why it's always positioned inside a
  gauge panel
- The parts every gauge is built from — frame, scale, range, pointer
- The difference between a radial gauge and a linear gauge, and when to
  reach for each
- How Reporting Services turns a dragged-in field into a single plotted
  value on the gauge

## A gauge shows exactly one value, precisely

A **Gauge** data region displays a single value from your dataset —
nothing more. Where a chart plots a whole series of data points, a
gauge distills everything down to one number and shows where that
number falls inside a defined range. That makes gauges the right choice
for KPIs: "are we above or below target," not "show me the trend."

Every gauge lives inside a **gauge panel** — the top-level container.
You can put more than one gauge in a single panel (as children or
side-by-side), and they'll share filtering, grouping, and sorting.

![Gauge Frame, Scale Label, Major/Minor Tick Mark, Pointer Value, Pointer (Needle Style), Pointer Cap, Range, and Gauge Label, labeled on a real radial gauge.](/courses/ssrs/ch05/23-gauges/gauge-elements.gif)
*Frame, scale, tick marks, pointer, range, label — every gauge's building blocks.*

## Radial vs. linear — same job, different shape

Reporting Services gives you exactly two gauge types, and they're
otherwise interchangeable — the only real differences are shape and
which pointer styles are available.

![A small round radial gauge with a needle pointer, shaded red past the halfway mark.](/courses/ssrs/ch05/23-gauges/radial-gauge.gif)
*Radial gauge — circular, needle pointer, reads like a speedometer.*

![A small horizontal linear gauge with a thermometer-style pointer, shaded red at the high end.](/courses/ssrs/ch05/23-gauges/linear-gauge.gif)
*Linear gauge — rectangular, thermometer pointer, reads like a ruler.*

- **Radial** gauges are circular and resemble a speedometer. The
  pointer is usually a needle (though it can be a marker or bar
  instead). Use a radial gauge when the value reads naturally as a
  velocity or a dial reading.
- **Linear** gauges are rectangular — horizontal or vertical — and
  resemble a ruler. The pointer is usually a thermometer. Because of
  that rectangular shape, linear gauges fit neatly inside table or
  matrix cells to show per-row progress, which a radial gauge can't do
  as cleanly.

If all you actually need is a simple "is this good, bad, or in
between" read at a glance — no frame, no scale, no pointer — that's a
job for an **Indicator** instead. Lesson 24 covers exactly that
distinction.

## How data reaches the gauge

Drag a dataset field onto the gauge and Reporting Services aggregates
it automatically — `SUM` for numeric fields, `COUNT` for everything
else — and attaches the result to the pointer's **Value** property. A
gauge can only bind to one dataset, and by default it has one scale and
one pointer, though you can add more of each (right-click the gauge →
**Add Scale** or **Add Pointer**).

Critically, the gauge will *not* set the scale's minimum and maximum for
you — it has no way to know what "full" should mean for your data. You
have to set those explicitly, or the gauge has no context for what it's
actually showing.

## Key terms

| Term | Meaning |
|---|---|
| Gauge data region | A data region that displays one aggregated value from a dataset |
| Gauge panel | The top-level container that holds one or more gauges (or indicators) |
| Radial gauge | Circular gauge type; needle-style pointer by default |
| Linear gauge | Rectangular gauge type; thermometer-style pointer by default |
| Scale | The labeled range a gauge's pointer moves across; you must set its min/max |

## Lab

1. Add a Gauge data region to a report and choose the basic **Radial**
   type from the Select Gauge Type dialog.
2. Drag a numeric field (such as `SalesAmount`) onto the gauge and
   confirm a pointer appears, bound to `Sum(SalesAmount)`.
3. Right-click the gauge scale and set an explicit minimum and maximum
   so the pointer position is actually meaningful.
4. Delete the gauge, re-add it as a **Linear — Horizontal** gauge
   instead, and compare how the same data reads in each shape.

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: what
does a gauge panel actually contain, and why does Reporting Services
refuse to set a gauge's minimum and maximum for you automatically?
