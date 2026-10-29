# Lesson 31 — Case Study: A Zero Trust Rollout That Looked Complete on Paper

**Chapter 8 · Capstone: Designing and Defending an Enterprise Zero Trust Architecture · Lesson 31 of 32**

*This is an illustrative, fictional scenario built on the Meridian Health Partners design from
Lessons 29 and 30 — not a report of a real incident at a real organization. It's written to show a
pattern worth recognizing, not to name or imply any specific company.*

## What you'll learn

- How a zero trust rollout can pass its own maturity audit with a strong score, and still have a
  gap wide enough to breach through, because the gap was formally exempted rather than overlooked
- Why "vendor-managed, scheduled for decommission" is one of the most dangerous phrases in a
  security program, precisely because it sounds like a reasonable, temporary exception
- How to read an audit checklist for what it *excludes*, not just what it covers
- What Meridian should have done differently, and what one line in Lesson 29's own design already
  pointed toward the fix

## Eighteen months later

Meridian Health Partners executed the roadmap from Lesson 30. Eighteen months in, an independent
auditor reviews the program against the same CISA Zero Trust Maturity Model and scores it well:
Identity and Networks at Advanced, Applications & Workloads at Advanced, Devices at Advanced, Data
at Initial-moving-to-Advanced with enforcement rolling out on schedule. The audit report reads like
a success story, because in almost every real sense, it is one.

## The line in the audit scope that mattered

Buried in the audit's scope notes is a sentence that got almost no attention at the time:

```
Scope exclusion #4: ClaimFlow legacy SFTP batch export (claims-export.meridianhp.local)
is excluded from this assessment. Vendor has confirmed this integration is being replaced
by the API gateway integration (see Lesson 29) and is scheduled for decommission within
two quarters. Assessed separately once migration completes.
```

That exclusion was reasonable when it was written. ClaimFlow's new API-gateway integration —
scoped to `claims:submit`, with fifteen-minute workload identity tokens — was real, and it was
exactly the right design. But the *old* integration, a nightly SFTP batch job that had been pushing
claims data out of MediCore for six years, kept running in parallel during the migration window.
It used a single service account, `svc-claimflow-sftp`, with read access to the entire shared
folder structure the legacy EHR exported into — not just the claims files ClaimFlow was supposed to
see. Nobody re-scoped that account, because it was already on the list to be decommissioned, and
"it's going away soon anyway" is exactly the reasoning that makes an exemption feel safe to leave
alone.

## What actually happened

Two quarters came and went. The API migration, delayed by an unrelated billing-system upgrade, ran
four months late — a normal, unremarkable kind of project slip. The SFTP batch export kept running
the entire time, still excluded from the next audit cycle because it was still marked "scheduled
for decommission, assessed separately." A credential-stuffing campaign against ClaimFlow's own
corporate email eventually turned up a password that matched one reused on `svc-claimflow-sftp` —
a service account with no MFA, because service accounts authenticating over SFTP had never been
brought under the Conditional Access policy from Lesson 29 in the first place; that policy applied
to interactive sign-ins, and this was a scheduled, non-interactive job.

```
Timeline (illustrative)
Month 0   Audit scores the rollout well; SFTP export formally excluded, pending decommission
Month 4   API migration slips to month 8 due to an unrelated project
Month 9   Credential-stuffing hit on a reused password reaches svc-claimflow-sftp
Month 9   Attacker pulls the full shared-folder export -- far more than claims data --
          because the account's access was never scoped down to match what ClaimFlow
          actually needed
```

The account wasn't attacked because Meridian's zero trust program failed. It was never *inside*
the program to begin with — it was a documented, deliberate, time-boxed exception that outlived its
own timeline without anyone re-evaluating it.

## Why the checklist didn't catch it

A maturity audit checks what's in scope, by design. "Scope exclusion #4" wasn't a finding the
auditor missed — it was a line item everyone agreed to, and agreeing to it once was reasonable. The
actual gap is that nothing re-triggered a review when the decommission date slipped. An exemption
with a deadline and no automatic re-check is functionally an exemption with no deadline at all.

## What Meridian should have done differently

Two fixes, neither of which requires redesigning anything from Lessons 29 or 30:

```
1. Treat "temporarily excluded, pending decommission" as its own tracked risk item with
   an owner and an expiration date — not a footnote that disappears from the next audit's
   scope automatically.
2. Apply assume-breach containment (Lesson 29, Step 5-6) to excluded systems too. A blast-radius
   boundary around svc-claimflow-sftp -- scoped read access to only the claims export folder,
   not the entire shared structure -- would have limited the damage even with the account
   still outside the main identity fabric.
```

The second fix is the more important one: assume-breach design exists precisely for cases like
this, where a control everyone assumed would hold (MFA on an account, a decommission on schedule)
didn't. A system being out of scope for an audit should never mean it's out of scope for
containment.

## Key terms

| Term | Meaning |
|---|---|
| Scope exclusion | An item formally left out of an audit or assessment, usually with a stated reason and timeline |
| Standing access | A credential or integration with broad, persistent permissions that were never re-scoped to least privilege |
| Audit scope vs. security scope | What a checklist measures is not the same as what actually needs protecting — the gap between them is where this breach lived |
| Containment for excluded systems | Applying assume-breach blast-radius limits even to systems formally excluded from the main zero trust rollout |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why was "scope exclusion #4"
a reasonable decision the day it was written, and what should have happened automatically when the
decommission date it depended on slipped by four months?
