# Lesson 82 — Filter & Highlight Actions

**Chapter 14 · Dashboards · Lesson 82 of 95**

## What you'll learn

- What a **dashboard action** actually is, and where the Actions dialog
  lives
- The real difference between a **filter action** and a **highlight
  action** — they look similar but solve different problems
- How the three trigger types (**Hover**, **Select**, **Menu**) change the
  feel of an interaction
- The fast, action-free way to turn on highlighting for a single field

## What a dashboard action is

A **dashboard action** is a rule that says: when a viewer interacts with one
sheet a certain way, something happens to another sheet (or the same one).
You already know the underlying mechanics — the fields and the marks — this
lesson is entirely about what happens *between* sheets once they're on the
same dashboard together. Every action lives in one place: **Dashboard >
Actions**, which opens the Actions dialog.

![The Actions dialog's "Add Action" dropdown, showing three action types available on this dashboard: Filter, Highlight, and URL.](/courses/tableau/ch14/82-filter-and-highlight-actions/filteraction1.png)
*The same dialog handles every action type this chapter covers — Filter and Highlight here, URL/Parameter/Set actions next lesson.*
Source: [Tableau Help — Filter Actions](https://help.tableau.com/current/pro/desktop/en-us/actions_filter.htm)

## Filter actions: narrowing what other sheets show

A **filter action** takes a selection on a source sheet and uses it to
filter one or more target sheets. Click a state on a map, and a table
elsewhere on the dashboard narrows to just that state's rows. This is the
single most common interaction pattern on any real Tableau dashboard — it's
what turns a wall of static charts into something a viewer actually
explores.

Configuring one asks you for:

- **Source sheet(s)** — where the selection happens
- **Run action on** — Hover, Select, or Menu (see below)
- **Target sheet(s)** — what gets filtered
- **What happens on clearing the selection** — whether the target reverts
  to showing everything, or keeps its last filtered state

## Highlight actions: pointing, not narrowing

A **highlight action** is easy to confuse with a filter action because the
trigger setup looks identical, but the effect is completely different: a
highlight action doesn't remove any data — it colors the matching marks and
dims everything else, on the same sheet or another one. Nothing disappears;
the viewer's eye is just directed toward what matches.

The fastest way to turn on highlighting doesn't even require the Actions
dialog: right-click a field in a view and check **Show Highlighter** — a
built-in search box appears above that view, letting a viewer type to
highlight matching marks without any action configuration at all.

![A field's right-click context menu in Tableau, with "Show Highlighter" checked among options like Show Filter, Sort, and Edit Aliases.](/courses/tableau/ch14/82-filter-and-highlight-actions/dashboard_best_practices4.png)
*Show Highlighter — the fastest path to highlighting, no Actions dialog required.*
Source: [Tableau Help — Best Practices for Effective Dashboards](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)

Reach for a real highlight *action* (via the Actions dialog) instead of
Show Highlighter when you want the highlight to originate from a click on
one sheet and land on a *different* sheet — Show Highlighter only affects
the view it's turned on for.

## Choosing a trigger: Hover, Select, or Menu

Every filter and highlight action needs a trigger, and the choice changes
the whole feel of the dashboard:

| Trigger | Behavior | Best for |
|---|---|---|
| **Hover** | Fires the instant the pointer rests on a mark | Fast, exploratory highlighting — feels responsive, but can feel noisy for filtering |
| **Select** | Fires only on a click | The standard choice for filter actions — deliberate, not accidental |
| **Menu** | Fires from a tooltip menu item the viewer clicks | Good when you want the interaction to be discoverable but not accidental at all |

A common mistake: using Hover for a filter action on a dense scatter plot.
Every stray mouse movement re-filters the whole dashboard, which reads as
broken rather than interactive. Save Hover for highlight actions, where
dimming and un-dimming rapidly feels natural; use Select for anything that
actually removes data from view.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard action | A rule connecting an interaction on one sheet to an effect on another (or the same) sheet |
| Filter action | An action that narrows a target sheet's data based on a source selection |
| Highlight action | An action that colors matching marks and dims the rest, without removing any data |
| Show Highlighter | A per-view, action-free highlighter search box turned on via a field's right-click menu |

## Lab

1. On a dashboard with a map and a detail table, add a filter action:
   source the map, target the table, trigger on Select.
2. On the same dashboard, right-click a Category or Segment field and
   enable Show Highlighter. Compare how it feels against building an
   equivalent highlight action through the Actions dialog with a Hover
   trigger.

## Check yourself

You're ready for Lesson 83 when you can explain the real difference between
a filter action and a highlight action (removing data vs. drawing attention
to it), and justify why Select is usually the safer trigger for filter
actions while Hover often works better for highlighting.
