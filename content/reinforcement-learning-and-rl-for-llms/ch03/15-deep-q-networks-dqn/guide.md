# Deep Q-Networks (DQN)

This is lesson 15 of the Reinforcement Learning & RL for LLMs course, and the opening lesson of Chapter 3, Deep RL. Chapter 2 ended with function approximation: swapping a Q-table for a parameterized function because real state spaces are too large to enumerate. This lesson takes that idea and makes it concrete with the algorithm that started the deep RL era — the Deep Q-Network, introduced by Mnih et al. in 2015 to play Atari games directly from pixels.

## What you'll learn

- Why tabular Q-learning breaks down once the state space is large or continuous
- How a neural network stands in for the Q-table as Q(s, a; θ)
- The DQN loss function and how it reuses the Q-learning TD target
- Why naively training a neural net on raw RL experience is unstable (setting up Lesson 16)

## From a table to a network

Q-learning's update rule, from Chapter 2, nudges a table entry Q(s, a) toward a target built from the observed reward and the best next-state value. That works when every (s, a) pair can get its own row. It falls apart for an Atari frame (a high-dimensional pixel grid) or a continuous robotics state — there's no table big enough, and nothing is shared between similar states.

DQN replaces the table with a neural network Q(s, a; θ) that takes a state as input and outputs one Q-value per action. Similar states naturally produce similar outputs because they share the same network weights, so the agent generalizes to states it has never exactly seen before.

```python
import torch
import torch.nn as nn

class QNetwork(nn.Module):
    def __init__(self, obs_dim, n_actions):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, 128), nn.ReLU(),
            nn.Linear(128, 128), nn.ReLU(),
            nn.Linear(128, n_actions),
        )

    def forward(self, x):
        return self.net(x)  # one Q-value per action, for every state in the batch
```

## The DQN loss

The network is trained to make its prediction match a TD target, exactly like tabular Q-learning, except now it's a regression problem solved with gradient descent instead of a table update:

```
L(θ) = E[ (r + γ · max_a' Q(s', a'; θ⁻) − Q(s, a; θ))² ]
```

`θ` are the online network's weights, and `θ⁻` are the weights of a second, periodically-synced **target network** — a detail this lesson introduces and Lesson 16 explains in full. In code, for a batch of transitions sampled from stored experience:

```python
q_sa = q_network(states).gather(1, actions)           # Q(s, a) for the actions actually taken
with torch.no_grad():
    max_q_next = q_target(next_states).max(dim=1, keepdim=True).values
    y = rewards + gamma * (1 - dones) * max_q_next     # TD target
loss = nn.functional.mse_loss(q_sa, y)
```

`(1 - dones)` zeroes out the future-value term at episode-terminating transitions, since there is no next state to bootstrap from.

## Why this isn't the whole story yet

Training a neural network directly on the stream of experience an agent generates — one correlated transition after another, with a target that shifts every time θ changes — is notoriously unstable. The original DQN paper's real contribution wasn't "put a neural net where the table was"; it was two specific fixes for that instability: a replay buffer that breaks the correlation between consecutive updates, and a target network that holds θ⁻ fixed for a while so the regression target doesn't move under the network's feet while it's trying to hit it. Both are the subject of Lesson 16.

## Key terms

| Term | Meaning |
|---|---|
| Q-network | A neural network Q(s, a; θ) that approximates the Q-table |
| Online network | The network weights θ actively being trained |
| Target network | A second set of weights θ⁻, synced periodically, used to compute stable TD targets |
| TD target | r + γ · max_a' Q(s', a'; θ⁻), the value the online network regresses toward |

## Recap

DQN swaps Q-learning's table for a neural network and trains it with a familiar-looking TD target, turning value iteration into a supervised regression problem solved by gradient descent. That swap alone is unstable — Lesson 16 covers the replay buffer and target network that make it work in practice.
