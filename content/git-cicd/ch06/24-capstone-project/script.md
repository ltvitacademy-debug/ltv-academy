# Script — Capstone: A Data Project With a Real CI/CD Pipeline

## Segment 1 (title)

This capstone has one goal: prove you can set up real Git hygiene and a real CI/CD pipeline from a blank repository, applied to a project of your own, not another walkthrough of retail-orders-analytics.

## Segment 2 (steps: the four deliverables)

Four deliverables: proper Git hygiene with a real gitignore and at least one feature merged through a real pull request. At least one real code review with a line comment and a suggestion. A working CI job that runs on every pull request. A working deploy job, gated to only run on a push to main, using real secrets configured in GitHub.

## Segment 3 (steps: what done looks like)

Done means a stranger could clone the repository, read the gitignore and the workflow file, and understand exactly how a change gets proposed, tested, reviewed, and deployed — without you explaining anything out loud.

## Segment 4 (steps: a realistic order of operations)

A realistic order: set up the repository and gitignore before writing any models. Get dbt build working locally before wiring it into CI. Deliberately break something once CI exists, to prove it actually catches failures. Add the deploy job last, once CI is solid.

## Segment 5 (outro)

Next lesson: wrapping up and presenting this work as part of a real portfolio.
