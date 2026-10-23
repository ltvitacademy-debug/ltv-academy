# Lesson 10 — Standard, Normal & Emergency Changes

**Chapter 3 · Implementing Change Enablement · Lesson 10 of 32**

## What you'll learn

- How the three change types from ITSM Foundations map onto the real `type` field on `change_request`
- Why Standard changes need no individual approval, while Normal changes do
- The real role a Change Template plays in making Standard changes pre-authorized
- Why Emergency changes get an expedited, but still real, authorization path
- How to recognize which type a given change should be, as an implementer, not just a definition to recite

## Three types, one table

ITSM Foundations' Change Enablement lesson taught you the ITIL concepts: a **Standard** change is pre-authorized and repeatable, a **Normal** change needs individual assessment and authorization before it can proceed, and an **Emergency** change is one that can't wait for the normal process because something is actively broken or about to break. System Administration's admin-level change lesson showed you where those three types live on the platform: the `type` field on `change_request`, set to **Standard**, **Normal**, or **Emergency**. This chapter goes one level deeper than either of those — not what the types mean, and not where the field is, but what distinct workflow path each one actually triggers once a real change record is created.

## Standard changes: pre-authorized means no individual approval step

The defining implementation fact about a Standard change is this: because the change itself was already reviewed and authorized once, when the *type of change* was approved, it does not need individual approval every time an instance of it runs. In a correctly implemented instance, a Standard change is created from a **Change Template** — a pre-built, pre-approved record (in `std_change_producer_version` and its underlying template) that already specifies the implementation plan, the risk, the affected CI, and the approvals that already happened at template-authorization time. Create a change from that template, and the change can move straight toward **Scheduled** and **Implement** with no additional approval record generated, because asking a human to re-approve a routine, repeatable action every single time it occurs would make Standard changes pointless — the whole value of the category is that the authorization work happened once, up front, for the template.

## Normal changes: the real path needs assessment first

A Normal change is the opposite case: nobody has pre-approved this exact change before, so the record has to be assessed and routed through real approval before implementation. That's the subject of the next three lessons — Lesson 11 covers how risk actually gets assessed and calculated (not guessed), and Lesson 12 covers how the approval workflow that risk feeds into is actually built in Flow Designer. For now, the implementation fact to hold onto is simpler: a Normal change's `type` field is what tells the platform "do not let this skip approval — route it."

## Emergency changes: expedited, not unauthorized

An Emergency change exists for the case ITSM Foundations described as "can't wait" — a production outage, a security incident, something actively breaking. The implementation mistake to avoid is treating "emergency" as "skip authorization." A well-implemented instance still requires real authorization for an Emergency change — it just expedites *who* has to grant it. Instead of routing to the full Normal-change approval chain (manager, and potentially full CAB review per Lesson 13), an Emergency change typically needs sign-off from only one or two senior approvers — often a change manager or a designated emergency-approval role — reflecting that there isn't time to convene a board, but there is still a real person accountable for authorizing the risk. The record still exists, the approval still happened, and it's still auditable after the fact — it's the speed of the path that changed, not whether authorization is real.

## Choosing the right type, as the implementer

When you're configuring Change Enablement, the practical question for any given class of change is: has this exact action been pre-approved as a repeatable template (Standard), does it need case-by-case assessment because every instance is different (Normal), or is it urgent enough that the assessment has to happen fast, with fewer people, but not zero people (Emergency)? Getting this wrong in either direction causes real problems — forcing routine, safe changes through full Normal approval buries your approvers in low-value work, while letting changes that actually need individual risk assessment slip through as "Standard" is how unreviewed risk gets into production.

## Key terms

| Term | Meaning |
|---|---|
| `type` field | The field on `change_request` holding Standard, Normal, or Emergency |
| Change Template | A pre-approved, reusable definition a Standard change is created from, skipping individual approval |
| Normal change | A change requiring case-by-case risk assessment and approval before implementation |
| Emergency change | An urgent change requiring real but expedited authorization, typically from one or two senior approvers |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why doesn't a Standard change need an individual approval record each time it runs, and what's the real difference between "Emergency" and "unauthorized"?
