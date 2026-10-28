# Lesson 32 — Chapter Capstone: Azure Administration Review

**Chapter 8 · Capstone: Deploying and Administering an Azure Environment · Lesson 32 of 32**

## What you'll learn

- How governance and identity (Chapters 1-2) set the boundaries everything else in this course operates inside
- How compute and storage (Chapters 3-4) and networking (Chapter 5) fit together into the multi-tier shape Lesson 29 built
- Why the CLI (Chapter 6) is the thread running through every lesson in this course, not just its own chapter
- How monitoring and cost management (Chapter 7) turn a deployed environment into one that's actually operated, not just built

## Governance and identity: the boundaries first

Before Lesson 29 created a single VM, it created a resource group — tagged with `environment`, `costcenter`, and `owner` the moment it existed. That's Chapter 1's whole argument: governance isn't paperwork added after the fact, it's the container everything else gets built inside. Chapter 2's RBAC showed up the same way in Lesson 30 — the ops team's `Virtual Machine Contributor` assignment was scoped to `briarcliff-rg` specifically, not the subscription, because the right question for any access grant is never just "can they do this?" but "where, exactly, can they do it?"

## Compute and storage, side by side

Chapters 3 and 4 gave this course two separate vocabularies — VM sizes, managed disks, availability options on one side; storage accounts, redundancy tiers, access patterns on the other — and Lesson 29 used both in the same deployment. `web-vm1` and `app-vm1` are `Standard_B2s`, a deliberately modest, burstable size. The `briarcliffdata001` storage account is `Standard_LRS`, locally redundant and standard performance. Neither choice is exciting, and that's the point: Chapter 4's lesson on redundancy tiers and Chapter 3's lesson on VM sizing both come down to matching the tier to the actual workload, not defaulting to the biggest option available. Lesson 31's whole incident was exactly that discipline failing once — a VM and a disk both provisioned above what a dev/test workload needed, quietly costing Briarcliff money for two weeks before anyone noticed.

## Networking: the subnet boundary that does real work

Chapter 5's VNets and subnets weren't an abstract diagram — Lesson 29 split one VNet into `web-subnet` and `app-subnet` specifically so Lesson 30's NSG rules would have something meaningful to attach to. `web-nsg` allows the internet in on 80 and 443. `app-nsg` allows in only from `10.20.1.0/24` — the web subnet itself — and nowhere else. That's two chapters' worth of ideas (subnetting from Chapter 5, security rule scoping also from Chapter 5) doing one job: making sure the app tier only ever hears from the one place it's supposed to.

## The CLI: the thread, not a chapter of its own

Chapter 6 taught `az` as its own subject, but by the time you reached Lesson 29 it had already disappeared into the background of every other chapter — `az group create`, `az vm create`, `az network nsg rule create`, `az role assignment create`, `az monitor metrics alert create`, `az consumption budget create`. Every one of those belongs to a different chapter's subject matter, and every one of them is also just an `az` command with a resource group, a name, and some parameters. That's what Chapter 6 was actually for: not a chapter about the CLI, but the chapter that made every other chapter's commands legible.

## Monitoring and cost: the difference between deployed and operated

An environment that's been built but isn't watched is only half finished, and Chapter 7 is what closed that gap. The CPU alert from Lesson 30 means a performance problem gets caught by an email instead of a complaint. The budget alert is what actually opened Lesson 31 — not a hunch, not a scheduled audit, but an automated threshold catching a real problem on day 19 of the month instead of on an invoice thirty days later. That's the difference between an environment you deployed once and one you're actually administering.

## Key terms

| Term | Meaning |
|---|---|
| Governance | The tagging, naming, and policy structure a resource group is built inside from the start, not added afterward |
| Tier boundary | The security line between application tiers, enforced here by both subnet placement and NSG rules |
| Right-sizing | Matching a VM size or disk tier to the actual workload instead of defaulting to the largest or fastest option |
| Operated vs. deployed | An environment with monitoring and cost alerts in place, versus one that was simply stood up and left alone |

## Check yourself

Walk through this chapter's four lessons in order — deploy, secure and monitor, troubleshoot a cost spike, review — and name one decision from Lesson 29 that only paid off because of something built in a later lesson. What was the decision, and which later lesson made it matter?
