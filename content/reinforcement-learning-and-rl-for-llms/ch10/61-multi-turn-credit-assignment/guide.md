# Multi-Turn Credit Assignment

This is lesson 61 of Chapter 10, Agents & Multi-Step RL. Lesson 60 ended by deferring a question: in a trajectory with many tool calls and reasoning steps, which ones deserve credit when the final outcome is good, and which deserve blame when it isn't? This is the credit assignment problem from the MDP formalism all the way back in Chapter 1, now stretched across a much longer, much sparser horizon than any single-turn RLHF response ever presented.

## What you'll learn

- Why a sparse terminal reward over many turns is a harder version of a problem you've already solved
- How the Bellman equation and GAE extend naturally from token-level to turn-level credit
- Per-turn versus per-token discounting, and why the choice matters at this scale
- Reward decomposition as a practical alternative to relying on advantage estimation alone

## The same problem, a longer horizon

Chapter 1 defined the Bellman equation precisely to solve this: a return at any point in a trajectory equals the immediate reward plus the discounted value of everything that follows, so credit for a good outcome propagates backward through every state and action that led to it. Nothing about that recursion stops being true in a multi-turn agent trajectory — it's exactly as valid whether a "step" is one token or one full turn (reasoning + tool call + observation). What makes it harder in practice is scale: a single-turn CoT trace from Chapter 9 might span hundreds of tokens; a multi-turn agent trajectory can span dozens of full turns, each one containing its own hundreds of tokens, with the only reward signal arriving once, at the very end.

```python
# Turn-level advantage estimation mirrors token-level GAE from Chapter 4 —
# just computed over turns instead of individual tokens.
def turn_level_gae(turn_rewards, turn_values, gamma=0.99, lam=0.95):
    advantages = []
    gae = 0
    for t in reversed(range(len(turn_rewards))):
        next_value = turn_values[t + 1] if t + 1 < len(turn_values) else 0
        delta = turn_rewards[t] + gamma * next_value - turn_values[t]
        gae = delta + gamma * lam * gae
        advantages.insert(0, gae)
    return advantages
```

This is literally the same GAE formula from lesson 25, with "turn" substituted for "token." The value network now predicts the expected return *from a given turn onward*, not from a given token onward — but the math doesn't change.

## Per-turn vs. per-token discounting

One real design decision this scale forces: discount γ per turn, or per token within a turn? A single γ applied per-token, carried through a trajectory with dozens of turns and thousands of tokens, decays a turn's effective contribution to the final reward extremely fast — plausibly fast enough that early turns in a long trajectory get almost no learning signal at all. Most multi-turn agent RL setups instead apply discounting at the turn level (one γ step per full turn, not per token inside it), keeping the effective horizon over turns comparable to the effective horizon Chapter 1-3's classic RL methods were designed around, while treating the tokens within a single turn as sharing that turn's undiscounted credit.

## Reward decomposition as a complement

Pure advantage estimation over a sparse terminal reward is a lot to ask of a value function, especially early in training when the value network's own predictions are still unreliable. Lesson 60's format/outcome split is one instance of a broader pattern: decomposing the trajectory's single terminal reward into smaller, well-defined signals attached to specific turns wherever that's possible without hand-authoring a dense proxy reward (which risks the reward shaping pitfalls Chapter 5 already covered). A tool call that returns a clear error, for example, can be penalized at the turn it happened rather than waiting for the value function to infer, purely from the final outcome, that something went wrong several turns earlier.

## Why this still isn't fully solved

Even with turn-level GAE and partial reward decomposition, long-horizon credit assignment remains one of the harder open problems in applying RL to agents — the value function's job gets harder, not easier, as the number of turns grows, and a handful of pivotal turns in a long trajectory (the one tool call that mattered) can still get diluted against dozens of turns that didn't matter much either way. This is exactly the sparse-reward problem lesson 63 returns to directly, after lesson 62 first covers what an agentic RL environment actually needs to provide to make any of this tractable at all.

## Key terms

- **Credit assignment** — attributing a trajectory's return back to the specific states and actions responsible for it, formalized by the Bellman equation (Chapter 1)
- **Turn-level GAE** — generalized advantage estimation (lesson 25) computed over full turns instead of individual tokens
- **Per-turn discounting** — applying the discount factor once per full turn rather than once per token, to avoid decaying early turns' credit to near zero
- **Reward decomposition** — attaching partial, well-defined reward signals to specific turns where possible, rather than relying solely on advantage estimation from one terminal reward

## Recap

Multi-turn credit assignment is the Bellman equation's backward-propagation idea, applied at turn granularity instead of token granularity, made harder by how sparse and delayed the only real reward signal is. Turn-level GAE and partial reward decomposition help, but don't fully solve it. Lesson 62 turns to the environment side of this problem: what an agentic RL environment needs to look like to generate these trajectories, score them, and reset cleanly between episodes.
