# Lesson 5 — Formulas and Formula Functions

**Chapter 1 · Declarative Business Logic · Lesson 5 of 18**

## What you'll learn

- Why formulas are the one language every tool in this chapter shares
- How to read the Advanced Formula editor: Insert Field, Insert Operator, Functions, and Check Syntax
- The most common formula errors, and what each one actually means
- Where a formula field differs from a validation rule's Error Condition Formula, even though the syntax is identical

## One language, everywhere

Validation rules evaluate a formula. Approval process entry criteria can use a formula. Formula fields are entirely formulas. Even Flow and Email Alert merge fields lean on the same underlying expression syntax. If you learn to read and write Salesforce formulas once, you can read them in every tool this chapter covers — that's why this lesson sits in the middle of the chapter instead of being an afterthought.

## The Advanced Formula editor

When you create a formula field (Setup → Object Manager → object → Fields & Relationships → New → Formula), you land on the same editor used throughout the platform:

- **Simple Formula / Advanced Formula tabs** — Simple gives you a basic one-field, one-operator UI; Advanced is a free-text formula box and the one you'll use for almost everything real.
- **Insert Field** — opens a picker for any field on the current object, or a related object through a lookup (`Account.AccountNumber` from a Contact, for example).
- **Insert Operator** — math, comparison, and logical operators without memorizing symbols.
- **Functions** — a searchable, categorized list of every formula function, each with a short description and its exact argument order.
- **Check Syntax** — validates the formula without saving, catching errors before you commit to a field.

## A cross-object example

A formula field on Contact that pulls the parent Account's number:

```
Account.AccountNumber
```

That single line crosses from Contact to its related Account. Formula fields can reach related records this way; validation rules can too, within limits — this is one of the most common things new admins don't realize is possible until they see it work.

## Reading common formula errors

The Functions menu's own documentation is the fastest way to resolve most of these:

- **Missing parenthesis or comma** — Salesforce's error location can be misleading; count your open and close parens from the start of the formula, not from where the error points.
- **Incorrect parameter type** — a function expected Text and got a Number, or vice versa. Wrap a number in `TEXT()` to convert it.
- **Too many (or too few) parameters** — check the function's definition in the Functions panel; it lists the exact signature.
- **Incorrect result data type** — a formula field defined as Number can't return the result of a function that produces Text without conversion.
- **Misspelled field name or unsupported function** — the editor's autocomplete in Insert Field avoids this entirely; typing field names by hand is where most of these creep in.

## Where formula fields show up

A formula field isn't confined to one screen — the same field appears on page layouts, in list views, and in reports, calculated fresh every time it's displayed rather than stored. That's a meaningful difference from a regular field: a formula field never goes stale, because it's never actually saved — it's recalculated on read.

## Recap

- Formulas are the one syntax shared across validation rules, approval criteria, formula fields, and Flow.
- The Advanced Formula editor's Insert Field, Insert Operator, and Functions panels exist to keep you out of typos.
- Cross-object formulas (like `Account.AccountNumber` from Contact) are common and worth knowing early.
- A formula field is calculated on read, everywhere it's displayed — page layouts, list views, and reports alike.

## Try it yourself

Create a formula field on Opportunity called `Discount_Justification_Required__c` (Checkbox type) with the formula `AND(Discount_Percent__c > 40, ISBLANK(Discount_Justification__c))` — the same logic from Lesson 4's validation rule, now as a field you could reference elsewhere instead of only in a blocking rule.

## Check yourself

A formula field and a validation rule's Error Condition Formula can both use `AND()` and `ISBLANK()`. What's different about what each one *does* with the TRUE or FALSE result?
