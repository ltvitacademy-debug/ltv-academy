# Picklists and Multi-Select Picklists

**Chapter 2 · Fields · Lesson 11 of 23**

A Text field accepts anything a user types. A **Picklist** accepts only what you, the admin, put on
its list. That one restriction is what makes picklists the backbone of clean, reportable data —
"Industry," "Lead Source," and "Stage" are picklists for a reason.

## What you'll learn

- How a Picklist field differs from Picklist (Multi-Select) on the New Field wizard
- How to build a picklist's value list, and what "Restrict picklist" actually controls
- What a standard picklist (one Salesforce ships with the org) looks like in practice

## Choosing Picklist vs. Picklist (Multi-Select)

Both options sit in the same group on Step 1 of the New Custom Field wizard. **Picklist** lets a
user choose exactly one value; **Picklist (Multi-Select)** lets them choose several at once, shown
separated by semicolons on the record.

![Step 1 of a new field on the Product object, with Picklist and Picklist (Multi-Select) grouped together.](/courses/salesforce-data-model-fundamentals/ch02/11-picklists-and-multi-select-picklists/new-field-picklist-type.png)

Multi-select is the right call only when "more than one at a time" is a genuine, expected answer —
a Product's available Certifications, say. For almost everything else (Stage, Status, Priority),
plain Picklist is correct: a record is usually in exactly one state at a time.

## Building the value list

Step 2 of picklist creation asks for the field's values, one per line, plus a couple of checkboxes
worth knowing:

- **Display values alphabetically** — sorts the list instead of showing it in entry order.
- **Restrict picklist to the values defined in the value set** — when checked, this is a real data
  integrity guardrail: it blocks the API, automation, and integrations from writing any value that
  isn't on the list. Leave it unchecked, and the UI still restricts users, but the API does not.

![A new picklist field's Step 2, entering values and checking Restrict picklist to the values defined in the value set.](/courses/salesforce-data-model-fundamentals/ch02/11-picklists-and-multi-select-picklists/picklist-values-restrict.png)

## A standard picklist in the wild

Not every picklist is custom. **Lead Source** on the Lead object is a standard picklist Salesforce
ships out of the box — same mechanics (a defined value list), same Fields & Relationships entry,
just built in rather than created by an admin.

![The Lead object's Fields & Relationships list, with the standard Lead Source picklist field highlighted.](/courses/salesforce-data-model-fundamentals/ch02/11-picklists-and-multi-select-picklists/lead-source-standard-picklist.png)

## Where the field ends up

Once saved, a new picklist field shows up in its object's Fields & Relationships list exactly like
any other field — same table, same columns (Field Label, Field Name, Data Type).

![The newly created Macaron Flavor picklist field, now listed in the Product object's Fields & Relationships.](/courses/salesforce-data-model-fundamentals/ch02/11-picklists-and-multi-select-picklists/picklist-field-created.png)

## Key terms

| Term | Meaning |
|---|---|
| Picklist | A field restricting input to one value from an admin-defined list |
| Picklist (Multi-Select) | A picklist allowing more than one value to be selected at once |
| Restrict picklist to the values defined in the value set | A checkbox that enforces the value list at the API level, not just in the UI |
| Global picklist value set | A reusable value list multiple picklist fields can share, defined once in Setup |

## Check yourself

A picklist was created without checking "Restrict picklist to the values defined in the value set."
A data import later writes a value that isn't on the list. Did Salesforce block it — and why or why
not?
