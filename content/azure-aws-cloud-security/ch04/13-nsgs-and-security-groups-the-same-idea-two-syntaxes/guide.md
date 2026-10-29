# Lesson 13 — NSGs and Security Groups: The Same Idea, Two Syntaxes

**Chapter 4 · Network Security Across Both Clouds · Lesson 1 of 4**

## What you'll learn

- How an Azure Network Security Group (NSG) rule is structured — priority,
  direction, access — and the order Azure actually evaluates rules in
- How an AWS Security Group differs: allow-only, no priority field, attached
  to the elastic network interface instead of a subnet
- Why an AWS Network ACL, not a Security Group, is the real analog to a
  subnet-level NSG — and why that distinction matters for an explicit Deny
- How to read a real rule in each cloud's native syntax and know exactly
  what it does before it ships

## Azure NSGs: priority order decides, then the defaults catch the rest

An NSG rule has a **priority** (100–4096, lower number evaluated first), a
**direction** (Inbound/Outbound), an **access** value (Allow/Deny), a
protocol, source/destination address prefixes, and a port range. Azure
walks the rules in priority order and stops at the first match:

```
az network nsg rule create \
  --resource-group rg-prod \
  --nsg-name nsg-web-subnet \
  --name Allow-HTTPS-Inbound \
  --priority 100 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes Internet \
  --destination-port-ranges 443
```

Every NSG ships with default rules you can't delete, sitting in the
65000–65500 range so your own rules always take priority over them:
`AllowVnetInBound`, `AllowAzureLoadBalancerInBound`, and `DenyAllInBound`
on the inbound side; mirrored equivalents outbound. NSGs are **stateful**
— an inbound Allow automatically permits the matching response traffic
outbound, so you never write a mirrored return rule.

NSGs can attach at two points: the **subnet** and the **NIC**. Azure
evaluates both. For inbound traffic, the subnet NSG runs first, then the
NIC NSG; for outbound, the order reverses. Traffic has to clear both to
get through.

## AWS Security Groups: allow-only, unioned, attached to the ENI

```
aws ec2 authorize-security-group-ingress \
  --group-id sg-0abc123def456 \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0
```

Notice what's missing: no priority field, because a Security Group rule
can only ever **Allow**. There is no explicit Deny rule in a Security
Group — full stop. Every SG starts from an implicit deny-all, and you add
Allow rules on top of it. When several SGs are attached to the same
instance's network interface, all of their rules are **unioned** — there's
nothing to shadow, so evaluation order doesn't matter the way NSG priority
does. Like NSGs, SGs are stateful: an allowed inbound connection's response
traffic goes back out automatically. A brand-new SG has zero inbound rules
(nothing gets in) and one default outbound rule allowing everything.

The AWS-only move worth knowing: a rule's source can be **another security
group's ID** instead of a CIDR block — `--source-group sg-0db-tier` means
"anything currently attached to that group," tracking autoscaled instances
without ever touching an IP address. Azure's nearest equivalent is an
**Application Security Group (ASG)** referenced inside an NSG rule.

## Where an explicit Deny actually lives in AWS: the NACL

If you need the NSG-style explicit Deny in AWS, that's a **Network ACL**,
not a Security Group. A NACL attaches to a subnet, is evaluated in
numbered rule order (lowest number first, first match wins — the same
model as NSG priority), and supports explicit Allow *and* Deny. The
catch: NACLs are **stateless**, so you write separate inbound and outbound
rules — nothing is auto-permitted back.

```
aws ec2 create-network-acl-entry \
  --network-acl-id acl-0123abcd \
  --ingress \
  --rule-number 100 \
  --protocol tcp \
  --port-range From=443,To=443 \
  --cidr-block 0.0.0.0/0 \
  --rule-action allow
```

## Side by side

| | Azure NSG | AWS Security Group | AWS NACL |
|---|---|---|---|
| Attaches to | Subnet and/or NIC | ENI (instance) | Subnet |
| Explicit Deny | Yes | No (implicit deny only) | Yes |
| Evaluation | Priority order, first match | Union of all matching Allow rules | Rule number order, first match |
| Stateful | Yes | Yes | No |
| Group-as-source | Via Application Security Group | Native (`--source-group`) | No |

## Key terms

| Term | Meaning |
|---|---|
| NSG priority | 100–4096; lower number is evaluated first; first match wins |
| Security Group | AWS allow-only, stateful firewall attached to an ENI; rules from multiple SGs are unioned |
| Network ACL (NACL) | AWS's stateless, subnet-level, explicit Allow/Deny filter — the real analog to a subnet NSG |
| Application Security Group (ASG) | Azure's grouping mechanism for referencing a set of resources as an NSG rule's source/destination |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
can't an AWS Security Group express an explicit Deny, and which AWS
construct would you reach for if a design genuinely needed one?
