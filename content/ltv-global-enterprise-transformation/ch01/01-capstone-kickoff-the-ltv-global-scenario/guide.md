# Lesson 1 — Capstone Kickoff: The LTV Global Scenario

**Chapter 1 · Scenario and Requirements · Lesson 1 of 33**

## What you'll learn

- The full LTV Global Industries scenario you'll design against for the rest of this capstone
- Why a capstone needs one large, consistent fictional company instead of several small examples
- The thirteen design areas you're responsible for across this course, and where each one lands
- How the Architecture Review Board (ARB) defense in Chapter 6 is the actual deliverable this whole course builds toward

## Meet LTV Global Industries

Every architecture course so far in this path — data architecture, large data volumes, security and sharing, identity, integration, release governance, architecture review boards, tradeoffs — taught its domain mostly in isolation, one case study at a time. A real Technical Architect engagement never arrives in isolated pieces. It arrives as one company, with one messy history, asking for one coherent design that satisfies every domain at once, without the domains contradicting each other. This capstone is built around a single fictional company, **LTV Global Industries**, that you'll carry through all 33 lessons and all six chapters.

LTV Global is a multinational manufacturer and distributor of industrial equipment — heavy machinery and the replacement parts that keep it running. Headquartered in Atlanta, Georgia, LTV Global grew partly through acquisition and now operates across three regions: **North America** (headquarters, largest region), **EMEA** (UK, Germany, France — subject to GDPR), and **APAC** (Australia, Singapore, Japan — the newest and fastest-growing region). The company is organized into four business units: **Equipment Manufacturing & Sales**, **Parts & Aftermarket Distribution** (by far the highest transaction volume), **Field Service & Support**, and **Equipment Financing**.

## The scale that makes this a Technical Architect problem

LTV Global has roughly **10,000 internal users** — sales reps, service technicians, dealer-support agents, finance and operations staff, and call-center agents, spread across all three regions and all four business units. On the customer side, the company has thousands of **dealer accounts** (businesses that resell equipment and parts) and **millions of end-customer records** — individual and business owners of LTV Global equipment, each of whom can own multiple pieces of equipment over time. The business also runs **multiple legacy systems** that predate any Salesforce investment, has **complex security requirements** driven by financial and personally identifiable data, and depends on **high-volume integrations** that have to keep running correctly every single day. Every one of those facts — scale of users, scale of records, legacy debt, security complexity, integration volume — is exactly the kind of fact that turns a design problem into an architecture problem instead of an admin configuration task.

## What you're actually designing

Across this capstone, you are the Technical Architect responsible for thirteen design areas, each of which gets dedicated lessons later in the course: Salesforce application architecture, data architecture, security architecture, sharing architecture, identity architecture, integration architecture, API architecture, environment strategy, DevOps strategy, migration strategy, backup/recovery considerations, monitoring strategy, and a governance model. None of these are independent exercises — a decision you make about data architecture in Chapter 2 will constrain what's realistic for integration architecture in Chapter 3, and every decision you make anywhere has to survive being defended, with its rejected alternatives explained, in front of the Architecture Review Board in Chapter 6.

## How the course is structured

Chapter 1 (this chapter) establishes the scenario itself: requirements, stakeholders, the current-state mess you're inheriting, the target-state vision, and the risks already visible before you've designed anything. Chapter 2 builds the core Salesforce architecture: application, data, large data volumes, security/sharing, and identity. Chapter 3 extends that into integration, API architecture, and the customer-facing portal, plus the nonfunctional requirements that constrain all of it. Chapter 4 covers how the solution actually gets delivered — environments, CI/CD, migration, backup/recovery/monitoring, and governance. Chapter 5 turns everything into the deliverables a real engagement produces: diagrams, a data model, a risk register, decision records, a roadmap, and a technical architecture document. Chapter 6 is the defense itself — the moment every other chapter was preparing you for.

## Key terms

| Term | Meaning |
|---|---|
| LTV Global Industries | The fictional multinational equipment manufacturer/distributor this entire capstone designs for |
| Business unit (BU) | One of LTV Global's four operating divisions: Manufacturing & Sales, Parts & Aftermarket, Field Service, Financing |
| Region | One of LTV Global's three operating geographies: North America, EMEA, APAC |
| Architecture Review Board (ARB) | The panel this capstone's Chapter 6 defense is built around, evaluating the full design before it can proceed |
| Design area | One of the thirteen named architecture responsibilities this capstone assigns across Chapters 2-4 |

## Lab

Before any design work begins, write a one-paragraph "elevator statement" of the LTV Global engagement, as if you were explaining it to a new team member who has never seen this scenario: who the company is, roughly how big it is, and why its size and legacy footprint make this a Technical Architect-level problem rather than something a single admin could configure in a weekend. You'll reuse this paragraph, lightly edited, as the opening line of your Chapter 5 technical architecture document — so it's worth getting right now.

## Check yourself

Can you name LTV Global's three regions and four business units from memory? Can you explain, using LTV Global's own numbers (10,000 users, millions of customer records, multiple legacy systems), why this scenario specifically requires Technical Architect-level design rather than ordinary admin configuration?
