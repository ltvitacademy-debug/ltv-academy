# Lesson 19 — Form Layout & Form Design

**Chapter 5 · Forms & Lists · Lesson 19 of 34**

## What you'll learn

- How "Configure > Form Layout" moves fields between a form and an available-fields list
- What a form section actually is, and why forms group fields into tabs
- What a UI Policy is, at the concept level, and the problem it solves
- The real difference between hiding a field on a form and removing its dictionary entry

## Configure > Form Layout — moving fields, not creating them

Every form in ServiceNow — an Incident, a Change Request, a custom record — has a right-click
menu on the form header (or a gear/Configure icon, depending on your instance's UI) with a
**Form Layout** option. Opening it shows a two-column picker: on one side, every field from
Chapter 3's `sys_dictionary` that exists on this table but isn't currently on the form; on the
other side, the fields currently shown, in the order they appear. You move fields across with the
arrow buttons, reorder the shown side by dragging, and save. Nothing here touches the field
itself — you're only changing which fields this particular form displays, and in what order.
That's the whole operation: Form Layout is a view-level decision, not a schema change.

## Sections — grouping fields into tabs

A long form like Incident doesn't show forty fields in one unbroken column. It's broken into
**sections** — labeled groups of fields, often rendered as tabs ("Notes," "Closure Information,"
"SLA") or as visually separated blocks on the same page. Sections exist purely for usability: a
caller doesn't need to see closure-code fields until the incident is actually being resolved, so
those fields live in a section that's easy to collapse or ignore until needed. Form Layout lets
you add a new section, assign fields to it, and reorder sections the same way you reorder
individual fields — drag the section itself, or move it via the same configure menu.

## UI Policies — conditional form behavior, introduced

Hiding a field permanently in Form Layout works when a field should *never* appear for a given
table. But often the real need is conditional: "mandatory only when Category is Hardware," or
"hidden unless the caller is a VIP." That's what a **UI Policy** is for — a record (configured
through **System UI > UI Policies**, no scripting required for the basic case) that says: when
this condition on the form is true, make these fields visible/hidden, mandatory/optional, or
read-only/editable. UI Policies run live in the browser as the user fills out the form, reacting
instantly as field values change. This course only introduces the concept here — writing the
underlying UI Policy scripts for complex conditions is covered in later, more advanced courses in
this path.

## Form view vs. the table dictionary — a real distinction

It's tempting to think removing a field from a form "deletes" it, but that's not what happens.
The field's actual definition — its name, type, length, default value — lives in
`sys_dictionary`, exactly as Chapter 3 covered. Form Layout only controls whether *this form*
displays that field. The data is still there on every record; other forms, reports, and list
views built on the same table can still reference it. If you need to actually remove a field from
the table itself, that's a dictionary-level change (deleting the column), a much more consequential
action than anything Form Layout does. Knowing this distinction — "did I just hide a field, or did
I delete it?" — is one of the first things that separates a careful admin from one who causes
avoidable data-loss panic.

## Key terms

| Term | Meaning |
|---|---|
| Form Layout | The Configure menu option that moves fields between a form and an available-fields list |
| Section | A labeled group of fields on a form, often rendered as a tab |
| UI Policy | A record defining conditional show/hide, mandatory/optional, or read-only behavior on a form |
| Dictionary entry | The underlying `sys_dictionary` record defining a field — unaffected by Form Layout changes |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: if you remove a field from an
Incident form using Form Layout, does that field's data disappear from existing incident records?
Why or why not?
