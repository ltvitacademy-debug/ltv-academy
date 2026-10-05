# Lesson 3 — MDM Architecture Styles

**Chapter 1 · MDM Foundations · Lesson 3 of 25**

## What you'll learn

- The four architecture styles organizations commonly use to implement MDM
- What changes, and what stays in place, under each style
- The core trade-off: how much disruption to source systems vs. how much central control you get
- How to think about which style fits a given organization's starting point

## The core trade-off

Every MDM implementation has to answer one structural question: **where does the trusted master data actually live, and do source systems keep writing to their own copies, or do they give that up?** The four styles below are commonly described as a spectrum from "barely touch anything" to "one system owns everything," and most real implementations land somewhere on that spectrum rather than at a pure extreme.

## The four styles

**Registry style.** The lightest touch. Source systems keep their own data exactly as it is. A thin central registry stores only the matching keys and cross-reference links — "Customer C-5521 in the CRM is the same person as Customer 88213 in billing." Nothing physically moves; the registry just answers "who else is this?" Low disruption, low cost to implement, but it doesn't give you one unified, queryable golden record — just a map between records.

**Consolidation style.** Master data is pulled from source systems (usually in batch) into a central store, matched and merged there, and used for reporting, analytics, and downstream consumption. The central store is not written back to the sources — it's a one-way mirror, good for a unified view, not for correcting the sources themselves.

**Coexistence style.** A central master store exists and is kept in sync with source systems in both directions: a change in a source system flows into the central store, and a correction made centrally can flow back out. This gives you both a usable central view and still lets source systems operate semi-independently — at the cost of more integration work to keep everything synchronized.

**Centralized (transaction hub) style.** The most control. One central system becomes the actual system of record — all creates and updates to master data happen there first, and source systems read from it rather than maintaining their own separate copies. Highest control and consistency, but also the highest disruption: existing applications typically need to be re-pointed at the hub.

## Matching the style to the organization

Lower-disruption styles (registry, consolidation) are common first steps — they deliver a unified view of a problem domain (say, customer) without ripping out existing systems. Higher-control styles (coexistence, centralized) are usually adopted once an organization has already proven the value of a unified view and is ready to invest in making source systems depend on it. Jumping straight to a centralized transaction hub before anyone trusts the matching rules behind it (Chapter 2) is a common way MDM programs stall — the architecture style is a deployment decision, but the matching and governance underneath it (covered through the rest of this course) has to be solid first.

## Key terms

| Term | Meaning |
|---|---|
| Registry style | A thin central layer of cross-reference links; source data stays in place |
| Consolidation style | Master data is merged into a central store for reporting, not written back to sources |
| Coexistence style | A central store synced bidirectionally with source systems |
| Centralized / transaction hub style | One central system is the system of record for all master data writes |

## Lab

Think of one master data domain in your own organization (or a past employer). Which of the four styles, if any, is closest to how it's actually managed today? If none fit cleanly, describe the gap — most real-world setups are a messy in-between, which is itself useful to name.

## Check yourself

Can you describe, for each of the four styles, whether source systems keep writing to their own copies or give that up — and explain why jumping straight to a centralized hub before matching rules are proven is a common way programs stall?
