# Governance: Admin Center and Monitoring

Up to this point you've built flows as a maker, inside your own environment. This lesson switches hats: you're now the IT admin at Castlebridge Logistics, responsible for every flow every dispatcher, warehouse supervisor, and finance clerk across the company builds — not just your own. That job happens in one tool, the Power Platform Admin Center, and it's where governance questions get answered: who can build what, where, with which connectors, and how do you know when something's gone wrong tenant-wide.

## What you'll learn

- What the Power Platform Admin Center manages, and where to find each feature area
- Why environments exist and how they contain the blast radius of a bad flow
- What a Data Loss Prevention (DLP) policy is and the problem it solves
- How the Monitor page gives an admin tenant-wide visibility a single maker never has

## The admin center: one door, many rooms

Castlebridge's IT admin signs in to [admin.powerplatform.microsoft.com](https://admin.powerplatform.microsoft.com), not [make.powerautomate.com](https://make.powerautomate.com) — makers build flows in one, admins govern all of them from the other. The admin center's left navigation pane groups everything an admin does into feature areas: **Manage** (environments, environment groups, tenant settings), **Security**, **Copilot**, **Monitor**, **Deployment**, **Licensing**, and **Support**.

![Screenshot of the Power Platform admin center, with the navigation pane, settings icon, admin center links, and page area called out.](/courses/power-automate/ch02/28-governance-and-the-admin-center/admin-center-overview.png)
*The admin center's navigation pane is where every governance task below starts — environments, security, and monitoring all live behind it.*

## Environments: the walls around Castlebridge's flows

An **environment** is a container for apps, flows, and data — it's the single biggest lever an admin has for limiting damage. Castlebridge doesn't let every flow run loose in one shared space: a flow built by a warehouse supervisor in a sandbox environment can't accidentally touch the finance team's production data, because they're walled off from each other. You'll see this distinction matter even more in the next lesson, where Castlebridge promotes a solution from a Test environment into Production — that promotion only works because the environments are separate in the first place.

## Data loss prevention: keeping Castlebridge's data in bounds

A **DLP (Data Loss Prevention) policy** classifies every connector as **Business**, **Non-Business**, or **Blocked**, and prevents a single flow from combining a Business connector with a Non-Business one. Without this, a Castlebridge employee could build a flow that reads shipment records out of the company's SQL Server database (Business) and posts them straight to a personal Twitter account (Non-Business) — technically two valid connectors, catastrophically bad together. The admin sets DLP policies tenant-wide or per-environment; makers never see a toggle for it, they just hit a wall when they try to combine the wrong connectors.

## Monitoring: watching flow health across the tenant

A maker only ever sees their own flow's run history. Castlebridge's admin needs more: the **Monitor** page in the admin center surfaces operational health across every environment in the tenant — which flows are failing, which apps are slow, where usage is spiking. Paired with the **Actions** page, which surfaces Microsoft's own recommendations for improving security and reliability, this is how an admin catches a tenant-wide problem — say, a connector outage affecting a dozen flows at once — long before a dispatcher calls the help desk to report "the flow is broken."

## Key terms

- **Power Platform Admin Center** — the tenant-wide governance tool at admin.powerplatform.microsoft.com, separate from the maker experience at make.powerautomate.com
- **Environment** — a container that isolates a set of apps, flows, and data from every other environment
- **DLP (Data Loss Prevention) policy** — a rule classifying connectors as Business, Non-Business, or Blocked, and preventing Business/Non-Business connectors from mixing in one flow
- **Monitor page** — the admin center view of operational health (failures, performance, usage) across every environment in the tenant
