# Lesson 17 — Post-Migration Support

**Chapter 3 · Proving and Cutting Over · Lesson 17 of 18**

## What you'll learn

- What hypercare is and why it's a planned phase, not an improvised one
- How to triage "missing data" reports realistically
- What formally decommissioning the legacy system actually involves
- Why the project isn't done when the load finishes

## Cutover is an event; the days after are a phase

Lesson 15's cutover is a single event with a defined start and end. What follows it is a distinct phase that needs its own planning: the period immediately after go-live when the business is using the new system for real for the first time, and when any migration issue that rehearsal and reconciliation didn't catch is going to surface as a real user hitting a real problem. Treating this phase as an afterthought — "we'll just deal with whatever comes up" — undermines a huge amount of the careful planning that came before it.

## Hypercare

**Hypercare** is the name for this heightened-support period: a defined window (commonly a few days to a few weeks, scaled to the size and risk of the migration) during which the project keeps elevated monitoring and a dedicated, fast support channel specifically for migration-related issues, rather than routing everything through the business's normal, slower support process. The hypercare team typically includes people who actually understand the migration's design — the mapping decisions, the transformation rules, the scope boundaries — because diagnosing a real post-go-live issue usually means tracing it back to one of those specific decisions, not just generic Salesforce troubleshooting.

## Triaging "missing data" reports

The single most common hypercare issue is a user reporting that "my data is missing." The realistic, experienced response is to triage calmly rather than treat every report as evidence the migration failed: the large majority of these reports turn out to be a mapping or scope gap rather than genuine data loss — a field the user expected but that was deliberately out of scope (Lesson 4), a record that was correctly excluded by the agreed historical date cutoff, or data the user is looking for in the wrong place because a field was renamed or restructured during transformation (Lesson 7). A disciplined hypercare process checks the actual reconciliation report and mapping document first, for the specific object and field the user is asking about, before assuming the migration itself has a defect — because very often the answer is already documented, just not where the user looked.

## Decommissioning the legacy system

Hypercare has an end point, and reaching it successfully leads to a final, deliberate step: formally **decommissioning** the legacy system, or at minimum converting it to permanent, read-only archive access rather than letting it keep quietly running as a shadow system some users still half-rely on. This matters because a legacy system left live "just in case" tends to invite exactly the kind of informal, undocumented data entry that creates a new reconciliation gap months after everyone assumed the migration was finished. Before decommissioning, the project should confirm: no outstanding hypercare issues remain unresolved that depend on the legacy system being reachable, any files or records deliberately left out of scope (Lesson 10's archive-rather-than-migrate decision, for instance) have a documented, accessible home, and the business has formally signed off that decommissioning can proceed.

## The project isn't done at go-live

It's tempting to treat cutover as the finish line, since it's the dramatic, visible event everyone has been building toward. This lesson's point is that the real finish line is further out: a defined hypercare period runs its course, issues get triaged and resolved against the documented migration design rather than guessed at, and the legacy system is formally and deliberately retired — only then is the migration actually complete.

## Key terms

| Term | Meaning |
|---|---|
| Hypercare | A defined, heightened-support period immediately after cutover with elevated monitoring and a dedicated issue channel |
| Missing data triage | Investigating a user's "my data is missing" report against the mapping/scope documentation before assuming genuine data loss |
| Decommissioning | Formally retiring the legacy system, or converting it to read-only archive access, once hypercare and sign-off are complete |

## Lab

Three days into hypercare after a Salesforce go-live, a sales manager reports that "half of our old deals are just gone." Using this lesson's triage approach, list the three specific documents or facts you'd check first before concluding anything was actually lost, and describe at least two realistic, non-data-loss explanations this complaint could turn out to have.

## Check yourself

Can you explain what hypercare is and why it needs its own dedicated support channel rather than routing through the business's normal process? Can you name the three things this lesson says should be confirmed before formally decommissioning the legacy system?
