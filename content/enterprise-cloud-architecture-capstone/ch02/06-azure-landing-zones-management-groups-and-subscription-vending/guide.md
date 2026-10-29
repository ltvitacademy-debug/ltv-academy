# Lesson 6 — Azure Landing Zones: Management Groups and Subscription Vending

**Chapter 2 · Landing Zones and Multi-Account Design · Lesson 2 of 4**

## What you'll learn

- How Azure's **management group hierarchy** structures an entire
  tenant above the subscription level, and why policy assigned there
  inherits downward automatically
- The real distinction between **platform subscriptions** (identity,
  management, connectivity) and **landing zone subscriptions** (where
  workloads actually run)
- What **subscription vending** means as a repeatable, automated
  process, and why it's usually implemented in Terraform rather than
  done by hand
- How this maps onto what you already know from Course 8's
  multi-provider Terraform work

## Management groups: policy above the subscription

A single Azure subscription has its own resource groups, its own
resources, and — on its own — no relationship to any other
subscription in the tenant. **Management groups** exist to fix that:
they sit above subscriptions in a hierarchy, rooted at a tenant's
single **Tenant Root Group**, and any Azure Policy or RBAC role
assignment made at a management group level is inherited by every
subscription underneath it, automatically, with no per-subscription
re-configuration required.

The Azure Landing Zones reference architecture (part of Microsoft's
Cloud Adoption Framework) organizes that hierarchy into a specific
shape. Directly under the Tenant Root Group sit two top-level
management groups:

```
Tenant Root Group
├── Platform
│   ├── Identity
│   ├── Management
│   └── Connectivity
└── Landing Zones
    ├── Corp
    └── Online
```

**Platform** holds the subscriptions that run shared infrastructure
for the whole tenant. **Landing Zones** holds the subscriptions where
actual application workloads live. Splitting them this way means a
policy written once — "every subscription must forward logs to the
central Log Analytics workspace," for instance — gets assigned at the
top of the tree and reaches every subscription under it without
anyone having to remember to apply it again on subscription number
forty.

## Platform subscriptions: the shared foundation

Three subscriptions typically sit under **Platform**, each doing one
job for the whole tenant:

- **Identity** — houses domain controllers or identity infrastructure
  that other subscriptions depend on, kept isolated from workloads
- **Management** — centralized Log Analytics workspaces, Azure
  Automation accounts, and the policy/monitoring tooling that watches
  everything else
- **Connectivity** — the hub virtual network: ExpressRoute or VPN
  gateways, Azure Firewall, and centralized DNS, which every landing
  zone subscription peers into rather than building its own internet
  edge

None of these subscriptions run application workloads. Their entire
purpose is to exist once, be built correctly once, and be depended on
by everything else — which is exactly the kind of resource Course 8
taught you to express as Terraform modules with explicit outputs that
other configurations consume.

## Landing zone subscriptions: where workloads actually run

Subscriptions under the **Landing Zones** management group are where
application teams actually deploy resources. The **Corp** and
**Online** sub-groups in the reference architecture split workloads
by whether they need private, internally-facing connectivity (Corp)
or can accept more direct internet exposure (Online) — a policy
distinction, not a technical limitation. Every subscription placed
under either one inherits the policy and, through hub-and-spoke
peering back to the Connectivity subscription, the network
connectivity that the Platform subscriptions already built. A new
landing zone subscription never has to build its own firewall rules
or request its own ExpressRoute circuit — that already exists one
level up.

## Subscription vending: provisioning as a repeatable process

Doing all of the above by hand, once, for one subscription is
straightforward. Doing it correctly and consistently for the thirtieth
subscription, requested by a team that doesn't know the platform
internals, is a different problem — and it's the problem **subscription
vending** solves. Subscription vending is the pattern of exposing
subscription creation as a parameterized, automated process: a
requester supplies a small set of inputs — subscription name,
management group placement, network size, budget — and a pipeline
produces a fully compliant subscription, already peered to the hub,
already policy-assigned, without anyone hand-building it.

```hcl
module "landing_zone_subscription" {
  source = "./modules/subscription-vending"

  subscription_display_name = "app-payments-prod"
  management_group_id       = "lz-corp"
  address_space              = ["10.40.0.0/22"]
  budget_amount               = 5000
}
```

This is Course 8's Terraform skills applied at the subscription level
instead of the resource level — the module's job is to run the same
`azurerm_subscription`, policy assignment, and network peering steps
every single time, so subscription number thirty is exactly as
compliant as subscription number one, without a human remembering
every step in between.

## Key terms

| Term | Meaning |
|---|---|
| Management group | A container above subscriptions in Azure's hierarchy; policy and RBAC assigned here are inherited by every subscription beneath it |
| Platform subscription | A shared-infrastructure subscription (Identity, Management, Connectivity) that application workloads depend on but never run inside |
| Landing zone subscription | A subscription under the Landing Zones management group where application teams actually deploy resources |
| Subscription vending | The automated, parameterized process of provisioning a new, already-compliant subscription instead of building one by hand |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does placing Identity, Management, and Connectivity in their own
Platform subscriptions — rather than bundling shared infrastructure
into the first landing zone subscription that needed it — matter for
every subscription created afterward?
