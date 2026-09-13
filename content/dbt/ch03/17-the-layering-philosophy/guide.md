# Lesson 17 — The Layering Philosophy: Why Three Layers

**Chapter 3 · Staging, Intermediate & Marts · Lesson 17 of 45**

## What you'll learn

- The actual tradeoff three layers is making, stated plainly
- Why "just write one big model" fails as a project grows
- Why "add a fifth layer for extra safety" also fails, in the opposite
  direction
- How to recognize, in a real project, when a layer is missing or when
  there's one too many

## The tradeoff, stated plainly

Every layer this chapter added — staging, intermediate, marts — is
overhead. Each one is a file that has to be written, reviewed, tested,
and understood by the next engineer. Three layers is not free. The bet
dbt Labs is making, and this chapter has been teaching, is that this
overhead pays for itself once a project has enough real complexity to
need dividing up at all — and that for a project below that size, one
or two layers is genuinely the right call, not a shortcut.

## Why "one big model" fails

Picture the marts-layer `orders.sql` from Lesson 15, but with all of
`stg_orders`'s renaming, all of the order-items aggregation, and every
join folded directly into it — no staging, no intermediate step, just
one file that does everything. It would run. It would even be correct,
the first time. Then a source system renames a column, and the fix has
to happen inside a giant file where renaming logic, joins, and business
aggregation are all tangled together — so the person making the change
has to understand and re-verify all of it, not just the renaming.
That's the real cost one big model imposes: every change requires
understanding everything, because nothing was ever separated.

## Why "five layers" fails too — in the other direction

The opposite mistake is adding layers because *more structure* sounds
safer. A project with five layers for a business that only has twelve
models doesn't get five times the clarity — it gets five times the
files to open before understanding what one number in a dashboard
actually means. Recall Lesson 14's own design principle: **narrow the
DAG, widen the tables.** Extra layers that don't each do one of the
three genuine jobs (structural simplification, re-graining, isolating
complex logic) just add hops between a question and its answer,
without adding clarity at any one of them.

## The actual test for whether a layer belongs

Three layers is the right *default*, but the chapter has been teaching
a test, not a fixed number:

- Staging exists because raw sources need exactly one place to become
  trustworthy — that job doesn't disappear at any project size.
- Intermediate exists **only when marts would otherwise need it** —
  a small project with simple joins may skip it entirely and go
  straight from staging to marts, and that's correct, not incomplete.
- Marts exists because someone, eventually, has to query something —
  that job doesn't disappear either.

The honest question for any layer in a real project is the same one
from Lesson 14: is this model doing one clear job that the layer above
or below it can't do as well? If yes, keep it. If a model exists only
because "that's where models go," it's the wrong kind of layer.

## Key terms

| Term | Meaning |
|---|---|
| Layering overhead | The real cost (files to write, review, and understand) that every layer imposes, regardless of project size |
| One-big-model failure | Every change requires understanding the entire tangled file, because nothing was ever separated |
| Over-layering | Adding structure that doesn't reduce clarity, just adds hops between a question and its answer |
| The layer test | Does this model do one clear job the layer above or below it can't do as well? |

## Lab

1. Look back at the models you built across Lessons 13–15. For each
   one, answer the layer test in one sentence: what job does it do
   that the layer above or below it couldn't do as well?
2. If any answer is weak or circular ("it's here because it's a
   model"), that's a candidate to merge into a neighboring layer.
3. Write one paragraph, in your own words, defending three layers as
   this chapter's default — and one sentence naming a project size or
   shape where you'd deviate from it.

## Check yourself

You're ready for Chapter 4 when you can defend, out loud and without
notes, why three layers is dbt Labs' recommended default — and
recognize, in a real project, when a layer should be added or removed
because it fails the layer test.
