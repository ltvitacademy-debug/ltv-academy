# Lesson 21 — Integration Practice Project: Order Sync

**Chapter 4 · Patterns and Practice · Lesson 21 of 23**

## What you'll learn

- How to design a Fire and Forget order-status sync end to end
- Why this project is structured as trigger → Queueable → callout → DML, in that order
- How to simulate an external order system so the project is buildable with no real external dependency
- How to apply error handling and retry (Lesson 6) to a complete, realistic project
- How to verify the finished project actually behaves asynchronously and idempotently

## The project

Riverstone Outfitters (the fictitious company from Lesson 1) needs its Salesforce `Order__c` records to reflect fulfillment status from an external order-management system. When an Order is marked "Submitted," Salesforce should call out to the external system, retrieve the current fulfillment status, and update the Order's `Fulfillment_Status__c` field — asynchronously, since this is a Fire and Forget pattern (Lesson 19): Salesforce doesn't need to block the user who just submitted the order.

## Architecture

This project deliberately exercises the transaction-ordering rule from Lesson 7 and the retry pattern from Lesson 6:

1. A trigger on `Order__c` (`after update`) detects a transition to Status = 'Submitted' and enqueues a Queueable job — it does **not** make the callout directly, since the trigger's own transaction still has pending DML context around it.
2. The Queueable job (`implements Queueable, Database.AllowsCallouts`) runs in its own fresh transaction. Inside `execute()`, it makes the callout **first**, then performs the DML update to `Order__c` — correctly ordered per Lesson 7's rule, since by that point the callout is complete and no longer "pending."
3. If the callout fails, the job re-enqueues itself with an incremented attempt counter, capped at 3 attempts (directly reusing Lesson 6's retry pattern), and writes a durable failure record after the cap is hit.

```apex
public class OrderSyncJob implements Queueable, Database.AllowsCallouts {
    private Id orderId;
    private Integer attempt;

    public OrderSyncJob(Id orderId, Integer attempt) {
        this.orderId = orderId;
        this.attempt = attempt;
    }

    public void execute(QueueableContext context) {
        try {
            Http http = new Http();
            HttpRequest req = new HttpRequest();
            req.setEndpoint('callout:Order_System/orders/' + orderId + '/status');
            req.setMethod('GET');
            HttpResponse res = http.send(req);

            if (res.getStatusCode() != 200) {
                throw new CalloutException('Status ' + res.getStatusCode());
            }

            Map<String, Object> body = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            update new Order__c(
                Id = orderId,
                Fulfillment_Status__c = (String) body.get('status')
            );
        } catch (Exception e) {
            if (attempt < 3) {
                System.enqueueJob(new OrderSyncJob(orderId, attempt + 1));
            } else {
                insert new Order_Sync_Failure__c(
                    Order__c = orderId,
                    Last_Error__c = e.getMessage()
                );
            }
        }
    }
}
```

## Simulating the external system

Since you won't have a real external order system, build a Named Credential pointing at a request-echoing test service (many free ones exist for exactly this purpose), or — better for full control — write a second, throwaway Apex REST service (reusing Lesson 8's pattern) in the same org that returns a hard-coded or randomized fulfillment status, and point your Named Credential at its `/services/apexrest/...` URL. Either approach lets you test the full round trip without a real third-party dependency.

## Idempotency matters here

Because this job can retry, make sure re-running it with the same order twice doesn't cause a problem — updating `Fulfillment_Status__c` to the same value it's already set to should be harmless, which it is here since the update is a plain field overwrite, not an "increment a counter" operation that would double-count on a retry. This is a general lesson worth internalizing: any code that might retry should be checked for exactly this kind of safety.

## Lab

Build this entire project in a scratch org: the `Order__c` custom object (reuse an existing one if your org has it, or create a minimal version with Status and Fulfillment_Status__c picklist/text fields), the trigger, the `OrderSyncJob` Queueable class, your simulated external endpoint, and the `Order_Sync_Failure__c` object for the failure path. Using the mocking technique from Lesson 5, write a test that forces a success on the first attempt and a separate test that forces three consecutive failures, asserting a failure record is created only after the third. Manually mark a real test Order "Submitted" in the UI and confirm its `Fulfillment_Status__c` updates asynchronously within a few seconds.

## Check yourself

Explain, without looking back, why the trigger enqueues a Queueable instead of calling out directly. Then explain what "idempotent" means in this project's context and why it matters specifically because this job can retry.
