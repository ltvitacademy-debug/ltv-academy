# Lesson 21 — Derived Column

**Chapter 4 · Data Flow Transformations · Lesson 21 of 49**

## What you'll learn

- What the Derived Column transformation does and the kinds of
  expressions it supports
- The difference between adding a **new column** and **replacing** an
  existing one
- How the editor auto-detects data type, length, precision, and scale
- Why an expression referencing an overwritten column still sees the
  original value

## Creating values with expressions

The **Derived Column** transformation creates new column values by
applying an expression to your transformation's input columns. An
expression can combine variables, functions, operators, and input
columns in any combination — and you can define as many derived columns
as you need in a single transformation, with any variable or column
reused across multiple expressions.

Microsoft's documentation lists the classic use cases, and they're worth
memorizing because you'll reach for every one of them constantly:

```
FullName    = FirstName + " " + LastName
Initial     = SUBSTRING(FirstName,1,1)
TaxRounded  = ROUND(SalesTax, 2)
OrderYear   = DATEPART("year", GETDATE())
```

Concatenating names, extracting substrings, rounding numeric values, and
pulling parts out of a date are the four moves you'll use in almost
every real package.

## New column vs. replacing an existing one

For every derived column you define, the editor asks you to choose: add
the result as a **brand-new output column**, or **replace** the value in
an existing column. Both options run the same expression — the only
difference is where the result lands.

There's a subtlety worth remembering here: if an expression *references*
a column that's being overwritten by this same Derived Column
transformation, that expression sees the **original, pre-derived
value** — not the value the transformation is about to write. Chained
transformations don't leak into each other mid-execution the way you
might expect from imperative code.

## Data type, length, precision, and scale

When you add a result to a **new** column, the Derived Column
Transformation Editor automatically evaluates your expression and sets
its data type, string length, and numeric precision/scale for you —
these fields are read-only in that case. If you're adding string data,
you can still adjust the **Code Page**. This automatic typing is
convenient, but it also means a poorly written expression can silently
produce a wider or narrower type than you expected — always check the
inferred type before wiring the output into a strongly-typed
destination.

## Key terms

| Term | Meaning |
|---|---|
| Derived column | A new or replacement column whose value comes from an SSIS expression |
| FriendlyExpression | A custom property reflecting the transformation's expression, updatable via property expressions |
| Add as new column | One of two placement choices for a derived column's result |
| Replace column | The other placement choice — overwrites an existing input column's value |

## Lab

1. Open a package with an OLE DB source reading
   `Person.Person` from AdventureWorks2012 (it has `FirstName` and
   `LastName` columns).
2. Drag a **Derived Column** transformation onto the data flow and
   connect the source to it.
3. Add a derived column named `FullName`, set **Derived Column** to
   **`<add as new column>`**, and set the expression to
   `FirstName + " " + LastName`.
4. Add a second derived column named `NameInitial` with the expression
   `SUBSTRING(FirstName,1,1)`.
5. Add a data viewer after the transformation and run the package.
   Confirm both new columns appear with correctly computed values.

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: if a
Derived Column expression references a column that the same
transformation is also overwriting, which value does the expression
actually see?
