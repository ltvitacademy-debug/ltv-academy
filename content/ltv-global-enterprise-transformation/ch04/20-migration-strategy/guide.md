# Lesson 20 — Migration Strategy

**Chapter 4 · Delivery Strategy · Lesson 20 of 33**

## What you'll learn

- Why LTV Global migrates in phased waves by region and business unit, rather than all at once
- The specific EuroCRM migration sequence, and how a parallel-run period protects the Field Service team
- How APAC's lighter legacy footprint changes its migration order relative to EMEA and North America
- Why the migration strategy directly resolves Risk #5 from the Chapter 1 risk register

## Why "all at once" is not a real option here

A single, all-at-once cutover across three regions, four business units, EuroCRM retirement, and thousands of dealers and millions of end customers moving onto a new portal simultaneously would concentrate every possible failure mode into one weekend, with no way to isolate which change caused which problem if something went wrong. LTV Global instead migrates in **phased waves**, sequenced by where the risk and the legacy debt actually are, not by an arbitrary region order.

## The wave sequence

- **Wave 1 — EMEA, EuroCRM retirement.** EMEA goes first specifically because EuroCRM (Lesson 4) is the one legacy system this transformation is explicitly retiring, and the Field Service Director (Lesson 3) is the stakeholder most exposed to migration risk. Doing the hardest, most disruption-sensitive migration first — while the team's attention and contingency budget are freshest — is a deliberate sequencing choice, not a default.
- **Wave 2 — North America, legacy point solutions and process consolidation.** NA has no single system as disruptive to retire as EuroCRM, but has the most accumulated process variation and the largest user base (headquarters), so this wave focuses on consolidating fragmented point solutions and spreadsheet-based processes into the new platform.
- **Wave 3 — APAC, lighter-footprint rollout.** APAC is LTV Global's newest and fastest-growing region with the least legacy debt (Lesson 4) — there's comparatively little to migrate away from, so this wave is closer to a clean rollout than a true migration, and goes last partly because the earlier waves' lessons learned directly improve how APAC's rollout is run.

## The EuroCRM parallel-run period

EuroCRM's retirement specifically uses a **parallel-run period**: for a defined window, EMEA Field Service technicians continue operating in EuroCRM while the equivalent Salesforce Service Cloud functionality runs alongside it, with data kept in sync between the two rather than cutting over in one step. This directly resolves Risk #5 from Lesson 6 — the danger of EuroCRM's cutover disrupting EMEA field service — by giving the team a safety net: if the new Salesforce-based process reveals a gap during the parallel period, technicians can keep relying on EuroCRM while the gap gets fixed, instead of a hard cutover leaving them with no fallback. EuroCRM is only formally decommissioned once the parallel-run period has demonstrated the new process handles real EMEA field service work correctly, not on a fixed calendar date alone.

## Data migration specifics

EuroCRM's service-history and contact data — the data Lesson 4 noted exists nowhere else in the landscape — is migrated in a dedicated data-migration workstream distinct from the application cutover: extracted, cleansed, mapped onto the Service Contract and Case data model from Lesson 9, and loaded before the parallel-run period begins, so technicians using the new system during parallel-run see real historical context rather than empty records.

## Why sequencing by risk, not by convenience, matters

It would be organizationally simpler to migrate regions in alphabetical order, or by whichever region's leadership asks first. LTV Global's sequencing — hardest and most disruption-sensitive migration first, lightest-footprint rollout last — is deliberately the opposite of convenience-driven ordering, because it puts the team's freshest attention and most available contingency budget against the highest-risk wave, rather than saving the hardest problem for when the team is already tired from two earlier waves.

## Key terms

| Term | Meaning |
|---|---|
| Phased migration wave | A sequenced, time-boxed group of systems/regions migrated together, rather than all at once |
| Parallel-run period | A window where old and new systems both operate, kept in sync, before the old system is retired |
| Cutover | The point at which users fully switch from the old system to the new one |
| Decommission | Formally retiring a legacy system once it's no longer needed |

## Lab

EMEA's Field Service Director asks why their region has to go first, given that it's also the most disruption-sensitive migration. Using this lesson's reasoning (not a generic "we had to start somewhere" answer), write three or four sentences explaining the actual logic behind sequencing the hardest migration first, and what specific safety net (named in this lesson) protects their team during it.

## Check yourself

Can you name LTV Global's three migration waves in order and state the specific reason each one is sequenced where it is? Can you explain exactly how the EuroCRM parallel-run period resolves Risk #5 from the Chapter 1 risk register, rather than just describing what a parallel run is in general?
