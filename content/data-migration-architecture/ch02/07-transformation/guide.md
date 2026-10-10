# Lesson 7 — Transformation

**Chapter 2 · Designing the Migration · Lesson 7 of 18**

## What you'll learn

- The difference between cleansing, standardization, and derived-field transformation
- A worked example of splitting one source field into several target fields
- The trade-off between transforming data before load versus after it's in Salesforce
- Why transformation logic has to live in the mapping document's shadow, not separately from it

## Mapping says where; transformation says how

Lesson 6's mapping document answers "which source field goes to which target field." **Transformation** answers the harder question sitting underneath that: what has to happen to the value along the way so what lands in Salesforce is actually usable, not just technically present. A field can be perfectly mapped and still be useless on arrival if nobody designed the transformation logic that gets it into shape.

## Three kinds of transformation

- **Cleansing** — mechanical fixes that don't change what the data means: trimming leading/trailing whitespace, fixing inconsistent capitalization ("MCDONALD'S INC" vs. "McDonald's Inc"), removing stray control characters that sometimes survive a legacy database export.
- **Standardization** — converting values into one consistent format so the same kind of data looks the same everywhere: dates normalized to a single format regardless of how inconsistently the source stored them, phone numbers normalized to a single pattern, currency values stripped of inconsistent symbols or thousands separators before being loaded into a true Currency field.
- **Derived/calculated fields and business-rule transformations** — producing a target value that didn't exist as a single source field at all, but is computed or assembled from one or more source fields according to a business rule. The canonical example: a legacy system with one "Full Name" text field ("Jane A. Smith") that has to become Salesforce's separate First Name and Last Name fields. That's not a cleansing fix or a format change — it's a rule ("split on the first space, treat everything before it as First Name, everything after as Last Name," with a documented fallback for names that don't fit that pattern, like single-word company contact names) that has to be written down and tested against real examples from the actual source data before the load, not improvised against whatever edge case happens to show up first.

## Where should transformation actually happen?

There are two broad places transformation logic can live, and the choice matters for the rest of the project:

- **Before load, in a staging layer** (a staging database, spreadsheet formulas, or an ETL tool's transformation step): the data that actually gets loaded into Salesforce is already correct. Validation in Chapter 3 is checking a straightforward load, not also trying to verify in-flight logic. This is almost always the right default for anything resembling the Full Name → First/Last Name example above.
- **After load, using Salesforce formula fields or Flow**: sometimes appropriate when the transformation needs to stay dynamic going forward (not just a one-time migration fix, but ongoing logic the business wants applied to every new record too) or when the source value genuinely needs to be preserved untouched alongside a derived value. The risk is treating this as a shortcut to avoid building proper staging logic — a transformation that really only needed to happen once, done instead as an ongoing formula field, adds permanent complexity to the target org for a problem that was actually temporary.

The general rule: transform before load when the transformation is specific to this migration and won't be needed again; build it into the Salesforce org itself only when the logic has an ongoing business purpose beyond the migration event.

## Keep transformation logic tied to the mapping document

Transformation rules should be written directly alongside the mapping document's per-field entries (Lesson 6 already flagged this), not maintained as a separate, disconnected spec. A mapping document that says "Full Name → First Name, Last Name" without the actual splitting rule next to it is incomplete — anyone picking up the document later has no way to reproduce the logic or know it even has edge cases.

## Key terms

| Term | Meaning |
|---|---|
| Cleansing | Mechanical fixes to data that don't change its meaning — whitespace, casing, stray characters |
| Standardization | Converting values into one consistent format across the dataset |
| Derived/calculated field | A target value computed or assembled from one or more source fields according to a documented business rule |
| Staging layer | A pre-load environment (database, spreadsheet, or ETL tool) where transformation happens before data reaches Salesforce |

## Lab

A legacy export has a single "Full Name" column containing values like "Jane A. Smith," "O'Brien, Patrick," "Acme Corp - Front Desk," and just "Madonna." Write the actual splitting rule you'd document for turning this into Salesforce's First Name and Last Name fields, including what you'd do with each of the three edge cases above (a comma-formatted name, a company/role string that isn't a person's name at all, and a single-word value). State whether you'd implement this transformation before load or after, and why.

## Check yourself

Can you give one real example each of cleansing, standardization, and a derived-field transformation? Can you explain the general rule this lesson gives for deciding whether transformation logic belongs in pre-load staging versus in a Salesforce formula field or Flow after load?
