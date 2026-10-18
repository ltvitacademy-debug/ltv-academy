# Lesson 9 — Automation Collisions and Recursion

**Chapter 2 · Choosing the Right Tool · Lesson 9 of 18**

## What you'll learn

- What a "collision" between two pieces of automation actually looks like in practice
- How Salesforce prevents infinite loops during a recursive save, and what it deliberately skips when it does
- Common causes of unwanted recursion: workflow field updates, Flow updating the record that triggered it, and Apex triggers re-saving their own records
- Practical patterns for avoiding recursion before it becomes a production incident
- A full worked scenario: two independently-reasonable Flows on Case caught in a live loop, diagnosed and fixed

## What a collision actually is

A **collision** is what happens when two or more pieces of automation on the same object try to act on the same save, and the result depends on an order the admin didn't fully anticipate. Lesson 8's order of execution isn't trivia — it's the tool you use to predict and prevent collisions. A classic example: a validation rule and a Flow both reference the same field, the Flow updates it in a before-save context, and the validation rule evaluates the *updated* value, not the one the user actually typed. If nobody realized the Flow ran first, the validation rule's behavior looks mysterious.

## Recursion: when a save triggers itself

**Recursion** happens when an automation's own action causes the same record (or the same automation) to save again. The classic cause: a workflow rule's field update. From Lesson 8's order of execution, step 12: a workflow field update forces the record to update again, which reruns before/after triggers — which could, in a badly designed trigger, perform another update, which could trigger the workflow rule again, and so on.

Salesforce has a hard safeguard against the worst case: **a workflow field update only re-triggers that one additional save, once.** It will not cascade into an unbounded loop from workflow rules alone. But Apex triggers and Flow don't have that same built-in ceiling — a trigger that updates its own record's field, without a recursion guard, genuinely can run until it hits a governor limit and throws a runtime error.

## What Salesforce documents about recursive saves

Straight from the Apex Developer Guide: **during a recursive save, Salesforce skips steps 9 through 17 of the order of execution** — assignment rules, auto-response rules, workflow rules, escalation rules, Process Builder/flows, and roll-up summary updates on parent and grandparent records. Only the earlier validation and trigger steps repeat. This is a deliberate design to prevent the *other* automations from compounding the problem further on a save that's already recursing.

## Where recursion actually bites teams

- **A workflow field update** that triggers a Flow, which updates a different field, which another workflow rule watches — three pieces of separately-built automation, none of them individually wrong, stacking into unpredictable behavior.
- **A Flow configured to run on record update** that updates the very record that triggered it, without an exit condition, looping until a governor limit stops it with an error the end user sees as a failed save.
- **An Apex trigger without a recursion guard** — the classic fix is a static Boolean or Set of processed record IDs checked at the top of the trigger, so a second pass on the same transaction short-circuits immediately.

## Practical patterns to avoid collisions and recursion

1. **Minimize automation per object.** The more Flows, triggers, and workflow rules stacked on one object, the harder it is to predict their combined order — especially the unordered Process Builder/flow tier from Lesson 8.
2. **Document what each automation touches** — which fields it reads, which it writes. Two automations writing the same field is the single most common collision source.
3. **Use entry/exit conditions in Flow** deliberately, so a Flow doesn't re-fire on a change it just made itself.
4. **Favor record-triggered flows over legacy workflow rules for new builds** — partly because of the ordering guarantees Lesson 8 covered, and partly because Salesforce itself is steering orgs away from Workflow Rules and Process Builder.

## Troubleshooting scenario: a Case flipping between Priority values every few seconds

**Business context.** Two Case flows exist, built separately, months apart, by two different
people — each individually reasonable:

```
Flow A — "SLA Priority Escalation" (record-triggered, after save)
  When: Case.SLA_Breach_Risk__c becomes true
  Does: sets Case.Priority = "High"

Flow B — "Reset Status on Priority Change" (record-triggered, after save)
  When: Case.Priority changes
  Does: sets Case.Status = "New" (so it re-enters the triage queue for review)
```

