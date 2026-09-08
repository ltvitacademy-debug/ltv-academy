# Lesson 47 — When to Choose ADF vs. Fabric

**Chapter 9 · Fabric Data Factory · Lesson 6 of 6**

## What you'll learn

- The real pricing model difference, and why it matters
- A genuine side-by-side feature comparison
- Concrete scenarios pointing toward each option
- How to actually make this call for a real project

## The pricing model is the real starting point

Before features, start with billing, because it changes the entire
economics of a decision:

| | Azure Data Factory | Fabric Data Factory |
|---|---|---|
| Type of service | Data Integration PaaS | Data Integration SaaS |
| Pricing | Pay-as-you-go — per activity run, data movement, compute | Capacity-based (Fabric F SKU) — no charge for external/pipeline activities, only activity runs and data movement |
| Authoring environment | Azure portal (ADF Studio) | Fabric workspace — unified with Lakehouse, Warehouse, Power BI |

If your organization already owns Fabric capacity for Power BI or
other workloads, Fabric Data Factory pipelines can run against
capacity you're already paying for. If you're purely doing data
movement with no other Fabric usage, ADF's pay-as-you-go model may
genuinely be simpler to reason about and budget for.

## The real feature comparison

Pulling together everything from Lessons 42-46:

| Category | ADF | Fabric |
|---|---|---|
| Monitoring | Pipelines/Data Flows in ADF Studio | Cross-workspace Monitoring Hub, unified across Pipelines, Dataflows, Notebooks |
| CI/CD | ARM templates + Azure DevOps/GitHub | Built-in deployment pipelines, cherry-picking, workspace-level promotion |
| Compute/IR | Self-hosted, SSIS, Azure IR you manage | Cloud connections + On-premises Data Gateway, largely managed for you |
| Data sharing | N/A | Cross-tenant sharing via OneLake shortcuts, no duplication |
| Activity coverage | ~100% (the original) | ~90% of ADF activities, plus Fabric-only ones (Outlook, Teams, Semantic model refresh) |

Notice the activity coverage line: Fabric isn't a strict superset of
ADF yet. If your pipeline genuinely depends on the ~10% gap — SSIS
execution being the biggest one — that alone can decide the question
for you.

## Concrete scenarios

**Choose classic ADF when:**
- You run real SSIS packages via the Execute SSIS Package activity —
  Fabric's story here is still undetermined.
- You need ADF Managed Virtual Network's fully Microsoft-managed
  private connectivity with zero setup.
- Your organization has no Fabric capacity and doesn't plan to invest
  in the broader Fabric platform.
- You need the absolute maximum activity/connector parity today.

**Choose Fabric Data Factory when:**
- Your destination is already a Fabric Lakehouse or Warehouse, and
  OneLake's "one copy of data" removes real, unnecessary data
  movement.
- Your organization already has Fabric capacity for Power BI or other
  workloads.
- You want simpler CI/CD without ARM template exports.
- You want business users comfortable with Power Query to help build
  Dataflow Gen2 transformations, not just engineers.

**It's genuinely not always either/or.** The "ADF item in a Fabric
workspace" path from Lesson 46 lets you run both side by side
indefinitely, not just as a migration stepping stone — some
organizations keep SSIS-dependent pipelines on classic ADF while new
Lakehouse-centric work goes straight to Fabric.

## Key terms

| Term | Meaning |
|---|---|
| Fabric capacity (F SKU) | The purchased compute unit Fabric workloads, including Data Factory pipelines, run against |
| PaaS vs. SaaS | ADF is platform-as-a-service (you manage more); Fabric is software-as-a-service (Microsoft manages more) |

## Lab

1. For a hypothetical project moving from an on-premises SQL Server
   to a Fabric Lakehouse, list which factors from this lesson would
   push toward Fabric.
2. For a hypothetical project still running legacy SSIS packages,
   list which factors would push toward keeping classic ADF.
3. Write one sentence explaining why the two paths aren't strictly
   mutually exclusive.

## Check yourself

You're ready for Chapter 10 when you can explain, in one sentence,
the single biggest real-world capability gap that could force a
"stay on classic ADF" decision today.
