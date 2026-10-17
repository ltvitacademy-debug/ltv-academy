# Testing Decision Guide: What to Test Where

From Chapter 4.

## Generic vs. singular

| Test type | Use when | Examples |
|---|---|---|
| **Generic** | The rule is reusable across many columns/models | `unique`, `not_null`, `relationships`, `accepted_values` |
| **Singular** | The rule is specific to this model's business logic | "A return rate can never exceed 1.0"; "An order's extended amount can never be negative" |

A generic test is a one-line reference to a reusable macro. A
singular test is a real SQL query in `tests/` that fails the build
if it returns any rows — write it as "find the rows that violate the
rule," not "assert the rule is true."

## Columns that almost always deserve a test

- [ ] Every primary/surrogate key: `unique` + `not_null`.
- [ ] Every foreign key a mart joins on: `relationships` back to the
      table it references.
- [ ] Any column a report sums, averages, or divides by: a singular
      test for the specific way it could be wrong (negative where it
      shouldn't be, a rate exceeding 1.0, a count that should never
      be zero).
- [ ] Any column with a known, finite set of valid values (a status,
      a category): `accepted_values`.

## What "add tests everywhere" gets wrong

Coverage isn't the goal — catching the failure modes that would
actually produce a wrong number downstream is. A model with
`not_null` on every column but no test on the one business rule that
actually matters (a rate, a total, a grain assumption) has high test
*count* and low test *coverage of what actually breaks*.

## Before calling a model "tested"

1. Run `dbt test --select <model>` and confirm everything passes.
2. Ask: if the join/aggregation logic had a bug tomorrow, would any
   of these tests actually catch it? If not, the model needs a
   singular test encoding what "correct" means for this specific
   model, not just structural checks.
3. Deliberately break something (comment out a join condition,
   change a filter) and re-run — confirm a test actually fails. A
   test suite that can't be made to fail isn't proving anything.
