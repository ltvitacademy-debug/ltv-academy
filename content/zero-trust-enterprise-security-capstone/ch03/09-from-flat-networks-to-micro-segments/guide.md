# Lesson 9 — From Flat Networks to Micro-Segments

**Chapter 3 · Least-Privilege Access and Micro-Segmentation · Lesson 9 of 32**

## What you'll learn

- Why network-tier segmentation — subnets, NSGs, hub-spoke — still leaves a
  wide blast radius *inside* each tier, even once it's "segmented"
- What micro-segmentation actually means: the policy unit shrinking from a
  subnet to a single workload
- Why policy has to be written against workload identity and labels instead
  of IP addresses once workloads are ephemeral
- How this is the least-privilege tenet from Chapter 1, made concrete for
  east-west network traffic specifically

## Segmented is not the same as micro-segmented

Course 9 covered real network segmentation in depth: hub-spoke VNets with
forced routing through a firewall, NSGs separating a web tier from an app
tier from a data tier, Transit Gateway route tables keeping AWS spokes from
talking to each other directly. That work is real and it matters — it's
what keeps a compromised web server from reaching a database tier directly.

But look inside any one of those tiers. A typical "app tier" subnet with one
shared NSG rule allowing the whole subnet to talk to itself on common ports
might hold forty different services. The NSG did its job at the tier
boundary; it did nothing at all for the other thirty-nine services sitting
next to the one that just got compromised. That gap — segmentation that
stops at the subnet line — is exactly what micro-segmentation is built to
close.

## Shrinking the policy unit to the workload

**Micro-segmentation** moves the unit that policy is written against from a
subnet or IP range down to an individual workload — a single service, a
single container, sometimes a single process. Instead of "anything in
10.20.4.0/24 can reach anything else in 10.20.4.0/24 on port 443," a
micro-segmented policy says "the `payments-api` workload can reach the
`orders-db` workload on port 5432, and nothing else in that subnet can
reach `orders-db` at all." The blast radius from a single compromised
service shrinks from "the whole tier" to "exactly the handful of workloads
it was explicitly allowed to call."

## Why policy follows identity, not IP

A rule written against an IP range breaks down the moment the environment
is dynamic. Containers get rescheduled onto new hosts with new IPs;
autoscaling adds and removes instances constantly; a subnet's address range
tells you almost nothing stable about what's actually running there at any
given moment. Micro-segmentation solves this by attaching policy to a
**workload identity** — a certificate, a signed label, a tag like
`app=payments-api, env=prod` — rather than to an address. The policy travels
with the workload wherever it's rescheduled, because it's attached to what
the workload *is*, not to where it happens to be sitting on the network
right now.

## The Chapter 1 tenet, applied to east-west traffic

NIST SP 800-207's tenets say access is evaluated dynamically and enforced
strictly before every request is allowed — Chapter 1 introduced that for
user-to-resource access. Micro-segmentation is the same tenet applied to
**east-west traffic**: workload-to-workload calls inside the data center or
VPC, not just north-south traffic crossing the perimeter. Nothing inside a
micro-segmented environment is implicitly trusted just because it's already
"inside" — every workload-to-workload flow has to be explicitly allowed, by
identity, the same way a user's request has to be.

## Key terms

| Term | Meaning |
|---|---|
| Network segmentation | Dividing a network into tiers or zones (web/app/data) with controls at the boundary between zones |
| Micro-segmentation | Writing enforcement policy at the level of an individual workload rather than a subnet or IP range |
| East-west traffic | Workload-to-workload traffic inside a data center or VPC, as opposed to north-south traffic crossing the perimeter |
| Workload identity | A certificate, signed label, or tag that identifies a workload for policy purposes, independent of its current IP address |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why does
an NSG that correctly separates a web tier from an app tier still leave a
real blast radius problem *inside* the app tier, and what does
micro-segmentation change about how that policy is written?
