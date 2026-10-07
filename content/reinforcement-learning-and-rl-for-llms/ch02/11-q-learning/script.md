# Script — Q-Learning

## Segment 1 (title)

This is lesson eleven, Chapter Two, Classic RL Algorithms. Lesson ten gave you TD zero for estimating V. Q-learning takes that exact same idea and applies it to the action-value function, with one twist that makes it off-policy.

## Segment 2 (code)

The update looks structurally identical to TD zero — a target minus the current estimate, scaled by a learning rate. But the target here is the reward plus gamma times the max over all possible next actions, not the value of whatever action actually gets taken next.

## Segment 3 (steps)

That max is everything. The agent might actually explore using epsilon-greedy while collecting data, but the update always targets the best possible action's value, as if it were about to act greedily. Q-learning is estimating Q star directly, regardless of how it's currently behaving — which is exactly why it can converge to the optimal policy even while exploring randomly a good fraction of the time.

## Segment 4 (code)

Here's what that looks like in a real training loop against Gymnasium. Notice the action actually taken comes from an epsilon-greedy choice, but the update's max over Q at the next state never looks at which action was actually sampled. That gap between behavior and target is the off-policy property made concrete.

## Segment 5 (outro)

Q-learning converges to Q star as long as every state-action pair keeps getting visited and the learning rate is handled properly. Next up, lesson twelve: SARSA, Q-learning's on-policy sibling, which swaps that max for whatever action is actually taken next.
