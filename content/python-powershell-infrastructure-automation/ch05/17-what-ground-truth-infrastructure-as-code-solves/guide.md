# Lesson 17 — What "Ground Truth" Infrastructure as Code Solves

**Chapter 5 · Infrastructure as Code Previews · Lesson 17 of 32**

## What you'll learn

- The real difference between an imperative script (what Chapters 1-4 taught) and declarative Infrastructure as Code
- Why "describe the steps" and "describe the end state" are two genuinely different questions, not two syntaxes for the same thing
- What configuration drift is, and why a script can't catch it but a declarative tool can
- Why this gap is the reason the next three lessons — and the next course in this path — exist at all

## Two different questions

Every script you've written so far in this course answers the question
**"what steps do I run?"** `New-AzStorageAccount`, a Python Boto3 call,
an `az` CLI command in a Bash loop — each one is an instruction: do
this, then do that. That's **imperative** automation, and it's genuinely
useful; it's why Chapters 1-4 exist.

Declarative Infrastructure as Code (IaC) answers a different question:
**"what should exist?"** You write down the end state you want — one
storage account, this name, this SKU, this region — and a tool
compares that description to what's actually deployed, then figures
out, on its own, which steps (if any) are needed to close the gap.
You never write the steps. The tool computes them.

```
# Imperative — Chapter 2's style: you specify the action
New-AzStorageAccount -ResourceGroupName "rg-ltv" -Name "ltvstorage01" `
  -Location "eastus" -SkuName "Standard_LRS"

# Declarative — this chapter's style: you specify the outcome
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'ltvstorage01'
  location: 'eastus'
  sku: { name: 'Standard_LRS' }
}
```

Run the PowerShell command twice and the second run either errors
("already exists") or, if you didn't build in a check, tries to create
a duplicate — which is exactly why Chapter 1's idempotency lesson had
to teach you to code those checks yourself. Run the Bicep file twice
and nothing breaks: the tool sees the storage account already matches
the declared state and simply does nothing. Idempotency isn't something
you add to declarative IaC. It's the default behavior.

## Drift: the problem a script literally cannot see

Here's the gap none of your Chapter 1-4 scripts can close. Suppose
someone opens the Azure Portal and manually changes that storage
account's SKU, or disables a firewall rule a runbook depends on. Your
automation scripts have no idea this happened — they only run when you
run them, and they only check what you told them to check.

A declarative IaC tool can tell you. Before applying anything, Azure's
own CLI supports `az deployment group what-if --resource-group rg-ltv
--template-file main.bicep`, which compares the live resource graph to
the declared template and prints exactly what changed and what would
change — additions, deletions, and in-place modifications — without
touching anything. Terraform has the equivalent `terraform plan`. AWS
CloudFormation has `aws cloudformation detect-stack-drift`. This is
**drift detection**: the ability to answer "has reality quietly moved
away from what we declared?" on demand, as a built-in feature of the
tool, not something you'd have to script by hand by comparing
`Get-AzStorageAccount` output against a saved baseline every time.

## Why this matters for where the course goes next

Chapters 1-4 gave you real, production-grade imperative tooling —
PowerShell, Python, and CLI scripts that provision and operate
resources on both Azure and AWS. That's not being thrown away; plenty
of real automation (scheduled start/stop jobs, compliance sweeps,
incident response) is correctly imperative, and Chapter 6 comes back to
exactly that. But "did my environment drift from what it's supposed to
be" is a declarative question, and the next two lessons look at the two
cloud-native tools built to answer it — Azure's ARM/Bicep and AWS
CloudFormation — before Lesson 20 explains why the path's next course
goes further still, into Terraform.

## Key terms

| Term | Meaning |
|---|---|
| Imperative automation | Code that specifies the steps to take, in order (PowerShell, Python, CLI scripts) |
| Declarative IaC | Code that specifies the desired end state; the tool computes and runs the steps needed to reach it |
| Idempotent | Safe to run repeatedly — re-running produces no change once the declared state is already reached |
| Configuration drift | When a live resource's actual state no longer matches what was declared or last deployed |
| Drift detection | A declarative tool's built-in ability to compare live state against declared state and report differences |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
can a declarative IaC tool detect drift that a Chapter 2 PowerShell
script cannot, even if both are pointed at the same resource?
