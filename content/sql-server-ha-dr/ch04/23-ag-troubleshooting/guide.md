# AG Troubleshooting

This closes out the chapter by turning the monitoring signals from Lesson 22 into actual
troubleshooting steps for the three problems that come up most often in practice: a replica not
synchronizing, a listener that won't resolve, and quorum loss blocking an automatic failover that
should have happened.

## What you'll learn

- How to diagnose a replica that's stopped synchronizing
- Why a listener "not resolving" is almost always a DNS or cluster name object problem, not an AG problem
- What quorum loss looks like from the DBA's seat, and why it blocks failover on purpose

## Problem 1: a replica isn't synchronizing

Start with `sys.dm_hadr_database_replica_states.synchronization_state` on the affected secondary.
If it reports `NOT SYNCHRONIZING` (state 0), common real causes include:

- The secondary's data or log drive ran out of space, so it can't harden incoming records.
- A network interruption between primary and secondary lasted long enough to break the connection.
- The database was manually taken offline or restored over on the secondary, breaking its AG
  membership state.

Cross-reference `log_send_queue_size` and `redo_queue_size` (both climbing, not draining) to
confirm data is backing up rather than just catching up slowly. The SQL Server error log and the
Always On extended events health session (`AlwaysOn_health`) usually contain the specific reason
the connection dropped.

## Problem 2: the listener isn't resolving

A listener "not working" is almost never an AG configuration problem — it's almost always one of:

- **DNS propagation** — the VNN's DNS record hasn't updated or propagated yet after being created
  or after a subnet change.
- **The cluster name object (CNO)** or the listener's own computer object in Active Directory
  lacks permissions to register/update its DNS record, common in environments with restrictive AD
  security policies.
- **Firewall rules** blocking the listener port (commonly 1433) on the node currently hosting the
  primary.

Testing with `nslookup <listenerName>` and confirming it returns the *currently correct* VIP is the
fastest first check — if DNS resolves to the wrong or an old IP, the problem is DNS/CNO
permissions, not the AG itself.

## Problem 3: quorum loss blocking automatic failover

If an expected automatic failover doesn't happen, check WSFC quorum state
(`Get-ClusterQuorum` in PowerShell, or the Failover Cluster Manager UI) before assuming the AG is
broken. Common causes of quorum loss: too many nodes lost at once relative to the quorum model in
use, a network partition splitting the cluster into groups that can't agree, or the file share
witness (used in configurations without an odd number of node votes) being unreachable. The
cluster's refusal to fail over without quorum is deliberate — it's preventing a split-brain
scenario, not malfunctioning — so the fix is restoring quorum (bringing nodes or the witness back),
not forcing the AG to act around it.

## A troubleshooting starting checklist

1. Check `sys.dm_hadr_database_replica_states` for the specific database's sync state and queue
   sizes.
2. Check the SQL Server error log and `AlwaysOn_health` extended events session for the specific
   error.
3. If the listener is the symptom, test DNS resolution directly before touching AG settings.
4. If failover didn't happen automatically, check WSFC quorum state before assuming the AG failed.

## Key terms

| Term | Meaning |
|---|---|
| `AlwaysOn_health` | Built-in extended events session capturing AG health state transitions and errors |
| Cluster name object (CNO) | The WSFC's own Active Directory computer object, which needs permission to register listener DNS records |
| Quorum loss | The WSFC lacking enough surviving votes to safely make a failover decision — blocks automatic failover by design |

## Check yourself

An expected automatic failover didn't happen when the primary went down, even though a healthy
synchronous secondary with automatic failover mode was available. Before assuming the AG
configuration is wrong, what should be checked first, and why might the cluster have deliberately
refused to fail over?
