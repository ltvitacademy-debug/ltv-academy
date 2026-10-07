# Connecting to SQL Server from Power Automate

Not every system Castlebridge Logistics relies on lives in Dataverse. Its finance team still runs core reporting out of an on-premises SQL Server database, and migrating that database isn't on the table. This lesson covers the SQL Server connector, so a flow can read from — and write back to — that existing database directly, no migration required.

## What you'll learn

- What has to be in place before a flow can reach an on-premises SQL Server database
- How the SQL Server connector's actions ask for a server, then a database
- The difference between Get rows and Execute a SQL query
- How Castlebridge's finance team uses the connector against its own reporting database

## What the SQL Server connector needs

Three things have to be in place before a flow can talk to SQL Server:

- **An on-premises data gateway** — required if the database isn't reachable from the public internet, which is true for most corporate SQL Server installs. The gateway is a small piece of software installed on a machine inside that network.
- **A connection** — a server name, a database name, and an authentication method (Windows auth or SQL login).
- **Permissions** — the SQL login behind that connection needs real rights on the tables the flow will touch, the same as it would for any other application connecting to that database.

## Naming the server

![The SQL Server connector's Get rows action, prompting for a server name](/courses/power-automate/ch02/18-connecting-to-sql-server/sql-select-server.png)
*The SQL Server connector's Get rows action, prompting for a server name from the existing connection or a custom value.*

Every SQL Server action starts the same way: naming the server. You can pick an existing connection's settings, or type a server name directly — exactly what Castlebridge's flow does here on its Get rows action, before it ever touches a row of data.

## Naming the database

![The same Get rows action, now prompting for a database name](/courses/power-automate/ch02/18-connecting-to-sql-server/sql-select-database.png)
*Once the server is set, the same action prompts for which database on that server to read from.*

Once the server is chosen, the action asks which database on that server to use. For Castlebridge, that's the finance team's reporting database — the one holding shipment and invoice records the flow needs to read.

## Writing your own query

Get rows and List rows cover the common cases, but sometimes you need a query only you would write. The **Execute a SQL query** action runs exactly that:

```
SELECT ShipmentID, Origin, Destination, DeliveryDate
FROM dbo.Shipments
WHERE Status = 'In Transit'
```

Castlebridge Logistics' finance team stores shipment records in a SQL Server database that this flow reads from — pulling only the shipments still in transit, straight out of the same database their nightly reports already query.

## Key terms

- **On-premises data gateway** — software installed inside a private network that lets Power Automate reach a database not exposed to the public internet
- **Connection** — a saved server name, database name, and authentication method the SQL Server connector reuses across actions
- **Get rows** — the SQL Server action that retrieves rows from a named table
- **Execute a SQL query** — the SQL Server action that runs a custom SQL statement you write yourself
