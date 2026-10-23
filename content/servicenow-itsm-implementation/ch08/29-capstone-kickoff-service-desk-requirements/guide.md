# Lesson 29 — Capstone Kickoff: Service Desk Requirements

**Chapter 8 · Capstone: Enterprise IT Service Desk · Lesson 29 of 32**

## What you'll learn

- The real-world scenario this capstone implements, start to finish, across Lessons 29-32
- How to translate a stakeholder kickoff meeting into a concrete ServiceNow implementation checklist
- Why "faster resolution" and "fewer repeat tickets" are two different processes, not one
- Why a production ERP system needs its own named Change path, not the default one
- The full requirements checklist this capstone builds against for the rest of the chapter

## The scenario: Caldwell Precision Manufacturing

Caldwell Precision Manufacturing (CPM) is a 2,000-employee contract manufacturer running three plants and a head office. Until now, IT support has lived in a shared mailbox and a spreadsheet. CPM just licensed ServiceNow and asked you, the implementation consultant, to stand up ITSM from scratch. This lesson is the kickoff meeting — the requirements IT leadership and plant operations gave you — and the checklist you build from it. Lessons 30 and 31 configure that checklist. Lesson 32 reviews what got built against the CIS-ITSM exam blueprint.

## What IT leadership actually asked for

Strip the meeting notes down to five real asks, each one a direct quote from a different stakeholder:

1. **The VP of Operations**: "When Meridian [CPM's production ERP, running MRP, work orders, and shipping] goes down, I need it back in under an hour — not whenever someone notices the ticket." That is an Incident Management requirement about Priority and routing, covered in Course 1's Chapter 1.
2. **The plant IT manager**: "The same label printer on Line 3 breaks every other week and we keep opening a new ticket for it instead of actually fixing anything." That is a Problem Management requirement — recurring Incidents need a linked investigation, from Chapter 2.
3. **The CFO**: "Nobody touches Meridian's production configuration without me knowing exactly what changed, who approved it, and what happens if it breaks." That is a Change Enablement requirement scoped specifically to one business-critical system, from Chapter 3.
4. **HR and new-hire onboarding**: "Right now a new hire's laptop and software access is three emails and a phone call. I want a catalog item." That is a Request Management requirement, from Chapter 4.
5. **The service desk supervisor**: "My agents answer the same password-reset and VPN questions fifteen times a day. I want a knowledge base they can actually search, and so can end users." That is a Knowledge Management requirement, from Chapter 5.

Underneath all five sits an implicit sixth ask nobody stated outright but everyone assumes: **measurable commitments and a way to prove them** — Service Level Management (Chapter 6) and a self-service front door (Chapter 7, the Service Portal).

## Why "faster" and "fewer repeats" are not the same project

A mistake worth naming early: treating the VP's "fix it faster" and the plant manager's "stop the repeat tickets" as the same problem with one fix. They are not. Fixing Priority 1 resolution speed is an Incident Management configuration problem — Priority Lookup Rules, Assignment Rules, and a Major Incident process, all built to restore service fast, even with a temporary workaround. Fixing the Line 3 label printer for good is a Problem Management configuration problem — a root-cause investigation that takes as long as it takes, deliberately slower than Incident, aimed at a permanent fix rather than a fast one. Lesson 30 configures both, side by side, precisely because conflating them is the single most common implementation mistake in a first ITSM rollout.

## Why Meridian gets its own Change path

The CFO's requirement is really a risk statement: Meridian is the one system where an unreviewed change could stop shipments company-wide. That does not mean every change needs the same heavyweight process — a password policy tweak on a non-critical system should not require the same CAB review as a database schema change on Meridian. Chapter 3 built exactly this distinction: Standard, Normal, and Emergency change types, a calculated risk value driven by real questionnaire answers, and approval that scales with that risk. Lesson 30 applies that distinction specifically to Meridian, instead of leaving "change management" as one generic policy applied identically to everything.

## The implementation checklist for this capstone

| Stakeholder ask | Process | Built in |
|---|---|---|
| Faster Priority 1 resolution | Incident Management: Priority Lookup Rule, Assignment Rules, Major Incident process | Lesson 30 |
| Stop the recurring Line 3 ticket | Problem Management: linked Incidents, Known Error record | Lesson 30 |
| Controlled changes to Meridian | Change Enablement: risk-based approval, CAB for Medium/High risk | Lesson 30 |
| SLA commitments IT can prove | Service Level Management: SLA Definitions per priority, schedule-aware | Lesson 31 |
| Self-service onboarding catalog | Request Management: catalog item, fulfillment, Requested Item SLA | Lesson 31 |
| A knowledge base agents and users can search | Knowledge Management: articles, approval workflow | Lesson 31 |
| A self-service front door | Service Portal: a widget showing each employee their own open requests | Lesson 31 |

## Key terms

| Term | Meaning |
|---|---|
| Meridian | This capstone's fictional production ERP system at Caldwell Precision Manufacturing — the business-critical CI driving the Change Enablement requirement |
| Stakeholder requirement | A real business ask (faster resolution, fewer repeat tickets, controlled change) translated into a specific process configuration |
| Business-critical CI | A Configuration Item whose outage or unreviewed change carries outsized business risk, justifying its own Change path |
| Requirements checklist | The mapping from each stakeholder ask to the specific ServiceNow process and configuration that satisfies it |

## Check yourself

Before Lesson 30, explain without looking: why do the VP's "fix Meridian faster" requirement and the plant IT manager's "stop the recurring Line 3 ticket" requirement need two different processes instead of one, and which two chapters of this course does each one pull from?
