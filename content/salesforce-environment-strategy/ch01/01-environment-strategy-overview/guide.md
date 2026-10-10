# Lesson 1 — Environment Strategy Overview

**Chapter 1 · Environments · Lesson 1 of 14**

## What you'll learn

- Why a single Salesforce org eventually needs more than just "production"
- The core idea of an environment hierarchy and a promotion path
- The difference between a metadata-only environment and one that also carries data
- Why environment strategy is an architect-level decision, not just an admin task
- How this chapter's environment types connect to Chapter 2's ongoing management of them

## The problem a single org creates

A brand-new Salesforce org starts with exactly one place to work: production. For a while that's fine — a small team can build a new field or a new flow directly where everyone will eventually use it. That stops working the moment more than one person touches configuration at the same time, or the moment a change is risky enough that testing it live would hurt the business if it went wrong. A validation rule that's slightly too strict, a flow that fires on the wrong trigger, or an integration change that silently drops records are all mistakes that are cheap to make and fix in an isolated copy of the org, and expensive to make in the copy every user and every integration depends on.

**Environment strategy** is the architectural decision of how many separate copies of an org to maintain, what each one is for, and how work moves between them safely. It's a foundational decision for any org past a certain size, and it's one architects are expected to own and justify — not just "we have a sandbox," but a deliberate design matched to the team's size, release cadence, and risk tolerance.

## Environment hierarchy and the promotion path

Most Salesforce environment strategies follow some version of the same shape: work starts in a small, disposable environment, gets validated in progressively larger and more production-like environments, and only reaches production after it has survived every stage in between. This sequence — build, then test, then stage, then release — is the **promotion path**. Later chapters in this course will use a shape close to this one as the default:

```
Development  →  Testing  →  Staging  →  Production
(scratch org      (QA, integration     (final sign-off,     (the org everyone
 or sandbox)        testing)            release rehearsal)    actually uses)
```

Nothing in Salesforce forces an org onto exactly this path — a very small team might collapse testing and staging into one environment, and a very large org might run several parallel versions of this whole pipeline at once (covered in Lesson 14). But the underlying principle holds everywhere: **the environment closest to production should be the one that resembles production the most closely**, and nothing gets promoted to the next stage until it has been validated in the stage before it.

## Metadata-only vs. environments with real data

Not every environment in the hierarchy needs the same thing copied into it. Salesforce environments split along one important line:

- **Metadata-only environments** carry an org's configuration — objects, fields, page layouts, Flows, Apex, permission sets — with no real records. They're fast to create and cheap to maintain, and they're where most day-to-day building happens.
- **Environments with data** also carry some or all of production's actual records, because some kinds of testing are only meaningful against realistic data volumes and realistic data shapes — a report that's fast against 500 sample rows and painfully slow against 2 million real ones won't reveal that problem in a metadata-only copy.

This distinction drives a lot of what the rest of this chapter covers: which Salesforce sandbox type to use for which purpose (Lesson 3), when a disposable scratch org is a better fit than a sandbox (Lesson 4), and why staging and production-adjacent testing specifically need real data where early development doesn't.

## Why this is an architect decision

An admin can create a sandbox in a few clicks. Deciding *how many* environments an org should maintain, *who* gets access to each one, *how often* each one refreshes, and *how* work is promoted between them is a different kind of decision — one with real cost (storage, refresh time, license editions) and real risk (a Full sandbox carries all of production's data, so its access list carries real privacy exposure) on both sides. That's why environment strategy sits inside the architect's responsibilities: it has to balance development speed, testing quality, data risk, and license cost against each other, and get revisited as the org and team grow.

## Key terms

| Term | Meaning |
|---|---|
| Environment strategy | The architectural plan for how many Salesforce environments to maintain, what each is for, and how work promotes between them |
| Environment hierarchy | The ordered set of environments a change passes through, from first build to production |
| Promotion path | The specific sequence a change follows — e.g., development → testing → staging → production |
| Metadata-only environment | An environment that carries configuration (objects, fields, Flows, Apex) but no real records |

## Lab

A 12-person sales and service org currently has one sandbox that everyone — developers, admins, and QA — shares for everything: building, testing, and training. Write down, in your own words, three concrete problems this single-sandbox setup is likely to cause as the team grows (think about what happens when two people need the sandbox for different, conflicting purposes at the same time). You don't need to design the fix yet — later lessons in this chapter will give you the vocabulary to do that.

## Check yourself

Can you explain, without looking back at this lesson, what a promotion path is and why "the environment closest to production should resemble production the most closely" is a reasonable design principle? Can you state the difference between a metadata-only environment and one that carries real data, and give one testing scenario where only the second kind would actually catch a bug?
