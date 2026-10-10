# Lesson 34 — Apex Practice Project: Case Routing

**Chapter 5 · Applied Apex · Lesson 34 of 43**

## What you'll learn

- Building a before-insert trigger that routes Cases to the right queue based on field values
- Why this is a legitimate example of reaching for Apex instead of declarative Case Assignment Rules
- Using a Map to centralize routing logic instead of a long if/else chain
- How a before trigger directly modifying `Trigger.new` avoids an extra DML statement
- Where the line actually is between "use declarative automation" and "use Apex"

## The business problem

Support wants every new Case automatically routed to a specific queue based on its `Origin` field: Cases from `'Web'` go to the Tier 1 queue, Cases from `'Phone'` go to the Tier 2 queue, and anything else falls back to a general queue for manual triage.

## Apex vs. declarative Case Assignment Rules

Salesforce's own declarative **Case Assignment Rules** can already do simple field-based routing like this through clicks, not code — and for a rule this simple, that's genuinely the right tool, not Apex. This project exists to teach the Apex pattern, but it's worth being honest about when you'd actually reach for it in practice: Apex earns its place once the routing logic needs something declarative rules can't easily express — cross-object lookups, calling an external callout to decide ownership, or combining routing with other logic that already lives in Apex for a different reason. A real architect's job includes knowing when *not* to write a trigger.

## The trigger and handler

```apex
trigger CaseTrigger on Case (before insert) {
    if (Trigger.isBefore && Trigger.isInsert) {
        CaseTriggerHandler.routeNewCases(Trigger.new);
    }
}
```

```apex
public with sharing class CaseTriggerHandler {

    private static final Map<String, String> QUEUE_NAME_BY_ORIGIN = new Map<String, String>{
        'Web' => 'Tier_1_Support',
        'Phone' => 'Tier_2_Support'
    };
    private static final String FALLBACK_QUEUE_NAME = 'General_Triage';

    public static void routeNewCases(List<Case> newCases) {
        Set<String> queueNames = new Set<String>(QUEUE_NAME_BY_ORIGIN.values());
        queueNames.add(FALLBACK_QUEUE_NAME);

        Map<String, Id> queueIdByName = new Map<String, Id>();
        for (Group g : [SELECT Id, DeveloperName FROM Group WHERE Type = 'Queue' AND DeveloperName IN :queueNames]) {
            queueIdByName.put(g.DeveloperName, g.Id);
        }

        for (Case c : newCases) {
            String queueDeveloperName = QUEUE_NAME_BY_ORIGIN.containsKey(c.Origin)
                ? QUEUE_NAME_BY_ORIGIN.get(c.Origin)
                : FALLBACK_QUEUE_NAME;

            Id queueId = queueIdByName.get(queueDeveloperName);
            if (queueId != null) {
                c.OwnerId = queueId; // modifying Trigger.new directly in a before trigger
            }
        }
    }
}
```

## Why a Map beats a long if/else chain

Routing logic like this tends to grow over time as support adds more intake channels. A `Map<String, String>` keyed by `Origin` scales to a dozen entries just as easily as two, and reads as data rather than branching logic — adding a new routing rule means adding one line to the map, not another `else if` to a growing chain. This is the same principle Lesson 28 introduced about moving configuration out of hardcoded branches, applied at a smaller scale.

## Why a before trigger here, and no extra DML

Because this trigger runs **before insert**, it can set `c.OwnerId` directly on each record in `Trigger.new` and let the platform's own save operation persist that value — there's no separate `update` statement needed, unlike the after-trigger pattern from Lesson 33. This is exactly the before-trigger use case Lesson 20 introduced: default/derived field values belong in a before trigger specifically because you can modify the record in place for free, before it's written to the database.

## Key terms

| Term | Meaning |
|---|---|
| Case Assignment Rule | Salesforce's declarative, click-based tool for simple Case routing — often the right choice over Apex |
| Routing map | A `Map<String, String>` (or similar) centralizing routing logic as data instead of a branching if/else chain |
| Before-trigger field assignment | Setting a field directly on `Trigger.new` in a before trigger, avoiding a separate DML statement |

## Lab

In a Developer Edition org, create the two queues referenced above (`Tier_1_Support`, `Tier_2_Support`, `General_Triage`) under Setup, then build the trigger and handler exactly as shown. Insert a new Case with `Origin = 'Web'` and confirm it's owned by the Tier 1 queue; insert one with `Origin = 'Email'` (not in the map) and confirm it falls back to the General Triage queue.

## Check yourself

Why does this handler query the `Group` object for queue Ids instead of hardcoding them? (Hint: revisit Lesson 28.) In what situation would this lesson's own reasoning tell you to use a declarative Case Assignment Rule instead of writing this trigger at all?
