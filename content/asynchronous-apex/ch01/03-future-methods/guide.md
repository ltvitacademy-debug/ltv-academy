# Lesson 3 — Future Methods

**Chapter 1 · Asynchronous Processing · Lesson 3 of 16**

## What you'll learn

- The exact syntax and structural rules for an `@future` method
- Why future method parameters are restricted to primitives, and the ID-passing workaround
- The `callout=true` option and when you need it
- The specific limits on future methods, and why Salesforce now steers developers toward Queueable Apex instead

## The `@future` annotation

A future method is a `static` Apex method, annotated with `@future`, that must return `void`:

```apex
public class AccountNotifier {
    @future(callout=true)
    public static void notifyExternalSystem(Set<Id> accountIds) {
        List<Account> accounts = [
            SELECT Id, Name, BillingState
            FROM Account
            WHERE Id IN :accountIds
        ];

        for (Account acc : accounts) {
            // Build and send an HTTP callout per account (or batch them into
            // one request, depending on the external API's shape).
            HttpRequest req = new HttpRequest();
            req.setEndpoint('callout:External_CRM/accounts/' + acc.Id);
            req.setMethod('POST');
            req.setBody(JSON.serialize(acc));
            new Http().send(req);
        }
    }
}
```

Calling it from anywhere else in synchronous Apex looks like an ordinary static method call:

```apex
AccountNotifier.notifyExternalSystem(new Set<Id>{ acc.Id });
```

That call doesn't run `notifyExternalSystem` right now — it queues the call, and the platform executes it later, in its own transaction.

## `callout=true` is required for callouts

If a future method makes an HTTP callout, the annotation must say so explicitly: `@future(callout=true)`. Leaving it off and then attempting a callout inside the method throws a runtime error. If a future method does no callouts — say, it only does heavy internal processing or sends an email — plain `@future` is enough.

## Parameters: primitives only, no sObjects

This is the rule that trips up almost everyone the first time: a future method's parameters can only be primitive types (`Id`, `String`, `Integer`, `Boolean`, and so on), arrays of primitives, or collections of primitives. You **cannot** pass an `Account`, a `List<Account>`, or any other sObject or custom object directly as a parameter.

The reason is timing, not an arbitrary restriction. A future method might not actually run for some time after it's queued. If you passed an `Account` record by value, the method would be working with a stale snapshot — whatever the record looked like at the moment it was queued — potentially overwriting changes made to that same record in the meantime. The fix Salesforce documents is to pass the record's `Id` (or a `Set<Id>` / `List<Id>` for several records) and query for the current data inside the future method itself, exactly like `notifyExternalSystem` does above. That guarantees the method always works against the freshest version of the record once it actually runs.

## Future method limits

- A single Apex invocation can queue a **maximum of 50 future method calls**.
- A future method **cannot call another future method** — there's no chaining a future method into a second future method.
- Future method invocations draw from the same shared, org-wide **daily limit for all asynchronous Apex** (future methods, Queueable jobs, Batch Apex, and Scheduled Apex combined) — covered in full in Lesson 11.
- If the transaction that queued a future call rolls back, the queued future invocation is **not** executed — it only runs if the enqueuing transaction actually commits.

## Why Salesforce now recommends Queueable Apex instead

Future methods were Apex's original asynchronous tool, and they're still perfectly valid for small, simple, one-off jobs. But Salesforce's own current documentation recommends reaching for **Queueable Apex** (Lesson 4) for most new work, because Queueable Apex covers the same use cases while adding: a trackable job ID you actually get back (a future method call gives you nothing to monitor), support for passing non-primitive types like sObjects and custom classes, and the ability to chain one job into a follow-up job. Future methods are still worth knowing — plenty of production orgs use them, and you'll run into them in existing codebases — but default to Queueable Apex for anything you're building new, unless you have a specific, simple reason not to.

## Key terms

| Term | Meaning |
|---|---|
| `@future` | The annotation marking a static, void-returning method to run asynchronously |
| `@future(callout=true)` | Required variant when the future method performs an HTTP callout |
| Primitive-only parameters | The rule that future methods can only accept primitives, arrays of primitives, or collections of primitives — not sObjects |
| Future method limit | Maximum of 50 future calls queued per Apex invocation |

## Lab

Write (on paper or in a scratch org) an `@future(callout=true)` method named `sendShippingUpdate` that takes a `Set<Id>` of Order record Ids, queries each Order's `Status` field inside the method, and sends a callout for each one. Then write the line of code that would call it from a trigger after an Order's status changes to "Shipped." Make sure your method signature follows every rule in this lesson: `static`, `void`, primitive-collection parameter only.

## Check yourself

Can you write the skeleton of an `@future` method from memory — the annotation, the `static void` signature, and a primitive-only parameter? Can you explain why you can't pass an `Account` directly into a future method, and what you'd pass instead?
