# Lesson 22 — Related Lists

**Chapter 5 · Forms & Lists · Lesson 22 of 34**

## What you'll learn

- What a related list is, and why it appears at the bottom of a form
- How related lists are the reverse direction of a reference field from Chapter 3
- Real related lists you'd see on an Incident form, and what each one surfaces
- How related lists are configured — which ones show, and in what order

## The reverse direction of a reference field

Chapter 3 covered reference fields — a field on one record that points *to* another record on a
different table, like an Incident's "Caller" field pointing to a row in the User table. A
**related list** is the same relationship, read backwards. If the User table doesn't itself store
a list of "every incident this caller opened," ServiceNow builds that view on demand: it queries
every Incident record whose Caller field points back at *this* user, and renders the result as a
list at the bottom of the User's form. You're not looking at data stored on the User record — the
Incident table still owns that data — you're looking at a live query result ServiceNow runs
and displays as if it were part of the form you're on.

## Why related lists sit at the bottom of a form

A form's main fields describe the one record you opened. Related lists describe everything else
that *references* that record, from other tables entirely, which is why they're kept visually
separate — below the form fields, as their own tabbed or stacked section, often collapsible.
Scrolling to the bottom of an open Incident, you're not looking at more fields on that incident;
you're looking at other records, on other tables, that happen to point back at the incident you
have open.

## Real related lists on an Incident

An Incident form commonly carries several related lists: **Affected CIs**, showing configuration
items this incident impacts, from the CMDB; **Related Problems**, showing Problem records linked
to this incident as its root cause; and **Approvals**, showing any approval records tied to this
incident's workflow. None of those records live "inside" the Incident table — Affected CIs live
in the CMDB's own tables, Problems live in the Problem table, Approvals live in the Approval
table. Each related list is simply ServiceNow surfacing records from a different table, pre-
filtered to only the ones that reference the incident currently open.

## Configuring which related lists show

Related lists aren't fixed per table — they're configurable, the same philosophy Lessons 19 and
20 applied to form fields and list columns. From a form's related-list section, a "Configure >
Related Lists" option opens a picker showing every relationship ServiceNow knows how to run
against this table, letting you add a related list that isn't currently shown, remove one that
is, or reorder which appears first. This is how ServiceNow surfaces real one-to-many relationships
in the UI — Problem records realistically "belong to" many Incidents — without ever asking a user
to manually run a separate query against the Problem table just to see which ones relate.

## Key terms

| Term | Meaning |
|---|---|
| Related list | A list at the bottom of a form, showing records on other tables that reference the open record |
| Reverse reference | The underlying relationship a related list runs — the opposite direction of a reference field |
| Affected CIs | An Incident related list showing linked configuration items from the CMDB |
| Configure > Related Lists | The picker that controls which related lists show on a form, and in what order |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: if an Incident's "Related
Problems" related list shows two Problem records, which table actually stores those two records —
Incident, or Problem?
