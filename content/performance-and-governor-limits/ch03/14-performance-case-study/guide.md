# Lesson 14 — Performance Case Study

**Chapter 3 · Fixing Performance · Lesson 14 of 16**

## What you'll learn

- How every concept from Chapters 1-3 combines in one realistic, multi-cause scenario
- Why real performance bugs are rarely caused by exactly one anti-pattern in isolation
- How to apply the Lesson 10 troubleshooting method to a scenario with several contributing causes
- The fully fixed version of the case study's code, annotated against each lesson it draws on

## The scenario

A mid-size org's Opportunity-to-Contract process has started throwing `System.LimitException: Too many SOQL queries: 101` intermittently — only on large deals that touch many related Contacts and Line Items, never on simple ones. Support's description: "It happens sometimes, we can't tell why, and it's getting worse." Three things are actually happening at once in the org, none of which is obvious from the error alone:

1. An `OpportunityTrigger` queries related Contacts inside a per-record loop (Lesson 3's SOQL-in-a-loop anti-pattern).
2. A Record-Triggered Flow on Opportunity, built separately by a different team, runs a Get Records element inside a loop over Opportunity Line Items (Lesson 11's Flow loop anti-pattern) — and because Flow and Apex share one transaction (Lesson 5), its query count adds directly to the trigger's.
3. The org's Opportunity volume has grown substantially over the past year, and large deals specifically (the ones with many related records) have grown fastest — a scalability trend (Lesson 6) that's made the existing anti-patterns cross the limit now, when they may not have a year ago.

## Applying the Lesson 10 method

**Reproduce with evidence.** Rather than guessing, a debug log is captured for an actual large-deal save that throws the exception. The `CUMULATIVE_LIMIT_USAGE` block shows `Number of SOQL queries: 101 out of 100` — confirming this is a hard failure, not a soft one, and giving an exact number to work from.

**Classify the failure.** Hard failure, per Lesson 10 — the transaction rolled back entirely.

**Locate where usage went.** The Logs tab's Execution Overview shows meaningful time and query volume attributed to both `Apex` and `Workflow/Flow` categories — immediately signaling this isn't purely an Apex problem, which is what makes it tempting (and wrong) to fix only the trigger and declare victory.

**Form hypotheses.** Two specific, testable hypotheses, grounded in Chapter 1 and Lesson 11: the trigger's per-Contact query inside its loop, and the Flow's per-Line-Item Get Records element inside its loop.

**Test in isolation, then fix both.** Here is the trigger's fix:

```apex
// Before: one query per Opportunity in Trigger.new
trigger OpportunityTrigger on Opportunity (after update) {
    for (Opportunity opp : Trigger.new) {
        List<Contact> relatedContacts = [
            SELECT Id FROM Contact WHERE AccountId = :opp.AccountId
        ];
        // ... logic using relatedContacts ...
    }
}

// After: one query for the whole batch
trigger OpportunityTrigger on Opportunity (after update) {
    Set<Id> accountIds = new Set<Id>();
    for (Opportunity opp : Trigger.new) {
        accountIds.add(opp.AccountId);
    }
    Map<Id, List<Contact>> contactsByAccount = new Map<Id, List<Contact>>();
    for (Contact c : [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accountIds]) {
        if (!contactsByAccount.containsKey(c.AccountId)) {
            contactsByAccount.put(c.AccountId, new List<Contact>());
        }
        contactsByAccount.get(c.AccountId).add(c);
    }
    for (Opportunity opp : Trigger.new) {
        List<Contact> relatedContacts = contactsByAccount.get(opp.AccountId);
        // ... logic using relatedContacts, now from the pre-built map ...
    }
}
```

The Flow fix (described, since Flow isn't Apex code) follows the same shape from Lesson 11: move the Get Records element outside the loop entirely, querying once for all relevant Line Item parent Opportunity Ids up front, then reference that single collection inside the loop instead of querying per iteration.

**Re-measure.** Re-running the same large-deal scenario and capturing a fresh debug log confirms the query count drops from 101 to a small, flat number regardless of deal size — direct evidence, not an assumption, that both fixes worked.

## Why "it's getting worse" was itself a diagnostic clue

The case study's trend — intermittent, worsening, concentrated on large deals — was itself informative before any code was even opened. "Only on large deals" pointed at something whose cost scales with related-record count (a per-record loop), and "getting worse over time" pointed at Lesson 6's scalability concern: a pre-existing anti-pattern that used to stay under the limit, now crossing it purely from data growth. Reading the symptom pattern correctly, before touching any code, is itself part of the diagnostic method.

## Key terms

| Term | Meaning |
|---|---|
| Multi-cause performance bug | A real-world performance issue caused by more than one contributing anti-pattern at once |
| Symptom pattern | The specific conditions under which a problem occurs (which records, how often, trending how), used as diagnostic evidence before reading code |
| Re-measurement | Confirming a fix actually worked by capturing fresh evidence, not assuming it did |

## Lab

Without re-reading the fix above, write your own bulkified version of the `OpportunityTrigger` "before" example from scratch, using the Set-and-Map pattern. Then write, in your own words, a two-sentence explanation of why "only on large deals, and getting worse over time" was itself useful diagnostic evidence, tying it to Lesson 6's scalability concept.

## Check yourself

Can you list, from memory, the three separate contributing causes in this case study? Can you explain why fixing only the trigger (and not the Flow) would have left the bug only partially resolved? Can you explain how the symptom pattern ("only large deals," "getting worse") pointed toward specific hypotheses before any code was read?
