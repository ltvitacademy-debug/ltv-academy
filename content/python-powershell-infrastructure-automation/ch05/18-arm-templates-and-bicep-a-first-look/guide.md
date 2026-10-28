# Lesson 18 — ARM Templates and Bicep: A First Look

**Chapter 5 · Infrastructure as Code Previews · Lesson 18 of 32**

## What you'll learn

- What ARM templates are, and why they've been Azure's native deployment
  format since Azure Resource Manager itself was introduced
- What Bicep is, why Microsoft built it, and why it's now Microsoft's
  own recommended way to author Azure IaC instead of hand-written JSON
- How to read a simple Bicep file and see the declarative pattern from
  Lesson 17 in real, deployable syntax
- How a Bicep deployment relates to the `New-Az*` cmdlets you already
  know from Chapter 2

## ARM templates: Azure's native format

Every resource you've created in this course so far — with a
PowerShell cmdlet, a Python SDK call, or an `az` CLI command — is
ultimately handled by **Azure Resource Manager (ARM)**, the control
plane underneath all of Azure. ARM has its own native deployment
format: **ARM templates**, written in JSON, that declare the resources
you want and get submitted to Azure as a single deployment.

An ARM template is readable, but verbose — a small storage account
declaration runs to dozens of lines of JSON, with explicit `"$schema"`,
`"contentVersion"`, and `"parameters"` blocks before you even reach the
`"resources"` array. That verbosity isn't a defect; it's just raw JSON
describing exactly what ARM's API expects. It's also why Microsoft
built something easier to write by hand.

## Bicep: the DSL that compiles to ARM

**Bicep** is a domain-specific language, also built by Microsoft,
whose entire job is to compile down to ARM JSON. You never hand-author
the verbose JSON yourself — you write much shorter, cleaner Bicep, and
either `az bicep build` or the deployment command itself compiles it to
an ARM template behind the scenes before Azure ever sees it. Since
2023, Microsoft has positioned Bicep as its **recommended** way to
author Azure IaC — new Azure documentation and quickstarts lead with
Bicep first, ARM JSON second.

```bicep
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'ltvstorage01'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}
```

Compare that against Chapter 2's `New-AzStorageAccount` cmdlet. Both
ultimately ask ARM to create the same kind of resource. The cmdlet is
an instruction executed once, right now. The Bicep block is a
standing declaration of what should exist — deploy it today, deploy it
again next month, and ARM only changes whatever's actually different
from what's declared.

## Deploying a Bicep file

You deploy a Bicep file with the same Azure CLI you already used in
Chapter 4, just a different subcommand:

```
az deployment group create `
  --resource-group rg-ltv `
  --template-file storage.bicep
```

Before committing to it, `az deployment group what-if` (Lesson 17)
runs against a Bicep file exactly as it does against ARM JSON, showing
you what would change without touching anything. And because Bicep
compiles to ARM, every ARM capability — parameters, variables, loops
over a list of resources, outputs you can feed into another deployment
— is available in cleaner syntax, not a separate, lesser feature set.

## Tooling that makes Bicep easier to trust

Bicep isn't just a syntax preference — it comes with real tooling
integration: the **Bicep extension for VS Code** gives live
IntelliSense and schema validation as you type, catching a typo'd
property name before you ever run a deployment. The **Azure Portal**
can generate a Bicep file from an existing resource via its "Export
template" action (switching the export format to Bicep), which is a
fast way to see real, working syntax for a resource type you haven't
declared by hand yet.

## Key terms

| Term | Meaning |
|---|---|
| ARM (Azure Resource Manager) | Azure's control plane; every resource creation, by any tool, ultimately goes through it |
| ARM template | Azure's native JSON deployment format, submitted directly to ARM |
| Bicep | Microsoft's DSL for authoring Azure IaC; compiles to ARM JSON, now Microsoft's recommended authoring layer |
| az deployment group create | The Azure CLI command that deploys a Bicep or ARM template to a resource group |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: what
does Bicep actually produce when you run a deployment, and why does
Microsoft recommend writing Bicep instead of ARM JSON by hand?
