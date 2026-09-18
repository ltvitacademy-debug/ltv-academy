# Script — Deploying Azure SQL With Bicep

## Segment 1 (title)

Azure DBA Lesson 3 covered Azure SQL Database versus Managed Instance versus a SQL Server VM. This lesson deploys the first of those — a logical server plus one database — as code, with the database declared as the server's child using the same automatic-dependency pattern from Lesson 12.

## Segment 2 (code: secure parameters)

A password never belongs in the file. The admin password is declared as a secure parameter, which tells Bicep never to log it in deployment history or output it anywhere — it has to come from a Key Vault reference, an environment variable, or a CI/CD secret at deploy time.

## Segment 3 (code: what's actually different)

The mechanics are identical to deploying a Storage Account — a resource block, a name, a deploy command. What's different is the shape: Azure SQL is a server-and-database pair, where a Storage Account was one resource on its own. Most real Azure data resources work this way.

## Segment 4 (screenshot: confirming it worked)

The CLI returning success is one signal. The Azure Portal's own deployment history for that resource group is the second, independent confirmation — showing the deployment as succeeded alongside every resource it actually touched.

## Segment 5 (outro)

A parent-child resource pair, a secret handled properly, and confirmation from a second, independent source. Next up: ARM templates versus Bicep.
