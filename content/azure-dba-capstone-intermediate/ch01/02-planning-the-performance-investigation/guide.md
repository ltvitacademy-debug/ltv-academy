# Lesson 2 — Planning the Performance Investigation

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 2 of 16**

## What you'll learn

- A repeatable, plain-English investigation plan for "the database is slow"
- The two triage questions to ask before opening a single tool
- Why you check what's actually running before you ever touch a query or an index
- How this chapter's five-step plan maps onto the rest of the lessons ahead

## Don't start with a query — start with a plan

It would be tempting to open SSMS right now and start hunting. That's
exactly the mistake a real DBA avoids: jumping straight to `CREATE
INDEX` or rewriting a query before scoping the problem wastes real
time fixing something that may not even be the actual bottleneck.
Before touching a single DMV, write down the plan.

## Two triage questions first

- **Is this one query, or the whole system?** A single screen being
  slow for one user points toward a specific query or plan. Both
  departments reporting slowness at the same time of day, against
  the same database, points toward something shared — resource
  pressure, blocking, or more than one real cause hiding inside one
  vague symptom.
- **Is this new, or has it always been this way?** Neither department
  said "this just started" — both described an ongoing pattern,
  every morning. That rules out a single overnight regression as the
  *whole* explanation and makes "more than one real cause" more
  likely, not less.

## The five-step plan for this chapter

```
1. Identify active sessions  -- what's actually running right now,
                                 during the reported slow window?
2. Find the slow queries     -- which specific queries are consuming
                                 the most time and resources?
3. Read the plan             -- for the worst offender, what is the
                                 execution plan actually doing?
4. Diagnose                  -- missing index? blocking? both?
5. Fix, then re-test         -- apply the fix, re-run, confirm with
                                 a new plan that it actually worked
```

Each step produces evidence the next step depends on. Skipping ahead
— guessing at a fix before Step 1 — is the single most common way
real troubleshooting time gets wasted.

## Why this plan, and not something simpler

A simpler plan — "just add an index everywhere it might help" — looks
faster but isn't, for two reasons specific to this case. First,
indexes aren't free: every one of them slows down every `INSERT`,
`UPDATE`, and `DELETE`, so adding one without evidence can make
writes slower while barely helping the actual bottleneck. Second,
this chapter's investigation turns up **more than one** real cause —
a missing index is one of them, but it is not the only one. A plan
that stops at "found an index problem, done" would miss the second
cause entirely and leave Scheduling's complaint unexplained.

## What to have ready before Lesson 3

Lesson 3 starts Step 1 for real: querying `sys.dm_exec_sessions` and
`sys.dm_exec_requests` to see exactly what's running during the
reported mid-morning window. Have SSMS (or Azure Data Studio)
connected to `OverlookClinicalDB` and ready to run a query — the next
five lessons build directly on each other's results.

## Key terms

| Term | Meaning |
|---|---|
| Scope | Whether a problem affects one query or the whole system — the first triage question |
| Regression vs. ongoing pattern | A sudden recent change vs. a problem that's always been there |
| Five-step investigation plan | Sessions → slow queries → plan → diagnose → fix and re-test |

## Check yourself

You're ready for Lesson 3 when you can list the five steps of this
chapter's investigation plan from memory, and explain why skipping
straight to "add an index" without Steps 1-3 first is a real mistake,
not just an unnecessary formality.
