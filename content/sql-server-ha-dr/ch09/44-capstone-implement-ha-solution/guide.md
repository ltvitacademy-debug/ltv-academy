# Capstone: Implement the HA Solution

Lesson 42 made the decision — one Availability Group, three replicas, meeting Bellhaven's RPO and
both RTOs at once. Lesson 43 got the backup chain in place underneath it. This lesson builds
AG_Bellhaven itself: the endpoints, the availability group, the three replicas with their commit
and failover modes, and the listener that keeps the application's connection string the same no
matter which replica is primary.

## What you'll learn

- The endpoint every replica needs before an AG can exist at all
- The exact `CREATE AVAILABILITY GROUP` shape for a three-replica, mixed sync/async topology
- Why the listener is what actually makes failover invisible to the application

## Step one: a database mirroring endpoint on every instance

Availability Groups reuse the same endpoint mechanism as the legacy database mirroring feature
(Chapter 6) — every instance that will host a replica needs one, listening for the other replicas'
traffic:

```sql
-- Run on SQLPRD01, SQLPRD02, and SQLDR01
CREATE ENDPOINT [Hadr_endpoint]
    STATE = STARTED
    AS TCP (LISTENER_PORT = 5022)
    FOR DATABASE_MIRRORING (
        ROLE = ALL,
        AUTHENTICATION = WINDOWS NEGOTIATE,
        ENCRYPTION = REQUIRED ALGORITHM AES
    );
```

## Step two: create the availability group on the primary

With endpoints in place, `CREATE AVAILABILITY GROUP` runs once, on SQLPRD01, defining all three
replicas and their behavior in a single statement:

```sql
CREATE AVAILABILITY GROUP AG_Bellhaven
    WITH (AUTOMATED_BACKUP_PREFERENCE = SECONDARY)
    FOR DATABASE BellhavenOLTP
    REPLICA ON
        'SQLPRD01' WITH (
            ENDPOINT_URL = 'TCP://sqlprd01.bellhaven.local:5022',
            AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
            FAILOVER_MODE = AUTOMATIC),
        'SQLPRD02' WITH (
            ENDPOINT_URL = 'TCP://sqlprd02.bellhaven.local:5022',
            AVAILABILITY_MODE = SYNCHRONOUS_COMMIT,
            FAILOVER_MODE = AUTOMATIC),
        'SQLDR01' WITH (
            ENDPOINT_URL = 'TCP://sqldr01.bellhaven.local:5022',
            AVAILABILITY_MODE = ASYNCHRONOUS_COMMIT,
            FAILOVER_MODE = MANUAL);
```

Notice the deliberate split: SQLPRD01 and SQLPRD02 are `SYNCHRONOUS_COMMIT` with
`FAILOVER_MODE = AUTOMATIC` — that pair can fail over to each other in seconds, without a human,
because they're close enough to commit synchronously. SQLDR01 is `ASYNCHRONOUS_COMMIT` with
`FAILOVER_MODE = MANUAL` — over 175 miles, waiting for synchronous confirmation on every
transaction isn't realistic, and a manual failover step means a human confirms a real disaster is
happening before Bellhaven fails over to a replica that may be seconds behind.

## Step three: join the secondaries and seed the database

Each secondary joins the AG, then the database itself is added:

```sql
-- Run on SQLPRD02 and SQLDR01
ALTER AVAILABILITY GROUP AG_Bellhaven JOIN;
ALTER AVAILABILITY GROUP AG_Bellhaven GRANT CREATE ANY DATABASE;

-- Run on SQLPRD01, once both secondaries have joined
ALTER AVAILABILITY GROUP AG_Bellhaven ADD DATABASE BellhavenOLTP;
```

`GRANT CREATE ANY DATABASE` enables **automatic seeding** — SQL Server streams the initial data
directly from primary to secondary over the endpoint, instead of Bellhaven's team manually
restoring a full backup with `NORECOVERY` on each secondary first.

## Step four: the listener

The listener is what makes all of this invisible to the dispatch and billing applications. Instead
of connecting to `SQLPRD01` by name, every application and reporting job at Bellhaven connects to
**`BHFS-AGL`** — the listener's virtual network name — and SQL Server transparently routes that
connection to whichever replica currently holds the primary role:

```sql
ALTER AVAILABILITY GROUP AG_Bellhaven
ADD LISTENER 'BHFS-AGL' (
    WITH IP
        ((N'10.20.1.50', N'255.255.255.0'),
         (N'10.20.2.50', N'255.255.255.0')),
    PORT = 1433
);
```

Two IPs, one per Columbus subnet, are registered under the same listener name — a real
Always On requirement when replicas span more than one subnet. No connection string at Bellhaven
ever names a specific server again.

## Key terms

| Term | Meaning |
|---|---|
| `Hadr_endpoint` | The TCP endpoint every AG replica uses to talk to the others, on port 5022 |
| Automatic seeding | Streaming initial database data to a new secondary directly, instead of a manual backup/restore |
| Listener (`BHFS-AGL`) | The stable virtual network name applications connect to, routed to whichever replica is primary |
| `AUTOMATED_BACKUP_PREFERENCE` | AG setting steering scheduled backup jobs toward secondaries, matching Lesson 43's schedule |

## Check yourself

Why does SQLPRD02 use `FAILOVER_MODE = AUTOMATIC` while SQLDR01 uses `FAILOVER_MODE = MANUAL`, and
what would go wrong operationally if that were reversed?
