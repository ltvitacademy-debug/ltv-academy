# Lesson 7 — Technical Documentation

**Chapter 2 · Communicating Architecture · Lesson 7 of 17**

## What you'll learn

- What a Solution Design Document (SDD) is and the role it plays across a project's lifetime
- The standard sections a complete SDD contains, and what each one is for
- How the diagrams from Chapter 1 and the ADRs from Lesson 6 fit together inside one SDD
- Why "assumptions and open items" is a required section, not an optional footnote

## The document that ties everything together

Chapter 1 covered individual diagram types — an ERD, a context diagram, an ADR — each answering one specific question in isolation. None of them, alone, tells a complete story of a solution. The **Solution Design Document (SDD)** is the artifact that does: a single document assembling the business requirements, the data model, the automation approach, the integration design, the security model, and the key decisions into one coherent narrative that a reviewer, a new team member, or a future architect can read start to finish.

An SDD isn't written once and forgotten — it's typically produced during the design phase of a project, reviewed (Lesson 15 covers that review process), and then kept current as the system evolves, standing as the canonical description of "what this solution is and why it's built this way" for as long as the solution exists.

## Standard sections of a complete SDD

| Section | What it covers |
|---|---|
| Business context and requirements | The business problem being solved and the specific requirements the solution must satisfy — written so a non-technical stakeholder can confirm "yes, that's what we asked for" |
| System context | The system context diagram from Lesson 3, placing this solution among the other systems it touches |
| Data model | The ERD from Lesson 2, plus prose explaining the non-obvious relationship and field choices |
| Automation and process design | How the business logic is implemented — Flow, Apex, or a mix — and why that split was chosen |
| Integration design | Each integration this solution depends on: pattern, direction, data exchanged, and a sequence diagram for any integration where exact order and timing matter (Lesson 13 goes deeper here) |
| Security and sharing model | Org-wide defaults, role hierarchy, sharing rules, and permission architecture (Lesson 14 goes deeper here) |
| Key decisions | Either embedded summaries of, or direct links to, the ADRs (Lesson 6) that shaped this solution |
| Non-functional requirements | Performance, scalability, data volume expectations, and governor-limit-relevant design constraints |
| Assumptions and open items | What the design assumes to be true but hasn't been confirmed, and what's still unresolved |

Not every SDD needs every section at full depth — a small internal tool's SDD might compress several sections into a page each, while an enterprise multi-org program's SDD might run to dozens of pages with each section as its own sub-document. The sections above are the checklist; the depth scales to the solution's actual complexity and risk.

## Why "assumptions and open items" isn't optional

It's tempting to treat an SDD as a confident, finished-sounding artifact and quietly drop anything that reads as uncertain. That instinct works against the document's purpose. An assumption stated plainly — "this design assumes data volume stays under 2 million records per year; if that assumption is wrong, the sharing architecture in Section 6 needs revisiting" — gives a future reader exactly the warning they need before they build on top of a foundation that might not hold. An open item stated plainly — "the exact retry behavior for the payment gateway timeout case is still being confirmed with the vendor" — tells a reviewer precisely what's still unresolved, rather than letting that gap get silently assumed away and discovered later, usually during an incident.

Leaving this section out, or leaving it vague, doesn't make the design more finished — it just moves the discovery of an unstated assumption or unresolved question from now (when it's cheap to raise) to later (when it usually isn't).

## Where this fits in the CTA skill set

The Salesforce Certified Technical Architect (CTA) credential's final step is the Architect Review Board, where a candidate designs and defends a solution for a complex business scenario in front of a panel of experienced architects. The skills a candidate is evaluated on — a sound data model, a defensible integration approach, a credible security design, and the ability to communicate all of it clearly — map closely onto the SDD sections above. A candidate preparing for the review board is, in effect, practicing the skill of assembling exactly this kind of document, and defending it, under real time pressure. The habit of writing complete, honest SDDs on real projects is the same habit that shows up as competence in front of a review board later.

## Key terms

| Term | Meaning |
|---|---|
| Solution Design Document (SDD) | The single document assembling a solution's requirements, data model, automation, integrations, security model, and decisions into one coherent narrative |
| Non-functional requirement | A requirement about how the system performs (scale, speed, volume) rather than what it does |
| Assumptions and open items | The SDD section stating what the design assumes but hasn't confirmed, and what's still unresolved |

## Lab

Pick a solution you've built or studied (even a Trailhead-scale custom app). Write a one-paragraph draft of each of the nine SDD sections above for that solution. For the "assumptions and open items" section specifically, write at least two real assumptions your design is making that haven't actually been confirmed — if you can't think of any, that's worth treating as a warning sign about how carefully the design has actually been examined, not as evidence the design is assumption-free.

## Check yourself

Can you name the nine standard SDD sections from memory and say what each is for? Can you explain why an SDD is described as the document that "ties together" the individual diagrams and ADRs from Chapter 1, rather than replacing them? Can you explain why omitting the assumptions-and-open-items section doesn't make a design more complete — only less honest about what it is?
