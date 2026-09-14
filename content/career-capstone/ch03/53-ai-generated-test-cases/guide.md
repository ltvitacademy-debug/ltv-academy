# Lesson 53 — AI-Generated Test Cases for Pipelines

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 53 of 81**

## What you'll learn

- How to turn a schema or transformation spec into a first draft of test cases with an LLM
- What an LLM is actually good at here: breadth, not judgment
- The edge cases an LLM won't think of on its own, and why
- The draft → review → run workflow that keeps AI-generated tests honest

## Feed it the spec, not just the code

Fabric & Real-Time Analytics Lesson 49 covered unit testing PySpark
transformations by hand — writing the `assert` statements yourself
against known input/output pairs. An LLM can draft the first pass of
that list faster than you can type it, but only if you give it the
right input: the transformation's spec (what each column means, its
type, its nullability, any business rule) and the schema, not just
the code. A prompt built from the code alone only re-derives what the
code already does; a prompt built from the spec can catch cases where
the code doesn't match what it's supposed to do.

```
Weak prompt:  "Write unit tests for this function." + code
Strong prompt: "Here's the transformation spec (quantity is a
               positive integer, discount_pct is 0-100, order_date
               cannot be in the future) and the function. Draft
               test cases for the spec, then check whether the
               function satisfies each one."
```

## What it's good at: coverage breadth

Ask an LLM to draft test cases for a `discount_pct` column typed as
0–100 and it will reliably produce the boundary cases a rushed human
might skip: 0, 100, a negative number, 101, a null, a decimal like
50.5 if the type allows it. That breadth — systematically walking a
type's boundaries — is exactly the kind of exhaustive, mechanical
work an LLM does well and a tired engineer forgets under deadline
pressure.

## What it misses: cases nobody told it about

The LLM only knows what's in the spec you gave it. It has no idea
that `order_date` occasionally arrives as a Unix epoch integer from a
legacy source system, or that Q4 order volume is triple every other
quarter and that batch job needs a test at that scale, or that a
specific customer ID always represents a test account, and orders
from it should never hit the sales fact table. Those are the
business-specific, undocumented edge cases that live in a data
engineer's head — not in any schema — and an LLM's draft will be
silent about all of them unless you feed the context in yourself.

```
LLM catches (from the spec):        Human still has to add:
- boundary values (0, 100, null)    - the legacy epoch-date source
- type mismatches                   - the seasonal volume spike
- obviously invalid ranges          - the known test-account ID
```

## The workflow: draft, review, run

Treat every AI-generated test list as a draft outline, not a
finished suite. Draft with the LLM, review the list line by line
against what you know about the source systems that the spec didn't
capture, delete or edit anything that doesn't reflect real production
behavior, then run the survivors — same as any other test you'd
commit.

```
1. Draft   — LLM proposes test cases from the schema/spec
2. Review  — you check each one against real system behavior
3. Trim    — drop tests that don't reflect anything real
4. Run     — the surviving tests join the actual suite
```

## Key terms

| Term | Meaning |
|---|---|
| Spec-driven prompt | A test-generation prompt built from the schema/business rules, not just the code |
| Coverage breadth | Systematically walking a type's boundary values — an LLM's strength |
| Undocumented edge case | A real production quirk that lives in an engineer's head, not the spec |

## Check yourself

You're ready for Lesson 54 when you can explain, without looking:
why does a prompt built only from the function's code fail to catch
the cases that matter most?
