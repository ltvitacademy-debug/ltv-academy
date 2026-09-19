# Script — Redshift Architecture

## Segment 1 (title)

Redshift is a different kind of tool than Glue or Athena — it's a managed, columnar data warehouse you load data into, so heavy analytical queries run fast against data that's already organized for them.

## Segment 2 (code: leader node vs. compute nodes)

Every Redshift cluster has one leader node and one or more compute nodes. The leader node never stores table data — it parses your SQL, builds an execution plan, and assembles the final result. The compute nodes are where the data actually lives, and where the real scanning and aggregating happens.

## Segment 3 (steps: why Redshift is built this way)

Three ideas make this fast. Columnar storage means a query only reads the columns it actually touches, not every column in the row. MPP splits one query into pieces that run in parallel across every compute node. And each compute node is divided into node slices, which is the real unit of parallel execution — more slices means more parallelism.

## Segment 4 (outro)

Redshift's architecture down. Next up: the two ways you actually run a Redshift warehouse — provisioned clusters versus Redshift Serverless.
