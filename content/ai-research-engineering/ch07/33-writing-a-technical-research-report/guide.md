# Writing a Technical Research Report

A research report exists to let someone who wasn't in the room reach the same conclusion you did, from the same evidence, without having to trust your word for it. That's a different goal than a status update ("I ran some experiments, here's what happened") and a different goal than a polished paper. This lesson covers the structure that makes a technical report actually do its job: a claim stated up front, the evidence that supports it, the evidence that complicates it, and enough methodological detail that a skeptical reader could in principle reproduce it.

## What you'll learn

- The structure that makes a report's main claim checkable, not just statable
- Why methodological detail belongs in the report body, not an appendix no one reads
- How to present a result alongside its uncertainty, not as a single bare number
- Common failure modes: burying the lede, omitting what didn't work, overclaiming from a small result

## Lead with the claim, not the chronology

The most common structural mistake is writing a report in the order the work happened — "first I tried X, which didn't work, then I tried Y, which also had issues, then Z finally worked." This forces the reader to reconstruct the actual finding from a narrative, and buries the one thing they most need: what do you actually believe now, and how strongly. A report should open with the claim stated plainly, then spend the rest of the document establishing and qualifying it:

> **Claim:** Adding a sparsity penalty to the attention weights (λ=0.1) reduces validation perplexity by 4.2% (95% CI: 2.8–5.6%) relative to the dense baseline, on the same data and compute budget. The effect holds across 3 seeds but has not been tested beyond this model scale.

Everything that follows — methods, the full set of ablations, related negative results — exists to support or qualify that opening statement, not to replace it.

## Methodology detail belongs in the main body

A reader deciding whether to trust a result needs the methodology close enough to the claim that they can check it without flipping to an appendix: exact model size and architecture, exact data and how much of it, exact training budget (steps, tokens, or wall-clock, whichever is the controlled variable), number of seeds, and what's held fixed between the treatment and the baseline. If the baseline and the treatment differ in anything other than the variable under test — a different number of training steps, a different batch size — that has to be stated explicitly, because it's the first thing a careful reader will ask about.

## Report the uncertainty alongside the number

A single number from a single run is close to uninformative in most research settings, because run-to-run variance from seed alone can be larger than many reported effects. A credible report states the number of seeds, the spread across them (standard deviation or a confidence interval), and ideally shows the individual run values rather than only a mean:

```
Validation perplexity (3 seeds, mean ± std):
  Baseline (dense attention):   18.42 ± 0.31
  Treatment (sparse, λ=0.1):    17.65 ± 0.24

Per-seed values:
  Baseline:  18.71, 18.09, 18.46
  Treatment: 17.88, 17.41, 17.66
```

Presenting per-seed values, not just the summary statistic, lets a reader judge for themselves whether the effect looks consistent or is being carried by one lucky seed.

## Report what didn't work, not just what did

A report that only describes the configuration that worked, with no mention of the things that were tried and ruled out, denies the reader information that's often as valuable as the headline result — especially for a reader about to start a related project who would otherwise waste time retrying something already shown not to work. A short "what we tried and ruled out" section, even a few sentences, is one of the highest-value additions to a research report and the thing most often cut under time pressure.

## Avoid overclaiming from a small result

A 4% improvement on one benchmark, from one model scale, trained on one dataset, supports a narrow claim about that specific setup — not a claim that the technique "improves transformer training" in general. The discipline of stating the claim's actual scope (what model sizes, what data, what task) in the same sentence as the result itself is what separates a report a reader can trust from one that requires independently guessing how far the result generalizes.

## Key terms

- **Lead with the claim** — structuring a report so the main finding is stated up front, with supporting detail and qualification following, rather than reconstructed from a chronological narrative
- **Confidence interval (CI)** — a range that quantifies the uncertainty around a reported effect, typically computed across multiple seeds or runs
- **Negative-result section** — a part of the report documenting approaches that were tried and ruled out, saving future readers from repeating them
- **Overclaiming** — stating a conclusion broader than what the actual evidence (model scale, dataset, task) supports
