# Script — Naming Conventions That Scale

## Segment 1 (title)

stg_orders, int_order_items_summed_to_orders, and orders as a mart each already told you something true before you opened the file. A naming convention is a promise about behavior — enforced by habit and review, not by dbt itself.

## Segment 2 (steps: the prefixes)

stg_ means 1-to-1 with a source, renamed and typed, no joins. int_ means a purpose-built, verb-first transformation step, ephemeral, never queried directly. fct_ and dim_ are a real Kimball-style alternative for marts — fct_ for a transaction, dim_ for a descriptive entity — used by dbt Labs' own exposures example even though their main marts guidance leads with plain nouns instead.

## Segment 3 (steps: why it matters at scale)

At six models nobody needs a convention. At sixty models across a team, a git grep for stg_ needs to return every staging model and nothing else, and a reviewer needs to gauge risk from a filename alone in a diff.

## Segment 4 (steps: the cost of drift)

A project that skips this ends up with staging models that look like marts and marts that look like one-off reports. The DAG still technically works — dbt doesn't care what you name things — but every new person re-learns the project from scratch because the names stopped telling the truth.

## Segment 5 (outro)

Next lesson: The Layering Philosophy — why three layers, not one big model and not five.
