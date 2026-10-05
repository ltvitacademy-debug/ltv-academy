# Lesson 22 — Cross-Cloud Cataloging and Lineage

**Chapter 5 · Multi-Cloud Governance · Lesson 22 of 25**

## What you'll learn

- Why a catalog is the one governance layer that genuinely can cover both clouds from a single pane of glass
- How Microsoft Purview's multicloud scanning connector registers an AWS S3 source using a federated IAM trust, not stored AWS keys
- What shows up in the Unified Catalog once an AWS source is scanned, side by side with Azure assets
- Why cataloging both clouds together doesn't automatically give you lineage across them — and what still has to be built

## Why the catalog is different from the other three

Lesson 21 named four places multi-cloud governance breaks: identity, policy enforcement, catalogs, and audit logs. The first two are hard to unify, because Entra ID and AWS IAM, or Azure Policy and AWS Organizations, are genuinely separate control planes with no shared data model. Catalogs are different. A catalog's entire job is to describe metadata about assets — names, schemas, classifications, owners — and metadata doesn't care which cloud physically stores the data. That makes cataloging the most realistic place to get a true single pane of glass across Azure and AWS, and Microsoft Purview is built to do exactly that through its **multicloud scanning connector**.

## Registering AWS S3 as a Purview source

Purview's Data Map treats "Amazon S3" as a first-class source type, listed right alongside Azure's own storage services. Registering a bucket (or an entire AWS account's buckets) adds it to the same Data Map as every Azure Data Lake Storage container, Azure SQL Database, and Synapse workspace already registered.

![Microsoft Purview's Register sources panel, with the AWS account tile selected alongside Azure, Azure Synapse Analytics, Amazon S3, Azure Blob Storage, and Azure Cosmos DB tiles.](/courses/cloud-data-governance-azure-and-aws/ch05/22-cross-cloud-cataloging-and-lineage/register-aws-account.png)

Notice what's actually in that grid: Azure and AWS source types sit as peers, not as a primary system with a bolted-on AWS afterthought. That's the real signal that this is a genuine cross-cloud catalog, not an Azure catalog with an AWS export feature.

## How the connection actually works: no stored AWS keys

Registering the source is the easy part — the harder and more governance-relevant piece is *how Purview is allowed to read an AWS bucket at all*. It doesn't use a stored AWS access key and secret sitting in a credential vault. Instead, it uses a **federated IAM role trust**: you create an IAM role in AWS that trusts a specific Microsoft account ID (Purview's scanning service), and you require an External ID — a shared secret Purview generates — so only Purview's actual scanner can assume that role, not anyone else who happens to learn the Microsoft account ID. Purview then authenticates by assuming that role, scans, and never holds a long-lived AWS credential.

This is the same federation pattern Lesson 10's access governance patterns covered, applied across a cloud boundary instead of within one cloud: trust is established through an identity relationship, not a shared secret that has to be rotated and protected forever.

## What a scanned AWS source looks like in the catalog

Once a scan completes, AWS S3 objects appear in Purview's Unified Catalog search exactly like any other asset — filterable by asset type, with the same classification facets Purview applies to Azure data.

![Microsoft Purview search results filtered to the Amazon S3 asset type, showing 41,266 matching files with classification facets including EU GPS Coordinates, Brazil Individual Taxpayer ID, and France National ID Card alongside the bucket names found during the scan.](/courses/cloud-data-governance-azure-and-aws/ch05/22-cross-cloud-cataloging-and-lineage/search-catalog-aws.png)

This is the payoff this lesson is building toward: a steward searching the catalog for "where does this company hold France National ID Card data" gets Azure and AWS results in the same list, without needing to know or care which cloud the data physically lives in. That's what "cross-cloud cataloging" means in practice — not a theoretical standard, but one search box that doesn't stop at a cloud boundary.

## What this doesn't give you automatically: lineage

Cataloging both clouds together solves *discovery* — finding out an asset exists and what's classified inside it. It does not automatically solve **lineage** — tracing how a specific piece of data moved from its AWS source, through any pipeline, into an Azure destination (or vice versa). If a nightly pipeline copies data from an S3 bucket into Azure Data Lake Storage, Purview can show lineage for that hop only if the tool doing the copying (for example, Azure Data Factory or Synapse pipelines) is itself integrated with Purview and reports what it moved. Scanning both sources independently catalogs each side; it doesn't connect the dots between them unless something in the middle explicitly reports that connection. Treat cross-cloud lineage as something you have to deliberately wire up pipeline by pipeline — never assume it exists just because both endpoints are cataloged.

## Key terms

| Term | Meaning |
|---|---|
| Multicloud scanning connector | Purview's capability to register and scan non-Azure sources, including Amazon S3, Redshift, and RDS, as native Data Map sources |
| Federated IAM role trust | An AWS IAM role configured to trust a specific external account (here, Microsoft's Purview scanning service) rather than relying on a stored long-lived credential |
| External ID | A shared secret included in the trust relationship so only the intended trusted party — not anyone who learns the account ID — can assume the role |
| Cross-cloud lineage | Tracing a data asset's movement across a cloud boundary; requires the pipeline tool itself to report the hop to the catalog, not just both endpoints being scanned |

## Lab

If you have access to a Microsoft Purview trial account, walk through registering a public or test S3 bucket as a source (you'll need an AWS account to create the IAM role, or you can simply read through the Microsoft Learn walkthrough step by step). If you don't have access to either, write out the four-step federation sequence from memory: locate the Microsoft account ID and External ID in Purview, create the AWS IAM role trusting that account, attach a read-only S3 policy, and paste the resulting Role ARN back into a Purview credential.

## Check yourself

Can you explain why Purview's AWS S3 connection uses a federated role trust instead of a stored AWS access key — and why that distinction matters from a governance standpoint, not just a technical one?
