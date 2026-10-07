# Working With Research Scientists as an Engineer

A research engineer's closest working relationship is often with a research scientist whose priorities, vocabulary, and sense of what's "done" differ in specific, learnable ways from a typical engineering stakeholder. Neither role is more important than the other, but the partnership works better when the engineer understands what the scientist actually needs from the collaboration — and, just as often, what the scientist doesn't realize they're asking for until an engineer points it out.

## What you'll learn

- Why a scientist's "quick experiment" and an engineer's "quick experiment" often mean different things
- Translating a scientific question into an experiment design, including the parts the scientist didn't specify
- When to push back on a request, and when to just build what's asked and let the result speak
- The specific value an engineer adds that a scientist working alone usually can't produce as fast

## Different defaults for "quick" and "done"

A scientist's "can we quickly try X" is a request to test a hypothesis, and "quick" in their mind often refers to the conceptual simplicity of the idea, not the engineering effort to implement it reliably at the scale needed. An idea that's one sentence to describe ("what if we just add a sparsity penalty") can require real infrastructure work to test rigorously — multiple seeds, a proper baseline, logging, a sweep — that the one-sentence description doesn't hint at. The engineer's job in that moment isn't to simply say "that'll take two weeks, not an afternoon" and stop there, but to scope what a rigorous-enough version of that test actually looks like, and make the trade-off explicit: a rough one-seed version is possible by end of day, a version that would actually support a claim in a report needs the rest of the week.

## Translating a question into an experiment design

Scientists often come with a question, not a fully specified experiment — "does more data help here" rather than "train with 1x, 2x, 4x data, 3 seeds each, holding compute per sample fixed, compare validation loss." Filling in that gap is one of the highest-value things an engineer does in this partnership: identifying what has to be held fixed for the comparison to mean anything, what confounds would make the result uninterpretable (Lesson 32's "does the loss correlate with the metric" question applies directly here), and what the minimum viable version of the experiment is that would still produce a defensible answer.

## When to push back, and when to just build it

Not every scientist request should be implemented exactly as asked without comment — if a requested experiment has an obvious confound (comparing two models trained for different numbers of steps and calling the difference "architecture", when it might be "more training") it's worth raising before building, not after the run finishes and the result is ambiguous. But pushing back on every request, or insisting on a fully rigorous design before any rough version is tried, is its own failure mode — sometimes the fastest way to learn something is a scrappy, one-seed, known-to-be-imperfect run that tells the scientist whether the idea is even in the right neighborhood before investing in doing it properly.

```python
# Rough version: answer "is this even promising" in an afternoon
quick_result = train_n_steps(sparse_model, small_subset, n=500, seed=0)

# Rigorous version, built only if the rough version looks promising:
# 3 seeds, full data, swept LR, logged to W&B with git commit + config
```

## What an engineer adds that a scientist working alone can't match

A scientist with strong engineering instincts can write a training loop; what they typically can't do as fast as a dedicated engineer is build the infrastructure that makes running ten variants of that idea, with proper tracking and reproducibility, as cheap as running one — the config systems, sweep tooling, and cluster scheduling covered in earlier chapters. The partnership works best when the engineer treats that infrastructure leverage as the actual contribution, not as a lesser, purely supporting role to the scientist's "real" research.

## Key terms

- **Scoping a "quick" request** — translating a conceptually simple ask into an explicit trade-off between a rough version available immediately and a rigorous version that takes longer
- **Experiment design translation** — filling in the unspecified details (controls, confounds, held-fixed variables) of a scientist's question so it becomes a well-defined, defensible experiment
- **Confound** — an uncontrolled difference between a treatment and baseline that makes the comparison's result ambiguous or uninterpretable
- **Infrastructure leverage** — the specific value an engineer adds by making many experiment variants cheap and reproducible to run, rather than writing the research idea itself
