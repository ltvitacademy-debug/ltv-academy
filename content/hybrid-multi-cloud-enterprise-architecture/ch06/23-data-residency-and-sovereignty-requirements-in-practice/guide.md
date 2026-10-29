# Lesson 23 — Data Residency and Sovereignty Requirements in Practice

**Chapter 6 · Data Architecture Across Hybrid and Multi-Cloud · Lesson 23 of 32**

## What you'll learn

- The real difference between **data residency** (where data is
  physically stored) and **data sovereignty** (whose laws govern it
  and who can be compelled to hand it over)
- Why GDPR's restrictions on moving EU personal data outside the
  EU/EEA are a real, concrete architecture driver — not a hypothetical
  compliance checkbox
- What the Schrems II ruling actually did, and why it mattered for
  EU data sitting with US-headquartered cloud providers
- Real examples of other data-localization regimes (Russia, China) and
  the real "sovereign cloud" products built to address this (Azure's
  EU Data Boundary, AWS European Sovereign Cloud, Azure/AWS government
  clouds)
- How these requirements translate into actual architecture: regional
  data partitioning, in-region key management, and per-region
  deployments of the same workload

## Residency vs. sovereignty: two different questions

These two terms get used loosely, but they answer different
questions:

- **Data residency** asks: *in which physical country or region is
  this data stored?* It's a location fact.
- **Data sovereignty** asks: *whose laws apply to this data, and
  which government or legal process can compel access to it?* A
  dataset can be physically stored in Germany (good residency) and
  still be legally subject to US law if the company storing it is a
  US company subject to US legal process that reaches data regardless
  of where it's physically kept. Residency is about geography;
  sovereignty is about jurisdiction and legal reach.

This distinction matters because satisfying residency alone — just
picking the right region in the cloud console — does not automatically
satisfy sovereignty concerns, which is exactly why "sovereign cloud"
products exist (more on those below).

## GDPR as a real, working example

The EU's General Data Protection Regulation is the clearest real-world
driver of this entire lesson. GDPR restricts transferring the personal
data of EU residents outside the EU/EEA unless specific legal
safeguards are in place — adequacy decisions (the EU has decided a
given country's protections are equivalent), Standard Contractual
Clauses, or binding corporate rules. This is not a hypothetical: it is
an active, enforced requirement that directly shapes where EU customer
data can be processed and stored.

**Schrems II** (the 2020 Court of Justice of the European Union
ruling) is the concrete event that made this unavoidable for anyone
relying on US cloud infrastructure for EU data. The ruling invalidated
the EU-US Privacy Shield framework, on the grounds that US surveillance
law gave US authorities access to EU personal data in ways incompatible
with EU protections — even when that data was physically stored in an
EU data center, because the sovereignty question (US legal reach over
a US company) was separate from the residency question (where the
servers sat). The practical result: companies had to re-evaluate how
EU personal data flowed to US-headquartered cloud providers, and
cloud providers responded by building region-local, and in some cases
sovereignty-specific, offerings.

## Other real data-localization regimes

GDPR isn't the only one, and it's worth knowing a few others actually
exist and are enforced:

- **Russia's data localization law** requires that personal data of
  Russian citizens be initially collected and stored on servers
  physically located within Russia.
- **China's Cybersecurity Law and Personal Information Protection Law
  (PIPL)** impose data localization requirements and a formal
  cross-border transfer security assessment for certain categories of
  data leaving the country.

These are real, currently enforced legal regimes — not edge cases —
and any architecture serving customers or operating entities in these
jurisdictions has to account for them directly.

## Real sovereign-cloud products built to address this

Cloud providers have built actual products in direct response to these
requirements:

- **Microsoft's EU Data Boundary** commits that, for in-scope
  Microsoft cloud services, EU customer data and its processing stay
  within the EU, addressing both residency and much of the sovereignty
  concern for European customers.
- **AWS European Sovereign Cloud** is a distinct AWS infrastructure
  being built specifically to operate independently within the EU,
  with EU-based operational control, for customers with the strictest
  sovereignty requirements.
- **Government-specific clouds** — AWS GovCloud (US) and Azure
  Government — are the longer-standing equivalent for US government
  and regulated-sector workloads, isolating infrastructure and
  personnel to meet specific government compliance regimes.

## What this means for your architecture

Residency and sovereignty requirements aren't a policy document you
file away — they force concrete architecture decisions:

- **Data must be pinned to a region, not just "a cloud."** Choosing
  "Azure" isn't enough; the specific region (and sometimes the
  specific sovereign offering) has to be chosen deliberately and kept
  that way.
- **Processing, not just storage, may need to stay in-region.** Some
  regimes care about where computation happens on the data, not only
  where it's at rest — which affects where compute runs, not just
  where a database lives.
- **Encryption key residency matters.** Customer-managed keys are
  often required to be generated, stored, and used only within the
  required region, so that even the storage layer itself can't be
  decrypted from outside it.
- **Per-region deployments of the same workload, not one global
  instance.** Rather than one logical service reading data from
  wherever it happens to be, the architecture typically needs the
  same application deployed independently per region, each one
  bound to its own in-region data.
- **Only aggregated or anonymized data crosses borders.** Central
  reporting or analytics across regions usually works by pulling
  already-aggregated, non-personal summaries upward — the underlying
  personal records never leave their required jurisdiction.

## Key terms

| Term | Meaning |
|---|---|
| Data residency | The physical country or region where data is stored |
| Data sovereignty | Whose laws govern data and which legal process can compel access to it, regardless of physical location |
| Schrems II | The 2020 EU court ruling that invalidated the EU-US Privacy Shield, forcing re-evaluation of EU personal data flowing to US cloud providers |
| Sovereign cloud | A cloud offering (e.g. Microsoft's EU Data Boundary, AWS European Sovereign Cloud) built specifically to keep both data and operational control within a required jurisdiction |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: what
is the actual difference between data residency and data sovereignty,
and why did the Schrems II ruling matter even for EU data that was
physically stored inside the EU?
