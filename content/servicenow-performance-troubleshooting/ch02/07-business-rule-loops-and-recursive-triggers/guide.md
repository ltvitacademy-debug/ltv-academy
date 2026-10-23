# Lesson 7 — Business Rule Loops & Recursive Triggers

**Chapter 2 · Diagnosing Slow Scripts · Lesson 7 of 25**

## What you'll learn

- A one-sentence recap of the business rule infinite-loop mistake from Course 6
- The real detection signature: the same business rule firing far more times than one action should cause
- The most common real cause: calling `current.update()` inside an after business rule
- The standard fix: `current.setWorkflow(false)` plus an idempotent guard
- How to confirm the fix actually worked, using the same profiler you already know

## A quick recap

Course 6, Chapter 1 covered the classic mistake: a business rule that updates the same table
it's triggered on, without excluding the change it itself just made, so that update triggers the
business rule again. This lesson assumes you already know that's the mistake. What it adds is
how to actually catch it happening — and the standard, correct fix, in real code.

## The real detection signature: count, not duration

A recursive business rule doesn't always show up as one scary multi-second line in the debug
panel. Often the opposite — each individual execution is fast, sometimes just a few
milliseconds. What gives it away is how many times it appears for one single user action:

```
*** Script: Business Rule "Calculate Priority Score" (incident) - 14 ms
*** Script: Business Rule "Calculate Priority Score" (incident) - 14 ms
*** Script: Business Rule "Calculate Priority Score" (incident) - 14 ms
*** Script: Business Rule "Calculate Priority Score" (incident) - 11 ms
*** Script: Business Rule "Calculate Priority Score" (incident) - 9 ms
*** Script: Business Rule "Calculate Priority Score" (incident) - 0 ms
```

One agent clicked Save once. "Calculate Priority Score" fired six times. Durations even trend
downward until the last run does essentially nothing — a sign the script is recalculating a value
that's converging, re-saving, converging a little more, and re-saving again, until the value
finally stops changing and the loop runs out of reasons to keep going. That shape — the same
business rule name, repeated, converging toward zero — is the signature of a recursive trigger,
whether or not any single run looks slow.

The same signature shows up in the Slow Request Log from Lesson 1: look at the time breakdown
for a transaction, and instead of one line for a business rule, you see the same name
attributed to several short bursts of time that together add up to something real.

## The usual cause: current.update() inside an after business rule

The most common real-world cause looks like this — a business rule that computes a value and
then explicitly saves the record again from inside its own script:

```javascript
// Business Rule: "Calculate Priority Score" — after insert/update, on incident
(function executeRule(current, previous) {
    current.u_priority_score = calculateScore(current);
    current.update(); // saves the record again
})(current, previous);
```

`current.update()` is a brand-new save. ServiceNow treats it exactly like any other update to
the `incident` table — which means every business rule configured to run on update, including
this one, is eligible to fire again. The platform does eventually stop (ServiceNow caps
recursion depth so this can't truly run forever), but by then the rule has fired several
unnecessary times for one real user action, each one adding to the transaction's total time.

## The fix: an idempotent guard, plus setWorkflow(false)

Two real, standard changes fix this, and they solve different parts of the problem:

```javascript
(function executeRule(current, previous) {
    var newScore = calculateScore(current);

    if (current.u_priority_score == newScore) {
        return; // already correct — nothing to save, nothing to re-trigger
    }

    current.u_priority_score = newScore;
    current.setWorkflow(false); // this save won't re-fire business rules on this table
    current.update();
})(current, previous);
```

The idempotent guard — checking whether the new value actually differs from the current one
before doing anything — means a run that would have been a no-op never saves at all.
`current.setWorkflow(false)`, called right before `current.update()`, tells the platform that
this particular save shouldn't re-trigger business rules, workflows, or flows on the table at
all. Together, the record gets saved once, correctly, and nothing re-fires because of it.

## Confirming the fix

After deploying the fix, repeat exactly what Lesson 5 taught: turn on Debug Business Rule,
reproduce the same save, and read the debug panel. "Calculate Priority Score" should now appear
exactly once for one user action. If it still appears more than once, the recursion has another
path into it that still needs tracing — the profiler will tell you that too.

## Key terms

| Term | Meaning |
|---|---|
| Recursive trigger | A business rule whose own save re-triggers itself, directly or through another rule |
| current.update() | Explicitly saves the current record from inside a script, which can re-trigger business rules on that table |
| current.setWorkflow(false) | Tells the platform that the next save on `current` should not fire business rules, workflows, or flows |
| Idempotent guard | A check that skips an action entirely when it would produce no actual change |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: a debug panel shows the same
business rule firing six times for one form save, with execution times that shrink toward zero.
What does the shrinking pattern tell you about what the script is doing, and which two changes
would you make to fix it?
