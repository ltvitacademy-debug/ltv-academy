# Lesson 6 — Error Handling and Retries

**Chapter 1 · Outbound Integration · Lesson 6 of 23**

## What you'll learn

- The two different ways a callout can fail: an exception versus a bad status code
- How to catch `System.CalloutException` without hiding real bugs
- Why Apex can't retry in a tight synchronous loop, and what pattern to use instead
- A complete retry-with-attempt-count example using Queueable Apex
- How to decide which failures deserve a retry and which don't

## Two different kinds of failure

A callout fails in one of two distinct ways, and conflating them is a common bug:

1. **The callout itself fails** — the endpoint is unreachable, the connection times out, the URL is malformed, or the Named Credential's authentication is misconfigured. This throws a `System.CalloutException`.
2. **The callout succeeds, but the remote system reports an error** — the HTTP call completed and returned a response, but with a status like 400, 404, or 500. This does *not* throw an exception; you only find out by checking `HttpResponse.getStatusCode()`.

Handling only one of these two failure modes leaves the other completely silent. Real integration code checks both:

```apex
Http http = new Http();
HttpRequest req = new HttpRequest();
req.setEndpoint('callout:Order_System/orders/' + orderId);
req.setMethod('GET');

HttpResponse res;
try {
    res = http.send(req);
} catch (CalloutException ce) {
    System.debug('Callout failed entirely: ' + ce.getMessage());
    throw new IntegrationException('Could not reach order system: ' + ce.getMessage());
}

if (res.getStatusCode() != 200) {
    System.debug('Order system returned an error: ' + res.getStatusCode() + ' ' + res.getBody());
    throw new IntegrationException('Order system error: ' + res.getStatusCode());
}
```

## Why you can't just "retry in a loop"

A natural instinct is to wrap a failed callout in a loop that tries again a few times before giving up. In Apex, this is a bad idea for two reasons: governor limits still apply within that same transaction (the 100-callouts-per-transaction and 120-second cumulative timeout limits from Lesson 7 apply across every attempt, not per logical retry), and a tight synchronous retry loop blocks the user waiting on that transaction for however long the retries take, which is a poor experience if the remote system is genuinely down.

## The real pattern: asynchronous retry with an attempt count

Instead, failed callouts that are worth retrying are typically re-queued asynchronously, with a tracked attempt count and a cap:

```apex
public class OrderSyncRetryJob implements Queueable, Database.AllowsCallouts {
    private String orderId;
    private Integer attempt;

    public OrderSyncRetryJob(String orderId, Integer attempt) {
        this.orderId = orderId;
        this.attempt = attempt;
    }

    public void execute(QueueableContext context) {
        try {
            OrderStatusClient.updateOrderStatus(orderId, 'Synced');
        } catch (Exception e) {
            if (attempt < 3) {
                System.enqueueJob(new OrderSyncRetryJob(orderId, attempt + 1));
            } else {
                Order_Sync_Failure__c failure = new Order_Sync_Failure__c(
                    Order_Id__c = orderId,
                    Last_Error__c = e.getMessage()
                );
                insert failure;
            }
        }
    }
}
```

This gives each retry attempt its own fresh transaction and its own fresh governor limits, caps the number of attempts so a persistently failing integration doesn't retry forever, and records a durable failure record once the cap is hit so a human or a monitoring process (Lesson 23) can follow up.

## Deciding what's worth retrying

Not every failure should trigger a retry. A timeout or a 503 (service unavailable) is often transient and worth retrying. A 400 (bad request) or 401 (unauthorized) usually means something is wrong with the request itself or its credentials — retrying the identical request will fail identically every time, so those should be logged and surfaced for a person to fix, not retried automatically.

## Key terms

| Term | Meaning |
|---|---|
| CalloutException | Thrown when the callout itself can't complete (unreachable, timeout, malformed URL) |
| Status code failure | A callout that completes but the remote system reports an error via its HTTP status |
| Retry with attempt count | Re-queuing failed async work with a tracked, capped number of attempts |
| Transient vs non-transient failure | Whether retrying the identical request is likely to succeed or will fail identically |

## Lab

Extend the `OrderStatusClient` from Lesson 4 with a try/catch around the callout that distinguishes a `CalloutException` from a non-200 status code, logging each differently. Then write the `OrderSyncRetryJob` pattern above as real Apex in a scratch org, including a custom object (or use a simple custom field combination) to record a permanent failure after the attempt cap is reached. Using the mock-callout technique from Lesson 5, write a test that forces three consecutive failures and asserts a failure record is created after the third attempt, not before.

## Check yourself

Explain the difference between a CalloutException and a non-200 status response, and why both must be checked. Then explain why Apex integration code generally can't retry in a tight synchronous loop, and what it does instead.
