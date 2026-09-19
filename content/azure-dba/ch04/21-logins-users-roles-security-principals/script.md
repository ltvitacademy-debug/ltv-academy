# Script — Logins, Users, Roles & Security Principals

## Segment 1 (title)

Every permission question comes back to one structural fact: logins live at the server level, users live at the database level, and they're two different objects that happen to be connected.

## Segment 2 (code: login vs user)

A login answers "can this identity connect to the server at all." A user answers "what can this identity do inside this one specific database." The same login can map to differently-named, differently-permissioned users in different databases.

## Segment 3 (code: fixed server roles)

sysadmin, securityadmin, dbcreator -- these apply across the entire server, not one database. Every login lands in public automatically, with minimal baseline rights.

## Segment 4 (code: fixed database roles)

db_owner, db_datareader, db_datawriter apply only inside the database they're assigned in. The same server can host one database where you're db_owner and another where you have no access at all.

## Segment 5 (outro)

Server-level connection rights, database-level permissions, and roles at both scopes. Next up: when a fixed role like db_datareader is the right tool, versus granting specific object-level permissions instead.
