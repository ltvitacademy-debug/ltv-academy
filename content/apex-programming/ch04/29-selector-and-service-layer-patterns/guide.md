# Lesson 29 — Selector and Service Layer Patterns

**Chapter 4 · Governor Limits and Design · Lesson 29 of 43**

## What you'll learn

- What a Selector class is, and what problem it solves
- What a Service class is, and how it differs from a Selector
- Why this layering is a community convention, not an official Salesforce-mandated structure
- How Selector/Service classes relate to the trigger handler pattern from Chapter 3
- A simple, honest example of when this pattern is worth the extra classes — and when it isn't

## The problem: query logic scattered everywhere

As an Apex codebase grows past a handful of classes, the same SOQL query — "give me all open Opportunities for this Account" — tends to get copy-pasted into several different classes: a trigger handler, a batch job, a REST service, a controller. When the query needs to change (a new field, a new filter), every copy has to be found and updated separately, and it's easy to miss one.

The **Selector pattern** solves this by centralizing all SOQL for a given object into one class, so every other class asks the Selector for data instead of writing its own query:

```apex
public with sharing class OpportunitySelector {
    public List<Opportunity> getOpenOpportunitiesByAccountIds(Set<Id> accountIds) {
        return [
            SELECT Id, Name, StageName, Amount, AccountId
            FROM Opportunity
            WHERE AccountId IN :accountIds
              AND IsClosed = false
        ];
    }
}
```

Now a trigger handler, a batch job, and a controller can all call `new OpportunitySelector().getOpenOpportunitiesByAccountIds(ids)` and get identical, consistently-filtered results — and if the query needs to change, it changes in exactly one place.

## The Service layer: where business logic lives

A **Service class** holds business logic — the actual rules about what should happen — separately from both the trigger that detected the event and the Selector that fetched the data:

```apex
public with sharing class OpportunityService {
    public void flagStalledOpportunities(List<Opportunity> opps) {
        List<Opportunity> toUpdate = new List<Opportunity>();
        for (Opportunity opp : opps) {
            if (opp.StageName == 'Negotiation' && opp.LastModifiedDate < Date.today().addDays(-30)) {
                opp.Description = (opp.Description == null ? '' : opp.Description + '\n')
                    + 'Flagged as stalled on ' + Date.today();
                toUpdate.add(opp);
            }
        }
        if (!toUpdate.isEmpty()) {
            update toUpdate;
        }
    }
}
```

A trigger handler (Lesson 21) would then simply call into the Service: `new OpportunityService().flagStalledOpportunities(Trigger.new);` — the trigger handler's job shrinks to "detect the event and dispatch to the right Service method," while the Service class owns the actual business rule and the Selector owns the actual query.

## Why this is a convention, not a platform mandate

Nothing in Salesforce enforces this structure — you could write a perfectly functioning Salesforce org with every bit of logic jammed into trigger bodies. Selector and Service classes are a widely-used community convention for keeping larger codebases maintainable, strongly associated with open-source Apex frameworks like the Apex Enterprise Patterns library (commonly referred to by its original package name, "fflib"). Different teams use variations of it — some add a further "Domain" layer for object-specific behavior — but the core idea in every version is the same: separate "where do I get the data" (Selector) from "what should happen with it" (Service) from "what triggered this" (the trigger handler).

## When it's worth it, and when it isn't

For a small org with a handful of simple triggers, introducing a full Selector/Service layer for every object can be more structure than the actual complexity warrants — three extra classes to do what one twenty-line trigger handler could do just as clearly. The pattern earns its cost once an object has several different pieces of automation (a trigger, a batch job, a scheduled job, an Apex REST endpoint) that all need the same data or the same business rule, because that's exactly the situation where duplicated logic starts silently drifting out of sync.

## Key terms

| Term | Meaning |
|---|---|
| Selector class | A class that centralizes all SOQL for a given object, so other classes query through it rather than duplicating SOQL |
| Service class | A class that holds business logic, separate from data access and from the trigger that detected the event |
| Apex Enterprise Patterns (fflib) | A well-known open-source Apex framework associated with popularizing this layered convention |

## Lab

Take the trigger handler you wrote for Chapter 3's practice lab. Extract its SOQL query into a new Selector class with a clearly-named method, and extract its actual business logic into a new Service class with a clearly-named method. Rewrite the trigger handler so it only detects the event and calls into the Service, which in turn calls into the Selector. Confirm the behavior is identical to before — same records updated, same outcome — just reorganized.

## Check yourself

Can you explain, in one sentence each, what a Selector class is responsible for and what a Service class is responsible for? Can you describe a realistic situation where skipping this pattern and just writing logic directly in the trigger would actually be the more reasonable choice?
