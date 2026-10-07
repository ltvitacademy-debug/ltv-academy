# Script — Debugging a PPO Training Run

## Segment 1 (title)

Last lesson built a working PPO implementation. This lesson covers what happens when a run like that one — or any PPO run, including the RLHF pipeline later in this course — goes wrong, and which logged numbers tell you why.

## Segment 2 (steps)

Four metrics matter most, read together. approx_kl is how much the policy actually changed this update. clip_fraction is what share of samples hit the clip boundary — near zero or near one both mean trouble. explained_variance says whether the critic is actually learning anything useful. And entropy tracks whether the policy is collapsing to deterministic behavior too early.

## Segment 3 (code)

Each common symptom points somewhere specific. Reward collapsing mid-training usually means the learning rate or clip range let a bad batch through. A frozen reward with clip_fraction near zero usually means the learning rate is too timid. Entropy crashing early means raising the entropy bonus or checking for a sign error in the advantage. And explained_variance stuck near zero means the critic isn't learning — check the GAE wiring.

## Segment 4 (steps)

Here's the striking part: almost none of these failures are bugs in the clipped objective itself. It's a short, well-tested formula. The real bugs live in the advantage estimate feeding into it, or in hyperparameters that just don't fit the problem.

## Segment 5 (outro)

Check the metrics before you re-derive the math — the bug is rarely there. Up next, lesson 28: which hyperparameters actually matter most, and how to set them before you need this checklist at all.
