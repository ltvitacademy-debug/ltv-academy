# SSRS Expression & Parameter Quick Reference

A one-page reference compiled from the patterns this course actually teaches
and builds, lesson by lesson. Nothing here is invented syntax — every pattern
traces back to a specific lesson so you can go re-read the full explanation
if a line doesn't make sense out of context.

## Simple expressions (Chapter 4, Lesson 18)

```
[Sales]              shorthand for   =Fields!Sales.Value
[@Store]             shorthand for   =Parameters!Store.Value
```

String concatenation uses `&`, not `+`:

```
=Fields!FirstName.Value & " " & Fields!LastName.Value
=Left(Fields!FirstName.Value, 1) & ". " & Fields!LastName.Value
```

## Decisions: IIF and Switch (Chapter 4, Lesson 18)

`IIF` for a single yes/no test; `Switch` once there are three or more
outcomes — it returns the value tied to the *first* condition that's true:

```
=IIF(Fields!LineTotal.Value > 100, "Large", "Normal")

=Switch(
    Fields!PctComplete.Value >= 10, "Green",
    Fields!PctComplete.Value >= 1,  "Blue",
    Fields!PctComplete.Value <= 0,  "Red"
)
```

## Conditional formatting (Chapter 4, Lesson 19)

There is no separate "conditional formatting" feature — it's always an
IIF/Switch set directly on a style property (most often `Color`,
`BackgroundColor`, or `Fill`):

```
' Alternating row banding, set on a detail row's BackgroundColor
=IIF(RowNumber(Nothing) MOD 2, Parameters!RowColor.Value, "White")

' Red negative numbers, set on a text box's Color
=IIF(Fields!Profit.Value < 0, "Red", "Black")

' Traffic-light fill across three bands
=IIF(Fields!PctComplete.Value >= 10, "Green",
  IIF(Fields!PctComplete.Value >= 1, "Blue", "Red"))

' Field value driving background color through Switch
=Switch(
    Fields!Gender.Value = "Male",   "CornflowerBlue",
    Fields!Gender.Value = "Female", "Tomato"
)
```

Color strings come from the .NET `KnownColor` enumeration ("Red",
"PaleGreen", "CornflowerBlue", etc.) — they're just strings, not a special
SSRS type.

## Parameters: single-value, multi-value, cascading (Chapter 3)

A report parameter's internal name is referenced as
`Parameters!Name.Value`. Once **Allow multiple values** is checked
(Lesson 15), that same reference returns an *array*, and three things have
to change to match it:

| Single-value | Multi-value |
|---|---|
| `WHERE StoreID = (@StoreID)` | `WHERE StoreID IN (@StoreID)` |
| Tablix filter operator: **equals** | Tablix filter operator: **In** |
| `[@StoreID]` displays directly | `=Join(Parameters!StoreID.Label, ", ")` |

A cascading parameter chain (Lesson 13) is not one setting — it's a
separate filtered dataset per level, each one's **Filters** tab testing the
parameter one level up:

```
' State dataset's Filters tab
Expression: [CountryName]   Operator: =   Value: [@CountryParameter]

' City dataset's Filters tab, one level further down the chain
Expression: [StateName]     Operator: =   Value: [@StateParameter]
```

Parameter order in the Report Data pane's **Parameters** node is the order
the reader is prompted in — a parameter can't reference a value that
hasn't been chosen yet, so the parent always has to come first.

## Parameter-driven datasets (Chapter 3, Lesson 16)

The actual connection between a report parameter and a query is a mapping
on **Dataset Properties → Parameters**: query placeholder on the left,
`[@ParamName]` (i.e. `=Parameters!ParamName.Value`) on the right. By
execution time, SQL Server never sees the placeholder — only the resolved
literal value(s).

## Default values (Chapter 3, Lesson 14)

```
=Today()         ' a date parameter that defaults to today
=User!UserID     ' a parameter defaulted to the current viewer
```

Defaults can be a literal, a global/common function, or a field from a
*separate* lookup dataset — never a field from the report's own main
dataset, since defaults resolve before that dataset has run.

## Number and date format strings (Chapter 4, Lesson 21)

Set on a text box's **Text Box Properties → Number** page, or inline with
`Format()`:

| Format string | Example output |
|---|---|
| `C2` | $1,234.56 |
| `N0` | 1,235 |
| `P0` | 45% |
| `d` | 9/11/2026 |
| `D` | September 11, 2026 |

```
=Format(Fields!SellStartDate.Value, "MMM-yy")   ' → Sep-26
```

An invalid format string doesn't throw an error — it silently renders as
literal text, which is the first thing to check if a number shows up
unformatted.

## Drillthrough action parameters (Chapter 6, Lesson 27)

On the target item's **Action → Go to report** tab, each row maps the
*target* report's parameter name to a value from the *source* report:

```
Name (target report's parameter)   Value (source report's field/expression)
TerritoryID                         =Fields!TerritoryID.Value
Year                                 =Fields!CalendarYear.Value
```

Names must match the target report's parameter names exactly, including
case — a mismatch is the single most common reason a drillthrough fails
at run time.
