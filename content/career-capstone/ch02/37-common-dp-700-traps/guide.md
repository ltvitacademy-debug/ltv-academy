# Lesson 37 — Common DP-700 Traps and Gotchas

**Chapter 2 · DP-700 Certification Prep · Lesson 37 of 81**

## What you'll learn

- Five wrong-answer patterns that repeat across every DP-700 domain, not
  just one
- Why the "too broad a control" pattern from Lessons 35–36 is one instance
  of a bigger habit, not a one-off
- How to read a question stem so the qualifier at the end doesn't blindside
  you
- Honest exam-taking advice — no new Fabric content here, just pattern
  recognition

## This lesson teaches no new technology

Everything in this lesson is about the exam, not about Fabric. If a trap
below references a feature, it's one you already met in Lessons 26–36 or
across the Fabric & Real-Time Analytics and Databricks & Delta Lake
courses. The goal here is to name the patterns so you recognize them
under time pressure, not to introduce anything new.

## Trap 1: similar-sounding item types

Fabric has a lot of nouns that sound alike and do different jobs:
Lakehouse vs. Warehouse, Eventstream vs. Eventhouse, Dataflow Gen2 vs.
Data pipeline, Notebook vs. Spark job definition. A wrong option often
swaps one of these for its lookalike. If a scenario is clearly about a
SQL-first, T-SQL-queryable store, "Lakehouse" is the trap and "Warehouse"
is the answer (or vice versa for a Spark-first, file-based need) —
re-read the noun in every option, not just the concept.

## Trap 2: the exam wants the simple, native answer

When a scenario can be solved with a native Fabric feature, an option
that bolts on an external Azure service is almost always the overcomplicated
wrong answer. DP-700 tests Fabric, not "everything Azure can theoretically
do." If two options solve the same problem and one of them stays inside
Fabric, that's usually the one being tested.

## Trap 3: absolute words are bait

Options containing "always," "never," "must," or "only" are frequently
false, because real systems have exceptions. This isn't a rule you can
apply blindly — sometimes an absolute statement is genuinely true — but
it's a signal to slow down and check whether the option is quietly
overreaching.

## Trap 4: the qualifier at the end changes everything

A stem can describe a normal scenario for three paragraphs and then add
one clause — "...but the team has no budding Spark experience" or
"...and the solution must stay within a single capacity" — that flips
which answer is correct. Read the entire stem before looking at options;
the last sentence is often load-bearing.

## Trap 5: picking a broader control than the scenario needs

This is the pattern from Lessons 35 and 36, generalized: DP-700 rewards
the *narrowest* correct answer. A workspace role instead of an item
permission, a full lakehouse share instead of a OneLake data access role,
a whole new deployment pipeline instead of a targeted alert — all of
these are real features offered as answers that are simply bigger than
the scenario requires.

## Key terms

| Trap | The tell |
|---|---|
| Lookalike item types | The noun changed between the scenario and the option |
| Overcomplication | An external Azure service where a native Fabric feature already works |
| Absolute wording | "Always," "never," "must," "only" |
| Buried qualifier | A clause at the very end of the stem that changes the constraint |
| Over-broad control | A real but bigger-than-needed permission, role, or feature |

## Check yourself

You're ready for Lesson 38 when you can list these five traps from
memory, and explain which one you personally are most likely to fall for
under time pressure.
