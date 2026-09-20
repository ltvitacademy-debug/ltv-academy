# Listener Configuration

Lesson 17 introduced the listener as a virtual network name applications connect to instead of a
specific server. This lesson goes into how it's actually configured and why that specific design
choice — connecting to a name, never a server — is what makes failover invisible to applications.

## What you'll learn

- What the listener actually is at the network level: a VNN plus one or more virtual IPs
- The real T-SQL to add a listener to an existing AG
- Why application connection strings should reference the listener, never a replica

## What the listener actually is

The **Availability Group listener** consists of:

- A **virtual network name (VNN)** — a DNS name registered for the AG, separate from any
  replica's own machine name.
- One or more **virtual IP addresses (VIPs)** — typically one per subnet the replicas live in, so
  the listener works whether the current primary is in the datacenter's primary or DR subnet.
- A **listener port** — defaults to 1433 but can be set separately from each SQL Server instance's
  own port.

The listener is itself a resource inside the WSFC. When a client resolves the VNN, DNS returns the
VIP, and the WSFC ensures that VIP is currently bound to whichever node is hosting the primary
replica. After a failover, the WSFC rebinds the VIP to the new primary's node — the DNS name never
changes, only which physical node answers for that IP.

## Creating a listener

```sql
ALTER AVAILABILITY GROUP [AG_Sales]
ADD LISTENER 'AGSalesListener' (
  WITH IP (('10.10.1.50', '255.255.255.0')),
  PORT = 1433
);
```

For a multi-subnet AG (common when a secondary sits in a different datacenter/subnet), multiple
IPs are supplied — one per subnet:

```sql
ALTER AVAILABILITY GROUP [AG_Sales]
ADD LISTENER 'AGSalesListener' (
  WITH IP
    (('10.10.1.50', '255.255.255.0'),
     ('10.20.1.50', '255.255.255.0')),
  PORT = 1433
);
```

Only the IP address matching the subnet of whichever node is currently primary is active at a
given time; DNS round-robin combined with client retry logic (`MultiSubnetFailover=True` in the
connection string) lets the client find the right one quickly after a cross-subnet failover.

## Why applications must connect to the listener, not a replica name

If an application's connection string points directly at `SQLNODE1`, a failover to `SQLNODE2`
breaks every connection permanently — there's no mechanism redirecting that hardcoded name. Pointing
the connection string at the listener name (`AGSalesListener`) means the *name* never has to
change; only the routing behind it does, transparently, as part of the failover process the WSFC
already handles. This is the entire reason the listener exists as a separate object rather than
just documenting "connect to whichever server is currently primary."

## Key terms

| Term | Meaning |
|---|---|
| Virtual network name (VNN) | The DNS name clients resolve to reach the AG's current primary |
| Virtual IP (VIP) | The IP address bound to whichever node currently hosts the primary replica |
| `MultiSubnetFailover=True` | Connection string setting that speeds up client reconnection across subnets after failover |

## Check yourself

An application's connection string is hardcoded to `SQLNODE1\SalesDB` instead of the AG listener
name. A planned failover moves the primary role to `SQLNODE2`. What happens to the application,
and what's the fix?
