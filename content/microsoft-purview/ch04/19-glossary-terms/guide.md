# Lesson 19 — Glossary Terms

**Chapter 4 · Catalog and Glossary · Lesson 19 of 35**

## What you'll learn

- Why Purview describes glossary terms as "active" rather than static definitions
- How a term is created — picking a template, filling in the core fields
- The approval lifecycle every term moves through: draft, submitted, published
- Where published terms actually show up for business users

## From static definitions to active, policy-bearing terms

Every organization has its own working vocabulary, and disagreements about it are expensive: if Finance's "active customer" and Sales's "active customer" don't mean the same thing, a report built on top of both is quietly wrong. **Glossary terms** are Purview's answer — a shared, governed vocabulary attached directly to the data it describes.

What changed with Unified Catalog is important: in earlier versions of Purview, glossary terms were essentially static text — a name and a definition, nothing more. Today, terms are **active**. A policy attached to a term — a data governance requirement, a terms-of-use condition — applies automatically to any data product the term gets attached to. Terms don't just describe data anymore; they help govern it.

Two more things worth knowing:

- Terms are grouped under a **governance domain**, so the same word can mean something different (and correctly so) in two different business areas without confusion.
- Terms can be linked to **data products**, and that linkage is what lets a term's policies "trickle down" to the actual data assets inside that product.

## Creating a term starts with a template

New terms are created from a **term template** — System default (just the basic fields) or a custom template an organization has defined for richer metadata needs.

![Creating a new glossary term in the classic Purview business glossary, with Microsoft's own callout marking the "New term" button, and a template picker showing "System default" and a custom "Contoso Sales Glossary Terms" template.](/courses/microsoft-purview/ch04/19-glossary-terms/new-term-with-default-template.png)
*Picking a template is the first step — System default is fine for simple terms; a custom template can enforce richer, organization-specific fields.*

Once a template is chosen, the core fields are straightforward:

![A new term's Overview tab, with Microsoft's own callout marking the Status field (currently "Draft"), and fields for Name, Definition, Acronym, Resources, and Data Privacy.](/courses/microsoft-purview/ch04/19-glossary-terms/overview-tab.png)
*Name, Definition, Acronym, supporting Resources, a Data Privacy classification — and a Status field that starts every term as Draft.*

- **Name** — the term as it's used throughout the company
- **Definition** — the actual working meaning, in plain business language
- **Acronym** — comma-separated, so "CLV," "Customer Lifetime Value" both resolve to the same term
- **Resources** — supporting links (a report, a policy document, a wiki page)
- **Data Privacy** — a required classification for how sensitive the concept itself is

## Draft, submit for approval, published

Every term moves through the same lifecycle before it's visible to the business:

1. **Draft** — being written, visible only to the people editing it
2. **Submitted for approval** — a designated steward or approver reviews the definition
3. **Published** — once approved, the term appears in the **Enterprise Glossary**, the end-user-facing experience people actually browse to understand company vocabulary

![An existing term's edit page, with Microsoft's own callout marking the "Submit for approval" button, next to a Status of "Approved."](/courses/microsoft-purview/ch04/19-glossary-terms/submit-for-approval.png)
*Submitting for approval is the step that moves a term out of draft and into someone's review queue.*

A term only shows up in the Enterprise Glossary once **both** the term itself and the governance domain it belongs to are published. If the whole domain gets moved back to draft, every term inside it disappears from the glossary too — a useful safety valve when an entire business area isn't ready to be public yet.

## Key terms

| Term | Meaning |
|---|---|
| Glossary term | A named, governed business-vocabulary entry, attached to the data it describes |
| Term template | The field set a new term is created from — System default, or a custom organization-defined template |
| Draft / Submitted / Published | The three-stage approval lifecycle every term moves through |
| Enterprise Glossary | The end-user-facing experience where published terms are discoverable |

## Lab

Pick one term your organization (or a team you know) uses loosely and inconsistently — "active user," "qualified lead," "churned customer." Write a one-paragraph Definition for it as if filling in the Overview tab above, and note which governance domain it would belong to.

## Check yourself

Can you explain why Purview calls terms "active" rather than static? Can you list the three stages of a term's approval lifecycle in order? Can you explain what has to be true for a term to actually appear in the Enterprise Glossary?
