# Lesson 9 — Presenting the Cutover Plan

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 9 of 10**

## What you'll learn

- Why a cutover plan is a different document from the runbook, aimed at a different question
- The four things Priya actually needs to hear before approving go-live
- How to structure the conversation so the headline comes first, not buried at the end
- What "rollback" means for this specific migration, concretely, not just as a safety word

## A cutover plan answers a different question

Lesson 8's runbook answers "how does this work, and how do I operate it." The cutover plan
answers a narrower, more urgent question: "when do we switch, and what happens if it goes
wrong." Priya doesn't need the resource inventory table in this conversation — she needs to
decide whether to approve the switch, which means she needs four things, in order.

## The four things Priya needs to hear

1. **What's actually ready**: the end-to-end checklist from Lesson 7 has passed — images,
   application pages, and the alert rule have all been proven to work, not just configured.
2. **The cutover mechanism**: how traffic actually moves from the on-prem server to Azure.
   For this project, that means updating the DNS record customers' browsers resolve to catalog
   point at `vm-catalog01`'s address instead of the on-prem server's, with a short TTL set in
   advance so the change propagates quickly rather than sitting cached on some fraction of
   visitors' devices for hours.
3. **The rollback trigger**: a concrete, pre-agreed condition for reverting — for example, if
   the catalog homepage returns errors for more than five minutes after cutover, or if the CPU
   alert fires and doesn't resolve within fifteen minutes, DNS gets pointed back at the on-prem
   server immediately, no debate needed in the moment. Deciding this now, calmly, is the entire
   point — nobody should be inventing a rollback threshold while customers are already seeing
   errors.
4. **Who's doing what, and when**: the actual go-live time (ideally outside peak traffic hours),
   who's watching the dashboards during the cutover window, and how Priya gets notified once
   it's confirmed stable.

## Structuring the conversation: headline first

> *"The migration is tested and ready. I want to cut over this Thursday at 7 a.m., before our
> traffic picks up. If anything looks wrong in the first 15 minutes, I'll roll DNS back
> immediately — here's exactly what 'wrong' means. I'll be watching the dashboards myself during
> that window, and I'll confirm with you once it's stable."*

That's the headline — stated in the first thirty seconds, not built up to after ten minutes of
background. Priya can ask follow-up questions about anything underneath it, but she should never
have to wait to hear the actual ask: approve this plan, for this date, with this rollback trigger.

## Handling the honest gaps

If Priya asks about something genuinely out of scope — say, what happens if Azure itself has an
outage during the cutover window — the honest answer is to say so plainly: that's a real
scenario this Beginner project's scope doesn't cover, and it's worth flagging as a question for
later, not something to improvise an answer to on the spot. A stakeholder trusts a "that's out of
scope, here's why" far more than a confident-sounding guess.

## Key terms

| Term | Meaning |
|---|---|
| Cutover plan | A short plan answering when to switch and what happens if it goes wrong, distinct from a runbook |
| DNS TTL (time-to-live) | How long a DNS record is cached before clients re-check it; shortening it speeds up cutover propagation |
| Rollback trigger | A specific, pre-agreed condition that automatically starts a revert, decided before go-live, not during it |
| Headline-first communication | Stating the actual decision or ask immediately, with supporting detail available on request |

## Lab

Write your own cutover plan for Driftwood's migration covering the four points above: readiness,
mechanism, rollback trigger, and who's doing what. Practice saying the headline sentence out
loud in under thirty seconds before explaining any of the detail underneath it.

## Check yourself

You're ready for Lesson 10 when you can explain, from memory, why the rollback trigger needs to
be agreed on before cutover rather than decided in the moment, and why a cutover plan is a
different document from the Lesson 8 runbook.
