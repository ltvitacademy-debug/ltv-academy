# Script — Practice Questions: Security and Governance

## Segment 1 (title)

Security and governance questions on DP-700 read like a scenario, and the four options are almost always four real Fabric controls — just at different layers. Only one of them is the right layer for that scenario.

## Segment 2 (code: five controls, one ladder)

Workspace role controls every item in a workspace. Item permission narrows that to one item. A OneLake data access role narrows it further to specific folders and tables inside a lakehouse. Row-level security narrows it again to specific rows, but only inside a semantic model. A sensitivity label is different from all four — it isn't scoped to a workspace at all, it travels with the data.

## Segment 3 (steps: three layers, worked)

OneLake data access roles scope access inside one lakehouse, independent of workspace role. Sensitivity labels attach to the data itself and travel with exports. Row-level security lives in the semantic model, not the lakehouse — three different layers, three different answers.

## Segment 4 (code: the export trap)

A sensitivity label on a warehouse table doesn't reset when a report is exported to Excel — it persists, because it's Purview-backed and rides with the data. The tempting wrong answer treats it as a workspace setting that resets at the boundary. It doesn't.

## Segment 5 (outro)

The pattern across this whole domain: pick the narrowest control that satisfies the scenario, not the broadest one that would also work. Next up: the same pattern applied to monitoring and deployment.
