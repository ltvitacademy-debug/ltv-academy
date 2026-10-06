# Lesson 20 — A/B Testing Prompts

**Chapter 4 · Evaluating Prompts · Lesson 20 of 24**

## What you'll learn

- How to structure a fair comparison between two prompt versions
- A real worked example: one variable changed, run against the same
  eval set, with a specific numeric result
- The four rules that make an A/B test's result actually trustworthy
- Why "it reads better" isn't a result, and what to report instead

## A/B testing answers a specific question

Lesson 19 covered running the eval set against one prompt. A/B testing
runs it against *two* — a control (the current version) and a
challenger (a proposed change) — to answer a specific question: does
this change actually make things better, by a defined metric, or does
it just look different?

## A real comparison

```
PROMPT A (control):
"Answer customer questions
about their order."

PROMPT B (challenger):
"Confirm the order ID first.
Escalate refunds to a human."
```

B changes exactly one thing relative to A: it adds a verification
step (confirm the order ID) and an escalation rule (never handle
refunds directly). Everything else about the two prompts is
identical. That's deliberate — a fair A/B test isolates one change so
the result can actually be attributed to it.

## Four rules for a trustworthy result

1. **Change one variable at a time.** If B also used different
   wording, a different tone, and a different output format all at
   once, a result in B's favor wouldn't tell you which of those three
   changes actually mattered — or whether one of them was dragging the
   others down.
2. **Use the same eval set, or a fair traffic split.** Both versions
   need to be judged on identical ground. Testing A against easy cases
   and B against hard ones (even accidentally) invalidates the
   comparison before it starts.
3. **Pick the metric in advance.** Decide what "better" means — pass
   rate, cost per call, latency, a specific category's pass rate —
   before looking at results. Choosing the metric after seeing the
   numbers (picking whichever one happens to favor your preferred
   version) isn't measurement, it's rationalizing a decision already
   made.
4. **Use a big-enough sample before shipping the winner.** A 2-case
   difference out of 5 total cases is noise. Running 42 real eval
   cases (or a meaningful slice of live traffic) is what makes a gap
   between versions a real signal instead of chance.

## The result, reported properly

```
{
  "prompt_a_pass_rate": 0.738,
  "prompt_b_pass_rate": 0.929,
  "cases_run": 42,
  "winner": "B",
  "reason": "fewer policy violations"
}
```

Notice what this reports beyond a bare "B is better": the exact pass
rates for both versions, how many cases were run (so the result's
reliability can be judged), which one won, and *why* — a specific,
checkable reason (fewer policy violations), not a subjective
impression. That specificity is what separates an A/B test result from
a preference.

## Key terms

| Term | Meaning |
|---|---|
| Control | The current, existing prompt version in an A/B comparison |
| Challenger | The proposed new prompt version being tested against the control |
| Isolated variable | The single, specific change between control and challenger that a fair A/B test attributes a result to |

## Lab

1. Take a prompt from an earlier lesson and write one challenger
   version that changes exactly one thing about it.
2. Run both versions against your Lesson 18 eval set (or a subset) and
   record a real result in the shape shown above: both pass rates,
   cases run, the winner, and a specific reason.

## Check yourself

You're ready for Lesson 21 when you can run a real A/B comparison
between two prompt versions, isolate what changed, and report a
specific, numeric reason for the winner — not just a preference.
