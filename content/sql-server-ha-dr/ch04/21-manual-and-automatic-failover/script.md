# Script — Manual & Automatic Failover

## Segment 1 (title)

Lesson 19 established that automatic failover requires synchronous commit. This lesson covers failover fully: the three modes, what actually triggers automatic failover, and why forced failover is a deliberate, acknowledged-risk operation.

## Segment 2 (steps: the three failover types)

Automatic failover needs synchronous commit and automatic failover mode together, triggered by the WSFC's health detection with no human involved. Manual planned failover runs against a synchronous secondary with zero data loss, usually for maintenance. Forced failover targets an asynchronous secondary and explicitly accepts possible data loss.

## Segment 3 (code: the actual T-SQL and the quorum catch)

ALTER AVAILABILITY GROUP FAILOVER for a clean planned move. FORCE_FAILOVER_ALLOW_DATA_LOSS when you're forcing it against an out-of-sync replica. And even a healthy synchronous automatic-failover replica won't fail over automatically if the cluster has lost quorum — the cluster refuses to act to avoid a split-brain situation.

## Segment 4 (outro)

Forced failover should be a last resort, disaster scenario action — never routine. Next up: the DMVs and dashboard you actually use to monitor an AG's health day to day.
