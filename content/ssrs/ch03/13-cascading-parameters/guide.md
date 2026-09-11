# Lesson 13 — Cascading Parameters

**Chapter 3 · Parameters · Lesson 13 of 40**

## What you'll learn

- What a cascading parameter is, and why it's a chain of dependent
  datasets, not a single parameter setting
- Why order matters — and how the Report Data pane's parameter order
  controls the order a reader sees the prompts
- How each parameter in the chain needs its own dataset to supply its
  available values
- The classic three-level example: Category → Subcategory → Product

## One parameter's available values depend on another's choice

A **cascading parameter** setup is what you build when a list of
available values is too long to show all at once, and it naturally
narrows based on an earlier choice. Pick a product category, and the
subcategory list should only show subcategories that belong to that
category. Pick a subcategory, and the product list should only show
products in it. Each step in the chain filters the next.

This isn't one property you flip on. It's a **chain of separate
datasets**, each one filtered by the parameter chosen before it.

## The dependency chain

There's no Report Builder screenshot that captures this well in one
frame — the chain lives across three separate dataset queries, not one
dialog. Here's the shape of it:

```
Category dataset  --(feeds available values for)-->  Category parameter
      |
      v  (@Category referenced in its query)
Subcategory dataset  --(feeds available values for)-->  Subcategory parameter
      |
      v  (@Subcategory referenced in its query)
Product dataset  --(feeds available values for)-->  Product parameter
```

1. **Category dataset** — an independent query with no parameter
   reference; it returns every category. This becomes the available
   values for the `Category` parameter.
2. **Subcategory dataset** — its query includes a reference to
   `@Category` (e.g., `WHERE CategoryID = @Category`), so it only
   returns subcategories belonging to whichever category the reader
   picked. This dataset becomes the available values for the
   `Subcategory` parameter.
3. **Product dataset** — its query references `@Subcategory`, so it
   only returns products in the subcategory the reader picked. This
   feeds the `Product` parameter.

The **main report dataset** — the one that actually drives the table or
matrix on the page — then typically references all three parameters in
its own `WHERE` clause, so the final report reflects the full chain of
choices.

## Order is not cosmetic

The order that parameters appear under the **Parameters** node in the
Report Data pane is the order the reader is prompted for them at
runtime. Because the `Subcategory` dataset's query references
`@Category`, `Category` **must** come before `Subcategory` in that
list — and `Subcategory` must come before `Product`. Getting the order
wrong doesn't just look strange; a parameter can't reference a value
that hasn't been chosen yet.

## Key terms

| Term | Meaning |
|---|---|
| Cascading parameters | A chain of parameters where each one's available values depend on the value chosen for the parameter before it |
| Dependency chain | The sequence of datasets, each filtered by the previous parameter, that supplies each cascading parameter's values |
| Available values | The list of valid choices a reader sees for a parameter's dropdown |
| Parameter order | The sequence parameters appear under the Parameters node — it determines both prompt order and which parameters are already known when each dataset's query runs |

## Lab

1. Sketch (on paper or in a text file) a three-level cascade for a
   different domain than Category/Subcategory/Product — for example
   Region → State → City, or Department → Team → Employee.
2. For each level, write out what the dataset query's `WHERE` clause
   would need to reference from the level above it.
3. Confirm the order: which parameter has to come first in the Report
   Data pane's Parameters node, and why?

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does a three-level cascading parameter setup require three separate
datasets rather than one, and what breaks if the parameters are listed
in the wrong order?
