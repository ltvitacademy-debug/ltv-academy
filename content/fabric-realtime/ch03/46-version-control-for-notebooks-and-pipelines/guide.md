# Lesson 46 — Version Control for Notebooks and Pipelines

**Chapter 3 · Production Data Engineering · Lesson 46 of 70**

## What you'll learn

- What Git integration (Lesson 15) actually stores, item by item
- Why a notebook's cell output makes for a noisy diff
- Reviewing a KQL query change the same way you'd review any code
- Branching for a real change, end to end

## What actually gets committed

Lesson 15 already introduced Git integration at the item-definition
level. For a Fabric Notebook (Lesson 6), that definition is source
code — the actual `%%pyspark` or `%%sql` cells you wrote — saved as
a plain text file. For an Eventstream or a KQL Queryset, it's a JSON
definition describing every node and query. Either way, the thing
that lands in Git is human-readable and diffable, not some opaque
binary blob.

## Why notebook output makes diffs noisy

```
# Committed:
df.groupBy("VendorId").count().show()

# NOT committed (if configured correctly):
+--------+-----+
|VendorId|count|
+--------+-----+
|       1| 4821|
|       2| 3910|
+--------+-----+
```

A notebook's cell *output* — the table you saw when you ran it —
changes every time the underlying data changes, even when the code
itself didn't. Committing that output alongside the code means every
run generates a diff, even for a change that touched nothing
meaningful. Fabric's Git integration is configured to track the
source code of a notebook, not its last-run output, for exactly this
reason.

## Reviewing a KQL change like code

```diff
- | summarize AvgFare = avg(FareAmount) by bin(EventTime, 5m)
+ | summarize AvgFare = avg(FareAmount) by bin(EventTime, 1m)
```

Because a KQL Queryset's definition is a readable JSON file, a
change to it produces a real diff — someone reviewing a pull request
can see exactly what changed (a 5-minute bucket became 1-minute) and
ask questions before it merges, the same as reviewing a change to any
other piece of code.

## A branch, start to finish

```
1. git checkout -b widen-fare-alert-threshold
2. Edit the Activator rule's threshold in the dev workspace
3. Commit -- the change appears as a readable diff
4. Open a pull request -- a teammate reviews the diff
5. Merge -- Lesson 45's CI/CD pipeline picks it up from there
```

Version control isn't a separate concern from CI/CD (Lesson 45) —
it's the input CI/CD actually reacts to. Every commit on the tracked
branch is a potential trigger; the branch and pull-request workflow
is what puts a human review step in front of that trigger.

## Key terms

| Term | Meaning |
|---|---|
| Item definition | The human-readable file Git actually tracks — code or JSON, never a binary blob |
| Output vs. source | A notebook's last-run results shouldn't be committed alongside its code |
| Pull request | The human review step that sits in front of CI/CD's automated trigger |

## Check yourself

You're ready for Lesson 47 when you can explain, without looking: why
would committing a notebook's cell output alongside its code create
noisy, meaningless diffs?
