# Lesson 10 — Maintaining Automation Over Time

**Chapter 2 · Choosing the Right Tool · Lesson 10 of 18**

## What you'll learn

- Why automation that works on day one still needs active maintenance
- Naming and documentation conventions that keep automation legible to someone who didn't build it
- The difference between deactivating and deleting, and why that choice matters
- How to evaluate whether it's time to consolidate overlapping automation on an object

## Working today isn't the same as maintainable tomorrow

Every tool in this chapter eventually gets touched by someone who didn't build it: a new admin, a consultant, you yourself eighteen months later with no memory of why a rule exists. Chapter 1 built a working discount approval process. This lesson is about what keeps it working, and legible, as the org around it keeps changing.

## Naming conventions aren't bureaucracy, they're load-bearing

A validation rule named `Rule_1` tells the next person nothing. A validation rule named `Opp_Block_Discount_Over_40_Without_Justification` tells them what it does without opening it. The same applies to approval processes, Email Alerts, and Flow — a consistent naming pattern (object, purpose, condition) turns a Setup list of fifty automations from a mystery into a map. Pick a convention before the org has fifty of them, because renaming later touches every reference.

## Document intent, not just mechanism

The formula itself documents *what* a validation rule checks. It doesn't document *why* — and "why" is almost always what breaks when someone "fixes" it later without context. A **Description** field (every automation type has one) should capture:

- The business reason the rule exists (who asked for it, what problem it solved)
- Any non-obvious edge case it's handling
- What would break if it were removed

This is a few minutes of work when you build something, and hours of archaeology for whoever has to guess at it later.

## Deactivate before you delete

Validation rules, approval processes, and workflow rules can all be **deactivated** without being deleted — turned off, but still present, still documented, still restorable in seconds. Deleting is permanent and destroys the configuration history. The practical rule: deactivate first, watch for a reasonable period (a full business cycle if you can manage it) to confirm nothing depended on it silently, and only delete once you're confident it's genuinely unused.

## Recognizing when it's time to consolidate

A single object accumulating automation over years — three validation rules that could be one with `OR()`, two Flows doing adjacent things that could be one record-triggered Flow — isn't automatically wrong, but it's a maintenance cost that compounds. Signs it's worth consolidating:

- You can't predict the order several automations will run in without checking Lesson 8's reference material every time
- Two or more rules/flows read or write the same field (the collision risk from Lesson 9)
- New admins consistently ask "wait, why are there three rules doing almost the same thing?"

Consolidation is itself a change that needs testing in a sandbox before it touches production — don't treat "cleanup" as lower-risk than "new feature."

## A change management habit worth building now

Before changing any existing automation in a production org: check what currently references it (reports, other automation, integrations), test the change in a sandbox, and have a rollback plan more specific than "deactivate and hope." This isn't unique to Salesforce — it's the same discipline any production system demands — but declarative tools make changes so fast to make that it's easy to skip the discipline specifically because it *felt* low-risk.

## Recap

- Automation needs maintenance because the people maintaining it change, even when the automation itself doesn't.
- A consistent naming convention, picked early, is one of the cheapest investments you can make in long-term legibility.
- The Description field should capture *why*, not just restate the formula's *what*.
- Deactivate before deleting, and treat consolidation as a real change requiring real testing, not a free cleanup.

## Try it yourself

Go back through everything built in this chapter — the validation rule, the approval process, the email alert — and write a one-sentence Description for each that explains *why* it exists, not just what it checks.

## Check yourself

Your org has three validation rules on Opportunity, all written by different people over two years, that each partially overlap in what they check. What's your first step before consolidating them, and why does that order matter?
