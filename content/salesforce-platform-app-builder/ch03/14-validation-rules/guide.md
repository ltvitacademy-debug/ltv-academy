# Validation Rules

**Chapter 3 · Business Logic · Lesson 14 of 24**

A validation rule is the simplest, strictest business-logic tool on the platform: a formula that returns `TRUE` or `FALSE`, and when it's `TRUE`, the save is blocked and an error message appears. No branching, no routing, no side effects — just a gate.

## What you'll learn

- The shape of a validation rule: formula, error message, error location
- Core formula functions used in almost every real-world rule
- Where the rule fires in the save order, and who it applies to
- Honest limits: what a validation rule cannot do

## Creating a rule

From Setup, open **Object Manager**, select the object, and go to **Validation Rules → New**. The editor asks for:

- **Rule Name** — no spaces, becomes the API name
- **Active** — an inactive rule is saved but never evaluated
- **Description** — write one; a rule with a cryptic formula and no description is a trap for the next admin
- **Error Condition Formula** — the formula that must return `TRUE` for the rule to fire
- **Error Message** and **Error Location** — either a specific field, or **Top of Page**

A **Check Syntax** button validates the formula before you save.

## The formula

Because the rule fires on `TRUE`, you write the *bad* condition, not the good one. To require a Close Reason whenever an Opportunity is marked Closed Lost:

```
AND(
  ISPICKVAL( StageName, "Closed Lost" ),
  ISBLANK( Close_Reason__c )
)
```

Read it as: "fire when the stage is Closed Lost AND the close reason is blank." Common functions: `ISBLANK()` / `ISNULL()` for empty values, `ISPICKVAL()` to compare a picklist, `ISCHANGED()` and `PRIORVALUE()` to compare the new value against what was saved before, `REGEX()` for pattern matching (ZIP codes, phone formats), and `AND()` / `OR()` / `NOT()` to combine conditions. `$Profile`, `$User`, and `$Permission` let a rule behave differently for different people — for example, skipping enforcement for a System Administrator profile or a custom "Bypass Validation" permission.

## Order of execution and who it applies to

Validation rules run after Salesforce's own system validations (required fields, data types) and before the record is actually saved. **They apply to everyone, with no built-in exception for administrators** — if you want an exception, you build one into the formula yourself, typically with `$Profile.Name` or a custom permission check. They fire on insert and update, never on delete, and they only ever see the record as it stands at that moment — a later Flow step can't retroactively satisfy a rule that already blocked the save.

## What a validation rule cannot do

- It cannot **change** data — only block or allow the save. (A formula field or a Flow updates data; a validation rule never does.)
- It cannot reference a roll-up summary field that's still recalculating in the very same transaction in some edge cases — test cross-object formulas referencing rolled-up values carefully.
- It evaluates the whole record at once; it can't give a different error for two different problems in one rule as cleanly as two separate rules can. Most experienced admins write several small, named rules rather than one dense one.
- It cannot be bypassed temporarily through the UI the way a workflow can be deactivated mid-task — deactivating a rule to bulk-load data is a real but blunt option, and it's easy to forget to reactivate it.

## SQL mapping

A validation rule is conceptually a `CHECK` constraint: `CHECK (NOT (StageName = 'Closed Lost' AND Close_Reason IS NULL))`. Same intent — reject the write — different mechanism, since Salesforce enforces it in application logic, not the database engine.

## Recap

A validation rule is a formula that returns `TRUE` to block a save, paired with an error message and a location. It applies to every user and every insert/update, runs early in the save order, and can only stop a save — never silently fix one. Next: the same formula editor, used to calculate instead of to block.

## Check yourself

Write (in words, not Salesforce syntax) a validation rule that should fire when a Task's Status is "Completed" but its Due Date is still blank. Then state its Error Location and explain why you chose it.
