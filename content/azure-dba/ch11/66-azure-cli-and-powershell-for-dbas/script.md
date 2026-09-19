# Script — Azure CLI & PowerShell for Database Administrators

## Segment 1 (title)

This isn't a scripting course. Most DBAs never write automation from a blank file — they read a script someone else wrote, recognize the handful of commands doing the real work, and adapt a parameter or two for their own server and database. That's the actual skill here: reading and modifying, not authoring from scratch.

## Segment 2 (code: az sql)

The Azure CLI talks to the same control plane as the portal, and returns JSON by default. "az sql db show" reads one database's configuration, "az sql db list" inventories every database on a server, and "az sql db update" is the one that changes something — here, moving a database to a new service tier without opening the portal at all.

## Segment 3 (code: Az.Sql PowerShell)

The same three operations in PowerShell: Get-AzSqlDatabase reads, Set-AzSqlDatabase changes. Notice the pattern — CLI uses dash-dash-flag value, PowerShell uses dash-Parameter Value. Once you can recognize that pattern, an unfamiliar script in either tool stops being intimidating.

## Segment 4 (outro)

The bar this course sets isn't scripting from scratch — it's reading an existing script enough to trust it, and changing a name or a tier before running it. Next up: what infrastructure as code buys a DBA, and where to go for hands-on Bicep practice.
