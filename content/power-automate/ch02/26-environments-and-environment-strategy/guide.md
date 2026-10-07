# Environments and Environment Strategy

Every flow, app, and connection you've built so far has lived in a single Power Platform environment. That's fine for learning, but it's not how a real organization operates. This lesson steps back from individual flows to the container they all live in — the environment itself — and covers how a company like Castlebridge Logistics should plan which environments it needs and what goes in each one.

## What you'll learn

- What a Power Platform environment actually is, and what it isolates
- The environment types you'll encounter: Production, Sandbox, Default, Trial, and Developer
- Why a real organization runs separate Dev, Test, and Production environments instead of one
- How Castlebridge should divide its automation work across environments

## What an environment actually is

A Power Platform **environment** is a boundary around a set of apps, flows, connections, and (optionally) a Dataverse database. Everything inside one environment is isolated from every other environment — an app built in Castlebridge's Test environment simply cannot connect to a database that lives only in Production, even if both environments belong to the same company and the same Microsoft Entra tenant.

![A tenant can contain multiple environments, each with its own apps, flows, and Dataverse database](/courses/power-automate/ch02/26-environments-and-environment-strategy/environments-overview.png)
*A single tenant can host several environments — here, separate regional environments each carrying their own apps, flows, and Dataverse — the same isolation pattern Castlebridge uses for Dev, Test, and Production.*

## The environment types

Not every environment serves the same purpose. The ones you'll actually touch:

- **Production** — intended for permanent, business-critical work. Full control, real users, real data.
- **Sandbox** — a non-production environment used for development and testing, with support for copy and reset operations that let you refresh it from Production data.
- **Default** — automatically created for every tenant, shared by every licensed user. Not meant for serious building; no backup guarantees.
- **Trial** — short-term, expires after 30 days, one per user. Good for a quick proof of concept, not for real project work.
- **Developer** — a free, personal environment tied to one maker's own Power Apps Developer Plan license.

## Why Castlebridge needs more than one environment

If Castlebridge built and tested every flow directly in Production, a broken condition or a bad SQL query would hit live shipment data immediately, with no safety net. Instead, Castlebridge runs a minimum of three environments:

- **Dev** (Sandbox) — where makers build and break things freely, pointed at non-production data
- **Test** (Sandbox) — a stable environment for UAT and regression checks before anything reaches the business
- **Production** — the environment real dispatchers, drivers, and the finance team actually depend on

A flow is built once in Dev, exported as a solution, imported into Test for validation, and only then imported into Production — using the environment variables and connection references from the last lesson to repoint it at each environment's own resources along the way.

## Key terms

| Term | Meaning |
|---|---|
| Environment | An isolated container for apps, flows, connections, and an optional Dataverse database |
| Sandbox environment | A non-production environment used for development or testing; supports copy and reset |
| Default environment | The environment automatically created per tenant and shared by all licensed users |
| Environment strategy | An organization's deliberate plan for which environments exist and what moves between them |

## Recap

An environment isolates everything inside it — apps, flows, connections, and data — from every other environment, even within the same company. Castlebridge's Dev, Test, and Production split exists so a mistake in development never reaches a shipment record a dispatcher is relying on. Next up, Lesson 27: the DLP policies an admin uses to control which connectors are even allowed to mix inside those environments.
