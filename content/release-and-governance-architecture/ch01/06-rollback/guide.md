# Lesson 6 — Rollback

**Chapter 1 · Release and Governance · Lesson 6 of 16**

## What you'll learn

- Why "rollback" means something different and harder on Salesforce than on many other platforms
- The difference between rolling back metadata and rolling back data
- Why a rollback plan has to be written before a deployment, not improvised during an incident
- Practical alternatives to a true rollback when one isn't realistic (forward fix, feature toggling, partial disablement)
- Why every change request reviewed by a CAB should have to answer "what's the rollback plan" before approval

## Rollback is harder on Salesforce than it sounds

On many platforms, "rollback" means redeploying the previous version of an artifact and you're back to where you started. On Salesforce, that's often not true, for two separate reasons. First, **metadata rollback** isn't always clean: redeploying an old version of a Flow, an object, or a set of fields can fail outright if anything built on top of the new version in the meantime (a new field referenced by a new validation rule, a new record type users have already started using), and Salesforce's own deployment tooling doesn't automatically generate a "previous version" package for you — the previous version has to have been retrieved and retained before the risky deployment, specifically so it's available if needed. Second, and more seriously, **data changes usually cannot be rolled back by redeploying metadata at all**. If a newly deployed Flow updated or deleted records before anyone noticed something was wrong, restoring the old Flow version does nothing to restore the records it already changed — that requires a separate data-recovery path entirely.

## Metadata rollback vs. data rollback

A release strategy has to treat these as genuinely separate problems:

- **Metadata rollback** means reverting the configuration itself — the field definitions, Flow versions, Apex classes, validation rules — back to their pre-deployment state. This is why retaining a retrievable copy of the prior metadata state before any significant deployment is standard practice: without it, "rolling back" means trying to manually reconstruct what was there before, under time pressure, which is a bad position to be in.
- **Data rollback** means undoing changes already made to actual records. This depends entirely on what backup or recovery capability exists — a recent full or partial data backup, Salesforce's own data recovery options where applicable, or in the worst case, no real path back at all if the only copy of the prior state was the production data itself and it's already been overwritten. This is exactly why Lesson 16's risk assessment has to weigh, for any change that touches existing data, what the actual data-recovery path is before the change ships — not after something goes wrong.

## A rollback plan has to exist before deployment, not during an incident

The single most important discipline this lesson teaches is timing: a rollback plan is something you write and verify *before* a change is approved and deployed, as part of what the CAB reviews in Lesson 5 — not something you improvise while an incident is actively happening. Writing it in advance forces honest answers to hard questions: is there actually a clean path back for this specific change, or not? If there isn't, is the team deploying anyway with eyes open to that risk, with compensating controls (extra monitoring, a narrow deployment window, a readiness to forward-fix quickly), or should the change be redesigned to be safely reversible in the first place?

## When a true rollback isn't realistic: alternatives

Because a clean rollback isn't always available, mature release practice keeps a few alternatives in the toolkit:

- **Forward fix.** Instead of reverting, ship a new, small, fast change that corrects the specific problem. This is often faster and safer than a rollback once other changes have already built on top of the risky one.
- **Feature toggling / partial disablement.** For a declarative change, this can mean deactivating a specific Flow, removing a permission set assignment, or turning off a validation rule — disabling the new behavior without undoing every other change bundled in the same release. This depends on the change having been built in a way that supports being switched off independently, which is itself a design consideration worth planning for up front.
- **Scoped reversal.** Rolling back only the specific component that's causing the problem, rather than the entire release, when the release bundled multiple unrelated changes together — another argument, alongside the risk-tiering from Lesson 1, for keeping releases reasonably small and modular rather than one giant batch.

## Key terms

| Term | Meaning |
|---|---|
| Metadata rollback | Reverting configuration (fields, Flows, Apex, validation rules) back to its pre-deployment state |
| Data rollback | Undoing changes already made to actual records, dependent entirely on available backup/recovery capability |
| Forward fix | Shipping a new, small corrective change instead of reverting, often safer once other work has built on top of the risky change |
| Feature toggling | Disabling a specific piece of new behavior (a Flow, a permission) without reverting an entire release |

## Lab

A newly deployed Flow on the Opportunity object has been running for six hours and is discovered to be silently overwriting a field it shouldn't touch on every Opportunity it processes. Write a short incident-response outline: what's the immediate action (stopping further damage), what's the realistic rollback story for the Flow itself versus the already-affected records, and which of this lesson's alternatives (forward fix, toggling, scoped reversal) would you reach for first and why.

## Check yourself

Can you explain why a metadata rollback and a data rollback are genuinely separate problems on Salesforce? Can you explain why a rollback plan needs to be written and reviewed before deployment rather than improvised during an incident? Can you name at least two alternatives to a true rollback and describe when each one is the better choice?
