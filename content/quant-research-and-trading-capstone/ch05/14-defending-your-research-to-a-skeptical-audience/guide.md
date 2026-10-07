# Defending Your Research to a Skeptical Audience

A written report is a one-way conversation. The room is not. Lesson 13 gave you the document; this lesson prepares you for the questions a skeptical portfolio manager, risk officer, or peer researcher will actually ask when they read it — and the honest answers SR-5's own methodology already earns you.

## What you'll learn

- Why skepticism from the room is a feature of good research culture, not an attack
- The six hardest questions SR-5 will face, and how to answer each one directly
- How to answer "why should I believe this isn't overfit?" without getting defensive
- When the honest answer is "I don't know" or "that's a real limitation" — and why saying so builds more credibility than it costs

## Skepticism is the job, not an attack

Every systematic strategy that reaches a portfolio manager's desk has survived someone trying to kill it first. That isn't hostility — it's the actual job of risk management and peer review, and it's the same instinct that made purged walk-forward validation (Lesson 8) and honest cost modeling (Lesson 11) worth doing in the first place. Walking into the room expecting hard questions, with answers already prepared, turns a defense into a conversation. Walking in expecting applause turns the first hard question into a crisis.

## Question 1: "How do I know this isn't overfit to 18 years of data?"

This is the question every systematic strategy faces first, and SR-5 has a real answer: purged walk-forward cross-validation (Lesson 8) trains only on data available at each point in time and purges the gap around each test fold to prevent leakage from overlapping labels. The reported Sharpe of 0.76 gross / 0.42 net is an **out-of-sample** number, not a number produced by fitting on the full history and reporting the fit. The honest caveat to add unprompted: 18 years is still one historical path, and a strategy validated out-of-sample on one path can still fail on the next one — out-of-sample testing reduces overfitting risk, it doesn't eliminate the risk that the regime itself changes.

## Question 2: "You tested a lot of features and model choices — doesn't that multiple-testing itself overfit the result?"

Yes, honestly — this is a real risk, and the right answer acknowledges it rather than denying it. Every hyperparameter search and feature choice made during Chapters 2-3 is itself a form of multiple testing against the same data. The mitigations worth naming: the hypothesis (short-term sector reversal, conditioned on VIX regime) was stated before extensive tuning, not reverse-engineered from whatever happened to backtest well, and the walk-forward scheme re-validates on fresh folds rather than reusing the same test set repeatedly. But say plainly that this doesn't fully solve the problem — it reduces it.

## Question 3: "Your book is dollar-neutral — so why did beta spike to 0.25 during COVID?"

This is the correlation-to-one question from Lesson 12, and it should never be minimized. Dollar-neutral construction reduces net market exposure *on average*, not in every regime — when every sector sells off together in a panic, the long leg and short leg stop moving independently, and net exposure rises. The honest framing: SR-5 still outperformed SPY by a wide margin in that exact window (-6.1% vs. -33.9%), but the beta spike is real evidence that "dollar-neutral" is not a synonym for "crisis-proof."

## Question 4: "Turnover is 44x a year — what happens if spreads widen or liquidity dries up?"

Lesson 11's cost model assumes a 5%-of-ADV participation cap and spreads of roughly 2-3bps. In a genuine liquidity crunch, both of those assumptions get worse at the same time the strategy might want to trade more — which is exactly the kind of second-order risk a static backtest cannot fully capture. The honest answer names the capacity estimate (~$150M before net Sharpe drops below 0.2) and states clearly that it's calibrated to *normal* liquidity conditions, not stressed ones.

## Question 5: "What would make you stop trading this?"

A skeptical audience respects a researcher who has already thought about the kill criteria, rather than one who sounds like they'll defend the strategy forever. Reasonable answers: a sustained live Sharpe materially below the net backtest figure of 0.42 over a long enough sample to be meaningful, a structural change to the sector-ETF universe (a twelfth SPDR, a major reconstitution), or evidence that the VIX-conditioning relationship underlying the signal has broken down.

## Question 6: "Why should we trust Stooq data over a paid vendor feed?"

Say directly that Stooq is a free public data source used here because this is a research exercise, not a production pipeline — and that a live deployment would warrant revalidating the core result against a paid, exchange-sourced feed before committing real capital. Pretending free data is equivalent to institutional-grade data erodes trust; naming the gap builds it.

## Key terms

| Term | Meaning |
|---|---|
| Multiple testing | The risk that trying many features, models, or parameters against the same data inflates apparent performance by chance |
| Kill criteria | The pre-defined conditions under which a live strategy would be shut down or re-researched |
| Overfitting | A model fitting the noise in historical data rather than a real, persistent pattern |

## Recap

A skeptical audience will ask about overfitting, multiple testing, the COVID beta spike, turnover and liquidity, kill criteria, and data quality — and SR-5's own methodology (purged walk-forward validation, honest cost modeling, a stated hypothesis) already supplies real, non-defensive answers to each one. The strongest response to a hard question is often naming the limitation yourself before being asked. Next, Lesson 15 turns the report and these prepared answers into an actual presentation.
