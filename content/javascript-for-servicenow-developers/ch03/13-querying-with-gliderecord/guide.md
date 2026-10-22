# Lesson 13 — Querying With GlideRecord

**Chapter 3 · GlideRecord · Lesson 13 of 32**

## What you'll learn

- The canonical GlideRecord query pattern: addQuery, query, while(gr.next())
- Why the while loop exists — what `.next()` actually returns and when
- Two real ways to read a field's value, and the difference between them
- How multiple `.addQuery()` calls combine (hint: it's always AND, by default)

## The canonical pattern

This is the single most common block of code in ServiceNow server-side
scripting. Memorize its shape, not just its meaning:

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.addQuery('priority', 1);
gr.query();
while (gr.next()) {
    gs.info(gr.getValue('number'));
}
```

Four distinct steps, each doing one job:

1. `new GlideRecord('incident')` — create the cursor (Lesson 12).
2. `.addQuery('active', true)` and `.addQuery('priority', 1)` — add filter
   conditions. Each `.addQuery()` call adds one more condition. By
   default, multiple `.addQuery()` calls on the same GlideRecord are
   combined with **AND** — this query finds incidents that are active
   **and** priority 1, not either/or.
3. `.query()` — actually sends the query to the database. Nothing
   before this line touched the database at all; `.addQuery()` only
   builds up the conditions in memory.
4. `while (gr.next())` — walks through the results one row at a time.

## Why the while loop, specifically

`.next()` does two things at once: it advances the cursor to the next
matching row, and it returns `true` if there was a row to advance to, or
`false` if the result set is exhausted. That's the entire reason the
`while (gr.next())` shape exists — it's not a stylistic choice, it's the
only correct way to drain a GlideRecord result set, because `.next()`
is both the "move forward" operation and the "are we done yet" check in
one call.

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('priority', 1);
gr.query();
gs.info('Before loop, cursor is not on a row yet.');
while (gr.next()) {
    // On the first iteration, gr now points at the first result.
    // Each later call to .next() advances to the next one.
    gs.info(gr.getValue('number'));
}
gs.info('Loop ends automatically once .next() returns false.');
```

Forgetting the loop — calling `.query()` and then reading fields without
ever calling `.next()` — is a common mistake. Right after `.query()`,
the cursor isn't positioned on any row yet; you have to call `.next()`
at least once to move onto the first result.

## Two ways to read a field

Both of these are real and both show up constantly in production
ServiceNow code:

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('number', 'INC0010001');
gr.query();
if (gr.next()) {
    var a = gr.getValue('short_description'); // plain string
    var b = gr.short_description;              // GlideElement
    gs.info(a);       // logs the display value, e.g. "Printer is down"
    gs.info('' + b);  // also logs "Printer is down" — it stringifies
}
```

`.getValue('field')` always returns a plain JavaScript string — the
value as stored. Dot notation (`gr.short_description`) returns a
**GlideElement** object, not a plain string — but a GlideElement
stringifies automatically to its display value whenever it's used in a
string context (concatenation, `gs.info()`, comparisons with `==`).
GlideElement carries extra methods too (like `.getDisplayValue()` for
reference fields, which can differ from the raw stored value), which is
why experienced developers often prefer dot notation for reference
fields and either style for plain text/choice fields.

## Combining conditions is AND by default

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.addQuery('assigned_to', gs.getUserID());
gr.addQuery('priority', 1);
gr.query();
```

This finds incidents that are active **and** assigned to the current
user **and** priority 1 — all three conditions must be true for a row to
match. Lesson 15 covers how to add OR logic when you need it.

## Key terms

| Term | Meaning |
|---|---|
| `.addQuery(field, value)` | Adds one filter condition; multiple calls combine with AND by default |
| `.query()` | Sends the built-up conditions to the database; nothing runs before this |
| `.next()` | Advances the cursor one row and returns true/false — the loop's exit condition |
| GlideElement | The object type dot-notation field access returns; stringifies to the display value |

## Check yourself

Without looking back: what specifically does `.next()` return, and why,
when the while loop reaches the last matching row and is called one more
time?
