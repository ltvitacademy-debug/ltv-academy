# Lesson 2 — Performance

**Chapter 1 · Nonfunctional Requirements · Lesson 2 of 18**

## What you'll learn

- What a performance NFR actually specifies: response time, throughput, and under what load
- Why "make it fast" is not a requirement, and what a real one looks like
- Salesforce-specific performance levers: synchronous vs. asynchronous Apex, Bulk API, and the CPU-time governor limits that separate them
- How performance NFRs interact with the multi-tenant platform you don't control

## A performance requirement needs three numbers, not one

"The page should load fast" is not an NFR — it's a wish. A real performance requirement specifies three things together: a **metric** (page load time, API response time, batch job duration), a **target** (under 3 seconds), and a **condition** (for 95% of requests, with 200 concurrent users, during business hours). Drop any one of the three and the requirement can't be tested or defended. "Fast" without a condition lets every stakeholder imagine a different number; a target without a percentile lets one slow outlier dominate the conversation while the other 99% of requests were fine.

Two load concepts matter most in Salesforce work: **response time** (how long a single transaction takes for the user waiting on it) and **throughput** (how many transactions the system processes per unit time, which matters for batch jobs, integrations, and record-triggered automation running at volume). A page can have great response time for one user and terrible throughput once 500 users hit it during a product launch — they're different problems with different fixes.

## Where performance gets decided on the Salesforce platform

Salesforce is multi-tenant: many customers share the same underlying infrastructure, and Salesforce enforces **governor limits** specifically so that no single org's runaway process can degrade performance for everyone else on the same infrastructure. This is the opposite of a traditional on-premises system, where a team can usually just add hardware to buy more headroom — on Salesforce, the architecture has to live within limits that are fixed per transaction, not purchased away.

The limit most directly tied to performance is **CPU time**. A synchronous Apex transaction gets a maximum CPU time budget; an asynchronous transaction (queueable, batch, future, or Bulk API) gets a larger one, because async work is expected to run longer and isn't holding a user's browser open while it executes. This is exactly why performance-sensitive design pushes heavy processing off the synchronous path: a record-triggered Flow or Apex trigger that does real work inline on every save competes for that smaller synchronous budget, while the same work queued onto an asynchronous job gets more room and doesn't block the user waiting for their screen to respond.

**Bulk API** (and Bulk API 2.0) exists for exactly this reason on the data-movement side: large-volume inserts, updates, and deletes submitted through Bulk API run as batches against a separate, larger CPU-time allowance than a single synchronous transaction, which is why a data-loading integration should almost never be built against the standard synchronous REST API once volumes get large.

## Response time has layers you don't control

A Salesforce page's end-to-end response time is the sum of several layers: network latency between the user and Salesforce's data center, the platform's own request-handling overhead, any declarative automation (Flow, validation rules, workflow) firing on the object, any Apex triggers or synchronous callouts, and finally the Lightning rendering on the user's device. An architect can design around most of these layers — minimizing synchronous automation, avoiding chatty client-side API calls, caching lookups — but cannot change Salesforce's own infrastructure or a customer's last-mile network. A realistic performance NFR accounts for this: it names what the team can actually control and sets targets accordingly, rather than promising an absolute number that depends on factors outside the project's control.

## Key terms

| Term | Meaning |
|---|---|
| Response time | How long a single transaction takes, from the requester's perspective |
| Throughput | How many transactions a system processes per unit of time |
| Percentile target | A performance target expressed for a percentage of requests (e.g., 95th percentile), so one outlier doesn't distort the picture |
| Governor limit | A Salesforce-enforced ceiling (CPU time, SOQL queries, heap size, and others) that protects the shared multi-tenant platform |
| Synchronous vs. asynchronous Apex | Code that runs inline and blocks the user (synchronous, smaller CPU budget) vs. code queued to run separately (asynchronous, larger CPU budget) |
| Bulk API | A Salesforce API designed for large-volume record operations, running under a separate, larger CPU-time allowance than standard synchronous transactions |

## Lab

A retail client wants: "Case creation from the service console should feel instant." Rewrite this as a real performance NFR with a metric, a numeric target, and a load condition. Then identify one piece of automation on Case (a validation rule, a Flow, a trigger) that would be a reasonable candidate to move off the synchronous save path if it were doing non-essential work, and explain why moving it helps the metric you defined.

## Check yourself

Can you name the three components every real performance requirement must specify? Can you explain why Salesforce's governor limits exist, and why asynchronous Apex gets a larger CPU-time budget than synchronous Apex?
