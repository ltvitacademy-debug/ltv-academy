# Network Configuration

Lesson 47 troubleshot a connectivity failure reactively. This lesson closes the chapter
by covering the configuration itself — the settings in **SQL Server Configuration
Manager** that determine whether, and how, SQL Server accepts network connections in
the first place.

## What you'll learn

- The three network protocols Configuration Manager manages, and when each applies
- Enabling TCP/IP for remote connections
- Static vs. dynamic port configuration, and why a DBA might deliberately choose static

## SQL Server Configuration Manager's protocols

Configuration Manager exposes three network protocols per instance, under SQL Server
Network Configuration:

| Protocol | Use case |
|---|---|
| **Shared Memory** | Local-only connections from the same machine; fastest, but unusable for anything remote |
| **Named Pipes** | Local or same-domain network connections; largely legacy at this point |
| **TCP/IP** | The standard protocol for any remote connection over a network |

A fresh SQL Server install typically has Shared Memory enabled and, depending on
edition and install choices, TCP/IP may or may not be enabled by default — Express
editions in particular have historically shipped with TCP/IP disabled, which is a
common, easily-missed cause of "the server works locally but nothing remote can
connect," distinct from every firewall or Browser issue covered in Lesson 47.

## Enabling TCP/IP for remote connections

If TCP/IP shows **Disabled** in Configuration Manager under the instance's Network
Configuration, no remote client can connect over the network regardless of firewall
rules or Browser — the protocol itself is off at the Engine level. Enabling it requires
a restart of the Database Engine service to take effect; this is one of the few
Configuration Manager changes that isn't live immediately.

## Static vs. dynamic ports

Under the TCP/IP protocol's properties, the **IP Addresses** tab controls port
behavior per IP, via two fields:

- **TCP Dynamic Ports** — when set (the default for named instances), SQL Server picks
  an available port at startup, which can change between restarts
- **TCP Port** — a fixed value here forces a **static port**, ignored if a dynamic
  port value is also present (clearing the dynamic ports field is required to use a
  static port cleanly)

A default instance is conventionally given the static port 1433. Named instances
default to dynamic ports (which is exactly why Lesson 47's SQL Server Browser exists —
to resolve that changing port for clients). A DBA will often deliberately configure a
static port for a named instance specifically to make firewall rules and connection
strings predictable and stable across restarts, trading away some of the automatic
convenience for operational predictability — an explicit, fixed firewall rule is
simpler to reason about and audit than one that has to track a port that could change.

## Key terms

| Term | Meaning |
|---|---|
| Shared Memory | Fastest protocol, local-machine connections only |
| Named Pipes | Local/same-domain network protocol, largely legacy |
| TCP/IP | The protocol required for any remote network connection |
| TCP Dynamic Ports | SQL Server picks an available port at startup; can change between restarts |
| TCP Port (static) | A fixed, administrator-chosen port, more predictable for firewall rules |

## Check yourself

A named instance needs a stable firewall rule that won't break after the next SQL
Server restart. What Configuration Manager setting would you change, and why does the
default dynamic-port behavior make that unstable in the first place?
