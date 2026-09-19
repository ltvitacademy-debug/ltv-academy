# Script — Lab: Build Your First Azure SQL Environment

## Segment 1 (title)

Chapter 1 was all conceptual. This lab turns it into something real — a live Azure SQL Database, deployed through the Portal, opened up to your machine, and connected to with SSMS.

## Segment 2 (steps: create server and database)

In the Portal, create a SQL database. Azure SQL Database always needs a logical server first — a container for authentication and firewall rules, not a physical machine. Leave compute and storage at the smallest tier; this lab is about proving connectivity, not performance.

## Segment 3 (steps: firewall and connect)

A fresh logical server rejects every connection by default, including yours. Add your client IP under the server's Networking blade, then connect in SSMS using the server's full name ending in database.windows.net and the login you set during creation.

## Segment 4 (code: prove it with a query)

Run a SELECT for DB_NAME, @@SERVERNAME, and SERVERPROPERTY Edition. A result set with an edition string containing "SQL Azure" confirms the Portal deployment, the firewall rule, and the SSMS connection all actually work together — the same SELECT syntax T-SQL Development already taught you.

## Segment 5 (outro)

Chapter 1 is complete. Chapter 2, Deploying Azure SQL, starts exactly where this lab leaves off — the same create flow by CLI instead of by hand, plus the full menu of purchasing models and compute options this lab skipped past at their smallest setting.
