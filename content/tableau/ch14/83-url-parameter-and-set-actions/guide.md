# Lesson 83 — URL, Parameter & Set Actions

**Chapter 14 · Dashboards · Lesson 83 of 95**

## What you'll learn

- **URL actions** — sending a viewer's click out to an external web page,
  and passing field values into that URL
- **Parameter actions** — using a click or selection to update a parameter,
  something you already built the mechanics for in Chapter 11
- **Set actions** — using a click or selection to add or remove members
  from a set, something you already built in Chapter 10
- Why all six action types (including filter and highlight from Lesson 82)
  live in exactly one dialog

## The full Actions dialog

By now you've seen the Actions dialog once already. Here's the complete
picture — every action type Tableau supports, all six of them, added from
the same **Add Action** dropdown:

![The full Actions dialog's "Add Action" dropdown, listing all six action types: Filter, Highlight, Go to URL, Go to Sheet, Change Parameter, and Change Set Values.](/courses/tableau/ch14/83-url-parameter-and-set-actions/Actions_dialog.png)
*Filter and Highlight from last lesson, Go to Sheet from next lesson, and the three covered here: Go to URL, Change Parameter, Change Set Values.*
Source: [Tableau Help — Set Actions](https://help.tableau.com/current/pro/desktop/en-us/actions_sets.htm)

## URL actions: sending a click somewhere else

A **URL action** sends a viewer's click (or hover) to a web address — and
critically, it can build that address dynamically using field values from
what was clicked. A common real pattern: clicking a customer name opens a
CRM record for that exact customer, because the URL is constructed as
something like `https://yourcrm.com/customers/<Customer ID>` with
`<Customer ID>` filled in from the selected mark. You configure the trigger
(Hover, Select, or Menu) exactly as you did for filter and highlight
actions, plus:

- The **target URL**, using `<Field Name>` placeholders anywhere a field
  value should be inserted
- Whether it opens in a new browser tab, a web page object embedded in the
  dashboard, or (on Tableau Server/Cloud) an in-context web page pane

This is the one action type that reaches *outside* Tableau entirely — every
other action in this chapter stays inside the workbook.

## Parameter actions: a click that drives a parameter

You already know parameters from Chapter 11 — a single value that
calculated fields and titles can reference. A **parameter action** lets a
viewer *set* that value by clicking or hovering on a mark, instead of using
a parameter control. Click a bar in a chart, and a parameter updates to that
bar's category; anything downstream referencing the parameter (a reference
line, a different chart's calculation, a dynamic title) reacts immediately.

Configuring one asks for the source sheet and field, the target parameter,
and — this part matters — what value gets assigned: usually the field value
from whatever was selected, though you can map it explicitly if the field
names don't match the parameter's data type exactly.

This is a meaningfully different interaction model than a parameter
control: instead of a viewer picking from a dropdown, the chart itself
becomes the input mechanism. "Click the region you care about" is a more
natural gesture than "find the matching value in a dropdown list."

## Set actions: a click that changes set membership

You already know sets from Chapter 10 — a custom subset of dimension
members. A **set action** lets a click or selection add, remove, or replace
which members belong to a set, instead of manually editing set membership.

![A fully-configured Add Set Action dialog: source sheet "Global Superstore 2016", target set "High Shipping Cost Orders", trigger set to Select, and options for "Running the action will: Assign values to set" paired with "Clearing the selection will: Add all values to set".](/courses/tableau/ch14/83-url-parameter-and-set-actions/Edit_Set_Action_dialog1.png)
*Two separate rules in one dialog: what happens when the action runs, and what happens when the selection clears — set actions are the one action type that has to define both.*
Source: [Tableau Help — Set Actions](https://help.tableau.com/current/pro/desktop/en-us/actions_sets.htm)

Notice the dialog defines **two** behaviors, not one: what happens when the
action *runs* (Assign / Add / Remove values to the set) and what happens
when the selection *clears* (Keep set values / Add all values to set /
Remove all values from set). This two-part design is what makes set actions
powerful for building "compare selected vs. everything else" interactions —
click a handful of products, and a calculated field built on set membership
(`IF [Selected Set]` ...) can now color or filter based on exactly that
click-driven selection, something covered in more depth by Chapter 10's
combined-sets material.

## Key terms

| Term | Meaning |
|---|---|
| URL action | An action that sends a click/hover to a web address, optionally built from field values |
| Parameter action | An action that sets a parameter's value from a click or selection, instead of a manual control |
| Set action | An action that adds, removes, or replaces set membership from a click or selection |
| `<Field Name>` placeholder | URL action syntax for inserting a clicked mark's field value into the target address |

## Lab

1. Build a URL action on any dashboard: source a table with a recognizable
   field (e.g. Product Name), target `https://www.google.com/search?q=<Product Name>`,
   trigger on Select. Confirm clicking a row opens a search for that
   specific product.
2. Build a parameter action that updates an existing parameter from
   Chapter 11 by clicking a mark, and confirm anything referencing that
   parameter updates immediately.

## Check yourself

You're ready for Lesson 84 when you can name all six action types available
in the Actions dialog, and explain what makes set actions different from
every other action type (they define two behaviors: running and clearing).
