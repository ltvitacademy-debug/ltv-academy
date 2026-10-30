# Lesson 2 — Scoping the First Migration

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 2 of 10**

## What you'll learn

- How to split "migrate the catalog app" into the two concrete pieces it's actually made of
- Why naming what's explicitly out of scope matters as much as naming what's in
- How to sketch a minimal target architecture in plain English before opening the Azure Portal

## Splitting the ask into two real pieces

Lesson 1 turned Priya's request into a written scope: migrate the catalog app's static product
images and its application server to Azure, with basic monitoring, validated before launch.
That sentence is actually two separate migrations happening together:

1. **The static assets** — Driftwood's product images currently sit as files on the on-prem
   server's disk, referenced by the catalog app with local file paths. These need a new home
   that can serve files over the web reliably, without a single server being the only copy.
2. **The VM workload** — the catalog application itself (the code that renders product pages)
   currently runs as a process on that same on-prem server. It needs a new server to run on,
   somewhere Azure, configured close enough to the original that the app behaves the same way.

Treating these as one blurry task is how scope gets confused. Treating them as two pieces — one
a storage problem, one a compute problem — makes each one a problem you already have a pattern
for solving.

## In scope for this first project

- Standing up the Azure resources needed to host both pieces: a resource group, a storage
  account for the images, and a virtual machine for the application server.
- Moving the product images into Azure Blob Storage and updating the app's references so it
  reads images from their new location instead of the local disk.
- Standing up the application server workload on an Azure VM and validating it serves the same
  catalog pages correctly.
- Configuring basic monitoring — the kind of visibility the on-prem server never had — so a
  problem gets caught before a customer notices it.
- Testing the whole migrated setup end to end, documenting what was built, and presenting a
  cutover plan to Priya before the actual switch-over.

## Explicitly out of scope

Just as important as what's in scope is saying what's deliberately left out of this first
project, so nobody assumes it's happening quietly in the background:

- **Re-architecting the application** — this is a lift-and-shift of the existing app, not a
  rewrite. If the app runs on a single server today, it runs on a single Azure VM at the end of
  this project, not a container platform or a serverless redesign.
- **High availability or auto-scaling** — Priya asked for the app to survive the launch
  reliably, not for a multi-region, zero-downtime architecture. One VM, monitored well, is the
  right scope for a first project like this.
- **Migrating anything else Driftwood runs** — email, internal tools, other applications. This
  project is the catalog app, and only the catalog app.
- **Automated deployment pipelines** — getting code onto the new VM for this migration can be a
  manual, careful process. Building a repeatable CI/CD pipeline is real, valuable work, but it's
  not what this specific deadline needs.

Scoping down deliberately isn't cutting corners — it's matching the size of the solution to the
size of the actual problem, which is exactly what a first cloud project should teach.

## Sketching the target in plain English

Before opening the Azure Portal or CLI, it helps to describe the target setup in one paragraph,
the way you'd describe it to a non-technical teammate:

> *"One resource group holds everything for this project. Inside it: one storage account with a
> container for product images, set to a tier that keeps them fast to load since customers view
> them constantly; and one virtual machine running the catalog application, reachable over the
> web the same way the on-prem server was. Basic monitoring watches the VM's health and alerts
> Theo and Priya if something looks wrong."*

That plain-English sketch is the bridge between the business scope from Lesson 1 and the real
Azure resources Lesson 3 starts provisioning. If you can't describe your target in a paragraph
like this, you're not ready to start creating resources yet.

## Key terms

| Term | Meaning |
|---|---|
| Static asset migration | Moving files (here, product images) to object storage instead of a server's local disk |
| VM workload migration | Standing up the same application on a new virtual machine in a new environment |
| Lift-and-shift | Moving an existing workload to new infrastructure largely as-is, without redesigning it |
| Out-of-scope statement | An explicit list of what a project deliberately does not cover, agreed on up front |

## Lab

Write your own plain-English target sketch for Driftwood's migration, in one paragraph, as if
explaining it to Priya. Then write a short "out of scope" list of at least three things this
project is deliberately not doing. Compare both against the examples above.

## Check yourself

You're ready for Lesson 3 when you can explain, from memory, why "migrate the catalog app" is
really two separate migrations (storage and compute), and name at least two things this project
is deliberately leaving out of scope.
