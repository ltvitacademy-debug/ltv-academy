# Policy Gradient Methods

This is lesson 18 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 3, Deep RL. Lessons 15 through 17 were all value-based: learn Q(s, a), then act by picking whichever action has the highest Q-value. This lesson introduces a fundamentally different family — policy gradient methods — that learn the policy itself, directly, without ever computing a Q-value explicitly. This shift matters well beyond classic RL: it's the family of algorithms behind PPO and the RLHF pipeline that aligns modern LLMs, which this course builds toward.

## What you'll learn

- The difference between value-based RL (learn Q, derive a policy) and policy-based RL (learn the policy directly)
- Why direct policy optimization suits stochastic and continuous action spaces better than value-based methods
- The policy gradient theorem, and the intuition behind it
- How to build a parameterized stochastic policy network in PyTorch

## Value-based vs. policy-based

Every algorithm in this chapter so far has worked the same way: learn Q(s, a), then act greedily (or near-greedily) with respect to it. The policy is never learned directly — it's a byproduct, read off the Q-function with an argmax.

Policy gradient methods flip this around. They parameterize the policy itself as π_θ(a|s) — a function, with learnable weights θ, that outputs a probability distribution over actions given a state — and improve θ directly by gradient ascent on expected return. There is no Q-function required at all (though, as later lessons show, one is often added back in to reduce variance).

This matters for a few reasons: policies can naturally be stochastic, which helps with exploration and is essential in any setting with inherent randomness in the optimal behavior; policy gradients extend cleanly to continuous action spaces, where "take the argmax over actions" isn't even well-defined; and, most relevant to where this course is headed, an LLM already *is* a stochastic policy — it outputs a probability distribution over the next token given a context — so policy gradient methods map onto language models far more directly than value-based ones do.

## The policy gradient theorem

The policy gradient theorem gives an expression for how expected return changes as the policy's parameters change, without needing to know how the environment's dynamics work:

```
∇_θ J(θ) = E_π[ ∇_θ log π_θ(a|s) · Q^π(s, a) ]
```

Read this as: to increase expected return, nudge θ in the direction that increases the log-probability of actions, weighted by how good those actions turned out to be (Q^π(s, a)). Actions that led to high return get pushed to become more probable; actions that led to low (or negative) return get pushed to become less probable. The `log π_θ(a|s)` term is why it's called a "log-probability" or "score function" gradient — it's a standard way of writing the gradient of an expectation over a distribution whose parameters you're also optimizing.

## A stochastic policy network

For a discrete action space, a policy network outputs logits that get turned into a probability distribution via softmax:

```python
import torch
import torch.nn as nn
from torch.distributions import Categorical

class PolicyNetwork(nn.Module):
    def __init__(self, obs_dim, n_actions):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, 128), nn.ReLU(),
            nn.Linear(128, n_actions),  # logits, not probabilities yet
        )

    def forward(self, state):
        logits = self.net(state)
        return Categorical(logits=logits)  # a distribution over actions

policy = PolicyNetwork(obs_dim=4, n_actions=2)
dist = policy(state)
action = dist.sample()                 # sample an action stochastically
log_prob = dist.log_prob(action)       # log pi_theta(a|s), needed for the gradient
```

`dist.sample()` draws an action according to the current policy's probabilities — this is what gives the policy its built-in exploration, with no separate epsilon-greedy mechanism needed. `dist.log_prob(action)` gives exactly the `log π_θ(a|s)` term the policy gradient theorem calls for; in PyTorch, calling `.backward()` on a loss built from this term automatically computes ∇_θ log π_θ(a|s).

## Key terms

| Term | Meaning |
|---|---|
| Policy-based RL | Learning π_θ(a|s) directly, by gradient ascent on expected return, rather than deriving a policy from a value function |
| Policy gradient theorem | ∇_θ J(θ) = E[∇_θ log π_θ(a|s) · Q^π(s,a)] — the gradient of expected return with respect to policy parameters |
| Score function | The ∇_θ log π_θ(a|s) term; weighting it by return pushes up probabilities of good actions |
| Stochastic policy | A policy that outputs a probability distribution over actions, rather than a single deterministic choice |

## Recap

Policy gradient methods learn π_θ(a|s) directly by gradient ascent, using the policy gradient theorem to push up the probability of actions proportional to how good they turned out. This is the foundation every later lesson in this course builds on, right through PPO and RLHF. Next up, Lesson 19: the simplest practical policy gradient algorithm, REINFORCE.
