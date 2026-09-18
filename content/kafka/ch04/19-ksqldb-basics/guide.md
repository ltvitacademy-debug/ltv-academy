# Lesson 19 — ksqlDB Basics

**Chapter 4 · Kafka Connect & Stream Processing · Lesson 19 of 30**

## What you'll learn

- What ksqlDB actually is: a SQL layer over Kafka topics, built on the same engine as Kafka Streams
- The core statement shape: `CREATE STREAM ... AS SELECT ... FROM ... WHERE ...`
- Why this feels familiar coming from KQL over Eventstreams, and where the resemblance ends
- When a team reaches for ksqlDB instead of writing a Kafka Streams application

## SQL, over the same engine as Lesson 18

Kafka Streams (Lesson 18) does real stream processing, but it means
writing and deploying a Java application. **ksqlDB** solves the exact
same class of problem — filtering, transforming, aggregating a
continuous stream — with SQL-like statements instead. Under the
hood, ksqlDB compiles those statements into the same kind of topology
Kafka Streams builds by hand; it's a different interface onto the
same underlying engine, not a competing product with its own storage
model.

That matters practically: a team that wants streaming logic without
maintaining a Java codebase, or that wants analysts comfortable with
SQL to be able to write and adjust stream transformations themselves,
reaches for ksqlDB instead.

## The core statement shape

A ksqlDB **stream** is declared over an existing topic, and a
derived stream is created with a `CREATE STREAM ... AS SELECT`
statement — often shortened to a **CSAS**:

```sql
CREATE STREAM high_value_orders AS
  SELECT order_id, customer_id, amount, status
  FROM orders
  WHERE amount > 100
  EMIT CHANGES;
```

Read that next to Lesson 18's Java topology — it's the identical
operation: read `orders`, keep events where `amount > 100`, and
continuously write the result to a new stream (which is, underneath,
a new Kafka topic). `EMIT CHANGES` is what marks this as a
**continuous, streaming query** rather than a one-time snapshot —
the query keeps running and keeps producing new rows as new events
arrive on `orders`.

For aggregation, ksqlDB has a **table** concept — a
continuously updated, keyed view, the SQL-layer equivalent of
Lesson 18's `KTable`:

```sql
CREATE TABLE order_counts_by_customer AS
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders
  GROUP BY customer_id
  EMIT CHANGES;
```

## Familiar from KQL — but it's Kafka's own layer

If this feels like something you've already done, it should: KQL
over Eventhouse (Fabric & Real-Time Analytics Lessons 21–22) already
trained you to write `where` and `summarize` statements against a
continuous stream of events. The instinct transfers directly. But
ksqlDB is **not** KQL — it's Kafka's own SQL dialect, running against
Kafka topics specifically, with its own syntax (`EMIT CHANGES`,
`CREATE STREAM` vs. `CREATE TABLE` as a real semantic distinction
between an append-only stream and a keyed, updated table) and its own
windowed-aggregation syntax for the same "count per five-minute
window" problem Fabric's windowing lessons (29–32) covered on the
Eventstreams side.

## When to reach for ksqlDB instead of Kafka Streams

- **Reach for ksqlDB** when the logic is expressible as filters,
  projections, joins, and aggregations, and the team wants to write
  and iterate on it without a Java build/deploy cycle.
- **Reach for Kafka Streams** when the logic needs arbitrary custom
  code — calling out to another service, complex conditional branching,
  or anything a `SELECT` statement genuinely can't express.

Many real deployments use both: ksqlDB for straightforward
transformations, Kafka Streams applications for the pieces that need
real code.

## Key terms

| Term | Meaning |
|---|---|
| ksqlDB | Kafka's own SQL layer, compiling statements into the same engine Kafka Streams uses directly |
| CSAS | `CREATE STREAM ... AS SELECT` — the core statement that derives a new stream from an existing one |
| EMIT CHANGES | Marks a ksqlDB query as continuous/streaming, not a one-time snapshot |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
is ksqlDB described as "a different interface onto the same engine"
as Kafka Streams, rather than a separate product, and how is that
different from KQL's relationship to Fabric's Eventhouse?
