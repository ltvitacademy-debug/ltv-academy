# Formulating a Research Question

A capstone built on a vague feeling — "sectors seem to bounce back" — is not a research project, it's a hunch. Before writing a line of code, SR-5 needs a research question and a hypothesis stated precisely enough that the data could actually prove it wrong. This lesson formalizes both, and explains a design choice you'll rely on for the rest of the course: why this project tests sectors, not individual stocks.

## What you'll learn

- The formal research question and hypothesis behind SR-5
- Why sector ETFs, not single stocks, are the right level for this test
- How to state a null and alternative hypothesis so the project is falsifiable
- Key terms: hypothesis, cross-sectional, mean reversion, regime conditioning

## The research question

Stated formally: **over 2007–2025, does a dollar-neutral cross-sectional 5-day reversal strategy across the 11 S&P 500 Select Sector SPDR ETFs generate risk-adjusted excess returns that survive realistic transaction costs and purged walk-forward out-of-sample validation — and does conditioning the signal on the VIX volatility regime improve it?**

The working **hypothesis**: short-term sector overreaction mean-reverts over roughly 5 trading days, and the effect is stronger when the VIX is elevated — when fear and overreaction are running hot — than when markets are calm. **Mean reversion** here means that a sector's recent 5-day move tends to partially reverse over the next 5 days, rather than continue (momentum would predict the opposite). **Regime conditioning** means the strength of that reversal effect is allowed to depend on a separate state variable — the VIX level and term structure — rather than assuming the effect is constant through time.

## Why sectors, not single stocks

A single stock's 5-day return is dominated by **idiosyncratic noise**: earnings surprises, analyst calls, management news, lawsuits — events specific to that one company that have nothing to do with a broad mean-reverting market mechanism. Testing a reversal signal on individual stocks means fighting through a mountain of company-specific noise to find a much smaller systematic signal.

Sector ETFs solve this cleanly:

- **Liquidity** — the 11 Select Sector SPDRs are among the most heavily traded ETFs in the world, which also makes transaction-cost modeling realistic rather than theoretical.
- **Lower idiosyncratic noise** — each sector already diversifies away single-company news, so what's left in the 5-day return is closer to a genuine sector-wide over- or under-reaction.
- **A clean, fixed-size cross-section** — 11 names (growing from 9) is small enough to reason about by hand, and large enough to rank into terciles and build a **cross-sectional** signal, meaning the signal compares each sector's return to the other sectors on the same day, rather than to its own history in isolation.

## Null and alternative hypothesis

To make the project falsifiable, state both sides explicitly before looking at results:

- **Null hypothesis (H₀)**: Past 5-day sector returns have no relationship to forward 5-day sector returns — any apparent reversal pattern is noise, and a rank correlation test would show no statistically significant relationship.
- **Alternative hypothesis (H₁)**: Past 5-day sector returns are negatively related to forward 5-day returns (reversal, not momentum), and this relationship is stronger in high-VIX regimes than in low-VIX regimes.

Lesson 5 runs the actual statistical tests against these two hypotheses. Stating them now, before seeing results, is what keeps the project honest.

## Key terms

| Term | Meaning |
|---|---|
| Hypothesis | A precise, testable claim about a relationship in the data, stated before analysis |
| Cross-sectional | Comparing many assets against each other on the same date, rather than one asset against its own history |
| Mean reversion | The tendency for a recent move to partially reverse, rather than continue |
| Regime conditioning | Allowing an effect's strength to depend on a separate state variable, here the VIX |

## Recap

SR-5's research question and hypothesis are now stated formally, with a null and alternative version precise enough to be proven wrong. Sector ETFs — not single stocks — are the right level to test this because they're liquid, diversify away company-specific noise, and form a clean cross-section to rank. Next lesson: the four-phase project plan, the tooling stack, and the success criteria we're committing to before we see a single result.
