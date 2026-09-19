# Script — Troubleshooting Azure SQL Connectivity

## Segment 1 (title)

A connection failure could be caused by any layer this chapter covered, or by something outside it entirely, like a wrong password. Checking layers in the wrong order wastes time — there's no point debugging TLS if the firewall rejected the packet first.

## Segment 2 (steps: the real order)

Check firewall rules first, against the client's actual current IP, not the one you assumed. Then VNet service endpoints, Virtual Network rules, and NSGs — NSGs are evaluated independently and can block traffic even when everything else is correct. Then, for Private Link, whether DNS actually resolves to the private IP. Then TLS version, which fails after the network path already succeeded.

## Segment 3 (code: the DNS check)

From inside the VNet, nslookup against the server's name should resolve to the private IP through the privatelink.database.windows.net zone. If it resolves to a public IP instead, the Private DNS zone isn't linked, or a record is stale.

## Segment 4 (outro)

That closes Chapter 5, Azure SQL Network Security. Chapter 6, Data Security and Compliance, is next — encrypting data at rest and in use, masking it, restricting it by row, classifying it, and auditing who actually touched it.
