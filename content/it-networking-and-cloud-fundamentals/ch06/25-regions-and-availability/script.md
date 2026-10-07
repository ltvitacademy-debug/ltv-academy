# Script — Regions & Availability

## Segment 1 (title)

A cloud VM feels abstract — provisioned in a few clicks, no rack to point at. But it runs in a real data center, in a real physical location, and where you place it affects latency, legal data residency, and how well your application survives a bad day.

## Segment 2 (steps)

A region is a specific geographic area where a provider operates a cluster of data centers — East US, West Europe, Southeast Asia. Within many regions, a provider also offers multiple availability zones: physically separate data centers, each with independent power and cooling, connected by low-latency links. And beyond that, providers designate region pairs — two geographically distant regions recommended for replicating critical data, in case something takes out an entire region at once.

## Segment 3 (code)

Each layer protects against a different kind of failure. Losing one zone just means the other zones in that region keep serving traffic. Losing an entire region — a natural disaster, a widespread grid failure — is rare, but that's what a paired region protects against. And simply being far from your users adds latency to every single request, whether or not anything has failed at all. Northbridge Retail runs its checkout service across two separate Azure regions for exactly this reason — if one entire region went dark, checkout keeps running from the other.

## Segment 4 (steps)

None of this is free, though. More zones and regions mean more resiliency, but also more cost and more complexity keeping data consistent across locations. A small internal tool is often fine running in a single zone of a single region. A checkout service, where downtime directly costs revenue, justifies the added cost of spreading across zones and regions.

## Segment 5 (outro)

Choosing where resources run is only half the picture — the other half is who's responsible for securing them once they're there. That split between provider and customer is exactly what the next lesson covers.
