# Lesson 10 — Grouping & Sorting

**Chapter 2 · Building Reports · Lesson 10 of 40**

## What you'll learn

- What the **Grouping pane** actually shows, and how it stays in sync
  with the design surface in both directions
- The difference between a **parent group**, a **child group**, and an
  **adjacent group**
- How **interactive sort** differs from a fixed, design-time sort order
- Practical rules for dragging fields into the Grouping pane without
  accidentally selecting the wrong item

## The Grouping pane, in both directions

Every table, matrix, or list you build has row groups, column groups,
or both, and the **Grouping pane** — split into **Row Groups** and
**Column Groups** — is the control center for all of them:

![The Row Groups pane showing three nested groups: CountryRegionName, with TerritoryName nested beneath it, and LastName nested beneath that.](/courses/ssrs/ch02/10-grouping-and-sorting/ssrb-rowgroups.png)
*A three-level nested hierarchy — country/region, then territory, then last name — each level indented under its parent.*

The relationship between the design surface and the Grouping pane runs
**both ways**: select a group in the pane, and the matching cell
highlights on the design surface. Select a grouping cell on the design
surface, and the matching entry highlights in the pane. Once reports
get complex, the Grouping pane is often the faster, more reliable place
to work — it's a lot easier to click an unambiguous list entry than to
hunt for one specific cell buried in a dense tablix.

## Parent, child, and adjacent groups

A field dragged **under** another field in the Grouping pane becomes a
**child group** — indented, nested inside its parent. A field dragged
to sit **beside** an existing group at the same level, added through
the **Add Group** shortcut rather than a plain drag, becomes an
**adjacent group** — a sibling, not a child:

![A tablix with nested row groups (a category group containing a "Subcat" child group) and nested plus adjacent column groups (a geography group with a nested country/region group, sitting adjacent to a separate year group).](/courses/ssrs/ch02/10-grouping-and-sorting/rs-basictablixdesigngroupingpanedefaultview.gif)
*Category → Subcat is a parent/child pair; Geography → CountryRegion is nested, while Year sits adjacent to Geography — a sibling group, not a child of it.*

- **Parent/child**: indented under each other; child repeats once per
  parent instance.
- **Adjacent**: sit at the same visual depth but represent genuinely
  separate groupings side by side — for a column group, this is how you
  get, say, a weekday breakdown next to a subcategory breakdown, rather
  than nested inside it.

## Fixed sort vs. interactive sort

There are two entirely different kinds of "sort" in a report:

- **Design-time sort** — set once, baked into the report, controlling
  the order groups or detail rows render in. Right-click a group in the
  Grouping pane, or a data region, and use **Group Properties** →
  **Sorting** (or the equivalent on the data region itself).
- **Interactive sort** — a clickable button added to a column header
  that lets whoever's *viewing* the report re-sort the detail rows
  on demand, without touching the report definition. You add it by
  right-clicking a text box, selecting **Text Box Properties** →
  **Interactive Sorting**, checking **Enable interactive sorting on
  this text box**, and specifying which field to sort by.

The two aren't mutually exclusive — a report can have a sensible
default (design-time) sort order and still let the viewer override it
per column (interactive sort) at runtime.

## A practical dragging tip

Microsoft's own design guidance calls this out directly: when dragging
a field from the **Report Data** pane down into the **Grouping** pane,
avoid dragging it *across* other report items on the design surface —
doing so selects those items and deselects your data region. Drag the
field straight down through the Report Data pane, then across into the
Grouping pane, to keep your intended data region selected the whole
time.

## Key terms

| Term | Meaning |
|---|---|
| Grouping pane | The Row Groups / Column Groups control center for the selected data region |
| Parent/child group | A field nested (indented) under another — repeats once per parent instance |
| Adjacent group | A sibling group at the same depth, representing a separate grouping, not a nested one |
| Design-time sort | A fixed sort order baked into the report definition |
| Interactive sort | A clickable header button letting the report viewer re-sort at runtime |

## Lab

1. On a table or matrix you've already built, open the Grouping pane
   and confirm you can select a group there and watch the matching cell
   highlight on the design surface (and vice versa).
2. Add an interactive sort button to one column header via **Text Box
   Properties** → **Interactive Sorting**.
3. Run the report and confirm clicking that header actually re-sorts
   the detail rows.

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: the
difference between a child group and an adjacent group, and the
difference between a design-time sort and an interactive sort.
