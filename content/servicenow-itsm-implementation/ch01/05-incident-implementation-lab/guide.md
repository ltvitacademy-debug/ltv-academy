# Lesson 5 — Incident Implementation Lab

**Chapter 1 · Implementing Incident Management · Lesson 5 of 32**

## What you'll learn

- How to apply the state model, Priority Lookup Rule, Assignment Rules, and MIM
  decisions from Lessons 1-4 to one real implementation scenario
- How to confirm a state model is actually enforced, not just configured
- How to build a Priority Lookup Rule matrix for a real organization
- How to write an Assignment Rule condition for a specific category
- How to set a real, defensible Major Incident threshold

## The scenario

You've been brought in to implement Incident Management for a 500-person
manufacturing company standing up its first ServiceNow instance. The
service desk lead hands you four requirements. Work through each one the
way you would on a real project — the decision first, then the
configuration that enforces it.

## Requirement 1 — confirm the state model is enforced, not just configured

The service desk lead's complaint from their old tool: "agents close
tickets with nothing written down about what fixed them." That's the exact
failure Lesson 1 covered. The fix is not a new field — Resolution Code and
Close Notes already exist on `incident` out of the box. The fix is a
**Data Policy** with the condition `state = Resolved` that makes both
fields mandatory at that point, plus confirming the state transition from
New directly to Closed is blocked so every incident is forced through
Resolved first. Verification step: as a test, try to move a test incident
from New straight to Closed, and confirm the platform refuses it; then try
to move it to Resolved with Resolution Code blank, and confirm that's
refused too. If either succeeds, the model isn't actually enforced yet.

## Requirement 2 — build the Priority Lookup Rule matrix

The lead also wants Priority calculated, not hand-picked, so two agents
looking at the same situation never land on different Priorities. Before
touching `priority_lookup_rule`, you confirm with the business what
Impact 1/2/3 and Urgency 1/2/3 actually mean for them — Impact 1 is
"affects the whole plant floor," not just "feels urgent to the caller" —
then populate the 3x3 grid so Priority 1 (Critical) only results from
Impact 1 + Urgency 1, not from any combination that happens to include a
3. Manual override stays available to agents, but every override gets
logged, exactly as Lesson 2 recommended, so it can be reviewed rather than
silently drifting from the calculated value.

## Requirement 3 — route Network incidents automatically

Incidents in the Network category have been sitting unassigned for hours
at a time under the old process. You implement a Flow Designer flow with
an **Incident Created** trigger, a condition checking `category = Network`,
and an action setting Assignment Group to **Network Operations** — the
same pattern Lesson 3 covered. Because Network Operations has six agents
and you don't want the first alphabetical name absorbing every ticket, you
configure the group's assignment to use **round robin**, so each new
Network incident lands with the next agent in rotation rather than
whoever's name sorts first.

## Requirement 4 — set the Major Incident threshold

Finally, the lead asks when an incident should become a Major Incident.
Following Lesson 4, you don't tie this to Priority alone — a single
Priority 1 affecting one executive's laptop shouldn't trigger a war room.
Instead you set the threshold as **Priority 1 AND affecting more than 50
users**, configured as the condition that flags `major_incident_state` to
**Candidate**. A major incident manager still makes the actual **Declared**
call by hand — the threshold surfaces it for review, it doesn't auto-declare
— and every Declared Major Incident now carries the requirement for a
post-incident review once resolved.

## Key terms

| Term | Meaning |
|---|---|
| Data Policy verification | Actually testing that a required-field rule refuses a bad transition, not just assuming the configuration works |
| Priority Lookup Rule matrix | The populated 3x3 grid mapping this business's real Impact/Urgency definitions to Priority |
| Round robin assignment | Rotating individual assignment within a group so one agent doesn't absorb every routed ticket |
| Major Incident threshold | A defined, multi-factor condition (here: Priority 1 AND >50 users) that flags Candidate, not Declared |

## Check yourself

Before moving to Chapter 2, make sure you can answer all four without
notes: what two tests would you run to prove the state model is actually
enforced; what must be confirmed with the business before populating the
Priority Lookup Rule matrix; why round robin instead of a fixed Assigned
To for Network Operations; and why this scenario's Major Incident
threshold combines Priority with a user count instead of using Priority
alone.
