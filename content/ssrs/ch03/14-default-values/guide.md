# Lesson 14 — Default Values

**Chapter 3 · Parameters · Lesson 14 of 40**

## What you'll learn

- Why default values matter: a report with every parameter defaulted
  runs automatically the moment it opens
- The three options on the Default Values tab of Report Parameter
  Properties
- The difference between a literal default and one pulled from a
  dataset query
- Why you can't use a field name directly as a default value expression

## A defaulted report doesn't wait for the reader

If **every** parameter on a report has a valid default value, the
report runs automatically the first time it's viewed or previewed —
the reader sees results immediately, with the option to change
parameters and re-run afterward. Without defaults, the reader always
has to fill in every prompt before anything renders. For a report with
several parameters, that's a real difference in how the report feels
to use.

## The Default Values tab: three options

Open a parameter's **Report Parameter Properties** dialog and select
**Default Values**. You get exactly three choices:

1. **No default value** — the starting state; the reader must supply a
   value before the report runs.
2. **Specify values** — you type a literal value (or a simple
   expression like `=Today()`) directly. Click **Add**, then enter the
   value. For a multi-value parameter, repeat this for every value you
   want defaulted, and the list order becomes the order shown to the
   reader.
3. **Get values from a query** — you point at an existing **dataset**
   and choose which **field** in it supplies the default. This is how
   you default a parameter to "whatever the first row of this lookup
   dataset happens to be," or combine it with a filter so the default
   is always something meaningful, like the current fiscal quarter.

## What you can't do

You **cannot** use a report field name directly as a default value
expression — defaults are evaluated before the main report dataset has
run, so there's no field data to reference yet. You can specify
**globals** and **common functions** (`=Today()`, `=User!UserID`), or a
literal, or a value pulled from a **separate** dataset built
specifically to supply that default — but never a field from the
report's own data region.

## Overriding defaults after publishing

Default values you set at design time aren't necessarily final. After
a report is published to a Report Server, an administrator can
override those defaults by setting parameter property values on the
server itself — useful when the same report needs different sensible
defaults in different deployment environments without touching the
RDL.

## Key terms

| Term | Meaning |
|---|---|
| Default value | A value pre-filled for a parameter so the report can run without the reader typing it first |
| No default value | The Default Values option requiring the reader to supply a value manually |
| Specify values | The option to type a literal value or simple expression directly as the default |
| Get values from a query | The option to pull a default from a field in an existing dataset |
| Globals / Common Functions | Built-in expressions like `=Today()` usable as a default; field names from the report's own data are not |

## Lab

1. Pick any parameter on a report you're working with. Open its
   **Report Parameter Properties** → **Default Values** tab.
2. Set a literal default using **Specify values** (e.g., today's date
   via `=Today()` for a date parameter).
3. Confirm the report now runs immediately on open, without prompting.
4. Then switch that same parameter to **Get values from a query**
   against a small lookup dataset, and compare the reader experience.

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: what
has to be true for a report to run automatically the moment it opens,
and why can't a default value expression reference a field from the
report's own dataset?
