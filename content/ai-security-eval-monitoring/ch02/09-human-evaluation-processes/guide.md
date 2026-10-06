# Lesson 9 — Human Evaluation Processes

**Chapter 2 · Evaluating AI Systems · Lesson 9 of 25**

## What you'll learn

- Why automated metrics (Lesson 8) still can't fully replace human review
- How to design a human review process that actually scales
- A structured rubric format that produces usable, comparable ratings
- The common pitfalls that quietly break a human eval process

## Why humans are still in the loop

Automated metrics are fast and consistent, but they have a ceiling. Some qualities — whether a response's tone fits the brand, whether an explanation is actually helpful to a confused user versus just technically correct, whether a borderline call was the right judgment call — are genuinely subjective, and an LLM-as-judge is itself a model making a judgment call that needs to be checked against real human agreement sometimes. Human review also does something automated grading structurally can't: it catches the failure modes nobody thought to write a rubric for yet, because a human reviewer notices "this is wrong" even when no existing check was looking for that particular kind of wrong.

## Designing a process that scales

The instinct is to review everything, which collapses the moment volume grows past a few dozen cases a week. A process that actually survives contact with real workload looks different:

- **Sample, don't review everything.** A representative random sample (plus anything flagged by automated metrics as borderline) gives you a statistically meaningful read without reviewer burnout.
- **Use structured rubrics, not open-ended judgment.** "Rate this 1-5" produces noise. A rubric with specific criteria ("Does the response include a citation? Does it avoid guaranteeing an outcome? Is the tone appropriate?") produces ratings different reviewers actually agree on.
- **Check inter-rater reliability.** Periodically have two reviewers independently rate the same sample. If they disagree often, the rubric is ambiguous — fix the rubric, don't just pick a tiebreaker.
- **Route disagreements somewhere**, rather than silently discarding them — a disagreement is itself a signal that a case is genuinely ambiguous and may deserve its own eval dataset entry.

## A structured rubric, in practice

```yaml
criteria:
  - accurate: "Is every factual claim correct?"
  - complete: "Does it address all parts of the question?"
  - safe: "Does it avoid any disallowed content?"
  - tone: "Is it appropriately professional?"
rating: pass | fail | needs_review
```

Each criterion gets its own yes/no or pass/fail, rather than one holistic score — this is what makes two different reviewers land on the same answer most of the time, and makes disagreements easy to localize to a specific criterion instead of a vague overall feeling.

## Common pitfalls

- **Reviewer fatigue.** Past a certain volume in one sitting, rating quality degrades and reviewers start rubber-stamping. Cap session length, not just total volume.
- **Ambiguous rubrics.** If two careful reviewers reading the same rubric reach different conclusions on the same case, the rubric — not the reviewers — needs fixing.
- **Single-reviewer bias.** One person's judgment becomes the de facto standard without anyone checking it against a second opinion.
- **No feedback loop.** Human review that doesn't feed its findings back into the eval dataset (Lesson 7) or inform the automated grading criteria (Lesson 8) is a one-time check, not a system.

## Key terms

| Term | Meaning |
|---|---|
| Inter-rater reliability | How consistently two independent reviewers rate the same case |
| Structured rubric | A set of specific, checkable criteria replacing one holistic quality score |
| Sampling strategy | A deliberate method for selecting which cases get human review, rather than all of them |

## Lab

Take the structured rubric format shown in this lesson and write one for an AI feature you're familiar with — four or five specific, checkable criteria (not "is it good?"). Then imagine you and a colleague each rated the same five outputs with it — would you expect to agree on most of them? If not, which criterion would you expect the disagreement to cluster around?

## Check yourself

Can you explain, in your own words, why "rate this response 1 to 5" tends to produce less useful data than a rubric with four or five specific yes/no criteria?
