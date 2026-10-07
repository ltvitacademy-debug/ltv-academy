# Research Engineer vs. Product Engineer

The last lesson drew a line between research engineer and research scientist. This lesson draws the other line new hires ask about: research engineer versus the kind of software engineer who ships a product feature. If you've worked as a backend or full-stack engineer before moving into AI research, this is the lesson that reframes the habits you'll need to unlearn and the ones you'll keep.

## What you'll learn

- How a research engineer's definition of "done" differs from a product engineer's
- Why research code optimizes for a different set of risks than production code
- Which product-engineering skills transfer directly, and which ones actively mislead you in a research context
- Why research teams still need some production-grade engineering, and where that line falls

## Different definitions of "done"

A product engineer ships a feature, and "done" means it works correctly for every user, every time, indefinitely, under load, with edge cases handled and monitoring in place. The cost of being wrong is ongoing: a bug in production affects real users every day it goes unfixed.

A research engineer runs an experiment, and "done" often means the run produced a trustworthy number *once*. If a training script has a bug that only triggers under a code path the experiment never exercises, nobody cares — the experiment's result is still valid. This isn't engineers being sloppy; it's a correct response to a different cost structure. The relevant question for research code is "do I trust this specific result," not "will this hold up for every future user."

## Why the risk profile is inverted

Product engineering spends enormous effort on edge cases, backward compatibility, and defending against unlikely inputs, because the downside of a bug is felt by someone other than the person who wrote the code, far in the future, at a time they don't control. Research engineering spends that effort instead on **statistical validity** and **experiment hygiene**: did the metric get computed correctly, was the comparison apples-to-apples, is the random seed actually controlling for the thing you think it's controlling for, did a silent NaN get averaged into a number that looks fine.

A product bug is usually loud — a user hits an error, a dashboard alarms. A research bug is often silent — the code runs to completion, produces a plausible-looking number, and the number is simply wrong because of a subtle statistical or data-handling mistake. That makes research debugging a different discipline, which is the subject of an entire later chapter in this course.

## What transfers, and what doesn't

Skills that transfer directly from product engineering:

- Version control discipline, even if branching conventions get looser
- The instinct to write a quick test when you don't trust a function
- Comfort reading and navigating a large, unfamiliar codebase
- Debugging methodology — bisecting, isolating variables, reading stack traces

Instincts that actively mislead in a research context:

- **"Handle every edge case."** In research code, handling an edge case you'll never hit is wasted time that could have run another experiment.
- **"Abstract early for reuse."** Research code changes shape weekly as hypotheses change; an elegant abstraction built for last week's experiment often has to be torn out this week.
- **"Code review gates every merge."** Research teams still review code, but the bar and cadence are different — a notebook used to generate one plot for an internal discussion doesn't go through the same process as a change to the shared training library.

```python
# Product-engineer instinct: defensive, general, handles unknown inputs
def compute_accuracy(preds, labels):
    if preds is None or labels is None:
        raise ValueError("preds and labels must not be None")
    if len(preds) != len(labels):
        raise ValueError(f"length mismatch: {len(preds)} vs {len(labels)}")
    if len(preds) == 0:
        return 0.0
    correct = sum(p == l for p, l in zip(preds, labels))
    return correct / len(labels)

# Research-engineer instinct: trust your own inputs, get the number today
def compute_accuracy(preds, labels):
    return (preds == labels).mean()  # numpy arrays, known shape, move on
```

Neither snippet is "better" in the abstract — they're each correct for the risk they're written against.

## Where research still needs production-grade rigor

The line isn't "research code can always be sloppy." Shared infrastructure that many researchers depend on — the training framework, the data loader, the eval harness, anything that silently corrupting would invalidate every experiment built on top of it — gets production-grade testing and review, even on a research team. The scrappiness applies to the one-off script that answers today's question, not to the foundation twenty other scripts stand on. Learning to tell those two categories apart, quickly and correctly, is one of the most valuable judgment calls a research engineer develops.

## Key terms

- **Done (research sense)** — the run produced a trustworthy result once; it doesn't need to hold up for every future input or user
- **Experiment hygiene** — practices that protect the statistical validity of a result: correct seeding, apples-to-apples comparisons, catching silent NaNs
- **Silent bug** — a bug that lets code run to completion and produce a plausible but wrong number, as opposed to a bug that throws a visible error
- **Shared infrastructure exception** — the part of a research codebase (training framework, data loader, eval harness) that still needs production-grade rigor because many experiments depend on it being correct
