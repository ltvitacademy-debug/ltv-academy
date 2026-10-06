# Lesson 22 — Business Domains

**Chapter 4 · Catalog and Glossary · Lesson 22 of 35**

## What you'll learn

- What a business domain is, and the name you'll actually see it under in a current Purview tenant
- The five domain types, and why "type" is a label, not a behavior switch
- The four business concepts every domain organizes: data products, glossary terms, OKRs, critical data elements
- How domains nest up to five levels deep, and why that boundary exists
- Who can create a domain, versus who can publish one

## A naming note before anything else

Microsoft shipped this feature as **Business domains** in the Purview portal's Data Catalog. If you search Purview documentation today, most current pages call the same feature a **governance domain** — Microsoft renamed it as Unified Catalog matured, and the rename is still rolling out across screens and docs unevenly. Functionally nothing changed: the same screen, the same five types, the same nesting rules. This lesson uses "business domain" because that's this chapter's title and still the label you'll see on some tenants and older screenshots — just don't be thrown if a newer screen or doc says "governance domain" instead. They're the same thing.

![The Business domains landing page in a fresh Purview Data Catalog, with an empty state illustration, the heading "Get started with business domains," and a "Create business domain" button.](/courses/microsoft-purview/ch04/22-business-domains/empty-business-domains.png)
*A brand-new tenant's Business domains screen — nothing created yet. "Organize your data products by topic, area, department, or anything else" is the whole pitch in one sentence.*

## What a domain actually organizes

A business domain is a boundary — a name, a description, and an owner — that groups four kinds of **business concepts**:

1. **Data products** — packaged sets of tables, files, or reports grouped for discovery and reuse
2. **Glossary terms** — the business vocabulary from Lesson 19, scoped to this domain
3. **OKRs** — objectives and key results that describe the measurable value this domain's data is supposed to deliver
4. **Critical data elements** — logical groupings of important columns (mapping "CustID" and "CID" to one "Customer ID" concept, for instance) that need elevated governance

None of these concepts mean much floating on their own. A domain is what gives them a shared home and a shared owner.

## Five domain types, one structure

When you create a domain, you pick a **type**: Functional unit, Line of business, Data domain, Regulatory, or Project. This is purely descriptive — it tells a reader *why* the boundary exists (a department versus a product line versus a compliance requirement) but changes nothing about how the domain behaves. A Regulatory domain for GDPR and a Functional unit domain for Finance work identically under the hood.

![The "New governance domain" creation dialog in Purview, with Name set to "Claims Management," a description, and a Type dropdown showing "Functional unit," nested under a parent domain called "Claims."](/courses/microsoft-purview/ch04/22-business-domains/create-governance-domain.png)
*Creating a domain: a name, a description, a type, and — optionally — a parent domain.*

Domains can nest inside a parent domain, up to **five levels deep**, and a tenant can hold as many as 200 domains total. That depth limit is deliberate: it keeps the hierarchy a readable org chart instead of an unbounded tree nobody can navigate.

## A domain in practice

Here's what an established domain looks like once it's doing real work — this one is "Fraud Services," a Regulatory-type domain nested under Finance:

![A Purview governance domain detail page for "Fraud Services," showing its type (Regulatory), parent (Finance), seven owners, Published status, and a Business concepts section with cards for 4 data products, 9 glossary terms, 1 OKR, 1 critical data element, and 0 custom attributes.](/courses/microsoft-purview/ch04/22-business-domains/governance-domain-overview.png)
*Type, parent, owners, publish status, and all four business concepts as clickable cards — this is a domain's full "home page."*

Each of those business-concept cards drills into its own list. Selecting the OKRs card, for example, opens the domain's actual objectives:

![The OKRs list for the Human Resources business domain in Purview, showing one OKR — "Revamp hiring guidelines to accelerate interview processes" — with 4 key results, a target date, "At risk" progress, and Published status.](/courses/microsoft-purview/ch04/22-business-domains/business-domain-okr-list.png)
*One domain, one measurable goal, tracked with a target date and a progress state — this is what "business value" looks like as data, not a slogan.*

## Create versus publish

Creating a domain and making it visible to the rest of the organization are two different steps, guarded by two different things. Creating one needs the **governance domain creator** role. Once created, a domain sits invisible to everyone else until its owner sets its status to **Published** — and a domain has to be published before any business concept inside it (a glossary term, a data product) can be published either. The draft state exists so an owner can build out a domain's structure before anyone else sees a half-finished one.

## Key terms

| Term | Meaning |
|---|---|
| Business domain (governance domain) | A named, owned boundary that groups data products, glossary terms, OKRs, and critical data elements |
| Domain type | A descriptive label (Functional unit, Line of business, Data domain, Regulatory, Project) with no behavioral effect |
| Business concepts | The four things a domain organizes: data products, glossary terms, OKRs, critical data elements |
| OKR | Objectives and key results — a measurable goal attached to a domain |
| Published | The status an owner sets to make a domain (and its contents) visible outside itself |

## Lab

Sketch a domain hierarchy for a hypothetical retailer: one top-level Functional unit domain for "Merchandising," with two child domains beneath it. Pick a type for each child, name one OKR you'd expect the parent domain to track, and name one glossary term that would belong to a child domain instead of the parent.

## Check yourself

Can you name all four business concepts a domain organizes? Can you explain why "domain type" doesn't change behavior? Can you explain the difference between who can create a domain and who can publish one?
