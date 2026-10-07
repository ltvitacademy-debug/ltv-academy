# Q-Learning

This is lesson 11 of the Reinforcement Learning & RL for LLMs course, Chapter 2, Classic RL Algorithms. Lesson 10 introduced TD(0) for estimating V under a fixed policy. Q-learning takes that same TD idea and applies it directly to the action-value function Q, with one crucial twist that makes it off-policy and lets it learn the optimal policy directly, without ever needing to evaluate a fixed policy first.

## What you'll learn

- The Q-learning update rule, and exactly how it differs from TD(0) for V
- Why Q-learning is off-policy (tying back to Lesson 7)
- A full tabular Q-learning training loop against Gymnasium
- Why Q-learning converges to Q*, the optimal action-value function

## The Q-learning update

Q-learning maintains a table of Q(s,a) estimates for every state-action pair, and updates it after every single step using:

```
Q(S_t,A_t) ← Q(S_t,A_t) + α [ R_{t+1} + γ max_a Q(S_{t+1},a) − Q(S_t,A_t) ]
```

Compare this to TD(0)'s update for V: the structure is identical — a TD target minus the current estimate, scaled by α — but the target here is `R_{t+1} + γ max_a Q(S_{t+1},a)`, using the **best possible** action-value at the next state, not the value of whatever action is actually taken next.

## Why this makes Q-learning off-policy

As covered in Lesson 7, this `max_a` is exactly what makes Q-learning off-policy: the agent might actually take its next action using an exploratory epsilon-greedy behavior policy, but the *update* always targets the value of the best action available, as if the agent were about to act greedily. Q-learning is directly estimating Q* — the optimal action-value function from the Bellman optimality equation in Lesson 4 — regardless of how the agent is currently behaving. This is why Q-learning can learn the optimal policy even while exploring randomly a good fraction of the time.

## A full tabular Q-learning loop

```python
import numpy as np
import gymnasium as gym

env = gym.make("FrozenLake-v1", is_slippery=True)
n_states, n_actions = env.observation_space.n, env.action_space.n
Q = np.zeros((n_states, n_actions))

alpha, gamma = 0.1, 0.99
epsilon, epsilon_min, decay = 1.0, 0.01, 0.995
n_episodes = 5000

for episode in range(n_episodes):
    state, info = env.reset()
    terminated = truncated = False
    while not (terminated or truncated):
        if np.random.random() < epsilon:
            action = env.action_space.sample()          # explore
        else:
            action = int(np.argmax(Q[state]))            # exploit

        next_state, reward, terminated, truncated, info = env.step(action)

        best_next = np.max(Q[next_state])
        td_target = reward + gamma * best_next
        Q[state, action] += alpha * (td_target - Q[state, action])

        state = next_state
    epsilon = max(epsilon_min, epsilon * decay)

env.close()
```

Notice the epsilon-greedy behavior policy (lines choosing `action`) is entirely separate from the update target (`best_next = np.max(Q[next_state])`), which never looks at what action was actually sampled by epsilon-greedy. That separation is the off-policy property made concrete in code.

## Why Q-learning converges to Q*

Under standard conditions — every state-action pair is visited infinitely often (guaranteed in the long run by epsilon-greedy with a decaying but never-zero epsilon), and the learning rate α is decayed appropriately over time — Q-learning is proven to converge to the true Q*. Once Q has converged, the optimal policy is immediate: π*(s) = argmax_a Q(s,a), exactly the operation used to pick the "exploit" branch above.

## Key terms

| Term | Meaning |
|---|---|
| Q-learning update | Q(S_t,A_t) ← Q(S_t,A_t) + α[R_{t+1} + γ max_a Q(S_{t+1},a) − Q(S_t,A_t)] |
| Off-policy | The update target uses max_a Q, not the action actually taken next |
| Q* | The optimal action-value function Q-learning converges to |
| Tabular Q-learning | Representing Q as an explicit table indexed by (state, action) |

## Recap

Q-learning applies TD's one-step update directly to Q, using max_a Q(S_{t+1},a) as the target instead of the action actually taken — making it off-policy and letting it converge to Q* while exploring. Next up, Lesson 12: SARSA, Q-learning's on-policy sibling, which swaps that max for the actual next action taken.
