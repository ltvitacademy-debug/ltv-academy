# Lesson 3 — Business vs. Technical Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

The exact same flow of data — from a source system through
transformations to a final report — can be shown at two very different
altitudes, and conflating them is a common mistake. This lesson covers
business lineage versus technical lineage, and who each one is actually
for.

## S2 · STEPS CARD (business lineage, for the stakeholder)

Business lineage describes that journey in terms a non-technical
stakeholder already understands — domain concepts, system names,
plain-language steps. "Customer Lifetime Value on the executive
dashboard comes from the CRM and the billing system, combined in the
data warehouse." No tables, no column names, no code — just enough to
answer where does this come from and can I trust it.

## S3 · STEPS CARD (technical lineage, for the engineer)

Technical lineage describes the same journey at the level engineers
actually need to debug or change it — specific tables, specific
columns, specific transformation logic, specific job names.
"dbo.CLV_Summary.LifetimeValueUSD is computed in sp_CalculateCLV by
summing Billing.Invoices.AmountPaid joined to CRM.Accounts on AccountID,
filtered to Status equals Active." Precise enough to trace a bug,
meaningless to most business stakeholders.

## S4 · STEPS CARD (why not pick one)

Picking only technical lineage leaves business stakeholders unable to
answer basic trust questions themselves — every "where does this number
come from" question becomes a ticket to the data team. Picking only
business lineage leaves engineers without enough detail to perform real
impact analysis — "the warehouse" isn't specific enough when one column
breaks. Mature practices maintain both over the same underlying journey.

## S5 · STEPS CARD (what each view answers)

The two views answer different questions. Business lineage answers "can
I trust this number, and roughly where is it from" — what an executive
or auditor actually asks. Technical lineage answers "exactly what breaks
if I change this column" — what an engineer writing SQL actually asks.
Same journey, different altitude, different reader.

## S6 · STEPS CARD (the quick test)

A quick test: if a diagram's boxes are named things like CRM, Billing
System, and Executive Dashboard, you're looking at business lineage. If
the boxes are named dbo.Accounts, stg.Invoices_Clean, and
sp_CalculateCLV, you're looking at technical lineage. Neither is better
— they're built for different readers, from the same underlying truth.

## S7 · OUTRO CARD

Next up: column-level versus table-level lineage — a second axis of
granularity that applies within technical lineage itself, once you're
already looking at the detailed, object-level view.
