# Lesson 8 — Eliciting Nonfunctional Requirements

**Chapter 2 · Applying Nonfunctional Requirements · Lesson 8 of 18**

## What you'll learn

- Why NFRs almost never arrive on a stakeholder's requirements list unprompted
- Four concrete techniques for surfacing NFRs: stakeholder interviews, existing SLAs/contracts, non-functional checklists, and scenario walkthroughs
- Where to find NFRs that are "already decided" before the project even starts
- How to turn a vague stakeholder answer into a specific, testable NFR

## Nobody hands you a tidy list

As Lesson 1 established, functional requirements usually surface naturally because a business stakeholder is describing a process they already understand. NFRs don't surface the same way, because most stakeholders don't think in terms of "performance" or "scalability" — they think in terms of outcomes ("our busiest week of the year can't go down") without necessarily connecting that outcome to a specific, named requirement an architect needs. **Eliciting NFRs is an active, structured task the architect has to drive**, not something that happens passively during functional requirements-gathering.

## Technique 1: targeted stakeholder interviews

A generic "what are your nonfunctional requirements?" question gets a blank stare from most business stakeholders. Better questions are concrete and tied to a scenario they already understand: "Walk me through your busiest day of the year — what happens if the system is slow that day?" "What happened the last time this process went down — how long were people stuck, and what did it cost?" "If a competitor got hold of this data, what's the actual damage?" These questions translate directly into performance, availability, and security NFRs respectively, without ever using the word "NFR" in the conversation. Different stakeholders surface different categories: an operations lead usually knows the real performance and reliability pain points; a compliance or legal stakeholder knows the regulatory constraints; an infrastructure or IT leader often already has unstated assumptions about scalability and disaster recovery that have never been written down.

## Technique 2: existing SLAs, contracts, and policies

A significant share of real NFRs already exist in writing before the project starts — they're just not in the project's requirements document yet. Customer-facing SLAs the business has already signed ("we guarantee a response to support tickets within 4 business hours") imply performance and reliability NFRs on whatever system handles that workflow. Existing security policies, data-retention schedules, and industry-specific regulatory obligations (already covered in Lesson 7) are NFRs the organization has already committed to — the architect's job is to find them, not invent new ones. A short discovery task — "get me every SLA, data policy, and compliance obligation this system needs to honor" — often surfaces more real NFRs than a full round of stakeholder interviews.

## Technique 3: an NFR checklist, run against this specific system

Walking through this course's six categories (performance, security, scalability, reliability, maintainability and recoverability, compliance) as an explicit checklist against the system being designed catches the NFRs nobody happened to mention. For each category, ask: does this system have a stated target for this category? If not, is the absence because it genuinely doesn't matter here, or because nobody has asked yet? A checklist forces a deliberate decision — even "performance doesn't matter much for this internal weekly reporting tool, response time under 10 seconds is fine" is a real NFR, just a loose one, and it's far better to have decided that explicitly than to discover it was never decided at all.

## Technique 4: scenario walkthroughs

Rather than asking abstract questions, walk a specific, realistic scenario through the proposed design and ask what has to be true at each step: "It's the Monday after a product recall. 50,000 new cases arrive in six hours. What does the system need to do, and how fast?" This technique is especially good at surfacing NFRs stakeholders wouldn't think to mention because the scenario itself is unusual — most of the time, the system never faces a load spike like this, so nobody lists it as a requirement, even though it's exactly the situation where an NFR gap will be most damaging.

## From vague answer to testable NFR

A stakeholder answer like "it needs to be fast" or "it can't go down" is a starting point, not a finished NFR. The elicitation technique's job is producing something testable: "fast" becomes a response-time target with a percentile and a load condition (Lesson 2); "can't go down" becomes an availability target with an explicit allowed-downtime window (Lesson 12). Elicitation isn't complete until the vague language has been translated into the kind of specific, numeric, conditional statement this course has modeled in every NFR category so far.

## Key terms

| Term | Meaning |
|---|---|
| Elicitation | The active process of surfacing requirements that wouldn't otherwise be stated unprompted |
| Scenario walkthrough | An elicitation technique that walks a specific realistic situation through the design to surface requirements the abstract conversation missed |
| SLA (Service Level Agreement) | A pre-existing commitment, often contractual, that implies specific NFRs on whatever system supports it |
| NFR checklist | A structured pass through each NFR category, forcing an explicit decision rather than a silent gap |

## Lab

You're starting discovery for a new Salesforce-based claims-processing system. Using the four techniques in this lesson, write one specific interview question, one document you'd request, one checklist line item, and one scenario walkthrough you'd run — each one targeted at surfacing a different NFR category from this course. For each, state which category you expect it to surface and why.

## Check yourself

Can you explain why NFRs don't surface the same way functional requirements do during normal requirements-gathering? Can you name the four elicitation techniques in this lesson and give an example of each one surfacing a specific, different NFR category?
