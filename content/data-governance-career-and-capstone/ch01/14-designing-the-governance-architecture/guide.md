# Lesson 14 — Designing the Governance Architecture

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 14 of 35**

## What you'll learn

- The target-state architecture for Summit, connecting Atlas, Beacon,
  Comet, and Harbor through one governed path
- Why Snowflake, Purview, and Power BI are the right platform choice
  for LTV Global specifically, not a generic recommendation
- How the architecture's zones map directly onto the Lesson 12
  operating model's layers
- Where Lesson 13's two AI pilots actually plug into this diagram

**Reminder:** LTV Global and the architecture below are fictional and
illustrative, invented for this capstone.

## From "intended" to designed

Lesson 1 described Summit as "the intended governed analytics layer,"
with almost nothing feeding it in a trustworthy, documented way.
Thirteen lessons of deliverables — CDEs, quality rules, lineage,
authoritative sources, access policy, an AI checklist — now need an
actual architecture to run on, not just a name.

## The target-state architecture

```
ATLAS + BEACON + COMET + HARBOR  (source systems)
   -> ELT jobs ->  RAW ZONE (Snowflake, 1 table per source)
   -> Lesson 7 quality gate ->  CONFORMED ZONE (per CDE)
   -> Lesson 9 survivorship ->  GOLDEN ZONE (Customer, etc.)
   -> MICROSOFT PURVIEW  (catalog, lineage, classification tags
                           from Lesson 6, access policy from Lesson 10)
   -> POWER BI reports (governed datasets)
   -> AI/ML models (Lesson 13 — forecasting, support assistant)
```

## Why this platform choice for LTV Global specifically

This isn't a generic "use Snowflake" recommendation — it fits three
things already true about LTV Global:

- **Atlas is SQL Server and the company already reports in Power BI.**
  A Microsoft-adjacent stack (Snowflake connects cleanly to both,
  Purview is Microsoft's own catalog) avoids forcing a second BI tool
  on business units that already know one.
- **Three of four sources are SaaS, not on-prem.** Beacon and Comet
  already live outside LTV Global's data center; a cloud warehouse
  matches where the data already is, rather than pulling SaaS data
  back on-prem just to centralize it.
- **The governance program needs a catalog that enforces, not just
  lists.** Purview carries Lesson 6's classification tags and Lesson
  10's access policy as metadata attached to the actual tables in
  Snowflake — a wiki-style catalog disconnected from the warehouse
  would drift out of date the way the pre-program documentation
  already had.

## Mapping zones to the operating model

Lesson 12's federated hybrid model isn't abstract once it has an
architecture to attach to:

| Architecture zone | Who owns it |
|---|---|
| Raw zone (per source) | Whichever domain owner's system feeds it — Renata Silva for Beacon's Customer data, for example |
| Conformed zone (per CDE) | The CDE's steward — Sam Okonjo for `OrderTotal`, Diego Marsh for `SKU` |
| Golden zone (Customer) | Jointly owned per Lesson 9's decision, reviewed at the monthly council |
| Purview catalog standards | Marcus Ibe's governance office |
| Consumption (Power BI, AI/ML) | Business unit consumers, bound by Lesson 10's access policy |

## Where Lesson 13's AI pilots plug in

Both AI pilots from Lesson 13 are consumption-layer citizens, not a
separate system: the demand-forecasting model reads from the
conformed zone (already past Lesson 7's quality gate), and the
support assistant — once its training data is scrubbed per Lesson
13 — reads from a governed extract of ticket data, not raw Beacon
and Comet tables directly. Neither model gets a side door around the
architecture.

## Key terms

| Term | Meaning |
|---|---|
| Reference architecture | A target-state diagram showing how data should flow through systems, not just how it does today |
| Conformed zone | A warehouse layer where source data has been standardized to one shape per CDE and passed a quality gate |
| Data catalog | A system that records what data exists, where, and under what classification and access rules — attached to the actual tables, not a separate document |

## Lab

Draw your own three-zone diagram (raw, conformed, golden or
equivalent) for one CDE from your own Lesson 2 or 3 work: name the
source system, the quality gate it must pass, and who owns each zone,
following the pattern in the table above.

## Check yourself

- Why is Snowflake-plus-Purview-plus-Power BI the right choice for LTV
  Global specifically, rather than a generic recommendation?
- Which architecture zone does Lesson 9's golden Customer record live
  in, and why does it need joint ownership?
- How do Lesson 13's two AI pilots connect to this architecture
  without a side door around it?
