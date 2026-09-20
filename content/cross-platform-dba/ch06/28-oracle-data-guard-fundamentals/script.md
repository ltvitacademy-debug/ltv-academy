# Script — Oracle Data Guard Fundamentals

## Segment 1 (title)

Everything through Chapter Five assumed a single Oracle instance. This chapter is about keeping the database alive when that instance fails — Oracle's answer to what SQL Server Availability Groups solve, same purpose, different architecture.

## Segment 2 (code: primary and standby)

Data Guard maintains one or more standby databases as synchronized copies of a single primary, and that's the whole model — no shared quorum, no Windows clustering underneath it. Each standby is a complete, separate database kept in sync by redo transport and redo apply, and a primary can have multiple standbys at once, local and remote.

## Segment 3 (steps: protection modes)

Data Guard names the sync-versus-async tradeoff explicitly as a protection mode. Maximum Protection guarantees zero data loss and shuts the primary down if it can't confirm a standby. Maximum Availability also guarantees zero data loss but keeps the primary running. Maximum Performance is asynchronous, the default, with a small potential loss window.

## Segment 4 (code: switchover vs failover)

A switchover is a planned, no-data-loss role swap for maintenance or testing — both databases end up healthy. A failover happens when the primary is actually gone and a standby has to be promoted out of necessity. Fast-Start Failover adds an Observer process that can trigger that automatically, but it's opt-in, not the default.

## Segment 5 (outro)

Not every standby is built the same way underneath. Next up: the real structural difference between a physical standby and a logical standby.
