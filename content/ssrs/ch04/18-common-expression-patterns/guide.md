# Lesson 18 — Common Expression Patterns

**Chapter 4 · Expressions & Formatting · Lesson 18 of 40**

## What you'll learn

- The simple-expression syntax behind `[FieldName]` and `[@Param]` —
  `Fields!X.Value` and `Parameters!Y.Value`
- How to concatenate strings with `&`
- The **IIF** and **Switch** decision functions, and how they're
  written for real
- Why a handful of patterns cover the overwhelming majority of
  expressions you'll ever write

## Fields and Parameters: the two collections you'll reference constantly

Drag a field onto the design surface and Report Builder shows you
`[Sales]` — shorthand for the real, underlying expression
`=Fields!Sales.Value`. A parameter reference works the same way:
`[@Store]` on the surface is `=Parameters!Store.Value` underneath.
Every complex expression you build is ultimately made of pieces like
these, combined with operators and functions.

```
=Fields!Sales.Value
=Parameters!Store.Value
=Fields!FirstName.Value & " " & Fields!LastName.Value
```
*Field reference, parameter reference, and string concatenation with `&`.*

The `&` operator concatenates. `Fields!FirstName.Value & " " &
Fields!LastName.Value` joins a first and last name with a literal
space between them — one of the most common expressions in any
report.

## IIF and Switch: making a decision inside an expression

**IIF** returns one of two values depending on whether a condition is
true. **Switch** does the same job for three or more conditions,
returning the value tied to the first one that evaluates to true.

```
=IIF(Fields!LineTotal.Value > 100, True, False)
=Switch(Fields!PctComplete.Value >= 10, "Green",
  Fields!PctComplete.Value >= 1, "Blue",
  Fields!PctComplete.Value <= 0, "Red")
```
*IIF for a single yes/no test; Switch when there are three or more outcomes.*

Both come straight from Microsoft's own expression-examples reference
— these aren't invented syntax, they're the real patterns you'll reuse
in Lesson 19 to drive conditional formatting.

## Key terms

| Term | Meaning |
|---|---|
| `Fields!X.Value` | A simple expression referencing dataset field `X` |
| `Parameters!Y.Value` | A simple expression referencing report parameter `Y` |
| `&` | The string-concatenation operator |
| IIF | Returns one of two values based on a single true/false test |
| Switch | Returns the value tied to the first of several conditions that's true |

## Lab

1. On any text box, build the expression
   `=Fields!FirstName.Value & " " & Fields!LastName.Value` using the
   Expression dialog from Lesson 17 — don't type it from memory, pick
   `FirstName` from **Fields (Expressions)** and `LastName` the same
   way.
2. Build `=IIF(Fields!LineTotal.Value > 100, "Large", "Normal")`
   against any numeric field in your dataset and preview the report.

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: how
does `[Sales]` on the design surface relate to `=Fields!Sales.Value`,
and when would you reach for **Switch** instead of **IIF**?
