# Lesson 3 — Publishing and Subscribing to Events

**Chapter 1 · Events in Salesforce · Lesson 3 of 16**

## What you'll learn

- How to publish a platform event from Apex with `EventBus.publish()`
- How to publish a platform event from Flow, and why Flow has a native option
- How to subscribe to a platform event from Apex using a platform event trigger
- How to subscribe from a Lightning Web Component using the `lightning/empApi` module
- Why publishing and subscribing never block each other

## Publishing from Apex

You publish a platform event from Apex by constructing an instance of the event SObject and passing it to `EventBus.publish()`:

```apex
Order_Shipped__e evt = new Order_Shipped__e(
    Order_Number__c = 'ORD-1001',
    Carrier__c = 'UPS',
    Shipped_Date__c = Date.today()
);

Database.SaveResult sr = EventBus.publish(evt);

if (!sr.isSuccess()) {
    for (Database.Error err : sr.getErrors()) {
        System.debug(err.getStatusCode() + ': ' + err.getMessage());
    }
}
```

Two details matter here. First, `EventBus.publish()` returns a `Database.SaveResult` — a success here only confirms the event was **queued** for publishing, not that every subscriber has received it. Second, `EventBus.publish()` does **not** throw an exception on a failed publish the way a bad DML operation might; you have to check `isSuccess()` and inspect `getErrors()` yourself. You can also pass a `List<Order_Shipped__e>` to publish several events in bulk in one call, which returns a `List<Database.SaveResult>` — one result per event, mirroring how `Database.insert()` handles partial success.

## Publishing from Flow

Flow has a native way to publish a platform event: a **Create Records** element pointed at the platform event object, with the event's fields mapped from Flow variables. For most "just publish this event with these field values" use cases, that native element is simpler than writing Apex.

When you do need custom logic before publishing — bulk-safe multi-record publishing, conditional field population, or validation the Flow canvas can't express cleanly — you expose an Apex action to Flow with `@InvocableMethod`:

```apex
public with sharing class PublishOrderShippedAction {
    public class Request {
        @InvocableVariable(required = true) public String orderNumber;
        @InvocableVariable(required = true) public String carrier;
    }

    @InvocableMethod(label = 'Publish Order Shipped Event' category = 'Orders')
    public static void publish(List<Request> requests) {
        List<Order_Shipped__e> events = new List<Order_Shipped__e>();
        for (Request r : requests) {
            events.add(new Order_Shipped__e(
                Order_Number__c = r.orderNumber,
                Carrier__c = r.carrier,
                Shipped_Date__c = Date.today()
            ));
        }
        EventBus.publish(events);
    }
}
```

The method takes and returns **lists**, even though a single Flow run usually only invokes it once — that's a general Apex-to-Flow convention (covered in the programming foundations course), not something specific to events, and it's what lets the same action be called efficiently for a bulk Flow run over many records at once.

## Subscribing from Apex: a platform event trigger

A platform event trigger looks like an ordinary Apex trigger, but it only supports `after insert`, because a platform event is never updated or deleted after it's published — it only ever arrives:

```apex
trigger OrderShippedTrigger on Order_Shipped__e (after insert) {
    List<Task> notifications = new List<Task>();
    for (Order_Shipped__e evt : Trigger.new) {
        notifications.add(new Task(
            Subject = 'Order ' + evt.Order_Number__c + ' shipped via ' + evt.Carrier__c,
            ActivityDate = evt.Shipped_Date__c
        ));
    }
    insert notifications;
}
```

`Trigger.new` holds the batch of events delivered to this trigger invocation, exactly like an ordinary trigger — platform events are delivered in batches, so your trigger must be written to handle more than one event at a time, the same bulk-safe discipline you already apply to object triggers.

## Subscribing from a Lightning Web Component: `lightning/empApi`

An LWC subscribes to a platform event (or a Change Data Capture event, covered next lesson) using the `lightning/empApi` module, which wraps the underlying Streaming API connection for you:

```javascript
import { LightningElement } from 'lwc';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';

export default class ShipmentListener extends LightningElement {
    channelName = '/event/Order_Shipped__e';
    subscription;

    connectedCallback() {
        onError((error) => console.error('EMP API error', JSON.stringify(error)));

        subscribe(this.channelName, -1, (message) => {
            console.log('Order shipped event received', JSON.stringify(message));
        }).then((response) => {
            this.subscription = response;
        });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription, () => {
            console.log('Unsubscribed');
        });
    }
}
```

The second argument to `subscribe()` is the **replay ID** to start from; `-1` means "only events published from now on," which is almost always what you want for a live listener component. `disconnectedCallback()` is where you unsubscribe — leaving a subscription open after the component is removed from the page wastes a connection and can keep firing a callback against a component that no longer exists.

## Nothing here blocks anything else

Notice what's absent from every example above: the publisher never waits for a subscriber, and a subscriber never blocks the publisher. The Apex trigger fires asynchronously as events are delivered to the event bus; the LWC's `subscribe()` call registers a callback and returns immediately. This is the decoupling from Lesson 1 made concrete in actual code.

## Key terms

| Term | Meaning |
|---|---|
| `EventBus.publish()` | The Apex method used to publish one or more platform events |
| `Database.SaveResult` | The object `EventBus.publish()` returns, confirming the event was queued, not delivered |
| Platform event trigger | An Apex trigger on a platform event object, supporting only `after insert` |
| `lightning/empApi` | The LWC module providing `subscribe()`, `unsubscribe()`, and `onError()` for platform events and CDC |
| Replay ID | A position in the event stream; `-1` in `subscribe()` means "new events only" |

## Lab

In a scratch or Developer Edition org with the `Order_Shipped__e` event from Lesson 2's lab, do all three: (1) write and run an anonymous Apex script that publishes one `Order_Shipped__e` event and debugs the `Database.SaveResult`; (2) write the `OrderShippedTrigger` from this lesson so it creates a Task per event, and confirm a Task appears after your anonymous Apex runs; (3) build a minimal LWC using the `ShipmentListener` pattern above, add it to a Lightning page, and confirm the browser console logs the event when you publish another one from Execute Anonymous while the page is open.

## Check yourself

Why does `EventBus.publish()` return a `Database.SaveResult` instead of throwing an exception on failure, and what does that mean for how you should check whether a publish actually succeeded? Why can a platform event trigger only use `after insert`?
