# Script — PostgreSQL Configuration Files: postgresql.conf & pg_hba.conf

## Segment 1 (title)

Every PostgreSQL cluster has two configuration files that matter more than any others. postgresql.conf answers how the server should behave, and pg_hba.conf answers who is allowed to connect, from where, proving their identity how.

## Segment 2 (code: postgresql.conf)

postgresql.conf is a plain-text file controlling server-wide behavior — memory settings like shared_buffers and work_mem, listen_addresses, port, and max_connections. Most settings apply on a reload, but shared_buffers requires a full restart.

## Segment 3 (code: pg_hba.conf)

pg_hba.conf is host-based authentication: a list of rules, read top to bottom, where the first match wins. Each line specifies a connection type, database, user, address range, and authentication method.

## Segment 4 (steps: the columns)

The columns matter: TYPE is local or host, DATABASE and USER scope the rule, ADDRESS is a CIDR range, and METHOD is how the client proves identity — trust, peer, or the modern scram-sha-256. Nothing in SQL Server or Oracle has this per-address granularity.

## Segment 5 (outro)

Splitting behavior from authorization is deliberate — a DBA tuning memory doesn't need to touch auth rules, and both reload without an outage. Next up: databases, schemas, and tablespaces — PostgreSQL's real object hierarchy.
