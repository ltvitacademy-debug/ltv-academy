# Lesson 7 — Case Study: Nonprofit Program Management

**Chapter 1 · Application Case Studies · Lesson 7 of 16**

## What you'll learn

- Why donor management and program-service delivery are two different data models that happen to share some people
- How a cohort-based service model differs from a one-to-one case model, and why that changes object design
- Why "the same person" can be simultaneously a donor, a client, and a volunteer, and what that means for the data model
- How to defend a scoped, phased rollout against a request to "do everything at once"

## The scenario: Harlow Community Partners

Harlow Community Partners is a nonprofit running after-school tutoring programs, a food-assistance program, and a donor-funded scholarship fund, all tracked today in spreadsheets. Harlow already uses the Nonprofit Success Pack (NPSP) for donor and gift tracking, which works well for fundraising, but program staff have no system at all for tracking which children attend which tutoring cohort, who received food assistance and when, or which scholarship recipients met their renewal requirements. The executive director's request — "track everything about everyone in one system" — is reasonable as a goal and far too broad as a starting requirement.

## Two different data models sharing some of the same people

NPSP's donor model is built around **Contacts**, **Accounts** (including Household Accounts), **Opportunities** used for gifts, and recurring donation tracking — a model shaped around the question "who gave what, when, and are they likely to give again." Program delivery is a genuinely different question: "who received what service, in what cohort or engagement, and did the service actually get delivered and produce the intended outcome." Salesforce's open-source **Program Management Module (PMM)**, built to extend NPSP, adds the objects this second question needs — Programs, Program Engagements (tracking a specific person's or cohort's participation), and Service Deliveries (tracking individual instances of service, like one food-assistance handout or one tutoring session) — rather than trying to force program tracking into the gift-and-donation shape NPSP was built for.

The same real person can appear on both sides of this model at once: a tutoring parent might also be a small recurring donor, and a scholarship recipient's mother might also volunteer at the food pantry. Because PMM is built to sit on top of NPSP's existing Contact and Account model rather than creating a separate, disconnected set of "program people," Harlow can see that overlap directly — which matters both for honest impact reporting (a donor who is also a client isn't double-counted as two separate "reach" numbers by accident) and for respecting the person's dignity (the food-pantry program doesn't need to know someone is a major donor to serve them appropriately, but the organization overall benefits from knowing it's the same person).

## Cohorts change the object design, not just the reporting

Harlow's tutoring program runs by cohort — twelve children assigned together to a ten-week session with one tutor. A one-to-one case model (one record per child, unrelated to any group) can't represent "this child's attendance this week" against "this cohort's overall session," because nothing links the two. **Program Engagements** are designed to represent participation at either the individual or cohort level, and **Service Deliveries** record each specific instance of service against that engagement — so a single Service Delivery can represent "cohort attendance for week 4," while still rolling up to each individual child's own engagement record for that child's own attendance history. Treating cohort tracking as "basically the same as one-on-one case tracking, just with more people" undercounts what the data model actually needs to represent, and Harlow's design has to decide this explicitly before building out either program.

## Scoping a phased rollout against "do everything at once"

The executive director's full wish list — tutoring, food assistance, and scholarships, all live simultaneously — is a reasonable long-term goal and a bad first phase. Each program has its own service-delivery shape (session attendance vs. a one-time handout vs. an annual renewal check), and building all three simultaneously means debugging three new object configurations and three staff teams' workflows at once, with no working example to learn from before the next one starts. The architecturally defensible answer is a phased rollout — tutoring first (it has the clearest cohort structure to validate PMM's object model against), then food assistance, then scholarships — with each phase's lessons (what reports program staff actually used, what fields went unfilled because no one needed them) feeding into the next phase's design rather than guessing all three up front.

## Key terms

| Term | Meaning |
|---|---|
| Nonprofit Success Pack (NPSP) | Salesforce's foundational nonprofit data model for donor, gift, and household management |
| Program Management Module (PMM) | An open-source extension to NPSP adding Programs, Program Engagements, and Service Deliveries for tracking program/service delivery |
| Program Engagement | A record of a specific person's or cohort's participation in a program |
| Service Delivery | A record of one specific instance of a service being delivered, rolling up to a Program Engagement |
| Cohort-based service model | A service-delivery design where participation and attendance are tracked at the group level as well as the individual level |

## Lab

Harlow's scholarship fund wants to track whether each recipient maintains the GPA required to keep their scholarship, reviewed once per semester. Write a short design note: (1) is a semester GPA check better modeled as a recurring Service Delivery or as a different kind of record entirely, (2) what happens to a recipient's scholarship Program Engagement if two consecutive GPA checks fail, and (3) one reason this scholarship program's design is simpler than the tutoring cohort case, and one reason it might still be harder in a different respect.

## Check yourself

Can you explain why program-service delivery and donor/gift tracking need two different object models even though they can share the same Contact record? Can you state, without notes, why a cohort-based program can't be adequately represented by a plain one-record-per-person case model?
