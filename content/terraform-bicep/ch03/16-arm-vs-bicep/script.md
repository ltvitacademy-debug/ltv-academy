# Script — ARM Templates vs. Bicep

## Segment 1 (title)

Bicep never replaced ARM — it compiles to it. Every Bicep resource this chapter used is, underneath, an ARM template resource. Bicep is the authoring layer built on top of ARM once JSON's verbosity became a real productivity problem at scale.

## Segment 2 (code: building and decompiling)

az bicep build turns a .bicep file into the exact ARM template JSON it would deploy as anyway — mostly useful for inspection, not day-to-day deployment. az bicep decompile goes the other way, turning an existing ARM template into Bicep, and matters more in practice.

## Segment 3 (code: where raw ARM JSON still shows up)

Almost nobody hand-writes new ARM JSON today. It still surfaces from exporting a resource group's template in the Portal, some older tooling that only accepts ARM JSON directly, and the occasional newer resource type — like Lesson 9's Fabric Capacity — where provider support hasn't caught up yet.

## Segment 4 (steps: chapter recap)

Bicep syntax and resource blocks, then parameters and the Problems pane catching errors early, then the actual deploy command with a dry run, then a real server-and-database pair with a properly secured password, and now the compiled ARM JSON underneath all of it.

## Segment 5 (outro)

Chapter 3 is complete. Next up: Chapter 4, IaC in Practice — state management, the plan-apply workflow, and getting this into CI/CD.
