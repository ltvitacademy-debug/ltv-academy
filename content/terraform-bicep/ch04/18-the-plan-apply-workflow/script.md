# Script — The Plan → Apply Workflow

## Segment 1 (title)

Terraform plan compares your code, your state, and what's actually deployed in Azure, and prints what would change — without changing anything.

## Segment 2 (code: terraform plan)

A plus means create, a tilde means update in place, a minus means destroy. Reading those symbols in a plan is how you catch a mistake before it happens, not after.

## Segment 3 (code: terraform apply)

Terraform apply shows that same plan, then asks for confirmation. Type anything other than yes — even just pressing Enter — and nothing is created, changed, or destroyed.

## Segment 4 (steps: reviewing the plan, not just the code)

Git/GitHub/CI-CD Lesson 10 taught you to review a pull request's code. A Terraform plan shows the actual computed effect of that code — whether a change forces a resource to be destroyed and recreated, in the open, before anyone applies it.

## Segment 5 (outro)

Plan shows the diff, apply confirms it. Next up: what happens when a resource already exists and Terraform doesn't know about it yet.
