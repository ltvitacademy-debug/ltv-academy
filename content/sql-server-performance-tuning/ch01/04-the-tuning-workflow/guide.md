# The Tuning Workflow

Lesson 1 gave you the four-step loop — measure, identify, change, verify. That's the
shape of every tuning effort, but "identify" and "change" hide a lot of real decisions.
This lesson expands the loop into a concrete, repeatable checklist you can actually run
against a real "this query is slow" ticket.

## What you'll learn

- The expanded workflow: intake, reproduce, measure, isolate, hypothesize, change, verify, document
- Why reproducing the problem exactly matters more than it sounds like it should
- What to write down when you're done, and why

## The expanded workflow

1. **Intake** — get the actual complaint in specific terms (Lesson 2): which query or
   report, what does "slow" mean here, when does it happen, is it constant or
   intermittent.
2. **Reproduce** — run the actual query, with the actual parameter values a user hit,
   ideally in an environment that reflects production data volume and load.
   Reproducing with different parameters or a tiny test table can hide the real problem
   (see Lesson 9 on parameter sniffing for a case where the *specific value* is the bug).
3. **Measure** — capture duration, CPU time, logical reads, and the actual execution plan
   for the reproduced query (Lesson 2's metrics, Lesson 6+'s plan reading).
4. **Isolate** — narrow down to the specific operator, wait type, or resource that's
   actually driving the cost. A query with ten joins might have one bad join; don't tune
   the other nine.
5. **Hypothesize** — form a specific, falsifiable guess: "this Key Lookup is expensive
   because there's no covering index for these columns," not "indexes might help."
6. **Change** — make exactly one change that tests that hypothesis. One change at a time
   is non-negotiable — if you change an index *and* rewrite the query *and* bump
   `MAXDOP`, and it gets faster, you don't know which one did it.
7. **Verify** — re-measure the exact same metrics from step 3, against the baseline from
   Lesson 3. Confirm the specific bottleneck you targeted actually moved, and check that
   nothing else got worse (that added index — did any write path slow down?).
8. **Document** — record what the problem was, what you changed, and what the
   measured before/after was. Future-you (or the next DBA) needs this when the same
   symptom shows up again, or when someone asks "didn't we already fix this?"

## Why reproducing exactly matters

A query that's fast against a 10,000-row test table can be catastrophically slow against
the 40-million-row production table with the same shape — different data volume changes
which plan the optimizer picks entirely (a Nested Loops join that's fine for a small table
becomes a disaster at scale). Likewise, a stored procedure that runs fast for one customer
ID and slow for another isn't randomly inconsistent — that's a specific, diagnosable
pattern (Lesson 9). Skipping straight to "let me just try an index" without reproducing
the actual reported conditions means you might be solving a problem that doesn't exist,
while the real one waits.

## One change at a time isn't slower, it's honest

It's tempting to bundle several plausible fixes into one deployment, especially under
pressure to "just fix it." But bundling changes destroys your ability to learn anything —
if performance improves, you don't know which change mattered (and you might have
introduced a regression that's currently being masked by the improvement). Isolating
changes costs a little more calendar time per fix and pays it back permanently in
diagnostic clarity for every future incident.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Running the actual reported query, with real parameters and representative data volume |
| Isolate | Narrowing a multi-part problem down to the specific operator or resource actually at fault |
| Hypothesis | A specific, falsifiable guess about the cause, tested by exactly one change |
| Document | Recording the problem, the change, and the measured before/after for future reference |

## Check yourself

A DBA gets a "this stored procedure is slow" ticket, adds an index, rewrites a subquery,
and sets `MAXDOP 4`, all in the same deployment. It's faster afterward. What's the problem
with this approach, according to the expanded workflow?
