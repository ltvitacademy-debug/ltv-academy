# Capstone: Simulate a Failover

AG_Bellhaven exists, backed by a real backup chain, but it hasn't proven anything yet. A DBA who
has never actually watched a failover happen doesn't really know their HA solution works — they
know it was configured to work. This lesson runs a real, deliberate failover test: a planned
maintenance-window failover of the synchronous HA pair, not a disaster, and walks through exactly
what to verify before calling it a success.

## What you'll learn

- The difference between a planned manual failover and a forced one
- The exact command that fails AG_Bellhaven over from SQLPRD01 to SQLPRD02
- What to check afterward before trusting the result

## Why test a planned failover, not just wait for a real one

Bellhaven's IT director schedules this test for a Saturday morning maintenance window,
specifically because a synchronous, automatic-failover pair like SQLPRD01/SQLPRD02 is supposed to
handle a real failure without anyone testing it first — but "supposed to" is exactly the gap a
planned test closes. Chapter 8 covers this same logic for DR runbooks generally: an HA/DR plan
that has never actually been executed is a plan that's still theoretical.

## Running the planned failover

Because SQLPRD01 and SQLPRD02 are both `SYNCHRONOUS_COMMIT` and currently healthy and
synchronized, this is a **planned manual failover with no data loss** — the target replica already
has every committed transaction. The command runs on the target, SQLPRD02:

```sql
-- Run on SQLPRD02, the replica becoming the new primary
ALTER AVAILABILITY GROUP AG_Bellhaven FAILOVER;
```

No `FORCE_FAILOVER_ALLOW_DATA_LOSS` clause is needed or used here — that clause is reserved for a
genuinely different scenario, covered in the next lesson. A planned failover between two healthy
synchronous replicas typically completes in well under Bellhaven's 15-minute local RTO — often
10 to 30 seconds of actual unavailability while sessions reconnect.

## What to verify immediately after

A failover command returning without an error is not the same as a verified success. Bellhaven's
test checklist:

```sql
-- Run on the new primary (SQLPRD02): confirm role and health
SELECT r.replica_server_name, r.role_desc, r.availability_mode_desc,
       r.failover_mode_desc
FROM sys.dm_hadr_availability_replica_states rs
JOIN sys.availability_replicas r ON rs.replica_id = r.replica_id;

-- Confirm the database itself is synchronized on every replica
SELECT database_name, synchronization_state_desc, is_suspended
FROM sys.dm_hadr_database_replica_states drs
JOIN sys.databases d ON drs.database_id = d.database_id;
```

The checklist:

- **Role confirmed** — `sys.dm_hadr_availability_replica_states` shows SQLPRD02 as `PRIMARY` and
  SQLPRD01 as `SECONDARY`
- **Synchronization health** — every replica shows `SYNCHRONIZED`, not `SUSPENDED` or `NOT
  SYNCHRONIZING`
- **Listener reachable** — an application-side connection to `BHFS-AGL` lands on SQLPRD02 without
  any connection string change
- **Dispatch and billing functional** — a real transaction (a test load status update) completes
  and shows up correctly
- **SQLDR01 unaffected** — the DR replica keeps receiving log records asynchronously from the new
  primary without manual intervention

## Failing back

Once the test is verified, Bellhaven fails back to SQLPRD01 with the identical command, run on
SQLPRD01 this time — a routine failover between two synchronous partners is symmetric, and
reversing it is not itself a second disaster.

## Key terms

| Term | Meaning |
|---|---|
| Planned manual failover | A deliberate `FAILOVER` between healthy, synchronized replicas — no data loss |
| `sys.dm_hadr_availability_replica_states` | DMV reporting each replica's current role and health |
| `sys.dm_hadr_database_replica_states` | DMV reporting per-database synchronization state on each replica |
| Failback | Failing over a second time, back to the original primary, once a test is verified |

## Check yourself

Why is `ALTER AVAILABILITY GROUP AG_Bellhaven FAILOVER` (without the `FORCE_FAILOVER_ALLOW_DATA_LOSS`
clause) the correct command here, and what would using the forced version on a healthy
synchronous pair say about the test that wasn't true?
