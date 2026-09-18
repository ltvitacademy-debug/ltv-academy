# Lesson 12 — Bicep Syntax Basics

**Chapter 3 · Bicep for Azure Data Resources · Lesson 12 of 22**

## What you'll learn

- The `resource` keyword and the `'type@apiVersion'` string that names an Azure resource
- What the same storage account looks like in Bicep vs. raw ARM template JSON
- Why Bicep compiles down to that same JSON rather than replacing it
- What the Bicep Visualizer shows you about a file you just wrote

## The `resource` keyword

Every Bicep resource declaration follows the same shape: a symbolic
name Bicep uses internally, a resource type string with its API
version, and a body of properties.

```
resource storageAccount 'Microsoft.Storage/storageAccounts@2025-06-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}
```

`storageAccount` here is not the Azure resource name — it's the
symbolic name other parts of the same Bicep file use to reference this
resource (for dependencies, or to read its properties later). The
actual Azure resource name is the `name:` property inside the body.

## The same resource, as raw ARM JSON

Bicep is a friendlier syntax over the exact same underlying deployment
engine. The resource above, written as the ARM template JSON it
compiles to, looks like this:

```
{
  "type": "Microsoft.Storage/storageAccounts",
  "apiVersion": "2025-06-01",
  "name": "[parameters('storageAccountName')]",
  "location": "[parameters('location')]",
  "sku": {
    "name": "Standard_LRS"
  },
  "kind": "StorageV2"
}
```

Same resource type, same API version, same properties — Bicep just
removes the bracketed `[parameters('x')]` expression syntax and the
surrounding JSON punctuation. Nothing about *what* gets deployed
changes; only how many characters you have to type and how easy the
result is to read changes.

## Multiple resources, and their dependencies

A Bicep file can declare more than one resource. When a property of
one resource references a symbolic name from another (like a virtual
network subnet ID passed into a different resource), Bicep infers the
dependency automatically — you never write an explicit `dependsOn`
for that case, unlike raw ARM JSON, which usually needs one spelled
out.

## What the Visualizer actually shows

The Bicep extension for VS Code renders a live graph of every
resource declared in the open file and the dependency edges between
them, generated directly from the code — not hand-drawn, and never
stale, because it's regenerated from the file you're looking at.

![The Bicep Visualizer in VS Code, rendering a resource-dependency graph generated directly from an open .bicep file — not hand-drawn, and never stale.](/courses/terraform-bicep/ch03/12-bicep-syntax-basics/bicep-visualizer.png)

## Key terms

| Term | Meaning |
|---|---|
| `resource` keyword | Declares a resource: symbolic name, `'type@apiVersion'`, and a properties body |
| Symbolic name | The Bicep-only name used to reference a resource inside the file, not the Azure resource name |
| ARM template JSON | The underlying deployment format Bicep compiles down to |
| Bicep Visualizer | A VS Code panel rendering the resource dependency graph from the open file |

## Check yourself

You're ready for Lesson 13 when you can explain: what's the
difference between a Bicep resource's symbolic name and its `name:`
property, and why does Bicep need both?
