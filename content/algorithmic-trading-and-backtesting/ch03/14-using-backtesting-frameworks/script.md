# Script — Using Backtesting Frameworks

## Segment 1 (title)

Hand-rolling a backtester, like we just did, is the right way to learn the mechanics. It's rarely the right way to run production research, because you'd reinvent commissions, slippage, and order handling every time. Let's look at the real open-source frameworks people actually use.

## Segment 2 (code)

backtesting.py is a lightweight, event-driven library built around a Strategy class. Its next method runs once per bar, exactly like the loop we hand-built — crossover logic triggers a buy or sell, and a commission argument gets applied consistently to every single fill, which is exactly the kind of detail that's easy to apply inconsistently by hand.

## Segment 3 (code)

vectorbt takes the opposite approach — vectorized, like our pandas version, but accelerated with Numba so it runs near C speed. Entry and exit signals are boolean arrays, fees and slippage are explicit parameters, and its real strength is sweeping an entire grid of parameter combinations in one vectorized call instead of testing them one at a time.

## Segment 4 (steps)

A third category, zipline-style frameworks, adds institutional conventions: real trading calendars, a pipeline API for computing factors across a whole universe at once, and swappable slippage and commission models. None of these three remove the responsibility from chapter four — realistic costs and overfitting checks are still entirely on you. They remove boilerplate, not judgment.

## Segment 5 (outro)

Pick the tool that matches the job — quick prototyping, large sweeps, or institutional multi-asset realism. Whichever one you choose, you'll still need to supply your own commission schedule, your own slippage model, and your own out-of-sample discipline; the framework just stops you from having to re-implement the bookkeeping every time. Next, lesson 15: the data itself, and the formats and gotchas that feed any of these engines.
