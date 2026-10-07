# Building a Custom Query-Optimization Environment

Gymnasium is the standard interface for RL environments, and stable-baselines3 expects exactly that interface. This lesson builds `QueryPlanEnv`, the custom `Env` subclass that turns Lesson 4's framing into something a PPO agent can actually train against: it samples episodes, executes the hinted SQL for real against a sandboxed AdventureWorks2012 copy, and reports back what happened.

## What you'll learn

- The `gymnasium.Env` contract: `reset()`, `step()`, `action_space`, `observation_space`
- How `reset()` samples a fresh (date_range_days, territory) pair
- How `step()` builds and executes the hinted SQL via pyodbc
- Why every episode here terminates after exactly one step

## The Env skeleton

```python
import gymnasium as gym
from gymnasium import spaces
import numpy as np
import pyodbc

class QueryPlanEnv(gym.Env):
    def __init__(self, conn_str, territories):
        super().__init__()
        self.action_space = spaces.Discrete(5)
        self.observation_space = spaces.Box(low=0.0, high=1.0, shape=(2,), dtype=np.float32)
        self.conn = pyodbc.connect(conn_str)
        self.territories = territories  # list of (territory_id, customer_count)
        self.rng = np.random.default_rng()
```

The constructor takes a pyodbc connection string pointed at the sandboxed AdventureWorks2012 copy, and a precomputed list of territories with their customer counts — that list is what makes the territory-size proxy in the observation cheap to compute at reset time, instead of querying it fresh on every episode.

## `reset()`: sample a fresh episode

```python
def reset(self, seed=None, options=None):
    super().reset(seed=seed)
    start_offset = self.rng.integers(0, 1000)
    range_days = self.rng.integers(1, 1095)  # 1 day to 3 years
    territory_id, cust_count = self.territories[self.rng.integers(0, len(self.territories))]

    self._episode = {
        "start_offset": start_offset,
        "range_days": range_days,
        "territory_id": territory_id,
    }
    obs = np.array([range_days / 1095, cust_count / self._max_cust], dtype=np.float32)
    return obs, {}
```

Each call samples a fresh date range width and a fresh territory, builds the observation from them, and stores enough state in `self._episode` for `step()` to build the actual SQL a moment later. Nothing executes against the database yet — `reset()` only samples the *parameters* for the episode.

## `step()`: execute the hinted query for real

```python
def step(self, action):
    hint = HINTS[action]
    start_date, end_date = self._dates_from_episode()
    sql = f"""
    SELECT soh.SalesOrderID, sod.OrderQty, sod.LineTotal, p.Name, c.CustomerID
    FROM Sales.SalesOrderHeader AS soh
    JOIN Sales.SalesOrderDetail AS sod ON sod.SalesOrderID = soh.SalesOrderID
    JOIN Production.Product AS p ON p.ProductID = sod.ProductID
    JOIN Sales.Customer AS c ON c.CustomerID = soh.CustomerID
    WHERE soh.TerritoryID = {self._episode['territory_id']}
      AND soh.OrderDate BETWEEN '{start_date}' AND '{end_date}'
    {hint};
    """
    reads = self._run_and_capture_reads(sql)
    reward = self._compute_reward(action, reads)

    obs = self._current_obs()
    terminated, truncated = True, False
    info = {"logical_reads": reads, "hint": hint}
    return obs, reward, terminated, truncated, info
```

`step()` does the real work: build the hinted SQL text from the episode's sampled parameters, run it against the sandbox, and capture logical reads — the next lesson covers exactly how that reward is computed. Every episode sets `terminated=True` after this single step and `truncated=False`, since there's no horizon to run out of — one decision is the whole episode, matching Lesson 4's contextual-bandit framing.

## Capturing logical reads via pyodbc

```python
def _run_and_capture_reads(self, sql):
    cursor = self.conn.cursor()
    cursor.execute("SET STATISTICS IO ON;")
    cursor.execute(sql)
    cursor.fetchall()
    messages = cursor.messages  # pyodbc surfaces STATISTICS IO text here
    reads = self._parse_logical_reads(messages)
    cursor.execute("SET STATISTICS IO OFF;")
    return reads
```

`SET STATISTICS IO ON` makes SQL Server emit a text message per table reporting logical reads, physical reads, and read-ahead reads for that query execution. pyodbc exposes those as informational messages on the cursor, which a small parser extracts the logical-read totals from — that per-table breakdown gets summed into the single `reads` number the reward function in Lesson 6 uses.

## Key terms

- **`gymnasium.Env`** — the base class defining the `reset()`/`step()` contract every RL environment in this ecosystem implements
- **Sandboxed database copy** — an isolated AdventureWorks2012 instance the environment executes against, so no training run touches production-shaped data
- **`SET STATISTICS IO ON`** — a SQL Server session setting that reports logical/physical reads per table for each executed statement
- **Single-step episode** — an episode that always terminates after one `step()` call, matching the contextual-bandit framing from Lesson 4

## Recap

`QueryPlanEnv` is a `gymnasium.Env` subclass whose `reset()` samples a fresh (date_range_days, territory) pair into an observation, and whose `step()` builds the hinted SQL, executes it against a sandboxed AdventureWorks2012 copy via pyodbc, captures logical reads through `SET STATISTICS IO ON`, and returns a terminated-after-one-step transition. Next up, Lesson 6: turning those captured logical reads into the actual reward signal.
