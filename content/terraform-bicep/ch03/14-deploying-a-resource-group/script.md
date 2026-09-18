# Script — Deploying a Resource Group

## Segment 1 (title)

Everything through Lesson 13 was authoring. Deploying it is a single Azure CLI command, scoped to an existing resource group — the command supplies whatever the file's param declarations need, either inline or from a params file.

## Segment 2 (code: what-if)

Bicep has its own version of the plan step you'll see with Terraform in Lesson 18, one flag earlier. What-if reports exactly what would be created, modified, or left unchanged, without touching anything — the same review-before-you-commit idea this course keeps coming back to.

## Segment 3 (screenshot: the deployment pane)

Run the deployment from inside VS Code instead, and the Bicep extension opens a deployment pane showing live progress resource by resource — a convenience over the CLI, not a different deployment, since under the hood it runs the exact same command.

## Segment 4 (code: scope)

Every deployment targets a scope. A resource-group deployment is the right scope for almost everything in this course — a storage account, an Event Hub, an Azure SQL server all live inside one. A subscription-scoped deployment is for things that live above any single resource group, like the resource group itself.

## Segment 5 (outro)

One command, a dry run first, a live view if you want it. Next up: deploying Azure SQL with Bicep.
