# Script — The REINFORCE Algorithm

## Segment 1 (title)

Lesson 18 left the policy gradient theorem as an abstract expression. This lesson turns it into the simplest algorithm you can actually run: REINFORCE.

## Segment 2 (code)

REINFORCE's answer to "how do I get Q of s, a" is the simplest possible one: play a full episode and use the actual return from each timestep onward, called the return-to-go, as a sample estimate. The update then plugs that return straight into the policy gradient theorem, nudging theta in the direction of higher log-probability, scaled by how good that sampled trajectory actually turned out.

## Segment 3 (code)

Computing that return-to-go naively is quadratic in episode length, but there's a one-pass trick: walk backward through the rewards, since the return at time t equals the reward at t plus gamma times the return at t plus one. That turns it into a simple linear-time loop.

## Segment 4 (steps)

The catch is variance. G-t is a single sample from one particular trajectory, and two episodes that start identically can end up with very different returns just from how the random action sampling played out later. That noise is real, and it's exactly what motivates everything coming next in this chapter.

## Segment 5 (outro)

REINFORCE is correct in expectation but noisy in practice. Up next, lesson 20, actor-critic methods, which bring in a learned critic to cut that variance down.
