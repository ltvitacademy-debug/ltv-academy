# Lesson 11 — Asynchronous Processing

**Chapter 2 · Build: Automation and Code · Lesson 11 of 25**

## What you'll learn

- The four asynchronous Apex types and which problem each one actually fits
- A real `Queueable` implementation: `WarrantyClaimSubmissionQueueable`, finishing the trigger from Lesson 9
- A real `Batch Apex` job: `StaleInstallationJobBatch`, and why it has to be batched rather than run synchronously
- The specific async governor limits that shape both designs

## Four tools, four different jobs

Apex gives you four ways to run code outside the current transaction, and this capstone uses two of them for two different reasons:

| Type | Runs when | Good for |
|---|---|---|
| **Future method** (`@future`) | Almost immediately, in its own thread | Simple, fire-and-forget async work with no complex state |
| **Queueable Apex** | Almost immediately, supports chaining and complex parameter types | Async work that needs an object (not just primitives) as input, like this platform's callout |
| **Batch Apex** | Processes records in chunks across multiple transactions | Large data volumes too big for one transaction's limits |
| **Scheduled Apex** | On a cron-like schedule | Recurring jobs, like nightly cleanup |

Future methods only accept primitive parameters (`Id`, `String`, etc. — not sObjects or custom objects), which is exactly why Lesson 9's trigger used `System.enqueueJob(new WarrantyClaimSubmissionQueueable(claimIds))` instead of a future method: a `Queueable` class can hold a `Set<Id>` as a constructor-set member variable and carry richer state than a future method's flat parameter list allows.

## Finishing the warranty claim submission

```apex
public class WarrantyClaimSubmissionQueueable implements Queueable, Database.AllowsCallouts {

    private Set<Id> claimIds;

    public WarrantyClaimSubmissionQueueable(Set<Id> claimIds) {
        this.claimIds = claimIds;
    }

    public void execute(QueueableContext context) {
        List<Warranty_Claim__c> claims = [
            SELECT Id, Asset__r.SerialNumber, Claim_Amount__c
            FROM Warranty_Claim__c
            WHERE Id IN :claimIds
        ];

        List<Warranty_Claim__c> toUpdate = new List<Warranty_Claim__c>();
        for (Warranty_Claim__c claim : claims) {
            // ManufacturerWarrantyClient is built in Lesson 14.
            String manufacturerClaimId = ManufacturerWarrantyClient.submitClaim(
                claim.Asset__r.SerialNumber, claim.Claim_Amount__c
            );
            claim.Manufacturer_Claim_Id__c = manufacturerClaimId;
            toUpdate.add(claim);
        }
        update toUpdate;
    }
}
```

`implements Queueable, Database.AllowsCallouts` is required syntax, not decoration — a Queueable job must explicitly declare that it's allowed to make HTTP callouts, which is the platform drawing a clear line between async jobs that just move data and ones that reach out to external systems.

## Batch Apex for records too large for one transaction

Dmitri's team also needs a nightly job that finds `Installation_Job__c` records stuck in "Scheduled" status more than 14 days past their scheduled date and flags them for manager review. If Solstice has thousands of such records across its full history, processing them in one synchronous transaction risks every governor limit from Lesson 7 at once. Batch Apex solves this by splitting the work into chunks (**scope**) processed across separate transactions:

```apex
public class StaleInstallationJobBatch implements Database.Batchable<sObject> {

    public Database.QueryLocator start(Database.BatchableContext bc) {
        Date cutoff = Date.today().addDays(-14);
        return Database.getQueryLocator([
            SELECT Id, Status__c, Scheduled_Date__c
            FROM Installation_Job__c
            WHERE Status__c = 'Scheduled' AND Scheduled_Date__c < :cutoff
        ]);
    }

    public void execute(Database.BatchableContext bc, List<Installation_Job__c> scope) {
        for (Installation_Job__c job : scope) {
            job.Status__c = 'Needs Parts';
        }
        update scope;
    }

    public void finish(Database.BatchableContext bc) {
        // Could notify Dmitri's team here via a final summary email or Platform Event.
    }
}
```

`start()` runs once and returns a `Database.QueryLocator`, which can address far more records than a single SOQL query's 50,000-row limit, because Batch Apex processes it in chunks rather than all at once. `execute()` runs once per chunk — **200 records by default**, configurable by passing a scope size to `Database.executeBatch()` — with its own fresh set of governor limits each time. `finish()` runs once after every chunk completes.

## Scheduling it

```apex
System.schedule('Nightly Stale Installation Job Check', '0 0 2 * * ?', new StaleInstallationJobScheduler());
```

A separate `Schedulable` class (not shown in full here) calls `Database.executeBatch(new StaleInstallationJobBatch())` from its `execute()` method — Scheduled Apex is the trigger mechanism, Batch Apex is still what does the actual work.

## Key limits that shape these two designs

Per Salesforce's current limits: Batch Apex allows a **maximum of 5 batch jobs queued or active concurrently** per org, with up to **100 batch jobs held in the Apex Flex Queue**; a future method invocation is capped at **50 calls per Apex transaction**, and the same 50-call ceiling applies to Queueable jobs enqueued synchronously from one transaction. All asynchronous Apex — future, Queueable, batch, and scheduled combined — shares one 24-hour rolling org limit, which is why Dmitri's cleanup job runs once nightly rather than being re-triggered on every page load.

## Key terms

| Term | Meaning |
|---|---|
| Queueable Apex | Async Apex type supporting complex parameters and chaining, used here for the warranty callout |
| `Database.AllowsCallouts` | Interface a Queueable must implement to be permitted to make HTTP callouts |
| Batch Apex | Async Apex type that processes large record sets in chunks across separate transactions |
| Scope | The chunk size Batch Apex's `execute()` processes per transaction, 200 by default |
| Scheduled Apex | Async Apex type that runs a job on a cron-like schedule |

## Lab

Implement `WarrantyClaimSubmissionQueueable` and `StaleInstallationJobBatch` in your scratch org (stub `ManufacturerWarrantyClient.submitClaim` to return a hardcoded string for now). Run the batch manually with `Database.executeBatch(new StaleInstallationJobBatch(), 50)` in Anonymous Apex against test data and confirm stale jobs update to "Needs Parts."

## Check yourself

- Why did Lesson 9's trigger use a Queueable instead of a `@future` method for the warranty callout?
- Why does `StaleInstallationJobBatch` need to be Batch Apex instead of a single synchronous Apex method?
- What does `Database.AllowsCallouts` do, and why is it required here?
