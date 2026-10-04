# Lesson 13 — Cascading Parameters

**Chapter 3 · Parameters · Lesson 13 of 40**

## What you'll learn

- What a cascading parameter is, and why it's a chain of dependent
  datasets, not a single parameter setting
- Where the actual filter lives: a dataset's **Filters** tab,
  referencing the parameter chosen before it
- Why order matters — and how the Report Data pane's parameter order
  controls the order a reader sees the prompts
- What the cascade looks like from the reader's side, one pick at a
  time

## One parameter's available values depend on another's choice

A **cascading parameter** setup is what you build when a list of
available values is too long to show all at once, and it naturally
narrows based on an earlier choice. Pick a country, and the state list
should only show states that belong to it. Pick a state, and the city
list should only show cities in it. Each step in the chain filters the
next.

This isn't one property you flip on. It's a **chain of separate
datasets**, each one filtered by the parameter chosen before it.

## The dependency chain, in the dialog where it actually lives

There's no single Report Builder dialog that shows the whole chain at
once — it's spread across each dataset's own **Filters** tab. Here's
the State dataset's:

Read it the same way you'd read any dataset filter: **Expression** is
the column being tested, **Operator** is how it's tested, and **Value**
is `[@CountryParameter]` — the shorthand for the Country parameter's
current value. A City dataset further down the chain gets its own
filter the same way, referencing `[@StateParameter]` instead. Three
parameters, three datasets, three filters — each one built exactly like
this, just pointed at the parameter one level up.

## Watching the cascade happen

This is the part that's hard to picture from a dialog box alone, so
here it is live, one pick at a time:

![Report preview with Country Name set to United Kingdom; the State dropdown, now open, shows only one checked option: England.](/courses/ssrs/ch03/13-cascading-parameters/cascade-country-selected-state-narrowed.jpg)
*Pick Country, and State's dropdown — which could have listed every state in the dataset — narrows to the one that actually belongs to the United Kingdom.*

![Report preview with Country = United Kingdom and State = England; the City Name dropdown is open, showing a checklist of cities with Liverpool and London checked.](/courses/ssrs/ch03/13-cascading-parameters/cascade-state-selected-city-narrowed.jpg)
*Add a State, and City narrows again — one more level down the same chain.*

![The finished report with Country, State, and City all chosen, and the result table filtered to exactly those cities.](/courses/ssrs/ch03/13-cascading-parameters/cascade-final-filtered-report.jpg)
*Three parameters, three filtered datasets, one report body that reflects the full chain of choices.*

(This particular example allows more than one State or City to be
checked at once — that's **Allow multiple values**, covered in Lesson
15 — but the cascading mechanism itself is identical whether a
parameter is single- or multi-value: each dataset's Filters tab still
references the parameter one level up, with `=` instead of `In` for a
single-value one.)

## Order is not cosmetic

The order that parameters appear under the **Parameters** node in the
Report Data pane is the order the reader is prompted for them at
runtime. Because the State dataset's filter references
`[@CountryParameter]`, **Country** must come before **State** in that
list — and **State** must come before **City**. Getting the order wrong
doesn't just look strange; a parameter can't reference a value that
hasn't been chosen yet.

## Key terms

| Term | Meaning |
|---|---|
| Cascading parameters | A chain of parameters where each one's available values depend on the value chosen for the parameter before it |
| Dependency chain | The sequence of datasets, each filtered by the previous parameter on its own Filters tab, that supplies each cascading parameter's values |
| Filters tab | The Dataset Properties tab where a dataset's query results get narrowed by Expression / Operator / Value — the actual mechanism behind a cascade |
| Parameter order | The sequence parameters appear under the Parameters node — it determines both prompt order and which parameters are already known when each dataset's query runs |

## Lab

1. Sketch (on paper or in a text file) a three-level cascade for a
   different domain than Country/State/City — for example
   Department → Team → Employee, or Category → Subcategory → Product.
2. For each level, write out what the dataset's Filters tab would need:
   an Expression, an Operator, and a Value referencing the parameter one
   level up.
3. Confirm the order: which parameter has to come first in the Report
   Data pane's Parameters node, and why?

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does a three-level cascading parameter setup require three separate
filtered datasets rather than one, and what breaks if the parameters
are listed in the wrong order?
