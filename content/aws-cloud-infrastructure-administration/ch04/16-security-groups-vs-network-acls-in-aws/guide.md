# Lesson 16 — Security Groups vs. Network ACLs in AWS

**Chapter 4 · AWS Networking: VPC · Lesson 16 of 32**

## What you'll learn

- Why AWS gives you two different firewalls — a Security Group and a Network ACL — instead of
  just one
- What "stateful" actually means in practice, and why it means a Security Group never needs an
  explicit outbound rule for return traffic
- Why a Network ACL, being stateless, needs rules in both directions for the same conversation
- How NACL rule numbers decide evaluation order, and what the default NACL allows before you
  write a single rule

## Two firewalls, two different jobs

AWS gives you two layers of network filtering, and they're not interchangeable. A **Security
Group (SG)** attaches to an instance's network interface and filters traffic at the instance
level. A **Network ACL (NACL)** attaches to a subnet and filters traffic for everything in that
subnet at once. Most real designs use both — a tight SG per instance role, and a NACL mostly
left at its permissive default — but the two behave differently enough that mixing them up
causes real outages.

## Security Groups: stateful, allow-only, no order to think about

```bash
aws ec2 create-security-group \
  --group-name web-sg \
  --description "Web tier" \
  --vpc-id vpc-0abc123456789def0

aws ec2 authorize-security-group-ingress \
  --group-id sg-0abc123456789def0 \
  --protocol tcp --port 443 \
  --cidr 0.0.0.0/0
```

A new Security Group starts with **no inbound rules** (deny everything in by default) and
**one default outbound rule allowing all traffic** to `0.0.0.0/0`. You only ever write **allow**
rules — there's no explicit deny, and there's no priority number to reason about, because AWS
evaluates every rule in the group and allows traffic that matches any of them. Crucially, an SG
is **stateful**: if inbound traffic on port 443 is allowed in, the matching response traffic
back out is automatically allowed too, with no separate outbound rule required.

## Network ACLs: stateless, numbered, allow or deny

```bash
aws ec2 create-network-acl --vpc-id vpc-0abc123456789def0

aws ec2 create-network-acl-entry \
  --network-acl-id acl-0abc123456789def0 \
  --no-egress \
  --rule-number 100 --protocol tcp \
  --port-range From=443,To=443 \
  --cidr-block 0.0.0.0/0 --rule-action allow

aws ec2 create-network-acl-entry \
  --network-acl-id acl-0abc123456789def0 \
  --egress \
  --rule-number 100 --protocol tcp \
  --port-range From=1024,To=65535 \
  --cidr-block 0.0.0.0/0 --rule-action allow
```

A NACL's rules are numbered (1-32766), evaluated **in ascending order**, and the **first rule
that matches wins** — allow or deny — stopping evaluation right there. `--no-egress` and
`--egress` pick the direction for each entry, which is the detail that trips people up coming
from Security Groups: a NACL is **stateless**, so allowing inbound port 443 does nothing for the
*return* traffic. That second rule above — allowing outbound traffic on the high **ephemeral
ports** (1024-65535) — exists purely so the response to that inbound request has somewhere to
go. A Security Group never needs a rule like that; a NACL always does.

## What's allowed before you write anything

The **default NACL** that comes attached to a VPC's subnets out of the box allows **all**
traffic, both inbound and outbound — a fully open starting point. A **custom NACL** you create
yourself starts the opposite way: it denies all traffic until you add rules. Either kind ends
with an implicit, unwritable final rule (`*`) that denies anything nothing else matched — the
NACL equivalent of the Security Group's absent default-allow.

## Key terms

| Term | Meaning |
|---|---|
| Security Group | A stateful, instance-level firewall; allow-only rules, default-deny inbound, default-allow-all outbound |
| Network ACL (NACL) | A stateless, subnet-level firewall; numbered allow/deny rules evaluated in ascending order, first match wins |
| Stateful vs. stateless | Stateful auto-allows return traffic (SG); stateless requires an explicit rule in both directions (NACL) |
| Ephemeral ports | The high port range (1024-65535) a NACL must explicitly allow outbound so return traffic has somewhere to go |

## Check yourself

A Security Group allows inbound HTTPS and nothing else explicitly outbound, yet responses reach
the client fine. A NACL allows inbound HTTPS but has no outbound rule for ports 1024-65535, and
responses never arrive. Why the different outcome for the same scenario?
