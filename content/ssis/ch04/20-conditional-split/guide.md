# Lesson 20 — Conditional Split

**Chapter 4 · Data Flow Transformations · Lesson 20 of 49**

## What you'll learn

- What the Conditional Split transformation does and why it's the data
  flow's version of a CASE structure
- How expression order determines where a row actually goes
- Why every Conditional Split needs a default output
- Where Conditional Split fits next to a Lookup's No Match output

## Routing rows based on their content

The **Conditional Split** transformation routes data rows to different
outputs depending on the content of the data itself. Microsoft's own
docs describe it as similar to a **CASE decision structure** in a
programming language — and that mental model holds up well: you write a
boolean expression for each condition, and the transformation evaluates
them in order, directing each row to the output for the *first*
condition that comes back true.

This transformation has one input, one or more outputs you define, plus
a required **default output** and an error output. Every row goes to
exactly one output — never zero, and never more than one.

## Order is significant

This is the detail that trips people up the most: **order matters**.
Conditions are evaluated top to bottom, and as soon as one evaluates to
true, the row is sent to that output and every remaining condition is
skipped for that row. Consider this pair of conditions from Microsoft's
own example:

```
Output 1: SUBSTRING(FirstName,1,1) == "A"
Output 2: SUBSTRING(FirstName,1,1) == "B"
```

Rows where `FirstName` starts with "A" go to Output 1, rows starting
with "B" go to Output 2, and — critically — every other row falls
through to whatever you named the **default output**. If you need to
test several conditions independently of each other (not just the first
match), you can't do that in a single Conditional Split; you'd chain
multiple Conditional Split transformations in sequence instead.

## Building expressions

Conditions are written using **Integration Services (SSIS) Expressions**
— the same expression language you'll formalize in Lesson 28. The editor
gives you a palette of columns, variables, functions, and operators you
can drag straight into the condition grid, or you can just type the
expression by hand. Each output gets a name — the default is a numbered
`Case 1`, `Case 2`, and so on, but a descriptive name (like
`HighValueOrders` or `MissingEmail`) makes the package far easier to
read six months from now.

## Where you've already seen this pattern

If Lesson 19's Lookup transformation redirected unmatched rows to a No
Match output, you might reach for a Conditional Split right after it —
for example, splitting those unmatched rows further into "missing key
entirely" versus "key present but malformed," each headed to its own
destination or error-handling path.

## Key terms

| Term | Meaning |
|---|---|
| Case | One condition/output pair in the Conditional Split Transformation Editor |
| Default output | The output every row falls to if no case's condition evaluates true — required on every Conditional Split |
| Evaluation order | The top-to-bottom order cases are checked in; the row goes to the first case that matches |
| FriendlyExpression | A custom property on the transformation, updatable via property expressions |

## Lab

1. Add an OLE DB source reading `Sales.SalesOrderHeader` from
   AdventureWorks2012 (it has a `TotalDue` column).
2. Drag a **Conditional Split** transformation onto the data flow and
   connect the source to it.
3. Create two cases: `HighValueOrders` with the condition
   `TotalDue > 5000`, and `MediumValueOrders` with
   `TotalDue > 1000 && TotalDue <= 5000`. Leave the default output named
   `LowValueOrders`.
4. Add three destinations (or three data viewers) — one per output —
   and run the package. Confirm every row landed in exactly one of the
   three outputs, and that the counts add up to the total row count.

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why
does the order you list conditions in a Conditional Split actually
matter, and what happens to a row that doesn't match any of them?
