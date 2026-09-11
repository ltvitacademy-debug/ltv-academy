# Script — Warehouse Naming Conventions

## Segment 1 (title)

A warehouse holds dozens of fact and dimension tables, often queried by people who never designed the schema. This lesson is about the one thing that keeps that navigable: naming conventions.

## Segment 2 (steps: table prefixes)

The single most valuable convention is prefixing every table by its role. Fact_ for a fact table, measures at a grain. Dim_ for a dimension, descriptive attributes. Bridge_ for a many-to-many bridge table. Stg_ for staging — not for direct reporting. See Fact_Sales for the first time, and you already know what you're looking at.

## Segment 3 (steps: column patterns)

Inside tables, the same discipline applies. Surrogate keys always end in Key — ProductKey, CustomerKey. Natural keys get named for their source instead, so nobody accidentally joins on the wrong one. And audit columns — load date, source system, row start and end dates — use the exact same names on every single table that has them.

## Segment 4 (outro)

No specific convention here is objectively correct. What matters is picking one and applying it with zero exceptions. Next lesson: documenting the model itself, for the people who come after you.
