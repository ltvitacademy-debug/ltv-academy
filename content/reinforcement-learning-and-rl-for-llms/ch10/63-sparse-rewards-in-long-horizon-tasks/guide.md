# Sparse Rewards in Long-Horizon Tasks

This is lesson 63 of Chapter 10, Agents & Multi-Step RL. Lesson 61 showed credit assignment getting harder as trajectories get longer; lesson 62 gave you an environment to generate those trajectories. This lesson confronts the problem directly: when a reward only arrives once, at the very end of a long episode, how do you get any learning signal at all during the many turns before that?

## What you'll learn

- Why sparse terminal rewards are especially punishing for long-horizon agent tasks
- Potential-based shaping as the theoretically grounded way to add intermediate signal
- Subgoal rewards as a practical, less rigorous alternative, and their failure modes
- The real trade-off: faster learning now versus a harder-to-trust policy later

## Why sparsity bites harder at long horizons

A sparse reward is already a known problem from Chapter 5's toy environments — early random exploration almost never stumbles into the one rewarding outcome, so there's nothing for the policy gradient to learn from at the start of training. Multi-turn agent tasks make this worse on two fronts at once: trajectories are longer (lesson 61 already covered how thin credit gets spread that far back), and the space of *possible* trajectories at each turn is enormous (open-ended text and a growing set of tools, not a handful of discrete moves). A policy exploring near-randomly in that combined space has an even lower chance of a lucky success to learn from than a toy Gymnasium environment ever presented.

## Potential-based shaping, extended to agents

Chapter 5 covered potential-based reward shaping as the one shaping approach with a real guarantee attached: adding `γ·Φ(s') − Φ(s)` to the reward, for any potential function Φ, doesn't change which policy is optimal. The same guarantee carries over unchanged to agent trajectories, with Φ now defined over conversation/task state instead of a physical state vector.

```python
def shaped_reward(raw_reward, state, next_state, gamma=0.99):
    phi_s = potential(state)          # e.g. "how many of the task's required sub-steps are done?"
    phi_next = potential(next_state)
    shaping = gamma * phi_next - phi_s
    return raw_reward + shaping
```

A reasonable Φ for an agent task might count completed subtasks, or measure progress toward a known goal state (files created, API calls succeeded) — anything that increases monotonically as the agent gets genuinely closer to the terminal goal. The guarantee only holds if Φ is a function of state alone, not of the action taken to get there; a Φ that secretly rewards specific actions is a shaped reward with no optimality guarantee left, and is exactly the kind of reward hacking surface lesson 57 and lesson 62 both already flagged.

## Subgoal rewards: a looser, more common alternative

In practice, teams more often use ad hoc subgoal rewards rather than a formally potential-based Φ: a small reward for successfully calling a search tool before the main task tool, a small reward for the first correctly parsed intermediate result, and so on — because identifying the "real" potential function for a complex agent task is often harder than just picking milestones that seem to correlate with success. This is faster to set up, but gives up the optimality guarantee entirely: a subgoal reward is exactly the kind of proxy objective that can be reward-hacked (farming the subgoal reward itself rather than genuinely progressing), the same risk Chapter 5 flagged for naive reward shaping in general.

## The real trade-off

Dense shaped or subgoal rewards speed up early learning substantially — often the difference between a policy that learns anything at all in a reasonable amount of compute, and one that never gets off the ground under a purely sparse terminal signal. The cost is trust: every shaping signal you add is a chance for the policy to optimize the shaping term instead of the real goal, and that risk compounds with every additional subgoal reward stacked into the same training run. Most practical agent RL recipes start with sparse-only training on a smaller, easier task distribution to get a working baseline, then introduce shaping carefully and re-check (via the evaluation discipline from lesson 59) whether the shaped policy is actually better or just better at collecting shaped reward.

## Key terms

- **Sparse terminal reward** — a reward that only arrives once, at the end of an episode, with no signal for intermediate progress
- **Potential-based shaping** — adding `γ·Φ(s') − Φ(s)` to the reward, guaranteed not to change the optimal policy if Φ depends only on state
- **Subgoal reward** — an ad hoc partial reward for a milestone believed to correlate with task success, without a formal optimality guarantee
- **Shaping-induced reward hacking** — a policy learning to farm a shaping or subgoal signal rather than genuinely progress toward the real goal

## Recap

Sparse terminal rewards bite harder in long-horizon agent tasks than in Chapter 5's toy environments, because trajectories are longer and the action space is far larger. Potential-based shaping extends cleanly to agents with its optimality guarantee intact; subgoal rewards are more common in practice but trade that guarantee away for convenience. Lesson 64 turns to a related but distinct question: whether these long trajectories should even run against a real environment at all, versus a simulation built for training.
