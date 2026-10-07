# Script — Horizon Catalog: Governance for Enterprise AI

## Segment 1 (title)

Chapter 9 gave you roles, GRANT, secure views, row access policies — things you configure object by object. Horizon Catalog sits above all of it: Snowflake's built-in governance and discovery layer, which by now has matured into, in Snowflake's own words, a dynamic governance engine that actively participates in agentic workflows — enforcing policies at runtime, tracking agent actions, and ensuring every AI decision is auditable.

## Segment 2 (steps: five pillars)

Horizon organizes around five pillars. Security covers authentication, encryption, and network policy. Privacy covers classification, masking, and anonymization. Access covers RBAC, row access policies, and purpose-based access controls. Compliance covers audit trails and data residency. Interoperability extends governance to external engines reading Snowflake-managed data, through the open Iceberg REST Catalog interface — not just native Snowflake queries.

## Segment 3 (code: classification profile)

One concrete piece you can reach directly from SQL is automatic classification — Snowflake scanning your tables and tagging likely-sensitive columns, like emails or names, without you hand-tagging every one. A classification profile with auto_tag enabled applies recommended system tags automatically, and a maximum validity window tells it to recheck on a schedule you choose, rather than classify once and forget.

## Segment 4 (steps: why it changed)

Here's why this had to evolve: a human analyst runs a handful of queries a day. An agent can run hundreds, chained together, unattended, in seconds. A catalog that only describes data after the fact can't keep up with that volume and speed — so Horizon moved from passive documentation to enforcing masking, row access, and purpose-based controls fresh, on every query, whether a human or an agent is asking.

## Segment 5 (outro)

Next lesson: the AI Readiness Score and Horizon Context — how Snowflake scores whether a given table is actually ready to be handed to an AI workload in the first place, and what happens once it is.
