# Environment Variables and Connection References

By now you've built flows for Castlebridge Logistics, connected them to Dataverse and to a SQL Server database, and packaged them into a solution. There's a problem hiding in that work, though: every one of those flows currently points straight at Castlebridge's development environment — a dev database, a dev service account. Move that solution into Test or Production as-is, and it keeps talking to dev. This lesson covers the two solution components built specifically to fix that: environment variables and connection references.

## What you'll learn

- What an environment variable is, and the data types it can hold
- Why an environment variable's **definition** and its **value** are two separate things
- What a connection reference is, and how it differs from an environment variable
- How Castlebridge Logistics uses both together to move one flow safely from Dev to Test to Production

## Why a flow can't just hardcode values

A flow that references `sql-castlebridge-dev.database.windows.net` directly works fine in dev — and breaks the moment it's imported into Test or Production, because that server doesn't exist there. The fix isn't to manually edit the flow after every move. It's to never put environment-specific values in the flow in the first place, and instead point the flow at a named placeholder that gets filled in differently per environment.

## Environment variables: definition vs. value

An **environment variable** is a solution component with a display name, a data type (Text, Number, Two options, JSON, Secret, or Data source), and an optional default value. That's its **definition** — the shared shape every environment agrees on, and it's what travels inside a managed solution when you move it.

The **current value** is different: it's set per environment, it's unmanaged, and it's what the flow actually uses when it runs. Separating the two means the same flow definition can read a different SQL Server name in Dev, Test, and Production without a single edit to the flow itself.

![Creating an environment variable's definition, data type, and default value in the maker portal](/courses/power-automate/ch02/25-environment-variables-and-connection-references/new-environment-variable.png)
*Power Apps prompts for a Display name, Data Type, and optional Default Value when defining a new environment variable — the value itself is supplied later, per environment.*

## Connection references: decoupling the flow from a specific login

A **connection reference** solves a related but different problem: *which login* a connector action uses. Instead of a flow's SQL Server action pointing at one specific saved connection (tied to one specific account), it points at a connection reference — and each environment maps that reference to its own connection. Castlebridge's dev flows authenticate as `svc-flows-dev`; the same flow in production authenticates as `svc-flows-prod`, because the connection reference was remapped on import, not because anyone touched the flow.

When a solution containing environment variables is imported into a new environment, Power Apps stops during import and asks you to supply the value for each one right there — so Production gets Production's values before the solution finishes installing.

![Power Apps prompting for environment variable values during solution import](/courses/power-automate/ch02/25-environment-variables-and-connection-references/solution-import-environment-variables.png)
*The solution import screen lists every environment variable that needs a value for this target environment, showing its default or previously solution-supplied value alongside the field to override it.*

## Putting them together: Castlebridge's SQL Server flow across three environments

Castlebridge's shipment-sync flow uses one environment variable, `SQLServerName`, and one connection reference, `SQLServerConnection`. Each environment supplies its own pair:

| Environment | SQLServerName (variable) | SQLServerConnection (connection reference) |
|---|---|---|
| Dev | sql-castlebridge-dev...  | svc-flows-dev@castlebridgelogistics.com |
| Test | sql-castlebridge-test... | svc-flows-test@castlebridgelogistics.com |
| Prod | sql-castlebridge-prod... | svc-flows-prod@castlebridgelogistics.com |

The flow's internal logic — triggers, conditions, the SQL query itself — is byte-for-byte identical in all three. Only the externalized values change.

## Key terms

| Term | Meaning |
|---|---|
| Environment variable | A solution component that stores a value (server name, URL, flag) separately from the flow, so it can differ per environment |
| Definition | The shared shape of an environment variable (name, data type, default) that travels inside the managed solution |
| Current value | The actual value used at runtime in one specific environment; set separately from the definition |
| Connection reference | A solution component that lets a flow's connector action point at a different saved connection (login) in each environment |

## Recap

Environment variables externalize *data* that differs per environment; connection references externalize *which credential* a connector uses. Together, they're what let Castlebridge move the exact same flow definition from Dev to Test to Production without hand-editing it at every stop. Next up, Lesson 26: how Castlebridge should actually structure those Dev, Test, and Production environments in the first place.
