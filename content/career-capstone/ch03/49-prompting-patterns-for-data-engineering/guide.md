# Lesson 49 — Prompting Patterns for Data Engineering Tasks

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 49 of 81**

## What you'll learn

- Four concrete prompting patterns that come up again and again in this job
- Why "give context" isn't vague advice — it means specific things for data work
- Why asking for the reasoning, not just the answer, makes review possible
- How iterative refinement turns a mediocre first draft into a usable one
- How these patterns connect back to Lessons 45, 46, and 48

## Pattern 1: give schema context

Lesson 45's PySpark example and Lesson 46's KQL example both ran into the
same failure mode: a model guessing at column names it's never seen. The
fix is the same pattern every time — paste the actual schema (column
names, types) before asking for code or an explanation, not after
something breaks.

```
Weak:   "Write a query to total sales by region."
Better: "Table SensorEvents has columns: device_id (string),
         Timestamp (datetime), Value (real). Write a KQL query..."
```

## Pattern 2: give sample rows, not just column names

Lesson 48's documentation example showed why: `status` or `total_amount`
mean different things depending on what values actually show up. A
handful of real rows — with edge cases included, like a cancelled order —
disambiguates in a way a schema alone can't.

```
Weak:   "Describe what the total_amount column means."
Better: "Describe what total_amount means, given these three
         rows..." [rows that include a cancelled, $0 order]
```

## Pattern 3: ask for the reasoning, not just the answer

A one-line answer with no reasoning is hard to review — you either trust
it blindly or redo the work yourself. Asking the model to show its
reasoning turns the output into something you can actually check against
your own understanding of the data, the same review habit from Lessons 45
and 46.

```
Weak:   "Is this query correct?"
Better: "Walk through what this query does, step by step, then
         tell me if it matches the requirement that cancelled
         orders are excluded."
```

## Pattern 4: iterative refinement, not one perfect prompt

The first response rarely nails every constraint. Rather than trying to
write one perfect prompt up front, treat it as a conversation: point out
specifically what's wrong ("this misses the cancelled-order filter"), and
let the model revise. This is faster in practice than over-engineering the
first prompt, and it mirrors how the approval-diff review in Lesson 44's
chat pane is meant to work.

```
Turn 1: initial prompt  ->  draft that's 80% right
Turn 2: "this misses X"  ->  revised draft
Turn 3: "now handle Y edge case"  ->  usable draft
```

## Putting it together

These four patterns aren't independent tricks — they compound. Schema
context plus sample rows gets you a better first draft; asking for
reasoning lets you actually review that draft; iterative refinement fixes
what the review catches. Lessons 45, 46, and 48 each used this same
combination without naming it explicitly — this lesson makes the pattern
reusable on purpose.

## Key terms

| Term | Meaning |
|---|---|
| Schema context | Real column names and types, given up front, not after a failure |
| Sample rows | Real example values, edge cases included, that disambiguate meaning |
| Reasoning request | Asking the model to explain its steps so the output is actually reviewable |
| Iterative refinement | Treating a prompt as a conversation, not a single perfect instruction |

## Check yourself

You're ready for Lesson 50 when you can explain, without looking: why does
asking for the model's reasoning make a generated answer easier to review
than asking for the answer alone?
