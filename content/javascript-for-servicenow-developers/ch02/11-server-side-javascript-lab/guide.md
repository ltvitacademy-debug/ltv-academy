# Lesson 11 — Server-Side JavaScript Lab

**Chapter 2 · JavaScript for Server-Side Scripting · Lesson 11 of 32**

## What you'll learn

- How to combine scope rules, string methods, `GlideDateTime`, and JSON into one realistic Script Include method
- How to build a readable label from a date and a number of days using string methods and a template literal
- How to compute a target date correctly with `GlideDateTime` instead of native `Date`
- How to return a structured result as a JSON string, the same way a Scripted REST API would
- How to read and extend a small multi-step script end to end, the way you'll be expected to on the job

## The scenario

A ServiceNow admin team wants a reusable Script Include method: given a starting `GlideDateTime` and a number of business-relevant days, compute the resulting due date, build a short, readable label describing it, and return the whole thing as a JSON string so it can be logged, returned from a Scripted REST API, or handed to a client script via GlideAjax. This is a realistic composite of everything this chapter covered — scope, strings, dates, and JSON — in one method.

## Step 1 — Define the Script Include and its method signature

Script Includes in ServiceNow are typically written as a single global function wrapping a class-like object, using the classic ES5-safe pattern you'll see throughout the platform. We'll use `var` here deliberately, matching real Script Include conventions, and reach for `let`/`const` only inside the method body where block scope actually helps us.

```javascript
var DueDateCalculator = Class.create();
DueDateCalculator.prototype = {
    initialize: function () {},

    buildDueDateLabel: function (startGdt, numDays) {
        // filled in below
    },

    type: 'DueDateCalculator'
};
```

## Step 2 — Compute the due date with GlideDateTime

Native JavaScript `Date` math is the wrong tool here — it has no idea what time zone the instance or the requesting user is configured for. `GlideDateTime.addDaysUTC()` is the correct, timezone-safe way to move a date forward.

```javascript
buildDueDateLabel: function (startGdt, numDays) {
    var dueGdt = new GlideDateTime(startGdt.getValue()); // copy, don't mutate the original
    dueGdt.addDaysUTC(numDays);

    var isAlreadyPast = dueGdt.before(new GlideDateTime());
    // ... continues below
}
```

Copying `startGdt` into a new `GlideDateTime` before calling `addDaysUTC()` matters: `GlideDateTime` objects are mutable, so modifying the original would silently change a value the caller might still need elsewhere.

## Step 3 — Build a readable label with string methods

Next, format a short label using the display value and a couple of native string methods — pulling out just the date portion and trimming any stray whitespace.

```javascript
buildDueDateLabel: function (startGdt, numDays) {
    var dueGdt = new GlideDateTime(startGdt.getValue());
    dueGdt.addDaysUTC(numDays);

    var isAlreadyPast = dueGdt.before(new GlideDateTime());
    var statusWord = (isAlreadyPast ? 'overdue' : 'on track').trim();
    var displayDate = dueGdt.getDisplayValue().split(' ')[0]; // date part only

    var label = `Due ${displayDate} (${numDays} days out) — ${statusWord}`;
    // ... continues below
}
```

`.split(' ')[0]` takes `getDisplayValue()`'s `"2026-10-27 09:15:00"`-style output and keeps only the date portion before the first space. The template literal assembles the final label far more readably than string concatenation would.

## Step 4 — Return a structured, JSON-stringified result

Finally, build a plain result object and serialize it with `JSON.stringify()`, so any caller — a Scripted REST API, a GlideAjax client call, a log statement — gets back a predictable, parseable string.

```javascript
var DueDateCalculator = Class.create();
DueDateCalculator.prototype = {
    initialize: function () {},

    buildDueDateLabel: function (startGdt, numDays) {
        var dueGdt = new GlideDateTime(startGdt.getValue());
        dueGdt.addDaysUTC(numDays);

        var isAlreadyPast = dueGdt.before(new GlideDateTime());
        var statusWord = (isAlreadyPast ? 'overdue' : 'on track').trim();
        var displayDate = dueGdt.getDisplayValue().split(' ')[0];

        var label = `Due ${displayDate} (${numDays} days out) — ${statusWord}`;

        var result = {
            dueDate: dueGdt.getDisplayValue(),
            daysOut: numDays,
            label: label,
            isOverdue: isAlreadyPast
        };

        return JSON.stringify(result);
    },

    type: 'DueDateCalculator'
};
```

## Step 5 — Calling it, and reading the result back

A Business Rule or another Script Include calls this method and gets a JSON string back — exactly the shape a Scripted REST API would hand to a caller, or a GlideAjax response would hand to a client script.

```javascript
var calc = new DueDateCalculator();
var startGdt = new GlideDateTime(); // "now"
var resultJson = calc.buildDueDateLabel(startGdt, 5);

gs.log(resultJson);
// {"dueDate":"2026-10-27 09:15:00","daysOut":5,"label":"Due 2026-10-27 (5 days out) — on track","isOverdue":false}

var result = JSON.parse(resultJson);
gs.log(result.label);
// Due 2026-10-27 (5 days out) — on track
```

Notice the full loop: `GlideDateTime` did the timezone-safe date math, native string methods and a template literal built the human-readable label, and `JSON.stringify()`/`JSON.parse()` carried the structured result across the method boundary — every piece from this chapter, working together in one small, realistic method.

## Key terms

| Term | Meaning |
|---|---|
| Script Include | A reusable server-side JavaScript class/function, called from Business Rules, other Script Includes, or GlideAjax |
| `addDaysUTC(n)` | Advances a `GlideDateTime` by `n` days, computed in UTC for timezone safety |
| Template literal | Backtick string allowing `${expression}` interpolation, used here to assemble the label |
| `JSON.stringify()` | Converts the result object into a string so any caller receives a predictable, parseable shape |
| Mutable object | An object (like `GlideDateTime`) whose internal state can change — copy before modifying if the original must stay intact |

## Check yourself

If `buildDueDateLabel()` had mutated `startGdt` directly instead of copying it into `dueGdt` first, what real problem could that cause for whatever code called this method with its own `GlideDateTime` object?
