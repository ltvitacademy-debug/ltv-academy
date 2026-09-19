# Script — Storage, Compute Scaling & Performance Configuration

## Segment 1 (title)

Storage isn't fully separate from compute even under the vCore model. Business Critical's storage rides on local SSD while General Purpose's is remote — which is why Business Critical has lower latency but higher cost per GB.

## Segment 2 (code: storage tiers)

General Purpose uses remote storage — higher latency, lower cost. Business Critical uses local SSD — lower latency, higher cost. Hyperscale uses distributed storage designed for multi-terabyte databases.

## Segment 3 (code: scaling with an asterisk)

Changing compute or tier cuts over in a few minutes with a brief reconnect window — near-zero downtime, not zero. Applications need retry logic for that window regardless. Read scale-out routes read-only connections to an HA secondary that Business Critical and Hyperscale already maintain — General Purpose has no such replica to route to.

## Segment 4 (steps: Chapter 2's decisions, stacked)

Chapter 2's decisions so far stack into one real configuration: vCore with Hybrid Benefit because a license is owned, Business Critical for read scale-out and low latency, provisioned compute for a steady load, and read scale-out enabled for the reporting connection string.

## Segment 5 (outro)

Next up: Managed Instance's own deployment and configuration, including its real deployment time.
