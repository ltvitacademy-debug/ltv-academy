# Lesson 66 — Rollback Strategies

**Chapter 3 · Production Data Engineering · Lesson 66 of 70**

## What you'll learn

- Two genuinely different things called "rollback" — code and data
- Why a code rollback is easy and a data rollback almost never is
- Side effects that a rollback can't undo, even in principle
- Deciding between rollback and a forward fix

## Two different rollbacks, one word

```
Code rollback:   revert the Git commit (Lesson 46), redeploy the
                 previous version through CI/CD (Lesson 45) --
                 mechanically simple, usually fast
Data rollback:   undo the actual effect of bad data already
                 written, already displayed, already alerted on --
                 mechanically much harder, sometimes impossible
```

A **code rollback** is straightforward because Lesson 45–46 already
built the machinery for it: revert, redeploy, done. A **data
rollback** is a genuinely different problem — the bad code has
already run, already written rows, already shown numbers to real
people. Reverting the code stops the bleeding going forward; it
does nothing about what already happened.

## What a code rollback can actually undo

```
Time travel (Databricks & Delta Lake Lesson 21):
  restore a Delta table to a version before the bad write happened --
  works if the bad write is recent and identifiable
KQL Database:
  no built-in "undo" -- a targeted delete-and-reingest is often
  the only real option, and it's slower and riskier than time travel
```

Delta's time travel (already covered in Lesson 59's disaster
recovery context) is the closest thing to an actual data rollback,
and even that only works within its retention window and only for
tables it applies to. A KQL Database has no equivalent built-in
mechanism at all — undoing bad streamed data there usually means
manually identifying and correcting the affected rows.

## Side effects a rollback can't undo, even in principle

```
Already happened, un-undoable:
- An Activator alert (Lesson 37) that already notified a real person
- A dashboard tile a dispatcher already looked at and acted on
- A downstream report that already used the bad numbers
```

Rolling back the code and even the data doesn't un-send a Teams
message that already reached someone, or un-make a decision a
dispatcher already made based on a wrong number. This is exactly
why mitigation (Lesson 57) matters as its own step — some damage
is only preventable by stopping it before it happens, not fixable
afterward by any rollback.

## Rollback vs. a forward fix

Sometimes reverting isn't actually the fastest path back to
correct — if the previous version had its own known issues, or if
the bug is small and well-understood, shipping a targeted forward
fix through CI/CD can resolve things faster than a full rollback and
re-deployment. The choice depends on which path gets to a correct
state sooner, not on rollback being automatically the "safe" default.

## Key terms

| Term | Meaning |
|---|---|
| Code rollback | Reverting and redeploying — mechanically simple |
| Data rollback | Undoing already-written data's effects — much harder, sometimes impossible |
| Un-undoable side effect | An alert or decision already made, which no rollback reaches |

## Check yourself

You're ready for Lesson 67 when you can explain, without looking: why
can't rolling back the code undo an Activator alert that already
reached a real person?
