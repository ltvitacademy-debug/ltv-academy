# SARSA

This is lesson 12 of the Reinforcement Learning & RL for LLMs course, Chapter 2, Classic RL Algorithms. Lesson 11 covered Q-learning, the canonical off-policy TD control algorithm. SARSA is its on-policy sibling — the update rule is almost identical, but a single substitution changes everything about what the algorithm actually learns.

## What you'll learn

- The SARSA update rule, and where its name comes from
- Exactly how SARSA's update differs from Q-learning's, line by line
- Why SARSA is on-policy, and what that means for behavior during training
- The practical difference this makes in a risky environment (the "cliff" intuition)

## Where the name comes from

SARSA is named after the five quantities its update needs, in order: **S**tate, **A**ction, **R**eward, **S**tate, **A**ction — that is, (S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1}). Every one of those five has to actually occur before the update can happen, including the next action A_{t+1}, which must actually be chosen (not just hypothesized) before the update runs.

## The SARSA update

```
Q(S_t,A_t) ← Q(S_t,A_t) + α [ R_{t+1} + γQ(S_{t+1},A_{t+1}) − Q(S_t,A_t) ]
```

Compare directly to Q-learning's update from Lesson 11:

```
Q-learning: Q(S_t,A_t) ← Q(S_t,A_t) + α [ R_{t+1} + γ max_a Q(S_{t+1},a)      − Q(S_t,A_t) ]
SARSA:      Q(S_t,A_t) ← Q(S_t,A_t) + α [ R_{t+1} + γ Q(S_{t+1}, A_{t+1})    − Q(S_t,A_t) ]
```

The only difference is the term in bold position: Q-learning uses `max_a Q(S_{t+1},a)`, the best possible next action's value. SARSA uses `Q(S_{t+1},A_{t+1})`, the value of whatever action A_{t+1} the agent's own behavior policy (e.g. epsilon-greedy) actually selects next. That one substitution is the entire difference between an off-policy and an on-policy TD control method.

## Why this makes SARSA on-policy

Because SARSA's target plugs in the actual next action chosen by the same policy currently being followed (including its exploration), SARSA is learning the value of the policy it is actually executing, exploration and all — not the value of some separate, purely greedy target policy. This matches the on-policy definition from Lesson 7 exactly: behavior policy and target policy are the same policy.

## A tabular SARSA loop

```python
import numpy as np
import gymnasium as gym

env = gym.make("CliffWalking-v0")
n_states, n_actions = env.observation_space.n, env.action_space.n
Q = np.zeros((n_states, n_actions))
alpha, gamma, epsilon = 0.1, 0.99, 0.1

def epsilon_greedy(state):
    if np.random.random() < epsilon:
        return env.action_space.sample()
    return int(np.argmax(Q[state]))

for episode in range(5000):
    state, info = env.reset()
    action = epsilon_greedy(state)
    terminated = truncated = False
    while not (terminated or truncated):
        next_state, reward, terminated, truncated, info = env.step(action)
        next_action = epsilon_greedy(next_state)             # chosen BEFORE the update
        td_target = reward + gamma * Q[next_state, next_action]
        Q[state, action] += alpha * (td_target - Q[state, action])
        state, action = next_state, next_action
env.close()
```

Notice `next_action` is sampled with the same `epsilon_greedy` function used everywhere else, *before* it's plugged into the update — this is what Q-learning's loop never does; Q-learning's update only ever looks at `np.max(Q[next_state])`.

## Why the difference matters: the cliff intuition

The classic illustration is `CliffWalking`: a grid with a cliff running along one edge, where stepping off gives a large negative reward. SARSA, because it accounts for its own ongoing exploration (including the chance of accidentally stepping into the cliff while exploring), tends to learn a **safer** path that stays further from the cliff edge. Q-learning, because its target always assumes the greedy, non-exploring action will be taken, tends to learn the **objectively shortest** path right along the cliff edge, even though the actual epsilon-greedy behavior occasionally stumbles over it during training. Neither is "wrong" — they're optimizing for different things: SARSA for the policy actually being run (including exploration risk), Q-learning for the policy that will eventually be run once exploration stops.

## Key terms

| Term | Meaning |
|---|---|
| SARSA | On-policy TD control; named for (S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1}) |
| SARSA update | Uses Q(S_{t+1}, A_{t+1}) — the actual next action taken — as the target |
| On-policy control | Learning the value of the policy actually being followed, exploration included |

## Recap

SARSA's update is identical to Q-learning's except for one substitution: it uses the actual next action taken, Q(S_{t+1},A_{t+1}), instead of max_a Q(S_{t+1},a) — making it on-policy, and in practice more cautious around risk encountered during exploration. Next up, Lesson 13: tabular RL's limitations, which sets up why Chapter 2 closes with function approximation.
