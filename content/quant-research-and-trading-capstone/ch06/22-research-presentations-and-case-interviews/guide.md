# Research Presentations & Case Interviews

Many final-round quant loops include two things that look different but are tested the same way: presenting a past research project, and reasoning live through an open-ended case you've never seen before. Lessons 14-15 already prepared you for the first. This lesson extends that same discipline to the second.

## What you'll learn

- How to reuse the SR-5 presentation structure from Lesson 15 in an actual onsite loop
- A five-step framework for open-ended quant case questions
- Two worked case examples, reasoned through step by step
- How to handle a take-home assignment under a real deadline

## Presenting SR-5 in an onsite loop

The structure from Lesson 15 transfers directly, with two adjustments for an interview setting rather than a classroom presentation. First, expect to be interrupted — interviewers in an onsite loop ask clarifying and challenging questions mid-presentation far more than a classroom audience does, so treat an interruption as the Lesson 14 skeptical-audience exercise arriving early, not as a derailment. Second, compress further: an interview slot for a project walkthrough is often 15-20 minutes including questions, so have a 3-minute version of the full 10-15 minute presentation ready — hypothesis, net result, one risk caveat, one limitation — in case you're asked to "just give me the short version first."

## A five-step framework for open-ended cases

Quant case questions are usually open-ended by design: "how would you think about building a strategy on X," "here's a dataset, what would you do with it," "critique this approach." A steady structure beats winging it:

1. **Clarify the objective.** What's actually being optimized — Sharpe, raw return, drawdown control, capacity? Don't assume.
2. **State assumptions explicitly.** Data available, universe, holding period — say them out loud rather than silently picking one.
3. **Propose a structure.** A rough hypothesis and approach, named plainly, before diving into details.
4. **Reason about what could go wrong.** Data issues, overfitting risk, cost sensitivity — the same instincts from Lesson 14.
5. **Conclude with a clear recommendation and its caveats.** Not a monologue that trails off — a specific stated answer.

## Worked case 1: "How would you research whether momentum works in crypto?"

**Clarify:** Ask what "works" means — risk-adjusted return after costs, presumably, not raw return. **Assumptions:** State the data you'd want (daily or intraday price history across a liquid set of coins, ideally several years, acknowledging crypto's short real history versus equities). **Structure:** Propose a cross-sectional or time-series momentum signal, parallel to SR-5's cross-sectional reversal design but with a momentum rather than reversal hypothesis — different lookback windows are worth testing given crypto's higher volatility. **What could go wrong:** Name the obvious risks unprompted — crypto's short history limits how many independent market regimes you can validate across, liquidity and borrow costs for shorting are a much bigger uncertainty than in SPDR ETFs, and 24/7 trading changes what "daily" even means operationally. **Recommendation:** A cautious one — worth researching with purged walk-forward validation exactly like SR-5, but flag the shorter history as a real limitation on how much to trust the result, not a footnote.

## Worked case 2: "A colleague shows you a strategy with a 3.0 backtested Sharpe. What's your reaction?"

**Clarify:** Ask immediately whether that's gross or net of costs, and over what sample period and universe. **Assumptions:** State that a Sharpe that high is unusual — SR-5's own gross Sharpe of 0.76 is a believable number for a diversified equity strategy, and a reported 3.0 is the kind of number that should trigger scrutiny before celebration, not after. **Structure:** Walk through the likely culprits in order of probability — look-ahead bias (does every feature use only information available at that point in time?), survivorship bias (Lesson 1's point-in-time universe problem), overfitting via extensive parameter search (Lesson 14's multiple-testing concern), and whether transaction costs were modeled realistically or not at all. **What could go wrong:** Name that even after ruling out the obvious bugs, an unusually clean backtest can still be a real but fragile effect that won't survive contact with live markets. **Recommendation:** Don't trust the number until each of those specific failure modes has been checked and ruled out — and say that the appropriately skeptical first reaction *is* the correct technical answer here, not a lack of enthusiasm.

## Handling a take-home assignment

A take-home trades time pressure for depth — and is graded as much on the write-up as on the result. Treat it like the performance report from Lesson 13: state the hypothesis and method clearly, show gross and net results side by side if costs are relevant, and include a limitations section rather than presenting the result as more finished than it is. Submitting on time with an honest limitations section reads far better than submitting late with a report that oversells a shaky result.

## Key terms

| Term | Meaning |
|---|---|
| Case interview | An open-ended problem reasoned through live, evaluated on structure and judgment rather than a single correct answer |
| Take-home assignment | A timed, self-directed research or coding task submitted and evaluated on both result and write-up quality |
| Look-ahead bias | Using information in a backtest that would not actually have been available at the time a decision was made |

## Recap

Presenting SR-5 in an onsite loop reuses Lesson 15's structure, compressed and ready to be interrupted. Open-ended case questions reward a steady five-step structure: clarify, state assumptions, propose a structure, reason about what could go wrong, and conclude with a clear recommendation — exactly the instinct behind treating a suspiciously high 3.0 Sharpe with scrutiny rather than excitement. A take-home is graded like the Lesson 13 report: honest, complete, submitted on time. Next, Lesson 23 covers compensation, offers, and choosing a firm.
