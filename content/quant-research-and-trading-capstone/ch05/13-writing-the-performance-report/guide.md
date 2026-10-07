# Writing the Performance Report

Lesson 12 closed the research phase with a full risk picture, net of costs. Chapter 5 turns everything from Lessons 1-12 into the one document a reader who wasn't in the room with you will actually judge: the performance report. A result nobody can read is a result nobody can use.

## What you'll learn

- The standard structure a research desk expects in a strategy write-up
- How to write an honest abstract that leads with the real number, not the best-looking one
- Turning 12 lessons of work into one results table and one limitations section
- The difference between a report that informs and one that sells

## Who reads this, and what they're looking for

A performance report has at least three readers, and each one reads it differently: a **portfolio manager** deciding whether to allocate capital, a **risk manager** checking whether the strategy fits the book's existing exposures, and a **future you**, six months from now, trying to remember why a decision was made. Write for all three. The PM wants the net numbers and the capacity estimate up front. The risk manager wants the stress tests and the correlation-to-one caveat spelled out, not buried. Future you wants the assumptions and data sources written down precisely enough to reproduce the result.

## The standard structure

A research report for a systematic strategy like SR-5 follows a predictable shape, because predictable is what lets a busy reader find what they need:

1. **Abstract** — three to five sentences: the hypothesis, the method, the headline net result, and the one caveat that matters most.
2. **Data & methodology** — universe, date range, point-in-time handling, the model (Ridge regression), and the validation scheme (purged walk-forward cross-validation).
3. **Results** — gross and net performance, broken out clearly, never blended into one misleading number.
4. **Risk analysis** — the full risk-metric table and the four stress-test windows.
5. **Limitations** — what could be wrong, what wasn't tested, what would break the result.
6. **Appendix** — parameter choices, code references, extra charts, anything a careful reader might want but a first-pass reader doesn't need.

## Writing the abstract: lead with the net number

The most common mistake in a strategy write-up is leading with the gross Sharpe because it's the bigger number. SR-5's abstract should read something like this:

> SR-5 is a dollar-neutral, cross-sectional 5-day reversal strategy across the 11 sector SPDR ETFs, using Ridge regression and purged walk-forward validation on 2007-2025 daily data from Stooq.com. Gross Sharpe is 0.76; net of realistic transaction costs, Sharpe falls to 0.42, with net Sortino 0.58 and net Calmar 0.27. The strategy meaningfully outperformed SPY in all four historical stress windows tested, including the COVID crash. The main caveat: dollar-neutral construction does not guarantee market-neutral behavior in a panic — beta to SPY spiked from its normal ~0.04 to roughly 0.25 during COVID.

Notice what that abstract does: it states the net Sharpe before a reader can anchor on the gross number, and it puts the single most important risk caveat in the last sentence rather than hiding it in an appendix.

## The results table: gross and net, side by side, always

Never report a single blended number. Every metric that costs can touch gets a gross column and a net column, pulled directly from the work already done in Lessons 11 and 12:

```python
import pandas as pd

report = pd.DataFrame({
    "Gross": [5.2, 6.8, 0.76, 1.05, 0.58, -8.9],
    "Net":   [2.9, 6.9, 0.42, 0.58, 0.27, -10.6],
}, index=["CAGR (%)", "Ann. vol (%)", "Sharpe", "Sortino", "Calmar", "Max drawdown (%)"])
print(report)
```

```
                  Gross    Net
CAGR (%)           5.20   2.90
Ann. vol (%)       6.80   6.90
Sharpe             0.76   0.42
Sortino            1.05   0.58
Calmar             0.58   0.27
Max drawdown (%)  -8.90 -10.60
```

Pair that table immediately with the stress-test table from Lesson 12 — COVID (-6.1% vs. SPY's -33.9%), the Q4 2018 selloff (+1.8% vs. -19.4%), the 2022 bear market (-3.4% vs. -24.5%), and the August 2024 VIX spike (+0.9% vs. -6.0%) — since a reader evaluating risk cares as much about *how it behaved when things broke* as about the long-run average.

## Writing limitations honestly

A limitations section that lists nothing is a limitations section nobody trusts. SR-5's genuinely has several worth naming plainly: a sample period (2007-2025) that includes one true panic, not several, so tail behavior is estimated from thin evidence; a point-in-time universe that grows from 9 to 11 names, meaning the earliest years rest on fewer sectors than the later ones; a capacity ceiling around $150M before market impact erodes net Sharpe below 0.2 (Lesson 11); and a beta that is usually near zero but is demonstrably not always near zero. None of these invalidate the research — naming them is what makes the research credible.

## Key terms

| Term | Meaning |
|---|---|
| Performance report | The written document turning backtest results into a decision-ready summary, covering methodology, results, risk, and limitations |
| Abstract | The report's opening summary — the hypothesis, method, headline net result, and the key caveat, in a few sentences |
| Gross vs. net reporting | Always presenting pre-cost and post-cost numbers side by side rather than a single blended figure |
| Limitations section | An honest accounting of what the research didn't test and what could make the result wrong |

## Recap

The performance report turns 12 lessons of research into one document built for three readers — a PM, a risk manager, and future you — following a fixed structure: abstract, data and methodology, results, risk analysis, limitations, appendix. The abstract leads with the net Sharpe of 0.42, not the gross 0.76, and the results table always shows gross and net side by side. Next, Lesson 14 prepares you to defend this report in the room, against the hardest questions a skeptical audience will ask.
