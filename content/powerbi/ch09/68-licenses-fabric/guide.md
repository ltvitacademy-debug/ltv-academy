# Lesson 68 — Understanding Power BI Licenses & Fabric

**Chapter 9 · Power BI Service & Fabric · Lesson 2 of 8**

## What you'll learn

- The three per-user license types: Free, Pro, and Premium Per User
- What a capacity license (Premium or Fabric) adds on top
- Why "where the content lives" matters as much as "what license you hold"
- How Microsoft Fabric relates to the Power BI you've been learning

## Three per-user licenses

Every person who signs into the Power BI service holds one of three
per-user license types. What you can actually *do* depends on the
combination of your license and where the content you're working with
is stored.

| License | What it lets you do |
|---|---|
| **Free** | Connect to data, build reports and dashboards for yourself. Cannot share or collaborate with others, or publish to anyone else's workspace |
| **Pro** | Everything Free does, plus: publish content to other workspaces, share dashboards, subscribe to reports, and collaborate with other Pro users |
| **Premium Per User (PPU)** | Everything Pro does, plus most Premium capacity features — but only when sharing with other PPU users |

A Free license is genuinely free — but it's solitary. The moment you
want a teammate to see something you built, without both of you paying
for Pro, one of two things has to be true: either you're both Pro (or
both PPU), or the content lives in a **capacity**.

## Capacity: the other half of the equation

A **capacity** — either **Premium** (the older "P SKU" naming) or
**Fabric** (the newer "F SKU" naming, F64 or larger) — is a block of
dedicated compute an organization purchases. Content stored in a
workspace assigned to a capacity behaves differently: a Pro or PPU
user can share that content with a **Free**-license colleague, who can
view it without ever paying for Pro themselves.

| Workspace location | Free user can view? | Pro user can share? |
|---|---|---|
| Shared (no capacity) | No | Only with other Pro users |
| Premium/Fabric capacity | Yes | With anyone — Free, Pro, or PPU |

This is why "what license does the *viewer* need" is really "what
license does the viewer need, **given where this particular workspace
lives**" — the two questions can't be answered separately.

## What is Microsoft Fabric?

**Fabric** is Microsoft's umbrella platform that now houses Power BI
alongside data engineering, data science, and real-time analytics
tools, all sharing the same underlying capacity and storage. Licensing
and administration for Power BI are integrated with Fabric — a Fabric
F64 (or larger) capacity does everything a Power BI Premium capacity
did, plus gives access to Fabric's other workloads. For everything
this course covers, "Fabric capacity" and "Premium capacity" can be
read as the modern and legacy names for the same underlying concept.

## Signing up

You don't have to buy anything to follow this course. Three common
starting points:

- A Microsoft 365 subscription may already include a Power BI license
  — check under your account in the service.
- An organization's admin assigns Pro or PPU licenses directly.
- A **Fabric capacity trial** grants a temporary license similar to
  PPU, with no purchase required, for evaluating everything this
  chapter covers.

## Key terms

| Term | Meaning |
|---|---|
| Free license | Personal use only — no sharing or publishing to others' workspaces |
| Pro license | Full sharing/collaboration with other Pro users |
| Premium Per User (PPU) | Pro capabilities plus most Premium features, shareable only with other PPU users |
| Capacity (Premium/Fabric) | Dedicated compute an organization purchases that lets Free users consume shared content |
| Microsoft Fabric | The unified platform housing Power BI plus data engineering, science, and real-time analytics |

## Lab

1. In the Power BI service, open your account menu (top-right) and
   check which license type is currently assigned to you.
2. Find a workspace holding one of your `AdventureWorksDW2014` reports
   from Chapter 7 or 8. Check whether that workspace is assigned to a
   capacity (**Workspace settings → Premium** tab).
3. Based on the table above, write one sentence stating exactly who
   could view that report right now without needing to buy a license,
   and why.

## Check yourself

You're ready for Lesson 69 when you can explain why two Pro users can
always share with each other, but a Pro user sharing with a Free-license
colleague depends on something other than either person's license.
