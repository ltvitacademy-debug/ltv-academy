# Script — Project 1 Write-Up

## Segment 1 (title)

Five lessons of work — a framing, an environment, a reward, a training run, and an evaluation — need to become something a stranger can read in five minutes and trust. This lesson writes that up, using the same four-part structure every project in this lab uses.

## Segment 2 (steps)

Claim is the one sentence someone skims to decide if this is interesting. Method is how you'd actually reproduce it: environment, reward, training. Result is the actual numbers, not vibes. And limitation is what the result doesn't prove, and what could break it.

## Segment 3 (code)

The method section lets a reader reconstruct the exact call chain: a custom gymnasium environment executing hinted SQL against a sandboxed database, a baseline-relative reward, a stable-baselines3 PPO agent trained for one hundred thousand timesteps, and an evaluation against a held-out grid.

## Segment 4 (steps)

The limitation section names the boundary case regression plainly: the agent still loses to the optimizer's default plan on episodes with date ranges near the narrow to wide transition. It also notes that each episode is really a single decision, framed as RL for consistency rather than because it's a genuinely sequential problem, and that the result is specific to this one query against this one optimizer version.

## Segment 5 (outro)

Project 1's write-up states its claim precisely, traces the method lesson by lesson, reports both the seventy eight percent win rate and the boundary case regression, and names its limitations honestly. That closes Project 1 — Chapter 3 picks up Project 2, reward modeling for data quality on Northwind customer records.
