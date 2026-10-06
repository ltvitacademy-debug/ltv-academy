# Lesson 7 — Building Eval Datasets

**Chapter 2 · Evaluating AI Systems · Lesson 7 of 25**

## What you'll learn

- Why "it seemed fine when I tried it" doesn't scale as a testing strategy
- What a real eval dataset actually looks like
- Where good test cases come from in practice
- The qualities that separate a useful eval dataset from a token one

## Why "vibes-based" testing breaks down

Every AI project starts the same way: someone builds a prompt, tries it a few times in a playground, likes what they see, and ships it. That works right up until the model changes, the prompt gets tweaked for an unrelated reason, or a user sends an input nobody tried by hand — and now something that "seemed to work" quietly regresses with no way to know it happened. An eval dataset is what turns "I think this still works" into "I can show you it still works, on the same 200 cases, every time." It's the foundation everything else in this chapter builds on: you can't automate a metric (Lesson 8), run a regression test (Lesson 10), or benchmark a model swap (Lesson 12) against cases that don't exist yet.

## What an eval dataset actually is

At its simplest, it's a list of structured test cases — an input, and some way to judge whether the output was acceptable. A minimal one looks like this:

```yaml
tests:
  - vars:
      question: "What's your return policy?"
    assert:
      - type: contains
        value: "30 days"
  - vars:
      question: "Can I return a used item?"
    assert:
      - type: llm-rubric
        value: "Answer should not guarantee a refund without conditions"
```

Each entry pairs a realistic input with a way to check the output — an exact string match, a rule, or (as you'll see in Lesson 8) a more flexible graded check. The dataset is the asset; the grading method is almost secondary.

## Where good test cases actually come from

- **Real production inputs.** Once your system is live, actual user questions (sampled and reviewed for anything sensitive) are the single best source — they reflect real phrasing, real edge cases, and real ambiguity you'd never think to write by hand.
- **Logged failures.** Every time a user complains, a support ticket gets filed, or someone on the team notices a bad response, that exact input becomes a permanent test case. This is how a dataset accumulates institutional memory instead of repeating the same mistake.
- **Domain expert review.** Someone who actually knows the subject matter (not just the engineering) is far better than a developer at spotting the tricky cases that look simple but aren't.
- **Deliberately adversarial cases.** Inputs designed to probe edges — ambiguous phrasing, conflicting instructions, out-of-scope questions — that a happy-path tester would never think to write.

## What makes a dataset good, not just present

- **It covers the real input distribution**, not just the five easiest examples that make the demo look good.
- **Every case has a clear pass/fail criterion** — if a human reviewer can't agree on whether an output passed, neither can an automated grader.
- **It's large enough to be representative, but not so large it never gets reviewed.** A well-curated 150 cases beats an unreviewed 5,000.
- **It's versioned and maintained**, growing every time something breaks in production — a static dataset from launch day stops reflecting reality within months.

## Key terms

| Term | Meaning |
|---|---|
| Eval dataset | A structured set of test cases pairing realistic inputs with pass/fail criteria |
| Regression case | A test case added specifically because that input broke something before |
| Input distribution | The realistic range and variety of inputs a system actually receives in production |

## Lab

Pick any AI feature you have access to (or a demo chatbot). Write five test cases for it in the input/expected-behavior format shown in this lesson: one happy-path case, one edge case, one ambiguous case, and two cases based on something that actually confused you when you tried the tool yourself.

## Check yourself

Can you explain, in your own words, why a dataset built entirely from a developer's own guesses about what users might ask is weaker than one seeded from real production logs?
