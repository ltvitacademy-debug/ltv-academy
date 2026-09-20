# Script — AG Monitoring

## Segment 1 (title)

Configuring an AG correctly once isn't the job — knowing whether it's actually healthy today is. This lesson covers the real DMVs and the SSMS dashboard used to monitor AG health and synchronization lag.

## Segment 2 (code: the two core DMVs)

sys.dm_hadr_availability_replica_states reports role, connection, and sync health per replica. sys.dm_hadr_database_replica_states goes more granular — per database, per replica — with synchronization_state_desc plus log_send_queue_size and redo_queue_size as the real lag indicators.

## Segment 3 (steps: what to actually watch)

A growing redo_queue_size on a secondary that should be keeping up is the earliest sign it's falling behind. synchronization_state_desc tells you SYNCHRONIZED, SYNCHRONIZING, or NOT SYNCHRONIZING per database. And the SSMS Always On dashboard shows this same data as a color-coded grid for a quick visual check.

## Segment 4 (outro)

The dashboard is great for eyeballing health manually, but the DMVs are what you actually script into real alerting. Next up: turning these same signals into real troubleshooting steps when something's actually wrong.
