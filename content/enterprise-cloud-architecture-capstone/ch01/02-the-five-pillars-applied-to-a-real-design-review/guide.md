# Lesson 2 — The Five Pillars Applied to a Real Design Review

**Chapter 1 · Enterprise Cloud Architecture Principles · Lesson 2 of 4**

## What you'll learn

- How a senior architect actually runs a design review pillar by pillar,
  against a concrete scenario — not an abstract one
- What a Reliability, Security, Cost Optimization, Operational Excellence,
  and Performance Efficiency finding each sound like in real review
  comments
- Why the same architecture can pass one pillar and fail another in the
  same review
- How to structure your own review notes using the five-pillar format

## The scenario: a regional order-processing API

Picture a design review for a real, concrete system: an order-processing
API for a mid-size retailer, built on a container platform (course 9) and
deployed via Terraform (course 8), currently running as a single AKS or
EKS cluster in one Azure or AWS region, backed by a single-region managed
SQL database. Traffic has grown enough that the platform team scheduled a
formal architecture review before the next funding cycle. This is the kind
of review you will run, and sit in, for the rest of your career — so walk
through it pillar by pillar the way an architect actually does.

## Reliability

The reviewer's first question is never "does it work?" — it's "what
happens when a dependency fails?" For this system: the cluster is single-
region, the database is single-region, and there's no documented failover
path. A real reliability finding reads like this: *"This design has no
failure domain isolation above the pod level — a regional outage takes
down ingestion, processing, and the database simultaneously, with no
automated failover."* That's not a vague worry; it names the exact gap
(no secondary region, no failover automation) and implies the fix (a
secondary region, async replication, and a tested failover runbook).

## Security

Next: how does traffic actually reach the database, and who can touch it?
Suppose the review turns up that the API's managed identity has
subscription-level `Contributor` access instead of a scoped role, and the
database accepts connections from the cluster's full subnet rather than a
private endpoint. The finding: *"The workload identity is over-
permissioned relative to what the API actually needs, and the database's
network boundary is wider than the trust boundary requires."* This is the
same least-privilege and network-segmentation thinking you built hands-on
skill with in the containers course — here it's being applied as a
pillar-level judgment on the whole design, not a single manifest.

## Cost Optimization

Now pull in course 10's FinOps lens. Suppose the review's cost data shows
the cluster is provisioned for peak Black Friday load, year-round, at
roughly 4x the compute the system needs on an average Tuesday. The finding:
*"Compute is sized for the 99th-percentile traffic event and never scales
back down — autoscaling is configured but the minimum node count is set
far above baseline demand."* Note this finding does not say "cut the
cluster" — it says the current sizing isn't matched to actual demand
*unless* that headroom is a deliberate reliability tradeoff (more on that
tension in Lesson 3).

## Operational Excellence

Who gets paged when this breaks, and how do they fix it? If there's no
runbook, no documented rollback procedure for a bad deployment, and alerts
fire into a channel nobody monitors after hours, the finding is: *"There
is no operational ownership model documented for this workload — on-call
routing, rollback procedure, and alert thresholds all need to exist before
this goes to production traffic."*

## Performance Efficiency

Finally: is the system using the right resource shape for the job, not
just enough of it? If the API is CPU-bound but provisioned on
memory-optimized nodes because that's what another team's workload uses,
the finding is: *"Node SKU is mismatched to the workload's actual resource
profile — this is a performance efficiency gap independent of raw
capacity."*

## Reading the whole review together

Notice what just happened: the same architecture produced five distinct,
independently true findings. None of them contradicts another on its own
— but fixing all five at once is where the real work of the next lesson
begins, because some of these fixes pull directly against each other.

## Key terms

| Term | Meaning |
|---|---|
| Design review finding | A specific, pillar-anchored observation about a design, naming both the gap and the implied direction of a fix |
| Failure domain | A boundary within which a single failure is contained — a region, an availability zone, a cluster |
| Trust boundary | The line across which access, identity, or network traffic crosses from a lower-trust to a higher-trust zone |
| Operational ownership model | The documented answer to who gets paged, how they roll back, and what the alert thresholds are for a given workload |

## Check yourself

You're ready for Lesson 3 when you can take any architecture you've
built in courses 8–10 and write one real, specific finding per pillar —
five findings, five pillars, no vague language in any of them.
