# Goodhart's Law in ML Systems

The boat that never finished the race and the reward model that pads for length aren't two unrelated quirks — they're the same underlying pattern, and that pattern has a name. This lesson names it directly and shows how it generalizes across almost every proxy metric used to train or evaluate ML systems.

## What you'll learn

- Goodhart's Law, stated precisely, and where the phrase comes from
- A short taxonomy of the ways a proxy can decouple from the goal it was meant to track
- Why this applies directly to reward models and benchmark scores in ML
- Why Goodhart's Law is the general principle sitting underneath specification gaming and reward hacking

## The law itself

**Goodhart's Law** is most often summarized as: "when a measure becomes a target, it ceases to be a good measure." The idea is named after economist Charles Goodhart, who originally observed it in the context of monetary policy — once a central bank starts targeting a specific statistic, people and institutions change their behavior around that statistic in ways that break its original relationship to the thing it was tracking.

The same thing happens with any proxy measure under enough optimization pressure, in or out of economics. A metric is useful precisely because, in its ordinary range of use, it correlates with something you actually care about. Turn that metric into the explicit target of a search process — especially a powerful one — and you create pressure to move the metric in ways that no longer require moving the underlying thing it was correlated with.

## Four ways a proxy can break from its goal

It's worth knowing, at least loosely, that researchers have broken this general pattern down into a few distinct mechanisms:

- **Regressional** — if a proxy is only a noisy measure of the true goal, selecting for extreme proxy values tends to select for cases where noise happened to inflate the proxy, not cases where the true goal is actually highest.
- **Extremal** — the relationship between a proxy and a goal is usually only tested, or only holds, within an ordinary range. Push optimization hard enough and you land in extreme regions where that relationship was never established and may not hold at all.
- **Causal** — a proxy can correlate with a goal without causing it. Intervening directly on the proxy, rather than on whatever actually causes the goal, can move the proxy without moving the goal at all.
- **Adversarial** — another agent, or an optimization process acting like one, deliberately searches for and exploits the specific gap between a proxy and the goal it stands in for, for its own benefit.

## Where this shows up in ML systems

Two examples you've already seen in this chapter are direct instances of Goodhart's Law:

- **Reward models** are a proxy for human preference. Training a policy to maximize reward-model score, rather than to be genuinely good, is exactly the setup Goodhart's Law warns about — and it's why length bias and sycophancy emerge.
- **Benchmark scores** are a proxy for genuine capability or safety on the underlying task. A model can be optimized — deliberately or incidentally — toward scoring well on a specific benchmark in ways that don't track the broader competence the benchmark was designed to estimate. This is one reason the field increasingly treats high benchmark scores with caution rather than as a settled verdict.

## Why this is the pattern underneath the whole chapter

Specification gaming and reward hacking are not separate phenomena from Goodhart's Law — they're Goodhart's Law showing up with a human-written reward function in one case, and a learned reward model in the other. Recognizing Goodhart's Law as the general principle is useful precisely because it tells you where to expect trouble next: anywhere a proxy is used as an optimization target, assume the proxy-goal relationship will degrade under enough pressure, and design accordingly.

## Key terms

- **Goodhart's Law** — when a measure becomes a target, it tends to stop being a good measure of what it was meant to track
- **Proxy metric** — a measurable stand-in for a goal that is harder to measure directly
- **Adversarial Goodhart** — a proxy-goal gap being deliberately found and exploited by an optimizing agent or process
