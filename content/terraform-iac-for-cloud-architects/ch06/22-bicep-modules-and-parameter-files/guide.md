# Lesson 22 — Bicep Modules and Parameter Files

**Chapter 6 · Bicep Deep Dive · Lesson 22 of 32**

## What you'll learn

- How a Bicep `module` block calls a separate `.bicep` file, the same
  reusability idea you already built with Terraform modules in
  Chapter 4
- How to pass parameters into a module and read values back out
  through its outputs
- What a `.bicepparam` file is, and how it supplies different values
  per environment
- How the older JSON parameter file format compares, and when you'll
  still see it

## Modules: a separate .bicep file, called by name

Chapter 4 built a real, reusable Terraform module — a self-contained
`.tf` configuration referenced by `source =` and given its own inputs
and outputs. Bicep has the same idea, in different syntax: a
**module** is just another `.bicep` file, and you call it with the
`module` keyword instead of `resource`.

`modules/network.bicep`:

```bicep
param vnetName string
param addressPrefix string

resource vnet 'Microsoft.Network/virtualNetworks@2023-09-01' = {
  name: vnetName
  location: resourceGroup().location
  properties: {
    addressSpace: { addressPrefixes: [ addressPrefix ] }
  }
}

output vnetId string = vnet.id
```

`main.bicep`:

```bicep
module network 'modules/network.bicep' = {
  name: 'networkDeployment'
  params: {
    vnetName: 'vnet-prod'
    addressPrefix: '10.0.0.0/16'
  }
}

output networkId string = network.outputs.vnetId
```

Same mechanics as the Terraform module: declare `param`s the module
needs, pass values in through `params`, and read a value back out
through the module's `output`. The `name: 'networkDeployment'` isn't
the virtual network's name — it's the name of the inner deployment
Bicep creates for that module call, visible in the Azure Portal's
deployment history.

## .bicepparam files: typed parameter files per environment

Chapter 5 covered Terraform variable files per environment
(`prod.tfvars`, `dev.tfvars`). Bicep's equivalent is a
**`.bicepparam` file** — a typed file tied to one specific `.bicep`
template, checked against that template's actual parameter types at
compile time:

```bicep
using 'main.bicep'

param environment = 'prod'
param addressPrefix = '10.1.0.0/16'
```

The `using` statement is what ties a `.bicepparam` file to its
template, so Bicep can catch a typo'd parameter name or a wrong type
before deployment, not after. Deploy with it the same way you'd
deploy with a Terraform `-var-file`:

```
az deployment group create \
  --resource-group rg-prod \
  --template-file main.bicep \
  --parameters prod.bicepparam
```

## The older JSON parameter file format

Before `.bicepparam` existed, Bicep deployments used the ARM JSON
parameter file format, and you'll still see it in older repositories:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "environment": { "value": "prod" }
  }
}
```

It works the same way — one JSON file per environment, passed with
`--parameters prod.parameters.json` — but it isn't checked against
the template's parameter types the way `.bicepparam` is, and it
carries the same verbose JSON boilerplate ARM templates always have.
New Bicep projects use `.bicepparam`; only keep writing JSON parameter
files if you're maintaining an existing one.

## Key terms

| Term | Meaning |
|---|---|
| `module` | Calls a separate `.bicep` file as a nested deployment, passing it parameters and reading back its outputs |
| Module `output` | A value a module exposes, read from the caller as `<moduleName>.outputs.<name>` |
| `.bicepparam` file | A typed parameter file tied to one template via `using`, checked against that template's parameter types |
| JSON parameter file | The older, untyped parameter file format, still supported but superseded by `.bicepparam` |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking:
what does the `using` statement at the top of a `.bicepparam` file
actually do, and how is that different from a Terraform `.tfvars`
file?
