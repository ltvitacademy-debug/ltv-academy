# Script — Job Clusters vs. All-Purpose Clusters

## Segment 1 (title)

Lesson 5 already covered the basic split — job clusters cost less than all-purpose clusters. Here's the real choice one level deeper: inside a multi-task job, shared or separate.

## Segment 2 (code: one shared job cluster)

Every task in the job runs on the same job cluster, provisioned once and terminated once everything finishes — cheapest option, simplest to configure.

## Segment 3 (code: separate job clusters per task)

Each task instead gets its own job cluster, sized for exactly that task's workload — more expensive in aggregate, but real isolation between a heavy task and a light one.

## Segment 4 (code: choosing correctly)

Similar, modest needs across tasks: share a cluster. Very different sizing needs, or a task whose failure shouldn't affect others' compute: separate clusters. "Job cluster is cheaper than all-purpose" still holds either way.

## Segment 5 (outro)

The real decision inside a multi-task job is shared-versus-separate, not job-versus-all-purpose. Next up: tying a full multi-step pipeline together.
