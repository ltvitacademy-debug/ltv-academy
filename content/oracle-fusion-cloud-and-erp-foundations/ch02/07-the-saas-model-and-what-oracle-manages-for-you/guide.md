# The SaaS Model and What Oracle Manages for You

**Chapter 2 · Oracle Fusion Cloud Applications · Lesson 7 of 20**

Lesson 4 introduced SaaS in general terms. Now let's make it specific to Oracle: exactly what does Oracle manage on your behalf in Fusion Cloud, what's left to the customer, and how does that change the kind of work a Financials consultant actually does?

## What you'll learn

- What "multi-tenant" SaaS specifically means
- A clear line between Oracle's responsibilities and the customer's
- Configuration versus customization, and why Fusion favors the former
- Why this division of labor defines the functional consultant role

## Multi-tenant SaaS

Oracle Fusion Cloud runs on a **multi-tenant** architecture: many customers ("tenants") run on shared Oracle-managed infrastructure, with their data kept securely isolated from each other, rather than each customer getting their own dedicated copy of the hardware and software. This is what makes the economics of SaaS work — Oracle maintains one codebase and one set of infrastructure that serves everyone, instead of thousands of separate installations.

## Who manages what

| Layer | Who's responsible |
|---|---|
| Data center, hardware, networking | Oracle |
| Operating system, database, patching | Oracle |
| The application itself, and its updates | Oracle |
| Uptime, security of the infrastructure | Oracle |
| Setup/configuration choices for the business | The customer |
| Security roles — who can see and do what | The customer |
| Business data: transactions, master data | The customer |
| Training users and running the business process | The customer |

Oracle's side of this list never requires the customer's involvement — no server to patch, no database version to plan around, no data center outage to respond to personally. The customer's side of the list is squarely where a functional consultant spends their career: setup decisions, security, and making sure the business process actually works the way the company needs it to.

## Configuration first, customization limited

In an on-premises product, a sufficiently motivated development team can rewrite almost any part of the application's underlying code. In a multi-tenant SaaS product like Fusion Cloud, that's structurally impossible — if Oracle let one customer modify the shared codebase, it would affect every other tenant sharing that infrastructure. Instead, Fusion Cloud is built to be changed almost entirely through **configuration**: setup choices made through screens, not code changes. Where genuine extension is needed — a custom report, an integration, a small UI tweak — Oracle provides specific, sanctioned tools (Oracle Transactional Business Intelligence for reporting, Visual Builder for extensions, REST APIs for integration) that sit alongside the core application rather than modifying it directly.

This is a deliberate trade: a configuration-first product is more limited than a fully customizable one, but it also means every customer's Fusion Cloud environment can receive the same quarterly update safely (Lesson 10), without Oracle worrying that someone's custom code will break.

## Why this defines the functional consultant role

Nearly everything a Financials functional consultant does lives in that "customer's responsibility" column: deciding how the Chart of Accounts should be structured, which approval rules apply to an invoice, which security roles an AP clerk needs, and how a business process maps onto Oracle's configuration options. You are rarely, if ever, the person patching a server or upgrading a database — Oracle already did that part.

## Key terms

| Term | Meaning |
|---|---|
| Multi-tenant | Many customers sharing the same managed infrastructure, with isolated data |
| Configuration | Changing behavior through setup screens, the primary way Fusion Cloud is adapted |
| Customization | Deep code-level modification — largely unavailable in multi-tenant SaaS |
| OTBI / Visual Builder / REST APIs | Oracle's sanctioned extension tools that sit alongside the core application |

## Check yourself

You're ready for Lesson 8 when you can list, from memory, three things Oracle manages and three things the customer manages in Fusion Cloud, and explain why "customization" means something more limited here than it does in an on-premises product.
