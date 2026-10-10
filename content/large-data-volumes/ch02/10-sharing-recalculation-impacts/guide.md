# Lesson 10 — Sharing Recalculation Impacts

**Chapter 2 · Skew and Locking · Lesson 10 of 16**

## What you'll learn

- What triggers an automatic sharing recalculation, beyond the obvious sharing-rule change
- Why this becomes an LDV problem specifically, not just a general performance concern
- What deferred sharing calculation does, and the trade-off of using it
- How to sequence a large structural change so deferred sharing calculation actually helps

## What triggers a recalculation

Salesforce automatically recalculates sharing whenever something changes that could affect who can see which records. That list is broader than most admins expect: changes to the role hierarchy, public groups, sharing rules, the territory hierarchy, a user's role, team membership (like an Account or Opportunity team), or even a simple change of record ownership can all independently trigger the platform to recompute who has access to what. Any one of these, by itself, is normally a routine, fast operation.

## Why this becomes an LDV problem

The cost of a sharing recalculation scales with how much data exists to recalculate sharing for — which means a routine, fast operation on a small org can become a slow, resource-intensive one on an LDV-scale org. A single role-hierarchy move that would recalculate access for a few hundred records in a small org might need to recalculate access for millions of records in a large one. And because several of the triggering changes above commonly happen in *batches* during a reorganization — moving many users to new roles, updating organization-wide defaults, standing up new sharing rules for a new business unit — a single administrative change can set off a cascade of expensive recalculations, one after another, each one waiting for the previous one to finish before the next administrative step can safely proceed.

This is exactly the kind of problem that's invisible in a sandbox with a small seed dataset and only becomes a real operational cost once an org has grown into genuine LDV territory — which is why it belongs in this course rather than in general sharing-model training.

## What deferred sharing calculation does

**Deferred sharing calculation** is a feature that lets an administrator temporarily suspend automatic sharing recalculation, make a batch of structural changes (new organization-wide defaults, new public groups and queues, new sharing rules, a role reorganization) without the platform recalculating sharing after each individual step, and then resume sharing calculation once, so the recalculation runs in bulk for the whole batch of changes at once rather than once per change. This is specifically useful for sequencing a large production change during a planned maintenance window, where the goal is to get every structural piece in place first and only then pay the recalculation cost a single time.

It's important to be precise about what this feature is for: it's a tool for a bounded, planned maintenance operation, not a permanent setting. An administrator defers calculation, performs the batch of changes, and then explicitly resumes calculation afterward so the org's sharing actually reflects the new configuration. Access to suspend and resume sharing calculation is controlled by a specific permission, and because this capability is sensitive — access genuinely is out of sync with configuration while calculation is deferred — it is treated as a limited, admin-controlled capability rather than something broadly available by default. The administrator should confirm their org's current enablement and permission requirements before planning around it, since this capability's exact access path has evolved since it was first introduced.

## Sequencing a large change correctly

The documented pattern for a major sharing-model change at LDV scale is: defer sharing calculation first, make the full set of structural changes (organization-wide defaults, groups, queues, sharing rules, role moves) without waiting for recalculation between each step, then resume sharing calculation so it runs once across the whole batch. One related detail worth planning for: automation that fires on insert or update (triggers, flows tied to record creation) should generally be allowed to resume running normally once the sharing setup itself is complete, so that validation and data enrichment continue to behave correctly in production once the maintenance window's structural work is done.

## Key terms

| Term | Meaning |
|---|---|
| Sharing recalculation | The platform's automatic recomputation of record-level access whenever role hierarchy, groups, sharing rules, territory hierarchy, user roles, teams, or ownership change |
| Deferred sharing calculation | A feature that lets an admin suspend sharing recalculation during a batch of structural changes, then resume it once so the cost is paid in bulk rather than per change |
| Maintenance window | The planned, bounded period during which deferred sharing calculation is typically used for a large structural change |

## Lab

An architect is planning a territory realignment for an org with 6 million Opportunity records under a private sharing model: new territories, new sharing rules, and a bulk role reassignment for 400 users, all happening the same weekend. Using this lesson's concepts, describe the order of operations you'd follow using deferred sharing calculation, and explain in your own words why doing the same realignment without deferring sharing calculation first would be far more expensive at this org's scale than it would be at a 5,000-record org.

## Check yourself

Can you name at least four distinct kinds of changes that can independently trigger an automatic sharing recalculation? Can you explain, in your own words, what deferred sharing calculation actually does and why it's treated as a bounded maintenance tool rather than a permanent setting?
