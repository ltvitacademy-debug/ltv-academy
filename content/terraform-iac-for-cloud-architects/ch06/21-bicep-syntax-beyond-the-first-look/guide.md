# Lesson 21 — Bicep Syntax Beyond the First Look

**Chapter 6 · Bicep Deep Dive · Lesson 21 of 32**

## What you'll learn

- How Bicep's `for` expression deploys a whole array of similar
  resources from one resource block, instead of copy-pasting
- How to deploy a resource conditionally with `if`, based on a
  parameter
- What a symbolic name actually is, and how Bicep infers `dependsOn`
  automatically from it
- How to read a real multi-resource Bicep file that uses all three
  together

## Looping with `for`: one block, many resources

In the first-look lesson, every `resource` block declared exactly one
resource. Real Bicep files often need several near-identical
resources — three storage accounts, one subnet per environment, a
rule per entry in a list. Bicep's `for` expression lets one resource
block expand over an array:

```bicep
param storageNames array = ['ltvstorage01','ltvstorage02','ltvstorage03']

resource storageAccts 'Microsoft.Storage/storageAccounts@2023-01-01' = [
  for name in storageNames: {
    name: name
    location: resourceGroup().location
    sku: { name: 'Standard_LRS' }
  }
]
```

That one block deploys three storage accounts, one per entry in
`storageNames`. Need the index too? `for (name, i) in storageNames`
gives you both the value and its position, useful for naming things
`nsg-rule-${i}` or pulling a matching value out of a second array by
index.

## Conditional resources with `if`

Sometimes a resource should only exist in some deployments — a
Network Security Group that only gets built in a guarded environment,
a bastion host only when a parameter says to build one. Bicep's `if`
keyword goes right after the `=`:

```bicep
param deployNsg bool = true

resource nsg 'Microsoft.Network/networkSecurityGroups@2023-09-01' = if (deployNsg) {
  name: 'nsg-app'
  location: resourceGroup().location
  properties: {
    securityRules: []
  }
}
```

If `deployNsg` evaluates to `false`, Bicep never submits that
resource to Azure Resource Manager at all — it's skipped entirely,
not created and then removed. `for` and `if` can even combine on the
same resource, looping over an array while filtering which entries
actually deploy.

## Symbolic names and automatic dependency inference

`storageAccts` and `nsg` in the examples above are **symbolic
names** — names you chose for referring to that resource elsewhere in
the same file. They're not an Azure property; Azure never sees them.
Reference one from another resource, and Bicep uses that reference to
work out both scope and ordering automatically:

```bicep
resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccts[0]
  name: 'default'
}
```

`parent: storageAccts[0]` tells Bicep that `blobService` is a child
resource of the first storage account from the loop. Bicep compiles
both the correct `scope` and an implicit `dependsOn` into the ARM
JSON, in the right order, without you writing either by hand. You
only reach for an explicit `dependsOn` when a real dependency exists
that no reference in your file reveals, which is the rare case, not
the norm.

## Key terms

| Term | Meaning |
|---|---|
| `for` expression | Expands one resource (or module) block over an array, deploying one resource per array entry |
| `if` keyword | Deploys a resource only when its condition evaluates to true; skipped entirely otherwise |
| Symbolic name | The name given to a `resource` block for referencing it elsewhere in the file; never sent to Azure |
| Dependency inference | Bicep's compiler automatically adds `dependsOn` to the compiled ARM JSON whenever one resource references another's symbolic name |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
does writing `parent: storageAccts[0]` inside a child resource make an
explicit `dependsOn` unnecessary?
