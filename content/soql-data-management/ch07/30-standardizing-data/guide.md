# Standardizing Data

Lesson 28 introduced the problem: fields that should hold a handful of consistent categories
end up holding dozens of spellings. This lesson is about finding those variants with SOQL,
cleaning them up, and preventing them from returning.

## What you'll learn

- The difference between picklist fields and free-text fields, and why it matters for reporting
- How to use `GROUP BY` on a text field to surface every variant
- A repeatable cleanup process from messy values to standard ones

## Picklists vs. free text

A **picklist** lets users choose from a defined list of values. A **restricted picklist** goes
further: it rejects any value that is not on the list, including values sent in through the
API or Data Loader. An unrestricted picklist can still accept outside values from the API,
which is one way messy values sneak into a field that looks controlled in the UI.

A **free-text field** accepts whatever is typed. That flexibility is right for a name or a
description, but it is the wrong choice for anything you intend to group or count, because
every distinct spelling becomes its own category.

## Finding the variants with GROUP BY

You already know `GROUP BY` from Chapter 2. Pointed at a text field, it doubles as a
profiling tool:

```sql
SELECT Title, COUNT(Id) total
FROM Contact
GROUP BY Title
ORDER BY COUNT(Id) DESC
```

Each distinct string becomes its own row. Illustrative output:

```text
Title                     total
VP Sales                    212
Vice President of Sales      87
VP, Sales                    41
vp sales                     19
```

That is one real job title in four groups. Any report grouped on this field undercounts all of
them. The same approach works on `LeadSource`, `Industry`, or any custom text field.

## A repeatable cleanup

1. **Group.** Run the `GROUP BY` query and export the list of variants.
2. **Map.** In a spreadsheet, pair each variant with the one standard value it should become.
3. **Fix.** Include `Id` in your query, join your mapping back to the records, and update them
   with Data Loader (an update operation keyed on `Id`).
4. **Lock.** Convert the field to a picklist, restricted if the business wants a strict list, so
   the same drift cannot happen again.

If the field is already a picklist, admins can also replace one value with another across
existing records from the picklist's setup page, which is worth knowing before you plan a
mass update.

## Key terms

| Term | Meaning |
|---|---|
| Picklist | A field where users choose from a fixed list of values |
| Restricted picklist | A picklist that rejects values not on its list, including via the API |
| Free-text field | A field that accepts any typed value |
| Standardization | Converting many variants of a value into one agreed value |

## Check yourself

A `GROUP BY` on a custom text field returns 60 rows, but the business says there should only
be 5 categories. Describe the four steps you would follow to get to 5, and what you would
change so it stays at 5.
