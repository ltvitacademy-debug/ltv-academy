# Capstone: Wrap-Up & Portfolio Presentation

You've specified a strategy, built a cost-aware backtest, and stress-tested it. This last lesson covers the step that actually determines whether any of that work is useful to anyone else: writing it up clearly and honestly, and presenting it the way a hiring manager, research lead, or interviewer in this field actually wants to see it.

## What you'll learn

- How to build a one-page results summary that puts base case and stress tests side by side
- The write-up structure professionals actually use, and why it leads with the method, not the headline number
- How to talk about this capstone in an interview, including when the result wasn't impressive
- The honest-disclosure habits that separate a credible research write-up from a sales pitch
- Why "the strategy didn't survive stress-testing" is a strong answer, not a weak one, if you can explain why

## Building a one-page results table

The first deliverable is a single table that puts the base case and both stress tests side by side — this is what every reviewer will look at first, and it should be impossible to misread:

```python
import pandas as pd

# The three result dicts produced by Lesson 32's run_backtest calls
results = {
    "Base case": {"ann_return": 0.0070, "sharpe": 0.1188, "sortino": 0.1133,
                   "max_dd": -0.1913, "calmar": 0.0366, "total_cost": 0.0607},
    "3x transaction costs": {"ann_return": -0.0484, "sharpe": -0.4427, "sortino": -0.4009,
                               "max_dd": -0.2070, "calmar": -0.2336, "total_cost": 0.1822},
    "Adverse regime (final 100d)": {"ann_return": -0.0092, "sharpe": -0.0344, "sortino": -0.0331,
                                      "max_dd": -0.1730, "calmar": -0.0533, "total_cost": 0.0602},
}

summary = pd.DataFrame(results).T
summary.columns = ["Ann. return", "Sharpe", "Sortino", "Max DD", "Calmar", "Total cost"]
print(summary.round(3).to_string())
```

```
                             Ann. return  Sharpe  Sortino  Max DD  Calmar  Total cost
Base case                          0.007   0.119    0.113  -0.191   0.037       0.061
3x transaction costs              -0.048  -0.443   -0.401  -0.207  -0.234       0.182
Adverse regime (final 100d)       -0.009  -0.034   -0.033  -0.173  -0.053       0.060
```

One table, every scenario, every metric — a reviewer should never have to go hunting through separate code outputs to compare the base case against the stress tests. This habit alone, consistently applied, is one of the clearest tells of a researcher who's actually internalized Chapter 4 and 5's discipline versus one who ran the numbers once and moved on.

## The write-up structure that actually gets read

A short, professional strategy write-up — one to two pages, whether for a portfolio, an internal memo, or an interview take-home — follows roughly this order, and notably does **not** lead with the headline Sharpe ratio:

1. **The idea and the five-component specification** (Lesson 1) — one paragraph, in plain language.
2. **Data and methodology** — what data, what period, what cost and fill assumptions, and explicitly, what this backtest does *not* claim to account for.
3. **Base case results** — the table above, with the honest Chapter 5 framing (point estimate plus uncertainty, not a bare number).
4. **Stress tests and what they changed** — this is the section that actually differentiates a serious piece of work from a marketing pitch.
5. **Conclusion** — what you'd actually do next: refine the signal, test a different instrument, or retire the idea, and why.

```python
base_sharpe = results["Base case"]["sharpe"]
worst_stress_sharpe = min(results["3x transaction costs"]["sharpe"],
                           results["Adverse regime (final 100d)"]["sharpe"])
print(f"Sharpe degraded from {base_sharpe:.3f} (base) to as low as "
      f"{worst_stress_sharpe:.3f} under stress -- a swing of "
      f"{base_sharpe - worst_stress_sharpe:.3f}, large relative to the "
      f"base case's own magnitude.")
```

```
Sharpe degraded from 0.119 (base) to as low as -0.443 under stress -- a swing of 0.561, large relative to the base case's own magnitude.
```

A single sentence like this, computed directly from your own results rather than asserted from a gut feeling, belongs near the top of your conclusion section — it's the single number that most honestly characterizes how fragile this particular strategy turned out to be.

## Talking about it in an interview

If asked about this capstone in an interview, the strongest answer is not "it had a great Sharpe ratio" — it's walking through the process: how the signal was specified, what realistic assumptions were applied and why, what the stress tests were designed to probe, and what the result actually implied about the strategy's robustness. An interviewer in this field has almost certainly seen plenty of backtests with an inflated, unstressed Sharpe ratio and very few candidates who can clearly explain *why* a strategy failed a stress test and what they'd try next. "I built it, stress-tested it, and it didn't survive — here's specifically why, and here's what I'd try differently" is a genuinely strong answer, because it demonstrates exactly the research discipline this entire course has been teaching, not just the ability to produce a number.

## Honest-disclosure habits for any write-up you publish

Whatever you do with this capstone — a GitHub repo, a blog post, a portfolio page — carry forward a short, consistent set of disclosures: the exact sample period and its length; every cost and fill assumption stated explicitly, not buried; the number of parameter combinations or variants you actually tried before settling on the one you're presenting (Lesson 19's honesty-about-search-process point); and a clear statement that nothing here is investment advice or a live, funded track record. These disclosures cost you nothing in credibility — they *are* the credibility, to anyone in this field who knows what to look for.

## Key terms

| Term | Meaning |
|---|---|
| Results summary table | A single table comparing base case and all stress test scenarios across the same metrics |
| Write-up structure | Idea → methodology → base results → stress tests → conclusion, deliberately not leading with the headline Sharpe |
| Honest disclosure | Explicitly stating sample period, assumptions, and search process rather than only the favorable result |

## Recap

A clear results table, a write-up that leads with methodology rather than the headline number, and a small set of consistent honest disclosures are what turn a finished backtest into a credible piece of work — and a strategy that didn't survive its own stress tests, explained clearly, is a stronger portfolio piece than an unstressed, flattering one. That completes both the capstone and the course: you've now run this course's entire discipline, from a strategy idea to an honestly-presented conclusion, on your own.
