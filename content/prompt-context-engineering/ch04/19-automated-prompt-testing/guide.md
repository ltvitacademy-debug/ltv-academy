# Lesson 19 — Automated Prompt Testing

**Chapter 4 · Evaluating Prompts · Lesson 19 of 24**

## What you'll learn

- How an eval set actually gets run: a real, minimal test-runner
  outline
- Four distinct ways to grade an output, and when each one applies
- What a real automated test run reports, beyond a single pass rate
  number
- Why "LLM-as-judge" grading still needs a human spot-check in the
  loop

## From eval set to automated test

Lesson 18 built the eval set. On its own, a JSON file of cases doesn't
test anything — it has to actually be run against the prompt, and
graded, programmatically, so the exact same check runs every time the
prompt changes. That loop is small:

```
for case in eval_set:
  output = run_prompt(case.input)
  score  = grade(output, case.expected)
  results.append(score)

pass_rate = sum(results) / len(results)
```

Every case runs the prompt, grades the output, and records a score.
The specific implementation of `run_prompt` and `grade` varies by
project, but the loop itself doesn't — and running it the same way
every time is the entire point: a human re-reading outputs by hand
applies different judgment call to call, which is exactly what
automated testing removes from the process.

## Four ways to grade an output

`grade()` isn't one function — the right grading method depends on
the kind of output:

1. **Exact or structural match.** For anything with one right answer —
   a specific string, valid JSON, a correctly formatted date — a
   direct equality or schema check is both the simplest and most
   reliable method. No judgment calls involved.
2. **Keyword or regex assertions.** When the exact wording can vary
   but specific content must or must not appear — the output must
   mention a policy, or must never leak an internal system detail — a
   regex or keyword check is fast and deterministic.
3. **LLM-as-judge rubric scoring.** For genuinely open-ended output
   (tone, helpfulness, whether an explanation is actually clear), a
   second model grades the output against a written rubric and
   returns a score. This is the only practical way to grade output
   that doesn't have one correct form.
4. **Human spot-check sampling.** An LLM judge can develop blind spots
   or drift over time, the same way any single evaluator can. A
   periodic human review of a sample of judged cases — not every case,
   but enough to catch systematic grading errors — keeps the automated
   judge honest.

## What a real test run reports

A single pass-rate percentage isn't enough to act on. A useful test
run report looks like:

```
{
  "prompt_version": "v14",
  "cases_run": 42,
  "passed": 38,
  "pass_rate": 0.905,
  "failed_ids": ["ev_014", "ev_031"]
}
```

The `pass_rate` tells you whether something changed. The
`failed_ids` tell you exactly which eval cases to go look at — and
because every case has a category (Lesson 18: common, edge, known
failure, adversarial), those IDs also tell you *what kind* of failure
just showed up, which is often the faster path to understanding why.

## Testing isn't optional once an eval set exists

Once an eval set exists, a prompt change that ships without being run
against it isn't meaningfully tested — it's a change someone liked
the look of. The value of Lesson 18's work only shows up once this
lesson's loop runs automatically, every time, not occasionally when
someone remembers to check.

## Key terms

| Term | Meaning |
|---|---|
| Test runner | The loop that runs every eval case against a prompt and records a score |
| LLM-as-judge | Using a second model to grade open-ended output against a written rubric |
| Pass rate | The fraction of eval cases a prompt version passed — a summary, not a substitute for the failed case list |

## Lab

1. Write a real test-runner loop (pseudocode or real code) for the eval
   set you built in Lesson 18, using exact-match or keyword grading for
   at least one case.
2. Run it by hand against your prompt's actual output and produce a
   real result report: version, cases run, passed, pass rate, and
   failed IDs.

## Check yourself

You're ready for Lesson 20 when you can run your eval set against a
prompt and produce a real pass-rate report with specific failed case
IDs — not just a gut feeling about whether the output "looked right."
