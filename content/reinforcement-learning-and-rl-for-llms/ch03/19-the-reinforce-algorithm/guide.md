# The REINFORCE Algorithm

This is lesson 19 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 3, Deep RL. Lesson 18 introduced the policy gradient theorem as an abstract expression. This lesson turns it into the simplest algorithm you can actually implement and run: REINFORCE, which estimates the policy gradient using complete episodes played out with Monte Carlo sampling.

## What you'll learn

- How REINFORCE estimates Q^π(s, a) using actual observed returns, with no value function at all
- The full REINFORCE update rule and how it's applied over a trajectory
- How to compute return-to-go efficiently, working backward through an episode
- Why REINFORCE, despite being correct in expectation, has high variance — the problem the rest of this chapter addresses

## From the theorem to an algorithm

The policy gradient theorem needs Q^π(s, a) — how good an action turns out to be — but it doesn't say how to get it. REINFORCE's answer is the simplest possible one: play out a full episode with the current policy, and use the actual observed return from each timestep onward as a sample estimate of Q^π(s, a). This return-from-here-onward is written G_t:

```
G_t = r_t + γ·r_{t+1} + γ²·r_{t+2} + ... (sum to the end of the episode)
```

The REINFORCE update is then:

```
θ ← θ + α · ∇_θ log π_θ(a_t | s_t) · G_t
```

applied at every timestep of the episode (or, in practice, averaged/summed over a batch of episodes before each gradient step). This is exactly the policy gradient theorem with Q^π(s, a) replaced by the Monte Carlo sample G_t.

## Computing G_t efficiently

Computing G_t by brute-force summing from each t to the end is O(T²) for an episode of length T. The standard trick computes it backward in a single pass, since G_t = r_t + γ·G_{t+1}:

```python
def compute_returns(rewards, gamma=0.99):
    returns = []
    G = 0.0
    for r in reversed(rewards):
        G = r + gamma * G
        returns.insert(0, G)
    return returns
```

## A full REINFORCE training loop

```python
import torch
from torch.distributions import Categorical

optimizer = torch.optim.Adam(policy.parameters(), lr=1e-3)

for episode in range(num_episodes):
    state, _ = env.reset()
    log_probs, rewards = [], []
    done = False

    while not done:
        dist = policy(torch.as_tensor(state, dtype=torch.float32))
        action = dist.sample()
        log_probs.append(dist.log_prob(action))

        state, reward, terminated, truncated, _ = env.step(action.item())
        rewards.append(reward)
        done = terminated or truncated

    returns = torch.tensor(compute_returns(rewards), dtype=torch.float32)

    # Policy gradient ASCENDS on return, so the loss is the negative
    loss = -torch.stack([lp * G for lp, G in zip(log_probs, returns)]).sum()

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

Note the sign: PyTorch optimizers minimize a loss, but the policy gradient theorem is a gradient *ascent* rule on expected return, so the loss passed to `.backward()` is the negative of the policy gradient objective.

## Why REINFORCE has high variance

G_t is a single Monte Carlo sample of the return from one sampled trajectory — one particular sequence of actions and one particular sequence of stochastic environment outcomes, out of countless possible ones. Two episodes that start identically but diverge because of random action sampling can produce wildly different G_t values for the same early state, even though the policy that generated both was identical. Averaging over many episodes eventually washes this out, but it means REINFORCE needs a lot of episodes — and a lot of environment interaction — to get a low-noise gradient estimate, and training can be visibly jumpy from one update to the next. This high variance is precisely the problem that actor-critic methods (Lesson 20) and baseline subtraction (Lesson 21) exist to solve.

## Key terms

| Term | Meaning |
|---|---|
| Return-to-go, G_t | The actual discounted sum of rewards from timestep t to the end of the episode |
| Monte Carlo estimate | Estimating an expected value using full sampled episodes rather than a learned model |
| Trajectory | One complete sequence of states, actions, and rewards from an episode's start to its end |
| High variance | REINFORCE's gradient estimate differs a lot from episode to episode, slowing and roughening training |

## Recap

REINFORCE makes the policy gradient theorem concrete by substituting a Monte Carlo return G_t for Q^π(s, a), giving a simple and correct, but high-variance, learning algorithm. Next up, Lesson 20: actor-critic methods, which add a learned critic to produce much lower-variance updates.
