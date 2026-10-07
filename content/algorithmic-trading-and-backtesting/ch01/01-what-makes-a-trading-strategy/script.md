# Script — What Makes a Trading Strategy

## Segment 1 (title)

Welcome to Algorithmic Trading and Backtesting, step seven of the Quantitative Developer path. This course is about turning a market idea into a systematic, testable set of rules — and being honest about whether the edge is real. We start with the most basic question: what actually counts as a strategy?

## Segment 2 (steps)

An idea like "stocks that go up tend to keep going up" isn't a strategy — nobody could run it as written. A real strategy nails down five things: the universe of instruments it trades, the signal that forms a view, how much risk each signal gets, the risk rules that cap the damage when you're wrong, and the execution that turns all of that into a real order.

## Segment 3 (code)

Concretely, a systematic strategy is just a deterministic function: given the same historical data up to a point in time, it always returns the same target position. That determinism is exactly what makes it backtestable, and it's what separates a systematic approach from a discretionary trader making a judgment call.

## Segment 4 (steps)

That's the shape of this whole course. Chapters one and two build signals and combine them into a portfolio. Chapter three turns that into a real backtesting engine. Chapter four — arguably the most important chapter here — is entirely about the ways a backtest quietly lies to you. Chapter five measures performance honestly, and chapters six and seven take you from backtest to something closer to live trading.

## Segment 5 (outro)

One honest note before you go further: most ideas don't survive a rigorous test, and that's the normal state of this field, not a failure on your part. Up next, lesson two: alpha, beta, and edge — the vocabulary for what a strategy's returns are actually made of.
