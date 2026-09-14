# Lesson 58 — Evaluating AI Output for Correctness

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 58 of 81**

## What you'll learn

- Why "it sounds right" is not a correctness check, and what to use instead
- Spot-checking against ground truth: what it is and when it's enough
- LLM-as-judge: the technique, and its real caveats
- How to combine both into an actual evaluation practice

## "Sounds right" is not a check

Every lesson in this chapter so far has arrived at the same
requirement — verify the draft. This lesson is about how, concretely.
"It sounds right" fails as a check because it measures fluency, not
accuracy; a wrong answer and a right answer can be equally
well-written. A real correctness check has to compare the AI's
output against something that isn't the AI itself: real data, a
known-correct answer, or a second, independent check.

## Spot-checking against ground truth

The simplest, most reliable technique: take a sample of the AI's
output — mapped fields, generated test cases, RCA claims — and check
it by hand against data you know is correct. For the schema mapping
from Lesson 55, that means pulling actual sample rows and confirming
the mapped values match. For a documentation draft like Lesson 48's,
it means checking a handful of generated descriptions against the
actual column definitions. Spot-checking doesn't scale to every
single output, but it catches the systematic errors that show up
early enough to fix before the rest ships.

```
Spot-check recipe:
1. Sample a subset of the AI's output (10-20 items is often enough)
2. Compare each against real, independently-known-correct data
3. If the sample has errors, the full output probably does too
4. Fix the process, not just the sampled errors
```

## LLM-as-judge, and its caveats

A newer technique uses a second LLM call to evaluate the first one's
output — "does this generated test case correctly reflect the spec?"
It scales further than manual spot-checking and can flag obviously
wrong output fast. Its real caveat: the judge model has the exact
same blind spots as the model being judged. It has no more access to
your real systems or your undocumented edge cases than the original
call did, so it can confirm internal consistency ("does this test
case follow logically from the spec I gave the judge?") but it
cannot confirm real-world correctness the way a human check against
actual data can.

```
LLM-as-judge is good for:      LLM-as-judge cannot replace:
- catching obvious errors      - checking against real production data
- scaling review across        - knowing your undocumented edge cases
  many outputs quickly         - final human sign-off
```

## Combining both into a real practice

Use LLM-as-judge as a fast first filter across a large volume of AI
output, then spot-check a sample of what passes against real ground
truth before anything ships. That combination catches more than
either technique alone: the judge scales the first pass, and the
human spot-check catches the exact blind spot the judge shares with
the original model.

## Key terms

| Term | Meaning |
|---|---|
| Ground truth | Real, independently-known-correct data used to check AI output |
| Spot-checking | Manually verifying a sample of AI output against ground truth |
| LLM-as-judge | Using a second LLM call to evaluate the first's output — scalable but shares its blind spots |

## Check yourself

You're ready for Lesson 59 when you can explain, without looking:
why can't an LLM-as-judge fully replace a human spot-check against
real data?
