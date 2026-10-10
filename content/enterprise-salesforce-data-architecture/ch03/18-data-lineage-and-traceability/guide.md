# Lesson 18 — Data Lineage and Traceability

**Chapter 3 · Ownership and Consistency · Lesson 18 of 26**

## What you'll learn

- What data lineage answers that no other governance tool can
- The difference between lineage inside a single system and lineage across an integrated enterprise
- What Salesforce's native traceability tools actually track, and the real limits on each one
- Why most of an enterprise's lineage lives outside Salesforce, in middleware and ETL, and has to be documented there deliberately
- How lineage gets used in practice: impact analysis, audits, and incident response

## What lineage answers that nothing else does

**Data lineage** is the traceable history of where a piece of data came from, what transformed it along the way, and where it has gone since. It answers a specific question that ownership models, reference-data standards, and systems-of-record maps don't: not "who is accountable for this field" or "which system should be trusted," but "how did *this value, in this record, right now* come to be what it is?" When a number on an executive dashboard looks wrong, lineage is what lets someone trace it backward — this dashboard pulled from this report, which queried this Salesforce field, which was last updated by this integration, which pulled from this ERP table — instead of guessing.

## Lineage inside one system vs. across the enterprise

Lineage is comparatively easy to capture inside a single system, where the platform itself can log every change. It gets dramatically harder the moment data crosses a system boundary, because the receiving system usually has no idea *why* a value arrived the way it did — only that it arrived. A field populated by an integration looks, from Salesforce's point of view, exactly like a field a user typed in by hand, unless something was deliberately built to record the difference. Enterprise-wide lineage — tracing a value across Salesforce, the middleware that moved it, and the ERP it originated in — is never free; it exists only where someone designed the integration to preserve and expose that history.

## Salesforce's native traceability tools and their real limits

Salesforce has two built-in tools that cover different slices of traceability, and it's important to be precise about what each one actually tracks:

| Tool | What it tracks | Real limit |
|---|---|---|
| Field History Tracking | Changes to *data* values on tracked fields (up to a limited number of fields per object) | Standard tracking is only guaranteed to be retained for 18 months (for orgs created after June 1, 2011); older history can disappear |
| Field Audit Trail (part of Salesforce Shield) | Archived field history retained on a defined policy, independent of the standard 18-month window | Requires Shield to be provisioned; retention is configured per object via a deployed HistoryRetentionPolicy, not automatic |
| Setup Audit Trail | Changes to *metadata and configuration* (new permission sets, changed profiles, modified automation) made in Setup | Covers only the last 180 days of setup changes, and does not capture field-level before/after values for data changes — it's a metadata-change log, not a data-lineage tool |

The practical takeaway: Field History Tracking (optionally extended by Field Audit Trail) is the tool for "how did this data value change over time," while Setup Audit Trail is the tool for "what changed about how the org itself is configured." Neither one, by itself, tells you *why* an integration pushed a particular value, or what it looked like in the source system before the integration transformed it.

## Documenting the lineage Salesforce can't show you

Because cross-system lineage isn't automatic, an architect has to treat it as a deliberate design requirement, not an afterthought. This means middleware and ETL jobs need to log, or at minimum document, what source field fed what destination field, what transformation (if any) was applied in between, and what the trigger condition was for the sync to run. Without this, the moment a value looks wrong three systems downstream from its origin, nobody can answer "where did this come from" without manually reverse-engineering integration code under time pressure — usually during an incident, which is the worst possible time to be doing lineage archaeology for the first time.

## Lineage as an audit and incident-response tool

Lineage earns its cost in two recurring situations. The first is **impact analysis**: before changing a field's type, deprecating an integration, or retiring a legacy system, lineage tells you everything downstream that depends on the data you're about to touch — without it, "nothing should break" is a guess, not a verified claim. The second is **incident response and audit**: when a regulator, an auditor, or an internal investigation asks "how did this number get into this report," a documented lineage trail turns that into a quick, confident answer instead of a multi-day forensic exercise across systems nobody fully remembers configuring. Both uses are the real payoff for the design discipline this lesson describes — lineage work that nobody consumed until the day it was the only thing that mattered.

## Key terms

| Term | Meaning |
|---|---|
| Data lineage | The traceable history of where a data value originated, how it was transformed, and where it has traveled since |
| Field History Tracking | Salesforce's native tracking of changes to data values on a limited set of fields, retained ~18 months by default |
| Field Audit Trail | A Salesforce Shield feature extending field history retention via a deployed, per-object archiving policy |
| Setup Audit Trail | Salesforce's log of metadata/configuration changes in Setup, covering the last 180 days |
| Impact analysis | Using lineage to determine what downstream systems or reports depend on data before changing it |

## Lab

An executive dashboard shows a customer's lifetime revenue figure that doesn't match what Finance's own ERP report shows for the same customer. The value flows: ERP revenue table → nightly middleware job → a Salesforce custom field on Account → a Salesforce report → the dashboard. There is no documentation of what the middleware job actually does to the value in transit. Describe, step by step, how you would trace this discrepancy using the tools available (Field History Tracking on the Salesforce field, and whatever you'd need to request from the middleware/ETL team), and identify the one piece of lineage documentation that, if it had existed beforehand, would have made this investigation take minutes instead of days.

## Check yourself

Can you explain the difference between what Field History Tracking captures and what Setup Audit Trail captures, and why neither one alone gives you full data lineage? Can you describe why lineage across system boundaries has to be deliberately designed rather than assumed to exist automatically?
