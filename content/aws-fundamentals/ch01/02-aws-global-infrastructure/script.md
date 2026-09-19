# Script — AWS Global Infrastructure: Regions & Availability Zones

## Segment 1 (title)

AWS runs out of more than thirty Regions worldwide — independent, isolated deployments like us-east-1 in Northern Virginia or eu-west-1 in Ireland. Most of what you build lives in exactly one Region unless you say otherwise.

## Segment 2 (code: regions and AZs)

Inside every Region are multiple Availability Zones — physically separate data centers, each with its own power, cooling, and networking, linked by low-latency connections. They're named after the Region, like us-east-1a and us-east-1b, and a failure in one shouldn't take down another.

## Segment 3 (steps: three layers)

Region, Availability Zone, and Edge Location are three different scopes. A Region is a geographic area, an AZ is one isolated data center inside it, and an Edge Location is a smaller site — used by CloudFront and Route 53 — that just caches content closer to users, not a full Region.

## Segment 4 (outro)

That's why real workloads spread across at least two AZs, never just one. Next up: a tour of the AWS Management Console itself.
