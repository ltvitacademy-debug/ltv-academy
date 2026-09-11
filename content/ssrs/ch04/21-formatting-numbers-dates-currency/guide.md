# Lesson 21 — Formatting Numbers, Dates & Currency

**Chapter 4 · Expressions & Formatting · Lesson 21 of 40**

## What you'll learn

- Where number/date formatting actually lives: the **Number** page
  of a text box's **Properties** dialog (right-click → **Text Box
  Properties** → **Number**)
- That the options there are a subset of .NET's standard format
  strings — and that you can type any .NET format string directly
  for anything not in the list
- Real format strings you'll use constantly: `C2`, `N0`, `d`, `D`,
  `P0`
- Why an invalid format string silently gets treated as literal text
  instead of erroring

## The Number page, not a separate dialog

Right-click a text box (or a cell in a table/matrix — cells are text
boxes too) and select **Text Box Properties**, then **Number**. This
is exactly the same page the **Home** ribbon's **Number** group is a
shortcut for — the **Currency** and **Date** buttons on the ribbon
just apply one of these formats without opening the dialog.

![The Home ribbon's Number format dropdown, showing Default, Number, Currency, Date, Time, Percentage, Scientific, and Custom, applied to a Last Purchase column.](/courses/ssrs/ch04/21-formatting-numbers-dates-currency/date-format-number-group.png)
*The Number tab's format dropdown, set to Date, on a real column.*

## It's really just .NET format strings

Every option on that **Number** page — `Currency`, `Date`, `Percentage`
— maps to a standard **.NET Framework format string** behind the
scenes. The dialog only exposes a subset; you can type any valid .NET
format string directly into the **Custom** option (or into the
**Format** property in the Properties pane) for anything the dialog
doesn't offer a button for.

```
C2   →  $1,234.56     (currency, 2 decimal places)
N0   →  1,235         (number, 0 decimal places, thousands separator)
P0   →  45%           (percentage, 0 decimal places)
d    →  9/11/2026     (short date pattern)
D    →  September 11, 2026   (long date pattern)
```
*Five .NET format strings that cover most of what a report needs.*

You can also build a formatted string with the **Format** function
inside an expression, which is the better choice the moment a text
box mixes a number with literal text — for example
`=Format(Fields!SellStartDate.Value, "MMM-yy")` renders a date field
as `Sep-26` instead of a full date, right inside a sentence.

## What happens with an invalid format string

If you mistype a format string, SSRS doesn't throw an error — it
falls back to displaying the format string itself as literal text.
That's a useful debugging signal: if a number renders as raw text
like `Q2` instead of a formatted value, check the format string
first.

## Key terms

| Term | Meaning |
|---|---|
| Number page | The tab of Text Box Properties where number/date formats are set |
| .NET format string | The underlying string (`C2`, `N0`, `d`, etc.) that every Number-page option maps to |
| `Format()` function | An expression function for formatting a value inline, useful when mixing text and numbers |
| Custom format | Any valid .NET format string typed directly, for formats the dialog doesn't expose a button for |

## Lab

1. On a currency field's text box, open **Text Box Properties >
   Number** and try **Currency** with 2 decimal places, then switch
   to **Custom** and type `C0` to drop the cents.
2. On a date field, try `d` and `D` as custom format strings and
   compare the rendered output.

## Check yourself

You're ready for Lesson 22 when you can explain, without looking:
what actually underlies every option on the Number page, and what
happens if you type an invalid format string into Custom?
