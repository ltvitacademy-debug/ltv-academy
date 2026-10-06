# Lesson 9 — Automation Collisions and Recursion

**Chapter 2 · Choosing the Right Tool · Lesson 9 of 18**

## What you'll learn

- What a "collision" between two pieces of automation actually looks like in practice
- How Salesforce prevents infinite loops during a recursive save, and what it deliberately skips when it does
- Common causes of unwanted recursion: workflow field updates, Flow updating the record that triggered it, and Apex triggers re-saving their own records
- Practical patterns for avoiding recursion before it becomes a production incident

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

## Recap

- A collision is unpredictable behavior from two automations acting on the same save without a clearly understood order.
- Workflow field updates can only force one extra re-save — that ceiling is a platform safeguard, not something you configure.
- During a recursive save, Salesforce skips assignment rules, auto-response rules, workflow rules, escalation rules, Process Builder/flows, and roll-up summary updates — documented platform behavior, not a guess.
- Apex triggers and Flow don't have an automatic recursion ceiling the way workflow field updates do; you have to build the guard yourself.

## Try it yourself

Review the discount approval automation you've built across this chapter. List every field each piece (validation rule, approval process, email alert) reads and writes. Would adding a second validation rule or a Flow that also writes to `Discount_Percent__c` create a collision risk? Why or why not?

## Check yourself

A workflow rule updates a Date field, and your org also has a Flow that runs on update of that same object and watches that same Date field. Based on what you now know about re-saves and unordered automation, what's the specific risk here?
