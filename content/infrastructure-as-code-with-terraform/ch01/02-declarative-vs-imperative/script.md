# Script — Declarative vs. Imperative

## Segment 1 (title)

Terraform is a declarative tool, and that word is going to do a lot of work in this course. Let's see exactly what it means, and what the alternative looks like, using a task Northbridge Retail's team actually needs: standing up a resource group and a storage account.

## Segment 2 (code)

Here's that task written imperatively, as an Azure CLI script — a list of steps, run in order, once. You're responsible for every step and for the order they happen in.

## Segment 3 (code)

And here's the same task written declaratively, in Terraform. You describe both resources and their relationship, and never write "create the resource group first." Terraform works that order out on its own from the reference between the two blocks.

## Segment 4 (steps)

Run the CLI script a second time, and it either errors out because the resource group already exists, or tries to duplicate something. Run terraform apply a second time, and it reports "no changes" — because it compared your file against real infrastructure and found they already match. That property is called idempotent.

## Segment 5 (outro)

Declarative, idempotent infrastructure is what the rest of this course builds on. Next up, Lesson 3: a quick tour of the IaC tool landscape, and where Terraform fits in it.
