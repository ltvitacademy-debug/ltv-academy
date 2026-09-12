# Lesson 77 — Advanced Reference Lines, Bands & Dynamic Targets

**Chapter 13 · Advanced Visualizations · Lesson 77 of 95**

## What you'll learn

- The difference between a reference line, a reference band, and a
  reference distribution
- The Table / Pane / Cell scope options, and what each one changes
- How to build a **dynamic** reference line — one driven by a parameter
  instead of a hard-coded number — and make it interactive with a
  parameter action

## Three ways to add context to an axis

Tableau's Analytics pane offers three related ways to add a fixed
reference point to a continuous axis:

| Type | What it draws |
|---|---|
| **Reference line** | A single line at a constant or computed value |
| **Reference band** | Shading between two constant or computed values |
| **Reference distribution** | A gradient of shading indicating a distribution (e.g., standard deviation), also usable to build bullet graphs (Lesson 75) |

All three are dragged from the Analytics pane onto the axis, and all
three share the same **scope** options for where they apply:

| Scope | Meaning |
|---|---|
| **Entire Table** | One line/band across the whole view |
| **Per Pane** | A separate line/band for each pane (e.g., each row of a trellis) |
| **Per Cell** | A separate line/band for every individual mark grouping |

## A real reference band

Here's a reference band applied per pane, across a small multiple of
three regions' monthly sales — the gray band marks the same $0-$150,000
range on every pane, giving a shared visual reference as you scan down
the panes:

![Three small-multiple line charts (Consumer, Corporate, Home Office) each with a shaded gray reference band from $0 to roughly $150,000 behind the sales trend line.](/courses/tableau/ch13/77-advanced-reference-lines-bands-dynamic-targets/reference_bands_web2.png)
*A reference band applied to each pane of a trellis view, giving every segment the same shaded range to compare against.*
Source: [Tableau Help — Reference Lines, Bands, Distributions, and Boxes](https://help.tableau.com/current/pro/desktop/en-us/reference_lines.htm)

## Dynamic targets: a reference line driven by a parameter

A reference line's **Value** field doesn't have to be a hard-coded
number — it can reference a **parameter** instead. That turns a fixed
line into a **dynamic target** a user (or a parameter action) can move:

1. Create a parameter named `Threshold` (Float data type).
2. Add a reference line and set its Value field to the `Threshold`
   parameter instead of a constant. Set Fill Below to a light shading
   color, so everything under the threshold is visually called out.

![Edit Reference Line dialog showing the Value field set to the Threshold parameter, with Fill Below configured.](/courses/tableau/ch13/77-advanced-reference-lines-bands-dynamic-targets/actions_parameters_referenceline.png)
*A reference line built from a parameter instead of a fixed number — the Value dropdown points at Threshold, not a constant.*
Source: [Tableau Help — Parameter Actions](https://help.tableau.com/current/pro/desktop/en-us/actions_parameters.htm)

3. Create a **parameter action** (Dashboard → Actions → Add Action →
   Change Parameter) that runs on **Hover**, sourcing its value from the
   field a viewer hovers over, and targeting the `Threshold` parameter.

The result: hovering over any mark moves the reference line to that
mark's value, showing every other data point in context against it — a
genuinely interactive target line, built entirely from a parameter plus
one parameter action, no scripting involved.

## Key terms

| Term | Meaning |
|---|---|
| Reference line | A single line at a constant or computed axis value |
| Reference band | Shaded area between two constant or computed axis values |
| Scope (Table / Pane / Cell) | Controls whether a reference item applies once, per pane, or per individual mark grouping |
| Dynamic reference line | A reference line whose Value field points at a parameter, so it can move interactively |
| Parameter action | A dashboard action that updates a parameter's value based on user interaction (hover, select, or menu) |

## Lab

1. On Sample Superstore, build a small multiple of monthly sales by
   Segment, and add a reference band (per pane) matching the screenshot
   above.
2. Create a `Threshold` parameter, add a reference line using it as the
   Value field, and confirm you can move the line by changing the
   parameter manually.
3. Add a parameter action that updates `Threshold` on hover, and confirm
   the reference line now moves as you hover over different marks.

## Check yourself

You're ready for Lesson 78 when you can build a reference band with a
Per Pane scope and a dynamic, parameter-driven reference line that
updates on hover, without checking back on this lesson.
