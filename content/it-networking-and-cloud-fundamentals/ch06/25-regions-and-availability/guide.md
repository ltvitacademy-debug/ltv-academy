# Regions & Availability

Cloud resources feel abstract — a VM you provision in a few clicks doesn't feel like it lives anywhere in particular. But it does: every cloud resource runs in a real data center, in a real physical location, and where you choose to place it affects latency, legal data residency, and how well your application survives a single data center having a bad day.

## What you'll learn

- What a cloud "region" actually is, and why providers offer dozens of them
- How availability zones protect against a single data center failure within a region
- Why region pairs exist, and what they protect against that zones don't
- How to weigh latency, cost, and resiliency when choosing where to deploy

## Regions: picking a location

A **region** is a specific geographic area where a cloud provider operates a cluster of data centers — "East US," "West Europe," "Southeast Asia." Providers offer dozens of regions worldwide so customers can place resources physically close to their users, which cuts the network latency from Chapter 2's discussion of how far a packet has to travel. Placing a resource close to the customers who will use it isn't optional for a good experience — a checkout page that has to round-trip across an ocean on every request feels sluggish in a way users notice immediately.

## Availability zones: protecting against one data center going down

Within many regions, a provider offers multiple **availability zones** — physically separate data centers within that region, each with independent power, cooling, and networking, but connected by low-latency links. Deploying across two or three zones in the same region means a power outage or hardware failure in one zone doesn't take the whole application down; traffic simply continues to be served from the zones still standing.

## Region pairs: protecting against a whole region going down

A zone failure is local; a true regional disaster — a natural disaster, a widespread power grid failure — is rare but possible, and zones within the same region don't protect against it. That's what **region pairs** are for: providers designate pairs of regions, geographically distant from each other, and recommend replicating critical data and services across both. Northbridge Retail runs its checkout service across two separate Azure regions for exactly this reason — if an entire region became unreachable, checkout would keep running from the paired region instead of going dark for every customer at once.

## Weighing the tradeoffs

More regions and zones mean more resiliency, but also more cost and more complexity to keep data consistent across locations. A small internal tool might run fine in a single zone of a single region. A retailer's checkout service, where downtime directly costs revenue, justifies spreading across multiple zones and even multiple regions, despite the added cost and complexity.

## Key terms

| Term | Meaning |
|---|---|
| Region | A geographic area where a provider runs a cluster of data centers |
| Availability zone | A physically separate data center within a region, isolated from the others' power and cooling |
| Region pair | Two geographically distant regions a provider recommends replicating across for disaster recovery |
| Latency | The delay added by physical distance between a user and the resource they're connecting to |
