# Lesson 18 — Network Security Groups in Practice

**Chapter 5 · Azure Networking · Lesson 18 of 32**

## What you'll learn

- The exact anatomy of an NSG rule: priority, source/destination, port, protocol, and action
- Why the priority number is the whole game — and why lower always wins
- The difference between attaching an NSG to a subnet and attaching it to a NIC
- What Azure's own default rules already allow and deny before you write a single rule yourself

## Rule anatomy: the six fields that decide everything

The earlier networking fundamentals course introduced the security group as a stateful firewall
attached to a resource. In Azure, that's the **Network Security Group (NSG)**, and every rule
inside one has exactly six parts:

```
Priority:    100-4096 (lower number = evaluated first = wins)
Source:      a CIDR range, a service tag (e.g. Internet), or an application security group
Destination: same options as source
Port:        a single port, a range, or * for all
Protocol:    TCP, UDP, ICMP, or *
Access:      Allow or Deny
```

Azure evaluates rules **in priority order, lowest number first**, and stops at the first match.
Priority 100 beats priority 200 every time, regardless of which one is more specific or which one
was written more recently — there's no "most specific rule wins" logic like some other firewalls.
If a 100-priority Allow rule and a 200-priority Deny rule both match the same packet, the Allow at
100 wins and the Deny is never even evaluated.

## Default rules you get for free

Every NSG ships with default rules you didn't write, sitting at the bottom of the priority range
so your own rules can always override them:

```
Inbound defaults:
  65000  AllowVnetInBound          (allow traffic from inside the VNet)
  65001  AllowAzureLoadBalancerInBound (allow Azure's health probes)
  65500  DenyAllInBound            (deny everything else)

Outbound defaults:
  65000  AllowVnetOutBound
  65001  AllowInternetOutBound
  65500  DenyAllOutBound
```

Those defaults are why a brand-new NSG with zero custom rules already blocks all inbound internet
traffic but allows VMs in the same VNet to talk to each other — you're adding exceptions on top of
a secure-by-default baseline, not building the baseline yourself.

## Worked example: a web server's rule set

```
az network nsg create --resource-group rg-network-demo --name nsg-web

az network nsg rule create \
  --resource-group rg-network-demo --nsg-name nsg-web \
  --name Allow-HTTPS --priority 100 --direction Inbound --access Allow \
  --protocol Tcp --destination-port-ranges 443 --source-address-prefixes Internet

az network nsg rule create \
  --resource-group rg-network-demo --nsg-name nsg-web \
  --name Allow-SSH-Admin --priority 110 --direction Inbound --access Allow \
  --protocol Tcp --destination-port-ranges 22 --source-address-prefixes 203.0.113.5/32
```

Priority 100 opens HTTPS to the whole internet (the `Internet` service tag). Priority 110 opens
SSH, but only from one specific admin IP. Everything else falls through to the default
`DenyAllInBound` at 65500 — there's no need to write an explicit deny for every other port.

## Subnet NSG vs. NIC NSG

An NSG can attach to a subnet, to a VM's network interface (NIC), or to both at once:

```
az network vnet subnet update \
  --resource-group rg-network-demo --vnet-name vnet-prod \
  --name snet-web --network-security-group nsg-web
```

When both a subnet NSG and a NIC NSG exist on the path, Azure evaluates **both** — inbound traffic
is checked against the subnet NSG first, then the NIC NSG; outbound traffic is checked against the
NIC NSG first, then the subnet NSG. Traffic has to be allowed by both to get through. Most designs
keep it simple: one NSG per subnet, and skip NIC-level NSGs unless a specific VM genuinely needs
tighter rules than its neighbors.

## Key terms

| Term | Meaning |
|---|---|
| Priority | A number from 100-4096 that decides rule evaluation order; lower always wins, first match stops evaluation |
| Service tag | A Microsoft-maintained alias (e.g. `Internet`, `VirtualNetwork`) standing in for a changing set of IP ranges |
| Default security rules | Built-in rules at priority 65000+ that allow VNet/load-balancer traffic and deny everything else by default |
| NIC-level vs. subnet-level NSG | An NSG can attach to a subnet, a NIC, or both; traffic must pass whichever are present |

## Check yourself

An NSG has a priority-100 rule denying TCP port 22 from everywhere, and a priority-200 rule
allowing TCP port 22 from one admin IP. Does that admin's SSH traffic get through? Why?
