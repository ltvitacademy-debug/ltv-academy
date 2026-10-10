# Lesson 15 — Cutover

**Chapter 3 · Proving and Cutting Over · Lesson 15 of 18**

## What you'll learn

- What a freeze window is and why it has to be defined precisely
- How delta records created during the freeze get handled
- What a go/no-go checklist and a cutover runbook actually contain
- Why communication is a cutover deliverable, not an afterthought

## Cutover is where planning becomes an event

Everything in this course up to this lesson — scope, mapping, sequencing, rehearsal — has been preparation. **Cutover** is the actual event where the business stops using the legacy system and starts using the migrated target org as the live system of record. It's the highest-risk moment in the whole project specifically because it's live: unlike a rehearsal, there's no equivalent of quietly resetting a sandbox if something goes wrong, and it's happening while the business is, in some sense, holding its breath.

## The freeze window

A **freeze window** is a defined period, agreed in advance, during which the legacy system stops accepting new or changed data so that the final migration load is working against a stable, unmoving source. Without a freeze, the final extract is a snapshot of a system that keeps changing underneath it — meaning records created or edited after the extract was taken simply never make it into the migration at all. The freeze window's length is directly informed by Lesson 14's rehearsal timing: it has to be long enough to fit the actual load duration measured in rehearsal, with some margin, not an optimistic guess made before anyone actually timed it.

## Delta records: what happens during the freeze

Even with a freeze window defined, some amount of legacy-system activity during the freeze is common in practice — a support rep who didn't get the memo, an automated integration that's still technically running. Records created or changed during the freeze but after the main extract was taken are **delta records**, and the cutover plan has to say explicitly how they'll be handled: a planned delta/incremental load that runs after the main load specifically to catch anything created during the freeze window, or a hard rule that nothing entered during the freeze counts and has to be manually re-entered in the new system after go-live. Either answer can be correct for a given project — what's not acceptable is reaching cutover day without having decided which one applies.

## Go/no-go and the runbook

A **go/no-go checklist** is a short, specific, pre-agreed list of conditions that all have to be true before the cutover proceeds — reconciliation fully signed off with zero unresolved discrepancies (Lesson 13), the rehearsal's final dress run completed successfully with a known duration, the rollback plan from the next lesson ready and understood by whoever would execute it, and formal sign-off from the business stakeholders accountable for the data. The point of deciding this list in advance, not in the moment, is that cutover-day pressure is exactly when a team is most tempted to wave through a "probably fine" item that wouldn't have passed calm scrutiny a week earlier.

A **cutover runbook** is the step-by-step execution plan for the event itself: who does what, in what order, with what expected duration for each step, and who the designated decision-maker is if something doesn't go as planned. A runbook with named owners and specific timings turns cutover from "the team improvises together under pressure" into "the team executes a plan they already agreed to and rehearsed."

## Communication is part of the plan, not a courtesy

The business needs to know, in plain terms, when the freeze starts, when the new system actually becomes "live," and what (if anything) they need to do differently during the freeze window itself. This isn't a courtesy add-on to the technical plan — a freeze window the business doesn't actually observe (because nobody told the relevant team it applied to them) is a freeze window that didn't happen, no matter how carefully it was planned on paper.

## Key terms

| Term | Meaning |
|---|---|
| Cutover | The event where the business switches from the legacy system to the migrated target system as the live system of record |
| Freeze window | A defined period where the legacy system stops accepting changes so the final migration extract is stable |
| Delta record | A record created or changed during the freeze window, after the main extract was taken, requiring an explicit handling decision |
| Go/no-go checklist | A pre-agreed list of conditions that must all be true before cutover proceeds |
| Cutover runbook | The step-by-step execution plan for the cutover event, with owners, order, and timing |

## Lab

A company's rehearsal in a Full sandbox showed the final migration load takes 6 hours to run at production volume. The business wants the freeze window to be as short as possible, proposing a 4-hour freeze over a lunch break so operations are barely interrupted. As the architect, write your response: explain why the proposed window doesn't work given the rehearsal data, what you'd counter-propose instead, and how you'd handle any delta records if some freeze-window violation turns out to be unavoidable for this business.

## Check yourself

Can you explain why a freeze window's length has to come from actual rehearsal timing rather than an optimistic estimate? Can you name the two explicit options this lesson gives for handling delta records, and explain why deciding between them has to happen before cutover day, not during it?
