# Production Support and Service Requests

Hypercare ended. Brightfield's implementation team steps back, and steady-state support takes over for the rest of the system's life. This lesson covers that ongoing support model — including the one escalation path unique to Oracle Cloud: the Service Request filed directly with Oracle through My Oracle Support.

## What you'll learn

- The typical tiered support model that replaces hypercare
- When an issue needs to become an Oracle Service Request (SR) rather than an internal fix
- Oracle's SR severity levels and what they actually mean for response expectations
- How Brightfield's support model and its first real SR played out

## The tiered support model

Steady-state support is typically organized in tiers: **Tier 1** is an internal help desk or the super users from Lesson 2, handling how-to questions and simple navigation issues; **Tier 2** is internal functional or technical staff (sometimes the same consultants from implementation, now on an ongoing support contract, sometimes a dedicated internal team trained during knowledge transfer) who can resolve configuration-level issues; **Tier 3** is Oracle itself, reached through a **Service Request** when an issue appears to be a genuine product defect or something only Oracle can diagnose or fix.

## When to open a Service Request

A Service Request is appropriate once Tier 1 and Tier 2 have ruled out a configuration or user-error explanation and the issue looks like a product defect, an unexpected system behavior, or something requiring Oracle's direct intervention (such as certain data corrections only Oracle can perform). Opening an SR too early, before basic triage, wastes both the support team's time and Oracle's; opening one too late, after spending days trying to fix something only Oracle can actually resolve, delays the business unnecessarily.

## Oracle's Service Request severity levels

Oracle defines SR severity based on business impact: **Severity 1** — production use is stopped or so severely impacted that work cannot reasonably continue; Oracle works the issue 24x7 with an initial response target measured in minutes, not hours. **Severity 2** — a severe loss of service with no acceptable workaround, though operations can continue in a restricted fashion. **Severity 3** — a minor loss of service, an inconvenience that may need a workaround. (A fourth, lower severity is commonly used for general questions or enhancement requests with no urgency at all.) Matching the right severity to an issue matters — overstating it doesn't actually speed up a non-critical fix, and understating a genuinely critical issue delays the response it needs.

## Brightfield Industrial Group: steady-state support, post-hypercare

After hypercare, Brightfield staffs Tier 1 with its trained super users, Tier 2 with two internal staff who went through knowledge transfer with the implementation team (Lesson 25 covers exactly how that handoff worked), and escalates to Oracle only when needed. Three months post-go-live, a Cash Management reconciliation report produces an unexplained rounding discrepancy that Tier 2 can't trace to any configuration setting. It's logged as a **Severity 3** Service Request — a minor loss of service with a workaround (manual adjustment) available — and Oracle traces it to a known issue, resolved in the following quarterly update.

## Key terms

| Term | Meaning |
|---|---|
| Tier 1 / Tier 2 / Tier 3 support | Internal help desk, internal functional/technical staff, and Oracle itself |
| Service Request (SR) | A formal support case filed with Oracle through My Oracle Support |
| Severity 1 / 2 / 3 | Oracle's business-impact-based classification driving response urgency |

## Recap

Steady-state support runs on a tiered model, escalating to an Oracle Service Request only once internal tiers have ruled out configuration or user error, with Oracle's own severity levels setting response urgency based on actual business impact. Brightfield's rounding discrepancy moved cleanly through that tiered model to a correctly-severitied SR and a resolved fix. Next up, the final lesson: training, documentation, and the knowledge transfer that made this handoff possible in the first place.
