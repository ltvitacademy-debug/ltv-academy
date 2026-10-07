# Experience Replay & Target Networks

This is lesson 16 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 3, Deep RL. Lesson 15 introduced DQN's core idea — a neural network standing in for a Q-table — and flagged that training it naively on raw experience is unstable. This lesson covers the two specific fixes that make DQN actually converge: experience replay and the target network.

## What you'll learn

- Why training on sequential, correlated experience destabilizes a Q-network
- How a replay buffer breaks that correlation and lets data be reused
- Why a moving regression target causes training to chase itself, and how a target network fixes it
- Hard updates vs. soft (Polyak) updates for syncing the target network

## The correlation problem

An RL agent generates experience as one long, correlated trajectory: the state at time t is similar to the state at t+1, which is similar to the state at t+2. Feeding a neural network a stream of highly correlated samples, in order, violates the independent-and-identically-distributed assumption that gradient-based training relies on, and the network tends to overfit to whatever part of the state space it's currently passing through, then forget everything else.

**Experience replay** fixes this by storing transitions in a buffer and sampling random minibatches from it to train on, so consecutive training steps see unrelated moments from the agent's history, not consecutive moments from one trajectory. It also means each transition can be reused many times instead of being thrown away after one gradient step, which makes much better use of expensive environment interaction.

```python
import random
from collections import deque

class ReplayBuffer:
    def __init__(self, capacity=100_000):
        self.buffer = deque(maxlen=capacity)

    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))

    def sample(self, batch_size):
        batch = random.sample(self.buffer, batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        return states, actions, rewards, next_states, dones

    def __len__(self):
        return len(self.buffer)
```

## The moving-target problem

DQN's loss regresses Q(s, a; θ) toward r + γ·max_a' Q(s', a'; θ). Look closely: the same network, with the same weights θ, appears on both sides. Every gradient step changes θ, which immediately changes the target the next step is regressing toward — the network is chasing a target that moves because of its own updates, a recipe for oscillation and divergence.

The fix is a second network, the **target network**, with its own weights θ⁻, used only to compute the target side of the loss:

```
y = r + γ · max_a' Q(s', a'; θ⁻)
loss = (Q(s, a; θ) − y)²
```

θ⁻ is **not** trained by gradient descent. It's periodically synced from θ, so the target stays fixed for a stretch of training and only moves in controlled jumps.

## Hard updates vs. soft updates

Two common ways to sync θ⁻ from θ:

- **Hard update**: every C steps (e.g. every 1,000 training steps), copy the weights exactly: θ⁻ ← θ.
- **Soft (Polyak) update**: every step, nudge θ⁻ a little toward θ: θ⁻ ← τ·θ + (1 − τ)·θ⁻, with a small τ such as 0.005. This gives a smoother, continuously-drifting target instead of sudden jumps.

```python
# Hard update, every C training steps
if step % target_update_every == 0:
    q_target.load_state_dict(q_network.state_dict())

# Soft (Polyak) update, every training step
tau = 0.005
for target_param, param in zip(q_target.parameters(), q_network.parameters()):
    target_param.data.copy_(tau * param.data + (1.0 - tau) * target_param.data)
```

Both approaches are standard; hard updates are closer to the original DQN paper, soft updates are more common in continuous-control variants.

## Key terms

| Term | Meaning |
|---|---|
| Experience replay buffer | Storage of past transitions, randomly sampled into minibatches for training |
| Target network | A second, infrequently-updated copy of the Q-network used to compute stable TD targets |
| Hard update | Periodically copying θ into θ⁻ exactly |
| Soft (Polyak) update | Continuously blending θ into θ⁻ by a small factor τ each step |

## Recap

Experience replay decorrelates training data and reuses it efficiently; the target network stops the regression target from moving in lockstep with every gradient step. Together, these two fixes are what turn DQN from an unstable idea into a reliably-trained algorithm. Next up, Lesson 17: two further refinements, Double DQN and Dueling DQN.
