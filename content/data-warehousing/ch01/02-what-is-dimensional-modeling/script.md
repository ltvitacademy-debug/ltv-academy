# Script — What Is Dimensional Modeling?

## Segment 1 (title)

Last lesson drew the line between OLTP and OLAP. This lesson names the technique that actually builds the OLAP side of that line: dimensional modeling. It's a precise term, and it's worth being precise about what it means before we go any further.

## Segment 2 (steps: two building blocks)

Dimensional modeling classifies every table in your model as one of exactly two types. A dimension table describes a thing your business cares about — a product, a customer, a date — with a key column and descriptive attributes you filter and group by. A fact table stores a measurement or an event — a sale, a stock count — with dimension keys and numeric measures you summarize. Every table is one or the other. Never both.

## Segment 3 (steps: what it optimizes for)

Why bother with this classification? Three reasons. Query performance — filtering through a handful of dimension tables and summarizing a fact table needs far fewer joins than a normalized schema. Business intuitiveness — "sales by product by region by quarter" maps almost directly onto tables named the way business users already talk. And conformance — build a dimension like Date correctly once, and every fact table in the warehouse can reuse it, so "quarter" means the same thing everywhere. The cost is deliberate denormalization — repeating descriptive data instead of storing it once — and that's a trade worth making for a system built to be read, not written to.

## Segment 4 (outro)

You now know the two building blocks. Next lesson looks at the actual shape those dimension tables can take — star schema or snowflake schema — and why you'd choose one over the other.
