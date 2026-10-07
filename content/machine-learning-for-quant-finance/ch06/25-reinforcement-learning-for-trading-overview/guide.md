# Reinforcement Learning for Trading Overview

Every model in this course so far has been **supervised**: given features, predict a label — a return, a direction, a cluster. Reinforcement learning (RL) frames the problem differently: an agent takes sequential actions in an environment and learns, purely from the rewards it receives, which actions tend to pay off. Trading looks, on the surface, like a natural fit for this framing. This lesson is a conceptual overview of why that's appealing, how it's typically set up, and why it remains a research-stage idea rather than an off-the-shelf tool.

## What you'll learn

- Framing trading as a Markov Decision Process (MDP): state, action, reward
- Q-learning/DQN and policy-gradient methods, at a conceptual level
- Why RL for trading is genuinely hard: noisy, non-stationary rewards
- Why realistic simulation (market impact, transaction costs) is itself a hard problem
- Why this is "what's being explored," not a production-ready solution

## Framing trading as an MDP

Reinforcement learning problems are typically framed as a **Markov Decision Process**, defined by:

- **State** — what the agent observes before acting: current market features, recent price history, and the agent's own portfolio (current position, cash, unrealized P&L).
- **Action** — what the agent can do: buy, sell, hold, or more granularly, choose a target position size or order type.
- **Reward** — the feedback signal the agent receives after acting, typically profit-and-loss over some horizon, often risk-adjusted (e.g., a reward shaped to penalize drawdowns, not just raw P&L).

```python
# Conceptual environment sketch -- illustrative, not a runnable trading system
class TradingEnv:
    def reset(self):
        self.position = 0
        self.cash = 100_000
        return self._get_state()

    def step(self, action):
        # action: -1 (sell), 0 (hold), 1 (buy)
        prev_value = self.portfolio_value()
        self.position += action
        self._advance_market()
        reward = self.portfolio_value() - prev_value  # simplistic P&L reward
        return self._get_state(), reward, self._is_done()
```

The agent's job is to learn a **policy** — a mapping from state to action — that maximizes cumulative reward over time, not just the immediate next step.

## Q-learning/DQN and policy-gradient methods

Two broad families of approach show up repeatedly in RL-for-trading research:

- **Q-learning / Deep Q-Networks (DQN)** — learn a function `Q(state, action)` estimating the expected cumulative future reward of taking a given action in a given state, then act by choosing the action with the highest estimated Q-value. DQN uses a neural network to approximate `Q` when the state space is too large for a lookup table.
- **Policy-gradient methods** — rather than learning a value function and deriving actions from it, these learn the policy itself directly, adjusting its parameters to make higher-reward actions more likely over time. Common in continuous-action settings, like choosing a precise position size rather than a discrete buy/sell/hold.

```python
# Conceptual, illustrative only -- real implementations use a library
# such as stable-baselines3 rather than hand-rolled training loops.
import numpy as np

def epsilon_greedy_action(q_network, state, epsilon=0.1):
    if np.random.rand() < epsilon:
        return np.random.choice([-1, 0, 1])  # explore
    return np.argmax(q_network.predict(state)) - 1  # exploit
```

## Why this is genuinely hard

Trading looks like an MDP, but several things make it a much harder RL problem than the games and robotics tasks where RL has had its clearest successes:

- **Extremely noisy, non-stationary rewards.** Chapter 1's low signal-to-noise and non-stationarity problems don't go away under RL — if anything, they bite harder, because the agent has to learn a full sequential policy from reward signals that are mostly noise and whose underlying dynamics keep shifting.
- **Realistic simulation is itself a hard problem.** RL agents typically need enormous numbers of interactions to learn, far more than real market history can supply. That means training largely happens in a simulated market environment — and that simulation has to capture market impact (your own trades moving the price) and transaction costs realistically, or the agent learns a policy that looks great in simulation and fails in live trading because the simulated environment was too forgiving.
- **Credit assignment over long horizons.** When a reward (P&L) only becomes clear many steps after the actions that caused it, learning which specific actions actually deserve credit is a well-known hard problem in RL generally, and compounds with finance's low signal-to-noise setting.

## Where this stands today

Reinforcement learning for trading is an active, still largely research-stage area, not an off-the-shelf solution you should expect to deploy with confidence the way you might a gradient-boosted model from Chapter 2. It shows genuine promise for specific, narrower problems — optimal trade execution (minimizing market impact while filling a large order) is a more mature and more tractable RL application than full end-to-end strategy discovery. Treat this lesson as a map of what's being explored and why, not a recipe to put into production.

## Key terms

| Term | Meaning |
|---|---|
| Markov Decision Process (MDP) | The state/action/reward framework underlying reinforcement learning |
| Policy | A mapping from state to action that an RL agent learns |
| Q-learning / DQN | Learning an expected-value function over state-action pairs to choose actions |
| Policy-gradient methods | Learning the policy directly rather than deriving it from a value function |
| Credit assignment | The problem of attributing a delayed reward back to the actions that caused it |

## Recap

Framing trading as a Markov Decision Process — state, action, reward — makes reinforcement learning conceptually appealing, and Q-learning/DQN and policy-gradient methods are the two main families of approach. But noisy, non-stationary rewards, the difficulty of building a realistic market simulation, and long-horizon credit assignment make this a genuinely hard, still research-stage area rather than a deployable tool. That closes Chapter 6's tour of modern topics. Chapter 7 is the capstone — Lesson 26 kicks it off by laying out the final project.
