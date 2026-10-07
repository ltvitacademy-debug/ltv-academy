# Look-Ahead Bias & Survivorship Bias

Lessons 16-17 covered frictions — costs that are real but honestly modelable. This lesson covers something more dangerous: two ways a backtest can be structurally wrong before any cost model even enters the picture, because the simulation itself, or the universe of data it runs on, secretly contains information that couldn't have existed at the time. Both are well-known, checkable pitfalls, and both are far more common in beginner (and even professional) backtests than people expect.

## What you'll learn

- A rigorous definition of look-ahead bias, beyond the `.shift(1)` fix from Lesson 11
- The less obvious forms look-ahead bias takes: parameter selection, universe construction, restated data
- A rigorous definition of survivorship bias and exactly why it inflates backtested returns
- How to build (or recognize) a point-in-time universe that avoids survivorship bias
- Why both biases push in the same direction: they make backtests look better than reality

## Look-ahead bias, beyond the obvious case

Lesson 11 showed the classic case: trading on today's close using a signal computed from today's close. That's the easy version to catch. Look-ahead bias also shows up in subtler forms that don't involve a single missing `.shift()`:

- **Parameter selection using the full dataset.** If you tune a strategy's parameters (lookback windows, thresholds) by testing many combinations against the *entire* historical dataset and picking the best one, you have used information from the whole period — including the "future" relative to any earlier point in that period — to make a decision. The backtest's reported performance on that same full dataset is no longer an honest out-of-sample test; it's partially measuring how well you fit noise. (Lesson 19 goes deep on this.)
- **Restated or corrected data.** Many data fields get revised after the fact — GDP figures, some fundamentals, even some price data due to vendor corrections. If your historical dataset contains the *corrected* version everywhere, including on dates before the correction happened, your backtest is trading on information that didn't exist yet at that historical date.
- **Universe membership determined by a future event.** A classic subtle one: building today's universe of "large-cap tech stocks" and applying that exact list to every historical date in the backtest. A stock that grew into large-cap status in 2023 wouldn't have been in that universe in 2015 — testing it as if it had been is a universe-construction form of look-ahead bias (this overlaps heavily with survivorship bias below).

The common thread: at every single simulated decision point, ask "would I, standing at this exact moment in history with only the data available up to this moment, have actually known this?" If the answer is no, the backtest is cheating.

## Survivorship bias: a universe that only contains winners

**Survivorship bias** occurs when a backtest's universe of tradable instruments is built from companies, funds, or instruments that still exist *today*, applied retroactively to history — silently excluding everything that went bankrupt, got delisted, was acquired, or simply failed along the way.

This matters enormously because the instruments that disappear are, on average, the worst performers — nobody gets delisted for being too successful (acquisitions are an exception worth modeling separately, since being acquired is often a *positive* outcome for shareholders). A universe built from "the S&P 500's current constituents" and tested back to 2005 silently removes every company that was in the S&P 500 in 2005 but got removed for underperforming, bankruptcy, or acquisition since then — systematically inflating the backtested average return of *any* strategy that trades that universe, including a simple buy-and-hold.

```python
# WRONG: builds the universe from TODAY's index membership and
# applies it to the entire historical backtest period.
current_sp500 = get_current_index_members("SP500")
universe_2010 = current_sp500     # survivorship bias: omits 2010's
                                    # members that have since been
                                    # delisted, acquired, or dropped

# RIGHT: use point-in-time index membership, which changes
# over the backtest period as constituents are actually added/removed.
def get_universe(date):
    return get_point_in_time_index_members("SP500", as_of=date)

for date in backtest_dates:
    todays_universe = get_universe(date)   # reflects history honestly
```

A correct backtest needs **point-in-time universe membership**: a record of which instruments were actually tradable members of the relevant index or universe *as of each historical date*, including the ones that have since disappeared. This data is harder to obtain than current membership lists (many free data sources only give you today's list), but it is essential for any backtest making claims about a broad universe rather than a single, still-existing instrument.

## Why both biases push in the same direction

Look-ahead bias and survivorship bias are different mechanisms, but they share a property worth internalizing: both make a backtest's reported performance look *better* than what a trader actually experiencing history in real time could have achieved. This isn't a coincidence — it's a structural consequence of how both biases work: look-ahead bias gives the strategy information from the future, and survivorship bias gives the universe foreknowledge of which instruments would still be viable later. A backtester who is only ever on guard against biases that make results look *worse* is missing the much more common and more dangerous failure mode.

## Key terms

| Term | Meaning |
|---|---|
| Look-ahead bias | Using information in a simulated decision that would not actually have been available at that point in time |
| Survivorship bias | Building a backtest's universe only from instruments that still exist today, silently excluding historical failures |
| Point-in-time universe | A record of which instruments were actually tradable members of a universe as of each historical date |
| Delisting | An instrument's removal from an exchange or index, often due to bankruptcy, acquisition, or failure to meet listing standards |

## Recap

Both look-ahead and survivorship bias make a backtest look better than reality by secretly importing future knowledge — either into a single decision's inputs, or into the very universe of instruments being tested. Fixing both requires discipline: shift signals, use point-in-time data for anything that gets revised, and build universes from point-in-time membership, not today's survivors. Next, Lesson 19 covers the closely related and even more insidious problem of data snooping and overfitting — what happens when you test so many variations that you find a "signal" in pure noise.
