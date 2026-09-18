# Lesson 5 — Subscriptions & Resource Groups

**Chapter 1 · Cloud & Azure Concepts · Lesson 5 of 18**

## What you'll learn

- What an Azure **subscription** actually is — the billing and access boundary
- What a **resource group** is, and why almost everything you create lives inside one
- Why resources in the same resource group are usually related to each other
- A real look at creating and listing resource groups in the portal

## A subscription is your billing and access boundary

An Azure **subscription** is the boundary for billing and access. Every
resource you create belongs to exactly one subscription, and that
subscription is what gets billed for it, and what defines who's
allowed to manage it (through the access controls covered later in
this course). A single person or a small team might have one
subscription; a large company often has several — separating, say,
production from development, or one department's costs from
another's.

## A resource group is a logical container

A **resource group** is a logical container that holds related
resources — a web app might have its own App Service, its own
database, and its own storage account, all grouped into one resource
group. Two things make resource groups genuinely useful, not just
organizational tidiness:

- **They're managed together.** Apply an access permission or a tag
  to the group, and it's easy to reason about everything inside it
  as one unit.
- **They're deleted together.** Delete a resource group, and every
  resource inside it is deleted with it. This is the single most
  useful (and most dangerous) fact about resource groups — it's the
  fast way to tear down an entire test environment in one action, and
  also the fast way to lose something you didn't mean to.

Every resource lives in exactly one resource group. A resource group
itself lives in exactly one subscription.

![The "Create resource group" form in the Azure Portal, showing fields for Subscription, Resource group name, and Region.](/courses/azure-fundamentals/ch01/05-subscriptions-and-resource-groups/manage-resource-groups-create-group.png)

## A real look at resource groups in the portal

Creating one just asks for three things: which subscription it
belongs to, a name, and a region (the region here is really just
where the resource group's own metadata is stored — resources inside
it can still be deployed to other regions individually). Once you
have a few, the portal lists them like any other resource — searchable,
sortable, each one showing how many resources it contains.

![A list of resource groups in the Azure Portal, showing columns for name, subscription, and location.](/courses/azure-fundamentals/ch01/05-subscriptions-and-resource-groups/manage-resource-groups-list-groups.png)

## Why grouping related resources actually matters

Without resource groups, a subscription with a hundred resources
would be a flat, unorganized list with no obvious relationship
between anything. Grouping by application, by environment (dev vs.
production), or by team gives you a unit you can manage, secure, cost
out, and tear down as a whole — instead of hunting down every related
resource one at a time when something needs to change or be removed.

## Key terms

| Term | Meaning |
|---|---|
| Subscription | The billing and access boundary; every resource belongs to exactly one |
| Resource group | A logical container for related resources, managed and deleted together |
| Tag | A label applied to resources (often at the resource-group level) for organization and cost tracking |

## Chapter 1 complete

That closes Chapter 1, Cloud & Azure Concepts — cloud computing itself,
the three service models, Azure's global infrastructure, the portal,
and now subscriptions and resource groups. Chapter 2, **Core Azure
Services**, starts hands-on with the actual services you'll deploy
into those resource groups: compute, storage, networking, and
identity.

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: if
you delete a resource group, what happens to everything inside it —
and why does that make resource groups useful for tearing down a test
environment?
