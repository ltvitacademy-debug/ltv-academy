# Math & Probability Interview Preparation

Math and probability rounds are where quant interviews earn their reputation for being different from typical technical interviews. The goal isn't memorized formulas — it's watching you reason out loud under uncertainty, the same skill the SR-5 project asked of you when testing a hypothesis against noisy market data.

## What you'll learn

- How to structure a probability-puzzle answer out loud, step by step
- Five classic problem types with full, verified solutions
- Bayes' theorem worked through a concrete example, not just the formula
- What interviewers are actually scoring — and why "I don't know, let me think it through" beats a memorized answer

## How to structure your answer out loud

Interviewers care more about your process than your final number. State what you're assuming, define variables explicitly, work through the logic step by step, and sanity-check the answer against intuition before you finalize it (does the number make sense given the setup?). Silence is the worst answer — narrate your thinking even when you're stuck, since a partial, honest attempt scores better than a long silence followed by a guessed number.

## Problem 1: expected flips to get two heads in a row

**Question:** You flip a fair coin repeatedly. What's the expected number of flips until you see two heads in a row (HH)?

**Solution:** Define states by the most recent flip: state S0 (start, or last flip was tails), state S1 (last flip was heads). Let E0 and E1 be the expected additional flips from each state.

- From S0: one flip, 50% land in S1 (saw a head), 50% stay in S0. `E0 = 1 + 0.5*E1 + 0.5*E0`
- From S1: one flip, 50% done (second head), 50% back to S0. `E1 = 1 + 0.5*0 + 0.5*E0`

Solving: `E0 = 1 + 0.5*E1 + 0.5*E0` gives `0.5*E0 = 1 + 0.5*E1`, so `E0 = 2 + E1`. Substituting `E1 = 1 + 0.5*E0`: `E0 = 2 + 1 + 0.5*E0` → `0.5*E0 = 3` → `E0 = 6`. A 200,000-trial simulation confirms it: the sample mean comes out to roughly 5.99, matching the exact answer of **6**.

## Problem 2: Bayes' theorem — a positive test result

**Question:** A disease affects 1% of a population. A test is 95% sensitive (catches 95% of true cases) and 90% specific (correctly clears 90% of healthy people). You test positive. What's the probability you actually have the disease?

**Solution:** Define P(D) = 0.01, P(+|D) = 0.95, P(+|¬D) = 0.10 (false positive rate = 1 - specificity).

```
P(D|+) = P(+|D) * P(D)  /  [ P(+|D)*P(D) + P(+|¬D)*P(¬D) ]
       = (0.95 * 0.01) / (0.95*0.01 + 0.10*0.99)
       = 0.0095 / (0.0095 + 0.099)
       ≈ 0.0876
```

The posterior probability is only about **8.8%** — a result that surprises most people the first time, because intuition latches onto the 95% sensitivity and ignores the low base rate. This exact structure — a strong signal tested against a weak base rate — is the same intuition behind why SR-5's cross-sectional signal needed purged walk-forward validation rather than trusting an in-sample fit: a confident-looking number can still be mostly noise if you don't account for what you started with.

## Problem 3: the gambler's ruin

**Question:** You start with $5. Each round, you bet $1 on a fair coin: win $1 on heads, lose $1 on tails. You stop at $0 or $10. What's the probability you reach $10?

**Solution:** For a fair (p = 0.5) random walk between absorbing barriers at 0 and N, starting at k, the probability of reaching N before 0 is simply `k/N` — the symmetric case collapses to a linear probability. Here, `k = 5`, `N = 10`, so the probability of reaching $10 is **5/10 = 0.5**. If the coin were biased (p ≠ 0.5), the formula becomes `(1-(q/p)^k) / (1-(q/p)^N)` where `q = 1-p` — know the fair-coin shortcut, but also know where it comes from.

## Problem 4: expected value under optimal stopping (the secretary problem)

**Question:** You interview N candidates one at a time, in random order, and must accept or reject each immediately — no going back. You want to maximize the chance of picking the single best candidate. What's the strategy, and what's your success probability for large N?

**Solution:** The optimal strategy: reject the first `N/e` candidates automatically (just observe them to set a benchmark), then accept the first subsequent candidate who beats everyone seen so far. As N grows large, this strategy succeeds with probability approaching **1/e ≈ 0.368**, a strikingly clean constant for a problem that sounds like it should have no closed form at all.

## Problem 5: expected number of rolls to see every face of a die

**Question:** You roll a fair six-sided die repeatedly. What's the expected number of rolls until you've seen all six faces at least once?

**Solution:** This is the coupon-collector problem. With `n` distinct outcomes, the expected number of draws to collect all of them is `n * (1 + 1/2 + 1/3 + ... + 1/n)` — n times the n-th harmonic number. For n = 6: `6 * (1 + 0.5 + 0.333 + 0.25 + 0.2 + 0.167) ≈ 6 * 2.45 ≈ 14.7` rolls.

## What interviewers are actually scoring

Across all five problem types, the actual evaluation criteria are consistent: can you define the problem precisely before solving it, can you break a hard problem into states or cases, do you sanity-check your own answer, and do you stay calm and keep talking when you get stuck. A wrong final number with clean, audible reasoning usually scores better than a correct number blurted out with no shown work — the interviewer can't evaluate a process they didn't hear.

## Key terms

| Term | Meaning |
|---|---|
| Bayes' theorem | A rule for updating the probability of a hypothesis given new evidence, accounting for the base rate |
| Gambler's ruin | A random-walk problem modeling the probability of reaching one of two absorbing barriers before the other |
| Coupon-collector problem | The expected number of draws (with replacement) needed to collect every distinct outcome at least once |
| Optimal stopping | A class of problems about when to accept an option versus continuing to search, given no ability to revisit past options |

## Recap

Math and probability rounds score your reasoning process, not a memorized answer — define the problem, break it into states, sanity-check, and keep talking. Five patterns worth having cold: state-based expectation (HH in 6 flips), Bayes' theorem (an 8.8% posterior despite 95% sensitivity), gambler's ruin (k/N for a fair walk), optimal stopping (1/e ≈ 0.368), and the coupon-collector problem. Next, Lesson 19 moves from math on a whiteboard to code on a keyboard.
