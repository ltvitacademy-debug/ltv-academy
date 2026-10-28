# Lesson 28 — Preparing for a Cloud Security Audit

**Chapter 7 · Compliance in the Cloud · Lesson 28 of 32**

## What you'll learn

- Why gathering evidence continuously, rather than scrambling once an auditor asks, is the real
  difference between an easy audit and a painful one
- The three real categories of evidence auditors ask for: configuration exports, access logs, and
  written policy documents
- The most common real findings cloud teams actually get flagged for — stale access and missing
  logging chief among them
- How this chapter's tools turn into a head start, when you run them weeks before the real audit
  instead of during it

## Evidence gathered before the audit, not during it

An audit runs on a fixed clock — a **fieldwork window** during which an auditor reviews evidence
and tests whether your controls are actually operating the way you say they are. Teams that treat
evidence-gathering as a scramble the week fieldwork starts tend to produce inconsistent answers,
miss the audit period's exact date range, or discover a gap live, in front of the auditor. Teams
that keep evidence current continuously — as a byproduct of how they already operate, not a
special project — walk into fieldwork with almost nothing left to produce on demand.

## Three real categories of evidence

Nearly everything an auditor asks for falls into one of three buckets:

- **Configuration exports** — IAM policy JSON exports, Azure RBAC role assignment lists,
  encryption-at-rest settings, and the compliance reports Lesson 27's tools already generate
- **Access logs** — AWS CloudTrail event history, Azure Monitor / Activity Log entries, and
  sign-in logs showing exactly who accessed what and when, retained long enough to cover the
  entire audit period the auditor is reviewing
- **Policy documents** — the actual written security policy, incident response plan, and
  acceptable use policy that show your organization's day-to-day operations genuinely match what
  it claims on paper

## The most common real findings: stale access and missing logging

Two findings show up constantly in real cloud compliance audits. **Stale access** is a permission
that's still assigned after it's no longer needed — a departed employee's account never disabled,
or an IAM role granted admin rights for a one-time migration task and never revoked afterward. It's
one of the single most common findings an auditor writes up, precisely because nobody's job is to
notice access that's simply been forgotten about. **Missing logging** is the second: a resource
with logging disabled outright, or retention set shorter than the audit period, which leaves no
evidence trail at all for the exact window an auditor needs to review.

## Using this chapter's tools to get ahead of it

Run a Purview Compliance Manager assessment, assign the relevant Azure Policy regulatory
compliance initiative, kick off an AWS Audit Manager assessment, or deploy a Config conformance
pack weeks before fieldwork actually starts — not the week of. Each one surfaces exactly the kind
of gap described above: stale permissions an access review flags, logging that's disabled or
retained too briefly, encryption settings that drifted from policy. Finding those gaps on your own
schedule, with time to actually fix them, is the entire difference between a clean audit and a
list of findings with your name on it.

## Key terms

| Term | Meaning |
|---|---|
| Audit evidence | Documentation proving controls are in place and operating — configuration exports, access logs, and written policies |
| Stale access | Permissions that remain assigned to a user or service account after they are no longer needed — one of the most common real audit findings |
| Access log | A record of who accessed a resource and when, such as AWS CloudTrail or Azure Monitor / Activity Log |
| Audit fieldwork | The fixed window during which an auditor reviews evidence and tests whether controls are operating effectively |

## Check yourself

You're ready for Chapter 8 when you can explain, without looking: why is "stale access" one of the
most common findings in a real cloud compliance audit, even at organizations with strong technical
controls otherwise?
