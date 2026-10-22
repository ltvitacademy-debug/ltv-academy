# Lesson 29 — Debugging Lab

**Chapter 6 · Debugging JavaScript on ServiceNow · Lesson 29 of 32**

## What you'll learn

- How to diagnose a real reported bug using the tools from this chapter, in the right order
- Why confirming a GlideRecord query is even finding records comes before anything else
- How to read `gs.info()` output in the System Log to isolate exactly where logic goes wrong
- A real, common encoded-query typo bug — and the fix
- How to verify a fix actually worked, not just assume it did

## The reported bug

A Script Include method, `ChangeRequestUtils.getActiveChangesByRisk()`,
is supposed to return every active Change Request at a given risk
level. A Business Rule calls it to decide whether to auto-escalate.
Reports come in that it's "returning unexpected results" for certain
Change Requests — some that should clearly match aren't showing up.
Here's the method as written:

```javascript
var ChangeRequestUtils = Class.create();
ChangeRequestUtils.prototype = {
    initialize: function() {},

    getActiveChangesByRisk: function(riskLevel) {
        var results = [];
        var gr = new GlideRecord('change_request');
        gr.addEncodedQuery('active=ture^risk=' + riskLevel);
        gr.query();

        while (gr.next()) {
            results.push(gr.getValue('number'));
        }

        return results;
    },

    type: 'ChangeRequestUtils'
};
```

## Step one: confirm the query is even finding records

Before assuming the logic inside the loop is wrong, Lesson 27's
workflow applies first: trace the query itself. Since this runs
synchronously here, the Script Debugger *could* attach — but the
fastest first check is almost always a `gs.info()` right after the
query, logging how many rows actually came back:

```javascript
getActiveChangesByRisk: function(riskLevel) {
    var results = [];
    var gr = new GlideRecord('change_request');
    gr.addEncodedQuery('active=ture^risk=' + riskLevel);
    gr.query();

    gs.info('Query returned ' + gr.getRowCount() + ' rows for risk: ' + riskLevel, 'ChangeRequestUtils');

    while (gr.next()) {
        results.push(gr.getValue('number'));
    }

    return results;
}
```

## Step two: read the System Log

Calling `getActiveChangesByRisk('high')` and then filtering the
System Log for source `ChangeRequestUtils` shows:

```
Query returned 0 rows for risk: high
```

Zero rows — even though Change Requests at that risk level
definitely exist and are definitely active. That single log line
rules out the `while` loop, the `results.push()` call, and the
return value entirely. The bug is in the query itself, not in
anything that happens after it.

## Step three: find the actual typo

Looking again at the encoded query string:

```javascript
gr.addEncodedQuery('active=ture^risk=' + riskLevel);
```

`active=ture` — a typo. It should be `active=true`. ServiceNow's
encoded query parser doesn't throw an error for an unrecognized
value like `ture`; it simply never matches any record, because no
record has a literal `active` value of `"ture"`. The query silently
returns nothing, which is exactly why the Script Debugger alone
wouldn't have caught this as fast — stepping through the loop would
have shown nothing happening, but the `gs.info()` row count pointed
straight at the query line before any stepping was needed.

## Step four: the fix

```javascript
getActiveChangesByRisk: function(riskLevel) {
    var results = [];
    var gr = new GlideRecord('change_request');
    gr.addEncodedQuery('active=true^risk=' + riskLevel);
    gr.query();

    while (gr.next()) {
        results.push(gr.getValue('number'));
    }

    return results;
}
```

One character — `true` instead of `ture` — and the query starts
matching the active Change Requests it was always supposed to find.

## Step five: verify, don't assume

Fixing the typo isn't the finish line. Re-run the exact same
`gs.info()` trace one more time to confirm the row count is no
longer zero, then remove (or comment out) the temporary logging once
the fix is confirmed — leaving debug logging permanently in
production code just adds noise to the System Log for the next
person tracing a different problem.

## Key terms

| Term | Meaning |
|---|---|
| Encoded query | A string like `active=true^risk=high` describing a GlideRecord filter |
| `getRowCount()` | Returns how many records a query matched, after `.query()` runs |
| Silent query failure | An encoded query with a bad value matches zero rows with no error thrown |
| Verify the fix | Re-running the same trace after a fix, rather than assuming the one-line change worked |

## Check yourself

Without looking back: why did `active=ture` return zero rows instead
of throwing an error, and what was the one `gs.info()` line that
proved the bug was in the query itself, not in the loop below it?
