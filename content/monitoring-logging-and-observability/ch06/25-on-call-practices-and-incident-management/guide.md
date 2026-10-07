# On-Call Practices & Incident Management

Finding the cause of an outage is only half the job. Someone has to be reachable when it happens, someone has to decide how serious it is, and someone has to run the response so twelve people aren't all debugging in parallel with no one coordinating. This lesson covers the people-and-process side of incident response: rotations, escalation, severity, and who's actually in charge during the Northbridge checkout incident.

## What you'll learn

- How on-call rotations and escalation policies are structured
- Severity levels (SEV1–SEV4) and what each one actually changes about the response
- The incident commander role, and why it's separate from "the person fixing it"
- How status pages and stakeholder communication fit into an active incident

## On-call rotations and escalation policies

An **on-call rotation** assigns responsibility for responding to alerts to one person (or a small group) at a time, usually for a week, with the roster rotating through the team. The point isn't punishment — it's predictability: everyone knows whose phone is going to buzz, and nobody is paged for something outside their rotation.

An **escalation policy** defines what happens when the primary on-call doesn't acknowledge an alert within a set window (commonly 5 minutes): page the secondary, then the team lead, then a wider group. Escalation policies exist because people sleep through phones, lose signal, or are already heads-down on something else — the policy is what keeps a page from dying silently.

## Severity levels: SEV1 through SEV4

Not every alert deserves the same response. Most teams use a severity scale like this:

- **SEV1** — critical, widespread customer impact (checkout is down for everyone). Page immediately, all hands, incident commander required.
- **SEV2** — significant impact, but partial (checkout is slow for some users, or down in one region). Page on-call, commander likely assigned.
- **SEV3** — minor impact, workaround exists or impact is limited. Handled by on-call, no broad page.
- **SEV4** — no customer impact; internal-only issue or a near-miss worth tracking. No immediate response, logged for later review.

Severity determines three things immediately: who gets paged, whether a status page update goes out, and whether an incident commander is assigned. Getting severity right early matters more than getting it perfect — you can downgrade a SEV1 to a SEV2 once you understand impact better, but under-calling a real SEV1 as a SEV3 costs response time you can't get back.

## The incident commander role

For anything SEV1 or SEV2, one person is named **incident commander (IC)** — and critically, the IC's job is to coordinate, not to fix. The IC tracks who's investigating what, makes the call on severity changes, decides when to escalate further or bring in another team, and owns communication. This separation matters because the engineer closest to the problem is bad at also managing status updates, deciding who else to pull in, and keeping time — those are different cognitive tasks, and combining them with deep technical investigation slows both down.

During the Northbridge checkout incident, the IC is not the engineer digging through traces to find the inventory service's connection pool — that's the investigating engineer. The IC is tracking elapsed time, confirming the status page is updated, and deciding whether to pull in the inventory team directly or let the current investigation keep running a few more minutes.

## Status pages and stakeholder communication

For customer-visible incidents (SEV1/SEV2), a **status page** update goes out early — even "we're investigating elevated checkout latency" — because silence during a visible outage erodes trust faster than an honest "we don't know yet." Internally, the IC keeps stakeholders (support, leadership) updated on a cadence (every 15–30 minutes for a SEV1) so they aren't pinging the investigating engineers directly for updates.

## Key terms

- **On-call rotation** — scheduled responsibility for responding to pages, rotated across a team
- **Escalation policy** — defined steps for re-paging when an alert goes unacknowledged
- **Severity (SEV1–SEV4)** — a scale determining response intensity by customer impact
- **Incident commander (IC)** — the person coordinating the response, distinct from whoever is fixing the issue
- **Status page** — the external communication channel for customer-visible incidents
