# Lesson 3 — System Diagrams

**Chapter 1 · Documenting Architecture · Lesson 3 of 17**

## What you'll learn

- What a system context diagram is and the single question it answers
- The difference between a system context diagram and the lower-level diagrams covered later in this chapter
- How to draw Salesforce as one box in a larger enterprise landscape, not the whole picture
- Why "zoom level" is the organizing idea behind every diagram type in this course

## The question a system context diagram answers

Before any data model or integration detail, a reader needs one thing first: what is this system, and what does it talk to? A **system context diagram** answers exactly that, at the highest possible zoom level. It draws the system being described as a single box in the middle, surrounded by every external actor and external system it exchanges information with, connected by labeled lines showing the direction and nature of each exchange. It intentionally shows nothing about what's *inside* the box — no objects, no Flows, no internal logic. That's a feature, not a gap: a context diagram's job is to establish the boundary before anyone starts discussing what's inside it.

This idea — draw the system as a box, show what crosses its boundary, say nothing yet about its internals — comes from the C4 model's "Context" level (the top of four zoom levels: Context, Container, Component, Code), a widely used informal standard for software architecture diagrams. Salesforce architecture documentation doesn't need to adopt C4 wholesale, but the context-diagram idea maps cleanly onto Salesforce work because Salesforce orgs are almost never the only system in the picture.

## Drawing a Salesforce system context diagram

Put "Salesforce" (or, for a multi-org enterprise, the specific org — "Sales Cloud Production") as the central box. Around it, draw every actor and system with a real integration or usage relationship:

- **Human actors**: Sales reps, support agents, external partners using Experience Cloud, customers using a self-service portal.
- **Upstream systems**: an ERP system feeding product and pricing data in, a marketing automation platform pushing lead data in.
- **Downstream systems**: a data warehouse pulling Salesforce data out for reporting, a billing system receiving closed-won Opportunity data.
- **Peer systems**: another Salesforce org in a multi-org architecture, connected via a tool like Salesforce-to-Salesforce or a middleware platform.

Label each connecting line with what crosses it and, where it adds clarity, the integration pattern (real-time API call, nightly batch, event-driven) — Lesson 13 goes deeper on documenting that layer. The point of a system context diagram is not precision about *how* the integration works; it's an honest, complete inventory of *what* the org touches, readable in under a minute by someone who has never seen this org before.

## Why this diagram goes first

A system context diagram is almost always the first diagram in a solution design document, for a practical reason: every other diagram in this chapter — the ERD, the data-flow diagram, the sequence diagram — describes something happening *inside* one of the boxes on the context diagram, or along one of its connecting lines. A reader who hasn't first seen the context diagram has no map for where a detailed data-flow diagram even fits. Architects sometimes skip straight to the detailed diagrams because the context diagram feels "too simple to be worth drawing" — that instinct is backwards. The simple diagram is what makes the detailed ones legible.

## Zoom level is the organizing idea

Every diagram type in this chapter exists at a different zoom level, and picking the right one for a given conversation is itself a skill. A system context diagram is the widest zoom — appropriate for an executive, a new team member, or the first page of any design document. An ERD (Lesson 2) zooms into the data structure of one or more of those boxes. A data-flow diagram (Lesson 4) zooms into how data moves between processes inside a box. A sequence diagram (Lesson 5) zooms into the exact order of calls during a single transaction. None of these replace each other — a complete documentation set uses each at the zoom level the question actually requires, which is also exactly the theme Lesson 10 returns to when it covers documenting for different audiences.

## Key terms

| Term | Meaning |
|---|---|
| System context diagram | A diagram showing one system as a single box, surrounded by every external actor and system it exchanges data with |
| C4 model | A widely used informal model for software architecture diagrams at four zoom levels: Context, Container, Component, Code |
| Boundary | The edge of the system being described — what's inside the box vs. outside it |
| Zoom level | How much internal detail a given diagram shows, from a whole-system overview down to a single transaction |

## Lab

A mid-size company runs Sales Cloud and Service Cloud in one org. It integrates with: NetSuite (financials, nightly batch sync of invoices), Marketo (marketing automation, real-time lead push via REST API), a Mulesoft integration layer sitting between Salesforce and an internal inventory system, and an Experience Cloud partner portal used by 200 external resellers. Draw the system context diagram: one central Salesforce box, every actor and system named above placed around it, each connection labeled with direction and what crosses it. Then write two sentences explaining what this diagram would NOT tell a reader that they'd need a data-flow or sequence diagram to find out.

## Check yourself

Can you explain, in one sentence, the single question a system context diagram answers? Can you name why a context diagram deliberately shows nothing about what's inside the box? Can you explain why it typically comes first in a documentation set, ahead of more detailed diagrams?
