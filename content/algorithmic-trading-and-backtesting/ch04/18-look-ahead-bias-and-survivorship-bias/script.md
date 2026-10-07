# Script — Look-Ahead Bias & Survivorship Bias

## Segment 1 (title)

The last two lessons covered frictions — real costs you can honestly model. This lesson covers something more dangerous: two ways a backtest can be structurally wrong before any cost model even enters the picture, because the simulation secretly contains information that couldn't have existed yet.

## Segment 2 (steps)

The classic look-ahead case — trading on today's close using today's signal — is the easy one to catch. Subtler versions hide in plain sight: tuning parameters by testing against the entire historical dataset and picking the best result, letting restated or corrected data sit in history before the correction actually happened, or building today's universe of large-cap names and applying that exact list backward to years before some of those names were even large-cap.

## Segment 3 (steps)

Survivorship bias is a close cousin. It happens when your universe of tradable instruments is built from what still exists today and applied retroactively to history — silently excluding everything that went bankrupt, got delisted, or failed along the way. Since the instruments that disappear are, on average, the worst performers, this systematically inflates the backtested return of almost any strategy trading that universe.

## Segment 4 (code)

The fix for survivorship bias is point-in-time universe membership — a record of who was actually tradable as of each historical date, not just who's still standing today. It's harder to source than a current member list, but it's essential for any backtest making claims about a broad universe.

## Segment 5 (outro)

Both biases share the same signature: they make a backtest look better than what a trader living through history in real time could have actually achieved. Watch for that direction, not just for bugs that make results look worse. Next, lesson 19: data snooping and overfitting, what happens when you test so many variations you find a signal in pure noise.
