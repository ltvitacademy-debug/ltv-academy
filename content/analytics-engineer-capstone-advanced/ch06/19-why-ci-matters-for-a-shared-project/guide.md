# Lesson 19 — Why CI Matters for a Shared dbt Project

**Chapter 6 · CI/CD for the dbt Project · Lesson 19 of 26**

## What you'll learn

- The real risk this chapter's CI/CD pipeline protects against: a
  broken model or test merging unnoticed
- Why "it works on my laptop" isn't good enough once more than one
  person touches a dbt project
- How CI connects Chapter 4's tests to a real-world consequence,
  instead of leaving them as something only a careful developer runs
- What specifically changes once this platform has more than one
  contributor

## The real risk, named plainly

Before CI exists, "does this change break anything" depends entirely
on one thing: whether the developer who made the change remembered to
run `dbt build` locally before opening a pull request. On a solo
project, that's a real but survivable risk. On a shared project —
Jaffle Shop's platform, with more than one person contributing models
over time — it's a recurring one: eventually, someone merges a change
that breaks `customers.lifetime_value`, or fails `non_negative` on
`orders.amount`, and nobody notices until a business user sees a wrong
number on a Power BI report.

## Why "ran clean on my laptop" isn't the same as "safe to merge"

A developer's local `dbt build` running clean only proves one thing:
it worked against *their* local state, at that moment, with whatever
they happened to have already built in `dev`. It says nothing about:

- Whether their change breaks a test on a model they didn't touch
  directly, but that depends on what they changed
- Whether the exact same build succeeds from a completely clean state
  (CI always builds from scratch — nothing cached from a previous
  developer's run)
- Whether a reviewer can trust the pull request without re-running
  everything themselves

## Connecting Chapter 4's tests to a real consequence

Chapter 4 built `non_negative`, `unique`, `not_null`, and `dbt build`
as the mechanism that stops bad data from building on top of itself —
but on a developer's own laptop, that mechanism only runs if the
developer runs it. CI is what turns "a test exists" into "a test
cannot be skipped": every pull request gets `dbt build` run against it
automatically, whether the developer remembers to or not.

## What changes with more than one contributor

| Solo project | Shared project |
|---|---|
| One person's mental model covers everything | No single person has the full picture of every model |
| A mistake is caught by the same person who made it, eventually | A mistake made by one person is caught (or missed) by someone else, or no one |
| Running tests locally is a habit | Running tests has to be structural, not a habit |

This is the real justification for the next two lessons: Lesson 20
builds the actual workflow file, and Lesson 21 makes passing it a hard
requirement, not a suggestion.

## Key terms

| Term | Meaning |
|---|---|
| Unnoticed merge | A broken change that reaches `main` because no automated check caught it before a human did |
| Clean-state build | CI always builds from a fresh runner, unlike a developer's laptop with leftover local state |
| Structural check | A check that runs automatically regardless of whether a human remembers to run it |

## Lab

1. Describe, in your own words, the specific failure scenario this
   lesson names: a change that breaks `non_negative` on
   `orders.amount` reaching a Power BI report.
2. List two things a developer's clean local `dbt build` does *not*
   prove, from this lesson's list.
3. Explain, in one sentence, why "a test exists" and "a test cannot be
   skipped" are different guarantees.

## Check yourself

You're ready for Lesson 20 when you can explain the real risk CI
protects against in your own words, without using the word "bugs" as
a stand-in for a specific failure scenario.
