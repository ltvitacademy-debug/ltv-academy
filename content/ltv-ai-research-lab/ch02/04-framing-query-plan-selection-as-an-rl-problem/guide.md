# Framing Query Plan Selection as an RL Problem

Project 1 starts with a question SQL Server's own optimizer answers every time you run a query: given this exact statement, which execution plan should it use? Normally that decision is invisible — the optimizer picks, you get rows back. This lesson turns that decision into something an RL agent can learn to make instead, and sets up the exact query, actions, and observation this project uses for the next five lessons.

## What you'll learn

- The parameterized four-table query this entire project is built around
- The five discrete hint actions the agent can choose between
- The two-feature observation the agent sees before deciding
- Why a single-decision episode still counts as RL, and what it borrows from the bandit setting

## The query

Every episode in this project is the same shape of question against AdventureWorks2012: sales detail lines for orders in a given territory and date range. In SQL, that's a four-table join:

```sql
SELECT soh.SalesOrderID, sod.OrderQty, sod.LineTotal,
       p.Name AS ProductName, c.CustomerID
FROM Sales.SalesOrderHeader AS soh
JOIN Sales.SalesOrderDetail AS sod ON sod.SalesOrderID = soh.SalesOrderID
JOIN Production.Product AS p ON p.ProductID = sod.ProductID
JOIN Sales.Customer AS c ON c.CustomerID = soh.CustomerID
WHERE soh.TerritoryID = @TerritoryID
  AND soh.OrderDate BETWEEN @StartDate AND @EndDate;
```

`@StartDate` and `@EndDate` define a derived feature, `date_range_days`, and `@TerritoryID` picks which sales territory the join is scoped to. Different parameter values change how much data the plan has to move — a three-day range in one territory touches almost nothing; a three-year range in a busy territory touches a lot — and that's exactly the variation the optimizer has to handle well, and the exact variation this project tests an agent against.

## The action space: five hints

Instead of letting the agent write SQL, it picks one of five fixed actions, each a hint appended to the query text:

| Action | Hint | Meaning |
|---|---|---|
| 0 | *(none)* | Let SQL Server's optimizer decide |
| 1 | `OPTION (HASH JOIN)` | Force hash-join strategy |
| 2 | `OPTION (LOOP JOIN)` | Force nested-loop strategy |
| 3 | `OPTION (MERGE JOIN)` | Force merge-join strategy |
| 4 | `OPTION (FORCE ORDER)` | Force the join order written in the query |

```python
from gymnasium import spaces
action_space = spaces.Discrete(5)

HINTS = {
    0: "",
    1: "OPTION (HASH JOIN)",
    2: "OPTION (LOOP JOIN)",
    3: "OPTION (MERGE JOIN)",
    4: "OPTION (FORCE ORDER)",
}
```

Action 0 matters more than it looks: it's not just "do nothing," it's the agent's only way to defer to the optimizer's own default plan — and Lesson 6 uses exactly that action as the baseline the reward is measured against.

## The observation: two features

Before choosing a hint, the agent sees a small observation vector: `date_range_days` (the width of the date window, normalized) and a territory-size proxy — the customer count in the sampled territory, also normalized. That's deliberately minimal. The agent doesn't see the query plan, the table statistics, or anything SQL Server itself uses — it has to learn a policy from just enough context to guess what kind of join strategy will pay off.

```python
import numpy as np
from gymnasium import spaces

observation_space = spaces.Box(low=0.0, high=1.0, shape=(2,), dtype=np.float32)
# obs[0] = date_range_days / 1095   (normalized against a 3-year max)
# obs[1] = territory_customer_count / max_customer_count
```

## Why this still counts as RL

Each episode here is one decision: sample a (date range, territory) pair, pick a hint, run the query once, get a reward, done. That's the shape of a contextual bandit, not a multi-step RL trajectory — there's no sequence of actions building toward a delayed outcome. This project frames it as RL anyway, through Gymnasium's `Env` interface and a PPO agent, for two honest reasons: it matches the rest of the lab's framing (Project 3 is RL too, via RLHF), and PPO handles a single-step episode without any changes — a contextual bandit is a special case of an RL problem, not a different one. Lesson 5 builds the actual `Env` subclass this framing plugs into.

## Key terms

- **Hint** — a query-text directive (`OPTION (HASH JOIN)`, etc.) that overrides or defers to the optimizer's own plan choice
- **Action space** — the fixed set of choices an RL agent picks from; here, `Discrete(5)`, one per hint including "no hint"
- **Observation** — the feature vector the agent sees before acting; here, normalized `date_range_days` and territory size
- **Contextual bandit** — a single-decision RL setting (no multi-step trajectory) where the right action depends on a context vector

## Recap

Project 1's query is a parameterized four-table AdventureWorks2012 join; the agent picks one of five hint actions (no hint, hash join, loop join, merge join, force order) based on a two-feature observation of date range and territory size, and each episode is a single decision framed as RL via Gymnasium for consistency with the rest of the lab. Next up, Lesson 5: building the custom `QueryPlanEnv` that actually runs these queries.
