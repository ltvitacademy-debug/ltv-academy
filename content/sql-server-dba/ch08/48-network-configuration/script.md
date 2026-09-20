# Script — Network Configuration

## Segment 1 (title)

Lesson 47 troubleshot a connectivity failure reactively. This lesson closes the chapter by covering the configuration itself — the settings in SQL Server Configuration Manager that determine whether, and how, SQL Server accepts network connections in the first place.

## Segment 2 (code: three protocols)

Configuration Manager exposes three protocols: Shared Memory for local-only connections, Named Pipes, largely legacy at this point, and TCP/IP, required for any remote connection. Express editions have historically shipped with TCP/IP disabled by default — a common, easily-missed cause of remote connection failures.

## Segment 3 (code: static vs. dynamic ports)

Under the TCP/IP protocol's IP Addresses tab, TCP Dynamic Ports lets SQL Server pick an available port at startup, which can change between restarts. Setting a fixed TCP Port instead forces a static port — the conventional choice for a default instance is static 1433.

## Segment 4 (steps: why a DBA picks static)

Named instances default to dynamic ports, which is exactly why SQL Server Browser exists. A DBA will often deliberately configure a static port for a named instance so firewall rules and connection strings stay stable and predictable across restarts.

## Segment 5 (outro)

Next up: Chapter Nine begins — version control for database objects, the start of Change Management.
