# Lesson 28 — When to Roll Back vs. When to Fix Forward

**Chapter 7 · Troubleshooting Common Deployment Issues · Lesson 28 of 32**

## What you'll learn

- The real engineering judgment call once a root cause is found: roll back the change, or fix
  forward past it
- Why rolling back is fast and safe but doesn't actually fix the underlying issue
- Why fixing forward addresses the root cause but takes longer and carries more risk in the middle
  of a live incident
- The real factors that tip the decision one way or the other, so it isn't a coin flip

## Finding the cause isn't the end of the incident

Lessons 25-27 built a real method for finding *why* something broke — which of the five places,
which specific question in the connectivity sequence, which exact missing role. But finding the
cause is only half the job during a live incident. The other half is a decision that has nothing to
do with diagnosis: given what you now know, do you roll back the change that caused this, or do you
fix the actual problem in place while the system stays as it is? Those are genuinely different
responses, and picking the wrong one under pressure costs real time and real risk.

## Rolling back: fast, safe, doesn't fix the root cause

**Rolling back** means reverting to the last known-good state — redeploying the previous version,
reverting the Terraform plan, restoring the previous NSG rule set. Its biggest advantage is speed:
a rollback is usually a single command or pipeline re-run, and it returns the system to a state
you've already verified works. Its real limitation is exactly that: it returns you to *before*, not
*fixed*. The underlying issue — the stale rule, the missing permission, the quota you're about to
hit again — is still there, waiting to resurface the next time someone makes a similar change. A
rollback buys time; it doesn't close the ticket on the actual root cause.

## Fixing forward: addresses the cause, costs more time and risk

**Fixing forward** means leaving the current (broken) state in place and applying the specific fix
directly — adding the missing NSG rule, assigning the missing role, correcting the stale IP range.
Done right, this actually resolves the root cause the first time, with nothing left to resurface
later. The cost is real, though: it takes longer than a rollback (you have to diagnose fully, build
the fix, and apply it correctly), and applying any change mid-incident carries its own risk of
introducing a second problem on top of the first, especially if the fix is being written and tested
under pressure.

## The factors that actually tip the decision

```text
Lean toward ROLLBACK when:
  - The fix isn't fully understood yet, or hasn't been tested
  - A large portion of the system is currently down or degraded
  - This is production, and the business impact is accumulating by the minute
  - The previous state is well-known and easy to restore

Lean toward FIX FORWARD when:
  - The root cause and the exact fix are both clearly identified and small
  - The blast radius is limited (one rule, one role, one resource)
  - Rolling back would lose other, unrelated work already shipped in the same change
  - This is a lower-stakes environment (staging/dev) where mid-fix risk is cheap
```

Lesson 32's NSG incident is a good real example of the second case: the fix (updating one source
IP range on one existing rule) was small, well-understood, and low-risk, so fixing forward made
more sense than rolling back an entire deployment over a one-line rule correction. A production
outage from an unfamiliar change with an unclear fix is the opposite case — roll back first,
diagnose fully, and apply the real fix later without the clock running.

## Neither choice is automatically "the professional one"

A common mistake is treating "always fix forward, never roll back" as the mature engineering
stance. It isn't. Rolling back under real production pressure, restoring service, and then taking
the time to diagnose and fix forward properly afterward is very often the correct, professional
call — speed of recovery matters more than looking like you solved it live. The judgment is in
reading the specific situation's stakes and certainty, not in picking one approach as always
correct.

## Key terms

| Term | Meaning |
|---|---|
| Rollback | Reverting to the last known-good state; fast and safe, but doesn't fix the root cause |
| Fix forward | Applying the actual fix to the current state in place; resolves the cause but costs time and risk |
| Blast radius | How much of the system is affected by a change or an incident |
| Known-good state | A previously verified configuration or deployment that's safe to revert to |

## Check yourself

A production incident is caused by a change nobody fully understands yet, and half the environment
is currently degraded. Using this lesson's factors, explain which choice — roll back or fix forward
— fits that situation, and why.
