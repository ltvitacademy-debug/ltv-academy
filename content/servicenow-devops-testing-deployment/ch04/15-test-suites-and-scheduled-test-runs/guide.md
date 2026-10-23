# Lesson 15 — Test Suites & Scheduled Test Runs

**Chapter 4 · Automated Test Framework (ATF) · Lesson 15 of 26**

## What you'll learn

- What a Test Suite actually is, and why grouping Tests matters
- The real value of running a coherent group of related Tests together
- What Scheduled Test Execution is, and how it ties back to Scheduled Jobs from Course 3
- Why automatic, recurring test runs close the exact gap Lesson 12 opened this chapter with
- How a failing Suite run surfaces a regression before anyone notices manually

## From one Test to a coordinated group

Lessons 13 and 14 each built one Test — one UI Test, one server-side Test. In any real
application, that's never the whole picture. A single feature typically needs several Tests
covering different scenarios: the happy path, a rejected approval, an edge case where a field is
empty, a role that shouldn't be allowed to do something. Running each of those Tests one at a
time, individually, every time a change needs re-validating, doesn't scale past a handful of
Tests. A **Test Suite** is ATF's answer: a real grouping of multiple individual Tests that run
together as one coordinated set, with one combined pass/fail result for the whole group.

## Why grouping is the real value, not just convenience

The obvious benefit of a Test Suite is not having to click "Run Test" five separate times — but
the deeper value is coherence. A Test Suite built around "all Incident Management regression
tests" runs every Test relevant to that one area together, as a single unit, and reports a single
result for that unit. That matters because a change rarely affects just one Test's narrow
scenario — a Business Rule change on the Incident table could plausibly affect several related
workflows at once. Running the related group together, rather than remembering to individually
re-run five separate Tests scattered across the instance, is what actually makes regression
testing practical at the scale a real application reaches.

## Scheduled Test Execution

A Test Suite still has to be *run* by something, and running it only when a human remembers to
click a button leaves the exact gap Lesson 12 described wide open — nobody tests on the days
nobody happens to think of it. **Scheduled Test Execution** closes that gap: a Test Suite can be
configured to run automatically on a defined schedule, the same underlying idea Course 3 covered
as Scheduled Jobs — a server-side task that fires on its own schedule with no user present to
trigger it. A Test Suite scheduled to run nightly, for instance, runs every single night whether
or not anyone on the team is thinking about testing that day.

## Why this is the chapter's real payoff

Lesson 12 opened this chapter with the real problem ATF solves: low-code customization can break
something unrelated, silently, with no error to flag it — and that breakage is usually discovered
late, from a support ticket, rather than caught early. A Test Suite running on a schedule is the
mechanism that actually closes that gap in practice. If a Business Rule change introduced last
week quietly broke a different workflow, a nightly scheduled Suite run catches it the very next
night — as a failed Test result someone can investigate immediately — rather than weeks later,
after a real user has already hit the broken behavior in production. The earlier this chapter's
individual Tests get grouped and scheduled, the sooner a regression surfaces relative to when it
was actually introduced, which is the whole point of automating this instead of relying on memory.

## Key terms

| Term | Meaning |
|---|---|
| Test Suite | A grouping of multiple individual Tests that run together as one coordinated set |
| Combined result | The single pass/fail outcome reported for an entire Test Suite run |
| Scheduled Test Execution | Automated running of a Test Suite on a defined, recurring schedule |
| Scheduled Job | Course 3's term for a server-side task that fires on a schedule with no user present |

## Check yourself

Without looking back: why does scheduling a Test Suite to run nightly close the exact "silent
regression" gap that Lesson 12 opened this chapter with, more completely than simply having the
Tests exist but only running them manually?
