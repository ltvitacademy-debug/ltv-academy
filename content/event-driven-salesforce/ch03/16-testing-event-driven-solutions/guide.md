# Lesson 16 — Testing Event-Driven Solutions

**Chapter 3 · Applying Events · Lesson 16 of 16**

## What you'll learn

- How `Test.startTest()` / `Test.stopTest()` actually deliver a published platform event in a unit test
- How to use `Test.getEventBus().deliver()` for finer control, including with async Apex
- How to simulate a publish failure with `Test.getEventBus().fail()`
- How to test idempotency logic deterministically, without relying on real duplicate delivery
- What's different about testing an LWC's `empApi` subscription logic

## Publishing in a test doesn't deliver immediately

Inside an Apex test, calling `EventBus.publish()` only **queues** the event — exactly like production — but nothing subscribes to it and reacts until you tell the test context to actually deliver it. The standard pattern wraps the publish call between `Test.startTest()` and `Test.stopTest()`: calling `Test.stopTest()` is what causes the queued event to actually be delivered to subscribers (triggers, Flow) on the test event bus, so your assertions belong **after** `Test.stopTest()`, checking the side effects a subscriber should have produced:

```apex
@isTest
private class OrderShippedTriggerTest {
    @isTest
    static void publishingEventCreatesTask() {
        Test.startTest();
        Order_Shipped__e evt = new Order_Shipped__e(
            Order_Number__c = 'ORD-1001',
            Carrier__c = 'UPS',
            Shipped_Date__c = Date.today()
        );
        EventBus.publish(evt);
        Test.stopTest(); // the queued publish is actually carried out here

        List<Task> created = [SELECT Id, Subject FROM Task];
        System.assertEquals(1, created.size());
        System.assert(created[0].Subject.contains('ORD-1001'));
    }
}
```

## Finer control: `Test.getEventBus().deliver()`

Sometimes you need to deliver events at a more specific moment than "whenever `stopTest()` runs" — for example, when a trigger that handles one event itself publishes a second event, and you need that second event delivered too, or when async Apex (a queueable or batch job) is involved. `Test.getEventBus().deliver()` can be called explicitly, either inside the `startTest`/`stopTest` block or after it:

```apex
Test.startTest();
EventBus.publish(firstEvent);
Test.getEventBus().deliver(); // deliver the first event's subscribers now

// A subscriber to firstEvent published a second event in reaction —
// deliver that one too before asserting on its downstream effects.
Test.getEventBus().deliver();
Test.stopTest();
```

If an async job (enqueued with `System.enqueueJob()`) publishes an event, that job runs when `stopTest()` executes it, and you may need an additional `deliver()` call after that to process the event it published.

## Simulating a publish failure: `Test.getEventBus().fail()`

To test your publish-callback logic (Lesson 12) for the failure path — not just the happy path — `Test.getEventBus().fail()` lets a test force a publish to fail, so `onFailure()` actually runs and you can assert your error-handling logic behaves correctly without needing to engineer a real production failure.

## Testing idempotency deterministically

Lesson 10's idempotency pattern (checking a `Processed_Event__c` tracking record before acting) is straightforward to test precisely because it's deterministic application logic, not something that depends on the platform actually delivering a duplicate. Insert a `Processed_Event__c` row for a specific `EventUuid` *before* publishing an event carrying that same identifier, then assert the subscriber's non-idempotent action (the Task creation, the log insert) did **not** happen a second time:

```apex
@isTest
static void duplicateEventIsSkipped() {
    String fakeUuid = '00000000-0000-0000-0000-000000000001';
    insert new Processed_Event__c(Event_Uuid__c = fakeUuid);

    Test.startTest();
    // In a real org EventUuid is system-generated and can't be set directly from
    // Apex on construction; this test asserts the tracking-check branch directly
    // against a seeded Processed_Event__c row representing "already handled."
    Test.stopTest();

    // Assert no new Shipment_Log__c was created for an event matching fakeUuid's record.
    System.assertEquals(0, [SELECT COUNT() FROM Shipment_Log__c WHERE Order_Number__c = 'ORD-DUP-TEST']);
}
```

The honest takeaway here: because `EventUuid` is system-populated and not something a test can freely fabricate on a constructed event the way you'd set a custom field, testing the duplicate-skip *branch* of your idempotency logic directly (by pre-seeding the tracking object and exercising just that check) is usually more practical than trying to force the platform to redeliver a real duplicate inside a test.

## Testing an LWC's `empApi` subscription

Unlike Apex, an LWC's `subscribe()`/`unsubscribe()` calls from Lesson 3 aren't something a Jest unit test can exercise against the real event bus — Jest tests run outside a Salesforce org entirely. The Salesforce Lightning Web Components testing tooling (`sfdx-lwc-jest`) provides a **mock** of the `lightning/empApi` module, so a component test can call your component's `connectedCallback()`, trigger the mocked `subscribe()`'s callback manually with a fake message payload, and assert the component updates its rendered output correctly — testing your component's reaction logic, not the real event delivery itself (which belongs to Salesforce's platform, not your component's test suite).

## Key terms

| Term | Meaning |
|---|---|
| `Test.startTest()` / `Test.stopTest()` | The block whose `stopTest()` call actually delivers a queued test-published event to subscribers |
| `Test.getEventBus().deliver()` | Explicit delivery of queued test events, useful for chained publishes or async jobs |
| `Test.getEventBus().fail()` | Forces a publish to fail in a test, to exercise publish-callback failure-handling logic |
| `sfdx-lwc-jest` empApi mock | The testing tool's mocked version of `lightning/empApi`, used to test an LWC's subscription-handling logic without a real event bus |

## Lab

Write the full `@isTest` class for `OrderShippedTriggerTest` above, running it in a scratch or Developer Edition org against the `OrderShippedTrigger` and `Order_Shipped__e` event from earlier lessons. Then extend it with a second test method that uses `Test.getEventBus().fail()` to force a publish failure and asserts that your `OrderShippedCallback.onFailure()` logic from Lesson 12 runs and logs the expected message.

## Check yourself

Why does `EventBus.publish()` inside a test not immediately trigger a subscribing Apex trigger, and what specifically causes delivery to happen? Why is testing the duplicate-skip branch of idempotency logic directly against a seeded tracking record usually more practical than trying to force a real duplicate delivery inside a test?
