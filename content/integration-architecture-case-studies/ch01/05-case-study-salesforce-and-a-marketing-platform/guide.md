# Lesson 5 — Case Study: Salesforce and a Marketing Platform

**Chapter 1 · Integration Case Studies · Lesson 5 of 14**

## What you'll learn

- Why a bidirectional integration introduces a problem the one-way case studies in Lessons 1-3 never faced
- What an update loop is, concretely, and the two standard ways to prevent one
- Why consent and suppression status have to be treated as integration-critical data, not an afterthought
- How duplicate matching logic has to be designed deliberately, not left to chance

## The scenario: Bellwood Apparel

Bellwood Apparel sells through both a direct sales team and large-scale email and SMS marketing campaigns. Salesforce holds leads and contacts created by the sales team; a separate marketing automation platform holds the same people, enriched with campaign engagement history, email opens, and click behavior. Both systems need to see each other's changes: when marketing captures a new lead from a campaign landing page, it should appear in Salesforce for a rep to work; when a rep updates a contact's email address or a prospect unsubscribes, marketing needs to know immediately.

This is the first case study in this chapter where data flows in **both directions between the same two systems on the same records** — a materially different problem than Lessons 1-4, where data moved one way, or where two systems owned clearly separate fields.

## The update loop problem

A naive bidirectional sync creates a specific, well-known failure: Salesforce pushes a contact's updated email address to the marketing platform, the marketing platform's own sync logic sees "a contact changed" and pushes it right back to Salesforce, Salesforce's sync sees that incoming change and pushes it out again — and the same record bounces back and forth indefinitely, burning API calls and, worse, potentially re-triggering downstream automation (like a welcome email) on every loop iteration.

There are two standard ways to prevent this. The first is a **last-modified-by or source-system tag**: each record change carries a marker identifying which system made the change, and a sync job skips reflecting a change back to the system that originated it. The second is **field-level change detection with a cooldown**: before pushing a change, the sync compares the specific field values involved (not just a generic "something changed" timestamp) and skips the push if the target system already has that exact value. Bellwood's design uses the source-system tag, because it's simpler to reason about and catches the loop at its root cause rather than trying to detect it after the fact.

## Consent and suppression are integration-critical, not just a marketing concern

When a prospect unsubscribes or withdraws marketing consent, that status has to propagate to Salesforce just as reliably as a changed email address does — a sales rep working a lead who has legally opted out of marketing contact, with no record of it in Salesforce, is a real compliance exposure, not a minor UX gap. This case study treats consent and suppression status as a first-class field in the sync, held to the same reliability bar as any other business-critical data, rather than something that's assumed to "mostly" make it across.

## Matching is a design decision, not a given

Both systems hold records of the same people, created independently — a lead captured by marketing and a contact created later by a sales rep might represent the same actual person with slightly different name spelling or a different email domain. The integration needs an explicit **matching strategy**: which fields are compared (typically email address as the primary key, with phone number as a fallback), what happens when a match is found (merge vs. link vs. flag for manual review), and what happens when no match is found but the records look similar (create a duplicate, or hold for review). Leaving this undecided doesn't mean there's no matching behavior — it means whatever the underlying tools happen to do by default becomes the de facto policy, usually without anyone having actually chosen it.

## Key terms

| Term | Meaning |
|---|---|
| Bidirectional integration | An integration where both systems can originate changes to the same shared data |
| Update loop | A failure mode where a change bounces back and forth between two systems indefinitely |
| Source-system tag | A marker on a change identifying which system originated it, used to prevent reflecting it back |
| Suppression status | A record of a person's opt-out or consent withdrawal, which must sync as reliably as any other field |
| Matching strategy | The explicit rule set for deciding whether two records from different systems represent the same person |

## Lab

Bellwood's legal team flags a real incident: a customer who unsubscribed through a marketing email footer link was still called by a sales rep three weeks later, because the opt-out never reached Salesforce. Using this lesson's concepts: (1) identify which integration-critical field this incident actually involves, (2) propose why it might have been treated as lower priority than other synced fields, and (3) describe how you'd change the design so this specific failure can't recur, including how you'd verify the fix actually works before calling it done.

## Check yourself

Can you describe, step by step, how an update loop actually happens in a bidirectional sync, and explain which of the two prevention techniques this lesson's design uses and why? Can you explain why consent and suppression status deserve the same reliability guarantees as core identity fields like email address, rather than being treated as a secondary concern?
