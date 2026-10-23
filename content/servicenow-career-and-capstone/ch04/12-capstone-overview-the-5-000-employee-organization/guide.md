# Lesson 12 — Capstone Overview: the 5,000-Employee Organization

**Chapter 4 · Capstone Kickoff · Lesson 12 of 26**

## What you'll learn

- Meridian Health Network's story — the organization this capstone builds a real capability for
- Why this chapter hands you a different job than Technical Architecture's capstone did
- Why a unified IT Service Desk is the right first workstream to implement, not the whole enterprise
  rollout at once
- The three hospital systems' current help-desk reality, in enough detail to carry into Lesson 13's
  stakeholder interviews
- How this one workstream fits inside the board's eighteen-month consolidation window

## Meridian Health Network, the organization you're building for

If you completed ServiceNow Technical Architecture, you already know this organization. Meridian
Health Network is the new parent company formed when three previously independent hospital systems
agreed to consolidate: **St. Catherine's Medical Center**, a 2,200-employee flagship hospital with
the most mature IT function of the three; **Lakeshore Regional Health**, two community hospitals
totaling 1,600 employees with a strong local-autonomy culture and real suspicion of corporate
mandates; and **Prairie View Health Partners**, a 1,200-employee rural network whose IT staff still
remember a forced systems consolidation eight years ago that went badly and cost two senior IT
leaders their jobs. Combined, that's roughly 5,000 employees, no shared IT service management
platform, and a board that wants ITSM, HR service delivery, and facilities management running on
one ServiceNow instance within eighteen months. Technical Architecture's capstone already answered
the foundational question: one instance, with Domain Separation across three subordinate domains
under a Meridian corporate domain, plus a phased integration architecture pulling worker data from
Workday (St. Catherine's), ADP Workforce Now (Lakeshore), and a homegrown PeopleSoft-based module
(Prairie View). That decision is final. This chapter does not revisit it.

## A different job: from architect to implementer

In Technical Architecture, your job was to decide *what* Meridian should build and defend *why* —
the instance strategy, the domain model, the integration patterns, written up as diagrams and an
Architecture Decision Record. That decision has now been approved by Meridian's board. Your job in
this course is different: you're the implementation lead responsible for turning an approved,
written-down architecture into one real, working, deployed capability that actual help-desk staff
at all three hospital systems use on day one. That's a narrower job than architecture, and a harder
one in a specific way — an architecture diagram doesn't have to survive a Lakeshore agent who's
annoyed that their ticket categories changed, or a Prairie View director who remembers exactly how
the last "one platform for everyone" project went. Nothing you build in this chapter revisits the
instance-and-domain decision; everything you build has to work *within* it.

## Why the Service Desk, first

Meridian's full rollout eventually covers ITSM, HR service delivery, and facilities management
across all three domains — but attempting all three at once, enterprise-wide, in one phase is how
consolidation projects fail. This capstone scopes one concrete workstream: standing up a unified
IT Service Desk — incident management, request management, and one shared service catalog front
door — for all three hospital systems, inside the Domain Separation structure Technical Architecture
already built. Three reasons make this the right first workstream, not an arbitrary one. First, risk:
IT Service Desk tickets carry none of HR's or facilities' HIPAA-adjacent data, so there's real room
to learn from mistakes without a compliance incident. Second, visibility: every employee at all
three systems opens a help-desk ticket eventually, so a working Service Desk is a fast, visible win
that builds trust for the harder workstreams still ahead. Third, proof: a Service Desk that genuinely
respects domain boundaries — a Lakeshore agent can't see a St. Catherine's incident, a Meridian
executive can see a rollup across all three — is the first real-world test of whether the
architecture decision actually holds up outside a diagram.

## Three systems, three help desks, right now

Before you can design anything, you need an honest picture of what exists. St. Catherine's runs a
formal, structured ticketing process with a detailed multi-tier category scheme and a standing
change-advisory process — a product of being the largest and most IT-mature of the three. Lakeshore
runs a lighter process across its two hospitals: a simpler, flatter list of ticket categories, built
and adjusted locally over the years to fit how their own staff actually works, with real pride of
ownership attached to it. Prairie View runs the most informal process of the three — a shared inbox
and a lightweight tracking sheet, reflecting the smallest IT staff of the group — and, because of
the forced consolidation eight years ago, the strongest institutional wariness of any project framed
as "we're replacing what you have with the corporate way." None of these three setups talks to any
of the others today. That gap, and the very different habits behind it, is exactly what Lesson 13's
stakeholder interviews need to surface in detail before anyone designs a single category field.

## What this chapter covers — and what it doesn't

This chapter is three lessons: this overview, a requirements-gathering lesson that simulates real
interviews with each system's current help-desk lead, and a scoping lesson that turns those
requirements into a realistic, time-boxed implementation plan. It does not build the actual catalog
items, workflows, or integrations — Chapter 5 does that, once the requirements and scope from this
chapter exist in writing. Treat this chapter the way a real implementation team would: the
discovery and planning phase that has to happen honestly, on paper, before any configuration work
starts.

## Key terms

| Term | Meaning |
|---|---|
| Implementation lead | The role this course puts you in: delivering an approved architecture as a real, working capability |
| Workstream | One scoped, deliverable slice of a larger rollout — here, the unified IT Service Desk |
| Service catalog front door | The single, shared point of entry employees use to request IT services or report incidents |
| Legacy process gap | The real, undocumented differences between each system's current help-desk habits and tools |

## Check yourself

A Lakeshore stakeholder asks why this chapter doesn't just implement HR service delivery and
facilities management alongside the Service Desk, since the architecture already supports all
three. Using this lesson's three reasons for sequencing, explain why starting with the Service Desk
specifically — and deferring the other two — is the sounder project decision, not just a smaller
one.
