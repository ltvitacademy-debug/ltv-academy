# Lesson 24 — Snowflake Governance Case Study

**Chapter 5 · Enterprise Governance · Lesson 24 of 25**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional scenario
- How RBAC, masking, tags, auditing, and sharing connect as one system, not five separate projects
- Why a governance gap usually isn't one dramatic failure, but several small omissions compounding quietly
- How the query from Lesson 17 could have caught this scenario in minutes, not months

## The scenario (fictional, illustrative)

**Cascade Health Analytics** is a fictional mid-sized healthcare analytics company — not a real organization, and nothing below describes an actual breach or company. During due diligence for an acquisition, the acquiring company's audit team asks a simple question: "who can currently query the `PATIENT_VISITS` table?" The answer nobody expected: `CONTRACTOR_JSMITH`, a role belonging to a contractor whose engagement ended six months earlier, could still run `SELECT * FROM PATIENT_VISITS` — including the unmasked `patient_name` and `diagnosis_code` columns. Nothing malicious happened, as far as anyone could tell. But nobody could prove that for certain, because nobody had been watching.

This is a realistic composite of the kind of quiet governance gap this course exists to prevent — not a single dramatic failure, but several small omissions compounding over six unmonitored months.

## Applying the course, chapter by chapter

**Chapter 1 (Snowflake Governance Foundations):** The root cause traces back to RBAC. The contractor's role was granted directly rather than through a time-bound, reviewable process (the role hierarchy and access-control-best-practices lessons both exist precisely to prevent this) — nobody owned the step of revoking it when the engagement ended.

**Chapter 2 (Data Protection):** `PATIENT_VISITS.patient_name` and `PATIENT_VISITS.diagnosis_code` had no masking policy applied. A dynamic data masking policy, scoped to roles outside a small `PHI_VIEWER` set, would have meant the contractor's lingering access showed masked values instead of real patient data, even with the stale grant still in place — a second layer of defense behind RBAC, not a replacement for fixing it.

**Chapter 3 (Tags and Classification):** Neither column carried a `PII` or `PHI` tag. A sensitive-data-discovery pass, tagging both columns, would have made this table surface automatically in any tag-based governance report — instead of depending on someone remembering, six months later, that this particular table held sensitive data.

**Chapter 4 (Auditing and Monitoring — this course's own chapter):** Nobody was running the Lesson 17-style `GRANTS_TO_USERS` audit, and nobody had a Lesson 19-style scheduled Task checking for stale privileged or PHI-adjacent access. The access was fully visible in `ACCOUNT_USAGE` the entire time — nobody was looking.

**Chapter 5 (Enterprise Governance):** Separately, the audit also found the company's analytics partner integration shared `PATIENT_VISITS` directly rather than through a secure view (Lesson 21) — meaning even a properly-offboarded internal access gap wouldn't have been the only exposure. The share needed re-scoping to a secure, masked view regardless of the contractor finding.

## The fix, and the one query that should have caught it sooner

The fix touches every chapter: revoke the stale grant and move contractor access to a time-bound role with an offboarding checklist step (Ch1), apply masking to both sensitive columns (Ch2), tag them `PHI` (Ch3), schedule a weekly Task auditing grants against departed contractors (Ch4), and re-scope the share to a secure view (Ch5). But the single query that would have surfaced this in minutes, on day one of the contractor's offboarding, is the one from Lesson 17:

```sql
SELECT grantee_name, role, granted_by, created_on
FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS
WHERE deleted_on IS NULL
  AND grantee_name = 'CONTRACTOR_JSMITH'
ORDER BY created_on DESC;
```

The tooling was never the gap. The habit of running it — on a schedule, as part of an offboarding process — was.

## This course's closing advice

A governance gap is rarely one dramatic failure. It's RBAC without a review cadence, protection controls without tags to find what needs them, and monitoring views that exist but nobody scheduled a query against. Every chapter of this course closes one of those gaps; none of them alone is sufficient.

## Lab

Pick one access grant from your own work or a hobby project — even a shared folder or an app permission, not necessarily Snowflake — that's been sitting unreviewed for longer than you'd like to admit. Sketch the Cascade Health Analytics fix applied to it: who should actually have access, how you'd know if anyone shouldn't, and what one scheduled check would catch it if it drifted again.

## Check yourself

Walk through the Cascade Health Analytics scenario from memory, chapter by chapter. For each chapter, can you name the specific control that was missing — and the one query or policy that would have closed that gap?
