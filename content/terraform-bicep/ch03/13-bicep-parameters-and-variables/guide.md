# Lesson 13 — Parameters & Variables in Bicep

**Chapter 3 · Bicep for Azure Data Resources · Lesson 13 of 22**

## What you'll learn

- The `param` keyword, and how it differs from a Terraform `variable` block (Lesson 7)
- Constraining a parameter with `@allowed`, `@minLength`, and a real default
- The `var` keyword for computed values that never come from outside the file
- What VS Code's Problems pane catches before you ever try to deploy

## `param`, Bicep's version of a variable

Lesson 7 covered Terraform's `variable "x" {}` blocks. Bicep's
equivalent is the `param` keyword — a value supplied when the file is
deployed, never hardcoded inside it:

```
param storageAccountName string
param location string = resourceGroup().location
param skuName string = 'Standard_LRS'
```

`location` and `skuName` have defaults (`= '...'`); a caller can
override them, but doesn't have to. `storageAccountName` has no
default — it must be supplied every time, since a globally-unique
storage account name can never have a sensible default.

## Constraining a parameter with a decorator

A decorator (the `@` syntax) restricts what a parameter accepts,
catching a bad value before deployment instead of after:

```
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_ZRS'
])
param skuName string = 'Standard_LRS'

@minLength(3)
@maxLength(24)
param storageAccountName string
```

`@allowed` limits `skuName` to exactly the replication types Azure
actually supports; `@minLength`/`@maxLength` match Azure Storage's
real naming constraint (3-24 characters).

## `var`, for values computed inside the file

A `var` never comes from outside the file — it's a computed value
derived from a parameter or another expression, used purely to avoid
repeating the same expression:

```
var storageAccountNameLower = toLower(storageAccountName)
var tags = {
  environment: location == 'eastus2' ? 'prod' : 'dev'
  managedBy: 'bicep'
}
```

## What the Problems pane catches early

VS Code's Bicep extension type-checks a file as you write it — pass
a value that violates `@allowed` or `@minLength`, or reference an
undeclared parameter, and the Problems pane flags it immediately,
underlined in the editor, before you ever run a deployment command.

![The VS Code Problems pane surfacing a real Bicep type error before deployment — caught at authoring time, not after a failed az deployment command.](/courses/terraform-bicep/ch03/13-bicep-parameters-and-variables/bicep-problems-pane.png)

That's the same "review before it runs" idea Lesson 18's `plan`
step gives Terraform, just enforced a step earlier — at write time
instead of at plan time.

## Key terms

| Term | Meaning |
|---|---|
| `param` | A value supplied at deployment time — Bicep's equivalent of Terraform's `variable` |
| Decorator (`@allowed`, `@minLength`) | Constrains what a parameter accepts, checked before deployment |
| `var` | A computed value derived inside the file, never supplied from outside |
| Problems pane | VS Code's live type-checker for an open Bicep file |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does `storageAccountName` have no default value, while `location`
and `skuName` do?
