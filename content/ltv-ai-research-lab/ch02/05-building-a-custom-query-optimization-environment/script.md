# Script — Building a Custom Query-Optimization Environment

## Segment 1 (title)

Gymnasium is the standard interface for RL environments, and stable-baselines3 expects exactly that interface. This lesson builds QueryPlanEnv, the custom environment that executes hinted SQL for real against a sandboxed AdventureWorks2012 copy.

## Segment 2 (steps)

The environment follows gymnasium's two-method contract. Reset samples a fresh date range and territory for the episode and returns an observation. Step builds the hinted SQL text, executes it through pyodbc against the sandboxed database, and reports back what happened.

## Segment 3 (code)

Reset does the sampling: a random date range width between one day and three years, a random territory with its precomputed customer count, and an observation built from both, normalized. Nothing touches the database yet at this point — reset only samples the episode's parameters.

## Segment 4 (code)

Step is where the real execution happens. It turns statistics IO on, runs the hinted query, and parses the logical reads out of the messages pyodbc surfaces on the cursor. Every episode returns terminated equals true after this one step, since a single decision is the whole episode, matching the contextual bandit framing from the previous lesson.

## Segment 5 (outro)

QueryPlanEnv samples episodes, executes real hinted SQL against a sandboxed copy of AdventureWorks2012, and captures logical reads through SQL Server's own statistics IO reporting. Up next, Lesson 6: turning those captured logical reads into the actual reward signal the agent learns from.
