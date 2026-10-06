# Script — Segment Labels: Balancing, Cost Center and Natural Account

## Segment 1 (title)

A segment named "Company" is just a name until you tell Oracle Fusion what it actually means. That meaning comes from a segment label — and this lesson covers balancing, cost center, natural account, and intercompany.

## Segment 2 (steps)

You can name a segment anything, but the label is what drives behavior. The balancing label ensures journals balance for each value of that segment — critical for a trial balance per entity. Primary balancing is mandatory; second and third are optional, for extra balance dimensions.

## Segment 3 (steps)

Cost center marks a segment as a functional expense grouping — a department or team. It's optional in general, but effectively required if the business uses Oracle Assets or Oracle Expenses, since both expect a cost center segment.

## Segment 4 (steps)

Natural account is mandatory — it classifies a transaction into one of the five fundamental types: asset, liability, equity, revenue, or expense. It answers what kind of thing this is, independent of company or department.

## Segment 5 (code)

Intercompany tracks due-to and due-from balances between trading entities. Its one hard restriction: a segment with the intercompany label cannot also carry a balancing label, and its values must mirror the primary balancing segment's values.

## Segment 6 (outro)

Label, not name, determines behavior. Next up, lesson twenty-two: value sets and values, the actual lists of values that live inside each labeled segment.
