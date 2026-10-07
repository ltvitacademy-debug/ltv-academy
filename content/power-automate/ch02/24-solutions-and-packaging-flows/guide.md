# Solutions: Packaging Flows for ALM

Castlebridge Logistics has now built a custom connector to its dispatch system and a pair of child flows that share logic between the warehouse and finance teams. All of it still lives in a development environment. Moving it safely into test and then production means moving it as one package, not as a handful of individually copied flows — and that package is called a **Solution**.

## What you'll learn

- What a Solution is, and why it's the unit of application lifecycle management (ALM) in Power Platform
- The difference between unmanaged and managed solutions
- What kinds of objects a Solution can carry besides flows
- How Castlebridge moves a Solution from a dev environment toward production
- Where to view and filter everything a Solution contains

## Why "just copy the flow" doesn't work

A flow rarely stands alone. Castlebridge's child-flow setup depends on a custom connector; the parent flow depends on the child flow being present with the exact same name. Copy just the parent flow into a new environment, and it breaks the moment it can't find its dependencies. A **Solution** solves this by bundling a flow together with everything it depends on — the custom connector, related tables, connection references, and more — so the whole bundle moves, and imports, as one unit.

## Unmanaged vs. managed solutions

- **Unmanaged solution** — fully editable. Castlebridge builds and iterates here, in development.
- **Managed solution** — locked down after import. Castlebridge's test and production environments receive managed solutions, which can be run and used but not casually edited, protecting them from an accidental change that only test or production would reveal.

This is the normal Power Platform ALM path: build unmanaged in dev, export, import as managed into test, validate, then import that same managed package into production.

## Everything a Solution can carry

Open a Solution and every object inside it is listed together — flows, the custom connector, tables, and more — each with columns for whether it's managed, customizable, and who owns it.

![Screenshot of a solution's full list of objects, including flows and other components.](/courses/power-automate/ch02/24-solutions-and-packaging-flows/solution-all-items-list.png)
*Castlebridge's solution, with its child flow, parent flow, and custom connector all listed as objects of the same package.*

Whatever gets added to this list travels together the next time the Solution is exported. That's exactly why the custom connector from Lesson 22 and the child/parent flow pair from Lesson 23 belong in the same Solution — if any one of them is missing on import, the others may not work.

## Moving Castlebridge's Solution from test to production

Selecting a Solution — or a component inside it — changes the command bar to match. From here Castlebridge can export the Solution to a file, or, if Power Platform pipelines are set up, deploy it directly to the next environment with a few clicks.

![Screenshot of the command bar with solution-level commands like Export and Solution Checker.](/courses/power-automate/ch02/24-solutions-and-packaging-flows/solution-commands.png)
*Export, Deploy, and Solution Checker — Castlebridge runs Solution Checker before every export to catch problems while they're still cheap to fix.*

Once exported from dev as unmanaged and re-exported (or converted) as managed, the same package is imported into test, validated, and then imported into production. Flows inside a solution-aware package stay linked automatically — nobody needs to go update a URL or re-point a child flow reference by hand.

## Key terms

- **Solution** — a package of Power Platform components (flows, connectors, tables, and more) that moves as one unit between environments
- **Unmanaged solution** — an editable solution, used in development
- **Managed solution** — a locked-down solution, used in test and production
- **Application lifecycle management (ALM)** — the practice of moving customizations through dev, test, and production in a controlled, repeatable way
- **Solution Checker** — a tool that inspects a solution for problems before it's exported or deployed
