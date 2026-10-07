# Function Approximation for RL

This is lesson 14, the final lesson of Chapter 2 and of this course, Reinforcement Learning & RL for LLMs. Lesson 13 laid out exactly why tabular methods break down: exploding table size, no support for continuous states, and no generalization. Function approximation is the fix, and it's also the conceptual bridge to everything that comes after classical RL — including the LLM training techniques this course's title points toward.

## What you'll learn

- What it means to approximate V or Q with a parameterized function instead of a table
- How the TD update changes when V or Q has parameters θ
- Linear function approximation with features, and neural network function approximation
- Why this is the direct lineage to Deep Q-Networks and policy-gradient methods used in RLHF

## The core idea: replace the table with a function

Instead of storing a separate number for every state (or state-action pair), **function approximation** represents V or Q as a parameterized function V_θ(s) or Q_θ(s,a), where θ is a (usually much smaller) set of parameters — weights in a linear model, or weights of a neural network. Learning now means adjusting θ, not updating individual table cells.

This single change solves all three problems from Lesson 13 at once: the number of parameters no longer scales with the number of states (fixing the curse of dimensionality), the function can take a continuous vector as input (fixing the continuous-state problem), and because the same parameters are shared across all inputs, updating θ based on one state's experience automatically shifts the estimate for *similar* states too (fixing generalization).

## Linear function approximation

The simplest form represents V as a weighted sum of hand-designed **features** of the state:

```
V_θ(s) = θ^T x(s) = Σ_i θ_i x_i(s)
```

where x(s) is a feature vector describing state s (e.g. for CartPole: cart position, cart velocity, pole angle, pole angular velocity, maybe with polynomial or tile-coded transformations). Updating θ with a TD-style target uses gradient descent on the TD error:

```
θ ← θ + α [ R_{t+1} + γV_θ(S_{t+1}) − V_θ(S_t) ] ∇_θ V_θ(S_t)
```

For the linear case, ∇_θ V_θ(S_t) is just x(S_t) itself, so the update becomes θ ← θ + α × (TD error) × x(S_t) — nudging every weight in proportion to how much that feature was "active" in the current state.

## Neural network function approximation

Replacing the linear model with a neural network gives Q_θ(s,a) the capacity to represent far more complex value functions, with θ now being the network's weights. This is exactly what **Deep Q-Networks (DQN)** do: a neural network approximates Q(s,a) for every action simultaneously (output one Q-value per action, given state s as input), trained with a Q-learning-style TD target, but with additional stabilization tricks (a replay buffer, reusing the off-policy property from Lesson 7; and a separate, slowly-updated target network) needed because naively combining TD bootstrapping with a neural network can be unstable.

```python
# Sketch of a DQN-style Q-network, for intuition only
import torch.nn as nn

class QNetwork(nn.Module):
    def __init__(self, state_dim, n_actions):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, 128), nn.ReLU(),
            nn.Linear(128, 128), nn.ReLU(),
            nn.Linear(128, n_actions),   # one Q-value per action
        )
    def forward(self, state):
        return self.net(state)
```

## Why this matters for the rest of the "RL for LLMs" story

Everything in this course — MDPs, value functions, the Bellman equation, exploration, TD learning, Q-learning, SARSA — assumed a small enough problem to make tabular updates sensible. Function approximation is what makes all of it usable on genuinely large problems, including the one where the "state" is a sequence of tokens and the "policy" is a full language model: in RLHF, the policy itself (the LLM) *is* the function approximator, θ are its weights, and algorithms like PPO are policy-gradient methods built on the same foundation — a parameterized function, a reward signal, and gradient-based updates that nudge the parameters toward higher expected reward.

## Key terms

| Term | Meaning |
|---|---|
| Function approximation | Representing V or Q as a parameterized function V_θ(s) / Q_θ(s,a) instead of a table |
| Linear function approximation | V_θ(s) = θ^T x(s), a weighted sum of hand-designed features |
| Deep Q-Network (DQN) | Q_θ(s,a) represented by a neural network, trained with a Q-learning-style TD target |
| Generalization (via shared parameters) | Updating θ for one state shifts the estimate for similar states too |

## Recap

Function approximation replaces an explicit V/Q table with a parameterized function — linear or a neural network — whose weights θ are updated via gradient descent on the TD error, fixing the curse of dimensionality, enabling continuous state spaces, and giving genuine generalization between similar states; this is the direct foundation beneath Deep Q-Networks and the policy-gradient methods used to train LLMs with RLHF. That completes Chapter 2 and the Reinforcement Learning & RL for LLMs course foundations — every concept here (MDPs, Bellman, exploration, TD, Q-learning, SARSA, and now function approximation) is the vocabulary the rest of this course's RLHF and RLVR material builds directly on.
