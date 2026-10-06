# Lesson 15 — Testing Business Processes

**Chapter 3 · Applied Automation · Lesson 15 of 18**

## What you'll learn

- Why "it worked when I tried it once" isn't the same as tested
- A four-category test matrix you can apply to any approval process or flow
- How to test in a sandbox without touching production data
- What a passing test actually needs to prove, beyond "it ran without an error"

## Why one successful run isn't enough

It's tempting to build an approval process, submit one quote with a 15% discount, watch it land in the manager's approval queue, and call it done. That proves the happy path works. It proves nothing about what happens at exactly 10%, what happens with a 0% discount, what happens when a hundred quotes are updated in bulk at once, or what happens if the approver has since been deactivated. Each of those is a real way the Lesson 11 design could fail in production without ever showing up in a single manual test.

## A four-category test matrix

Any approval process or flow should be tested across four categories before it's considered done:

1. **Happy path** — the obvious case the automation was built for (a 15% discount, routed to the manager).
2. **Boundary values** — exactly at the edge of a condition (a discount of exactly 10%, exactly 25%, exactly 0%). Boundaries are where `>` vs. `>=` mistakes hide.
3. **Bulk** — many records changing at once (a data import updating 200 quotes in one transaction), which is how recursion and governor-limit problems actually surface.
4. **Negative / edge** — the case the automation was never meant to touch (a quote with no discount field populated at all, or an approver whose role was just reassigned).

## Applying it to Harborline's quote approval

```
Happy path: 15% discount -> routes to manager -> approved
Boundary:   exactly 10% -> should NOT enter approval
            exactly 10.01% -> SHOULD enter approval
Bulk:       50 quotes updated via data import at once
Negative:   Discount_Percent__c left blank on submit
```

The boundary case is the one most first drafts get wrong — writing `>= 10` instead of `> 10` means a quote sitting at exactly 10% silently enters a process it was never supposed to touch, and nobody notices until someone asks why a borderline quote needed manager sign-off.

## Testing without touching production

Every test in that matrix belongs in a sandbox or Developer Edition org, never production — the whole purpose of testing is deliberately trying to break something, and production data is the one place that's not safe to do it. Salesforce's debug logs show exactly which criteria evaluated true or false for a given test record, which is how you confirm a boundary case did what it was supposed to, not just that nothing visibly broke.

## What "passing" actually means

A passing test proves the automation did the *right* thing, not just *a* thing. A quote that enters approval when it shouldn't is a failure even if no error appears anywhere — the process "worked," it just worked on the wrong record. That distinction is why the test matrix checks behavior at every category, not just whether the automation runs without throwing an exception.

## Key terms

| Term | Meaning |
|---|---|
| Boundary value | A test case sitting exactly at the edge of a condition, where off-by-one mistakes hide |
| Bulk test | Verifying automation behaves correctly when many records change in one transaction |
| Negative test | Confirming automation correctly does NOT fire on a record it shouldn't touch |

## Check yourself

You're ready for Lesson 16 when you can write all four test-matrix categories, from memory, for the Mill Creek time-off approval you designed in Lesson 14.
