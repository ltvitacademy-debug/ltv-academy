# New Environment Deployment & Governance Checklist

A before-you-click (or before-you-type) checklist for standing up a new
project environment in Azure, pulling together naming, region, tagging,
access, and cost-control decisions from across Chapters 1, 3, and 4 into
one pass — instead of making each decision in isolation partway through a
deployment.

## 1. Resource group (Lesson 5)

- [ ] Pick a name that identifies the project/environment, e.g.
      `rg-<project>-<environment>` (`rg-harpswell-dev`)
- [ ] Confirm which **subscription** it belongs to — the billing and
      access boundary (Lesson 5)
- [ ] Remember: deleting this resource group later deletes everything
      inside it, in one action — useful for tearing an environment down,
      dangerous if it's the wrong group

## 2. Region (Lesson 3)

- [ ] Pick a region close to the actual users, not just the first option
      in the list (latency)
- [ ] Check whether any data residency or compliance requirement
      (Lesson 14) restricts which region is even allowed
- [ ] Confirm the services you plan to use are actually offered in that
      region

## 3. Compute and storage choice (Lessons 2, 6, 7)

- [ ] Does this workload need OS-level control (a specific OS version,
      legacy software)? → Virtual Machine (IaaS)
- [ ] Is this a standard web app/API with no OS-level requirement? →
      App Service (PaaS)
- [ ] Are files unstructured and just stored/retrieved (images, logs,
      backups)? → Blob Storage
- [ ] Do multiple systems need to mount this as a shared network drive? →
      Azure Files

## 4. Identity and access (Lessons 9, 11)

- [ ] Grant access to a **group**, not individual users, wherever more
      than one person needs the same permission
- [ ] Apply the **least-privilege** test: what's the smallest role and
      narrowest scope that still lets this identity do its job — not the
      biggest role that would work
- [ ] Confirm the scope of each role assignment: subscription, resource
      group, or single resource (they behave differently)

## 5. Tags (Lesson 13)

- [ ] `Environment` (e.g. `Dev`, `Production`)
- [ ] `CostCenter` or `Owner` — whoever's budget this comes out of
- [ ] `Project` — so cost and ownership can be filtered by project later,
      not just by resource group

## 6. Cost control (Lesson 12)

- [ ] Run the Pricing Calculator for the planned resources *before*
      deploying, not after the first invoice
- [ ] Decide pay-as-you-go vs. reserved instance based on how predictable
      this workload's usage actually is
- [ ] Set a **budget** and an **alert** (50%/90%/100%) on the resource
      group or subscription this environment lives in

## 7. Clean-up plan (Lesson 17)

- [ ] For anything temporary (a practice deployment, a short-lived test
      environment), decide *now* when it gets deleted — don't leave it
      running "just in case," since pay-as-you-go billing starts the
      moment a resource exists
