# Lesson 75 — Governing Agent Access: RBAC, Masking & Row Access Policies for AI

**Chapter 17 · AI Governance, Evaluation & Security · Lesson 75 of 76**

## What you'll learn

- Why RBAC alone isn't a tight enough ceiling for what an agent can do
- How to write a masking policy and a row access policy that react
  specifically to `IS_AGENT_ACTIVATED`
- What Restricted Session Scope (RSS) adds on top of RBAC
- How to layer RBAC + RSS + masking + row access into one defense-in-depth
  design for agent access

## RBAC was built for people, not for agents that chain hundreds of calls

Everything in Chapter 9 — roles, GRANT, secure views, masking, row access
policies — still applies to an agent, because an agent runs under a role
like anyone else. But a role grants privileges uniformly to *whoever* is
using it, and an agent using a human's role inherits every privilege that
human has, even for the 1% of queries where that's not actually what you
want. The tools in this lesson let you narrow that down specifically for
the moments an agent, not a person, is driving.

## Masking that reacts to an agent being active

You already know `CREATE MASKING POLICY` from Chapter 9. The only new
piece is the condition:

```sql
CREATE OR REPLACE MASKING POLICY email_agent_mask AS (val STRING) RETURNS STRING ->
  CASE
    WHEN SYS_CONTEXT('SNOWFLAKE$CURRENT', 'IS_AGENT_ACTIVATED')::BOOLEAN = TRUE THEN '********'
    WHEN CURRENT_ROLE() IN ('ANALYST') THEN val
    ELSE '********'
  END;
```

A human running as `ANALYST` sees the real email address. The exact same
role, driven by an agent, sees `********` instead — same privileges on
paper, different outcome at query time, because the policy itself checks
who (or what) is actually asking.

## Row access policies work the same way

```sql
CREATE OR REPLACE ROW ACCESS POLICY rap_agent AS (dept VARCHAR) RETURNS BOOLEAN ->
  CASE
    WHEN SYS_CONTEXT('SNOWFLAKE$CURRENT', 'IS_AGENT_ACTIVATED')::BOOLEAN = TRUE THEN FALSE
    WHEN CURRENT_ROLE() = 'ANALYST' THEN TRUE
    ELSE FALSE
  END;
```

Here, an agent gets zero rows from this table no matter what role it's
running under — a deliberate, total lockout, rather than a partial mask.
The same `IS_AGENT_ACTIVATED` check from Lesson 73 that showed up as a
read-only column in `QUERY_HISTORY` is now an active ingredient in a
policy that changes what actually comes back.

## Restricted Session Scope: a privilege ceiling, not a replacement for RBAC

**Restricted Session Scope (RSS)** adds a different kind of control: a
privilege *ceiling* that applies whenever an agent is active for users
covered by the session policy. It doesn't replace RBAC and can't grant
anything a user doesn't already have through their own roles — it only
*narrows*. Configuration: set `AGENT_RESTRICTED_SESSION_SCOPE` on a
session policy, then attach that policy to the account or to specific
users. The practical effect: even if a user's role could technically
touch ten schemas, an RSS can restrict what an *agent* acting for that
user is allowed to touch to a named subset — without rewriting the
user's whole role hierarchy to do it.

## Defense in depth, specifically for agents

Put together, a production-grade agent access design layers four
independent controls:

| Layer | What it restricts | From |
|---|---|---|
| RBAC (roles + GRANT) | Baseline privileges — the starting ceiling | Chapter 9 |
| Restricted Session Scope | Narrows that ceiling further, only when an agent is active | This lesson |
| Dynamic Data Masking | Hides specific column values from agent-driven queries | Chapter 9 + `IS_AGENT_ACTIVATED` |
| Row Access Policy | Hides specific rows from agent-driven queries | Chapter 9 + `IS_AGENT_ACTIVATED` |

No single layer has to be perfect — that's the point of defense in depth.
If an RSS policy is misconfigured, the row access policy is still there
as a backstop. If a masking policy has a typo, RBAC still caps the blast
radius. This is also precisely the backstop referenced in Lesson 74's
approval-gate pattern: even a broken application-layer approval check
doesn't hand an agent more than these four layers allow.

## Key terms

| Term | Meaning |
|---|---|
| `IS_AGENT_ACTIVATED` in a policy | Lets a masking or row access policy change behavior specifically when an agent is active |
| Restricted Session Scope (RSS) | A privilege ceiling for agent-active sessions — narrows, never grants beyond the user's own roles |
| `AGENT_RESTRICTED_SESSION_SCOPE` | The session policy setting that configures RSS |
| Defense in depth (agent access) | Layering RBAC + RSS + masking + row access so no single misconfiguration exposes everything |

## Lab

1. Take a masking policy you wrote in Chapter 9 and add an
   `IS_AGENT_ACTIVATED` branch that masks more aggressively for agents
   than for the human-equivalent role.
2. Write a row access policy that gives `ACCOUNTADMIN` full access,
   lets a human `ANALYST` see their own department's rows, and blocks an
   agent from seeing any rows at all — three branches, one `CASE`.
3. In one paragraph, explain why RSS is described as a "ceiling" rather
   than a replacement for RBAC — what happens if a user's role already
   lacks a privilege RSS would otherwise allow?

## Check yourself

You're ready for Lesson 76 when you can write a masking policy and a row
access policy that both react to `IS_AGENT_ACTIVATED`, and explain what
RSS adds on top of that which neither policy type can do by itself.
