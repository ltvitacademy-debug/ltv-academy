# Lesson 18 — Testing Standards for a Team

**Chapter 3 · Test Strategy · Lesson 18 of 18**

## What you'll learn

- Why individual testing discipline breaks down without a shared, written team standard
- What belongs in a test-focused section of a code review checklist
- How CI pipelines enforce coverage and pass/fail automatically on every change
- How to handle a flaky test instead of just re-running it until it passes

## Individual discipline doesn't scale

Everything in this course so far — factories, assertions, bulk tests, mocks — works as individual practice. On a team of more than one or two developers, individual practice alone drifts: one developer's test classes follow every convention in this course, another's pass the 75% gate with assertion-free tests from Lesson 14's warning list, and six months later nobody can tell which parts of the test suite can actually be trusted. A written, agreed team standard — even a short one — is what keeps that drift from happening, by giving code review something concrete to check against instead of relying on everyone independently remembering the same judgment calls.

## What belongs in a test-focused review checklist

A practical checklist a reviewer can run through on any pull request touching Apex, directly reusing this course's chapters:

- Does every new or changed public method have both a positive and a negative test (Lesson 7)?
- Does every assertion check a specific expected value, with a message, rather than only "it didn't throw" (Lesson 4)?
- Does any trigger-adjacent change include a bulk test at a realistic record count (Lesson 8)?
- Are any callouts in the changed code mocked in tests, never real (Lesson 10)?
- Are there any hardcoded Ids, or unnecessary `SeeAllData=true` (Lesson 14)?
- Does the PR's own description state the before/after org-wide coverage number, not just "tests pass" (Lesson 5, Lesson 16)?

Putting this list somewhere every reviewer actually sees — a pull request template, a pinned team wiki page — matters more than how sophisticated the list is. A five-item checklist everyone actually reads beats a fifty-item one nobody opens.

## CI enforcement, not just human review

Human code review catches things a checklist alone misses, but it shouldn't be the only thing standing between a change and production. A CI pipeline that runs `sf apex run test` (or the equivalent in whatever CI tool your team uses) on every pull request, and fails the build if any test fails or org-wide coverage drops below the team's chosen threshold, makes the standard enforceable rather than just suggested. This doesn't replace human review of *what* the tests actually check — a CI pipeline can't tell the difference between a meaningful assertion and `System.assert(true)` — but it guarantees the mechanical parts (did every test pass, is coverage above the floor) never slip through because a reviewer was in a hurry.

## Handling a flaky test

A **flaky test** is one that sometimes passes and sometimes fails against unchanged code — a real and recurring problem, not a hypothetical one, often caused by order-dependence between test methods (Lesson 2), test data colliding with another test's data in a shared sandbox, or a genuine timing assumption that doesn't always hold. The wrong response is re-running it until it happens to pass and moving on — that just defers the same failure to whoever hits it next, with less context on why. The right response: treat a flaky test exactly like a bug report. Reproduce it deliberately if you can, check for test independence violations first (the single most common cause), and if it can't be fixed immediately, mark it clearly (a comment, a tracked ticket) rather than silently tolerating an unreliable signal — a test suite nobody trusts stops being useful even if every test is technically still running.

## Key terms

| Term | Meaning |
|---|---|
| Testing standard | A written, team-agreed set of expectations for what a test class must do before it's considered acceptable |
| Code review checklist | A concrete, specific list reviewers check a pull request's tests against, rather than relying on individual judgment alone |
| CI enforcement | Automated pipeline checks (test pass/fail, coverage threshold) run on every change, independent of human review |
| Flaky test | A test that inconsistently passes or fails against unchanged code, usually from order-dependence or a timing assumption |

## Lab

Write a one-page testing standard for a hypothetical small Salesforce team, covering: the review checklist items above (or your own version of them), the minimum coverage threshold your team would enforce in CI (above the platform's 75% floor, and why), and a short written policy for what happens when someone discovers a flaky test. Keep it short enough that a new team member could read the whole thing in under two minutes.

## Check yourself

Can you explain why individual developer discipline, without a written and reviewed standard, tends to drift on a team over time? Can you describe the correct response to discovering a flaky test, and why simply re-running it until it passes is the wrong one?
