# Lesson 22 — Parameters

**Chapter 3 · Power Query & Data Cleaning · Lesson 11 of 12**

## What you'll learn

- What a parameter is, and why hardcoded values in a query are limiting
- How to create a parameter in Manage Parameters
- How to use a parameter as a filter's value instead of typing one in
- Why changing the parameter's value updates your query instantly

## The problem with hardcoded values

Every filter, threshold, or file path you've typed directly into a step so
far is **hardcoded** — baked into that step permanently. Want to change
the threshold from 20% to 30%? You have to go find that step and edit it
by hand, every time.

**Parameters** solve this: a named, reusable value you set once and
reference anywhere, instead of typing the same number or text into a
dozen different steps.

![Screenshot of the Manage Parameters dialog, listing a parameter and its Name, Description, Required, Type, and Current Value fields.](/courses/power-bi/ch03/22-parameters/manage-parameters.png)
*Every parameter you create lives here — Home ribbon → Manage Parameters — where you can view, edit, or add more at any time.*

## Starting point

Here's an Orders table with a Margin column:

![Screenshot of a table with columns OrderID, Total Units, and Margin, with margin values ranging from 7% to 50%.](/courses/power-bi/ch03/22-parameters/step-argument-sample-table.png)
*The goal: filter this to only orders above some minimum margin — and make that minimum easy to change later.*

## Creating a parameter

Open **Manage Parameters** (Home ribbon), select **New**, and fill in the
form:

![Screenshot of the Manage Parameters dialog, creating a parameter named "Minimum Margin," Decimal Number type, with a Current Value of 0.2.](/courses/power-bi/ch03/22-parameters/step-argument-sample-parameter.png)
*Name it clearly, set its Type (always set this — same reasoning as Lesson 13), and give it a Current Value to start with.*

A parameter's key fields:

| Field | What it's for |
|---|---|
| Name | How you'll find and reference it |
| Description | Explains its purpose to anyone else looking at the query |
| Required | Whether a value must always be provided |
| Type | The data type — set this explicitly |
| Current Value | The actual value used right now |

## Using a parameter in a filter

Instead of typing a number directly into a filter, point it at your
parameter:

![Screenshot of the Filter Rows dialog with "Keep rows where Margin is greater than," and a dropdown showing "Select a parameter" as an option instead of typing a value.](/courses/power-bi/ch03/22-parameters/step-argument-sample-parameter-select-parameter.png)
*Most filter dialogs offer "Select a parameter" right next to "Enter a value." Choose Minimum Margin here instead of typing 0.2 directly.*

## Change the value, watch the query update

This is the payoff. Edit the parameter's Current Value from 0.2 to 0.3,
and every step referencing it updates immediately — no hunting through
Applied Steps required:

![Screenshot of the Queries pane showing "Minimum margin (0.3)" as its own query, alongside the Orders query now filtered to show only rows with margin 35% or 50%.](/courses/power-bi/ch03/22-parameters/step-argument-sample-parameter-updated.png)
*One change, and the Orders query re-filters automatically. Change it back to 0.2, and it re-filters again — no editing the filter step itself, ever.*

## Beyond filters

Parameters aren't limited to filter values. They're just as useful for:

- **File paths and connection details** — store a folder path once, reuse
  it across several queries pointing at the same location.
- **Custom function arguments** — right-click a query and **Create
  Function**, and any parameters it references automatically become that
  function's inputs.

Both are more advanced patterns you'll grow into — but the underlying idea
is always the same: name a value once, reuse it everywhere, change it in
one place.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A named, reusable value referenced across one or more queries |
| Hardcoded value | A value typed directly into a step, requiring manual edits to change |
| Current Value | The actual value a parameter holds right now |
| Manage Parameters | The dialog for creating, editing, and viewing all parameters |

## Lab

1. Open **Manage Parameters** and create a new parameter with a
   **Decimal Number** or **Text** type and a sensible Current Value.
2. Apply a filter to any query, and instead of typing a value, select your
   new parameter from the dropdown.
3. Go back to Manage Parameters, change the Current Value, and confirm
   your query's filtered results update automatically.

## Check yourself

You're ready for Lesson 23 when you can explain, in one sentence, why a
parameter is better than typing the same value into several different
query steps.
