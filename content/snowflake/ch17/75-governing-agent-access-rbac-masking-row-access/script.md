# Script — Governing Agent Access: RBAC, Masking & Row Access Policies for AI

## Segment 1 (title)

Everything in Chapter 9 — roles, GRANT, secure views, masking, row access policies — still applies to an agent, because an agent runs under a role like anyone else. But a role grants privileges uniformly to whoever is using it, and an agent using a human's role inherits every privilege that human has, even for the moments where that's not actually what you want. This lesson's tools let you narrow that down specifically for when an agent, not a person, is driving.

## Segment 2 (code: masking policy)

The only new piece in a masking policy is checking IS_AGENT_ACTIVATED first. Same role, different outcome — a human running as ANALYST sees the real email address, while the exact same role, driven by an agent, sees asterisks instead, because the policy itself checks who, or what, is actually asking.

## Segment 3 (code: row access policy)

A row access policy works the same way, and here it's a total lockout — an agent gets zero rows from this table no matter which role it's driving, a deliberate full block rather than a partial mask, while a human analyst still sees their own department's rows.

## Segment 4 (steps: defense in depth)

Restricted Session Scope adds a different control: a privilege ceiling that applies whenever an agent is active, configured on a session policy and attached to the account or specific users. It doesn't replace RBAC and can't grant anything a user doesn't already have — it only narrows. Put together, a real design layers four independent controls: RBAC as the baseline ceiling, Restricted Session Scope narrowing it further for agents, and masking plus row access policies hiding specific values and rows. No single layer has to be perfect — if one is misconfigured, the others still hold.

## Segment 5 (outro)

Last lesson of this course: a hands-on lab building a real Cortex Search and Cortex Analyst agent, and governing it with everything this chapter covered.
