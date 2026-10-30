# Lesson 1 — The Ask Grows: Containers and a Second Cloud

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 1 of 16**

## What you'll learn

- How this project picks up where the Beginner-tier migration left off
- Who Casey Lindqvist is, and why a new VP of Engineering changes the shape of the ask
- The four deliverables Priya and Casey actually want
- Why "add AWS" here means a backup target, not a migration

## Where the Beginner project left off

At Driftwood Outdoor Apparel, Theo Bryant's Beginner project solved a real, deadline-driven problem
for one stakeholder: IT Manager Priya Suresh needed the storefront app off an aging single server
before it became a liability. Theo moved the app's static product images into Azure Blob Storage
and migrated the application itself onto a single Azure VM, with basic monitoring so Priya would
hear about a problem before customers did. That project shipped, and it held up.

A single VM is a real migration, not a toy — but it's also exactly one thing away from a bad
week: one VM reboot, one undersized disk, one manual deploy that goes sideways at 11pm.

## A new VP of Engineering walks in

A few months later, Priya introduces Theo to **Casey Lindqvist**, Driftwood's newly hired
**VP of Engineering**. Casey inherited the systems Theo built and, reasonably, doesn't want every
future project to be another one-off: a system that only Theo can rebuild from memory isn't a
platform, it's a single point of institutional knowledge.

Priya and Casey come to Theo together with a bigger ask — not a rewrite, an extension.

## The four deliverables

1. **Containerize the app.** Package the storefront app with Docker so it runs the same way on
   any machine, instead of depending on whatever got hand-installed on one VM.
2. **Add Terraform.** Describe Driftwood's Azure infrastructure in code, so it can be rebuilt,
   reviewed, and audited — not recreated by someone remembering which portal blades they clicked.
3. **Build a CI/CD pipeline.** A push to the main branch should build, test, and deploy the app
   automatically. No more manual deploys at 11pm.
4. **Add AWS — specifically as a backup/DR target.** Not a migration, not a second production
   environment. Driftwood's data should not live in exactly one cloud with no copy anywhere else.

## Why "backup target," not "migrate to AWS"

Casey is explicit about the fourth item's scope, and it's worth stating precisely because it
shapes every AWS-related lesson from here on: Azure stays home. AWS exists only so that if Azure
Storage, an Azure region, or Driftwood's own Azure account had a very bad day, there would still
be a copy of the app's data somewhere else. Nothing about the storefront app itself moves to AWS
in this project.

## Key terms

| Term | Meaning |
|---|---|
| Containerization | Packaging an application with everything it needs to run, so it behaves identically across machines |
| Infrastructure as Code (Terraform) | Describing cloud infrastructure in version-controlled configuration instead of building it by hand |
| CI/CD pipeline | Automation that builds, tests, and deploys code on every push, without a person running the commands |
| Backup/DR target | A second location that holds a copy of data for recovery — not a second place the application runs |

## Lab

Without writing any code yet, write down the four deliverables in your own words, and next to
each one note whether it's mainly Priya's concern, mainly Casey's, or both. You'll check this
answer against Lesson 2.

## Check yourself

You're ready for Lesson 2 when you can list all four deliverables from memory and explain, in one
sentence, why adding AWS doesn't mean moving the storefront app there.
