# Script — Solutions: Packaging Flows for ALM

## Segment 1 (title)

Castlebridge Logistics just built a custom connector and a pair of child flows in a development environment. Before any of it reaches production, it has to move as one package, with every dependency intact — and that package is called a solution. Copy just the flow on its own, and it breaks the moment it can't find the connector or the child flow it depends on.

## Segment 2 (steps)

A solution starts out unmanaged in dev, where Castlebridge keeps building and editing freely. It's exported, then imported into a test environment as a managed solution to validate. From test, that same managed package moves into production, where it can be run but not casually edited — protecting it from an accidental change that only production would ever reveal. That's the ALM path every Power Platform customization follows: unmanaged in dev, managed everywhere after.

## Segment 3 (screenshot)

Open any solution and you see every object inside it — flows, the custom connector, tables, and more — all listed together, with columns for managed, customizable, and owner. Whatever Castlebridge adds to this list travels together the next time the solution is exported, which is exactly why the connector and both flows belong in the same solution from the start.

## Segment 4 (screenshot)

Selecting a component changes the command bar to match it, and the solution itself exposes Export, Deploy, and Solution Checker. Castlebridge runs Solution Checker before every export, catching problems while they're still cheap to fix, rather than after they've already landed in test or production.

## Segment 5 (outro)

Package once, move that same tested package through every environment, and production never sees anything dev didn't already prove out. Next up, environment variables and connection references — how a solution avoids hard-coding dev-only values as it moves from one environment to the next.
