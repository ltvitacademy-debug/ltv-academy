# Lesson 35 — Capstone: Build Data Model & Security

**Chapter 9 · Capstone: a Custom Scoped Application · Lesson 35 of 37**

## What you'll learn

- The real table and field structure for both capstone tables, built from Lesson 34's sketch
- How the reference field between request and equipment actually works in a query
- How to write a real ACL script restricting who can edit a sensitive field
- Why the capstone's utility Script Include should be scoped "This application scope only"

## The equipment table, field by field

`x_acme_eqchk_equipment` is a lookup table — it doesn't extend `task`, because it isn't a workflow
record, it's reference data. Its real fields:

| Field (column name) | Type | Purpose |
|---|---|---|
| `asset_tag` | String | The physical inventory tag, e.g. `LAP-00482` |
| `equipment_name` | String | A human-readable name, e.g. "Dell Latitude 5440" |
| `category` | Choice | Laptop, Monitor, Badge, Other |
| `equipment_condition` | Choice | New, Good, Fair, Needs Repair, Retired |
| `availability` | Choice | Available, Checked Out, Retired |

`equipment_condition` is the field this lesson locks down with an ACL below — it reflects a
judgment call about the physical item, and not every role should be able to change it.

## The request table: extending task, not reinventing it

`x_acme_eqchk_request` extends `task`, exactly as Lesson 34 decided. On top of everything `task`
already provides — `state`, `assigned_to`, `opened_by`, `short_description` — it adds:

| Field (column name) | Type | Purpose |
|---|---|---|
| `equipment` | Reference → `x_acme_eqchk_equipment` | Which item was requested |
| `requested_for` | Reference → `sys_user` | Who the equipment is for |
| `approved_by` | Reference → `sys_user` | The manager who approved it |
| `due_date` | Date/Time | When it must be returned |
| `checkout_date` | Date/Time | When IT actually handed it over |
| `return_date` | Date/Time | When it actually came back |

The `equipment` field is a real reference field, and the relationship it creates is exactly the
dot-walk pattern used throughout this course — a request record never duplicates the equipment's
name or condition; it just points at the equipment record and dot-walks to read whatever it needs:

```javascript
// Reading the equipment's condition from a request record, via dot-walk —
// no duplicated data, no separate lookup query required
var gr = new GlideRecord('x_acme_eqchk_request');
gr.get(requestSysId);

var equipmentName = gr.equipment.equipment_name.toString();
var condition = gr.equipment.equipment_condition.getDisplayValue();
```

## Locking down equipment_condition with a real ACL

Not everyone who can see an equipment record should be able to change its condition — that's a
judgment call reserved for whoever actually inspects the physical item. An Access Control on
`x_acme_eqchk_equipment.equipment_condition`, operation `write`, with a condition script enforces
that:

```javascript
// ACL script — x_acme_eqchk_equipment.equipment_condition (write)
// Only the equipment admin role (or a system admin) may change this field.
answer = gs.hasRole('x_acme_eqchk.equipment_admin') || gs.hasRole('admin');
```

This is the same ACL model this course assumes from the platform-administration courses earlier
in the path: a `write` ACL on a specific field, evaluated field-by-field, that returns a boolean
into `answer`. Anyone without `x_acme_eqchk.equipment_admin` (a custom role created for this
application) or `admin` sees the field read-only, even if they can edit every other field on the
form.

## Scoping the Script Include: this application only

Lesson 36 builds a Script Include, `EquipmentAvailabilityChecker`, whose one job is checking
whether a piece of equipment is currently loaned out. Chapter 3 and Chapter 5 both matter here:
Chapter 3 established that Script Includes are reusable server-side logic, and Chapter 5's
cross-scope lessons showed that a Script Include's **Application Access** field controls whether
code *outside* its scope can call it at all. Nothing outside `x_acme_eqchk` has any reason to ask
whether a piece of equipment is available — no other application in this instance cares — so this
Script Include is set to **"This application scope only"**, not "all application scopes." That's
a deliberate security choice, not a default left unexamined: the narrowest access that still lets
this application's own Business Rule and Client Script (built next) call it.

## Key terms

| Term | Meaning |
|---|---|
| Lookup table | A reference table (here, equipment) holding data other records point to, not a workflow record |
| Reference field | A field (here, `equipment`) storing a sys_id link to another table's record |
| Dot-walk | Reading a referenced record's field directly through the reference, e.g. `gr.equipment.equipment_name` |
| ACL (Access Control) | A rule, evaluated per table/field/operation, that returns a boolean into `answer` |
| Application Access | The Script Include setting controlling whether other scopes can call it |

## Check yourself

Without looking back: why is "This application scope only" the right Application Access setting
for `EquipmentAvailabilityChecker`, rather than "all application scopes"?
