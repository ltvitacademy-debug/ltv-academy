# Script — Conditional Formatting

## Segment 1 (title)

If you're picturing an Excel-style Conditional Formatting dialog with rule builders and preview swatches, forget it — SSRS doesn't have one. Conditional formatting here is just an expression, aimed at a style property. Let's see the real thing.

## Segment 2 (screenshot: banded-color-iif-expression)

This is the Expression dialog again, this time open on a table row's BackgroundColor property. The expression reads: IIF, RowNumber of Nothing, MOD 2, comma, Parameters bang RowColor dot Value, comma, "White". RowNumber of Nothing counts rows starting at the outermost data region. MOD 2 returns 1 for odd rows and 0 for even ones — and since IIF treats 0 as false and anything else as true, the whole expression alternates the row's background between whatever color a parameter supplies, and plain white. That's a real, complete banded report, built from one IIF.

## Segment 3 (code: color from a field)

The same pattern works on any style property. Microsoft's own expression reference gives this exact line for a Color property: IIF, Fields bang Profit dot Value less than zero, comma "Red", comma "Black" — negative numbers render red, everything else renders black. And once you have three outcomes instead of two, you nest another IIF inside the false branch — here, values ten and over show green, one and over show blue, and everything else shows red. Those color names, by the way, aren't SSRS-specific — they come straight from the .NET KnownColor enumeration.

## Segment 4 (outro)

Next lesson, we step away from expressions for a moment and look at text box formatting the traditional way — font, border, and background properties you set directly, not through IIF.
