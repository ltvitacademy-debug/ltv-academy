# Script — Generalized Advantage Estimation (GAE)

## Segment 1 (title)

PPO's objective needs an advantage estimate, and last lesson didn't say exactly how to get one. This lesson covers the method almost every modern implementation uses: Generalized Advantage Estimation.

## Segment 2 (steps)

The one-step TD error is low variance but biased by the critic's current errors. The full Monte Carlo return is unbiased but noisy, since it drags in randomness from every future step. GAE's insight is that these are just two ends of one spectrum, and there's no reason to pick an extreme.

## Segment 3 (code)

GAE computes the one-step TD error at every timestep, then sums them with exponentially decaying weights looking forward, controlled by a new parameter lambda. Lambda zero collapses it to the pure one-step estimate. Lambda one recovers the full Monte Carlo advantage. Something in between, often point nine five, blends many estimates together for the best of both.

## Segment 4 (code)

Just like the Monte Carlo returns from lesson 19, this sum has a backward recursive structure, so it's computed in one linear pass from the end of the rollout backward, with a mask that zeroes things out across episode boundaries.

## Segment 5 (outro)

With a concrete way to get A_t, every piece PPO needs is now on the table. Up next, lesson 26: assembling all of it — rollouts, GAE, the clipped objective — into one working PPO implementation from scratch.
