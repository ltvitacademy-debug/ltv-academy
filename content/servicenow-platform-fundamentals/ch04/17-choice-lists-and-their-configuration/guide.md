# Lesson 17 — Choice Lists & Their Configuration

**Chapter 4 · Dictionary Entries & Field Types · Lesson 17 of 34**

## What you'll learn

- Where Choice list values actually live: the `sys_choice` table, not the dictionary entry itself
- What a `sys_choice` row carries, and how it ties back to one table and field
- Dependent choices — how Category/Subcategory cascades really work
- Why Incident's `priority` field is a real example worth knowing by heart, impact x urgency and all

## A Choice field's values live somewhere else

Lesson 16 introduced Choice as one of the common field types. What it didn't cover
is where the actual list of selectable values comes from — and the answer is a
separate table, `sys_choice`, not the dictionary entry itself. The dictionary entry
for a Choice-type field just says "this field's type is Choice." The specific
values a user can pick from — "New," "In Progress," "Resolved," and so on — are
individual rows in `sys_choice`, each one tied back to a specific table and field.

## What one `sys_choice` row carries

A single row in `sys_choice` carries, at minimum: the **table** and **field name**
it belongs to, a **label** (the human-readable text shown in the dropdown, like
"In Progress"), and a **value** (the underlying stored value, which is often — but
not always — different from the label). It also carries a **sequence** number
controlling the order options appear in the dropdown, and can be marked **inactive**
to retire an old option without deleting historical records that still reference
it. Opening System Definition > Choice Lists shows you this table directly, filtered
however you need.

## Dependent choices — cascading lists

Some Choice fields are **dependent** on another Choice field — the classic example
being Category and Subcategory on Incident. Selecting "Hardware" as the Category
narrows the Subcategory dropdown down to only the subcategories that make sense
under Hardware ("Laptop," "Monitor," "Printer"), hiding subcategories that belong
to other categories entirely. Under the hood, each `sys_choice` row for the
dependent field (Subcategory) carries an extra value identifying which parent
choice it belongs to, and the form only shows the rows whose parent matches
whatever was picked in the controlling field. This is configured on the dependent
field's dictionary entry, by setting its **Dependent on field** attribute to point
at the controlling field.

## A real, worth-memorizing example: Incident priority

Incident's `priority` field is a Choice list with five real out-of-box values:
**1 - Critical**, **2 - High**, **3 - Moderate**, **4 - Low**, and **5 - Planning**.
What's worth knowing on purpose is that in a correctly configured instance,
`priority` is usually not something an agent picks directly — it's **calculated**,
derived from the combination of **Impact** and **Urgency**, each their own Choice
fields on the same record, run through a priority lookup matrix defined in the
system (the `priority_lookup_matrix` behavior). Set Impact to "1 - High" and
Urgency to "1 - High," and the platform computes Priority as "1 - Critical" without
the agent touching the Priority field at all. This matters because it shows Choice
fields aren't always simple, independently-chosen dropdowns — some are themselves
driven by other configuration layered on top.

## Why this closes the loop on the chapter

Between Lesson 15's dictionary entry, Lesson 16's field types, and this lesson's
choice lists, you now have the full picture of what actually controls a field's
behavior: the dictionary entry sets the shape (type, mandatory, read-only), and
for Choice-type fields specifically, `sys_choice` supplies the actual selectable
values, optionally cascading through a dependent field, and optionally overridden
entirely by calculated logic like the priority matrix. The lab in Lesson 18 puts
all three pieces together by hand.

## Key terms

| Term | Meaning |
|---|---|
| `sys_choice` | The table holding one row per selectable value for a Choice field, tied to a table + field |
| Label vs. value | The text shown in the dropdown vs. the underlying stored value — often different |
| Dependent choice | A Choice field whose options narrow based on what was picked in a controlling field |
| Priority lookup matrix | Out-of-box logic that calculates Incident priority from Impact x Urgency |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why is Incident's
`priority` field a bad example to use if someone asks you "show me a Choice field
where the agent just picks a value from a dropdown" — what's actually happening
to that field instead?
