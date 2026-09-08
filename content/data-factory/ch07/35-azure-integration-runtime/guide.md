# Lesson 35 — Azure Integration Runtime

**Chapter 7 · Integration Runtimes · Lesson 2 of 4**

## What you'll learn

- What "fully managed, serverless" actually means for the Azure IR
- How autoresolve decides which region actually executes an activity
- How Copy activity scaling works, without you sizing anything
- When to override autoresolve with an explicit regional IR

## The default you've already been using

Every Copy activity, every Lookup, every Data Flow this course has
built so far has run on the **Azure integration runtime** — Data
Factory's own `AutoResolveIntegrationRuntime`, created automatically
with every new data factory. You never provisioned it, patched it, or
sized it. That's the entire point.

## Fully managed, serverless, pay-for-what-you-use

The Azure IR provides genuinely serverless compute in Azure — no
infrastructure to provision, no software to patch, no capacity to
plan ahead of time. For a Copy activity, you set **data integration
units** (a measure of the power you want available), and the
underlying compute scales elastically to match, with no explicit
resizing of the IR itself required.

## How autoresolve actually decides the region

"Autoresolve" doesn't mean random — it follows a real, predictable
pattern:

| Scenario | Region used |
|---|---|
| **Copy activity**, sink location detectable | Same region as the sink, or the closest one in the same geography |
| **Copy activity**, sink location not detectable (Salesforce, say) | The data factory's own region |
| **Lookup, GetMetadata, Delete** | The data factory's own region, always |
| **Data Flow** | The data factory's own region |

A best practice worth internalizing: keep a data flow running in the
**same region** as the data stores it actually touches, either by
letting autoresolve match your data factory's region to your data, or
by explicitly creating a regional Azure IR when it doesn't.

## When to override autoresolve

Some real projects have **strict data compliance requirements** — data
that genuinely can't leave a specific geography. For those, create an
explicit, regional Azure IR, and point a linked service at it directly
with `connectVia`:

```
"linkedServiceName": {
  "referenceName": "UKSouthBlobLinkedService",
  "type": "LinkedServiceReference"
},
"connectVia": {
  "referenceName": "UKSouthIntegrationRuntime",
  "type": "IntegrationRuntimeReference"
}
```

Copying from a UK South blob to a UK South Synapse workspace, with
both linked services pointed at a UK South Azure IR, guarantees the
data never actually leaves that region — autoresolve's "best effort"
detection isn't a strong enough guarantee for that kind of
requirement.

## Key terms

| Term | Meaning |
|---|---|
| AutoResolveIntegrationRuntime | The default Azure IR, created automatically with every data factory |
| Data integration unit (DIU) | A measure of Copy activity compute power, scaling without manual IR resizing |
| connectVia | The linked service property pointing at a specific, explicit integration runtime |

## Lab

1. Open **Manage → Integration runtimes** and confirm
   `AutoResolveIntegrationRuntime` exists on your data factory by
   default.
2. Create a new, regional Azure IR pinned to a specific region.
3. Write one sentence explaining why "best effort" region detection
   isn't strong enough for a genuine data-residency compliance
   requirement.

## Check yourself

You're ready for Lesson 36 when you can explain, in one sentence,
why a Lookup activity always runs in the data factory's own region,
while a Copy activity's region depends on the sink.
