# Expressions in Power Automate

Dynamic content inserts a value exactly as an action produced it. Most of the time, Castlebridge Logistics needs something a little different — today's date plus seven days, a name converted to uppercase, the first item of a list, or the result of adding two numbers together. That transformation is what an **expression** does. This lesson shows you where to write one and the handful of functions you'll reach for constantly.

## What you'll learn

- Where the expression editor lives in the designer, and the two ways to open it
- The anatomy of an expression: a function name, parentheses, and arguments
- A working set of everyday functions — `utcNow()`, `addDays()`, `concat()`, `if()`, and more
- How to mix dynamic content inside an expression's arguments
- A worked Castlebridge Logistics example: calculating a delivery deadline

## Where to write an expression

Every action's input field has two small buttons next to it once you select the field: a lightning bolt (**Insert dynamic content**) and an **fx** button (**Insert expression**). Selecting **fx** opens the expression editor — a popup with a **Function** tab and a **Dynamic content** tab, plus a search box for both.

![Screenshot of the lightning bolt and fx buttons shown next to an action's input field in the Power Automate designer.](/courses/power-automate/ch01/07-expressions-in-power-automate/skittles.png)
*The lightning bolt inserts dynamic content directly; the fx button opens the full expression editor.*
Source: [Microsoft Learn — Explore the cloud flows designer](https://learn.microsoft.com/en-us/power-automate/flows-designer)

You can also type a forward slash (`/`) directly in any input field as a shortcut to open the same popup.

![Screenshot of the expression editor's gripper and its Dynamic content and Function tabs.](/courses/power-automate/ch01/07-expressions-in-power-automate/token-picker.png)
*The expression editor is multi-line — drag the gripper to expand it for a longer formula.*
Source: [Microsoft Learn — Explore the cloud flows designer](https://learn.microsoft.com/en-us/power-automate/flows-designer)

## The anatomy of an expression

Every expression is a function name, followed by parentheses containing its arguments:

```
functionName(argument1, argument2)
```

Functions can nest inside each other — the output of one becomes the input to the next. `addDays(utcNow(), 7)` first calls `utcNow()` to get the current UTC date and time, then feeds that result into `addDays()` along with `7`, producing a timestamp exactly seven days from right now.

## Functions you'll reach for constantly

| Function | What it does |
|---|---|
| `utcNow()` | The current date and time, in UTC |
| `addDays(timestamp, days)` | Adds (or subtracts, with a negative number) days to a timestamp |
| `concat(text1, text2, ...)` | Joins two or more strings into one |
| `if(condition, valueIfTrue, valueIfFalse)` | Returns one of two values depending on a true/false condition |
| `first(array)` / `last(array)` | The first or last item in an array |
| `length(collection)` | The number of items in an array, or characters in a string |
| `toUpper(text)` / `toLower(text)` | Converts text to all uppercase or all lowercase |

## Mixing dynamic content into an expression

An expression's arguments don't have to be literal values — you can place dynamic content (like a trigger's output) directly inside the parentheses. Selecting **Dynamic content** from inside the expression editor, while your cursor sits inside a function's parentheses, inserts that token as an argument.

## Worked example: Castlebridge Logistics' delivery deadline

A Castlebridge Logistics intake flow needs to calculate a delivery deadline: three business days from when a shipment request was submitted, expressed in a friendly format for the confirmation email. Chained together:

```
formatDateTime(addDays(triggerOutputs()?['body/submittedDate'], 3), 'dddd, MMMM d')
```

Read from the inside out: take the trigger's `submittedDate`, add 3 days to it with `addDays()`, then format the result as a readable string like "Thursday, March 12" with `formatDateTime()`. That single expression replaces what would otherwise take several separate Compose actions.

## Key terms

- **Expression** — a formula, written as a function call, that transforms or calculates a value rather than just passing one through unchanged
- **Expression editor** — the popup opened by the fx button or a forward slash, with Function and Dynamic content tabs
- **Nesting** — placing one function's result inside another function's arguments
- **`utcNow()` / `addDays()` / `concat()` / `if()`** — commonly used built-in functions covered in this lesson
