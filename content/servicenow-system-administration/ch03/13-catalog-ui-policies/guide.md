# Lesson 13 — Catalog UI Policies

**Chapter 3 · Service Catalog Administration · Lesson 13 of 36**

## What you'll learn

- Why Catalog UI Policies (`catalog_ui_policy`) are a distinct object from the UI Policies covered in Course 2
- What a Catalog UI Policy can actually do: show/hide, mandatory, and read-only — applied to variables
- How to build a condition that reacts to one variable's value and changes another variable
- The real example this lesson walks through: showing an approval-reason variable only when a cost-center override is checked
- Why this separation between table fields and catalog variables exists at all

## A familiar idea, on a different kind of field

Course 2 of this path covered UI Policies — rules that show, hide, require, or lock down a **field on a table**, reacting to the value of another field on that same form, without writing a single line of client script. A Catalog UI Policy does the exact same conceptual job, but it operates on a **variable** on a catalog item's request form instead of a regular table field. That distinction is not cosmetic: catalog variables aren't stored as columns on a form's underlying table the way `priority` or `assignment_group` are — they live in `item_option_new`/`sc_item_option`, a fundamentally different structure — so the regular UI Policy engine that watches table fields has no way to see or react to them. ServiceNow ships a separate object type, `catalog_ui_policy`, specifically so administrators can apply the same show/hide/mandatory/read-only logic to catalog variables.

## What a Catalog UI Policy can do

A Catalog UI Policy record has the same three levers as a standard UI Policy, just aimed at variables instead of fields:

- **Visible** — show or hide a variable entirely based on a condition.
- **Mandatory** — force the requester to fill in a variable before they can submit, but only when the condition is true.
- **Read-only** — let the requester see a variable's value without being able to change it.

Each policy is built from a condition (one or more variables compared to a value, combined with AND/OR) and a set of actions naming which variables to affect and how. Just like its table-field counterpart, a Catalog UI Policy runs entirely on the client — the requester sees the form react live, in real time, as they fill it in, with no page reload and no server round-trip for the show/hide itself.

## Worked example: conditional approval reason

Imagine a catalog item for requesting a budget increase that includes two variables: a Checkbox variable called "Cost Center Override" and a Multi Line Text variable called "Manager Approval Reason." Most requesters never touch the override, and the approval-reason field would just be noise on their form. The Catalog UI Policy here is built as:

- **Condition:** "Cost Center Override" is true
- **Action:** make "Manager Approval Reason" Visible = true and Mandatory = true

When the condition is false — the default state for most requesters — "Manager Approval Reason" stays hidden and isn't required, keeping the form short. The moment someone checks "Cost Center Override," the reason field appears and instantly becomes required, and they can't submit the request without filling it in. This is precisely the same pattern Course 2 taught for table fields, just pointed at `item_option_new` records instead of `sys_dictionary` columns.

## Why administrators need to know both object types exist

A common early mistake is going looking for a newly built catalog variable inside the regular UI Policy list and not finding it — or the reverse, building a Catalog UI Policy and expecting it to control a real table field like `short_description`. Neither works, because the two object types watch and act on entirely different kinds of data. Knowing which one you need, before you start building the condition, saves the troubleshooting step of wondering why a rule that looks correct simply never fires.

## Key terms

| Term | Meaning |
|---|---|
| `catalog_ui_policy` | The object type for show/hide, mandatory, and read-only rules applied to catalog variables |
| UI Policy (standard) | The Course 2 object type for the same rules applied to regular table fields |
| Visible / Mandatory / Read-only | The three actions a Catalog UI Policy can apply to a target variable |
| Condition | The variable-value comparison(s) that must be true for the policy's actions to apply |
| Client-side | How both UI Policy types run — reacting instantly in the browser, no server round-trip |

## Check yourself

You've built a Catalog UI Policy that should make a "Rush Justification" variable mandatory whenever a "Need by Date" variable is less than 3 business days away, but it isn't firing. Before checking the condition's logic, what's the first object-type question you should ask about where "Need by Date" and "Rush Justification" actually live?
