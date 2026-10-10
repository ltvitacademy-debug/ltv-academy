# Lesson 22 — One Trigger per Object

**Chapter 3 · Triggers · Lesson 22 of 43**

## What you'll learn

- Why Salesforce allows multiple triggers per object, but recommends against it
- What happens to execution order when an object has several triggers
- How "one trigger per object" works together with the handler pattern
- How to consolidate existing triggers without losing any logic

## Salesforce allows it — but doesn't guarantee order

Nothing stops you from creating more than one trigger on the same object
and the same event. If you create both of these:

```apex
trigger OpportunityTrigger1 on Opportunity (before insert) { /* ... */ }
trigger OpportunityTrigger2 on Opportunity (before insert) { /* ... */ }
```

both will fire on every Opportunity insert. The problem is that **the order
they run in relative to each other is not guaranteed.** If
`OpportunityTrigger2`'s logic depends on something `OpportunityTrigger1`
set up first, you have no reliable way to guarantee that ordering holds —
today, or after someone adds a third trigger next year.

## Why that's dangerous in practice

Picture two triggers on `Opportunity`, each written by a different team:

```apex
trigger DiscountTrigger on Opportunity (before insert) {
    for (Opportunity opp : Trigger.new) {
        if (opp.Amount != null) {
            opp.Amount = opp.Amount * 0.95; // apply standard discount
        }
    }
}

trigger CommissionTrigger on Opportunity (before insert) {
    for (Opportunity opp : Trigger.new) {
        opp.Commission__c = opp.Amount * 0.1; // commission off the *current* Amount
    }
}
```

If `CommissionTrigger` happens to run before `DiscountTrigger`, the
commission is calculated on the pre-discount amount. If it runs after, it's
calculated on the discounted amount. Both are "correct Apex" — but which one
actually happens is left to the platform, which is exactly the kind of bug
that's nearly impossible to reproduce reliably in testing.

## The recommended practice

Salesforce's guidance — and this course's standard — is **one trigger per
object**, covering every event that object needs:

```apex
trigger OpportunityTrigger on Opportunity (
    before insert, before update, after insert, after update
) {
    new OpportunityTriggerHandler().run();
}
```

All the logic that used to live in `DiscountTrigger` and `CommissionTrigger`
moves into methods on `OpportunityTriggerHandler` (Lesson 21), called in an
explicit, intentional order that you control directly in code:

```apex
public class OpportunityTriggerHandler {
    public void beforeInsert(List<Opportunity> newOpps) {
        applyDiscount(newOpps);
        calculateCommission(newOpps);  // order is now explicit and readable
    }

    private void applyDiscount(List<Opportunity> opps) { /* ... */ }
    private void calculateCommission(List<Opportunity> opps) { /* ... */ }
}
```

Now the order is a line of code you can read, not a platform implementation
detail you're hoping stays stable.

## Consolidating existing triggers

If you inherit an org with several triggers already on one object, the fix
is mechanical: create one new trigger covering the union of all the events,
move each old trigger's body into its own handler method (or a private
helper called from the right context method), call them in a deliberate
order, then deactivate (or delete) the old triggers one at a time while
testing after each change.

## Key terms

| Term | Meaning |
|---|---|
| One trigger per object | The practice of having a single trigger per sObject that routes to a handler, rather than several independent triggers |
| Execution order | The sequence in which multiple triggers on the same object and event run; unguaranteed across separate triggers |
| Consolidation | Merging multiple existing triggers on one object into a single trigger plus handler methods |

## Lab

If your practice org already has more than one trigger on the same object
(or create two toy ones on `Lead` to see the problem), merge them: create a
single `LeadTrigger`, move each old trigger's logic into its own method on
a new `LeadTriggerHandler`, call both methods in an explicit order from the
new trigger, then deactivate the two original triggers from Setup → Apex
Triggers. Re-run a Lead insert and confirm both pieces of logic still run,
in the order you intended.

## Check yourself

Why can't you rely on `OpportunityTrigger1` always running before
`OpportunityTrigger2` even if that's what you've observed in testing so
far?
