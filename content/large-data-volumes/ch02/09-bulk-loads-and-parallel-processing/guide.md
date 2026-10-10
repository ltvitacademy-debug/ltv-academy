# Lesson 9 — Bulk Loads and Parallel Processing

**Chapter 2 · Skew and Locking · Lesson 9 of 16**

## What you'll learn

- Why Bulk API defaults to parallel mode, and what that trade-off actually buys you
- How batch organization (grouping by parent) reduces lock contention without switching modes
- When Salesforce's own guidance says to fall back to serial mode, and which operations are known to need it
- Why testing lock behavior in a sandbox doesn't reliably predict production behavior

## Parallel mode is the default, for a reason

Salesforce's Bulk API processes data in **parallel mode** by default: batches from a job run alongside other batches from the same job, and alongside batches from other jobs running in parallel at the same time. This is the fast option — it's why Bulk API can move very large volumes of data in a reasonable window. The trade-off, directly inherited from Lesson 8, is that parallel execution creates exactly the kind of concurrent access that triggers lock contention when the data being loaded is skewed.

The practical implication is that an architect shouldn't reach for serial mode as a first move just because an object has some skew. Salesforce's own guidance is explicit that parallel mode is the starting point, and serial mode is something to use only once parallel processing has actually caused problems that other fixes couldn't solve — because serial mode trades away most of the throughput benefit of using Bulk API in the first place.

## Fix the batch organization before you fix the mode

The first lever to pull, before abandoning parallel mode, is how the load's batches are organized. Salesforce's own example is a child object like AccountTeamMember: creating or updating one of these records locks the parent Account for that transaction. If a load's batches are built without regard to which Account each record belongs to, records for the same heavily-skewed Account end up scattered across many different batches running at the same time — maximizing the odds that several of them collide on that Account's lock simultaneously.

The fix is to **group records by their parent ID when building batches**, so that all the records for one Account land together in the same batch rather than being spread across several concurrently-running ones. This doesn't eliminate contention entirely — records within the same batch can still compete somewhat — but it sharply reduces how many *different, simultaneously-running* batches are fighting over the same parent's lock, which is the actual mechanism causing the failures.

## When Salesforce's own guidance says to go serial

If reorganizing batches by parent ID doesn't resolve the lock failures, Salesforce's documented recommendation is to create a **separate job** configured for serial mode — concurrency mode is set at the job level, so this means a distinct job from the parallel ones, not a flag flipped mid-job. In serial mode, only one batch from that job runs at a time, which removes the parallel-collision problem entirely at the cost of processing throughput.

Salesforce's own guidance names specific operations as more likely to need serial mode from the start, rather than waiting for failures to prove it: creating users, updating record ownership on objects using a private sharing model, updating user roles, and updating territory hierarchies. These are all operations that, by their nature, touch shared structures (the role hierarchy, territory assignments, ownership-driven sharing) that create wide-reaching lock and recalculation effects — which connects directly to Lesson 10's topic, sharing recalculation.

## Failed records aren't retried automatically — and sandbox testing has limits

As Lesson 8 covered, a record that fails on a lock timeout isn't silently retried; it has to be resubmitted. At the batch level, Salesforce's Bulk API will requeue and retry a struggling batch a limited number of times before marking it permanently failed, but individual locked records within an otherwise-successful batch still need explicit follow-up.

It's also worth being direct about the limits of pre-production testing here: because every org's specific data model, ownership distribution, and automation differ, Salesforce itself notes that it can't predict in advance exactly when lock contention will occur for a given org — which is why this needs to be tested against a realistic data volume and shape, ideally in a sandbox that reflects production's actual skew, rather than assumed safe because a similar load worked fine in another org.

## Key terms

| Term | Meaning |
|---|---|
| Parallel mode | Bulk API's default processing mode — batches run concurrently, maximizing throughput but exposing lock contention on skewed data |
| Serial mode | A Bulk API mode, set at the job level, where only one batch runs at a time — removes parallel lock collisions at the cost of throughput |
| Batch grouping by parent ID | Organizing a load's batches so all records for one parent land in the same batch, reducing cross-batch lock contention |

## Lab

A data-migration job is loading 400,000 AccountTeamMember records in parallel mode and failing roughly 8% of records to lock timeouts, concentrated on a small number of large Accounts. Before recommending a switch to serial mode, describe the specific batch-reorganization step this lesson recommends trying first, and explain mechanically why it should reduce (though not necessarily eliminate) the lock failures even while staying in parallel mode.

## Check yourself

Can you explain why Salesforce defaults Bulk API to parallel mode, and what that trade-off costs under data skew? Can you name the batch-organization fix that should be tried before switching to serial mode, and at least two operations Salesforce's own guidance flags as likely needing serial mode from the start?
