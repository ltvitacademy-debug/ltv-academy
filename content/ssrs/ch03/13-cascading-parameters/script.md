# Script — Cascading Parameters

## Segment 1 (title)

This lesson is about cascading parameters — chaining parameters together so choosing one value narrows the list of choices available in the next.

## Segment 2 (steps: dependency chain)

Picture a Category, Subcategory, Product cascade. Pick a category, and the subcategory list should only show subcategories that belong to it. Pick a subcategory, and the product list narrows again. That's not one setting you flip on — it's a chain of three separate datasets. An independent Category dataset returns every category. A Subcategory dataset references at-Category in its query, so it only returns subcategories for whichever category got picked. And a Product dataset references at-Subcategory the same way.

## Segment 3 (steps: order matters)

Order here isn't cosmetic. The sequence parameters appear under the Parameters node in the Report Data pane is the order the reader gets prompted at runtime — and it has to match the dependency chain. Category has to come before Subcategory, because the Subcategory dataset's query references at-Category, and that value has to already exist. Get the order wrong, and a parameter ends up referencing a choice that hasn't been made yet.

## Segment 4 (outro)

Next lesson, we look at default values — letting a report run automatically with sensible values already filled in, instead of always waiting on the reader.
