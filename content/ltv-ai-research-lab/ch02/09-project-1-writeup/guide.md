# Project 1 Write-Up

Five lessons of work — a framing, an environment, a reward, a training run, and an evaluation — need to become something a stranger can read in five minutes and trust. This lesson writes that up, using the same four-part structure every project in this lab uses: claim, method, result, limitation.

## What you'll learn

- The four-part structure every project write-up in this lab uses
- How to write each part for Project 1 specifically, using the actual numbers from Lesson 8
- Why the boundary-case regression belongs in the limitation section, not a footnote
- How this write-up feeds into Chapter 6's portfolio assembly

## The four-part structure

Every project in this research lab gets written up the same way:

1. **Claim** — the one sentence someone skims to decide if this is interesting.
2. **Method** — how you'd actually reproduce it: environment, reward, training.
3. **Result** — the actual numbers, not vibes.
4. **Limitation** — what this result doesn't prove, and what could break it.

## Claim

> A PPO agent trained with stable-baselines3 to choose SQL Server query hints for a parameterized four-table AdventureWorks2012 join matched or beat the optimizer's own default execution plan on 78% of held-out date-range/territory combinations, with an average 34% reduction in logical reads on the episodes it won.

Notice what the claim does *not* say: it doesn't say "the agent always beats SQL Server" (false — 22% of held-out episodes it ties or loses), and it doesn't say "RL is better than query optimization" (far too broad a claim from one parameterized query against one optimizer version).

## Method

Summarize the pipeline in the order it was actually built, each step traceable to a lesson:

- **Framing** (Lesson 4): a four-table join, five discrete hint actions, a two-feature observation (`date_range_days`, territory-size proxy), single-step episodes.
- **Environment** (Lesson 5): a `gymnasium.Env` subclass, `QueryPlanEnv`, executing hinted SQL via pyodbc against a sandboxed AdventureWorks2012 copy and capturing logical reads via `SET STATISTICS IO ON`.
- **Reward** (Lesson 6): `(baseline_reads - agent_reads) / baseline_reads`, where `baseline_reads` is the optimizer's own no-hint plan measured fresh each episode — scale-invariant across the roughly 50-to-50,000+ range of logical reads this query can produce.
- **Training** (Lesson 7): stable-baselines3 PPO, `MlpPolicy`, `Discrete(5)` action space, 100,000 timesteps across 4 parallel environments.
- **Evaluation** (Lesson 8): 240 held-out (date_range_days, territory) combinations, agent's chosen hint vs. optimizer's default plan on identical sampled parameters.

```python
# A write-up's method section should let someone
# reconstruct this call chain without guessing:
env   = QueryPlanEnv(conn_str, territories)       # Lesson 5
reward_fn = compute_reward                         # Lesson 6
model = PPO("MlpPolicy", env).learn(100_000)        # Lesson 7
win_rate = evaluate(model, held_out_grid)           # Lesson 8
```

## Result

Report both numbers from Lesson 8, not just the flattering one: a 78% win-or-tie rate against the optimizer's own default plan across 240 held-out episodes, and a 34% average logical-read reduction on the episodes the agent won outright. Also report what the trained policy actually learned to do differently from the Lesson 1 notebook's attempt 2: condition its hint choice on `date_range_days`, picking `FORCE ORDER` on wide ranges and a different hint on narrow ones, rather than forcing the same hint on every episode.

## Limitation

- **The boundary-case regression.** On held-out episodes with date ranges roughly between 10 and 18 days — right at the narrow/wide transition — the agent still sometimes picks `FORCE ORDER` and loses to the optimizer's default plan. The policy learned the general pattern but not a clean threshold at the transition itself; this is exactly the kind of result that deserves naming plainly rather than smoothing over.
- **The episode is a contextual bandit, not a multi-step trajectory.** This project frames the problem as RL for consistency with the rest of the lab, but each episode is a single decision — the result says nothing about whether the approach would hold up in a setting with genuinely sequential, delayed-reward decisions.
- **One query, one optimizer version.** The result is specific to this parameterized four-table join against this version of SQL Server's optimizer on AdventureWorks2012; it isn't evidence that a trained policy would generalize to arbitrary queries or other optimizer versions without retraining.

## Feeding into Chapter 6

This write-up — claim, method, result, limitation — is the unit Chapter 6's portfolio-assembly lesson slots in alongside Project 2's and Project 3's write-ups. Keep the boundary-case regression in the limitation section exactly as measured; a project write-up that only reports the 78% number and omits where the agent still loses isn't a complete result.

## Key terms

- **Claim** — the one-sentence summary of what was built and what result followed
- **Method** — the reproducible description of environment, reward, and training procedure
- **Result** — the actual measured numbers, reported even when they include losses
- **Boundary-case regression** — this project's named limitation: the agent still loses to the optimizer's default on a share of episodes near the narrow/wide date-range transition

## Recap

Project 1's write-up states the claim precisely (a PPO agent matched or beat the optimizer's default plan on 78% of held-out episodes, with a 34% average read reduction on wins), traces the method lesson by lesson, reports both the win rate and the boundary-case regression from Lesson 8, and names the limitations plainly — including that the episode structure is a contextual bandit, not a multi-step trajectory. This closes Project 1; Chapter 3 picks up Project 2, reward modeling for data quality on Northwind customer records.
