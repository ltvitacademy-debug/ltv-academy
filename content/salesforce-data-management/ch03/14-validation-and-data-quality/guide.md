# Validation and Data Quality

**Chapter 3 · Data Quality · Lesson 14 of 20**

Duplicate rules stop two records from looking like each other. **Validation rules** stop a single record from being wrong in the first place — a blank required-when field, an impossible date, a phone number with letters in it. This lesson is conceptual: there's no single screen that captures "data quality," so instead of a screenshot you're getting the formula patterns you'll actually type.

## What you'll learn

- The anatomy of a validation rule: Error Condition Formula, Error Message, Error Location
- The handful of functions that cover most real-world validation rules
- Four dimensions of data quality, and which tool addresses each one
- Why a validation rule that's too strict is worse than no rule at all

## The anatomy of a validation rule

A validation rule is a formula that evaluates to **TRUE or FALSE** on every save. When it evaluates **TRUE**, the save is blocked and the user sees your Error Message, either at the top of the page or pinned to a specific field.

```
Rule name:     Amount_Required_On_Closed_Won
Object:        Opportunity
Error Condition Formula:
  AND(
    ISPICKVAL(StageName, "Closed Won"),
    ISBLANK(Amount)
  )
Error Message: "Amount is required before marking an opportunity Closed Won."
Error Location: Amount field
```

Read the formula as a question: "Is this TRUE?" If yes, block. This rule reads as "Is the stage Closed Won AND is Amount blank?" — exactly the one situation you want to catch, and nothing else.

## Functions that cover most real rules

```
ISBLANK(field)              -- true if a text/lookup field is empty
ISNULL(field)                -- true if a number/date/checkbox field is empty
ISPICKVAL(field, "value")    -- true if a picklist equals a specific value
REGEX(field, "pattern")      -- true if text matches a regular expression
AND(cond1, cond2, ...)       -- all conditions must be true
OR(cond1, cond2, ...)        -- any condition must be true
NOT(condition)                -- inverts a condition
PRIORVALUE(field)             -- the field's value before this edit (updates only)
```

A phone-format check most orgs eventually add:

```
Error Condition Formula:
  AND(
    NOT(ISBLANK(Phone)),
    NOT(REGEX(Phone, "\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}"))
  )
Error Message: "Enter Phone as (555) 123-4567 or 555-123-4567."
```

The `NOT(ISBLANK(...))` guard matters: without it, every *blank* phone number would also fail the REGEX test and get blocked, which turns an optional field into an accidental required one.

## Four dimensions of data quality, four different tools

| Dimension | What it means | The Salesforce tool for it |
|---|---|---|
| **Completeness** | Required information isn't missing | Required fields, validation rules (`ISBLANK`) |
| **Accuracy** | The value reflects reality | Validation rules (`REGEX`, range checks), user training |
| **Consistency** | The same thing is recorded the same way everywhere | Picklists instead of free text, validation rules, standardization (Lesson 15) |
| **Uniqueness** | The same real-world thing isn't recorded twice | Duplicate rules and matching rules (Lessons 12–13) |

No single feature owns "data quality" — it's the layered effect of several narrow tools, each aimed at one dimension.

## Why over-strict rules backfire

A validation rule that's too aggressive doesn't just annoy users — it teaches them to route around the system. A rule requiring a Next Step on every Opportunity edit, with no exception, means reps start typing "n/a" just to get past it, which is worse for data quality than having no rule. Two habits keep rules honest:

- **Narrow the condition.** Catch the one bad state you care about (`AND` it down), not every edit to the object.
- **Write the message for the user, not for you.** "Enter Phone as (555) 123-4567" tells someone exactly what to fix; "Invalid phone format" sends them guessing.

## Recap

- A validation rule's formula is a trap: TRUE blocks the save.
- `ISBLANK`, `ISPICKVAL`, `REGEX`, `AND`/`OR`/`NOT` cover most real rules.
- Completeness, accuracy, consistency, and uniqueness are different problems with different tools — validation rules, picklists, and duplicate rules each own a piece.
- An overly strict rule trains users to enter junk data just to satisfy it.

## Check yourself

Write, in plain English (no formula needed), the condition for a rule that requires a Close Date on every Opportunity whenever the Stage is anything other than "Prospecting."
