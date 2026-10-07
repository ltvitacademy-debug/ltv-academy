# Building a Reward Signal From Execution Correctness

RLHF needs a reward: some function that looks at a generated SQL query and returns a number saying how good it is. For SQL Pete, that function doesn't come from a human rater or a learned reward model — it comes from actually running the query. This lesson builds that execution-correctness reward, and the hard safety rule that has to sit in front of it.

## What you'll learn

- Why execution correctness is a good programmatic reward for NL-to-SQL
- The exact reward schedule: +1.0, +0.3, -0.3, -1.0
- The non-negotiable safety rule: reject non-SELECT statements before execution
- How to implement the reward function against a sandboxed database copy

## Why execution correctness

The whole point of NL-to-SQL is that the generated query, when run, returns the right rows. That gives Project 3 a reward signal that doesn't require a human to sit and rate thousands of SQL outputs by hand: run the generated query against a sandboxed copy of the target database (Northwind or AdventureWorks2012, matching the question's schema), run the gold query too, and compare the two result sets. If they match, the query was correct — reward that.

## The safety rule, first

Before any execution happens, every generated query passes through a hard filter: only `SELECT` statements are allowed to run. Anything else — `UPDATE`, `DELETE`, `DROP`, `INSERT`, `ALTER`, or any other data-modifying or destructive statement — is rejected before it ever touches the sandboxed database, no exceptions.

```python
DISALLOWED_KEYWORDS = (
    "UPDATE", "DELETE", "DROP", "INSERT",
    "ALTER", "TRUNCATE", "MERGE", "EXEC",
)

def is_safe_select(sql: str) -> bool:
    normalized = sql.strip().upper()
    if not normalized.startswith("SELECT"):
        return False
    return not any(kw in normalized for kw in DISALLOWED_KEYWORDS)
```

This matters beyond this one project. A reward-optimizing policy will find any loophole that scores well — if destructive statements were executable and somehow scored positively, nothing in the training process would stop the policy from learning to emit them. The safety rule removes that possibility structurally, by refusing to execute anything but a read-only query, rather than relying on the reward function to discourage it after the fact. That's the right way to think about alignment for an autonomous system with access to a real side effect: don't just penalize the bad outcome, make it unreachable.

## The reward schedule

Once a query passes the safety filter, it's executed against the sandbox and scored on a fixed schedule:

```python
def execution_reward(generated_sql, gold_sql, db_conn):
    if not is_safe_select(generated_sql):
        return -1.0  # disallowed non-SELECT statement

    try:
        got_rows = run_query(db_conn, generated_sql)
    except SqlSyntaxError:
        return -0.3  # query didn't even parse/execute

    gold_rows = run_query(db_conn, gold_sql)
    got_set, gold_set = set(map(tuple, got_rows)), set(map(tuple, gold_rows))

    if got_set == gold_set:
        return 1.0   # exact result-set match
    if got_set & gold_set:
        return 0.3   # partial / subset match
    return -0.3      # ran fine, but wrong rows
```

- **+1.0** — the generated query's result set exactly matches the gold query's result set, compared as sets of rows (order-insensitive — `WHERE Country = 'Germany'` returning the same customers in a different row order still scores a full match).
- **+0.3** — a partial or subset match: some overlap between the two result sets, but not an exact match.
- **-0.3** — the query executed without a disallowed statement but hit a SQL syntax error, or executed cleanly but returned the wrong rows entirely.
- **-1.0** — the query is a disallowed non-SELECT statement, caught and rejected by the safety filter before execution.

## Order-insensitive comparison, deliberately

Comparing result sets as Python `set`s of row tuples, rather than ordered lists, means a correct query isn't punished for returning rows in a different order than the gold query — SQL doesn't guarantee row order without an explicit `ORDER BY`, so an order-sensitive comparison would reward or punish queries based on something that isn't actually part of correctness.

## What this reward powers

This execution-correctness function is the entire reward model for Project 3 — there's no separate learned reward model the way Project 2 trains one for data quality. Lesson 18 plugs this function directly into TRL's `PPOTrainer` as the signal that drives RLHF.

## Key terms

- **Execution-correctness reward** — a reward computed by running generated SQL and comparing its result set to a gold query's result set, rather than by a learned or human rater
- **Sandboxed database** — an isolated copy of the target schema that generated queries run against, so nothing touches real/production data
- **Safety filter** — the pre-execution check that rejects any non-SELECT statement outright, before the reward function or the database ever sees it
- **Order-insensitive set comparison** — comparing two result sets as unordered collections of rows, since SQL doesn't guarantee row order without `ORDER BY`

## Recap

SQL Pete's reward comes from actually running its generated SQL: +1.0 for an exact result-set match, +0.3 for partial overlap, -0.3 for a syntax error or wrong rows, and -1.0 for a disallowed non-SELECT statement — which is rejected before execution by a hard safety filter, not merely penalized after the fact. Next up, Lesson 18: plugging this reward into RLHF with TRL's PPOTrainer.
