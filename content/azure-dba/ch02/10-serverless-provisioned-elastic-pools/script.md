# Script — Serverless, Provisioned Compute & Elastic Pools

## Segment 1 (title)

Provisioned compute is fixed capacity, billed whether busy or idle. Serverless auto-scales and auto-pauses, billed per second. Elastic pools share compute across many databases with unpredictable, uncorrelated usage.

## Segment 2 (code: provisioned vs. serverless)

Provisioned is the right default for steady, predictable usage. Serverless scales vCores within a configured range and can fully auto-pause a database during inactivity, paying only for storage — at the cost of a cold-start delay on the next connection.

## Segment 3 (screenshot: elastic pool creation in the Portal)

This is a real Azure Portal screenshot creating an elastic pool — configure the pool's shared budget, then add databases to it. A SaaS vendor running one database per tenant is the textbook use case.

## Segment 4 (code: choosing between the three)

Steady load on one database — provisioned. Spiky load on one database, tolerant of cold starts — serverless. Many databases with uncorrelated spikes — an elastic pool.

## Segment 5 (outro)

Next up: storage tiers, scaling compute and storage without downtime, and read scale-out for the tiers that support it.
