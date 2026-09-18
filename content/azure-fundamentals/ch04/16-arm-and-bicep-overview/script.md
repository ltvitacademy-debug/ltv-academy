# Script — ARM & Bicep, Overview

## Segment 1 (title)

The CLI commands from Lesson 15 are imperative — you type the exact steps. Infrastructure as Code takes a different approach: you describe the resources you want, and a tool figures out what needs to happen.

## Segment 2 (code: ARM templates)

An ARM template is Azure's native Infrastructure as Code format — a JSON file describing resources and how they relate. Everything you do in the Portal or CLI ultimately goes through the same Azure Resource Manager engine ARM templates talk to directly.

## Segment 3 (code: Bicep compiles to ARM)

Bicep is a language built to make writing ARM templates less painful. You write Bicep, a compiler converts it into the exact same ARM JSON underneath — nothing is different at deployment time, it's just a friendlier way to author the same result.

## Segment 4 (code: where this course stops)

This is a conceptual overview, not hands-on authoring — the Terraform and Bicep for Data Engineers course covers Bicep in real depth, with real files, deployments, and CI/CD. What matters here is the vocabulary and the relationship.

## Segment 5 (outro)

Next up: Deploying Your First Resource — tying together resource groups, storage accounts, and the CLI into one real walkthrough.
