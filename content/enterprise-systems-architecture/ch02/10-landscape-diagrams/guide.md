# Lesson 10 — Landscape Diagrams

**Chapter 2 · Enterprise Concerns · Lesson 10 of 22**

## What you'll learn

- Why a System Architect needs to communicate the enterprise systems landscape visually, not just describe it in prose
- The difference between a context diagram, a system landscape diagram, and a data flow diagram
- Conventions that make a landscape diagram actually useful to someone who didn't draw it
- Common mistakes that turn a landscape diagram into noise instead of a communication tool

## Why prose isn't enough

Everything this course has covered so far — external systems, systems of record, integration boundaries, master data ownership — involves relationships between systems that are genuinely hard to hold in your head from a written description alone. A paragraph describing "Salesforce sends orders to the ERP via Fire and Forget, which then feeds the data warehouse nightly, while the HR system feeds Salesforce territory assignments through a separate batch job" is accurate but hard to verify at a glance. A diagram showing the same thing lets a reviewer — a governance committee, a fellow architect, an executive stakeholder — see the whole shape of the landscape in seconds and spot a missing connection or a surprising dependency that the prose buried in a subordinate clause.

## Three diagram types, three jobs

Architects typically reach for a small number of diagram types depending on what question they're trying to answer:

- **Context diagram.** Zooms all the way out: shows one system (Salesforce, say) as a single box, surrounded by every other system it touches, with simple labeled arrows showing the nature of each connection. Answers "what does this system talk to, at all," with no internal detail.
- **System landscape diagram.** Shows the whole enterprise's systems as peer boxes — Salesforce, the ERP, the HR system, the data warehouse, middleware — with the integration connections between them. Answers "how does the whole landscape fit together," which is the view a System Architect lives in most often.
- **Data flow diagram.** Follows one specific piece of data (a customer record, an order) through every system it touches, in sequence, showing where it's created, where it's transformed, and where it ends up. Answers "what actually happens to this data," which matters enormously when diagnosing a data-quality or systems-of-record problem.

Each of these answers a different question, and picking the wrong one for the audience is a common mistake — showing an executive a detailed data flow diagram when they need the one-page context diagram, or showing a fellow architect only the context diagram when they need the full landscape view to actually do their job.

## Conventions that make a diagram useful

A landscape diagram earns its usefulness through a handful of disciplined habits: label every connection with what's actually moving across it (not just a line with no annotation), indicate direction clearly (a one-way batch feed looks very different from a bidirectional sync, and the diagram should make that obvious at a glance), use a consistent shape or color convention for the same kind of thing across the whole diagram (so every system of record looks visually distinct from every system of engagement, for instance), and resist the urge to cram every possible detail into one diagram — a cluttered diagram that tries to show everything communicates nothing.

## What a bad landscape diagram looks like

The predictable failure mode is a diagram that accumulates boxes and arrows over years without anyone pruning it, until it has fifteen systems, forty connections, no legend, and no two people reading it would describe the same picture back to you. A System Architect's job includes maintaining these diagrams as living documents — updated when a system is added, retired, or an integration changes — not treating them as a one-time deliverable from a project that finished two years ago.

## Key terms

| Term | Meaning |
|---|---|
| Context diagram | A diagram zooming out to one system's connections to everything around it, with no internal detail |
| System landscape diagram | A diagram showing an enterprise's systems as peer boxes with the integrations connecting them |
| Data flow diagram | A diagram following one specific piece of data through every system it touches, in sequence |

## Lab

Using the company and systems list you built across earlier labs, sketch (on paper, in a drawing tool, or described in careful prose if you have no drawing tool available) a system landscape diagram showing Salesforce, the ERP, the HR system, and the data warehouse as boxes, with labeled, directional arrows showing the integration pattern (from Lesson 4's list) connecting each pair. Then describe, in one or two sentences, what a data flow diagram tracing a single customer record through this same landscape would need to show differently from your landscape diagram.

## Check yourself

Can you explain the difference between a context diagram, a system landscape diagram, and a data flow diagram, and when you'd reach for each one? Can you name at least two conventions that make a landscape diagram actually useful to someone who didn't draw it?
