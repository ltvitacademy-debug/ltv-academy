# Lesson 1 — What Is Infrastructure as Code, and Why?

**Chapter 1 · Infrastructure as Code Fundamentals · Lesson 1 of 22**

## What you'll learn

- What "infrastructure as code" actually means, precisely
- Why clicking through the Azure Portal doesn't scale past one environment
- Declarative vs. imperative — the distinction that makes IaC work
- What this course adds to resources you already know how to provision by hand

## You already know how to provision these resources

Data Engineering Foundations Lesson 1 had you create an Azure Storage
Account by hand in the Portal. Fabric & Real-Time Analytics Lesson 64
had you size a Fabric Capacity, and Lesson 20 had you stand up an
Event Hub — also by hand, click by click. This course does **not**
re-teach what any of those resources are or why you'd use them. It
teaches the one thing none of those earlier lessons could: describing
that same resource in a text file, checked into Git, applied the same
way every time.

## The problem with clicking

Provisioning a resource by hand in the Portal works exactly once —
for that one resource, in that one environment, remembered only by
whoever clicked. The moment you need a second, identical environment
(a staging Fabric workspace that matches production, a dev Storage
Account with the same settings as the real one), manual provisioning
has no way to guarantee "identical." Nobody reviews a sequence of
clicks the way Git/GitHub/CI-CD Lesson 10 taught you to review a pull
request — there's no diff, no history, no "who approved this change
and why."

```
Manual provisioning:        Infrastructure as code:
- works once, by memory     - a text file, checked into Git
- no diff, no review        - reviewed the same way as app code
- "works on my subscription"- the same file applies to any subscription
- rebuilding = re-clicking  - rebuilding = re-running the file
```

## Declarative, not imperative

An Azure CLI script (`az storage account create ...`) is
**imperative** — a list of steps to run, in order, once. Terraform
and Bicep are **declarative** — you describe the *end state* you
want ("a Storage Account named X, in region Y, with these settings"),
and the tool figures out what needs to change to get there. Run it
again with no changes, and nothing happens. Run it again after
someone renamed a tag in the Portal, and the tool tells you exactly
what drifted.

```
Imperative (a script):             Declarative (IaC):
az group create ...                resource "azurerm_storage_account" "x" {
az storage account create ...        name     = "x"
# run twice = two attempts,          location = "eastus2"
# second one may just error         # ...
                                    }
                                    # run twice = idempotent no-op
```

## Why this matters at the scale this track has been building toward

Career & Capstone's Project 2 (a data warehouse migration) and
Project 3 (a streaming fraud detector) both needed a full set of
Azure resources provisioned before a single pipeline could run. IaC
is what makes that provisioning step reviewable, repeatable across
dev/staging/production, and recoverable if a resource is ever
accidentally deleted — rebuild from the file, not from memory of
what settings were originally chosen.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure as code (IaC) | Describing infrastructure in a text file instead of clicking through a console |
| Declarative | Describing the end state you want; the tool computes the steps to get there |
| Idempotent | Running the same IaC file twice produces the same result, not two attempts |
| Drift | When real infrastructure no longer matches what the code says it should be |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does running a declarative IaC file a second time with no code
changes do nothing, while running an imperative script a second time
can actually cause an error?
