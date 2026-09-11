# Lesson 19 — Conditional Formatting

**Chapter 4 · Expressions & Formatting · Lesson 19 of 40**

## What you'll learn

- How conditional formatting in SSRS is just an IIF (or Switch)
  expression set on a style property — there's no separate
  "conditional formatting" feature to learn
- The real expression behind a banded (alternating-row) report
- How to turn a field's value into a font color, exactly the way
  Microsoft's own docs demonstrate it
- Why colors in these expressions are just strings, drawn from the
  .NET `KnownColor` enumeration

## There's no "Conditional Formatting" button — it's just an expression

If you've used Excel's conditional formatting, forget the UI you're
picturing. In SSRS, conditional formatting *is* an expression, set on
whatever style property you want to vary — most often **Color** or
**BackgroundColor** — using the same Expression dialog from Lesson 17
and the same IIF/Switch patterns from Lesson 18.

## A real example: banding every other row

The screenshot below is the **BackgroundColor** property of a table
row, set to an expression that alternates the row's background
between a chosen color and white:

![The Expression dialog box showing =IIF(RowNumber(Nothing) MOD 2, Parameters!RowColor.Value, "White") set on a BackgroundColor property.](/courses/ssrs/ch04/19-conditional-formatting/banded-color-iif-expression.png)
*RowNumber, MOD, and a parameter — the real expression behind banding.*

```
=IIF(RowNumber(Nothing) MOD 2, Parameters!RowColor.Value, "White")
```

`RowNumber(Nothing)` counts rows starting at the outermost data
region. `MOD 2` returns 1 for odd rows and 0 for even ones — since 0
is treated as `False` and any nonzero number as `True`, the IIF
alternates between the color a parameter supplies and plain white.

## A second real example: color from a field's value

Microsoft's own expression reference gives this exact pattern for
turning a **Color** property red or black based on a `Profit` field:

```
=IIF(Fields!Profit.Value < 0, "Red", "Black")
```

And once you have more than two outcomes, nested IIFs or a Switch
handle it — this expression, set on a **Fill color** property,
produces a traffic-light effect on a percent-complete field:

```
=IIF(Fields!PctComplete.Value >= 10, "Green",
  IIF(Fields!PctComplete.Value >= 1, "Blue", "Red"))
```

## Key terms

| Term | Meaning |
|---|---|
| Conditional formatting | Setting a style property (Color, BackgroundColor, Fill) to an IIF/Switch expression |
| `RowNumber(Nothing)` | Returns the row number, counting from the outermost data region |
| `MOD` | The modulo operator — remainder after division, used here to detect odd/even rows |
| KnownColor | The .NET enumeration that supplies valid color name strings like "Red" or "PaleGreen" |

## Lab

1. On a table's detail row, set **BackgroundColor** to
   `=IIF(RowNumber(Nothing) MOD 2, "PaleGreen", "White")` and preview
   the report — confirm every other row is shaded.
2. On a numeric field's text box, set **Color** to
   `=IIF(Fields!Profit.Value < 0, "Red", "Black")` (or any numeric
   field you have) and confirm negative values render in red.

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
is there no dedicated "conditional formatting" feature in SSRS, and
what two properties most commonly carry these expressions?
