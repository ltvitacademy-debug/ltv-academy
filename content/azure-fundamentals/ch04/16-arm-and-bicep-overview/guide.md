# Lesson 16 — ARM & Bicep, Overview

**Chapter 4 · Working in Azure · Lesson 16 of 18**

## What you'll learn

- Infrastructure as Code (IaC) — describing what you want, not typing steps to build it
- ARM templates — Azure's native IaC format, written in JSON
- Bicep — a friendlier language that compiles down to ARM underneath
- Where this course stops, and where the Terraform & Bicep course picks up

## From commands to descriptions

Lesson 15's CLI commands are still **imperative** — you're telling Azure the
exact steps to take, one command at a time: create this, then create that.
**Infrastructure as Code (IaC)** takes a different approach: you write a file
that *describes* the resources you want to exist, and a tool figures out
what needs to happen to make reality match that description. Run the same
file twice, and nothing breaks the second time — the tool sees the resources
already exist and does nothing, rather than trying to create duplicates.

## ARM templates: Azure's native format

An **ARM template** (Azure Resource Manager template) is Azure's original,
native IaC format — a JSON file that describes one or more resources, their
settings, and how they relate to each other. Every single thing you've done
in the Portal or through the CLI in this course — ultimately, underneath the
surface — goes through the same Azure Resource Manager engine that ARM
templates talk to directly. ARM templates are powerful and completely
supported, but raw JSON is verbose: describing even a simple resource group
and storage account by hand runs to dozens of lines of nested brackets and
quotes.

## Bicep: the friendlier layer on top

**Bicep** is a language Microsoft built specifically to make writing ARM
templates less painful. You write Bicep, and a compiler converts it into the
exact same ARM JSON underneath — nothing is lost or different at deployment
time, it's purely a friendlier way to author the same result:

```
Bicep (what you write)         ARM JSON (what Azure actually deploys)
------------------------       ---------------------------------------
resource sa 'Microsoft.       {
  Storage/storageAccounts@      "resources": [{
  2023-01-01' = {                 "type": "Microsoft.Storage/
  name: 'ltvdemostorage'           storageAccounts",
  location: 'eastus'              "apiVersion": "2023-01-01",
  sku: { name: 'Standard_LRS' }   "name": "ltvdemostorage",
}                                 "location": "eastus",
                                  "properties": { ... }
                                }]
                              }
```

Bicep is shorter, easier to read, and catches more mistakes before you
deploy anything — but it isn't a different underlying system. It's a nicer
way to write the exact same ARM template.

## Where this course stops, on purpose

This lesson is a conceptual overview, not a hands-on authoring lesson —
you're not writing a Bicep file here. That's intentional: the **Terraform &
Bicep for Data Engineers** course in this catalog covers Bicep authoring in
real depth — real files, real deployments, remote state, CI/CD. What matters
at this level is recognizing the vocabulary and the relationship: ARM is the
native format, Bicep compiles down to it, and IaC in general means
describing an end state instead of typing steps.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure as Code (IaC) | Describing the resources you want in a file, instead of typing steps |
| ARM template | Azure's native Infrastructure as Code format, written in JSON |
| Bicep | A friendlier language that compiles down to the same ARM JSON |
| Imperative | Telling a tool the exact steps to take (what Lesson 15's CLI commands do) |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: what's the
actual relationship between Bicep and an ARM template — are they two
different systems, or the same thing written two different ways?
