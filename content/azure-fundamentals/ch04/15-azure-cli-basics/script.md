# Script — Azure CLI Basics

## Segment 1 (title)

The Azure CLI does everything the Portal does, but through typed commands instead of clicks. Both talk to the exact same Azure — the difference is how you do it, not what's possible.

## Segment 2 (steps: why the CLI matters)

A CLI command is scriptable — save it, rerun it, automate it. Repeatable — the tenth run creates exactly the same thing as the first. And fast — one command instead of ten clicks across three menus.

## Segment 3 (code: commands a beginner needs)

az login signs you in. az account show confirms which subscription you're using. az group create makes a resource group — the same kind you saw in the Portal, just typed instead of clicked.

## Segment 4 (code: reading a command)

az group create --name rg-demo --location eastus breaks into pieces: az calls the CLI, group create is the action, and each --flag is a named parameter. Almost every command follows that same shape.

## Segment 5 (outro)

Next up: ARM and Bicep — Azure's Infrastructure as Code formats, one more step past typing individual commands one at a time.
