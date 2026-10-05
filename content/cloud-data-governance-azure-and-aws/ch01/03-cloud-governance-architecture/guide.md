# Lesson 3 — Cloud Governance Architecture

**Chapter 1 · Cloud Governance Architecture · Lesson 3 of 25**

## What you'll learn

- How Azure's management group / subscription / resource group hierarchy creates governance boundaries
- How AWS Organizations' organizational units (OUs) and accounts do the same job, differently shaped
- The four-layer mental model this course uses for a governance architecture: identity, policy, data, monitoring
- Why "where does this live in the hierarchy" is usually the first governance question worth asking

## Hierarchy is governance's first lever

Before you can govern anything in the cloud, you need a container to attach governance to. Both Azure and AWS give you a nested hierarchy of containers, and almost every governance control — who can do what, which policies apply, how costs are tracked, how logs are centralized — gets applied at one of these levels rather than to individual resources one at a time.

**Azure's hierarchy**, top to bottom:

- **Management groups** — group multiple subscriptions together so policy and access can be applied once, at the top, and inherited downward. A large enterprise might have management groups for "Production," "Non-Production," and "Sandbox."
- **Subscriptions** — the billing and access-control boundary. Most organizations separate subscriptions by environment (dev/test/prod) or by business unit.
- **Resource groups** — a logical container for resources that share a lifecycle (deployed, managed, and deleted together).
- **Resources** — the actual VM, storage account, database, and so on.

**AWS's hierarchy**, top to bottom:

- **Organization** — the root container for every account the company owns, managed through AWS Organizations.
- **Organizational units (OUs)** — group accounts the same way management groups group subscriptions. A common pattern: OUs for "Security," "Production," "Non-Production," and "Sandbox."
- **Accounts** — AWS's equivalent of a subscription: a hard billing and access boundary. Unlike Azure, AWS actively encourages one account per workload or team rather than many resource groups inside one subscription.
- **Resources** — the actual EC2 instance, S3 bucket, RDS database, and so on.

The shapes aren't identical — Azure resource groups have no real AWS equivalent, and AWS's "one account per workload" habit is looser in Azure, where more lives inside a single subscription — but the governance *function* is the same: a nested structure where policy applied high up flows down to everything beneath it, without anyone having to touch each resource individually.

## A four-layer model for governance architecture

Across both clouds, a mature governance architecture is really four layers working together, and this course is organized around them:

1. **Identity layer** — who is allowed to authenticate at all, and as what. Covered in Chapter 2.
2. **Policy layer** — rules that are enforced automatically, regardless of who's asking (Azure Policy, AWS Organizations service control policies). Covered in Chapter 4.
3. **Data layer** — where data actually lives, how it's cataloged, and how it's classified. Covered in Chapter 3.
4. **Monitoring layer** — the audit trail that proves the other three layers are actually working. Touched throughout, covered most directly in Chapter 4.

A governance architecture that's strong in one layer and ignored in the others fails in practice. Perfect identity controls don't help if there's no policy stopping an authenticated user from creating an unencrypted public database. Perfect policy doesn't help if nobody's monitoring whether it's actually being enforced.

## Why hierarchy placement is usually the first governance question

When a new resource, dataset, or workload shows up ungoverned, the first productive question usually isn't "what permissions does it have" — it's "where does this live in the hierarchy, and what policy *should* already apply to it just by being there." A resource dropped into the wrong subscription or account inherits the wrong policy, the wrong logging configuration, and often the wrong cost owner, before anyone even looks at its individual access controls.

## Key terms

| Term | Meaning |
|---|---|
| Management group (Azure) | A container that groups subscriptions so policy and access apply once and inherit downward |
| Organizational unit / OU (AWS) | AWS Organizations' equivalent grouping of accounts under the organization root |
| Subscription (Azure) / Account (AWS) | The hard billing and access-control boundary in each cloud |
| Four-layer governance model | Identity, policy, data, and monitoring — the layers this course's chapters are organized around |

## Lab

Sketch (on paper or in a text file) a four-level hierarchy for a hypothetical company with a Production environment, a Non-Production environment, and a Sandbox for experiments — once using Azure's management group/subscription language, and once using AWS's OU/account language. Notice how similar the shapes end up being despite the different names.

## Check yourself

Can you name all four levels of Azure's resource hierarchy and AWS's organization hierarchy, in order, and explain why "where does this live in the hierarchy" is often the first governance question worth asking about an ungoverned resource?
