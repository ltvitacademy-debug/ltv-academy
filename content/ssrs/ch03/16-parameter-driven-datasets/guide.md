# Lesson 16 — Parameter-Driven Datasets

**Chapter 3 · Parameters · Lesson 16 of 40**

## What you'll learn

- How `@ParameterName` syntax in a dataset query actually connects to
  a report parameter
- The mapping between a dataset's query parameters and the report
  parameters that supply their values
- Why this connection means the query runs differently depending on
  what the reader picked, without you writing any procedural code
- How this same mechanism underlies everything else in this chapter —
  single-value, cascading, defaulted, and multi-value parameters alike

## The mapping under the hood

Every technique in this chapter — plain parameters, cascading chains,
defaults, multi-value selection — ultimately comes down to the same
mechanism: a dataset's query contains a placeholder like `@StoreID`,
and that placeholder is mapped to a report parameter's value on the
**Dataset Properties** dialog's **Parameters** tab.

![The Report Data pane's Parameters node next to the Dataset Properties dialog's Parameters tab, showing @ReportYear, @ReportMonth, and @EmployeeID each mapped to [@ReportYear], [@ReportMonth], and [@EmployeeID].](/courses/ssrs/ch03/16-parameter-driven-datasets/dataset-properties-parameters-mapping.png)
*Each query parameter (left column) is mapped to a report parameter value (right column) — that mapping is the whole connection.*

Read that mapping left to right: **Parameter Name** is the name the
query text uses (`@ReportYear`); **Parameter Value** is the expression
supplying it, almost always `[@ReportYear]` — shorthand for
`=Parameters!ReportYear.Value`. When a query variable is created
automatically (by adding it inside the query text), Report Builder
sets up this exact mapping for you. When you build a query parameter
manually through the query designer's filter row, you set the mapping
yourself.

## The query itself: real syntax

The actual `WHERE` clause is ordinary T-SQL with one addition — the
`@` placeholder:

```sql
WHERE StoreID = (@StoreID)
```

For a single-value parameter, `=` compares the column against the one
value the reader chose. If that parameter later becomes multi-value
(Lesson 15), the same clause has to change its operator:

```sql
WHERE StoreID IN (@StoreID)
```

`IN` tests the column against a *set* of values — exactly what a
multi-value parameter supplies. This is the same rule from Lesson 15,
seen from the query's side rather than the parameter's side: the
report parameter and the query syntax that consumes it have to agree
on whether there's one value or many.

## Why this matters more than it looks

Nothing about this is exotic SQL. `@StoreID` is a completely ordinary
parameterized query — the same pattern you'd use calling a stored
procedure from application code. What makes it powerful in SSRS is
that the *mapping itself* — which report parameter feeds which query
placeholder — is entirely visual, managed through the Report Data pane
and Dataset Properties dialog, with no procedural glue code required
to pass the value at runtime.

## Key terms

| Term | Meaning |
|---|---|
| Query parameter | The `@Name` placeholder inside a dataset's query text |
| Dataset parameter | The design-time object, listed on Dataset Properties → Parameters, that maps a query parameter to a value |
| Parameter Value mapping | The `[@ParamName]` expression (shorthand for `=Parameters!ParamName.Value`) supplying a dataset parameter's value |
| Report parameter | The reader-facing input (Lesson 12) whose value ultimately flows into the query through this mapping |

## Lab

1. Open **Dataset Properties** for any dataset with a query parameter,
   and go to the **Parameters** tab.
2. Confirm you can identify, for each row, which query placeholder
   (left) maps to which report parameter value expression (right).
3. Change one dataset's `WHERE` clause from `=` to `IN` for a parameter
   you've made multi-value, and confirm the mapping on the Parameters
   tab didn't need to change — only the SQL operator did.

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: what
two things does the Dataset Properties Parameters tab connect, and why
does `WHERE StoreID = (@StoreID)` have to become
`WHERE StoreID IN (@StoreID)` once that parameter allows multiple
values?
