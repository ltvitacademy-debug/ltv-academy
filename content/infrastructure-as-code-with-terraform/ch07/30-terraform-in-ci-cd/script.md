# Script — Terraform in CI/CD

## Segment 1 (title)

Running terraform apply from a laptop works for learning, but it doesn't scale to a team. This lesson moves Northbridge Retail's Terraform runs into a CI/CD pipeline, where every change is reviewed before it touches real infrastructure.

## Segment 2 (steps)

If every engineer applies from their own machine, there's no shared record of who ran what or what the plan said beforehand, and two people applying against the same state at once invites corruption. Moving apply into CI/CD means it only ever runs in one consistent, logged environment.

## Segment 3 (code)

Here's the plan stage of a GitHub Actions pipeline, running on every pull request that touches the infrastructure folder: format check, init, and plan — posting exactly what would change for a reviewer to see before anything is approved.

## Segment 4 (code)

The apply stage only runs after that pull request is merged to main. Nothing ever applies without first having been reviewed as a plan, and provider credentials live in the CI platform's encrypted secrets store, never in the repository.

## Segment 5 (outro)

With changes reviewed and applied through a pipeline, next up is Lesson 31: policy as code, for enforcing rules automatically before anything applies.
