# Script — Feature Engineering

## Segment 1 (title)

Phase one built the statistical case for sector reversal. Phase two turns that hypothesis into something a model can actually learn from: eight engineered features, a precisely defined target, and the plumbing that keeps the whole pipeline honest.

## Segment 2 (steps)

Every trading day, for each of the eleven sectors, we compute eight features using only data known at that day's close. ret_5d_z and ret_21d capture short-term reversal and one-month momentum. rv_20d, rsi_14, and vol_ratio capture realized volatility, momentum exhaustion, and unusual volume. corr_spy_60d and vix_regime capture how tied to the market and how fearful the regime is, and dispersion captures how spread out the sectors' returns are that day. The target is the forward five-day return, expressed as a cross-sectional rank.

## Segment 3 (code)

Every one of those features gets z-scored cross-sectionally — across the eleven sectors, on that single day — not against its own history. cross_sectional_z subtracts that day's mean across sectors and divides by that day's standard deviation. ret_5d_z, rv_20d, and rsi_14 are all built this way. The design choice matters: the model never sees "volatility is 18 percent today," it sees "Energy is one standard deviation more volatile than the other ten sectors right now" — a relative signal that holds up whether the regime is 2008 or 2017.

## Segment 4 (steps)

The single easiest way to fake a good backtest is leakage: letting the model see, even accidentally, information it couldn't have known at decision time. Because the target is a forward five-day return, a feature window that runs right up against the target window can leak through overlapping days. We fix this with an embargo — a five-day gap purged out between where the feature window ends and the target window begins. It looks like a small detail here, but Lesson 8's purged walk-forward validation depends entirely on this embargo being right.

## Segment 5 (outro)

Eight features, one target, one embargo. Next, Lesson 8: building the Ridge model and validating it honestly against a naive baseline and a Random Forest benchmark.
