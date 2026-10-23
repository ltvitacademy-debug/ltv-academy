# Lesson 19 — Identification & Reconciliation Rules

**Chapter 5 · Data Quality & Governance · Lesson 19 of 26**

## What you'll learn

- What an Identification Rule actually decides, and why it's the single biggest lever on duplicate rate
- Why "unique" has to be defined per CI class, not assumed from a display name
- What a Reconciliation Rule decides, and how it differs from an Identification Rule
- The authoritative source concept, and why "most recent write wins" is a bad default

## What makes a CI unique

Every CI arrives in the CMDB from somewhere — Discovery, an import from an asset management tool, a manual entry by a technician. The CMDB has no way of knowing on its own whether a server reported by this week's Discovery scan is the same physical machine as the one a technician entered by hand last month, unless something tells it how to recognize a match. That's the job of an **Identification Rule**: a per-CI-class definition of which attributes, in combination, prove two incoming records describe the same real-world asset.

A weak identification rule might try to match on Name alone — but "WEB-PROD-01" is a display label a human typed, not a stable identifier. A real identification rule for `cmdb_ci_server` typically defines an **independent** identifier (an attribute reliable enough on its own, like a hardware serial number) and one or more **dependent** identifiers (attributes that only prove a match in combination, like Host Name together with Domain — a hostname alone isn't unique across domains, but the pair usually is). Get this rule right, and the same server reported from two different sources lands on one CI record. Get it wrong, and it lands on two.

## What a Reconciliation Rule decides instead

Identification and Reconciliation solve two different problems, and the two get conflated constantly. Identification decides *whether* two incoming records are the same CI. Reconciliation decides, once they're confirmed to be the same CI, *which source's value wins* when two sources disagree on a specific field.

This matters because multiple sources routinely report conflicting data about the same real asset. Discovery might report OS version 2022 on a Windows server; a manual CSV import done six months ago might still say 2019. Without a reconciliation rule, the CMDB has to fall back on some default — and the dangerous default is "whichever source wrote last wins," which lets a stale manual import silently overwrite a correct, freshly-discovered value, or vice versa.

## The authoritative source concept

A well-implemented CMDB avoids that default by designating, per field (not just per CI class), which data source is considered authoritative. OS version and installed software are the kind of fields where Discovery — which inspects the actual running machine — should usually be authoritative over a manual import. But a field like Business Owner or Cost Center isn't something Discovery can observe at all; a CMDB data steward's manual entry, or a feed from an asset/HR system, is rightly authoritative there instead. The reconciliation rule encodes that decision once, so it's enforced automatically every time sources disagree, instead of being re-litigated by whichever system happens to write to the record most recently.

## Why this pairing matters for everything downstream

Loose or missing Identification Rules are the leading real-world cause of duplicate CIs, which Lesson 20 tackles directly. And missing Reconciliation Rules are a leading cause of "correct data getting silently overwritten by bad data," which is exactly what a Correctness and Compliance score on the Health Dashboard from the previous lesson is designed to catch. These two rule types are the actual mechanism behind two of that dashboard's four scored dimensions.

## Key terms

| Term | Meaning |
|---|---|
| Identification Rule | Per-CI-class definition of which attributes prove two records are the same real-world asset |
| Independent identifier | An attribute reliable enough on its own to prove a match (e.g. serial number) |
| Dependent identifier | An attribute that only proves a match in combination with another (e.g. Host Name + Domain) |
| Reconciliation Rule | Determines which data source's value wins on a specific field when sources disagree |
| Authoritative source | The data source designated as trustworthy for a given field, enforced automatically |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why can a server's Identification Rule be working correctly while its Reconciliation Rule is still producing wrong data on the CI — and why can't one rule type substitute for the other?