**Symptoms.** A support rep reports that a specific Case's Priority field is visibly flipping
between "High" and "Medium" every few seconds while they're looking at it, and the Case's Status
keeps resetting to "New" even though they just manually set it to "In Progress" moments ago.

**Available evidence.**

```
Case Edit History for the affected Case, last 2 minutes:
14:03:01  Priority: Medium -> High        (Flow A)
14:03:02  Status: In Progress -> New       (Flow B, triggered by Priority change)
14:03:03  Priority: High -> Medium         (a separate automation not shown here,
                                             reacting to Status = New)
14:03:04  Status: New -> ...               (Flow B fires again, Priority changed again)
14:03:05  Priority: Medium -> High         (repeats)
```

**Diagnostic questions.**

- Flow A and Flow B are each, individually, doing exactly what they were built to do — so where
  does "neither one is wrong" leave the actual bug?
- What does Flow B's trigger condition ("Priority changes") actually mean once Flow A is also in
  the picture — does it fire once, or does it fire every time *anything* changes Priority,
  including another automation?
- Per this lesson's own order-of-execution material, is there a platform-level ceiling that
  should have stopped this — and if so, why didn't it?

**Expected investigation sequence.**

```
# Step 1 -- read the Edit History as a sequence, not as isolated events
# Each row's automation is reacting to the row immediately before it --
# this is the signature of a live automation loop, not four unrelated
# bugs.

# Step 2 -- identify which automation is actually causing which
Flow A changes Priority -> Flow B's trigger condition ("Priority
changes") fires -> Flow B changes Status -> a THIRD existing
automation (a Status-based Priority reset, built even earlier,
for an unrelated reason) changes Priority back -> Flow A's
condition fires again -> loop.

# Step 3 -- check why the platform's recursion safeguards didn't
# stop this
Per this lesson's own material: the automatic one-extra-save ceiling
applies specifically to WORKFLOW RULE field updates. All three
automations here are record-triggered Flows, which have no
equivalent automatic ceiling -- each one is a genuinely new,
separate transaction triggered by the previous one's save, not a
single recursing transaction the platform's safeguard would catch.
```

**Root-cause explanation.** No single Flow is malfunctioning — each one correctly does what it
was built to do, in isolation. The actual defect is systemic: three separately-built automations
each react to a field the others write, with no entry condition on any of them checking whether
the change they're about to make is the same one that's already been made. Flow B's condition
("Priority changes") is satisfied by *any* source of a Priority change — including a different
automation's own write — which is exactly the gap this lesson's "entry/exit conditions" pattern
exists to close.

**The fix.** Add an entry condition to Flow B specifically checking that the new Priority value
is actually different from what it would set Status based on *and* hasn't already been processed
in this way — in practice, this often means adding a condition like "only run if Status is not
already New" so a redundant re-trigger exits immediately instead of repeating the write. The same
discipline applies to the third automation causing the Priority reset: add a condition that
prevents it from reacting to a Priority value it just set itself.

**Prevention.** This is exactly what the "document what each automation touches" practice above
is for — a simple table of which automation reads and writes which fields on Case would have
shown, before any of this shipped, that Priority and Status were each being written by two
different automations that also *read* the other field. That overlap is the actual risk signal,
visible on paper before a single Case ever flips in production.

## Recap

- A collision is unpredictable behavior from two automations acting on the same save without a clearly understood order.
- Workflow field updates can only force one extra re-save — that ceiling is a platform safeguard, not something you configure.
- During a recursive save, Salesforce skips assignment rules, auto-response rules, workflow rules, escalation rules, Process Builder/flows, and roll-up summary updates — documented platform behavior, not a guess.
- Apex triggers and Flow don't have an automatic recursion ceiling the way workflow field updates do; you have to build the guard yourself.

## Try it yourself

Review the discount approval automation you've built across this chapter. List every field each piece (validation rule, approval process, email alert) reads and writes. Would adding a second validation rule or a Flow that also writes to `Discount_Percent__c` create a collision risk? Why or why not?

## Check yourself

A workflow rule updates a Date field, and your org also has a Flow that runs on update of that same object and watches that same Date field. Based on what you now know about re-saves and unordered automation, what's the specific risk here?
