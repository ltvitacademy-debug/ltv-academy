# Lesson 32 — Purview and Compliance Features Overview

**Chapter 6 · Governance Workflows · Lesson 32 of 35**

## What you'll learn

- How the Microsoft Purview portal is organized into separate solution families, and where data governance sits among them
- The names of Purview's compliance-adjacent solutions, at an orientation level — not how to configure or rely on any of them
- What the Compliance posture status card on the portal home page actually reports on
- Why this course stays scoped to data governance, and doesn't teach compliance configuration

## One portal, several solution families

Everything this course has covered so far — the Data Map, collections, classifications, the catalog, lineage, policies, and workflows — lives inside the same Microsoft Purview portal as a much wider set of solutions most organizations never touch unless they have a dedicated compliance or security team running them. The portal's home page makes that breadth visible immediately: solution cards for things like Data Catalog and Data Map sit right next to cards for Information Protection, Data Loss Prevention, and Insider Risk Management.

![Screenshot of the Microsoft Purview portal home page, showing a hero banner and solution cards for Data Catalog, Information Protection, Data Loss Prevention, Insider Risk Management, and AI Hub, plus related portals like Microsoft Priva and Microsoft Entra.](/courses/microsoft-purview/ch06/32-purview-and-compliance-features-overview/purview-portal.png)

*One shared home page — data governance is one neighborhood in a much larger portal.*

## Governance is one card among several

Zooming in on just the solution cards makes the boundary clearer: Data Map and Data Catalog are the two this course has spent six chapters on. Information Protection, Data Loss Prevention, and Insider Risk Management are different solutions entirely, with their own setup, their own licensing, and their own specialists.

![Close-up screenshot of Microsoft Purview portal solution cards: Data Map, Data Catalog, Information Protection, Data Loss Prevention, and Insider Risk Management.](/courses/microsoft-purview/ch06/32-purview-and-compliance-features-overview/purview-portal-solution-cards.png)

*Data governance, in context — one card among several genuinely different solution families.*

The full **Solutions** page groups everything into four sections: **Core** (setup and settings shared across solutions), **Risk & Compliance** (things like Compliance Manager, eDiscovery, and Records Management), **Data Governance** (what this course teaches), and **Data Security** (Data Loss Prevention, Information Protection, Insider Risk Management).

![Screenshot of the Microsoft Purview portal Solutions page, showing Core, Risk & Compliance, Data Governance, and Data Security sections, each with several named solution cards.](/courses/microsoft-purview/ch06/32-purview-and-compliance-features-overview/purview-portal-solutions-page.png)

*Four sections, four different jobs — this course lives entirely inside one of them.*

## The Compliance posture status card

One home-page card is worth naming specifically, because it's easy to mistake for something this course covers: **Compliance posture status**. It reports a percentage score reflecting progress toward completing regulatory assessments, pulled from a separate solution called **Compliance Manager**.

![Screenshot of the Compliance posture status card in the Microsoft Purview portal, showing a gauge chart with a percentage score and a posture breakdown by assessment.](/courses/microsoft-purview/ch06/32-purview-and-compliance-features-overview/purview-portal-compliance-posture-status.png)

*A real score, from a real solution — just not the one this course teaches.*

This is a genuinely useful tool for the team responsible for it, but it's worth being precise about what it is and isn't: it's an assessment-tracking score for Compliance Manager, not a judgment this course makes about whether any specific organization is legally compliant with any specific regulation. Whether an organization's data handling actually satisfies GDPR, HIPAA, or any other regulatory framework is a legal determination, made by qualified compliance and legal professionals who know that organization's full context — not something a course, a dashboard score, or a generic checklist can determine on its own.

## Why this course stops here

This course teaches Microsoft Purview's **data governance** capabilities: understanding, organizing, and trusting an organization's data. Purview's compliance solutions — Data Loss Prevention, Information Protection, eDiscovery, Records Management, and others — are real, substantial products, each with enough depth to be its own separate course. Teaching them properly means teaching the regulatory context they exist to support, which is outside this course's scope and outside general IT training in general. If your work requires configuring any of those solutions, that's a conversation for your organization's compliance and legal teams — this lesson's job is just to make sure you know those solutions exist, roughly what they're for, and that they're a different skill set from the governance work this course has taught.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Purview portal | The shared home for data governance, data security, and risk-and-compliance solutions alike |
| Solutions page | The full catalog of Purview solutions, organized into Core, Risk & Compliance, Data Governance, and Data Security |
| Compliance Manager | The separate solution behind the Compliance posture status card's assessment score |
| Data governance (this course's scope) | Understanding, organizing, and trusting data — distinct from compliance, security, and legal determinations |

## Lab

Open (or picture, if you don't have access) the Microsoft Purview portal's Solutions page. Without configuring anything, write down one solution from each of the four sections — Core, Risk & Compliance, Data Governance, and Data Security — and one sentence on what you understand each one's job to be, based only on this lesson and the card's own name and description.

## Check yourself

Can you name the four sections the Purview Solutions page is organized into, and explain in one sentence why a high Compliance posture score isn't the same thing as a legal determination of regulatory compliance?
