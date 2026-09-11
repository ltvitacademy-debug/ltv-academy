# Lesson 26 — Drilldown Reports

**Chapter 6 · Drilldowns & Navigation · Lesson 26 of 40**

## What you'll learn

- What a drilldown action is, and how it's genuinely different from a
  drillthrough
- The two properties every drilldown depends on: **Hidden** and
  **ToggleItem**
- The containing-scope rule — why the toggle text box can't be the item
  it's hiding
- Why the show/hide toggle behaves differently across rendering
  extensions

## Expand and collapse, without leaving the report

A **drilldown action** lets a user click plus (+) and minus (–) icons on
a text box to interactively show or hide part of a report — a table's
detail rows, a chart's supporting data, a nested group's children.
Nothing new gets requested from the server; the report simply refreshes
to reveal or re-hide content that was already there. That's the core
distinction from a **drillthrough** report (Lesson 27), which opens an
entirely separate report instead of expanding in place.

## Two properties: Hidden and ToggleItem

Every drilldown comes down to two settings on the item you want to hide:

- **Hidden** — set under **Visibility**, to **Show**, **Hide**, or
  **Show or hide based on an expression** evaluated at run time.
- **ToggleItem / "Display can be toggled by this report item"** — the
  name of a text box elsewhere in the report that the user clicks to
  flip the item's current Hidden state.

You configure these two ways:

1. **On a group, row, or column** — switch the Grouping pane to
   **Advanced** mode, select the group, and set **Visibility** →
   **Hidden** and **ToggleItem** on its Tablix Member properties.
2. **On a standalone report item** (a whole table, chart, or rectangle)
   — right-click it, choose **Properties**, and set the same two
   options on the **Visibility** tab.

![Tablix Properties dialog's Visibility tab: Hide selected, with the toggle checkbox and a Textbox1 toggle target chosen from a list of textboxes.](/courses/ssrs/ch06/26-drilldown-reports/expand-collapse-report-table.png)
*The Visibility tab: Hide selected, toggled by a chosen text box.*

## The containing-scope rule

The toggle text box can't be the row or column group you're hiding — it
has to sit in the **same group as the hidden item, or in an ancestor
group above it**. Concretely: to toggle a child group's rows, put the
toggle text box in a row that belongs to the parent group (or higher in
the containment hierarchy). Get this backwards and Report Builder won't
even offer that text box as a valid ToggleItem.

## Rendering support varies

The show/hide toggle only works in rendering extensions built for
interactivity — the HTML viewer used in Report Builder's preview and the
web portal. Everywhere else, "hidden" doesn't behave the same way:

- **HTML** — hidden items are genuinely absent from the source until the
  user toggles them.
- **Excel** — expands and displays everything; all rows and columns
  render visible regardless of Hidden.
- **XML** — renders every item, hidden or not.

## Key terms

| Term | Meaning |
|---|---|
| Drilldown action | Expand/collapse toggle that shows or hides part of the *same* report, in place |
| Hidden | The Visibility property controlling whether an item displays when the report first runs |
| ToggleItem | The text box a user clicks to flip an item's Hidden state |
| Containing scope | The rule that a toggle text box must be in the same group as, or an ancestor of, the item it controls |

## Lab

1. Build (or open) a table grouped by a category column, with a
   **Details** group showing line-level rows.
2. Switch the Grouping pane to **Advanced** mode, select the Details row
   group, and in Tablix Member properties set **Hidden** to `True` and
   **ToggleItem** to the category text box.
3. Run the report. Confirm the category rows display +/- icons and that
   clicking one reveals or hides its detail rows.
4. Try setting the ToggleItem to a text box that lives *inside* the
   Details group itself, and confirm Report Builder won't let you —
   that's the containing-scope rule in action.

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: what
are the two properties that make a drilldown action work, and why can't
the toggle text box live inside the group it's hiding?
