# Double DQN & Dueling DQN

This is lesson 17 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 3, Deep RL. With experience replay and a target network in place from Lesson 16, DQN trains stably — but it still has two separate weaknesses: it systematically overestimates Q-values, and its network architecture wastes capacity learning the same thing twice. This lesson covers the two independent fixes: Double DQN and Dueling DQN.

## What you'll learn

- Why the max operator in the DQN target causes systematic overestimation bias
- How Double DQN decouples action *selection* from action *evaluation* to fix it
- Why many states don't need per-action detail, and how Dueling DQN's two-stream architecture exploits that
- That Double DQN and Dueling DQN are independent improvements — they're commonly combined

## The overestimation problem

The standard DQN target takes a max over the target network's own noisy Q-value estimates:

```
y = r + γ · max_a' Q(s', a'; θ⁻)
```

Any estimate has noise — some actions' Q-values are overestimated, some underestimated, purely by chance. Taking a max over several noisy estimates is statistically biased toward picking one of the overestimated ones, which means the target systematically trends too high. Over many updates, this bias compounds into Q-values that are consistently inflated relative to the true values.

## Double DQN: decouple select from evaluate

Double DQN's fix is simple and requires no new network: use the **online** network to *select* which action looks best at s', but use the **target** network to *evaluate* how good that specific action actually is:

```
y = r + γ · Q(s', argmax_a' Q(s', a'; θ); θ⁻)
```

Compare this to vanilla DQN's `max_a' Q(s', a'; θ⁻)`, where the same network both picks and scores the action. Because the online and target networks have slightly different weights and therefore different noise, it's much less likely that the network making the selection is also the one whose evaluation is most overestimated — this breaks the correlation that produced the bias.

```python
with torch.no_grad():
    # Online network selects the action
    best_actions = q_network(next_states).argmax(dim=1, keepdim=True)
    # Target network evaluates that specific action
    max_q_next = q_target(next_states).gather(1, best_actions)
    y = rewards + gamma * (1 - dones) * max_q_next
loss = nn.functional.mse_loss(q_network(states).gather(1, actions), y)
```

## Dueling DQN: split the architecture

Dueling DQN changes the network's architecture, not the target. Its insight: for many states, the *value* of being there matters a lot, but the *relative* difference between actions barely matters — in a near-empty highway lane, braking vs. not braking makes little difference, but in other states the choice of action is everything. A single Q-head has to learn both signals entangled together for every state.

Dueling DQN splits the final layers into two streams: a **value stream** V(s) (a single scalar per state) and an **advantage stream** A(s, a) (one value per action), then recombines them:

```
Q(s, a) = V(s) + ( A(s, a) − mean_a' A(s, a') )
```

Subtracting the mean advantage is a stability trick: it keeps V(s) and A(s, a) individually identifiable (without it, the two streams could drift by an arbitrary constant that cancels out, making training unstable), while leaving Q(s, a) unaffected in expectation.

```python
class DuelingQNetwork(nn.Module):
    def __init__(self, obs_dim, n_actions):
        super().__init__()
        self.shared = nn.Sequential(nn.Linear(obs_dim, 128), nn.ReLU())
        self.value_stream = nn.Linear(128, 1)
        self.advantage_stream = nn.Linear(128, n_actions)

    def forward(self, x):
        features = self.shared(x)
        value = self.value_stream(features)                       # (batch, 1)
        advantage = self.advantage_stream(features)                # (batch, n_actions)
        return value + (advantage - advantage.mean(dim=1, keepdim=True))
```

Double DQN changes *how the target is computed*; Dueling DQN changes *how the network is structured*. Nothing about either one depends on the other, which is why most practical DQN implementations — and Stable-Baselines3's DQN — use both together.

## Key terms

| Term | Meaning |
|---|---|
| Overestimation bias | DQN's tendency to produce Q-values that are systematically too high, caused by the max operator over noisy estimates |
| Double DQN | Uses the online network to select the best next action and the target network to evaluate it |
| Value stream V(s) | The scalar "how good is this state overall" output in a dueling architecture |
| Advantage stream A(s, a) | The "how much better is this action than average" output in a dueling architecture |

## Recap

Double DQN and Dueling DQN fix two different, independent weaknesses in vanilla DQN — overestimated targets and an architecture that doesn't separate state value from action advantage — and are usually combined. Chapter 3 now moves away from value-based methods entirely: Lesson 18 starts policy gradient methods, where the policy itself is learned directly instead of derived from a Q-function.
