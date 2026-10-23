# Lesson 6 — Common GlideRecord Performance Mistakes

**Chapter 2 · Diagnosing Slow Scripts · Lesson 6 of 25**

## What you'll learn

- A one-sentence recap of the GlideRecord mistakes Course 5 already covered
- What a query running inside a loop actually looks like once you're measuring it with the profiler
- How to rewrite a query-in-a-loop pattern so it runs once
- The profiler signature of using a full GlideRecord loop just to count rows
- How to recognize both patterns fast, before they ever reach production

## A quick recap

Course 5, Chapter 3 covered the core GlideRecord performance pitfalls: querying inside a loop
instead of once, forgetting `.setLimit()` on queries that don't need every row, and looping
through a full GlideRecord result just to count records instead of using GlideAggregate. This
lesson assumes you already know *why* each of those is slow. What it adds is how to actually
*see* them — their real, recognizable signature once you're looking at a profiled transaction
instead of just reading the script.

## The signature of a query stuck in a loop

A query that runs once outside a loop shows up in a debug panel as exactly one line. A query
that got left inside a loop shows up as the *same query, repeated* — once for every iteration —
and the profiler either lists it over and over in a row or rolls it up into one line with an
execution count attached. Either way, the tell is repetition: the same table, the same
condition shape, firing far more times than the business logic calls for.

Here's the pattern that produces it — a business rule on `incident` that, for every active
incident linked to a problem, re-queries that problem one at a time:

```javascript
var incGr = new GlideRecord('incident');
incGr.addActiveQuery();
incGr.query();
while (incGr.next()) {
    var probGr = new GlideRecord('problem');
    probGr.addQuery('sys_id', incGr.problem_id);
    probGr.query();
    if (probGr.next()) {
        gs.info(incGr.getValue('number') + ' linked to problem ' + probGr.getValue('number'));
    }
}
```

If this runs over 50 active incidents, the debug panel doesn't show one `problem` query — it
shows fifty, back to back, each one small on its own but adding up to a real chunk of the
transaction. A real profiler line for this might read something like
`GlideRecord Query: problem [47 executions] — 2980 ms`. Forty-seven is the tell. Nobody wrote
code that intentionally queries `problem` forty-seven times for one transaction — it's a side
effect of putting the query inside the loop.

## The fix: don't query what you can dot-walk

`problem_id` is a reference field already sitting on the `incident` record. Dot-walking it reads
the related `problem` record's fields through the reference ServiceNow already resolved, instead
of opening a brand-new `GlideRecord` and running a fresh query for every single incident:

```javascript
var incGr = new GlideRecord('incident');
incGr.addActiveQuery();
incGr.query();
while (incGr.next()) {
    if (incGr.problem_id) {
        gs.info(incGr.getValue('number') + ' linked to problem ' + incGr.problem_id.number);
    }
}
```

Same output, one query against `incident`, zero extra `GlideRecord` objects created per
iteration. In the profiler, the fifty repeated `problem` queries simply disappear.

## The other repeating signature: counting with a loop

The second classic mistake shows up differently in the profiler — not as many small repeated
queries, but as one query that returns far more rows than anything actually uses:

```javascript
var count = 0;
var gr = new GlideRecord('incident');
gr.addQuery('assignment_group', current.sys_id);
gr.addActiveQuery();
gr.query();
while (gr.next()) {
    count++;
}
```

This pulls every matching row across the network just to increment a counter — on a busy
assignment group, that's hundreds of full records fetched to produce one integer.
`GlideAggregate` asks the database to do the counting and sends back only the number:

```javascript
var ga = new GlideAggregate('incident');
ga.addQuery('assignment_group', current.sys_id);
ga.addActiveQuery();
ga.addAggregate('COUNT');
ga.query();
var count = 0;
if (ga.next()) {
    count = ga.getAggregate('COUNT');
}
```

In a profiled transaction, this turns a large, slow query into a small, fast one — and it's a
pattern worth recognizing on sight: any `while (gr.next()) { count++; }` is a GlideAggregate
waiting to replace it.

## Key terms

| Term | Meaning |
|---|---|
| Query-in-a-loop | Running a new GlideRecord query on each iteration of a loop instead of once |
| Execution count | The number of times the profiler recorded the same query running in one transaction |
| Dot-walking | Reading a referenced record's field through a reference field already on the current record, without a new query |
| GlideAggregate | A GlideRecord variant that returns a computed aggregate (count, sum, etc.) instead of full rows |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: a debug panel shows a `problem`
query with an execution count of 47 inside one business rule transaction. What does that count,
by itself, tell you about where the query sits in the script — before you've even opened the
code?
