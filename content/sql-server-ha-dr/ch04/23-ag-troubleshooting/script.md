# Script — AG Troubleshooting

## Segment 1 (title)

This closes out the chapter by turning last lesson's monitoring signals into real troubleshooting steps for the three problems that come up most often: a replica not synchronizing, a listener that won't resolve, and quorum loss blocking a failover that should have happened.

## Segment 2 (steps: a replica isn't synchronizing)

Check synchronization_state on the secondary first. Common real causes: the drive ran out of space, a network interruption broke the connection, or the database was manually taken offline. Climbing log_send_queue_size and redo_queue_size together confirm data is actually backing up, not just catching up slowly.

## Segment 3 (steps: listener and quorum problems)

A listener that won't resolve is almost always DNS propagation, cluster name object permissions, or a firewall blocking the port — rarely the AG itself. And if an automatic failover didn't happen, check WSFC quorum state before assuming the AG is broken — the cluster deliberately refuses to fail over without quorum, to avoid a split-brain scenario.

## Segment 4 (outro)

The fix for quorum loss is restoring quorum, not forcing the AG around it. Next up: Chapter 5 moves into Failover Cluster Instances, starting with FCI architecture.
