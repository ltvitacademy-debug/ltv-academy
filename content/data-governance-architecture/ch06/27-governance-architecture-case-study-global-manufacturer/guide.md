# Lesson 27 — Governance Architecture Case Study: Global Manufacturer

**Chapter 6 · Applied Architecture · Lesson 27 of 30**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional manufacturing scenario
- Why a federated operating model, not a centralized one, usually fits a multi-plant, multi-acquisition manufacturer
- How governance architecture has to bridge plant-floor (OT) data and corporate (IT) data as one coherent system
- How strategy, roadmap, ADRs, and a review board come together in a single real sequence, not four separate projects

## The scenario (fictional, illustrative)

**Castellan Industrial Group** is a fictional multinational manufacturer — roughly twenty plants across North America, Europe, and Asia-Pacific, several added through acquisition over the past decade. Each plant runs its own mix of production systems, and three different regional divisions each run a different ERP inherited from the company they used to be. The board has asked for one consistent, trustworthy view of production cost and quality across every plant. Today, nobody can produce it without a month of manual reconciliation. This is a realistic composite of the kind of problem this course exists to solve — not a real company's data.

## Applying the course, chapter by chapter

**Chapter 1 (Foundations):** The team starts with the governance capabilities map (Lesson 4) and finds the gaps are uneven by region — the original home-market plants have reasonably mature data ownership, while the three acquired divisions have almost none. The reference architecture (Lesson 3) has to accommodate that unevenness honestly rather than assuming a clean slate.

**Chapter 2 (Operating Models):** A fully centralized model (Lesson 6) is rejected — no central team can realistically own data definitions for twenty plants running three different ERPs on day one. Using the selection criteria from Lesson 11, Castellan adopts a federated model (Lesson 7): central standards for a short list of enterprise-critical metrics (production cost, quality defect rate, on-time shipment), with each plant retaining stewardship over its own operational detail.

**Chapter 3 (Metadata and Catalog Architecture):** The hardest technical problem isn't any single ERP — it's that plant-floor production data (OT) and corporate financial data (IT) have never shared a catalog. The team builds an enterprise metadata architecture (Lesson 12) that treats both as first-class, and uses catalog integration across platforms (Lesson 15) to connect each plant's local systems to one enterprise catalog, rather than forcing every plant onto identical software first.

**Chapter 4 (Security and Platform Architecture):** Plant engineering systems and corporate finance systems have very different risk profiles, so the security architecture (Lesson 17) keeps OT and IT access control (Lesson 18) clearly separated even as metadata connects them. The platform decision — one enterprise catalog and governance layer that can ingest from all three legacy ERPs, rather than standardizing on any single ERP vendor's native tools — gets written up as its own ADR (Lesson 25), because it's exactly the kind of expensive, hard-to-reverse choice that needs a recorded reason.

**Chapter 5 (Governance Strategy):** The strategy (Lesson 22) ties the whole effort to the board's actual ask — one trustworthy cross-plant production view — rather than "better governance" in the abstract. The roadmap (Lesson 23) starts with two pilot plants as a quick win, with full twenty-plant rollout as a Next/Later foundational investment. A review board (Lesson 26) is chartered with regional representation so no single division's interests dominate.

## The result

Eighteen months in, Castellan's board sees one production-cost figure per plant, reconciled against one enterprise catalog — not because every plant was forced onto identical systems, but because the federated model gave each plant room to keep its own tools while agreeing to one shared definition for the handful of metrics that actually mattered to the board.

## Key terms

| Term | Meaning |
|---|---|
| OT (operational technology) data | Data from plant-floor production and equipment systems, distinct from corporate IT systems |
| Federated governance | Central standards for critical shared metrics, with local stewardship over everything else |
| Enterprise metadata architecture | A metadata design that treats both OT and IT data as first-class, connected sources |

## Lab

Sketch Castellan's federated model at a smaller scale: pick three fictional plants (or three real departments at your own organization), name one shared metric all three must agree on, and name one thing each should be free to keep managing its own way. Then note which platform or integration decision from your sketch would deserve its own ADR.

## Check yourself

Can you explain, from memory, why Castellan chose a federated model instead of a centralized one, and what made the platform choice in Chapter 4 significant enough to warrant its own ADR?
