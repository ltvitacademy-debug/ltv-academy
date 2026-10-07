# Lesson 70 — Horizon Catalog: Governance for Enterprise AI

**Chapter 17 · AI Governance, Evaluation & Security · Lesson 70 of 76**

## What you'll learn

- What Horizon Catalog is, and how it's different from the roles/GRANT
  model you already know from Chapter 9
- The five governance pillars Horizon organizes around
- How Horizon moved from "documenting data" to "governing AI behavior at
  runtime"
- How to turn on automatic sensitive-data discovery with a classification
  profile

## From a data catalog to a governance engine

Chapters 9 and 10 gave you the building blocks of Snowflake security:
roles, GRANT, secure views, row access policies, dynamic data masking.
Those are all things *you* configure, object by object. **Horizon
Catalog** is the layer that sits above all of it — Snowflake's built-in
governance and discovery system, and by 2026 it's matured into, in
Snowflake's own description, "a dynamic governance engine that actively
participates in agentic workflows — enforcing policies at runtime,
tracking agent actions, and ensuring every AI decision is auditable."

That's a real shift. A data catalog traditionally just *describes* your
data — what tables exist, who owns them, what a column means. Horizon
still does that, but it also now evaluates and enforces policies in real
time as Cortex Agents execute: masking, row access, purpose-based access
controls, all applied to *agent* queries the moment they run, not just to
human ones.

## The five pillars

Horizon organizes its features around five governance pillars:

| Pillar | What it covers |
|---|---|
| **Security** | Authentication, encryption, network policy — the perimeter |
| **Privacy** | Classification, masking, anonymization of sensitive data |
| **Access** | RBAC, row access policies, purpose-based access controls |
| **Compliance** | Audit trails, data residency, regulatory reporting |
| **Interoperability** | Governance that extends to external engines reading Snowflake-managed data (via Apache Polaris / the Iceberg REST Catalog), not just native Snowflake queries |

Everything in this chapter — evaluations (Lesson 69), the AI Readiness
Score (Lesson 71), guardrails (Lesson 72), Agent Identity (Lesson 73) —
is either part of Horizon or reports into it. It's the umbrella this
whole chapter sits under.

## Turning on automatic sensitive-data discovery

One concrete, SQL-reachable piece of Horizon is automatic classification
— having Snowflake scan your tables and tag likely-sensitive columns
(emails, names, SSNs) without you hand-tagging every one:

```sql
CREATE SNOWFLAKE.DATA_PRIVACY.CLASSIFICATION_PROFILE
  governance_db.sch.my_classification_profile(
    {
      'minimum_object_age_for_classification_days': 0,
      'maximum_classification_validity_days': 30,
      'auto_tag': true
    }
  );

ALTER DATABASE sales_db
  SET CLASSIFICATION_PROFILE = 'governance_db.sch.my_classification_profile';
```

With `auto_tag: true`, Snowflake applies recommended system tags to
columns it classifies as sensitive, and `maximum_classification_validity_days`
tells it to recheck every 30 days rather than classify once and forget.
Those tags are what a masking policy or row access policy (Chapter 9) —
or, as you'll see in Lesson 75, an *agent-aware* version of either —
can key off of.

## Why this matters more once agents are involved

Everything Horizon governs mattered before Cortex Agents existed. What
changed is the *volume and speed* of access: a human analyst runs a
handful of queries a day; an agent can run hundreds, chained together,
unattended, in seconds. A catalog that only describes data after the fact
can't keep up with that — which is exactly why Horizon evolved from
passive documentation into active, runtime policy enforcement.

## Key terms

| Term | Meaning |
|---|---|
| Horizon Catalog | Snowflake's built-in governance and discovery layer, now enforcing policy at runtime for both human and agent queries |
| Governance pillar | One of five areas Horizon organizes around: Security, Privacy, Access, Compliance, Interoperability |
| Classification profile | A configured set of rules for automatic sensitive-data discovery and tagging |
| Runtime policy enforcement | Policies (masking, row access) evaluated fresh on every query, including agent-issued ones, not just documented after the fact |

## Lab

1. Write the `CREATE CLASSIFICATION_PROFILE` statement for a database you
   worked with earlier in this course, choosing your own validity window.
2. For each of the five pillars, name one Snowflake feature from this
   course (any chapter) that belongs to it — Chapter 9's row access
   policies, for instance, under Access.
3. In one sentence, explain why "a catalog that only describes data" isn't
   enough once agents are querying it.

## Check yourself

You're ready for Lesson 71 when you can name all five Horizon pillars
and explain, without looking it up, what changed about Horizon's role
once agentic workflows entered the picture.
