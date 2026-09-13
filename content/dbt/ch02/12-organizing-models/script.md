# Script — Organizing Models Across a Project

## Segment 1 (title)

Across this chapter you built a source declaration, a staging model, and one model joining two staging models together. In a real project, those don't sit in one flat folder — they're organized by what stage of transformation they represent.

## Segment 2 (steps: what you've built, placed on a map)

Two folders so far: staging, subdivided by source, and marts, where business-facing models land. Staging holds the 1:1 cleanup models. Marts holds the final model analysts and BI tools actually query.

## Segment 3 (steps: a preview of the full shape)

Most real projects converge on a third layer in between: intermediate — joins and logic that aren't yet a final model, existing purely to keep marts models readable. Chapter 3 teaches exactly when one earns its place; for now, just recognize the shape.

## Segment 4 (steps: the principle that scales)

One rule keeps a project navigable at any size: folders mirror the data's transformation stage, not just its business subject. A staging folder only ever contains staging models. That predictability is what makes a project readable before you open a single file.

## Segment 5 (outro)

Next up: Chapter 3, Staging, Intermediate & Marts — the full layering philosophy, naming conventions, and when each layer actually earns its place.
