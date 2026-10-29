# Lesson 29 — Lab: Designing a Hybrid Architecture for a Regulated Workload

**Chapter 8 · Capstone: Designing a Hybrid/Multi-Cloud Architecture · Lesson 29 of 32**

## What you'll learn

- How to turn a regulatory data-residency requirement into a concrete identity, network, and
  data-flow design, instead of a one-line policy statement
- Why "keep the regulated data on-prem, burst the compute to the cloud" is a specific architecture
  with real boundaries, not a slogan
- How the hybrid identity, multi-cloud networking, and data-architecture material from Chapters
  4–6 combine into one coherent design for a single workload, rather than staying three separate
  topics
- How to write a short design document that a compliance reviewer, not just another architect,
  could actually read and sign off on

## The scenario

Alderney Health Systems is a fictional regional healthcare analytics company that processes
insurance claims data to find cost and fraud patterns for hospital networks. Their claims database
contains protected health information (PHI) — patient names, diagnosis codes, treatment dates —
and their compliance team has one non-negotiable rule, consistent with HIPAA-style regulation:
**identifiable PHI may never leave the company's own data center or cross a public network
boundary.** At the same time, the fraud-pattern analysis itself is heavy, bursty compute work —
idle most of the month, then running large batch jobs against months of claims data right before
a quarterly report is due — exactly the kind of workload that's expensive to keep provisioned
on-prem year-round and well suited to cloud burst capacity. The design problem is reconciling
both facts at once, not picking one and ignoring the other.

## Step 1: classify the data before designing anything else

Every hybrid design for a regulated workload starts here, not with infrastructure. Alderney's
claims data splits into two categories:

- **Regulated and immovable**: raw claims records with patient identifiers — name, date of birth,
  member ID, exact diagnosis and treatment detail. This never leaves the on-prem data center.
- **De-identified and portable**: the same records, with identifiers stripped and replaced by a
  one-way hashed surrogate key, aggregated enough that no individual patient can be re-identified
  from it. This is what the cloud burst compute is actually allowed to touch.

That split is a compliance decision, documented and signed off by Alderney's privacy officer — the
architecture exists to enforce it, not to make it.

## Step 2: design the identity boundary first

Following Chapter 4's pattern, Alderney extends its on-prem Active Directory into Azure AD via
Azure AD Connect, so the same engineers and service accounts authenticate identically on both
sides instead of maintaining two directories. One conditional access policy — the kind built in
Lesson 15 — governs access to both the on-prem claims database and the cloud burst-compute
resources:

```
Conditional access policy: "Claims Data Access"
  Applies to: groups "ClaimsAnalytics-Engineers", "ClaimsAnalytics-ServiceAccounts"
  Targets: on-prem claims DB (via Azure AD Application Proxy) + Azure subscription "alderney-burst-prod"
  Requires: compliant managed device AND MFA
  Blocks: any access from outside Alderney's registered IP ranges and known device pool
```

The same identity, the same policy, and the same enforcement apply whether someone is touching
the on-prem database directly or the cloud resources that only ever see de-identified data — there
is no separate, weaker set of rules for the cloud side.

## Step 3: design the network path so regulated data has nowhere else to go

The network design has exactly one job: make it structurally impossible for raw claims data to
reach the cloud, while still letting the de-identified extract move efficiently. Alderney connects
its data center to Azure over a private ExpressRoute circuit — never the public internet — and the
extraction job that produces the de-identified dataset runs entirely on-prem, writing its output
to a storage account reachable only through a private endpoint on that same ExpressRoute path:

```
# Azure side: storage account for the de-identified extract, no public access at all
az storage account create \
  --name stalderneyextract \
  --resource-group alderney-burst-rg \
  --public-network-access Disabled

az network private-endpoint create \
  --name pe-alderney-extract \
  --resource-group alderney-burst-rg \
  --vnet-name burst-vnet \
  --subnet private-endpoints \
  --private-connection-resource-id <storage-account-id> \
  --group-id blob \
  --connection-name extract-connection
```

With public network access disabled and only a private endpoint exposed over the ExpressRoute
circuit, there is no route by which the raw on-prem database could reach this storage account even
by accident — the boundary is enforced by the network path itself, not by a policy someone has to
remember to follow.

## Step 4: let the cloud burst only touch what crossed that boundary

The burst-compute job — an AKS cluster scaled up only during the quarterly analysis window — reads
exclusively from `stalderneyextract`, never from anything else, and writes its fraud-pattern
findings back to the same private-endpoint-only storage account for the on-prem team to pull back
across the same ExpressRoute circuit. Nothing in the cloud environment ever holds, queries, or
logs a real patient identifier, because nothing identifiable was ever given a path to get there.

## Writing the design up for a compliance reviewer

A one-page summary that a non-architect compliance reviewer can actually verify closes the lab:
what data crosses the boundary (de-identified extract only), what enforces that (private endpoint,
no public access, ExpressRoute-only path), who can touch either side (one conditional access
policy, one identity), and where the regulated data never moves from (the on-prem claims
database, always). A design that can't be explained in those four sentences to a non-engineer
reviewer usually isn't actually enforceable, no matter how clean the Terraform looks.

## Key terms

| Term | Meaning |
|---|---|
| Data classification | Sorting data into regulated/immovable versus portable categories before any infrastructure is designed |
| De-identification | Stripping or hashing identifiers so a dataset can no longer be traced back to an individual |
| Private endpoint | An Azure networking feature that exposes a resource only inside a private network path, with public access disabled entirely |
| Compliance-readable design | A short, plain-language summary of a technical design that a non-architect reviewer can verify against a regulatory rule |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: what three things, specifically,
keep Alderney's raw PHI from ever reaching the cloud side of this design, and why does the network
path matter as much as the written policy does?
