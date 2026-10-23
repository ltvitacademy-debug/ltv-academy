# Lesson 30 — Capstone: Configure Incident, Problem & Change Workflows

**Chapter 8 · Capstone: Enterprise IT Service Desk · Lesson 30 of 32**

## What you'll learn

- How Lesson 29's "faster Priority 1 resolution" ask becomes a real Priority Lookup Rule and Assignment Rule configuration
- Why the Line 3 label printer problem gets solved by linking Incidents to one Problem record, not by escalating harder
- How Meridian's risk-based Change path turns the CFO's requirement into an enforced workflow, not a policy document
- Why each configuration decision in this lesson traces back to one specific stakeholder sentence from Lesson 29

## Incident Management: making "under an hour" real

The VP of Operations' requirement was specific: Meridian down means back up in under an hour. That sentence becomes three real configuration decisions, not one.

First, the `priority_lookup_rule` matrix has to actually reflect that urgency. Any incident where Impact = 1 (company-wide) and the affected Configuration Item is Meridian or one of its direct dependencies (the database server, the plant-floor terminal gateway) calculates to Priority 1 — Critical, automatically, with no agent guessing at severity under pressure. Second, Assignment Rules route a Meridian-related Priority 1 incident directly to the **ERP Basis** assignment group, not the general service desk queue, because every minute spent in general triage before the right team sees it eats into the one-hour target. Third, any Priority 1 incident against Meridian — specifically, not every Priority 1 incident platform-wide — automatically triggers CPM's Major Incident process: a dedicated major-incident record, a bridge call, and status updates to the VP's distribution list on a fixed cadence until Resolved. That last piece matters because "under an hour" is also a communication commitment, not just a technical one.

## Problem Management: fixing Line 3 instead of reopening it

The plant IT manager's complaint was concrete: the same Line 3 label printer incident keeps reopening. The fix is not a faster Incident process — it is recognizing that six separate Incident records over two months describe one underlying condition, and linking them. A Problem record is opened: "Line 3 label printer intermittent disconnect," and each new matching Incident gets its `problem_id` populated to point at it instead of triggering a fresh, disconnected investigation. The Problem record's `cause_notes` field tracks what's actually been tested — firmware version, network switch port, power supply — as the investigation develops over the weeks a real root-cause effort takes. Once CPM's network team identifies the actual cause (a failing switch port feeding that printer's VLAN), `fix_notes` documents the permanent fix, `root_cause` is set as a reference to the specific `cmdb_ci` record for that switch, and the Problem moves to Resolved. Every one of the six linked Incidents can now be reviewed and closed knowing a real fix — not a workaround — is in place. The Problem record also becomes a **Known Error**, so the next time a similar symptom appears anywhere on the plant floor, the service desk can search for it before opening a new Problem investigation at all.

## Change Enablement: a risk-based path scoped to Meridian

The CFO's requirement — nobody touches Meridian's production configuration without approval and a record of what changed — becomes a Normal change path with a real risk calculation behind it, not a manually-typed risk field. The risk questionnaire asks the real conditions that matter for a Meridian change specifically: does this change affect the production environment (yes, by definition, for Meridian)? Is a tested backout plan documented? Has this exact change been performed successfully before? Those answers calculate to a risk value — commonly Medium or High for anything touching Meridian's database or integration layer, because "production ERP" alone already answers the first question affirmatively.

That calculated risk then drives approval. A Low-risk change to a non-critical system might need only manager sign-off. Any Normal change against Meridian that calculates to Medium or High risk automatically chains into full **CAB** review — the body that evaluates the change's business impact, its proposed maintenance window, and its backout plan before authorizing implementation. Routine, pre-approved Meridian maintenance (a monthly patch cycle already reviewed and templated) can still run as a Standard change with no individual approval step, because that category was authorized once, at template-creation time — the distinction Chapter 3 built is what keeps CAB focused on genuinely risky Meridian changes instead of drowning in routine ones.

## Key terms

| Term | Meaning |
|---|---|
| Priority Lookup Rule (applied to Meridian) | The calculated-Priority mechanism tuned so company-wide Meridian impact automatically lands on Priority 1 |
| Major Incident process | The dedicated bridge-call and status-update process triggered for Priority 1 incidents against Meridian specifically |
| Known Error | A resolved Problem record (like the Line 3 switch port) kept searchable so a repeat symptom is recognized before a new investigation opens |
| Risk-based CAB chaining | Routing a Normal change into full CAB review automatically once its calculated risk reaches Medium or High, rather than reviewing every change identically |

## Check yourself

Without looking: why does this lesson's Major Incident trigger fire specifically on "Priority 1 against Meridian," rather than on every Priority 1 incident company-wide, and why does a routine monthly Meridian patch still qualify as a Standard change even though Meridian itself is high-risk?
