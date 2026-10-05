# Lesson 2 — Fabric Tenant and Capacity Governance

**Chapter 1 · Fabric Governance Foundations · Lesson 2 of 25**

## What you'll learn

- What a Fabric tenant is, and why it's the top-level governance boundary
- What a capacity is, and how it differs from a tenant
- Why Fabric's two-level tenant/capacity structure matters for governance at scale
- How to read Microsoft's own published diagram of the pattern
- How this sets up Lesson 3, where tenant and capacity settings actually get configured

## The tenant: the top-level boundary

A **Fabric tenant** is the top-level governance boundary in Microsoft Fabric. It maps 1:1 to your organization's **Microsoft Entra ID** — the same identity tenant Power BI already uses. If your organization has one Entra ID, you have one Fabric tenant, and everything you'll govern in this course — domains, workspaces, items, permissions — lives inside that one boundary. There's no governance setting in Fabric that exists outside the tenant; everything else this course covers is a narrower structure nested inside it.

## Capacity: the compute and governance unit

A **capacity** is the compute and governance unit that workspaces get assigned to. Every Fabric workspace runs on exactly one capacity — either a paid F-SKU capacity or a trial capacity — and that capacity determines the compute resources available to everything in the workspace. A capacity also has its own region (where it physically runs) and its own set of capacity admins, separate from the tenant admins who manage the tenant as a whole.

Where a tenant is a single, fixed boundary, a capacity is something an organization can have many of.

## Why the two-level structure matters for governance

A single tenant can contain **multiple capacities** — split by region, by business unit, or both. That two-level shape is the structural reason tenant admins don't have to manage every governance decision centrally forever: many tenant settings can be **delegated** down to capacity admins, who can then make certain decisions themselves for just the workspaces running on their capacity, without a tenant admin in the loop every time. This delegation pattern — centralize the broadest decisions, delegate narrower ones outward — is something you'll see repeat throughout this course, starting with tenant settings themselves in Lesson 3.

## Reading Microsoft's own diagram

![Microsoft's own diagram of two retail companies' tenant, capacity, and workspace structure. Retail company A has one organizational tenant containing a US, UK, and Germany capacity, each holding Marketing, Sales, and Finance workspaces. Retail company B instead splits into two tenants — a military section tenant and a commercial tenant — each with its own set of regional capacities and workspaces.](/courses/microsoft-fabric-data-governance/ch01/02-fabric-tenant-and-capacity-governance/tenants-capacities.png)
*Microsoft's own diagram, from the Fabric licenses documentation: one tenant can hold multiple capacities — often split by region — and each capacity holds the workspaces assigned to it. Retail company B shows that an organization can even run more than one tenant, each with its own capacities underneath.*

The diagram above is Microsoft's own, published alongside the licensing documentation. Retail company A is the pattern you'll see most often: one organizational tenant, several regional capacities (US, UK, Germany), each holding its own named workspaces (Marketing, Sales, Finance). Retail company B shows the less common but still valid variant — an organization that runs two separate tenants (a military section tenant and a commercial tenant), each independently structured the same tenant-to-capacity-to-workspace way underneath. Either way, the shape repeats: a tenant contains capacities, and a capacity contains the workspaces assigned to it.

## What's next

Lesson 3 goes into the admin portal itself — the actual screen where tenant settings and capacity settings get configured, including how delegation to capacity and workspace admins is turned on for a specific setting.

## Key terms

| Term | Meaning |
|---|---|
| Tenant | The top-level governance boundary in Fabric, mapped 1:1 to the organization's Microsoft Entra ID |
| Capacity | The compute and governance unit workspaces are assigned to; has its own region and its own admins |
| Delegated setting | A tenant setting that capacity admins or workspace admins can control themselves, without a tenant admin acting each time |

## Lab

Sketch your own organization (or a hypothetical one) as a tenant/capacity/workspace diagram, following the shape in the screenshot above: one box for the tenant, one box per capacity inside it (by region or business unit, your choice), and two or three workspace boxes inside each capacity. Label which capacity you think should have delegated settings versus centrally managed ones, and why.

## Check yourself

Can you state what a Fabric tenant maps to, explain the difference between a tenant and a capacity in your own words, and describe what "delegating" a tenant setting to capacity admins actually changes?
