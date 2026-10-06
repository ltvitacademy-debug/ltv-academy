# Lesson 3 — Purview Licensing and Environments

**Chapter 1 · Purview Foundations · Lesson 3 of 35**

## What you'll learn

- The difference between the free version and the enterprise version of Microsoft Purview data governance
- Exactly what each tier includes, feature by feature, straight from Microsoft's own comparison table
- How the upgrade flow actually looks inside the portal — the real screens, not just the policy
- Why "environment" means something different here than "region," and how the two interact
- How to tell, at a glance, which account type you're currently working in

## Free vs. enterprise: two real tiers, not a sales term

Unlike most SaaS products where "free tier" is marketing language for a trial, Microsoft Purview's free version of data governance is a real, ongoing, automatically-available instance — no setup, no credit card, no trial countdown. It lets an organization explore the Data Map and Unified Catalog's core capabilities against live Azure and Microsoft Fabric resources before committing to anything.

Here's Microsoft's own breakdown of what's in each:

| Capability | Free | Enterprise |
|---|---|---|
| Auto-discovery of Azure data sources (live view) | Yes | Yes |
| Collections and glossary terms to organize the data map | No | Yes |
| Access control | Role group only | Fine-grained, collection-level |
| Classification and glossary term application | Manual only | Automated |
| Descriptions, tags, contacts | Manual only | Manual and bulk |
| Microsoft Purview REST APIs | Data map creation only | Full access |
| Automated scans for the hybrid data estate | No | Yes |
| Workflows, business rules | No | Yes |
| Support tickets | Not available | Available |

The free version also caps you at **1,000 annotated assets** (an asset with a description or a classification added to it — whichever comes first, counted once), and supports only five data source types: Azure Blob Storage, Azure Data Lake Storage Gen2, Azure SQL Database, Azure subscriptions, and Microsoft Fabric. Everything from Chapter 2 onward in this course — registering arbitrary sources, scanning, scan rule sets — assumes the enterprise tier, because scanning itself is an enterprise-only capability.

## What "upgrading" actually means

"Upgrading" doesn't mean buying a new product — it means converting your existing free-tier Purview instance into an enterprise one, in place, with your data preserved. The trigger is a button inside the portal itself:

![Screenshot of the Microsoft Purview portal's top command bar and Settings pane, with the gear icon and "View all settings" link both highlighted in red boxes.](/courses/microsoft-purview/ch01/03-purview-licensing-and-environments/upgrade-button-settings.png)
*Settings → View all settings is where you check your current account type — free or enterprise — at any time.*

Selecting the upgrade path (either the rocket icon in the command bar or the upgrade option inside Settings) surfaces an inline prompt:

![Screenshot of the "Microsoft Purview Enterprise" upgrade prompt, describing multicloud and hybrid coverage, with the Upgrade button highlighted.](/courses/microsoft-purview/ch01/03-purview-licensing-and-environments/rocket-select-upgrade.png)
*"Better coverage and more apps" — the enterprise upgrade prompt that appears from the rocket icon in the command bar.*

Confirming takes you to a short form where you pick the Azure subscription and resource group that will host the upgraded, linked Purview resource:

![Screenshot of the "Upgrade to Microsoft Purview Enterprise" dialog, showing Country/region, Azure subscription, and Resource group fields, plus a note about the 1 capacity unit default and the Upgrade button.](/courses/microsoft-purview/ch01/03-purview-licensing-and-environments/details-selection-inline.png)
*The enterprise tier provisions with 1 capacity unit (25 operations/second, 10 GB of metadata storage) by default, with auto-scale available afterward.*

After upgrading, you keep a way back — a toggle that switches you to the classic portal experience for that account, if you ever need it:

![Screenshot of a small toggle switch labeled "Try the new Microsoft Purview" in the portal's command bar.](/courses/microsoft-purview/ch01/03-purview-licensing-and-environments/switch.png)
*Even after upgrading, this toggle switches between the new unified experience and the classic portal for the same account.*

## Environments: not the same thing as regions

Two separate ideas get called "environment" in Purview, and it's worth keeping them apart:

1. **Purview environment tags** — a convention (Production, Pre-Production, Test, Dev, Proof of Concept) you apply as an Azure resource tag when creating a classic Microsoft Purview account, purely for your own organization and billing clarity. Purview itself doesn't enforce anything based on this tag.
2. **Regions** — the actual Azure geography your Purview account's metadata is physically stored in. Your account's region is tied to your Microsoft Entra tenant's home region, and — critically — **you cannot move a Purview account to a different region after creation.** You also can't mix: Microsoft 365 GCC (US government community cloud) regions aren't currently supported by the new unified portal experience at all.

If your Purview account's region doesn't match your tenant's region (which can happen in larger, multi-national organizations), upgrading to enterprise requires an extra confirmation step precisely because of that mismatch — one more reason region is a decision you want to get right before you have real data in the account, not something you tag your way out of afterward.

## Key terms

| Term | Meaning |
|---|---|
| Free version | An automatically-available, no-setup Purview data governance instance with a 1,000-annotated-asset cap and no scanning |
| Enterprise version | The fully-featured tier: collections, automated classification, scanning, workflows, and support access |
| Capacity unit (CU) | The enterprise tier's billing/throughput unit — 1 CU = 25 operations/second and 10 GB of metadata storage by default |
| Environment tag | An optional Azure resource tag (Production, Test, Dev, etc.) for your own organizational clarity — not enforced by Purview |

## Lab

Using the comparison table in this lesson, decide: if an organization only needs to browse and manually tag metadata for five Azure Blob Storage accounts, with no scanning and no budget approved yet, does it need the enterprise tier? Write one sentence justifying your answer before moving to the next lesson.

## Check yourself

What is the practical difference between a Purview "environment tag" and a Purview account's "region" — and which one can you change after the account already exists?
