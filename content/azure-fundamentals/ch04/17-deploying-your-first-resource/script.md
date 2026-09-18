# Script — Deploying Your First Resource

## Segment 1 (title)

Every real deployment starts the same way: create a resource group, then create the actual resource inside it. Here, that's a storage account — one of the simplest, cheapest real resources to deploy.

## Segment 2 (steps: the Portal walkthrough)

Through the Portal: create the resource group, name it, pick a region. Then create a resource, choose storage account, give it a globally unique name, confirm the group and region, and deploy.

## Segment 3 (code: the same thing via CLI)

The exact same result through four CLI lines: az login, az group create, az storage account create with --sku Standard_LRS for the cheapest replication tier. Same resource group, same storage account, same underlying Resource Manager call either way.

## Segment 4 (code: what happens underneath)

Whichever method you use, the request reaches Azure Resource Manager, your RBAC permissions get checked, the request is validated and provisioned, and the resource becomes visible and billable. The Portal and CLI are two front doors to the same process.

## Segment 5 (outro)

Clean up afterward — delete the resource group, and everything inside it goes with it. Next up: the AZ-900 Exam Overview, and this course's final lesson.
