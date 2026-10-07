# Script — Connecting to SQL Server from Power Automate

## Segment 1 (title)

Not every system Castlebridge Logistics relies on lives in Dataverse. Its finance team still runs core reporting out of an on-premises SQL Server database. This lesson covers the SQL Server connector, so a flow can read from, and write back to, that existing database directly — no migration to Dataverse required.

## Segment 2 (steps)

Three things need to be in place before a flow can talk to SQL Server. If the database isn't reachable from the public internet, the flow needs an on-premises data gateway installed on a machine inside that network. The connection itself needs a server name, a database name, and an authentication method. And whatever SQL login that connection uses needs real permission on the tables the flow will touch, the same as any other application connecting to that database.

## Segment 3 (screenshot)

Every SQL Server action starts the same way: naming the server. You can pick an existing connection's settings, or enter a server name directly, exactly like Castlebridge's flow does here on its Get rows action before it ever touches a row of data.

## Segment 4 (screenshot)

Once the server is set, the action asks which database on that server to use. For Castlebridge, that's the finance team's reporting database, the one holding shipment and invoice records the flow needs to read.

## Segment 5 (code)

Beyond Get rows, the Execute a SQL query action runs a query you write yourself. This one pulls shipment records still in transit, straight out of the finance team's SQL Server database, the same database their nightly reports already read from.

## Segment 6 (outro)

That's the SQL Server connector: a gateway, a connection, and the same query skills you already know. Chapter 2 continues from here.
