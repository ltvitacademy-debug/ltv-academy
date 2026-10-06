# Script — Automated Prompt Testing

## Segment 1 (title)

An eval set only pays off once it's run automatically, the same way, every time a prompt changes — not by a person reading through outputs and deciding if they look okay.

## Segment 2 (code: a real test runner)

A real test runner is small: for every case in the eval set, run the prompt against its input, grade the output against that case's expected result, and record the score. Divide total passes by total cases for a pass rate. Simple, and it runs the exact same way on every prompt version.

## Segment 3 (steps: four ways to grade)

Not every check needs a model to grade it. Exact or structural match works for anything with one right answer — valid JSON, an exact string, a specific format. Keyword or regex checks work when the output just needs to contain or avoid specific terms. For genuinely open-ended output, LLM-as-judge scoring uses a second model to grade against a written rubric. And because a judge model can drift or develop its own blind spots, a periodic human spot-check stays in the loop to catch what automated grading quietly starts missing.

## Segment 4 (code: what a test run reports)

A real test run reports more than a single number: the prompt version tested, how many cases ran, how many passed, the resulting pass rate, and — critically — the specific IDs of the cases that failed. The pass rate alone tells you something changed; the failed IDs tell you what to actually go look at.

## Segment 5 (outro)

A prompt change that isn't run against the full eval set before shipping isn't really tested — it's just a change someone eyeballed and liked. Next: A/B testing prompts — comparing two versions on the same eval set, fairly, to decide which one actually ships.
