# Script — Terraform vs. Bicep

## Segment 1 (title)

Terraform and Bicep are both declarative — but they made different bets about scope. Terraform speaks any cloud. Bicep speaks only Azure. Both bets are defensible, and real teams use both.

## Segment 2 (code: Terraform, one language any cloud)

Terraform, from HashiCorp, uses its own language called HCL. Swap the provider block, and the same tool provisions Azure, AWS, or GCP. That portability comes with a cost: Terraform manages its own state file, and you're responsible for storing it safely.

## Segment 3 (code: Bicep, Azure-only on purpose)

Bicep, from Microsoft, only targets Azure — and compiles down to ARM templates. Because Azure itself is the source of truth for what's deployed, there's no separate state file to lose or accidentally edit by hand.

## Segment 4 (steps: neither tool is wrong)

A company running only Azure often prefers Bicep for the simpler operational story. A company spanning Azure and AWS or GCP usually standardizes on Terraform. This course teaches both, so you can make that call on the job.

## Segment 5 (outro)

Same declarative idea, different scope. Next up: getting both tools actually installed on your machine.
