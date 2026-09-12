# Lesson 80 — Dashboard Layout: Containers, Tiled & Floating Objects

**Chapter 14 · Dashboards · Lesson 80 of 95**

## What you'll learn

- The difference between **tiled** and **floating** layout, and why Tableau
  defaults every object to tiled
- What **layout containers** (horizontal and vertical) actually do, and why
  almost every clean professional dashboard is built from nested containers
  rather than loose floating objects
- How to read the Objects panel so you can add exactly the layout structure
  you intend, instead of fighting Tableau's automatic layout
- A practical rule for when floating is genuinely the right call

## Tiled vs. floating: the fundamental choice

Every object you add to a dashboard — a worksheet, a text box, an image, a
filter legend — is either **tiled** or **floating**, and this single choice
determines how it behaves for the rest of the dashboard's life.

- **Tiled** objects live in a grid. Add one, and it claims a rectangular
  slot; add another next to it, and Tableau automatically resizes both to
  fit. Move or resize a tiled object and its neighbors shift to accommodate
  it. This is Tableau's default for a reason: it keeps a dashboard's
  layout internally consistent even as you add and remove pieces.
- **Floating** objects sit on top of the tiled layout at an exact position
  and size you set, ignoring the grid entirely. Move a floating object and
  nothing else on the dashboard reacts.

![Diagram from Tableau's documentation showing a floating layout: one worksheet, outlined in red, positioned on top of a tiled grid of other worksheets behind it.](/courses/tableau/ch14/80-dashboard-layout-containers-tiled-floating/dashboard_layout_floating.jpg)
*A floating object (outlined in red) sits at a fixed position over the tiled layout beneath it — the tiled grid doesn't reflow to make room.*
Source: [Tableau Help — Size and Lay Out Your Dashboard](https://help.tableau.com/current/pro/desktop/en-us/dashboards_organize_floatingandtiled.htm)

You toggle which mode new objects use with the **Tiled / Floating** switch
at the bottom of the Objects panel — set it before you drag something in,
since changing an existing object's mode afterward requires you to select it
and check "Floating" from its context menu individually.

## The Objects panel and layout containers

![Tableau Dashboard pane's Objects section, showing Horizontal and Vertical container icons, Text/Image/Web Page/Blank object types, and the Tiled/Floating toggle at the bottom.](/courses/tableau/ch14/80-dashboard-layout-containers-tiled-floating/layout_container1.png)
*Everything you can add to a dashboard, in one panel — containers at the top, object types in the middle, tiled/floating mode at the bottom.*
Source: [Tableau Help — Size and Lay Out Your Dashboard](https://help.tableau.com/current/pro/desktop/en-us/dashboards_organize_floatingandtiled.htm)

A **layout container** is an invisible structural box that holds other
objects (including other containers) and arranges them either side-by-side
(**Horizontal**) or stacked (**Vertical**). This is the actual mechanism
behind almost every clean dashboard you've ever seen:

| Container type | Arranges children | Typical use |
|---|---|---|
| **Horizontal** | Left to right | A row of KPI tiles, or two charts side by side |
| **Vertical** | Top to bottom | A KPI header row stacked above a chart, or filters stacked above a legend |

Drag a Horizontal container onto the canvas, then drag two worksheets inside
it, and you get a predictable two-column row — resize the container and both
children resize proportionally together. Nest a Vertical container inside a
Horizontal one (or vice versa) and you can build genuinely complex,
predictable grid layouts without ever touching floating mode. This is why
experienced Tableau developers build almost the entire dashboard skeleton
out of nested containers first, then use floating sparingly for the few
things that specifically need to overlap something else.

## When floating is actually the right call

Floating isn't a bad practice — it's a targeted one. Use it when you
deliberately want one object to sit *on top of* another rather than beside
it:

- A **KPI header banner** floating over the top edge of a busy chart
  behind it
- A **filter panel** that a Show/Hide button can toggle in and out without
  disturbing the rest of the layout (Lesson 84)
- A **logo or annotation** that needs to sit in a specific corner regardless
  of what else is on the canvas

The failure mode to avoid: building an entire dashboard out of floating
objects because it feels more "free," then discovering it looks fine on your
screen and breaks completely on anyone else's, because nothing reflows.
Containers first, floating on purpose, not by default.

## Key terms

| Term | Meaning |
|---|---|
| Tiled | Layout mode where objects live in an automatically-adjusting grid |
| Floating | Layout mode where an object sits at a fixed position/size, ignoring the grid |
| Layout container | An invisible box (Horizontal or Vertical) that arranges its child objects |
| Nesting | Placing a container inside another container to build complex grid structures |

## Lab

1. Open a dashboard with at least two worksheets. Add a Horizontal
   container, drag both worksheets inside it, and observe how resizing the
   container resizes both children together.
2. Add one new object (a text box or image) and set it to Floating. Position
   it over a corner of your tiled layout, then try resizing one of the tiled
   worksheets — confirm the floating object doesn't move.

## Check yourself

You're ready for Lesson 81 when you can explain why a professional dashboard
is typically built mostly from nested Horizontal/Vertical containers rather
than floating objects, and name one legitimate reason to use floating
anyway.
