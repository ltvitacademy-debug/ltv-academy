# Script — Server Principals & Logins

## Segment 1 (title)

A principal is any entity SQL Server can authenticate and grant permissions to. A login is a server-level principal — it gets you in the door of the instance, nothing more.

## Segment 2 (code: two kinds of logins)

Two kinds of logins. A Windows-authenticated login maps an existing AD identity with CREATE LOGIN FROM WINDOWS. A SQL Server login stores its own password, with CHECK_POLICY and CHECK_EXPIRATION controlling how strictly it follows Windows password rules.

## Segment 3 (code: inspecting logins)

Every login lives as a row in sys.server_principals — logins, Windows users and groups, and server roles all show up there. type_desc tells you exactly what kind of principal you're looking at.

## Segment 4 (steps: the distinction that trips people up)

A login authenticates to the instance. It does not, by itself, grant access to any database. That's the distinction that trips people up: a login that connects fine but hits a permission error on every query is missing a database user mapping.

## Segment 5 (outro)

Next up: database principals and users — mapping a login into a database, and contained database users that skip the server login entirely.
