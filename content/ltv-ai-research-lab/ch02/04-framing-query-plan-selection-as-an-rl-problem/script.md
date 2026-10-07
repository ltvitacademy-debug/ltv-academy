# Script — Framing Query Plan Selection as an RL Problem

## Segment 1 (title)

Project 1 starts with a question SQL Server's own optimizer answers every time you run a query: given this exact statement, which execution plan should it use? Normally that decision is invisible. This lesson turns it into something an RL agent can learn to make instead.

## Segment 2 (steps)

Every episode runs the same shape of question against AdventureWorks2012: sales detail lines for a given territory and date range, joined across SalesOrderHeader, SalesOrderDetail, Product, and Customer. Start date and end date define a derived feature, date range days, and territory ID scopes which sales territory the join runs against.

## Segment 3 (code)

Instead of writing SQL, the agent picks one of five fixed actions, each a hint appended to the query text: no hint at all, which defers to the optimizer's own default plan, or one of hash join, loop join, merge join, or force order.

## Segment 4 (steps)

Before choosing, the agent sees a small two-feature observation: date range days, normalized, and a territory-size proxy, the customer count in that territory, also normalized. It doesn't see the query plan or table statistics the optimizer itself uses — just enough context to guess which join strategy will pay off.

## Segment 5 (outro)

Each episode here is really one decision, which makes this closer to a contextual bandit than a multi-step trajectory — but it's framed as RL through Gymnasium and trained with PPO anyway, matching the rest of the lab and requiring no special handling, since a single-step episode is just a special case of an RL problem. Up next, Lesson 5: building the custom QueryPlanEnv that actually runs these queries.
