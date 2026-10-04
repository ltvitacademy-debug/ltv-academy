# Lesson 10 — Interpreting Profiling Results

**Chapter 2 · Profiling · Lesson 10 of 30**

## What you'll learn

- Why a profiling number by itself doesn't tell you anything actionable
- Four questions to ask of every profiling finding before acting on it
- How to tell a real data quality problem from a false alarm
- How to hand off a profiling finding so it actually gets acted on

## A number is not a conclusion

Over Lessons 7 through 9, you ran queries that produced real numbers:
a NULL rate, an orphan count, a pattern-mismatch percentage. None of
those numbers, by themselves, tell you whether there's actually a
problem. "188 rows don't match the expected email pattern" is a fact.
"That's a problem we need to fix" is an *interpretation* — and jumping
straight from the fact to the interpretation is where profiling work
goes wrong. This lesson is about making that jump correctly, closing
out Chapter 2 before Chapter 3 moves into the dimensions themselves and
Chapter 4 turns interpretation into formal rules.

## Four questions for every finding

Before treating any profiling result as an actionable problem, run it
through four questions:

1. **Is this actually abnormal, or did I just notice it?** A 2% NULL
   rate on an optional field might be completely normal; the same 2%
   on a required field is a real problem. Context from the data owner
   (Lesson 4) determines which.
2. **What's the scale?** 188 mismatched rows out of 10,000 (1.9%) reads
   very differently from 188 out of 200 (94%). The same raw count can
   mean "edge case" or "the column is fundamentally broken" depending
   entirely on the denominator.
3. **Is this new, or has it always been this way?** A NULL rate that's
   been steady at 3% for a year is a different conversation than one
   that jumped from 0.5% to 3% last week. Lesson 26's monitoring is
   what makes this question answerable — profiling a table once can't
   tell you whether something changed.
4. **Who actually needs to know, and what decision does it change?**
   If a finding doesn't change any decision anyone would make, it's
   not worth escalating yet — a finding is only "actionable" if some
   specific person can specifically act on it (Lesson 4's roles).

## Real problem vs. false alarm — a worked example

Suppose Lesson 9's pattern-profiling query found 188 `EmailAddress`
values that didn't match the simple `LIKE '%_@_%._%'` pattern. Before
reporting "188 bad emails," dig one level deeper:

- Pull a sample of the actual 188 values.
- If most of them are genuinely malformed (`not-an-email`, blank
  strings, obvious typos), that's a real finding.
- If many of them are legitimate but unusual formats the simple
  pattern wasn't built to handle (a `+` in a Gmail address, a
  less-common top-level domain), that's a profiling pattern that needs
  refining, not 188 rows of bad data.

Skipping this check is how teams end up "fixing" perfectly good data
or, worse, training a quality rule (Chapter 4) on a flawed assumption
about what "valid" looks like.

## From finding to handoff

A profiling finding is only useful once it reaches the right person in
a form they can act on. A good handoff states, in plain language: what
was checked, what was found (with the percentage, not just the raw
count), how it compares to any known baseline, and what decision is
being asked of the recipient. "The `Customer` table has 94 orphaned
orders (0.9% of all orders) referencing a `CustomerID` that no longer
exists — do we need to restore these customer records, or should these
orders be excluded from revenue reporting?" gives the data owner
something concrete to decide, instead of a raw query result they'd have
to interpret themselves.

## Closing Chapter 2

Profiling (this chapter) tells you what's actually in the data. The
four questions in this lesson are the bridge between that discovery and
everything the rest of this course builds: Chapter 3 names the six
dimensions a finding might violate in more depth, and Chapter 4 turns a
validated, well-scoped finding into a formal, repeatable rule that
catches the same problem automatically going forward.

## Key terms

| Term | Meaning |
|---|---|
| False alarm | A profiling finding that looks like a problem but reflects a flawed check, not bad data |
| Baseline | A known, prior measurement used to judge whether a new finding represents a change |
| Actionable finding | A result specific enough that a named person can make a decision from it |

## Lab

1. Take one profiling result from Lesson 7, 8, or 9's lab exercises (or
   re-run one of those queries now).
2. Walk it through all four questions in this lesson, in writing.
3. Draft a one-paragraph handoff of that finding to a hypothetical data
   owner, following the "what was checked / what was found / baseline /
   decision needed" structure from this lesson.

## Check yourself

Can you explain, using your own example, the difference between a raw
profiling count and an actionable finding? If yes, you've completed
Chapter 2 — Chapter 3 starts with Accuracy, the first of the six
dimensions covered in depth.
