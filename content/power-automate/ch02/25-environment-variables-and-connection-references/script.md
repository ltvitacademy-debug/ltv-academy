# Script — Environment Variables and Connection References

## Segment 1 (title)

Welcome back to Power Automate. You've built flows, connected them to Dataverse and SQL Server, and packaged them into a solution. But right now, every one of those flows is wired to Castlebridge Logistics' development environment. This lesson covers the two features that let the exact same flow move safely into test and production.

## Segment 2 (steps)

Power Automate gives you two separate tools for this. An environment variable stores a value — a server name, a site URL, a flag — that's different in every environment, without hardcoding it into the flow. A connection reference stores which login or service account a flow's connector uses, separately from the flow itself. Keep those two straight: environment variables carry data, connection references carry credentials, and a real ALM setup almost always needs both.

## Segment 3 (screenshot)

Here's an environment variable's definition inside a solution in the maker portal. It has a display name, a data type — text, number, yes or no, JSON, secret, or a data source reference — and an optional default value. The definition is what travels inside the managed solution; it's the shared shape every environment agrees on.

## Segment 4 (screenshot)

The actual value is separate, and that separation is the whole point. When Castlebridge imports this solution into its production environment, Power Apps stops and asks for each environment variable's current value right there in the import screen — so production gets production's SQL Server, without anyone editing the flow.

## Segment 5 (code)

Connection references work the same way behind the scenes. Castlebridge's SQL Server flow references one environment variable for the server name and one connection reference for which service account authenticates. Dev, test, and production each get their own pair of values — the flow's internals never change.

## Segment 6 (outro)

With values and credentials both externalized, Castlebridge can promote a flow from dev to test to production with confidence. Next, we'll zoom out to how those three environments themselves should be organized.
