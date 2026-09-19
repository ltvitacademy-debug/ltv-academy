# Script — Azure SQL Firewalls & Firewall Rules

## Segment 1 (title)

Every login and permission you configured in Chapter 4 assumes the connection already reached SQL Server. The firewall is the layer before that — it checks the source IP of every connection attempt, and if it isn't on the allow-list, the packet is rejected before login is even attempted.

## Segment 2 (screenshot: server-level firewall rule)

A server-level firewall rule applies to every database on the logical server — a name, a start IP, and an end IP. Anything outside that range never gets far enough to try a password.

## Segment 3 (screenshot: networking settings page)

The server's Networking page holds every firewall rule, the public network access toggle, and one setting that trips people up — "Allow Azure services and resources to access this server."

## Segment 4 (steps: three ways in)

Server-level rules cover the whole server. Database-level rules scope one database differently — useful for a vendor that only needs one reporting database. And the Azure-services checkbox doesn't allow one resource, it opens the door to any Azure resource in any subscription that also passes login.

## Segment 5 (outro)

Get the firewall wrong and no correctly-scoped permission downstream fixes it — the packet never arrives. Next up: Virtual Networks and service endpoints, a tighter control than an IP allow-list.
