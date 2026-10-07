# Actor-Critic Methods

This is lesson 20 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 3, Deep RL. Lesson 19 showed REINFORCE working but noisy — it has to wait for an entire episode to end before computing a single, high-variance Monte Carlo return. This lesson introduces actor-critic methods, which bring back a learned value function to produce much lower-variance, step-by-step updates, combining the best of the value-based and policy-based worlds.

## What you'll learn

- The actor/critic split: one network chooses actions, a second one judges them
- How the TD error serves as a fast, low-variance stand-in for Q^π(s, a)
- Why actor-critic methods can update after every step instead of waiting for an episode to end
- How to implement a minimal actor-critic training step in PyTorch

## Two networks, two jobs

An actor-critic method keeps REINFORCE's policy network — now called the **actor** — but adds a second network, the **critic**, that learns a state-value function V(s) the way Lessons 2 and 3 of this course's RL foundations chapter described. The critic's job is purely to judge how good states are; the actor's job is purely to choose actions. They train together, each using the other's output.

Instead of waiting for a full episode and using the noisy Monte Carlo return G_t, the actor can use the **TD error** — the same one-step bootstrapped quantity Temporal-Difference learning used back in Chapter 2 — as a fast, low-variance advantage estimate, available after every single step:

```
δ_t = r_t + γ·V(s_{t+1}) − V(s_t)
```

δ_t answers "was this transition better or worse than the critic expected?" — a positive δ_t means the actor should make that action more likely; a negative δ_t means less likely. The actor's update becomes:

```
θ ← θ + α · ∇_θ log π_θ(a_t|s_t) · δ_t
```

which is exactly REINFORCE's update rule, with G_t swapped for δ_t. The critic, meanwhile, trains its own parameters to minimize δ_t² — ordinary TD learning, just now with a neural network instead of a table.

## A minimal actor-critic step

```python
import torch
import torch.nn as nn
from torch.distributions import Categorical

# actor outputs an action distribution; critic outputs a single V(s) scalar
actor = PolicyNetwork(obs_dim, n_actions)
critic = nn.Sequential(nn.Linear(obs_dim, 128), nn.ReLU(), nn.Linear(128, 1))

actor_optim = torch.optim.Adam(actor.parameters(), lr=3e-4)
critic_optim = torch.optim.Adam(critic.parameters(), lr=1e-3)

state_t = torch.as_tensor(state, dtype=torch.float32)
dist = actor(state_t)
action = dist.sample()
log_prob = dist.log_prob(action)

next_state, reward, terminated, truncated, _ = env.step(action.item())
next_state_t = torch.as_tensor(next_state, dtype=torch.float32)

value = critic(state_t)
with torch.no_grad():
    next_value = critic(next_state_t) * (0 if terminated else 1)
    td_target = reward + gamma * next_value
td_error = td_target - value

actor_loss = -log_prob * td_error.detach()   # actor should not backprop through the critic's loss
critic_loss = td_error.pow(2)

actor_optim.zero_grad(); actor_loss.backward(); actor_optim.step()
critic_optim.zero_grad(); critic_loss.backward(); critic_optim.step()
```

Note `.detach()` on the TD error used in the actor's loss: the actor treats δ_t purely as a scalar weight on its own log-probability term, not as something to backpropagate through into the critic.

## Why this is lower variance

REINFORCE's G_t accumulates noise from every future action and every future environment outcome across an entire episode. The TD error δ_t only depends on one immediate reward and the critic's estimate of one next state's value — far less randomness gets baked into it. The tradeoff, as always with bootstrapping, is that δ_t is biased by however inaccurate the critic currently is, whereas G_t is unbiased by construction. In practice this bias/variance tradeoff strongly favors actor-critic methods, which is why nearly every modern policy-based algorithm, including PPO later in this course, uses some form of a learned critic.

## Key terms

| Term | Meaning |
|---|---|
| Actor | The policy network π_θ(a\|s); chooses actions |
| Critic | The value network V(s); judges how good states are |
| TD error, δ_t | r_t + γV(s_{t+1}) − V(s_t); a one-step, bootstrapped advantage estimate |
| Online update | Updating after every single step, instead of waiting for an episode to finish |

## Recap

Actor-critic methods pair REINFORCE's policy with a learned critic, replacing the high-variance Monte Carlo return G_t with a fast, bootstrapped TD error, and enabling per-step rather than per-episode updates. Next up, Lesson 21: a more formal look at *why* subtracting a baseline like V(s) reduces variance without introducing bias — the theory behind what this lesson just did in practice.
