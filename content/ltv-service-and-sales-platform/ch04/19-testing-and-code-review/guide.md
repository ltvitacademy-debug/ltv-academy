# Lesson 19 — Testing and Code Review

**Chapter 4 · Analytics and Delivery · Lesson 19 of 25**

## What you'll learn

- The difference between passing tests and a genuinely reviewed, trustworthy codebase
- Static analysis with PMD's Apex ruleset, and what it catches that tests don't
- Priya's code review checklist for this platform, applied to a real pull request
- How to read and act on a code review comment, not just resolve the thread

## Passing tests aren't the same as reviewed code

Lesson 10 built real, bulk-safe tests for `WarrantyClaimTriggerHandler`, and Lesson 18's CI pipeline runs them automatically. That's necessary, but it answers a narrower question than it sounds like — "does this code do what the tests say it should" — not "is this code written well, safely, and maintainably." A test suite can pass at 100% while the code underneath still has a SOQL query inside a loop that happens not to trigger the governor limit with today's test data, a hardcoded Id that will break the moment this deploys to a different org, or a missing null check that a human reviewer would catch in thirty seconds. Code review exists to catch exactly that gap.

## Static analysis: PMD for Apex

Before a human ever looks at a pull request, **static analysis** tools scan the code itself, without running it, for known risky patterns. **PMD** is a widely used static analysis tool with a dedicated Apex ruleset covering things like: a SOQL or DML statement inside a `for` loop, a class or method missing a sharing declaration, an empty `catch` block that silently swallows an exception, and overly complex methods (high cyclomatic complexity) that are hard to test and review. Running PMD as a CI step — alongside the test run from Lesson 18 — catches these mechanically, before a reviewer's time gets spent on something a tool could have flagged in seconds.

## Priya's code review checklist for this platform

Every pull request against this capstone's repository gets checked against the same list, regardless of which lesson's feature it implements:

| Check | What it catches |
|---|---|
| Is there a handler class, with the trigger body itself doing nothing but routing? | Logic buried in a trigger (Lesson 9's pattern) |
| Does every new class/trigger have a corresponding test class with a bulk test? | Missing or thin coverage (Lesson 10) |
| Is `with sharing` used unless there's a documented reason for `without sharing`? | Accidental data exposure bypassing Lesson 4's security model |
| Are SOQL/DML statements outside of loops? | Governor limit risk at scale (Lesson 7) |
| Are callouts wrapped in try/catch with a specific exception type, not a bare `catch (Exception e)`? | Swallowed or mishandled integration failures (Lesson 15) |
| Does a new custom field, object, or Flow have a plain-language reason recorded for why it exists? | Unexplained schema drift over time |

## Reading and acting on a review comment

A code review comment that just says "fix this" isn't useful to either side; a real review comment names the specific risk and, ideally, the fix. For example, on a pull request adding a new Apex method that queries `Service_Contract__c` inside a loop over Cases, Priya's actual review comment would read something like: *"This SOQL query runs once per Case in the loop — on a bulk update of 200 Cases, that's 200 queries against the 100-query synchronous limit from Lesson 7. Collect the Asset Ids into a Set first and query once outside the loop."* The correct response to a comment like that is not just adding a comment back saying "done" — it's making the change, then replying to confirm what specifically changed, so the next reviewer (or your future self) has the context without re-deriving it.

## Key terms

| Term | Meaning |
|---|---|
| Static analysis | Scanning code for risky patterns without running it |
| PMD | A widely used static analysis tool with a dedicated Apex ruleset |
| Cyclomatic complexity | A measure of how many independent paths through a method exist; high values make code harder to test and review |
| Code review checklist | A fixed, repeatable list of concerns every pull request is checked against |

## Lab

Take the `WarrantyClaimSubmissionQueueable` class from Lesson 11 (or your own version) and review it yourself against Priya's six-item checklist above. For each item, write one sentence confirming it passes or identifying the specific fix needed — this is the same exercise a reviewer does on every real pull request.

## Check yourself

- Why can a test suite pass at 100% while the underlying code still has real problems?
- Name two things PMD's Apex ruleset catches that this lesson describes.
- What makes a code review comment useful versus merely a rubber stamp or a vague complaint?
