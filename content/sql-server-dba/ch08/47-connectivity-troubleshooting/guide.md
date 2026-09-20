# Connectivity Troubleshooting

"I can't connect" is one of the most common tickets a DBA receives, and it has a
surprisingly short, orderable list of real causes. This lesson works through that list
in the order a DBA should actually check it.

## What you'll learn

- Using `ping` and `telnet` to isolate a network-layer problem from a SQL Server-layer
  problem
- Why SQL Server Browser matters specifically for named instances
- Checking the SQL Server error log for connection-refused entries
- Firewall rules as a common, easily overlooked cause

## Step 1: Is the server even reachable?

Start below the database layer entirely. `ping` confirms basic network reachability
(and can be blocked by firewalls even when the server is fine, so a failed ping isn't
conclusive on its own):

```
ping SQLSRV02
```

`telnet` to the SQL Server port tests whether something is actually listening and
accepting TCP connections on it — this isolates "the network path and port are open"
from "SQL Server itself has a problem":

```
telnet SQLSRV02 1433
```

A connection refused or a timeout here means the problem is before SQL Server ever
gets involved — a firewall, the service not running, or the wrong port — not a
credentials or permissions issue.

## Step 2: Named instances and SQL Server Browser

A default instance always listens on TCP 1433. A **named instance** typically listens
on a dynamically assigned port instead, and a client connecting by instance name (e.g.
`SQLSRV02\PROD`) needs to discover that port. The **SQL Server Browser** service
handles that discovery, listening on UDP 1434 and responding with the actual port the
named instance is using.

If Browser isn't running, a client that doesn't already know the exact port can fail
to connect to a named instance even though the instance itself is healthy and TCP/IP
is enabled correctly — a classic case where the fix is starting a completely different
service than the one that seems to be failing.

## Step 3: Firewall rules

Windows Firewall (or a network firewall in between) blocking the SQL Server port is
one of the most common real-world causes of "works locally, fails remotely." The
Database Engine's TCP port (1433, or the named instance's dynamic port) and, if named
instances are in play, UDP 1434 for Browser, both need inbound rules allowing the
traffic. This is worth checking early since it produces exactly the same symptom as
the service being stopped — a connection that fails before authentication is ever
attempted.

## Step 4: The SQL Server error log

If the network path is confirmed open (ping/telnet succeed, or at least reach the
port) but the connection still fails, the SQL Server error log itself often has the
answer — look for entries around the time of the failed connection attempt. Common
entries include login failures (a credentials problem, not a connectivity one) and
messages indicating the server rejected the connection for reasons like exceeding the
maximum allowed connections, or TCP/IP being disabled at the protocol level even though
the service is running.

## Key terms

| Term | Meaning |
|---|---|
| `ping` | Confirms basic network reachability, but not port-level connectivity |
| `telnet <host> 1433` | Tests whether the SQL Server port is open and accepting connections |
| SQL Server Browser | UDP 1434 service that resolves a named instance to its dynamic port |
| Firewall rule | Must allow the Engine's TCP port (and Browser's UDP 1434, for named instances) |

## Check yourself

A client can't connect to `SQLSRV02\PROD`, a named instance. `ping SQLSRV02` succeeds.
What's the next thing to check, and why might a stopped SQL Server Browser service be
the cause even though the Database Engine itself is running fine?
