# Defect Management and Issue Logs

SIT and UAT have surfaced real problems — the partial-payment matching failure, the foreign-currency wire scenario. This lesson covers how those get tracked, triaged, and closed systematically, instead of living as scattered emails and Slack messages nobody can find three weeks later.

## What you'll learn

- The standard fields on a defect log entry
- How severity differs from priority, and why both matter
- The defect life cycle from discovery to closure
- How Brightfield triaged its partial-payment defect

## Fields on a defect log entry

A defect log entry typically captures: a unique **defect ID**, a clear **description** of what went wrong, **steps to reproduce** (so anyone can recreate the problem, not just the person who found it), the **environment** and **module** where it occurred, which **test script** it was found during, a **severity** and **priority** rating, who it's **assigned to**, and its current **status**.

## Severity versus priority

**Severity** describes technical impact: how badly does this break the system, independent of timing (a transaction that posts to the wrong account is more severe than a cosmetic label issue). **Priority** describes how urgently it needs fixing relative to the project's schedule and other open items — a low-severity issue can still be high priority if it's blocking testing of several other scripts, and a high-severity issue found far from go-live might get a lower priority than one found two days before cutover. Oracle's own Service Request severities (used later in Chapter 5 for production support) are a useful mental model: Severity 1 for something that stops critical work entirely, down to lower severities for inconveniences with a workaround — the same proportional thinking applies to internal project defects.

## The defect life cycle

A defect typically moves through a consistent set of statuses: **New** (just logged) → **Assigned** (a developer or consultant is accountable) → **In Progress** (actively being fixed) → **Fixed** (a fix has been applied, usually in a lower environment) → **Retest** (the original tester — or the same business user, for a UAT defect — confirms the fix actually works) → **Closed** (confirmed resolved). A **triage meeting**, usually daily or every few days during active testing, reviews new and unresolved defects as a group to assign severity/priority and an owner, rather than leaving each one to be handled ad hoc.

## Brightfield Industrial Group: triaging the partial-payment defect

Brightfield's partial-payment reconciliation failure from Lesson 17 enters the defect log as **DEF-CM-04**: description, "partial payment against an invoice does not auto-match in reconciliation"; steps to reproduce, the exact SIT scenario; severity, High (it affects a routine transaction type, not an edge case); priority, Critical (it must be fixed before UAT, since the Treasury Manager will certainly encounter partial payments). At the next daily triage meeting, it's assigned to the Technical Consultant, who adjusts the reconciliation matching rule's tolerance logic; the fix moves through Fixed, then Retest (confirmed working in the earlier Lesson 18 UAT retest), then Closed.

## Key terms

| Term | Meaning |
|---|---|
| Severity | The technical impact of a defect, independent of timing |
| Priority | How urgently a defect needs fixing relative to project schedule |
| Defect life cycle | New -> Assigned -> In Progress -> Fixed -> Retest -> Closed |
| Triage meeting | A recurring session to assign severity, priority, and ownership to open defects |

## Recap

A defect log gives every problem a traceable ID, a clear description, a severity and priority, and a life cycle ending in a retested closure — reviewed regularly through triage meetings rather than ad hoc. Brightfield's partial-payment defect moved cleanly from discovery through a confirmed fix using exactly this process. Next up, lesson 20: regression testing, which exists because this whole testing discipline doesn't stop at go-live.
