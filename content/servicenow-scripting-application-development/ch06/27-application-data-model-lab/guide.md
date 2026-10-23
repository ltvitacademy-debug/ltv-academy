# Lesson 27 — Application Data Model Lab

**Chapter 6 · Tables, Forms & Modules for a Custom Application · Lesson 27 of 37**

## What you'll learn

- How to apply Lesson 24's extend-task-or-stand-alone rule to a complete, two-table custom application
- How to plan the reference field connecting those two tables, in both directions
- How to describe the Form Layout, List Layout, Application Menu, and Module records that make the finished app both usable and navigable
- How this chapter's three ideas — design, build, navigate — combine into one real planning exercise, on paper

## The scenario

The IT department wants a small custom application: **Equipment Checkout**. Employees need to
check out shared hardware — a loaner laptop, a presentation camera, a conference-room projector —
for a specific trip or event, and return it afterward. Before anyone opens Studio, walk through
the same sequence of questions Lesson 24 through 26 taught you to ask, exactly the way a real
ServiceNow developer would in a design review.

## Step 1 — Identify the entities and the extend decision

Two real entities fall out immediately. A **checkout** — one employee's specific request to take
one specific piece of equipment out for a specific window of time, which needs to be approved,
tracked while it's out, and closed out when it's returned. And a piece of **equipment** — a
physical item with a name, an asset tag, and a category, that simply exists in inventory whether
or not it's currently checked out. Apply Lesson 24's rule to each. The checkout needs a real
lifecycle — Requested, Approved, Checked Out, Returned — plus an assignment group for whoever
manages the equipment pool, so it **extends `task`**, inheriting `state`, `assignment_group`, and
priority for free. The equipment item itself has no workflow of its own; it's descriptive,
lookup-style inventory data, so it's a **standalone table** with no parent — the same reasoning
Lesson 24 applied to the Room table, now applied to an equipment catalog instead.

## Step 2 — Build the tables, the reference field, and both layouts

Following Lesson 25's build sequence: create `x_acme_eq_checkout` with **Extends** set to `task`,
and `x_acme_eq_equipment` with **Extends** left blank. On the checkout table, add an
`equipment_item` field with **Type** set to **Reference** and **Reference** set to the equipment
table — the field that lets a checkout store a clean pointer to exactly which item was requested,
displaying its name while storing its `sys_id`. Add a second reference field, `requested_for`,
pointing at `sys_user`, since the person submitting a checkout isn't always the person it's for.
Configure **Form Layout** on the checkout table with two sections — a Request section
(`equipment_item`, `requested_for`, `short_description`) and a Logistics section (checkout date,
expected return date) — and configure **List Layout** to show `short_description`,
`equipment_item`, `state`, and `assignment_group`, so whoever manages the pool can scan open
checkouts at a glance. On the equipment table, a simpler Form and List Layout is enough: asset
tag, equipment type, and location are all that's needed to identify an item.

## Step 3 — Wire up navigation: the Application Menu and two Modules

The Equipment Checkout app's **Application Menu** record already exists the moment the scoped
application itself was created, exactly as Lesson 26 described — there's nothing new to build
there. What's missing, per Lesson 25's real gap, is a way to actually reach either table from the
navigator. Two Modules close that gap, each with its **Application menu** field pointing at the
Equipment Checkout menu. The first, **"Checkouts,"** has **Link type** set to **List of Records**
pointed at `x_acme_eq_checkout`, with **Order** set to 100 so it's the first thing anyone sees —
this is the module the equipment-pool coordinator will use constantly, so it belongs at the top.
The second, **"Equipment Catalog,"** also **List of Records**, points at `x_acme_eq_equipment`,
with **Order** set to 200 — reached less often, so it sits beneath the first module rather than
competing with it for attention.

## What you just practiced

This lab combined every real decision from this chapter into one worked example: identifying real
entities before building anything (Lesson 24), applying the extend-`task`-or-stand-alone rule to
each one and planning the reference field between them (also Lesson 24), building the tables and
both layouts exactly as a real Studio session would (Lesson 25), and closing the reachability gap
with an Application Menu and two correctly ordered Modules (Lesson 26). That is the complete,
real sequence a ServiceNow developer runs for any new custom application — not just this one.

## Key terms

| Term | Meaning |
|---|---|
| `x_acme_eq_checkout` | The transactional table in this lab, extending `task` for its approval and state lifecycle |
| `x_acme_eq_equipment` | The standalone lookup table in this lab, holding static inventory data with no workflow |
| `equipment_item` | The reference field connecting a checkout to the specific equipment record it's for |
| Two ordered Modules | "Checkouts" (Order 100) and "Equipment Catalog" (Order 200), both under the same Application Menu |

## Try it yourself

Sketch one more module for this same application, on paper, before Chapter 7 begins: an
**"Overdue Checkouts"** module. Decide its Link type (still List of Records, pointed at the same
checkout table, just with a filter condition applied), and decide where its Order value should
place it relative to the two modules already built.
