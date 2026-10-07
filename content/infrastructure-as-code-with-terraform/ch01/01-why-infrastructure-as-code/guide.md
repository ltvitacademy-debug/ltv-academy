# Why Infrastructure as Code

Welcome to Infrastructure as Code with Terraform. Throughout this course you'll build out real infrastructure for **Northbridge Retail**, a mid-size e-commerce retailer that is modernizing its Azure and AWS footprint. Before you write a single line of Terraform, this lesson makes the case for why anyone bothers — what breaks when infrastructure is provisioned by hand, and what changes once it's described in a file instead.

## What you'll learn

- The problems manual, click-driven provisioning creates as a team and its infrastructure grow
- What "Infrastructure as Code" actually means: describing infrastructure in a text file instead of clicking through a console
- Why that text file can be reviewed, versioned, and re-run exactly like application code
- Where Terraform fits into this course and the rest of the DevOps Engineer path

## The problem: provisioning by hand doesn't scale

Northbridge Retail's platform team started small — a couple of virtual machines clicked into existence in the Azure Portal to run the order-processing service, a storage account created on the fly to hold product images. That worked fine until the team needed a second environment. Nobody had written down the exact subnet ranges, VM sizes, or storage redundancy settings they'd chosen the first time, so staging quietly drifted from production. Six months later, when a VM was accidentally deleted, the only record of how it was configured lived in one engineer's memory — and that engineer had since left the company.

None of this is a Northbridge-specific failure. It's what happens to every team that provisions cloud infrastructure by clicking through a console: the knowledge of "what exists and why" lives in people's heads instead of anywhere durable.

## What "as code" actually means

Infrastructure as Code (IaC) means describing the infrastructure you want in a text file, instead of clicking buttons to create it:

```hcl
resource "azurerm_resource_group" "northbridge" {
  name     = "rg-northbridge-prod"
  location = "eastus2"
}
```

That file gets committed to Git, reviewed through a pull request the same way application code is, and run through a tool — Terraform, in this course — that reads the file and makes the real infrastructure match it. The file is the single source of truth. Anyone can open it and know exactly what exists, without having to log into a portal and go looking.

## Why a text file beats a click

- **Repeatable** — the same file produces the same infrastructure every time, in dev, staging, or production. No more "it worked when I clicked it the first time."
- **Reviewable** — before anything changes, Terraform shows a diff of exactly what will be created, changed, or destroyed, so a teammate can review it like a code change.
- **Recoverable** — if a resource gets deleted by accident, the file is still there. Running it again rebuilds exactly what was lost.

## Where Terraform fits in this course

Terraform is the IaC tool this course teaches end to end. It isn't the only one — Chapter 1 also surveys the landscape — but it's the one most widely used across both Azure and AWS, which is exactly what Northbridge Retail needs. From here you'll learn Terraform's own language (HCL), how it tracks what it has created (state), how to package reusable configuration (modules), and then use all of it to actually provision Northbridge's Azure and AWS infrastructure in Chapters 5 and 6.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure as Code (IaC) | Describing infrastructure in a text file instead of creating it by hand through a console |
| Source of truth | The single file (or set of files) that defines what infrastructure should exist |
| Drift | When real infrastructure no longer matches what was originally configured or documented |
| Terraform | The IaC tool this course teaches, used to provision infrastructure across many cloud providers |
