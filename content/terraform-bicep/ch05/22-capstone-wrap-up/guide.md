# Lesson 22 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 5 · Capstone · Lesson 22 of 22**

## What this course covered, start to finish

Twenty-two lessons, one throughline: taking Azure resources you
already knew how to click through in a Portal, and learning to
describe them as reviewable, repeatable, rebuildable code instead.

```
Ch1  Fundamentals        declarative vs. imperative, state, the core idea
Ch2  Terraform           resource blocks, variables, real resources, modules
Ch3  Bicep               syntax, params, a real deployment, ARM underneath
Ch4  IaC in Practice     remote state, plan/apply, import, CI/CD
Ch5  Capstone            all of it, together, on one real data platform
```

## What the capstone actually proved

Lesson 21's project wasn't new material — it was proof that Lessons
1-20 actually compose into something real: a resource group, a
Storage Account, an Event Hub, and a Fabric Capacity, provisioned
together through a reusable module, protected by remote state,
reviewed through a real plan before anything applied. That's the
exact gap Career & Capstone's Project 2 and Project 3 both had —
real infrastructure, standing before any pipeline logic could run.

## Presenting this in an interview

Career & Capstone Lesson 80 already covered structuring a project
story — situation, design decisions, trade-offs, what you'd change.
The same structure applies here, with IaC-specific decisions worth
naming out loud: why a module for the landing zone and not for the
Fabric Capacity, why remote state from the start instead of migrating
to it later, why the plan output matters enough to review in a PR
before anyone runs apply.

## Where this fits in the bigger picture

This course sits in the Advanced stage of the Azure/Fabric Data
Engineer path, alongside Git/GitHub/CI-CD and Airflow — both already
built and available in this catalog. Finishing this course does not
mean the whole path is done; Kafka is still ahead in that same
Advanced stage for anyone who wants event streaming beyond a single
vendor's Eventstream. What this course *does* close out completely is
the "provision it as code" skill itself — genuinely usable the moment
you're back in any earlier course's Azure resources, Terraform or
Bicep file in hand instead of a mouse.

## You're done

There's no "Check yourself" question this time — there isn't a next
lesson in this course. You're ready when you can open the capstone's
`main.tf` (or `main.bicep`) and explain every resource block in it to
someone else, including why it's shaped the way it is.

Congratulations on finishing Terraform & Bicep for Data Engineers.
