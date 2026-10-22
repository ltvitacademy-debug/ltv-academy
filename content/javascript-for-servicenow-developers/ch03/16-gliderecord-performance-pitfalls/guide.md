# Lesson 16 — GlideRecord Performance Pitfalls

**Chapter 3 · GlideRecord · Lesson 16 of 32**

## What you'll learn

- The "N+1" pitfall: why querying inside a loop is the most common GlideRecord performance bug
- Why `.getRowCount()` is usually the wrong way to check "does anything match"
- `.setLimit()` for when you only need a sample, not every row
- Why `GlideAggregate` beats a GlideRecord loop for counts and sums

## Pitfall 1: querying inside a loop

This is the single most damaging GlideRecord mistake, and it's easy to
write by accident:

```javascript
// BAD — one query per outer-loop iteration ("N+1")
var accounts = new GlideRecord('core_company');
accounts.query();
while (accounts.next()) {
    var openIncidents = new GlideRecord('incident');
    openIncidents.addQuery('company', accounts.getUniqueValue());
    openIncidents.addQuery('active', true);
    openIncidents.query();
    gs.info(accounts.getValue('name') + ' has ' + openIncidents.getRowCount() + ' open incidents');
}
```

If there are 500 companies, this runs **501 queries** — one to get the
companies, then one more *per company* inside the loop. This pattern is
called "N+1": one query to get N rows, plus N more queries, one per
row. It scales terribly — doubling the number of companies doubles the
number of queries, not just the work per query.

```javascript
// GOOD — one query total, grouped in memory
var counts = {};
var incidents = new GlideRecord('incident');
incidents.addQuery('active', true);
incidents.query();
while (incidents.next()) {
    var companyId = incidents.getValue('company');
    counts[companyId] = (counts[companyId] || 0) + 1;
}
```

One query against `incident`, then counting happens in memory with a
plain JavaScript object. No matter how many companies exist, this is
still exactly one query.

## Pitfall 2: `.getRowCount()` just to check "any matches?"

```javascript
// WASTEFUL — getRowCount() still runs the full query first
var gr = new GlideRecord('incident');
gr.addQuery('priority', 1);
gr.addQuery('active', true);
gr.query();
if (gr.getRowCount() > 0) {
    gs.info('There are open P1 incidents.');
}
```

`.getRowCount()` doesn't avoid running the query — it runs the query
and then reports how many rows matched, which means the database still
did the full work of finding every matching row even though you only
cared whether *any* existed. When all you need is a yes/no answer,
check `.next()` once instead:

```javascript
// BETTER — the database can stop as soon as it finds one match
var gr = new GlideRecord('incident');
gr.addQuery('priority', 1);
gr.addQuery('active', true);
gr.setLimit(1);
gr.query();
if (gr.next()) {
    gs.info('There are open P1 incidents.');
}
```

## Pitfall 3: not setting `.setLimit()` for a sample

If you only need the first few results — say, the 10 most recent
incidents for a dashboard widget — fetching every matching row and
discarding all but 10 is wasted work:

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.orderByDesc('sys_created_on');
gr.setLimit(10);
gr.query();
while (gr.next()) {
    gs.info(gr.getValue('number'));
}
```

`.setLimit(n)` caps the number of rows returned, letting the database
stop early instead of fetching (and the script discarding) everything
beyond what's actually needed.

## Pitfall 4: looping to compute a count or sum

```javascript
// SLOW — pulls every full row just to count them
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.addQuery('priority', 1);
gr.query();
var count = 0;
while (gr.next()) {
    count++;
}
```

```javascript
// FAST — GlideAggregate never pulls full row data at all
var ga = new GlideAggregate('incident');
ga.addQuery('active', true);
ga.addQuery('priority', 1);
ga.addAggregate('COUNT');
ga.query();
if (ga.next()) {
    var count = ga.getAggregate('COUNT');
}
```

`GlideAggregate` is a real, separate ServiceNow API built specifically
for aggregate operations — `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` — grouped
or ungrouped. It never retrieves full row data at all, which makes it
far more efficient than looping a GlideRecord just to tally rows or
total a field.

## Key terms

| Term | Meaning |
|---|---|
| N+1 query | One query to get N rows, plus one more query per row inside a loop — scales badly |
| `.getRowCount()` | Reports how many rows matched, but only after running the full query |
| `.setLimit(n)` | Caps the number of rows a query returns, letting the database stop early |
| `GlideAggregate` | A separate API for COUNT/SUM/AVG/MIN/MAX that never pulls full row data |

## Check yourself

Without looking back: why does querying inside a loop over 500 companies
produce 501 total queries, and what's the one-query alternative that
avoids it?
