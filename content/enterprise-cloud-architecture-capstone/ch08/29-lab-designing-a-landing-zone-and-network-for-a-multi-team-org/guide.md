# Lesson 29 — Lab: Designing a Landing Zone and Network for a Multi-Team Org

**Chapter 8 · Capstone: Designing and Defending an Enterprise Cloud Architecture · Lesson 29 of 32**

## What you'll learn

- How to turn the landing zone and network ideas from Chapters 2 and 3 into one concrete design,
  for a fictional mid-size company called Harlow Creek Logistics
- How to choose subscription boundaries by blast radius, the way Lesson 8 taught, instead of
  mirroring the org chart
- How to lay out a hub-and-spoke network with real address ranges, and route every spoke's egress
  through one shared firewall
- How to turn Chapter 5's governance guardrails into Azure Policy assignments that apply to every
  team automatically, without anyone remembering to configure them by hand

## The scenario

Harlow Creek Logistics (HCL) is a mid-size logistics company with about 400 engineers split across
three product teams — **Dispatch** (real-time routing), **Fleet Analytics** (telemetry and
reporting), and **Customer Portal** (the public-facing tracking site) — plus one central
**Platform** team that owns shared infrastructure. All three product teams are moving their first
production workloads to Azure over the next two quarters, and Platform has been asked to design
the landing zone and network everyone will build on top of. Nothing below is a real company; it's
a composite of the kind of design decisions a mid-size org actually faces.

## Step 1 — Map teams to subscriptions by blast radius, not the org chart

Lesson 8 made the case directly: subscription boundaries should match how far a mistake can
spread, not who reports to whom. HCL has three product teams and one platform team, but that
becomes **eight subscriptions**, not four — one production and one non-production subscription per
product team, plus three platform subscriptions split by function:

| Subscription | Owner | Purpose |
|---|---|---|
| `sub-connectivity` | Platform | Hub VNet, firewall, VPN/ExpressRoute gateway |
| `sub-identity` | Platform | Domain services, directory-synced identity infrastructure |
| `sub-management` | Platform | Log Analytics, Azure Automation, backup vaults |
| `sub-dispatch-prod` / `sub-dispatch-nonprod` | Dispatch | Routing engine, dev/test/staging |
| `sub-fleetanalytics-prod` / `sub-fleetanalytics-nonprod` | Fleet Analytics | Telemetry pipeline, dev/test/staging |
| `sub-customerportal-prod` / `sub-customerportal-nonprod` | Customer Portal | Public site, dev/test/staging |

Splitting prod from non-prod per team means a mistake in Dispatch's test environment can never
touch Dispatch's production routing engine, let alone another team's subscription — the blast
radius stops at the boundary that actually matters.

## Step 2 — Build the management group hierarchy

Azure management groups are where governance gets applied once and inherited everywhere beneath
them, so the hierarchy has to mirror the subscription split above:

```
Tenant Root Group
└── mg-hcl (intermediate root)
    ├── mg-platform
    │   ├── sub-connectivity
    │   ├── sub-identity
    │   └── sub-management
    ├── mg-landing-zones
    │   ├── mg-dispatch        → sub-dispatch-prod, sub-dispatch-nonprod
    │   ├── mg-fleet-analytics → sub-fleetanalytics-prod, sub-fleetanalytics-nonprod
    │   └── mg-customer-portal → sub-customerportal-prod, sub-customerportal-nonprod
    ├── mg-decommissioned
    └── mg-sandbox
```

`mg-landing-zones` is where every product team's subscriptions live, so a policy assigned there —
"every subnet must have an NSG," for example — applies to Dispatch, Fleet Analytics, and Customer
Portal without being assigned three separate times. `mg-sandbox` exists specifically so an engineer
can experiment without touching anything that inherits production policy.

## Step 3 — Design the hub and allocate its address space

The hub lives in `sub-connectivity`, in HCL's primary region, East US 2, and holds only shared
services — never a team's actual workload:

```
Hub VNet: 10.0.0.0/22  (East US 2, sub-connectivity)
├── AzureFirewallSubnet     10.0.0.0/26
├── GatewaySubnet           10.0.0.64/27   (VPN/ExpressRoute)
└── snet-shared-services    10.0.1.0/24    (DNS Private Resolver, domain controllers)
```

Reserving a full /22 for the hub, when the firewall and gateway subnets together use less than a
/25, looks wasteful until a second gateway or a DDoS-protected endpoint needs room later — address
space is nearly free to over-allocate up front and painful to expand after spokes are already
peered.

## Step 4 — Design the spokes and peer them to the hub

Each product team gets one spoke VNet per environment, each a /20 — large enough for several
subnets of application tiers without needing a redesign:

```
dispatch-prod          10.10.0.0/20
dispatch-nonprod        10.11.0.0/20
fleetanalytics-prod      10.20.0.0/20
fleetanalytics-nonprod   10.21.0.0/20
customerportal-prod      10.30.0.0/20
customerportal-nonprod   10.31.0.0/20
```

Every spoke peers directly to the hub VNet and never peers to another spoke — if Fleet Analytics
needs to reach Dispatch's API, that traffic goes hub-and-spoke through the firewall, where it's
inspected and logged, rather than spoke-to-spoke where nobody's watching it.

## Step 5 — Force every spoke's egress through the hub firewall

A peered spoke doesn't route through the hub automatically — that has to be configured with a
user-defined route (UDR) on every spoke subnet:

```
# Route table attached to every spoke subnet
Route: 0.0.0.0/0 → next hop: Azure Firewall private IP (10.0.0.4)
```

Without this route, a VM in `dispatch-prod` would reach the internet directly through Azure's
default routing, completely bypassing the firewall HCL just spent two steps designing. The UDR is
what actually makes the hub a chokepoint instead of just a diagram.

## Step 6 — Write the guardrails as policy, not as a wiki page

Lesson 17 and Lesson 19 both made the same point from different angles: a guardrail that lives in
a document someone has to remember to follow isn't a guardrail. Assigned at `mg-landing-zones`,
these four policies apply to every current and future product team automatically:

```json
{
  "policies": [
    { "name": "deny-public-ip-on-nic", "effect": "Deny", "applies_to": "mg-landing-zones" },
    { "name": "require-tags-costcenter-env-owner", "effect": "Deny", "applies_to": "mg-landing-zones" },
    { "name": "allowed-locations-eastus2-centralus", "effect": "Deny", "applies_to": "mg-hcl" },
    { "name": "require-nsg-on-every-subnet", "effect": "Audit", "applies_to": "mg-landing-zones" }
  ]
}
```

`allowed-locations` is assigned one level higher, at `mg-hcl`, because it should constrain
Platform's own subscriptions too — a guardrail that exempts the team writing the guardrails isn't
really enterprise governance.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | How far a mistake or failure in one subscription can spread — the right basis for subscription boundaries |
| Management group inheritance | A policy assigned at a management group applies to every subscription nested beneath it |
| Hub-and-spoke | A topology where shared services live once in a hub, and every spoke routes through it rather than peering to each other |
| User-defined route (UDR) | The explicit route that forces a spoke's traffic through the hub firewall instead of Azure's default path |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does HCL end up with eight
subscriptions instead of four, and what specific Azure feature makes a spoke VNet's traffic
actually pass through the hub firewall rather than just being drawn that way on a diagram?
