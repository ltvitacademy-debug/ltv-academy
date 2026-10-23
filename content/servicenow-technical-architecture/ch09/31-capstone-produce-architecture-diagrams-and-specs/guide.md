# Lesson 31 — Capstone: Produce Architecture Diagrams & Specs

**Chapter 9 · Capstone: Enterprise Technical Architecture · Lesson 31 of 32**

## What you'll learn

- What a real architecture diagram actually needs to communicate at this stage — not how to draw
  one in any particular tool
- The three diagrams Meridian's architecture deliverable needs: instance/domain topology,
  integration data flows, and security zones — and the real content each one carries
- How to write a complete Architecture Decision Record for the single-instance-with-domain-
  separation decision, including the options that were honestly rejected
- What separates a reviewable architecture deliverable from a few bullet points on a slide

## Why this lesson doesn't hand you a picture

This course has never shown you a screenshot, and this lesson doesn't break that pattern — not
because diagrams don't matter, but because the skill that actually matters here isn't which
drawing tool you open. Whether you build these diagrams in Visio, Lucidchart, a whiteboard photo,
or ServiceNow's own architecture documentation, the diagram is only as good as the *content*
decisions behind it: what to include, what to leave out, and what question each diagram needs to
let a reviewer answer at a glance. That content is what this lesson actually teaches.

## Diagram one: instance and domain topology

The first diagram a reviewer needs is the structural one from Lesson 30's decision, made visible.
It shows one ServiceNow instance, with the Meridian corporate domain at the top and St. Catherine's,
Lakeshore, and Prairie View as subordinate domains beneath it. For each domain, the diagram
identifies who actually sits inside it — which users, which roles — and what crosses the boundary
upward into the corporate domain versus what stays contained within a single hospital system's
view. A reviewer looking at this diagram should be able to answer, without reading a word of
supporting text: can a Lakeshore helpdesk agent see a St. Catherine's incident? (No.) Can a Meridian
corporate executive see across all three for a board report? (Yes.) If the diagram can't answer
those two questions at a glance, it isn't doing its job yet.

## Diagram two: integration data flows

The second diagram captures Lesson 30's integration architecture as a set of flows, not a list.
Each of the three HR integrations — Workday, ADP Workforce Now, and the Prairie View PeopleSoft
module — appears as a labeled arrow showing direction, the pattern used (event-driven for the
Workday worker-change sync, request-response for the live department lookup, a MID-Server-based
batch pull for Prairie View), and critically, which domain the resulting ServiceNow record lands
in. That last detail is what makes this diagram genuinely useful rather than decorative: a reviewer
tracing a Workday-sourced record through the diagram should be able to see exactly where its
`sys_domain` value gets set, and catch — on paper, before it's built — any integration path that
doesn't assign one.

## Diagram three: security zones

The third diagram overlays Lesson 30's risk-proportionate security design onto the same structure.
It marks, explicitly, which tables and fields carry the regulated, HIPAA-relevant data —
health-related leave cases, facilities records tied to patient-care units — and shows where those
zones sit relative to the domain boundaries from diagram one. It also marks the points where data
genuinely has to cross a zone boundary (a corporate HR analyst reviewing an aggregated leave trend
across all three hospital systems, for instance) because those crossing points are exactly where
Chapter 5's strictest controls need to apply, and a security reviewer needs to find them without
hunting through a design document.

## Writing the Architecture Decision Record

With the diagrams drafted, Chapter 1's ADR discipline turns the single-instance-with-domain-
separation decision into a durable record, not just a diagram someone has to interpret correctly
forever. A real ADR for this decision states the **context** honestly: three previously independent
hospital systems consolidating under one parent, no data-residency requirement, no genuine
business-unit independence, but a real cultural and operational need to keep day-to-day data
separate. It lists the **options** actually weighed — Option A, three separate production
instances; Option B, one instance with no domain separation at all; Option C, one instance with
Domain Separation across three subordinate domains — and states plainly why A and B were rejected,
not just that C was chosen. It records the **decision** (Option C) and the reasoning tying back to
Chapter 2's actual use-case test. And it states the **consequences** honestly, including the real
cost: every future script, report, and integration on this instance now has to be built and tested
with domain awareness in mind, a permanent overhead the team is accepting deliberately, with eyes
open, because the alternative — collapsing three hospital systems' data into one undifferentiated
view, or paying for three full production instances — was worse.

## What makes this a real deliverable, not a slide

A few bullet points claiming "we chose domain separation for efficiency" would not survive a real
review, because it gives a future reader nothing to evaluate — no rejected options, no reasoning,
no honest accounting of cost. The diagrams and the ADR together are what make this a genuine
architecture deliverable: anyone encountering Meridian's instance two years from now, with no memory
of this capstone, can reconstruct not just what was built, but why, and can judge for themselves
whether the original reasoning still holds before touching it.

## Key terms

| Term | Meaning |
|---|---|
| Instance/domain topology diagram | Shows the domain hierarchy and who sits in, and sees across, each domain |
| Integration data-flow diagram | Shows each integration's direction, pattern, and which domain its resulting records land in |
| Security zone diagram | Marks where regulated data lives and where it legitimately has to cross a domain boundary |
| ADR consequences | The honest, explicit statement of what a decision makes easier, harder, or permanently more costly |

## Check yourself

A new architect joins Meridian's team eighteen months from now and asks why St. Catherine's and
Lakeshore aren't just on separate instances "like they used to be." Using only the ADR this lesson
describes — not your memory of this capstone — what two things should that document be able to
tell them before they touch anything?
