# Lesson 16 — ARM Templates vs. Bicep

**Chapter 3 · Bicep for Azure Data Resources · Lesson 16 of 22**

## What you'll learn

- Why ARM templates still matter even though this chapter used Bicep the whole time
- `az bicep build` — turning a Bicep file into the ARM JSON it was always going to become
- `az bicep decompile` — going the other direction, for an existing ARM template
- When you'd still choose to write raw ARM JSON today (rarely, but it happens)

## Bicep never replaced ARM — it compiles to it

Lesson 12 already showed this: every Bicep resource is, underneath,
an ARM template resource. Nothing in Chapter 3 skipped ARM — Bicep
is the authoring layer Microsoft built on top of it once ARM JSON's
verbosity became a real productivity problem at scale.

```
.bicep file  --(az bicep build)-->  ARM template JSON
             <--(az bicep decompile)--
```

## Building: Bicep to ARM

```
az bicep build --file main.bicep
```

This produces `main.json` — the exact ARM template that
`az deployment group create --template-file main.bicep` would have
generated and deployed anyway. Nobody deploys the built JSON directly
in normal use; the command exists mainly to inspect what a Bicep
file actually compiles to, or to hand off a template to a system that
only accepts raw ARM JSON.

## Decompiling: ARM to Bicep

```
az bicep decompile --file main.json
```

The reverse direction matters more in practice — a team that's been
running raw ARM templates for years (or generated one by exporting a
resource group's current state from the Portal) can decompile it into
Bicep to start authoring the same infrastructure in the friendlier
syntax, without hand-translating hundreds of lines of JSON.

## When ARM JSON still shows up directly

Almost nobody hand-writes new ARM JSON today. It still surfaces in a
few real places: exporting a resource group's template from the
Portal (Portal → Resource Group → Export template) always produces
raw ARM JSON, some older third-party tooling only accepts ARM JSON
directly, and Lesson 9's honest note about Fabric Capacity
provisioning is a real example — a gap in a newer resource type's
Terraform/Bicep support sometimes means falling back to the
underlying ARM/REST API directly until first-class support catches up.

## Chapter 3 recap

Bicep syntax and resource blocks (12) → parameters, variables, and
the Problems pane catching errors early (13) → the actual deploy
command and what-if (14) → a real server-and-database pair with a
properly secured password (15) → and now, the compiled ARM JSON
underneath all of it. Chapter 3 is complete.

## Key terms

| Term | Meaning |
|---|---|
| `az bicep build` | Compiles a .bicep file into the ARM template JSON it deploys as |
| `az bicep decompile` | Converts existing ARM template JSON into Bicep syntax |
| Portal export | The Portal's "Export template" feature — always produces raw ARM JSON |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why
does `az bicep decompile` matter more in practice than
`az bicep build`?
