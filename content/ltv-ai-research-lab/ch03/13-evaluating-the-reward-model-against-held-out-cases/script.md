# Script — Evaluating the Reward Model Against Held-Out Cases

## Segment 1 (title)

A trained reward model needs the same kind of scrutiny Project 1's agent got in Lesson 8: a held-out check, and then a harder, deliberately adversarial check that goes looking for a specific way the model might be fooled. This lesson runs both, and the second one finds something real.

## Segment 2 (code)

Out of the roughly two hundred sixty labeled pairs, forty two were held out from training entirely. On those, the reward model scored the chosen candidate higher than the rejected candidate eighty three percent of the time, a real signal that it learned something generalizable, not just the training pairs themselves.

## Segment 3 (steps)

An accuracy number alone doesn't say how the model is deciding. So this lesson builds a second, adversarial set of forty pairs, constructed so that surface polish and real information preservation disagree on purpose: the rejected candidate looks tidier, consistent capitalization, clean formatting, but has silently dropped something real, like a phone extension or a suite number, that the chosen candidate kept.

## Segment 4 (code)

On the regular held-out set the model scores eighty three percent. On this adversarial subset, it drops to forty eight percent, close to a coin flip. Close to half the time, the model scores the polished but information losing candidate higher than the one that actually preserved the real data — a genuine surface polish bias, not a labeling error in the training data.

## Segment 5 (outro)

The reward model generalizes reasonably well on ordinary held-out pairs, but a deliberately adversarial check reveals a sharp surface polish bias: it sometimes favors tidy formatting over real information preservation, even though the rubric it was trained on ranks information preservation first. Up next, Lesson 14: writing Project 2 up as a claim, method, result, and limitation.
