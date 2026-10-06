# Formula Fields

**Chapter 2 · Fields · Lesson 12 of 23**

Every field covered so far stores a value someone (or an import) typed in. A **Formula** field is
different: it stores nothing. Every time a record is viewed, Salesforce recalculates the formula
from scratch, using whatever the source fields hold at that moment.

## What you'll learn

- Why a Formula field is read-only, and what "recalculated on every view" actually means
- The three tools inside the formula editor: Insert Field, Insert Operator, and Functions
- A real example formula, read start to finish

## Read-only, and always current

Because a Formula field's value is computed, not stored, a user can never type directly into it —
there's nothing to overwrite. This also means a Formula field is never stale: change Amount on an
Opportunity, and any formula referencing Amount reflects the new value the instant you reload the
record. That's the trade a stored field can't make — a Number field holding "last calculated
total" would need something to actively update it; a Formula field updates itself, always.

## The formula editor's three tools

Formula fields are built in a dedicated editor with three ways to construct an expression without
memorizing syntax:

![The formula editor, labeled: Simple/Advanced Formula tabs, Insert Field, Insert Operator, Functions, the formula text area, and Check Syntax.](/courses/salesforce-data-model-fundamentals/ch02/12-formula-fields/formula-editor-labeled.png)

- **Insert Field** opens a picker of every field on the object — and on related objects, reached by
  following a relationship (the "Account >" row an Opportunity formula can drill into).
- **Insert Operator** adds math and comparison symbols (+, -, >, =) without typing them by hand.
- **Functions** lists every formula function Salesforce supports, grouped by category, with a
  description for each — no need to memorize `ROUND()`'s argument order from scratch.

![The Insert Field dialog, listing Account fields a Contact or Opportunity formula can reference across the relationship.](/courses/salesforce-data-model-fundamentals/ch02/12-formula-fields/insert-field-menu.png)

**Check Syntax** validates the formula before you can save — catching a missing parenthesis or a
misspelled field name immediately, rather than at save time.

## A real formula, read start to finish

Here's a Checkbox-type formula field called "Big Opportunity?":

![A real formula: Big Opportunity? (Checkbox) = AND(Account.NumberOfEmployees > 1000, Amount > 10000), with zero syntax errors reported.](/courses/salesforce-data-model-fundamentals/ch02/12-formula-fields/and-formula-example.png)

Read left to right: `AND(` starts a function requiring every argument inside it to be true,
`Account.NumberOfEmployees > 1000` crosses the relationship to the related Account and compares its
employee count, a comma separates the second argument, `Amount > 10000` checks the Opportunity's
own Amount field, and `)` closes the function. The result is a live True/False value — checked only
when both conditions hold, right now.

## Key terms

| Term | Meaning |
|---|---|
| Formula field | A read-only field whose value is computed from other fields every time it's viewed |
| Insert Field | The formula editor tool for adding a field reference, including across relationships |
| Function | A named formula operation (like `AND()` or `ROUND()`) listed and described in the Functions panel |
| Check Syntax | Validates a formula before saving, catching errors like a missing parenthesis |

## Check yourself

Why can't a Formula field ever hold a value that's out of date, the way a manually-entered Number
field could if nobody remembers to update it?
