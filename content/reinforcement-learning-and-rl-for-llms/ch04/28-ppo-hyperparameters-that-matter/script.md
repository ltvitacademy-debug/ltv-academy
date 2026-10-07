# Script — PPO Hyperparameters That Matter

## Segment 1 (title)

Last lesson's metrics point to a symptom. This lesson covers the specific hyperparameters most likely to be the actual cause, with sensible starting values for each.

## Segment 2 (steps)

Learning rate is usually the highest-leverage knob — too high overshoots even with clipping in place, too low just wastes time. Clip range rarely needs tuning away from 0.2; if clip_fraction looks off, fix the learning rate first. Rollout length trades off advantage-estimate variance against policy staleness, and epoch count trades sample efficiency against overfitting to one batch.

## Segment 3 (steps)

Gamma at point nine nine, GAE's lambda at point nine five, and a small entropy coefficient are all standard defaults that rarely need touching — adjust them only in direct response to a specific symptom from last lesson's metrics, not as a first guess.

## Segment 4 (code)

Put together, a sensible starting configuration looks almost exactly like Stable-Baselines3's own defaults. That's not a coincidence — these values were tuned across a wide range of benchmark tasks, so start here and adjust only the one hyperparameter your metrics actually point to.

## Segment 5 (outro)

That closes Chapter 4 and the classic policy-optimization core of this course. Up next, Chapter 5 turns to the environments and infrastructure RL training actually runs on, starting with the Gymnasium API.
