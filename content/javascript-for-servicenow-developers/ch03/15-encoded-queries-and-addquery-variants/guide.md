# Lesson 15 — Encoded Queries & addQuery Variants

**Chapter 3 · GlideRecord · Lesson 15 of 32**

## What you'll learn

- How `.addEncodedQuery()` turns the encoded-query string you already know into a real, executable filter
- The operator form of `.addQuery()` for comparisons other than equals
- `.addNullQuery()`, `.addNotNullQuery()`, and `.addOrCondition()`
- `.orderBy()` and `.orderByDesc()` for sorting results

## Encoded queries as real executable input

Earlier in this path, you learned to read an encoded query string off a
list's breadcrumb — something like `active=true^priority=1`. That same
string is real, executable input to GlideRecord, not just a display
artifact:

```javascript
var gr = new GlideRecord('incident');
gr.addEncodedQuery('active=true^priority=1');
gr.query();
while (gr.next()) {
    gs.info(gr.getValue('number'));
}
```

The syntax is exactly what you already know: `^` means AND between
conditions, `^OR` means OR. This single encoded-query string is
equivalent to two separate `.addQuery('active', true)` and
`.addQuery('priority', 1)` calls. `.addEncodedQuery()` is especially
useful when a query is built dynamically from a string (for example, a
query copied from a list view's URL, or passed in from a Script
Include parameter), rather than built condition-by-condition in code.

## The operator form of `.addQuery()`

`.addQuery('field', value)` with two arguments always means "equals."
For any other comparison, pass the operator explicitly as the second
argument:

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('priority', '<=', 2);       // priority 1 or 2
gr.addQuery('sys_created_on', '>', gs.daysAgoStart(7));
gr.query();
```

Common operators include `=`, `!=`, `>`, `>=`, `<`, `<=`, `IN`,
`NOT IN`, `STARTSWITH`, `CONTAINS`, and `DOES NOT CONTAIN`. The two-
argument form you saw in Lesson 13 is really just shorthand for the
three-argument form with `=` as the operator.

## Null checks and OR conditions

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.addNullQuery('assigned_to');        // unassigned incidents
gr.addQuery('priority', 1).addOrCondition('priority', 2); // P1 OR P2
gr.query();
```

`.addNullQuery('field')` filters for records where that field is empty
— here, unassigned incidents. `.addNotNullQuery('field')` is the
opposite, filtering for records where the field **does** have a value.
`.addOrCondition()` is how you chain an OR onto a condition you just
added — calling `.addQuery('priority', 1)` and then chaining
`.addOrCondition('priority', 2)` onto its return value means "priority
1 OR priority 2," as one combined condition group, which is then still
ANDed with everything else on the GlideRecord (like `active == true`
and the null check above).

## Ordering results

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.orderByDesc('priority');   // highest-priority-number last... careful
gr.orderBy('sys_created_on'); // oldest first within each priority group
gr.query();
while (gr.next()) {
    gs.info(gr.getValue('number') + ' - priority ' + gr.getValue('priority'));
}
```

`.orderBy('field')` sorts ascending; `.orderByDesc('field')` sorts
descending. Remember that in ServiceNow, **priority 1 is the most
urgent**, so `.orderBy('priority')` lists priority 1 first, not last —
double-check which direction you actually want before assuming
"descending" means "most urgent first" for a field like this.

## Key terms

| Term | Meaning |
|---|---|
| `.addEncodedQuery(str)` | Runs a real encoded-query string as the GlideRecord's filter; `^` = AND, `^OR` = OR |
| Operator form | `.addQuery(field, operator, value)` for comparisons other than equals |
| `.addNullQuery()` / `.addNotNullQuery()` | Filters for a field being empty, or not empty |
| `.addOrCondition()` | Chains an OR condition onto the `.addQuery()` call it's called on |

## Check yourself

Without looking back: what does `gr.addQuery('priority', 1).addOrCondition('priority', 2)`
actually produce, and how does it combine with any other `.addQuery()`
calls on the same GlideRecord?
