# Lesson 7 — ETL and ELT Lineage

**Chapter 2 · Tracing Data · Lesson 7 of 25**

## What you'll learn

- The difference between ETL and ELT, and why it's not just a reordering of letters
- How lineage gets captured differently in each pattern — bolted on vs. built in
- Why modern ELT tools can generate lineage graphs as a byproduct of the DAG itself
- How this connects to what you already saw in Lesson 6: extraction is step one of both patterns

## ETL: transform before it lands

In **ETL** (Extract, Transform, Load), raw data is pulled from the source, transformed in a dedicated engine — historically SSIS, Informatica, or a hand-rolled script — and only the finished, transformed result is loaded into the warehouse. The warehouse never sees the raw shape of the data; by the time it arrives, it's already been cleaned, joined, and reshaped.

Lineage in ETL lives in the orchestration tool's job definitions: "Job 14 reads `raw.orders`, joins it to `raw.customers`, writes `dim_customer`." If that job isn't documented, or the orchestration tool doesn't expose its own dependency graph, the lineage has to be reconstructed by reading the job's code — which is exactly the kind of manual, error-prone work this course exists to replace with something more reliable.

## ELT: land first, transform in place

In **ELT** (Extract, Load, Transform), raw data is pulled and loaded into the warehouse or lake *unchanged* — then transformed where it sits, using SQL (or a SQL-generating tool like dbt) running directly against the warehouse's own compute. Cheap cloud storage and elastic compute are what made this pattern practical: you no longer have to decide what to keep and what to discard before you've even looked at the data.

Lineage in ELT is a natural byproduct of the transformation code itself. A dbt model that references `stg_orders` and `stg_customers` to build `fct_orders` has declared its own lineage edges in plain SQL — the tool can parse those references and draw the dependency graph automatically, no separate documentation step required. This is the same principle the dbt course in this catalog covers in depth for that one tool; here, the point is the pattern, not any single product.

## Why this distinction matters for lineage specifically

| | ETL | ELT |
|---|---|---|
| Where transformation happens | Dedicated engine, before loading | Inside the warehouse, after loading |
| Where lineage lives | Orchestration job definitions (often undocumented) | Transformation code itself (often auto-parseable) |
| Typical lineage capture | Manual, bolted on | Often automatic, built in |
| Raw data preserved? | Rarely — only the transformed result lands | Yes — raw data lands before any transformation |

Neither pattern is "better" for every situation — ETL still makes sense when a source system can't tolerate landing raw, unfiltered data (PII that must be masked before it lands anywhere, for instance). But if you're choosing a modern stack and lineage visibility is a priority, ELT's byproduct lineage is a real, practical advantage, not just a trend.

```
ETL:  raw.orders --(SSIS job)--> staging.orders_clean --(SSIS job)--> dim_orders
ELT:  raw.orders --(load, as-is)--> stg_orders --(dbt model)--> int_orders_joined --(dbt model)--> fct_orders
```

## Key terms

| Term | Meaning |
|---|---|
| ETL | Extract, Transform, Load — data is transformed before it lands in the warehouse |
| ELT | Extract, Load, Transform — raw data lands first, then is transformed in place |
| Byproduct lineage | Lineage derived automatically by parsing transformation code, rather than documented separately |
| Orchestration tool | The system (SSIS, Informatica, Azure Data Factory, dbt) that runs and sequences transformation jobs |

## Lab

Look at one pipeline you know. Is it ETL or ELT? If you're not sure, ask: does raw, untransformed data ever land anywhere you can query it? If yes, it's (at least partly) ELT. Then ask: could you reconstruct that pipeline's lineage just by reading its transformation code, or would you need to go read job configuration separately? That answer tells you whether its lineage is a byproduct or a bolted-on afterthought.

## Check yourself

Can you explain, in your own words, why ELT tends to produce lineage "for free" in a way ETL usually doesn't — and name one situation where ETL's land-after-transform approach is still the right call?
