# Availability

Lesson 1 introduced why distributed systems exist and why they're hard. This lesson takes the first of those reasons — fault isolation — and turns it into something you can actually measure: availability. When someone says a system is "five nines," what are they actually promising, and what's the mechanism that makes that promise possible?

## What you'll learn

- A precise definition of availability
- How SLA percentages ("the nines") translate into real downtime per year
- Redundancy and failover as the main lever for raising availability
- What a single point of failure is and why it's the enemy of availability
- How availability differs from reliability, previewed ahead of Lesson 4

## Defining availability

**Availability** is the fraction of time a system is usable — able to respond to requests — out of the total time it's supposed to be running. It's usually expressed as a percentage, almost always written with a string of nines: 99%, 99.9%, 99.99%, and so on. The more nines, the less downtime that percentage allows, and the more expensive and complex the system typically has to be to achieve it.

## SLA percentages and what they mean in real downtime

Service Level Agreements often quote an availability target, and those percentages sound similar but represent very different amounts of allowed downtime per year:

- **99%** ("two nines") — about 3.65 days of downtime per year
- **99.9%** ("three nines") — about 8.76 hours of downtime per year
- **99.99%** ("four nines") — about 52.6 minutes of downtime per year
- **99.999%** ("five nines") — about 5.26 minutes of downtime per year

Each additional nine cuts allowed downtime by roughly a factor of ten. Going from three nines to four nines doesn't sound like a big jump on paper, but it's the difference between an hour of outage a customer might shrug off and under a minute, which usually requires automated failover rather than a human responding to a page.

## Redundancy and failover: the main lever

The primary way distributed systems raise availability is **redundancy** — running more than one copy of a critical component so that if one fails, another is already there to take over. **Failover** is the mechanism that actually switches traffic to the surviving copy, ideally automatically and within seconds. A web server behind a load balancer, a database with a standby replica ready to be promoted, or a service deployed across two data centers are all applications of the same idea: don't depend on exactly one instance of anything that matters.

## Single points of failure

A **single point of failure** (SPOF) is any component whose failure takes down the whole system, because nothing else can do its job. A load balancer in front of ten redundant web servers sounds resilient — until you notice there's only one load balancer. Finding and eliminating SPOFs, one layer at a time, is most of what raising availability actually looks like in practice.

## Availability vs. reliability — a preview

Availability answers "is the system usable right now?" It's a snapshot. **Reliability**, which Lesson 4 covers in depth, answers a different question: does the system keep working correctly over time, including through failures? A system can be available in this instant but unreliable if it keeps crashing and restarting every few minutes — it happens to be up right now, but its track record is bad. The two ideas are related but not the same, and the full contrast is coming.

## Key terms

| Term | Meaning |
|---|---|
| Availability | The fraction of time a system is usable out of the time it's supposed to be running |
| SLA (Service Level Agreement) | A commitment, often expressed in "nines," to a minimum availability level |
| Redundancy | Running more than one copy of a critical component |
| Failover | The mechanism that switches traffic to a surviving copy when one fails |
| Single point of failure (SPOF) | A component whose failure takes down the whole system |

## Recap

Availability is measured in nines, each one cutting allowed downtime by about ten times, and the way systems reach high availability is redundancy backed by automatic failover — with single points of failure as the thing standing in the way. Next up, Lesson 3: scalability.
