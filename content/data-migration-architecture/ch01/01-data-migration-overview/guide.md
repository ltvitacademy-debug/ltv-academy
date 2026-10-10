# Lesson 1 — Data Migration Overview

**Chapter 1 · Planning · Lesson 1 of 18**

## What you'll learn

- What "data migration" means as distinct from migrating configuration or metadata
- The three-phase arc this course follows, and why that order isn't arbitrary
- Where a Technical Architect's responsibilities sit relative to an admin's or developer's
- The handful of recurring reasons real migrations fail, as a preview of what the rest of this course exists to prevent

## Data migration is not the same problem as configuration migration

Salesforce projects move two very different kinds of things between orgs, and it's worth being precise about which one this course is about. Moving **metadata** — object definitions, fields, flows, Apex, page layouts — is a solved, mostly mechanical problem: change sets, packages, and Salesforce DX all exist specifically to carry configuration from a sandbox to production reliably and repeatably. Moving **data** — the actual rows of Accounts, Contacts, Opportunities, and custom object records that represent a business's real operating history — is a fundamentally different problem. There's no built-in "deploy" button for data. Every row has to be extracted from somewhere, often cleaned up, mapped onto a (possibly different) target schema, loaded in a sequence that respects relationships, and then proven correct — all without the business ever quite stopping. This course is about that second problem: planning, designing, and executing a real data migration into (or within) Salesforce.

## The three-phase arc

The chapters in this course follow the shape of a real migration project, in order:

1. **Planning** (this chapter) — understand the source data, assess its quality, decide what's actually in scope, and choose tooling appropriate to the volume and complexity you're dealing with. Nothing gets built yet.
2. **Designing the Migration** — turn the plan into a concrete technical design: field mappings, transformation logic, load sequencing, and specific handling for the trickier categories of data (relationships, files, history).
3. **Proving and Cutting Over** — validate the design against real data, reconcile what loaded against what was supposed to load, rehearse the whole thing at least once, and then execute (and be ready to walk back) the actual go-live.

Skipping ahead is the single most common root cause of migration trouble. A team that jumps straight to "let's just load it with Data Loader" without first profiling the source data for duplicates, or without sequencing which objects load before which, is going to discover those problems anyway — just mid-load, in production, under time pressure, instead of on a whiteboard weeks earlier when they're cheap to fix.

## Where the architect's job starts and stops

A Technical Architect leading a migration isn't usually the person running the load job — that's often an admin, a developer, or a specialized data engineer. The architect's job is to make the decisions that are expensive to get wrong and hard to undo once the load has started: what the scope boundary is, how objects depend on each other and therefore must be sequenced, which tool fits the actual volume and complexity, how relationships and edge cases (files, audit history, soft-deleted records) will be handled, and what the rollback plan is if something goes wrong on cutover day. Those decisions all belong in Chapters 1 and 2. The architect also owns signing off that validation and reconciliation in Chapter 3 actually prove the migration is safe to go live — a decision that shouldn't be delegated to "it looked fine in the spot-check."

## Why migrations fail

The failure modes that show up again and again in real projects are rarely exotic. They're almost always one of: nobody profiled the source data, so duplicates and malformed records only surface during the load; nobody defined scope precisely, so "just one more object" keeps getting added mid-project; the load order didn't respect object dependencies, so child records failed to attach to parents that hadn't loaded yet; nobody rehearsed the migration at real volume before cutover day, so the first time anyone saw how long it actually takes was during the live event; and there was no rollback plan, so a bad load had no clean way to be undone. Every one of those is a planning or design failure, not a tooling failure — which is exactly why this course spends its first two chapters on planning and design before Chapter 3 ever talks about actually flipping the switch.

## Key terms

| Term | Meaning |
|---|---|
| Data migration | Moving a business's actual record data from a source system into (or within) Salesforce, as distinct from moving configuration/metadata |
| Metadata migration | Moving configuration (objects, fields, flows, code) between orgs via change sets, packages, or Salesforce DX |
| System of record | The system treated as authoritative for a given piece of data when sources disagree |
| Cutover | The event where the business switches from using the legacy system to using the new target system |
| Rollback | The plan and mechanism for undoing a migration if it has to be reversed |

## Lab

A mid-sized distributor is replacing two separate legacy systems — an old on-premise CRM and a spreadsheet-based order tracker — with a single Salesforce org. The project sponsor tells you: "Let's just export everything to CSV and load it with Data Loader next week." Write a short response (4-6 sentences) explaining, in business terms, which of this course's three phases that plan skips entirely, and name two concrete things that could go wrong on load day as a direct result of skipping them.

## Check yourself

Can you explain, in one or two sentences, why data migration and metadata migration are different problems that need different tools and different planning? Can you name the three phases this course follows and give one reason skipping straight to "load the data" tends to cause trouble later rather than saving time?
