# Lesson 22 — System Architecture Review Board Practice

**Chapter 4 · Practice · Lesson 22 of 22**

## What you'll learn

- What an architecture review board is, and why Salesforce's own highest architecture credential uses one
- The general three-phase shape (preparation, presentation, Q&A) that review-board formats commonly follow
- What a review board is actually evaluating beyond technical correctness
- How to practice defending a design under live, probing questioning

## Why a review board, not just a written exam

Earlier lessons in this chapter practiced written, scenario-based reasoning. A **review board** format tests something a written answer can't: whether an architect can present a design out loud, to skeptical reviewers, and hold up their own reasoning under direct, unscripted questioning. Salesforce's own most senior architecture credential — the Certified Technical Architect (CTA), the capstone above the System Architect and Application Architect tracks this course has discussed — uses exactly this format for its final evaluation, which is a strong signal that live defense of a design is considered a genuinely distinct skill from writing a correct answer on a test.

## The general shape

Review board formats, including Salesforce's own CTA board, are commonly described as following three broad phases: a **preparation phase**, where the candidate works through a detailed scenario and produces solution artifacts (such as the system architecture and data model diagrams this course's Lesson 10 introduced); a **presentation phase**, where the candidate presents their solution to a panel; and a **question-and-answer phase**, where the panel probes the solution with pointed, scenario-specific questions. Exact timings and procedural details for Salesforce's own CTA board have changed over time (including a shift to fully virtual delivery), so this lesson teaches the general shape rather than a specific current timing — always confirm current format details against Salesforce's own official materials before relying on them for real exam preparation.

## What a review board actually evaluates

Practitioner accounts of review-board evaluation consistently emphasize that panels are assessing more than whether the final architecture is technically sound. They're watching whether the candidate's presentation ties each part of the solution back to a specific requirement stated in the scenario, rather than presenting a generically good architecture that happens to not clearly connect to what was actually asked. They're watching how a candidate responds to a pointed question that challenges a design choice — whether the candidate can explain the trade-off they made and why, or whether they become defensive or simply can't account for their own decision. And they're watching whether the candidate proactively points the panel to the specific part of the scenario justifying a choice, rather than assuming the panel will connect the dots — accounts of this format specifically note that panelists can't read a candidate's mind and may miss a point that was made only once, in passing.

## Practicing the format yourself

You don't need a real panel to practice this skill. Take the Meridian Fixtures case study from Lesson 19, or the exam-style scenarios from Lesson 21, and out loud — to yourself, to a study partner, or recorded for your own review — present your recommendation as if defending it live. Then have a study partner (or your own recorded playback) challenge you: why not a different integration pattern, what happens if the governance body in your recommendation refuses to form, why does your recommendation's sequencing matter. The specific habit to build is answering by pointing back to a concrete fact in the scenario ("the requirement explicitly said no duplicated copy, which is why I ruled out batch") rather than retreating to a generic, unanchored justification.

## Closing this course

This lesson closes Enterprise Systems Architecture. Across four chapters, this course has built the vocabulary and habits a System Architect needs: understanding Salesforce's place among external systems, systems of record versus systems of engagement, integration boundaries, master data ownership, and enterprise architecture itself (Chapter 1); the cross-cutting concerns of security, governance, frameworks, diagramming, vendor strategy, and multi-org decisions (Chapter 2); the concrete design disciplines of data flow, identity, monitoring, availability, legacy coexistence, and roadmapping (Chapter 3); and now, in this chapter, the practice of applying all of it to a realistic case, understanding the certification path it maps to, and defending a design the way a review board — or a real stakeholder meeting — actually demands.

## Key terms

| Term | Meaning |
|---|---|
| Review board | An evaluation format where a candidate presents a solution live to a panel and defends it under direct questioning |
| Certified Technical Architect (CTA) | Salesforce's capstone architecture credential, evaluated through a review board format |
| Defending a design | Explaining a design choice's trade-off and justification on the spot, anchored to specific scenario facts |

## Lab

Pick your written recommendation from either Lesson 19's case study or Lesson 21's exam-style scenarios. Present it out loud, in under five minutes, as if to a review panel. Then write down three pointed questions a skeptical panelist might ask about your recommendation, and write your live-defense answer to each one, making sure every answer points back to a specific fact from the scenario rather than a generic justification.

## Check yourself

Can you explain, in your own words, what a review board format is testing that a written exam answer alone cannot? Can you describe at least two specific things practitioner accounts say review panels are watching for, beyond pure technical correctness?

Sources: [5 Salesforce Architecture Resources Every CTA Candidate Should Use](https://www.salesforce.com/blog/?p=146200), [Salesforce CTA Review Board to Become Virtual](https://www.salesforceben.com/salesforce-cta-review-board-to-become-virtual/)
