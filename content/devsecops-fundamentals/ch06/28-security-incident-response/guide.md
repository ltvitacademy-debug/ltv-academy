# Security Incident Response

Every control, scan, and audit log in this course exists to reduce risk — none of it reduces risk to zero. This lesson covers what happens when, despite all of it, something still gets through: a confirmed security incident. The framework here is NIST Special Publication 800-61, the widely used government standard for structuring an incident response program.

## What you'll learn

- The four phases of the NIST SP 800-61 incident response lifecycle
- What belongs in each phase, concretely, not just as a label
- Why the lifecycle is a loop, not a line, with Post-Incident Activity feeding back into Preparation
- How a suspected Northbridge Retail payment-data incident moves through all four phases

## The NIST SP 800-61 lifecycle

NIST SP 800-61 describes incident handling as four phases:

1. **Preparation** — everything done *before* an incident: defining what counts as an incident, deploying logging and monitoring (Lesson 26's audit trail is part of this), establishing a response team and communication plan, and rehearsing the plan before it's needed for real.
2. **Detection and Analysis** — recognizing that something anomalous is happening and determining whether it's actually a security incident, what's affected, and how severe it is. This is where audit logs, alerts, and scan findings get correlated into a single picture.
3. **Containment, Eradication, and Recovery** — stopping the incident from spreading (containment), removing the root cause (eradication), and restoring affected systems to normal operation (recovery). These three are grouped together because they often happen in overlapping, iterative steps rather than strictly in sequence.
4. **Post-Incident Activity** — after the dust settles: a retrospective (often called a "postmortem") that documents what happened, what worked, what didn't, and what changes should result.

## A loop, not a line

The lifecycle isn't a one-way path that ends at Post-Incident Activity. Its entire purpose is to feed back into Preparation: a lesson learned in one incident becomes a new monitoring rule, a new runbook step, or a new piece of training before the next incident happens. Treating Post-Incident Activity as optional paperwork — skipped because the fire's already out — throws away the one phase that makes every future incident cheaper to handle.

## Walking a Northbridge Retail incident through all four phases

**Preparation**: Northbridge Retail already has Azure Monitor audit logging (Lesson 26), a defined on-call rotation, and a written incident response plan naming who gets paged for a payment-data-related alert.

**Detection and Analysis**: An alert fires on unusual read volume against the payments database from a service identity that normally only writes. The on-call engineer correlates this against the Activity Log and confirms it's not a known deployment or batch job — it's anomalous, and because it touches payment data, it's classified as a high-severity incident immediately.

**Containment, Eradication, and Recovery**: The team disables the implicated service identity's credentials (containment), identifies that a leaked API key was the entry point and rotates it (eradication), and restores normal service using a freshly issued, scoped identity (recovery).

**Post-Incident Activity**: A retrospective documents how the key leaked, why detection took as long as it did, and produces two concrete changes: a secrets-scanning rule (Chapter 4) to catch that leak pattern earlier, and a new alert tuned to the exact anomalous-read pattern that was eventually noticed. Both feed directly back into Preparation for the next incident.

## Key terms

- **NIST SP 800-61** — the NIST Special Publication defining the standard incident response lifecycle used across this lesson
- **Preparation** — the phase covering everything done before an incident: monitoring, planning, team readiness
- **Containment, Eradication, and Recovery** — the combined phase of stopping the spread, removing the cause, and restoring normal operation
- **Post-Incident Activity** — the retrospective phase that turns an incident's lessons into concrete changes, feeding back into Preparation
