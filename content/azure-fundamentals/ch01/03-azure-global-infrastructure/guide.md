# Lesson 3 — Azure Global Infrastructure: Regions & Availability Zones

**Chapter 1 · Cloud & Azure Concepts · Lesson 3 of 18**

## What you'll learn

- What an Azure **region** actually is
- What an **availability zone** is, and why it exists inside a region
- Why choosing the right region matters — latency and data residency
- How regions and availability zones fit together

## A region is a place, not a single building

An Azure **region** is a set of datacenters, in one geographic area,
connected by a low-latency network. "East US," "West Europe," and
"Southeast Asia" are all regions. When you create a resource in
Azure — a VM, a database, anything — you pick a region for it, and
that decision is one of the first things you'll make for almost
every resource you deploy.

Azure has dozens of regions around the world, and not every Azure
service is available in every region. Part of choosing a region is
simply checking that the service you want to use is offered there.

## Availability zones — resilience inside one region

An **availability zone** is a physically separate datacenter within a
region — its own power, cooling, and networking, so a failure in one
zone (a power outage, a cooling failure) doesn't take down the
others. Most major Azure regions have at least three availability
zones. If you deploy a resource across multiple availability zones,
a single datacenter going offline doesn't take your application
down with it.

```
Region: East US
┌─────────────────────────────────────────┐
│  Zone 1          Zone 2          Zone 3  │
│  (datacenter)    (datacenter)   (datacenter) │
│  own power       own power       own power   │
│  own cooling      own cooling     own cooling │
│  own network      own network     own network │
└─────────────────────────────────────────┘
   All connected by a low-latency network within the region.
```

Not every region has availability zones yet — it's a per-region
capability, so this is another thing to check when picking where a
critical workload lives.

## Why the region you pick actually matters

Two very practical reasons drive region choice, beyond "just pick the
closest one":

- **Latency.** A user in Singapore hitting a server in East US will
  see slower response times than one hitting a server in Southeast
  Asia. Put resources near the users who'll actually use them.
- **Data residency and compliance.** Some organizations — and some
  laws — require that certain data physically stay within a country
  or region's borders. A healthcare company handling EU patient data
  might be required to keep it in a European region, full stop,
  regardless of where its users are.

Getting the region wrong isn't usually a catastrophe you can't fix,
but it can mean real, avoidable latency for users or a compliance
problem that's expensive to untangle later — so it's a decision worth
making deliberately, not defaulting to whatever region happens to be
selected first.

## Key terms

| Term | Meaning |
|---|---|
| Region | A set of datacenters in one geography, connected by a low-latency network |
| Availability zone | A physically separate datacenter within a region, with its own power/cooling/network |
| Latency | The delay between a request and its response — worse the farther apart requester and resource are |
| Data residency | A requirement that data physically remain within a specific country or region |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what
specific kind of failure does spreading a resource across multiple
availability zones actually protect against, and what does it *not*
protect against?
