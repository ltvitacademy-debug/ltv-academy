# Script — Project: Migrate & Secure the Environment

## Segment 1 (title)

Same Meridian Fleet Logistics environment from Lesson 90 — now you have to decide where each database lands in Azure, how to lock down driver data, and how to migrate without breaking the morning dispatch window.

## Segment 2 (steps: three decisions)

Three separate decisions here: which deployment target actually survives OrderManagement and DriverHR's cross-database queries and Agent job; which security controls actually answer Compliance's specific worry about SSNs and license numbers; and which migration approach respects Ops' constraint that dispatch can't go down.

## Segment 3 (code: why Managed Instance wins for two of the three)

OrderManagement and DriverHR depend on cross-database queries and a nightly Agent job — both blockers for Azure SQL Database, so they move to Managed Instance. Telemetry has neither dependency; it's one fast-growing, append-heavy table, which is exactly what Hyperscale is built for. Two different databases, two different justified answers.

## Segment 4 (steps: the security controls, matched to the actual worry)

Microsoft Entra ID authentication replaces the shared login nobody owns. Always Encrypted keeps the SSN and license columns unreadable even to a DBA running an ad hoc query, which is what TDE alone doesn't cover. And a private endpoint plus SQL Auditing takes both databases off the public internet with an actual paper trail behind them.

## Segment 5 (outro)

The environment's migrated with an online cutover that respects the dispatch window, and it's locked down against the specific risk Compliance named. Next: the 7-9am timeout itself, and the manual maintenance nobody's kept up with.
