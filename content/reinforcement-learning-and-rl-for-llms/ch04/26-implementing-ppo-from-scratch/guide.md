# Implementing PPO From Scratch

This is lesson 26 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 4, Policy Optimization Methods. Lessons 22 through 25 built every individual piece — the surrogate objective, clipping, GAE. This lesson assembles them into one working PPO implementation, so there's no mystery left in what Stable-Baselines3 (Lesson 23) does internally.

## What you'll learn

- How to structure a combined actor-critic network for PPO
- The full rollout-collection → GAE → clipped-update loop, as runnable code
- Where each formula from Lessons 23-25 lands in the implementation
- Why PPO's "multiple epochs over one rollout" structure appears explicitly in the code

## A shared actor-critic network

Many PPO implementations share early layers between the actor and critic, since both are usually processing the same state representation:

```python
import torch
import torch.nn as nn
from torch.distributions import Categorical

class ActorCritic(nn.Module):
    def __init__(self, obs_dim, n_actions):
        super().__init__()
        self.shared = nn.Sequential(nn.Linear(obs_dim, 128), nn.ReLU())
        self.actor_head = nn.Linear(128, n_actions)   # logits
        self.critic_head = nn.Linear(128, 1)          # V(s)

    def forward(self, state):
        features = self.shared(state)
        dist = Categorical(logits=self.actor_head(features))
        value = self.critic_head(features).squeeze(-1)
        return dist, value
```

## Step 1: collect a rollout

```python
def collect_rollout(env, model, n_steps=2048):
    states, actions, log_probs, values, rewards, dones = [], [], [], [], [], []
    state, _ = env.reset()
    for _ in range(n_steps):
        state_t = torch.as_tensor(state, dtype=torch.float32)
        dist, value = model(state_t)
        action = dist.sample()

        next_state, reward, terminated, truncated, _ = env.step(action.item())

        states.append(state_t); actions.append(action)
        log_probs.append(dist.log_prob(action).detach())
        values.append(value.detach()); rewards.append(reward)
        dones.append(terminated or truncated)

        state = next_state if not (terminated or truncated) else env.reset()[0]
    return states, actions, log_probs, values, rewards, dones
```

## Step 2: compute advantages with GAE

Reuse the backward recursion from Lesson 25 directly:

```python
def compute_gae(rewards, values, dones, gamma=0.99, lam=0.95, last_value=0.0):
    advantages, gae = [0.0] * len(rewards), 0.0
    next_values = values[1:] + [last_value]
    for t in reversed(range(len(rewards))):
        mask = 1.0 - float(dones[t])
        delta = rewards[t] + gamma * next_values[t] * mask - values[t]
        gae = delta + gamma * lam * mask * gae
        advantages[t] = gae
    returns = [a + v for a, v in zip(advantages, values)]
    return advantages, returns
```

## Step 3: multiple epochs of clipped updates

This is where Lesson 24's clipped objective lands, and where "reuse one rollout for several epochs" becomes an explicit nested loop:

```python
optimizer = torch.optim.Adam(model.parameters(), lr=3e-4)
epsilon, c1, c2 = 0.2, 0.5, 0.01

for epoch in range(4):                          # multiple epochs over the SAME rollout
    for batch in make_minibatches(states, actions, old_log_probs, advantages, returns):
        dist, value = model(batch.states)
        new_log_probs = dist.log_prob(batch.actions)

        ratio = torch.exp(new_log_probs - batch.old_log_probs)
        unclipped = ratio * batch.advantages
        clipped = torch.clamp(ratio, 1 - epsilon, 1 + epsilon) * batch.advantages
        policy_loss = -torch.min(unclipped, clipped).mean()

        value_loss = (value - batch.returns).pow(2).mean()
        entropy_bonus = dist.entropy().mean()

        loss = policy_loss + c1 * value_loss - c2 * entropy_bonus

        optimizer.zero_grad(); loss.backward(); optimizer.step()
```

## Step 4: repeat

After the epochs finish, this rollout is discarded — it was collected on-policy under the model *before* these updates — and `collect_rollout` is called again with the freshly-updated model, starting the cycle over.

## Putting it together

The full training script is just these four steps in a loop: collect, compute GAE, run several epochs of clipped minibatch updates, repeat. Every formula introduced across Lessons 23-25 has exactly one place it lands: the ratio and clip from Lesson 24, the advantages and returns from Lesson 25, and the overall structure — rollout, then multiple epochs — from Lesson 23. Normalizing advantages (subtracting the batch mean, dividing by the batch standard deviation) before the update loop is a common, effective addition that further stabilizes training, though it's omitted above for clarity.

## Key terms

| Term | Meaning |
|---|---|
| Shared actor-critic network | A single network with common trunk layers, split into separate actor and critic output heads |
| Rollout | One batch of collected on-policy experience, used for several epochs before being discarded |
| Minibatch | A randomly-sampled subset of a rollout, used for one gradient step within an epoch |
| Advantage normalization | Subtracting the mean and dividing by the standard deviation of a batch's advantages before the update |

## Recap

This lesson wired together every formula from this chapter — the actor-critic network, rollout collection, GAE, and the clipped objective with its value and entropy terms — into one coherent training loop. Next up, Lesson 27: what to do when a PPO run like this one goes wrong.
