# Lesson 15 — Multi-Value Parameters

**Chapter 3 · Parameters · Lesson 15 of 40**

## What you'll learn

- What "Allow multiple values" actually changes in the reader's
  experience
- Why turning a parameter multi-value forces changes in your query and
  your filters, not just a checkbox flip
- What the resulting dropdown looks like, including the automatic
  "Select All" option
- How a multi-value parameter is represented as an array, not a single
  value, in expressions

## One checkbox, three required follow-ups

In **Report Parameter Properties**, on the **General** tab, checking
**Allow multiple values** lets a reader select more than one value for
that parameter instead of exactly one. But that checkbox alone doesn't
make a working multi-value parameter — three other things have to
change to match it:

1. **The dataset query.** A single-value filter like
   `WHERE StoreID = (@StoreID)` has to change to
   `WHERE StoreID IN (@StoreID)`. The `IN` operator tests for inclusion
   in a *set* of values — `=` can't compare a column against an array.
2. **Any Tablix filters referencing the parameter.** A filter's
   **Operator** has to switch from **equals** to **In**, for the same
   reason.
3. **Any expression referencing the parameter's value directly**, such
   as one displaying the selection in a page footer. `[@StoreID]` on
   its own no longer resolves to a readable single string — you'll
   typically use `Join(Parameters!StoreID.Label, ", ")` to turn the
   array of selected labels into one comma-separated string.

## What the reader actually sees

When a parameter allows multiple values and has an available values
list, the dropdown changes shape entirely: every item gets a checkbox,
and the list starts with an automatic **(Select All)** option that
checks or clears every value in one click.

![The Store name parameter dropdown with checkboxes for each store and an automatic "(Select All)" option at the top, all checked.](/courses/ssrs/ch03/15-multi-value-parameters/multivalue-select-all-dropdown.png)
*Turning on "Allow multiple values" adds this checkbox list and Select All — the reader picks any combination, not just one.*

## It's an array, not a value

Once **Allow multiple values** is on, the parameter's value is really
an **array**. `Parameters!StoreID.Value` no longer returns a single
store ID — it returns however many the reader selected. That's exactly
why direct display expressions need `Join(...)` to flatten the array
into readable text, and why filters need `In` instead of `=` to test
each row against the whole set.

## Key terms

| Term | Meaning |
|---|---|
| Allow multiple values | The General-tab option letting a reader select more than one parameter value |
| IN operator | The T-SQL/filter operator that tests a value for inclusion in a set — required once a parameter is multi-value |
| (Select All) | The automatic checkbox item added to the top of a multi-value parameter's dropdown |
| Join() | The expression function that flattens an array of selected labels into a single delimited string |

## Lab

1. Take a single-value parameter from an earlier lab and turn on
   **Allow multiple values** on its General tab.
2. Update its dataset query's `WHERE` clause from `=` to `IN`.
3. Update any Tablix filter using that parameter from **equals** to
   **In**.
4. Preview the report — confirm the dropdown now shows checkboxes and
   a **(Select All)** option, and that selecting more than one value
   correctly filters the results.

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: name
the three things — beyond the "Allow multiple values" checkbox itself —
that have to change for a parameter to actually work correctly once
it's multi-value.
