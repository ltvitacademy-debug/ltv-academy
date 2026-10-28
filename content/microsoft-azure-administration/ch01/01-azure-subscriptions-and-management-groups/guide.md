# Lesson 1 — Azure Subscriptions and Management Groups

**Chapter 1 · Azure Fundamentals & Governance · Lesson 1 of 4**

## What you'll learn

- What an Azure subscription actually is: a billing boundary and a scope for access control, not just a login
- How to inspect and switch subscriptions with Azure CLI
- Why organizations with many subscriptions group them under management groups instead of managing each one separately
- How the resource hierarchy — tenant, management groups, subscriptions, resource groups, resources — nests permissions and policy from the top down

## A subscription is a billing boundary — and a scope

An **Azure subscription** is the logical container every Azure resource lives inside, tied to a
**Microsoft Entra tenant** (the identity directory behind it). It does two distinct jobs at once.
First, it's a **billing boundary**: every resource inside a subscription rolls up into one invoice,
which is why companies often split subscriptions by department, project, or environment (production
vs. test) rather than running everything through one. Second, it's a **scope**: role-based access
control (RBAC) assignments and Azure Policy applied at the subscription level automatically apply to
everything deployed inside it, without touching each resource individually.

You can see which subscription you're currently working in, and switch between the ones your account
can access, with Azure CLI:

```
az account show

az account list --output table

az account set --subscription "Contoso-Production"
```

`az account show` prints the active subscription's ID, name, and tenant. `az account list` shows every
subscription available to your signed-in account. `az account set` changes which subscription your
CLI commands actually target — get this wrong in a script and you can deploy test resources into
production, or vice versa, without any error telling you so.

## Management groups: governance above subscriptions

A single company might end up with a dozen subscriptions — one per department, one per environment,
one for a sandbox. Applying the same RBAC assignment or policy to each one by hand doesn't scale, and
it's easy to miss one. **Management groups** solve this by sitting one or more levels above
subscriptions in the hierarchy: assign a role or policy to a management group once, and it applies to
every subscription nested underneath it.

```
az account management-group create --name "Contoso-Corp"

az account management-group subscription add \
  --name "Contoso-Corp" \
  --subscription "11111111-2222-3333-4444-555555555555"
```

The first command creates a management group; the second moves an existing subscription under it.
Management groups can be nested up to six levels deep, and every tenant already has one default,
top-level management group called the **Tenant Root Group**, which contains every other management
group and subscription in that tenant automatically.

## The hierarchy, top to bottom

Put it all together and Azure's resource hierarchy has five levels, with permissions and policy
flowing downward through every one of them:

```
Microsoft Entra tenant
  └── Management groups (up to 6 levels deep)
        └── Subscriptions
              └── Resource groups
                    └── Individual resources
```

A role or policy assigned at any level applies to everything nested beneath it. That's why getting
the top of this hierarchy right — grouping subscriptions sensibly — saves repetitive, error-prone work
everywhere below it. Resource groups, the next level down, are where this lesson ends and the next
one begins.

## Key terms

| Term | Meaning |
|---|---|
| Subscription | A billing boundary and RBAC/policy scope, tied to a Microsoft Entra tenant |
| Management group | A container above subscriptions used to apply RBAC or policy to many subscriptions at once |
| Tenant Root Group | The default top-level management group containing every management group and subscription in a tenant |
| Scope | The level — tenant, management group, subscription, resource group, or resource — at which a role or policy applies |

## Check yourself

A company has five subscriptions, one per department, and wants every subscription to enforce the
same "no public IP addresses on VMs" policy. Why would creating one management group and assigning
the policy there, instead of assigning it five separate times, be the better choice — and what
happens automatically if a sixth department subscription gets added to that management group later?
