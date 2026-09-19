# Script — Private Endpoints & Private Link

## Segment 1 (title)

A firewall rule and a VNet service endpoint both narrow who can reach Azure SQL's public endpoint — neither removes it. A Private Endpoint does: a private IP for your database, inside your own VNet, powered by Azure Private Link. Traffic never touches the public internet.

## Segment 2 (screenshot: pending connection)

Creating a Private Endpoint isn't automatic from one side alone — it's a connection request. Before approval, it sits Pending. Traffic isn't flowing yet.

## Segment 3 (screenshot: approved connection)

Once someone with the right permission on the Azure SQL server approves it, the same connection flips to Approved and the private IP path goes live. That approval step is itself a security control.

## Segment 4 (code: what quietly breaks it)

A private IP only helps if DNS actually resolves to it. That needs a privatelink.database.windows.net Private DNS zone linked to the VNet — skip it, and clients keep resolving to the public IP, silently bypassing the private path entirely.

## Segment 5 (outro)

Private Endpoints are the strongest network control in this chapter, but they cost setup complexity and require real network line-of-sight for every client. Next up: the real decision — when public-with-a-firewall is enough, and when it isn't.
